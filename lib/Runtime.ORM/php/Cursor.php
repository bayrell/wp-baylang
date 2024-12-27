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
class Cursor extends \Runtime\BaseObject
{
	public $conn;
	public $q;
	function __construct($conn)
	{
		parent::__construct();
		$this->conn = $conn;
	}
	/**
	 * Returns found rows
	 */
	function foundRows()
	{
		return 0;
	}
	/**
	 * Returns affected rows
	 */
	function affectedRows()
	{
		return 0;
	}
	/**
	 * Returns last insert id
	 */
	function lastInsertId()
	{
		return 0;
	}
	/**
	 * Returns pages
	 */
	function getPages()
	{
		$rows = $this->foundRows();
		return ($this->q) ? ($this->q->getPages($rows)) : (0);
	}
	/**
	 * Returns page
	 */
	function getPage()
	{
		return ($this->q) ? ($this->q->getPage()) : (0);
	}
	/**
	 * Close query
	 */
	function close()
	{
	}
	/**
	 * Fetch next row
	 */
	function fetchMap()
	{
		return null;
	}
	/**
	 * Convert item
	 */
	function convertItem($item)
	{
		$fields = $this->q->_fields;
		for ($i = 0; $i < $fields->count(); $i++)
		{
			$field = \Runtime\rtl::attr($fields, $i);
			if ($field instanceof \Runtime\ORM\QueryField && $field->annotation)
			{
				$item = $field->annotation->fromDatabase($this->conn, $item);
			}
		}
		return $item;
	}
	/**
	 * Fetch next row
	 */
	function fetch()
	{
		$row = $this->fetchMap();
		if (!$row)
		{
			return null;
		}
		$row = $this->convertItem($row);
		return $row;
	}
	/**
	 * Fetch next row
	 */
	function fetchRelation()
	{
		$row = $this->fetch();
		if (!$row)
		{
			return null;
		}
		$table_name = $this->q->_table_name;
		return \Runtime\ORM\Relation::newInstance($table_name, $row);
	}
	/**
	 * Fetch all rows
	 */
	function fetchAll()
	{
		$table_name = $this->q->_table_name;
		$items = new \Runtime\ORM\QueryResult();
		/* Copy settings */
		$items->conn = $this->conn;
		$items->q = ($this->q) ? ($this->q->copy()) : (null);
		/* Get rows */
		$items->rows = $this->foundRows();
		/* Get items */
		while (true)
		{
			$row = $this->fetch();
			if ($row == null)
			{
				break;
			}
			$items->append($row);
		}
		return $items;
	}
	/**
	 * Fetch variable
	 */
	function fetchVar($var_name)
	{
		$row = $this->fetchMap();
		if ($row)
		{
			return \Runtime\rtl::attr($row, $var_name);
		}
		return null;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->conn = null;
		$this->q = null;
	}
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Cursor";
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