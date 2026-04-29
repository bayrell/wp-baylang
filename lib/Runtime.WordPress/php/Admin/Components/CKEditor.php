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
namespace Runtime\WordPress\Admin\Components;

use Runtime\Web\Messages\ValueChangeMessage;

class CKEditor extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_ckeditor", $componentHash))])));
		
		/* Element textarea */
		$__v0->element("textarea", (new \Runtime\Map(["style" => "display: none;", "name" => $this->name])));
		
		return $__v;
	}
	var $name;
	var $value;
	var $change_timer;
	var $old_value;
	var $instance;
	var $is_instance_created;
	/**
	 * Component mounted
	 */
	function onMounted()
	{
	}
	/**
	 * On code changed
	 */
	function onContentChange()
	{
		$this->change_timer = null;
		$value = $this->instance->getData();
		$this->old_value = $value;
		$this->value = $value;
		/* Send value change */
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(new \Runtime\Map([
			"value" => $value,
			"old_value" => $this->value,
			"data" => $this->data,
		])));
	}
	/**
	 * On updated
	 */
	function onUpdated()
	{
		if ($this->is_instance_created && $this->old_value != $this->value)
		{
		}
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->name = "";
		$this->value = "";
		$this->change_timer = null;
		$this->old_value = null;
		$this->instance = null;
		$this->is_instance_created = false;
	}
	static function getComponentStyle(){ return ".widget_ckeditor.h-1d98{min-height: 430px}.widget_ckeditor.h-1d98 *{box-sizing: content-box !important}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector(); }
	static function getClassName(){ return "Runtime.WordPress.Admin.Components.CKEditor"; }
}