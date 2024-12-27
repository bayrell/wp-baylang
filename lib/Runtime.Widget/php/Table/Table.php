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
namespace Runtime\Widget\Table;
class Table extends \Runtime\Web\Component
{
	function renderHeader()
	{
		$__v = new \Runtime\Vector();
		$model = $this->model;
		$fields = $model->fields;
		
		if ($fields)
		{
			/* Element 'tr' */
			$__v0 = new \Runtime\Vector();
			
			for ($i = 0; $i < $fields->count(); $i++)
			{
				$field = \Runtime\rtl::attr($fields, $i);
				$field_name = $field->get("name");
				
				/* Element 'th' */
				$__v1 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v1, $this->_escape($field->get("label", "")));
				
				/* Element 'th' */
				$this->_e($__v0, "th", ["class" => $this->_class_name(["widget_table__th widget_table__th--" . \Runtime\rtl::toStr($field_name)])], $__v1);
			}
			
			/* Element 'tr' */
			$this->_e($__v, "tr", ["class" => $this->_class_name(["widget_table__row_header"])], $__v0);
		}
		
		return $__v;
	}
	function renderField($item, $row_number, $field)
	{
		$__v = new \Runtime\Vector();
		$model = $this->model;
		$storage = $model->storage;
		$field_name = $field->get("name");
		$field_calculate = $field->get("calculate", null);
		$field_component = $field->get("component", null);
		$field_model = $field->get("model", null);
		$value = "";
		$data = \Runtime\Map::from(["item"=>$item,"field_name"=>$field_name,"row_number"=>$row_number,"table"=>$this->model]);
		
		if ($field_calculate)
		{
			$value = \Runtime\rtl::apply($field_calculate, \Runtime\Vector::from([$data]));
		}
		else
		{
			$value = $this->model->getItemValue($item, $field_name);
		}
		$_ = $data->set("value", $value);
		
		/* Element 'td' */
		$__v0 = new \Runtime\Vector();
		
		if ($field_name == "row_number")
		{
			/* Text */
			$this->_t($__v0, $this->_escape($this->model->limit * $this->model->page + $row_number + 1));
		}
		else if ($field_component != null)
		{
			$props = $field->get("props", \Runtime\Map::from([]));
			
			/* Component '{field_component}' */
			$this->_c($__v0, $field_component, $this->_merge_attrs(["model" => $this->_model($field_model),"value" => $value,"data" => $data], $props));
		}
		else if ($field_model != null)
		{
			/* Text */
			$this->_t($__v0, $this->renderWidget($field_model, \Runtime\Map::from(["value"=>$value,"data"=>$data])));
		}
		else
		{
			/* Text */
			$this->_t($__v0, $this->_escape($value));
		}
		
		/* Element 'td' */
		$this->_e($__v, "td", ["class" => $this->_class_name(["widget_table__td widget_table__td--" . \Runtime\rtl::toStr($field_name)])], $__v0);
		
		return $__v;
	}
	function renderRow($item, $row_number)
	{
		$__v = new \Runtime\Vector();
		$model = $this->model;
		$fields = $model->fields;
		
		/* Element 'tr' */
		$__v0 = new \Runtime\Vector();
		
		if ($fields)
		{
			for ($i = 0; $i < $fields->count(); $i++)
			{
				$field = \Runtime\rtl::attr($fields, $i);
				
				/* Text */
				$this->_t($__v0, $this->renderField($item, $row_number, $field));
			}
		}
		
		/* Element 'tr' */
		$this->_e($__v, "tr", ["data-row" => $row_number,"class" => $this->_class_name(["widget_table__tr", (($this->isRowSelected($row_number)) ? ("selected") : (""))])], $__v0);
		
		return $__v;
	}
	function renderPagination()
	{
		$__v = new \Runtime\Vector();
		$fields = $this->model->fields;
		
		if ($fields && $this->model->pages > 1)
		{
			$props = $this->model->pagination_props;
			$pagination_class_name = $this->model->pagination_class_name;
			
			/* Element 'tr' */
			$__v0 = new \Runtime\Vector();
			
			/* Element 'td' */
			$__v1 = new \Runtime\Vector();
			
			/* Component '{pagination_class_name}' */
			$this->_c($__v1, $pagination_class_name, $this->_merge_attrs(["page" => $this->model->page + 1,"pages" => $this->model->pages], $props));
			
			/* Element 'td' */
			$this->_e($__v0, "td", ["colspan" => $fields->count()], $__v1);
			
			/* Element 'tr' */
			$this->_e($__v, "tr", [], $__v0);
		}
		
		return $__v;
	}
	function renderBody()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model)
		{
			$items = $this->model->getItems();
			
			if ($items)
			{
				for ($i = 0; $i < $items->count(); $i++)
				{
					$item = $items->get($i);
					
					/* Text */
					$this->_t($__v, $this->renderRow($item, $i));
				}
			}
			
			/* Text */
			$this->_t($__v, $this->renderPagination());
		}
		
		return $__v;
	}
	function renderTable()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'table' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'tbody' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderHeader());
		
		/* Text */
		$this->_t($__v1, $this->renderBody());
		
		/* Element 'tbody' */
		$this->_e($__v0, "tbody", [], $__v1);
		
		/* Element 'table' */
		$this->_e($__v, "table", ["class" => $this->_class_name(["widget_table__table"])], $__v0);
		
		return $__v;
	}
	function renderWidgets()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderWidget($this->model->render_list));
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderTable());
		
		/* Text */
		$this->_t($__v0, $this->renderWidgets());
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_table", $this->class, static::getStyles("widget_table", $this->model->styles)])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns true if row selected
 */
	function isRowSelected($row_number)
	{
		return $this->model->row_selected == $row_number;
	}
	/**
 * OnRowClick
 */
	function onRowClick($row_number)
	{
		$this->model->onRowClick($row_number);
	}
	/**
 * On change page
 */
	function onChangePage($page)
	{
		/*this.model.onChangePage(page);*/
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Pagination"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_table__table.h-6434{width: auto;border-collapse: collapse;vertical-align: top;background-color: var(--widget-color-table-background)}.widget_table__th.h-6434{text-align: center}.widget_table__th.h-6434,.widget_table__td.h-6434{vertical-align: middle;padding: var(--widget-space)}.widget_table__tr.selected.h-6434 td{background-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.widget_table--border.h-6434 .widget_table__table{border-color: var(--widget-color-border);border-width: var(--widget-border-width);border-style: solid}.widget_table--border.h-6434 .widget_table__th,.widget_table--border.h-6434 .widget_table__td{border-bottom-color: var(--widget-color-border);border-bottom-width: var(--widget-border-width);border-bottom-style: solid}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Table";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Table.Table";
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