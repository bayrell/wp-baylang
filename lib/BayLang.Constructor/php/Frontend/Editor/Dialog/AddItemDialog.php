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
namespace BayLang\Constructor\Frontend\Editor\Dialog;
class AddItemDialog extends \Runtime\Widget\Dialog\Dialog
{
	function renderContent()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "Groups");
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["list_title"])], $__v2);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->model->current_groups->count(); $i++)
		{
			$group = $this->model->current_groups->get($i);
			
			/* Element 'div' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, $this->_escape($group->get("label")));
			
			/* Element 'div' */
			$this->_e($__v2, "div", ["class" => $this->_class_name(["list_item", (($this->model->selected_group_name == $group->get("name")) ? ("selected") : (""))])], $__v3);
		}
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["list_items"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["groups"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "Select component");
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["list_title"])], $__v2);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		if ($this->model->current_widgets)
		{
			for ($i = 0; $i < $this->model->current_widgets->count(); $i++)
			{
				$widget = $this->model->current_widgets->get($i);
				
				if ($this->model->selected_group_name == $widget->getGroupName())
				{
					/* Element 'div' */
					$__v3 = new \Runtime\Vector();
					
					/* Text */
					$this->_t($__v3, $this->_escape($widget->getWidgetName()));
					
					/* Element 'div' */
					$this->_e($__v2, "div", ["class" => $this->_class_name(["list_item"])], $__v3);
				}
			}
		}
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["list_items"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widgets"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_dialog__content"])], $__v0);
		
		return $__v;
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Dialog.Dialog","Runtime.Widget.Input","Runtime.Widget.Select"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_dialog__content.h-864d{display: flex;min-height: 250px}.list_title.h-864d{margin-bottom: 10px}.list_item.h-864d{cursor: pointer;padding: 10px}.list_item.h-864d:hover{background-color: var(--widget-color-hover)}.list_item.selected.h-864d{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.widget_dialog__content.h-864d .groups{width: 30%;padding-right: 10px}.widget_dialog__content.h-864d .groups .list_items.h-864d{border: var(--widget-border-width) var(--widget-color-border) solid;border-radius: 4px}.widget_dialog__content.h-864d .groups .list_item.h-864d{border-bottom: var(--widget-border-width) var(--widget-color-border) solid}.widget_dialog__content.h-864d .groups .list_item.h-864d:last-child{border-bottom-width: 0px}.widget_dialog__content.h-864d .widgets{width: 70%}.widget_dialog__content.h-864d .widgets .list_items.h-864d{display: flex;align-items: stretch;justify-content: space-between;flex-wrap: wrap;gap: 15px}.widget_dialog__content.h-864d .widgets .list_item.h-864d{border: var(--widget-border-width) var(--widget-color-border) solid;border-radius: 4px;text-align: center;flex: 1 1 30%}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Dialog.Dialog";
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