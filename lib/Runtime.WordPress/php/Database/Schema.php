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
class Schema extends \Runtime\ORM\DatabaseSchema
{
	/**
	 * Forms settings
	 */
	static function forms()
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.WordPress.Database.Schema.forms", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\Vector::from([new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"name"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"api_name"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"settings"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"email_to"])),new \Runtime\ORM\Annotations\BooleanType(\Runtime\Map::from(["name"=>"is_deleted"])),new \Runtime\ORM\Annotations\AutoIncrement(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\Primary(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["id"])]))]);
		\Runtime\rtl::_memorizeSave("Runtime.WordPress.Database.Schema.forms", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Forms data
	 */
	static function forms_data()
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.WordPress.Database.Schema.forms_data", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\Vector::from([new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"form_id"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"form_title"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"form_position"])),new \Runtime\ORM\Annotations\JsonType(\Runtime\Map::from(["name"=>"data"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"utm"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"send_email_uuid"])),new \Runtime\ORM\Annotations\TinyIntType(\Runtime\Map::from(["name"=>"send_email_code"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"send_email_error"])),new \Runtime\ORM\Annotations\BooleanType(\Runtime\Map::from(["name"=>"spam"])),new \Runtime\ORM\Annotations\DateTimeType(\Runtime\Map::from(["name"=>"gmtime_add"])),new \Runtime\ORM\Annotations\AutoIncrement(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\Primary(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["id"])]))]);
		\Runtime\rtl::_memorizeSave("Runtime.WordPress.Database.Schema.forms_data", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Forms ip
	 */
	static function forms_ip()
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.WordPress.Database.Schema.forms_ip", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\Vector::from([new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"ip"])),new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"count"])),new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"last"])),new \Runtime\ORM\Annotations\Primary(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["ip"])]))]);
		\Runtime\rtl::_memorizeSave("Runtime.WordPress.Database.Schema.forms_ip", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Mail settings
	 */
	static function mail_settings()
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.WordPress.Database.Schema.mail_settings", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\Vector::from([new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\TinyIntType(\Runtime\Map::from(["name"=>"enable"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"plan"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"host"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"port"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"login"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"password"])),new \Runtime\ORM\Annotations\TinyIntType(\Runtime\Map::from(["name"=>"ssl_enable"])),new \Runtime\ORM\Annotations\BooleanType(\Runtime\Map::from(["name"=>"is_deleted"])),new \Runtime\ORM\Annotations\AutoIncrement(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\Primary(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["id"])]))]);
		\Runtime\rtl::_memorizeSave("Runtime.WordPress.Database.Schema.mail_settings", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Mail log
	 */
	static function mail_delivery()
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.WordPress.Database.Schema.mail_delivery", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\Vector::from([new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"worker"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"plan"])),new \Runtime\ORM\Annotations\TinyIntType(\Runtime\Map::from(["name"=>"status"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"dest"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"uuid"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"title"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"message"])),new \Runtime\ORM\Annotations\DateTimeType(\Runtime\Map::from(["name"=>"gmtime_plan"])),new \Runtime\ORM\Annotations\DateTimeType(\Runtime\Map::from(["name"=>"gmtime_send"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"send_email_error"])),new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"send_email_code"])),new \Runtime\ORM\Annotations\DateTimeType(\Runtime\Map::from(["name"=>"gmtime_add"])),new \Runtime\ORM\Annotations\BooleanType(\Runtime\Map::from(["name"=>"is_delete"])),new \Runtime\ORM\Annotations\AutoIncrement(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\Primary(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["id"])])),new \Runtime\ORM\Annotations\Unique(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["uuid"])]))]);
		\Runtime\rtl::_memorizeSave("Runtime.WordPress.Database.Schema.mail_delivery", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Database";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Database.Schema";
	}
	static function getParentClassName()
	{
		return "Runtime.ORM.DatabaseSchema";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
			"forms",
			"forms_data",
			"forms_ip",
			"mail_settings",
			"mail_delivery",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "forms")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\ORM\Annotations\Table(["name"=>"forms"]),
				]),
			]);
		if ($field_name == "forms_data")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\ORM\Annotations\Table(["name"=>"forms_data"]),
				]),
			]);
		if ($field_name == "forms_ip")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\ORM\Annotations\Table(["name"=>"forms_ip"]),
				]),
			]);
		if ($field_name == "mail_settings")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\ORM\Annotations\Table(["name"=>"mail_settings"]),
				]),
			]);
		if ($field_name == "mail_delivery")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\ORM\Annotations\Table(["name"=>"mail_delivery"]),
				]),
			]);
		return null;
	}
}