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
BayLang.OpCodes.OpMath = function()
{
	BayLang.OpCodes.BaseOpCode.apply(this, arguments);
};
BayLang.OpCodes.OpMath.prototype = Object.create(BayLang.OpCodes.BaseOpCode.prototype);
BayLang.OpCodes.OpMath.prototype.constructor = BayLang.OpCodes.OpMath;
Object.assign(BayLang.OpCodes.OpMath.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		BayLang.OpCodes.BaseOpCode.prototype.serialize.call(this, serializer, data);
		serializer.process(this, "math", data);
		serializer.process(this, "value1", data);
		serializer.process(this, "value2", data);
	},
	_init: function()
	{
		BayLang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_math";
		this.value1 = null;
		this.value2 = null;
		this.math = "";
	},
});
Object.assign(BayLang.OpCodes.OpMath, BayLang.OpCodes.BaseOpCode);
Object.assign(BayLang.OpCodes.OpMath,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.OpCodes";
	},
	getClassName: function()
	{
		return "BayLang.OpCodes.OpMath";
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
Runtime.rtl.defClass(BayLang.OpCodes.OpMath);
window["BayLang.OpCodes.OpMath"] = BayLang.OpCodes.OpMath;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.OpCodes.OpMath;