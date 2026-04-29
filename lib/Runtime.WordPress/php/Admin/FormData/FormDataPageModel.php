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
namespace Runtime\WordPress\Admin\FormData;

use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\DateTime;
use Runtime\Serializer\DateTimeType;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Table\TableModel;
use Runtime\WordPress\Admin\FormData\FormDataPage;


class FormDataPageModel extends \Runtime\BaseModel
{
	var $component;
	var $table;
	var $page;
	var $pages;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("table", new \Runtime\Serializer\ObjectType(new \Runtime\Map([
			"class_name" => "Runtime.Widget.Table.TableModel",
			"item_rules" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
				"form_title" => new \Runtime\Serializer\StringType(),
				"form_name" => new \Runtime\Serializer\StringType(),
				"data" => new \Runtime\Serializer\MapType(new \Runtime\Serializer\StringType()),
				"gmtime_add" => new \Runtime\Serializer\DateTimeType(),
			])),
		])));
	}
	
	
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Create table */
		$this->table = $this->createWidget("Runtime.Widget.Table.TableModel");
	}
	
	
	/**
	 * Load data
	 */
	function loadData($container)
	{
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => "admin.wordpress.forms.data",
			"method_name" => "search",
			"data" => new \Runtime\Map([
				"page" => $this->page,
			]),
		]));
		if ($result->isSuccess())
		{
			$this->table->items = $result->data->get("items");
			$this->page = $result->data->get("page");
			$this->pages = $result->data->get("pages");
		}
	}
	
	
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Forms data");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.FormData.FormDataPage";
		$this->table = null;
		$this->page = 0;
		$this->pages = 0;
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.FormData.FormDataPageModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}