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
BayLang.OpCodes.BaseOpCode = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
BayLang.OpCodes.BaseOpCode.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.OpCodes.BaseOpCode.prototype.constructor = BayLang.OpCodes.BaseOpCode;
Object.assign(BayLang.OpCodes.BaseOpCode.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "caret_start", data);
		serializer.process(this, "caret_end", data);
	},
	/**
	 * Is multiline
	 */
	isMultiLine: function()
	{
		if (!this.caret_start)
		{
			return true;
		}
		if (!this.caret_end)
		{
			return true;
		}
		return this.caret_start.y != this.caret_end.y;
	},
	/**
	 * Clone this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	clone: function(obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto);
		item = Object.assign(item, this);
		item._assign_values(obj);
		
		return item;
		return this;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	copy: function(obj)
	{
		if (obj == undefined) obj = null;
		return this.clone(obj);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.caret_start = null;
		this.caret_end = null;
	},
});
Object.assign(BayLang.OpCodes.BaseOpCode, Runtime.BaseObject);
Object.assign(BayLang.OpCodes.BaseOpCode,
{
	op: "",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.OpCodes";
	},
	getClassName: function()
	{
		return "BayLang.OpCodes.BaseOpCode";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(BayLang.OpCodes.BaseOpCode);
window["BayLang.OpCodes.BaseOpCode"] = BayLang.OpCodes.BaseOpCode;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.OpCodes.BaseOpCode;