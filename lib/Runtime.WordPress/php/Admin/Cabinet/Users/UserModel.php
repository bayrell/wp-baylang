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
namespace Runtime\WordPress\Admin\Cabinet\Users;

use Runtime\BaseModel;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Table\TableManager;
use Runtime\WordPress\Admin\Cabinet\Users\UserPage;


class UserModel extends \Runtime\BaseModel
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
	 * Init widget
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		$this->manager = $this->createWidget("Runtime.Widget.Table.TableManager", new \Runtime\Map([
			"autoload" => true,
			"api_name" => "admin.cabinet.users",
			"page_name" => "p",
			"title" => new \Runtime\Method($this, "getTableTitle"),
			"primary_rules" => new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
			]),
			"item_rules" => new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
				"login" => new \Runtime\Serializer\StringType(),
				"email" => new \Runtime\Serializer\StringType(),
				"name" => new \Runtime\Serializer\StringType(),
				"is_deleted" => new \Runtime\Serializer\IntegerType(),
			]),
			"form_fields" => new \Runtime\Vector(
				new \Runtime\Map([
					"name" => "login",
					"label" => "Login",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "email",
					"label" => "Email",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "name",
					"label" => "Name",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "is_deleted",
					"label" => "Status",
					"component" => "Runtime.Widget.Select",
					"props" => new \Runtime\Map([
						"options" => new \Runtime\Vector(
							new \Runtime\Map(["key" => 0, "value" => "Active"]),
							new \Runtime\Map(["key" => 1, "value" => "Inactive"]),
						),
					]),
				]),
				new \Runtime\Map([
					"name" => "password",
					"label" => "Password",
					"component" => "Runtime.Widget.Input",
					"props" => new \Runtime\Map([
						"type" => "password",
					]),
				]),
				new \Runtime\Map([
					"name" => "repeat_password",
					"label" => "Repeat password",
					"component" => "Runtime.Widget.Input",
					"props" => new \Runtime\Map([
						"type" => "password",
					]),
				]),
			),
			"table_fields" => new \Runtime\Vector(
				new \Runtime\Map([
					"name" => "row_number",
				]),
				new \Runtime\Map([
					"name" => "login",
					"label" => "Login",
				]),
				new \Runtime\Map([
					"name" => "email",
					"label" => "Email",
				]),
				new \Runtime\Map([
					"name" => "name",
					"label" => "Name",
				]),
				new \Runtime\Map([
					"name" => "is_deleted",
					"label" => "Status",
					"value" => function ($item)
					{
						$is_deleted = $item->get("is_deleted");
						if ($is_deleted == 0) return "Active";
						return "Inactive";
					},
				]),
				new \Runtime\Map([
					"name" => "buttons",
					"slot" => "row_buttons",
				]),
			),
		]));
	}
	
	
	/**
	 * Returns table title
	 */
	function getTableTitle($action, $item)
	{
		if ($action == "add") return "Add User";
		else if ($action == "edit") return "Edit User";
		else if ($action == "delete") return "Delete User";
		else if ($action == "delete_message") return "Delete User";
		return "Users";
	}
	
	
	/**
	 * Build page title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Cabinet Users");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.Cabinet.Users.UserPage";
		$this->manager = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.Cabinet.Users.UserModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}