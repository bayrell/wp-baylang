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
namespace Runtime\WordPress\Admin\MailSettings;
class MailSettingsPageModel extends \Runtime\Web\BasePageModel
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
		$this->form = $this->addWidget("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"form","primary_key"=>\Runtime\Vector::from(["id"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormSaveStorage", \Runtime\Map::from(["api_name"=>"admin.wordpress.mail.settings::save"])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"enable","label"=>"Enable","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"0","value"=>"No"]),\Runtime\Map::from(["key"=>"1","value"=>"Yes"])])])]),\Runtime\Map::from(["name"=>"plan","label"=>"Plan","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"host","label"=>"Host","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"port","label"=>"Port","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"login","label"=>"Login","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"password","label"=>"Password","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"ssl_enable","label"=>"SSL","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"0","value"=>"No"]),\Runtime\Map::from(["key"=>"1","value"=>"Yes"])])])])])]));
		/* Add table */
		$this->table = $this->addWidget("Runtime.Widget.Table.TableDialogModel", \Runtime\Map::from(["widget_name"=>"table","styles"=>\Runtime\Vector::from(["border"]),"get_title"=>function ($params)
		{
			$action = $params->get("action");
			$item = $params->get("item");
			if ($action == "add")
			{
				return "Add mail";
			}
			if ($action == "edit")
			{
				return "Edit mail '" . \Runtime\rtl::toStr($item->get("plan")) . \Runtime\rtl::toStr("'");
			}
			if ($action == "delete")
			{
				return "Delete mail '" . \Runtime\rtl::toStr($item->get("plan")) . \Runtime\rtl::toStr("'");
			}
			return "";
		},"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Table.TableStorage", \Runtime\Map::from(["api_name"=>"admin.wordpress.mail.settings::search"])),"page"=>$this->layout->request_query->get("p", 1) - 1,"pagination_props"=>\Runtime\Map::from(["name"=>"p"]),"add_form"=>$this->form,"edit_form"=>$this->form,"delete_form"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"delete_form","primary_key"=>\Runtime\Vector::from(["id"]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormDeleteStorage", \Runtime\Map::from(["api_name"=>"admin.wordpress.mail.settings::save"]))])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"row_number"]),\Runtime\Map::from(["name"=>"enable","label"=>"Enable","component"=>"Runtime.Widget.SelectLabel","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"0","value"=>"No"]),\Runtime\Map::from(["key"=>"1","value"=>"Yes"])])])]),\Runtime\Map::from(["name"=>"plan","label"=>"Plan","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"host","label"=>"Host","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"port","label"=>"Port","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"login","label"=>"Login","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"ssl_enable","label"=>"SSL","component"=>"Runtime.Widget.SelectLabel","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"0","value"=>"No"]),\Runtime\Map::from(["key"=>"1","value"=>"Yes"])])])]),\Runtime\Map::from(["name"=>"row_buttons","model"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Table.TableRowButtonsModel")])])]));
		/* Add top buttons */
		$this->top_buttons = $this->addWidget("Runtime.Widget.RowButtonsModel", \Runtime\Map::from(["widget_name"=>"top_buttons","styles"=>\Runtime\Vector::from(["top_buttons"]),"buttons"=>\Runtime\Vector::from([new \Runtime\Web\ModelFactory("Runtime.Widget.Table.AddButtonModel", \Runtime\Map::from(["table"=>$this->table]))])]));
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Mail settings");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.MailSettings.MailSettingsPage";
		$this->form = null;
		$this->table = null;
		$this->top_buttons = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.MailSettings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel";
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