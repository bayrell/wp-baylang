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
namespace Runtime\WordPress\Components;
class CKEditor extends \Runtime\Web\Component
{
	public $name;
	public $value;
	public $change_timer;
	public $old_value;
	public $instance;
	public $is_instance_created;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'textarea' */
		$this->_e($__v0, "textarea", ["style" => "display: none;","name" => $this->name]);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_ckeditor"])], $__v0);
		
		return $this->_flatten($__v);
	}
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
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(\Runtime\Map::from(["value"=>$value,"old_value"=>$this->value,"data"=>$this->data])));
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
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_ckeditor.h-2122{min-height: 430px}.widget_ckeditor.h-2122 *{box-sizing: content-box !important}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
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
	static function getNamespace()
	{
		return "Runtime.WordPress.Components";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Components.CKEditor";
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