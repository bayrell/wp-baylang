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
namespace Runtime\Auth\Providers;

use Runtime\Method;
use Runtime\BaseProvider;
use Runtime\Entity\Provider;
use Runtime\Auth\Api\LoginApi;
use Runtime\Auth\Models\UserData;
use Runtime\Auth\Models\UserSettings;
use Runtime\Crypt\JWT;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Web\Hooks\AppHook as WebHook;
use Runtime\Web\BaseApi;
use Runtime\Web\RenderContainer;
use Runtime\Web\RouteInfo;
use Runtime\Web\RouteList;
use Runtime\Web\RouteProvider;


class AuthProvider extends \Runtime\BaseProvider
{
	var $settings;
	var $enable_login;
	
	
	/**
	 * Returns settings name
	 */
	static function getSettingsName(){ return "Runtime.Auth.Models.UserSettings"; }
	
	
	/**
	 * Setup hook params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null) return;
		if ($params->has("settings"))
		{
			$this->settings = $params->get("settings");
		}
	}
	
	
	/**
	 * Returns provider name
	 */
	static function getProviderName(){ return static::getClassName(); }
	
	
	/**
	 * Create hook
	 */
	static function hook($settings_name = "")
	{
		return new \Runtime\Entity\Provider(static::getProviderName(), static::getClassName(), new \Runtime\Map([
			"settings" => \Runtime\rtl::newInstance($settings_name ? $settings_name : static::getSettingsName()),
		]));
	}
	
	
	
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		parent::register_hooks();
		$this->register(\Runtime\Web\Hooks\AppHook::FIND_API, "findApi");
		$this->register(\Runtime\Web\Hooks\AppHook::ROUTE_BEFORE, "routeBefore");
		$this->register(\Runtime\Web\Hooks\AppHook::ROUTES_INIT, "routeInit");
	}
	
	
	/**
	 * Disable login
	 */
	function disableLogin()
	{
		$this->enable_login = false;
		$url_name = $this->settings->getUrlName();
		$routes = \Runtime\rtl::getContext()->provider("Runtime.Web.RouteProvider");
		$routes->removeRoute($url_name . ":login");
		$routes->removeRoute($url_name . ":logout");
	}
	/**
	 * Find api
	 */
	function findApi($params)
	{
		$api_name = $params->get("api_name");
		$method_name = $params->get("method_name");
		$api = $params->get("api");
		if ($api) return;
		/* If login is enable */
		if (!$this->enable_login) return;
		/* Setup login api */
		if ($api_name == $this->settings->getApiName())
		{
			$obj = new \Runtime\Map([
				"settings" => $this->settings,
			]);
			if ($method_name == "login")
			{
				$api_item = \Runtime\rtl::newInstance($this->settings->getLoginApi(), new \Runtime\Vector($obj));
				$api = new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map([
					"name" => "login",
					"item" => new \Runtime\Method($api_item, "actionLogin"),
				]));
			}
			else if ($method_name == "logout")
			{
				$api_item = \Runtime\rtl::newInstance($this->settings->getLogoutApi(), new \Runtime\Vector($obj));
				$api = new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map([
					"name" => "logout",
					"item" => new \Runtime\Method($api_item, "actionLogout"),
				]));
			}
		}
		/* Setup api */
		if ($api)
		{
			$params->set("api", $api);
		}
	}
	
	
	/**
	 * Routes init
	 */
	function routeInit($params)
	{
		$routes = $params->get("routes");
		/* Add login */
		$route_login = $this->settings->getLoginRoute();
		if (!$routes->hasRoute($route_login->name))
		{
			$routes->addRoute($route_login);
		}
		/* Add logout */
		$route_logout = $this->settings->getLogoutRoute();
		if (!$routes->hasRoute($route_logout->name))
		{
			$routes->addRoute($route_logout);
		}
	}
	
	
	/**
	 * Route before
	 */
	function routeBefore($params)
	{
		$container = $params->get("container");
		$token_name = $this->settings->getTokenName();
		$jwt_algo = \Runtime\rtl::getContext()->env($token_name . "_jwt_algo");
		$jwt_secret_key = \Runtime\rtl::getContext()->env($token_name . "_jwt_secret_key");
		if (!$container->request->cookies) return;
		$jwt_string = $container->request->cookies->get($token_name);
		/* Decode JWT */
		$jwt = \Runtime\Crypt\JWT::decode($jwt_string, $jwt_secret_key);
		if ($jwt && $jwt->isCorrect())
		{
			$container->layout->storage->backend->set($token_name, $jwt);
			$container->layout->storage->set($token_name, new \Runtime\Auth\Models\UserData($jwt->data));
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->settings = null;
		$this->enable_login = true;
	}
	static function getClassName(){ return "Runtime.Auth.Providers.AuthProvider"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}