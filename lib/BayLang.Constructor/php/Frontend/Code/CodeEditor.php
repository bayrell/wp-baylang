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
namespace BayLang\Constructor\Frontend\Code;
class CodeEditor extends \Runtime\Web\Component
{
	function renderMenu()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'a' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Back");
		
		/* Element 'a' */
		$this->_e($__v0, "a", ["href" => (($this->layout->route->data) ? ($this->layout->route->data->get("back_url")) : ($this->layout->url("baylang:project:modules", \Runtime\Map::from(["project_id"=>$this->model->project_id])))),"class" => $this->_class_name(["code_editor__menu_item nolink"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Save");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["code_editor__menu_item"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		if ($this->model->selected_tab)
		{
			/* Text */
			$this->_t($__v1, $this->_escape($this->model->selected_tab->file_path));
		}
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["code_editor_menu_item code_editor_menu_item_file_name"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["code_editor__menu"])], $__v0);
		
		return $__v;
	}
	function renderTabs()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->model->tabs->count(); $i++)
		{
			$item = $this->model->tabs->get($i);
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Element 'div' */
			$__v2 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v2, $this->_escape($item->label));
			
			/* Element 'div' */
			$this->_e($__v1, "div", ["class" => $this->_class_name(["code_editor__label"])], $__v2);
			
			/* Element 'div' */
			$__v2 = new \Runtime\Vector();
			
			/* Element 'span' */
			$__v3 = new \Runtime\Vector();
			
			/* Raw */
			$this->_t($__v3, new \Runtime\RawString("&#10005;"));
			
			/* Element 'span' */
			$this->_e($__v2, "span", [], $__v3);
			
			/* Element 'div' */
			$this->_e($__v1, "div", ["class" => $this->_class_name(["code_editor__icon"])], $__v2);
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["code_editor__tab", (($item == $this->model->selected_tab) ? ("selected") : (""))])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["code_editor__tabs"])], $__v0);
		
		return $__v;
	}
	function renderStatusBar()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($this->model->save_result->message));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["code_editor__status_bar"])], $__v0);
		
		return $__v;
	}
	function renderFileEditor()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->model->tabs->count(); $i++)
		{
			$item = $this->model->tabs->get($i);
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Component 'TextEditable' */
			$this->_c($__v1, "BayLang.Constructor.Frontend.Code.TextEditable", ["value" => $item->content,"reference" => $item->code_editor,"class" => $this->_class_name(["wrap"])]);
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["code_editor__file", (($item == $this->model->selected_tab) ? ("") : ("hide"))])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["code_editor__file_edit"])], $__v0);
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderMenu());
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, $this->renderWidget($this->model->tree));
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["code_editor__file_manager"])], $__v2);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, $this->renderTabs());
		
		/* Text */
		$this->_t($__v2, $this->renderFileEditor());
		
		/* Text */
		$this->_t($__v2, $this->renderStatusBar());
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["code_editor__content"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["code_editor__main"])], $__v1);
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->confirm_dialog));
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->prompt_dialog));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["code_editor"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Mounted
 */
	function onMounted()
	{
		$document->addEventListener("keydown", $this->onKeyDown);
	}
	/**
 * Key down
 */
	function onKeyDown($e)
	{
		if ($e->key == "s" && $e->ctrlKey)
		{
			$this->model->save();
			$e->preventDefault();
		}
	}
	static function components()
	{
		return \Runtime\Vector::from(["BayLang.Constructor.Frontend.Code.TextEditable"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".code_editor.h-fd5f{display: flex;position: relative;flex-direction: column;overflow-y: hidden;height: 100vh}.code_editor__menu.h-fd5f{display: flex;border-bottom: 1px var(--widget-color-border) solid}.code_editor__menu_item.h-fd5f{cursor: pointer;user-select: none;padding: 10px}.code_editor_menu_item_file_name.h-fd5f{display: flex;align-items: center;justify-content: center;flex: 1}.code_editor__main.h-fd5f{display: flex;height: calc(100% - 37px)}.code_editor__file_manager.h-fd5f{position: relative;border-right: 1px var(--widget-color-border) solid;overflow-x: auto;padding-left: 5px;width: 300px;overflow-x: auto;padding-left: 5px}.code_editor__content.h-fd5f{display: flex;flex-direction: column;height: 100%;width: calc(100% - 300px)}.code_editor__tabs.h-fd5f{display: flex;height: 32px;border-bottom: 1px var(--widget-color-border) solid;overflow-x: auto;scrollbar-width: none}.code_editor__tab.h-fd5f{display: flex;border-right: 1px var(--widget-color-border) solid;padding: 5px;cursor: pointer;user-select: none}.code_editor__tab.selected.h-fd5f{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.code_editor__label.h-fd5f{display: flex;align-items: center;padding-left: 5px;flex: 1}.code_editor__icon.h-fd5f{display: flex;align-items: center;justify-content: center;padding-top: 3px;width: 24px}.code_editor__icon.h-fd5f span{padding: 1px}.code_editor__icon.h-fd5f:hover span{background-color: #f0f0f0}.code_editor__tab.selected.h-fd5f .code_editor__icon:hover span{background-color: var(--widget-color-primary)}.code_editor__file_edit.h-fd5f{position: relative;height: calc(100% - 56px)}.code_editor__file.h-fd5f{overflow-y: auto;height: 100%}.code_editor__file.h-fd5f .widget_text_editable.h-6975{border-width: 0px;padding: 5px}.code_editor__file.hide.h-fd5f{display: none}.code_editor__status_bar.h-fd5f{display: flex;align-items: center;padding: 2px;padding-left: 5px;border-top: 1px var(--widget-color-border) solid;height: 24px}");
		$res .= \Runtime\rtl::toStr(".code_editor__tabs.h-fd5f::-webkit-scrollbar{width: 0}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Code";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Code.CodeEditor";
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