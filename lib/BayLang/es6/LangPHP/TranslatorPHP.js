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
if (typeof BayLang.LangPHP == 'undefined') BayLang.LangPHP = {};
BayLang.LangPHP.TranslatorPHP = function()
{
	BayLang.CoreTranslator.apply(this, arguments);
};
BayLang.LangPHP.TranslatorPHP.prototype = Object.create(BayLang.CoreTranslator.prototype);
BayLang.LangPHP.TranslatorPHP.prototype.constructor = BayLang.LangPHP.TranslatorPHP;
Object.assign(BayLang.LangPHP.TranslatorPHP.prototype,
{
	_init: function()
	{
		BayLang.CoreTranslator.prototype._init.call(this);
		this.is_pipe = false;
		this.pipe_var_name = "";
		this.html_var_name = "";
		this.is_html = false;
		this.expression = null;
		this.html = null;
		this.operator = null;
		this.program = null;
		this.frontend = false;
		this.backend = true;
		this.enable_context = false;
		this.enable_check_types = false;
		this.enable_introspection = true;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "is_pipe")return this.is_pipe;
		else if (k == "pipe_var_name")return this.pipe_var_name;
		else if (k == "html_var_name")return this.html_var_name;
		else if (k == "is_html")return this.is_html;
		else if (k == "expression")return this.expression;
		else if (k == "html")return this.html;
		else if (k == "operator")return this.operator;
		else if (k == "program")return this.program;
		else if (k == "frontend")return this.frontend;
		else if (k == "backend")return this.backend;
		else if (k == "enable_context")return this.enable_context;
		else if (k == "enable_check_types")return this.enable_check_types;
		else if (k == "enable_introspection")return this.enable_introspection;
		return BayLang.CoreTranslator.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(BayLang.LangPHP.TranslatorPHP, BayLang.CoreTranslator);
Object.assign(BayLang.LangPHP.TranslatorPHP,
{
	/**
	 * Reset translator
	 */
	reset: function(t)
	{
		return t.copy(Runtime.Map.from({"value":"","current_namespace_name":"","modules":new Runtime.Dict(),"expression":new BayLang.LangPHP.TranslatorPHPExpression(),"html":new BayLang.LangPHP.TranslatorPHPHtml(),"operator":new BayLang.LangPHP.TranslatorPHPOperator(),"program":new BayLang.LangPHP.TranslatorPHPProgram(),"save_vars":new Runtime.Collection(),"save_op_codes":new Runtime.Collection(),"save_op_code_inc":0,"preprocessor_flags":Runtime.Map.from({"PHP":true,"FRONTEND":t.frontend,"BACKEND":t.backend,"ENABLE_CONTEXT":t.enable_context,"ENABLE_CHECK_TYPES":t.enable_check_types})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(t, op_code)
	{
		t = this.reset(t);
		return t.program.constructor.translateProgram(t, op_code);
	},
	/**
	 * Inc save op code
	 */
	nextSaveOpCode: function(t)
	{
		return "$__v" + Runtime.rtl.toStr(t.save_op_code_inc);
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		var content = "";
		for (var i = 0; i < t.save_op_codes.count(); i++)
		{
			if (i < save_op_code_value)
			{
				continue;
			}
			var save = t.save_op_codes.item(i);
			var s = (save.content == "") ? (t.s(save.var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(save.var_content) + Runtime.rtl.toStr(";"))) : (save.content);
			content += Runtime.rtl.toStr(s);
		}
		return content;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangPHP";
	},
	getClassName: function()
	{
		return "BayLang.LangPHP.TranslatorPHP";
	},
	getParentClassName: function()
	{
		return "BayLang.CoreTranslator";
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
		a.push("is_pipe");
		a.push("pipe_var_name");
		a.push("html_var_name");
		a.push("is_html");
		a.push("expression");
		a.push("html");
		a.push("operator");
		a.push("program");
		a.push("frontend");
		a.push("backend");
		a.push("enable_context");
		a.push("enable_check_types");
		a.push("enable_introspection");
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
Runtime.rtl.defClass(BayLang.LangPHP.TranslatorPHP);
window["BayLang.LangPHP.TranslatorPHP"] = BayLang.LangPHP.TranslatorPHP;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangPHP.TranslatorPHP;