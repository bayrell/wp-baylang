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
Runtime.Web.Hooks.Components = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.Components.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.Components.prototype.constructor = Runtime.Web.Hooks.Components;
Object.assign(Runtime.Web.Hooks.Components.prototype,
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
		if (params.has("components"))
		{
			this.items.set("components", params.get("components"));
		}
		if (params.has("footer"))
		{
			this.items.set("footer", params.get("footer"));
		}
		if (params.has("header"))
		{
			this.items.set("header", params.get("header"));
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.COMPONENTS);
	},
	/**
	 * Components
	 */
	components: function(params)
	{
		params.get("components").appendItems(this.items.get("components"));
	},
	/**
	 * Render head
	 */
	render_head: function(params)
	{
		params.get("components").appendItems(this.items.get("header"));
	},
	/**
	 * Render footer
	 */
	render_footer: function(params)
	{
		params.get("components").appendItems(this.items.get("footer"));
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.items = Runtime.Map.from({"components":Runtime.Vector.from([]),"footer":Runtime.Vector.from([]),"header":Runtime.Vector.from([])});
	},
});
Object.assign(Runtime.Web.Hooks.Components, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.Components,
{
	/**
	 * Hook factory
	 */
	hook: function(items)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"components":items}));
	},
	/**
	 * Hook factory
	 */
	header: function(items)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"header":items}));
	},
	/**
	 * Hook factory
	 */
	footer: function(items)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"footer":items}));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.Components";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.Components);
window["Runtime.Web.Hooks.Components"] = Runtime.Web.Hooks.Components;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.Components;