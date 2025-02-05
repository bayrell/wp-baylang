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
class Provider extends \Runtime\BaseProvider
{
	public $foreign_keys;
	public $connection_list;
	public $tables;
	/**
	 * Returns connection
	 */
	function getConnection($name)
	{
		if (!$this->connection_list->has($name))
		{
			throw new \Runtime\Exceptions\RuntimeException("Connection " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr(" not found"));
		}
		return \Runtime\rtl::attr($this->connection_list, $name);
	}
	/**
	 * Add new connection
	 */
	function addConnection($conn)
	{
		$this->connection_list->set($conn->getName(), $conn);
	}
	/**
	 * Returns relation name by table name
	 */
	function getRelationName($table_name)
	{
		if (!$this->tables->has($table_name))
		{
			return "";
		}
		return $this->tables->get($table_name)->get("class_name");
	}
	/**
	 * Returns table annotations
	 */
	function getAnotations($table_name)
	{
		if (!$this->tables->has($table_name))
		{
			return \Runtime\Vector::from([]);
		}
		return $this->tables->get($table_name)->get("annotations");
	}
	/**
	 * To database
	 */
	function toDatabase($table_name, $conn, $data, $is_update)
	{
		if ($data == null)
		{
			return null;
		}
		$annotations = $this->getAnotations($table_name);
		for ($i = 0; $i < $annotations->count(); $i++)
		{
			$annotation = \Runtime\rtl::attr($annotations, $i);
			if ($annotation instanceof \Runtime\ORM\Annotations\BaseType)
			{
				$data = $annotation->toDatabase($conn, $data, $is_update);
			}
		}
		return $data;
	}
	/**
	 * From database
	 */
	function fromDatabase($table_name, $conn, $data)
	{
		if ($data == null)
		{
			return null;
		}
		$annotations = $this->getAnotations($table_name);
		for ($i = 0; $i < $annotations->count(); $i++)
		{
			$annotation = \Runtime\rtl::attr($annotations, $i);
			if ($annotation instanceof \Runtime\ORM\Annotations\BaseType)
			{
				$data = $annotation->fromDatabase($conn, $data);
			}
		}
		return $data;
	}
	/**
	 * Returns true if primary key is auto increment
	 */
	function getAutoIncrement($table_name)
	{
		$annotations = $this->getAnotations($table_name);
		$annotation = $annotations->findItem(\Runtime\lib::isInstance("Runtime.ORM.Annotations.AutoIncrement"));
		return $annotation;
	}
	/**
	 * Returns primary key names of table
	 */
	function getPrimaryKeyNames($table_name)
	{
		/* Get primary annotation */
		$annotations = $this->getAnotations($table_name);
		$primary = $annotations->findItem(\Runtime\lib::isInstance("Runtime.ORM.Annotations.Primary"));
		if ($primary == null)
		{
			return null;
		}
		return $primary->keys;
	}
	/**
	 * Returns primary data
	 */
	function getPrimaryFromData($table_name, $data)
	{
		/* Get primary annotation */
		$primary_keys = $this->getPrimaryKeyNames($table_name);
		/* Check if primary keys if exists */
		if ($primary_keys == null)
		{
			throw new \Runtime\Exceptions\ItemNotFound($table_name, "Primary keys");
		}
		/* Intersect values */
		return ($data) ? ($data->intersect($primary_keys, false)) : (\Runtime\Map::from([]));
	}
	/**
	 * Returns primary filter by data
	 */
	function getPrimaryFilter($table_name, $data, $use_full_key=true)
	{
		$pk = $this->getPrimaryFromData($table_name, $data);
		$filter = $pk->transition(function ($value, $key) use (&$table_name,&$use_full_key)
		{
			$item = new \Runtime\ORM\QueryFilter();
			$item->key = $key;
			$item->op = "=";
			$item->value = $value;
			if ($use_full_key)
			{
				$item->key = $table_name . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($key);
			}
			return $item;
		});
		return $filter;
	}
	/**
	 * Returns foreign_key by name
	 */
	function getForeignKey($name)
	{
		if (!$this->foreign_keys->has($name))
		{
			return null;
		}
		return $this->foreign_keys->get($name);
	}
	/**
	 * Returns fields from table
	 */
	function getFieldType($table_name, $field_name)
	{
		$annotations = static::getAnotations($table_name);
		for ($i = 0; $i < $annotations->count(); $i++)
		{
			$annotation = \Runtime\rtl::attr($annotations, $i);
			if ($annotation instanceof \Runtime\ORM\Annotations\BaseType)
			{
				if ($annotation->name == $field_name)
				{
					return $annotation;
				}
			}
		}
		return null;
	}
	/**
	 * Add table
	 */
	function addTable($table_name, $class_name, $rules)
	{
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = $rules->get($i);
			$rule = \Runtime\rtl::setAttr($rule, ["class_name"], $class_name);
			$rule = \Runtime\rtl::setAttr($rule, ["table_name"], $table_name);
			$rules->set($i, $rule);
		}
		$this->tables->set($table_name, \Runtime\Map::from(["annotations"=>$rules->toCollection(),"class_name"=>$class_name,"table_name"=>$table_name]));
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = $rules->get($i);
			if ($rule instanceof \Runtime\ORM\Annotations\ForeignKey)
			{
				if ($rule->name != "")
				{
					if ($this->foreign_keys->has($rule->name))
					{
						throw new \Runtime\Exceptions\RuntimeException("Duplicate foreign_key name");
					}
					$this->foreign_keys->set($rule->name, $rule);
				}
			}
		}
	}
	/**
	 * Start provider
	 */
	function start()
	{
		parent::start();
		$this->registerTables();
		$this->registerConnections();
	}
	/**
	 * Register tables
	 */
	function registerTables()
	{
		$items = \Runtime\rtl::getContext()->getEntities("Runtime.ORM.Annotations.Table");
		for ($i = 0; $i < $items->count(); $i++)
		{
			$table = \Runtime\rtl::attr($items, $i);
			$class_name = $table->name;
			$table_name = (new \Runtime\Callback($class_name, "getTableName"))->apply();
			/* Add schema */
			$rules = (new \Runtime\Callback($class_name, "schema"))->apply();
			$this->addTable($table_name, $class_name, $rules);
		}
		/* Call register event */
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\ORM\DatabaseSchema::REGISTER, \Runtime\Map::from(["item"=>$this]));
	}
	/**
	 * Register connections
	 */
	function registerConnections()
	{
		$items = \Runtime\rtl::getContext()->getEntities("Runtime.ORM.Factory.ConnectionFactory");
		for ($i = 0; $i < $items->count(); $i++)
		{
			$factory = $items->get($i);
			$factory->registerConnections($this);
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->foreign_keys = new \Runtime\Map();
		$this->connection_list = new \Runtime\Map();
		$this->tables = new \Runtime\Map();
	}
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Provider";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseProvider";
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