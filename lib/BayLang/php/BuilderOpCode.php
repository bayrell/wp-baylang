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
namespace BayLang;
class BuilderOpCode extends \Runtime\BaseObject
{
	/**
	 * Add slot
	 */
	function addSlot($op_code, $name)
	{
		$slot = new \BayLang\OpCodes\OpHtmlSlot(\Runtime\Map::from(["name"=>$name,"items"=>new \BayLang\OpCodes\OpHtmlItems()]));
		$op_code->items->items->push($slot);
		return $slot;
	}
	/**
	 * Add tag
	 */
	function addTag($op_code, $name)
	{
		$tag = new \BayLang\OpCodes\OpHtmlTag(\Runtime\Map::from(["attrs"=>\Runtime\Vector::from([]),"items"=>new \BayLang\OpCodes\OpHtmlItems(),"tag_name"=>$name]));
		$op_code->items->items->push($tag);
		return $tag;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang";
	}
	static function getClassName()
	{
		return "BayLang.BuilderOpCode";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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