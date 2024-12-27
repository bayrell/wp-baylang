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
BayLang.LangES6.TranslatorES6 = function()
{
	BayLang.CoreTranslator.apply(this, arguments);
};
BayLang.LangES6.TranslatorES6.prototype = Object.create(BayLang.CoreTranslator.prototype);
BayLang.LangES6.TranslatorES6.prototype.constructor = BayLang.LangES6.TranslatorES6;
Object.assign(BayLang.LangES6.TranslatorES6.prototype,
{
	/**
	 * Returns true if emulate async await
	 */
	isEmulateAsyncAwait: function()
	{
		return this.enable_async_await && this.emulate_async_await;
	},
	/**
	 * Returns true if async await
	 */
	isAsyncAwait: function()
	{
		return this.enable_async_await && !this.emulate_async_await;
	},
	_init: function()
	{
		BayLang.CoreTranslator.prototype._init.call(this);
		this.is_pipe = false;
		this.is_call = false;
		this.pipe_var_name = "";
		this.html_var_name = "";
		this.is_html = false;
		this.async_await = null;
		this.expression = null;
		this.html = null;
		this.operator = null;
		this.program = null;
		this.debug_component = null;
		this.frontend = true;
		this.backend = false;
		this.use_module_name = false;
		this.use_strict = true;
		this.enable_async_await = true;
		this.emulate_async_await = false;
		this.enable_context = false;
		this.enable_check_types = false;
		this.enable_introspection = true;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "is_pipe")return this.is_pipe;
		else if (k == "is_call")return this.is_call;
		else if (k == "pipe_var_name")return this.pipe_var_name;
		else if (k == "html_var_name")return this.html_var_name;
		else if (k == "is_html")return this.is_html;
		else if (k == "async_await")return this.async_await;
		else if (k == "expression")return this.expression;
		else if (k == "html")return this.html;
		else if (k == "operator")return this.operator;
		else if (k == "program")return this.program;
		else if (k == "debug_component")return this.debug_component;
		else if (k == "frontend")return this.frontend;
		else if (k == "backend")return this.backend;
		else if (k == "use_module_name")return this.use_module_name;
		else if (k == "use_strict")return this.use_strict;
		else if (k == "enable_async_await")return this.enable_async_await;
		else if (k == "emulate_async_await")return this.emulate_async_await;
		else if (k == "enable_context")return this.enable_context;
		else if (k == "enable_check_types")return this.enable_check_types;
		else if (k == "enable_introspection")return this.enable_introspection;
		return BayLang.CoreTranslator.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(BayLang.LangES6.TranslatorES6, BayLang.CoreTranslator);
Object.assign(BayLang.LangES6.TranslatorES6,
{
	/**
	 * Reset translator
	 */
	reset: function(t)
	{
		return t.copy(Runtime.Map.from({"value":"","current_namespace_name":"","debug_component":Runtime.Vector.from([]),"modules":new Runtime.Dict(),"async_await":new BayLang.LangES6.TranslatorES6AsyncAwait(),"expression":new BayLang.LangES6.TranslatorES6Expression(),"html":new BayLang.LangES6.TranslatorES6Html(),"operator":new BayLang.LangES6.TranslatorES6Operator(),"program":new BayLang.LangES6.TranslatorES6Program(),"save_vars":new Runtime.Collection(),"save_op_codes":new Runtime.Collection(),"save_op_code_inc":0,"preprocessor_flags":Runtime.Map.from({"ES6":true,"JAVASCRIPT":true,"FRONTEND":t.frontend,"BACKEND":t.backend,"USE_MODULE_NAME":t.use_module_name,"USE_STRICT":t.use_strict,"ENABLE_ASYNC_AWAIT":t.enable_async_await,"EMULATE_ASYNC_AWAIT":t.emulate_async_await,"ENABLE_CONTEXT":t.enable_context,"ENABLE_CHECK_TYPES":t.enable_check_types})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(t, op_code)
	{
		return t.program.constructor.translateProgram(t, op_code);
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
			var s = "";
			if (t.is_html)
			{
				s = (save.content == "") ? (t.s("let " + Runtime.rtl.toStr(save.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(save.var_content) + Runtime.rtl.toStr(";"))) : (save.content);
			}
			else
			{
				s = (save.content == "") ? (t.s("var " + Runtime.rtl.toStr(save.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(save.var_content) + Runtime.rtl.toStr(";"))) : (save.content);
			}
			content += Runtime.rtl.toStr(s);
		}
		return content;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangES6";
	},
	getClassName: function()
	{
		return "BayLang.LangES6.TranslatorES6";
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
		a.push("is_call");
		a.push("pipe_var_name");
		a.push("html_var_name");
		a.push("is_html");
		a.push("async_await");
		a.push("expression");
		a.push("html");
		a.push("operator");
		a.push("program");
		a.push("debug_component");
		a.push("frontend");
		a.push("backend");
		a.push("use_module_name");
		a.push("use_strict");
		a.push("enable_async_await");
		a.push("emulate_async_await");
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
Runtime.rtl.defClass(BayLang.LangES6.TranslatorES6);
window["BayLang.LangES6.TranslatorES6"] = BayLang.LangES6.TranslatorES6;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangES6.TranslatorES6;