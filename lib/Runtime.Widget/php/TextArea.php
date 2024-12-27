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
namespace Runtime\Widget;
class TextArea extends \Runtime\Web\Component
{
	public $direct_update;
	public $readonly;
	public $height;
	public $name;
	public $value;
	public $placeholder;
	public $change_timer;
	function render()
	{
		$__v = new \Runtime\Vector();
		$props = $this->getProps();
		
		/* Element 'textarea' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($this->value));
		
		/* Element 'textarea' */
		$this->_e($__v, "textarea", $this->_merge_attrs(["name" => $this->name,"placeholder" => $this->placeholder,"style" => $this->getStyle(),"class" => $this->_class_name(["widget_textarea"])], $props), $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns textarea props
 */
	function getProps()
	{
		if ($this->readonly)
		{
			return \Runtime\Map::from(["readonly"=>true]);
		}
		return \Runtime\Map::from([]);
	}
	/**
 * Returns style
 */
	function getStyle()
	{
		$content = \Runtime\Vector::from([]);
		if ($this->height)
		{
			$content->push("min-height: " . \Runtime\rtl::toStr($this->height));
		}
		return \Runtime\rs::join(";", $content);
	}
	/**
 * Updated event
 */
	function onUpdated()
	{
		$textarea = $this->getRef("textarea");
		$textarea->value = $this->value;
	}
	/**
 * KeyDown event
 */
	function onKeyDown($e)
	{
		if (!$this->direct_update)
		{
			return ;
		}
		if ($this->change_timer != null)
		{
			$window->clearTimeout($this->change_timer);
			$this->change_timer = null;
		}
		$this->change_timer = $window->setTimeout(function ()
		{
			$this->onChange();
		}, 300);
	}
	/**
 * Change event
 */
	function onChange()
	{
		$textarea = $this->getRef("textarea");
		/* Send value change */
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(\Runtime\Map::from(["value"=>$textarea->value,"old_value"=>$this->value,"data"=>$this->data])));
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_textarea.h-ee82{width: 100%;max-width: 100%;min-height: 400px;font-family: var(--widget-font-family);font-size: var(--widget-font-size);padding: var(--widget-input-padding-y) var(--widget-input-padding-x);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal}.widget_textarea.h-ee82:focus{outline: transparent}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->direct_update = false;
		$this->readonly = false;
		$this->height = "";
		$this->name = "";
		$this->value = "";
		$this->placeholder = "";
		$this->change_timer = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.TextArea";
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