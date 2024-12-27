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
namespace BayLang\Constructor\Frontend\Components;
class SortableParams extends \Runtime\Widget\SortableList
{
	public $fields;
	function renderValue($pos, $item)
	{
		$__v = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->fields->count(); $i++)
		{
			$field = $this->fields->get($i);
			$field_name = $field->get("name");
			$field_component = $field->get("component");
			$field_props = $field->get("props");
			
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
			
			/* Component '{field_component}' */
			$this->_c($__v1, $field_component, $this->_merge_attrs(["name" => $field_name,"value" => $item->get($field_name)], $field_props));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__item_value_item"])], $__v1);
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_sortable_list__item_value_row"])], $__v0);
		}
		
		return $__v;
	}
	/**
 * Add item click
 */
	function onAddItemClick()
	{
		$value = \Runtime\Map::from([]);
		for ($i = 0; $i < $this->fields->count(); $i++)
		{
			$field = $this->fields->get($i);
			$field_name = $field->get("name");
			$field_default = $field->get("default", "");
			$value->set($field_name, $field_default);
		}
		$this->value->push($value);
		$this->onValueChange();
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.SortableList","Runtime.Widget.Input","Runtime.Widget.Select","BayLang.Constructor.Frontend.Components.SelectImageButton"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_sortable_list__item_value.h-d333{padding: 5px}.widget_sortable_list__item_value_row.h-d333{display: flex;align-items: center}.widget_sortable_list__item_value_label.h-d333{width: 40px}.widget_sortable_list__item_value_item.h-d333{flex: 1}");
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
		return "BayLang.Constructor.Frontend.Components";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Components.SortableParams";
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