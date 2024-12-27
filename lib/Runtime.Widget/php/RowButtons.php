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
class RowButtons extends \Runtime\Widget\RenderList
{
	public $styles;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model)
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderItems());
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_row_buttons", $this->class, static::getStyles("widget_row_buttons", $this->model->styles)])], $__v0);
		}
		else
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderSlot("default"));
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_row_buttons", $this->class, static::getStyles("widget_row_buttons", $this->styles)])], $__v0);
		}
		
		return $this->_flatten($__v);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.RenderList"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_row_buttons.h-a598{display: flex;gap: var(--widget-space)}.widget_row_buttons--align-end.h-a598{justify-content: end}.widget_row_buttons--no-gap.h-a598{gap: 0}.widget_row_buttons--no-gap.h-a598 .widget_button.h-8dd7{border-right-width: 0;border-radius: 0}.widget_row_buttons--no-gap.h-a598 .widget_button.item--first.h-8dd7{border-top-left-radius: 4px;border-bottom-left-radius: 4px}.widget_row_buttons--no-gap.h-a598 .widget_button.item--last.h-8dd7{border-top-right-radius: 4px;border-bottom-right-radius: 4px;border-right-width: var(--widget-border-width) !important}.widget_row_buttons--top_buttons.h-a598{margin-bottom: 10px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->styles = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.RowButtons";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.RenderList";
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