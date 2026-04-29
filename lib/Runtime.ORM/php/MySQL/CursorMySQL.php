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

use Runtime\ORM\Cursor;
use Runtime\ORM\Query;
use Runtime\ORM\MySQL\Adapter;
use Runtime\ORM\MySQL\SQLBuilder;


class CursorMySQL extends \Runtime\ORM\Cursor
{
	var $st;
	var $q;
	var $found_rows;
	var $adapter;
	
	
	/**
	 * Execute sql query
	 */
	function executeSQL($builder)
	{
		$this->adapter->executeSQL($builder);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->st = null;
		$this->q = null;
		$this->found_rows = -1;
		$this->adapter = null;
	}
	static function getClassName(){ return "Runtime.ORM.MySQL.CursorMySQL"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}