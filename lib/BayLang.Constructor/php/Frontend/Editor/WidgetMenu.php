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
namespace BayLang\Constructor\Frontend\Editor;
class WidgetMenu extends \Runtime\Web\Component
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->_escape($this->getTitle()));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_menu__title"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'Styles' */
		$this->_c($__v1, "BayLang.Constructor.Frontend.Editor.Styles.Styles", ["model" => $this->_model($this->model->styles)]);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_menu__item", (($this->model->menu_selected != "styles") ? ("hide") : (""))])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'SelectedItem' */
		$this->_c($__v1, "BayLang.Constructor.Frontend.Editor.SelectedItem", ["model" => $this->_model($this->model),"type" => "css"]);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_menu__item", (($this->model->menu_selected != "css") ? ("hide") : (""))])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'SelectedItem' */
		$this->_c($__v1, "BayLang.Constructor.Frontend.Editor.SelectedItem", ["model" => $this->_model($this->model),"type" => "params"]);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_menu__item", (($this->model->menu_selected != "params") ? ("hide") : (""))])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderWidget($this->model->tree));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_menu__item", (($this->model->menu_selected != "tree") ? ("hide") : (""))])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_menu", (($this->model->menu_selected != "") ? ("show") : ("hide"))])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns title
 */
	function getTitle()
	{
		if ($this->model->menu_selected == "css")
		{
			return "CSS";
		}
		if ($this->model->menu_selected == "params")
		{
			return "Parameters";
		}
		if ($this->model->menu_selected == "styles")
		{
			return "Styles";
		}
		if ($this->model->menu_selected == "tree")
		{
			return "Tree";
		}
		return "";
	}
	static function components()
	{
		return \Runtime\Vector::from(["BayLang.Constructor.Frontend.Editor.SelectedItem","BayLang.Constructor.Frontend.Editor.Styles.Styles"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_menu.h-f350{display: flex;flex-wrap: wrap;flex-direction: column;justify-content: stretch;align-items: stretch;overflow: auto;height: 100%;width: 300px;border-left: 1px var(--widget-color-border) solid}.widget_menu.hide.h-f350{display: none}.widget_menu__title.h-f350{display: flex;align-items: center;justify-content: center;text-align: center;border-bottom: 1px var(--widget-color-border) solid;height: 32px}.widget_menu__item.h-f350{padding: 10px;overflow-y: auto;height: calc(100% - 32px);width: 100%}.widget_menu__item.hide.h-f350{display: none}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.WidgetMenu";
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