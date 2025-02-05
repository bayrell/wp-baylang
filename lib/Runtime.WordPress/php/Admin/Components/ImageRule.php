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
class ImageRule extends \Runtime\Widget\Crud\Rules\CrudRule
{
	public $__name;
	public $__key;
	/**
	 * Save item
	 */
	function onSaveBefore($service)
	{
		if (!$service->data->has($this->name))
		{
			return ;
		}
		/* Get image id */
		$image = $service->data->get($this->name);
		$image_id = $image->get("id");
		/* Set image id */
		$service->data->set($this->key, $image_id);
	}
	/**
	 * Search after
	 */
	function onSearchAfter($service)
	{
		$items = $service->items;
		$images = $service->items->map(function ($item)
		{
			return $item->get($this->key);
		})->filter(function ($id)
		{
			return $id > 0;
		});
		/* Load images */
		$connection = $service->getConnection();
		$result = \Runtime\WordPress\WP_Helper::loadImages($connection, $images);
		/* Map items */
		for ($i = 0; $i < $service->items->count(); $i++)
		{
			$item = $service->items->get($i);
			$image_id = $item->get($this->key);
			$item->set($this->name, $result->get($image_id));
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__name = "";
		$this->__key = "";
	}
	function takeValue($k,$d=null)
	{
		if ($k == "name")return $this->__name;
		else if ($k == "key")return $this->__key;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Components";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Components.ImageRule";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.Rules.CrudRule";
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
		$a[]="name";
		$a[]="key";
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