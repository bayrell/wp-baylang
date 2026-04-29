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
namespace Runtime\ORM\Commands;

use Runtime\Console\BaseCommand;
use Runtime\ORM\MigrationBuilder;


class MigrationUp extends \Runtime\Console\BaseCommand
{
	/**
	 * Returns name
	 */
	static function getName(){ return "database:migration:up"; }
	
	
	/**
	 * Returns description
	 */
	static function getDescription(){ return "Migration up"; }
	
	
	/**
	 * Run task
	 */
	static function run()
	{
		$builder = new \Runtime\ORM\MigrationBuilder();
		$builder->init();
		$builder->up();
		$sql = $builder->getSQL();
		\Runtime\rtl::print($sql);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.ORM.Commands.MigrationUp"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}