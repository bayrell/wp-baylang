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
class ParameterRawHtml extends \BayLang\Constructor\Frontend\Editor\Parameters\Parameter
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
		if ($text_item instanceof \BayLang\OpCodes\OpHtmlValue)
		{
			if ($text_item->kind == "raw")
			{
				$this->value = "1";
			}
		}
	}
	/**
	 * Returns HTML content
	 */
	function getHtmlContent()
	{
		$text_item = $this->widget->code->items->items->get(0);
		if ($text_item instanceof \BayLang\OpCodes\OpHtmlContent)
		{
			return $text_item->value;
		}
		else if ($text_item instanceof \BayLang\OpCodes\OpHtmlValue)
		{
			if ($text_item->value instanceof \BayLang\OpCodes\OpString)
			{
				return $text_item->value->value;
			}
		}
		return "";
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		$this->value = $value;
		/* Update key debug attr */
		$attr_item = $this->widget->code->attrs->findItem(\Runtime\lib::equalAttr("key", "@key_debug"));
		if ($attr_item)
		{
			if ($this->value == "1")
			{
				if (\Runtime\rs::indexOf($attr_item->value->value, "_raw") == -1)
				{
					$attr_item->value->value = \Runtime\rtl\attr($attr_item->value->value, ["value", "value"]) + \Runtime\rtl::toStr("_raw");
				}
			}
			else
			{
				if (\Runtime\rs::indexOf($attr_item->value->value, "_raw") != -1)
				{
					$attr_item->value->value = \Runtime\rs::replace("_raw", "", $attr_item->value->value);
				}
			}
		}
		/* Set content */
		$code = null;
		if ($this->value == "1")
		{
			$code = new \BayLang\OpCodes\OpHtmlValue(\Runtime\Map::from(["kind"=>"raw","value"=>new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>$this->getHtmlContent()]))]));
		}
		else
		{
			$code = new \BayLang\OpCodes\OpHtmlContent(\Runtime\Map::from(["value"=>$this->getHtmlContent()]));
		}
		/* Add content */
		$this->widget->code->items->items = \Runtime\Vector::from([]);
		$this->widget->code->items->items->push($code);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->name = "is_raw_html";
		$this->label = "Is Raw HTML";
		$this->component = "Runtime.Widget.Select";
		$this->value = "0";
		$this->props = \Runtime\Map::from(["show_select_value"=>false,"options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"0","value"=>"No"]),\Runtime\Map::from(["key"=>"1","value"=>"Yes"])])]);
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml";
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