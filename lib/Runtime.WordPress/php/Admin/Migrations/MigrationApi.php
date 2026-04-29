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
namespace Runtime\WordPress\Admin\Migrations;

use Runtime\BaseObject;
use Runtime\ORM\MigrationBuilder;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Web\BaseApi;
use Runtime\WordPress\WP_Helper;
use Runtime\WordPress\Admin\AdminMiddleware;


class MigrationApi extends \Runtime\Web\BaseApi
{
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "admin.wordpress.migration"; }
	
	
	/**
	 * Returns middleware
	 */
	function getMiddleware()
	{
		return new \Runtime\Vector(
			new \Runtime\WordPress\Admin\AdminMiddleware(),
		);
	}
	
	
	/**
	 * Execute
	 */
	function up($execute = false)
	{
		/* Get migrations */
		$builder = new \Runtime\ORM\MigrationBuilder();
		/* Init builder */
		$builder->init();
		/* Up migrations */
		$builder->up($execute);
		/* Returns builder */
		return $builder;
	}
	
	
	/**
	 * Action item
	 */
	function actionItem()
	{
		$builder = $this->up();
		$this->success(new \Runtime\Map([
			"data" => new \Runtime\Map([
				"items" => $builder->getSQL(),
			]),
		]));
	}
	
	
	/**
	 * Update database
	 */
	function actionUpdate()
	{
		$builder = $this->up(true);
		$this->success();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.Migrations.MigrationApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionItem", "actionUpdate");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionItem") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "item"]))
		);
		if ($field_name == "actionUpdate") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "update"]))
		);
		return null;
	}
}