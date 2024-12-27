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
class TextImage extends \Runtime\Web\Component
{
	public $kind;
	public $image;
	public $content;
	function renderContent()
	{
		$__v = new \Runtime\Vector();
		$content = \Runtime\rs::split("\n", $this->content);
		
		if ($content->count() == 1)
		{
			/* Text */
			$this->_t($__v, $this->_escape($content->get(0)));
		}
		else
		{
			for ($i = 0; $i < $content->count(); $i++)
			{
				$item = $content->get($i);
				
				/* Element 'div' */
				$__v0 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v0, $this->_escape((!\Runtime\rtl::isEmpty($item)) ? ($item) : ("")));
				
				/* Element 'div' */
				$this->_e($__v, "div", [], $__v0);
			}
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		if ($this->kind == "text_bottom" || $this->kind == "text_right")
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Component 'Image' */
			$this->_c($__v1, "Runtime.Widget.Image", ["src" => $this->image]);
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_text_image__image"])], $__v1);
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->renderContent($this->content));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_text_image__text"])], $__v1);
		}
		else if ($this->kind == "text_top" || $this->kind == "text_left")
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->renderContent($this->content));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_text_image__text"])], $__v1);
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Component 'Image' */
			$this->_c($__v1, "Runtime.Widget.Image", ["src" => $this->image]);
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_text_image__image"])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_text_image", $this->getClass(), $this->class])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns class
 */
	function getClass()
	{
		$styles = \Runtime\Vector::from([]);
		$styles->push("widget_text_image--" . \Runtime\rtl::toStr($this->kind));
		return \Runtime\rs::join(" ", $styles);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Image"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_text_image--text_left.h-e2c7,.widget_text_image--text_right.h-e2c7{display: flex;align-items: center;justify-content: space-between}.widget_text_image--text_top.h-e2c7,.widget_text_image--text_bottom.h-e2c7{text-align: center}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->kind = "text_right";
		$this->image = "";
		$this->content = "";
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.TextImage";
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