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
namespace Runtime\WordPress\Database;

use Runtime\BaseObject;
use Runtime\Serializer\BaseType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\Required;
use Runtime\ORM\Relation;
use Runtime\ORM\Record;
use Runtime\ORM\Annotations\AutoIncrement;
use Runtime\ORM\Annotations\BigIntType;
use Runtime\ORM\Annotations\BooleanType;
use Runtime\ORM\Annotations\JsonType;
use Runtime\ORM\Annotations\Primary;
use Runtime\ORM\Annotations\StringType;


class Form extends \Runtime\ORM\Record
{
	/**
	 * Returns table name
	 */
	static function getTableName(){ return "forms"; }
	
	
	/**
	 * Returns table schema
	 */
	static function schema()
	{
		return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "name"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "api_name"])),
			new \Runtime\ORM\Annotations\JsonType(new \Runtime\Map(["name" => "settings"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "email_to"])),
			new \Runtime\ORM\Annotations\BooleanType(new \Runtime\Map(["name" => "is_deleted"])),
			new \Runtime\ORM\Annotations\AutoIncrement(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\Primary(new \Runtime\Map(["keys" => new \Runtime\Vector("id")])),
		);
	}
	
	
	/**
	 * Returns rules
	 */
	function getRules()
	{
		$settings = $this->get("settings");
		$fields = $settings->get("fields");
		$rules = new \Runtime\Serializer\MapType();
		for ($i = 0; $i < $fields->count(); $i++)
		{
			$field = $fields->get($i);
			$field_name = $field->get("name");
			$field_type = $field->get("type");
			if ($field_type == "input" || $field_type == "textarea")
			{
				$rules->addType($field_name, new \Runtime\ORM\Annotations\StringType());
			}
			$field_required = \Runtime\rtl::toInt($field->get("required")) || $field->get("required") == "true";
			if ($field_required)
			{
				$rules->addType($field_name, new \Runtime\Serializer\Required());
			}
		}
		return $rules;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Database.Form"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}