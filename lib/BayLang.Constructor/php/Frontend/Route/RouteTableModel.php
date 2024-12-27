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
namespace BayLang\Constructor\Frontend\Route;
class RouteTableModel extends \Runtime\Widget\Table\TableDialogModel
{
	/**
	 * Create data storage
	 */
	function createDataStorage()
	{
		return new \Runtime\Widget\Crud\CrudApiStorage(\Runtime\Map::from(["layout"=>$this->layout,"class_name"=>"admin.constructor.route","primary_keys"=>\Runtime\Vector::from(["id"])]));
	}
	/**
	 * Create form
	 */
	function createForm()
	{
		return $this->addWidget("BayLang.Constructor.Frontend.Route.RouteFormModel");
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Row number */
		$this->addField(\Runtime\Map::from(["name"=>"row_number"]));
		/* Field name */
		$this->addField(\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Label"]));
		/* Field url */
		$this->addField(\Runtime\Map::from(["name"=>"url","label"=>"URL","component"=>"Runtime.Widget.Label"]));
		/* Field url */
		$this->addField(\Runtime\Map::from(["name"=>"model","label"=>"Model","component"=>"Runtime.Widget.Label"]));
		/* Field row buttons */
		$this->addField(\Runtime\Map::from(["name"=>"row_buttons","model"=>$this->row_buttons]));
		/* Open button */
		$open_button = $this->row_buttons->addWidget("Runtime.Widget.ButtonModel", \Runtime\Map::from(["widget_name"=>"open_button","content"=>"Open","href"=>function ($data)
		{
			$row_number = $data->get("row_number");
			$item = $this->getItemByRowNumber($row_number);
			$url = $this->layout->url("baylang:project:open", \Runtime\Map::from(["project_id"=>$this->storage->foreign_value]));
			return $url . \Runtime\rtl::toStr($item->get("url"));
		}]), "edit_button", "before");
		$this->row_buttons->removeItemByName("edit_button");
		$this->row_buttons->removeItemByName("delete_button");
		/* Add style */
		$this->styles->add("border");
		$this->row_buttons->styles->add("no-gap");
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Route";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Route.RouteTableModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Table.TableDialogModel";
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