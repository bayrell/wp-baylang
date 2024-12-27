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
namespace BayLang\Constructor\Frontend\Project;
class ProjectListModel extends \Runtime\Web\BasePageModel
{
	public $component;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add table */
		$this->table = $this->addWidget("Runtime.Widget.Table.TableDialogModel", \Runtime\Map::from(["widget_name"=>"table","get_title"=>function ($params)
		{
			$action = $params->get("action");
			$item = $params->get("item");
			if ($action == "add")
			{
				return "Add item";
			}
			if ($action == "edit")
			{
				return "Edit item " . \Runtime\rtl::toStr($item->get("id"));
			}
			if ($action == "delete")
			{
				return "Delete item " . \Runtime\rtl::toStr($item->get("id"));
			}
			return "";
		},"styles"=>\Runtime\Vector::from(["border"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Table.TableStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.project::search"])),"add_form"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"add_form","primary_key"=>\Runtime\Vector::from(["id"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormSubmitStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.project::save"])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"id","label"=>"ID","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"template","label"=>"Template","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"web","value"=>"Web project"])])])]),\Runtime\Map::from(["name"=>"description","label"=>"Description","component"=>"Runtime.Widget.TextArea"])])])),"edit_form"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"edit_form","primary_key"=>\Runtime\Vector::from(["id"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormSubmitStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.project::save"])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"id","label"=>"ID","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"description","label"=>"Description","component"=>"Runtime.Widget.TextArea"])])])),"delete_form"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"delete_form","primary_key"=>\Runtime\Vector::from(["id"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormDeleteStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.project::save"]))])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"row_number"]),\Runtime\Map::from(["name"=>"id","label"=>"ID","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"row_buttons","model"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Table.TableRowButtonsModel", \Runtime\Map::from(["buttons"=>\Runtime\Vector::from([\Runtime\Map::from(["href"=>function ($data)
		{
			$item = $data->get("item");
			return $this->layout->url("baylang:project:settings", \Runtime\Map::from(["project_id"=>$item->get("id")]));
		},"kind"=>"before","dest"=>"edit_button","content"=>"Open","widget_name"=>"open","styles"=>\Runtime\Vector::from(["default","small"])])])]))])])]));
		/* Add top buttons */
		$this->top_buttons = $this->addWidget("Runtime.Widget.RowButtonsModel", \Runtime\Map::from(["widget_name"=>"top_buttons","buttons"=>\Runtime\Vector::from([new \Runtime\Web\ModelFactory("Runtime.Widget.Table.AddButtonModel", \Runtime\Map::from(["table"=>$this->table]))])]));
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Projects");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Project.ProjectList";
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Project";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Project.ProjectListModel";
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