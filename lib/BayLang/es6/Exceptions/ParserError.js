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
BayLang.Exceptions.ParserError = function(s, caret, file, code, prev)
{
	if (file == undefined) file = "";
	if (code == undefined) code = -1;
	if (prev == undefined) prev = null;
	BayLang.Exceptions.ParserUnknownError.call(this, s, code, prev);
	this.error_line = caret.y + 1;
	this.error_pos = caret.x + 1;
	this.error_file = file;
};
BayLang.Exceptions.ParserError.prototype = Object.create(BayLang.Exceptions.ParserUnknownError.prototype);
BayLang.Exceptions.ParserError.prototype.constructor = BayLang.Exceptions.ParserError;
Object.assign(BayLang.Exceptions.ParserError.prototype,
{
	buildErrorMessage: function()
	{
		var error_str = this.getErrorMessage();
		var file = this.getFileName();
		var line = this.getErrorLine();
		var pos = this.getErrorPos();
		if (line != -1)
		{
			error_str += Runtime.rtl.toStr(" at Ln:" + Runtime.rtl.toStr(line) + Runtime.rtl.toStr(((pos != "") ? (", Pos:" + Runtime.rtl.toStr(pos)) : (""))));
		}
		if (file != "")
		{
			error_str += Runtime.rtl.toStr(" in file:'" + Runtime.rtl.toStr(file) + Runtime.rtl.toStr("'"));
		}
		return error_str;
	},
});
Object.assign(BayLang.Exceptions.ParserError, BayLang.Exceptions.ParserUnknownError);
Object.assign(BayLang.Exceptions.ParserError,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Exceptions";
	},
	getClassName: function()
	{
		return "BayLang.Exceptions.ParserError";
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
Runtime.rtl.defClass(BayLang.Exceptions.ParserError);
window["BayLang.Exceptions.ParserError"] = BayLang.Exceptions.ParserError;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Exceptions.ParserError;