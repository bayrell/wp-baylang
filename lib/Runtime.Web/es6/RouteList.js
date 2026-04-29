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
Runtime.Web.RouteList = class extends Runtime.BaseObject
{
	/**
	 * Serialize
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("routes", new Runtime.Serializer.MapType(new Runtime.Serializer.MapType(new Runtime.Serializer.StringType())));
		rules.addType("route_params", new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()));
	}
	
	
	/**
	 * Assign rules
	 */
	assignRules(rule)
	{
	}
	
	
	/**
	 * Returns url
	 */
	url(route_name, route_params, url_params)
	{
		if (route_params == undefined) route_params = null;
		if (url_params == undefined) url_params = null;
		if (!this.routes.has(route_name)) return "";
		if (route_params == null) route_params = new Runtime.Map();
		if (url_params == null) url_params = new Runtime.Map();
		/* Merge route params */
		route_params = this.route_params.concat(route_params);
		let route = this.routes.get(route_name);
		let res = Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.MAKE_URL_PARAMS, Runtime.Map.create({
			"route": route,
			"route_name": route_name,
			"route_params": route_params,
			"url_params": url_params,
		}));
		let domain = route.get("domain");
		let url = route.get("uri");
		if (route_params != null && url != null)
		{
			route_params.each((value, key) =>
			{
				let pos = Runtime.rs.indexOf(url, "{" + String(key) + String("}"));
				if (pos >= 0)
				{
					url = Runtime.rs.replace("{" + String(key) + String("}"), value, url);
				}
			});
		}
		/* Set url */
		if (url == null) url = "";
		/* Add route prefix */
		url = Runtime.rtl.getContext().env("ROUTE_PREFIX") + String(url);
		/* Add domain */
		let url_with_domain = url;
		if (domain)
		{
			url_with_domain = "//" + String(domain) + String(url);
		}
		/* Make url */
		res = Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.MAKE_URL, Runtime.Map.create({
			"domain": domain,
			"route": route,
			"route_name": route_name,
			"route_params": route_params,
			"url": url,
			"url_with_domain": url_with_domain,
			"url_params": url_params ? url_params : new Runtime.Map(),
		}));
		let is_domain = url_params ? url_params.get("domain", true) : true;
		return is_domain ? res.get("url_with_domain") : res.get("url");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.routes = new Runtime.Map();
		this.route_params = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Web.RouteList"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.SerializeInterface"]; }
};
window["Runtime.Web.RouteList"] = Runtime.Web.RouteList;