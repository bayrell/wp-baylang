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
Runtime.Widget.WidgetSettings.Settings.Html.H4 = function()
{
	Runtime.Widget.WidgetSettings.Settings.Html.Header.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.H4.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.H4.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.H4;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H4.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Header 4";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "h4";
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
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "h4")
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
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H4, Runtime.Widget.WidgetSettings.Settings.Html.Header);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H4,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.H4";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Header";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.H4);
window["Runtime.Widget.WidgetSettings.Settings.Html.H4"] = Runtime.Widget.WidgetSettings.Settings.Html.H4;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.H4;