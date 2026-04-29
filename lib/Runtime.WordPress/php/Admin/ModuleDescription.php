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

use Runtime\Entity\Hook;
use Runtime\Web\Annotations\Api;
use Runtime\Web\Annotations\Route;
use Runtime\Web\Hooks\Components;
use Runtime\Web\Hooks\SetupLayout;


class ModuleDescription
{
	/**
	 * Returns module name
	 */
	static function getModuleName(){ return "Runtime.WordPress.Admin"; }
	
	
	/**
	 * Returns module version
	 */
	static function getModuleVersion(){ return "0.0.1"; }
	
	
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static function requiredModules()
	{
		return new \Runtime\Map([
			"Runtime.Widget" => ">1.0",
			"Runtime.WordPress" => ">=1.0",
		]);
	}
	
	
	/**
	 * Returns enities
	 */
	static function entities()
	{
		return new \Runtime\Vector(
			new \Runtime\Entity\Hook("Runtime.WordPress.Admin.AppHook"),
			\Runtime\Web\Hooks\SetupLayout::hook(new \Runtime\Map([
				"admin" => "Runtime.WordPress.Admin.AdminLayoutModel",
			])),
			\Runtime\Web\Hooks\Components::prependItems(new \Runtime\Vector("Runtime.WordPress.Admin.CSS")),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Cabinet.Users.UserSaveApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Cabinet.Users.UserSearchApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.FormData.FormDataSearchApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.FormSettings.FormSaveApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.FormSettings.FormSearchApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Gallery.GallerySaveApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Gallery.GallerySearchApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.GalleryItem.GalleryItemSearchApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.MailLog.MailLogSearchApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.MailSettings.MailSaveApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.MailSettings.MailSearchApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Migrations.MigrationApi"),
			new \Runtime\Web\Annotations\Api("Runtime.WordPress.Admin.Robots.RobotsApi"),
			new \Runtime\Web\Annotations\Route("Runtime.WordPress.Admin.Routes"),
		);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.ModuleDescription"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}