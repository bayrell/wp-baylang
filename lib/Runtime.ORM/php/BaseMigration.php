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
class BaseMigration extends \Runtime\BaseObject
{
	public $name;
	public $connection;
	public $required;
	public $migrations;
	public $up;
	public $down;
	function __construct($params=null)
	{
		parent::__construct();
		$this->_assign_values($params);
	}
	/**
	 * Set connection
	 */
	function setConnection($connection)
	{
		$this->connection = $connection;
	}
	/**
	 * Returns name
	 */
	function getName()
	{
		return $this->name;
	}
	/**
	 * Returns required migrations
	 */
	function getRequired()
	{
		return $this->required->copy();
	}
	/**
	 * Returns migrations
	 */
	function getMigrations()
	{
		return $this->migrations->copy();
	}
	/**
	 * Returns migrations
	 */
	function buildMigrations()
	{
		$current_name = $this->name;
		$result = \Runtime\Vector::from([]);
		$prev_required = $this->getRequired();
		/* Add child migrations */
		$items = $this->getMigrations();
		for ($i = 0; $i < $items->count(); $i++)
		{
			$migration_name = $items->get($i);
			$f = new \Runtime\Callback($this, $items->get($i));
			if (!$f->exists())
			{
				continue;
			}
			/* Get migration */
			$migration = $f->apply();
			$migration->name = $this->name . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($migration_name);
			$migration->required = $migration->required->concat($prev_required);
			$prev_required = \Runtime\Vector::from([$migration->name]);
			/* Build migrations */
			$result->appendItems($migration->buildMigrations());
			/* Add new migration */
			$result->push($migration);
		}
		/* Change require */
		$this->required = $prev_required;
		return $result;
	}
	/**
	 * Comment
	 */
	function comment($text)
	{
		$this->executeSQL("-- " . \Runtime\rtl::toStr($text));
	}
	/**
	 * Execute raw SQL
	 */
	function executeSQL($sql, $data=null)
	{
		if ($sql instanceof \Runtime\Collection)
		{
			$sql = \Runtime\rs::join("\n", $sql);
		}
		$q = new \Runtime\ORM\Query();
		$q->raw($sql, $data);
		$this->connection->execute($q);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->name = "";
		$this->connection = null;
		$this->required = \Runtime\Vector::from([]);
		$this->migrations = \Runtime\Vector::from([]);
		$this->up = null;
		$this->down = null;
	}
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.BaseMigration";
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