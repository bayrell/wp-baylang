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
class Request extends \Runtime\BaseObject
{
	const METHOD_GET="GET";
	const METHOD_HEAD="HEAD";
	const METHOD_POST="POST";
	const METHOD_PUT="PUT";
	const METHOD_DELETE="DELETE";
	const METHOD_CONNECT="CONNECT";
	const METHOD_OPTIONS="OPTIONS";
	const METHOD_TRACE="TRACE";
	const METHOD_PATCH="PATCH";
	public $uri;
	public $full_uri;
	public $host;
	public $method;
	public $protocol;
	public $is_https;
	public $query;
	public $payload;
	public $cookies;
	public $headers;
	public $start_time;
	/**
	 * Returns client ip
	 */
	function getClientIp()
	{
		return $this->headers->get("REMOTE_ADDR");
	}
	/**
	 * Init request
	 */
	function initUri($full_uri)
	{
		$res = \Runtime\rs::parse_url($full_uri);
		$uri = \Runtime\rtl::attr($res, "uri");
		$query = \Runtime\rtl::attr($res, "query_arr");
		$this->full_uri = $full_uri;
		$this->uri = $uri;
		$this->query = $query;
		if ($this->uri == "")
		{
			$this->uri = "/";
		}
		/* Route prefix */
		$route_prefix = \Runtime\rtl::getContext()->env("ROUTE_PREFIX");
		if ($route_prefix == null)
		{
			$route_prefix = "";
		}
		$route_prefix_sz = \Runtime\rs::strlen($route_prefix);
		if ($route_prefix_sz != 0 && \Runtime\rs::substr($this->uri, 0, $route_prefix_sz) == $route_prefix)
		{
			$this->uri = \Runtime\rs::substr($this->uri, $route_prefix_sz);
			$this->full_uri = \Runtime\rs::substr($this->full_uri, $route_prefix_sz);
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->uri = "";
		$this->full_uri = "";
		$this->host = "";
		$this->method = "GET";
		$this->protocol = "";
		$this->is_https = false;
		$this->query = null;
		$this->payload = null;
		$this->cookies = null;
		$this->headers = null;
		$this->start_time = 0;
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.Request";
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