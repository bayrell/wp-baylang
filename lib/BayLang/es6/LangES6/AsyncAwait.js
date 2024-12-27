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
if (typeof BayLang.LangES6 == 'undefined') BayLang.LangES6 = {};
BayLang.LangES6.AsyncAwait = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
BayLang.LangES6.AsyncAwait.prototype = Object.create(Runtime.BaseStruct.prototype);
BayLang.LangES6.AsyncAwait.prototype.constructor = BayLang.LangES6.AsyncAwait;
Object.assign(BayLang.LangES6.AsyncAwait.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.start_pos = "";
		this.end_pos = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "start_pos")return this.start_pos;
		else if (k == "end_pos")return this.end_pos;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(BayLang.LangES6.AsyncAwait, Runtime.BaseStruct);
Object.assign(BayLang.LangES6.AsyncAwait,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangES6";
	},
	getClassName: function()
	{
		return "BayLang.LangES6.AsyncAwait";
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
		a.push("start_pos");
		a.push("end_pos");
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
Runtime.rtl.defClass(BayLang.LangES6.AsyncAwait);
window["BayLang.LangES6.AsyncAwait"] = BayLang.LangES6.AsyncAwait;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangES6.AsyncAwait;