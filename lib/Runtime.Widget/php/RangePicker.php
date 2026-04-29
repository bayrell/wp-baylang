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

use Runtime\DateRange;
use Runtime\DateTime;
use Runtime\Widget\Messages\ValueChangeMessage;
use Runtime\Widget\DatePicker;
use Runtime\Widget\Translator;


class RangePicker extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("range_picker", $this->class, $componentHash))])));
		
		/* Element Runtime.Widget.DatePicker */
		$__v0->element("Runtime.Widget.DatePicker", (new \Runtime\Map(["value" => $this->getStartDate, "name" => $this->name . "_start", "only_date" => $this->only_date])));
		
		/* Element span */
		$__v1 = $__v0->element("span");
		$__v1->push($this->translate("range_picker_to", "to"));
		
		/* Element Runtime.Widget.DatePicker */
		$__v0->element("Runtime.Widget.DatePicker", (new \Runtime\Map(["value" => $this->getEndDate, "name" => $this->name . "_end", "only_date" => $this->only_date])));
		
		return $__v;
	}
	/**
	 * Props
	 */
	var $value;
	var $name;
	var $only_date;
	/**
	 * Returns start and end date
	 */
	function getStartDate(){ return $this->value ? $this->value->start_date : null; }
	function getEndDate(){ return $this->value ? $this->value->end_date : null; }
	/**
	 * Translations
	 */
	function translator(){ return $this->layout->get("translator"); }
	function translate($key, $default_value){ return $this->translator ? $this->translator->translate("runtime", $key, $default_value) : $default_value; }
	/**
	 * Update start date
	 */
	function updateStartDate($value)
	{
		$range = $this->value ? \Runtime\rtl::copy($this->value) : new \Runtime\DateRange();
		$range->start_date = $value;
		$this->emit(new \Runtime\Widget\Messages\ValueChangeMessage(new \Runtime\Map([
			"value" => $range,
			"old_value" => $this->value,
			"data" => $this->data,
		])));
	}
	/**
	 * Update end date
	 */
	function updateEndDate($value)
	{
		$range = $this->value ? \Runtime\rtl::copy($this->value) : new \Runtime\DateRange();
		$range->end_date = $value;
		$this->emit(new \Runtime\Widget\Messages\ValueChangeMessage(new \Runtime\Map([
			"value" => $range,
			"old_value" => $this->value,
			"data" => $this->data,
		])));
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->value = null;
		$this->name = "";
		$this->only_date = "false";
	}
	static function getComponentStyle(){ return ".range_picker.h-e674{display: flex;align-items: center;gap: calc(2 * var(--space))}.range_picker.h-e674 .date_picker{flex: 1}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.DatePicker"); }
	static function getClassName(){ return "Runtime.Widget.RangePicker"; }
}