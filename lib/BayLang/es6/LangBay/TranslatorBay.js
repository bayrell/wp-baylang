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
if (typeof BayLang.LangBay == 'undefined') BayLang.LangBay = {};
BayLang.LangBay.TranslatorBay = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
BayLang.LangBay.TranslatorBay.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.LangBay.TranslatorBay.prototype.constructor = BayLang.LangBay.TranslatorBay;
Object.assign(BayLang.LangBay.TranslatorBay.prototype,
{
	/**
	 * Reset translator
	 */
	reset: function()
	{
		this.opcode_level = 0;
		this.indent_level = 0;
		this.preprocessor_flags = Runtime.Map.from({});
	},
	/**
	 * Set flag
	 */
	setFlag: function(flag_name, value)
	{
		this.preprocessor_flags.set(flag_name, value);
		return this;
	},
	/**
	 * Increment indent level
	 */
	levelInc: function()
	{
		this.indent_level = this.indent_level + 1;
	},
	/**
	 * Decrease indent level
	 */
	levelDec: function()
	{
		this.indent_level = this.indent_level - 1;
	},
	/**
	 * Returns new line with indent
	 */
	newLine: function()
	{
		return this.crlf + Runtime.rtl.toStr(Runtime.rs.str_repeat(this.indent, this.indent_level));
	},
	/**
	 * Returns string
	 */
	toString: function(s)
	{
		s = Runtime.re.replace("\\\\", "\\\\", s);
		s = Runtime.re.replace("\"", "\\\"", s);
		s = Runtime.re.replace("\n", "\\n", s);
		s = Runtime.re.replace("\r", "\\r", s);
		s = Runtime.re.replace("\t", "\\t", s);
		return "\"" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("\"");
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.opcode_level = 0;
		this.indent_level = 0;
		this.indent = "\t";
		this.crlf = "\n";
		this.preprocessor_flags = Runtime.Map.from({});
		this.expression = new BayLang.LangBay.TranslatorBayExpression(this);
		this.operator = new BayLang.LangBay.TranslatorBayOperator(this);
		this.program = new BayLang.LangBay.TranslatorBayProgram(this);
		this.html = new BayLang.LangBay.TranslatorBayHtml(this);
	},
});
Object.assign(BayLang.LangBay.TranslatorBay, Runtime.BaseObject);
Object.assign(BayLang.LangBay.TranslatorBay,
{
	/**
	 * Translate BaseOpCode
	 */
	translate: function(t, op_code)
	{
		var content = Runtime.Vector.from([]);
		if (op_code.is_component)
		{
			t.html.translate(op_code, content);
		}
		else
		{
			t.program.translate(op_code, content);
		}
		var result = Runtime.rs.join("", content);
		return Runtime.Vector.from([t,result]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.TranslatorBay";
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
});
Runtime.rtl.defClass(BayLang.LangBay.TranslatorBay);
window["BayLang.LangBay.TranslatorBay"] = BayLang.LangBay.TranslatorBay;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.TranslatorBay;