<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2024 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
namespace Runtime\ORM;

use Runtime\BaseObject;
use Runtime\DateTime;
use Runtime\ORM\Annotations\Migration;
use Runtime\ORM\Factory\CursorFactory;
use Runtime\ORM\BaseMigration;
use Runtime\ORM\Connection;
use Runtime\ORM\ConnectionPool;
use Runtime\ORM\Cursor;
use Runtime\ORM\Provider as DatabaseProvider;
use Runtime\ORM\Query;
use Runtime\ORM\QueryLog;


class MigrationBuilder extends \Runtime\BaseObject
{
	var $log;
	var $pool;
	var $migrations;
	var $history;
	var $history_cache;
	
	
	/**
	 * Constructor
	 */
	function __construct($connection_name = "default")
	{
		parent::__construct();
		$this->pool = \Runtime\ORM\ConnectionPool::get($connection_name);
	}
	
	
	/**
	 * Create connection
	 */
	function createConnection($execute)
	{
		if ($execute)
		{
			return $this->pool->getConnection();
		}
		$connection = $this->pool->createConnection();
		$connection->setQueryLog($this->log);
		$connection->setCursorFactory(new \Runtime\ORM\Factory\CursorFactory("Runtime.ORM.Cursor"));
		return $connection;
	}
	
	
	/**
	 * Returns query log
	 */
	function getQueryLog(){ return $this->connection->getQueryLog(); }
	
	
	/**
	 * Returns SQL query
	 */
	function getSQL()
	{
		$items = $this->log->map(function ($item){ return $item->get("sql"); });
		$result = new \Runtime\Vector();
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$is_comment = \Runtime\rs::substr($item, 0, 2) == "--";
			if ($is_comment)
			{
				if ($i != 0) $result->push("");
			}
			else
			{
				$item .= ";";
			}
			$result->push($item);
		}
		return $result;
	}
	
	
	/**
	 * Init migrations
	 */
	function init()
	{
		/* Get database provider */
		$database = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		/* Create query log */
		$this->log = new \Runtime\ORM\QueryLog();
		/* Get migrations */
		$this->migrations = $this->getMigrations();
		/* Create table */
		$this->createTable();
		/* Load history */
		$this->loadHistory();
	}
	
	
	/**
	 * Create migrations table
	 */
	function createTable()
	{
		$q = (new \Runtime\ORM\Query())->select()->from("`information_schema`.`tables`", "t")->addRawField("count(*) as c")->where("table_schema", "=", $this->pool->getDatabaseName())->where("table_name", "=", $this->pool->getTableName("database_migrations"));
		$connection = $this->pool->getConnection();
		try
		{
			$count = $connection->fetchVar($q, "c");
			if ($count == 1) return;
			/* Create table */
			$sql = new \Runtime\Vector(
				"CREATE TABLE `" . $connection->getTableName("database_migrations") . "` (",
				"  `id` bigint(20) NOT NULL AUTO_INCREMENT,",
				"  `name` varchar(255) NOT NULL,",
				"  `gmtime_add` datetime NOT NULL,",
				"  PRIMARY KEY (`id`),",
				"  UNIQUE KEY (`name`)",
				") ENGINE=InnoDB",
			);
			$connection->executeSQL(\Runtime\rs::join("\n", $sql));
		}
		catch (Exception $e) { throw e; }
		finally
		{
			$connection->release();
		}
	}
	
	
	/**
	 * Load history
	 */
	function loadHistory()
	{
		$q = (new \Runtime\ORM\Query())->select(new \Runtime\Vector("id", "name", "gmtime_add"))->from("database_migrations")->orderBy("id", "asc");
		$connection = $this->pool->getConnection();
		try
		{
			$this->history = $connection->fetchAll($q);
			for ($i = 0; $i < $this->history->count(); $i++)
			{
				$item = $this->history->get($i);
				$this->history_cache->set($item->get("name"), $item);
			}
		}
		catch (Exception $e) { throw e; }
		finally
		{
			$connection->release();
		}
	}
	
	
	/**
	 * Returns migrations
	 */
	function getMigrations()
	{
		$items = \Runtime\rtl::getContext()->getEntities("Runtime.ORM.Annotations.Migration");
		$items = $items->map(function ($annotation){ return \Runtime\rtl::newInstance($annotation->name); });
		/* Extends items */
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$items->appendItems($item->buildMigrations());
		}
		/* Create new conection */
		$connection = $this->pool->createConnection();
		/* Make index */
		$index = new \Runtime\Map();
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$index->set($item->getName(), $item);
			/* Set connection */
			$item->setConnection($connection);
		}
		/* Add items */
		$migrations = new \Runtime\Vector();
		$cache = new \Runtime\Map();
		$addItem = null;
		$addItem = function ($item) use (&$migrations, &$cache, &$index, &$addItem)
		{
			if ($item == null) return;
			if ($cache->has($item->getName())) return;
			/* Add item to cache */
			$cache->set($item->getName(), true);
			/* Get required migrations */
			$required = $item->getRequired();
			$required = $required->map(function ($name) use (&$index){ return $index->get($name); });
			$required = $required->filter(function ($item){ return $item != null; });
			/* Add required migrations */
			for ($i = 0; $i < $required->count(); $i++)
			{
				$addItem($required->get($i));
			}
			/* Add item */
			$migrations->push($item);
		};
		for ($i = 0; $i < $items->count(); $i++)
		{
			$addItem($items->get($i));
		}
		/* Release connection */
		$connection->release();
		return $migrations;
	}
	
	
	/**
	 * Check allow migration
	 */
	function allowMigration($migration, $kind)
	{
		$name = $migration->getName();
		if ($kind == "up")
		{
			if ($this->history_cache->has($name)) return false;
			return true;
		}
		else if ($kind == "down")
		{
			if ($this->history_cache->has($name)) return true;
		}
		return false;
	}
	
	
	/**
	 * Add migration to dabase
	 */
	function addMigration($connection, $migration)
	{
		$name = $migration->getName();
		/* Insert record */
		$connection->insert("database_migrations", new \Runtime\Map([
			"name" => $name,
			"gmtime_add" => \Runtime\DateTime::now()->setOffset(0)->format(),
		]));
	}
	
	
	/**
	 * Remove migration
	 */
	function removeMigration($connection, $migration)
	{
		$name = $migration->getName();
		/* Remove record */
		$q = (new \Runtime\ORM\Query())->delete("database_migrations")->where("name", "=", $name);
		$connection->query($q);
	}
	
	
	/**
	 * Set connection
	 */
	function setConnection($connection)
	{
		for ($i = 0; $i < $this->migrations->count(); $i++)
		{
			$migration = $this->migrations->get($i);
			$migration->setConnection($connection);
		}
	}
	
	
	/**
	 * Up migrations
	 */
	function up($execute = false)
	{
		$connection = $this->createConnection($execute);
		try
		{
			$this->setConnection($connection);
			for ($i = 0; $i < $this->migrations->count(); $i++)
			{
				$migration = $this->migrations->get($i);
				/* Check allow migration */
				$allow = $this->allowMigration($migration, "up");
				if (!$allow) continue;
				/* Up migration */
				if ($migration->up)
				{
					$up = $migration->up;
					$up();
				}
				/* Add migration */
				if ($execute)
				{
					$this->addMigration($connection, $migration);
				}
			}
		}
		catch (Exception $e) { throw e; }
		finally
		{
			$connection->release();
		}
	}
	
	
	/**
	 * Down migrations
	 */
	function down($execute = false)
	{
		$connection = $this->createConnection($execute);
		try
		{
			$this->setConnection($connection);
			for ($i = $this->migrations->count() - 1; $i >= 0; $i--)
			{
				$migration = $this->migrations->get($i);
				/* Check allow migration */
				$allow = $this->allowMigration($migration, "down");
				if (!$allow) continue;
				/* Down */
				if ($migration->down)
				{
					$down = $migration->down;
					$down();
				}
				/* Remove migration */
				if ($execute)
				{
					$this->removeMigration($connection, $migration);
				}
			}
		}
		catch (Exception $e) { throw e; }
		finally
		{
			$connection->release();
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->log = null;
		$this->pool = null;
		$this->migrations = null;
		$this->history = new \Runtime\Vector();
		$this->history_cache = new \Runtime\Map();
	}
	static function getClassName(){ return "Runtime.ORM.MigrationBuilder"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}