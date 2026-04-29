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
Runtime.Web.Hooks.PageNotFound = class extends Runtime.Hooks.RuntimeHook
{
	/**
	 * Hook factory
	 */
	static hook(model, layout)
	{
		if (layout == undefined) layout = "default";
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.create({"model": model, "layout": layout}));
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params.has("model")) this.model = params.get("model");
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		super.register_hooks();
		this.register(Runtime.Web.Hooks.AppHook.FIND_ROUTE_AFTER, "routeNotFound");
		this.register(Runtime.Web.Hooks.AppHook.ROUTE_AFTER, "renderPageNotFound");
	}
	
	
	/**
	 * Route not found
	 */
	async routeNotFound(params)
	{
		let container = params.get("container");
		if (container.route) return null;
		/* Set route */
		container.route = new Runtime.Web.RouteModel(Runtime.Map.create({
			"model": this.model,
			"layout": this.layout_name,
		}));
	}
	
	
	/**
	 * Render page not found
	 */
	async renderPageNotFound(params)
	{
		let container = params.get("container");
		if (container.response) return;
		/* Create default layout */
		if (container.layout == null)
		{
			container.createLayout(this.layout_name);
		}
		/* Get page model */
		let page_model = container.layout.getPageModel();
		if (page_model) return;
		await container.renderPageModel(this.model);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.model = "";
		this.layout_name = "default";
	}
	static getClassName(){ return "Runtime.Web.Hooks.PageNotFound"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Hooks.PageNotFound"] = Runtime.Web.Hooks.PageNotFound;