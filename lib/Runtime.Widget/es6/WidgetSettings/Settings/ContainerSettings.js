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
Runtime.Widget.WidgetSettings.Settings.ContainerSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.ContainerSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Container";
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
		return "div";
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
		return "container";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
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
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "div")
		{
			return false;
		}
		if (widget.code.items == null)
		{
			return true;
		}
		if (widget.code.items.items.count() == 0)
		{
			return true;
		}
		var item = widget.code.items.items.get(0);
		if (item.constructor.getClassName() == "BayLang.OpCodes.OpHtmlContent")
		{
			return false;
		}
		if (item.constructor.getClassName() == "BayLang.OpCodes.OpHtmlValue")
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
		return true;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from([]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.ContainerSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.ContainerSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ContainerSettings";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.ContainerSettings);
window["Runtime.Widget.WidgetSettings.Settings.ContainerSettings"] = Runtime.Widget.WidgetSettings.Settings.ContainerSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.ContainerSettings;