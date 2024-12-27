"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Context = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Context.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Returns app
	 */
	getApp: function()
	{
		return this.app;
	},
	/**
	 * Returns true if is initialized
	 */
	isInitialized: function()
	{
		return this.initialized;
	},
	/**
	 * Returns true if is started
	 */
	isStarted: function()
	{
		return this.started;
	},
	/**
	 * Returns start time
	 */
	getStartTime: function()
	{
		return this.start_time;
	},
	/**
	 * Returns base path
	 */
	getBasePath: function()
	{
		return this.base_path;
	},
	/**
	 * Returns console args
	 */
	getConsoleArgs: function()
	{
		return this.cli_args.slice();
	},
	/**
	 * Returns modules
	 */
	getModules: function()
	{
		return this.modules.slice();
	},
	/**
	 * Returns entities
	 */
	getEntities: function(class_name)
	{
		if (class_name == undefined) class_name = "";
		if (class_name == "")
		{
			return this.entities.slice();
		}
		return this.entities.filter(Runtime.lib.isInstance(class_name));
	},
	/**
	 * Returns environments
	 */
	getEnvironments: function()
	{
		return this.environments.clone();
	},
	/**
	 * Returns provider by name
	 */
	provider: function(provider_name)
	{
		if (!this.providers.has(provider_name))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider '" + Runtime.rtl.toStr(provider_name) + Runtime.rtl.toStr("' not found"))
		}
		return this.providers.get(provider_name);
	},
	/**
	 * Return environment
	 */
	env: function(name)
	{
		var value = Runtime.rtl.attr(this.environments, name);
		var hook_res = this.callHook(Runtime.Hooks.RuntimeHook.ENV, Runtime.Map.from({"name":name,"value":value}));
		return Runtime.rtl.attr(hook_res, "value");
	},
	/**
	 * Init
	 */
	init: async function()
	{
		if (this.initialized)
		{
			return Promise.resolve();
		}
		/* Create app */
		if (this.entry_point)
		{
			this.app = Runtime.rtl.newInstance(this.entry_point);
		}
		var modules = this.modules;
		if (modules.indexOf("Runtime"))
		{
			modules.prepend("Runtime");
		}
		/* Extend modules */
		this.modules = this.constructor.getRequiredModules(modules);
		/* Get modules entities */
		this.entities = this.constructor.getEntitiesFromModules(this.modules);
		/* Create providers */
		this.createProviders();
		/* Init providers */
		await this.initProviders();
		/* Hook init app */
		await this.callHookAsync(Runtime.Hooks.RuntimeHook.INIT);
		/* Init app */
		if (this.app != null && Runtime.rtl.method_exists(this.app, "init"))
		{
			await this.app.init();
		}
		/* Set initialized */
		this.initialized = true;
	},
	/**
	 * Start context
	 */
	start: async function()
	{
		if (this.started)
		{
			return Promise.resolve();
		}
		/* Start providers */
		await this.startProviders();
		/* Hook start app */
		await this.callHookAsync(Runtime.Hooks.RuntimeHook.START);
		/* Start app */
		if (this.app && Runtime.rtl.method_exists(this.app, "start"))
		{
			await this.app.start();
		}
		/* Hook launched app */
		await this.callHookAsync(Runtime.Hooks.RuntimeHook.LAUNCHED);
		/* Set started */
		this.started = true;
	},
	/**
	 * Run context
	 */
	run: async function()
	{
		var code = 0;
		/* Run app */
		if (this.app == null)
		{
			return Promise.resolve();
		}
		/* Run entry_point */
		if (Runtime.rtl.method_exists(this.app, "main"))
		{
			/* Hook launched app */
			await this.callHookAsync(Runtime.Hooks.RuntimeHook.RUN);
			code = await this.app.main();
		}
		return Promise.resolve(code);
	},
	/**
	 * Call hook
	 */
	callHook: function(hook_name, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = Runtime.Map.from({});
		}
		if (!this.providers.has("hook"))
		{
			return params;
		}
		var hook = this.provider("hook");
		var methods_list = hook.getMethods(hook_name);
		for (var i = 0; i < methods_list.count(); i++)
		{
			var f = Runtime.rtl.attr(methods_list, i);
			var res = Runtime.rtl.apply(f, Runtime.Vector.from([params]));
			if (Runtime.rtl.isPromise(res))
			{
				throw new Runtime.Exceptions.RuntimeException("Promise is not allowed")
			}
		}
		return params;
	},
	/**
	 * Call hook
	 */
	callHookAsync: async function(hook_name, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = Runtime.Map.from({});
		}
		var hook = this.provider("hook");
		var methods_list = hook.getMethods(hook_name);
		for (var i = 0; i < methods_list.count(); i++)
		{
			var f = Runtime.rtl.attr(methods_list, i);
			await Runtime.rtl.apply(f, Runtime.Vector.from([params]));
		}
		return Promise.resolve(params);
	},
	/**
	 * Translate message
	 */
	translate: function(module, s, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return s;
		}
		return Runtime.rs.format(s, params);
	},
	/**
	 * Create providers
	 */
	createProviders: function()
	{
		var providers = this.getEntities("Runtime.Entity.Provider");
		for (var i = 0; i < providers.count(); i++)
		{
			var factory = providers.get(i);
			/* Create provider */
			var provider = factory.createProvider();
			if (!provider)
			{
				throw new Runtime.Exceptions.RuntimeException("Wrong declare provider '" + Runtime.rtl.toStr(factory.name) + Runtime.rtl.toStr("'"))
			}
			/* Add provider */
			this.registerProvider(factory.name, provider);
		}
	},
	/**
	 * Init providers
	 */
	initProviders: async function()
	{
		var providers_names = this.providers.keys();
		for (var i = 0; i < providers_names.count(); i++)
		{
			var provider_name = providers_names.get(i);
			var provider = this.providers.get(provider_name);
			await provider.init();
		}
	},
	/**
	 * Start providers
	 */
	startProviders: async function()
	{
		var providers_names = this.providers.keys();
		for (var i = 0; i < providers_names.count(); i++)
		{
			var provider_name = providers_names.get(i);
			var provider = this.providers.get(provider_name);
			await provider.start();
		}
	},
	/**
	 * Register provider
	 */
	registerProvider: function(provider_name, provider)
	{
		if (this.initialized)
		{
			return ;
		}
		if (!(provider instanceof Runtime.BaseProvider))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider '" + provider_name + "' must be intstanceof BaseProvider")
		}
		this.providers.set(provider_name, provider);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.app = null;
		this.base_path = "";
		this.entry_point = "";
		this.cli_args = Runtime.Vector.from([]);
		this.environments = Runtime.Map.from({});
		this.modules = Runtime.Vector.from([]);
		this.providers = Runtime.Map.from({});
		this.entities = Runtime.Vector.from([]);
		this.start_modules = Runtime.Vector.from([]);
		this.start_time = 0;
		this.tz = "UTC";
		this.initialized = false;
		this.started = false;
	},
});
Object.assign(Runtime.Context, Runtime.BaseObject);
Object.assign(Runtime.Context,
{
	/**
	 * Create context
	 */
	create: function(params)
	{
		if (!(params instanceof Runtime.Dict))
		{
			params = Runtime.Dict.from(params);
		}
		params = params.toMap();
		if (!params.has("start_time"))
		{
			params.set("start_time", Date.now());
		}
		if (params.has("modules"))
		{
			var modules = params.get("modules");
			if (!(modules instanceof Runtime.Collection))
			{
				modules = Runtime.Collection.from(modules);
			}
			params.set("modules", modules.toVector());
		}
		/* Setup default environments */
		if (!params.has("environments"))
		{
			params.set("environments", new Runtime.Map());
		}
		var env = Runtime.rtl.attr(params, "environments");
		if (!env)
		{
			env = Runtime.Map.from({});
		}
		if (!env.has("CLOUD_ENV"))
		{
			env.set("CLOUD_ENV", false);
		}
		if (!env.has("DEBUG"))
		{
			env.set("DEBUG", false);
		}
		if (!env.has("LOCALE"))
		{
			env.set("LOCALE", "en_US");
		}
		if (!env.has("TZ"))
		{
			env.set("TZ", "UTC");
		}
		if (!env.has("TZ_OFFSET"))
		{
			env.set("TZ_OFFSET", 0);
		}
		var instance = Runtime.rtl.newInstance(this.getClassName());
		if (params.has("base_path"))
		{
			instance.base_path = params.get("base_path");
		}
		if (params.has("entry_point"))
		{
			instance.entry_point = params.get("entry_point");
		}
		if (params.has("cli_args"))
		{
			instance.cli_args = params.get("cli_args");
		}
		if (params.has("environments"))
		{
			instance.environments = params.get("environments");
		}
		if (params.has("modules"))
		{
			instance.modules = params.get("modules");
		}
		if (params.has("start_time"))
		{
			instance.start_time = params.get("start_time");
		}
		if (params.has("tz"))
		{
			instance.tz = params.get("tz");
		}
		instance.start_modules = instance.modules.copy();
		return instance;
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(modules)
	{
		var res = new Runtime.Vector();
		var cache = new Runtime.Map();
		this._getRequiredModules(res, cache, modules);
		return res.removeDuplicates();
	},
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(res, cache, modules)
	{
		if (modules == null)
		{
			return ;
		}
		for (var i = 0; i < modules.count(); i++)
		{
			var module_name = modules.item(i);
			if (!cache.has(module_name))
			{
				cache.set(module_name, true);
				var f = new Runtime.Callback(module_name + Runtime.rtl.toStr(".ModuleDescription"), "requiredModules");
				if (f.exists())
				{
					var sub_modules = Runtime.rtl.apply(f);
					if (sub_modules != null)
					{
						var sub_modules = sub_modules.keys();
						this._getRequiredModules(res, cache, sub_modules);
					}
					res.push(module_name);
				}
			}
		}
	},
	/**
	 * Returns modules entities
	 */
	getEntitiesFromModules: function(modules)
	{
		var entities = new Runtime.Vector();
		for (var i = 0; i < modules.count(); i++)
		{
			var module_name = modules.item(i);
			var f = new Runtime.Callback(module_name + Runtime.rtl.toStr(".ModuleDescription"), "entities");
			if (f.exists())
			{
				var arr = Runtime.rtl.apply(f);
				if (arr)
				{
					entities.appendItems(arr);
				}
			}
		}
		return entities;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Context";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Context);
window["Runtime.Context"] = Runtime.Context;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Context;