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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.SetupLayout = class extends Runtime.Hooks.RuntimeHook
{
	/**
	 * Hook factory
	 */
	static hook(params)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.create({"names": params}));
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("names")) this.names = params.get("names");
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(this.constructor.LAYOUT_NAME, "getLayoutName");
	}
	
	
	/**
	 * Layout model name
	 */
	getLayoutName(params)
	{
		/* Setup custom model */
		let layout_name = params.get("layout_name");
		if (this.names && this.names.has(layout_name))
		{
			params.set("class_name", this.names.get(layout_name));
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.names = null;
	}
	static getClassName(){ return "Runtime.Web.Hooks.SetupLayout"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Hooks.SetupLayout"] = Runtime.Web.Hooks.SetupLayout;