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

use Runtime\Entity\Hook;
use Runtime\Entity\Provider;
use Runtime\Web\Annotations\Api;
use Runtime\Web\Annotations\Route;
use Runtime\Web\Hooks\Components;
use Runtime\Web\Hooks\SetupLayout;
use Runtime\WordPress\ORM\WP_Factory;


class ModuleDescription
{
	/**
	 * Returns module name
	 */
	static function getModuleName(){ return "Runtime.WordPress.Theme"; }
	
	
	/**
	 * Returns module version
	 */
	static function getModuleVersion(){ return "0.1.0"; }
	
	
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static function requiredModules()
	{
		return new \Runtime\Map([
			"Runtime" => ">=0.12",
			"Runtime.Web" => ">=0.12",
			"Runtime.Widget" => ">=0.12",
		]);
	}
	
	
	/**
	 * Returns enities
	 */
	static function entities()
	{
		return new \Runtime\Vector(
			\Runtime\Web\Hooks\SetupLayout::hook(new \Runtime\Map([
				"email" => "Runtime.WordPress.Theme.Components.EmailModel",
			])),
			new \Runtime\Entity\Hook("Runtime.WordPress.Theme.Hooks.LayoutHook"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Theme.Api.FormSubmitApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Theme.Api.PostApi"),
		);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.ModuleDescription"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}