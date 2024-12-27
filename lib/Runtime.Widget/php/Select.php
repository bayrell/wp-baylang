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
class Select extends \Runtime\Web\Component
{
	public $name;
	public $value;
	public $default;
	public $options;
	public $show_select_value;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'select' */
		$__v0 = new \Runtime\Vector();
		$value = $this->getValue();
		$options = $this->getOptions();
		$selected = \Runtime\Map::from([]);
		
		if ($this->show_select_value === true || $this->show_select_value == "true")
		{
			if ($value === "" || $value === null)
			{
				$selected = \Runtime\Map::from(["selected"=>"selected"]);
			}
			
			/* Element 'option' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, "Select value");
			
			/* Element 'option' */
			$this->_e($__v0, "option", $this->_merge_attrs(["value" => ""], $selected), $__v1);
		}
		
		if ($options != null)
		{
			for ($i = 0; $i < $options->count(); $i++)
			{
				$item = $options->get($i);
				$selected = \Runtime\Map::from([]);
				
				if ($item->get("key") == $value && $value !== "" && $value !== null)
				{
					$selected = \Runtime\Map::from(["selected"=>"selected"]);
				}
				
				/* Element 'option' */
				$__v1 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v1, $this->_escape($item->get("value")));
				
				/* Element 'option' */
				$this->_e($__v0, "option", $this->_merge_attrs(["value" => "" . \Runtime\rtl::toStr($item->get("key"))], $selected), $__v1);
			}
		}
		
		/* Element 'select' */
		$this->_e($__v, "select", ["name" => $this->name,"class" => $this->_class_name(["widget_select"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns value
 */
	function getValue()
	{
		if ($this->value !== "" && $this->value !== null)
		{
			return $this->value;
		}
		return $this->default;
	}
	/**
 * Returns options
 */
	function getOptions()
	{
		if ($this->model == null)
		{
			return $this->options;
		}
		return $this->model->getOptions();
	}
	/**
 * Change event
 */
	function onChange($e)
	{
		/* Send value change */
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(\Runtime\Map::from(["value"=>$e->target->value,"old_value"=>$this->value,"data"=>$this->data])));
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_select.h-d72d,.widget_select.h-d72d:focus{width: 100%;font-family: var(--widget-font-family);font-size: var(--widget-font-size);padding: var(--widget-input-padding-y) var(--widget-input-padding-x);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal;color: inherit;max-width: 100%;min-height: 32px}.widget_select.h-d72d:hover{color: inherit}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->name = "";
		$this->value = "";
		$this->default = "";
		$this->options = null;
		$this->show_select_value = true;
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Select";
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