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
namespace BayLang\Constructor\Frontend\Settings;
class SettingsModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $project_id;
	public $edit_form;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Project id */
		$this->project_id = $this->layout->route->matches->get("project_id");
		/* Edit form */
		$this->edit_form = $this->addWidget("Runtime.Widget.Form.FormSubmitModel", \Runtime\Map::from(["widget_name"=>"edit_form","primary_key"=>\Runtime\Vector::from(["id"]),"pk"=>\Runtime\Map::from(["id"=>$this->project_id]),"submit_button"=>\Runtime\Map::from(["text"=>"Save","styles"=>\Runtime\Vector::from(["success","large"])]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormSaveStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.project::save"])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"description","label"=>"Description","component"=>"Runtime.Widget.TextArea","props"=>\Runtime\Map::from(["height"=>"150px"])]),\Runtime\Map::from(["name"=>"reload_cache","label"=>"Reload cache","component"=>"BayLang.Constructor.Frontend.Settings.ReloadCache"])])]));
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Settings");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Settings.Settings";
		$this->project_id = "";
		$this->edit_form = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Settings";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Settings.SettingsModel";
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