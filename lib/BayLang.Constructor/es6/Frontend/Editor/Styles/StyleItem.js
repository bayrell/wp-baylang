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
if (typeof BayLang.Constructor.Frontend.Editor.Styles == 'undefined') BayLang.Constructor.Frontend.Editor.Styles = {};
BayLang.Constructor.Frontend.Editor.Styles.StyleItem = function()
{
};
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.StyleItem.prototype,
{
	/**
	 * Build value
	 */
	buildValue: function()
	{
		return this.value;
	},
	/**
	 * Init value
	 */
	initValue: function(value)
	{
		this.value = value;
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		this.value = value;
	},
	/**
	 * Returns value
	 */
	getValue: function()
	{
		return this.value;
	},
	_init: function()
	{
		this.key = "";
		this.value = "";
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.StyleItem,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.StyleItem";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Styles.StyleItem);
window["BayLang.Constructor.Frontend.Editor.Styles.StyleItem"] = BayLang.Constructor.Frontend.Editor.Styles.StyleItem;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Styles.StyleItem;