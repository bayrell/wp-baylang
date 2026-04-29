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
Runtime.Web.Hooks.WidgetModelFactory = class extends Runtime.Web.Hooks.AppHook
{
	/**
	 * Create hook
	 */
	static hook(model_name)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.create({"model_name": model_name}));
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("model_name")) this.model_name = params.get("model_name");
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
	}
	
	
	/**
	 * Route before
	 */
	route_before(params)
	{
		let container = params.get("container");
		if (container.response != null) return;
		/* Add widget */
		container.layout.addWidget(this.model_name);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.model_name = "";
	}
	static getClassName(){ return "Runtime.Web.Hooks.WidgetModelFactory"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Hooks.WidgetModelFactory"] = Runtime.Web.Hooks.WidgetModelFactory;