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
namespace BayLang\Constructor\Frontend\Layout;
class ProjectLayout extends \Runtime\Web\DefaultLayout
{
	function renderMenu()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		$menu = $this->getMenu();
		
		for ($i = 0; $i < $menu->count(); $i++)
		{
			$item = $menu->get($i);
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Element 'a' */
			$__v2 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v2, $this->_escape($item->get("label")));
			
			/* Element 'a' */
			$this->_e($__v1, "a", ["href" => $item->get("href"),"class" => $this->_class_name(["nolink"])], $__v2);
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["menu__item", $this->menuActive($item->get("name"))])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["menu"])], $__v0);
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "Menu");
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["layout__title"])], $__v2);
		
		/* Text */
		$this->_t($__v1, $this->renderMenu());
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["layout__menu_wrap"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'h1' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, $this->_escape($this->layout->title));
		
		/* Element 'h1' */
		$this->_e($__v1, "h1", ["class" => $this->_class_name(["layout__title"])], $__v2);
		
		/* Text */
		$this->_t($__v1, $this->renderCurrentPage());
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["layout__content_wrap"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["layout", "layout--" . \Runtime\rtl::toStr($this->layout->layout_name)])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns menu
 */
	function getMenu()
	{
		$arr = \Runtime\Vector::from([\Runtime\Map::from(["label"=>"Projects","name"=>"baylang:project:list","href"=>$this->layout->url("baylang:project:list")]),\Runtime\Map::from(["label"=>"Settings","name"=>"baylang:project:settings","href"=>$this->layout->url("baylang:project:settings", \Runtime\Map::from(["project_id"=>$this->layout->project_id]))]),\Runtime\Map::from(["label"=>"Widgets","name"=>"baylang:project:widgets","href"=>$this->layout->url("baylang:project:widgets", \Runtime\Map::from(["project_id"=>$this->layout->project_id]))]),\Runtime\Map::from(["label"=>"Code","name"=>"baylang:project:code","href"=>$this->layout->url("baylang:project:code", \Runtime\Map::from(["project_id"=>$this->layout->project_id]))])]);
		return $arr;
	}
	/**
 * Returns true if menu is active
 */
	function menuActive($route_name)
	{
		if ($this->layout->route == null)
		{
			return "";
		}
		if ($this->layout->route->name == $route_name)
		{
			return "menu__item--active";
		}
		return "";
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Web.DefaultLayout"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".layout.h-1e91{position: relative;display: flex;align-items: stretch;min-height: 100%}.layout__menu_wrap.h-1e91{position: relative;width: 200px;padding-top: 10px;padding-right: 10px}.layout__content_wrap.h-1e91{position: relative;width: calc(100% - 200px);padding-top: 10px;padding-bottom: 10px}.layout__title.h-1e91{font-size: 16px;font-weight: normal;padding-bottom: 10px;margin: 0}.layout__menu_wrap.h-1e91 .layout__title{padding-left: 10px}.menu__item.h-1e91 a{display: block;padding: 10px;border-bottom: 1px solid var(--widget-color-border)}.menu__item.h-1e91 a:hover{background-color: var(--widget-color-hover)}.menu__item--active.h-1e91 a,.menu__item--active.h-1e91 a.nolink,.menu__item--active.h-1e91 a.nolink:visited{background-color: var(--widget-color-selected);border-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.menu__item.h-1e91:last-child a{border-bottom-width: 0px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Layout";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Layout.ProjectLayout";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.DefaultLayout";
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