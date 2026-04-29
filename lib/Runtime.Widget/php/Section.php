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

use Runtime\Widget\BoolEnum;

class Section extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		$attrs = $this->getAttrs;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("section", $this->class, $componentHash)), "style" => $this->getStyle()]))->concat($attrs));
		
		if ($this->wrap == "true")
		{
			/* Element div */
			$__v1 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("section__wrap", $componentHash)), "style" => $this->getWrapStyle()])));
			$__v1->push($this->renderSlot("default"));
		}
		else
		{
			$__v0->push($this->renderSlot("default"));
		}
		
		return $__v;
	}
	var $id;
	var $wrap;
	var $flex;
	var $align_items;
	var $justify_content;
	var $flex_direction;
	var $flex_wrap;
	var $height;
	var $min_height;
	/**
	 * Returns attrs
	 */
	function getAttrs()
	{
		$attrs = new \Runtime\Map();
		if ($this->id != "") $attrs->set("id", $this->id);
		return $attrs;
	}
	/**
	 * Returns styles
	 */
	function getStyle()
	{
		$res = new \Runtime\Vector();
		if (!$this->wrap)
		{
			$res->push($this->getWrapStyle());
		}
		return \Runtime\rs::join(";", $res);
	}
	/**
	 * Returns wrap style
	 */
	function getWrapStyle()
	{
		$res = new \Runtime\Vector();
		if ($this->flex == "true")
		{
			$res->push("display: flex;");
			if ($this->align_items) $res->push("align-items: " . $this->align_items);
			if ($this->justify_content) $res->push("justify-content: " . $this->justify_content);
			if ($this->flex_direction) $res->push("flex-direction: " . $this->flex_direction);
			if ($this->flex_wrap) $res->push("flex-wrap: " . $this->flex_wrap);
		}
		if ($this->height) $res->push("height: " . $this->height);
		if ($this->min_height) $res->push("min-height: " . $this->min_height);
		return \Runtime\rs::join(";", $res);
	}
	/**
	 * Returns widget params
	 */
	static function widgetParams()
	{
		return new \Runtime\Vector(
			new \Runtime\Map([
				"type" => "param",
				"name" => "wrap",
				"label" => "Wrap",
				"component" => "Runtime.Widget.Select",
				"default" => "true",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
						new \Runtime\Map(["key" => "false", "value" => "No"]),
						new \Runtime\Map(["key" => "true", "value" => "Yes"]),
					),
				]),
			]),
			new \Runtime\Map([
				"type" => "param",
				"name" => "flex",
				"label" => "Flex",
				"component" => "Runtime.Widget.Select",
				"default" => "false",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
						new \Runtime\Map(["key" => "false", "value" => "No"]),
						new \Runtime\Map(["key" => "true", "value" => "Yes"]),
					),
				]),
			]),
			new \Runtime\Map([
				"type" => "param",
				"name" => "align_items",
				"label" => "Align items",
				"component" => "Runtime.Widget.Select",
				"default" => "true",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
						new \Runtime\Map(["key" => "center", "value" => "Center"]),
						new \Runtime\Map(["key" => "baseline", "value" => "Baseline"]),
						new \Runtime\Map(["key" => "flex-start", "value" => "Flex start"]),
						new \Runtime\Map(["key" => "flex-end", "value" => "Flex end"]),
					),
				]),
			]),
			new \Runtime\Map([
				"type" => "param",
				"name" => "justify_content",
				"label" => "Justify content",
				"component" => "Runtime.Widget.Select",
				"default" => "true",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
						new \Runtime\Map(["key" => "center", "value" => "Center"]),
						new \Runtime\Map(["key" => "space_around", "value" => "Space around"]),
						new \Runtime\Map(["key" => "space_between", "value" => "Space between"]),
						new \Runtime\Map(["key" => "left", "value" => "Left"]),
						new \Runtime\Map(["key" => "right", "value" => "Right"]),
						new \Runtime\Map(["key" => "flex-start", "value" => "Flex start"]),
						new \Runtime\Map(["key" => "flex-end", "value" => "Flex end"]),
					),
				]),
			]),
			new \Runtime\Map([
				"type" => "param",
				"name" => "flex_direction",
				"label" => "Flex direction",
				"component" => "Runtime.Widget.Select",
				"default" => "true",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
						new \Runtime\Map(["key" => "column", "value" => "Column"]),
						new \Runtime\Map(["key" => "column-reverse", "value" => "Column reverse"]),
						new \Runtime\Map(["key" => "row", "value" => "Row"]),
						new \Runtime\Map(["key" => "row-reverse", "value" => "Row reverse"]),
					),
				]),
			]),
		);
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->id = "";
		$this->wrap = "true";
		$this->flex = "false";
		$this->align_items = "";
		$this->justify_content = "";
		$this->flex_direction = "";
		$this->flex_wrap = "";
		$this->height = "";
		$this->min_height = "";
	}
	static function getComponentStyle(){ return ".section__wrap.h-c82a{max-width: var(--content-max-width);margin-left: auto;margin-right: auto;padding: 0px var(--padding-desktop);width: 100%}@media(max-width: 1000px){.section__wrap.h-c82a{padding: 0px var(--padding-tablet)}}@media(max-width: 768px){.section__wrap.h-c82a{padding: 0px var(--padding-mobile)}}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector(); }
	static function getClassName(){ return "Runtime.Widget.Section"; }
}