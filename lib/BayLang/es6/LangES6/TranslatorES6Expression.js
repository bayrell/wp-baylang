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
BayLang.LangES6.TranslatorES6Expression = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
BayLang.LangES6.TranslatorES6Expression.prototype = Object.create(Runtime.BaseStruct.prototype);
BayLang.LangES6.TranslatorES6Expression.prototype.constructor = BayLang.LangES6.TranslatorES6Expression;
Object.assign(BayLang.LangES6.TranslatorES6Expression.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(BayLang.LangES6.TranslatorES6Expression, Runtime.BaseStruct);
Object.assign(BayLang.LangES6.TranslatorES6Expression,
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
		return "{\"e\":" + Runtime.rtl.toStr(this.toString(e)) + Runtime.rtl.toStr(b) + Runtime.rtl.toStr("}");
	},
	/**
	 * Returns string
	 */
	rtlToStr: function(t, s)
	{
		if (t.use_module_name)
		{
			return "use(\"Runtime.rtl\").toStr(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
		}
		var module_name = this.findModuleName(t, "rtl");
		return module_name + Runtime.rtl.toStr(".toStr(") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
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
			return "";
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
				names = names.setIm(0, module_name);
			}
		}
		return names;
	},
	/**
	 * Use module name
	 */
	useModuleName: function(t, module_name)
	{
		module_name = this.findModuleName(t, module_name);
		if (t.use_module_name)
		{
			return "use(" + Runtime.rtl.toStr(this.toString(module_name)) + Runtime.rtl.toStr(")");
		}
		return module_name;
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(t, op_code)
	{
		var names = this.findModuleNames(t, op_code.entity_name.names);
		var s = Runtime.rs.join(".", names);
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
				return Runtime.Vector.from([t,this.useModuleName(t, "rtl") + Runtime.rtl.toStr(".getContext()")]);
			}
			else
			{
				return Runtime.Vector.from([t,"ctx"]);
			}
		}
		if (op_code.value == "_")
		{
			if (t.enable_context == false)
			{
				return Runtime.Vector.from([t,this.useModuleName(t, "rtl") + Runtime.rtl.toStr(".getContext().translate")]);
			}
			else
			{
				return Runtime.Vector.from([t,"ctx.translate"]);
			}
		}
		if (op_code.value == "log")
		{
			return Runtime.Vector.from([t,"console.log"]);
		}
		if (t.modules.has(op_code.value) || op_code.kind == BayLang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.useModuleName(t, module_name);
			return Runtime.Vector.from([t,new_module_name]);
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
		var module_name = this.useModuleName(t, "Vector");
		content = module_name + Runtime.rtl.toStr(".from([") + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("])");
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(t, op_code)
	{
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
			return this.toString(pair.key) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(s);
		});
		values = values.filter((s) =>
		{
			return s != "";
		});
		var module_name = this.useModuleName(t, "Map");
		content = module_name + Runtime.rtl.toStr(".from({") + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("})");
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Dynamic
	 */
	Dynamic: function(t, op_code, is_call)
	{
		if (is_call == undefined) is_call = false;
		if (op_code instanceof BayLang.OpCodes.OpIdentifier)
		{
			return this.OpIdentifier(t, op_code);
		}
		else if (op_code instanceof BayLang.OpCodes.OpAttr)
		{
			var attrs = new Runtime.Vector();
			var op_code_item = op_code;
			var op_code_first = op_code;
			var first_item = "";
			var prev_kind = "";
			var s = "";
			var first_item_complex = false;
			while (op_code_first instanceof BayLang.OpCodes.OpAttr)
			{
				attrs.push(op_code_first);
				op_code_item = op_code_first;
				op_code_first = op_code_first.obj;
			}
			attrs = attrs.reverse();
			if (op_code_first instanceof BayLang.OpCodes.OpCall)
			{
				prev_kind = "var";
				var res = this.OpCall(t, op_code_first);
				t = Runtime.rtl.attr(res, 0);
				s = Runtime.rtl.attr(res, 1);
				first_item_complex = true;
			}
			else if (op_code_first instanceof BayLang.OpCodes.OpNew)
			{
				prev_kind = "var";
				var res = this.OpNew(t, op_code_first);
				t = Runtime.rtl.attr(res, 0);
				s = "(" + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr(")");
				first_item_complex = true;
			}
			else if (op_code_first instanceof BayLang.OpCodes.OpCollection)
			{
				prev_kind = "var";
				var res = this.OpCollection(t, op_code_first);
				t = Runtime.rtl.attr(res, 0);
				s = Runtime.rtl.attr(res, 1);
				first_item_complex = true;
			}
			else if (op_code_first instanceof BayLang.OpCodes.OpDict)
			{
				prev_kind = "var";
				var res = this.OpDict(t, op_code_first);
				t = Runtime.rtl.attr(res, 0);
				s = Runtime.rtl.attr(res, 1);
				first_item_complex = true;
			}
			else if (op_code_first instanceof BayLang.OpCodes.OpIdentifier)
			{
				if (op_code_first.kind == BayLang.OpCodes.OpIdentifier.KIND_CLASSREF)
				{
					if (op_code_first.value == "static")
					{
						if (!t.is_static_function)
						{
							if (!t.current_class.is_component)
							{
								s = "this.constructor";
							}
							else
							{
								s = "this.$options";
							}
						}
						else
						{
							s = "this";
						}
						prev_kind = "static";
					}
					else if (op_code_first.value == "parent")
					{
						s = this.useModuleName(t, t.current_class_extends_name);
						prev_kind = "parent";
					}
					else if (op_code_first.value == "self")
					{
						prev_kind = "static";
						s = t.current_class_full_name;
					}
					else if (op_code_first.value == "this")
					{
						prev_kind = "var";
						s = "this";
					}
				}
				else if (op_code_first.kind == BayLang.OpCodes.OpIdentifier.KIND_PIPE)
				{
					prev_kind = "var";
					s = t.pipe_var_name + Runtime.rtl.toStr(".val");
				}
				else
				{
					var res = this.OpIdentifier(t, op_code_first);
					t = Runtime.rtl.attr(res, 0);
					s = Runtime.rtl.attr(res, 1);
					prev_kind = "var";
					if (t.modules.has(op_code_first.value) || op_code_first.kind == BayLang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
					{
						prev_kind = "static";
					}
				}
			}
			first_item = s;
			if (first_item_complex && t.is_pipe)
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Map.from({"var_content":first_item}));
				t = Runtime.rtl.attr(res, 0);
				first_item = Runtime.rtl.attr(res, 1);
				s = first_item;
			}
			var attrs_sz = attrs.count();
			for (var i = 0; i < attrs_sz; i++)
			{
				var attr = attrs.item(i);
				if (attr.kind == BayLang.OpCodes.OpAttr.KIND_ATTR)
				{
					s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(attr.value.value));
					/* Pipe */
					if (t.is_pipe && !is_call)
					{
						if (i == attrs_sz - 1)
						{
							s += Runtime.rtl.toStr(".bind(" + Runtime.rtl.toStr(first_item) + Runtime.rtl.toStr(")"));
						}
						else
						{
							first_item = s;
						}
					}
				}
				else if (attr.kind == BayLang.OpCodes.OpAttr.KIND_STATIC)
				{
					if (prev_kind == "var")
					{
						s += Runtime.rtl.toStr(".constructor." + Runtime.rtl.toStr(attr.value.value));
						first_item += Runtime.rtl.toStr(".constructor");
					}
					else if (prev_kind == "parent")
					{
						if (t.current_function.isStatic())
						{
							s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(attr.value.value) + Runtime.rtl.toStr(".bind(this)"));
						}
						else
						{
							s += Runtime.rtl.toStr(".prototype." + Runtime.rtl.toStr(attr.value.value) + Runtime.rtl.toStr(".bind(this)"));
						}
					}
					else
					{
						s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(attr.value.value));
					}
					/* Pipe */
					if (t.is_pipe && prev_kind != "parent" && !is_call)
					{
						if (i == attrs_sz - 1)
						{
							s += Runtime.rtl.toStr(".bind(" + Runtime.rtl.toStr(first_item) + Runtime.rtl.toStr(")"));
						}
						else
						{
							first_item = s;
						}
					}
					prev_kind = "static";
				}
				else if (attr.kind == BayLang.OpCodes.OpAttr.KIND_DYNAMIC)
				{
					var res = this.Expression(t, attr.value);
					t = Runtime.rtl.attr(res, 0);
					/* s ~= "[" ~ res[1] ~ "]"; */
					s = "Runtime.rtl.attr(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(Runtime.rtl.attr(res, 1)) + Runtime.rtl.toStr(")");
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
					s = "Runtime.rtl.attr(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", [") + Runtime.rtl.toStr(Runtime.rs.join(", ", items)) + Runtime.rtl.toStr("])");
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
			content = "++" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == BayLang.OpCodes.OpInc.KIND_PRE_DEC)
		{
			content = "--" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == BayLang.OpCodes.OpInc.KIND_POST_INC)
		{
			content = s + Runtime.rtl.toStr("++");
		}
		else if (op_code.kind == BayLang.OpCodes.OpInc.KIND_POST_DEC)
		{
			content = s + Runtime.rtl.toStr("--");
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
				content = op1 + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(this.rtlToStr(t, op2));
			}
			else if (op_math == "implements")
			{
				var rtl_name = this.findModuleName(t, "rtl");
				content = rtl_name + Runtime.rtl.toStr(".is_implements(") + Runtime.rtl.toStr(op1) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(op2) + Runtime.rtl.toStr(")");
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
		var val1 = "";
		var val2 = op_code.value2;
		var prev_kind = "";
		if (op_code.value1.kind == BayLang.OpCodes.OpIdentifier.KIND_CLASSREF)
		{
			if (op_code.value1.value == "static")
			{
				val1 = "this" + Runtime.rtl.toStr(((!t.is_static_function) ? (".constructor") : ("")));
				prev_kind = "static";
			}
			else if (op_code.value1.value == "parent")
			{
				val1 = this.useModuleName(t, t.current_class_extends_name);
				prev_kind = "parent";
			}
			else if (op_code.value1.value == "self")
			{
				prev_kind = "static";
				val1 = t.current_class_full_name;
			}
			else if (op_code.value1.value == "this")
			{
				prev_kind = "var";
				val1 = "this";
			}
		}
		else
		{
			var res = this.OpIdentifier(t, op_code.value1);
			t = Runtime.rtl.attr(res, 0);
			val1 = Runtime.rtl.attr(res, 1);
			if (op_code.kind == BayLang.OpCodes.OpMethod.KIND_STATIC)
			{
				val1 += Runtime.rtl.toStr(".constructor");
			}
		}
		content = val1 + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(val2) + Runtime.rtl.toStr(".bind(") + Runtime.rtl.toStr(val1) + Runtime.rtl.toStr(")");
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
			content += Runtime.rtl.toStr("ctx");
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
		var args = op_code.args.filter((arg) =>
		{
			return arg instanceof BayLang.OpCodes.OpCurryArg;
		}).sort((arg1, arg2) =>
		{
			return (arg1.pos > arg2.pos) ? (1) : ((arg1.pos < arg2.pos) ? (-1) : (0));
		});
		var args_sz = args.count();
		for (var i = 0; i < args_sz; i++)
		{
			var arg = args.item(i);
			if (args_sz - 1 == i)
			{
				content += Runtime.rtl.toStr("(__varg" + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(") => "));
			}
			else
			{
				content += Runtime.rtl.toStr("(__ctx" + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(", __varg") + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(") => "));
			}
		}
		var flag = false;
		var res = t.expression.constructor.Dynamic(t, op_code.obj, true);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		if (s == "parent")
		{
			content = this.useModuleName(t, t.current_class_extends_name);
			if (t.current_function.name != "constructor")
			{
				if (t.current_function.isStatic())
				{
					content += Runtime.rtl.toStr("." + Runtime.rtl.toStr(t.current_function.name));
				}
				else
				{
					content += Runtime.rtl.toStr(".prototype." + Runtime.rtl.toStr(t.current_function.name));
				}
			}
			content += Runtime.rtl.toStr(".call(this");
			flag = true;
		}
		else
		{
			content += Runtime.rtl.toStr("(ctx");
			flag = true;
		}
		for (var i = 0; i < op_code.args.count(); i++)
		{
			s = "";
			var item = op_code.args.item(i);
			if (item instanceof BayLang.OpCodes.OpCurryArg)
			{
				s += Runtime.rtl.toStr("__varg" + Runtime.rtl.toStr(item.pos));
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
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(t, op_code)
	{
		var s = "";
		var flag = false;
		var res = t.expression.constructor.Dynamic(t, op_code.obj, true);
		t = Runtime.rtl.attr(res, 0);
		s = Runtime.rtl.attr(res, 1);
		if (s == "parent")
		{
			s = this.useModuleName(t, t.current_class_extends_name);
			if (t.current_function.name != "constructor")
			{
				if (!t.current_class.is_component)
				{
					if (t.current_function.isStatic())
					{
						s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(t.current_function.name));
					}
					else
					{
						s += Runtime.rtl.toStr(".prototype." + Runtime.rtl.toStr(t.current_function.name));
					}
				}
				else
				{
					if (t.current_function.isStatic())
					{
						s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(t.current_function.name));
					}
					else
					{
						s += Runtime.rtl.toStr(".methods." + Runtime.rtl.toStr(t.current_function.name));
					}
				}
			}
			s += Runtime.rtl.toStr(".call(this");
			flag = true;
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
				content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("ctx"));
				flag = true;
			}
			else if ((t.current_function == null || t.current_function.is_context) && op_code.is_context)
			{
				content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("ctx"));
				flag = true;
			}
		}
		/*
		if (op_code.is_html)
		{
			content ~= (flag ? ", " : "") ~
				"component, render_params, render_content";
			flag = true;
		}
		*/
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
		if (t.current_function != null && t.current_function.isFlag("async") && op_code.is_await && t.isAsyncAwait())
		{
			content = "await " + Runtime.rtl.toStr(content);
		}
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
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = Runtime.rtl.attr(res, 0);
		var condition = Runtime.rtl.attr(res, 1);
		var res = t.expression.constructor.Expression(t, op_code.if_true);
		t = Runtime.rtl.attr(res, 0);
		var if_true = Runtime.rtl.attr(res, 1);
		var res = t.expression.constructor.Expression(t, op_code.if_false);
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
		/* use Runtime.Monad */
		var monad_name = "Runtime.Monad";
		if (t.use_module_name)
		{
			var res = t.constructor.addSaveOpCode(t, Runtime.Map.from({"var_content":this.useModuleName(t, "Runtime.Monad")}));
			t = Runtime.rtl.attr(res, 0);
			monad_name = Runtime.rtl.attr(res, 1);
		}
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
		var res = t.constructor.addSaveOpCode(t, Runtime.Map.from({"content":t.s("var " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(" = new ") + Runtime.rtl.toStr(monad_name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(");"))}));
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
				s1 = var_name + Runtime.rtl.toStr(".attr(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
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
				if (!op_item.is_async || !t.enable_async_await || !t.current_function.isFlag("async"))
				{
					s1 = var_name + Runtime.rtl.toStr(".callMethod(\"") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr("\", [") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr("])");
				}
				else
				{
					s1 = "await " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".callMethodAsync(\"") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr("\", [") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr("])");
				}
			}
			else if (op_item.kind == BayLang.OpCodes.OpPipe.KIND_CALL)
			{
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), true);
				var res = this.Dynamic(t, op_item.value);
				t = Runtime.rtl.attr(res, 0);
				value = Runtime.rtl.attr(res, 1);
				if (!op_item.is_async || !t.enable_async_await || !t.current_function.isFlag("async"))
				{
					if (op_item.is_monad)
					{
						s1 = var_name + Runtime.rtl.toStr(".monad(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
					}
					else
					{
						s1 = var_name + Runtime.rtl.toStr(".call(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
					}
				}
				else
				{
					if (op_item.is_monad)
					{
						s1 = "await " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".monadAsync(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
					}
					else
					{
						s1 = "await " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".callAsync(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
					}
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
		return Runtime.Vector.from([t,var_name + Runtime.rtl.toStr(".value()")]);
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
		content = this.useModuleName(t, "rtl") + Runtime.rtl.toStr(".to(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(this.toPattern(t, op_code.pattern)) + Runtime.rtl.toStr(")");
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareFunction
	 */
	OpDeclareFunction: function(t, op_code, is_arrow)
	{
		if (is_arrow == undefined) is_arrow = true;
		var content = "";
		var is_async = "";
		if (op_code.isFlag("async") && t.isAsyncAwait())
		{
			is_async = "async ";
		}
		/* Set function name */
		var save_f = t.current_function;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code);
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code);
		var args = Runtime.rtl.attr(res, 1);
		if (is_arrow)
		{
			content += Runtime.rtl.toStr(is_async + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(") =>"));
		}
		else
		{
			content += Runtime.rtl.toStr(is_async + Runtime.rtl.toStr("function (") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
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
			var res = this.OpPipe(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content = Runtime.rtl.attr(res, 1);
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
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["debug_component"]), Runtime.Vector.from([]));
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
		return "BayLang.LangES6";
	},
	getClassName: function()
	{
		return "BayLang.LangES6.TranslatorES6Expression";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
Runtime.rtl.defClass(BayLang.LangES6.TranslatorES6Expression);
window["BayLang.LangES6.TranslatorES6Expression"] = BayLang.LangES6.TranslatorES6Expression;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangES6.TranslatorES6Expression;