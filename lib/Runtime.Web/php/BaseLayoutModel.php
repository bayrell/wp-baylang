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
class BaseLayoutModel extends \Runtime\Web\BaseModel
{
	public $component;
	public $title;
	public $content_type;
	public $layout_name;
	public $locale;
	public $current_page_class;
	public $current_page_model;
	public $site_name;
	public $is_full_title;
	public $current_page_props;
	public $route;
	public $request_full_uri;
	public $request_host;
	public $request_https;
	public $request_uri;
	public $request_query;
	public $components;
	public $routes;
	public $storage;
	public $f_inc;
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		$this->layout = $this;
		if ($params == null)
		{
			return ;
		}
		if ($params->has("route"))
		{
			$this->route = $params->get("route");
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		$this->storage = $this->addWidget("Runtime.Web.BaseStorage");
	}
	/**
	 * Route before
	 */
	function onActionBefore($container)
	{
	}
	/**
	 * Route after
	 */
	function onActionAfter($container)
	{
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "components", $data);
		$serializer->process($this, "current_page_class", $data);
		$serializer->process($this, "current_page_model", $data);
		$serializer->process($this, "current_page_props", $data);
		$serializer->process($this, "content_type", $data);
		$serializer->process($this, "f_inc", $data);
		$serializer->process($this, "is_full_title", $data);
		$serializer->process($this, "locale", $data);
		$serializer->process($this, "layout_name", $data);
		$serializer->process($this, "request_full_uri", $data);
		$serializer->process($this, "request_host", $data);
		$serializer->process($this, "request_https", $data);
		$serializer->process($this, "request_query", $data);
		$serializer->process($this, "request_uri", $data);
		$serializer->process($this, "route", $data);
		$serializer->process($this, "routes", $data);
		$serializer->process($this, "site_name", $data);
		$serializer->process($this, "title", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Returns page model
	 */
	function getPageModel()
	{
		return $this->widgets->get($this->current_page_model);
	}
	/**
	 * Returns storage
	 */
	function getStorage()
	{
		return $this->widgets->get("storage");
	}
	/**
	 * Returns page class name
	 */
	function getPageClassName()
	{
		$page_model = $this->getPageModel();
		if ($page_model)
		{
			return $page_model->component;
		}
		return $this->current_page_class;
	}
	/**
	 * Set current page model
	 */
	function setPageModel($class_name)
	{
		$page_model = $this->getWidget($class_name);
		/* Create page model */
		if ($page_model == null)
		{
			$page_model = $this->addWidget($class_name, \Runtime\Map::from(["widget_name"=>$class_name]));
		}
		/* Change current page model */
		$this->current_page_class = "";
		$this->current_page_model = $class_name;
		$this->current_page_props = null;
		return $page_model;
	}
	/**
	 * Set page component
	 */
	function setPageComponent($component_name, $props=null)
	{
		$this->current_page_class = $component_name;
		$this->current_page_props = $props;
	}
	/**
	 * Set layout name
	 */
	function setLayoutName($layout_name)
	{
		$this->layout_name = $layout_name;
	}
	/**
	 * Set page title
	 */
	function setPageTitle($title, $is_full_title=false)
	{
		$this->title = $title;
		$this->is_full_title = $is_full_title;
	}
	/**
	 * Returns full page title
	 */
	function getFullTitle($ch="|")
	{
		/* Check full title */
		if ($this->is_full_title)
		{
			return $this->title;
		}
		/* Check site name */
		$site_name = $this->getSiteName();
		if ($site_name == "")
		{
			return $this->title;
		}
		return $this->title . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($ch) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($site_name);
	}
	/**
	 * Returns locale
	 */
	function getLocale()
	{
		return $this->locale;
	}
	/**
	 * Returns site name
	 */
	function getSiteName()
	{
		return $this->site_name;
	}
	/**
	 * Call Api
	 */
	function callApi($params)
	{
		/* Set layout */
		$params->set("layout", $this->layout);
		/* Returns bus */
		$bus = \Runtime\Web\Bus::getApi($params->get("service", "app"));
		$api = $bus->send($params);
		return $api;
	}
	/**
	 * Returns header components
	 */
	function getHeaderComponents()
	{
		return \Runtime\Vector::from([]);
	}
	/**
	 * Returns body components
	 */
	function getBodyComponents()
	{
		return \Runtime\Vector::from([]);
	}
	/**
	 * Returns footer components
	 */
	function getFooterComponents()
	{
		return \Runtime\Vector::from([]);
	}
	/**
	 * Add component
	 */
	function addComponent($class_name)
	{
		if ($this->components->indexOf($class_name) == -1)
		{
			$this->components->push($class_name);
		}
	}
	/**
	 * Returns all components
	 * @return Collection<string>
	 */
	function getComponents($components=null)
	{
		if ($components == null)
		{
			$components = \Runtime\Vector::from([]);
		}
		$res = new \Runtime\Vector();
		$cache = new \Runtime\Map();
		/* Call hook */
		$d = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::COMPONENTS, \Runtime\Map::from(["layout"=>$this,"components"=>$components]));
		/* Get new components */
		$components = $d->get("components");
		$components = $components->concat($this->components);
		$components->push($this->getPageClassName());
		/* Extends components */
		static::_getRequiredComponents($res, $cache, $components);
		return $res->removeDuplicates();
	}
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	static function _getRequiredComponents($res, $cache, $components)
	{
		if ($components == null)
		{
			return ;
		}
		for ($i = 0; $i < $components->count(); $i++)
		{
			$class_name = $components->item($i);
			if ($class_name == "")
			{
				continue;
			}
			if (!$cache->has($class_name))
			{
				$cache->set($class_name, true);
				$f = new \Runtime\Callback($class_name, "components");
				if ($f->exists())
				{
					$sub_components = \Runtime\rtl::apply($f);
					static::_getRequiredComponents($res, $cache, $sub_components);
				}
				$res->push($class_name);
			}
		}
	}
	/**
	 * Returns css
	 */
	static function getCss($components, $css_vars=null)
	{
		if ($css_vars == null)
		{
			$css_vars = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::CSS_VARS, $css_vars);
		}
		$css = $components->map(function ($component_name) use (&$css_vars)
		{
			if ($component_name == "")
			{
				return "";
			}
			$f = new \Runtime\Callback($component_name, "css");
			if (!$f->exists())
			{
				return "";
			}
			$css = \Runtime\rtl::apply($f, \Runtime\Vector::from([$css_vars]));
			return $css;
		});
		$css = $css->map(function ($s)
		{
			return \Runtime\rs::trim($s);
		})->filter(function ($s)
		{
			return $s != "";
		});
		return \Runtime\rs::trim(\Runtime\rs::join("\n", $css));
	}
	/**
	 * Returns assets
	 */
	function assets($path)
	{
		return \Runtime\Web\Component::assets($path);
	}
	/**
	 * Returns url
	 */
	function url($route_name, $route_params=null, $url_params=null)
	{
		if (!$this->routes->has($route_name))
		{
			return null;
		}
		$route = $this->routes->get($route_name);
		$domain = $route->get("domain");
		$url = $route->get("uri");
		if ($route_params != null && $url != null)
		{
			$route_params->each(function ($value, $key) use (&$url)
			{
				$pos = \Runtime\rs::indexOf($url, "{" . \Runtime\rtl::toStr($key) . \Runtime\rtl::toStr("}"));
				if ($pos >= 0)
				{
					$url = \Runtime\rs::replace("{" . \Runtime\rtl::toStr($key) . \Runtime\rtl::toStr("}"), $value, $url);
				}
				else
				{
					$url = \Runtime\rs::url_get_add($url, $key, $value);
				}
			});
		}
		/* Set url */
		if ($url == null)
		{
			$url = "";
		}
		/* Add domain */
		$url_with_domain = $url;
		if ($domain)
		{
			$url_with_domain = "//" . \Runtime\rtl::toStr($domain) . \Runtime\rtl::toStr($url);
		}
		/* Make url */
		$res = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::MAKE_URL, \Runtime\Map::from(["domain"=>$domain,"layout"=>$this,"route"=>$route,"route_name"=>$route_name,"route_params"=>$route_params,"url"=>$url,"url_with_domain"=>$url_with_domain,"url_params"=>($url_params) ? ($url_params) : (\Runtime\Map::from([]))]));
		$is_domain = ($url_params) ? ($url_params->get("domain", true)) : (true);
		return ($is_domain) ? ($res->get("url_with_domain")) : ($res->get("url"));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Web.DefaultLayout";
		$this->title = "";
		$this->content_type = "UTF-8";
		$this->layout_name = "default";
		$this->locale = \Runtime\rtl::getContext()->env("LOCALE");
		$this->current_page_class = "";
		$this->current_page_model = "";
		$this->site_name = "";
		$this->is_full_title = false;
		$this->current_page_props = null;
		$this->route = null;
		$this->request_full_uri = "";
		$this->request_host = "";
		$this->request_https = "";
		$this->request_uri = "";
		$this->request_query = null;
		$this->components = \Runtime\Vector::from([]);
		$this->routes = \Runtime\Map::from([]);
		$this->storage = null;
		$this->f_inc = "1";
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.BaseLayoutModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseModel";
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