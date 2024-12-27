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
namespace Runtime\Providers;
class HookProvider extends \Runtime\BaseProvider
{
	public $base_hooks;
	public $hooks;
	/**
	 * Init provider
	 */
	function init()
	{
		$hooks = \Runtime\rtl::getContext()->getEntities("Runtime.Entity.Hook");
		$this->base_hooks = new \Runtime\Vector();
		for ($i = 0; $i < $hooks->count(); $i++)
		{
			$hook = \Runtime\rtl::attr($hooks, $i);
			$base_hook = $hook->createHook();
			$base_hook->hook = $hook;
			$base_hook->provider = $this;
			$base_hook->register_hooks();
			$this->base_hooks->push($base_hook);
		}
	}
	/**
	 * Start provider
	 */
	function start()
	{
		parent::start();
	}
	/**
	 * Register hook
	 */
	function register($hook_name, $obj, $method_name, $priority=100)
	{
		if (!$this->hooks->has($hook_name))
		{
			$this->hooks->set($hook_name, new \Runtime\Map());
		}
		$priorities = \Runtime\rtl::attr($this->hooks, $hook_name);
		if (!$priorities->has($priority))
		{
			$priorities->set($priority, new \Runtime\Vector());
		}
		$methods_list = $priorities->get($priority);
		$methods_list->push(new \Runtime\Callback($obj, $method_name));
	}
	/**
	 * Remove hook
	 */
	function remove($hook_name, $obj, $method_name, $priority=100)
	{
		if (!$this->hooks->has($hook_name))
		{
			$this->hooks->setValue($hook_name, new \Runtime\Map());
		}
		$priorities = \Runtime\rtl::attr($this->hooks, $hook_name);
		if (!$priorities->has($priority))
		{
			$priorities->setValue($priority, new \Runtime\Vector());
		}
		$methods_list = $priorities->get($priority);
		$index = $methods_list->find(function ($info) use (&$obj,&$method_name)
		{
			return $info->obj == $obj && $info->name == $method_name;
		});
		if ($index > -1)
		{
			$methods_list->removePosition($index);
		}
	}
	/**
	 * Returns method list
	 */
	function getMethods($hook_name)
	{
		if (!$this->hooks->has($hook_name))
		{
			return \Runtime\Vector::from([]);
		}
		$res = new \Runtime\Vector();
		$priorities = \Runtime\rtl::attr($this->hooks, $hook_name);
		$priorities_keys = $priorities->keys()->sort();
		for ($i = 0; $i < $priorities_keys->count(); $i++)
		{
			$priority = \Runtime\rtl::attr($priorities_keys, $i);
			$methods_list = $priorities->get($priority);
			$res->appendItems($methods_list);
		}
		return $res->toCollection();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->base_hooks = \Runtime\Vector::from([]);
		$this->hooks = new \Runtime\Map();
	}
	static function getNamespace()
	{
		return "Runtime.Providers";
	}
	static function getClassName()
	{
		return "Runtime.Providers.HookProvider";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseProvider";
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