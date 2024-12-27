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
class RoutePageModel extends \Runtime\Widget\Crud\CrudPageModel
{
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		$route_name = $this->layout->route->name;
		if ($route_name == "baylang:project:routes")
		{
			$this->setAction("index");
			/* Create table widget */
			$table = $this->addWidget("BayLang.Constructor.Frontend.Route.RouteTableModel", \Runtime\Map::from(["foreign_key"=>\Runtime\Map::from(["project_id"=>$this->layout->route->matches->get("project_id")])]));
			$this->render_list->addItem($table);
		}
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		/* Set title */
		if ($this->action == "index")
		{
			$this->layout->setPageTitle("Routes");
		}
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Route";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Route.RoutePageModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.CrudPageModel";
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