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
Runtime.Web.Hooks.ApiPrefix = class extends Runtime.Web.Hooks.AppHook
{
	/**
	 * Init params
	 */
	initParams(params)
	{
		if (params == null) return;
		if (params.has("prefix")) this.prefix = params.get("prefix");
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(this.constructor.ROUTES_INIT);
		this.register(this.constructor.CALL_API_BEFORE);
	}
	
	
	/**
	 * Routes init
	 */
	routes_init(params)
	{
		let routes = params.get("routes");
		let pos = routes.routes_list.find(Runtime.lib.equalAttr("name", "runtime:web:api"));
		if (pos >= 0)
		{
			let route = routes.routes_list.get(pos);
			route.uri = this.prefix + String("/api/{service}/{api_name}/{method_name}/");
			routes.routes_list.set(pos, route);
		}
	}
	
	
	/**
	 * Call api before
	 */
	call_api_before(params)
	{
		params.set("api_url", this.prefix + String(params.get("api_url")));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.prefix = "";
	}
	static getClassName(){ return "Runtime.Web.Hooks.ApiPrefix"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Hooks.ApiPrefix"] = Runtime.Web.Hooks.ApiPrefix;