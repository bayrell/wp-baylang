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
namespace Runtime\WordPress\Admin;
class Routes extends \Runtime\Web\BaseRoute
{
	/**
	 * Returns layout name
	 */
	static function getLayoutName()
	{
		return "default";
	}
	/**
	 * Returns routes
	 */
	static function getRoutes()
	{
		return \Runtime\Vector::from([new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"admin.php?page=baylang-forms","name"=>"admin:forms:data:index","model"=>"Runtime.WordPress.Admin.FormData.FormDataPageModel"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"admin.php?page=baylang-forms-settings","name"=>"admin:forms:settings:index","model"=>"Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"admin.php?page=baylang-mail-log","name"=>"admin:mail:log:index","model"=>"Runtime.WordPress.Admin.MailLog.MailLogPageModel"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"admin.php?page=baylang-mail-settings","name"=>"admin:mail:settings:index","model"=>"Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"admin.php?page=baylang-settings","name"=>"baylang:project:settings","model"=>"BayLang.Constructor.Frontend.Settings.SettingsModel"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"admin.php?page=baylang-widgets","name"=>"baylang:project:widgets","model"=>"BayLang.Constructor.Frontend.Widget.WidgetListModel"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"admin.php?page=baylang-widgets&action=open","name"=>"baylang:project:widget:edit","model"=>"BayLang.Constructor.Frontend.Editor.WidgetEditPageModel"])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"admin.php?page=baylang-code-editor","name"=>"baylang:project:code:editor","model"=>"BayLang.Constructor.Frontend.Code.CodeEditorModel","data"=>\Runtime\Map::from(["back_url"=>"admin.php?page=baylang"])])),new \Runtime\Web\RouteModel(\Runtime\Map::from(["uri"=>"admin.php?page=baylang-robots-txt","name"=>"admin:robots:txt","model"=>"Runtime.WordPress.Admin.Robots.RobotsPageModel"]))]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Routes";
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