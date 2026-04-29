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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Seo == 'undefined') Runtime.Widget.Seo = {};
Runtime.Widget.Seo.Seo = class extends Runtime.Web.Hooks.AppHook
{
	/**
	 * Create hook
	 */
	static hook(params){ if (params == undefined) params = null;return new Runtime.Entity.Hook("Runtime.Widget.Seo.Seo", params); }
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (!params) return;
		if (params.has("class_name")) this.class_name = params.get("class_name");
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(Runtime.Hooks.RuntimeHook.CREATE_LAYOUT, "createLayout");
		this.register(Runtime.Hooks.RuntimeHook.LAYOUT_HEADER, "renderHeader");
		this.register(Runtime.Web.Hooks.AppHook.ROUTE_BEFORE, "routeBefore");
	}
	
	
	/**
	 * Create layout
	 */
	createLayout(params)
	{
		let container = params.get("container");
		container.layout.storage.set("seo", container.layout.createWidget("Runtime.Widget.Seo.SeoModel"));
	}
	
	
	/**
	 * Render head
	 */
	renderHeader(params)
	{
		let layout = params.get("layout");
		let seo = layout.get("seo");
		if (seo) params.get("components").push(Runtime.VirtualDom.renderModel(seo));
	}
	
	
	/**
	 * Route before
	 */
	routeBefore(params)
	{
		let container = params.get("container");
		/* If page model exists */
		if (container.route == null) return;
		if (container.route.data == null) return;
		/* Setup route data */
		let seo = container.layout.get("seo");
		let route_data = container.route.data;
		if (route_data.has("title")) container.layout.setPageTitle(route_data.get("title"));
		if (route_data.has("description")) seo.description = route_data.get("description");
		if (route_data.has("robots")) seo.robots = route_data.get("robots");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.class_name = "Runtime.Widget.Seo.SeoModel";
	}
	static getClassName(){ return "Runtime.Widget.Seo.Seo"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Seo.Seo"] = Runtime.Widget.Seo.Seo;