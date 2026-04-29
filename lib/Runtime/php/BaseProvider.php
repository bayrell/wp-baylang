<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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

use Runtime\BaseObject;
use Runtime\Context;
use Runtime\Method;
use Runtime\Providers\HookProvider;


class BaseProvider extends \Runtime\BaseObject
{
	var $started;
	var $params;
	
	
	/**
	 * Returns true if started
	 */
	function isStarted(){ return $this->started; }
	
	
	/**
	 * Constructor
	 */
	function __construct($params = null)
	{
		parent::__construct();
		$this->initParams($params != null ? $params : new \Runtime\Map());
	}
	
	
	/**
	 * Register hook
	 */
	function register($hook_name, $method_name, $priority = 100)
	{
		$hook = \Runtime\rtl::getContext()->provider("hook");
		$hook->register($hook_name, new \Runtime\Method($this, $method_name), $priority);
	}
	
	
	/**
	 * Register hooks
	 */
	function register_hooks(){}
	
	
	/**
	 * Init params
	 */
	function initParams($params){}
	
	
	/**
	 * Init provider
	 */
	function init()
	{
		$this->register_hooks();
	}
	
	
	/**
	 * Start provider
	 */
	function start()
	{
		$this->started = true;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->started = false;
		$this->params = null;
	}
	static function getClassName(){ return "Runtime.BaseProvider"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}