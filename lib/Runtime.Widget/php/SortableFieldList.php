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
class SortableFieldList extends \Runtime\Widget\SortableList
{
	public $fields;
	function renderValueItem($field, $pos, $item)
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->_escape($field->get("label")));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__item_value_label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		if ($item)
		{
			$field_name = $field->get("name");
			$field_component = $field->get("component");
			$field_props = $field->get("props");
			
			/* Component '{field_component}' */
			$this->_c($__v1, $field_component, $this->_merge_attrs(["name" => $field_name,"value" => $item->get($field_name)], $field_props));
		}
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__item_value_item"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_sortable_list__item_value_row"])], $__v0);
		
		return $__v;
	}
	function renderValue($pos, $item)
	{
		$__v = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->fields->count(); $i++)
		{
			$field = $this->fields->get($i);
			
			/* Text */
			$this->_t($__v, $this->renderValueItem($field, $pos, $item));
		}
		
		return $__v;
	}
	function renderItem($pos)
	{
		$__v = new \Runtime\Vector();
		$item = $this->getItems()->get($pos);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Raw */
		$this->_t($__v2, new \Runtime\RawString("&#9776;"));
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_sortable_list__item_drag"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__item_element widget_sortable_list__item_element--drag"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderValue($pos, $item));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__item_value"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Raw */
		$this->_t($__v2, new \Runtime\RawString("&#10005;"));
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_sortable_list__item_remove"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__item_element widget_sortable_list__item_element--remove"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["data-pos" => $pos,"class" => $this->_class_name(["widget_sortable_list__item"])], $__v0);
		
		return $__v;
	}
	/**
 * Create new item
 */
	function createItem()
	{
		return \Runtime\Map::from([]);
	}
	/**
 * Returns drag & drop element
 */
	function getDragElement($elem)
	{
		if ($elem->classList->contains("widget_sortable_list__item"))
		{
			return $elem;
		}
		if ($elem->parentElement->classList->contains("widget_sortable_list__item"))
		{
			return $elem->parentElement;
		}
		if ($elem->parentElement->parentElement->classList->contains("widget_sortable_list__item"))
		{
			return $elem->parentElement->parentElement;
		}
		return null;
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.SortableList","Runtime.Widget.Input","Runtime.Widget.Select"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_sortable_list__item.h-a549{align-items: stretch;margin: 10px 0px}.widget_sortable_list__item_element.h-a549{display: flex}.widget_sortable_list__item_element--drag.h-a549{align-items: center}.widget_sortable_list__item_element--remove.h-a549{align-items: start}.widget_sortable_list__item_value.h-a549{padding: 5px}.widget_sortable_list__item_value.h-a549 .widget_input.h-f2df,.widget_sortable_list__item_value.h-a549 .widget_select.h-d72d{border-bottom: 1px var(--widget-color-border) solid;box-shadow: none;outline: none}.widget_sortable_list__item_value_row.h-a549{display: flex;align-items: center;margin-bottom: 1px}.widget_sortable_list__item_value_label.h-a549{width: 80px}.widget_sortable_list__item_value_item.h-a549{flex: 1}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->fields = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.SortableFieldList";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.SortableList";
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