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
class RemoveItemDialogModel extends \Runtime\Widget\Dialog\ConfirmDialogModel
{
	public $component;
	public $widget_name;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Remove button */
		$confirm_button = $this->buttons->getWidget("confirm_button");
		$confirm_button->content = "Remove";
		$confirm_button->styles->add("danger");
		$confirm_button->styles->removeItem("primary");
	}
	/**
	 * On value change
	 */
	function onValueChange($message)
	{
		$this->remove_value = $message->value;
	}
	/**
	 * Confirm button click
	 */
	function onConfirmButtonClick($message)
	{
		$path = $this->parent_widget->selected->path->slice();
		if ($path)
		{
			$this->parent_widget->removeWidget($path, true);
		}
		$this->hide();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialog";
		$this->widget_name = "remove_item_dialog";
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Dialog.ConfirmDialogModel";
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