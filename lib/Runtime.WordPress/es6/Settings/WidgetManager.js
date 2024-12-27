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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Settings == 'undefined') Runtime.WordPress.Settings = {};
Runtime.WordPress.Settings.WidgetManager = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.WordPress.Settings.WidgetManager.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.WordPress.Settings.WidgetManager.prototype.constructor = Runtime.WordPress.Settings.WidgetManager;
Object.assign(Runtime.WordPress.Settings.WidgetManager.prototype,
{
	/**
	 * Init widgets
	 */
	init: function(provider)
	{
	},
	/**
	 * Returns group settings
	 */
	getGroupSettings: function()
	{
		return Runtime.Map.from({});
	},
	/**
	 * Returns list of widget settings
	 */
	getWidgetSettings: function()
	{
		return Runtime.Vector.from([new Runtime.WordPress.Settings.FormModelSettings(),new Runtime.WordPress.Settings.FormSettings()]);
	},
});
Object.assign(Runtime.WordPress.Settings.WidgetManager, Runtime.BaseObject);
Object.assign(Runtime.WordPress.Settings.WidgetManager,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Settings.WidgetManager";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetManagerInterface,
	],
});
Runtime.rtl.defClass(Runtime.WordPress.Settings.WidgetManager);
window["Runtime.WordPress.Settings.WidgetManager"] = Runtime.WordPress.Settings.WidgetManager;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Settings.WidgetManager;