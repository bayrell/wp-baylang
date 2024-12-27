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
BayLang.Constructor.Frontend.Editor.Widget.WidgetRender = function()
{
	BayLang.Constructor.Frontend.Editor.Widget.Widget.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Widget.WidgetRender.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Widget.Widget.prototype);
BayLang.Constructor.Frontend.Editor.Widget.WidgetRender.prototype.constructor = BayLang.Constructor.Frontend.Editor.Widget.WidgetRender;
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetRender.prototype,
{
	/**
	 * Returns true if component
	 */
	isComponent: function()
	{
		return true;
	},
	/**
	 * Returns true if component has model
	 */
	isModel: function()
	{
		return true;
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Widget.Widget.prototype._init.call(this);
		this.model_class_name = null;
		this.primary_model_code = null;
		this.model_codes = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetRender, BayLang.Constructor.Frontend.Editor.Widget.Widget);
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetRender,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.WidgetRender";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.Widget";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Widget.WidgetRender);
window["BayLang.Constructor.Frontend.Editor.Widget.WidgetRender"] = BayLang.Constructor.Frontend.Editor.Widget.WidgetRender;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Widget.WidgetRender;