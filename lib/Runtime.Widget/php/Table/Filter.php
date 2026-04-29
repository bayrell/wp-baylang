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
namespace Runtime\Widget\Table;

use Runtime\Widget\Button;

class Filter extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("table_filter", $componentHash))])));
		/* Filter Header */
		/* Element div */
		$__v1 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("table_filter__header", $componentHash))])));
		
		/* Element div */
		$__v2 = $__v1->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("table_filter__title", $componentHash))])));
		$__v2->push($this->translate("filter"));
		/* Filter Fields */
		for ($i = 0; $i < $this->model->fields->count(); $i++)
		{
			$field = $this->model->fields->get($i);
			$name = $field->get("name");
			$label = $field->get("label", $name);
			$component = $field->get("component");
			$props = $field->get("props");
			if (!$props)
			{
				$props = new \Runtime\Map();
			}
			
			/* Element div */
			$__v3 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("table_filter__row", $componentHash))])));
			
			/* Element div */
			$__v4 = $__v3->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("table_filter__label", $componentHash))])));
			$__v4->push($label);
			
			/* Element div */
			$__v5 = $__v3->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("table_filter__component", $componentHash))])));
			
			/* Element $component */
			$__v5->element($component, (new \Runtime\Map(["name" => $name, "value" => $this->model->getValue($name)]))->concat($props)->concat($this->getAttrs($field)));
		}
		/* Search Button */
		/* Element div */
		$__v6 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("table_filter__search", $componentHash))])));
		
		/* Element Runtime.Widget.Button */
		$__v7 = $__v6->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("button--primary", $componentHash))])));
		
		/* Content */
		$__v7->slot("default", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			$__v->push($this->translate("search"));
			
			return $__v;
		});
		
		return $__v;
	}
	/* Translate method */
	function translate($key)
	{
		/* You can use layout translations here */
		/* For now, returning simple fallback */
		if ($key == "filter") return "Filter";
		if ($key == "search") return "Search";
		return $key;
	}
	/* Search button click handler */
	function onSearchClick()
	{
		$this->model->applyFilter();
	}
	/**
	 * Returns attrs
	 */
	function getAttrs($field)
	{
		$attrs = new \Runtime\Map();
		$component = $field->get("component");
		if ($component == "Runtime.Widget.Input")
		{
			$attrs->set("onKeydown", $this->onKeyDown($field));
		}
		return $attrs;
	}
	/**
	 * Keydown
	 */
	function onKeyDown($field)
	{
		return function ($event) use (&$field)
		{
			if ($event->keyCode == 13)
			{
				$field_name = $field->get("name");
				$this->model->setValue($field_name, $event->target->value);
				$this->model->applyFilter();
			}
		};
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ".table_filter.h-3a22{margin-bottom: calc(2 * var(--space))}.table_filter__header.h-3a22{display: flex;align-items: center;justify-content: space-between;margin-bottom: calc(var(--space) * 2);border-bottom: 1px solid var(--color-border);padding-bottom: var(--space)}.table_filter__title.h-3a22{font-size: var(--font-size-h4);font-weight: 600;color: var(--color-heading-text)}.table_filter__row.h-3a22{display: flex;align-items: center;margin-bottom: var(--space)}.table_filter__label.h-3a22{min-width: 120px;margin-right: var(--space);color: var(--color-text-secondary)}.table_filter__component.h-3a22{flex: 1}.table_filter__search.h-3a22{margin-top: calc(var(--space) * 2);text-align: left}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button"); }
	static function getClassName(){ return "Runtime.Widget.Table.Filter"; }
}