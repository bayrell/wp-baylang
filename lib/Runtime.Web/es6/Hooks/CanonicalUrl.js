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
Runtime.Web.Hooks.CanonicalUrl = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.CanonicalUrl.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.CanonicalUrl.prototype.constructor = Runtime.Web.Hooks.CanonicalUrl;
Object.assign(Runtime.Web.Hooks.CanonicalUrl.prototype,
{
	/**
	 * Setup
	 */
	setup: function(params)
	{
		Runtime.Web.Hooks.AppHook.prototype.setup.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("query"))
		{
			this.query = params.get("query");
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.ROUTE_BEFORE);
	},
	/**
	 * Route before
	 */
	route_before: function(params)
	{
		var container = params.get("container");
		var layout = container.layout;
		var seo = layout.getWidget("seo");
		if (!seo)
		{
			return ;
		}
		if (!layout.route)
		{
			return ;
		}
		if (layout.route.uri == null)
		{
			return ;
		}
		/* Build canonical url */
		var canonical_url = layout.url(layout.route.name, layout.route.matches, Runtime.Map.from({"domain":false}));
		/* Add get parameters */
		var keys = layout.request_query.keys().sort();
		for (var i = 0; i < keys.count(); i++)
		{
			var key = keys.get(i);
			if (!this.query.has(key))
			{
				continue;
			}
			if (this.query.get(key).indexOf(layout.route.name) == -1)
			{
				continue;
			}
			var value = layout.request_query.get(key);
			canonical_url = Runtime.rs.url_get_add(canonical_url, key, value);
		}
		/* Set canonical url */
		seo.setCanonicalUrl(canonical_url);
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.query = null;
	},
});
Object.assign(Runtime.Web.Hooks.CanonicalUrl, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.CanonicalUrl,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.CanonicalUrl";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.CanonicalUrl);
window["Runtime.Web.Hooks.CanonicalUrl"] = Runtime.Web.Hooks.CanonicalUrl;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.CanonicalUrl;