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
namespace BayLang\Constructor\Frontend\Editor\Parameters;
class ParameterTagName extends \BayLang\Constructor\Frontend\Editor\Parameters\Parameter
{
	public $name;
	public $label;
	public $component;
	/**
	 * Init parameter
	 */
	function init()
	{
		$this->value = \Runtime\rs::lower($this->widget->code->tag_name);
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		if ($value == "")
		{
			$value = "div";
		}
		/* Update tag name */
		$this->widget->code->tag_name = $value;
		/* Setup widget */
		$this->widget->reset();
		$this->widget->setup();
		/* Update tree label */
		$this->widget->tree_item->updateLabel();
		/* Set new value */
		$this->value = $value;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->name = "tag";
		$this->label = "Tag";
		$this->component = "Runtime.Widget.Select";
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.Parameter";
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