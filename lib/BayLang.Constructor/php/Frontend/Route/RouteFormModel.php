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
class RouteFormModel extends \Runtime\Widget\Form\FormModel
{
	/**
	 * Create data storage
	 */
	function createDataStorage()
	{
		return new \Runtime\Widget\Crud\CrudApiStorage(\Runtime\Map::from(["layout"=>$this->layout,"class_name"=>"admin.constructor.route","primary_keys"=>\Runtime\Vector::from(["id"]),"save_fields"=>\Runtime\Vector::from(["id","name","description"])]));
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Field name */
		$this->addField(\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Input"]));
		/* Field url */
		$this->addField(\Runtime\Map::from(["name"=>"uri","label"=>"URL","component"=>"Runtime.Widget.Input"]));
		/* Field url */
		$this->addField(\Runtime\Map::from(["name"=>"model","label"=>"Model","component"=>"Runtime.Widget.Input"]));
	}
	/**
	 * Get page title
	 */
	function getPageTitle($action="")
	{
		if ($action == "add")
		{
			return "Add route";
		}
		if ($action == "edit")
		{
			return "Edit route " . \Runtime\rtl::toStr($this->storage->item->get("name"));
		}
		if ($action == "delete")
		{
			return "Delete route " . \Runtime\rtl::toStr($this->storage->item->get("name"));
		}
		return "";
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Route";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Route.RouteFormModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Form.FormModel";
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