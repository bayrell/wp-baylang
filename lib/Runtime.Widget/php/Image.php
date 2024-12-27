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
class Image extends \Runtime\Web\Component
{
	public $src;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->src)
		{
			/* Element 'img' */
			$this->_e($__v, "img", ["src" => $this->layout->assets($this->src),"class" => $this->_class_name(["widget_image", $this->class])]);
		}
		else
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, "No image");
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_image__no_image"])], $__v1);
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_image", $this->class])], $__v0);
		}
		
		return $this->_flatten($__v);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_image.h-3405{display: inline-block}.widget_image__no_image.h-3405{display: flex;align-items: center;justify-content: center;font-size: 20px;text-transform: uppercase;width: 270px;height: 70px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->src = "";
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Image";
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