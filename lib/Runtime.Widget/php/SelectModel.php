<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime\Widget;

use Runtime\BaseModel;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;
use Runtime\Web\RenderContainer;


class SelectModel extends \Runtime\BaseModel
{
	/* Options for select */
	var $options;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("options", new \Runtime\Serializer\VectorType(new \Runtime\Serializer\MapType(new \Runtime\Map([
			"key" => new \Runtime\Serializer\StringType(),
			"value" => new \Runtime\Serializer\StringType(),
		]))));
	}
	
	
	/**
	 * Set options
	 */
	function setOptions($options)
	{
		$this->options = $options;
	}
	
	
	/**
	 * Add option
	 */
	function addOption($option)
	{
		$this->options->push($option);
	}
	
	
	/**
	 * Returns options
	 */
	function getOptions(){ return $this->options; }
	
	
	/**
	 * Returns value
	 */
	function getValue($id)
	{
		$option = $this->options->find(function ($item) use (&$id){ return $item->get("key") == $id; });
		return $option ? $option->get("value") : "";
	}
	
	
	/**
	 * Load data
	 */
	function loadData($container)
	{
		parent::loadData($container);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->options = new \Runtime\Vector();
	}
	static function getClassName(){ return "Runtime.Widget.SelectModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}