<?php
/*
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
namespace Runtime\WordPress\Admin\FormSettings;
class FieldSettings extends \Runtime\Widget\SortableFieldList
{
	public $fields;
	/**
 * Create value
 */
	function createValue()
	{
		return \Runtime\Map::from(["fields"=>\Runtime\Vector::from([])]);
	}
	/**
 * Returns items
 */
	function getItems()
	{
		if (!$this->value)
		{
			return null;
		}
		if (!($this->value instanceof \Runtime\Dict))
		{
			return null;
		}
		if (!$this->value->has("fields"))
		{
			return null;
		}
		return $this->value->get("fields");
	}
	/**
 * Create new item
 */
	function createItem()
	{
		return \Runtime\Map::from(["name"=>"","title"=>"","type"=>"input","placeholder"=>"","required"=>true]);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.SortableFieldList","Runtime.Widget.Input","Runtime.Widget.Select"]);
	}
	static function css($vars)
	{
		$res = "";
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->fields = \Runtime\Vector::from([\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"type","label"=>"Type","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"input","value"=>"input"]),\Runtime\Map::from(["key"=>"textarea","value"=>"textarea"])])])]),\Runtime\Map::from(["name"=>"title","label"=>"Title","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"placeholder","label"=>"Placeholder","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"required","label"=>"Required","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>0,"value"=>"No"]),\Runtime\Map::from(["key"=>1,"value"=>"Yes"])])])])]);
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.FormSettings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.FormSettings.FieldSettings";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.SortableFieldList";
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