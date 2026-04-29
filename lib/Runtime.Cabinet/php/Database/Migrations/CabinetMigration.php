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
namespace Runtime\Cabinet\Database\Migrations;

use Runtime\Auth\Database\Migrations\AuthMigration;
use Runtime\ORM\BaseMigration;
use Runtime\ORM\Query;


class CabinetMigration extends \Runtime\Auth\Database\Migrations\AuthMigration
{
	/**
	 * Migration name
	 */
	var $name;
	
	
	/**
	 * Register migration
	 */
	var $migrations;
	
	
	/**
	 * Returns table name
	 */
	function getTableName(){ return $this->connection->getTableName("cabinet_users"); }
	
	
	
	/**
	 * Create users table migration
	 */
	function append_users_table()
	{
		return new \Runtime\ORM\BaseMigration(new \Runtime\Map([
			"up" => function ()
			{
				$table_name = $this->getTableName();
				$this->comment("Add email and name columns to " . $table_name);
				$this->executeSQL("ALTER TABLE `" . $table_name . "` " . "ADD COLUMN `email` VARCHAR(255) NOT NULL DEFAULT '' AFTER `login`, " . "ADD COLUMN `name` VARCHAR(255) NOT NULL DEFAULT '' AFTER `email`");
				$this->executeSQL("ALTER TABLE `" . $table_name . "` " . "ADD UNIQUE `email` (`email`)");
			},
			"down" => function ()
			{
				$table_name = $this->getTableName();
				$this->comment("Remove email and name columns from " . $table_name);
				$this->executeSQL("ALTER TABLE `" . $table_name . "` " . "DROP COLUMN `email`, `name`");
			},
		]));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->name = "cabinet_2026";
		$this->migrations = new \Runtime\Vector(
			"create_users_table",
			"append_users_table",
		);
	}
	static function getClassName(){ return "Runtime.Cabinet.Database.Migrations.CabinetMigration"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}