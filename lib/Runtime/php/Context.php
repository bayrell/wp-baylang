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
class Context extends \Runtime\BaseObject
{
	public $app;
	public $base_path;
	public $entry_point;
	public $cli_args;
	public $environments;
	public $modules;
	public $providers;
	public $entities;
	public $start_modules;
	public $start_time;
	public $tz;
	public $initialized;
	public $started;
	/**
	 * Returns app
	 */
	function getApp()
	{
		return $this->app;
	}
	/**
	 * Returns true if is initialized
	 */
	function isInitialized()
	{
		return $this->initialized;
	}
	/**
	 * Returns true if is started
	 */
	function isStarted()
	{
		return $this->started;
	}
	/**
	 * Returns start time
	 */
	function getStartTime()
	{
		return $this->start_time;
	}
	/**
	 * Returns base path
	 */
	function getBasePath()
	{
		return $this->base_path;
	}
	/**
	 * Returns console args
	 */
	function getConsoleArgs()
	{
		return $this->cli_args->slice();
	}
	/**
	 * Returns modules
	 */
	function getModules()
	{
		return $this->modules->slice();
	}
	/**
	 * Returns entities
	 */
	function getEntities($class_name="")
	{
		if ($class_name == "")
		{
			return $this->entities->slice();
		}
		return $this->entities->filter(\Runtime\lib::isInstance($class_name));
	}
	/**
	 * Returns environments
	 */
	function getEnvironments()
	{
		return $this->environments->clone();
	}
	/**
	 * Returns provider by name
	 */
	function provider($provider_name)
	{
		if (!$this->providers->has($provider_name))
		{
			throw new \Runtime\Exceptions\RuntimeException("Provider '" . \Runtime\rtl::toStr($provider_name) . \Runtime\rtl::toStr("' not found"));
		}
		return $this->providers->get($provider_name);
	}
	/**
	 * Return environment
	 */
	function env($name)
	{
		$value = \Runtime\rtl::attr($this->environments, $name);
		$hook_res = $this->callHook(\Runtime\Hooks\RuntimeHook::ENV, \Runtime\Map::from(["name"=>$name,"value"=>$value]));
		return \Runtime\rtl::attr($hook_res, "value");
	}
	/**
	 * Create context
	 */
	static function create($params)
	{
		if (!($params instanceof \Runtime\Dict))
		{
			$params = \Runtime\Dict::from($params);
		}
		$params = $params->toMap();
		if ($params->has("modules"))
		{
			$modules = $params->get("modules");
			if (!($modules instanceof \Runtime\Collection))
			{
				$modules = \Runtime\Collection::from($modules);
			}
			$params->set("modules", $modules->toVector());
		}
		/* Setup default environments */
		if (!$params->has("environments"))
		{
			$params->set("environments", new \Runtime\Map());
		}
		$env = \Runtime\rtl::attr($params, "environments");
		if (!$env)
		{
			$env = \Runtime\Map::from([]);
		}
		if (!$env->has("CLOUD_ENV"))
		{
			$env->set("CLOUD_ENV", false);
		}
		if (!$env->has("DEBUG"))
		{
			$env->set("DEBUG", false);
		}
		if (!$env->has("LOCALE"))
		{
			$env->set("LOCALE", "en_US");
		}
		if (!$env->has("TZ"))
		{
			$env->set("TZ", "UTC");
		}
		if (!$env->has("TZ_OFFSET"))
		{
			$env->set("TZ_OFFSET", 0);
		}
		$instance = \Runtime\rtl::newInstance(static::getClassName());
		if ($params->has("base_path"))
		{
			$instance->base_path = $params->get("base_path");
		}
		if ($params->has("entry_point"))
		{
			$instance->entry_point = $params->get("entry_point");
		}
		if ($params->has("cli_args"))
		{
			$instance->cli_args = $params->get("cli_args");
		}
		if ($params->has("environments"))
		{
			$instance->environments = $params->get("environments");
		}
		if ($params->has("modules"))
		{
			$instance->modules = $params->get("modules");
		}
		if ($params->has("start_time"))
		{
			$instance->start_time = $params->get("start_time");
		}
		if ($params->has("tz"))
		{
			$instance->tz = $params->get("tz");
		}
		$instance->start_modules = $instance->modules->copy();
		return $instance;
	}
	/**
	 * Init
	 */
	function init()
	{
		if ($this->initialized)
		{
			return ;
		}
		/* Create app */
		if ($this->entry_point)
		{
			$this->app = \Runtime\rtl::newInstance($this->entry_point);
		}
		$modules = $this->modules;
		if ($modules->indexOf("Runtime"))
		{
			$modules->prepend("Runtime");
		}
		/* Extend modules */
		$this->modules = static::getRequiredModules($modules);
		/* Get modules entities */
		$this->entities = static::getEntitiesFromModules($this->modules);
		/* Create providers */
		$this->createProviders();
		/* Init providers */
		$this->initProviders();
		/* Hook init app */
		$this->callHookAsync(\Runtime\Hooks\RuntimeHook::INIT);
		/* Init app */
		if ($this->app != null && \Runtime\rtl::method_exists($this->app, "init"))
		{
			$this->app->init();
		}
		/* Set initialized */
		$this->initialized = true;
	}
	/**
	 * Start context
	 */
	function start()
	{
		if ($this->started)
		{
			return ;
		}
		/* Start providers */
		$this->startProviders();
		/* Hook start app */
		$this->callHookAsync(\Runtime\Hooks\RuntimeHook::START);
		/* Start app */
		if ($this->app && \Runtime\rtl::method_exists($this->app, "start"))
		{
			$this->app->start();
		}
		/* Hook launched app */
		$this->callHookAsync(\Runtime\Hooks\RuntimeHook::LAUNCHED);
		/* Set started */
		$this->started = true;
	}
	/**
	 * Run context
	 */
	function run()
	{
		$code = 0;
		/* Run app */
		if ($this->app == null)
		{
			return ;
		}
		/* Run entry_point */
		if (\Runtime\rtl::method_exists($this->app, "main"))
		{
			/* Hook launched app */
			$this->callHookAsync(\Runtime\Hooks\RuntimeHook::RUN);
			$code = $this->app->main();
		}
		return $code;
	}
	/**
	 * Call hook
	 */
	function callHook($hook_name, $params=null)
	{
		if ($params == null)
		{
			$params = \Runtime\Map::from([]);
		}
		if (!$this->providers->has("hook"))
		{
			return $params;
		}
		$hook = $this->provider("hook");
		$methods_list = $hook->getMethods($hook_name);
		for ($i = 0; $i < $methods_list->count(); $i++)
		{
			$f = \Runtime\rtl::attr($methods_list, $i);
			$res = \Runtime\rtl::apply($f, \Runtime\Vector::from([$params]));
			if (\Runtime\rtl::isPromise($res))
			{
				throw new \Runtime\Exceptions\RuntimeException("Promise is not allowed");
			}
		}
		return $params;
	}
	/**
	 * Call hook
	 */
	function callHookAsync($hook_name, $params=null)
	{
		if ($params == null)
		{
			$params = \Runtime\Map::from([]);
		}
		$hook = $this->provider("hook");
		$methods_list = $hook->getMethods($hook_name);
		for ($i = 0; $i < $methods_list->count(); $i++)
		{
			$f = \Runtime\rtl::attr($methods_list, $i);
			\Runtime\rtl::apply($f, \Runtime\Vector::from([$params]));
		}
		return $params;
	}
	/**
	 * Translate message
	 */
	function translate($module, $s, $params=null)
	{
		if ($params == null)
		{
			return $s;
		}
		return \Runtime\rs::format($s, $params);
	}
	/**
	 * Create providers
	 */
	function createProviders()
	{
		$providers = $this->getEntities("Runtime.Entity.Provider");
		for ($i = 0; $i < $providers->count(); $i++)
		{
			$factory = $providers->get($i);
			/* Create provider */
			$provider = $factory->createProvider();
			if (!$provider)
			{
				throw new \Runtime\Exceptions\RuntimeException("Wrong declare provider '" . \Runtime\rtl::toStr($factory->name) . \Runtime\rtl::toStr("'"));
			}
			/* Add provider */
			$this->registerProvider($factory->name, $provider);
		}
	}
	/**
	 * Init providers
	 */
	function initProviders()
	{
		$providers_names = $this->providers->keys();
		for ($i = 0; $i < $providers_names->count(); $i++)
		{
			$provider_name = $providers_names->get($i);
			$provider = $this->providers->get($provider_name);
			$provider->init();
		}
	}
	/**
	 * Start providers
	 */
	function startProviders()
	{
		$providers_names = $this->providers->keys();
		for ($i = 0; $i < $providers_names->count(); $i++)
		{
			$provider_name = $providers_names->get($i);
			$provider = $this->providers->get($provider_name);
			$provider->start();
		}
	}
	/**
	 * Register provider
	 */
	function registerProvider($provider_name, $provider)
	{
		if ($this->initialized)
		{
			return ;
		}
		if (!($provider instanceof \Runtime\BaseProvider))
		{
			throw new \Runtime\Exceptions\RuntimeException("Provider '" + $provider_name + "' must be intstanceof BaseProvider");
		}
		$this->providers->set($provider_name, $provider);
	}
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	static function getRequiredModules($modules)
	{
		$res = new \Runtime\Vector();
		$cache = new \Runtime\Map();
		static::_getRequiredModules($res, $cache, $modules);
		return $res->removeDuplicates();
	}
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	static function _getRequiredModules($res, $cache, $modules)
	{
		if ($modules == null)
		{
			return ;
		}
		for ($i = 0; $i < $modules->count(); $i++)
		{
			$module_name = $modules->item($i);
			if (!$cache->has($module_name))
			{
				$cache->set($module_name, true);
				$f = new \Runtime\Callback($module_name . \Runtime\rtl::toStr(".ModuleDescription"), "requiredModules");
				if ($f->exists())
				{
					$sub_modules = \Runtime\rtl::apply($f);
					if ($sub_modules != null)
					{
						$sub_modules = $sub_modules->keys();
						static::_getRequiredModules($res, $cache, $sub_modules);
					}
					$res->push($module_name);
				}
			}
		}
	}
	/**
	 * Returns modules entities
	 */
	static function getEntitiesFromModules($modules)
	{
		$entities = new \Runtime\Vector();
		for ($i = 0; $i < $modules->count(); $i++)
		{
			$module_name = $modules->item($i);
			$f = new \Runtime\Callback($module_name . \Runtime\rtl::toStr(".ModuleDescription"), "entities");
			if ($f->exists())
			{
				$arr = \Runtime\rtl::apply($f);
				if ($arr)
				{
					$entities->appendItems($arr);
				}
			}
		}
		return $entities;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->app = null;
		$this->base_path = "";
		$this->entry_point = "";
		$this->cli_args = \Runtime\Vector::from([]);
		$this->environments = \Runtime\Map::from([]);
		$this->modules = \Runtime\Vector::from([]);
		$this->providers = \Runtime\Map::from([]);
		$this->entities = \Runtime\Vector::from([]);
		$this->start_modules = \Runtime\Vector::from([]);
		$this->start_time = 0;
		$this->tz = "UTC";
		$this->initialized = false;
		$this->started = false;
	}
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Context";
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