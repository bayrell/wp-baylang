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
class BaseProvider extends \Runtime\BaseObject
{
	public $started;
	public $params;
	function __construct($params=null)
	{
		parent::__construct();
		$this->params = ($params != null) ? ($params->toDict()) : (null);
	}
	/**
	 * Returns true if started
	 */
	function isStarted()
	{
		return $this->started;
	}
	/**
	 * Return param
	 */
	function getParam($param_name, $def_value)
	{
		if ($this->param == null)
		{
			return $def_value;
		}
		if ($this->param->has($param_name))
		{
			return $def_value;
		}
		return $this->param->get($param_name);
	}
	/**
	 * Init provider
	 */
	function init()
	{
	}
	/**
	 * Start provider
	 */
	function start()
	{
		$this->started = true;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->started = false;
		$this->params = null;
	}
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.BaseProvider";
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