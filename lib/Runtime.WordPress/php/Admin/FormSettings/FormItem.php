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
namespace Runtime\WordPress\Admin\FormSettings;

use Runtime\SerializeObject;
use Runtime\Serializer\BaseType;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;


class FormItem extends \Runtime\SerializeObject
{
	var $id;
	var $name;
	var $api_name;
	var $email_to;
	var $settings;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("id", new \Runtime\Serializer\IntegerType());
		$rules->addType("name", new \Runtime\Serializer\StringType());
		$rules->addType("api_name", new \Runtime\Serializer\StringType());
		$rules->addType("email_to", new \Runtime\Serializer\StringType());
		$rules->addType("settings", new \Runtime\Serializer\MapType(new \Runtime\Map([
			"fields" => new \Runtime\Serializer\VectorType(new \Runtime\Serializer\MapType(new \Runtime\Map([
				"name" => new \Runtime\Serializer\StringType(),
				"type" => new \Runtime\Serializer\StringType(),
				"title" => new \Runtime\Serializer\StringType(),
				"placeholder" => new \Runtime\Serializer\StringType(),
				"required" => new \Runtime\Serializer\StringType(),
			]))),
		])));
	}
	
	
	/**
	 * Returns primary rules
	 */
	static function getPrimaryRules()
	{
		return new \Runtime\Serializer\MapType(new \Runtime\Map([
			"id" => new \Runtime\Serializer\IntegerType(),
		]));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->id = 0;
		$this->name = "";
		$this->api_name = "";
		$this->email_to = "";
		$this->settings = new \Runtime\Map();
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.FormSettings.FormItem"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}