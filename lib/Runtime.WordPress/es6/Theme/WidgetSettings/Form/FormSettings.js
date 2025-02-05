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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.WidgetSettings == 'undefined') Runtime.WordPress.Theme.WidgetSettings = {};
if (typeof Runtime.WordPress.Theme.WidgetSettings.Form == 'undefined') Runtime.WordPress.Theme.WidgetSettings.Form = {};
Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings.prototype.constructor = Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings;
Object.assign(Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "WordPress Form";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "WP_Form";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "Runtime.WordPress.Theme.Components.Form.Form";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "Runtime.WordPress.Theme.Components.Form.FormModel";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "form";
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
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({});
		}});
	},
});
Object.assign(Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings, Runtime.BaseObject);
Object.assign(Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.WidgetSettings.Form";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings);
window["Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings"] = Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings;