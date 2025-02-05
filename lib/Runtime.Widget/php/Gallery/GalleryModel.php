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
namespace Runtime\Widget\Gallery;
class GalleryModel extends \Runtime\Web\BaseModel
{
	public $component;
	public $widget_name;
	public $dialog_image_contains;
	public $items;
	public $dialog;
	/**
	 * Returns items
	 */
	function getItems()
	{
		return $this->items;
	}
	/**
	 * Returns item
	 */
	function getItem($pos)
	{
		return $this->items->get($pos);
	}
	/**
	 * Returns small image
	 */
	function getSmallImage($pos)
	{
		return $this->getItem($pos);
	}
	/**
	 * Returns big image
	 */
	function getBigImage($pos)
	{
		return $this->getItem($pos);
	}
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null)
		{
			return ;
		}
		if ($params->has("dialog_image_contains"))
		{
			$this->dialog_image_contains = $params->get("dialog_image_contains");
		}
		if ($params->has("items"))
		{
			$this->items = $params->get("items");
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add dialog */
		$this->dialog = $this->addWidget("Runtime.Widget.Gallery.GalleryDialogModel", \Runtime\Map::from(["modal"=>false]));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.Gallery.Gallery";
		$this->widget_name = "gallery";
		$this->dialog_image_contains = false;
		$this->items = \Runtime\Vector::from([]);
		$this->dialog = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Gallery";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Gallery.GalleryModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseModel";
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