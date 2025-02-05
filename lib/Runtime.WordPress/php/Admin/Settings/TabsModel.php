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
class TabsModel extends \Runtime\Widget\Tab\TabsModel
{
	public $widget_name;
	public $items;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Setup items */
		$this->items = \Runtime\Vector::from([\Runtime\Map::from(["key"=>"settings","label"=>"Save project","href"=>$this->layout->url("admin:project:save")]),\Runtime\Map::from(["key"=>"create-project","label"=>"Create project","href"=>$this->layout->url("admin:project:create")]),\Runtime\Map::from(["key"=>"database-migrations","label"=>"Database migrations","href"=>$this->layout->url("admin:database:migrations")])]);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->widget_name = "tabs";
		$this->items = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Settings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Settings.TabsModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Tab.TabsModel";
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