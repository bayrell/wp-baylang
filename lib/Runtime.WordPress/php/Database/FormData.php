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
use Runtime\DateTime;
use Runtime\ORM\Connection;
use Runtime\ORM\Record;
use Runtime\ORM\Relation;
use Runtime\ORM\Annotations\AutoIncrement;
use Runtime\ORM\Annotations\BigIntType;
use Runtime\ORM\Annotations\BooleanType;
use Runtime\ORM\Annotations\DateTimeType;
use Runtime\ORM\Annotations\JsonType;
use Runtime\ORM\Annotations\Primary;
use Runtime\ORM\Annotations\StringType;
use Runtime\ORM\Annotations\TinyIntType;
use Runtime\WordPress\EmailProvider;
use Runtime\WordPress\Theme\Components\Email\FormMessage;


class FormData extends \Runtime\ORM\Record
{
	/**
	 * Returns table name
	 */
	static function getTableName(){ return "forms_data"; }
	
	
	/**
	 * Returns table schema
	 */
	static function schema()
	{
		return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "form_id"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "form_title"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "metrika_id"])),
			new \Runtime\ORM\Annotations\JsonType(new \Runtime\Map(["name" => "data"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "utm"])),
			new \Runtime\ORM\Annotations\BooleanType(new \Runtime\Map(["name" => "spam"])),
			new \Runtime\ORM\Annotations\DateTimeType(new \Runtime\Map(["name" => "gmtime_add", "autocreate" => true])),
			new \Runtime\ORM\Annotations\AutoIncrement(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\Primary(new \Runtime\Map(["keys" => new \Runtime\Vector("id")])),
		);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Database.FormData"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}