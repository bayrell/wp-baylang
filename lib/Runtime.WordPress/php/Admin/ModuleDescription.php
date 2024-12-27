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
class ModuleDescription
{
	/**
	 * Returns module name
	 */
	static function getModuleName()
	{
		return "Runtime.WordPress.Admin";
	}
	/**
	 * Returns module version
	 */
	static function getModuleVersion()
	{
		return "0.0.1";
	}
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static function requiredModules()
	{
		return \Runtime\Map::from(["BayLang"=>">=0.12","BayLang.Constructor"=>">=0.12","Runtime.WordPress"=>">=0.1"]);
	}
	/**
	 * Returns enities
	 */
	static function entities()
	{
		return \Runtime\Vector::from([new \Runtime\Entity\Hook("Runtime.WordPress.Admin.AppHook"),\Runtime\Web\Hooks\SetupLayout::hook(\Runtime\Map::from(["default"=>"Runtime.WordPress.Admin.DefaultLayoutModel"])),\Runtime\Web\Hooks\Components::hook(\Runtime\Vector::from(["Runtime.WordPress.Admin.CSS"])),new \Runtime\Web\Annotations\Api("BayLang.Constructor.Backend.Api.AssetsApi"),new \Runtime\Web\Annotations\Api("BayLang.Constructor.Backend.Api.CodeApi"),new \Runtime\Web\Annotations\Api("BayLang.Constructor.Backend.Api.ModuleSearchApi"),new \Runtime\Web\Annotations\Api("BayLang.Constructor.Backend.Api.ProjectSaveApi"),new \Runtime\Web\Annotations\Api("BayLang.Constructor.Backend.Api.WidgetApi"),new \Runtime\Web\Annotations\Api("BayLang.Constructor.Backend.Api.WidgetSaveApi"),new \Runtime\Web\Annotations\Api("BayLang.Constructor.Backend.Api.WidgetSearchApi"),new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Api.FormDataSearch"),new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Api.FormSettingsSave"),new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Api.FormSettingsSearch"),new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Api.MailLogSearch"),new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Api.MailSettingsSave"),new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Api.MailSettingsSearch"),new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Api.RobotsApi"),new \Runtime\Web\Annotations\Route("Runtime.WordPress.Admin.Routes")]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.ModuleDescription";
	}
	static function getParentClassName()
	{
		return "";
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