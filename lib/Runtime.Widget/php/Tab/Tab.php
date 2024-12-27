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
namespace Runtime\Widget\Tab;
class Tab extends \Runtime\Web\Component
{
	public $key;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model->canShow($this->key))
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderSlot("default"));
			
			/* Element 'div' */
			$this->_e($__v, "div", ["data-tab" => $this->key,"class" => $this->_class_name(["tabs__item", (($this->model->isActive($this->key)) ? ("tabs__item--active") : (""))])], $__v0);
		}
		
		return $this->_flatten($__v);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".tabs__item.h-878a{position: relative;display: none}.tabs__item--active.h-878a{display: block}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->key = "";
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Tab";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Tab.Tab";
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