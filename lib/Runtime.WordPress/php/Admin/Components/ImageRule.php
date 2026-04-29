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
namespace Runtime\WordPress\Admin\Components;

use Runtime\lib;
use Runtime\BaseStruct;
use Runtime\ORM\Connection;
use Runtime\ORM\Record;
use Runtime\Widget\Api\SaveApi;
use Runtime\Widget\Api\SearchApi;
use Runtime\Widget\Api\Rules\BaseRule;
use Runtime\WordPress\WP_Helper;
use Runtime\WordPress\Theme\Components\ImageType;


class ImageRule extends \Runtime\Widget\Api\Rules\BaseRule
{
	var $name;
	var $key;
	
	
	/**
	 * Save item
	 */
	function onSaveBefore($api)
	{
		if (!$api->update_data->has($this->name)) return;
		/* Get image id */
		$image = $api->update_data->get($this->name);
		$image_id = $image->id;
		/* Set image id */
		$api->item->set($this->key, $image_id);
	}
	
	
	/**
	 * Search after
	 */
	function onSearchAfter($api)
	{
		$items = $api->items;
		$images = $api->items->map(function ($item){ return $item->get($this->key); })->filter(function ($id){ return $id > 0; });
		/* Load images */
		$result = \Runtime\WordPress\WP_Helper::loadImages($images);
		/* Map items */
		for ($i = 0; $i < $api->items->count(); $i++)
		{
			$item = $api->items->get($i);
			$image_id = $item->get($this->key);
			$item->set($this->name, $result->get($image_id));
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->name = "";
		$this->key = "";
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.Components.ImageRule"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}