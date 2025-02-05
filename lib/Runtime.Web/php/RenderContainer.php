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
class RenderContainer extends \Runtime\BaseObject
{
	public $base_route;
	public $request;
	public $response;
	public $route;
	public $layout;
	public $cookies;
	/**
	 * Create layout
	 */
	function createLayout($layout_name)
	{
		/* Get layout params */
		$params = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::LAYOUT_MODEL_NAME, \Runtime\Map::from(["class_name"=>"Runtime.Web.BaseLayoutModel","layout_name"=>$layout_name,"component_name"=>""]));
		/* Create layout */
		$this->layout = \Runtime\rtl::newInstance($params->get("class_name"));
		$this->layout->setLayoutName($layout_name);
		$this->layout->route = $this->route;
		/* Set component name */
		if ($params->get("component_name") != "")
		{
			$this->layout->component = $params->get("component_name");
		}
		/* Call create layout */
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\Web\Hooks\AppHook::CREATE_LAYOUT, \Runtime\Map::from(["container"=>$this]));
	}
	/**
	 * Returns layout name
	 */
	function getLayoutName()
	{
		$layout_name = "default";
		if ($this->route == null)
		{
			return $layout_name;
		}
		/* Set layout name from route */
		if ($this->route->layout)
		{
			$layout_name = $this->route->layout;
		}
		else if ($this->route->route_class)
		{
			$getLayoutName = new \Runtime\Callback($this->route->route_class, "getLayoutName");
			if ($getLayoutName->exists())
			{
				$layout_name = $getLayoutName->apply();
			}
		}
		/* Set layout name */
		return $layout_name;
	}
	/**
	 * Resolve container
	 */
	function resolve()
	{
		/* Find route */
		$this->findRoute();
		/* Call middleware */
		$this->callRouteMiddleware($this);
		/* Resolve route */
		$this->resolveRoute();
	}
	/**
	 * Find route
	 */
	function findRoute()
	{
		/* Call hook find route */
		\Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::FIND_ROUTE_BEFORE, \Runtime\Map::from(["container"=>$this]));
		/* Exit if route find */
		if ($this->route != null)
		{
			return ;
		}
		if ($this->response != null)
		{
			return ;
		}
		/* Find route */
		$routes = \Runtime\rtl::getContext()->provider("Runtime.Web.RouteList");
		$this->route = $routes->findRoute($this);
		/* Call hook found route */
		\Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::FIND_ROUTE_AFTER, \Runtime\Map::from(["container"=>$this]));
	}
	/**
	 * Resolve route
	 */
	function resolveRoute()
	{
		if ($this->response)
		{
			return ;
		}
		/* Create layout */
		$layout_name = $this->getLayoutName();
		$this->createLayout($layout_name);
		/* Call route before */
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\Web\Hooks\AppHook::ROUTE_BEFORE, \Runtime\Map::from(["container"=>$this]));
		/* Call layout route before */
		$this->layout->onActionBefore($this);
		/* Load layout data */
		$this->layout->loadData($this);
		/* Render route */
		if ($this->route != null)
		{
			$this->route->render($this);
		}
		/* Call layout route after */
		$this->layout->onActionAfter($this);
		/* Call route after */
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\Web\Hooks\AppHook::ROUTE_AFTER, \Runtime\Map::from(["container"=>$this]));
		/* Set response */
		if ($this->response == null)
		{
			$this->setResponse(new \Runtime\Web\RenderResponse($this));
		}
	}
	/**
	 * Call route middleware
	 */
	function callRouteMiddleware()
	{
		if ($this->route && $this->route->middleware)
		{
			for ($i = 0; $i < $this->route->middleware->count(); $i++)
			{
				$middleware = $this->route->middleware->get($i);
				\Runtime\rtl::apply($middleware, \Runtime\Vector::from([$this]));
			}
		}
		/* Call hook middleware */
		\Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::ROUTE_MIDDLEWARE, \Runtime\Map::from(["container"=>$this]));
	}
	/**
	 * Render page model
	 */
	function renderPageModel($model_name)
	{
		/* Create response */
		$this->setResponse(new \Runtime\Web\RenderResponse($this));
		/* Set page model */
		$this->layout->setPageModel($model_name);
		/* Action index */
		$page_model = $this->layout->getPageModel();
		if ($page_model)
		{
			$page_model->actionIndex($this);
		}
	}
	/**
	 * Set response
	 */
	function setResponse($response)
	{
		$this->response = $response;
	}
	/**
	 * Cancel route
	 */
	function cancelRoute()
	{
		if ($this->base_route)
		{
			$this->base_route->cancelRoute();
		}
	}
	/**
	 * Add cookie
	 */
	function addCookie($cookie)
	{
		$this->cookies->set($cookie->name, $cookie);
	}
	/**
	 * Returns frontend environments
	 */
	function getFrontendEnvironments()
	{
		$environments = \Runtime\Map::from([]);
		/* Setup environments */
		$arr = \Runtime\Vector::from(["CLOUD_ENV","DEBUG","LOCALE","TZ","TZ_OFFSET","ROUTE_PREFIX"]);
		/* Call hook */
		$params = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::ENVIRONMENTS, \Runtime\Map::from(["arr"=>$arr,"environments"=>$environments]));
		/* Get result */
		$arr = $params->get("arr");
		$environments = $params->get("environments");
		/* Copy environments */
		for ($i = 0; $i < $arr->count(); $i++)
		{
			$name = $arr->get($i);
			$environments->set($name, \Runtime\rtl::getContext()->env($name));
		}
		return $environments;
	}
	/**
	 * Export data
	 */
	function exportData()
	{
		$data = \Runtime\Map::from(["entry_point"=>\Runtime\rtl::getContext()->entry_point,"modules"=>\Runtime\rtl::getContext()->start_modules,"environments"=>$this->getFrontendEnvironments()]);
		/* Create serializer */
		$serializer = new \Runtime\Serializer();
		$serializer->setFlag(\Runtime\Serializer::ALLOW_OBJECTS);
		$serializer->setFlag(\Runtime\Serializer::ENCODE);
		/* Export data */
		$serializer->process($this, "layout", $data);
		/* Call hook */
		\Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::EXPORT_CONTAINER_DATA, \Runtime\Map::from(["container"=>$this,"data"=>$data]));
		return $data;
	}
	/**
	 * Import data
	 */
	function importData($data)
	{
		/* Call hook */
		\Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::IMPORT_CONTAINER_DATA_BEFORE, \Runtime\Map::from(["container"=>$this,"data"=>$data]));
		/* Create serializer */
		$serializer = new \Runtime\SerializerNative();
		$serializer->setFlag(\Runtime\Serializer::ALLOW_OBJECTS);
		/* Create layout */
		$layout_name = $data->get("layout")->get("layout_name");
		$this->createLayout($layout_name);
		/* Load data */
		$serializer->setFlag(\Runtime\Serializer::DECODE);
		$this->layout->serialize($serializer, $data->get("layout"));
		/* Call hook */
		\Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::IMPORT_CONTAINER_DATA_AFTER, \Runtime\Map::from(["container"=>$this,"data"=>$data]));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->base_route = null;
		$this->request = null;
		$this->response = null;
		$this->route = null;
		$this->layout = null;
		$this->cookies = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.RenderContainer";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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