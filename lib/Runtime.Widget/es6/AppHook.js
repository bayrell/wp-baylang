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
Runtime.Widget.AppHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Widget.AppHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Widget.AppHook.prototype.constructor = Runtime.Widget.AppHook;
Object.assign(Runtime.Widget.AppHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.COMPONENTS, 10);
	},
	/**
	 * Components
	 */
	components: function(params)
	{
		var components = Runtime.Vector.from(["Runtime.Widget.CSS"]);
		components.appendItems(Runtime.rtl.attr(params, "components"));
		params.set("components", components);
	},
});
Object.assign(Runtime.Widget.AppHook, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Widget.AppHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.AppHook";
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
Runtime.rtl.defClass(Runtime.Widget.AppHook);
window["Runtime.Widget.AppHook"] = Runtime.Widget.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.AppHook;