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
class WidgetResult extends \Runtime\Web\Component
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($this->model->message));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_result", $this->getErrorClass(), static::getStyles("widget_result", $this->model->styles)])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns error class
 */
	function getErrorClass()
	{
		if ($this->model->message == "")
		{
			return "widget_result--hide";
		}
		if ($this->model->isSuccess())
		{
			return "widget_result--success";
		}
		if ($this->model->isError())
		{
			return "widget_result--error";
		}
		return "";
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_result.h-e870{text-align: center}.widget_result--margin_top.h-e870{margin-top: var(--widget-space)}.widget_result--success.h-e870{color: var(--widget-color-success)}.widget_result--error.h-e870{color: var(--widget-color-danger)}.widget_result--hide.h-e870{display: none}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.WidgetResult";
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