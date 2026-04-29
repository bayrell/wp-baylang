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

use Runtime\Widget\Form\Form;
use Runtime\Widget\Form\FormRow;
use Runtime\Widget\Table\Table;
use Runtime\Widget\Table\TableDialog;
use Runtime\Widget\Pagination;


class TableWrap extends \Runtime\Component
{
	function renderTopButtons()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		if ($this->slot("top_buttons"))
		{
			$__v->push($this->renderSlot("top_buttons"));
		}
		
		return $__v;
	}
	function renderFilter()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		if ($this->slot("filter"))
		{
			$__v->push($this->renderSlot("filter"));
		}
		
		return $__v;
	}
	function renderDialog()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		if ($this->dialog == "true")
		{
			/* Element Runtime.Widget.Table.TableDialog */
			$__v0 = $__v->element("Runtime.Widget.Table.TableDialog", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("dialog--" . $this->model->dialog_action, $componentHash)), "model" => $this->model->dialog, "manager" => $this->model])));
			
			/* Slot save */
			$__v0->slot("save", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				/* Element Runtime.Widget.Form.Form */
				$__v->element("Runtime.Widget.Form.Form", (new \Runtime\Map(["fields" => $this->model->form_fields, "model" => $this->model->form])));
				
				return $__v;
			});
		}
		
		return $__v;
	}
	function renderTableValue($item, $field, $row_number)
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		$field_name = $field->get("name");
		if ($field_name == "row_number")
		{
			$__v->push($row_number + $this->row_offset + 1);
		}
		else if ($field->has("component"))
		{
			$component = $field->get("component");
			$props = $field->has("props") ? $field->get("props") : new \Runtime\Map();
			
			/* Element $component */
			$__v->element($component, (new \Runtime\Map(["name" => $field_name, "value" => $item->get($field_name)]))->concat($props));
		}
		else if ($field->has("model"))
		{
			$__v->push($this->renderWidget($field->get("model")));
		}
		else if ($field->has("slot"))
		{
			$__v->push($this->renderSlot($field->get("slot"), new \Runtime\Vector($item, $field, $row_number)));
		}
		else if ($field->has("value"))
		{
			$__v->push(\Runtime\rtl::apply($field->get("value"), new \Runtime\Vector($item, $field, $row_number)));
		}
		else
		{
			$__v->push($item->get($field_name));
		}
		
		return $__v;
	}
	function renderTable()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		if ($this->slot("table"))
		{
			$__v->push($this->renderSlot("table"));
		}
		else
		{
			/* Element Runtime.Widget.Table.Table */
			$__v0 = $__v->element("Runtime.Widget.Table.Table", (new \Runtime\Map(["model" => $this->model->table])));
			
			/* Slot header */
			$__v0->slot("header", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				for ($i = 0; $i < $this->model->table_fields->count(); $i++)
				{
					$field = $this->model->table_fields->get($i);
					
					/* Element th */
					$__v0 = $__v->element("th", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("th--" . $field->get("name"), $componentHash))])));
					$__v0->push($field->has("label") ? $field->get("label") : "");
				}
				
				return $__v;
			});
			
			/* Slot row */
			$__v0->slot("row", function ($item, $row_number)
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				for ($i = 0; $i < $this->model->table_fields->count(); $i++)
				{
					$field = $this->model->table_fields->get($i);
					
					/* Element td */
					$__v0 = $__v->element("td", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("td--" . $field->get("name"), $componentHash))])));
					$__v0->push($this->renderTableValue($item, $field, $row_number));
				}
				
				return $__v;
			});
			
			/* Slot pagination */
			$__v0->slot("pagination", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				/* Element tr */
				$__v0 = $__v->element("tr");
				
				/* Element td */
				$__v1 = $__v0->element("td", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("table_pagination", $componentHash)), "colspan" => $this->model->table_fields->count()])));
				
				/* Element Runtime.Widget.Pagination */
				$__v1->element("Runtime.Widget.Pagination", (new \Runtime\Map(["name" => $this->model->page_name, "page" => $this->model->table->page + 1, "pages" => $this->model->table->pages])));
				
				return $__v;
			});
		}
		
		return $__v;
	}
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("table_wrap", $componentHash))])));
		$__v0->push($this->renderTopButtons());
		$__v0->push($this->renderFilter());
		$__v0->push($this->renderTable());
		$__v0->push($this->renderDialog());
		
		return $__v;
	}
	var $dialog;
	/**
	 * Returns offset
	 */
	function row_offset()
	{
		if (!$this->model->loader) return 0;
		return $this->model->loader->page * $this->model->loader->limit;
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->dialog = "true";
	}
	static function getComponentStyle(){ return ".table_wrap.h-714c > .row_buttons{margin-bottom: calc(var(--space) * 2)}.table_pagination.h-714c{text-align: center}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Form.Form", "Runtime.Widget.Form.FormRow", "Runtime.Widget.Table.Table", "Runtime.Widget.Table.TableDialog", "Runtime.Widget.Pagination"); }
	static function getClassName(){ return "Runtime.Widget.Table.TableWrap"; }
}