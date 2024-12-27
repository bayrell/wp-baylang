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
class Button extends \Runtime\Web\Component
{
	public $class;
	public $type;
	public $target;
	public $content;
	public $href;
	public $styles;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->href == null)
		{
			/* Element 'button' */
			$__v0 = new \Runtime\Vector();
			
			if ($this->content)
			{
				/* Text */
				$this->_t($__v0, $this->_escape($this->content));
			}
			else
			{
				/* Text */
				$this->_t($__v0, $this->renderSlot("default"));
			}
			
			/* Element 'button' */
			$this->_e($__v, "button", ["type" => $this->type,"class" => $this->_class_name(["widget_button", static::getStyles("widget_button", $this->styles), $this->renderListClass(), $this->class])], $__v0);
		}
		else
		{
			/* Element 'a' */
			$__v0 = new \Runtime\Vector();
			
			/* Element 'button' */
			$__v1 = new \Runtime\Vector();
			
			if (!$this->checkSlot("default"))
			{
				/* Text */
				$this->_t($__v1, $this->_escape($this->content));
			}
			else
			{
				/* Text */
				$this->_t($__v1, $this->renderSlot("default"));
			}
			
			/* Element 'button' */
			$this->_e($__v0, "button", ["type" => $this->type,"class" => $this->_class_name(["widget_button", static::getStyles("widget_button", $this->styles), $this->renderListClass()])], $__v1);
			
			/* Element 'a' */
			$this->_e($__v, "a", ["href" => $this->href,"target" => $this->target,"class" => $this->_class_name(["nolink", $this->class])], $__v0);
		}
		
		return $this->_flatten($__v);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_button.h-8dd7{color: var(--widget-color-text);font-family: var(--widget-font-family);font-size: var(--widget-font-size);line-height: var(--widget-line-height);background-color: var(--widget-color-default);border: var(--widget-border-width) var(--widget-color-border) solid;padding: var(--widget-button-padding-y) var(--widget-button-padding-x);outline: 0;cursor: pointer;border-radius: 4px}.widget_button.h-8dd7:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25)}.widget_button--small.h-8dd7{padding: var(--widget-button-padding-small-y) var(--widget-button-padding-small-x);line-height: 1.2em}.widget_button--large.h-8dd7{padding: var(--widget-button-padding-large-y) var(--widget-button-padding-large-x)}.widget_button--primary.h-8dd7{color: var(--widget-color-primary-text);background-color: var(--widget-color-primary);border-color: var(--widget-color-primary)}.widget_button--danger.h-8dd7{color: var(--widget-color-danger-text);background-color: var(--widget-color-danger);border-color: var(--widget-color-danger)}.widget_button--success.h-8dd7{color: var(--widget-color-success-text);background-color: var(--widget-color-success);border-color: var(--widget-color-success)}.widget_button--stretch.h-8dd7{width: 100%}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->class = "";
		$this->type = "button";
		$this->target = "_self";
		$this->content = "";
		$this->href = null;
		$this->styles = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Button";
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