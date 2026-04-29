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

use Runtime\BaseObject;
use Runtime\Math;
use Runtime\ORM\Connection;
use Runtime\ORM\Query;
use Runtime\ORM\QueryField;
use Runtime\ORM\QueryResult;
use Runtime\ORM\Record;
use Runtime\ORM\Relation;


class Cursor extends \Runtime\BaseObject
{
	var $conn;
	var $q;
	var $adapter;
	
	
	/**
	 * Constructor
	 */
	function __construct($conn = null)
	{
		parent::__construct();
		$this->conn = $conn;
	}
	
	
	/**
	 * Get connection
	 */
	function getConnection(){ return $this->conn; }
	
	
	/**
	 * Set connection
	 */
	function setConnection($connection)
	{
		$this->conn = $connection;
		$this->adapter = $connection->adapter;
	}
	
	
	/**
	 * Returns found rows
	 */
	function foundRows()
	{
		if ($this->found_rows >= 0) return $this->found_rows;
		if (!$this->q)
		{
			return 0;
		}
		if (!$this->q->_calc_found_rows)
		{
			return 0;
		}
		$q = $this->q->copy()->clearFields()->addRawField("count(1) as c")->limit(-1)->start(-1)->clearOrder();
		$res = $this->conn->fetchVar($q, "c");
		$this->found_rows = $res;
		return $res;
	}
	
	
	/**
	 * Returns affected rows
	 */
	function affectedRows()
	{
		return $this->adapter->affectedRows();
	}
	
	
	/**
	 * Returns last insert id
	 */
	function lastInsertId()
	{
		return $this->adapter->lastInsertId();
	}
	
	
	/**
	 * Returns pages
	 */
	function getPages()
	{
		$rows = $this->foundRows();
		return $this->q ? $this->q->getPages($rows) : 0;
	}
	
	
	/**
	 * Returns page
	 */
	function getPage(){ return $this->q ? $this->q->getPage() : 0; }
	
	
	/**
	 * Close query
	 */
	function close()
	{
		$this->adapter->close();
	}
	
	
	/**
	 * Fetch next row
	 */
	function fetchMap(){ return $this->adapter->fetchMap(); }
	
	
	/**
	 * Convert item
	 */
	function convertItem($item)
	{
		$fields = $this->q->_fields;
		for ($i = 0; $i < $fields->count(); $i++)
		{
			$field = $fields[$i];
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
		if (!$row) return null;
		$row = $this->convertItem($row);
		return $row;
	}
	
	
	/**
	 * Fetch all rows
	 */
	function fetchAll()
	{
		$table_name = $this->q->_table_name;
		$items = new \Runtime\ORM\QueryResult();
		/* Copy settings */
		$items->q = $this->q ? $this->q->copy() : null;
		/* Get items */
		while (true)
		{
			$row = $this->fetch();
			if ($row == null)
			{
				break;
			}
			$items->push($row);
		}
		/* Get rows */
		$items->rows = $this->foundRows();
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
			return $row->get($var_name);
		}
		return null;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->conn = null;
		$this->q = null;
		$this->adapter = null;
	}
	static function getClassName(){ return "Runtime.ORM.Cursor"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}