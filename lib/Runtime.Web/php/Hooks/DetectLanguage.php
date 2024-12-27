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
class DetectLanguage extends \Runtime\Web\Hooks\AppHook
{
	public $default_language;
	public $allowed_languages;
	/**
	 * Setup
	 */
	function setup($params)
	{
		parent::setup($params);
		if ($params == null)
		{
			return ;
		}
		if ($params->has("allowed_languages"))
		{
			$this->allowed_languages = $params->get("allowed_languages");
		}
		if ($params->has("default_language"))
		{
			$this->default_language = $params->get("default_language");
		}
	}
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::CALL_API_BEFORE);
		$this->register(static::MAKE_URL);
		$this->register(static::FIND_ROUTE_BEFORE);
		$this->register(static::MATCH_ROUTE);
		$this->register(static::FIND_ROUTE_AFTER);
	}
	/**
	 * Call api before
	 */
	function call_api_before($params)
	{
		$api_params = $params->get("params");
		$layout = $api_params->get("layout");
		/* Get api params */
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($api_params, "service"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", "app"));
		$service = $__v0->value();
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($api_params, "api_name"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$api_name = $__v0->value();
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($api_params, "method_name"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$method_name = $__v0->value();
		/* Build api url */
		$api_url_arr = \Runtime\Vector::from([$layout->lang,"api",$service,$api_name,$method_name]);
		$api_url_arr = $api_url_arr->filter(function ($s)
		{
			return $s != "";
		});
		$api_url = "/" . \Runtime\rtl::toStr($api_url_arr->join("/")) . \Runtime\rtl::toStr("/");
		/* Set api url */
		$params->set("api_url", $api_url);
	}
	/**
	 * Make url
	 */
	function make_url($params)
	{
		$route = $params->get("route");
		$layout = $params->get("layout");
		$domain = $params->get("domain");
		$url = $params->get("url");
		$url_params = $params->get("url_params");
		$url_lang = ($url_params->has("lang")) ? ($url_params->get("lang")) : ($layout->lang);
		/* Add language */
		if ($route->enable_locale)
		{
			$url = "/" . \Runtime\rtl::toStr($url_lang) . \Runtime\rtl::toStr($url);
			$params->set("url", $url);
			$params->set("url_with_domain", $url);
		}
		/* Add domain */
		if ($domain)
		{
			$params->set("url_with_domain", "//" . \Runtime\rtl::toStr($domain) . \Runtime\rtl::toStr($url));
		}
	}
	/**
	 * Returns language
	 */
	function getLanguage($request)
	{
		$lang = "";
		$uri = $request->uri;
		$arr = \Runtime\rs::split("/", $request->uri)->filter(\Runtime\lib::equalNot(""));
		if ($arr->count() > 0)
		{
			$lang = $arr->get(0);
			$uri = \Runtime\rs::substr($request->uri, \Runtime\rs::strlen($lang) + 1);
		}
		else
		{
			$uri = "/";
		}
		return \Runtime\Map::from(["lang"=>$lang,"uri"=>$uri]);
	}
	/**
	 * Redirect
	 */
	function find_route_before($params)
	{
		$container = $params->get("container");
		$request = $container->request;
		/* Detect language */
		$res = $this->getLanguage($request);
		$wrong_language = false;
		$language = $res->get("lang");
		$uri = $res->get("uri");
		/* Check if language is correct */
		if ($this->allowed_languages->indexOf($language) == -1)
		{
			$wrong_language = true;
		}
		/* Set detected language */
		$container->backend_storage->set("detect_language", \Runtime\Map::from(["lang"=>(!$wrong_language) ? ($language) : ($this->default_language),"uri"=>$uri,"uri_lang"=>$language,"wrong"=>$wrong_language]));
	}
	/**
	 * Match route
	 */
	function match_route($params)
	{
		$container = $params->get("container");
		$route = $params->get("route");
		/* If enable locale */
		if (!$route->enable_locale)
		{
			return ;
		}
		/* Get detected language */
		$detect_language = $container->backend_storage->get("detect_language");
		$wrong_language = $detect_language->get("wrong");
		$language = $detect_language->get("lang");
		$uri = $detect_language->get("uri");
		/* Clear matches */
		$params->set("matches", null);
		/* Check if language is correct */
		if ($wrong_language)
		{
			return ;
		}
		/* Get matches */
		$matches = \Runtime\re::matchAll($route->uri_match, $uri);
		if ($matches)
		{
			$matches = $matches->get(0, null);
			$matches->remove(0);
			/* Set result */
			$params->set("matches", $matches);
			/* Set current language */
			$container->layout->lang = $language;
		}
	}
	/**
	 * Find route after
	 */
	function find_route_after($params)
	{
		$container = $params->get("container");
		/* Get detected language */
		$detect_language = $container->backend_storage->get("detect_language");
		$wrong_language = $detect_language->get("wrong");
		$language = $detect_language->get("uri_lang");
		$uri = $detect_language->get("uri");
		/* Redirect if wrong language and route not found */
		if ($wrong_language && $container->route == null)
		{
			$redirect_url = "/" . \Runtime\rtl::toStr($this->default_language) . \Runtime\rtl::toStr($container->request->full_uri);
			$container->response = new \Runtime\Web\RedirectResponse($redirect_url);
		}
		else if (!$wrong_language && $uri == "")
		{
			$redirect_url = "/" . \Runtime\rtl::toStr($container->layout->lang) . \Runtime\rtl::toStr("/");
			$container->response = new \Runtime\Web\RedirectResponse($redirect_url);
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->default_language = "";
		$this->allowed_languages = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Web.Hooks";
	}
	static function getClassName()
	{
		return "Runtime.Web.Hooks.DetectLanguage";
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