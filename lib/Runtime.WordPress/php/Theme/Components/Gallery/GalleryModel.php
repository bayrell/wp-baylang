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

use Runtime\Serializer;
use Runtime\Web\ApiResult;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Gallery\GalleryModel as BaseGalleryModel;


class GalleryModel extends \Runtime\Widget\Gallery\GalleryModel
{
	var $api_name;
	var $big_size;
	var $small_size;
	
	
	/**
	 * Returns small image
	 */
	function getSmallImage($pos)
	{
		$item = $this->getItem($pos);
		if (!$item) return "";
		$image = $item["image", "sizes", $this->small_size];
		if (!$image) return "";
		return $image->get("file");
	}
	
	
	/**
	 * Returns big image
	 */
	function getBigImage($pos)
	{
		$item = $this->getItem($pos);
		if (!$item) return "";
		$image = $item["image", "sizes", $this->big_size];
		if (!$image) return "";
		return $image->get("file");
	}
	
	
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null) return;
		if ($params->has("api_name")) $this->api_name = $params->get("api_name");
		if ($params->has("big_size")) $this->big_size = $params->get("big_size");
		if ($params->has("small_size")) $this->small_size = $params->get("small_size");
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
		$result = $this->layout->callApi(new \Runtime\Map([
			"api_name" => "runtime.wordpress.gallery",
			"method_name" => "actionSearch",
			"data" => new \Runtime\Map([
				"api_name" => $this->api_name,
			]),
		]));
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
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->api_name = "";
		$this->big_size = "medium_large";
		$this->small_size = "medium";
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Gallery.GalleryModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}