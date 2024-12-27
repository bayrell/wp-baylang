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
BayLang.CoreTranslator = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
BayLang.CoreTranslator.prototype = Object.create(Runtime.BaseStruct.prototype);
BayLang.CoreTranslator.prototype.constructor = BayLang.CoreTranslator;
Object.assign(BayLang.CoreTranslator.prototype,
{
	/**
	 * Set preprocessor flag
	 */
	setFlag: function(flag_name, value)
	{
		var t = this;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["preprocessor_flags", flag_name]), value);
		return t;
	},
	/**
	 * Find save op code
	 */
	findSaveOpCode: function(op_code)
	{
		return this.save_op_codes.findItem(Runtime.lib.equalAttr("op_code", op_code));
	},
	/**
	 * Increment indent level
	 */
	levelInc: function()
	{
		return this.copy(Runtime.Map.from({"indent_level":this.indent_level + 1}));
	},
	/**
	 * Decrease indent level
	 */
	levelDec: function()
	{
		return this.copy(Runtime.Map.from({"indent_level":this.indent_level - 1}));
	},
	/**
	 * Output content with indent
	 */
	s: function(s, content)
	{
		if (content == undefined) content = null;
		if (s == "")
		{
			return "";
		}
		if (content === "")
		{
			return s;
		}
		return this.crlf + Runtime.rtl.toStr(Runtime.rs.str_repeat(this.indent, this.indent_level)) + Runtime.rtl.toStr(s);
	},
	/**
	 * Output content with indent
	 */
	s2: function(s)
	{
		return this.crlf + Runtime.rtl.toStr(Runtime.rs.str_repeat(this.indent, this.indent_level)) + Runtime.rtl.toStr(s);
	},
	/**
	 * Output content with opcode level
	 */
	o: function(s, opcode_level_in, opcode_level_out)
	{
		if (opcode_level_in < opcode_level_out)
		{
			return "(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
		}
		return s;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.current_namespace_name = "";
		this.current_class_name = "";
		this.current_class_full_name = "";
		this.current_class_extends_name = "";
		this.current_class = null;
		this.current_function = null;
		this.modules = null;
		this.vars = null;
		this.save_vars = null;
		this.save_op_codes = null;
		this.save_op_code_inc = 0;
		this.is_static_function = false;
		this.is_operation = false;
		this.opcode_level = 0;
		this.indent_level = 0;
		this.indent = "\t";
		this.crlf = "\n";
		this.flag_struct_check_types = false;
		this.preprocessor_flags = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "current_namespace_name")return this.current_namespace_name;
		else if (k == "current_class_name")return this.current_class_name;
		else if (k == "current_class_full_name")return this.current_class_full_name;
		else if (k == "current_class_extends_name")return this.current_class_extends_name;
		else if (k == "current_class")return this.current_class;
		else if (k == "current_function")return this.current_function;
		else if (k == "modules")return this.modules;
		else if (k == "vars")return this.vars;
		else if (k == "save_vars")return this.save_vars;
		else if (k == "save_op_codes")return this.save_op_codes;
		else if (k == "save_op_code_inc")return this.save_op_code_inc;
		else if (k == "is_static_function")return this.is_static_function;
		else if (k == "is_operation")return this.is_operation;
		else if (k == "opcode_level")return this.opcode_level;
		else if (k == "indent_level")return this.indent_level;
		else if (k == "indent")return this.indent;
		else if (k == "crlf")return this.crlf;
		else if (k == "flag_struct_check_types")return this.flag_struct_check_types;
		else if (k == "preprocessor_flags")return this.preprocessor_flags;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(BayLang.CoreTranslator, Runtime.BaseStruct);
Object.assign(BayLang.CoreTranslator,
{
	/**
	 * Translate BaseOpCode
	 */
	translate: function(t, op_code)
	{
		return "";
	},
	/**
	 * Inc save op code
	 */
	nextSaveOpCode: function(t)
	{
		return "__v" + Runtime.rtl.toStr(t.save_op_code_inc);
	},
	/**
	 * Inc save op code
	 */
	incSaveOpCode: function(t)
	{
		var var_name = this.nextSaveOpCode(t);
		var save_op_code_inc = t.save_op_code_inc + 1;
		t = t.copy(Runtime.Map.from({"save_op_code_inc":save_op_code_inc}));
		return Runtime.Vector.from([t,var_name]);
	},
	/**
	 * Add save op code
	 */
	addSaveOpCode: function(t, data)
	{
		var var_name = data.get("var_name", "");
		var content = data.get("content", "");
		var var_content = data.get("var_content", "");
		var save_op_code_inc = t.save_op_code_inc;
		if (var_name == "" && content == "")
		{
			var_name = this.nextSaveOpCode(t);
			data = data.setIm("var_name", var_name);
			save_op_code_inc += 1;
		}
		var s = new BayLang.SaveOpCode(data);
		t = t.copy(Runtime.Map.from({"save_op_codes":t.save_op_codes.pushIm(s),"save_op_code_inc":save_op_code_inc}));
		return Runtime.Vector.from([t,var_name]);
	},
	/**
	 * Clear save op code
	 */
	clearSaveOpCode: function(t)
	{
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), new Runtime.Collection());
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), 0);
		return t;
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		return "";
	},
	/**
	 * Call f and return result with save op codes
	 */
	saveOpCodeCall: function(t, f, args)
	{
		/* Clear save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		var res = Runtime.rtl.apply(f, args.unshiftIm(t));
		t = Runtime.rtl.attr(res, 0);
		var value = Runtime.rtl.attr(res, 1);
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		return Runtime.Vector.from([t,save,value]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang";
	},
	getClassName: function()
	{
		return "BayLang.CoreTranslator";
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
		a.push("current_namespace_name");
		a.push("current_class_name");
		a.push("current_class_full_name");
		a.push("current_class_extends_name");
		a.push("current_class");
		a.push("current_function");
		a.push("modules");
		a.push("vars");
		a.push("save_vars");
		a.push("save_op_codes");
		a.push("save_op_code_inc");
		a.push("is_static_function");
		a.push("is_operation");
		a.push("opcode_level");
		a.push("indent_level");
		a.push("indent");
		a.push("crlf");
		a.push("flag_struct_check_types");
		a.push("preprocessor_flags");
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
Runtime.rtl.defClass(BayLang.CoreTranslator);
window["BayLang.CoreTranslator"] = BayLang.CoreTranslator;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.CoreTranslator;