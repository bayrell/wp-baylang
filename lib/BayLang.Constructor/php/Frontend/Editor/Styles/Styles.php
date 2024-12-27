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
namespace BayLang\Constructor\Frontend\Editor\Styles;
class Styles extends \Runtime\Web\Component
{
	public $old_selector_name;
	public $add_dialog;
	public $edit_dialog;
	public $delete_dialog;
	function renderStyle($selector_name)
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, $this->_escape($selector_name));
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_style__label"])], $__v2);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "[Edit]");
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_style__button"])], $__v2);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "[Delete]");
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_style__button"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_style__name"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'TextEditable' */
		$this->_c($__v1, "Runtime.Widget.TextEditable", ["name" => $selector_name,"value" => $this->model->getSelectorContent($selector_name),"class" => $this->_class_name(["widget_style__editable overflow"])]);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_style__content"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_style"])], $__v0);
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'Button' */
		$this->_c($__v1, "Runtime.Widget.Button", ["styles" => \Runtime\Vector::from(["small"])], function (){
			$__v = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v, "Add");
			
			return $__v;
		});
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_styles__buttons"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		$keys = $this->model->selectors->keys()->sort();
		
		for ($i = 0; $i < $keys->count(); $i++)
		{
			/* Text */
			$this->_t($__v1, $this->renderStyle($keys->get($i)));
		}
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_styles__items"])], $__v1);
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->add_dialog));
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->edit_dialog));
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->delete_dialog));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_styles"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Add dialog
 */
	function onAddClick()
	{
		$this->add_dialog->setValue("");
		$this->add_dialog->show();
	}
	/**
 * Edit click
 */
	function onEditClick($selector_name)
	{
		$this->old_selector_name = $selector_name;
		$this->edit_dialog->setTitle("Rename style " . \Runtime\rtl::toStr($selector_name));
		$this->edit_dialog->setValue($selector_name);
		$this->edit_dialog->show();
	}
	/**
 * Delete click
 */
	function onDeleteClick($selector_name)
	{
		$this->old_selector_name = $selector_name;
		$this->delete_dialog->setTitle("Delete style " . \Runtime\rtl::toStr($selector_name));
		$this->delete_dialog->show();
	}
	/**
 * Add style
 */
	function onAddStyle($message)
	{
		$selector_name = $message->value;
		if (\Runtime\rs::charAt($selector_name, 0) != ".")
		{
			$selector_name = "." . \Runtime\rtl::toStr($selector_name);
		}
		if ($this->model->selectors->has($selector_name))
		{
			throw new \Runtime\Widget\Dialog\DialogModelException("selector " . \Runtime\rtl::toStr($selector_name) . \Runtime\rtl::toStr(" allready exists"));
		}
		$this->model->changeSelectorContent($selector_name, "");
	}
	/**
 * Rename style
 */
	function onRenameStyle($message)
	{
		$new_selector_name = $message->value;
		if (\Runtime\rs::charAt($new_selector_name, 0) != ".")
		{
			$new_selector_name = "." . \Runtime\rtl::toStr($new_selector_name);
		}
		if ($this->model->selectors->has($new_selector_name))
		{
			throw new \Runtime\Widget\Dialog\DialogModelException($new_selector_name . \Runtime\rtl::toStr(" allready exists"));
			return ;
		}
		/* Rename style */
		$css_content = $this->model->getSelectorContent($this->old_selector_name);
		$this->model->selectors->remove($this->old_selector_name);
		$this->model->changeSelectorContent($new_selector_name, $css_content);
	}
	/**
 * Delete style
 */
	function onDeleteStyle()
	{
		$this->model->changeSelectorContent($this->old_selector_name, "");
		$this->model->selectors->remove($this->old_selector_name);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.TextEditable","Runtime.Widget.Dialog.PromptDialog"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_styles__buttons.h-f84f{padding-bottom: 5px}.widget_styles__items.h-f84f{border: 1px var(--widget-color-border) solid;border-bottom: 0px}.widget_style__name.h-f84f{display: flex;padding: 5px;gap: 5px;background-color: aliceblue;border-bottom: 1px var(--widget-color-border) solid;width: 100%}.widget_style__label.h-f84f{flex: 1;overflow-wrap: anywhere}.widget_style__button.h-f84f{cursor: pointer;font-size: 12px}.widget_style__button.h-f84f:hover{text-decoration: underline}.widget_style__name.h-f84f:hover .widget_style__button{display: block}.widget_style__content.h-f84f{padding: 5px;border-bottom: 1px var(--widget-color-border) solid}.widget_style__editable.h-f84f{border: 0;padding: 10px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->old_selector_name = "";
		$this->add_dialog = new \Runtime\Widget\Dialog\PromptDialogModel(\Runtime\Map::from(["widget_name"=>"add_dialog","confirm_button"=>"Add","title"=>"Add new style","events"=>\Runtime\Map::from(["confirm"=>new \Runtime\Callback($this, "onAddStyle")])]));
		$this->edit_dialog = new \Runtime\Widget\Dialog\PromptDialogModel(\Runtime\Map::from(["widget_name"=>"edit_dialog","confirm_button"=>"Rename","title"=>"Rename style","events"=>\Runtime\Map::from(["confirm"=>new \Runtime\Callback($this, "onRenameStyle")])]));
		$this->delete_dialog = new \Runtime\Widget\Dialog\ConfirmDialogModel(\Runtime\Map::from(["widget_name"=>"delete_dialog","confirm_button"=>"Delete","title"=>"Delete style","events"=>\Runtime\Map::from(["confirm"=>new \Runtime\Callback($this, "onDeleteStyle")])]));
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.Styles";
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