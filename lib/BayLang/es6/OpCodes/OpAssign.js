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
BayLang.OpCodes.OpAssign = function()
{
	BayLang.OpCodes.BaseOpCode.apply(this, arguments);
};
BayLang.OpCodes.OpAssign.prototype = Object.create(BayLang.OpCodes.BaseOpCode.prototype);
BayLang.OpCodes.OpAssign.prototype.constructor = BayLang.OpCodes.OpAssign;
Object.assign(BayLang.OpCodes.OpAssign.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		BayLang.OpCodes.BaseOpCode.prototype.serialize.call(this, serializer, data);
		serializer.process(this, "annotations", data);
		serializer.process(this, "comments", data);
		serializer.process(this, "condition", data);
		serializer.process(this, "expression", data);
		serializer.process(this, "flags", data);
		serializer.process(this, "kind", data);
		serializer.process(this, "names", data);
		serializer.process(this, "pattern", data);
		serializer.process(this, "values", data);
		serializer.process(this, "var_name", data);
	},
	_init: function()
	{
		BayLang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.kind = "";
		this.var_name = "";
		this.flags = null;
		this.pattern = null;
		this.annotations = null;
		this.comments = null;
		this.values = null;
		this.names = null;
		this.expression = null;
		this.condition = null;
	},
});
Object.assign(BayLang.OpCodes.OpAssign, BayLang.OpCodes.BaseOpCode);
Object.assign(BayLang.OpCodes.OpAssign,
{
	KIND_ASSIGN: "assign",
	KIND_DECLARE: "declare",
	KIND_STRUCT: "struct",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.OpCodes";
	},
	getClassName: function()
	{
		return "BayLang.OpCodes.OpAssign";
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
Runtime.rtl.defClass(BayLang.OpCodes.OpAssign);
window["BayLang.OpCodes.OpAssign"] = BayLang.OpCodes.OpAssign;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.OpCodes.OpAssign;