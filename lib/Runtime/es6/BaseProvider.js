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
Runtime.BaseProvider = class extends Runtime.BaseObject
{
	/**
	 * Returns true if started
	 */
	isStarted(){ return this.started; }
	
	
	/**
	 * Constructor
	 */
	constructor(params)
	{
		if (params == undefined) params = null;
		super();
		this.initParams(params != null ? params : new Runtime.Map());
	}
	
	
	/**
	 * Register hook
	 */
	register(hook_name, method_name, priority)
	{
		if (priority == undefined) priority = 100;
		let hook = Runtime.rtl.getContext().provider("hook");
		hook.register(hook_name, new Runtime.Method(this, method_name), priority);
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
	}
	
	
	/**
	 * Init provider
	 */
	async init()
	{
		this.register_hooks();
	}
	
	
	/**
	 * Start provider
	 */
	async start()
	{
		this.started = true;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.started = false;
		this.params = null;
	}
	static getClassName(){ return "Runtime.BaseProvider"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.BaseProvider"] = Runtime.BaseProvider;