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
class Menu extends \Runtime\Web\Component
{
	public $items;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->items->count(); $i++)
		{
			$item = $this->items->get($i);
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Element 'a' */
			$__v2 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v2, $this->_escape($item->get("label")));
			
			/* Element 'a' */
			$this->_e($__v1, "a", ["href" => $item->get("href"),"class" => $this->_class_name(["nolink"])], $__v2);
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["menu__item", (($this->menuActive($item->get("name"))) ? ("active") : (""))])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["menu", $this->class])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns true if menu is active
 */
	function menuActive($route_name)
	{
		if ($this->layout->route == null)
		{
			return false;
		}
		if ($this->layout->route->name != $route_name)
		{
			return false;
		}
		return true;
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".menu__item.h-035f a{display: block;padding: 10px;border-bottom: 1px solid var(--widget-color-border)}.menu__item.h-035f a:hover{background-color: var(--widget-color-hover)}.menu__item.active.h-035f a,.menu__item.active.h-035f a.nolink,.menu__item.active.h-035f a.nolink:visited{background-color: var(--widget-color-selected);border-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.menu__item.h-035f:last-child a{border-bottom-width: 0px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->items = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Menu";
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