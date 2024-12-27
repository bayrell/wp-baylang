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
Runtime.Web.Hooks.ApiPrefix = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.ApiPrefix.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.ApiPrefix.prototype.constructor = Runtime.Web.Hooks.ApiPrefix;
Object.assign(Runtime.Web.Hooks.ApiPrefix.prototype,
{
	/**
	 * Setup hook params
	 */
	setup: function(params)
	{
		if (params == null)
		{
			return ;
		}
		if (params.has("prefix"))
		{
			this.prefix = params.get("prefix");
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.ROUTES_INIT);
		this.register(this.constructor.CALL_API_BEFORE);
	},
	/**
	 * Routes init
	 */
	routes_init: function(params)
	{
		var routes = params.get("routes");
		var pos = routes.routes_list.find(Runtime.lib.equalAttr("name", "runtime:web:api"));
		if (pos >= 0)
		{
			var route = routes.routes_list.get(pos);
			route = Runtime.rtl.setAttr(route, Runtime.Collection.from(["uri"]), this.prefix + Runtime.rtl.toStr("/api/{service}/{api_name}/{method_name}/"));
			routes.routes_list.set(pos, route);
		}
	},
	/**
	 * Call api before
	 */
	call_api_before: function(params)
	{
		params.set("api_url", this.prefix + Runtime.rtl.toStr(params.get("api_url")));
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.prefix = "";
	},
});
Object.assign(Runtime.Web.Hooks.ApiPrefix, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.ApiPrefix,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.ApiPrefix";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.ApiPrefix);
window["Runtime.Web.Hooks.ApiPrefix"] = Runtime.Web.Hooks.ApiPrefix;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.ApiPrefix;