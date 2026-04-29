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

use Runtime\Widget\Button;

class FormDialog extends \Runtime\Widget\Dialog\Dialog
{
	function renderTitle()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		if ($this->model->title != "")
		{
			/* Element div */
			$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_dialog__title", $componentHash))])));
			
			/* Element span */
			$__v1 = $__v0->element("span", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_dialog__title__text", $componentHash))])));
			$__v1->push($this->model->title);
			
			/* Element Runtime.Widget.Button */
			$__v2 = $__v0->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_dialog__title__close", $componentHash))])));
			
			/* Content */
			$__v2->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				$__v->push("x");
				return $__v;
			});
		}
		
		return $__v;
	}
	function renderContent()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		$__v->push($this->renderWidget($this->model->form));
		
		return $__v;
	}
	function renderButtons()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		return $__v;
	}
	/**
	 * On shadow click
	 */
	function onShadowClick()
	{
		$this->model->hide();
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ".widget_dialog__shadow.h-d2d4{opacity: 0.5}.widget_dialog__title.h-d2d4{display: flex;align-items: center}.widget_dialog__title.h-d2d4 span{flex: 1}.widget_dialog__title.h-d2d4 %(Button)widget_button{display: flex;align-items: center;justify-content: center;width: 42px;height: 34px;font-size: 20px;font-weight: bold;text-transform: uppercase;background-color: #fff;border: 1px #d9d9d9 solid;cursor: pointer;border-radius: 5px}.widget_dialog.h-d2d4 %(Form)widget_form__button %(Button)widget_button{width: 100%}.widget_dialog.h-d2d4 %(Input)widget_input, .widget_dialog.h-d2d4 %(TextArea)widget_textarea{padding: 10px;font-size: 16px;border-radius: 5px}.widget_dialog.h-d2d4 %(TextArea)widget_textarea{min-height: 150px}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button"); }
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Form.FormDialog"; }
}