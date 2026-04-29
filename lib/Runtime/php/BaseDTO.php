<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime;

use Runtime\BaseObject;
use Runtime\SerializeInterface;


class BaseDTO extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	/**
	 * Create object
	 */
	function __construct($params = null)
	{
		parent::__construct();
		$this->_assign_values($params);
	}
	
	
	/**
	 * Returns field by name
	 */
	function get($field_name){ return \Runtime\rtl::attr($this, $field_name); }
	
	
	/**
	 * Set field value
	 */
	function set($field_name, $value)
	{
		\Runtime\rtl::setAttr($this, $field_name, $value);
	}
	
	
	/**
	 * Copy object
	 */
	function copy(){ return \Runtime\rtl::copy($this); }
	
	
	/**
	 * Returns object data
	 */
	function all(){ return \Runtime\rtl::serialize($this); }
	
	
	/**
	 * Intersect data
	 */
	function intersect($items){ return $this->all()->intersect($items); }
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.BaseDTO"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}