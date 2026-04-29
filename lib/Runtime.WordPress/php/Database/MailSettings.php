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
use Runtime\ORM\Relation;
use Runtime\ORM\Record;
use Runtime\ORM\Annotations\AutoIncrement;
use Runtime\ORM\Annotations\BigIntType;
use Runtime\ORM\Annotations\BooleanType;
use Runtime\ORM\Annotations\Primary;
use Runtime\ORM\Annotations\StringType;
use Runtime\ORM\Annotations\TinyIntType;


class MailSettings extends \Runtime\ORM\Record
{
	/**
	 * Returns table name
	 */
	static function getTableName(){ return "mail_settings"; }
	
	
	/**
	 * Returns table schema
	 */
	static function schema()
	{
		return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\TinyIntType(new \Runtime\Map(["name" => "enable"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "plan"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "host"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "port"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "login"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "password"])),
			new \Runtime\ORM\Annotations\TinyIntType(new \Runtime\Map(["name" => "ssl_enable"])),
			new \Runtime\ORM\Annotations\BooleanType(new \Runtime\Map(["name" => "is_deleted"])),
			new \Runtime\ORM\Annotations\AutoIncrement(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\Primary(new \Runtime\Map(["keys" => new \Runtime\Vector("id")])),
		);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Database.MailSettings"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}