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
namespace Runtime\Widget;
class Section extends \Runtime\Web\Component
{
	public $wrap;
	public $flex;
	public $align_items;
	public $justify_content;
	public $flex_wrap;
	public $height;
	public $min_height;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		if ($this->wrap == "true")
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->renderSlot("default"));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["style" => $this->getWrapStyle(),"class" => $this->_class_name(["widget_section__wrap"])], $__v1);
		}
		else
		{
			/* Text */
			$this->_t($__v0, $this->renderSlot("default"));
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["style" => $this->getStyle(),"class" => $this->_class_name(["widget_section", $this->class])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns styles
 */
	function getStyle()
	{
		$res = \Runtime\Vector::from([]);
		if (!$this->wrap)
		{
			$res->push($this->getWrapStyle());
		}
		return \Runtime\rs::join(";", $res);
	}
	/**
 * Returns wrap style
 */
	function getWrapStyle()
	{
		$res = \Runtime\Vector::from([]);
		if ($this->flex == "true")
		{
			$res->push("display: flex;");
			if ($this->align_items)
			{
				$res->push("align-items: " . \Runtime\rtl::toStr($this->align_items));
			}
			if ($this->justify_content)
			{
				$res->push("justify-content: " . \Runtime\rtl::toStr($this->justify_content));
			}
			if ($this->flex_wrap)
			{
				$res->push("flex-wrap: " . \Runtime\rtl::toStr($this->flex_wrap));
			}
		}
		if ($this->height)
		{
			$res->push("height: " . \Runtime\rtl::toStr($this->height));
		}
		if ($this->min_height)
		{
			$res->push("min-height: " . \Runtime\rtl::toStr($this->min_height));
		}
		return \Runtime\rs::join(";", $res);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_section__wrap.h-c82b{max-width: 1200px;margin-left: auto;margin-right: auto;padding: 0px 0px;padding-left: 10px;padding-right: 10px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->wrap = "true";
		$this->flex = "false";
		$this->align_items = "";
		$this->justify_content = "";
		$this->flex_wrap = "";
		$this->height = "";
		$this->min_height = "";
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Section";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Component";
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