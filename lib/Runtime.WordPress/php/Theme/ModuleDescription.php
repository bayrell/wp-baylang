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
namespace Runtime\WordPress\Theme;
class ModuleDescription
{
	/**
	 * Returns module name
	 */
	static function getModuleName()
	{
		return "Runtime.WordPress.Theme";
	}
	/**
	 * Returns module version
	 */
	static function getModuleVersion()
	{
		return "0.1.0";
	}
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static function requiredModules()
	{
		return \Runtime\Map::from(["Runtime"=>">=0.12","Runtime.Web"=>">=0.12","Runtime.Widget"=>">=0.12","Runtime.WordPress"=>">=0.12","Runtime.ORM"=>">=0.12"]);
	}
	/**
	 * Returns enities
	 */
	static function entities()
	{
		return \Runtime\Vector::from([new \Runtime\Entity\Hook("Runtime.WordPress.Theme.AssetHook"),\Runtime\Web\Hooks\Components::header(\Runtime\Vector::from(["Runtime.WordPress.Theme.WP_Head"])),\Runtime\Web\Hooks\Components::footer(\Runtime\Vector::from(["Runtime.WordPress.Theme.WP_Footer"]))]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.ModuleDescription";
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