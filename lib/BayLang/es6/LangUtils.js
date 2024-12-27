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
BayLang.LangUtils = function()
{
};
Object.assign(BayLang.LangUtils.prototype,
{
});
Object.assign(BayLang.LangUtils,
{
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(parser, text)
	{
		var res = parser.constructor.parse(parser, text);
		return Runtime.rtl.attr(res, 1);
	},
	/**
	 * Translate BaseOpCode to string
	 */
	translate: function(translator, op_code)
	{
		var res = translator.constructor.translate(translator, op_code);
		return Runtime.rtl.attr(res, 1);
	},
	/**
	 * Create translator
	 */
	createTranslator: function(lang)
	{
		if (lang == undefined) lang = "";
		var t = null;
		if (lang == "bay")
		{
			t = new BayLang.LangBay.TranslatorBay();
			t.reset();
		}
		else if (lang == "es6")
		{
			t = new BayLang.LangES6.TranslatorES6();
			t = t.constructor.reset(t);
		}
		else if (lang == "nodejs")
		{
			t = new BayLang.LangNode.TranslatorNode();
			t = t.constructor.reset(t);
		}
		else if (lang == "php")
		{
			t = new BayLang.LangPHP.TranslatorPHP();
			t = t.constructor.reset(t);
		}
		return t;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang";
	},
	getClassName: function()
	{
		return "BayLang.LangUtils";
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
Runtime.rtl.defClass(BayLang.LangUtils);
window["BayLang.LangUtils"] = BayLang.LangUtils;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangUtils;