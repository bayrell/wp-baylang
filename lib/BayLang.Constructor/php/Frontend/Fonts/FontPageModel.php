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
namespace BayLang\Constructor\Frontend\Fonts;
class FontPageModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $project_id;
	public $table;
	public $top_buttons;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Set route matches */
		$this->project_id = $this->layout->route->matches->get("project_id");
		/* Add table */
		$this->table = $this->addWidget("Runtime.Widget.Table.TableDialogModel", \Runtime\Map::from(["widget_name"=>"table","get_title"=>function ($params)
		{
			$action = $params->get("action");
			$item = $params->get("item");
			if ($action == "add")
			{
				return "Add font";
			}
			if ($action == "edit")
			{
				return "Edit font " . \Runtime\rtl::toStr($item->get("name"));
			}
			if ($action == "delete")
			{
				return "Delete font " . \Runtime\rtl::toStr($item->get("name"));
			}
			return "";
		},"styles"=>\Runtime\Vector::from(["border"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Table.TableStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.fonts.search"])),"add_form"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"add_form","primary_key"=>\Runtime\Vector::from(["name"]),"foreign_key"=>\Runtime\Map::from(["project_id"=>$this->project_id]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormSubmitStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.fonts.save"])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Input"])])])),"delete_form"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"delete_form","primary_key"=>\Runtime\Vector::from(["name"]),"foreign_key"=>\Runtime\Map::from(["project_id"=>$this->project_id]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormDeleteStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.fonts.save"]))])),"foreign_key"=>\Runtime\Map::from(["project_id"=>$this->project_id]),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"row_number"]),\Runtime\Map::from(["name"=>"name","label"=>"Font name","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"row_buttons","model"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Table.TableRowButtonsModel", \Runtime\Map::from(["edit"=>false,"buttons"=>\Runtime\Vector::from([\Runtime\Map::from(["widget_name"=>"edit_button","dest"=>"delete_button","kind"=>"before","href"=>function ($data)
		{
			$item = $data->get("item");
			return $this->layout->url("baylang:project:fonts:edit", \Runtime\Map::from(["project_id"=>$this->project_id,"name"=>$item->get("name")]));
		},"content"=>"Edit","styles"=>\Runtime\Vector::from(["default","small"])])])]))])])]));
		/* Add top buttons */
		$this->top_buttons = $this->addWidget("Runtime.Widget.RowButtonsModel", \Runtime\Map::from(["widget_name"=>"top_buttons","buttons"=>\Runtime\Vector::from([new \Runtime\Web\ModelFactory("Runtime.Widget.Table.AddButtonModel", \Runtime\Map::from(["table"=>$this->table]))])]));
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Fonts");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Fonts.FontPage";
		$this->project_id = "";
		$this->table = null;
		$this->top_buttons = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Fonts";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Fonts.FontPageModel";
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