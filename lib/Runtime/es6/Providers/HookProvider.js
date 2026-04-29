"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Providers == 'undefined') Runtime.Providers = {};
Runtime.Providers.HookProvider = class extends Runtime.BaseProvider
{
	/**
	 * Init provider
	 */
	async init()
	{
		let hooks = Runtime.rtl.getContext().getEntities("Runtime.Entity.Hook");
		this.base_hooks = new Runtime.Vector();
		for (let i = 0; i < hooks.count(); i++)
		{
			let hook = hooks[i];
			let base_hook = hook.createInstance();
			base_hook.provider = this;
			base_hook.register_hooks();
			this.base_hooks.push(base_hook);
		}
	}
	
	
	/**
	 * Start provider
	 */
	async start()
	{
		await super.start();
		this.sort();
	}
	
	
	/**
	 * Set async
	 */
	setAsync(arr)
	{
		for (let i = 0; i < arr.count(); i++)
		{
			let hook_name = arr.get(i);
			this.async_hooks.set(hook_name, true);
		}
	}
	
	
	/**
	 * Returns if chain is async
	 */
	isAsync(name)
	{
		if (!this.async_hooks.has(name)) return false;
		return this.async_hooks.get(name);
	}
	
	
	/**
	 * Find hook by name
	 */
	find(name)
	{
		return this.base_hooks.find((hook) => { return hook.constructor.getClassName() == name; });
	}
	
	
	/**
	 * Register hook
	 */
	register(hook_name, f, priority)
	{
		if (priority == undefined) priority = 100;
		let chain = this.getChain(hook_name);
		if (!chain) return;
		chain.add(f, priority);
	}
	
	
	/**
	 * Sort
	 */
	sort()
	{
		this.chains.each((chain) =>
		{
			chain.sort();
		});
	}
	
	
	/**
	 * Create chain
	 */
	createChain(name, is_async)
	{
		if (this.chains.has(name)) return;
		if (is_async) this.chains.set(name, new Runtime.ChainAsync());
		else this.chains.set(name, new Runtime.Chain());
	}
	
	
	/**
	 * Returns chain
	 */
	getChain(name)
	{
		if (!this.chains.has(name)) this.createChain(name, this.isAsync(name));
		return this.chains.get(name);
	}
	
	
	/**
	 * Apply hook
	 */
	apply(hook_name, params)
	{
		if (params == undefined) params = null;
		let chain = this.chains.get(hook_name);
		if (!chain) return params;
		if (chain instanceof Runtime.ChainAsync)
		{
			let f = async () =>
			{
				await chain.apply(Runtime.Vector.create([params]));
				return params;
			};
			return f();
		}
		chain.apply(Runtime.Vector.create([params]));
		return params;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.base_hooks = Runtime.Vector.create([]);
		this.chains = new Runtime.Map();
		this.async_hooks = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Providers.HookProvider"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Providers.HookProvider"] = Runtime.Providers.HookProvider;