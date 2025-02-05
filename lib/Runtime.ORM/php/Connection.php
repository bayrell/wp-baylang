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
class Connection
{
	public $name;
	public $cursor;
	public $log;
	function __construct($name="")
	{
		$this->name = $name;
	}
	/**
	 * Returns connection
	 */
	static function get($name="default")
	{
		return static::getConnection($name);
	}
	static function getConnection($name="default")
	{
		if ($name == "")
		{
			$name = "default";
		}
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		$conn = $provider->getConnection($name);
		return $conn;
	}
	/**
	 * Set cursor factory
	 */
	function setCursorFactory($factory)
	{
		$this->cursor = $factory;
	}
	/**
	 * Set query log
	 */
	function setQueryLog($value)
	{
		$this->log = $value;
	}
	/**
	 * Returns query log
	 */
	function getQueryLog()
	{
		return $this->log;
	}
	/**
	 * Connect
	 */
	function connect()
	{
	}
	/**
	 * Check is connected
	 */
	function isConnected()
	{
		return false;
	}
	/**
	 * Returns connection name
	 */
	function getName()
	{
		return $this->name;
	}
	/**
	 * Create new cursor
	 */
	function createCursor()
	{
		if (!$this->cursor)
		{
			return ;
		}
		$cursor = $this->cursor->createCursor();
		$cursor->setConnection($this);
		return $cursor;
	}
	/**
	 * Fork connection
	 */
	function fork()
	{
		return \Runtime\rtl::newInstance(static::getClassName());
	}
	/**
	 * Prepare field
	 */
	function prepareField($item)
	{
		return $item;
	}
	/**
	 * Prepare value
	 */
	function prepareValue($item, $op)
	{
		return $item;
	}
	/**
	 * Quote
	 */
	function quote($value)
	{
		return $value;
	}
	/**
	 * Returns table name
	 */
	function getTableName($table_name)
	{
		return $this->prefix . \Runtime\rtl::toStr($table_name);
	}
	/**
	 * Execute Query
	 */
	function execute($q, $params=null)
	{
		return null;
	}
	/**
	 * Insert query
	 */
	function insert($table_name, $insert_data, $get_last_id=true, $params=null)
	{
		$last_id = null;
		if ($table_name == "")
		{
			throw new \Runtime\Exceptions\RuntimeException("Table name is empty");
		}
		$q = (new \Runtime\ORM\Query())->insert($table_name)->values($insert_data);
		$c = $this->execute($q, $params);
		if ($get_last_id)
		{
			$last_id = $c->lastInsertId();
		}
		$c->close();
		return $last_id;
	}
	/**
	 * Update query
	 */
	function update($table_name, $filter, $update_data, $params=null)
	{
		if ($table_name == "")
		{
			throw new \Runtime\Exceptions\RuntimeException("Table name is empty");
		}
		$q = (new \Runtime\ORM\Query())->update($table_name)->values($update_data)->setFilter($filter);
		$c = $this->execute($q, $params);
		$c->close();
	}
	/**
	 * Delete item
	 */
	function delete($table_name, $filter, $params=null)
	{
		if ($table_name == "")
		{
			throw new \Runtime\Exceptions\RuntimeException("Table name is empty");
		}
		$__v0 = new \Runtime\Monad(new \Runtime\ORM\Query());
		$__v0 = $__v0->callMethod("delete", [$table_name]);
		$__v0 = $__v0->callMethod("setFilter", [$filter]);
		$q = $__v0->value();
		$c = $this->execute($q, $params);
		$c->close();
	}
	/**
	 * Convert item from database
	 */
	function fromDatabase($annotation, $item, $field_name)
	{
		return $item;
	}
	/**
	 * Convert item to database
	 */
	function toDatabase($annotation, $item, $field_name)
	{
		return $item;
	}
	/**
	 * Fetch all
	 */
	function fetchAll($q, $params=null)
	{
		$c = $this->execute($q, $params);
		$items = $c->fetchAll();
		$c->close();
		return $items;
	}
	/**
	 * Fetch
	 */
	function fetch($q, $params=null)
	{
		$c = $this->execute($q, $params);
		$items = $c->fetch();
		$c->close();
		return $items;
	}
	function fetchOne($q, $params=null)
	{
		return $this->fetch($q, $params);
	}
	/**
	 * Fetch variable
	 */
	function fetchVar($q, $var_name, $params=null)
	{
		$cursor = $this->execute($q, $params);
		$item = $cursor->fetchVar($var_name);
		$cursor->close();
		return $item;
	}
	/**
	 * Find relation by query
	 */
	function findRelation($q, $params=null)
	{
		$c = $this->execute($q, $params);
		$item = $c->fetchRelation($q, $params);
		$c->close();
		return $item;
	}
	/**
	 * Find relations by query
	 */
	function findRelations($q, $params=null)
	{
		$c = $this->execute($q, $params);
		$items = $c->fetchAll($q, $params);
		$c->close();
		return $items->toRelation();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		$this->name = "";
		$this->cursor = null;
		$this->log = null;
	}
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Connection";
	}
	static function getParentClassName()
	{
		return "";
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