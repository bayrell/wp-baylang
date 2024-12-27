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
class Append extends \Runtime\XML\BasePatcher
{
	/**
	 * Returns operation types
	 */
	function types()
	{
		return \Runtime\Vector::from(["add","append"]);
	}
	/**
	 * Patch XML with operation
	 */
	function patch($xml, $operation)
	{
		$path = $operation->get("path")->get(0);
		$value = $operation->get("value")->get(0);
		if (!$path)
		{
			return ;
		}
		$position = $operation->attr("position");
		$path_value = $path->value();
		$items = $xml->xpath($path_value);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = \Runtime\rtl::attr($items, $i);
			if ($position == "first")
			{
				$item->prependItems($value->childs());
			}
			else
			{
				$item->appendItems($value->childs());
			}
		}
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.XML.Patchers";
	}
	static function getClassName()
	{
		return "Runtime.XML.Patchers.Append";
	}
	static function getParentClassName()
	{
		return "Runtime.XML.BasePatcher";
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