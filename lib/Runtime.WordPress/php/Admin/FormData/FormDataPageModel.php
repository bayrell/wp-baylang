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
namespace Runtime\WordPress\Admin\FormData;
class FormDataPageModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $form;
	public $table;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Calculate data */
		$calculateData = function ($data)
		{
			$item = $data->get("item");
			if ($item->get("data") == null)
			{
				return "";
			}
			$items = $item->get("data")->transition(function ($value, $key)
			{
				return $key . \Runtime\rtl::toStr(": ") . \Runtime\rtl::toStr($value);
			});
			if ($data->has("table"))
			{
				return $items;
			}
			return \Runtime\rs::join("\n", $items);
		};
		/* Add form */
		$this->form = $this->addWidget("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"form","primary_key"=>\Runtime\Vector::from(["id"]),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"form_title","label"=>"Title","component"=>"Runtime.Widget.Input","props"=>\Runtime\Map::from(["readonly"=>true])]),\Runtime\Map::from(["name"=>"data","label"=>"Data","component"=>"Runtime.Widget.TextArea","calculate"=>$calculateData,"props"=>\Runtime\Map::from(["readonly"=>true])]),\Runtime\Map::from(["name"=>"gmtime_add","label"=>"Data","component"=>"Runtime.Widget.Input","calculate"=>\Runtime\lib::pipe()->add(\Runtime\lib::attr(\Runtime\Vector::from(["item","gmtime_add"])))->add(\Runtime\lib::normalizeDateTime()),"props"=>\Runtime\Map::from(["readonly"=>true])])])]));
		/* Add table */
		$this->table = $this->addWidget("Runtime.Widget.Table.TableDialogModel", \Runtime\Map::from(["widget_name"=>"table","styles"=>\Runtime\Vector::from(["border"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Table.TableStorage", \Runtime\Map::from(["api_name"=>"admin.wordpress.forms.data::search"])),"page"=>$this->layout->request_query->get("p", 1) - 1,"pagination_props"=>\Runtime\Map::from(["name"=>"p"]),"edit_form"=>$this->form,"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"row_number"]),\Runtime\Map::from(["name"=>"form_title","label"=>"Title","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"data","label"=>"Data","calculate"=>$calculateData,"component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"send_email_error","label"=>"Mail error","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"gmtime_add","label"=>"Date","calculate"=>\Runtime\lib::pipe()->add(\Runtime\lib::attr(\Runtime\Vector::from(["item","gmtime_add"])))->add(\Runtime\lib::normalizeDateTime()),"component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"row_buttons","model"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Table.TableRowButtonsModel", \Runtime\Map::from(["delete"=>false]))])])]));
		/* Remove save button */
		$save_dialog = $this->table->getWidget("save_dialog");
		$save_dialog->buttons->removeItemByName("confirm_button");
		/* Change cancel button text */
		$cancel_button = $save_dialog->buttons->findItemByName("cancel_button");
		$cancel_button->content = "Close";
		/* Table row buttons */
		$row_buttons = $this->table->getWidget("row_buttons");
		$edit_button = $row_buttons->findItemByName("edit_button");
		$edit_button->content = "View";
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Forms data");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.FormData.FormDataPage";
		$this->form = null;
		$this->table = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.FormData";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.FormData.FormDataPageModel";
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