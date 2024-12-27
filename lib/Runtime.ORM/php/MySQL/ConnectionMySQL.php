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
class ConnectionMySQL extends \Runtime\ORM\Connection
{
	public $host;
	public $port;
	public $login;
	public $password;
	public $database;
	public $prefix;
	public $connect_error;
	public $pdo;
	public $is_transaction;
	/**
	 * Connect
	 */
	function connect()
	{
		$this->connect_error = "";
		try
		{
			$str = 'mysql:host='.$this->host;
			if ($this->port != null) $str .= ':'.$this->port;
			if ($this->database != null) $str .= ';dbname='.$this->database;
			$this->pdo = new \PDO(
				$str, $this->login, $this->password, 
				array(
					\PDO::ATTR_PERSISTENT => false
				)
			);
			$this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
			$this->pdo->exec("set names utf8");
		}
		catch (\PDOException $e)
		{
			$this->connect_error = $e->getMessage();
			throw new \Runtime\ORM\Exceptions\OrmException('Failed connected to database!');
		}
		catch (\Excepion $e)
		{
			$this->connect_error = $e->getMessage();
		}
		return $this;
	}
	/**
	 * Connect
	 */
	function isConnected()
	{
		return $this->pdo != null;
	}
	/**
	 * Create new cursor
	 */
	function createCursor()
	{
		return new \Runtime\ORM\MySQL\CursorMySQL($this);
	}
	/**
	 * Create SQLBuilder
	 */
	function createBuilder($q)
	{
		return new \Runtime\ORM\MySQL\SQLBuilder($this, $q);
	}
	/**
	 * Execute Query
	 */
	function execute($q, $params=null)
	{
		if ($params == null)
		{
			$params = \Runtime\Map::from([]);
		}
		/* Check is debug */
		$is_debug = $params->get("debug", false);
		if ($q->_debug)
		{
			$is_debug = true;
		}
		/* Build query */
		$builder = $this->createBuilder($q)->build();
		/* Check builder correct */
		if (!$builder->isValid())
		{
			throw new \Runtime\ORM\Exceptions\OrmException("SQL builder is not correct");
		}
		/* Debug sql */
		if ($is_debug)
		{
			$sql_debug = $builder->formatSQL();
			\Runtime\io::print($sql_debug);
		}
		/* Create cursor */
		$cursor = $this->createCursor();
		/* Execute sql */
		$cursor = $cursor->executeSQL($builder);
		$cursor->q = $q->copy();
		return $cursor;
	}
	/**
	 * Execute Query
	 */
	function executeSQL($sql, $data=null)
	{
		/* Build query */
		$builder = $this->createBuilder(null);
		$builder->sql = $sql;
		$builder->data = $data;
		/* Execute */
		$cursor = $this->createCursor();
		$cursor = $cursor->executeSQL($builder);
		return $cursor;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->host = "";
		$this->port = "";
		$this->login = "";
		$this->password = "";
		$this->database = "";
		$this->prefix = "";
		$this->connect_error = "";
		$this->pdo = null;
		$this->is_transaction = false;
	}
	static function getNamespace()
	{
		return "Runtime.ORM.MySQL";
	}
	static function getClassName()
	{
		return "Runtime.ORM.MySQL.ConnectionMySQL";
	}
	static function getParentClassName()
	{
		return "Runtime.ORM.Connection";
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