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
Runtime.Web.Hooks.CanonicalUrl = class extends Runtime.Hooks.BaseHook
{
	/**
	 * Create hook
	 */
	static hook(query)
	{
		return new Runtime.Entity.Hook("Runtime.Web.Hooks.CanonicalUrl", Runtime.Map.create({
			"query": query,
		}));
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("query")) this.query = params.get("query");
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(Runtime.Web.Hooks.AppHook.ROUTE_BEFORE, "routeBefore");
	}
	
	
	/**
	 * Route before
	 */
	routeBefore(params)
	{
		let container = params.get("container");
		let layout = container.layout;
		let route = layout.get("route");
		let seo = layout.get("seo");
		if (!seo) return;
		if (!route) return;
		if (route.uri == null) return;
		/* Build canonical url */
		let canonical_url = layout.url(route.name, route.matches, Runtime.Map.create({"domain": false}));
		/* Add get parameters */
		let request = layout.get("request");
		let keys = Runtime.rtl.list(request.query.keys()).sort();
		for (let i = 0; i < keys.count(); i++)
		{
			let key = keys.get(i);
			if (!this.query.has(key)) continue;
			if (this.query.get(key).indexOf(route.name) == -1) continue;
			let value = request.query.get(key);
			canonical_url = Runtime.rs.url_get_add(canonical_url, key, value);
		}
		/* Set canonical url */
		seo.setCanonicalUrl(canonical_url);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.query = null;
	}
	static getClassName(){ return "Runtime.Web.Hooks.CanonicalUrl"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Hooks.CanonicalUrl"] = Runtime.Web.Hooks.CanonicalUrl;