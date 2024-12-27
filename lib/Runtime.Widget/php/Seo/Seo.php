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
namespace Runtime\Widget\Seo;
class Seo extends \Runtime\Web\Hooks\AppHook
{
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::CREATE_LAYOUT);
		$this->register(static::RENDER_HEAD);
		$this->register(static::ROUTE_BEFORE);
	}
	/**
	 * Create layout
	 */
	function create_layout($params)
	{
		$container = $params->get("container");
		$container->layout->addWidget("Runtime.Widget.Seo.SeoModel");
	}
	/**
	 * Render head
	 */
	function render_head($params)
	{
		$layout = $params->get("layout");
		$seo = $layout->getWidget("seo");
		if ($seo)
		{
			$params->get("components")->push($seo);
		}
	}
	/**
	 * Route before
	 */
	function route_before($params)
	{
		$container = $params->get("container");
		/* If page model exists */
		if ($container->route == null)
		{
			return ;
		}
		if ($container->route->data == null)
		{
			return ;
		}
		/* Setup route data */
		$seo = $container->layout->getWidget("seo");
		$route_data = $container->route->data;
		if ($route_data->has("title"))
		{
			$container->layout->setPageTitle($route_data->get("title"));
		}
		if ($route_data->has("description"))
		{
			$seo->description = $route_data->get("description");
		}
		if ($route_data->has("robots"))
		{
			$seo->robots = $route_data->get("robots");
		}
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Seo";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Seo.Seo";
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