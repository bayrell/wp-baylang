"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2024 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.Web.Hooks.LayoutHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.LayoutHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.LayoutHook.prototype.constructor = Runtime.Web.Hooks.LayoutHook;
Object.assign(Runtime.Web.Hooks.LayoutHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.ROUTE_BEFORE, 0);
	},
	/**
	 * Route before
	 */
	route_before: async function(params)
	{
		var container = params.get("container");
		/* Setup client ip */
		this.setupClientIP(container);
		/* Setup layout */
		this.setupLayoutRequest(container);
		/* Setup urls */
		this.setupLayoutRoutes(container);
	},
	/**
	 * Setup client ip
	 */
	setupClientIP: function(container)
	{
		var client_ip = container.request.getClientIp();
		container.layout.backend_storage.set("client_ip", client_ip);
	},
	/**
	 * Setup layout request
	 */
	setupLayoutRequest: function(container)
	{
		container.layout.route = container.route;
		container.layout.request_https = container.request.is_https;
		container.layout.request_host = container.request.host;
		container.layout.request_uri = container.request.uri;
		container.layout.request_full_uri = container.request.full_uri;
		container.layout.request_query = container.request.query;
	},
	/**
	 * Setup layout routes
	 */
	setupLayoutRoutes: function(container)
	{
		container.layout.routes = Runtime.Map.from({});
		var routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteList");
		var routes_list = routes.routes_list;
		for (var i = 0; i < routes_list.count(); i++)
		{
			var route = routes_list.get(i);
			if (route.is_backend)
			{
				continue;
			}
			container.layout.routes.set(route.name, Runtime.Map.from({"uri":route.uri,"domain":route.domain}));
		}
	},
});
Object.assign(Runtime.Web.Hooks.LayoutHook, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.LayoutHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.LayoutHook";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Hooks.LayoutHook);
window["Runtime.Web.Hooks.LayoutHook"] = Runtime.Web.Hooks.LayoutHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.LayoutHook;