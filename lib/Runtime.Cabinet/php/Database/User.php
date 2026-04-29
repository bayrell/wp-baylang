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
namespace Runtime\Cabinet\Database;

use Runtime\BaseStruct;
use Runtime\DateTime;
use Runtime\Crypt\Password;
use Runtime\ORM\Connection;
use Runtime\ORM\Query;
use Runtime\ORM\QueryFilter;
use Runtime\ORM\Record;
use Runtime\ORM\Relation;
use Runtime\ORM\Annotations\AutoIncrement;
use Runtime\ORM\Annotations\BigIntType;
use Runtime\ORM\Annotations\BooleanType;
use Runtime\ORM\Annotations\DateTimeType;
use Runtime\ORM\Annotations\IntegerType;
use Runtime\ORM\Annotations\Primary;
use Runtime\ORM\Annotations\StringType;
use Runtime\Auth\Database\User as BaseUser;


class User extends \Runtime\Auth\Database\User
{
	/**
	 * Returns table name
	 */
	static function getTableName(){ return "cabinet_users"; }
	
	
	/**
	 * Returns table schema
	 */
	static function schema()
	{
		$fields = parent::schema();
		$fields->appendItems(new \Runtime\Vector(
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "email"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "name"])),
		));
		return $fields;
	}
	
	
	/**
	 * Returns token data
	 */
	function getTokenData()
	{
		return new \Runtime\Map([
			"id" => $this->id,
			"login" => $this->login,
		]);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.Cabinet.Database.User"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}