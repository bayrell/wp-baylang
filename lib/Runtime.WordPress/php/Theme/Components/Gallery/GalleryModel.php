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
namespace Runtime\WordPress\Theme\Components\Gallery;
class GalleryModel extends \Runtime\Widget\Gallery\GalleryModel
{
	public $api_name;
	public $big_size;
	public $small_size;
	/**
	 * Returns small image
	 */
	function getSmallImage($pos)
	{
		$item = $this->getItem($pos);
		if (!$item)
		{
			return "";
		}
		$image = \Runtime\rtl::attr($item, ["image", "sizes", $this->small_size]);
		if (!$image)
		{
			return "";
		}
		return $image->get("file");
	}
	/**
	 * Returns big image
	 */
	function getBigImage($pos)
	{
		$item = $this->getItem($pos);
		if (!$item)
		{
			return "";
		}
		$image = \Runtime\rtl::attr($item, ["image", "sizes", $this->big_size]);
		if (!$image)
		{
			return "";
		}
		return $image->get("file");
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
		if ($params->has("api_name"))
		{
			$this->api_name = $params->get("api_name");
		}
		if ($params->has("big_size"))
		{
			$this->big_size = $params->get("big_size");
		}
		if ($params->has("small_size"))
		{
			$this->small_size = $params->get("small_size");
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "items", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Load items
	 */
	function loadItems()
	{
		$result = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"runtime.wordpress.gallery","method_name"=>"actionSearch","data"=>\Runtime\Map::from(["api_name"=>$this->api_name])]));
		if ($result->isSuccess())
		{
			$this->items = $result->data->get("items");
		}
	}
	/**
	 * Load data
	 */
	function loadData($container)
	{
		parent::loadData($container);
		$this->loadItems();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->api_name = "";
		$this->big_size = "medium_large";
		$this->small_size = "medium";
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Components.Gallery";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Components.Gallery.GalleryModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Gallery.GalleryModel";
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