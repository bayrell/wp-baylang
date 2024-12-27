<?php
/*!
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
class AddItemDialogModel extends \Runtime\Widget\Dialog\DialogModel
{
	public $component;
	public $widget_name;
	public $kind;
	public $width;
	public $selected_group_name;
	public $current_groups;
	public $current_widgets;
	public $selected_widget;
	public $selected_widget_path;
	public $selected_widget_info;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Setup close buttons */
		$this->buttons->addButton(\Runtime\Map::from(["content"=>"Cancel","widget_name"=>"cancel_button","styles"=>\Runtime\Vector::from(["gray"]),"events"=>\Runtime\Map::from(["click"=>new \Runtime\Callback($this, "onCloseButtonClick")])]));
	}
	/**
	 * Select item
	 */
	function selectItem($widget_settings)
	{
		$editor = $this->parent_widget->getFrameEditor();
		/* Create widget name */
		$default_widget_name = $widget_settings->getSelectorName();
		$widget_name_value = $this->parent_widget->attribute_processor->createWidgetName($default_widget_name);
		/* Create widget */
		$op_code = $this->parent_widget->component_processor->createWidget($widget_settings, $widget_name_value);
		$this->parent_widget->addOpCode($op_code, $this->selected_widget_path, $this->kind);
		$this->hide();
	}
	/**
	 * Add close button click
	 */
	function onCloseButtonClick($message)
	{
		$this->hide();
	}
	/**
	 * Returns widget label
	 */
	function getTagWidgetInfo($op_code)
	{
		$class_name_attr = $op_code->attrs->findItem(\Runtime\lib::equalAttr("key", "class"));
		if (!$class_name_attr)
		{
			return \Runtime\Map::from(["label"=>$op_code->tag_name,"tag_name"=>$op_code->tag_name,"class_name"=>"","widget_name"=>""]);
		}
		$class_name = $class_name_attr->value->value;
		$attrs = \Runtime\rs::split(" ", $class_name);
		$attrs = $attrs->filter(\Runtime\lib::equalNot(""));
		return \Runtime\Map::from(["label"=>$op_code->tag_name . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($attrs->first()),"tag_name"=>$op_code->tag_name,"class_name"=>$class_name,"widget_name"=>$attrs->first()]);
	}
	/**
	 * Update frame widgets
	 */
	function updateFrameWidgets()
	{
		/* Update selected widget */
		$selected_widget = $this->selected_widget;
		if ($this->kind == "before" || $this->kind == "after")
		{
			$selected_widget_path = $this->selected_widget_path->slice(0, -1);
			$selected_widget = $this->parent_widget->widget_manager->getWidget($selected_widget_path);
		}
		/* Setup widget */
		$selected_widget->setup();
		/* Get editor provider */
		$editor = $this->parent_widget->getFrameEditor();
		/* Update widgets */
		$widgets = $editor->getWidgets();
		$this->current_widgets = $widgets->filter(function ($widget_settings) use (&$selected_widget)
		{
			if (!$widget_settings->getComponentName())
			{
				return false;
			}
			if (!$selected_widget->canInsert($widget_settings))
			{
				return false;
			}
			return true;
		});
		/* Get groups used */
		$groups = \Runtime\Map::from([]);
		$this->selected_group_name = "";
		for ($i = 0; $i < $this->current_widgets->count(); $i++)
		{
			$group_name = $this->current_widgets->get($i)->getGroupName();
			$groups->set($group_name, 1);
			if ($this->selected_group_name == "")
			{
				$this->selected_group_name = $group_name;
			}
		}
		/* Update groups */
		$this->current_groups = \Runtime\Vector::from([]);
		$group_settings = $editor->getGroups();
		for ($i = 0; $i < $group_settings->count(); $i++)
		{
			$group = $group_settings->get($i);
			$group_name = $group->get("name");
			if ($groups->has($group_name))
			{
				$this->current_groups->push($group);
			}
		}
	}
	/**
	 * Show dialog
	 */
	function show($selected_path=null, $kind="after")
	{
		$this->step = 1;
		$this->kind = $kind;
		$this->title = "Add item";
		/* If selected_path is main widget */
		if (!$selected_path)
		{
			$this->kind = "last";
		}
		/* Setup selected widget */
		$this->selected_widget_path = ($selected_path) ? ($selected_path->slice()) : (\Runtime\Vector::from([]));
		$this->selected_widget = $this->parent_widget->widget_manager->getWidget($this->selected_widget_path);
		/* Update widgets list */
		$this->updateFrameWidgets();
		parent::show();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog";
		$this->widget_name = "add_item_dialog";
		$this->kind = "after";
		$this->width = "700px";
		$this->selected_group_name = "basic";
		$this->current_groups = \Runtime\Vector::from([]);
		$this->current_widgets = \Runtime\Vector::from([]);
		$this->selected_widget = null;
		$this->selected_widget_path = null;
		$this->selected_widget_info = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Dialog.DialogModel";
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