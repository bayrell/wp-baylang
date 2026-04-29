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

use Runtime\Entity\Entity;
use Runtime\ORM\Annotations\Migration;
use Runtime\ORM\Annotations\Table;
use Runtime\Cabinet\Database\Migrations\CabinetMigration;
use Runtime\Cabinet\Database\User;


class ModuleDescription
{
	/**
	 * Returns module name
	 */
	static function getModuleName(){ return "Runtime.Cabinet.Database"; }
	
	
	/**
	 * Returns module version
	 */
	static function getModuleVersion(){ return "1.0"; }
	
	
	/**
	 * Returns required modules
	 */
	static function requiredModules()
	{
		return new \Runtime\Map([
			"Runtime" => "*",
		]);
	}
	
	
	/**
	 * Returns entities
	 */
	static function entities()
	{
		return new \Runtime\Vector(
			new \Runtime\ORM\Annotations\Migration("Runtime.Cabinet.Database.Migrations.CabinetMigration"),
			new \Runtime\ORM\Annotations\Table("Runtime.Cabinet.Database.User"),
		);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
	}
	static function getClassName(){ return "Runtime.Cabinet.Database.ModuleDescription"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}