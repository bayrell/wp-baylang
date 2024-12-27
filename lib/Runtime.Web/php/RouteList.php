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
namespace Runtime\Web;
class RouteList extends \Runtime\BaseProvider
{
	public $routes;
	public $routes_list;
	/**
	 * Init provider
	 */
	function init()
	{
		parent::init();
		$this->initRoutes();
	}
	/**
	 * Init routes
	 */
	function initRoutes()
	{
		$this->routes = \Runtime\Map::from([]);
		$routes = \Runtime\rtl::getContext()->getEntities("Runtime.Web.Annotations.Route");
		for ($i = 0; $i < $routes->count(); $i++)
		{
			$info = \Runtime\rtl::attr($routes, $i);
			if (!$info->name)
			{
				continue;
			}
			/* Get method getRoutes */
			$getRoutes = new \Runtime\Callback($info->name, "getRoutes");
			if (!$getRoutes->exists())
			{
				throw new \Runtime\Exceptions\ItemNotFound($info->name, "Route");
			}
			/* Get routes */
			$routes_list = \Runtime\rtl::apply($getRoutes);
			if (!$routes_list)
			{
				continue;
			}
			/* Register routes */
			for ($j = 0; $j < $routes_list->count(); $j++)
			{
				$route = $routes_list->get($j);
				if ($route instanceof \Runtime\Web\RouteAction)
				{
					if (\Runtime\rtl::method_exists($info->name, $route->action))
					{
						$route->action = new \Runtime\Callback($info->name, $route->action);
					}
					else
					{
						$route->action = new \Runtime\Entity\Factory($info->name, \Runtime\Map::from(["action"=>$route->action]));
					}
				}
				$route->route_class = $info->name;
				$route->compile();
				$this->addRoute($route);
			}
		}
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\Web\Hooks\AppHook::ROUTES_INIT, \Runtime\Map::from(["routes"=>$this]));
		/* Sort routes */
		$this->sortRoutes();
	}
	/**
	 * Add route
	 */
	function addRoute($route)
	{
		$this->routes->set($route->name, $route);
		$this->routes_list->push($route);
	}
	/**
	 * Sort routes
	 */
	function sortRoutes()
	{
		$routes_list = $this->routes_list->map(function ($value, $index)
		{
			return \Runtime\Vector::from([$value,$index]);
		});
		$routes_list = $routes_list->sort(function ($a, $b)
		{
			$pos_a = $a->get(0)->pos;
			$pos_b = $b->get(0)->pos;
			if ($pos_a == $pos_b)
			{
				return $a->get(1) - $b->get(1);
			}
			return $pos_a - $pos_b;
		});
		$this->routes_list = $routes_list->map(function ($item)
		{
			return $item->get(0);
		});
	}
	/**
	 * Start provider
	 */
	function start()
	{
		parent::start();
	}
	/**
	 * Find route
	 */
	function findRoute($container)
	{
		$request = $container->request;
		if ($request->uri === null)
		{
			return null;
		}
		for ($i = 0; $i < $this->routes_list->count(); $i++)
		{
			$route = $this->routes_list->get($i);
			$matches = $this->matchRoute($container, $route);
			if ($matches == null)
			{
				continue;
			}
			$route = $route->copy();
			$route->addMatches($matches);
			return $route;
		}
		return null;
	}
	/**
	 * Match route
	 */
	function matchRoute($container, $route)
	{
		if ($route == null)
		{
			return null;
		}
		$request = $container->request;
		if ($route->domain && $route->domain != $request->host)
		{
			return null;
		}
		/* Get matches */
		$matches = \Runtime\re::matchAll($route->uri_match, $request->uri);
		if ($matches)
		{
			$matches = $matches->get(0, null);
			$matches->remove(0);
		}
		/* Call hook */
		$d = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::MATCH_ROUTE, \Runtime\Map::from(["route"=>$route,"container"=>$container,"matches"=>$matches]));
		$matches = $d->get("matches");
		if ($matches == null)
		{
			return null;
		}
		return $matches;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->routes = \Runtime\Map::from([]);
		$this->routes_list = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.RouteList";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseProvider";
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