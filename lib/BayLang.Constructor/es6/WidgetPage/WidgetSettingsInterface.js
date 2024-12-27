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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.WidgetPage == 'undefined') BayLang.Constructor.WidgetPage = {};
BayLang.Constructor.WidgetPage.WidgetSettingsInterface = function()
{
};
Object.assign(BayLang.Constructor.WidgetPage.WidgetSettingsInterface.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
	},
});
Object.assign(BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
{
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.WidgetSettingsInterface";
	},
});
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.WidgetSettingsInterface);
window["BayLang.Constructor.WidgetPage.WidgetSettingsInterface"] = BayLang.Constructor.WidgetPage.WidgetSettingsInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.WidgetSettingsInterface;