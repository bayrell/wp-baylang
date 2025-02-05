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
	public $old_data;
	public $new_data;
	function __construct()
	{
		parent::__construct();
	}
	/**
	 * Returns table name
	 */
	static function getTableName()
	{
		return "";
	}
	/**
     * Returns table schema
     */
	static function schema()
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.ORM.Relation.schema", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = "";
		\Runtime\rtl::_memorizeSave("Runtime.ORM.Relation.schema", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Create Instance of class
	 */
	static function newInstance($class_name, $data=null)
	{
		if ($class_name == "")
		{
			throw new \Runtime\Exceptions\RuntimeException("Class name does not exists");
		}
		$instance = \Runtime\rtl::newInstance($class_name);
		$instance->_initData($data);
		return $instance;
	}
	/**
	 * Convert to model
	 */
	function toModel()
	{
		return static::newInstance(static::getClassName(), $this->toMap());
	}
	/**
	 * Convert to Dict
	 */
	function all()
	{
		return $this->new_data->clone();
	}
	function old()
	{
		return $this->old_data->clone();
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
	static function getAnotations()
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		return $provider->getAnotations(static::getTableName());
	}
	/**
	 * To database
	 */
	static function toDatabase($conn, $data, $is_update)
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		return $provider->toDatabase(static::getTableName(), $conn, $data, $is_update);
	}
	/**
	 * From database
	 */
	static function fromDatabase($conn, $data)
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		return $provider->fromDatabase(static::getTableName(), $conn, $data);
	}
	/**
	 * Returns true if primary key is auto increment
	 */
	static function getAutoIncrement()
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		return $provider->getAutoIncrement(static::getTableName());
	}
	/**
	 * Returns primary key names of table
	 */
	static function getPrimaryKeyNames()
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		return $provider->getPrimaryKeyNames(static::getTableName());
	}
	/**
	 * Returns primary data
	 */
	static function getPrimaryFromData($data)
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		return $provider->getPrimaryFromData(static::getTableName(), $data);
	}
	/**
	 * Returns primary filter by data
	 */
	static function getPrimaryFilter($data, $use_full_key=true)
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		return $provider->getPrimaryFilter(static::getTableName(), $data, $use_full_key);
	}
	/**
	 * Returns primary key
	 */
	function getPrimaryKey()
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		return $provider->getPrimaryFromData(static::getTableName(), $this->new_data);
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
	 * Init data
	 */
	function _initData($data=null)
	{
		$this->old_data = ($data != null) ? (new \Runtime\Map($data)) : (null);
		$this->new_data = ($data != null) ? (new \Runtime\Map($data)) : (new \Runtime\Map());
	}
	/**
	 * Set data
	 */
	function setData($item)
	{
		$item->each(function ($value, $key)
		{
			$this->set($key, $value);
		});
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
	 * Save model
	 */
	function save($conn, $params=null)
	{
		$table_name = static::getTableName();
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		/* Call before save */
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\ORM\DatabaseSchema::SAVE_BEFORE, \Runtime\Map::from(["item"=>$this]));
		$is_update = $this->isUpdate();
		$updated_data = $this->getUpdatedData();
		if ($is_update)
		{
			$updated_data_keys = $updated_data->keys();
			if ($updated_data_keys->count() > 0)
			{
				$filter = $provider->getPrimaryFilter($table_name, $this->old_data, false);
				if ($filter->count() > 0)
				{
					$db_updated_data = $provider->toDatabase($table_name, $conn, $updated_data, $is_update);
					$conn->update($table_name, $filter, $db_updated_data, $params);
				}
				else
				{
					throw new \Runtime\Exceptions\RuntimeException("Primary key does not exists in " . \Runtime\rtl::toStr($table_name));
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
			$db_updated_data = $provider->toDatabase($table_name, $conn, $updated_data, $is_update);
			$last_id = $conn->insert($table_name, $db_updated_data, true, $params);
			$this->_initData($this->new_data);
			$auto_increment = $provider->getAutoIncrement($table_name);
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
		/* Get provider */
		$table_name = static::getTableName();
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		/* Get primary filter */
		$filter = $provider->getPrimaryFilter($table_name, $this->old_data, false);
		/* Delete record */
		if ($filter->count() > 0)
		{
			$conn->delete($table_name, $filter, $params);
		}
		else
		{
			throw new \Runtime\Exceptions\RuntimeException("Primary key does not exists in " . \Runtime\rtl::toStr($table_name));
		}
		return $this;
	}
	/**
	 * Refresh model from database
	 */
	function refresh($conn, $params=null)
	{
		$table_name = static::getTableName();
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		$item = null;
		$filter = $provider->getPrimaryFilter($table_name, $this->old_data, false);
		if ($filter->count() > 0)
		{
			$q = (new \Runtime\ORM\Query())->select(\Runtime\Vector::from([$table_name . \Runtime\rtl::toStr(".*")]))->from($table_name)->setFilter($filter)->limit(1);
			$item = $conn->fetchOne($q, $params);
		}
		if ($item)
		{
			$this->_initData($item->toDict());
		}
		return $this;
	}
	/**
	 * Returns query
	 */
	static function query()
	{
		return (new \Runtime\ORM\Query())->relation(static::getClassName());
	}
	/**
	 * Returns select query
	 */
	static function select()
	{
		return (new \Runtime\ORM\Query())->relation(static::getClassName())->select(\Runtime\Vector::from([static::getTableName() . \Runtime\rtl::toStr(".*")]));
	}
	/**
	 * Find relations by filter
	 */
	static function findItems($conn, $filter, $params=null)
	{
		$table_name = static::getTableName();
		$q = static::query()->select(\Runtime\Vector::from([$table_name . \Runtime\rtl::toStr(".*")]))->setFilter($filter);
		return $conn->findRelations($q, $params);
	}
	/**
	 * Find relation by filter
	 */
	static function findByFilter($conn, $filter, $params=null)
	{
		$table_name = static::getTableName();
		$q = static::query()->select(\Runtime\Vector::from([$table_name . \Runtime\rtl::toStr(".*")]))->setFilter($filter)->limit(1);
		return $conn->findRelation($q, $params);
	}
	/**
	 * Find relation by primary key
	 */
	static function findByPk($conn, $pk, $params=null)
	{
		/* Returns primary filter */
		$filter = static::getPrimaryFilter($pk, false);
		/* Find relation */
		return static::findByFilter($conn, $filter, $params);
	}
	/**
	 * Find relation by object
	 */
	static function findById($conn, $id, $params=null)
	{
		/* Get primary keys */
		$pk = static::getPrimaryKeyNames();
		$pk_name = $pk->get(0);
		/* Build filter */
		$filter = \Runtime\Vector::from([new \Runtime\ORM\QueryFilter($pk_name, "=", $id)]);
		/* Find relation */
		return static::findByFilter($conn, $filter, $params);
	}
	/**
	 * Find or create
	 */
	static function findOrCreate($conn, $filter, $update, $params=null)
	{
		$class_name = static::getClassName();
		/* Build filter */
		$search = $filter->transition(function ($value, $key)
		{
			return new \Runtime\ORM\QueryFilter($key, "=", $value);
		});
		/* Find item */
		$relation = static::findByFilter($conn, $search, $params);
		if ($relation)
		{
			return $relation;
		}
		/* Create if not found */
		$relation = \Runtime\ORM\Relation::newInstance($class_name);
		/* Set new data */
		$relation->setData($filter);
		$relation->setData($update);
		return $relation;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
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