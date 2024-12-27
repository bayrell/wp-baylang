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
namespace BayLang\Constructor\Frontend\Editor\Processor;
class AttributeProcessor extends \Runtime\BaseObject
{
	public $page_model;
	public $widget_inc;
	public $key_debug_inc;
	function __construct($page_model)
	{
		parent::__construct();
		$this->page_model = $page_model;
	}
	/**
	 * Create widget name
	 */
	function createWidgetName($widget_name)
	{
		$name = $widget_name . \Runtime\rtl::toStr("_") . \Runtime\rtl::toStr($this->widget_inc);
		$this->widget_inc = $this->widget_inc + 1;
		return $name;
	}
	/**
	 * Create key_debug name
	 */
	function createKeyName($widget_name)
	{
		$name = $widget_name . \Runtime\rtl::toStr("_") . \Runtime\rtl::toStr($this->key_debug_inc);
		$this->key_debug_inc = $this->key_debug_inc + 1;
		return $name;
	}
	/**
	 * Init widget inc
	 */
	function initWidgetInc()
	{
		$this->widget_inc = $this->key_debug_inc;
	}
	/**
	 * Generate widget name
	 */
	function generateWidgetName($widget_name, $item)
	{
		if (\Runtime\rs::substr($item, 0, 2) != "[&")
		{
			return $widget_name;
		}
		if (\Runtime\rs::substr($item, -1) != "]")
		{
			return $widget_name;
		}
		$item = \Runtime\rs::substr($item, 2, -1);
		return $widget_name . \Runtime\rtl::toStr($item);
	}
	/**
	 * Add op_code tag attrs
	 */
	function processHtmlTag($op_code, $widget_name)
	{
		$css_name = null;
		/* Create widget name */
		$createWidgetName = function () use (&$css_name)
		{
			if ($css_name == null)
			{
				$css_name = $this->createWidgetName("widget");
			}
			return $css_name;
		};
		/* Generate widget name */
		$generateWidgetName = function ($item) use (&$widget_name)
		{
			$widget_name = $this->generateWidgetName($widget_name, $item);
			return $widget_name;
		};
		/* Add render key */
		$key_attr = $op_code->attrs->findItem(\Runtime\lib::equalAttr("key", "@key"));
		$key_debug_attr = $op_code->attrs->findItem(\Runtime\lib::equalAttr("key", "@key_debug"));
		if ($key_attr == null && $key_debug_attr == null)
		{
			/* Create key debug */
			$key_debug_value = $this->createKeyName("widget");
			if ($op_code->items)
			{
				$item = $op_code->items->items->get(0);
				if ($item instanceof \BayLang\OpCodes\OpHtmlValue && $item->kind == "raw")
				{
					$key_debug_value .= \Runtime\rtl::toStr("_raw");
				}
			}
			/* Add key debug */
			$op_code->attrs->push(new \BayLang\OpCodes\OpHtmlAttribute(\Runtime\Map::from(["key"=>"@key_debug","value"=>new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>$key_debug_value]))])));
		}
		/* Change widget name */
		$class_name_attr = $op_code->attrs->findItem(\Runtime\lib::equalAttr("key", "class"));
		if ($class_name_attr && $class_name_attr->value instanceof \BayLang\OpCodes\OpString)
		{
			$class_name = $class_name_attr->value->value;
			$attrs = \Runtime\rs::split(" ", $class_name);
			$attrs = $attrs->filter(\Runtime\lib::equalNot(""));
			$attrs = $attrs->map(function ($item) use (&$createWidgetName,&$generateWidgetName)
			{
				if ($item == "[widget_name]")
				{
					return $createWidgetName();
				}
				if (\Runtime\rs::substr($item, 0, 2) == "[&" && \Runtime\rs::substr($item, -1) == "]")
				{
					return $generateWidgetName($item);
				}
				return $item;
			});
			$class_name_attr->value->value = \Runtime\rs::join(" ", $attrs);
		}
	}
	/**
	 * Add op_code slot attrs
	 */
	function processHtmSlot($op_code, $widget_name)
	{
	}
	/**
	 * Generate html items attrs
	 */
	function processHtmlItems($items, $widget_name="")
	{
		if (!$items)
		{
			return ;
		}
		if ($items instanceof \BayLang\OpCodes\OpHtmlItems)
		{
			$items = $items->items;
		}
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			/* Add render key to item */
			if (\Runtime\rtl::is_instanceof($item, "BayLang.OpCodes.OpHtmlTag"))
			{
				$this->processHtmlTag($item, $widget_name);
			}
			else if (\Runtime\rtl::is_instanceof($item, "BayLang.OpCodes.OpHtmlSlot"))
			{
				$this->processHtmSlot($item, $widget_name);
			}
			/* Generate html items attrs */
			$this->processHtmlItems($item->items, $widget_name);
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->page_model = null;
		$this->widget_inc = 1;
		$this->key_debug_inc = 1;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor";
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