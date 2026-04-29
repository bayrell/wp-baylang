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


class RowButtons extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("row_buttons", $this->getClass, $componentHash))])));
		$__v0->push($this->renderSlot("default"));
		
		return $__v;
	}
	var $style;
	function getClass()
	{
		$arr = new \Runtime\Vector();
		if ($this->class) $arr->push($this->class);
		$arr->push(\Runtime\rs::mergeStyles("row_buttons", \Runtime\rs::split(" ", $this->style)));
		return \Runtime\rs::join(" ", $arr);
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->style = "";
	}
	static function getComponentStyle(){ return ".row_buttons.h-a597{display: flex;gap: calc(var(--space) * 0.5)}.row_buttons.margin_top.h-a597, .row_buttons--margin_top.h-a597{margin-top: calc(var(--space) * 2)}.row_buttons.margin_bottom.h-a597, .row_buttons--margin_bottom.h-a597{margin-bottom: calc(var(--space) * 2)}.row_buttons--solid.h-a597{gap: 0}.row_buttons--solid.h-a597 .button, .row_buttons--solid.h-a597 .button:focus{border-right-width: 0;border-top-left-radius: 0;border-bottom-left-radius: 0;border-top-right-radius: 0;border-bottom-right-radius: 0}.row_buttons--solid.h-a597 .button:active{outline: none}.row_buttons--solid.h-a597 .button:first-child{border-top-left-radius: var(--border-radius);border-bottom-left-radius: var(--border-radius)}.row_buttons--solid.h-a597 .button:last-child{border-right-width: var(--border-width);border-top-right-radius: var(--border-radius);border-bottom-right-radius: var(--border-radius)}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector(); }
	static function getClassName(){ return "Runtime.Widget.RowButtons"; }
}