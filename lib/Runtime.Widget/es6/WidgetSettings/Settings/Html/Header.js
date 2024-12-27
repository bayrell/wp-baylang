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
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.Header = function()
{
	Runtime.Widget.WidgetSettings.Settings.ContainerSettings.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.Header;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Header 1";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "page_title";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		return false;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return true;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName", Runtime.Map.from({"props":Runtime.Map.from({"show_select_value":false,"options":Runtime.Vector.from([Runtime.Map.from({"key":"","value":"Text"}),Runtime.Map.from({"key":"h1","value":"H1"}),Runtime.Map.from({"key":"h2","value":"H2"}),Runtime.Map.from({"key":"h3","value":"H3"}),Runtime.Map.from({"key":"h4","value":"H4"}),Runtime.Map.from({"key":"h5","value":"H5"}),Runtime.Map.from({"key":"p","value":"Paragraph"}),Runtime.Map.from({"key":"span","value":"Span"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml"),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent")]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from(["<template>Header</template>"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Header, Runtime.Widget.WidgetSettings.Settings.ContainerSettings);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Header,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Header";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ContainerSettings";
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
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.Header);
window["Runtime.Widget.WidgetSettings.Settings.Html.Header"] = Runtime.Widget.WidgetSettings.Settings.Html.Header;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.Header;