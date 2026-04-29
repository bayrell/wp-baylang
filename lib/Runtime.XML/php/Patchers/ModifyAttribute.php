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
namespace Runtime\XML\Patchers;

use Runtime\XML\BasePatcher;
use Runtime\XML\XML;


class ModifyAttribute extends \Runtime\XML\BasePatcher
{
	/**
	 * Returns operation types
	 */
	function types()
	{
		return new \Runtime\Vector(
			"edit_attr",
			"edit_attribute",
			"attr_edit",
			"attribute_edit",
			"editAttribute",
		);
	}
	
	
	/**
	 * Patch XML with operation
	 */
	function patch($xml, $operation)
	{
		$path = $operation->get("path")->get(0);
		$name = $operation->get("name")->get(0);
		$value = $operation->get("value")->get(0);
		if (!$path) return;
		if (!$name) return;
		if (!$value) return;
		$path_value = $path->value();
		$name_value = $name->value();
		$value_value = $value->value();
		$items = $xml->xpath($path_value);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items[$i];
			if ($item->attr($name_value) !== null)
			{
				$item->removeAttribute($name_value);
				$item->addAttribute($name_value, $value_value);
			}
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.XML.Patchers.ModifyAttribute"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}