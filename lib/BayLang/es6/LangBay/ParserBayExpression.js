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
BayLang.LangBay.ParserBayExpression = function()
{
};
Object.assign(BayLang.LangBay.ParserBayExpression.prototype,
{
});
Object.assign(BayLang.LangBay.ParserBayExpression,
{
	/**
	 * Read negative
	 */
	readNegative: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		if (token.content == "-")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.readDynamic(look);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			return Runtime.Vector.from([parser,new BayLang.OpCodes.OpNegative(Runtime.Map.from({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
		}
		return parser.parser_base.constructor.readDynamic(parser);
	},
	/**
	 * Read bit not
	 */
	readBitNot: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		if (token.content == "!")
		{
			var op_code = null;
			var res = this.readNegative(look);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			return Runtime.Vector.from([parser,new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"math":"!","caret_start":caret_start,"caret_end":parser.caret}))]);
		}
		return this.readNegative(parser);
	},
	/**
	 * Read bit shift
	 */
	readBitShift: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitNot(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && (token.content == ">>" || token.content == "<<"))
		{
			math = token.content;
			var res = this.readBitNot(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read bit and
	 */
	readBitAnd: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitShift(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && token.content == "&")
		{
			math = token.content;
			var res = this.readBitShift(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read bit or
	 */
	readBitOr: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitAnd(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && (token.content == "|" || token.content == "xor"))
		{
			math = token.content;
			var res = this.readBitAnd(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read factor
	 */
	readFactor: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitOr(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && (token.content == "*" || token.content == "/" || token.content == "%" || token.content == "div" || token.content == "mod"))
		{
			math = token.content;
			var res = this.readBitOr(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read arithmetic
	 */
	readArithmetic: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readFactor(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && (token.content == "+" || token.content == "-"))
		{
			math = token.content;
			var res = this.readFactor(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read concat
	 */
	readConcat: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readArithmetic(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && token.content == "~")
		{
			math = token.content;
			var res = this.readArithmetic(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read compare
	 */
	readCompare: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readConcat(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var content = token.content;
		if (content == "===" || content == "!==" || content == "==" || content == "!=" || content == ">=" || content == "<=" || content == ">" || content == "<")
		{
			var math = token.content;
			var res = this.readConcat(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret}));
			parser = look;
		}
		else if (content == "is" || content == "implements" || content == "instanceof")
		{
			var math = token.content;
			var res = parser.parser_base.constructor.readTypeIdentifier(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret}));
			parser = look;
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read not
	 */
	readNot: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		if (token.content == "not")
		{
			var op_code = null;
			var start = parser;
			var res = this.readCompare(look);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			return Runtime.Vector.from([parser,new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"math":"not","caret_start":caret_start,"caret_end":parser.caret}))]);
		}
		return this.readCompare(parser);
	},
	/**
	 * Read and
	 */
	readAnd: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readNot(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && (token.content == "and" || token.content == "&&"))
		{
			math = token.content;
			var res = this.readNot(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":"and","caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read or
	 */
	readOr: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readAnd(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && (token.content == "or" || token.content == "||"))
		{
			math = token.content;
			var res = this.readAnd(look);
			look = Runtime.rtl.attr(res, 0);
			look_value = Runtime.rtl.attr(res, 1);
			op_code = new BayLang.OpCodes.OpMath(Runtime.Map.from({"value1":op_code,"value2":look_value,"math":"or","caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read element
	 */
	readElement: function(parser)
	{
		/* Try to read function */
		if (parser.parser_operator.constructor.tryReadFunction(parser, false))
		{
			return parser.parser_operator.constructor.readDeclareFunction(parser, false);
		}
		return this.readOr(parser);
	},
	/**
	 * Read ternary operation
	 */
	readTernary: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var res = this.readElement(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "?")
		{
			condition = op_code;
			var res = this.readExpression(look);
			parser = Runtime.rtl.attr(res, 0);
			if_true = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == ":")
			{
				var res = this.readExpression(look);
				parser = Runtime.rtl.attr(res, 0);
				if_false = Runtime.rtl.attr(res, 1);
			}
			op_code = new BayLang.OpCodes.OpTernary(Runtime.Map.from({"condition":condition,"if_true":if_true,"if_false":if_false,"caret_start":caret_start,"caret_end":parser.caret}));
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read pipe
	 */
	ExpressionPipe: function(parser)
	{
		var look = null;
		var look_token = null;
		var op_code = null;
		var is_next_attr = false;
		var save_is_pipe = parser.is_pipe;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_pipe"]), false);
		var res = this.readTernary(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_pipe"]), save_is_pipe);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		look_token = Runtime.rtl.attr(res, 1);
		if (look_token.content == "|>")
		{
			while (look_token.content == "|>" || look_token.content == ",")
			{
				parser = look;
				var value = null;
				var kind = "";
				var is_async = false;
				var is_monad = false;
				if (look_token.content == ",")
				{
					is_next_attr = true;
				}
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				look_token = Runtime.rtl.attr(res, 1);
				if (look_token.content == "await")
				{
					is_async = true;
					parser = look;
					var res = parser.parser_base.constructor.readToken(parser);
					look = Runtime.rtl.attr(res, 0);
					look_token = Runtime.rtl.attr(res, 1);
				}
				if (look_token.content == "monad")
				{
					is_monad = true;
					parser = look;
					var res = parser.parser_base.constructor.readToken(parser);
					look = Runtime.rtl.attr(res, 0);
					look_token = Runtime.rtl.attr(res, 1);
				}
				if (look_token.content == "attr")
				{
					parser = look;
					var res = this.readTernary(parser);
					parser = Runtime.rtl.attr(res, 0);
					value = Runtime.rtl.attr(res, 1);
					kind = BayLang.OpCodes.OpPipe.KIND_ATTR;
				}
				else if (look_token.content == "\"" || look_token.content == "'")
				{
					var res = this.readTernary(parser);
					parser = Runtime.rtl.attr(res, 0);
					value = Runtime.rtl.attr(res, 1);
					kind = BayLang.OpCodes.OpPipe.KIND_ATTR;
				}
				else if (look_token.content == "{")
				{
					parser = look;
					var res = this.readTernary(parser);
					parser = Runtime.rtl.attr(res, 0);
					value = Runtime.rtl.attr(res, 1);
					kind = BayLang.OpCodes.OpPipe.KIND_ATTR;
					var res = parser.parser_base.constructor.matchToken(parser, "}");
					parser = Runtime.rtl.attr(res, 0);
				}
				else if (is_next_attr)
				{
					throw new BayLang.Exceptions.ParserExpected("|>", parser.caret, parser.file_name)
				}
				else if (look_token.content == "default")
				{
					var arg1;
					var arg2;
					kind = BayLang.OpCodes.OpPipe.KIND_CALL;
					is_monad = true;
					try
					{
						var res = parser.parser_base.constructor.readIdentifier(look);
						parser = Runtime.rtl.attr(res, 0);
						arg1 = Runtime.rtl.attr(res, 1);
						var res = this.readTernary(parser);
						parser = Runtime.rtl.attr(res, 0);
						arg2 = Runtime.rtl.attr(res, 1);
						arg1 = new BayLang.OpCodes.OpString(Runtime.Map.from({"value":parser.constructor.findModuleName(parser, arg1.value),"caret_start":arg1.caret_start,"caret_end":arg1.caret_end}));
						value = new BayLang.OpCodes.OpCall(Runtime.Map.from({"args":Runtime.Vector.from([arg1,arg2]),"obj":new BayLang.OpCodes.OpAttr(Runtime.Map.from({"kind":BayLang.OpCodes.OpAttr.KIND_STATIC,"obj":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"kind":BayLang.OpCodes.OpIdentifier.KIND_SYS_TYPE,"caret_start":caret_start,"caret_end":parser.caret,"value":"rtl"})),"value":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"value":"m_to"})),"caret_start":caret_start,"caret_end":parser.caret})),"caret_start":caret_start,"caret_end":parser.caret}));
					}
					catch (_ex)
					{
						if (_ex instanceof BayLang.Exceptions.ParserError)
						{
							var err = _ex;
							
							value = null;
						}
						else
						{
							throw _ex;
						}
					}
					if (value == null)
					{
						var res = this.readTernary(look);
						parser = Runtime.rtl.attr(res, 0);
						arg2 = Runtime.rtl.attr(res, 1);
						value = new BayLang.OpCodes.OpCall(Runtime.Map.from({"args":Runtime.Vector.from([arg2]),"obj":new BayLang.OpCodes.OpAttr(Runtime.Map.from({"kind":BayLang.OpCodes.OpAttr.KIND_STATIC,"obj":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"kind":BayLang.OpCodes.OpIdentifier.KIND_SYS_TYPE,"caret_start":caret_start,"caret_end":parser.caret,"value":"rtl"})),"value":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"value":"m_def"})),"caret_start":caret_start,"caret_end":parser.caret})),"caret_start":caret_start,"caret_end":parser.caret}));
					}
				}
				else if (look_token.content == "method" || look_token.content == "." || look_token.content == ":" || look_token.content == "::")
				{
					parser = look;
					kind = BayLang.OpCodes.OpPipe.KIND_CALL;
					/* Set pipe */
					var save_find_ident = parser.find_ident;
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_pipe"]), true);
					if (look_token.content == ".")
					{
						kind = BayLang.OpCodes.OpPipe.KIND_METHOD;
						parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["pipe_kind"]), BayLang.OpCodes.OpAttr.KIND_ATTR);
					}
					else
					{
						parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["pipe_kind"]), BayLang.OpCodes.OpAttr.KIND_STATIC);
					}
					var res = parser.parser_base.constructor.readDynamic(parser);
					parser = Runtime.rtl.attr(res, 0);
					value = Runtime.rtl.attr(res, 1);
					/* Restore parser */
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_pipe"]), false);
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), save_find_ident);
				}
				else if (look_token.content == "curry")
				{
					kind = BayLang.OpCodes.OpPipe.KIND_CALL;
					var res = parser.parser_base.constructor.readCurry(parser);
					parser = Runtime.rtl.attr(res, 0);
					value = Runtime.rtl.attr(res, 1);
				}
				else
				{
					kind = BayLang.OpCodes.OpPipe.KIND_CALL;
					var res = parser.parser_base.constructor.readDynamic(parser);
					parser = Runtime.rtl.attr(res, 0);
					value = Runtime.rtl.attr(res, 1);
				}
				op_code = new BayLang.OpCodes.OpPipe(Runtime.Map.from({"obj":op_code,"kind":kind,"value":value,"is_async":is_async,"is_monad":is_monad,"caret_start":caret_start,"caret_end":parser.caret}));
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				look_token = Runtime.rtl.attr(res, 1);
				is_next_attr = false;
			}
		}
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read expression
	 */
	readExpression: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "<")
		{
			return parser.parser_html.constructor.readHTML(parser);
		}
		else if (token.content == "curry")
		{
			return parser.parser_base.constructor.readCurry(parser);
		}
		else if (token.content == "@css")
		{
			return parser.parser_html.constructor.readCss(parser);
		}
		return this.ExpressionPipe(parser);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.ParserBayExpression";
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
Runtime.rtl.defClass(BayLang.LangBay.ParserBayExpression);
window["BayLang.LangBay.ParserBayExpression"] = BayLang.LangBay.ParserBayExpression;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.ParserBayExpression;