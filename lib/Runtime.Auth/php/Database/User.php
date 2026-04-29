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
namespace Runtime\Auth\Database;

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
use Runtime\ORM\Annotations\Primary;
use Runtime\ORM\Annotations\StringType;


class User extends \Runtime\ORM\Record
{
	/**
	 * Returns table name
	 */
	static function getTableName(){ return "users"; }
	
	
	/**
	 * Returns table schema
	 */
	static function schema()
	{
		return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\BigIntType(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "login"])),
			new \Runtime\ORM\Annotations\StringType(new \Runtime\Map(["name" => "password"])),
			new \Runtime\ORM\Annotations\BooleanType(new \Runtime\Map(["name" => "is_deleted"])),
			new \Runtime\ORM\Annotations\DateTimeType(new \Runtime\Map(["name" => "gmtime_add", "autocreate" => true])),
			new \Runtime\ORM\Annotations\DateTimeType(new \Runtime\Map(["name" => "gmtime_edit", "autocreate" => true])),
			new \Runtime\ORM\Annotations\AutoIncrement(new \Runtime\Map(["name" => "id"])),
			new \Runtime\ORM\Annotations\Primary(new \Runtime\Map(["keys" => new \Runtime\Vector("id")])),
		);
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
	
	
	/**
	 * Save
	 */
	function save($params = null)
	{
		parent::save($params);
	}
	
	
	/**
	 * Check password
	 */
	function checkPassword($password)
	{
		return \Runtime\Crypt\Password::verify($password, $this->get("password"));
	}
	
	
	/**
	 * Set new password
	 */
	function setPassword($password)
	{
		$this->password = \Runtime\Crypt\Password::createHash($password);
	}
	
	
	/**
	 * Find user
	 */
	static function findUser($login, $relation = null)
	{
		if (!$relation) $relation = new \Runtime\ORM\Relation(static::getClassName());
		$user = $relation->fetchRecord($relation->select()->where("login", "=", $login)->where("is_deleted", "=", 0));
		return $user;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.Auth.Database.User"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}