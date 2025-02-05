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
class GalleryItemService extends \Runtime\Widget\Crud\RelationService
{
	public $gallery;
	/**
	 * Returns relation name
	 */
	function getRelationName()
	{
		return "Runtime.WordPress.Database.GalleryItem";
	}
	/**
	 * Init rules
	 */
	function initRules()
	{
		$this->rules->addRules(\Runtime\Vector::from([new \Runtime\WordPress\Admin\Components\ImageRule(\Runtime\Map::from(["name"=>"image","key"=>"image_id"]))]));
	}
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return \Runtime\Vector::from(["name","image_id","pos"]);
	}
	/**
	 * Load gallery
	 */
	function loadGallery($gallery_id)
	{
		$service = new \Runtime\WordPress\Admin\Gallery\GalleryCrudService();
		$service->loadItem(\Runtime\Map::from(["id"=>$gallery_id]));
		$this->gallery = $service->item;
	}
	/**
	 * Build search query
	 */
	function buildSearchQuery($q)
	{
		$q->where("gallery_id", "=", $this->gallery->get("id"));
		$q->orderBy("pos", "desc");
		$q->orderBy("id", "desc");
	}
	/**
	 * Save item
	 */
	function saveItem()
	{
		$this->item->set("gallery_id", $this->gallery->get("id"));
		parent::saveItem();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->gallery = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.GalleryItem";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.GalleryItem.GalleryItemService";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.RelationService";
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
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}