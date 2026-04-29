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
namespace Runtime\WordPress\Admin\FormData;

use Runtime\DateTime;
use Runtime\Widget\Button;
use Runtime\Widget\Form\FormRow;
use Runtime\Widget\Dialog\Dialog;
use Runtime\Widget\Dialog\DialogModel;
use Runtime\Widget\Table\Table;


class FormDataPage extends \Runtime\Component
{
	function renderData($data)
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		$keys = \Runtime\rtl::list($data->keys());
		for ($i = 0; $i < $keys->count(); $i++)
		{
			$key = $keys->get($i);
			
			/* Element div */
			$__v0 = $__v->element("div");
			$__v0->push($key . ": " . $data->get($key));
		}
		
		return $__v;
	}
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("form_data_page", $componentHash))])));
		
		/* Element Runtime.Widget.Table.Table */
		$__v1 = $__v0->element("Runtime.Widget.Table.Table", (new \Runtime\Map(["model" => $this->model->table])));
		
		/* Slot header */
		$__v1->slot("header", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element th */
			$__v->element("th");
			
			/* Element th */
			$__v0 = $__v->element("th");
			$__v0->push("Title");
			
			/* Element th */
			$__v1 = $__v->element("th");
			$__v1->push("Form name");
			
			/* Element th */
			$__v2 = $__v->element("th");
			$__v2->push("Data");
			
			/* Element th */
			$__v3 = $__v->element("th");
			$__v3->push("Date");
			
			/* Element th */
			$__v->element("th");
			
			return $__v;
		});
		
		/* Slot row */
		$__v1->slot("row", function ($item, $row_number)
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element td */
			$__v0 = $__v->element("td");
			$__v0->push($row_number + 1);
			
			/* Element td */
			$__v1 = $__v->element("td");
			$__v1->push($item->get("form_title"));
			
			/* Element td */
			$__v2 = $__v->element("td");
			$__v2->push($item->get("form_name"));
			
			/* Element td */
			$__v3 = $__v->element("td");
			$__v3->push($this->renderData($item->get("data")));
			
			/* Element td */
			$__v4 = $__v->element("td");
			
			$date = $item->get("gmtime_add");
			$__v4->push($date ? $date->normalize()->format() : "");
			
			/* Element td */
			$__v5 = $__v->element("td");
			
			/* Element Runtime.Widget.Button */
			$__v6 = $__v5->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("button--default button--small", $componentHash))])));
			
			/* Content */
			$__v6->slot("default", function () use (&$row_number)
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				$__v->push("View");
				return $__v;
			});
			
			return $__v;
		});
		
		/* Element Runtime.Widget.Dialog.Dialog */
		$__v2 = $__v0->element("Runtime.Widget.Dialog.Dialog", (new \Runtime\Map(["model" => $this->dialog])));
		
		/* Slot title */
		$__v2->slot("title", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			$__v->push("Show item");
			return $__v;
		});
		
		/* Slot content */
		$__v2->slot("content", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			if ($this->current_item)
			{
				/* Element Runtime.Widget.Form.FormRow */
				$__v0 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Title"])));
				
				/* Content */
				$__v0->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->current_item->get("form_title"));
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v1 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Name"])));
				
				/* Content */
				$__v1->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->current_item->get("form_name"));
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v2 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Date"])));
				
				/* Content */
				$__v2->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$date = $this->current_item->get("gmtime_add");
					$__v->push($date ? $date->normalize()->format() : "");
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v3 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Data"])));
				
				/* Content */
				$__v3->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->renderData($this->current_item->get("data")));
					
					return $__v;
				});
			}
			
			return $__v;
		});
		
		/* Slot footer */
		$__v2->slot("footer", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element Runtime.Widget.Button */
			$__v0 = $__v->element("Runtime.Widget.Button");
			
			/* Content */
			$__v0->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				$__v->push("Close");
				return $__v;
			});
			
			return $__v;
		});
		
		return $__v;
	}
	var $dialog;
	var $current_item;
	function showItem($index)
	{
		$this->current_item = $this->model->table->items->get($index);
		$this->dialog->show();
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->dialog = new \Runtime\Widget\Dialog\DialogModel();
		$this->current_item = null;
	}
	static function getComponentStyle(){ return ""; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button", "Runtime.Widget.Form.FormRow", "Runtime.Widget.Dialog.Dialog", "Runtime.Widget.Table.Table"); }
	static function getClassName(){ return "Runtime.WordPress.Admin.FormData.FormDataPage"; }
}