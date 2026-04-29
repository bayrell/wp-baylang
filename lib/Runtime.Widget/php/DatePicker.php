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
namespace Runtime\Widget;

use Runtime\DateTime;
use Runtime\Widget\Input;
use Runtime\Widget\Messages\ValueChangeMessage;


class DatePicker extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		if ($this->only_date == "true")
		{
			/* Element Runtime.Widget.Input */
			$__v->element("Runtime.Widget.Input", (new \Runtime\Map(["type" => "date", "class" => \Runtime\rs::className(new \Runtime\Vector("date_picker", $this->class, $componentHash)), "name" => $this->name, "value" => $this->getValueDate])));
		}
		else
		{
			/* Element div */
			$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("date_picker", $this->class, $componentHash))])));
			
			/* Element Runtime.Widget.Input */
			$__v0->element("Runtime.Widget.Input", (new \Runtime\Map(["type" => "date", "class" => \Runtime\rs::className(new \Runtime\Vector("date_picker_value", $componentHash)), "name" => $this->name, "value" => $this->getValueDate])));
			
			/* Element Runtime.Widget.Input */
			$__v0->element("Runtime.Widget.Input", (new \Runtime\Map(["type" => "input", "class" => \Runtime\rs::className(new \Runtime\Vector("date_picker_time", $componentHash)), "name" => $this->name . "_time", "value" => $this->getValueTime])));
		}
		
		return $__v;
	}
	var $value;
	var $name;
	var $only_date;
	var $internal_value;
	/**
	 * Returns value
	 */
	function getValueDate()
	{
		return $this->internal_value ? $this->internal_value->getDate() : "";
	}
	/**
	 * Returns value time
	 */
	function getValueTime()
	{
		if (!$this->internal_value) return "";
		return \Runtime\rs::pad2($this->internal_value->h) . ":" . \Runtime\rs::pad2($this->internal_value->i);
	}
	/**
	 * Update value
	 */
	function updateValue($value)
	{
		if ($value == null || $this->internal_value == null)
		{
			$this->internal_value = $value ? $value->normalize() : null;
		}
		else if ($this->internal_value->timestamp() != $this->value->timestamp())
		{
			$this->internal_value = $value->normalize();
		}
	}
	/**
	 * Update value
	 */
	function updateValueDate($value)
	{
		$date = null;
		if ($value != "")
		{
			$y = \Runtime\rtl::toInt(\Runtime\rs::substr($value, 0, 4));
			$m = \Runtime\rtl::toInt(\Runtime\rs::substr($value, 5, 2));
			$d = \Runtime\rtl::toInt(\Runtime\rs::substr($value, 8, 2));
			$params = new \Runtime\Map(["y" => $y, "m" => $m, "d" => $d, "o" => \Runtime\rtl::getContext()->env("TZ_OFFSET") / 3600]);
			if ($this->value) $date = $this->internal_value->copy($params);
			else $date = new \Runtime\DateTime($params);
		}
		$this->emit(new \Runtime\Widget\Messages\ValueChangeMessage(new \Runtime\Map([
			"value" => $date,
			"old_value" => $this->internal_value ? $this->internal_value->copy() : null,
			"data" => $this->data,
		])));
	}
	/**
	 * Update value time
	 */
	function updateValueTime($value)
	{
		$date = null;
		if ($value != "")
		{
			$h = \Runtime\rs::substr($value, 0, 2);
			$i = \Runtime\rs::substr($value, 3, 2);
			$params = new \Runtime\Map(["h" => $h, "i" => $i, "o" => \Runtime\rtl::getContext()->env("TZ_OFFSET") / 3600]);
			if ($this->value) $date = $this->internal_value->copy($params);
			else $date = new \Runtime\DateTime($params);
		}
		$this->emit(new \Runtime\Widget\Messages\ValueChangeMessage(new \Runtime\Map([
			"value" => $date,
			"old_value" => $this->internal_value ? $this->internal_value->copy() : null,
			"data" => $this->data,
		])));
	}
	function mounted()
	{
		$this->updateValue($this->value);
	}
	function updated()
	{
		$this->updateValue($this->value);
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->value = null;
		$this->name = "";
		$this->only_date = "false";
		$this->internal_value = null;
	}
	static function getComponentStyle(){ return ".date_picker.h-af2{display: flex;gap: var(--space)}.date_picker.h-af2 .date_picker_value{flex: 1}.date_picker.h-af2 .date_picker_time{width: 80px}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Input"); }
	static function getClassName(){ return "Runtime.Widget.DatePicker"; }
}