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
class RouteAction extends \Runtime\Web\RouteInfo
{
	public $action;
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "action", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Copy route
	 */
	function copy()
	{
		$route = parent::copy();
		$route->action = $this->action;
		return $route;
	}
	/**
	 * Render route
	 */
	function render($container)
	{
		if (\Runtime\rtl::isCallable($this->action))
		{
			$f = $this->action;
			\Runtime\rtl::apply($f, \Runtime\Vector::from([$container]));
		}
		else if ($this->action instanceof \Runtime\Entity\Factory)
		{
			$container->base_route = $this->action->factory();
			$action = new \Runtime\Callback($container->base_route, $container->base_route->action);
			if ($action->exists())
			{
				\Runtime\rtl::apply($action, \Runtime\Vector::from([$container]));
			}
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->action = null;
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.RouteAction";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.RouteInfo";
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