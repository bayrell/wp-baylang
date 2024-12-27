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
namespace Runtime\Web\Hooks;
class ApiPrefix extends \Runtime\Web\Hooks\AppHook
{
	public $prefix;
	/**
	 * Setup hook params
	 */
	function setup($params)
	{
		if ($params == null)
		{
			return ;
		}
		if ($params->has("prefix"))
		{
			$this->prefix = $params->get("prefix");
		}
	}
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::ROUTES_INIT);
		$this->register(static::CALL_API_BEFORE);
	}
	/**
	 * Routes init
	 */
	function routes_init($params)
	{
		$routes = $params->get("routes");
		$pos = $routes->routes_list->find(\Runtime\lib::equalAttr("name", "runtime:web:api"));
		if ($pos >= 0)
		{
			$route = $routes->routes_list->get($pos);
			$route = \Runtime\rtl::setAttr($route, ["uri"], $this->prefix . \Runtime\rtl::toStr("/api/{service}/{api_name}/{method_name}/"));
			$routes->routes_list->set($pos, $route);
		}
	}
	/**
	 * Call api before
	 */
	function call_api_before($params)
	{
		$params->set("api_url", $this->prefix . \Runtime\rtl::toStr($params->get("api_url")));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->prefix = "";
	}
	static function getNamespace()
	{
		return "Runtime.Web.Hooks";
	}
	static function getClassName()
	{
		return "Runtime.Web.Hooks.ApiPrefix";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Hooks.AppHook";
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