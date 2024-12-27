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
namespace Runtime;
class BaseHook extends \Runtime\BaseObject
{
	public $hook;
	public $provider;
	function __construct($params=null)
	{
		parent::__construct();
		/* Setup hook params */
		$this->setup($params);
	}
	/**
	 * Setup hook params
	 */
	function setup($params)
	{
		if ($params == null)
		{
			return ;
		}
	}
	/**
	 * Returns method name by hook name
	 */
	function getMethodName($hook_name)
	{
		return "";
	}
	/**
	 * Register hook
	 */
	function register($hook_name, $method_name="", $priority=100)
	{
		if (\Runtime\rtl::isInt($method_name))
		{
			$priority = $method_name;
			$method_name = "";
		}
		if ($method_name == "")
		{
			$method_name = $this->getMethodName($hook_name);
		}
		if ($method_name == "")
		{
			return ;
		}
		$this->provider->register($hook_name, $this, $method_name, $priority);
	}
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->hook = null;
		$this->provider = null;
	}
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.BaseHook";
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