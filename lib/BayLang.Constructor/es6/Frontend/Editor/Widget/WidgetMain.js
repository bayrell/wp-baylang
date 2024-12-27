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
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Editor == 'undefined') BayLang.Constructor.Frontend.Editor = {};
if (typeof BayLang.Constructor.Frontend.Editor.Widget == 'undefined') BayLang.Constructor.Frontend.Editor.Widget = {};
BayLang.Constructor.Frontend.Editor.Widget.WidgetMain = function()
{
	BayLang.Constructor.Frontend.Editor.Widget.WidgetTag.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Widget.WidgetMain.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Widget.WidgetTag.prototype);
BayLang.Constructor.Frontend.Editor.Widget.WidgetMain.prototype.constructor = BayLang.Constructor.Frontend.Editor.Widget.WidgetMain;
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetMain.prototype,
{
	/**
	 * Setup settings
	 */
	setupSettings: function()
	{
		/* Setup settings */
		this.settings = this.page_model.getFrameEditor().get("Runtime.Widget.WidgetSettings.Settings.TemplateSettings");
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetMain, BayLang.Constructor.Frontend.Editor.Widget.WidgetTag);
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetMain,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.WidgetMain";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.WidgetTag";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Widget.WidgetMain);
window["BayLang.Constructor.Frontend.Editor.Widget.WidgetMain"] = BayLang.Constructor.Frontend.Editor.Widget.WidgetMain;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Widget.WidgetMain;