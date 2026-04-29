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
namespace Runtime\WordPress\Theme\Components;

use Runtime\BaseObject;
use Runtime\SerializeInterface;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;


class ImageType extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	var $id;
	var $width;
	var $height;
	var $file;
	var $sizes;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("id", new \Runtime\Serializer\IntegerType());
		$rules->addType("width", new \Runtime\Serializer\IntegerType());
		$rules->addType("height", new \Runtime\Serializer\IntegerType());
		$rules->addType("file", new \Runtime\Serializer\StringType());
		$rules->addType("sizes", new \Runtime\Serializer\MapType(new \Runtime\Serializer\MapType(new \Runtime\Map([
			"size" => new \Runtime\Serializer\StringType(),
			"file" => new \Runtime\Serializer\StringType(),
			"width" => new \Runtime\Serializer\IntegerType(),
			"height" => new \Runtime\Serializer\IntegerType(),
			"mime_type" => new \Runtime\Serializer\StringType(),
		]))));
	}
	
	
	/**
	 * Returns image by size name
	 */
	function getImage($size_name)
	{
		if (!$this->sizes->has($size_name)) return $this->file;
		return $this->sizes->get($size_name)->get("file");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->id = 0;
		$this->width = 0;
		$this->height = 0;
		$this->file = "";
		$this->sizes = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.ImageType"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}