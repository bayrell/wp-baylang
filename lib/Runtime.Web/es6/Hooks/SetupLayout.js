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
Runtime.Web.Hooks.SetupLayout = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.SetupLayout.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.SetupLayout.prototype.constructor = Runtime.Web.Hooks.SetupLayout;
Object.assign(Runtime.Web.Hooks.SetupLayout.prototype,
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
		if (params.has("names"))
		{
			this.names = params.get("names");
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.LAYOUT_MODEL_NAME);
	},
	/**
	 * Layout model name
	 */
	layout_model_name: function(params)
	{
		/* Setup custom model */
		var layout_name = params.get("layout_name");
		if (this.names && this.names.has(layout_name))
		{
			params.set("class_name", this.names.get(layout_name));
		}
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.names = null;
	},
});
Object.assign(Runtime.Web.Hooks.SetupLayout, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.SetupLayout,
{
	/**
	 * Hook factory
	 */
	hook: function(params)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"names":params}));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.SetupLayout";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.SetupLayout);
window["Runtime.Web.Hooks.SetupLayout"] = Runtime.Web.Hooks.SetupLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.SetupLayout;