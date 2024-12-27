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
namespace Runtime\ORM\MySQL;
class SQLBuilder extends \Runtime\BaseObject
{
	public $conn;
	public $data;
	public $q;
	public $sql;
	function __construct($conn, $q)
	{
		$this->conn = $conn;
		$this->q = $q;
	}
	/**
	 * Returns sql
	 */
	function getSQL()
	{
		return $this->sql;
	}
	/**
	 * Returns data
	 */
	function getData()
	{
		return $this->data;
	}
	/**
	 * Returns true if builder is correct
	 */
	function isValid()
	{
		return $this->sql != null;
	}
	/**
	 * Format sql
	 */
	function formatSQL()
	{
		$sql = $this->sql;
		$data = $this->data;
		if ($data == null)
		{
			return $sql;
		}
		$data->each(function ($value, $key) use (&$sql)
		{
			if ($value === null)
			{
				$sql = \Runtime\rs::replace($this->formatKey($key), "null", $sql);
			}
			else
			{
				$value = $this->quote($value);
				$sql = \Runtime\rs::replace($this->formatKey($key), $value, $sql);
			}
		});
		return $sql;
	}
	/**
	 * Format key
	 */
	function formatKey($key)
	{
		return ":" . \Runtime\rtl::toStr($key);
	}
	/**
	 * Prepare field
	 */
	function prepare_field($item)
	{
		$res1 = \Runtime\rs::split(",", $item);
		$res1 = $res1->map(function ($s)
		{
			return \Runtime\rs::trim($s);
		});
		$res1 = $res1->map(function ($s)
		{
			$res2 = \Runtime\rs::split(".", $s);
			$res2 = $res2->map(function ($name)
			{
				return "`" . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("`");
			});
			return \Runtime\rs::join(".", $res2);
		});
		return \Runtime\rs::join(",", $res1);
	}
	/**
	 * Prepare value
	 */
	function prepare_value($item, $op)
	{
		if ($op == "%like%")
		{
			$item = "%" . \Runtime\rtl::toStr($item) . \Runtime\rtl::toStr("%");
			$op = "like";
		}
		else if ($op == "like%")
		{
			$item = $item . \Runtime\rtl::toStr("%");
			$op = "like";
		}
		else if ($op == "%like")
		{
			$item = "%" . \Runtime\rtl::toStr($item);
			$op = "like";
		}
		return \Runtime\Vector::from([$item,$op]);
	}
	/**
	 * Quote
	 */
	function quote($value)
	{
		$value = $this->conn->pdo->quote($value);
		return $value;
	}
	/**
	 * Returns query sql
	 */
	function build()
	{
		if ($this->q == null)
		{
			return $this;
		}
		$q = $this->q;
		/* Select query */
		if ($q->_kind == \Runtime\ORM\Query::QUERY_SELECT)
		{
			$data = $q->_data->copy();
			$sql = "SELECT ";
			$field_index = 0;
			/* Add distinct */
			if ($q->_distinct != "")
			{
				$sql .= \Runtime\rtl::toStr(" DISTINCT ");
			}
			/* Add fields */
			if ($q->_fields != null)
			{
				$fields = $q->_fields->map(function ($item) use (&$q,&$data,&$field_index)
				{
					$field_name = "";
					if ($item instanceof \Runtime\ORM\QueryField)
					{
						$table_name = $item->table_name;
						if ($table_name == "")
						{
							$table_name = $q->_table_name;
						}
						$field_name = "`" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`.`") . \Runtime\rtl::toStr($item->field_name) . \Runtime\rtl::toStr("`");
						if ($item->alias_name != "")
						{
							$field_name .= \Runtime\rtl::toStr(" as `" . \Runtime\rtl::toStr($item->alias_name) . \Runtime\rtl::toStr("`"));
						}
					}
					else if ($item instanceof \Runtime\ORM\QueryFilter)
					{
						$res = $this->convertFilterItem($item, $data, $field_index);
						$field_name = \Runtime\rtl::attr($res, 0);
						$field_index = \Runtime\rtl::attr($res, 1);
						if ($item->alias != "")
						{
							$field_name .= \Runtime\rtl::toStr(" as `" . \Runtime\rtl::toStr($item->alias) . \Runtime\rtl::toStr("`"));
						}
					}
					else if (\Runtime\rtl::isCallable($item))
					{
						return $item($this);
					}
					else
					{
						$field_name = $item;
					}
					return $field_name;
				});
				$sql .= \Runtime\rtl::toStr(\Runtime\rs::join(", ", $fields));
			}
			else
			{
				$sql .= \Runtime\rtl::toStr(" * ");
			}
			/* New line */
			$sql .= \Runtime\rtl::toStr("\n");
			/* Add table name */
			$sql .= \Runtime\rtl::toStr(" FROM `" . \Runtime\rtl::toStr($this->conn->prefix) . \Runtime\rtl::toStr($q->_table_name) . \Runtime\rtl::toStr("` AS `") . \Runtime\rtl::toStr($q->_table_name) . \Runtime\rtl::toStr("`"));
			/* New line */
			$sql .= \Runtime\rtl::toStr("\n");
			/* Add joins */
			if ($q->_join != null && $q->_join->count() > 0)
			{
				for ($i = 0; $i < $q->_join->count(); $i++)
				{
					$join = \Runtime\rtl::attr($q->_join, $i);
					$kind = \Runtime\rtl::attr($join, "kind");
					$table_name = \Runtime\rtl::attr($join, "table_name");
					$alias_name = \Runtime\rtl::attr($join, "alias_name");
					$filter = \Runtime\rtl::attr($join, "filter");
					$res = $this->convertFilter($filter, $data, $field_index);
					$where = \Runtime\rtl::attr($res, 0);
					$field_index = \Runtime\rtl::attr($res, 1);
					if ($kind == "left")
					{
						$sql .= \Runtime\rtl::toStr(" LEFT JOIN ");
					}
					else
					{
						$sql .= \Runtime\rtl::toStr(" INNER JOIN ");
					}
					$sql .= \Runtime\rtl::toStr("`" . \Runtime\rtl::toStr($this->conn->prefix) . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`"));
					if ($alias_name != "")
					{
						$sql .= \Runtime\rtl::toStr(" AS `" . \Runtime\rtl::toStr($alias_name) . \Runtime\rtl::toStr("`"));
					}
					$sql .= \Runtime\rtl::toStr(" ON (" . \Runtime\rtl::toStr($where) . \Runtime\rtl::toStr(")"));
					/* New line */
					$sql .= \Runtime\rtl::toStr("\n");
				}
			}
			/* Add where */
			if ($q->_filter != null && $q->_filter->count() > 0)
			{
				$res = $this->convertFilter($q->_filter, $data, $field_index);
				$where = \Runtime\rtl::attr($res, 0);
				$field_index = \Runtime\rtl::attr($res, 1);
				if ($where != "")
				{
					$sql .= \Runtime\rtl::toStr(" WHERE " . \Runtime\rtl::toStr($where));
				}
				/* New line */
				$sql .= \Runtime\rtl::toStr("\n");
			}
			/* Add order */
			if ($q->_order != null && $q->_order->count() > 0)
			{
				$order = $q->_order->map(function ($item)
				{
					return $this->prepare_field(\Runtime\rtl::attr($item, 0)) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr(\Runtime\rtl::attr($item, 1));
				});
				$sql .= \Runtime\rtl::toStr(" ORDER BY " . \Runtime\rtl::toStr(\Runtime\rs::join(",", $order)));
				/* New line */
				$sql .= \Runtime\rtl::toStr("\n");
			}
			/* Add order */
			if ($q->_limit >= 0)
			{
				$sql .= \Runtime\rtl::toStr(" LIMIT " . \Runtime\rtl::toStr($q->_limit));
			}
			if ($q->_limit >= 0 && $q->_start >= 0)
			{
				$sql .= \Runtime\rtl::toStr(" OFFSET " . \Runtime\rtl::toStr($q->_start));
			}
			$this->sql = $sql;
			$this->data = $data;
		}
		else if ($q->_kind == \Runtime\ORM\Query::QUERY_INSERT)
		{
			$keys = new \Runtime\Vector();
			$values = new \Runtime\Vector();
			if ($q->_data)
			{
				$q->_data->each(function ($value, $key) use (&$keys,&$values)
				{
					$keys->push("`" . \Runtime\rtl::toStr($key) . \Runtime\rtl::toStr("`"));
					$values->push($this->formatKey($key));
				});
			}
			/* Build sql */
			$this->sql = "INSERT INTO " . \Runtime\rtl::toStr($this->conn->prefix) . \Runtime\rtl::toStr($q->_table_name) . \Runtime\rtl::toStr(" (") . \Runtime\rtl::toStr(\Runtime\rs::join(",", $keys)) . \Runtime\rtl::toStr(") VALUES (") . \Runtime\rtl::toStr(\Runtime\rs::join(",", $values)) . \Runtime\rtl::toStr(")");
			$this->data = $q->_data->clone();
		}
		else if ($q->_kind == \Runtime\ORM\Query::QUERY_UPDATE)
		{
			$update_arr = new \Runtime\Vector();
			$values = new \Runtime\Vector();
			$data = new \Runtime\Map();
			/* Build update */
			if ($q->_data)
			{
				$q->_data->each(function ($value, $key) use (&$update_arr,&$data)
				{
					$field_key = "update_" . \Runtime\rtl::toStr($key);
					$field_name = $this->prepare_field($key);
					$update_arr->push($field_name . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($this->formatKey($field_key)));
					$data = $data->set($field_key, $value);
				});
			}
			/* Build where */
			$res = $this->convertFilter($q->_filter, $data);
			$where_str = \Runtime\rtl::attr($res, 0);
			/* Build sql */
			$this->sql = "UPDATE " . \Runtime\rtl::toStr($this->conn->prefix) . \Runtime\rtl::toStr($q->_table_name) . \Runtime\rtl::toStr(" SET ") . \Runtime\rtl::toStr(\Runtime\rs::join(", ", $update_arr)) . \Runtime\rtl::toStr(" WHERE ") . \Runtime\rtl::toStr($where_str);
			$this->data = $data;
		}
		else if ($q->_kind == \Runtime\ORM\Query::QUERY_DELETE)
		{
			/* Build where */
			$data = \Runtime\Map::from([]);
			$res = $this->convertFilter($q->_filter, $data);
			$where_str = \Runtime\rtl::attr($res, 0);
			/* Delete item */
			$this->sql = "DELETE FROM " . \Runtime\rtl::toStr($this->conn->prefix) . \Runtime\rtl::toStr($q->_table_name) . \Runtime\rtl::toStr(" WHERE ") . \Runtime\rtl::toStr($where_str);
			$this->data = $data;
		}
		else if ($q->_kind == \Runtime\ORM\Query::QUERY_RAW)
		{
			$this->sql = $q->_sql;
			$this->data = $q->_data;
		}
		return $this;
	}
	/**
	 * Convert filter
	 */
	function convertFilterItem($item, $data, $field_index=0)
	{
		if (\Runtime\rtl::isString($item))
		{
			return \Runtime\Vector::from([$item,$field_index]);
		}
		$allow_operations = \Runtime\Vector::from(["=","!=",">=","<=","<",">","like","%like%","like%","%like","match","match_boolean"]);
		$convert_key = function ($s)
		{
			$s = \Runtime\re::replace("[,\\.]", "_", $s);
			$s = \Runtime\re::replace("[^0-9A-Za-z_]", "", $s);
			return $s;
		};
		$field_name = "";
		$op = "";
		$value = "";
		/* If QueryFilter */
		if ($item instanceof \Runtime\ORM\QueryFilter)
		{
			$field_name = $item->key;
			$op = $item->op;
			$value = $item->value;
		}
		else
		{
			$field_name = \Runtime\rtl::attr($item, 0);
			$op = \Runtime\rtl::attr($item, 1);
			$value = \Runtime\rtl::attr($item, 2);
		}
		/* OR */
		if ($field_name == "\$or")
		{
			$where_or = new \Runtime\Vector();
			for ($j = 0; $j < $value->count(); $j++)
			{
				$res_or = $this->convertFilterItem(\Runtime\rtl::attr($value, $j), $data, $field_index);
				$where_or->push(\Runtime\rtl::attr($res_or, 0));
				$field_index = \Runtime\rtl::attr($res_or, 1);
			}
			$s = "(" . \Runtime\rtl::toStr(\Runtime\rs::join(" OR ", $where_or)) . \Runtime\rtl::toStr(")");
			return \Runtime\Vector::from([$s,$field_index]);
		}
		/* Check operation */
		if ($allow_operations->indexOf($op) == -1)
		{
			$op = "=";
		}
		if ($value === null)
		{
			if ($op == "!=")
			{
				$s = $this->prepare_field($field_name) . \Runtime\rtl::toStr(" is not null");
				return \Runtime\Vector::from([$s,$field_index]);
			}
			else
			{
				$s = $this->prepare_field($field_name) . \Runtime\rtl::toStr(" is null");
				return \Runtime\Vector::from([$s,$field_index]);
			}
		}
		else if ($value instanceof \Runtime\Collection)
		{
			if ($op == "=")
			{
				if ($value->count() == 0)
				{
					return \Runtime\Vector::from(["1 = 0",$field_index]);
				}
				else
				{
					$res = new \Runtime\Vector();
					for ($j = 0; $j < $value->count(); $j++)
					{
						$field_key = $convert_key($field_index . \Runtime\rtl::toStr("_where_") . \Runtime\rtl::toStr($field_name));
						$data->set($field_key, \Runtime\rtl::attr($value, $j));
						$res->push($this->formatKey($field_key));
						$field_index++;
					}
					$s = $this->prepare_field($field_name) . \Runtime\rtl::toStr(" in (") . \Runtime\rtl::toStr(\Runtime\rs::join(",", $res)) . \Runtime\rtl::toStr(")");
					return \Runtime\Vector::from([$s,$field_index]);
				}
			}
		}
		else
		{
			$s = "";
			$field_key = $convert_key($field_index . \Runtime\rtl::toStr("_where_") . \Runtime\rtl::toStr($field_name));
			$field_name = $this->prepare_field($field_name);
			$res = $this->prepare_value($value, $op);
			$value = \Runtime\rtl::attr($res, 0);
			$op = \Runtime\rtl::attr($res, 1);
			if ($op == "match")
			{
				$s = "MATCH(" . \Runtime\rtl::toStr($field_name) . \Runtime\rtl::toStr(") AGAINST (") . \Runtime\rtl::toStr($this->formatKey($field_key)) . \Runtime\rtl::toStr(")");
			}
			else if ($op == "match_boolean")
			{
				$s = "MATCH(" . \Runtime\rtl::toStr($field_name) . \Runtime\rtl::toStr(") AGAINST (:") . \Runtime\rtl::toStr($this->formatKey($field_key)) . \Runtime\rtl::toStr(" IN BOOLEAN MODE)");
			}
			else
			{
				$s = $field_name . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($op) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($this->formatKey($field_key));
			}
			$data->set($field_key, $value);
			$field_index++;
			return \Runtime\Vector::from([$s,$field_index]);
		}
		return \Runtime\Vector::from(["",$field_index]);
	}
	/**
	 * Convert filter
	 */
	function convertFilter($filter, $data, $field_index=0)
	{
		$where = new \Runtime\Vector();
		for ($i = 0; $i < $filter->count(); $i++)
		{
			$item = $filter->get($i);
			$res = $this->convertFilterItem($item, $data, $field_index);
			$s = $res->get(0);
			$field_index = $res->get(1);
			if ($s != "")
			{
				$where->push($s);
			}
		}
		$where_str = \Runtime\rs::join(" AND ", $where);
		return \Runtime\Vector::from([$where_str,$field_index]);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->conn = null;
		$this->data = null;
		$this->q = null;
		$this->sql = null;
	}
	static function getNamespace()
	{
		return "Runtime.ORM.MySQL";
	}
	static function getClassName()
	{
		return "Runtime.ORM.MySQL.SQLBuilder";
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