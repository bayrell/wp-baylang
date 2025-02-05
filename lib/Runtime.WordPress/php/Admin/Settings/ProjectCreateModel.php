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
namespace Runtime\WordPress\Admin\Settings;
class ProjectCreateModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $tabs;
	public $form;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add tabs */
		$this->tabs = $this->addWidget("Runtime.WordPress.Admin.Settings.TabsModel", \Runtime\Map::from(["active"=>"create-project"]));
		/* Save form */
		$this->form = $this->addWidget("Runtime.Widget.Form.FormSubmitModel", \Runtime\Map::from(["widget_name"=>"form","primary_key"=>\Runtime\Vector::from(["id"]),"submit_button"=>\Runtime\Map::from(["text"=>"Save","styles"=>\Runtime\Vector::from(["success","large"])]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormSubmitStorage", \Runtime\Map::from(["api_name"=>"admin.wordpress.project","method_name"=>"actionCreate"])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"id","label"=>"Api name","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Input"])])]));
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Create project");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.Settings.ProjectCreate";
		$this->tabs = null;
		$this->form = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Settings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Settings.ProjectCreateModel";
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