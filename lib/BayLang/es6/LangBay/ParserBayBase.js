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
BayLang.LangBay.ParserBayBase = function()
{
};
Object.assign(BayLang.LangBay.ParserBayBase.prototype,
{
});
Object.assign(BayLang.LangBay.ParserBayBase,
{
	/**
	 * Return true if is char
	 * @param char ch
	 * @return boolean
	 */
	isChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayBase.isChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.indexOf("qazwsxedcrfvtgbyhnujmikolp", Runtime.rs.lower(ch)) !== -1;
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	isNumber: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayBase.isNumber", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.indexOf("0123456789", ch) !== -1;
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isNumber", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isHexChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayBase.isHexChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.indexOf("0123456789abcdef", Runtime.rs.lower(ch)) !== -1;
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isHexChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	isStringOfNumbers: function(s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayBase.isStringOfNumbers", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var sz = Runtime.rs.strlen(s);
		for (var i = 0; i < sz; i++)
		{
			if (!this.isNumber(Runtime.rs.charAt(s, i)))
			{
				var __memorize_value = false;
				Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = true;
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Is system type
	 */
	isSystemType: function(name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayBase.isSystemType", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (name == "var")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "void")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "bool")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "byte")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "int")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "double")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "float")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "char")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "string")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "list")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "scalar")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "primitive")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "html")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Error")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Object")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "DateTime")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Collection")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Dict")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Vector")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Map")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rs")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rtl")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "ArrayInterface")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if name is identifier
	 */
	isIdentifier: function(name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayBase.isIdentifier", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (name == "")
		{
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "@")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		if (this.isNumber(Runtime.rs.charAt(name, 0)))
		{
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var sz = Runtime.rs.strlen(name);
		for (var i = 0; i < sz; i++)
		{
			var ch = Runtime.rs.charAt(name, i);
			if (this.isChar(ch) || this.isNumber(ch) || ch == "_")
			{
				continue;
			}
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = true;
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if reserved words
	 */
	isReserved: function(name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayBase.isReserved", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (name == "__async_t")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "__async_var")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		/*if (name == "__ctx") return true;*/
		/*if (name == "ctx") return true;*/
		if (Runtime.rs.substr(name, 0, 3) == "__v")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns kind of identifier or thrown Error
	 */
	findIdentifier: function(parser, name, caret)
	{
		var kind = "";
		if (parser.vars.has(name))
		{
			kind = BayLang.OpCodes.OpIdentifier.KIND_VARIABLE;
		}
		else if (parser.uses.has(name))
		{
			kind = BayLang.OpCodes.OpIdentifier.KIND_CLASS;
		}
		else if (this.isSystemType(name))
		{
			kind = BayLang.OpCodes.OpIdentifier.KIND_SYS_TYPE;
		}
		else if (name == "log")
		{
			kind = BayLang.OpCodes.OpIdentifier.KIND_SYS_FUNCTION;
		}
		else if (name == "window" || name == "document")
		{
			kind = BayLang.OpCodes.OpIdentifier.KIND_VARIABLE;
		}
		else if (name == "null" || name == "true" || name == "false")
		{
			kind = BayLang.OpCodes.OpIdentifier.KIND_CONSTANT;
		}
		else if (name == "fn")
		{
			kind = BayLang.OpCodes.OpIdentifier.KIND_FUNCTION;
		}
		else if (name == "@" || name == "_")
		{
			kind = BayLang.OpCodes.OpIdentifier.KIND_CONTEXT;
		}
		else if (name == "static" || name == "self" || name == "this" || name == "parent")
		{
			kind = BayLang.OpCodes.OpIdentifier.KIND_CLASSREF;
		}
		return kind;
	},
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayBase.isTokenChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.indexOf("qazwsxedcrfvtgbyhnujmikolp0123456789_", Runtime.rs.lower(ch)) !== -1;
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isTokenChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.LangBay.ParserBayBase.isSkipChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (Runtime.rs.ord(ch) <= 32)
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("BayLang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns next X
	 */
	nextX: function(parser, ch, x, direction)
	{
		if (direction == undefined) direction = 1;
		if (ch == "\t")
		{
			return x + parser.tab_size * direction;
		}
		if (ch == "\n")
		{
			return 0;
		}
		return x + direction;
	},
	/**
	 * Returns next Y
	 */
	nextY: function(parser, ch, y, direction)
	{
		if (direction == undefined) direction = 1;
		if (ch == "\n")
		{
			return y + direction;
		}
		return y;
	},
	/**
	 * Returns next
	 */
	next: function(parser, s, x, y, pos)
	{
		var sz = Runtime.rs.strlen(s);
		for (var i = 0; i < sz; i++)
		{
			var ch = Runtime.rs.substr(s, i, 1);
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
		}
		return Runtime.Vector.from([x,y,pos]);
	},
	/**
	 * Open comment
	 */
	isCommentOpen: function(parser, str)
	{
		return parser.skip_comments && ((parser.is_html) ? (str == "<!--") : (str == "/*"));
	},
	/**
	 * Close comment
	 */
	isCommentClose: function(parser, str)
	{
		return (parser.is_html) ? (str == "-->") : (str == "*/");
	},
	/**
	 * Skip char
	 */
	skipChar: function(parser, content, start_pos)
	{
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		var skip_comments = parser.skip_comments;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new BayLang.Exceptions.ParserEOF()
		}
		var ch = Runtime.rs.charAt(content.ref, pos);
		var ch2 = Runtime.rs.substr(content.ref, pos, 2);
		var ch4 = Runtime.rs.substr(content.ref, pos, 4);
		while ((this.isSkipChar(ch) || this.isCommentOpen(parser, ch2) || this.isCommentOpen(parser, ch4)) && pos < parser.content_sz)
		{
			if (this.isCommentOpen(parser, ch2))
			{
				ch2 = Runtime.rs.substr(content.ref, pos, 2);
				while (!this.isCommentClose(parser, ch2) && pos < parser.content_sz)
				{
					x = this.nextX(parser, ch, x);
					y = this.nextY(parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					ch = Runtime.rs.charAt(content.ref, pos);
					ch2 = Runtime.rs.substr(content.ref, pos, 2);
				}
				if (this.isCommentClose(parser, ch2))
				{
					x = x + 2;
					pos = pos + 2;
				}
			}
			else if (this.isCommentOpen(parser, ch4))
			{
				var ch3 = Runtime.rs.substr(content.ref, pos, 3);
				while (!this.isCommentClose(parser, ch3) && pos < parser.content_sz)
				{
					x = this.nextX(parser, ch, x);
					y = this.nextY(parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					ch = Runtime.rs.charAt(content.ref, pos);
					ch3 = Runtime.rs.substr(content.ref, pos, 3);
				}
				if (this.isCommentClose(parser, ch3))
				{
					x = x + 3;
					pos = pos + 3;
				}
			}
			else
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= parser.content_sz)
			{
				break;
			}
			ch = Runtime.rs.charAt(content.ref, pos);
			ch2 = Runtime.rs.substr(content.ref, pos, 2);
			ch4 = Runtime.rs.substr(content.ref, pos, 4);
		}
		return new BayLang.Caret(Runtime.Map.from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read special token
	 */
	readSpecialToken: function(parser, content, start_pos)
	{
		var pos = start_pos.pos;
		var s = "";
		s = Runtime.rs.substr(content.ref, pos, 10);
		if (s == "#endswitch")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 7);
		if (s == "#ifcode" || s == "#switch" || s == "#elseif" || s == "%render")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 6);
		if (s == "#endif" || s == "#ifdef" || s == "%while")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 5);
		if (s == "#case" || s == "%else")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 4);
		if (s == "@css" || s == "%for" || s == "%var" || s == "%set")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 3);
		if (s == "!--" || s == "!==" || s == "===" || s == "..." || s == "#if" || s == "%if")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 2);
		if (s == "==" || s == "!=" || s == "<=" || s == ">=" || s == "=>" || s == "->" || s == "|>" || s == "::" || s == "+=" || s == "-=" || s == "~=" || s == "**" || s == "<<" || s == ">>" || s == "++" || s == "--")
		{
			return s;
		}
		return "";
	},
	/**
	 * Read next token and return caret end
	 */
	nextToken: function(parser, content, start_pos)
	{
		var is_first = true;
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new BayLang.Exceptions.ParserEOF()
		}
		var s = this.readSpecialToken(parser, content, start_pos);
		if (s != "")
		{
			var sz = Runtime.rs.strlen(s);
			for (var i = 0; i < sz; i++)
			{
				var ch = Runtime.rs.charAt(s, i);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			return new BayLang.Caret(Runtime.Map.from({"pos":pos,"x":x,"y":y}));
		}
		var ch = Runtime.rs.charAt(content.ref, pos);
		if (!this.isTokenChar(ch))
		{
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
		}
		else
		{
			while (this.isTokenChar(ch))
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = Runtime.rs.charAt(content.ref, pos);
			}
		}
		return new BayLang.Caret(Runtime.Map.from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read back
	 */
	readBack: function(parser, search)
	{
		if (search == undefined) search = "";
		var content = parser.content;
		var caret = parser.caret;
		var x = caret.x;
		var y = caret.y;
		var pos = caret.pos;
		var search_sz = Runtime.rs.strlen(search);
		var s = "";
		while (pos >= 0)
		{
			var ch = Runtime.rs.charAt(content.ref, pos);
			x = this.nextX(parser, ch, x, -1);
			y = this.nextY(parser, ch, y, -1);
			pos--;
			s = Runtime.rs.substr(content.ref, pos, search_sz);
			if (s == search)
			{
				break;
			}
		}
		return parser.copy(Runtime.Map.from({"caret":new BayLang.Caret(Runtime.Map.from({"pos":pos,"x":x,"y":y}))}));
	},
	/**
	 * Read next token
	 */
	readToken: function(parser)
	{
		var caret_start = null;
		var caret_end = null;
		var eof = false;
		try
		{
			caret_start = this.skipChar(parser, parser.content, parser.caret);
			caret_end = this.nextToken(parser, parser.content, caret_start);
		}
		catch (_ex)
		{
			if (_ex instanceof BayLang.Exceptions.ParserEOF)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret;
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		return Runtime.Vector.from([parser.copy(Runtime.Map.from({"caret":caret_end})),new BayLang.CoreToken(Runtime.Map.from({"content":Runtime.rs.substr(parser.content.ref, caret_start.pos, caret_end.pos - caret_start.pos),"caret_start":caret_start,"caret_end":caret_end,"eof":eof}))]);
	},
	/**
	 * Look next token
	 */
	lookToken: function(parser, token)
	{
		var token_content = "";
		var content = parser.content;
		var caret_start = null;
		var caret_end = null;
		var sz = Runtime.rs.strlen(token);
		var eof = false;
		var find = false;
		try
		{
			caret_start = this.skipChar(parser, content, parser.caret);
			var pos = caret_start.pos;
			var x = caret_start.x;
			var y = caret_start.y;
			token_content = Runtime.rs.substr(content.ref, pos, sz);
			if (token_content == token)
			{
				find = true;
			}
			var res = this.next(parser, token_content, x, y, pos);
			x = Runtime.rtl.attr(res, 0);
			y = Runtime.rtl.attr(res, 1);
			pos = Runtime.rtl.attr(res, 2);
			caret_end = new BayLang.Caret(Runtime.Map.from({"pos":pos,"x":x,"y":y}));
		}
		catch (_ex)
		{
			if (_ex instanceof BayLang.Exceptions.ParserEOF)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret;
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		return Runtime.Vector.from([parser.copy(Runtime.Map.from({"caret":caret_end})),new BayLang.CoreToken(Runtime.Map.from({"content":token_content,"caret_start":caret_start,"caret_end":caret_end,"eof":eof})),find]);
	},
	/**
	 * Match next token
	 */
	matchToken: function(parser, next_token)
	{
		var token = null;
		/* Look token */
		var res = this.lookToken(parser, next_token);
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var find = Runtime.rtl.attr(res, 2);
		if (!find)
		{
			throw new BayLang.Exceptions.ParserExpected(next_token, token.caret_start, parser.file_name)
		}
		return Runtime.Vector.from([parser,token]);
	},
	/**
	 * Match next string
	 */
	matchString: function(parser, str1)
	{
		var caret = parser.caret;
		var sz = Runtime.rs.strlen(str1);
		var str2 = Runtime.rs.substr(parser.content.ref, caret.pos, sz);
		if (str1 != str2)
		{
			throw new BayLang.Exceptions.ParserExpected(str1, caret, parser.file_name)
		}
		var res = this.next(parser, str1, caret.x, caret.y, caret.pos);
		caret = new BayLang.Caret(Runtime.Map.from({"x":Runtime.rtl.attr(res, 0),"y":Runtime.rtl.attr(res, 1),"pos":Runtime.rtl.attr(res, 2)}));
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		return Runtime.Vector.from([parser,null]);
	},
	/**
	 * Read number
	 */
	readNumber: function(parser, flag_negative)
	{
		if (flag_negative == undefined) flag_negative = false;
		var token = null;
		var start = parser;
		/* Read token */
		var res = this.readToken(parser);
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		if (token.content == "")
		{
			throw new BayLang.Exceptions.ParserExpected("Number", caret_start, parser.file_name)
		}
		if (!this.isStringOfNumbers(token.content))
		{
			throw new BayLang.Exceptions.ParserExpected("Number", caret_start, parser.file_name)
		}
		var value = token.content;
		/* Look dot */
		var res = this.readToken(parser);
		var look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == ".")
		{
			value += Runtime.rtl.toStr(".");
			var res = this.readToken(look);
			parser = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			value += Runtime.rtl.toStr(token.content);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpNumber(Runtime.Map.from({"value":value,"caret_start":caret_start,"caret_end":parser.caret,"negative":flag_negative}))]);
	},
	/**
	 * Read string
	 */
	readUntilStringArr: function(parser, arr, flag_include)
	{
		if (flag_include == undefined) flag_include = true;
		var token = null;
		var look = null;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		/* Search next string in arr */
		var search = (pos) =>
		{
			for (var i = 0; i < arr.count(); i++)
			{
				var item = arr.item(i);
				var sz = Runtime.rs.strlen(item);
				var str = Runtime.rs.substr(content.ref, pos, sz);
				if (str == item)
				{
					return i;
				}
			}
			return -1;
		};
		/* Start and end positionss */
		var start_pos = pos;
		var end_pos = pos;
		/* Read string value */
		var ch = "";
		var arr_pos = search(pos);
		while (pos < content_sz && arr_pos == -1)
		{
			ch = Runtime.rs.charAt(content.ref, pos);
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
			if (pos >= content_sz)
			{
				throw new BayLang.Exceptions.ParserExpected(Runtime.rs.join(",", arr), new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			arr_pos = search(pos);
		}
		if (arr_pos == -1)
		{
			throw new BayLang.Exceptions.ParserExpected("End of string", new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		if (!flag_include)
		{
			end_pos = pos;
		}
		else
		{
			var item = arr.item(arr_pos);
			var sz = Runtime.rs.strlen(item);
			for (var i = 0; i < sz; i++)
			{
				ch = Runtime.rs.charAt(content.ref, pos);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			end_pos = pos;
		}
		/* Return result */
		var caret_end = new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":end_pos}));
		return Runtime.Vector.from([parser.copy(Runtime.Map.from({"caret":caret_end})),Runtime.rs.substr(content.ref, start_pos, end_pos - start_pos)]);
	},
	/**
	 * Read string
	 */
	readString: function(parser)
	{
		var token = null;
		var look = null;
		/* Read token */
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var str_char = token.content;
		/* Read begin string char */
		if (str_char != "'" && str_char != "\"")
		{
			throw new BayLang.Exceptions.ParserExpected("String", caret_start, parser.file_name)
		}
		var content = look.content;
		var content_sz = look.content_sz;
		var pos = look.caret.pos;
		var x = look.caret.x;
		var y = look.caret.y;
		/* Read string value */
		var value_str = "";
		var ch = Runtime.rs.charAt(content.ref, pos);
		while (pos < content_sz && ch != str_char)
		{
			if (ch == "\\")
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= content_sz)
				{
					throw new BayLang.Exceptions.ParserExpected("End of string", new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos})), parser.file_name)
				}
				var ch2 = Runtime.rs.charAt(content.ref, pos);
				if (ch2 == "n")
				{
					value_str += Runtime.rtl.toStr("\n");
				}
				else if (ch2 == "r")
				{
					value_str += Runtime.rtl.toStr("\r");
				}
				else if (ch2 == "t")
				{
					value_str += Runtime.rtl.toStr("\t");
				}
				else if (ch2 == "s")
				{
					value_str += Runtime.rtl.toStr(" ");
				}
				else if (ch2 == "\\")
				{
					value_str += Runtime.rtl.toStr("\\");
				}
				else if (ch2 == "'")
				{
					value_str += Runtime.rtl.toStr("'");
				}
				else if (ch2 == "\"")
				{
					value_str += Runtime.rtl.toStr("\"");
				}
				else
				{
					value_str += Runtime.rtl.toStr(ch + Runtime.rtl.toStr(ch2));
				}
				x = this.nextX(parser, ch2, x);
				y = this.nextY(parser, ch2, y);
				pos = pos + 1;
			}
			else
			{
				value_str += Runtime.rtl.toStr(ch);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= content_sz)
			{
				throw new BayLang.Exceptions.ParserExpected("End of string", new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			ch = Runtime.rs.charAt(content.ref, pos);
		}
		/* Read end string char */
		if (ch != "'" && ch != "\"")
		{
			throw new BayLang.Exceptions.ParserExpected("End of string", new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		x = this.nextX(parser, ch, x);
		y = this.nextY(parser, ch, y);
		pos = pos + 1;
		/* Return result */
		var caret_end = new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos}));
		return Runtime.Vector.from([parser.copy(Runtime.Map.from({"caret":caret_end})),new BayLang.OpCodes.OpString(Runtime.Map.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
	},
	/**
	 * Read comment
	 */
	readComment: function(parser)
	{
		var start = parser;
		var token = null;
		var look = null;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = BayLang.LangBay.ParserBayBase.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		if (token.content == "/")
		{
			parser = look;
			var content = look.content;
			var content_sz = look.content_sz;
			var pos = look.caret.pos;
			var x = look.caret.x;
			var y = look.caret.y;
			var pos_start = pos;
			var ch = Runtime.rs.charAt(content.ref, pos);
			var ch2 = Runtime.rs.substr(content.ref, pos, 2);
			while (!this.isCommentClose(parser, ch2) && pos < content_sz)
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = Runtime.rs.charAt(content.ref, pos);
				ch2 = Runtime.rs.substr(content.ref, pos, 2);
			}
			var pos_end = pos;
			if (this.isCommentClose(parser, ch2))
			{
				x = x + 2;
				pos = pos + 2;
			}
			else
			{
				throw new BayLang.Exceptions.ParserExpected("End of comment", new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos})), start.file_name)
			}
			/* Return result */
			var value_str = Runtime.rs.substr(content.ref, pos_start + 1, pos_end - pos_start - 1);
			var caret_end = new BayLang.Caret(Runtime.Map.from({"x":x,"y":y,"pos":pos}));
			return Runtime.Vector.from([start.copy(Runtime.Map.from({"caret":caret_end})),new BayLang.OpCodes.OpComment(Runtime.Map.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		}
		return Runtime.Vector.from([parser,null]);
	},
	/**
	 * Read identifier
	 */
	readIdentifier: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var start = parser;
		var token = null;
		var look = null;
		var name = "";
		var res = BayLang.LangBay.ParserBayBase.readToken(parser);
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "")
		{
			throw new BayLang.Exceptions.ParserExpected("Identifier", token.caret_start, parser.file_name)
		}
		if (!this.isIdentifier(token.content))
		{
			throw new BayLang.Exceptions.ParserExpected("Identifier", token.caret_start, parser.file_name)
		}
		if (this.isReserved(token.content))
		{
			throw new BayLang.Exceptions.ParserExpected("Identifier " + Runtime.rtl.toStr(token.content) + Runtime.rtl.toStr(" is reserverd"), token.caret_start, parser.file_name)
		}
		name = token.content;
		var kind = this.findIdentifier(parser, name, token.caret_start);
		if (parser.find_ident && find_ident && kind == "")
		{
			throw new BayLang.Exceptions.ParserError("Unknown identifier '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("'"), token.caret_start, parser.file_name)
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"kind":kind,"value":name,"caret_start":token.caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read entity name
	 */
	readEntityName: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var ident = null;
		var names = new Runtime.Vector();
		var res = parser.parser_base.constructor.readIdentifier(parser, find_ident);
		parser = Runtime.rtl.attr(res, 0);
		ident = Runtime.rtl.attr(res, 1);
		var caret_start = ident.caret_start;
		var name = ident.value;
		names.push(name);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && token.content == ".")
		{
			var res = parser.parser_base.constructor.matchToken(parser, ".");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			ident = Runtime.rtl.attr(res, 1);
			name = ident.value;
			names.push(name);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpEntityName(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"names":names}))]);
	},
	/**
	 * Read type identifier
	 */
	readTypeIdentifier: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var start = parser;
		var look = null;
		var token = null;
		var op_code = null;
		var entity_name = null;
		var template = null;
		var res = this.readEntityName(parser, find_ident);
		parser = Runtime.rtl.attr(res, 0);
		entity_name = Runtime.rtl.attr(res, 1);
		var caret_start = entity_name.caret_start;
		var flag_open_caret = false;
		var flag_end_caret = false;
		var res = this.lookToken(parser, "<");
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		flag_open_caret = Runtime.rtl.attr(res, 2);
		if (flag_open_caret)
		{
			template = new Runtime.Vector();
			var res = this.matchToken(parser, "<");
			parser = Runtime.rtl.attr(res, 0);
			var res = this.lookToken(parser, ">");
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			flag_end_caret = Runtime.rtl.attr(res, 2);
			while (!token.eof && !flag_end_caret)
			{
				var parser_value = null;
				var res = this.readTypeIdentifier(parser);
				parser = Runtime.rtl.attr(res, 0);
				parser_value = Runtime.rtl.attr(res, 1);
				template.push(parser_value);
				var res = this.lookToken(parser, ">");
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				flag_end_caret = Runtime.rtl.attr(res, 2);
				if (!flag_end_caret)
				{
					var res = this.matchToken(parser, ",");
					parser = Runtime.rtl.attr(res, 0);
					var res = this.lookToken(parser, ">");
					look = Runtime.rtl.attr(res, 0);
					token = Runtime.rtl.attr(res, 1);
					flag_end_caret = Runtime.rtl.attr(res, 2);
				}
			}
			var res = this.matchToken(parser, ">");
			parser = Runtime.rtl.attr(res, 0);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpTypeIdentifier(Runtime.Map.from({"entity_name":entity_name,"template":template,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read collection
	 */
	readCollection: function(parser)
	{
		var start = parser;
		var look = null;
		var token = null;
		var values = new Runtime.Vector();
		var ifdef_condition = null;
		var flag_ifdef = false;
		var res = this.matchToken(parser, "[");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && token.content != "]")
		{
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "#ifdef")
			{
				parser = look;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.attr(res, 0);
				ifdef_condition = Runtime.rtl.attr(res, 1);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), true);
				var res = parser.parser_base.constructor.matchToken(parser, "then");
				parser = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				flag_ifdef = true;
			}
			var parser_value = null;
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			parser_value = Runtime.rtl.attr(res, 1);
			var res = this.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == ",")
			{
				parser = look;
				var res = this.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
			}
			if (flag_ifdef)
			{
				parser_value = new BayLang.OpCodes.OpPreprocessorIfDef(Runtime.Map.from({"items":parser_value,"condition":ifdef_condition}));
			}
			values.push(parser_value);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "#endif")
			{
				parser = look;
				flag_ifdef = false;
				ifdef_condition = null;
			}
			var res = this.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		var res = this.matchToken(parser, "]");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpCollection(Runtime.Map.from({"values":values,"caret_start":caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read collection
	 */
	readDict: function(parser)
	{
		var look = null;
		var token = null;
		var values = new Runtime.Vector();
		var ifdef_condition = null;
		var flag_ifdef = false;
		var res = this.matchToken(parser, "{");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && token.content != "}")
		{
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "#ifdef")
			{
				parser = look;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.attr(res, 0);
				ifdef_condition = Runtime.rtl.attr(res, 1);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), true);
				var res = parser.parser_base.constructor.matchToken(parser, "then");
				parser = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				flag_ifdef = true;
			}
			var parser_value = null;
			var res = this.readString(parser);
			parser = Runtime.rtl.attr(res, 0);
			parser_value = Runtime.rtl.attr(res, 1);
			var key = parser_value.value;
			var res = this.matchToken(parser, ":");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			parser_value = Runtime.rtl.attr(res, 1);
			var res = this.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == ",")
			{
				parser = look;
			}
			values.push(new BayLang.OpCodes.OpDictPair(Runtime.Map.from({"key":key,"value":parser_value,"condition":ifdef_condition})));
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "#endif")
			{
				parser = look;
				flag_ifdef = false;
				ifdef_condition = null;
			}
			var res = this.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		var res = this.matchToken(parser, "}");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpDict(Runtime.Map.from({"values":values,"caret_start":caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read fixed
	 */
	readFixed: function(parser)
	{
		var look = null;
		var token = null;
		var start = parser;
		var caret_start = parser.caret;
		var flag_negative = false;
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "")
		{
			throw new BayLang.Exceptions.ParserExpected("Identifier", token.caret_start, look.file_name)
		}
		/* Read string */
		if (token.content == "'" || token.content == "\"")
		{
			return this.readString(parser);
		}
		/* Read Collection */
		if (token.content == "[")
		{
			return this.readCollection(parser);
		}
		/* Read Dict */
		if (token.content == "{")
		{
			return this.readDict(parser);
		}
		/* Negative number */
		if (token.content == "-")
		{
			flag_negative = true;
			parser = look;
			var res = this.readToken(look);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		/* Read Number */
		if (this.isStringOfNumbers(token.content))
		{
			return this.readNumber(parser, flag_negative);
		}
		return this.readIdentifier(parser, true);
	},
	/**
	 * Read call args
	 */
	readCallArgs: function(parser)
	{
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "{")
		{
			var res = this.readDict(parser);
			parser = Runtime.rtl.attr(res, 0);
			var d = Runtime.rtl.attr(res, 1);
			items = Runtime.Vector.from([d]);
		}
		else if (token.content == "(")
		{
			var res = this.matchToken(parser, "(");
			parser = Runtime.rtl.attr(res, 0);
			var res = this.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			while (!token.eof && token.content != ")")
			{
				var parser_value = null;
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.attr(res, 0);
				parser_value = Runtime.rtl.attr(res, 1);
				items.push(parser_value);
				var res = this.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				if (token.content == ",")
				{
					parser = look;
					var res = this.readToken(parser);
					look = Runtime.rtl.attr(res, 0);
					token = Runtime.rtl.attr(res, 1);
				}
			}
			var res = this.matchToken(parser, ")");
			parser = Runtime.rtl.attr(res, 0);
		}
		return Runtime.Vector.from([parser,items]);
	},
	/**
	 * Read new instance
	 */
	readNew: function(parser, match_new)
	{
		if (match_new == undefined) match_new = true;
		var look = null;
		var token = null;
		var op_code = null;
		var caret_start = parser.caret;
		var args = Runtime.Vector.from([]);
		if (match_new)
		{
			var res = this.matchToken(parser, "new");
			parser = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			caret_start = token.caret_start;
		}
		var res = this.readTypeIdentifier(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var res = this.readToken(parser);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "(" || token.content == "{")
		{
			var res = this.readCallArgs(parser);
			parser = Runtime.rtl.attr(res, 0);
			args = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpNew(Runtime.Map.from({"args":args,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read method
	 */
	readMethod: function(parser, match)
	{
		if (match == undefined) match = true;
		var look = null;
		var token = null;
		var parser_value = null;
		var op_code = null;
		var value1 = "";
		var value2 = "";
		var kind = "";
		var caret_start = parser.caret;
		if (match)
		{
			var res = this.matchToken(parser, "method");
			parser = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		var save = parser;
		/* Read static method */
		try
		{
			var res = this.readIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			var res = this.matchToken(parser, "::");
			parser = Runtime.rtl.attr(res, 0);
			var res = this.readToken(parser);
			parser = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (op_code.kind == BayLang.OpCodes.OpIdentifier.KIND_VARIABLE)
			{
				kind = BayLang.OpCodes.OpMethod.KIND_STATIC;
			}
			else
			{
				kind = BayLang.OpCodes.OpMethod.KIND_CLASS;
			}
			value1 = op_code;
			value2 = token.content;
		}
		catch (_ex)
		{
			if (_ex instanceof BayLang.Exceptions.ParserError)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
		/* Read instance method */
		if (kind == "")
		{
			parser = save;
			try
			{
				var res = this.readIdentifier(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				var res = this.matchToken(parser, ".");
				parser = Runtime.rtl.attr(res, 0);
				var res = this.readToken(parser);
				parser = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				kind = BayLang.OpCodes.OpMethod.KIND_ATTR;
				value1 = op_code;
				value2 = token.content;
			}
			catch (_ex)
			{
				if (_ex instanceof BayLang.Exceptions.ParserError)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
		}
		/* Error */
		if (kind == "")
		{
			throw new BayLang.Exceptions.ParserExpected("'.' or '::'", parser.caret, parser.file_name)
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpMethod(Runtime.Map.from({"value1":value1,"value2":value2,"kind":kind,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read curry
	 */
	readCurry: function(parser)
	{
		var look = null;
		var token = null;
		var obj = null;
		var args = new Runtime.Vector();
		var res = this.matchToken(parser, "curry");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var res = this.readDynamic(parser, 14);
		parser = Runtime.rtl.attr(res, 0);
		obj = Runtime.rtl.attr(res, 1);
		var res = this.matchToken(parser, "(");
		parser = Runtime.rtl.attr(res, 0);
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && token.content != ")")
		{
			var arg = null;
			if (token.content == "?")
			{
				var pos = 0;
				parser = look;
				var res = this.readToken(look);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				if (this.isStringOfNumbers(token.content))
				{
					pos = Runtime.rtl.to(token.content, {"e":"int"});
					parser = look;
				}
				arg = new BayLang.OpCodes.OpCurryArg(Runtime.Map.from({"pos":pos}));
				args.push(arg);
			}
			else
			{
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.attr(res, 0);
				arg = Runtime.rtl.attr(res, 1);
				args.push(arg);
			}
			var res = this.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == ",")
			{
				parser = look;
				var res = this.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
			}
		}
		var res = this.matchToken(parser, ")");
		parser = Runtime.rtl.attr(res, 0);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpCurry(Runtime.Map.from({"obj":obj,"args":args}))]);
	},
	/**
	 * Read base item
	 */
	readBaseItem: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = look.caret;
		if (token.content == "new")
		{
			var res = this.readNew(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
		}
		else if (token.content == "method")
		{
			var res = this.readMethod(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
		}
		else if (token.content == "classof")
		{
			var res = this.readClassOf(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
		}
		else if (token.content == "classref")
		{
			var res = this.readClassRef(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
		}
		else if (token.content == "(")
		{
			var save_parser = parser;
			parser = look;
			/* Try to read OpTypeConvert */
			try
			{
				var res = this.readTypeIdentifier(parser);
				parser = Runtime.rtl.attr(res, 0);
				var op_type = Runtime.rtl.attr(res, 1);
				var res = this.readToken(parser);
				parser = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				if (token.content == ")")
				{
					var res = this.readDynamic(parser);
					parser = Runtime.rtl.attr(res, 0);
					op_code = Runtime.rtl.attr(res, 1);
					return Runtime.Vector.from([parser,new BayLang.OpCodes.OpTypeConvert(Runtime.Map.from({"pattern":op_type,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
				}
			}
			catch (_ex)
			{
				if (_ex instanceof BayLang.Exceptions.ParserError)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
			/* Read Expression */
			var res = this.matchToken(save_parser, "(");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			var res = this.matchToken(parser, ")");
			parser = Runtime.rtl.attr(res, 0);
		}
		else
		{
			var res = this.readFixed(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read classof
	 */
	readClassOf: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(parser, "classof");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = this.readEntityName(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpClassOf(Runtime.Map.from({"entity_name":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read classref
	 */
	readClassRef: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(parser, "classref");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpClassRef(Runtime.Map.from({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read dynamic
	 */
	readDynamic: function(parser, dynamic_flags)
	{
		if (dynamic_flags == undefined) dynamic_flags = -1;
		var look = null;
		var token = null;
		var parser_items = null;
		var op_code = null;
		var op_code_first = null;
		var is_await = false;
		var is_context_call = true;
		var caret_start = null;
		/* Dynamic flags */
		var flag_call = 1;
		var flag_attr = 2;
		var flag_static = 4;
		var flag_dynamic = 8;
		var f_next = (s) =>
		{
			if ((dynamic_flags & 1) == 1)
			{
				if (s == "{" || s == "(" || s == "@")
				{
					return true;
				}
			}
			if ((dynamic_flags & 2) == 2)
			{
				if (s == ".")
				{
					return true;
				}
			}
			if ((dynamic_flags & 4) == 4)
			{
				if (s == "::")
				{
					return true;
				}
			}
			if ((dynamic_flags & 8) == 8)
			{
				if (s == "[")
				{
					return true;
				}
			}
			return false;
		};
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "await")
		{
			caret_start = token.caret_start;
			is_await = true;
			parser = look;
		}
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "@")
		{
			var res = this.readToken(look);
			var look2 = Runtime.rtl.attr(res, 0);
			var token2 = Runtime.rtl.attr(res, 1);
			if (!f_next(token2.content))
			{
				if (this.isIdentifier(token2.content))
				{
					parser = look;
					is_context_call = false;
				}
			}
		}
		var res = this.readBaseItem(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		op_code_first = op_code;
		if (caret_start == null)
		{
			caret_start = op_code.caret_start;
		}
		if (op_code instanceof BayLang.OpCodes.OpIdentifier && (op_code.kind == BayLang.OpCodes.OpIdentifier.KIND_CONTEXT || op_code.kind == BayLang.OpCodes.OpIdentifier.KIND_SYS_FUNCTION))
		{
			is_context_call = false;
		}
		var res = this.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (f_next(token.content))
		{
			if (op_code instanceof BayLang.OpCodes.OpIdentifier)
			{
				if (parser.find_ident && op_code.kind != BayLang.OpCodes.OpIdentifier.KIND_SYS_TYPE && op_code.kind != BayLang.OpCodes.OpIdentifier.KIND_SYS_FUNCTION && op_code.kind != BayLang.OpCodes.OpIdentifier.KIND_VARIABLE && op_code.kind != BayLang.OpCodes.OpIdentifier.KIND_CLASS && op_code.kind != BayLang.OpCodes.OpIdentifier.KIND_CLASSREF && op_code.kind != BayLang.OpCodes.OpIdentifier.KIND_CONTEXT)
				{
					throw new BayLang.Exceptions.ParserExpected("Module or variable '" + Runtime.rtl.toStr(op_code.value) + Runtime.rtl.toStr("'"), op_code.caret_start, parser.file_name)
				}
			}
			else if (op_code instanceof BayLang.OpCodes.OpNew || op_code instanceof BayLang.OpCodes.OpCollection || op_code instanceof BayLang.OpCodes.OpDict)
			{
			}
			else
			{
				throw new BayLang.Exceptions.ParserExpected("Module or variable", op_code.caret_start, parser.file_name)
			}
		}
		/* If is pipe */
		if (parser.is_pipe && op_code instanceof BayLang.OpCodes.OpIdentifier)
		{
			op_code = new BayLang.OpCodes.OpAttr(Runtime.Map.from({"kind":parser.pipe_kind,"obj":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"kind":BayLang.OpCodes.OpIdentifier.KIND_PIPE,"caret_start":op_code.caret_start,"caret_end":op_code.caret_end})),"value":op_code,"caret_start":op_code.caret_start,"caret_end":op_code.caret_end}));
		}
		while (!token.eof && f_next(token.content))
		{
			var token_content = token.content;
			/* Static call */
			if (token_content == "(" || token_content == "{" || token_content == "@")
			{
				if ((dynamic_flags & flag_call) != flag_call)
				{
					throw new BayLang.Exceptions.ParserError("Call are not allowed", token.caret_start, parser.file_name)
				}
				if (token_content == "@")
				{
					parser = look;
					is_context_call = false;
				}
				var res = this.readCallArgs(parser);
				parser = Runtime.rtl.attr(res, 0);
				parser_items = Runtime.rtl.attr(res, 1);
				op_code = new BayLang.OpCodes.OpCall(Runtime.Map.from({"obj":op_code,"args":parser_items,"caret_start":caret_start,"caret_end":parser.caret,"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "." || token_content == "::" || token_content == "[")
			{
				var kind = "";
				var look_values = null;
				var look_value = null;
				parser = look;
				is_context_call = true;
				if (token_content == ".")
				{
					kind = BayLang.OpCodes.OpAttr.KIND_ATTR;
					if ((dynamic_flags & flag_attr) != flag_attr)
					{
						throw new BayLang.Exceptions.ParserError("Attr are not allowed", token.caret_start, parser.file_name)
					}
				}
				else if (token_content == "::")
				{
					kind = BayLang.OpCodes.OpAttr.KIND_STATIC;
					if ((dynamic_flags & flag_static) != flag_static)
					{
						throw new BayLang.Exceptions.ParserError("Static attr are not allowed", token.caret_start, parser.file_name)
					}
				}
				else if (token_content == "[")
				{
					kind = BayLang.OpCodes.OpAttr.KIND_DYNAMIC;
					if ((dynamic_flags & flag_dynamic) != flag_dynamic)
					{
						throw new BayLang.Exceptions.ParserError("Dynamic attr are not allowed", token.caret_start, parser.file_name)
					}
				}
				if (token_content == "[")
				{
					var res = parser.parser_expression.constructor.readExpression(parser);
					parser = Runtime.rtl.attr(res, 0);
					look_value = Runtime.rtl.attr(res, 1);
					var res = this.readToken(parser);
					look = Runtime.rtl.attr(res, 0);
					token = Runtime.rtl.attr(res, 1);
					if (token.content == ",")
					{
						look_values = new Runtime.Vector();
						look_values.push(look_value);
					}
					while (token.content == ",")
					{
						parser = look;
						var res = parser.parser_expression.constructor.readExpression(parser);
						parser = Runtime.rtl.attr(res, 0);
						look_value = Runtime.rtl.attr(res, 1);
						look_values.push(look_value);
						var res = this.readToken(parser);
						look = Runtime.rtl.attr(res, 0);
						token = Runtime.rtl.attr(res, 1);
					}
					var res = this.matchToken(parser, "]");
					parser = Runtime.rtl.attr(res, 0);
					if (look_values != null)
					{
						kind = BayLang.OpCodes.OpAttr.KIND_DYNAMIC_ATTRS;
					}
				}
				else
				{
					var res = this.readToken(parser);
					look = Runtime.rtl.attr(res, 0);
					token = Runtime.rtl.attr(res, 1);
					if (token.content == "@")
					{
						parser = look;
						is_context_call = false;
					}
					var res = this.readIdentifier(parser);
					parser = Runtime.rtl.attr(res, 0);
					look_value = Runtime.rtl.attr(res, 1);
				}
				op_code = new BayLang.OpCodes.OpAttr(Runtime.Map.from({"kind":kind,"obj":op_code,"attrs":(look_values != null) ? (look_values) : (null),"value":(look_values == null) ? (look_value) : (null),"caret_start":caret_start,"caret_end":parser.caret}));
			}
			else
			{
				throw new BayLang.Exceptions.ParserExpected("Next attr", token.caret_start, parser.file_name)
			}
			var res = this.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (op_code instanceof BayLang.OpCodes.OpAttr && op_code.kind == BayLang.OpCodes.OpAttr.KIND_PIPE && token.content != "(" && token.content != "{")
			{
				throw new BayLang.Exceptions.ParserExpected("Call", token.caret_start, parser.file_name)
			}
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.ParserBayBase";
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
Runtime.rtl.defClass(BayLang.LangBay.ParserBayBase);
window["BayLang.LangBay.ParserBayBase"] = BayLang.LangBay.ParserBayBase;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.ParserBayBase;