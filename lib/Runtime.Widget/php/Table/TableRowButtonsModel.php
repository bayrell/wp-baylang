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
namespace Runtime\Widget\Table;
class TableRowButtonsModel extends \Runtime\Widget\RowButtonsModel
{
	public $widget_name;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		$show_edit = true;
		$show_delete = true;
		if ($params->has("edit"))
		{
			$show_edit = $params->get("edit");
		}
		if ($params->has("delete"))
		{
			$show_delete = $params->get("delete");
		}
		/* Edit button */
		if ($show_edit)
		{
			$this->addButton(\Runtime\Map::from(["content"=>"Edit","widget_name"=>"edit_button","styles"=>\Runtime\Vector::from(["default","small"])]));
		}
		/* Delete button */
		if ($show_delete)
		{
			$this->addButton(\Runtime\Map::from(["content"=>"Delete","widget_name"=>"delete_button","styles"=>\Runtime\Vector::from(["danger","small"])]));
		}
		parent::initWidget($params);
	}
	/**
	 * Buttons click
	 */
	function onButtonClick($message)
	{
		$this->emit($message);
		$this->parent_widget->onRowButtonClick($message);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->widget_name = "row_buttons";
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Table";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Table.TableRowButtonsModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.RowButtonsModel";
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