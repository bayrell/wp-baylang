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
class CursorMySQL extends \Runtime\ORM\Cursor
{
	public $st;
	public $q;
	public $found_rows;
	/**
	 * Returns found rows
	 */
	function foundRows()
	{
		if ($this->found_rows >= 0)
		{
			return $this->found_rows;
		}
		if (!$this->q)
		{
			return 0;
		}
		if (!$this->q->_calc_found_rows)
		{
			return 0;
		}
		$q = $this->q->copy()->clearFields()->addRawField("count(1) as c")->limit(-1)->start(-1)->clearOrder();
		$cursor = $this->conn->executeQuery($q);
		$res = $cursor->fetchVar("c");
		$cursor->close();
		$this->found_rows = $res;
		return $res;
	}
	/**
	 * Returns affected rows
	 */
	function affectedRows()
	{
		return $this->st->rowCount();
		return 0;
	}
	/**
	 * Insert id
	 */
	function lastInsertId()
	{
		return $this->conn->pdo->lastInsertId();
		return 0;
	}
	/**
	 * Execute sql query
	 */
	function executeSQL($builder)
	{
		/* Get sql */
		$sql = $builder->getSQL();
		$data = $builder->getData();
		if ($data instanceof \Runtime\Dict)
		{
			$data = $data->_map;
		}
		
		/* $data = \Runtime\rtl::PrimitiveToNative($data); */
		$this->st = $this->conn->pdo->prepare(
			$sql, array(\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY)
		);
		$this->st->execute($data);
		return $this;
	}
	/**
	 * Close cursor
	 */
	function close()
	{
		if ($this->st) $this->st->closeCursor();
		$this->st = null;
		return $this;
	}
	/**
	 * Fetch next row
	 */
	function fetchMap()
	{
		if ($this->st == null) return null;
		
		$row = $this->st->fetch(\PDO::FETCH_ASSOC);
		$row = ($row != null) ? \Runtime\Map::from($row) : null;
		
		return $row;
		return null;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->st = null;
		$this->q = null;
		$this->found_rows = -1;
	}
	static function getNamespace()
	{
		return "Runtime.ORM.MySQL";
	}
	static function getClassName()
	{
		return "Runtime.ORM.MySQL.CursorMySQL";
	}
	static function getParentClassName()
	{
		return "Runtime.ORM.Cursor";
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