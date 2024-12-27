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
BayLang.LangPHP.TranslatorPHPExpression = function()
{
};
Object.assign(BayLang.LangPHP.TranslatorPHPExpression.prototype,
{
});
Object.assign(BayLang.LangPHP.TranslatorPHPExpression,
{
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
		s = Runtime.re.replace("\\$", "\\$", s);
		return "\"" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("\"");
	},
	/**
	 * To pattern
	 */
	toPattern: function(t, pattern)
	{
		var names = this.findModuleNames(t, pattern.entity_name.names);
		var e = Runtime.rs.join(".", names);
		var a = (pattern.template != null) ? (pattern.template.map((pattern) =>
		{
			return this.toPattern(t, pattern);
		})) : (null);
		var b = (a != null) ? (",\"t\":[" + Runtime.rtl.toStr(Runtime.rs.join(",", a)) + Runtime.rtl.toStr("]")) : ("");
		return "[\"e\"=>" + Runtime.rtl.toStr(this.toString(e)) + Runtime.rtl.toStr(b) + Runtime.rtl.toStr("]");
	},
	/**
	 * Returns string
	 */
	rtlToStr: function(t, s)
	{
		var module_name = this.getModuleName(t, "rtl");
		return module_name + Runtime.rtl.toStr("::toStr(") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
	},
	/**
	 * Find module name
	 */
	findModuleName: function(t, module_name)
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
			return "ArrayAccess";
		}
		else if (t.modules.has(module_name))
		{
			return t.modules.item(module_name);
		}
		return module_name;
	},
	/**
	 * Returns module name
	 */
	findModuleNames: function(t, names)
	{
		if (names.count() > 0)
		{
			var module_name = names.first();
			module_name = this.findModuleName(t, module_name);
			if (module_name != "")
			{
				names = Runtime.rs.split(".", module_name).concat(names.slice(1));
			}
		}
		return names;
	},
	/**
	 * Return module name
	 */
	getModuleName: function(t, module_name)
	{
		module_name = this.findModuleName(t, module_name);
		module_name = Runtime.re.replace("\\.", "\\", module_name);
		return "\\" + Runtime.rtl.toStr(module_name);
	},
	/**
	 * Return module name
	 */
	getModuleNames: function(t, names)
	{
		return "\\" + Runtime.rtl.toStr(Runtime.rs.join("\\", this.findModuleNames(t, names)));
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(t, op_code)
	{
		var names = this.findModuleNames(t, op_code.entity_name.names);
		var s = "\\" + Runtime.rtl.toStr(Runtime.rs.join("\\", names));
		return Runtime.Vector.from([t,s]);
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(t, op_code)
	{
		if (op_code.value == "@")
		{
			if (t.enable_context == false)
			{
				return Runtime.Vector.from([t,"\\Runtime\\rtl::getContext()"]);
			}
			else
			{
				return Runtime.Vector.from([t,"$ctx"]);
			}
		}
		if (op_code.value == "_")
		{
			if (t.enable_context == false)
			{
				return Runtime.Vector.from([t,"\\Runtime\\rtl::getContext()->translate"]);
			}
			else
			{
				return Runtime.Vector.from([t,"$ctx->translate"]);
			}
		}
		if (op_code.value == "@")
		{
			return Runtime.Vector.from([t,"$ctx"]);
		}
		if (op_code.value == "_")
		{
			return Runtime.Vector.from([t,"$ctx->translate"]);
		}
		if (op_code.value == "log")
		{
			return Runtime.Vector.from([t,"var_dump"]);
		}
		if (t.modules.has(op_code.value) || op_code.kind == BayLang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.getModuleName(t, module_name);
			return Runtime.Vector.from([t,new_module_name]);
		}
		else if (op_code.kind == BayLang.OpCodes.OpIdentifier.KIND_VARIABLE)
		{
			var content = op_code.value;
			return Runtime.Vector.from([t,"$" + Runtime.rtl.toStr(content)]);
		}
		else if (op_code.kind == BayLang.OpCodes.OpIdentifier.KIND_CLASSREF)
		{
			var content = op_code.value;
			if (content == "this")
			{
				content = "$this";
			}
			return Runtime.Vector.from([t,content]);
		}
		var content = op_code.value;
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpNumber
	 */
	OpNumber: function(t, op_code)
	{
		var content = op_code.value;
		/*if (op_code.negative)
		{
			content = "-" ~ content;
			t <= opcode_level <= 15;
		}*/
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpNegative
	 */
	OpNegative: function(t, op_code)
	{
		var res = this.Expression(t, op_code.value);
		t = Runtime.rtl.attr(res, 0);
		var content = Runtime.rtl.attr(res, 1);
		content = "-" + Runtime.rtl.toStr(content);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 15);
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpString
	 */
	OpString: function(t, op_code)
	{
		return Runtime.Vector.from([t,this.toString(op_code.value)]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(t, op_code)
	{
		var content = "";
		var values = op_code.values.map((op_code) =>
		{
			var res = this.Expression(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			var s = Runtime.rtl.attr(res, 1);
			return s;
		});
		values = values.filter((s) =>
		{
			return s != "";
		});
		var module_name = this.getModuleName(t, "Vector");
		content = module_name + Runtime.rtl.toStr("::from([") + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("])");
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(t, op_code, flag_array)
	{
		if (flag_array == undefined) flag_array = false;
		var content = "";
		var values = op_code.values.map((pair, key) =>
		{
			if (pair.condition != null && Runtime.rtl.attr(t.preprocessor_flags, pair.condition.value) != true)
			{
				return "";
			}
			var res = this.Expression(t, pair.value);
			t = Runtime.rtl.attr(res, 0);
			var s = Runtime.rtl.attr(res, 1);
			return this.toString(pair.key) + Runtime.rtl.toStr("=>") + Runtime.rtl.toStr(s);
		});
		values = values.filter((s) =>
		{
			return s != "";
		});
		var module_name = this.getModuleName(t, "Map");
		if (!flag_array)
		{
			content = module_name + Runtime.rtl.toStr("::from([") + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("])");
		}
		else
		{
			content = "[" + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("]");
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Dynamic
	 */
	Dynamic: function(t, op_code, next_op_code)
	{
		if (next_op_code == undefined) next_op_code = null;
		if (op_code instanceof BayLang.OpCodes.OpIdentifier)
		{
			return this.OpIdentifier(t, op_code);
		}
		else if (op_code instanceof BayLang.OpCodes.OpAttr)
		{
			var attrs = new Runtime.Vector();
			var op_code_item = op_code;
			var op_code_next = op_code;
			var prev_kind = "";
			var s = "";
			var first_item_complex = false;
			while (op_code_next instanceof BayLang.OpCodes.OpAttr)
			{
				attrs.push(op_code_next);
				op_code_item = op_code_next;
				op_code_next = op_code_next.obj;
			}
			attrs = attrs.reverse();
			if (op_code_next instanceof BayLang.OpCodes.OpCall)
			{
				prev_kind = "var";
				var res = this.OpCall(t, op_code_next);
				t = Runtime.rtl.attr(res, 0);
				s = Runtime.rtl.attr(res, 1);
				first_item_complex = true;
			}
			else if (op_code_next instanceof BayLang.OpCodes.OpNew)
			{
				prev_kind = "var";
				var res = this.OpNew(t, op_code_next);
				t = Runtime.rtl.attr(res, 0);
				s = "(" + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr(")");
				first_item_complex = true;
			}
			else if (op_code_next instanceof BayLang.OpCodes.OpCollection)
			{
				prev_kind = "var";
				var res = this.OpCollection(t, op_code_next);
				t = Runtime.rtl.attr(res, 0);
				s = "(" + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr(")");
				first_item_complex = true;
			}
			else if (op_code_next instanceof BayLang.OpCodes.OpDict)
			{
				prev_kind = "var";
				var res = this.OpDict(t, op_code_next);
				t = Runtime.rtl.attr(res, 0);
				s = "(" + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr(")");
				first_item_complex = true;
			}
			else if (op_code_next instanceof BayLang.OpCodes.OpIdentifier)
			{
				if (op_code_next.kind == BayLang.OpCodes.OpIdentifier.KIND_CLASSREF)
				{
					if (op_code_next.value == "static")
					{
						s = "static";
						prev_kind = "static";
					}
					else if (op_code_next.value == "parent")
					{
						s = "parent";
						prev_kind = "static";
					}
					else if (op_code_next.value == "self")
					{
						prev_kind = "static";
						s = this.getModuleName(t, t.current_class_full_name);
					}
					else if (op_code_next.value == "this")
					{
						prev_kind = "var";
						s = "$this";
					}
				}
				else if (op_code_next.kind == BayLang.OpCodes.OpIdentifier.KIND_PIPE)
				{
					prev_kind = "var";
					var res = t.constructor.addSaveOpCode(t, Runtime.Map.from({"var_content":t.pipe_var_name + Runtime.rtl.toStr("->val")}));
					t = Runtime.rtl.attr(res, 0);
					s = Runtime.rtl.attr(res, 1);
					prev_kind = "static";
				}
				else
				{
					var res = this.OpIdentifier(t, op_code_next);
					t = Runtime.rtl.attr(res, 0);
					s = Runtime.rtl.attr(res, 1);
					prev_kind = "var";
					if (t.modules.has(op_code_next.value) || op_code_next.kind == BayLang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
					{
						prev_kind = "static";
					}
				}
			}
			if (first_item_complex && t.is_pipe)
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Map.from({"var_content":s}));
				t = Runtime.rtl.attr(res, 0);
				s = Runtime.rtl.attr(res, 1);
			}
			var attrs_sz = attrs.count();
			for (var i = 0; i < attrs.count(); i++)
			{
				var attr = attrs.item(i);
				var next_attr = attrs.get(i + 1, null);
				if (attr.kind == BayLang.OpCodes.OpAttr.KIND_ATTR)
				{
					/* Pipe */
					if (t.is_pipe && !(next_op_code instanceof BayLang.OpCodes.OpCall))
					{
						if (i == attrs_sz - 1)
						{
							var val2 = this.toString(attr.value.value);
							s = "new \\Runtime\\Callback(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(val2) + Runtime.rtl.toStr(")");
						}
						else
						{
							s += Runtime.rtl.toStr("->" + Runtime.rtl.toStr(attr.value.value));
						}
					}
					else
					{
						s += Runtime.rtl.toStr("->" + Runtime.rtl.toStr(attr.value.value));
					}
				}
				else if (attr.kind == BayLang.OpCodes.OpAttr.KIND_STATIC)
				{
					if (prev_kind == "static")
					{
						var attr_val = attr.value.value;
						if (i == attrs_sz - 1 && next_op_code instanceof BayLang.OpCodes.OpCall)
						{
							s += Runtime.rtl.toStr("::" + Runtime.rtl.toStr(attr_val));
						}
						else if (Runtime.rs.upper(attr_val) == attr_val)
						{
							s += Runtime.rtl.toStr("::" + Runtime.rtl.toStr(attr_val));
						}
						else
						{
							var val1;
							if (s == "static")
							{
								val1 = "static::class";
							}
							else
							{
								val1 = s + Runtime.rtl.toStr("::class");
							}
							var val2 = this.toString(attr_val);
							s = "new \\Runtime\\Callback(" + Runtime.rtl.toStr(val1) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(val2) + Runtime.rtl.toStr(")");
						}
					}
					else
					{
						s = s + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(attr.value.value);
					}
					prev_kind = "static";
				}
				else if (attr.kind == BayLang.OpCodes.OpAttr.KIND_DYNAMIC)
				{
					var res = this.Expression(t, attr.value);
					t = Runtime.rtl.attr(res, 0);
					/* s ~= "[" ~ res[1] ~ "]"; */
					s = "\\Runtime\\rtl::attr($ctx, " + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr(")");
				}
				else if (attr.kind == BayLang.OpCodes.OpAttr.KIND_DYNAMIC_ATTRS)
				{
					var items = new Runtime.Vector();
					if (attr.attrs != null)
					{
						for (var j = 0; j < attr.attrs.count(); j++)
						{
							var res = this.Expression(t, Runtime.rtl.attr(attr.attrs, j));
							t = Runtime.rtl.attr(res, 0);
							items.push(Runtime.rtl.attr(res, 1));
						}
					}
					s = "\\Runtime\\rtl::attr($ctx, " + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", [") + Runtime.rtl.toStr(Runtime.rs.join(", ", items)) + Runtime.rtl.toStr("])");
				}
			}
			return Runtime.Vector.from([t,s]);
		}
		else if (op_code instanceof BayLang.OpCodes.OpCurry)
		{
			var res = this.OpCurry(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			var content = Runtime.rtl.attr(res, 1);
			var res = t.constructor.addSaveOpCode(t, Runtime.Map.from({"var_content":content}));
			t = Runtime.rtl.attr(res, 0);
			var var_name = Runtime.rtl.attr(res, 1);
			return Runtime.Vector.from([t,var_name]);
		}
		else if (op_code instanceof BayLang.OpCodes.OpCall)
		{
			return this.OpCall(t, op_code);
		}
		return Runtime.Vector.from([t,""]);
	},
	/**
	 * OpInc
	 */
	OpInc: function(t, op_code)
	{
		var content = "";
		var res = this.Expression(t, op_code.value);
		t = Runtime.rtl.attr(res, 0);
		var s = Runtime.rtl.attr(res, 1);
		if (op_code.kind == BayLang.OpCodes.OpInc.KIND_PRE_INC)
		{
			content = "++$" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == BayLang.OpCodes.OpInc.KIND_PRE_DEC)
		{
			content = "--$" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == BayLang.OpCodes.OpInc.KIND_POST_INC)
		{
			content = "$" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("++");
		}
		else if (op_code.kind == BayLang.OpCodes.OpInc.KIND_POST_DEC)
		{
			content = "$" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("--");
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpMath
	 */
	OpMath: function(t, op_code)
	{
		var res = this.Expression(t, op_code.value1);
		t = Runtime.rtl.attr(res, 0);
		var opcode_level1 = Runtime.rtl.attr(res, 0).opcode_level;
		var s1 = Runtime.rtl.attr(res, 1);
		var op = "";
		var op_math = op_code.math;
		var opcode_level = 0;
		if (op_code.math == "!")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == ">>")
		{
			opcode_level = 12;
			op = ">>";
		}
		if (op_code.math == "<<")
		{
			opcode_level = 12;
			op = "<<";
		}
		if (op_code.math == "&")
		{
			opcode_level = 9;
			op = "&";
		}
		if (op_code.math == "xor")
		{
			opcode_level = 8;
			op = "^";
		}
		if (op_code.math == "|")
		{
			opcode_level = 7;
			op = "|";
		}
		if (op_code.math == "*")
		{
			opcode_level = 14;
			op = "*";
		}
		if (op_code.math == "/")
		{
			opcode_level = 14;
			op = "/";
		}
		if (op_code.math == "%")
		{
			opcode_level = 14;
			op = "%";
		}
		if (op_code.math == "div")
		{
			opcode_level = 14;
			op = "div";
		}
		if (op_code.math == "mod")
		{
			opcode_level = 14;
			op = "mod";
		}
		if (op_code.math == "+")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "-")
		{
			opcode_level = 13;
			op = "-";
		}
		if (op_code.math == "~")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "!")
		{
			opcode_level = 13;
			op = "!";
		}
		if (op_code.math == "===")
		{
			opcode_level = 10;
			op = "===";
		}
		if (op_code.math == "!==")
		{
			opcode_level = 10;
			op = "!==";
		}
		if (op_code.math == "==")
		{
			opcode_level = 10;
			op = "==";
		}
		if (op_code.math == "!=")
		{
			opcode_level = 10;
			op = "!=";
		}
		if (op_code.math == ">=")
		{
			opcode_level = 10;
			op = ">=";
		}
		if (op_code.math == "<=")
		{
			opcode_level = 10;
			op = "<=";
		}
		if (op_code.math == ">")
		{
			opcode_level = 10;
			op = ">";
		}
		if (op_code.math == "<")
		{
			opcode_level = 10;
			op = "<";
		}
		if (op_code.math == "is")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "instanceof")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "implements")
		{
			opcode_level = 10;
			op = "implements";
		}
		if (op_code.math == "not")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == "and")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "&&")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "or")
		{
			opcode_level = 5;
			op = "||";
		}
		if (op_code.math == "||")
		{
			opcode_level = 5;
			op = "||";
		}
		var content = "";
		if (op_code.math == "!" || op_code.math == "not")
		{
			content = op + Runtime.rtl.toStr(t.o(s1, opcode_level1, opcode_level));
		}
		else
		{
			var res = this.Expression(t, op_code.value2);
			t = Runtime.rtl.attr(res, 0);
			var opcode_level2 = Runtime.rtl.attr(res, 0).opcode_level;
			var s2 = Runtime.rtl.attr(res, 1);
			var op1 = t.o(s1, opcode_level1, opcode_level);
			var op2 = t.o(s2, opcode_level2, opcode_level);
			if (op_math == "~")
			{
				content = op1 + Runtime.rtl.toStr(" . ") + Runtime.rtl.toStr(this.rtlToStr(t, op2));
			}
			else if (op_math == "implements")
			{
				content = op1 + Runtime.rtl.toStr(" instanceof ") + Runtime.rtl.toStr(op2);
			}
			else
			{
				content = op1 + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op2);
			}
		}
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), opcode_level);
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpMethod
	 */
	OpMethod: function(t, op_code)
	{
		var content = "";
		var res = this.OpIdentifier(t, op_code.value1);
		t = Runtime.rtl.attr(res, 0);
		var val1 = Runtime.rtl.attr(res, 1);
		var val2 = op_code.value2;
		if (op_code.kind == BayLang.OpCodes.OpMethod.KIND_STATIC)
		{
			val1 = val1 + Runtime.rtl.toStr("->getClassName()");
		}
		else if (op_code.kind == BayLang.OpCodes.OpMethod.KIND_CLASS)
		{
			val1 = val1 + Runtime.rtl.toStr("::class");
		}
		var content = "new \\Runtime\\Callback(" + Runtime.rtl.toStr(val1) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(this.toString(val2)) + Runtime.rtl.toStr(")");
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 0);
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpNew
	 */
	OpNew: function(t, op_code)
	{
		var content = "new ";
		var res = this.OpTypeIdentifier(t, op_code.value);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		var flag = false;
		content += Runtime.rtl.toStr("(");
		if (t.current_function == null || t.current_function.is_context)
		{
			content += Runtime.rtl.toStr("$ctx");
			flag = true;
		}
		for (var i = 0; i < op_code.args.count(); i++)
		{
			var item = op_code.args.item(i);
			var res = t.expression.constructor.Expression(t, item);
			t = Runtime.rtl.attr(res, 0);
			var s = Runtime.rtl.attr(res, 1);
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpCurry
	 */
	OpCurry: function(t, op_code)
	{
		var content = "";
		var s = "";
		var args_use = new Runtime.Vector();
		var args = op_code.args.filter((arg) =>
		{
			return arg instanceof BayLang.OpCodes.OpCurryArg;
		}).sort((arg1, arg2) =>
		{
			return (arg1.pos > arg2.pos) ? (1) : ((arg1.pos < arg2.pos) ? (-1) : (0));
		});
		var use_obj_item = "";
		if (op_code.obj instanceof BayLang.OpCodes.OpIdentifier)
		{
			if (op_code.obj.kind == BayLang.OpCodes.OpIdentifier.KIND_VARIABLE)
			{
				use_obj_item = "$" + Runtime.rtl.toStr(op_code.obj.value);
			}
		}
		var args_sz = op_code.args.count();
		for (var i = 0; i < args_sz; i++)
		{
			var arg = op_code.args.item(i);
			if (arg instanceof BayLang.OpCodes.OpCurryArg)
			{
				continue;
			}
			if (arg instanceof BayLang.OpCodes.OpIdentifier)
			{
				args_use.push("$" + Runtime.rtl.toStr(arg.value));
			}
		}
		var args_sz = args.count();
		for (var i = 0; i < args_sz; i++)
		{
			var arg = args.item(i);
			var s_use = "";
			var arr_use = new Runtime.Vector();
			arr_use.appendItems(args_use);
			for (var j = 0; j < i; j++)
			{
				var arg_use = args.item(j);
				arr_use.push("$__varg" + Runtime.rtl.toStr(arg_use.pos));
			}
			if (use_obj_item != "")
			{
				arr_use.push(use_obj_item);
			}
			if (arr_use.count() > 0)
			{
				s_use = " use (" + Runtime.rtl.toStr(Runtime.rs.join(", ", arr_use)) + Runtime.rtl.toStr(")");
			}
			if (args_sz - 1 == i)
			{
				content += Runtime.rtl.toStr("function ($ctx, $__varg" + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr(s_use) + Runtime.rtl.toStr("{return "));
			}
			else
			{
				content += Runtime.rtl.toStr("function ($__ctx" + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(", $__varg") + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr(s_use) + Runtime.rtl.toStr("{return "));
			}
		}
		var flag = false;
		var res = this.Dynamic(t, op_code.obj, op_code);
		t = Runtime.rtl.attr(res, 0);
		s = Runtime.rtl.attr(res, 1);
		if (s == "parent")
		{
			var f_name = t.current_function.name;
			if (f_name == "constructor")
			{
				f_name = "__construct";
			}
			s = "parent::" + Runtime.rtl.toStr(f_name);
			content += Runtime.rtl.toStr(s);
		}
		else
		{
			content += Runtime.rtl.toStr("(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")"));
		}
		content += Runtime.rtl.toStr("($ctx");
		flag = true;
		for (var i = 0; i < op_code.args.count(); i++)
		{
			s = "";
			var item = op_code.args.item(i);
			if (item instanceof BayLang.OpCodes.OpCurryArg)
			{
				s += Runtime.rtl.toStr("$__varg" + Runtime.rtl.toStr(item.pos));
			}
			else
			{
				var res = this.Expression(t, item);
				t = Runtime.rtl.attr(res, 0);
				s = Runtime.rtl.attr(res, 1);
			}
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		for (var i = 0; i < args_sz; i++)
		{
			content += Runtime.rtl.toStr(";}");
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(t, op_code)
	{
		var s = "";
		var flag = false;
		var res = this.Dynamic(t, op_code.obj, op_code);
		t = Runtime.rtl.attr(res, 0);
		s = Runtime.rtl.attr(res, 1);
		if (s == "parent")
		{
			var f_name = t.current_function.name;
			if (f_name == "constructor")
			{
				f_name = "__construct";
			}
			s = "parent::" + Runtime.rtl.toStr(f_name) + Runtime.rtl.toStr("(");
		}
		else
		{
			s += Runtime.rtl.toStr("(");
		}
		var content = s;
		if (t.enable_context)
		{
			if (op_code.obj instanceof BayLang.OpCodes.OpIdentifier && op_code.obj.value == "_")
			{
				content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("$ctx"));
				flag = true;
			}
			else if ((t.current_function == null || t.current_function.is_context) && op_code.is_context)
			{
				content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("$ctx"));
				flag = true;
			}
		}
		/*
		if (op_code.is_html)
		{
			content ~= (flag ? ", " : "") ~
				"$layout, $model_path, $render_params, $render_content";
			flag = true;
		}
		*/
		for (var i = 0; i < op_code.args.count(); i++)
		{
			var item = op_code.args.item(i);
			var res = this.Expression(t, item);
			t = Runtime.rtl.attr(res, 0);
			var s = Runtime.rtl.attr(res, 1);
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpClassOf
	 */
	OpClassOf: function(t, op_code)
	{
		var names = this.findModuleNames(t, op_code.entity_name.names);
		var s = Runtime.rs.join(".", names);
		return Runtime.Vector.from([t,this.toString(s)]);
	},
	/**
	 * OpTernary
	 */
	OpTernary: function(t, op_code)
	{
		var content = "";
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 100);
		var res = this.Expression(t, op_code.condition);
		t = Runtime.rtl.attr(res, 0);
		var condition = Runtime.rtl.attr(res, 1);
		var res = this.Expression(t, op_code.if_true);
		t = Runtime.rtl.attr(res, 0);
		var if_true = Runtime.rtl.attr(res, 1);
		var res = this.Expression(t, op_code.if_false);
		t = Runtime.rtl.attr(res, 0);
		var if_false = Runtime.rtl.attr(res, 1);
		content += Runtime.rtl.toStr("(" + Runtime.rtl.toStr(condition) + Runtime.rtl.toStr(") ? (") + Runtime.rtl.toStr(if_true) + Runtime.rtl.toStr(") : (") + Runtime.rtl.toStr(if_false) + Runtime.rtl.toStr(")"));
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 0);
		/* OpTernary */
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var content = "";
		var var_name = "";
		var value = "";
		var res = t.constructor.incSaveOpCode(t);
		t = Runtime.rtl.attr(res, 0);
		var_name = Runtime.rtl.attr(res, 1);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["pipe_var_name"]), var_name);
		var items = new Runtime.Vector();
		var op_code_item = op_code;
		while (op_code_item instanceof BayLang.OpCodes.OpPipe)
		{
			items.push(op_code_item);
			op_code_item = op_code_item.obj;
		}
		items = items.reverse();
		/* First item */
		var res = t.expression.constructor.Expression(t, op_code_item);
		t = Runtime.rtl.attr(res, 0);
		value = Runtime.rtl.attr(res, 1);
		var res = t.constructor.addSaveOpCode(t, Runtime.Map.from({"content":t.s(var_name + Runtime.rtl.toStr(" = new \\Runtime\\Monad(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(");"))}));
		t = Runtime.rtl.attr(res, 0);
		/* Output items */
		for (var i = 0; i < items.count(); i++)
		{
			var s1 = "";
			var s2 = "";
			var op_item = items.item(i);
			if (op_item.kind == BayLang.OpCodes.OpPipe.KIND_ATTR)
			{
				var res = this.Expression(t, op_item.value);
				t = Runtime.rtl.attr(res, 0);
				value = Runtime.rtl.attr(res, 1);
				s1 = var_name + Runtime.rtl.toStr("->attr(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
			}
			else if (op_item.kind == BayLang.OpCodes.OpPipe.KIND_METHOD)
			{
				var value = op_item.value.obj.value.value;
				var args = "";
				var flag = false;
				for (var j = 0; j < op_item.value.args.count(); j++)
				{
					var item = op_item.value.args.item(j);
					var res = t.expression.constructor.Expression(t, item);
					t = Runtime.rtl.attr(res, 0);
					var s = Runtime.rtl.attr(res, 1);
					args += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
					flag = true;
				}
				s1 = var_name + Runtime.rtl.toStr("->callMethod(\"") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr("\", [") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr("])");
			}
			else if (op_item.kind == BayLang.OpCodes.OpPipe.KIND_CALL)
			{
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), true);
				var res = this.Dynamic(t, op_item.value);
				t = Runtime.rtl.attr(res, 0);
				value = Runtime.rtl.attr(res, 1);
				if (op_item.is_monad)
				{
					s1 = var_name + Runtime.rtl.toStr("->monad(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
				}
				else
				{
					s1 = var_name + Runtime.rtl.toStr("->call(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
				}
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), false);
			}
			if (s1 != "")
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Map.from({"content":t.s(var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";"))}));
				t = Runtime.rtl.attr(res, 0);
			}
			if (s2 != "")
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Map.from({"content":t.s(s2)}));
				t = Runtime.rtl.attr(res, 0);
			}
		}
		return Runtime.Vector.from([t,var_name + Runtime.rtl.toStr("->value()")]);
	},
	/**
	 * OpTypeConvert
	 */
	OpTypeConvert: function(t, op_code)
	{
		var content = "";
		var res = this.Expression(t, op_code.value);
		t = Runtime.rtl.attr(res, 0);
		var value = Runtime.rtl.attr(res, 1);
		content = "\\Runtime\\rtl::to(" + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(this.toPattern(t, op_code.pattern)) + Runtime.rtl.toStr(")");
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareFunction
	 */
	OpDeclareFunction: function(t, op_code)
	{
		var content = "";
		/* Set function name */
		var save_f = t.current_function;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code);
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code);
		var args = Runtime.rtl.attr(res, 1);
		content += Runtime.rtl.toStr("function (" + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
		if (op_code.vars != null && op_code.vars.count() > 0)
		{
			var vars = op_code.vars.map((s) =>
			{
				return "&$" + Runtime.rtl.toStr(s);
			});
			content += Runtime.rtl.toStr(" use (" + Runtime.rtl.toStr(Runtime.rs.join(",", vars)) + Runtime.rtl.toStr(")"));
		}
		var res = t.operator.constructor.OpDeclareFunctionBody(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		/* Restore function */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), save_f);
		/* OpTernary */
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Expression
	 */
	Expression: function(t, op_code)
	{
		var content = "";
		var save_is_pipe = t.is_pipe;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 100);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), false);
		if (op_code instanceof BayLang.OpCodes.OpIdentifier)
		{
			var res = this.OpIdentifier(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpTypeIdentifier)
		{
			var res = this.OpTypeIdentifier(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpNegative)
		{
			var res = this.OpNegative(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpNumber)
		{
			var res = this.OpNumber(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpString)
		{
			var res = this.OpString(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpCollection)
		{
			var res = this.OpCollection(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpDict)
		{
			var res = this.OpDict(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpInc)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 16);
			var res = this.OpInc(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpMath)
		{
			var res = this.OpMath(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpMethod)
		{
			var res = this.OpMethod(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpNew)
		{
			var res = this.OpNew(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpAttr)
		{
			var res = this.Dynamic(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpCall)
		{
			var res = this.OpCall(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpClassOf)
		{
			var res = this.OpClassOf(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpCurry)
		{
			var res = this.OpCurry(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpPipe)
		{
			return this.OpPipe(t, op_code);
		}
		else if (op_code instanceof BayLang.OpCodes.OpTernary)
		{
			var res = this.OpTernary(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpTypeConvert)
		{
			var res = this.OpTypeConvert(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpDeclareFunction)
		{
			var res = this.OpDeclareFunction(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		else if (op_code instanceof BayLang.OpCodes.OpHtmlItems)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), true);
			var res = t.html.constructor.OpHtmlExpression(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), false);
		}
		else if (op_code instanceof BayLang.OpCodes.OpPreprocessorIfDef)
		{
			var res = t.operator.constructor.OpPreprocessorIfDef(t, op_code, BayLang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
		}
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), save_is_pipe);
		return Runtime.Vector.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangPHP";
	},
	getClassName: function()
	{
		return "BayLang.LangPHP.TranslatorPHPExpression";
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
Runtime.rtl.defClass(BayLang.LangPHP.TranslatorPHPExpression);
window["BayLang.LangPHP.TranslatorPHPExpression"] = BayLang.LangPHP.TranslatorPHPExpression;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangPHP.TranslatorPHPExpression;