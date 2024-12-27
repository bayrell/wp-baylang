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
namespace BayLang\Constructor\Frontend\Module;
class ModuleListModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $project_id;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Project id */
		$this->project_id = $this->layout->route->matches->get("project_id");
		/* Add table */
		$this->table = $this->addWidget("Runtime.Widget.Table.TableModel", \Runtime\Map::from(["widget_name"=>"table","get_title"=>function ($params)
		{
			$action = $params->get("action");
			$item = $params->get("item");
			if ($action == "add")
			{
				return "Add module";
			}
			if ($action == "edit")
			{
				return "Edit module " . \Runtime\rtl::toStr($item->get("id"));
			}
			if ($action == "delete")
			{
				return "Delete module " . \Runtime\rtl::toStr($item->get("id"));
			}
			return "";
		},"styles"=>\Runtime\Vector::from(["border"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Table.TableStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.module::search"])),"foreign_key"=>\Runtime\Map::from(["project_id"=>$this->project_id]),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"row_number"]),\Runtime\Map::from(["name"=>"id","label"=>"ID","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"row_buttons","model"=>new \Runtime\Web\ModelFactory("Runtime.Widget.RowButtonsModel", \Runtime\Map::from(["buttons"=>\Runtime\Vector::from([\Runtime\Map::from(["widget_name"=>"open","content"=>"Open","href"=>function ($data)
		{
			$item = $data->get("item");
			return $this->layout->url("baylang:project:widgets", \Runtime\Map::from(["project_id"=>$this->project_id,"module_id"=>$item->get("id")]));
		},"styles"=>\Runtime\Vector::from(["default","small"])])])]))])])]));
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Modules");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Module.ModuleList";
		$this->project_id = "";
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Module";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Module.ModuleListModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BasePageModel";
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