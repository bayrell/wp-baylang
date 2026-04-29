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
namespace Runtime\WordPress\Admin\MailSettings;

use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\Method;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\BoolEnum;
use Runtime\Widget\Table\TableManager;
use Runtime\Widget\Table\TableModel;
use Runtime\Widget\Table\TableLoader;
use Runtime\WordPress\Admin\MailSettings\MailSettingsPage;


class MailSettingsPageModel extends \Runtime\BaseModel
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
			"api_name" => "admin.wordpress.mail.settings",
			"page_name" => "p",
			"title" => new \Runtime\Method($this, "getItemTitle"),
			"primary_rules" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
			])),
			"item_rules" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
				"enable" => new \Runtime\Serializer\IntegerType(),
				"plan" => new \Runtime\Serializer\StringType(),
				"host" => new \Runtime\Serializer\StringType(),
				"port" => new \Runtime\Serializer\StringType(),
				"login" => new \Runtime\Serializer\StringType(),
				"password" => new \Runtime\Serializer\StringType(),
				"ssl_enable" => new \Runtime\Serializer\IntegerType(),
			])),
			"form_fields" => new \Runtime\Vector(
				new \Runtime\Map([
					"name" => "enable",
					"label" => "Enable",
					"component" => "Runtime.Widget.Select",
					"props" => new \Runtime\Map([
						"options" => \Runtime\Widget\BoolEnum::options(),
					]),
				]),
				new \Runtime\Map([
					"name" => "plan",
					"label" => "Plan",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "host",
					"label" => "Host",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "port",
					"label" => "Port",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "login",
					"label" => "Login",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "password",
					"label" => "Password",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "ssl_enable",
					"label" => "SSL",
					"component" => "Runtime.Widget.Select",
					"props" => new \Runtime\Map([
						"options" => \Runtime\Widget\BoolEnum::options(),
					]),
				]),
			),
			"table_fields" => new \Runtime\Vector(
				new \Runtime\Map([
					"name" => "row_number",
				]),
				new \Runtime\Map([
					"name" => "enable",
					"label" => "Enable",
					"value" => function ($item){ return \Runtime\Widget\BoolEnum::label($item->get("enable")); },
				]),
				new \Runtime\Map([
					"name" => "plan",
					"label" => "Plan",
				]),
				new \Runtime\Map([
					"name" => "host",
					"label" => "Host",
				]),
				new \Runtime\Map([
					"name" => "port",
					"label" => "Port",
				]),
				new \Runtime\Map([
					"name" => "login",
					"label" => "Login",
				]),
				new \Runtime\Map([
					"name" => "ssl_enable",
					"label" => "SSL",
					"value" => function ($item){ return \Runtime\Widget\BoolEnum::label($item->get("enable")); },
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
		$this->layout->setPageTitle("Mail settings");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.MailSettings.MailSettingsPage";
		$this->manager = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}