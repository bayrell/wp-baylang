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
Runtime.Web.Hooks.WidgetModelFactory = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.WidgetModelFactory.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.WidgetModelFactory.prototype.constructor = Runtime.Web.Hooks.WidgetModelFactory;
Object.assign(Runtime.Web.Hooks.WidgetModelFactory.prototype,
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
		if (params.has("model_name"))
		{
			this.model_name = params.get("model_name");
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
	},
	/**
	 * Route before
	 */
	route_before: function(params)
	{
		var container = params.get("container");
		if (container.response != null)
		{
			return ;
		}
		/* Add widget */
		container.layout.addWidget(this.model_name);
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.model_name = "";
	},
});
Object.assign(Runtime.Web.Hooks.WidgetModelFactory, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.WidgetModelFactory,
{
	/**
	 * Create hook
	 */
	hook: function(model_name)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"model_name":model_name}));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.WidgetModelFactory";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.WidgetModelFactory);
window["Runtime.Web.Hooks.WidgetModelFactory"] = Runtime.Web.Hooks.WidgetModelFactory;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.WidgetModelFactory;