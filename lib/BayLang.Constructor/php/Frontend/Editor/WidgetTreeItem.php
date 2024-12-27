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
namespace BayLang\Constructor\Frontend\Editor;
class WidgetTreeItem extends \Runtime\Widget\Tree\TreeItem
{
	public $code;
	function __construct($code)
	{
		parent::__construct();
		$this->code = $code;
	}
	/**
	 * Returns true if can insert inside
	 */
	function canDragInside()
	{
		if (!$this->code)
		{
			return false;
		}
		if ($this->code->tag_name == "h1")
		{
			return false;
		}
		if ($this->code->tag_name == "h2")
		{
			return false;
		}
		if ($this->code->tag_name == "h3")
		{
			return false;
		}
		if ($this->code->tag_name == "h4")
		{
			return false;
		}
		if ($this->code->tag_name == "h5")
		{
			return false;
		}
		if ($this->code->tag_name == "p")
		{
			return false;
		}
		if ($this->code->tag_name == "span")
		{
			return false;
		}
		return true;
	}
	/**
	 * Update item
	 */
	function updateLabel()
	{
		if ($this->code instanceof \BayLang\OpCodes\OpHtmlTag)
		{
			$names = static::getAttrValues($this->code->attrs, "class");
			if ($names->count() == 0)
			{
				$this->key = $this->code->tag_name;
				$this->label = $this->code->tag_name;
			}
			else
			{
				$key = $names->get(0);
				$keys = \Runtime\rs::split(" ", $key);
				$this->key = $key;
				$this->label = $this->code->tag_name . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($keys->get(0));
			}
		}
		else if ($this->code instanceof \BayLang\OpCodes\OpHtmlSlot)
		{
			$this->key = $this->code->name;
			$this->label = "slot." . \Runtime\rtl::toStr($this->code->name);
		}
	}
	/**
	 * Returns attr values
	 */
	static function getAttrValues($attrs, $name)
	{
		$attrs = $attrs->filter(function ($code_attr) use (&$name)
		{
			if ($code_attr->key != $name)
			{
				return false;
			}
			if (!\Runtime\rtl::is_instanceof($code_attr->value, "BayLang.OpCodes.OpString"))
			{
				return false;
			}
			return true;
		});
		$attrs = $attrs->map(function ($code_attr)
		{
			return $code_attr->value->value;
		});
		return $attrs;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->code = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.WidgetTreeItem";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Tree.TreeItem";
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