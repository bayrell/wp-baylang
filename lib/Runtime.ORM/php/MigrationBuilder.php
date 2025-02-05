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
class MigrationBuilder extends \Runtime\BaseObject
{
	public $connection;
	public $connection_query;
	public $migrations;
	public $connection_name;
	public $execute;
	public $history;
	public $history_cache;
	function __construct($connection_name="default")
	{
		parent::__construct();
		$this->connection_name = $connection_name;
	}
	/**
	 * Returns query log
	 */
	function getQueryLog()
	{
		return $this->connection_query->getQueryLog();
	}
	/**
	 * Returns SQL query
	 */
	function getSQL()
	{
		$items = $this->getQueryLog()->map(\Runtime\lib::attr("sql"));
		$result = \Runtime\Vector::from([]);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$is_comment = \Runtime\rs::substr($item, 0, 2) == "--";
			if ($is_comment)
			{
				if ($i != 0)
				{
					$result->push("");
				}
			}
			else
			{
				$item .= \Runtime\rtl::toStr(";");
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
		/* Fork connection */
		$this->connection = $database->getConnection($this->connection_name);
		$this->connection_query = $this->connection->fork();
		/* Set query log */
		$this->connection_query->setQueryLog(new \Runtime\ORM\QueryLog());
		/* Execute migration */
		if (!$this->execute)
		{
			$this->connection_query->setCursorFactory(new \Runtime\ORM\Factory\CursorFactory("Runtime.ORM.Cursor"));
		}
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
		$q = (new \Runtime\ORM\Query())->select()->from("`information_schema`.`tables`", "t")->addRawField("count(*) as c")->where("table_schema", "=", $this->connection->database)->where("table_name", "=", $this->connection->getTableName("database_migrations"));
		$cursor = $this->connection->execute($q);
		$count = $cursor->fetchVar("c");
		$cursor->close();
		if ($count == 1)
		{
			return ;
		}
		/* Create table */
		$sql = \Runtime\Vector::from(["CREATE TABLE `" . \Runtime\rtl::toStr($this->connection->getTableName("database_migrations")) . \Runtime\rtl::toStr("` ("),"  `id` bigint(20) NOT NULL AUTO_INCREMENT,","  `name` varchar(255) NOT NULL,","  `gmtime_add` datetime NOT NULL,","  PRIMARY KEY (`id`),","  UNIQUE KEY name (`name`)",") ENGINE=InnoDB"]);
		$this->connection->executeSQL(\Runtime\rs::join("\n", $sql));
	}
	/**
	 * Load history
	 */
	function loadHistory()
	{
		$q = (new \Runtime\ORM\Query())->select(\Runtime\Vector::from(["id","name","gmtime_add"]))->from("database_migrations")->orderBy("id", "asc");
		$this->history = $this->connection->fetchAll($q)->toDict();
		for ($i = 0; $i < $this->history->count(); $i++)
		{
			$item = $this->history->get($i);
			$this->history_cache->set($item->get("name"), $item);
		}
	}
	/**
	 * Returns migrations
	 */
	function getMigrations()
	{
		$items = \Runtime\rtl::getContext()->getEntities("Runtime.ORM.Annotations.Migration");
		$items = $items->map(function ($annotation)
		{
			return \Runtime\rtl::newInstance($annotation->name);
		});
		/* Extends items */
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$items->appendItems($item->buildMigrations());
		}
		/* Make index */
		$index = \Runtime\Map::from([]);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$index->set($item->getName(), $item);
			/* Set connection */
			$item->setConnection($this->connection_query);
		}
		/* Add items */
		$migrations = \Runtime\Vector::from([]);
		$cache = \Runtime\Map::from([]);
		$addItem = null;
		$addItem = function ($item) use (&$migrations,&$cache,&$index,&$addItem)
		{
			if ($item == null)
			{
				return ;
			}
			if ($cache->has($item->getName()))
			{
				return ;
			}
			/* Add item to cache */
			$cache->set($item->getName(), true);
			/* Get required migrations */
			$required = $item->getRequired();
			$required = $required->map(function ($name) use (&$index)
			{
				return $index->get($name);
			});
			$required = $required->filter(\Runtime\lib::equalNot(null));
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
			if ($this->history_cache->has($name))
			{
				return false;
			}
			return true;
		}
		else if ($kind == "down")
		{
			if ($this->history_cache->has($name))
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * Add migration to dabase
	 */
	function addMigration($migration)
	{
		$name = $migration->getName();
		/* Insert record */
		$this->connection->insert("database_migrations", \Runtime\Map::from(["name"=>$name,"gmtime_add"=>\Runtime\DateTime::now()->setOffset(0)->getDateTimeString()]));
	}
	/**
	 * Remove migration
	 */
	function removeMigration($migration)
	{
		$name = $migration->getName();
		/* Remove record */
		$q = (new \Runtime\ORM\Query())->delete("database_migrations")->where("name", "=", $name);
		$c = $this->connection->execute($q);
		$c->close();
	}
	/**
	 * Up migrations
	 */
	function up()
	{
		for ($i = 0; $i < $this->migrations->count(); $i++)
		{
			$migration = $this->migrations->get($i);
			/* Check allow migration */
			$allow = $this->allowMigration($migration, "up");
			if ($allow == 0)
			{
				continue;
			}
			/* Up migration */
			if ($migration->up)
			{
				\Runtime\rtl::apply($migration->up);
			}
			/* Add migration */
			if ($this->execute)
			{
				$this->addMigration($migration);
			}
		}
	}
	/**
	 * Down migrations
	 */
	function down()
	{
		for ($i = $this->migrations->count() - 1; $i >= 0; $i--)
		{
			$migration = $this->migrations->get($i);
			/* Check allow migration */
			$allow = $this->allowMigration($migration, "down");
			if ($allow == 0)
			{
				continue;
			}
			/* Down */
			if ($migration->down)
			{
				\Runtime\rtl::apply($migration->down);
			}
			/* Remove migration */
			if ($this->execute)
			{
				$this->removeMigration($migration);
			}
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->connection = null;
		$this->connection_query = null;
		$this->migrations = null;
		$this->connection_name = "";
		$this->execute = false;
		$this->history = \Runtime\Vector::from([]);
		$this->history_cache = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.MigrationBuilder";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}