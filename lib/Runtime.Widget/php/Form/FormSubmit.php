<?php
/*
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime\Widget\Form;

use Runtime\Widget\Form\Form;
use Runtime\Widget\Button;


class FormSubmit extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("form_submit", $componentHash))])));
		
		/* Element Runtime.Widget.Form.Form */
		$__v1 = $__v0->element("Runtime.Widget.Form.Form", (new \Runtime\Map(["fields" => $this->model->fields, "model" => $this->model])));
		
		/* Slot buttons */
		$__v1->slot("buttons", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element div */
			$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("row_buttons", $componentHash))])));
			
			/* Element Runtime.Widget.Button */
			$__v1 = $__v0->element("Runtime.Widget.Button", (new \Runtime\Map(["styles" => $this->buttonStyles])));
			
			/* Content */
			$__v1->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				$__v->push($this->buttonText);
				
				return $__v;
			});
			
			return $__v;
		});
		
		return $__v;
	}
	/**
	 * Returns button styles
	 */
	function buttonStyles()
	{
		if (!$this->model->submit_button) return new \Runtime\Vector();
		$styles = $this->model->submit_button->get("styles");
		return $styles ? $styles : new \Runtime\Vector();
	}
	/**
	 * Returns button text
	 */
	function buttonText()
	{
		if (!$this->model->submit_button) return "";
		$text = $this->model->submit_button->get("text");
		return $text ? $text : "";
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ""; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Form.Form", "Runtime.Widget.Button"); }
	static function getClassName(){ return "Runtime.Widget.Form.FormSubmit"; }
}