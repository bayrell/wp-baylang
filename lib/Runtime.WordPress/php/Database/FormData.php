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
class FormData extends \Runtime\ORM\Relation
{
	/**
     * Returns table name
     */
	static function getTableName()
	{
		return "forms_data";
	}
	/**
     * Returns table schema
     */
	static function schema()
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.WordPress.Database.FormData.schema", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\Vector::from([new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\BigIntType(\Runtime\Map::from(["name"=>"form_id"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"form_title"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"metrika_id"])),new \Runtime\ORM\Annotations\JsonType(\Runtime\Map::from(["name"=>"data"])),new \Runtime\ORM\Annotations\StringType(\Runtime\Map::from(["name"=>"utm"])),new \Runtime\ORM\Annotations\BooleanType(\Runtime\Map::from(["name"=>"spam"])),new \Runtime\ORM\Annotations\DateTimeType(\Runtime\Map::from(["name"=>"gmtime_add"])),new \Runtime\ORM\Annotations\AutoIncrement(\Runtime\Map::from(["name"=>"id"])),new \Runtime\ORM\Annotations\Primary(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["id"])]))]);
		\Runtime\rtl::_memorizeSave("Runtime.WordPress.Database.FormData.schema", func_get_args(), $__memorize_value);
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
		return "Runtime.WordPress.Database.FormData";
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