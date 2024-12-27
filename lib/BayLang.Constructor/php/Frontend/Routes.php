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
namespace BayLang\Constructor\Frontend;
class Routes extends \Runtime\Web\BaseRoute
{
	/**
	 * Returns layout name
	 */
	static function getLayoutName()
	{
		return "admin";
	}
	/**
	 * Returns routes
	 */
	static function getRoutes()
	{
		return \Runtime\Vector::from([new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"/","name"=>"baylang:project:list","model"=>"BayLang.Constructor.Frontend.Project.ProjectListModel"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"/project/{project_id}/settings","name"=>"baylang:project:settings","model"=>"BayLang.Constructor.Frontend.Settings.SettingsModel","layout"=>"project"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"/project/{project_id}/modules","name"=>"baylang:project:modules","model"=>"BayLang.Constructor.Frontend.Module.ModuleListModel","layout"=>"project"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"/project/{project_id}/widgets","name"=>"baylang:project:widgets","model"=>"BayLang.Constructor.Frontend.Widget.WidgetListModel","layout"=>"project"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"/project/{project_id}/widgets/{widget_name}","name"=>"baylang:project:widget:edit","model"=>"BayLang.Constructor.Frontend.Editor.WidgetEditPageModel","layout"=>"clear"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"/project/{project_id}/code","name"=>"baylang:project:code:editor","model"=>"BayLang.Constructor.Frontend.Code.CodeEditorModel","layout"=>"clear"]))]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Routes";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseRoute";
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