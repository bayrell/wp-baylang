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
namespace Runtime\Web;

use Runtime\BaseObject;

class Headers extends \Runtime\BaseObject
{
	var $data;
	
	/**
	 * Create object
	 */
	function __construct($data)
	{
		parent::__construct();
		/* Set data */
		foreach ($data->keys() as $key)
		{
			$this->data->set(\Runtime\rs::upper($key), $data->get($key));
		}
	}
	
	
	/**
	 * Returns true if has header
	 */
	function has($name)
	{
		return $this->data->has(\Runtime\rs::upper($name));
	}
	
	
	/**
	 * Returns header by name
	 */
	function get($name)
	{
		return $this->data->get(\Runtime\rs::upper($name));
	}
	
	
	/**
	 * Set value
	 */
	function set($name, $value)
	{
		$this->data->set(\Runtime\rs::upper($name), $value);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->data = new \Runtime\Map();
	}
	static function getClassName(){ return "Runtime.Web.Headers"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}