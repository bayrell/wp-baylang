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
BayLang.Constructor.WidgetPage.WidgetManagerAnnotation = function()
{
	Runtime.Entity.Factory.apply(this, arguments);
};
BayLang.Constructor.WidgetPage.WidgetManagerAnnotation.prototype = Object.create(Runtime.Entity.Factory.prototype);
BayLang.Constructor.WidgetPage.WidgetManagerAnnotation.prototype.constructor = BayLang.Constructor.WidgetPage.WidgetManagerAnnotation;
Object.assign(BayLang.Constructor.WidgetPage.WidgetManagerAnnotation.prototype,
{
});
Object.assign(BayLang.Constructor.WidgetPage.WidgetManagerAnnotation, Runtime.Entity.Factory);
Object.assign(BayLang.Constructor.WidgetPage.WidgetManagerAnnotation,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.WidgetManagerAnnotation";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Factory";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.WidgetManagerAnnotation);
window["BayLang.Constructor.WidgetPage.WidgetManagerAnnotation"] = BayLang.Constructor.WidgetPage.WidgetManagerAnnotation;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.WidgetManagerAnnotation;