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
if (typeof BayLang.Exceptions == 'undefined') BayLang.Exceptions = {};
BayLang.Exceptions.ParserExpected = function(s, caret, file, prev)
{
	if (file == undefined) file = "";
	if (prev == undefined) prev = null;
	BayLang.Exceptions.ParserError.call(this, s + Runtime.rtl.toStr(" expected"), caret, file, BayLang.LangConstant.ERROR_PARSER_EXPECTED, prev);
};
BayLang.Exceptions.ParserExpected.prototype = Object.create(BayLang.Exceptions.ParserError.prototype);
BayLang.Exceptions.ParserExpected.prototype.constructor = BayLang.Exceptions.ParserExpected;
Object.assign(BayLang.Exceptions.ParserExpected.prototype,
{
});
Object.assign(BayLang.Exceptions.ParserExpected, BayLang.Exceptions.ParserError);
Object.assign(BayLang.Exceptions.ParserExpected,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Exceptions";
	},
	getClassName: function()
	{
		return "BayLang.Exceptions.ParserExpected";
	},
	getParentClassName: function()
	{
		return "BayLang.Exceptions.ParserError";
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
Runtime.rtl.defClass(BayLang.Exceptions.ParserExpected);
window["BayLang.Exceptions.ParserExpected"] = BayLang.Exceptions.ParserExpected;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Exceptions.ParserExpected;