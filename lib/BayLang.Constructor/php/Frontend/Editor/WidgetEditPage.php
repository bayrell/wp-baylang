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
class WidgetEditPage extends \Runtime\Web\Component
{
	public $menu_items;
	function renderSelectSize()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->model->iframe_sizes->count(); $i++)
		{
			$size = $this->model->iframe_sizes->get($i);
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->_escape($size->get("label")));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_edit_page__iframe_size", (($this->model->iframe_current_size == $size->get("label")) ? ("selected") : (""))])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_edit_page__menu_item widget_edit_page__menu_item--select_size"])], $__v0);
		
		return $__v;
	}
	function renderMenu()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'a' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "Back");
		
		/* Element 'a' */
		$this->_e($__v1, "a", ["href" => $this->layout->url("baylang:project:widgets", \Runtime\Map::from(["project_id"=>$this->model->project_id,"module_id"=>$this->model->module_id])),"class" => $this->_class_name(["widget_edit_page__menu_item nolink"])], $__v2);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "Save");
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_edit_page__menu_item"])], $__v2);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "Export");
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_edit_page__menu_item"])], $__v2);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, $this->_escape($this->getAppStatusMessage()));
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_edit_page__menu_item widget_edit_page__menu_item--status_message", (($this->isAppStatusError()) ? ("widget_edit_page__menu_item--error") : (""))])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_edit_page__menu_item_gap"])], $__v1);
		
		/* %render this.renderSelectSize(); */
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->menu_items->count(); $i++)
		{
			$item = $this->menu_items->get($i);
			
			/* Element 'div' */
			$__v2 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v2, $this->_escape($item->get("label")));
			
			/* Element 'div' */
			$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_edit_page__menu_item widget_edit_page__menu_item--button", (($this->model->menu_selected == $item->get("value")) ? ("widget_edit_page__menu_item--selected") : (""))])], $__v2);
		}
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_edit_page__menu_item_gap widget_edit_page__menu--right"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_edit_page__menu"])], $__v0);
		
		return $__v;
	}
	function renderContent()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'Breadcrumbs' */
		$this->_c($__v1, "BayLang.Constructor.Frontend.Editor.Breadcrumbs", ["model" => $this->_model($this->model)]);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Element 'iframe' */
		$this->_e($__v2, "iframe", []);
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_edit_page__frame_wrap"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_edit_page__frame"])], $__v1);
		
		/* Component 'WidgetMenu' */
		$this->_c($__v0, "BayLang.Constructor.Frontend.Editor.WidgetMenu", ["model" => $this->_model($this->model)]);
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->add_item_dialog));
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->context_menu));
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->remove_item_dialog));
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->rename_item_dialog));
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->select_image_dialog));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_edit_page__content"])], $__v0);
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderMenu());
		
		/* Text */
		$this->_t($__v0, $this->renderContent());
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_edit_page"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns true if app status is error
 */
	function isAppStatusError()
	{
		if ($this->model->app_status == \BayLang\Constructor\Frontend\Editor\WidgetEditPageModel::STATUS_LOAD_ERROR)
		{
			return true;
		}
		if ($this->model->app_status == \BayLang\Constructor\Frontend\Editor\WidgetEditPageModel::STATUS_SAVE_ERROR)
		{
			return true;
		}
		return false;
	}
	/**
 * Returns app status message
 */
	function getAppStatusMessage()
	{
		if ($this->model->app_status == \BayLang\Constructor\Frontend\Editor\WidgetEditPageModel::STATUS_LOAD_PROCESS)
		{
			return "Loading...";
		}
		if ($this->model->app_status == \BayLang\Constructor\Frontend\Editor\WidgetEditPageModel::STATUS_LOAD_SUCCESS)
		{
			return "Loaded";
		}
		if ($this->model->app_status == \BayLang\Constructor\Frontend\Editor\WidgetEditPageModel::STATUS_LOAD_ERROR)
		{
			return $this->model->load_error_message;
		}
		if ($this->model->app_status == \BayLang\Constructor\Frontend\Editor\WidgetEditPageModel::STATUS_CHANGED)
		{
			return "";
		}
		if ($this->model->app_status == \BayLang\Constructor\Frontend\Editor\WidgetEditPageModel::STATUS_SAVE_PROCESS)
		{
			return "Saving...";
		}
		if ($this->model->app_status == \BayLang\Constructor\Frontend\Editor\WidgetEditPageModel::STATUS_SAVE_SUCCESS)
		{
			return "Saved";
		}
		if ($this->model->app_status == \BayLang\Constructor\Frontend\Editor\WidgetEditPageModel::STATUS_SAVE_ERROR)
		{
			return "Save error";
		}
		return "";
	}
	/**
 * Toggle property
 */
	function toggleMenu($e, $name)
	{
		if ($this->model->menu_selected != $name)
		{
			$this->model->menu_selected = $name;
		}
		else
		{
			$this->model->menu_selected = "";
		}
		$this->nextTick(function ()
		{
			$page_model = $this->model->getFramePageModel();
			if ($page_model)
			{
				$page_model->updateSelectedBox();
			}
		});
		$e->preventDefault();
		$e->stopPropagation();
		return false;
	}
	/**
 * Mounted
 */
	function onMounted()
	{
		$iframe = $this->getRef("iframe");
		$iframe_window = $iframe->contentWindow;
		$iframe_document = $iframe->contentDocument;
		/* Setup iframe */
		$this->model->iframe = $iframe;
		/* Load widget */
		$this->model->loadWidget();
	}
	static function components()
	{
		return \Runtime\Vector::from(["BayLang.Constructor.Frontend.CSS","BayLang.Constructor.Frontend.Editor.Breadcrumbs","BayLang.Constructor.Frontend.Editor.WidgetMenu"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".index_page.h-c72c{display: flex;flex-direction: column;height: 100vh}.widget_edit_page__menu.h-c72c{display: flex;justify-content: flex-start;border-bottom: 1px var(--widget-color-border) solid}.widget_edit_page__menu--right.h-c72c{justify-content: right}.widget_edit_page__menu_item.h-c72c{cursor: pointer;user-select: none;padding: 10px}.widget_edit_page__menu_item--button.h-c72c{text-align: center;min-width: 40px}.widget_edit_page__menu_item--error.h-c72c{color: var(--widget-color-danger)}.widget_edit_page__menu_item--select_size.h-c72c{display: flex;padding: 0px}.widget_edit_page__menu_item--select_size.h-c72c .widget_edit_page__iframe_size.h-c72c{display: flex;justify-content: center;align-items: center;width: 40px;padding: 10px}.widget_edit_page__menu_item--select_size.h-c72c .widget_edit_page__iframe_size.selected.h-c72c{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.widget_edit_page__menu_item--selected.h-c72c{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.widget_edit_page__menu_item_gap.h-c72c{display: flex;flex: 1}.widget_edit_page__content.h-c72c{display: flex;flex: 1;height: calc(100vh - 41px)}.widget_edit_page__frame.h-c72c{display: flex;flex-direction: column;justify-content: stretch;align-items: stretch;width: calc(100% - 300px);position: relative;padding: 0px;flex: 1}.widget_edit_page__frame_wrap.h-c72c{display: flex;justify-content: center;flex: 1}.widget_edit_page__frame.h-c72c iframe{border-style: none;overflow: visible;width: 100%}");
		$res .= \Runtime\rtl::toStr(".scroll-lock{overflow: hidden;padding-right: 0px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->menu_items = \Runtime\Vector::from([\Runtime\Map::from(["label"=>"Styles","value"=>"styles"]),\Runtime\Map::from(["label"=>"CSS","value"=>"css"]),\Runtime\Map::from(["label"=>"Params","value"=>"params"]),\Runtime\Map::from(["label"=>"Tree","value"=>"tree"])]);
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.WidgetEditPage";
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