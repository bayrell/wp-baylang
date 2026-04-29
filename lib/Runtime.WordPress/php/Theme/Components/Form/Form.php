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

use Runtime\Widget\Input;
use Runtime\Widget\TextArea;
use Runtime\Widget\Form\Form as BaseForm;


class Form extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("wordpress_form", $this->class, $componentHash))])));
		
		/* Element Runtime.Widget.Form.Form */
		$__v1 = $__v0->element("Runtime.Widget.Form.Form", (new \Runtime\Map(["fields" => $this->fields, "model" => $this->model])));
		
		/* Slot title */
		$__v1->slot("title", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			$__v->push($this->renderSlot("title"));
			
			return $__v;
		});
		
		/* Slot buttons */
		$__v1->slot("buttons", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			$__v->push($this->renderSlot("buttons"));
			
			return $__v;
		});
		
		return $__v;
	}
	var $is_show;
	/**
	 * Returns component name
	 */
	function getFieldComponent($name)
	{
		if ($name == "textarea") return "Runtime.Widget.TextArea";
		return "Runtime.Widget.Input";
	}
	/**
	 * Returns fields
	 */
	function fields()
	{
		return $this->model->fields->map(function ($item)
		{
			return new \Runtime\Map([
				"name" => $item->get("name"),
				"component" => $this->getFieldComponent($item->get("type")),
				"label" => $item->get("title"),
				"props" => new \Runtime\Map([
					"placeholder" => $item->get("placeholder"),
				]),
			]);
		});
	}
	/**
	 * Mounted component
	 */
	function mounted()
	{
		$this->nextTick(function ()
		{
			$this->is_show = true;
		});
		$item = new \Runtime\Map();
		for ($i = 0; $i < $this->model->fields->count(); $i++)
		{
			$field = $this->model->fields->get($i);
			$item->set($field->get("name"), "");
		}
		$this->model->setItem($item);
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->is_show = false;
	}
	static function getComponentStyle(){ return ""; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Input", "Runtime.Widget.TextArea"); }
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Form.Form"; }
}