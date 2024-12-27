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
namespace BayLang\Constructor\Frontend\Layout;
class ProjectLayoutModel extends \Runtime\Web\BaseLayoutModel
{
	public $component;
	public $page_title;
	public $project_id;
	public $module_id;
	/**
	 * Load data
	 */
	function loadData($container)
	{
		parent::loadData($container);
		$this->project_id = $this->layout->route->matches->get("project_id");
		$this->module_id = $this->layout->route->matches->get("module_id");
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "module_id", $data);
		$serializer->process($this, "page_title", $data);
		$serializer->process($this, "project_id", $data);
		parent::serialize($serializer, $data);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Layout.ProjectLayout";
		$this->page_title = "";
		$this->project_id = "";
		$this->module_id = "";
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Layout";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Layout.ProjectLayoutModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseLayoutModel";
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