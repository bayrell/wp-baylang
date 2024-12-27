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
BayLang.OpCodes.OpCall = function()
{
	BayLang.OpCodes.BaseOpCode.apply(this, arguments);
};
BayLang.OpCodes.OpCall.prototype = Object.create(BayLang.OpCodes.BaseOpCode.prototype);
BayLang.OpCodes.OpCall.prototype.constructor = BayLang.OpCodes.OpCall;
Object.assign(BayLang.OpCodes.OpCall.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		BayLang.OpCodes.BaseOpCode.prototype.serialize.call(this, serializer, data);
		serializer.process(this, "args", data);
		serializer.process(this, "is_await", data);
		serializer.process(this, "is_context", data);
		serializer.process(this, "is_html", data);
		serializer.process(this, "obj", data);
	},
	_init: function()
	{
		BayLang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_call";
		this.obj = null;
		this.args = null;
		this.is_await = false;
		this.is_context = true;
		this.is_html = false;
	},
});
Object.assign(BayLang.OpCodes.OpCall, BayLang.OpCodes.BaseOpCode);
Object.assign(BayLang.OpCodes.OpCall,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.OpCodes";
	},
	getClassName: function()
	{
		return "BayLang.OpCodes.OpCall";
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
Runtime.rtl.defClass(BayLang.OpCodes.OpCall);
window["BayLang.OpCodes.OpCall"] = BayLang.OpCodes.OpCall;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.OpCodes.OpCall;