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
Runtime.Web.Hooks.ResponseHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.ResponseHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.ResponseHook.prototype.constructor = Runtime.Web.Hooks.ResponseHook;
Object.assign(Runtime.Web.Hooks.ResponseHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.RESPONSE, 9999);
	},
	/**
	 * Response
	 */
	response: async function(params)
	{
		var container = params.get("container");
		var response = container.response;
		if (!(response instanceof Runtime.Web.RenderResponse))
		{
			return Promise.resolve();
		}
		if (response.content != null)
		{
			return Promise.resolve();
		}
		var class_name = container.layout.getCoreUI();
		if (class_name == null)
		{
			throw new Runtime.Exceptions.RuntimeException("Class name is null")
		}
		/* Create component */
		var component = Runtime.rtl.newInstance(class_name);
		component.container = container;
		component.layout = container.layout;
		component.model = container.layout;
		/* Render component */
		var content = "<!doctype html>\n";
		content += Runtime.rtl.toStr(Runtime.RawString.normalize(component.render()));
		/* Set result */
		response.content = content;
		return Promise.resolve(params);
	},
});
Object.assign(Runtime.Web.Hooks.ResponseHook, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.ResponseHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.ResponseHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.ResponseHook);
window["Runtime.Web.Hooks.ResponseHook"] = Runtime.Web.Hooks.ResponseHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.ResponseHook;