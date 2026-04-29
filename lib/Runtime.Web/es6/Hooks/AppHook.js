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
Runtime.Web.Hooks.AppHook = class extends Runtime.Hooks.BaseHook
{
	static ASSETS = "runtime.web.app::assets";
	static API_MIDDLEWARE = "runtime.web.app::api_middleware";
	static CLIENT_IP = "runtime.web.app::client_ip";
	static FIND_API = "runtime.web.app::find_api";
	static FIND_ROUTE_BEFORE = "runtime.web.app::find_route_before";
	static FIND_ROUTE_AFTER = "runtime.web.app::find_route_after";
	static MAKE_URL = "runtime.web.app::make_url";
	static MAKE_URL_PARAMS = "runtime.web.app::make_url_params";
	static MATCH_ROUTE = "runtime.web.app::match_route";
	static RESPONSE = "runtime.web.app::response";
	static ROUTES_INIT = "runtime.web.app::routes_init";
	static ROUTE_AFTER = "runtime.web.app::route_after";
	static ROUTE_MIDDLEWARE = "runtime.web.app::route_middleware";
	static ROUTE_BEFORE = "runtime.web.app::route_before";
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		super.register_hooks();
		/* Async hooks */
		this.provider.setAsync(Runtime.Vector.create([
			this.constructor.FIND_ROUTE_AFTER,
			this.constructor.FIND_ROUTE_BEFORE,
			this.constructor.ROUTES_INIT,
			this.constructor.ROUTE_AFTER,
			this.constructor.ROUTE_MIDDLEWARE,
			this.constructor.ROUTE_BEFORE,
		]));
		this.register(Runtime.Hooks.RuntimeHook.CREATE_LAYOUT, "registerTranslator");
		this.register(this.constructor.ROUTE_BEFORE, "registerAssets");
		/* Hooks */
	}
	
	
	/**
	 * Register assets
	 */
	async registerAssets(params)
	{
		let container = params.get("container");
		let layout = container.layout;
		if (!layout) return;
		/* Create assets */
		let assets = new Runtime.Web.Assets();
		layout.storage.set("assets", assets);
		/* Init assets */
		Runtime.rtl.getContext().hook(this.constructor.ASSETS, Runtime.Map.create({"assets": assets}));
	}
	
	
	/**
	 * Register translator
	 */
	registerTranslator(params)
	{
		let container = params.get("container");
		container.layout.storage.set("translator", new Runtime.Web.Translator(container.layout));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.Web.Hooks.AppHook"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Hooks.AppHook"] = Runtime.Web.Hooks.AppHook;