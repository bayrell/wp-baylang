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
class Query extends \Runtime\BaseObject
{
	const QUERY_RAW="raw";
	const QUERY_SELECT="select";
	const QUERY_INSERT="insert";
	const QUERY_UPDATE="update";
	const QUERY_DELETE="delete";
	const QUERY_INSERT_OR_UPDATE="insert_or_update";
	public $_class_name_relation;
	public $_kind;
	public $_table_name;
	public $_fields;
	public $_join;
	public $_order;
	public $_filter;
	public $_sql;
	public $_data;
	public $_start;
	public $_limit;
	public $_debug;
	public $_distinct;
	public $_calc_found_rows;
	public $_db_params;
	public $_provider;
	function __construct()
	{
		parent::__construct();
		$this->_provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
	}
	/**
	 * Copy query
	 */
	function copy()
	{
		$q = new \Runtime\ORM\Query();
		$q->_class_name_relation = $this->_class_name_relation;
		$q->_kind = $this->_kind;
		$q->_table_name = $this->_table_name;
		$q->_fields = $this->_fields->toVector();
		$q->_join = $this->_join->toVector();
		$q->_order = $this->_order->toVector();
		$q->_filter = $this->_filter->toVector();
		$q->_sql = $this->_sql;
		$q->_data = $this->_data->toMap();
		$q->_start = $this->_start;
		$q->_limit = $this->_limit;
		$q->_debug = $this->_debug;
		$q->_distinct = $this->_distinct;
		$q->_calc_found_rows = $this->_calc_found_rows;
		$q->_db_params = $this->_db_params;
		$q->_provider = $this->_provider;
		return $q;
	}
	/**
	 * Setup db params
	 */
	function setDatabaseParams($db_params=null)
	{
		$this->_db_params = $db_params;
		return $this;
	}
	/**
	 * Calc found rows
	 */
	function raw($sql, $data)
	{
		$this->_kind = static::QUERY_RAW;
		$this->_sql = $sql;
		$this->_data = $data->toMap();
		return $this;
	}
	/**
	 * Calc found rows
	 */
	function calcFoundRows($value=true)
	{
		$this->_calc_found_rows = $value;
		return $this;
	}
	/**
	 * Set distinct
	 */
	function distinct($value=true)
	{
		$this->_distinct = $value;
		return $this;
	}
	/**
	 * Set debug log
	 */
	function debug($value=true)
	{
		$this->_debug = $value;
		return $this;
	}
	/**
	 * Select query
	 */
	function select($fields=null)
	{
		$this->_kind = static::QUERY_SELECT;
		if ($fields)
		{
			$this->fields($fields);
		}
		return $this;
	}
	/**
	 * Set table
	 */
	function table($table_name="")
	{
		$this->_table_name = ($table_name != "") ? ($table_name) : ($this->_table_name);
		return $this;
	}
	/**
	 * Set table
	 */
	function from($table_name="")
	{
		$this->_table_name = ($table_name != "") ? ($table_name) : ($this->_table_name);
		return $this;
	}
	/**
	 * Insert query
	 */
	function insert($table_name="")
	{
		$this->_kind = static::QUERY_INSERT;
		$this->_table_name = ($table_name != "") ? ($table_name) : ($this->_table_name);
		return $this;
	}
	/**
	 * Select query
	 */
	function update($table_name="")
	{
		$this->_kind = static::QUERY_UPDATE;
		$this->_table_name = ($table_name != "") ? ($table_name) : ($this->_table_name);
		return $this;
	}
	/**
	 * Delete query
	 */
	function delete($table_name="")
	{
		$this->_kind = static::QUERY_DELETE;
		$this->_table_name = ($table_name != "") ? ($table_name) : ($this->_table_name);
		return $this;
	}
	/**
	 * Set kind
	 */
	function kind($kind)
	{
		$this->_kind = $kind;
		return $this;
	}
	/**
	 * Clear fields
	 */
	function clearFields()
	{
		$this->_fields = new \Runtime\Vector();
		return $this;
	}
	/**
	 * Set fields
	 */
	function fields($fields)
	{
		$this->_fields = new \Runtime\Vector();
		for ($i = 0; $i < $fields->count(); $i++)
		{
			$field_name = \Runtime\rtl::attr($fields, $i);
			$this->addField($field_name);
		}
		return $this;
	}
	/**
	 * Add table fields
	 */
	function addTableFields($table_name)
	{
		$annotations = $this->_provider->getAnotations($table_name);
		for ($i = 0; $i < $annotations->count(); $i++)
		{
			$annotation = \Runtime\rtl::attr($annotations, $i);
			if ($annotation instanceof \Runtime\ORM\Annotations\BaseType)
			{
				$field = new \Runtime\ORM\QueryField();
				$field->annotation = $annotation;
				$field->field_name = $annotation->name;
				$field->table_name = $table_name;
				$this->_fields->append($field);
			}
		}
	}
	/**
	 * Add field
	 */
	function addField($field_name)
	{
		if ($field_name instanceof \Runtime\ORM\QueryField || $field_name instanceof \Runtime\ORM\QueryFilter)
		{
			$this->_fields->append($field_name);
			return $this;
		}
		$field_name = \Runtime\rs::trim($field_name);
		$res1 = \Runtime\rs::split(" as ", $field_name);
		$res2 = \Runtime\rs::split(".", \Runtime\rtl::attr($res1, 0));
		if ($res2->count() > 1 && $res2->get(1) == "*")
		{
			$table_name = $res2->get(0);
			$annotations = $this->_provider->getAnotations($table_name);
			for ($i = 0; $i < $annotations->count(); $i++)
			{
				$annotation = \Runtime\rtl::attr($annotations, $i);
				if ($annotation instanceof \Runtime\ORM\Annotations\BaseType)
				{
					$field = new \Runtime\ORM\QueryField();
					$field->annotation = $annotation;
					$field->field_name = $annotation->name;
					$field->table_name = $table_name;
					$this->_fields->append($field);
				}
			}
		}
		else
		{
			$field = \Runtime\ORM\QueryField::fromString($field_name);
			$this->_fields->append($field);
		}
		return $this;
	}
	/**
	 * Add raw field
	 */
	function addRawField($field_name)
	{
		$this->_fields->append($field_name);
		return $this;
	}
	/**
	 * Add fields
	 */
	function addFields($fields)
	{
		for ($i = 0; $i < $fields->count(); $i++)
		{
			$field_name = \Runtime\rtl::attr($fields, $i);
			$this->addField($field_name);
		}
		return $this;
	}
	/**
	 * Set value
	 */
	function value($key, $value)
	{
		$this->_data->set($key, $value);
		return $this;
	}
	/**
	 * Set data
	 */
	function values($data)
	{
		$this->_data = $data->toMap();
		return $this;
	}
	/**
	 * Set data
	 */
	function data($data)
	{
		$this->_data = $data->toMap();
		return $this;
	}
	/**
	 * Add page
	 */
	function page($page, $limit=null)
	{
		$limit = ($limit > 0) ? ($limit) : ($this->_limit);
		$start = $page * $limit;
		if ($start < 0)
		{
			$start = 0;
		}
		$this->_start = $start;
		$this->_limit = ($limit > 0) ? ($limit) : ($this->_limit);
		return $this;
	}
	/**
	 * Set offset
	 */
	function offset($start)
	{
		$this->_start = $start;
		return $this;
	}
	/**
	 * Set start
	 */
	function start($start)
	{
		$this->_start = $start;
		return $this;
	}
	/**
	 * Set limit
	 */
	function limit($limit)
	{
		$this->_limit = $limit;
		return $this;
	}
	/**
	 * Returns page
	 */
	function getPage()
	{
		$limit = $this->_limit;
		$offset = $this->_start;
		if ($limit <= 0)
		{
			return 0;
		}
		if ($offset <= 0)
		{
			return 0;
		}
		return \Runtime\Math::floor($offset / $limit);
	}
	/**
	 * Returns pages
	 */
	function getPages($rows)
	{
		$limit = $this->_limit;
		if ($limit <= 0)
		{
			return 0;
		}
		return ($rows > 0) ? (\Runtime\Math::floor(($rows - 1) / $limit) + 1) : (0);
	}
	/**
	 * Clear order
	 */
	function clearOrder()
	{
		$this->_order = new \Runtime\Vector();
		return $this;
	}
	/**
	 * Set order
	 */
	function orderBy($name, $sort)
	{
		$this->_order->append(\Runtime\Vector::from([$name,$sort]));
		return $this;
	}
	/**
	 * Add where
	 */
	function where($key, $op, $value)
	{
		$filter = new \Runtime\ORM\QueryFilter();
		$filter->key = $key;
		$filter->op = $op;
		$filter->value = $value;
		$this->_filter->append($filter);
		return $this;
	}
	/**
	 * Add filter
	 */
	function setFilter($filter)
	{
		$this->_filter = $filter->toVector();
		return $this;
	}
	/**
	 * Add filter
	 */
	function addFilter($filter)
	{
		if ($filter instanceof \Runtime\ORM\QueryFilter)
		{
			$this->_filter->append($filter);
		}
		else if ($filter instanceof \Runtime\Collection)
		{
			$this->_filter->appendItems($filter);
		}
		return $this;
	}
	/**
	 * Add or filter
	 */
	function addOrFilter($filter)
	{
		$this->_filter->append(\Runtime\Vector::from(["\$or",null,$filter]));
		return $this;
	}
	/**
	 * Clear filter
	 */
	function clearFilter()
	{
		$this->_filter = \Runtime\Vector::from([]);
		return $this;
	}
	/**
	 * Inner join
	 */
	function innerJoin($table_name, $filter, $alias_name="")
	{
		if ($alias_name == "")
		{
			$alias_name = $table_name;
		}
		$this->_join->append(\Runtime\Map::from(["kind"=>"join","alias_name"=>$alias_name,"table_name"=>$table_name,"filter"=>$filter]));
		return $this;
	}
	/**
	 * Left join
	 */
	function leftJoin($table_name, $filter, $alias_name="")
	{
		if ($alias_name == "")
		{
			$alias_name = $table_name;
		}
		$this->_join->append(\Runtime\Map::from(["kind"=>"left","alias_name"=>$alias_name,"table_name"=>$table_name,"filter"=>$filter]));
		return $this;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->_class_name_relation = "";
		$this->_kind = "";
		$this->_table_name = "";
		$this->_fields = new \Runtime\Vector();
		$this->_join = new \Runtime\Vector();
		$this->_order = new \Runtime\Vector();
		$this->_filter = new \Runtime\Vector();
		$this->_sql = "";
		$this->_data = new \Runtime\Map();
		$this->_start = 0;
		$this->_limit = -1;
		$this->_debug = false;
		$this->_distinct = false;
		$this->_calc_found_rows = false;
		$this->_db_params = null;
		$this->_provider = null;
	}
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Query";
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