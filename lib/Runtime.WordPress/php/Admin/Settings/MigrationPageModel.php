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
class MigrationPageModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $tabs;
	public $items;
	public $result;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add tabs */
		$this->tabs = $this->addWidget("Runtime.WordPress.Admin.Settings.TabsModel", \Runtime\Map::from(["active"=>"database-migrations"]));
		/* Add result */
		$this->result = $this->addWidget("Runtime.Widget.WidgetResultModel", \Runtime\Map::from(["styles"=>\Runtime\Vector::from(["margin_top"])]));
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "items", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Update database
	 */
	function updateDatabase()
	{
		$this->result->setWaitMessage();
		$result = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"admin.wordpress.migration","method_name"=>"actionUpdate"]));
		$this->result->setApiResult($result);
	}
	/**
	 * Load table data
	 */
	function loadData($container)
	{
		parent::loadData($container);
		$result = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"admin.wordpress.migration","method_name"=>"actionItem"]));
		if ($result->isSuccess())
		{
			$this->items = $result->data->get("items");
		}
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Migrations");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.Settings.MigrationPage";
		$this->tabs = null;
		$this->items = \Runtime\Vector::from([]);
		$this->result = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Settings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Settings.MigrationPageModel";
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