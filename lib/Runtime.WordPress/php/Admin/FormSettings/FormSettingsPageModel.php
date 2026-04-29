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
namespace Runtime\WordPress\Admin\FormSettings;

use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\Method;
use Runtime\Serializer\BooleanType;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Table\TableManager;
use Runtime\WordPress\Admin\FormSettings\FormItem;
use Runtime\WordPress\Admin\FormSettings\FormSettingsPage;


class FormSettingsPageModel extends \Runtime\BaseModel
{
	var $component;
	var $manager;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("manager", new \Runtime\Serializer\ObjectType());
	}
	
	
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		$this->manager = $this->createWidget("Runtime.Widget.Table.TableManager", new \Runtime\Map([
			"autoload" => true,
			"api_name" => "admin.wordpress.forms.settings",
			"page_name" => "p",
			"title" => new \Runtime\Method($this, "getItemTitle"),
			"primary_rules" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
			])),
			"item_rules" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
				"name" => new \Runtime\Serializer\StringType(),
				"api_name" => new \Runtime\Serializer\StringType(),
				"email_to" => new \Runtime\Serializer\StringType(),
				"settings" => new \Runtime\Serializer\MapType(new \Runtime\Map([
					"fields" => new \Runtime\Serializer\VectorType(new \Runtime\Serializer\MapType(new \Runtime\Map([
						"name" => new \Runtime\Serializer\StringType(),
						"type" => new \Runtime\Serializer\StringType(),
						"title" => new \Runtime\Serializer\StringType(),
						"placeholder" => new \Runtime\Serializer\StringType(),
						"required" => new \Runtime\Serializer\StringType(),
					]))),
				])),
			])),
			"form_fields" => new \Runtime\Vector(
				new \Runtime\Map([
					"name" => "name",
					"label" => "Name",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "api_name",
					"label" => "Api name",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "email_to",
					"label" => "Email to",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "fields",
					"label" => "Fields",
					"component" => "Runtime.WordPress.Admin.FormSettings.FieldSettings",
					"value" => function ($item)
					{
						$settings = $item->get("settings");
						if (!$settings) return new \Runtime\Vector();
						$fields = $settings->get("fields");
						return $fields ? $fields : new \Runtime\Vector();
					},
					"setValue" => function ($item, $value)
					{
						$settings = $item->get("settings");
						if (!$settings)
						{
							$settings = new \Runtime\Map();
							$item->set("settings", $settings);
						}
						$settings->set("fields", $value);
					},
				]),
			),
			"table_fields" => new \Runtime\Vector(
				new \Runtime\Map([
					"name" => "row_number",
				]),
				new \Runtime\Map([
					"name" => "name",
					"label" => "Name",
				]),
				new \Runtime\Map([
					"name" => "api_name",
					"label" => "Api name",
				]),
				new \Runtime\Map([
					"name" => "email_to",
					"label" => "Email to",
				]),
				new \Runtime\Map([
					"name" => "buttons",
					"slot" => "row_buttons",
				]),
			),
		]));
	}
	
	
	/**
	 * Returns item title
	 */
	function getItemTitle($action, $item)
	{
		if ($action == "add") return "Add item";
		else if ($action == "edit") return "Edit item";
		else if ($action == "delete") return "Delete item";
		else if ($action == "delete_message") return "Delete item";
		return "";
	}
	
	
	/**
	 * Load data
	 */
	function loadData($container)
	{
		parent::loadData($container);
	}
	
	
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Forms settings");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.FormSettings.FormSettingsPage";
		$this->manager = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}