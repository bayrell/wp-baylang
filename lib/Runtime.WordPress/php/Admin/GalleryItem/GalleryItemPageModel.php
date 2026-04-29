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
namespace Runtime\WordPress\Admin\GalleryItem;

use Runtime\BaseModel;
use Runtime\Method;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Table\TableManager;
use Runtime\WordPress\Admin\GalleryItem\GalleryItemPage;
use Runtime\WordPress\Theme\Components\ImageType;


class GalleryItemPageModel extends \Runtime\BaseModel
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
			"api_name" => "admin.wordpress.gallery.item",
			"page_name" => "p",
			"title" => new \Runtime\Method($this, "getItemTitle"),
			"primary_rules" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
			])),
			"item_rules" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
				"name" => new \Runtime\Serializer\StringType(),
				"image" => new \Runtime\Serializer\ObjectType(new \Runtime\Map([
					"class_name" => "Runtime.WordPress.Theme.Components.ImageType",
				])),
				"pos" => new \Runtime\Serializer\IntegerType(),
			])),
			"foreign_rules" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"item_id" => new \Runtime\Serializer\IntegerType(),
			])),
			"form_fields" => new \Runtime\Vector(
				new \Runtime\Map([
					"name" => "name",
					"label" => "Name",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "image",
					"label" => "Image",
					"component" => "Runtime.WordPress.Admin.Components.Image",
					"props" => new \Runtime\Map([
						"upload" => true,
					]),
				]),
				new \Runtime\Map([
					"name" => "pos",
					"label" => "Pos",
					"component" => "Runtime.Widget.Input",
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
					"name" => "image",
					"label" => "Image",
					"component" => "Runtime.WordPress.Admin.Components.Image",
				]),
				new \Runtime\Map([
					"name" => "pos",
					"label" => "pos",
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
		$this->manager->setForeignKey(new \Runtime\Map([
			"item_id" => $container->request->query->get("id"),
		]));
		parent::loadData($container);
	}
	
	
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Gallery items");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.GalleryItem.GalleryItemPage";
		$this->manager = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}