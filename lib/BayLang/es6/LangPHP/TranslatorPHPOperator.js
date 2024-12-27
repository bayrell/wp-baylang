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
BayLang.LangPHP.TranslatorPHPOperator = function()
{
};
Object.assign(BayLang.LangPHP.TranslatorPHPOperator.prototype,
{
});
Object.assign(BayLang.LangPHP.TranslatorPHPOperator,
{
	/**
	 * OpAssign
	 */
	OpAssignStruct: function(t, op_code, pos)
	{
		if (pos == undefined) pos = 0;
		var content = "";
		var var_name = op_code.var_name;
		var res = t.expression.constructor.Expression(t, op_code.expression);
		t = Runtime.rtl.attr(res, 0);
		var expr = Runtime.rtl.attr(res, 1);
		var names = op_code.names.map((item) =>
		{
			if (item instanceof BayLang.OpCodes.BaseOpCode)
			{
				var res = t.expression.constructor.Expression(t, item);
				t = Runtime.rtl.attr(res, 0);
				return Runtime.rtl.attr(res, 1);
			}
			return t.expression.constructor.toString(item);
		});
		content = "\\Runtime\\rtl::setAttr($ctx, $" + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", [") + Runtime.rtl.toStr(Runtime.rs.join(", ", names)) + Runtime.rtl.toStr("], ") + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(")");
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpAssign
	 */
	OpAssign: function(t, op_code, flag_indent)
	{
		if (flag_indent == undefined) flag_indent = true;
		var content = "";
		if (op_code.kind == BayLang.OpCodes.OpAssign.KIND_ASSIGN || op_code.kind == BayLang.OpCodes.OpAssign.KIND_DECLARE)
		{
			for (var i = 0; i < op_code.values.count(); i++)
			{
				var item = op_code.values.item(i);
				var index_s = "";
				var s = "";
				var op = item.op;
				if (op == "")
				{
					op = "=";
				}
				if (item.expression == null)
				{
					continue;
				}
				/* Expression */
				var item_expression = "";
				var res = t.expression.constructor.Expression(t, item.expression);
				t = Runtime.rtl.attr(res, 0);
				if (op == "~=")
				{
					item_expression = t.expression.constructor.rtlToStr(t, Runtime.rtl.attr(res, 1));
				}
				else
				{
					item_expression = Runtime.rtl.attr(res, 1);
				}
				if (item.op_code instanceof BayLang.OpCodes.OpAttr)
				{
					var items = new Runtime.Vector();
					var items2 = new Runtime.Vector();
					var op_code_next = item.op_code;
					while (op_code_next instanceof BayLang.OpCodes.OpAttr)
					{
						items.push(op_code_next);
						op_code_next = op_code_next.obj;
					}
					items = items.reverse();
					var res = t.expression.constructor.OpIdentifier(t, op_code_next);
					t = Runtime.rtl.attr(res, 0);
					var obj_s = Runtime.rtl.attr(res, 1);
					for (var j = 0; j < items.count(); j++)
					{
						var item_attr = Runtime.rtl.attr(items, j);
						if (item_attr.kind == BayLang.OpCodes.OpAttr.KIND_ATTR)
						{
							obj_s += Runtime.rtl.toStr("->" + Runtime.rtl.toStr(item_attr.value.value));
							items2.push(t.expression.constructor.toString(item_attr.value.value));
						}
						else if (item_attr.kind == BayLang.OpCodes.OpAttr.KIND_DYNAMIC)
						{
							var res = t.expression.constructor.Expression(t, item_attr.value);
							t = Runtime.rtl.attr(res, 0);
							obj_s += Runtime.rtl.toStr("[" + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr("]"));
							items2.push(Runtime.rtl.attr(res, 1));
						}
						else if (item_attr.kind == BayLang.OpCodes.OpAttr.KIND_DYNAMIC_ATTRS)
						{
							if (item_attr.attrs != null)
							{
								for (var j = item_attr.attrs.count() - 1; j >= 0; j--)
								{
									var res = t.expression.constructor.Expression(t, Runtime.rtl.attr(item_attr.attrs, j));
									t = Runtime.rtl.attr(res, 0);
									obj_s += Runtime.rtl.toStr("[" + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr("]"));
									items2.push(Runtime.rtl.attr(res, 1));
								}
							}
						}
					}
					if (op == "~=" || op == "+=" || op == "-=")
					{
						var op2 = "+";
						if (op == "~=" || op == "+=")
						{
							op2 = "+";
						}
						else if (op == "-=")
						{
							op2 = "-";
						}
						item_expression = "\\Runtime\\rtl\\attr($ctx, " + Runtime.rtl.toStr(obj_s) + Runtime.rtl.toStr(", [") + Runtime.rtl.toStr(Runtime.rs.join(", ", items2)) + Runtime.rtl.toStr("]) ") + Runtime.rtl.toStr(op2) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(item_expression);
					}
					index_s = obj_s + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(item_expression) + Runtime.rtl.toStr(";");
				}
				else
				{
					if (item.op_code != null && item.op_code.value == "@" && t.enable_context == false)
					{
						index_s = "\\Runtime\\rtl::setContext(" + Runtime.rtl.toStr(item_expression) + Runtime.rtl.toStr(");");
					}
					else
					{
						if (op_code.kind == BayLang.OpCodes.OpAssign.KIND_DECLARE)
						{
							s = "$" + Runtime.rtl.toStr(item.var_name);
						}
						else
						{
							var res = t.expression.constructor.OpIdentifier(t, item.op_code);
							t = Runtime.rtl.attr(res, 0);
							s = Runtime.rtl.attr(res, 1);
						}
						if (item_expression != "")
						{
							if (op == "~=")
							{
								s += Runtime.rtl.toStr(" .= " + Runtime.rtl.toStr(item_expression));
							}
							else
							{
								s += Runtime.rtl.toStr(" " + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(item_expression));
							}
							index_s = s + Runtime.rtl.toStr(";");
						}
					}
				}
				if (item.var_name != "" && t.save_vars.indexOf(item.var_name) == -1)
				{
					t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_vars"]), t.save_vars.pushIm(item.var_name));
				}
				if (index_s != "")
				{
					content += Runtime.rtl.toStr((flag_indent) ? (t.s(index_s)) : (index_s));
				}
			}
		}
		else if (op_code.kind == BayLang.OpCodes.OpAssign.KIND_STRUCT)
		{
			var s = "$" + Runtime.rtl.toStr(op_code.var_name) + Runtime.rtl.toStr(" = ");
			var res = this.OpAssignStruct(t, op_code, 0);
			t = Runtime.rtl.attr(res, 0);
			content = t.s(s + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr(";"));
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDelete
	 */
	OpDelete: function(t, op_code)
	{
		var content = "";
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(t, op_code)
	{
		var content = "";
		var s1 = "";
		var s2 = "";
		var s3 = "";
		if (op_code.expr1 instanceof BayLang.OpCodes.OpAssign)
		{
			var res = this.OpAssign(t, op_code.expr1, false);
			t = Runtime.rtl.attr(res, 0);
			s1 = Runtime.rtl.attr(res, 1);
		}
		else
		{
			var res = t.expression.constructor.Expression(t, op_code.expr1);
			t = Runtime.rtl.attr(res, 0);
			s1 = Runtime.rtl.attr(res, 1);
		}
		var res = t.expression.constructor.Expression(t, op_code.expr2);
		t = Runtime.rtl.attr(res, 0);
		s2 = Runtime.rtl.attr(res, 1);
		var res = t.expression.constructor.Expression(t, op_code.expr3);
		t = Runtime.rtl.attr(res, 0);
		s3 = Runtime.rtl.attr(res, 1);
		content = t.s("for (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(s2) + Runtime.rtl.toStr("; ") + Runtime.rtl.toStr(s3) + Runtime.rtl.toStr(")"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(t, op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = Runtime.rtl.attr(res, 0);
		var s1 = Runtime.rtl.attr(res, 1);
		content = t.s("if (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(")"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.if_true);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		for (var i = 0; i < op_code.if_else.count(); i++)
		{
			var if_else = op_code.if_else.item(i);
			var res = t.expression.constructor.Expression(t, if_else.condition);
			t = Runtime.rtl.attr(res, 0);
			var s2 = Runtime.rtl.attr(res, 1);
			content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(s2) + Runtime.rtl.toStr(")")));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, if_else.if_true);
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
		}
		if (op_code.if_false != null)
		{
			content += Runtime.rtl.toStr(t.s("else"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, op_code.if_false);
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(t, op_code)
	{
		var content = "";
		var s1 = "";
		if (op_code.expression)
		{
			var res = t.expression.constructor.Expression(t, op_code.expression);
			t = Runtime.rtl.attr(res, 0);
			s1 = Runtime.rtl.attr(res, 1);
		}
		if (t.current_function.flags != null && t.current_function.flags.isFlag("memorize"))
		{
			var content = t.s("$__memorize_value = " + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";"));
			content += Runtime.rtl.toStr(t.s(t.expression.constructor.getModuleName(t, "Runtime.rtl") + Runtime.rtl.toStr("::_memorizeSave(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(t.current_function.name) + Runtime.rtl.toStr("\", func_get_args(), $__memorize_value);")));
			content += Runtime.rtl.toStr(t.s("return $__memorize_value;"));
			return Runtime.Vector.from([t,content]);
		}
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";")));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpThrow
	 */
	OpThrow: function(t, op_code)
	{
		var res = t.expression.constructor.Expression(t, op_code.expression);
		t = Runtime.rtl.attr(res, 0);
		var content = t.s("throw " + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr(";"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(t, op_code)
	{
		var content = "";
		content += Runtime.rtl.toStr(t.s("try"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.op_try);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(t.s(Runtime.rtl.attr(res, 1)));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("catch (\\Exception $_ex)"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		for (var i = 0; i < op_code.items.count(); i++)
		{
			var s = "";
			var pattern = "";
			var item = op_code.items.item(i);
			var res = t.expression.constructor.OpTypeIdentifier(t, item.pattern);
			t = Runtime.rtl.attr(res, 0);
			pattern += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			if (pattern != "\\var")
			{
				s = "if ($_ex instanceof " + Runtime.rtl.toStr(pattern) + Runtime.rtl.toStr(")");
			}
			else
			{
				s = "if (true)";
			}
			s += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			s += Runtime.rtl.toStr((s != "") ? (t.s("$" + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = $_ex;"))) : ("$" + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = $_ex;")));
			var res = this.Operators(t, item.value);
			t = Runtime.rtl.attr(res, 0);
			s += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			t = t.levelDec();
			s += Runtime.rtl.toStr(t.s("}"));
			if (i != 0)
			{
				s = "else " + Runtime.rtl.toStr(s);
			}
			content += Runtime.rtl.toStr(t.s(s));
		}
		content += Runtime.rtl.toStr(t.s("else"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("throw $_ex;"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(t, op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = Runtime.rtl.attr(res, 0);
		var s1 = Runtime.rtl.attr(res, 1);
		content += Runtime.rtl.toStr(t.s("while (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpPreprocessorIfCode
	 */
	OpPreprocessorIfCode: function(t, op_code)
	{
		var content = "";
		if (Runtime.rtl.attr(t.preprocessor_flags, op_code.condition.value) == true)
		{
			content = Runtime.rs.trim(op_code.content);
		}
		return Runtime.Vector.from([t,t.s(content)]);
	},
	/**
	 * OpPreprocessorIfDef
	 */
	OpPreprocessorIfDef: function(t, op_code, kind)
	{
		if (!(Runtime.rtl.attr(t.preprocessor_flags, op_code.condition.value) == true))
		{
			return Runtime.Vector.from([t,""]);
		}
		if (kind == BayLang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR)
		{
			return this.Operators(t, op_code.items);
		}
		else if (kind == BayLang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION)
		{
			return t.expression.constructor.Expression(t, op_code.items);
		}
		var content = "";
		for (var i = 0; i < op_code.items.count(); i++)
		{
			var item = op_code.items.item(i);
			if (item instanceof BayLang.OpCodes.OpComment)
			{
				var res = t.operator.constructor.OpComment(t, item);
				t = Runtime.rtl.attr(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
			else if (item instanceof BayLang.OpCodes.OpDeclareFunction)
			{
				var res = t.program.constructor.OpDeclareFunction(t, item);
				t = Runtime.rtl.attr(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpComment
	 */
	OpComment: function(t, op_code)
	{
		var content = t.s("/*" + Runtime.rtl.toStr(op_code.value) + Runtime.rtl.toStr("*/"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpComments
	 */
	OpComments: function(t, comments)
	{
		var content = "";
		for (var i = 0; i < comments.count(); i++)
		{
			var res = this.OpComment(t, comments.item(i));
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpComments
	 */
	AddComments: function(t, comments, content)
	{
		if (comments && comments.count() > 0)
		{
			var res = this.OpComments(t, comments);
			var s = Runtime.rtl.attr(res, 1);
			if (s != "")
			{
				content = s + Runtime.rtl.toStr(content);
			}
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Operator
	 */
	Operator: function(t, op_code)
	{
		var content = "";
		/* Save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		if (op_code instanceof BayLang.OpCodes.OpAssign)
		{
			var res = this.OpAssign(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			var content = Runtime.rtl.attr(res, 1);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content = save + Runtime.rtl.toStr(content);
			}
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			return Runtime.Vector.from([t,content]);
		}
		else if (op_code instanceof BayLang.OpCodes.OpAssignStruct)
		{
			var res = this.OpAssignStruct(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			var s1 = Runtime.rtl.attr(res, 1);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content = save;
			}
			content += Runtime.rtl.toStr(t.s("$" + Runtime.rtl.toStr(op_code.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";")));
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			return Runtime.Vector.from([t,content]);
		}
		else if (op_code instanceof BayLang.OpCodes.OpBreak)
		{
			content = t.s("break;");
		}
		else if (op_code instanceof BayLang.OpCodes.OpCall)
		{
			var res = t.expression.constructor.OpCall(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = t.s(Runtime.rtl.attr(res, 1) + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof BayLang.OpCodes.OpContinue)
		{
			content = t.s("continue;");
		}
		else if (op_code instanceof BayLang.OpCodes.OpDelete)
		{
			var res = this.OpDelete(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpFor)
		{
			var res = this.OpFor(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpIf)
		{
			var res = this.OpIf(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpPipe)
		{
			var res = t.expression.constructor.OpPipe(t, op_code, false);
			t = Runtime.rtl.attr(res, 0);
			content = t.s(Runtime.rtl.attr(res, 1) + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof BayLang.OpCodes.OpReturn)
		{
			var res = this.OpReturn(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpThrow)
		{
			var res = this.OpThrow(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpTryCatch)
		{
			var res = this.OpTryCatch(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpWhile)
		{
			var res = this.OpWhile(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpInc)
		{
			var res = t.expression.constructor.OpInc(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = t.s(Runtime.rtl.attr(res, 1) + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof BayLang.OpCodes.OpPreprocessorIfCode)
		{
			var res = this.OpPreprocessorIfCode(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpPreprocessorIfDef)
		{
			var res = this.OpPreprocessorIfDef(t, op_code, BayLang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpPreprocessorSwitch)
		{
			for (var i = 0; i < op_code.items.count(); i++)
			{
				var res = this.OpPreprocessorIfCode(t, op_code.items.item(i));
				var s = Runtime.rtl.attr(res, 1);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
		}
		else if (op_code instanceof BayLang.OpCodes.OpComment)
		{
			var res = this.OpComment(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpSafe)
		{
			var res = this.Operators(t, op_code.items);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
		if (save != "")
		{
			content = save + Runtime.rtl.toStr(content);
		}
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Operators
	 */
	Operators: function(t, op_code)
	{
		var content = "";
		var f1 = (op_code) =>
		{
			return op_code instanceof BayLang.OpCodes.OpBreak || op_code instanceof BayLang.OpCodes.OpCall || op_code instanceof BayLang.OpCodes.OpContinue || op_code instanceof BayLang.OpCodes.OpReturn || op_code instanceof BayLang.OpCodes.OpThrow;
		};
		if (op_code instanceof BayLang.OpCodes.OpItems)
		{
			for (var i = 0; i < op_code.items.count(); i++)
			{
				var item = op_code.items.item(i);
				var res = this.Operator(t, item);
				t = Runtime.rtl.attr(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
		}
		else if (op_code instanceof BayLang.OpCodes.OpHtmlItems)
		{
			var save_html_var_name = t.html_var_name;
			var save_is_html = t.is_html;
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), true);
			var res = t.html.constructor.OpHtmlItems(t, op_code, save_html_var_name, false);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), save_is_html);
		}
		else
		{
			var res = this.Operator(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareFunction Arguments
	 */
	OpDeclareFunctionArgs: function(t, f)
	{
		var content = "";
		if (f.args != null)
		{
			var flag = false;
			if (f.is_context)
			{
				content += Runtime.rtl.toStr("$ctx");
				flag = true;
			}
			/*
			if (f.is_html)
			{
				flag = true;
				content ~= (flag ? ", " : "") ~
					"$layout, $model_path, $render_params, $render_content";
			}
			*/
			for (var i = 0; i < f.args.count(i); i++)
			{
				var arg = f.args.item(i);
				var name = arg.name;
				var expr = "";
				if (arg.expression != null)
				{
					var res = t.expression.constructor.Expression(t, arg.expression);
					t = Runtime.rtl.attr(res, 0);
					expr = Runtime.rtl.attr(res, 1);
				}
				content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("$") + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(((expr != "") ? ("=" + Runtime.rtl.toStr(expr)) : (""))));
				flag = true;
			}
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(t, f)
	{
		var save_t = t;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), false);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), false);
		var content = "";
		t = t.levelInc();
		/*
		if (f.is_html)
		{
			content ~= t.s("$model = \\Runtime\\rtl::attr($layout, $model_path);");
		}
		*/
		if (f.items)
		{
			var res = t.operator.constructor.Operators(t, f.items);
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		else if (f.expression)
		{
			/* Clear save op codes */
			t = t.constructor.clearSaveOpCode(t);
			var res = t.expression.constructor.Expression(t, f.expression);
			t = Runtime.rtl.attr(res, 0);
			var expr = Runtime.rtl.attr(res, 1);
			var s = "";
			if (f.flags != null && f.flags.isFlag("memorize"))
			{
				s = "$__memorize_value = " + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(";");
				s += Runtime.rtl.toStr(t.s(t.expression.constructor.getModuleName(t, "Runtime.rtl") + Runtime.rtl.toStr("::_memorizeSave(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(f.name) + Runtime.rtl.toStr("\", func_get_args(), $__memorize_value);")));
				s += Runtime.rtl.toStr(t.s("return $__memorize_value;"));
			}
			else
			{
				s = t.s("return " + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(";"));
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t);
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(s);
		}
		if (f.flags != null && f.flags.isFlag("memorize"))
		{
			var s = "";
			s += Runtime.rtl.toStr(t.s("$__memorize_value = " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(t, "Runtime.rtl")) + Runtime.rtl.toStr("::_memorizeValue(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(f.name) + Runtime.rtl.toStr("\", func_get_args());")));
			s += Runtime.rtl.toStr(t.s("if ($__memorize_value != " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(t, "Runtime.rtl")) + Runtime.rtl.toStr("::$_memorize_not_found) return $__memorize_value;")));
			content = s + Runtime.rtl.toStr(content);
		}
		t = t.levelDec();
		content = t.s("{") + Runtime.rtl.toStr(content);
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Vector.from([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangPHP";
	},
	getClassName: function()
	{
		return "BayLang.LangPHP.TranslatorPHPOperator";
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
Runtime.rtl.defClass(BayLang.LangPHP.TranslatorPHPOperator);
window["BayLang.LangPHP.TranslatorPHPOperator"] = BayLang.LangPHP.TranslatorPHPOperator;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangPHP.TranslatorPHPOperator;