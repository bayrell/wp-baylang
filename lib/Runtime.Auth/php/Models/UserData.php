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
namespace Runtime\Auth\Models;

use Runtime\BaseObject;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\StringType;
use Runtime\SerializeInterface;


class UserData extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	var $user;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("user", new \Runtime\Serializer\MapType(new \Runtime\Serializer\StringType()));
	}
	
	
	/**
	 * Create object
	 */
	function __construct($user)
	{
		parent::__construct();
		$this->user = $user;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->user = null;
	}
	static function getClassName(){ return "Runtime.Auth.Models.UserData"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}