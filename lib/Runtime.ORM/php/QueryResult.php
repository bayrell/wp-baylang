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
class QueryResult extends \Runtime\Vector
{
	public $q;
	public $conn;
	public $rows;
	function __construct()
	{
		parent::__construct();
	}
	/**
	 * Returns pages
	 */
	function getPages()
	{
		return ($this->q) ? ($this->q->getPages($this->rows)) : (0);
	}
	/**
	 * Returns page
	 */
	function getPage()
	{
		return ($this->q) ? ($this->q->getPage()) : (0);
	}
	/**
	 * Returns relation by index
	 */
	function getRelation($index)
	{
		$table_name = $this->q->_table_name;
		$item = $this->get($index);
		return \Runtime\ORM\Relation::newInstance($table_name, $item);
	}
	/**
	 * Convert to Vector
	 */
	function toDict($fields=null)
	{
		return $this->map(function ($item) use (&$fields)
		{
			return ($fields == null) ? ($item->toDict()) : ($item->intersect($fields));
		})->toVector();
	}
	/**
	 * Transform item to Relation
	 */
	function toRelation()
	{
		$table_name = $this->q->_table_name;
		return $this->map(function ($item) use (&$table_name)
		{
			return \Runtime\ORM\Relation::newInstance($table_name, $item);
		})->toVector();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->q = null;
		$this->conn = null;
		$this->rows = 0;
	}
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.QueryResult";
	}
	static function getParentClassName()
	{
		return "Runtime.Vector";
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