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
namespace BayLang\Constructor\WidgetPage;
class WidgetPage extends \Runtime\Web\Component
{
	public $is_loaded;
	function renderStyle()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'style' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($this->model->widget_css));
		
		/* Element 'style' */
		$this->_e($__v, "style", [], $__v0);
		
		return $__v;
	}
	function renderSelectedBox()
	{
		$__v = new \Runtime\Vector();
		$page_model = $this->model->getEditPageModel();
		
		if ($this->model->selected_box)
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			if ($page_model->selected->widget != null && $this->renderWidgetControl())
			{
				/* Element 'div' */
				$__v1 = new \Runtime\Vector();
				
				/* Element 'div' */
				$__v2 = new \Runtime\Vector();
				
				/*
						<div class="widget_box__item_control_button">@raw{{ "&#9776;" }}</div>
						*/
				/* Element 'div' */
				$__v3 = new \Runtime\Vector();
				
				/* Raw */
				$this->_t($__v3, new \Runtime\RawString("+"));
				
				/* Element 'div' */
				$this->_e($__v2, "div", ["class" => $this->_class_name(["widget_box__item_control_button"])], $__v3);
				
				/* Element 'div' */
				$__v3 = new \Runtime\Vector();
				
				/* Raw */
				$this->_t($__v3, new \Runtime\RawString("&#9652;"));
				
				/* Element 'div' */
				$this->_e($__v2, "div", ["class" => $this->_class_name(["widget_box__item_control_button"])], $__v3);
				
				/* Element 'div' */
				$__v3 = new \Runtime\Vector();
				
				/* Raw */
				$this->_t($__v3, new \Runtime\RawString("&#9662;"));
				
				/* Element 'div' */
				$this->_e($__v2, "div", ["class" => $this->_class_name(["widget_box__item_control_button"])], $__v3);
				
				/* Element 'div' */
				$__v3 = new \Runtime\Vector();
				
				/* Raw */
				$this->_t($__v3, new \Runtime\RawString("x"));
				
				/* Element 'div' */
				$this->_e($__v2, "div", ["class" => $this->_class_name(["widget_box__item_control_button"])], $__v3);
				
				/* Element 'div' */
				$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_box__item_control_wrap"])], $__v2);
				
				/* Element 'div' */
				$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_box__item_control"])], $__v1);
			}
			
			/* Element 'div' */
			$this->_e($__v, "div", ["style" => $this->model->selected_box->get("top"),"class" => $this->_class_name(["widget_box__item widget_box__item--top widget_box__item--current"])], $__v0);
			
			/* Element 'div' */
			$this->_e($__v, "div", ["style" => $this->model->selected_box->get("bottom"),"class" => $this->_class_name(["widget_box__item widget_box__item--bottom widget_box__item--current"])]);
			
			/* Element 'div' */
			$this->_e($__v, "div", ["style" => $this->model->selected_box->get("left"),"class" => $this->_class_name(["widget_box__item widget_box__item--left widget_box__item--current"])]);
			
			/* Element 'div' */
			$this->_e($__v, "div", ["style" => $this->model->selected_box->get("right"),"class" => $this->_class_name(["widget_box__item widget_box__item--right widget_box__item--current"])]);
		}
		
		return $__v;
	}
	function renderAddWidgetButton()
	{
		$__v = new \Runtime\Vector();
		$page_model = $this->model->getEditPageModel();
		
		if ($this->is_loaded && $page_model != null)
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Component 'Button' */
			$this->_c($__v0, "Runtime.Widget.Button", ["styles" => \Runtime\Vector::from(["small"])], function (){
				$__v = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v, "Add widget");
				
				return $__v;
			});
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_page__add_section_button"])], $__v0);
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderStyle());
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->widget_model, \Runtime\Map::from(["ref"=>"widget_component"])));
		
		/* Text */
		$this->_t($__v0, $this->renderSelectedBox());
		
		/* Text */
		$this->_t($__v0, $this->renderAddWidgetButton());
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_page"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Render widget control
 */
	function renderWidgetControl()
	{
		return false;
	}
	/**
 * Up widget click
 */
	function onUpWidgetClick()
	{
		$this->model->sendMoveWidget($this->model->selected_path, "up");
	}
	/**
 * Down widget click
 */
	function onDownWidgetClick()
	{
		$this->model->sendMoveWidget($this->model->selected_path, "down");
	}
	/**
 * Add widget click event
 */
	function onAddWidgetClick($path)
	{
		$this->model->sendAddWidget($path, "after");
	}
	/**
 * Remove widget click event
 */
	function onRemoveWidgetClick()
	{
		$this->model->sendRemoveWidget($this->model->selected_path);
	}
	/**
 * Returns component
 */
	function getComponent($elem)
	{
	}
	/**
 * Returns widget path
 */
	function getWidgetPath($elem)
	{
		$elem = $this->getComponent($elem);
		if ($elem == null)
		{
			return null;
		}
		if ($elem->hasAttribute("data-widget-path"))
		{
			return $elem->getAttribute("data-widget-path");
		}
		$component = $elem->__component__;
		return ($component) ? ($component->data_widget_path) : (null);
	}
	/**
 * Click
 */
	function onClick($e)
	{
		$elem = $e->target;
		/* Get widget path */
		$widget_path_str = $this->getWidgetPath($elem);
		if (!$widget_path_str)
		{
			return ;
		}
		/* Get page model */
		$page_model = $this->model->getEditPageModel();
		if (!$page_model)
		{
			return ;
		}
		/* Prevent default */
		$e->preventDefault();
		$widget_path = \Runtime\rs::split(".", $widget_path_str);
		$path = $this->model->convertWidgetToTreePath($widget_path);
		$this->model->sendSelectItem($path);
		return false;
	}
	/**
 * Context menu click
 */
	function onContextMenu($e)
	{
		$elem = $e->target;
		/* Get widget path */
		$widget_path_str = $this->getWidgetPath($elem);
		if (!$widget_path_str)
		{
			return ;
		}
		/* Prevent default */
		$e->preventDefault();
		/* Send select item */
		$widget_path = \Runtime\rs::split(".", $widget_path_str);
		$path = $this->model->convertWidgetToTreePath($widget_path);
		$this->model->sendSelectItem($path);
		/* Send event context menu */
		$this->model->sendContextMenu($e->clientX, $e->clientY);
		return false;
	}
	/**
 * Mounted
 */
	function onMounted()
	{
		$this->nextTick(function ()
		{
			$this->model->widget_component = $this->getRef("widget_component");
			$this->model->buildRender();
			$this->model->buildCSS();
			$this->model->buildGlobalCSS();
			$this->model->sendAppLoaded();
			$this->is_loaded = true;
		});
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_box__item{position: absolute;border-style: none;border-width: 0;border-color: transparent}.widget_box__item--hover{border-style: dashed}.widget_box__item--current{border-style: solid}.widget_box__item--top{border-top-width: 2px;border-top-color: #e0e1e6}.widget_box__item--left{border-left-width: 2px;border-left-color: #e0e1e6}.widget_box__item--bottom{border-bottom-width: 2px;border-bottom-color: #e0e1e6}.widget_box__item--right{border-right-width: 2px;border-right-color: #e0e1e6}.widget_box__item_control{display: inline-block;position: relative;background-color: white;min-width: 98px;left: calc(100% - 98px);top: -13px;border-width: 1px;border-style: solid;border-color: #e0e1e6;z-index: 10}.widget_box__item_control_wrap{display: flex;height: 24px;line-height: 1}.widget_box__item_control_button{cursor: pointer;font-size: 16px;padding: 4px;text-align: center;user-select: none;width: 24px}.widget_page__add_section_button{text-align: center;padding-top: 10px;padding: 5px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->is_loaded = false;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.WidgetPage";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.WidgetPage.WidgetPage";
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