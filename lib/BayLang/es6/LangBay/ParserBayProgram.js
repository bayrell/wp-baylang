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
BayLang.LangBay.ParserBayProgram = function()
{
};
Object.assign(BayLang.LangBay.ParserBayProgram.prototype,
{
});
Object.assign(BayLang.LangBay.ParserBayProgram,
{
	/**
	 * Read namespace
	 */
	readNamespace: function(parser)
	{
		var token = null;
		var name = null;
		var res = parser.parser_base.constructor.matchToken(parser, "namespace");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readEntityName(parser, false);
		parser = Runtime.rtl.attr(res, 0);
		name = Runtime.rtl.attr(res, 1);
		var current_namespace_name = Runtime.rs.join(".", name.names);
		var current_namespace = new BayLang.OpCodes.OpNamespace(Runtime.Map.from({"name":current_namespace_name,"caret_start":caret_start,"caret_end":parser.caret}));
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_namespace"]), current_namespace);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_namespace_name"]), current_namespace_name);
		return Runtime.Vector.from([parser,current_namespace]);
	},
	/**
	 * Read use
	 */
	readUse: function(parser)
	{
		var look = null;
		var token = null;
		var name = null;
		var alias = "";
		var res = parser.parser_base.constructor.matchToken(parser, "use");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readEntityName(parser, false);
		parser = Runtime.rtl.attr(res, 0);
		name = Runtime.rtl.attr(res, 1);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "as")
		{
			var parser_value = null;
			parser = look;
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			parser_value = Runtime.rtl.attr(res, 1);
			alias = parser_value.value;
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpUse(Runtime.Map.from({"name":Runtime.rs.join(".", name.names),"alias":alias,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read class body
	 */
	readClassBody: function(parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "}";
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		while (!token.eof && token.content != end_tag)
		{
			var item = null;
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(parser);
				parser = Runtime.rtl.attr(res, 0);
				item = Runtime.rtl.attr(res, 1);
				if (item != null)
				{
					items.push(item);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(parser);
				parser = Runtime.rtl.attr(res, 0);
				item = Runtime.rtl.attr(res, 1);
				items.push(item);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				var res = parser.parser_preprocessor.constructor.readPreprocessor(parser);
				parser = Runtime.rtl.attr(res, 0);
				item = Runtime.rtl.attr(res, 1);
				if (item != null)
				{
					items.push(item);
				}
			}
			else if (token.content == "#ifdef")
			{
				var res = parser.parser_preprocessor.constructor.readPreprocessorIfDef(parser, BayLang.OpCodes.OpPreprocessorIfDef.KIND_CLASS_BODY);
				parser = Runtime.rtl.attr(res, 0);
				item = Runtime.rtl.attr(res, 1);
				if (item != null)
				{
					items.push(item);
				}
			}
			else if (token.content == "<")
			{
				break;
			}
			else
			{
				var flags = null;
				var res = parser.parser_operator.constructor.readFlags(parser);
				parser = Runtime.rtl.attr(res, 0);
				flags = Runtime.rtl.attr(res, 1);
				if (parser.parser_operator.constructor.tryReadFunction(parser, true, flags))
				{
					var res = parser.parser_operator.constructor.readDeclareFunction(parser, true);
					parser = Runtime.rtl.attr(res, 0);
					item = Runtime.rtl.attr(res, 1);
					if (item.expression != null)
					{
						if (!item.is_html)
						{
							var res = parser.parser_base.constructor.matchToken(parser, ";");
							parser = Runtime.rtl.attr(res, 0);
						}
						else
						{
							var res = parser.parser_base.constructor.readToken(parser);
							look = Runtime.rtl.attr(res, 0);
							token = Runtime.rtl.attr(res, 1);
							if (token.content == ";")
							{
								parser = look;
							}
						}
					}
				}
				else
				{
					var res = parser.parser_operator.constructor.readAssign(parser);
					parser = Runtime.rtl.attr(res, 0);
					item = Runtime.rtl.attr(res, 1);
					var res = parser.parser_base.constructor.matchToken(parser, ";");
					parser = Runtime.rtl.attr(res, 0);
				}
				item = Runtime.rtl.setAttr(item, Runtime.Collection.from(["flags"]), flags);
				if (item != null)
				{
					items.push(item);
				}
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		}
		return Runtime.Vector.from([parser,items]);
	},
	/**
	 * Class body analyze
	 */
	classBodyAnalyze: function(parser, arr)
	{
		var names = new Runtime.Map();
		var vars = new Runtime.Vector();
		var functions = new Runtime.Vector();
		var items = new Runtime.Vector();
		var annotations = new Runtime.Vector();
		var comments = new Runtime.Vector();
		var fn_create = null;
		var fn_destroy = null;
		for (var i = 0; i < arr.count(); i++)
		{
			var item = arr.item(i);
			if (item instanceof BayLang.OpCodes.OpAnnotation)
			{
				annotations.push(item);
			}
			else if (item instanceof BayLang.OpCodes.OpComment)
			{
				comments.push(item);
			}
			else if (item instanceof BayLang.OpCodes.OpAssign)
			{
				for (var j = 0; j < item.values.count(); j++)
				{
					var assign_value = item.values.item(j);
					var value_name = assign_value.var_name;
					if (names.has(value_name))
					{
						throw new BayLang.Exceptions.ParserError("Dublicate identifier " + Runtime.rtl.toStr(value_name), assign_value.caret_start, parser.file_name)
					}
					names.set(value_name, true);
				}
				item = item.copy(Runtime.Map.from({"annotations":annotations.slice(),"comments":comments.slice()}));
				vars.push(item);
				annotations.clear();
				comments.clear();
			}
			else if (item instanceof BayLang.OpCodes.OpDeclareFunction)
			{
				item = item.copy(Runtime.Map.from({"annotations":annotations.slice(),"comments":comments.slice()}));
				if (names.has(item.name))
				{
					throw new BayLang.Exceptions.ParserError("Dublicate identifier " + Runtime.rtl.toStr(item.name), item.caret_start, parser.file_name)
				}
				names.set(item.name, true);
				if (item.name == "constructor")
				{
					fn_create = item;
				}
				else if (item.name == "destructor")
				{
					fn_destroy = item;
				}
				else
				{
					functions.push(item);
				}
				annotations.clear();
				comments.clear();
			}
			else if (item instanceof BayLang.OpCodes.OpPreprocessorIfDef)
			{
				var d = this.classBodyAnalyze(parser, item.items);
				var d_vars = Runtime.rtl.attr(d, "vars");
				d_vars = d_vars.map((v) =>
				{
					v = Runtime.rtl.setAttr(v, Runtime.Collection.from(["condition"]), item.condition);
					return v;
				});
				vars.appendItems(d_vars);
			}
			else
			{
				items.push(item);
			}
		}
		items.appendItems(comments);
		return Runtime.Map.from({"annotations":annotations,"comments":comments,"functions":functions,"items":items,"vars":vars,"fn_create":fn_create,"fn_destroy":fn_destroy});
	},
	/**
	 * Read class
	 */
	readClass: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var template = null;
		var is_abstract = false;
		var is_declare = false;
		var is_static = false;
		var is_struct = false;
		var class_kind = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		if (token.content == "abstract")
		{
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			is_abstract = true;
		}
		if (token.content == "declare")
		{
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			is_declare = true;
		}
		if (token.content == "static")
		{
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			is_static = true;
		}
		if (token.content == "class")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "class");
			parser = Runtime.rtl.attr(res, 0);
			class_kind = BayLang.OpCodes.OpDeclareClass.KIND_CLASS;
		}
		else if (token.content == "struct")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "struct");
			parser = Runtime.rtl.attr(res, 0);
			class_kind = BayLang.OpCodes.OpDeclareClass.KIND_STRUCT;
		}
		else if (token.content == "interface")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "interface");
			parser = Runtime.rtl.attr(res, 0);
			class_kind = BayLang.OpCodes.OpDeclareClass.KIND_INTERFACE;
		}
		else
		{
			var res = parser.parser_base.constructor.matchToken(parser, "class");
		}
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var class_name = op_code.value;
		/* Set class name */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_abstract"]), is_abstract);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_declare"]), is_declare);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_name"]), class_name);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_kind"]), class_kind);
		/* Register module in parser */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(class_name, parser.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(class_name)));
		var save_uses = parser.uses;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "<")
		{
			template = new Runtime.Vector();
			var res = parser.parser_base.constructor.matchToken(parser, "<");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			while (!token.eof && token.content != ">")
			{
				var parser_value = null;
				var res = parser.parser_base.constructor.readIdentifier(parser);
				parser = Runtime.rtl.attr(res, 0);
				parser_value = Runtime.rtl.attr(res, 1);
				template.push(parser_value);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(parser_value.value, parser_value.value));
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				if (token.content != ">")
				{
					var res = parser.parser_base.constructor.matchToken(parser, ",");
					parser = Runtime.rtl.attr(res, 0);
					var res = parser.parser_base.constructor.readToken(parser);
					look = Runtime.rtl.attr(res, 0);
					token = Runtime.rtl.attr(res, 1);
				}
			}
			var res = parser.parser_base.constructor.matchToken(parser, ">");
			parser = Runtime.rtl.attr(res, 0);
		}
		var class_extends = null;
		var class_implements = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "extends")
		{
			var res = parser.parser_base.constructor.readTypeIdentifier(look);
			parser = Runtime.rtl.attr(res, 0);
			class_extends = Runtime.rtl.attr(res, 1);
		}
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "implements")
		{
			class_implements = new Runtime.Vector();
			var res = parser.parser_base.constructor.readTypeIdentifier(look);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			class_implements.push(op_code);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			while (!token.eof && token.content == ",")
			{
				parser = look;
				var res = parser.parser_base.constructor.readTypeIdentifier(look);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				class_implements.push(op_code);
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
			}
		}
		var arr = null;
		var res = parser.parser_base.constructor.matchToken(parser, "{");
		parser = Runtime.rtl.attr(res, 0);
		var res = this.readClassBody(parser);
		parser = Runtime.rtl.attr(res, 0);
		arr = Runtime.rtl.attr(res, 1);
		var d = this.classBodyAnalyze(parser, arr);
		var res = parser.parser_base.constructor.matchToken(parser, "}");
		parser = Runtime.rtl.attr(res, 0);
		var current_class = new BayLang.OpCodes.OpDeclareClass(Runtime.Map.from({"kind":class_kind,"name":class_name,"is_abstract":is_abstract,"is_static":is_static,"is_declare":is_declare,"class_extends":class_extends,"class_implements":(class_implements != null) ? (class_implements) : (null),"template":(template != null) ? (template) : (null),"vars":d.item("vars"),"functions":d.item("functions"),"fn_create":d.item("fn_create"),"fn_destroy":d.item("fn_destroy"),"items":arr,"caret_start":caret_start,"caret_end":parser.caret}));
		/* Restore uses */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), save_uses);
		return Runtime.Vector.from([parser.copy(Runtime.Map.from({"current_class":current_class})),current_class]);
	},
	/**
	 * Read program
	 */
	readProgram: function(parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "";
		var look = null;
		var token = null;
		var op_code = null;
		var annotations = new Runtime.Vector();
		var comments = new Runtime.Vector();
		var items = new Runtime.Vector();
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		if (token.eof)
		{
			return Runtime.Vector.from([parser,null]);
		}
		if (token.content == "<")
		{
			return parser.parser_html.constructor.readUI(parser);
		}
		while (!token.eof && (end_tag == "" || end_tag != "" && token.content == end_tag))
		{
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				if (op_code != null)
				{
					comments.push(op_code);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				annotations.push(op_code);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				/* Append comments */
				items.appendItems(comments);
				comments.clear();
				var res = parser.parser_preprocessor.constructor.readPreprocessor(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				if (op_code != null)
				{
					items.appendItems(comments);
					items.push(op_code);
				}
			}
			else if (token.content == "#ifdef")
			{
				/* Append comments */
				items.appendItems(comments);
				comments.clear();
				var res = parser.parser_preprocessor.constructor.readPreprocessorIfDef(parser, BayLang.OpCodes.OpPreprocessorIfDef.KIND_PROGRAM);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				if (op_code != null)
				{
					items.appendItems(comments);
					items.push(op_code);
				}
			}
			else if (token.content == "namespace")
			{
				/* Append comments */
				items.appendItems(comments);
				comments.clear();
				var res = this.readNamespace(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				items.push(op_code);
				var res = parser.parser_base.constructor.matchToken(parser, ";");
				parser = Runtime.rtl.attr(res, 0);
			}
			else if (token.content == "use")
			{
				/* Append comments */
				items.appendItems(comments);
				comments.clear();
				var res = this.readUse(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				var full_name = op_code.name;
				var short_name = "";
				if (op_code.alias == "")
				{
					short_name = Runtime.rs.split(".", full_name).last();
				}
				else
				{
					short_name = op_code.alias;
				}
				/* Register module in parser */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(short_name, full_name));
				items.push(op_code);
				var res = parser.parser_base.constructor.matchToken(parser, ";");
				parser = Runtime.rtl.attr(res, 0);
			}
			else if (token.content == "class" || token.content == "struct" || token.content == "static" || token.content == "declare" || token.content == "interface" || token.content == "abstract")
			{
				var item = null;
				var res = this.readClass(parser);
				parser = Runtime.rtl.attr(res, 0);
				item = Runtime.rtl.attr(res, 1);
				item = item.copy(Runtime.Map.from({"annotations":annotations,"comments":comments}));
				items.push(item);
				annotations.clear();
				comments.clear();
			}
			else
			{
				break;
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		}
		items.appendItems(comments);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpModule(Runtime.Map.from({"uses":parser.uses.toDict(),"items":items,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.ParserBayProgram";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(BayLang.LangBay.ParserBayProgram);
window["BayLang.LangBay.ParserBayProgram"] = BayLang.LangBay.ParserBayProgram;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.ParserBayProgram;