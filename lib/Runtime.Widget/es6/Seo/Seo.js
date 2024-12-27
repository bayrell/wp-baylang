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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Seo == 'undefined') Runtime.Widget.Seo = {};
Runtime.Widget.Seo.Seo = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Widget.Seo.Seo.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Widget.Seo.Seo.prototype.constructor = Runtime.Widget.Seo.Seo;
Object.assign(Runtime.Widget.Seo.Seo.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.CREATE_LAYOUT);
		this.register(this.constructor.RENDER_HEAD);
		this.register(this.constructor.ROUTE_BEFORE);
	},
	/**
	 * Create layout
	 */
	create_layout: async function(params)
	{
		var container = params.get("container");
		container.layout.addWidget("Runtime.Widget.Seo.SeoModel");
	},
	/**
	 * Render head
	 */
	render_head: function(params)
	{
		var layout = params.get("layout");
		var seo = layout.getWidget("seo");
		if (seo)
		{
			params.get("components").push(seo);
		}
	},
	/**
	 * Route before
	 */
	route_before: function(params)
	{
		var container = params.get("container");
		/* If page model exists */
		if (container.route == null)
		{
			return ;
		}
		if (container.route.data == null)
		{
			return ;
		}
		/* Setup route data */
		var seo = container.layout.getWidget("seo");
		var route_data = container.route.data;
		if (route_data.has("title"))
		{
			container.layout.setPageTitle(route_data.get("title"));
		}
		if (route_data.has("description"))
		{
			seo.description = route_data.get("description");
		}
		if (route_data.has("robots"))
		{
			seo.robots = route_data.get("robots");
		}
	},
});
Object.assign(Runtime.Widget.Seo.Seo, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Widget.Seo.Seo,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Seo";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Seo.Seo";
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
Runtime.rtl.defClass(Runtime.Widget.Seo.Seo);
window["Runtime.Widget.Seo.Seo"] = Runtime.Widget.Seo.Seo;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Seo.Seo;