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


class ListData extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("list_data", $this->class, $componentHash))])));
		
		if ($this->items)
		{
			for ($i = 0; $i < $this->items->count(); $i++)
			{
				$item = $this->items->get($i);
				
				/* Element div */
				$__v1 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("list_item", $componentHash))])));
				
				/* Element div */
				$__v2 = $__v1->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("list_label", $componentHash))])));
				$__v2->push($item->get("label"));
				
				/* Element div */
				$__v3 = $__v1->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("list_value", $componentHash))])));
				$__v3->push($item->get("value"));
			}
		}
		
		return $__v;
	}
	var $items;
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->items = null;
	}
	static function getComponentStyle(){ return ".list_data.h-85fb // Base styles\n\t.list_item{display: flex;padding: 8px 0;border-bottom: 1px solid #eee}.list_data.h-85fb // Base styles\n\t.list_item:last-child{border-bottom: none}.list_data.h-85fb // Base styles\n\t.list_item .list_label{font-weight: 600;min-width: 150px;color: #666;flex-shrink: 0}.list_data.h-85fb // Base styles\n\t.list_item .list_value{color: #333;flex-grow: 1;word-break: break-word}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector(); }
	static function getClassName(){ return "Runtime.Widget.ListData"; }
}