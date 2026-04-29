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
use Runtime\Method;
use Runtime\ORM\Connection;
use Runtime\ORM\Provider;


class ConnectionPool extends \Runtime\BaseObject
{
	var $params;
	var $name;
	var $class_name;
	var $adapter;
	
	
	/**
	 * Returns connection pool by name
	 */
	static function get($name = "default")
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		return $provider->get($name);
	}
	
	
	/**
	 * Create object
	 */
	function __construct($name, $params, $class_name)
	{
		parent::__construct();
		/* Pool name */
		$this->name = $name;
		/* Init params */
		$this->params = $params;
		$this->class_name = $class_name;
	}
	
	
	/**
	 * Returns connection name
	 */
	function getName(){ return $this->name; }
	
	
	/**
	 * Returns database name
	 */
	function getDatabaseName(){ return $this->params->get("database"); }
	
	
	/**
	 * Returns table name
	 */
	function getTableName($table_name)
	{
		$prefix = $this->params->get("prefix");
		return $prefix . $table_name;
	}
	
	
	/**
	 * Create new connection
	 */
	function createConnection()
	{
		return \Runtime\rtl::newInstance($this->class_name, new \Runtime\Vector($this));
	}
	
	
	/**
	 * Connect
	 */
	function connect()
	{
		/* Create adapter */
		$createAdapter = new \Runtime\Method($this->class_name, "createAdapter");
		if ($createAdapter->exists())
		{
			$this->adapter = $createAdapter->apply();
		}
		/* Connect */
		$this->adapter->connect($this);
	}
	
	
	/**
	 * Returns connection
	 */
	function getConnection()
	{
		$connection = $this->createConnection();
		$connection->adapter = $this->adapter ? $this->adapter->copy() : null;
		return $connection;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->params = null;
		$this->name = "";
		$this->class_name = "";
		$this->adapter = null;
	}
	static function getClassName(){ return "Runtime.ORM.ConnectionPool"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}