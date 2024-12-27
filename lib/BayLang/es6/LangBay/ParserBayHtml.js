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
BayLang.LangBay.ParserBayHtml = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
BayLang.LangBay.ParserBayHtml.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.LangBay.ParserBayHtml.prototype.constructor = BayLang.LangBay.ParserBayHtml;
Object.assign(BayLang.LangBay.ParserBayHtml.prototype,
{
});
Object.assign(BayLang.LangBay.ParserBayHtml, Runtime.BaseObject);
Object.assign(BayLang.LangBay.ParserBayHtml,
{
	/**
	 * Hash function
	 * @param string
	 * @return int hash
	 */
	hash: function(s, last, x, p)
	{
		if (last == undefined) last = true;
		if (x == undefined) x = 257;
		if (p == undefined) p = 1000000007;
		var h = 0;
		var sz = Runtime.rs.strlen(s);
		for (var i = 0; i < sz; i++)
		{
			var ch = Runtime.rs.ord(Runtime.rs.substr(s, i, 1));
			h = (h * x + ch) % p;
		}
		if (last)
		{
			h = h * x % p;
		}
		return h;
	},
	/**
	 * Convert int to hex
	 * @param int
	 * @return string
	 */
	toHex: function(h)
	{
		var r = "";
		var a = "0123456789abcdef";
		while (h >= 0)
		{
			var c = h & 15;
			h = h >> 4;
			r = Runtime.rs.substr(a, c, 1) + Runtime.rtl.toStr(r);
			if (h == 0)
			{
				break;
			}
		}
		return r;
	},
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	getCssHash: function(s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayHtml.getCssHash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var h = this.hash(s, true, 337, 65537) + 65537;
		var res = this.toHex(h);
		var __memorize_value = Runtime.rs.substr(res, -4);
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayHtml.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Read css component name
	 */
	readCssComponentName: function(parser)
	{
		var flag = false;
		var class_name = "";
		/* Get caret */
		var caret = parser.getCaret();
		/* Read char */
		var ch = caret.nextChar();
		if (ch == "(")
		{
			flag = true;
			/* Read ( */
			caret.readChar();
			/* Next char */
			ch = caret.nextChar();
			/* Read class name */
			var start_pos = caret.pos;
			while (!caret.eof() && ch != ")")
			{
				caret.readChar();
				ch = caret.nextChar();
			}
			class_name = caret.getString(start_pos, caret.pos - start_pos);
			/* Recognize class name */
			if (parser.uses.has(class_name))
			{
				class_name = parser.uses.item(class_name);
			}
			/* Read ) */
			caret.matchChar(")");
		}
		parser = parser.copy(Runtime.Map.from({"caret":caret}));
		return Runtime.Vector.from([parser,class_name,flag]);
	},
	/**
	 * Read css class name
	 */
	readCssClassName: function(parser, default_component_name)
	{
		if (default_component_name == undefined) default_component_name = true;
		/* Get caret */
		var caret = parser.getCaret();
		/* Component name */
		var use_component_name = default_component_name;
		var component_name = parser.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(parser.current_class_name);
		/* Read start selector */
		var start_ch = caret.nextChar();
		if (start_ch == "." || start_ch == "%")
		{
			caret.readChar();
		}
		else if (start_ch == "&")
		{
			caret.readChar();
			use_component_name = false;
		}
		else if (start_ch == "#" || start_ch == ":")
		{
			caret.readChar();
			if (start_ch == ":")
			{
				use_component_name = false;
			}
		}
		else if (start_ch == "*")
		{
			caret.readChar();
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			return Runtime.Vector.from([parser,"*"]);
		}
		else
		{
			start_ch = "";
			use_component_name = false;
		}
		/* Save caret */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		/* Read class name */
		if (start_ch == "%")
		{
			start_ch = ".";
			var res = this.readCssComponentName(parser);
			parser = Runtime.rtl.attr(res, 0);
			if (Runtime.rtl.attr(res, 2) != "")
			{
				component_name = Runtime.rtl.attr(res, 1);
				use_component_name = true;
			}
		}
		/* Start position */
		caret = parser.getCaret();
		var start_pos = caret.pos;
		/* Read selector */
		var ch = caret.nextChar();
		while (!caret.eof() && ch != " " && ch != "," && ch != ":" && ch != "[" && ch != "{")
		{
			caret.readChar();
			ch = caret.nextChar();
		}
		var postfix = caret.getString(start_pos, caret.pos - start_pos);
		postfix = Runtime.rs.trim(postfix);
		/* Read suffix */
		var start_pos = caret.pos;
		while (!caret.eof() && ch != " " && ch != "," && ch != "." && ch != "{")
		{
			caret.readChar();
			ch = caret.nextChar();
		}
		var suffix = caret.getString(start_pos, caret.pos - start_pos);
		suffix = Runtime.rs.trim(suffix);
		var class_name = start_ch + Runtime.rtl.toStr(postfix) + Runtime.rtl.toStr(((use_component_name) ? (".h-" + Runtime.rtl.toStr(this.getCssHash(component_name))) : (""))) + Runtime.rtl.toStr(suffix);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		return Runtime.Vector.from([parser,class_name]);
	},
	/**
	 * Read css selector
	 */
	readCssSelector: function(parser, default_component_name)
	{
		if (default_component_name == undefined) default_component_name = true;
		/* Get caret */
		var caret = parser.getCaret();
		var selectors = new Runtime.Vector();
		while (!caret.eof())
		{
			var res = this.readCssClassName(parser, default_component_name);
			parser = Runtime.rtl.attr(res, 0);
			var selector = Runtime.rtl.attr(res, 1);
			default_component_name = false;
			selectors.push(selector);
			/* Skip empty chars */
			var caret = parser.parser_base.constructor.skipChar(parser, parser.content, parser.caret);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			/* Get caret */
			caret = parser.caret.clone(Runtime.Map.from({"file_name":parser.file_name,"content":parser.content,"content_sz":parser.content_sz}));
			var ch = caret.nextChar();
			if (ch == "{" || ch == "}" || ch == "<" || ch == ",")
			{
				break;
			}
		}
		var selector = Runtime.rs.join(" ", selectors);
		return Runtime.Vector.from([parser,selector]);
	},
	/**
	 * Concat op_code_item with selector
	 */
	readCssBodyConcatItem: function(caret_start, caret_end, selector, op_code_item)
	{
		if (op_code_item instanceof BayLang.OpCodes.OpString)
		{
			op_code_item = new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":caret_start,"caret_end":caret_end,"value":op_code_item.value + Runtime.rtl.toStr("}")}));
		}
		else
		{
			op_code_item = new BayLang.OpCodes.OpMath(Runtime.Map.from({"caret_start":caret_start,"caret_end":caret_end,"value1":op_code_item,"value2":new BayLang.OpCodes.OpString(Runtime.Map.from({"value":"}"})),"math":"~"}));
		}
		if (op_code_item instanceof BayLang.OpCodes.OpString)
		{
			op_code_item = new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":caret_start,"caret_end":caret_end,"value":selector + Runtime.rtl.toStr("{") + Runtime.rtl.toStr(op_code_item.value)}));
		}
		else
		{
			op_code_item = new BayLang.OpCodes.OpMath(Runtime.Map.from({"caret_start":caret_start,"caret_end":caret_end,"value1":new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":caret_start,"caret_end":caret_end,"value":selector + Runtime.rtl.toStr("{")})),"value2":op_code_item,"math":"~"}));
		}
		return op_code_item;
	},
	/**
	 * Returns true if next string is css selector
	 */
	isNextSelector: function(caret)
	{
		caret = caret.clone();
		var ch = caret.nextChar();
		if (ch == "@" || ch == "%" || ch == "&" || ch == "." || ch == ":" || ch == "#" || ch == "*")
		{
			return true;
		}
		if (!caret.constructor.isChar(ch))
		{
			return false;
		}
		while (!caret.eof() && ch != "{" && ch != "}" && ch != "<")
		{
			if (ch == ";" || ch == "(" || ch == ")" || ch == "$")
			{
				return false;
			}
			caret.nextChar();
			ch = caret.readChar();
		}
		if (ch == "{")
		{
			return true;
		}
		return false;
	},
	/**
	 * Split selector by dot
	 */
	splitSelector: function(selector)
	{
		var arr1 = Runtime.rs.split(" ", selector);
		var prefix = Runtime.rs.join(" ", arr1.slice(0, -1));
		if (prefix != "")
		{
			prefix = prefix + Runtime.rtl.toStr(" ");
		}
		var arr2 = Runtime.rs.split(".", arr1.last());
		var first = "";
		var second = "";
		if (arr2.get(0) == "")
		{
			first = "." + Runtime.rtl.toStr(arr2.get(1));
			second = Runtime.rs.join(".", arr2.slice(2));
		}
		else
		{
			first = arr2.get(0);
			second = Runtime.rs.join(".", arr2.slice(1));
		}
		if (second != "")
		{
			second = "." + Runtime.rtl.toStr(second);
		}
		return Runtime.Vector.from([prefix + Runtime.rtl.toStr(first),second]);
	},
	/**
	 * Concat selectors
	 */
	concatSelectors: function(prev_selector, selector)
	{
		if (prev_selector == "")
		{
			return selector;
		}
		/* If first symbol is & */
		if (Runtime.rs.charAt(selector, 0) == "&")
		{
			var res = this.splitSelector(prev_selector);
			return res.get(0) + Runtime.rtl.toStr(Runtime.rs.substr(selector, 1)) + Runtime.rtl.toStr(res.get(1));
		}
		return prev_selector + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(selector);
	},
	/**
	 * Get selectors from collection
	 */
	getSelectors: function(start_selectors)
	{
		var result = Runtime.Vector.from([""]);
		for (var i = 0; i < start_selectors.count(); i++)
		{
			var prev_result = result;
			result = Runtime.Vector.from([]);
			var items = start_selectors.get(i);
			for (var j = 0; j < prev_result.count(); j++)
			{
				var prev_selector = prev_result.get(j);
				for (var k = 0; k < items.count(); k++)
				{
					var selector = items.get(k);
					result.push(this.concatSelectors(prev_selector, selector));
				}
			}
		}
		return result;
	},
	/**
	 * Read css body
	 */
	readCssBodyItems: function(parser, items, start_selectors, end_tag, default_component_name)
	{
		var css_content = Runtime.Vector.from([]);
		var sub_items = Runtime.Vector.from([]);
		/* Get caret */
		var caret_start = parser.getCaret();
		/* Skip empty chars */
		var caret = parser.parser_base.constructor.skipChar(parser, parser.content, parser.caret);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		caret = parser.getCaret();
		var op_code = null;
		while (!caret.eof() && caret.nextChar() != end_tag && caret.nextChar() != "}")
		{
			var op_code_item = null;
			/* Read media css */
			if (caret.isNextString("@media"))
			{
				/* Read selector */
				var arr = new Runtime.Vector();
				var ch = caret.nextChar();
				while (!caret.eof() && ch != "{")
				{
					if (ch != "\t" && ch != "\n")
					{
						arr.push(ch);
					}
					caret.readChar();
					ch = caret.nextChar();
				}
				var media_selector = Runtime.rs.trim(Runtime.rs.join("", arr));
				/* Setup caret */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var caret_start_item2 = parser.getCaret();
				/* Read body */
				var new_items = new Runtime.Vector();
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.attr(res, 0);
				parser = this.readCssBodyItems(parser, new_items, start_selectors, "}", default_component_name);
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.attr(res, 0);
				/* Items */
				for (var i = 0; i < new_items.count(); i++)
				{
					var item = new_items.get(i);
					item = this.readCssBodyConcatItem(item.caret_start, item.caret_end, media_selector, item);
					items.push(item);
				}
				/* Get caret */
				caret = parser.getCaret();
			}
			else if (this.isNextSelector(caret))
			{
				var selectors = Runtime.Vector.from([]);
				/* Read css selector */
				while (this.isNextSelector(caret))
				{
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
					var res = this.readCssSelector(parser, default_component_name);
					parser = Runtime.rtl.attr(res, 0);
					selectors.push(Runtime.rtl.attr(res, 1));
					caret = parser.getCaret();
					if (caret.isNextChar(","))
					{
						caret.readChar();
						caret.skipSpace();
					}
				}
				/* Setup caret */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var caret_start_item2 = parser.getCaret();
				/* Read body */
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.attr(res, 0);
				parser = this.readCssBodyItems(parser, sub_items, start_selectors.pushIm(selectors), "}", default_component_name);
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.attr(res, 0);
				/* Get caret */
				caret = parser.getCaret();
			}
			else
			{
				var arr = new Runtime.Vector();
				var ch = caret.nextChar();
				var ch2 = caret.nextString(2);
				while (!caret.eof() && ch != "}" && ch != ";")
				{
					if (ch2 == "${")
					{
						/* Save caret */
						caret.matchString("${");
						parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
						/* Read expression */
						var res = parser.parser_expression.constructor.readExpression(parser);
						parser = Runtime.rtl.attr(res, 0);
						/* Append to css content */
						if (arr.count() != 0)
						{
							css_content.push(Runtime.rs.join("", arr));
						}
						css_content.push(Runtime.rtl.attr(res, 1));
						arr = Runtime.Vector.from([]);
						/* Restore caret */
						caret = parser.getCaret();
						caret.skipSpace();
						caret.matchChar("}");
					}
					else
					{
						if (ch != "\t" && ch != "\n")
						{
							arr.push(ch);
						}
						caret.readChar();
					}
					ch = caret.nextChar();
					ch2 = caret.nextString(2);
				}
				/* Skip semicolon */
				if (caret.skipChar(";"))
				{
					arr.push(";");
				}
				var s = Runtime.rs.trim(Runtime.rs.join("", arr));
				css_content.push(s);
				/* Setup caret */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			}
			/* Skip empty chars */
			caret = parser.parser_base.constructor.skipChar(parser, parser.content, caret);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			caret = parser.getCaret();
		}
		/* Add CSS content to items */
		if (css_content.count() > 0)
		{
			/* Filter css content */
			css_content = css_content.filter((item) =>
			{
				return item != "";
			});
			/* Remove last semicolon */
			if (css_content.count() > 0 && Runtime.rtl.isString(css_content.last()))
			{
				var item = css_content.last();
				if (Runtime.rs.substr(item, -1) == ";")
				{
					item = Runtime.rs.substr(item, 0, -1);
				}
				css_content.set(css_content.count() - 1, item);
			}
			/* Extend op code */
			var extendItem = (op_code_item, arr) =>
			{
				if (arr.count() > 0)
				{
					var css_str_op_code = new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.getCaret(),"value":Runtime.rs.join("", arr)}));
					if (op_code_item != null)
					{
						op_code_item = new BayLang.OpCodes.OpMath(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.getCaret(),"value1":op_code_item,"value2":css_str_op_code,"math":"~"}));
					}
					else
					{
						op_code_item = css_str_op_code;
					}
				}
				return op_code_item;
			};
			/* Init arr */
			var arr = new Runtime.Vector();
			var selectors = this.getSelectors(start_selectors);
			arr.push(Runtime.rs.join(",", selectors) + Runtime.rtl.toStr("{"));
			/* Build op_code_item */
			var op_code_item = null;
			for (var i = 0; i < css_content.count(); i++)
			{
				var item = css_content.get(i);
				if (Runtime.rtl.isString(item))
				{
					arr.push(item);
				}
				else
				{
					op_code_item = extendItem(op_code_item, arr);
					if (op_code_item != null)
					{
						op_code_item = new BayLang.OpCodes.OpMath(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.getCaret(),"value1":op_code_item,"value2":item,"math":"~"}));
					}
					else
					{
						op_code_item = item;
					}
					arr = Runtime.Vector.from([]);
				}
			}
			/* Add close bracket */
			arr.push("}");
			/* Extend op_code */
			op_code_item = extendItem(op_code_item, arr);
			/* Append op_code */
			items.push(op_code_item);
		}
		/* Add sub items */
		items.appendItems(sub_items);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		return parser;
	},
	/**
	 * Read css body
	 */
	readCssBody: function(parser, end_tag, default_component_name)
	{
		if (end_tag == undefined) end_tag = "}";
		if (default_component_name == undefined) default_component_name = true;
		/* Get caret */
		var caret_start = parser.getCaret();
		var op_code = null;
		var items = new Runtime.Vector();
		/* Read items */
		parser = this.readCssBodyItems(parser, items, Runtime.Vector.from([]), end_tag, default_component_name);
		for (var i = 0; i < items.count(); i++)
		{
			var op_code_item = items.get(i);
			if (op_code == null)
			{
				op_code = op_code_item;
			}
			else
			{
				if (op_code instanceof BayLang.OpCodes.OpString && op_code_item instanceof BayLang.OpCodes.OpString)
				{
					op_code = new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":op_code.caret_start,"caret_end":op_code_item.caret_end,"value":op_code.value + Runtime.rtl.toStr(op_code_item.value)}));
				}
				else
				{
					op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"caret_start":op_code.caret_start,"caret_end":op_code_item.caret_end,"value1":op_code,"value2":op_code_item,"math":"~"}));
				}
			}
		}
		if (op_code == null)
		{
			op_code = new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"value":""}));
		}
		op_code = Runtime.rtl.setAttr(op_code, Runtime.Collection.from(["caret_start"]), caret_start);
		op_code = Runtime.rtl.setAttr(op_code, Runtime.Collection.from(["caret_end"]), parser.caret);
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read css
	 */
	readCss: function(parser)
	{
		var caret_start = parser.caret;
		var res = parser.parser_base.constructor.matchToken(parser, "@css");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "{");
		parser = Runtime.rtl.attr(res, 0);
		var res = this.readCssBody(parser);
		parser = Runtime.rtl.attr(res, 0);
		var op_code = Runtime.rtl.attr(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, "}");
		parser = Runtime.rtl.attr(res, 0);
		if (op_code == null)
		{
			op_code = new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"value":""}));
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read style
	 */
	readStyle: function(parser, item_attrs, items, caret_start)
	{
		/* Save vars */
		var save_vars = parser.vars;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm("vars", true));
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_local_css"]), true);
		/* Check if local css */
		var is_global = item_attrs.get("global", "");
		if (is_global == "true")
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_local_css"]), false);
		}
		/* Read css */
		var res = this.readCssBody(parser, "<", parser.is_local_css);
		parser = Runtime.rtl.attr(res, 0);
		var css_op_code = Runtime.rtl.attr(res, 1);
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		/* Read style footer */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "/");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "style");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.attr(res, 0);
		/* Get style content */
		var start_pos = css_op_code.caret_start.pos;
		var end_pos = css_op_code.caret_end.pos;
		var style_content = Runtime.rs.trim(Runtime.rs.substr(parser.content.ref, start_pos, end_pos - start_pos));
		/* Create op code */
		var op_code = new BayLang.OpCodes.OpHtmlStyle(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"content":style_content,"is_global":is_global,"value":css_op_code}));
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read html comment
	 */
	readHTMLComment: function(parser)
	{
		var start = parser;
		var token = null;
		var look = null;
		var caret_start = parser.caret;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "!--");
		parser = Runtime.rtl.attr(res, 0);
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var pos_start = pos;
		var ch = Runtime.rs.charAt(content.ref, pos);
		var ch3 = Runtime.rs.substr(content.ref, pos, 3);
		while (ch3 != "-->" && pos < content_sz)
		{
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
			pos = pos + 1;
			if (pos >= parser.content_sz)
			{
				break;
			}
			ch = Runtime.rs.charAt(content.ref, pos);
			ch3 = Runtime.rs.substr(content.ref, pos, 3);
		}
		var pos_end = pos;
		if (ch3 == "-->")
		{
			x = x + 3;
			pos = pos + 3;
		}
		else
		{
			throw new BayLang.Exceptions.ParserExpected("End of comment", new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos})), start.file_name)
		}
		/* Return result */
		var value_str = Runtime.rs.substr(content.ref, pos_start, pos_end - pos_start);
		var caret_end = new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos}));
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		return Runtime.Vector.from([start.copy(Runtime.Map.from({"caret":caret_end})),new BayLang.OpCodes.OpComment(Runtime.Map.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		return Runtime.Vector.from([parser,null]);
	},
	/**
	 * Read html value
	 */
	readHTMLValue: function(parser)
	{
		var item = null;
		var caret = parser.caret;
		var content = parser.content;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var ch = Runtime.rs.substr(content.ref, pos, 1);
		var ch2 = Runtime.rs.substr(content.ref, pos, 2);
		if (ch == "<")
		{
			var res = this.readHTMLTag(parser);
			parser = Runtime.rtl.attr(res, 0);
			item = Runtime.rtl.attr(res, 1);
		}
		else if (ch == "{")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.attr(res, 0);
			/* Look token */
			var flag = false;
			var res = parser.parser_base.constructor.readToken(parser);
			var look = Runtime.rtl.attr(res, 0);
			var token = Runtime.rtl.attr(res, 1);
			if (token.content == "{")
			{
				flag = true;
				parser = look;
			}
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			item = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = Runtime.rtl.attr(res, 0);
			if (flag)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.attr(res, 0);
			}
		}
		else if (ch == "@")
		{
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
			pos = pos + 1;
			var ch3 = Runtime.rs.substr(content.ref, pos, 3);
			var ch4 = Runtime.rs.substr(content.ref, pos, 4);
			if (ch3 == "raw" || ch4 == "json" || ch4 == "html")
			{
				var res;
				if (ch3 == "raw")
				{
					res = parser.parser_base.constructor.next(parser, ch3, x, y, pos);
				}
				if (ch4 == "json")
				{
					res = parser.parser_base.constructor.next(parser, ch4, x, y, pos);
				}
				if (ch4 == "html")
				{
					res = parser.parser_base.constructor.next(parser, ch4, x, y, pos);
				}
				x = Runtime.rtl.attr(res, 0);
				y = Runtime.rtl.attr(res, 1);
				pos = Runtime.rtl.attr(res, 2);
			}
			caret = new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos}));
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.attr(res, 0);
			/* Look bracket */
			var res = parser.parser_base.constructor.lookToken(parser, "{");
			var look = Runtime.rtl.attr(res, 0);
			var find_bracket = Runtime.rtl.attr(res, 2);
			if (find_bracket)
			{
				parser = look;
			}
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			item = Runtime.rtl.attr(res, 1);
			if (ch3 == "raw")
			{
				item = new BayLang.OpCodes.OpHtmlValue(Runtime.Map.from({"kind":BayLang.OpCodes.OpHtmlValue.KIND_RAW,"value":item,"caret_start":caret,"caret_end":parser.caret}));
			}
			else if (ch4 == "json")
			{
				item = new BayLang.OpCodes.OpHtmlValue(Runtime.Map.from({"kind":BayLang.OpCodes.OpHtmlValue.KIND_JSON,"value":item,"caret_start":caret,"caret_end":parser.caret}));
			}
			else if (ch4 == "html")
			{
				item = new BayLang.OpCodes.OpHtmlValue(Runtime.Map.from({"kind":BayLang.OpCodes.OpHtmlValue.KIND_HTML,"value":item,"caret_start":caret,"caret_end":parser.caret}));
			}
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = Runtime.rtl.attr(res, 0);
			if (find_bracket)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.attr(res, 0);
			}
		}
		return Runtime.Vector.from([parser,item]);
	},
	/**
	 * Read html attribute key
	 */
	readHTMLAttrKey: function(parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var key = "";
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "@")
		{
			parser = look;
			key = "@";
		}
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = Runtime.rtl.attr(res, 0);
		ident = Runtime.rtl.attr(res, 1);
		key += Runtime.rtl.toStr(ident.value);
		/* Read attr */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (token.content == "-")
		{
			var res = parser.parser_base.constructor.readIdentifier(look);
			parser = Runtime.rtl.attr(res, 0);
			ident = Runtime.rtl.attr(res, 1);
			key += Runtime.rtl.toStr("-" + Runtime.rtl.toStr(ident.value));
			/* Look next token */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == ":")
		{
			parser = look;
			key += Runtime.rtl.toStr(":");
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			ident = Runtime.rtl.attr(res, 1);
			key += Runtime.rtl.toStr(ident.value);
		}
		return Runtime.Vector.from([parser,key]);
	},
	/**
	 * Read html attribute value
	 */
	readHTMLAttrValue: function(parser, attr_key)
	{
		var token = null;
		var look = null;
		var op_code = null;
		var ident = null;
		var pos = parser.caret.pos;
		var content = parser.content;
		var ch = Runtime.rs.substr(content.ref, pos, 1);
		var ch2 = Runtime.rs.substr(content.ref, pos, 2);
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (Runtime.rs.substr(attr_key, 0, 7) == "@event:")
		{
			/* Look token */
			var res = parser.parser_base.constructor.lookToken(parser, "{");
			var look = Runtime.rtl.attr(res, 0);
			var token = Runtime.rtl.attr(res, 1);
			var is_fn = Runtime.rtl.attr(res, 2);
			if (is_fn)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.attr(res, 0);
				/* Look token */
				var res = parser.parser_base.constructor.lookToken(parser, "{");
				var look = Runtime.rtl.attr(res, 0);
				var token = Runtime.rtl.attr(res, 1);
				var find = Runtime.rtl.attr(res, 2);
				if (find)
				{
					parser = look;
				}
				/* Add msg to vars */
				var parser_vars = parser.vars;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.concat(Runtime.Map.from({"component":true,"msg":true})));
				/* Read expression */
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				/* Restore vars */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser_vars);
				/* Parse brackets */
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.attr(res, 0);
				if (find)
				{
					var res = parser.parser_base.constructor.matchToken(parser, "}");
					parser = Runtime.rtl.attr(res, 0);
				}
			}
			else
			{
				var res = parser.parser_base.constructor.readString(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
			}
		}
		else if (ch == "{")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.attr(res, 0);
			/* Look token */
			var res = parser.parser_base.constructor.lookToken(parser, "{");
			var look = Runtime.rtl.attr(res, 0);
			var token = Runtime.rtl.attr(res, 1);
			var find = Runtime.rtl.attr(res, 2);
			if (find)
			{
				parser = look;
			}
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = Runtime.rtl.attr(res, 0);
			if (find)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.attr(res, 0);
			}
		}
		else if (token.content == "@")
		{
			var res = this.readHTMLValue(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
		}
		else if (token.content == "[")
		{
			var res = parser.parser_base.constructor.readCollection(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
		}
		else
		{
			var res = parser.parser_base.constructor.readString(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read html attributes
	 */
	readHTMLAttrs: function(parser)
	{
		var items = new Runtime.Vector();
		var token = null;
		var look = null;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
		var ch = Runtime.rs.substr(content.ref, caret.pos, 1);
		while (ch != "/" && ch != ">" && caret.pos < content_sz)
		{
			var caret_start = caret;
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "...")
			{
				var ident = null;
				var res = parser.parser_base.constructor.matchToken(parser, "...");
				parser = Runtime.rtl.attr(res, 0);
				var res = parser.parser_base.constructor.readIdentifier(look);
				parser = Runtime.rtl.attr(res, 0);
				ident = Runtime.rtl.attr(res, 1);
				items.push(new BayLang.OpCodes.OpHtmlAttribute(Runtime.Map.from({"value":ident,"is_spread":true,"caret_start":caret_start,"caret_end":parser.caret})));
			}
			else
			{
				var res = this.readHTMLAttrKey(parser);
				parser = Runtime.rtl.attr(res, 0);
				var key = Runtime.rtl.attr(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, "=");
				parser = Runtime.rtl.attr(res, 0);
				var res = this.readHTMLAttrValue(parser, key);
				parser = Runtime.rtl.attr(res, 0);
				var value = Runtime.rtl.attr(res, 1);
				items.push(new BayLang.OpCodes.OpHtmlAttribute(Runtime.Map.from({"key":key,"value":value,"caret_start":caret_start,"caret_end":parser.caret})));
			}
			caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
			ch = Runtime.rs.substr(content.ref, caret.pos, 1);
			var ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
			if (ch2 == "/>")
			{
				break;
			}
		}
		return Runtime.Vector.from([parser,items]);
	},
	/**
	 * Read html template
	 */
	readHTMLContent: function(parser, end_tag)
	{
		var items = new Runtime.Vector();
		var item = null;
		var token = null;
		var look = null;
		var caret = null;
		var caret_start = parser.caret;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var start_pos = pos;
		var end_tag_sz = Runtime.rs.strlen(end_tag);
		var ch_pos = Runtime.rs.substr(content.ref, pos, end_tag_sz);
		var flag_first = true;
		var first_html_tag = false;
		if (end_tag == "")
		{
			first_html_tag = true;
		}
		while ((end_tag == "" || end_tag != "" && ch_pos != end_tag) && pos < content_sz)
		{
			var ch = Runtime.rs.substr(content.ref, pos, 1);
			var ch2 = Runtime.rs.substr(content.ref, pos, 2);
			var ch3 = Runtime.rs.substr(content.ref, pos, 3);
			var ch4 = Runtime.rs.substr(content.ref, pos, 4);
			var ch6 = Runtime.rs.substr(content.ref, pos, 6);
			var ch7 = Runtime.rs.substr(content.ref, pos, 7);
			/* Html comment */
			if (ch4 == "<!--")
			{
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
				caret = new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos}));
				value = Runtime.rs.trim(value, "\t\r\n");
				value = Runtime.rs.trim(value, " ");
				if (value != "")
				{
					item = new BayLang.OpCodes.OpHtmlContent(Runtime.Map.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.push(item);
				}
				/* Read HTML Comment */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readHTMLComment(parser);
				parser = Runtime.rtl.attr(res, 0);
				items.push(Runtime.rtl.attr(res, 1));
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch == "<" || ch2 == "{{" || ch == "@")
			{
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
				caret = new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos}));
				value = Runtime.rs.trim(value, "\t\r\n");
				if (flag_first && first_html_tag)
				{
					value = Runtime.rs.trim(value, " ");
				}
				if (value != "")
				{
					item = new BayLang.OpCodes.OpHtmlContent(Runtime.Map.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.push(item);
				}
				/* Read HTML Value */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readHTMLValue(parser);
				parser = Runtime.rtl.attr(res, 0);
				item = Runtime.rtl.attr(res, 1);
				items.push(item);
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch3 == "%if" || ch4 == "%for" || ch4 == "%var" || ch4 == "%set" || ch6 == "%while" || ch7 == "%render")
			{
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
				caret = new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos}));
				value = Runtime.rs.trim(value, "\t\r\n");
				value = Runtime.rs.trim(value, " ");
				if (value != "")
				{
					item = new BayLang.OpCodes.OpHtmlContent(Runtime.Map.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.push(item);
				}
				/* Read HTML Operator */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readHTMLOperator(parser);
				parser = Runtime.rtl.attr(res, 0);
				item = Runtime.rtl.attr(res, 1);
				items.push(item);
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				if (first_html_tag && ch != " " && ch != "\t" && ch != "\r" && ch != "\n")
				{
					break;
				}
				x = parser.parser_base.constructor.nextX(parser, ch, x);
				y = parser.parser_base.constructor.nextY(parser, ch, y);
				pos = pos + 1;
			}
			ch_pos = Runtime.rs.substr(content.ref, pos, end_tag_sz);
		}
		/* Push item */
		var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
		value = Runtime.rs.trim(value, "\t\r\n");
		caret = new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos}));
		if (first_html_tag)
		{
			value = Runtime.rs.trim(value, " ");
		}
		if (value != "")
		{
			item = new BayLang.OpCodes.OpHtmlContent(Runtime.Map.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
			items.push(item);
		}
		return Runtime.Vector.from([parser.copy(Runtime.Map.from({"caret":caret})),items]);
	},
	/**
	 * Read html tag
	 */
	readHTMLTag: function(parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var caret_items_start = null;
		var caret_items_end = null;
		var caret_start = parser.caret;
		var items = null;
		var op_code_name = null;
		var is_single_flag = false;
		var op_code_flag = false;
		var tag_name = "";
		/* Tag start */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "{")
		{
			op_code_flag = true;
			var caret1 = parser.caret;
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code_name = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = Runtime.rtl.attr(res, 0);
			var caret2 = parser.caret;
			tag_name = Runtime.rs.substr(parser.content.ref, caret1.pos, caret2.pos - caret1.pos);
		}
		else if (token.content == ">")
		{
			op_code_flag = true;
			tag_name = "";
		}
		else
		{
			var res = parser.parser_base.constructor.readIdentifier(parser, false);
			parser = Runtime.rtl.attr(res, 0);
			ident = Runtime.rtl.attr(res, 1);
			tag_name = ident.value;
		}
		var res = this.readHTMLAttrs(parser);
		parser = Runtime.rtl.attr(res, 0);
		var attrs = Runtime.rtl.attr(res, 1);
		/* Save vars */
		var save_vars = parser.vars;
		var slot_args = null;
		var slot_use = null;
		/* Read slot args */
		if (tag_name == "slot")
		{
			/* Slot args */
			var args_item = attrs.findItem(Runtime.lib.equalAttr("key", "args"));
			if (args_item)
			{
				var args_str = args_item.value.value;
				/* Create parser */
				var parser2 = new BayLang.LangBay.ParserBay();
				parser2 = parser2.constructor.reset(parser2);
				parser2 = parser2.constructor.setContent(parser2, args_str);
				parser2 = Runtime.rtl.setAttr(parser2, Runtime.Collection.from(["caret"]), new BayLang.Caret(Runtime.Map.from({})));
				/* Parse args */
				var res = parser2.parser_operator.constructor.readDeclareFunctionArgs(parser2, false, false);
				parser2 = Runtime.rtl.attr(res, 0);
				slot_args = Runtime.rtl.attr(res, 1);
				var parser2_vars = parser2.vars;
				/* Add slot args */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser2_vars);
			}
			/* Slot use */
			args_item = attrs.findItem(Runtime.lib.equalAttr("key", "use"));
			if (args_item)
			{
				var args_str = args_item.value.value;
				slot_use = new Runtime.Vector();
				/* Each items */
				var parser2_vars = Runtime.Map.from({});
				var items = Runtime.rs.split(",", args_str);
				for (var i = 0; i < items.count(); i++)
				{
					slot_use.push(new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"value":items.get(i),"kind":BayLang.OpCodes.OpIdentifier.KIND_VARIABLE})));
					parser2_vars.set(items.get(i), true);
				}
				/* Add slot args */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.concat(parser2_vars));
			}
		}
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "/")
		{
			parser = look;
			is_single_flag = true;
		}
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.attr(res, 0);
		if (!is_single_flag)
		{
			if (tag_name == "svg")
			{
				var res = parser.parser_base.constructor.readUntilStringArr(parser, Runtime.Vector.from(["</svg>"]), false);
				parser = Runtime.rtl.attr(res, 0);
				var content = Runtime.rtl.attr(res, 1);
				content = Runtime.re.replace("[\t\n]", "", content);
				var items = Runtime.Vector.from([new BayLang.OpCodes.OpHtmlValue(Runtime.Map.from({"kind":BayLang.OpCodes.OpHtmlValue.KIND_RAW,"value":new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":parser.caret,"caret_end":parser.caret,"value":content})),"caret_start":caret_start,"caret_end":parser.caret}))]);
			}
			else
			{
				/* Read items */
				caret_items_start = parser.caret;
				var res = this.readHTMLContent(parser, "</" + Runtime.rtl.toStr(tag_name));
				parser = Runtime.rtl.attr(res, 0);
				var items = Runtime.rtl.attr(res, 1);
				caret_items_end = parser.caret;
			}
			/* Tag end */
			if (op_code_flag)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "<");
				parser = Runtime.rtl.attr(res, 0);
				var res = parser.parser_base.constructor.matchToken(parser, "/");
				parser = Runtime.rtl.attr(res, 0);
				if (tag_name)
				{
					var res = parser.parser_base.constructor.matchString(parser, tag_name);
					parser = Runtime.rtl.attr(res, 0);
				}
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = Runtime.rtl.attr(res, 0);
			}
			else
			{
				var res = parser.parser_base.constructor.matchToken(parser, "<");
				parser = Runtime.rtl.attr(res, 0);
				var res = parser.parser_base.constructor.matchToken(parser, "/");
				parser = Runtime.rtl.attr(res, 0);
				if (ident != null)
				{
					var res = parser.parser_base.constructor.matchToken(parser, tag_name);
					parser = Runtime.rtl.attr(res, 0);
				}
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = Runtime.rtl.attr(res, 0);
			}
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		/* Create op_code */
		var op_code = null;
		if (tag_name == "slot")
		{
			var op_attr_name = attrs.findItem(Runtime.lib.equalAttr("key", "name"));
			/* Filter attrs */
			attrs = attrs.filter(Runtime.lib.equalAttrNot("key", "args"));
			attrs = attrs.filter(Runtime.lib.equalAttrNot("key", "name"));
			attrs = attrs.filter(Runtime.lib.equalAttrNot("key", "use"));
			var name = "";
			if (op_attr_name && op_attr_name.value instanceof BayLang.OpCodes.OpString)
			{
				name = op_attr_name.value.value;
			}
			op_code = new BayLang.OpCodes.OpHtmlSlot(Runtime.Map.from({"args":slot_args,"attrs":attrs,"name":name,"vars":slot_use,"caret_start":caret_start,"caret_end":parser.caret,"items":(items != null) ? (new BayLang.OpCodes.OpHtmlItems(Runtime.Map.from({"caret_start":caret_items_start,"caret_end":caret_items_end,"items":items}))) : (null)}));
		}
		else
		{
			op_code = new BayLang.OpCodes.OpHtmlTag(Runtime.Map.from({"attrs":attrs,"tag_name":tag_name,"op_code_name":op_code_name,"caret_start":caret_start,"caret_end":parser.caret,"items":(items != null) ? (new BayLang.OpCodes.OpHtmlItems(Runtime.Map.from({"caret_start":caret_items_start,"caret_end":caret_items_end,"items":items}))) : (null)}));
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read html operator
	 */
	readHTMLOperator: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "%if")
		{
			return parser.parser_operator.constructor.readIf(parser);
		}
		else if (token.content == "%for")
		{
			return parser.parser_operator.constructor.readFor(parser);
		}
		else if (token.content == "%while")
		{
			return parser.parser_operator.constructor.readWhile(parser);
		}
		else if (token.content == "%var")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.matchToken(parser, "%var");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_operator.constructor.readAssign(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = Runtime.rtl.attr(res, 0);
			return Runtime.Vector.from([parser,op_code]);
		}
		else if (token.content == "%set")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.matchToken(parser, "%set");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_operator.constructor.readAssign(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = Runtime.rtl.attr(res, 0);
			return Runtime.Vector.from([parser,op_code]);
		}
		else if (token.content == "%render")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.matchToken(parser, "%render");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_base.constructor.readDynamic(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			if (op_code instanceof BayLang.OpCodes.OpCall)
			{
				op_code = Runtime.rtl.setAttr(op_code, Runtime.Collection.from(["is_html"]), true);
			}
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = Runtime.rtl.attr(res, 0);
			return Runtime.Vector.from([parser,op_code]);
		}
		return Runtime.Vector.from([parser,null]);
	},
	/**
	 * Read html operator
	 */
	readHTML: function(parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "";
		var caret_start = parser.caret;
		/* Enable html flag */
		var save_is_html = parser.is_html;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_html"]), true);
		var res = this.readHTMLContent(parser, end_tag);
		parser = Runtime.rtl.attr(res, 0);
		var items = Runtime.rtl.attr(res, 1);
		var op_code = new BayLang.OpCodes.OpHtmlItems(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"items":items}));
		/* Disable html flag */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_html"]), save_is_html);
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read html operator
	 */
	readHTMLTemplate: function(parser, item_attrs, caret_start)
	{
		var fn_name = item_attrs.get("name", "render");
		var fn_args_str = item_attrs.get("args", "");
		var parser2_vars = Runtime.Map.from({});
		/*
		Collection<OpDeclareFunctionArg> fn_args =
		[
			new OpDeclareFunctionArg
			{
				"name": "component",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "layout",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "model_path",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "render_params",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "render_content",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
		];
		*/
		var fn_args = Runtime.Vector.from([]);
		if (item_attrs.has("args"))
		{
			var parser2 = parser.constructor.setContent(parser, fn_args_str);
			parser2 = Runtime.rtl.setAttr(parser2, Runtime.Collection.from(["caret"]), new BayLang.Caret(Runtime.Map.from({})));
			/* Parse args */
			var res = parser.parser_operator.constructor.readDeclareFunctionArgs(parser2, false, false);
			parser2 = Runtime.rtl.attr(res, 0);
			var fn_args2 = Runtime.rtl.attr(res, 1);
			parser2_vars = parser2.vars;
			fn_args = fn_args.concat(fn_args2);
		}
		/* If multiblock */
		var is_multiblock = false;
		if (item_attrs.has("multiblock"))
		{
			if (item_attrs.get("multiblock") == "true")
			{
				is_multiblock = true;
			}
			else if (item_attrs.get("multiblock") == "false")
			{
				is_multiblock = false;
			}
		}
		/* Register variable in parser */
		/*parser2_vars = parser2_vars
			.setIm("layout", true)
			.setIm("model", true)
			.setIm("model_path", true)
			.setIm("render_params", true)
			.setIm("render_content", true)
		;*/
		/* Read template content */
		var save_vars = parser.vars;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.concat(parser2_vars));
		var res = this.readHTML(parser, "</template");
		parser = Runtime.rtl.attr(res, 0);
		var expression = Runtime.rtl.attr(res, 1);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		/* Read template footer */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "/");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "template");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.attr(res, 0);
		var f = new BayLang.OpCodes.OpDeclareFunction(Runtime.Map.from({"args":fn_args,"vars":Runtime.Vector.from([]),"flags":new BayLang.OpCodes.OpFlags(Runtime.Map.from({"p_static":false,"p_pure":false,"p_multiblock":is_multiblock})),"name":fn_name,"result_type":"html","is_html":true,"expression":expression,"items":null,"caret_start":caret_start,"caret_end":parser.caret}));
		return Runtime.Vector.from([parser,f]);
	},
	/**
	 * Read html attributes
	 */
	readAttrs: function(parser)
	{
		var look = null;
		var op_code = null;
		var token = null;
		var look_token = null;
		var items = new Runtime.Map();
		var content = parser.content;
		var content_sz = parser.content_sz;
		var caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
		var ch = Runtime.rs.substr(content.ref, caret.pos, 1);
		while (ch != "/" && ch != ">" && caret.pos < content_sz)
		{
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "=");
			parser = Runtime.rtl.attr(res, 0);
			var attr_name = token.content;
			/* Look token */
			var res = parser.parser_base.constructor.readToken(parser);
			look_token = Runtime.rtl.attr(res, 1);
			if (look_token.content == "{")
			{
				var res = parser.parser_base.constructor.readDict(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				caret = parser.caret;
				items.set(attr_name, op_code);
			}
			else
			{
				var res = parser.parser_base.constructor.readString(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				items.set(attr_name, op_code.value);
			}
			caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
			ch = Runtime.rs.substr(content.ref, caret.pos, 1);
			var ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
			if (ch2 == "/>")
			{
				break;
			}
		}
		return Runtime.Vector.from([parser,items]);
	},
	/**
	 * Read item
	 */
	readWidget: function(parser)
	{
		var settings = new Runtime.Map();
		var items = new Runtime.Vector();
		/* Read item */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "widget");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.attr(res, 0);
		var token = null;
		var look = null;
		var caret = parser.getCaret();
		var caret_start = parser.getCaret();
		var end_tag = "</widget>";
		var end_tag_sz = Runtime.rs.strlen(end_tag);
		/* Skip empty chars */
		caret = parser.parser_base.constructor.skipChar(parser, parser.content, caret);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		/* Read next string */
		var caret = parser.getCaret();
		var next_tag = caret.nextString(end_tag_sz);
		while (next_tag != end_tag && !caret.eof())
		{
			/* Save caret */
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			var parser_item = parser;
			var res = parser.parser_base.constructor.matchToken(parser, "<");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			/* HTML Comment */
			if (token.content == "!--")
			{
				var res = this.readHTMLComment(parser_item);
				parser = Runtime.rtl.attr(res, 0);
			}
			else
			{
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = Runtime.rtl.attr(res, 0);
				var props_name = token.content;
				var props_value = "";
				/* Read widget */
				if (props_name == "widget")
				{
					var res = this.readWidget(parser_item);
					parser = Runtime.rtl.attr(res, 0);
					var item = Runtime.rtl.attr(res, 1);
					items.push(item);
				}
				else if (props_name == "style")
				{
					var res = this.readWidgetStyle(parser_item);
					parser = Runtime.rtl.attr(res, 0);
					var item = Runtime.rtl.attr(res, 1);
					items.push(item);
				}
				else
				{
					/* Get caret */
					var caret = parser.getCaret();
					/* Read content */
					var item_ch = caret.nextChar();
					while (item_ch != "<" && !caret.eof())
					{
						props_value += item_ch;
						caret.readChar();
						item_ch = caret.nextChar();
					}
					/* Save caret */
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
					settings.set(props_name, new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":caret,"caret_end":parser.caret,"value":props_value})));
					/* Read end tag */
					var res = parser.parser_base.constructor.matchToken(parser, "<");
					parser = Runtime.rtl.attr(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, "/");
					parser = Runtime.rtl.attr(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, props_name);
					parser = Runtime.rtl.attr(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, ">");
					parser = Runtime.rtl.attr(res, 0);
				}
			}
			/* Skip empty chars */
			caret = parser.parser_base.constructor.skipChar(parser, parser.content, parser.caret);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			/* Read next string */
			var caret = parser.getCaret();
			next_tag = caret.nextString(end_tag_sz);
		}
		/* Read item */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "/");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "widget");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.attr(res, 0);
		/* Create widget data */
		var op_code = new BayLang.OpCodes.OpWidget(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"items":items,"settings":settings}));
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read widget data
	 */
	readWidgetData: function(parser)
	{
		var token = null;
		var items = new Runtime.Vector();
		/* Read data */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "data");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.attr(res, 0);
		var caret = parser.getCaret();
		var caret_start = parser.getCaret();
		var end_tag = "</data>";
		var end_tag_sz = Runtime.rs.strlen(end_tag);
		/* Skip empty chars */
		caret = parser.parser_base.constructor.skipChar(parser, parser.content, caret);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		/* Read next string */
		var caret = parser.getCaret();
		var next_tag = caret.nextString(end_tag_sz);
		while (next_tag != end_tag && !caret.eof())
		{
			/* Save caret */
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			var parser_item = parser;
			var res = parser.parser_base.constructor.matchToken(parser, "<");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			/* HTML Comment */
			if (token.content == "!--")
			{
				var res = this.readHTMLComment(parser_item);
				parser = Runtime.rtl.attr(res, 0);
			}
			else
			{
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = Runtime.rtl.attr(res, 0);
				var item_name = token.content;
				/* Read widget */
				if (item_name == "widget")
				{
					var res = this.readWidget(parser_item);
					parser = Runtime.rtl.attr(res, 0);
					var item = Runtime.rtl.attr(res, 1);
					items.push(item);
				}
				else if (item_name == "class")
				{
					var res = this.readWidgetClass(parser_item);
					parser = Runtime.rtl.attr(res, 0);
					var item = Runtime.rtl.attr(res, 1);
					items.push(item);
				}
				else
				{
					throw new BayLang.Exceptions.ParserError("Unknown identifier '" + Runtime.rtl.toStr(item_name) + Runtime.rtl.toStr("'"), parser_item.caret, parser.file_name)
				}
			}
			/* Skip empty chars */
			caret = parser.parser_base.constructor.skipChar(parser, parser.content, parser.caret);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			/* Read next string */
			var caret = parser.getCaret();
			next_tag = caret.nextString(end_tag_sz);
		}
		/* Read data */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "/");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "data");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.attr(res, 0);
		/* Create widget data */
		var op_code = new BayLang.OpCodes.OpWidgetData(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"widget":items}));
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read UI
	 */
	readUIClass: function(parser)
	{
		var module_items = new Runtime.Vector();
		var items = new Runtime.Vector();
		var components = new Runtime.Vector();
		var class_caret_start = parser.caret;
		var token = null;
		var class_name = "";
		var class_extends = "";
		var class_version = "";
		var class_model = "";
		var item_name = "";
		var namespace_name = "";
		var short_name = "";
		var full_name = "";
		var is_component = "";
		var class_name_last = "";
		var class_annotations = new Runtime.Vector();
		/* Content */
		var content = parser.content;
		var content_sz = parser.content_sz;
		/* Read class header */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "class");
		parser = Runtime.rtl.attr(res, 0);
		var res = this.readAttrs(parser);
		parser = Runtime.rtl.attr(res, 0);
		var attrs = Runtime.rtl.attr(res, 1);
		class_name = attrs.get("name", "");
		class_extends = attrs.get("extends", null);
		class_version = attrs.get("version", "1.0");
		class_model = attrs.get("model", "Runtime.Dict");
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.attr(res, 0);
		var flag_is_component = true;
		var flag_is_model = false;
		if (attrs.get("type") == "model")
		{
			flag_is_component = false;
			flag_is_model = true;
		}
		/* Default class extends */
		if (class_extends == null)
		{
			if (flag_is_component)
			{
				class_extends = "Runtime.Web.Component";
			}
			else
			{
				class_extends = "Runtime.Web.BaseModel";
			}
		}
		var getClassShortName = (class_name) =>
		{
			var __v0 = new Runtime.Monad(class_name);
			var __v1 = (__varg0) => Runtime.rs.split(".", __varg0);
			__v0 = __v0.call(__v1);
			__v0 = __v0.callMethod("last", []);
			return __v0.value();
		};
		if (class_name == "Runtime.Web.Component")
		{
			class_extends = "Runtime.BaseObject";
		}
		else
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(getClassShortName(class_name), class_name));
		}
		if (class_extends != "" && class_extends != null)
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(getClassShortName(class_extends), class_extends));
			if (class_extends != "Runtime.BaseObject" && class_extends != "Runtime.Web.Component" && class_extends != "Runtime.Web.BaseModel")
			{
				components.push(class_extends);
			}
		}
		if (class_model != "" && class_model != "Runtime.Dict")
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(getClassShortName(class_model), class_model));
		}
		var class_name_arr = Runtime.rs.split(".", class_name);
		class_name_last = class_name_arr.last();
		class_name_arr = class_name_arr.slice(0, -1);
		namespace_name = Runtime.rs.join(".", class_name_arr);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_name"]), class_name_last);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_namespace_name"]), namespace_name);
		var class_extend_op_code = null;
		if (class_extends != null)
		{
			class_extend_op_code = new BayLang.OpCodes.OpTypeIdentifier(Runtime.Map.from({"entity_name":new BayLang.OpCodes.OpEntityName(Runtime.Map.from({"caret_start":class_caret_start,"caret_end":parser.caret,"names":Runtime.rs.split(".", class_extends)})),"template":null,"caret_start":class_caret_start,"caret_end":parser.caret}));
		}
		/* Add namespace */
		module_items.push(new BayLang.OpCodes.OpNamespace(Runtime.Map.from({"name":namespace_name})));
		/* Read class body */
		var caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		var ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
		while (ch2 != "</" && caret.pos < content_sz)
		{
			var parser_start = parser;
			var caret_start = parser.caret;
			var res = parser.parser_base.constructor.matchToken(parser, "<");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.attr(res, 0);
			var item_token = Runtime.rtl.attr(res, 1);
			item_name = item_token.content;
			/* Html comment */
			if (item_name == "!--")
			{
				var res = this.readHTMLComment(parser_start);
				parser = Runtime.rtl.attr(res, 0);
				items.push(Runtime.rtl.attr(res, 1));
				caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
				ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
				continue;
			}
			var res = this.readAttrs(parser);
			parser = Runtime.rtl.attr(res, 0);
			var item_attrs = Runtime.rtl.attr(res, 1);
			if (item_name == "annotation")
			{
				var annotation_name = item_attrs.get("name", "");
				var annotation_op_code = item_attrs.get("value", null);
				class_annotations.push(new BayLang.OpCodes.OpAnnotation(Runtime.Map.from({"name":new BayLang.OpCodes.OpTypeIdentifier(Runtime.Map.from({"entity_name":new BayLang.OpCodes.OpEntityName(Runtime.Map.from({"names":Runtime.rs.split(".", annotation_name)}))})),"params":annotation_op_code})));
			}
			else if (item_name == "use")
			{
				full_name = item_attrs.get("name", "");
				short_name = item_attrs.get("as", "");
				is_component = item_attrs.get("component", "false");
				is_component = is_component == "true" || is_component == "1";
				if (short_name == "")
				{
					short_name = Runtime.rs.split(".", full_name).last();
				}
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(short_name, full_name));
				if (is_component)
				{
					components.push(full_name);
				}
				module_items.push(new BayLang.OpCodes.OpUse(Runtime.Map.from({"name":full_name,"alias":short_name,"is_component":is_component})));
			}
			/* Read body */
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == ">")
			{
				if (item_name == "template")
				{
					var res = this.readHTMLTemplate(parser, item_attrs, caret_start);
					parser = Runtime.rtl.attr(res, 0);
					var op_code = Runtime.rtl.attr(res, 1);
					items.push(op_code);
				}
				else if (item_name == "style")
				{
					var res = this.readStyle(parser, item_attrs, items, caret_start);
					parser = Runtime.rtl.attr(res, 0);
					var op_code = Runtime.rtl.attr(res, 1);
					items.push(op_code);
				}
				else if (item_name == "script")
				{
					var res = parser.parser_program.constructor.readClassBody(parser, "</");
					parser = Runtime.rtl.attr(res, 0);
					var arr = Runtime.rtl.attr(res, 1);
					items.appendItems(arr);
					/* Read script footer */
					var res = parser.parser_base.constructor.matchToken(parser, "<");
					parser = Runtime.rtl.attr(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, "/");
					parser = Runtime.rtl.attr(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, "script");
					parser = Runtime.rtl.attr(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, ">");
					parser = Runtime.rtl.attr(res, 0);
				}
				else
				{
					throw new BayLang.Exceptions.ParserError("Unknown identifier '" + Runtime.rtl.toStr(item_name) + Runtime.rtl.toStr("'"), item_token.caret_start, parser.file_name)
				}
			}
			else if (token.content == "/")
			{
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = Runtime.rtl.attr(res, 0);
			}
			else
			{
				throw new BayLang.Exceptions.ParserError("Unknown identifier '" + Runtime.rtl.toStr(token.content) + Runtime.rtl.toStr("'"), token.caret_start, parser.file_name)
			}
			caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
		}
		/* Add components function */
		if (components.count() > 0)
		{
			var f = new BayLang.OpCodes.OpDeclareFunction(Runtime.Map.from({"args":Runtime.Vector.from([]),"vars":Runtime.Vector.from([]),"flags":new BayLang.OpCodes.OpFlags(Runtime.Map.from({"p_static":true,"p_pure":true})),"name":"components","result_type":"var","expression":new BayLang.OpCodes.OpCollection(Runtime.Map.from({"caret_start":parser.caret,"caret_end":parser.caret,"values":components.map((class_name) =>
			{
				return new BayLang.OpCodes.OpString(Runtime.Map.from({"caret_start":parser.caret,"caret_end":parser.caret,"value":class_name}));
			})})),"items":null,"caret_start":parser.caret,"caret_end":parser.caret}));
			items.push(f);
		}
		/* Read class footer */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "/");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "class");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.attr(res, 0);
		/* Analyze class body */
		var class_body = parser.parser_program.constructor.classBodyAnalyze(parser, items);
		/* Add class */
		module_items.push(new BayLang.OpCodes.OpDeclareClass(Runtime.Map.from({"kind":BayLang.OpCodes.OpDeclareClass.KIND_CLASS,"name":class_name_last,"is_static":true,"is_component":flag_is_component,"is_model":flag_is_model,"is_declare":false,"class_extends":class_extend_op_code,"class_implements":null,"annotations":Runtime.Vector.from([]),"template":null,"vars":class_body.item("vars"),"annotations":class_annotations,"functions":class_body.item("functions"),"fn_create":class_body.item("fn_create"),"fn_destroy":class_body.item("fn_destroy"),"items":items,"caret_start":class_caret_start,"caret_end":parser.caret})));
		return Runtime.Vector.from([parser,module_items]);
	},
	/**
	 * Read UI
	 */
	readUI: function(parser)
	{
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		while (token.content == "<")
		{
			var parser_start = parser;
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "class")
			{
				var res = this.readUIClass(parser_start);
				parser = Runtime.rtl.attr(res, 0);
				items.appendItems(Runtime.rtl.attr(res, 1));
			}
			else if (token.content == "!--")
			{
				var res = this.readHTMLComment(parser_start);
				parser = Runtime.rtl.attr(res, 0);
				items.push(Runtime.rtl.attr(res, 1));
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpModule(Runtime.Map.from({"is_component":true,"uses":parser.uses,"items":items,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.ParserBayHtml";
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
Runtime.rtl.defClass(BayLang.LangBay.ParserBayHtml);
window["BayLang.LangBay.ParserBayHtml"] = BayLang.LangBay.ParserBayHtml;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.ParserBayHtml;