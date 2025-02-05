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
namespace Runtime\WordPress\Admin\Gallery;
class GalleryPageModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $form;
	public $table;
	public $top_buttons;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add form */
		$this->form = $this->addWidget("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"form","primary_key"=>\Runtime\Vector::from(["id"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormSaveStorage", \Runtime\Map::from(["api_name"=>"admin.wordpress.gallery.save"])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"api_name","label"=>"Api name","component"=>"Runtime.Widget.Input"])])]));
		/* Add table */
		$this->table = $this->addWidget("Runtime.Widget.Table.TableDialogModel", \Runtime\Map::from(["widget_name"=>"table","styles"=>\Runtime\Vector::from(["border"]),"get_title"=>function ($params)
		{
			$action = $params->get("action");
			$item = $params->get("item");
			if ($action == "add")
			{
				return "Add gallery";
			}
			if ($action == "edit")
			{
				return "Edit gallery '" . \Runtime\rtl::toStr($item->get("api_name")) . \Runtime\rtl::toStr("'");
			}
			if ($action == "delete")
			{
				return "Delete gallery '" . \Runtime\rtl::toStr($item->get("api_name")) . \Runtime\rtl::toStr("'");
			}
			return "";
		},"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Table.TableStorage", \Runtime\Map::from(["api_name"=>"admin.wordpress.gallery.search"])),"page"=>$this->layout->request_query->get("p", 1) - 1,"pagination_props"=>\Runtime\Map::from(["name"=>"p"]),"add_form"=>$this->form,"edit_form"=>$this->form,"delete_form"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"delete_form","primary_key"=>\Runtime\Vector::from(["id"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormDeleteStorage", \Runtime\Map::from(["api_name"=>"admin.wordpress.gallery.save"]))])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"row_number"]),\Runtime\Map::from(["name"=>"api_name","label"=>"Api name","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"row_buttons","model"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Table.TableRowButtonsModel", \Runtime\Map::from(["buttons"=>\Runtime\Vector::from([\Runtime\Map::from(["content"=>"Open","widget_name"=>"open_button","dest"=>"edit_button","kind"=>"before","styles"=>\Runtime\Vector::from(["default","small"]),"href"=>function ($data)
		{
			$item = $data->get("item");
			return $this->layout->url("admin:gallery:item", \Runtime\Map::from(["id"=>$item->get("id")]));
		}])])]))])])]));
		/* Add top buttons */
		$this->top_buttons = $this->addWidget("Runtime.Widget.RowButtonsModel", \Runtime\Map::from(["widget_name"=>"top_buttons","styles"=>\Runtime\Vector::from(["top_buttons"]),"buttons"=>\Runtime\Vector::from([new \Runtime\Web\ModelFactory("Runtime.Widget.Table.AddButtonModel", \Runtime\Map::from(["table"=>$this->table]))])]));
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Gallery settings");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.Gallery.GalleryPage";
		$this->form = null;
		$this->table = null;
		$this->top_buttons = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Gallery";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Gallery.GalleryPageModel";
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