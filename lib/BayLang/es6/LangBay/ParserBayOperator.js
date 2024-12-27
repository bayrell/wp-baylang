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
BayLang.LangBay.ParserBayOperator = function()
{
};
Object.assign(BayLang.LangBay.ParserBayOperator.prototype,
{
});
Object.assign(BayLang.LangBay.ParserBayOperator,
{
	/**
	 * Read return
	 */
	readReturn: function(parser)
	{
		var token = null;
		var op_code = null;
		var look = null;
		var res = parser.parser_base.constructor.matchToken(parser, "return");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content != ";")
		{
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpReturn(Runtime.Map.from({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read delete
	 */
	readDelete: function(parser)
	{
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(parser, "delete");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readDynamic(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpDelete(Runtime.Map.from({"op_code":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read throw
	 */
	readThrow: function(parser)
	{
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(parser, "throw");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpThrow(Runtime.Map.from({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read try
	 */
	readTry: function(parser)
	{
		var look = null;
		var token = null;
		var op_try = null;
		var items = new Runtime.Vector();
		var res = parser.parser_base.constructor.matchToken(parser, "try");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		/* Try */
		var res = this.readOperators(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_try = Runtime.rtl.attr(res, 1);
		/* Catch */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && token.content == "catch")
		{
			parser = look;
			var op_catch = null;
			var var_op_code = null;
			var pattern = null;
			var item_caret_start = token.caret_start;
			/* Read ident */
			var res = parser.parser_base.constructor.matchToken(parser, "(");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_base.constructor.readTypeIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			pattern = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			var_op_code = Runtime.rtl.attr(res, 1);
			var var_name = var_op_code.value;
			var res = parser.parser_base.constructor.matchToken(parser, ")");
			parser = Runtime.rtl.attr(res, 0);
			/* Save vars */
			var save_vars = parser.vars;
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
			/* Catch operators */
			var res = this.readOperators(parser);
			parser = Runtime.rtl.attr(res, 0);
			op_catch = Runtime.rtl.attr(res, 1);
			/* Restore vars */
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
			var item = new BayLang.OpCodes.OpTryCatchItem(Runtime.Map.from({"name":var_name,"pattern":pattern,"value":op_catch,"caret_start":item_caret_start,"caret_end":parser.caret}));
			items.push(item);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpTryCatch(Runtime.Map.from({"op_try":op_try,"items":items,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read then
	 */
	readThen: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "then")
		{
			return Runtime.Vector.from([look,token]);
		}
		return Runtime.Vector.from([parser,token]);
	},
	/**
	 * Read do
	 */
	readDo: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "do")
		{
			return Runtime.Vector.from([look,token]);
		}
		return Runtime.Vector.from([parser,token]);
	},
	/**
	 * Read if
	 */
	readIf: function(parser)
	{
		var look = null;
		var look2 = null;
		var token = null;
		var token2 = null;
		var if_condition = null;
		var if_true = null;
		var if_false = null;
		var if_else = new Runtime.Vector();
		var res = parser.parser_base.constructor.matchToken(parser, (parser.is_html) ? ("%if") : ("if"));
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		/* Read expression */
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.attr(res, 0);
		if_condition = Runtime.rtl.attr(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = Runtime.rtl.attr(res, 0);
		var res = this.readThen(parser);
		parser = Runtime.rtl.attr(res, 0);
		/* If true */
		var res = this.readOperators(parser);
		parser = Runtime.rtl.attr(res, 0);
		if_true = Runtime.rtl.attr(res, 1);
		/* Else */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && (parser.is_html && (token.content == "%else" || token.content == "%elseif") || !parser.is_html && (token.content == "else" || token.content == "elseif")))
		{
			var res = parser.parser_base.constructor.readToken(look);
			look2 = Runtime.rtl.attr(res, 0);
			token2 = Runtime.rtl.attr(res, 1);
			if (token.content == "%elseif" || token.content == "elseif" || token.content == "else" && token2.content == "if" || token.content == "%else" && token2.content == "if")
			{
				var ifelse_condition = null;
				var ifelse_block = null;
				if (token.content == "elseif")
				{
					parser = look;
				}
				else if (token2.content == "%elseif")
				{
					parser = look2;
				}
				else if (token2.content == "if")
				{
					parser = look2;
				}
				else if (token2.content == "%if")
				{
					parser = look2;
				}
				/* Read expression */
				var res = parser.parser_base.constructor.matchToken(parser, "(");
				parser = Runtime.rtl.attr(res, 0);
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.attr(res, 0);
				ifelse_condition = Runtime.rtl.attr(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, ")");
				parser = Runtime.rtl.attr(res, 0);
				var res = this.readThen(parser);
				parser = Runtime.rtl.attr(res, 0);
				var res = this.readOperators(parser);
				parser = Runtime.rtl.attr(res, 0);
				ifelse_block = Runtime.rtl.attr(res, 1);
				if_else.push(new BayLang.OpCodes.OpIfElse(Runtime.Map.from({"condition":ifelse_condition,"if_true":ifelse_block,"caret_start":token2.caret_start,"caret_end":parser.caret})));
			}
			else
			{
				var res = this.readOperators(look);
				parser = Runtime.rtl.attr(res, 0);
				if_false = Runtime.rtl.attr(res, 1);
				break;
			}
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpIf(Runtime.Map.from({"condition":if_condition,"if_true":if_true,"if_false":if_false,"if_else":if_else,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read For
	 */
	readFor: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var expr1 = null;
		var expr2 = null;
		var expr3 = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.matchToken(parser, (parser.is_html) ? ("%for") : ("for"));
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var res = this.readAssign(parser);
		parser = Runtime.rtl.attr(res, 0);
		expr1 = Runtime.rtl.attr(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ";");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.attr(res, 0);
		expr2 = Runtime.rtl.attr(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ";");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var res = this.readOperator(parser);
		parser = Runtime.rtl.attr(res, 0);
		expr3 = Runtime.rtl.attr(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var res = this.readOperators(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpFor(Runtime.Map.from({"expr1":expr1,"expr2":expr2,"expr3":expr3,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read While
	 */
	readWhile: function(parser)
	{
		var look = null;
		var token = null;
		var condition = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(parser, (parser.is_html) ? ("%while") : ("while"));
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.attr(res, 0);
		condition = Runtime.rtl.attr(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = Runtime.rtl.attr(res, 0);
		var res = this.readDo(parser);
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var res = this.readOperators(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpWhile(Runtime.Map.from({"condition":condition,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read While
	 */
	readSafe: function(parser)
	{
		var caret_start = parser.caret;
		var res = parser.parser_base.constructor.matchToken(parser, "safe");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = Runtime.rtl.attr(res, 0);
		var res = parser.parser_base.constructor.readDynamic(parser);
		parser = Runtime.rtl.attr(res, 0);
		var obj = Runtime.rtl.attr(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = Runtime.rtl.attr(res, 0);
		var res = this.readOperators(parser);
		parser = Runtime.rtl.attr(res, 0);
		var items = Runtime.rtl.attr(res, 1);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpSafe(Runtime.Map.from({"obj":obj,"items":items,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read assign
	 */
	readAssign: function(parser)
	{
		var start = parser;
		var save = null;
		var look = null;
		var token = null;
		var pattern = null;
		var op_code = null;
		var reg_name = null;
		var expression = null;
		var names = null;
		var values = null;
		var kind = BayLang.OpCodes.OpAssign.KIND_ASSIGN;
		var var_name = "";
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var_name = op_code.value;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "<=")
		{
			var arr = new Runtime.Vector();
			while (!token.eof && token.content == "<=")
			{
				var name = "";
				parser = look;
				save = parser;
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				if (token.content == "{")
				{
					var res = parser.parser_base.constructor.matchToken(parser, "{");
					parser = Runtime.rtl.attr(res, 0);
					var res = parser.parser_expression.constructor.readExpression(parser);
					parser = Runtime.rtl.attr(res, 0);
					name = Runtime.rtl.attr(res, 1);
					var res = parser.parser_base.constructor.matchToken(parser, "}");
					parser = Runtime.rtl.attr(res, 0);
				}
				else if (token.content == "\"" || token.content == "'")
				{
					var res = parser.parser_base.constructor.readString(parser);
					parser = Runtime.rtl.attr(res, 0);
					name = Runtime.rtl.attr(res, 1);
				}
				else
				{
					var res = parser.parser_base.constructor.readToken(parser);
					parser = Runtime.rtl.attr(res, 0);
					token = Runtime.rtl.attr(res, 1);
					name = token.content;
				}
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				if (token.content != "<=")
				{
					parser = save;
					break;
				}
				else
				{
					arr.push(name);
				}
			}
			names = arr.slice();
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			expression = Runtime.rtl.attr(res, 1);
			return Runtime.Vector.from([parser,new BayLang.OpCodes.OpAssignStruct(Runtime.Map.from({"caret_start":caret_start,"caret_end":parser.caret,"expression":expression,"var_name":var_name,"names":names}))]);
		}
		if (token.content != "=" && token.content != "+=" && token.content != "-=" && token.content != "~=" && token.content != "." && token.content != "::" && token.content != "[")
		{
			var var_op_code = null;
			kind = BayLang.OpCodes.OpAssign.KIND_DECLARE;
			values = new Runtime.Vector();
			parser = start;
			var res = parser.parser_base.constructor.readTypeIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			pattern = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			var_op_code = Runtime.rtl.attr(res, 1);
			var_name = var_op_code.value;
			/* Read expression */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "=")
			{
				var res = parser.parser_expression.constructor.readExpression(look);
				parser = Runtime.rtl.attr(res, 0);
				expression = Runtime.rtl.attr(res, 1);
			}
			else
			{
				expression = null;
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
			values.push(new BayLang.OpCodes.OpAssignValue(Runtime.Map.from({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start,"caret_end":parser.caret})));
			/* Look next token */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			while (!token.eof && token.content == ",")
			{
				var res = parser.parser_base.constructor.readIdentifier(look);
				parser = Runtime.rtl.attr(res, 0);
				var_op_code = Runtime.rtl.attr(res, 1);
				var_name = var_op_code.value;
				/* Read expression */
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				if (token.content == "=")
				{
					var res = parser.parser_expression.constructor.readExpression(look);
					parser = Runtime.rtl.attr(res, 0);
					expression = Runtime.rtl.attr(res, 1);
				}
				else
				{
					expression = null;
				}
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
				values.push(new BayLang.OpCodes.OpAssignValue(Runtime.Map.from({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start,"caret_end":parser.caret})));
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
			}
			var_name = "";
			expression = null;
		}
		else
		{
			parser = start;
			kind = BayLang.OpCodes.OpAssign.KIND_ASSIGN;
			var op = "";
			var res = parser.parser_base.constructor.readDynamic(parser, 2 | 8);
			parser = Runtime.rtl.attr(res, 0);
			var op_code = Runtime.rtl.attr(res, 1);
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "=" || token.content == "+=" || token.content == "-=" || token.content == "~=")
			{
				op = token.content;
			}
			else
			{
				throw new BayLang.Exceptions.ParserError("Unknown operator " + Runtime.rtl.toStr(token.content), token.caret_start, parser.file_name)
			}
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			expression = Runtime.rtl.attr(res, 1);
			values = Runtime.Vector.from([new BayLang.OpCodes.OpAssignValue(Runtime.Map.from({"op_code":op_code,"expression":expression,"op":op}))]);
			var_name = "";
			expression = null;
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpAssign(Runtime.Map.from({"pattern":pattern,"values":(values != null) ? (values) : (null),"caret_start":caret_start,"caret_end":parser.caret,"expression":expression,"var_name":var_name,"names":names,"kind":kind}))]);
	},
	/**
	 * Read operator
	 */
	readInc: function(parser)
	{
		var look = null;
		var look1 = null;
		var look2 = null;
		var token = null;
		var token1 = null;
		var token2 = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look1 = Runtime.rtl.attr(res, 0);
		token1 = Runtime.rtl.attr(res, 1);
		var caret_start = token1.caret_start;
		var res = parser.parser_base.constructor.readToken(look1);
		look2 = Runtime.rtl.attr(res, 0);
		token2 = Runtime.rtl.attr(res, 1);
		var look1_content = token1.content;
		var look2_content = token2.content;
		if ((look1_content == "++" || look1_content == "--") && parser.parser_base.constructor.isIdentifier(look2_content))
		{
			parser = look2;
			var op_code = new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"value":look2_content,"caret_start":token2.caret_start,"caret_end":token2.caret_end}));
			op_code = new BayLang.OpCodes.OpInc(Runtime.Map.from({"kind":(look1_content == "++") ? (BayLang.OpCodes.OpInc.KIND_PRE_INC) : (BayLang.OpCodes.OpInc.KIND_PRE_DEC),"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}));
			return Runtime.Vector.from([parser,op_code]);
		}
		if ((look2_content == "++" || look2_content == "--") && parser.parser_base.constructor.isIdentifier(look1_content))
		{
			parser = look2;
			var op_code = new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"value":look1_content,"caret_start":token1.caret_start,"caret_end":token1.caret_end}));
			op_code = new BayLang.OpCodes.OpInc(Runtime.Map.from({"kind":(look2_content == "++") ? (BayLang.OpCodes.OpInc.KIND_POST_INC) : (BayLang.OpCodes.OpInc.KIND_POST_DEC),"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}));
			return Runtime.Vector.from([parser,op_code]);
		}
		return Runtime.Vector.from([parser,null]);
	},
	/**
	 * Read call function
	 */
	readCallFunction: function(parser)
	{
		var op_code = null;
		var res = parser.parser_base.constructor.readDynamic(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		if (op_code instanceof BayLang.OpCodes.OpCall || op_code instanceof BayLang.OpCodes.OpPipe)
		{
			return Runtime.Vector.from([parser,op_code]);
		}
		return Runtime.Vector.from([parser,null]);
	},
	/**
	 * Read operator
	 */
	readOperator: function(parser)
	{
		var look = null;
		var token = null;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		if (token.content == "/")
		{
			return parser.parser_base.constructor.readComment(parser);
		}
		else if (token.content == "#switch" || token.content == "#ifcode")
		{
			return parser.parser_preprocessor.constructor.readPreprocessor(parser);
		}
		else if (token.content == "#ifdef")
		{
			return parser.parser_preprocessor.constructor.readPreprocessorIfDef(parser, BayLang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR);
		}
		else if (token.content == "break")
		{
			return Runtime.Vector.from([look,new BayLang.OpCodes.OpBreak(Runtime.Map.from({"caret_start":caret_start,"caret_end":look.caret}))]);
		}
		else if (token.content == "continue")
		{
			return Runtime.Vector.from([look,new BayLang.OpCodes.OpContinue(Runtime.Map.from({"caret_start":caret_start,"caret_end":look.caret}))]);
		}
		else if (token.content == "delete")
		{
			return this.readDelete(parser);
		}
		else if (token.content == "return")
		{
			return this.readReturn(parser);
		}
		else if (token.content == "throw")
		{
			return this.readThrow(parser);
		}
		else if (token.content == "try")
		{
			return this.readTry(parser);
		}
		else if (token.content == "if")
		{
			return this.readIf(parser);
		}
		else if (token.content == "for")
		{
			return this.readFor(parser);
		}
		else if (token.content == "while")
		{
			return this.readWhile(parser);
		}
		else if (token.content == "safe")
		{
			return this.readSafe(parser);
		}
		var op_code = null;
		/* Read op inc */
		var res = this.readInc(parser);
		look = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		if (op_code != null)
		{
			return res;
		}
		/* Read op call function */
		var res = this.readCallFunction(parser);
		look = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		if (op_code != null)
		{
			return res;
		}
		var save_parser = parser;
		/* Try to read pipe */
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = Runtime.rtl.attr(res, 0);
		op_code = Runtime.rtl.attr(res, 1);
		var caret_start = op_code.caret_start;
		var var_name = op_code.value;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "|>")
		{
			return parser.parser_expression.constructor.ExpressionPipe(save_parser);
		}
		parser = save_parser;
		return this.readAssign(parser);
	},
	/**
	 * Read operators
	 */
	readOpItems: function(parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "}";
		var look = null;
		var token = null;
		var op_code = null;
		var arr = new Runtime.Vector();
		var caret_start = parser.caret;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		while (!token.eof && token.content != end_tag)
		{
			var parser_value = null;
			var res = this.readOperator(parser);
			parser = Runtime.rtl.attr(res, 0);
			parser_value = Runtime.rtl.attr(res, 1);
			if (parser_value != null)
			{
				arr.push(parser_value);
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
			if (token.content == ";")
			{
				parser = look;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
			}
		}
		op_code = new BayLang.OpCodes.OpItems(Runtime.Map.from({"items":arr,"caret_start":caret_start,"caret_end":parser.caret}));
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read operators
	 */
	readOperators: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		if (!parser.is_html)
		{
			if (token.content == "{")
			{
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.attr(res, 0);
				var res = this.readOpItems(parser, "}");
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.attr(res, 0);
			}
			else
			{
				var res = this.readOperator(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, ";");
				parser = Runtime.rtl.attr(res, 0);
			}
		}
		else
		{
			if (token.content == "{")
			{
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.attr(res, 0);
				var res = parser.parser_html.constructor.readHTML(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.attr(res, 0);
			}
			else
			{
				var res = parser.parser_html.constructor.readHTML(parser);
				parser = Runtime.rtl.attr(res, 0);
				op_code = Runtime.rtl.attr(res, 1);
			}
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		return Runtime.Vector.from([parser,op_code]);
	},
	/**
	 * Read flags
	 */
	readFlags: function(parser)
	{
		var look = null;
		var token = null;
		var values = new Runtime.Map();
		var current_flags = BayLang.OpCodes.OpFlags.getFlags();
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && current_flags.indexOf(token.content) >= 0)
		{
			var flag = token.content;
			values.set("p_" + Runtime.rtl.toStr(flag), true);
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpFlags(values)]);
	},
	/**
	 * Read function args
	 */
	readDeclareFunctionArgs: function(parser, find_ident, flag_match)
	{
		if (find_ident == undefined) find_ident = true;
		if (flag_match == undefined) flag_match = true;
		var res = null;
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		if (flag_match)
		{
			res = parser.parser_base.constructor.matchToken(parser, "(");
			parser = Runtime.rtl.attr(res, 0);
		}
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		while (!token.eof && token.content != ")")
		{
			var arg_value = null;
			var arg_pattern = null;
			var arg_expression = null;
			var arg_start = parser;
			/* Arg type */
			var res = parser.parser_base.constructor.readTypeIdentifier(parser, find_ident);
			parser = Runtime.rtl.attr(res, 0);
			arg_pattern = Runtime.rtl.attr(res, 1);
			/* Arg name */
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			arg_value = Runtime.rtl.attr(res, 1);
			var arg_name = arg_value.value;
			/* Arg expression */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "=")
			{
				parser = look;
				var save_vars = parser.vars;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), new Runtime.Dict());
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.attr(res, 0);
				arg_expression = Runtime.rtl.attr(res, 1);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
			}
			/* Register variable in parser */
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(arg_name, true));
			items.push(new BayLang.OpCodes.OpDeclareFunctionArg(Runtime.Map.from({"pattern":arg_pattern,"name":arg_name,"expression":arg_expression,"caret_start":arg_pattern.caret_start,"caret_end":parser.caret})));
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == ",")
			{
				parser = look;
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
			}
		}
		if (flag_match)
		{
			res = parser.parser_base.constructor.matchToken(parser, ")");
			parser = Runtime.rtl.attr(res, 0);
		}
		return Runtime.Vector.from([parser,items]);
	},
	/**
	 * Read function variables
	 */
	readDeclareFunctionUse: function(parser, vars, find_ident)
	{
		if (vars == undefined) vars = null;
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "use")
		{
			parser = look;
			var res = parser.parser_base.constructor.matchToken(parser, "(");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			while (!token.eof && token.content != ")")
			{
				var ident = null;
				var res = parser.parser_base.constructor.readIdentifier(parser);
				parser = Runtime.rtl.attr(res, 0);
				ident = Runtime.rtl.attr(res, 1);
				var name = ident.value;
				if (vars != null && find_ident)
				{
					if (!vars.has(name))
					{
						throw new BayLang.Exceptions.ParserError("Unknown identifier '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("'"), ident.caret_start, parser.file_name)
					}
				}
				items.push(name);
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.attr(res, 0);
				token = Runtime.rtl.attr(res, 1);
				if (token.content == ",")
				{
					parser = look;
					var res = parser.parser_base.constructor.readToken(parser);
					look = Runtime.rtl.attr(res, 0);
					token = Runtime.rtl.attr(res, 1);
				}
			}
			var res = parser.parser_base.constructor.matchToken(parser, ")");
			parser = Runtime.rtl.attr(res, 0);
		}
		return Runtime.Vector.from([parser,items]);
	},
	/**
	 * Read function
	 */
	readDeclareFunction: function(parser, has_name)
	{
		if (has_name == undefined) has_name = true;
		var look = null;
		var parser_value = null;
		var op_code = null;
		var token = null;
		var flags = null;
		/* Clear vars */
		var save_is_html = parser.is_html;
		var save_vars = parser.vars;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), new Runtime.Dict());
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_html"]), false);
		var is_html = false;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "async")
		{
			parser = look;
			flags = new BayLang.OpCodes.OpFlags(Runtime.Map.from({"p_async":true}));
		}
		var res = parser.parser_base.constructor.readTypeIdentifier(parser);
		parser = Runtime.rtl.attr(res, 0);
		parser_value = Runtime.rtl.attr(res, 1);
		var caret_start = parser_value.caret_start;
		var result_type = parser_value;
		var expression = null;
		var is_context = true;
		var name = "";
		if (result_type && result_type instanceof BayLang.OpCodes.OpTypeIdentifier && result_type.entity_name instanceof BayLang.OpCodes.OpEntityName)
		{
			if (result_type.entity_name.names.get(0) == "html")
			{
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_html"]), true);
				is_html = true;
			}
		}
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "@")
		{
			is_context = false;
			parser = look;
		}
		if (has_name)
		{
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.attr(res, 0);
			parser_value = Runtime.rtl.attr(res, 1);
			var name = parser_value.value;
		}
		/* Read function arguments */
		var args = null;
		var res = this.readDeclareFunctionArgs(parser);
		parser = Runtime.rtl.attr(res, 0);
		args = Runtime.rtl.attr(res, 1);
		/* Read function variables */
		var vars = null;
		var res = this.readDeclareFunctionUse(parser, save_vars);
		parser = Runtime.rtl.attr(res, 0);
		vars = Runtime.rtl.attr(res, 1);
		/* Add variables */
		vars.each((name) =>
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(name, true));
		});
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "=>")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "=>");
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.attr(res, 0);
			expression = Runtime.rtl.attr(res, 1);
			op_code = null;
		}
		else if (token.content == "{")
		{
			var save = parser;
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.attr(res, 0);
			var res = this.readOperators(save);
			parser = Runtime.rtl.attr(res, 0);
			op_code = Runtime.rtl.attr(res, 1);
			if (is_html)
			{
				expression = op_code;
				op_code = null;
			}
		}
		else if (token.content == ";")
		{
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = Runtime.rtl.attr(res, 0);
			expression = null;
			op_code = null;
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_html"]), save_is_html);
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpDeclareFunction(Runtime.Map.from({"args":args,"vars":vars,"flags":flags,"name":name,"is_html":is_html,"is_context":is_context,"result_type":result_type,"expression":expression,"items":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Returns true if next is function
	 */
	tryReadFunction: function(parser, has_name, flags)
	{
		if (has_name == undefined) has_name = true;
		if (flags == undefined) flags = null;
		var look = null;
		var parser_value = null;
		var token = null;
		/* Clear vars */
		var save_vars = parser.vars;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), new Runtime.Dict());
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
		var res = false;
		try
		{
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "async")
			{
				parser = look;
			}
			var res = parser.parser_base.constructor.readTypeIdentifier(parser, false);
			parser = Runtime.rtl.attr(res, 0);
			parser_value = Runtime.rtl.attr(res, 1);
			var caret_start = parser_value.caret_start;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (token.content == "@")
			{
				parser = look;
			}
			if (has_name)
			{
				var res = parser.parser_base.constructor.readIdentifier(parser);
				parser = Runtime.rtl.attr(res, 0);
			}
			var res = this.readDeclareFunctionArgs(parser, false);
			parser = Runtime.rtl.attr(res, 0);
			var res = this.readDeclareFunctionUse(parser, null, false);
			parser = Runtime.rtl.attr(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.attr(res, 0);
			token = Runtime.rtl.attr(res, 1);
			if (flags != null && flags.p_declare || parser.current_class_abstract || parser.current_class_declare || parser.current_class_kind == "interface")
			{
				if (token.content != ";")
				{
					throw new BayLang.Exceptions.ParserExpected("Function", caret_start, parser.file_name)
				}
			}
			else if (token.content != "=>" && token.content != "{")
			{
				throw new BayLang.Exceptions.ParserExpected("Function", caret_start, parser.file_name)
			}
			res = true;
		}
		catch (_ex)
		{
			if (_ex instanceof BayLang.Exceptions.ParserExpected)
			{
				var e = _ex;
				
				res = false;
			}
			else
			{
				throw _ex;
			}
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), true);
		return res;
	},
	/**
	 * Read annotation
	 */
	readAnnotation: function(parser)
	{
		var look = null;
		var token = null;
		var name = null;
		var params = null;
		var res = parser.parser_base.constructor.matchToken(parser, "@");
		parser = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readTypeIdentifier(parser);
		parser = Runtime.rtl.attr(res, 0);
		name = Runtime.rtl.attr(res, 1);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.attr(res, 0);
		token = Runtime.rtl.attr(res, 1);
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.readDict(parser);
			parser = Runtime.rtl.attr(res, 0);
			params = Runtime.rtl.attr(res, 1);
		}
		return Runtime.Vector.from([parser,new BayLang.OpCodes.OpAnnotation(Runtime.Map.from({"name":name,"params":params}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.ParserBayOperator";
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
Runtime.rtl.defClass(BayLang.LangBay.ParserBayOperator);
window["BayLang.LangBay.ParserBayOperator"] = BayLang.LangBay.ParserBayOperator;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.ParserBayOperator;