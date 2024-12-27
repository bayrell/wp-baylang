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
BayLang.LangBay.ParserBay = function()
{
	BayLang.CoreParser.apply(this, arguments);
};
BayLang.LangBay.ParserBay.prototype = Object.create(BayLang.CoreParser.prototype);
BayLang.LangBay.ParserBay.prototype.constructor = BayLang.LangBay.ParserBay;
Object.assign(BayLang.LangBay.ParserBay.prototype,
{
	_init: function()
	{
		BayLang.CoreParser.prototype._init.call(this);
		this.vars = null;
		this.uses = null;
		this.current_namespace = null;
		this.current_class = null;
		this.current_namespace_name = "";
		this.current_class_name = "";
		this.current_class_kind = "";
		this.current_class_abstract = false;
		this.current_class_declare = false;
		this.find_identifier = true;
		this.skip_comments = true;
		this.pipe_kind = "";
		this.is_pipe = false;
		this.is_html = false;
		this.is_local_css = false;
		this.parser_base = null;
		this.parser_expression = null;
		this.parser_html = null;
		this.parser_operator = null;
		this.parser_preprocessor = null;
		this.parser_program = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "vars")return this.vars;
		else if (k == "uses")return this.uses;
		else if (k == "current_namespace")return this.current_namespace;
		else if (k == "current_class")return this.current_class;
		else if (k == "current_namespace_name")return this.current_namespace_name;
		else if (k == "current_class_name")return this.current_class_name;
		else if (k == "current_class_kind")return this.current_class_kind;
		else if (k == "current_class_abstract")return this.current_class_abstract;
		else if (k == "current_class_declare")return this.current_class_declare;
		else if (k == "find_identifier")return this.find_identifier;
		else if (k == "skip_comments")return this.skip_comments;
		else if (k == "pipe_kind")return this.pipe_kind;
		else if (k == "is_pipe")return this.is_pipe;
		else if (k == "is_html")return this.is_html;
		else if (k == "is_local_css")return this.is_local_css;
		else if (k == "parser_base")return this.parser_base;
		else if (k == "parser_expression")return this.parser_expression;
		else if (k == "parser_html")return this.parser_html;
		else if (k == "parser_operator")return this.parser_operator;
		else if (k == "parser_preprocessor")return this.parser_preprocessor;
		else if (k == "parser_program")return this.parser_program;
		return BayLang.CoreParser.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(BayLang.LangBay.ParserBay, BayLang.CoreParser);
Object.assign(BayLang.LangBay.ParserBay,
{
	/**
	 * Reset parser
	 */
	reset: function(parser)
	{
		return parser.copy(Runtime.Map.from({"vars":new Runtime.Dict(),"uses":new Runtime.Dict(),"caret":new BayLang.Caret(Runtime.Map.from({})),"token":null,"parser_base":new BayLang.LangBay.ParserBayBase(),"parser_expression":new BayLang.LangBay.ParserBayExpression(),"parser_html":new BayLang.LangBay.ParserBayHtml(),"parser_operator":new BayLang.LangBay.ParserBayOperator(),"parser_preprocessor":new BayLang.LangBay.ParserBayPreprocessor(),"parser_program":new BayLang.LangBay.ParserBayProgram()}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(parser, content)
	{
		parser = this.reset(parser);
		parser = this.setContent(parser, content);
		return parser.parser_program.constructor.readProgram(parser);
	},
	/**
	 * Find module name
	 */
	findModuleName: function(parser, module_name)
	{
		if (module_name == "Collection")
		{
			return "Runtime.Collection";
		}
		else if (module_name == "Dict")
		{
			return "Runtime.Dict";
		}
		else if (module_name == "Map")
		{
			return "Runtime.Map";
		}
		else if (module_name == "Vector")
		{
			return "Runtime.Vector";
		}
		else if (module_name == "rs")
		{
			return "Runtime.rs";
		}
		else if (module_name == "rtl")
		{
			return "Runtime.rtl";
		}
		else if (module_name == "ArrayInterface")
		{
			return "";
		}
		else if (parser.uses.has(module_name))
		{
			return parser.uses.item(module_name);
		}
		return module_name;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.ParserBay";
	},
	getParentClassName: function()
	{
		return "BayLang.CoreParser";
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
		a.push("vars");
		a.push("uses");
		a.push("current_namespace");
		a.push("current_class");
		a.push("current_namespace_name");
		a.push("current_class_name");
		a.push("current_class_kind");
		a.push("current_class_abstract");
		a.push("current_class_declare");
		a.push("find_identifier");
		a.push("skip_comments");
		a.push("pipe_kind");
		a.push("is_pipe");
		a.push("is_html");
		a.push("is_local_css");
		a.push("parser_base");
		a.push("parser_expression");
		a.push("parser_html");
		a.push("parser_operator");
		a.push("parser_preprocessor");
		a.push("parser_program");
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
Runtime.rtl.defClass(BayLang.LangBay.ParserBay);
window["BayLang.LangBay.ParserBay"] = BayLang.LangBay.ParserBay;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.ParserBay;