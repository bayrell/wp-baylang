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
class Relation extends \Runtime\BaseObject implements \Runtime\MapInterface
{
	public $table_name;
	public $old_data;
	public $new_data;
	function __construct($table_name)
	{
		parent::__construct();
		if ($table_name == "")
		{
			throw new \Runtime\Exceptions\RuntimeException("Table name is empty");
		}
		$this->table_name = $table_name;
	}
	/**
	 * Returns table name
	 */
	function getTableName()
	{
		return $this->table_name;
	}
	/**
	 * Create Instance of class
	 */
	static function newInstance($table_name, $data=null)
	{
		$instance = \Runtime\rtl::newInstance(static::getClassName(), \Runtime\Vector::from([$table_name]));
		$instance->_setNewData($data);
		return $instance;
	}
	/**
	 * Convert to model
	 */
	function toModel($class_name)
	{
		return \Runtime\rtl::newInstance($class_name, \Runtime\Vector::from([$this->toMap()]));
	}
	/**
	 * Convert to Dict
	 */
	function all()
	{
		return $this->new_data->clone();
	}
	function toMap()
	{
		return $this->new_data->clone();
	}
	function intersect($fields=null)
	{
		return $this->new_data->intersect($fields);
	}
	/**
	 * Returns table annotations
	 */
	static function getAnotations($table_name)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.ORM.Relation.getAnotations", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		$__memorize_value = $provider->getAnotations($table_name);
		\Runtime\rtl::_memorizeSave("Runtime.ORM.Relation.getAnotations", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * To database
	 */
	static function toDatabase($table_name, $conn, $data, $is_update)
	{
		if ($data == null)
		{
			return null;
		}
		$annotations = static::getAnotations($table_name);
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
	static function fromDatabase($table_name, $conn, $data)
	{
		if ($data == null)
		{
			return null;
		}
		$annotations = static::getAnotations($table_name);
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
	static function getAutoIncrement($table_name)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.ORM.Relation.getAutoIncrement", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$annotations = static::getAnotations($table_name);
		$annotation = $annotations->findItem(\Runtime\lib::isInstance("Runtime.ORM.Annotations.AutoIncrement"));
		$__memorize_value = $annotation;
		\Runtime\rtl::_memorizeSave("Runtime.ORM.Relation.getAutoIncrement", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Returns primary keys of table
	 */
	static function getPrimaryKeys($table_name)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.ORM.Relation.getPrimaryKeys", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		/* Get primary annotation */
		$annotations = static::getAnotations($table_name);
		$primary = $annotations->findItem(\Runtime\lib::isInstance("Runtime.ORM.Annotations.Primary"));
		if ($primary == null)
		{
			$__memorize_value = null;
			\Runtime\rtl::_memorizeSave("Runtime.ORM.Relation.getPrimaryKeys", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		$__memorize_value = $primary->keys;
		\Runtime\rtl::_memorizeSave("Runtime.ORM.Relation.getPrimaryKeys", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Returns primary data
	 */
	static function getPrimaryFromData($table_name, $data)
	{
		/* Get primary annotation */
		$primary_keys = static::getPrimaryKeys($table_name);
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
	static function getPrimaryFilter($table_name, $data, $use_alias=true)
	{
		$pk = static::getPrimaryFromData($table_name, $data);
		$filter = $pk->transition(function ($value, $key) use (&$table_name,&$use_alias)
		{
			$item = new \Runtime\ORM\QueryFilter();
			$item->key = $key;
			$item->op = "=";
			$item->value = $value;
			if ($use_alias)
			{
				$item->key = $table_name . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($key);
			}
			return $item;
		});
		return $filter;
	}
	/**
	 * Returns primary key
	 */
	function getPrimaryKey()
	{
		return static::getPrimaryFromData($this->table_name, $this->new_data);
	}
	/**
	 * Returns primary key
	 */
	function pk()
	{
		return static::getPrimaryFromData($this->table_name, $this->new_data);
	}
	/**
	 * Get updated data
	 */
	function getUpdatedData()
	{
		if ($this->new_data == null)
		{
			return \Runtime\Map::from([]);
		}
		$res = new \Runtime\Map();
		$new_data_keys = $this->new_data->keys();
		for ($i = 0; $i < $new_data_keys->count(); $i++)
		{
			$field_name = \Runtime\rtl::attr($new_data_keys, $i);
			$new_value = \Runtime\rtl::attr($this->new_data, $field_name);
			if ($this->old_data == null)
			{
				$res->set($field_name, $new_value);
			}
			else
			{
				if (!$this->old_data->has($field_name))
				{
					$res->set($field_name, $new_value);
				}
				else
				{
					$old_value = \Runtime\rtl::attr($this->old_data, $field_name);
					if ($new_value != $old_value)
					{
						$res->set($field_name, $new_value);
					}
				}
			}
		}
		return $res;
	}
	/**
	 * Set new data
	 */
	function _setNewData($data=null)
	{
		$this->old_data = ($data != null) ? (new \Runtime\Map($data)) : (null);
		$this->new_data = ($data != null) ? (new \Runtime\Map($data)) : (new \Runtime\Map());
	}
	/**
	 * Returns true if object is new
	 */
	function isNew()
	{
		return ($this->old_data) ? (false) : (true);
	}
	/**
	 * Returns true if data has loaded from database
	 */
	function isUpdate()
	{
		return ($this->old_data) ? (true) : (false);
	}
	/**
	 * Returns true if model is changed
	 */
	function isChanged()
	{
		$d1 = $this->old_data;
		$d2 = $this->new_data;
		if ($d1 == null)
		{
			return true;
		}
		if ($d2 == null)
		{
			return true;
		}
		$d1_keys = $d1->keys();
		$d2_keys = $d2->keys();
		for ($i = 0; $i < $d1_keys->count(); $i++)
		{
			$key1 = $d1_keys->get($i);
			if (!$d2->has($key1))
			{
				return true;
			}
			$value1 = $d1->get($key1);
			$value2 = $d2->get($key1);
			if ($value1 != $value2)
			{
				return true;
			}
		}
		for ($i = 0; $i < $d2_keys->count(); $i++)
		{
			$key2 = $d2_keys->get($i);
			if (!$d1->has($key2))
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * Update data
	 */
	function updateData($item)
	{
		$item->each(function ($value, $key)
		{
			$this->set($key, $value);
		});
	}
	/**
	 * Save model
	 */
	function save($conn, $params=null)
	{
		/* Call before save */
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\ORM\DatabaseSchema::SAVE_BEFORE, \Runtime\Map::from(["item"=>$this]));
		$is_update = $this->isUpdate();
		$updated_data = $this->getUpdatedData();
		if ($is_update)
		{
			$updated_data_keys = $updated_data->keys();
			if ($updated_data_keys->count() > 0)
			{
				$filter = static::getPrimaryFilter($this->table_name, $this->old_data, false);
				if ($filter->count() > 0)
				{
					$db_updated_data = static::toDatabase($this->table_name, $conn, $updated_data, $is_update);
					$conn->update($this->table_name, $filter, $db_updated_data, $params);
				}
				else
				{
					throw new \Runtime\Exceptions\RuntimeException("Primary key does not exists in " . \Runtime\rtl::toStr($this->table_name));
				}
				for ($i = 0; $i < $updated_data_keys->count(); $i++)
				{
					$field_name = \Runtime\rtl::attr($updated_data_keys, $i);
					$this->old_data->set($field_name, \Runtime\rtl::attr($updated_data, $field_name));
				}
			}
		}
		else
		{
			$db_updated_data = static::toDatabase($this->table_name, $conn, $updated_data, $is_update);
			$last_id = $conn->insert($this->table_name, $db_updated_data, true, $params);
			$this->_setNewData($this->new_data);
			$auto_increment = static::getAutoIncrement($this->table_name);
			if ($auto_increment && $auto_increment->name)
			{
				$this->old_data->set($auto_increment->name, $last_id);
				$this->new_data->set($auto_increment->name, $last_id);
			}
		}
		/* Call before after */
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\ORM\DatabaseSchema::SAVE_AFTER, \Runtime\Map::from(["item"=>$this]));
	}
	/**
	 * Delete model
	 */
	function delete($conn, $params=null)
	{
		if ($this->isNew())
		{
			return ;
		}
		$filter = static::getPrimaryFilter($this->table_name, $this->old_data, false);
		if ($filter->count() > 0)
		{
			$conn->delete($this->table_name, $filter, $params);
		}
		else
		{
			throw new \Runtime\Exceptions\RuntimeException("Primary key does not exists in " . \Runtime\rtl::toStr($this->table_name));
		}
		return $this;
	}
	/**
	 * Refresh model from database
	 */
	function refresh($conn, $params=null)
	{
		$item = null;
		$filter = static::getPrimaryFilter($this->table_name, $this->old_data, false);
		if ($filter->count() > 0)
		{
			$q = (new \Runtime\ORM\Query())->select(\Runtime\Vector::from([$this->table_name . \Runtime\rtl::toStr(".*")]))->from($this->table_name)->setFilter($filter)->limit(1);
			$item = $conn->fetchOne($q, $params);
		}
		if ($item)
		{
			$this->_setNewData($item->toDict());
		}
		return $this;
	}
	/**
	 * Returns value
	 */
	function get($name, $def_value=null)
	{
		return $this->new_data->get($name, $def_value);
	}
	/**
	 * Set new value
	 */
	function set($name, $value)
	{
		$this->new_data->set($name, $value);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->table_name = "";
		$this->old_data = null;
		$this->new_data = new \Runtime\Map();
	}
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Relation";
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