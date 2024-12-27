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
Runtime.Widget.WidgetSettings.Settings.TextImageSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.TextImageSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.TextImageSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.TextImageSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.TextImageSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "TextImage";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "TextImage";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "Runtime.Widget.TextImage";
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
		return "text_image";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "widget";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.component_class_name != this.getComponentName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"kind","label":"Kind","component":"Runtime.Widget.Select","default":"text_right","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":"text_right","value":"Text right"}),Runtime.Map.from({"key":"text_left","value":"Text left"}),Runtime.Map.from({"key":"text_top","value":"Text top"}),Runtime.Map.from({"key":"text_bottom","value":"Text bottom"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"image","label":"Image","component":"BayLang.Constructor.Frontend.Components.SelectImageButton"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"content","label":"Content","component":"Runtime.Widget.TextEditable"}))]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from(["<use name='Runtime.Widget.Image' component='true' />","<use name='Runtime.Widget.Text' component='true' />","<style>","%(TextImage)widget_text_image{","\t&__image{","\t}","\t&__text{","\t}","}","</style>"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.TextImageSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.TextImageSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.TextImageSettings";
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
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.TextImageSettings);
window["Runtime.Widget.WidgetSettings.Settings.TextImageSettings"] = Runtime.Widget.WidgetSettings.Settings.TextImageSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.TextImageSettings;