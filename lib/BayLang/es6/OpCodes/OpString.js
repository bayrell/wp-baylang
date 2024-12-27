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
if (typeof BayLang.OpCodes == 'undefined') BayLang.OpCodes = {};
BayLang.OpCodes.OpString = function()
{
	BayLang.OpCodes.BaseOpCode.apply(this, arguments);
};
BayLang.OpCodes.OpString.prototype = Object.create(BayLang.OpCodes.BaseOpCode.prototype);
BayLang.OpCodes.OpString.prototype.constructor = BayLang.OpCodes.OpString;
Object.assign(BayLang.OpCodes.OpString.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		BayLang.OpCodes.BaseOpCode.prototype.serialize.call(this, serializer, data);
		serializer.process(this, "value", data);
	},
	_init: function()
	{
		BayLang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_string";
		this.value = "";
	},
});
Object.assign(BayLang.OpCodes.OpString, BayLang.OpCodes.BaseOpCode);
Object.assign(BayLang.OpCodes.OpString,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.OpCodes";
	},
	getClassName: function()
	{
		return "BayLang.OpCodes.OpString";
	},
	getParentClassName: function()
	{
		return "BayLang.OpCodes.BaseOpCode";
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
Runtime.rtl.defClass(BayLang.OpCodes.OpString);
window["BayLang.OpCodes.OpString"] = BayLang.OpCodes.OpString;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.OpCodes.OpString;