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

use Runtime\lib;
use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\ResultModel;
use Runtime\Widget\Tab\TabsModel;
use Runtime\WordPress\Admin\Migrations\MigrationPage;


class MigrationPageModel extends \Runtime\BaseModel
{
	var $component;
	var $items;
	var $result;
	
	
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add result */
		$this->result = $this->createWidget("Runtime.Widget.ResultModel", new \Runtime\Map([
			"styles" => new \Runtime\Vector("margin_top"),
		]));
	}
	
	
	/**
	 * Process frontend data
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("items", new \Runtime\Serializer\VectorType(new \Runtime\Serializer\StringType()));
	}
	
	
	/**
	 * Update database
	 */
	function updateDatabase()
	{
		$this->result->setWaitMessage();
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => "admin.wordpress.migration",
			"method_name" => "update",
		]));
		$this->result->setApiResult($result);
	}
	
	
	/**
	 * Load table data
	 */
	function loadData($container)
	{
		parent::loadData($container);
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => "admin.wordpress.migration",
			"method_name" => "item",
		]));
		if ($result->isSuccess())
		{
			$this->items = $result->data->get("items");
		}
	}
	
	
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Database migrations");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.Migrations.MigrationPage";
		$this->items = new \Runtime\Vector();
		$this->result = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.Migrations.MigrationPageModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}