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
namespace Runtime\Auth\Database\Migrations;

use Runtime\ORM\BaseMigration;
use Runtime\ORM\Query;


class AuthMigration extends \Runtime\ORM\BaseMigration
{
	/**
	 * Returns migration name
	 */
	var $name;
	
	
	/**
	 * Returns required
	 */
	var $required;
	
	
	/**
	 * Register migration
	 */
	var $migrations;
	
	
	/**
	 * Returns table name
	 */
	function getTableName(){ return $this->connection->getTableName("users"); }
	
	
	/**
	 * Create users table migration
	 */
	function create_users_table()
	{
		return new \Runtime\ORM\BaseMigration(new \Runtime\Map([
			"up" => function ()
			{
				$table_name = $this->getTableName();
				$this->comment("Create table " . $table_name);
				$this->executeSQL("CREATE TABLE `" . $table_name . "` (\n\t\t\t\t\t`id` BIGINT NOT NULL AUTO_INCREMENT,\n\t\t\t\t\t`login` VARCHAR(255) NOT NULL DEFAULT '',\n\t\t\t\t\t`password` VARCHAR(255) NOT NULL DEFAULT '',\n\t\t\t\t\t`is_deleted` TINYINT(1) NOT NULL DEFAULT 0,\n\t\t\t\t\t`gmtime_add` DATETIME NOT NULL,\n\t\t\t\t\t`gmtime_edit` DATETIME NOT NULL,\n\t\t\t\t\tPRIMARY KEY (`id`),\n\t\t\t\t\tUNIQUE KEY `login` (`login`)\n\t\t\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
			},
			"down" => function ()
			{
				$table_name = $this->getTableName();
				$this->comment("Drop table " . $table_name);
				$this->executeSQL("DROP TABLE IF EXISTS `" . $table_name . "`");
			},
		]));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->name = "auth_2026";
		$this->required = new \Runtime\Vector();
		$this->migrations = new \Runtime\Vector(
			"create_users_table",
		);
	}
	static function getClassName(){ return "Runtime.Auth.Database.Migrations.AuthMigration"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}