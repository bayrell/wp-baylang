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
class MailDelivery extends \Runtime\ORM\Relation
{
	/**
     * Returns table name
     */
	static function getTableName()
	{
		return "mail_delivery";
	}
	/**
     * Returns table schema
     */
	static function schema()
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.WordPress.Database.MailDelivery.schema", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\Vector::from([new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"worker"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"plan"])),new \Runtime\ORM\Annotations\TinyIntType(\Runtime\Map::from(["name"=>"status"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"dest"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"uuid"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"title"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"message"])),new \Runtime\ORM\Annotations\DateTimeType(\Runtime\Map::from(["name"=>"gmtime_plan"])),new \Runtime\ORM\Annotations\DateTimeType(\Runtime\Map::from(["name"=>"gmtime_send"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"send_email_error"])),new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"send_email_code"])),new \Runtime\ORM\Annotations\DateTimeType(\Runtime\Map::from(["name"=>"gmtime_add"])),new \Runtime\ORM\Annotations\BooleanType(\Runtime\Map::from(["name"=>"is_delete"])),new \Runtime\ORM\Annotations\AutoIncrement(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\Primary(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["id"])])),new \Runtime\ORM\Annotations\Unique(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["uuid"])]))]);
		\Runtime\rtl::_memorizeSave("Runtime.WordPress.Database.MailDelivery.schema", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Save
	 */
	function save($connection, $params=null)
	{
		if ($this->get("gmtime_add") == null)
		{
			$this->set("gmtime_add", \Runtime\DateTime::now());
		}
		parent::save($connection, $params);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Database";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Database.MailDelivery";
	}
	static function getParentClassName()
	{
		return "Runtime.ORM.Relation";
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
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}