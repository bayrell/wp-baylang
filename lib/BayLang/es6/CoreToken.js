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
BayLang.CoreToken = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
BayLang.CoreToken.prototype = Object.create(Runtime.BaseStruct.prototype);
BayLang.CoreToken.prototype.constructor = BayLang.CoreToken;
Object.assign(BayLang.CoreToken.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.kind = "";
		this.content = "";
		this.caret_start = null;
		this.caret_end = null;
		this.eof = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "kind")return this.kind;
		else if (k == "content")return this.content;
		else if (k == "caret_start")return this.caret_start;
		else if (k == "caret_end")return this.caret_end;
		else if (k == "eof")return this.eof;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(BayLang.CoreToken, Runtime.BaseStruct);
Object.assign(BayLang.CoreToken,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang";
	},
	getClassName: function()
	{
		return "BayLang.CoreToken";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
		a.push("kind");
		a.push("content");
		a.push("caret_start");
		a.push("caret_end");
		a.push("eof");
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
Runtime.rtl.defClass(BayLang.CoreToken);
window["BayLang.CoreToken"] = BayLang.CoreToken;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.CoreToken;