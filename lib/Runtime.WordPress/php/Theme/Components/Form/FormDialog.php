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
namespace Runtime\WordPress\Theme\Components\Form;
class FormDialog extends \Runtime\Widget\Dialog\Dialog
{
	function renderTitle()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model->title != "")
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Element 'span' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->_escape($this->model->title));
			
			/* Element 'span' */
			$this->_e($__v0, "span", ["class" => $this->_class_name(["widget_dialog__title__text"])], $__v1);
			
			/* Component 'Button' */
			$this->_c($__v0, "Runtime.Widget.Button", ["class" => $this->_class_name(["widget_dialog__title__close"])], function (){
				$__v = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v, "x");
				
				return $__v;
			});
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_dialog__title"])], $__v0);
		}
		
		return $__v;
	}
	function renderContent()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderWidget($this->model->form));
		
		return $__v;
	}
	function renderButtons()
	{
		$__v = new \Runtime\Vector();
		
		return $__v;
	}
	/**
 * On shadow click
 */
	function onShadowClick()
	{
		$this->model->hide();
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Dialog.Dialog","Runtime.Widget.Button"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_dialog__shadow.h-d2d5{opacity: 0.5}.widget_dialog__title.h-d2d5{display: flex;align-items: center}.widget_dialog__title.h-d2d5 span{flex: 1}.widget_dialog__title.h-d2d5 .widget_button.h-8dd7{display: flex;align-items: center;justify-content: center;width: 42px;height: 34px;font-size: 20px;font-weight: bold;text-transform: uppercase;background-color: #fff;border: 1px #d9d9d9 solid;cursor: pointer;border-radius: 5px}.widget_dialog.h-d2d5 .widget_form__button.h-e7fd .widget_button.h-8dd7{width: 100%}.widget_dialog.h-d2d5 .widget_input.h-60a2,.widget_dialog.h-d2d5 .widget_textarea.h-5654{padding: 10px;font-size: 16px;border-radius: 5px}.widget_dialog.h-d2d5 .widget_textarea.h-5654{min-height: 150px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Components.Form";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Components.Form.FormDialog";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Dialog.Dialog";
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