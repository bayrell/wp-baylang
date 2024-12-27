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
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
Runtime.Widget.WidgetSettings.WidgetManager = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.WidgetManager.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.WidgetManager.prototype.constructor = Runtime.Widget.WidgetSettings.WidgetManager;
Object.assign(Runtime.Widget.WidgetSettings.WidgetManager.prototype,
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
		return Runtime.Map.from({"basic":Runtime.Map.from({"label":"Basic","priority":0}),"widget":Runtime.Map.from({"label":"Widget","priority":100}),"other":Runtime.Map.from({"label":"Basic","priority":9999})});
	},
	/**
	 * Returns list of widget settings
	 */
	getWidgetSettings: function()
	{
		return Runtime.Vector.from([new Runtime.Widget.WidgetSettings.Settings.Html.Div(),new Runtime.Widget.WidgetSettings.Settings.Html.H1(),new Runtime.Widget.WidgetSettings.Settings.Html.H2(),new Runtime.Widget.WidgetSettings.Settings.Html.H3(),new Runtime.Widget.WidgetSettings.Settings.Html.H4(),new Runtime.Widget.WidgetSettings.Settings.Html.H5(),new Runtime.Widget.WidgetSettings.Settings.Html.Link(),new Runtime.Widget.WidgetSettings.Settings.Html.Paragraph(),new Runtime.Widget.WidgetSettings.Settings.Html.Span(),new Runtime.Widget.WidgetSettings.Settings.ButtonSettings(),new Runtime.Widget.WidgetSettings.Settings.ContainerSettings(),new Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings(),new Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings(),new Runtime.Widget.WidgetSettings.Settings.ImageSettings(),new Runtime.Widget.WidgetSettings.Settings.SectionSettings(),new Runtime.Widget.WidgetSettings.Settings.TemplateSettings(),new Runtime.Widget.WidgetSettings.Settings.TextImageSettings()]);
	},
});
Object.assign(Runtime.Widget.WidgetSettings.WidgetManager, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.WidgetManager,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.WidgetManager";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.WidgetManager);
window["Runtime.Widget.WidgetSettings.WidgetManager"] = Runtime.Widget.WidgetSettings.WidgetManager;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.WidgetManager;