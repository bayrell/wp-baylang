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
class Input extends \Runtime\Web\Component
{
	public $direct_update;
	public $readonly;
	public $name;
	public $value;
	public $default;
	public $placeholder;
	public $type;
	public $change_timer;
	function render()
	{
		$__v = new \Runtime\Vector();
		$props = $this->getProps();
		
		/* Element 'input' */
		$this->_e($__v, "input", $this->_merge_attrs(["type" => $this->type,"name" => $this->name,"value" => $this->getValue(),"placeholder" => $this->placeholder,"class" => $this->_class_name(["widget_input"])], $props));
		
		return $this->_flatten($__v);
	}
	/**
 * Returns value
 */
	function getValue()
	{
		if ($this->value)
		{
			return $this->value;
		}
		return $this->default;
	}
	/**
 * Returns input props
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
	function onChange($e)
	{
		$input = $this->getRef("input");
		/* Send value change */
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(\Runtime\Map::from(["value"=>$input->value,"old_value"=>$this->value,"data"=>$this->data])));
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_input.h-f2df{width: 100%;font-family: var(--widget-font-family);font-size: var(--widget-font-size);padding: var(--widget-input-padding-y) var(--widget-input-padding-x);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal;min-height: 32px}.widget_input.h-f2df:focus{outline: transparent}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->direct_update = false;
		$this->readonly = false;
		$this->name = "";
		$this->value = "";
		$this->default = "";
		$this->placeholder = "";
		$this->type = "text";
		$this->change_timer = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Input";
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