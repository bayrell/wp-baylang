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
class Label extends \Runtime\Web\Component
{
	public $value;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'span' */
		$__v0 = new \Runtime\Vector();
		
		if (\Runtime\rtl::isScalarValue($this->value))
		{
			/* Text */
			$this->_t($__v0, $this->_escape((!\Runtime\rtl::isEmpty($this->value)) ? ($this->value) : ("")));
		}
		else if (\Runtime\rtl::is_instanceof($this->value, "Runtime.Collection"))
		{
			for ($i = 0; $i < $this->value->count(); $i++)
			{
				$item = $this->value->get($i);
				
				/* Element 'div' */
				$__v1 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v1, $this->_escape((!\Runtime\rtl::isEmpty($item)) ? ($item) : ("")));
				
				/* Element 'div' */
				$this->_e($__v0, "div", [], $__v1);
			}
		}
		
		/* Element 'span' */
		$this->_e($__v, "span", ["class" => $this->_class_name(["widget_label"])], $__v0);
		
		return $this->_flatten($__v);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr("");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->value = "";
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Label";
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