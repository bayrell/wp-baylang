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
namespace Runtime\WordPress\Admin\Robots;
class RobotsPageModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $form;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add form */
		$this->form = $this->addWidget("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"form","storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormSaveStorage", \Runtime\Map::from(["api_name"=>"admin.wordpress.robots::save"])),"pk"=>\Runtime\Vector::from([]),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"content","component"=>"Runtime.Widget.TextArea"])])]));
		/* Add save button */
		$this->form->bottom_buttons->addButton(\Runtime\Map::from(["widget_name"=>"save_button","content"=>"Save","styles"=>\Runtime\Vector::from(["large","primary"]),"events"=>\Runtime\Map::from(["click"=>new \Runtime\Callback($this, "onSave")])]));
	}
	/**
	 * Save form
	 */
	function onSave()
	{
		$this->form->submit();
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Robots TXT");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.Robots.RobotsPage";
		$this->form = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Robots";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Robots.RobotsPageModel";
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