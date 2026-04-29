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

use Runtime\Widget\Input;
use Runtime\Widget\Select;


class FieldSettings extends \Runtime\Widget\Sortable\FieldList
{
	var $fields;
	/**
	 * Create new item
	 */
	function createItem()
	{
		return new \Runtime\Map([
			"name" => "",
			"title" => "",
			"type" => "input",
			"placeholder" => "",
			"required" => true,
		]);
	}
	/**
	 * Copy item
	 */
	function copyItem($item){ return $item->copy(); }
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->fields = new \Runtime\Vector(
			new \Runtime\Map([
				"name" => "name",
				"label" => "Name",
				"component" => "Runtime.Widget.Input",
			]),
			new \Runtime\Map([
				"name" => "type",
				"label" => "Type",
				"component" => "Runtime.Widget.Select",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
						new \Runtime\Map(["key" => "input", "value" => "input"]),
						new \Runtime\Map(["key" => "textarea", "value" => "textarea"]),
					),
				]),
			]),
			new \Runtime\Map([
				"name" => "title",
				"label" => "Title",
				"component" => "Runtime.Widget.Input",
			]),
			new \Runtime\Map([
				"name" => "placeholder",
				"label" => "Placeholder",
				"component" => "Runtime.Widget.Input",
			]),
			new \Runtime\Map([
				"name" => "required",
				"label" => "Required",
				"component" => "Runtime.Widget.Select",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
						new \Runtime\Map(["key" => 0, "value" => "No"]),
						new \Runtime\Map(["key" => 1, "value" => "Yes"]),
					),
				]),
			]),
		);
	}
	static function getComponentStyle(){ return ""; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Input", "Runtime.Widget.Select"); }
	static function getClassName(){ return "Runtime.WordPress.Admin.FormSettings.FieldSettings"; }
}