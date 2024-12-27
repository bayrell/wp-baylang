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
class RouteInfo extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	public $name;
	public $uri;
	public $uri_match;
	public $domain;
	public $label;
	public $layout;
	public $route_class;
	public $data;
	public $middleware;
	public $params;
	public $matches;
	public $is_backend;
	public $pos;
	function __construct($params=null)
	{
		parent::__construct();
		$this->_assign_values($params);
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "data", $data);
		$serializer->process($this, "domain", $data);
		$serializer->process($this, "label", $data);
		$serializer->process($this, "layout", $data);
		$serializer->process($this, "matches", $data);
		$serializer->process($this, "middleware", $data);
		$serializer->process($this, "name", $data);
		$serializer->process($this, "params", $data);
		$serializer->process($this, "pos", $data);
		$serializer->process($this, "route_class", $data);
		$serializer->process($this, "uri", $data);
		$serializer->process($this, "uri_match", $data);
	}
	/**
	 * Copy route
	 */
	function copy()
	{
		return \Runtime\Serializer::copy($this);
	}
	/**
	 * Compile route
	 */
	function compile()
	{
		if ($this->uri_match == "")
		{
			$this->uri_match = "^" . \Runtime\rtl::toStr(\Runtime\re::replace("\\/", "\\/", $this->uri)) . \Runtime\rtl::toStr("\$");
		}
		$matches = \Runtime\re::matchAll("{(.*?)}", $this->uri);
		if ($matches)
		{
			$params = new \Runtime\Vector();
			for ($i = 0; $i < $matches->count(); $i++)
			{
				$arr = \Runtime\rtl::attr($matches, $i);
				$name = \Runtime\rtl::attr($arr, 1);
				$this->uri_match = \Runtime\re::replace("{" . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("}"), "([^\\/]*?)", $this->uri_match);
				$this->params->push($name);
			}
		}
		else
		{
			$this->params = \Runtime\Vector::from([]);
		}
	}
	/**
	 * Add matches
	 */
	function addMatches($matches)
	{
		for ($i = 0; $i < $this->params->count(); $i++)
		{
			$param_name = $this->params->get($i);
			$match_value = $matches->get($i);
			$this->matches->set($param_name, $match_value);
		}
	}
	/**
	 * Render route
	 */
	function render($container)
	{
		throw new \Runtime\Exceptions\RuntimeException("RouteInfo is abstract class");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->name = null;
		$this->uri = null;
		$this->uri_match = null;
		$this->domain = null;
		$this->label = null;
		$this->layout = null;
		$this->route_class = null;
		$this->data = null;
		$this->middleware = null;
		$this->params = \Runtime\Vector::from([]);
		$this->matches = \Runtime\Map::from([]);
		$this->is_backend = false;
		$this->pos = 100;
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.RouteInfo";
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