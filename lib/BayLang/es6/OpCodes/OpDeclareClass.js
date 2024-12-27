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
BayLang.OpCodes.OpDeclareClass = function()
{
	BayLang.OpCodes.BaseOpCode.apply(this, arguments);
};
BayLang.OpCodes.OpDeclareClass.prototype = Object.create(BayLang.OpCodes.BaseOpCode.prototype);
BayLang.OpCodes.OpDeclareClass.prototype.constructor = BayLang.OpCodes.OpDeclareClass;
Object.assign(BayLang.OpCodes.OpDeclareClass.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		BayLang.OpCodes.BaseOpCode.prototype.serialize.call(this, serializer, data);
		serializer.process(this, "annotations", data);
		serializer.process(this, "class_extends", data);
		serializer.process(this, "class_implements", data);
		serializer.process(this, "comments", data);
		serializer.process(this, "extend_name", data);
		serializer.process(this, "flags", data);
		serializer.process(this, "fn_create", data);
		serializer.process(this, "fn_destroy", data);
		serializer.process(this, "functions", data);
		serializer.process(this, "is_abstract", data);
		serializer.process(this, "is_component", data);
		serializer.process(this, "is_declare", data);
		serializer.process(this, "is_model", data);
		serializer.process(this, "items", data);
		serializer.process(this, "kind", data);
		serializer.process(this, "name", data);
		serializer.process(this, "template", data);
		serializer.process(this, "vars", data);
	},
	/**
	 * Find function
	 */
	findFunction: function(name)
	{
		return this.items.findItem((op_code) =>
		{
			return op_code instanceof BayLang.OpCodes.OpDeclareFunction && op_code.name == name;
		});
	},
	_init: function()
	{
		BayLang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_class";
		this.kind = "";
		this.name = "";
		this.extend_name = "";
		this.annotations = null;
		this.comments = null;
		this.template = null;
		this.flags = null;
		this.fn_create = null;
		this.fn_destroy = null;
		this.class_extends = null;
		this.class_implements = null;
		this.vars = null;
		this.functions = null;
		this.items = null;
		this.is_abstract = false;
		this.is_static = false;
		this.is_declare = false;
		this.is_component = false;
		this.is_model = false;
	},
});
Object.assign(BayLang.OpCodes.OpDeclareClass, BayLang.OpCodes.BaseOpCode);
Object.assign(BayLang.OpCodes.OpDeclareClass,
{
	KIND_CLASS: "class",
	KIND_STRUCT: "struct",
	KIND_INTERFACE: "interface",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.OpCodes";
	},
	getClassName: function()
	{
		return "BayLang.OpCodes.OpDeclareClass";
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
Runtime.rtl.defClass(BayLang.OpCodes.OpDeclareClass);
window["BayLang.OpCodes.OpDeclareClass"] = BayLang.OpCodes.OpDeclareClass;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.OpCodes.OpDeclareClass;