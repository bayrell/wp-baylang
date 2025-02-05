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
class GalleryItemSaveApi extends \Runtime\Widget\Crud\SaveApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "admin.wordpress.gallery.item.save";
	}
	/**
	 * Returns service
	 */
	function createService()
	{
		return new \Runtime\WordPress\Admin\GalleryItem\GalleryItemService();
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from(["id","name","image","image_id","pos"]);
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		/* Create service */
		$service = $this->createService();
		/* Foreign key */
		$service->loadGallery(\Runtime\rtl::attr($this->post_data, ["foreign_key", "gallery_id"]));
		/* Load item */
		$service->loadItem($this->post_data->get("pk"), true);
		/* Save item */
		$service->save($this->post_data->get("item"));
		/* Build result */
		$this->buildResult($service);
	}
	/**
	 * Action delete
	 */
	function actionDelete()
	{
		/* Create service */
		$service = $this->createService();
		/* Foreign key */
		$service->loadGallery(\Runtime\rtl::attr($this->post_data, ["foreign_key", "gallery_id"]));
		/* Load item */
		$service->loadItem($this->post_data->get("pk"));
		/* Delete item */
		$service->delete();
		/* Build result */
		$this->buildResult($service);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.GalleryItem";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.SaveApi";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
			"actionSave",
			"actionDelete",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSave")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "actionDelete")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}