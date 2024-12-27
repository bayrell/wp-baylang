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
	 * Returns table annotations
	 */
	function getAnotations($table_name)
	{
		if (!$this->tables->has($table_name))
		{
			return \Runtime\Vector::from([]);
		}
		return \Runtime\rtl::attr($this->tables, [$table_name, "annotations"]);
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
	function addTable($table, $rules)
	{
		$table_name = $table->name;
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = $rules->get($i);
			$rule = \Runtime\rtl::setAttr($rule, ["table_name_source"], $table_name);
			$rules->set($i, $rule);
		}
		$this->tables->set($table_name, \Runtime\Map::from(["annotations"=>$rules->toCollection(),"table"=>$table]));
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
		$items = \Runtime\rtl::getContext()->getEntities("Runtime.ORM.Annotations.Database");
		for ($i = 0; $i < $items->count(); $i++)
		{
			$db = \Runtime\rtl::attr($items, $i);
			$class_name = $db->name;
			$getMethodsList = new \Runtime\Callback($class_name, "getMethodsList");
			$getMethodInfoByName = new \Runtime\Callback($class_name, "getMethodInfoByName");
			$methods = \Runtime\rtl::apply($getMethodsList);
			for ($j = 0; $j < $methods->count(); $j++)
			{
				$method_name = \Runtime\rtl::attr($methods, $j);
				$info = \Runtime\rtl::apply($getMethodInfoByName, \Runtime\Vector::from([$method_name]));
				/* Get methods annotations */
				$annotations = $info->get("annotations");
				if ($annotations)
				{
					$table = $annotations->findItem(\Runtime\lib::isInstance("Runtime.ORM.Annotations.Table"));
					if ($table)
					{
						$rules = \Runtime\rtl::apply(new \Runtime\Callback($class_name, $method_name));
						$this->addTable($table, $rules);
					}
				}
			}
		}
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