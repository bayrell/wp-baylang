<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime\Cabinet\Providers;

use Runtime\BaseLayout;
use Runtime\Entity\Hook;
use Runtime\Hooks\BaseHook;
use Runtime\Hooks\RuntimeHook;
use Runtime\Auth\Providers\AuthProvider;
use Runtime\Cabinet\Models\CabinetSettings;
use Runtime\Cabinet\Models\Menu;
use Runtime\Crypt\JWT;
use Runtime\Web\Hooks\AppHook as WebHook;
use Runtime\Web\RenderContainer;


class CabinetProvider extends \Runtime\Auth\Providers\AuthProvider
{
	const CREATE_MENU = "runtime.cabinet::create_menu";
	
	
	/**
	 * Returns settings name
	 */
	static function getSettingsName(){ return "Runtime.Cabinet.Models.CabinetSettings"; }
	
	
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		parent::register_hooks();
		$this->register(\Runtime\Web\Hooks\AppHook::ROUTE_BEFORE, "createMenu", 0);
	}
	/**
	 * Create menu
	 */
	function createMenu($params)
	{
		$container = $params->get("container");
		$layout = $container->layout;
		/* Get JWT */
		$token_name = $this->settings->getTokenName();
		$jwt = $layout->storage->backend->get($token_name);
		/* Create cabinet menu */
		$menu = new \Runtime\Cabinet\Models\Menu();
		$layout->storage->set("cabinet_menu", $menu);
		/* Create profile menu */
		$profile = new \Runtime\Cabinet\Models\Menu();
		$layout->storage->set("cabinet_profile", $profile);
		/* Add logout */
		if ($jwt)
		{
			$profile->add(new \Runtime\Cabinet\Models\Menu(new \Runtime\Map([
				"title" => "Logout",
				"slug" => "logout",
				"url" => $this->settings->getUrlName() . ":logout",
			])));
		}
		/* Send hook */
		\Runtime\rtl::getContext()->hook(static::CREATE_MENU, new \Runtime\Map(["menu" => $menu, "profile" => $profile]));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.Cabinet.Providers.CabinetProvider"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}