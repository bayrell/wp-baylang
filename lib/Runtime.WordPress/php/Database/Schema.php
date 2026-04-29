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

use Runtime\re;
use Runtime\BaseObject;
use Runtime\DateTime;
use Runtime\ORM\DatabaseSchema;
use Runtime\ORM\Relation;
use Runtime\ORM\Annotations\AutoIncrement;
use Runtime\ORM\Annotations\BigIntType;
use Runtime\ORM\Annotations\BooleanType;
use Runtime\ORM\Annotations\CollectionType;
use Runtime\ORM\Annotations\DateTimeType;
use Runtime\ORM\Annotations\DictType;
use Runtime\ORM\Annotations\ForeignKey;
use Runtime\ORM\Annotations\Index;
use Runtime\ORM\Annotations\JsonType;
use Runtime\ORM\Annotations\Primary;
use Runtime\ORM\Annotations\StringType;
use Runtime\ORM\Annotations\Table;
use Runtime\ORM\Annotations\TinyIntType;
use Runtime\ORM\Annotations\Unique;


class Schema extends \Runtime\ORM\DatabaseSchema
{
	/**
	 * Forms settings
	 */
	static function forms()
	{
		return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "name"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "api_name"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "settings"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "email_to"])),
			new \Runtime\ORM\Annotations\BooleanType(new \Runtime\Map(["name" => "is_deleted"])),
			new \Runtime\ORM\Annotations\AutoIncrement(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\Primary(new \Runtime\Map(["keys" => new \Runtime\Vector("id")])),
		);
	}
	
	
	/**
	 * Forms data
	 */
	static function forms_data()
	{
		return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "form_id"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "form_title"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "form_position"])),
			new \Runtime\ORM\Annotations\JsonType(new \Runtime\Map(["name" => "data"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "utm"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "send_email_uuid"])),
			new \Runtime\ORM\Annotations\TinyIntType(new \Runtime\Map(["name" => "send_email_code"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "send_email_error"])),
			new \Runtime\ORM\Annotations\BooleanType(new \Runtime\Map(["name" => "spam"])),
			new \Runtime\ORM\Annotations\DateTimeType(new \Runtime\Map(["name" => "gmtime_add"])),
			new \Runtime\ORM\Annotations\AutoIncrement(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\Primary(new \Runtime\Map(["keys" => new \Runtime\Vector("id")])),
		);
	}
	
	
	/**
	 * Forms ip
	 */
	static function forms_ip()
	{
		return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "ip"])),
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "count"])),
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "last"])),
			new \Runtime\ORM\Annotations\Primary(new \Runtime\Map(["keys" => new \Runtime\Vector("ip")])),
		);
	}
	
	
	/**
	 * Mail settings
	 */
	static function mail_settings()
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
	
	
	/**
	 * Mail log
	 */
	static function mail_delivery()
	{
		return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "worker"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "plan"])),
			new \Runtime\ORM\Annotations\TinyIntType(new \Runtime\Map(["name" => "status"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "dest"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "uuid"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "title"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "message"])),
			new \Runtime\ORM\Annotations\DateTimeType(new \Runtime\Map(["name" => "gmtime_plan"])),
			new \Runtime\ORM\Annotations\DateTimeType(new \Runtime\Map(["name" => "gmtime_send"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "send_email_error"])),
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "send_email_code"])),
			new \Runtime\ORM\Annotations\DateTimeType(new \Runtime\Map(["name" => "gmtime_add"])),
			new \Runtime\ORM\Annotations\BooleanType(new \Runtime\Map(["name" => "is_delete"])),
			new \Runtime\ORM\Annotations\AutoIncrement(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\Primary(new \Runtime\Map(["keys" => new \Runtime\Vector("id")])),
			new \Runtime\ORM\Annotations\Unique(new \Runtime\Map(["keys" => new \Runtime\Vector("uuid")])),
		);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Database.Schema"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("forms", "forms_data", "forms_ip", "mail_settings", "mail_delivery");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "forms") return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\Table(new \Runtime\Map(["name" => "forms"]))
		);
		if ($field_name == "forms_data") return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\Table(new \Runtime\Map(["name" => "forms_data"]))
		);
		if ($field_name == "forms_ip") return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\Table(new \Runtime\Map(["name" => "forms_ip"]))
		);
		if ($field_name == "mail_settings") return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\Table(new \Runtime\Map(["name" => "mail_settings"]))
		);
		if ($field_name == "mail_delivery") return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\Table(new \Runtime\Map(["name" => "mail_delivery"]))
		);
		return null;
	}
}