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

use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\Required;
use Runtime\Serializer\StringType;
use Runtime\ORM\Query;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\SaveApi;
use Runtime\WordPress\Admin\AdminMiddleware;
use Runtime\WordPress\Admin\Components\ImageRule;
use Runtime\WordPress\Theme\Components\ImageType;
use Runtime\WordPress\Database\GalleryItem;


class GalleryItemSaveApi extends \Runtime\Widget\Api\SaveApi
{
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "admin.wordpress.gallery.item"; }
	
	
	/**
	 * Returns record name
	 */
	static function getRecordName(){ return "Runtime.WordPress.Database.GalleryItem"; }
	
	
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
	 * Returns data rules
	 */
	function getDataRules($rules)
	{
		$rules->addType("foreign_key", new \Runtime\Serializer\Required());
		$rules->addType("foreign_key", new \Runtime\Serializer\MapType(new \Runtime\Map([
			"item_id" => new \Runtime\Serializer\IntegerType(),
		])));
	}
	
	
	/**
	 * Returns item rules
	 */
	function getItemRules($rules)
	{
		$rules->addType("name", new \Runtime\Serializer\StringType());
		$rules->addType("image", new \Runtime\Serializer\ObjectType(new \Runtime\Map(["class_name" => "Runtime.WordPress.Theme.Components.ImageType"])));
		$rules->addType("pos", new \Runtime\Serializer\IntegerType());
	}
	
	
	/**
	 * Returns rules
	 */
	function rules()
	{
		return new \Runtime\Vector(
			new \Runtime\WordPress\Admin\Components\ImageRule(new \Runtime\Map(["name" => "image", "key" => "image_id"])),
		);
	}
	
	
	/**
	 * Returns item fields
	 */
	function getItemFields($action)
	{
		return new \Runtime\Vector(
			"id",
			"name",
			"image",
			"image_id",
			"pos",
		);
	}
	
	
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return new \Runtime\Vector(
			"name",
			"pos",
		);
	}
	
	
	/**
	 * Build query
	 */
	function buildQuery($q)
	{
		$q->where("gallery_id", "=", $this->foreign_key->get("item_id"));
	}
	
	
	/**
	 * Before save
	 */
	function onSaveBefore()
	{
		$this->item->gallery_id = $this->foreign_key->get("item_id");
	}
	
	
	/**
	 * Action save
	 */
	function actionSave()
	{
		parent::actionSave();
	}
	
	
	/**
	 * Action delete
	 */
	function actionDelete()
	{
		parent::actionDelete();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionSave", "actionDelete");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSave") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "save"]))
		);
		if ($field_name == "actionDelete") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "delete"]))
		);
		return null;
	}
}