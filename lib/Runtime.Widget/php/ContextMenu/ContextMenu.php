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
namespace Runtime\Widget\ContextMenu;
class ContextMenu extends \Runtime\Web\Component
{
	function renderItem($item)
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($item->get("label")));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_context_menu__item", (($item->get("hidden") == true) ? ("hidden") : (""))])], $__v0);
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		$props = $this->getProps();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->model->items->count(); $i++)
		{
			$item = $this->model->items->get($i);
			
			/* Text */
			$this->_t($__v0, $this->renderItem($item));
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", $this->_merge_attrs(["class" => $this->_class_name(["widget_context_menu", (($this->model->is_open) ? ("widget_context_menu--open") : ("widget_context_menu--hide"))])], $props), $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns props
 */
	function getProps()
	{
		$styles = \Runtime\Vector::from([]);
		if ($this->model->width != "")
		{
			$styles->push("max-width: " . \Runtime\rtl::toStr($this->model->width));
		}
		$styles->push("left: " . \Runtime\rtl::toStr($this->model->x) . \Runtime\rtl::toStr("px;"));
		$styles->push("top: " . \Runtime\rtl::toStr($this->model->y) . \Runtime\rtl::toStr("px;"));
		return \Runtime\Map::from(["style"=>$styles->join(";")]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_context_menu.h-eb03{display: none;position: absolute;z-index: 99;background-color: var(--widget-color-default);border: var(--widget-border-width) var(--widget-color-border) solid;border-bottom-width: 0}.widget_context_menu--open.h-eb03{display: block}.widget_context_menu__item.h-eb03{padding: var(--widget-button-padding-y) var(--widget-button-padding-y);border-bottom: var(--widget-border-width) var(--widget-color-border) solid;cursor: pointer;user-select: none}.widget_context_menu__item.hidden.h-eb03{display: none}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.ContextMenu";
	}
	static function getClassName()
	{
		return "Runtime.Widget.ContextMenu.ContextMenu";
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