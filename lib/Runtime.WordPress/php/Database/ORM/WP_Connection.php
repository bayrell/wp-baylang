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
namespace Runtime\WordPress\Database\ORM;

use Runtime\ORM\Query;
use Runtime\ORM\Factory\CursorFactory;
use Runtime\ORM\MySQL\ConnectionMySQL;
use Runtime\WordPress\Database\ORM\WP_Cursor;
use Runtime\WordPress\Database\ORM\WP_SQLBuilder;


class WP_Connection extends \Runtime\ORM\MySQL\ConnectionMySQL
{
	/**
	 * Constructor
	 */
	function __construct($name = "")
	{
		parent::__construct($name);
		$this->cursor = new \Runtime\ORM\Factory\CursorFactory("Runtime.WordPress.Database.ORM.WP_Cursor");
	}
	
	
	/**
	 * Connect
	 */
	function connect(){}
	
	
	/**
	 * Connect
	 */
	function isConnected()
	{
		return true;
	}
	
	
	/**
	 * Create SQLBuilder
	 */
	function createBuilder($q){ return new \Runtime\WordPress\Database\ORM\WP_SQLBuilder($this, $q); }
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Database.ORM.WP_Connection"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}