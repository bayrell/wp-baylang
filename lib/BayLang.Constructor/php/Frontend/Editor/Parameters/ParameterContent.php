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
class ParameterContent extends \BayLang\Constructor\Frontend\Editor\Parameters\Parameter
{
	public $name;
	public $label;
	public $component;
	public $value;
	public $props;
	/**
	 * Init parameter
	 */
	function init()
	{
		$text_item = $this->widget->code->items->items->get(0);
		if ($text_item instanceof \BayLang\OpCodes\OpHtmlContent)
		{
			$this->value = $text_item->value;
		}
		else if ($text_item instanceof \BayLang\OpCodes\OpHtmlValue)
		{
			if ($text_item->value instanceof \BayLang\OpCodes\OpString)
			{
				$this->value = $text_item->value->value;
			}
		}
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		/* Get code */
		$text_item = $this->widget->code->items->items->get(0);
		/* Set value */
		$this->value = $value;
		/* Set content */
		if ($text_item instanceof \BayLang\OpCodes\OpHtmlContent)
		{
			$text_item->value = $this->value;
		}
		else if ($text_item instanceof \BayLang\OpCodes\OpHtmlValue)
		{
			if ($text_item->value instanceof \BayLang\OpCodes\OpString)
			{
				$text_item->value->value = $this->value;
			}
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->name = "html_content";
		$this->label = "Content";
		$this->component = "Runtime.Widget.TextEditable";
		$this->value = "";
		$this->props = \Runtime\Map::from(["direct_update"=>true]);
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent";
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