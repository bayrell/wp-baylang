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
class LayoutHook extends \Runtime\Web\Hooks\AppHook
{
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::ROUTE_BEFORE, 0);
	}
	/**
	 * Route before
	 */
	function route_before($params)
	{
		$container = $params->get("container");
		/* Setup client ip */
		$this->setupClientIP($container);
		/* Setup layout */
		$this->setupLayoutRequest($container);
		/* Setup urls */
		$this->setupLayoutRoutes($container);
	}
	/**
	 * Setup client ip
	 */
	function setupClientIP($container)
	{
		$client_ip = $container->request->getClientIp();
		$container->layout->backend_storage->set("client_ip", $client_ip);
	}
	/**
	 * Setup layout request
	 */
	function setupLayoutRequest($container)
	{
		$container->layout->route = $container->route;
		$container->layout->request_https = $container->request->is_https;
		$container->layout->request_host = $container->request->host;
		$container->layout->request_uri = $container->request->uri;
		$container->layout->request_full_uri = $container->request->full_uri;
		$container->layout->request_query = $container->request->query;
	}
	/**
	 * Setup layout routes
	 */
	function setupLayoutRoutes($container)
	{
		$container->layout->routes = \Runtime\Map::from([]);
		$routes = \Runtime\rtl::getContext()->provider("Runtime.Web.RouteList");
		$routes_list = $routes->routes_list;
		for ($i = 0; $i < $routes_list->count(); $i++)
		{
			$route = $routes_list->get($i);
			if ($route->is_backend)
			{
				continue;
			}
			$container->layout->routes->set($route->name, \Runtime\Map::from(["uri"=>$route->uri,"domain"=>$route->domain]));
		}
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Web.Hooks";
	}
	static function getClassName()
	{
		return "Runtime.Web.Hooks.LayoutHook";
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