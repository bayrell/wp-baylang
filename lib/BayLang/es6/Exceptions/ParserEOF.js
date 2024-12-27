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
BayLang.Exceptions.ParserEOF = function(prev)
{
	if (prev == undefined) prev = null;
	BayLang.Exceptions.ParserUnknownError.call(this, "ERROR_PARSER_EOF", BayLang.LangConstant.ERROR_PARSER_EOF, prev);
};
BayLang.Exceptions.ParserEOF.prototype = Object.create(BayLang.Exceptions.ParserUnknownError.prototype);
BayLang.Exceptions.ParserEOF.prototype.constructor = BayLang.Exceptions.ParserEOF;
Object.assign(BayLang.Exceptions.ParserEOF.prototype,
{
});
Object.assign(BayLang.Exceptions.ParserEOF, BayLang.Exceptions.ParserUnknownError);
Object.assign(BayLang.Exceptions.ParserEOF,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Exceptions";
	},
	getClassName: function()
	{
		return "BayLang.Exceptions.ParserEOF";
	},
	getParentClassName: function()
	{
		return "BayLang.Exceptions.ParserUnknownError";
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
Runtime.rtl.defClass(BayLang.Exceptions.ParserEOF);
window["BayLang.Exceptions.ParserEOF"] = BayLang.Exceptions.ParserEOF;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Exceptions.ParserEOF;