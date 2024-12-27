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
namespace Runtime\ORM\Factory;
class MySQLFactory extends \Runtime\ORM\Factory\ConnectionFactory
{
	public $__host;
	public $__login;
	public $__password;
	public $__database;
	public $__prefix;
	/**
	 * Create connection
	 */
	function createConnection()
	{
		$conn = new \Runtime\ORM\MySQL\ConnectionMySQL($this->name);
		$conn->host = $this->host;
		$conn->login = $this->login;
		$conn->password = $this->password;
		$conn->database = $this->database;
		$conn->prefix = $this->prefix;
		$conn->connect();
		return $conn;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__host = "";
		$this->__login = "";
		$this->__password = "";
		$this->__database = "";
		$this->__prefix = "";
	}
	function takeValue($k,$d=null)
	{
		if ($k == "host")return $this->__host;
		else if ($k == "login")return $this->__login;
		else if ($k == "password")return $this->__password;
		else if ($k == "database")return $this->__database;
		else if ($k == "prefix")return $this->__prefix;
	}
	static function getNamespace()
	{
		return "Runtime.ORM.Factory";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Factory.MySQLFactory";
	}
	static function getParentClassName()
	{
		return "Runtime.ORM.Factory.ConnectionFactory";
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
		$a[]="host";
		$a[]="login";
		$a[]="password";
		$a[]="database";
		$a[]="prefix";
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