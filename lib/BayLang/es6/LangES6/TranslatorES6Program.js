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
BayLang.LangES6.TranslatorES6Program = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
BayLang.LangES6.TranslatorES6Program.prototype = Object.create(Runtime.BaseStruct.prototype);
BayLang.LangES6.TranslatorES6Program.prototype.constructor = BayLang.LangES6.TranslatorES6Program;
Object.assign(BayLang.LangES6.TranslatorES6Program.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(BayLang.LangES6.TranslatorES6Program, Runtime.BaseStruct);
Object.assign(BayLang.LangES6.TranslatorES6Program,
{
	/**
	 * To pattern
	 */
	toPattern: function(t, pattern)
	{
		var names = t.expression.constructor.findModuleNames(t, pattern.entity_name.names);
		var e = Runtime.rs.join(".", names);
		var a = (pattern.template != null) ? (pattern.template.map((pattern) =>
		{
			return this.toPattern(t, pattern);
		})) : (null);
		var b = (a != null) ? (",\"t\":[" + Runtime.rtl.toStr(Runtime.rs.join(",", a)) + Runtime.rtl.toStr("]")) : ("");
		return "{\"e\":" + Runtime.rtl.toStr(t.expression.constructor.toString(e)) + Runtime.rtl.toStr(b) + Runtime.rtl.toStr("}");
	},
	/**
	 * OpNamespace
	 */
	OpNamespace: function(t, op_code)
	{
		var content = "";
		var name = "";
		var s = "";
		var arr = Runtime.rs.split(".", op_code.name);
		for (var i = 0; i < arr.count(); i++)
		{
			name = name + Runtime.rtl.toStr(((i == 0) ? ("") : ("."))) + Runtime.rtl.toStr(arr.item(i));
			s = "if (typeof " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(" == 'undefined') ") + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(" = {};");
			content += Runtime.rtl.toStr(t.s(s));
		}
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_namespace_name"]), op_code.name);
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareFunction
	 */
	OpDeclareFunction: function(t, op_code)
	{
		var is_static_function = t.is_static_function;
		var is_static = op_code.isStatic();
		var content = "";
		if (op_code.isFlag("declare"))
		{
			return Runtime.Vector.from([t,""]);
		}
		if (!is_static && is_static_function || is_static && !is_static_function)
		{
			return Runtime.Vector.from([t,""]);
		}
		/* Set current function */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code);
		var is_async = "";
		if (op_code.isFlag("async") && t.isAsyncAwait())
		{
			is_async = "async ";
		}
		var s = "";
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code);
		var args = Runtime.rtl.attr(res, 1);
		s += Runtime.rtl.toStr(op_code.name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(is_async) + Runtime.rtl.toStr("function(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
		var res = t.operator.constructor.OpDeclareFunctionBody(t, op_code);
		s += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		s += Runtime.rtl.toStr(",");
		/* Function comments */
		var res = t.operator.constructor.AddComments(t, op_code.comments, t.s(s));
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassConstructor: function(t, op_code)
	{
		var open = "";
		var content = "";
		var save_t = t;
		/* Set function name */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code.fn_create);
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(t);
		if (op_code.fn_create == null)
		{
			open += Runtime.rtl.toStr(t.current_class_full_name + Runtime.rtl.toStr(" = "));
			open += Runtime.rtl.toStr("function()");
			open = t.s(open) + Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			/* Call parent */
			if (t.current_class_extends_name != "")
			{
				content += Runtime.rtl.toStr(t.s(t.expression.constructor.useModuleName(t, t.current_class_extends_name) + Runtime.rtl.toStr(".apply(this, arguments);")));
			}
		}
		else
		{
			open += Runtime.rtl.toStr(t.current_class_full_name + Runtime.rtl.toStr(" = function("));
			var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code.fn_create);
			t = Runtime.rtl.attr(res, 0);
			open += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			open += Runtime.rtl.toStr(")");
			open = t.s(open) + Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
		}
		/* Function body */
		if (op_code.fn_create != null)
		{
			if (op_code.fn_create.args)
			{
				for (var i = 0; i < op_code.fn_create.args.count(); i++)
				{
					var arg = op_code.fn_create.args.item(i);
					if (arg.expression == null)
					{
						continue;
					}
					var res = t.expression.constructor.Expression(t, arg.expression);
					t = Runtime.rtl.attr(res, 0);
					var s = Runtime.rtl.attr(res, 1);
					s = "if (" + Runtime.rtl.toStr(arg.name) + Runtime.rtl.toStr(" == undefined) ") + Runtime.rtl.toStr(arg.name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";");
					content += Runtime.rtl.toStr(t.s(s));
				}
			}
			var res = t.operator.constructor.Operators(t, (op_code.fn_create.expression) ? (op_code.fn_create.expression) : (op_code.fn_create.items));
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		/* Constructor end */
		content = open + Runtime.rtl.toStr(content);
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("};"));
		return Runtime.Vector.from([save_t,content]);
	},
	/**
	 * OpDeclareClassBodyItem
	 */
	OpDeclareClassBodyItem: function(t, item)
	{
		var content = "";
		if (item instanceof BayLang.OpCodes.OpPreprocessorIfDef)
		{
			var res = t.operator.constructor.OpPreprocessorIfDef(t, item, BayLang.OpCodes.OpPreprocessorIfDef.KIND_CLASS_BODY);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpFunctionAnnotations
	 */
	OpFunctionAnnotations: function(t, f)
	{
		var content = "";
		if (f.flags.isFlag("declare"))
		{
			return Runtime.Vector.from([t,content]);
		}
		if (!f.annotations)
		{
			return Runtime.Vector.from([t,content]);
		}
		if (f.annotations.count() == 0)
		{
			return Runtime.Vector.from([t,content]);
		}
		content += Runtime.rtl.toStr(t.s("if (field_name == " + Runtime.rtl.toStr(t.expression.constructor.toString(f.name)) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		var s1 = "";
		t = t.levelInc();
		s1 += Runtime.rtl.toStr(t.s("var Vector = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Vector")) + Runtime.rtl.toStr(";")));
		s1 += Runtime.rtl.toStr(t.s("var Map = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Map")) + Runtime.rtl.toStr(";")));
		s1 += Runtime.rtl.toStr(t.s("return Map.from({"));
		t = t.levelInc();
		if (f.flags.isFlag("async"))
		{
			s1 += Runtime.rtl.toStr(t.s("\"async\": true,"));
		}
		s1 += Runtime.rtl.toStr(t.s("\"annotations\": Vector.from(["));
		t = t.levelInc();
		for (var j = 0; j < f.annotations.count(); j++)
		{
			var annotation = f.annotations.item(j);
			var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
			t = Runtime.rtl.attr(res, 0);
			var name = Runtime.rtl.attr(res, 1);
			var params = "";
			if (annotation.params != null)
			{
				var res = t.expression.constructor.OpDict(t, annotation.params, true);
				t = Runtime.rtl.attr(res, 0);
				params = Runtime.rtl.attr(res, 1);
			}
			s1 += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
		}
		t = t.levelDec();
		s1 += Runtime.rtl.toStr(t.s("]),"));
		t = t.levelDec();
		s1 += Runtime.rtl.toStr(t.s("});"));
		var save = t.constructor.outputSaveOpCode(t);
		if (save != "")
		{
			content += Runtime.rtl.toStr(t.s(save));
		}
		content += Runtime.rtl.toStr(s1);
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpClassBodyItemMethodsList
	 */
	OpClassBodyItemMethodsList: function(t, item)
	{
		var content = "";
		if (item instanceof BayLang.OpCodes.OpPreprocessorIfDef)
		{
			if (Runtime.rtl.attr(t.preprocessor_flags, item.condition.value) == true)
			{
				for (var i = 0; i < item.items.count(); i++)
				{
					var op_code = item.items.item(i);
					var res = this.OpClassBodyItemMethodsList(t, op_code);
					t = Runtime.rtl.attr(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
				}
			}
		}
		else if (item instanceof BayLang.OpCodes.OpDeclareFunction)
		{
			if (!item.flags.isFlag("declare") && !item.flags.isFlag("protected") && !item.flags.isFlag("private") && !(item.annotations == null) && !(item.annotations.count() == 0))
			{
				content += Runtime.rtl.toStr(t.s(t.expression.constructor.toString(item.name) + Runtime.rtl.toStr(",")));
			}
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpClassBodyItemAnnotations
	 */
	OpClassBodyItemAnnotations: function(t, item)
	{
		var content = "";
		if (item instanceof BayLang.OpCodes.OpPreprocessorIfDef)
		{
			if (Runtime.rtl.attr(t.preprocessor_flags, item.condition.value) == true)
			{
				for (var i = 0; i < item.items.count(); i++)
				{
					var op_code = item.items.item(i);
					var res = this.OpClassBodyItemAnnotations(t, op_code);
					t = Runtime.rtl.attr(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
				}
			}
		}
		else if (item instanceof BayLang.OpCodes.OpDeclareFunction)
		{
			var res = this.OpFunctionAnnotations(t, item);
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Static variables
	 */
	OpDeclareClassStaticVariables: function(t, op_code)
	{
		var content = "";
		if (op_code.vars != null)
		{
			for (var i = 0; i < op_code.vars.count(); i++)
			{
				var variable = op_code.vars.item(i);
				if (variable.kind != BayLang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				if (variable.condition && Runtime.rtl.attr(t.preprocessor_flags, variable.condition.value) != true)
				{
					continue;
				}
				var is_static = variable.flags.isFlag("static");
				if (!is_static)
				{
					continue;
				}
				for (var j = 0; j < variable.values.count(); j++)
				{
					var value = variable.values.item(j);
					var res = t.expression.constructor.Expression(t, value.expression);
					var s = (value.expression != null) ? (Runtime.rtl.attr(res, 1)) : ("null");
					content += Runtime.rtl.toStr(t.s(value.var_name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(",")));
				}
			}
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Static functions
	 */
	OpDeclareClassStaticFunctions: function(t, op_code)
	{
		var content = "";
		/* Static Functions */
		if (op_code.functions != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), true);
			for (var i = 0; i < op_code.functions.count(); i++)
			{
				var f = op_code.functions.item(i);
				if (f.flags.isFlag("declare"))
				{
					continue;
				}
				if (!f.isStatic())
				{
					continue;
				}
				/* Set function name */
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), f);
				var is_async = "";
				if (f.isFlag("async") && t.isAsyncAwait())
				{
					is_async = "async ";
				}
				var s = "";
				var res = t.operator.constructor.OpDeclareFunctionArgs(t, f);
				var args = Runtime.rtl.attr(res, 1);
				s += Runtime.rtl.toStr(f.name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(is_async) + Runtime.rtl.toStr("function(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
				var res = t.operator.constructor.OpDeclareFunctionBody(t, f);
				s += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
				s += Runtime.rtl.toStr(",");
				/* Function comments */
				var res = t.operator.constructor.AddComments(t, f.comments, t.s(s));
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
		}
		/* Items */
		if (op_code.items != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), true);
			for (var i = 0; i < op_code.items.count(); i++)
			{
				var item = op_code.items.item(i);
				var res = this.OpDeclareClassBodyItem(t, item);
				t = Runtime.rtl.attr(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBodyStatic: function(t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		var current_class_extends_name = t.expression.constructor.findModuleName(t, t.current_class_extends_name);
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		t = t.constructor.clearSaveOpCode(t);
		/* Returns parent class name */
		var parent_class_name = "";
		if (op_code.class_extends != null)
		{
			var res = t.expression.constructor.OpTypeIdentifier(t, op_code.class_extends);
			parent_class_name = Runtime.rtl.attr(res, 1);
		}
		/* Extends */
		if (current_class_extends_name != "" && !op_code.is_component)
		{
			content += Runtime.rtl.toStr(t.s("Object.assign(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, current_class_extends_name)) + Runtime.rtl.toStr(");")));
		}
		content += Runtime.rtl.toStr(t.s("Object.assign(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(",")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* Static variables */
		var res = this.OpDeclareClassStaticVariables(t, op_code);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		/* Static Functions */
		if (class_kind != BayLang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			var res = this.OpDeclareClassStaticFunctions(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		/* Declare component functions */
		if (op_code.is_model || op_code.is_component)
		{
			var res = this.OpDeclareComponentFunctions(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		/* Static init Functions */
		var res = this.OpDeclareClassStaticInitFunctions(t, op_code);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("});"));
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Static init functions
	 */
	OpDeclareClassStaticInitFunctions: function(t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		var current_class_extends_name = t.expression.constructor.findModuleName(t, t.current_class_extends_name);
		if (class_kind == BayLang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			/* Get current namespace function */
			content += Runtime.rtl.toStr(t.s("getNamespace: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_namespace_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Get current class name function */
			content += Runtime.rtl.toStr(t.s("getClassName: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_class_full_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			return Runtime.Vector.from([t,content]);
		}
		if (op_code.is_component == false)
		{
			content += Runtime.rtl.toStr(t.s("/* ======================= Class Init Functions ======================= */"));
		}
		/* Get current namespace function */
		content += Runtime.rtl.toStr(t.s("getNamespace: function()"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_namespace_name)) + Runtime.rtl.toStr(";")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		/* Get current class name function */
		content += Runtime.rtl.toStr(t.s("getClassName: function()"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_class_full_name)) + Runtime.rtl.toStr(";")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		/* Get parent class name function */
		content += Runtime.rtl.toStr(t.s("getParentClassName: function()"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(current_class_extends_name)) + Runtime.rtl.toStr(";")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		/* Class info */
		content += Runtime.rtl.toStr(t.s("getClassInfo: function()"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		t = t.constructor.clearSaveOpCode(t);
		var s1 = "";
		s1 += Runtime.rtl.toStr(t.s("var Vector = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Vector")) + Runtime.rtl.toStr(";")));
		s1 += Runtime.rtl.toStr(t.s("var Map = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Map")) + Runtime.rtl.toStr(";")));
		s1 += Runtime.rtl.toStr(t.s("return Map.from({"));
		t = t.levelInc();
		s1 += Runtime.rtl.toStr(t.s("\"annotations\": Vector.from(["));
		t = t.levelInc();
		for (var j = 0; j < op_code.annotations.count(); j++)
		{
			var annotation = op_code.annotations.item(j);
			var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
			t = Runtime.rtl.attr(res, 0);
			var name = Runtime.rtl.attr(res, 1);
			if (annotation.params != null)
			{
				var res = t.expression.constructor.OpDict(t, annotation.params, true);
				t = Runtime.rtl.attr(res, 0);
				var params = Runtime.rtl.attr(res, 1);
				s1 += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
			}
			else
			{
				s1 += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(),")));
			}
		}
		t = t.levelDec();
		s1 += Runtime.rtl.toStr(t.s("]),"));
		t = t.levelDec();
		s1 += Runtime.rtl.toStr(t.s("});"));
		var save = t.constructor.outputSaveOpCode(t);
		if (save != "")
		{
			content += Runtime.rtl.toStr(save);
		}
		content += Runtime.rtl.toStr(s1);
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		/* Get fields list of the function */
		t = t.constructor.clearSaveOpCode(t);
		content += Runtime.rtl.toStr(t.s("getFieldsList: function()"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("var a = [];"));
		if (op_code.vars != null)
		{
			var vars = new Runtime.Map();
			for (var i = 0; i < op_code.vars.count(); i++)
			{
				var variable = op_code.vars.item(i);
				var is_const = variable.flags.isFlag("const");
				var is_static = variable.flags.isFlag("static");
				var is_protected = variable.flags.isFlag("protected");
				var is_private = variable.flags.isFlag("private");
				var is_serializable = variable.flags.isFlag("serializable");
				var is_assignable = true;
				var has_annotation = variable.annotations != null && variable.annotations.count() > 0;
				if (is_const || is_static)
				{
					continue;
				}
				if (is_protected || is_private)
				{
					continue;
				}
				if (variable.kind != BayLang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				if (class_kind != BayLang.OpCodes.OpDeclareClass.KIND_STRUCT)
				{
					if (variable.annotations == null)
					{
						continue;
					}
					if (variable.annotations.count() == 0)
					{
						continue;
					}
				}
				if (variable.condition && Runtime.rtl.attr(t.preprocessor_flags, variable.condition.value) != true)
				{
					continue;
				}
				for (var j = 0; j < variable.values.count(); j++)
				{
					var value = variable.values.item(j);
					content += Runtime.rtl.toStr(t.s("a.push(" + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(");")));
				}
			}
		}
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Vector")) + Runtime.rtl.toStr(".from(a);")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		/* Get field info by name */
		content += Runtime.rtl.toStr(t.s("getFieldInfoByName: function(field_name)"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		if (op_code.vars != null)
		{
			content += Runtime.rtl.toStr(t.s("var Vector = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Vector")) + Runtime.rtl.toStr(";")));
			content += Runtime.rtl.toStr(t.s("var Map = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Map")) + Runtime.rtl.toStr(";")));
			for (var i = 0; i < op_code.vars.count(); i++)
			{
				var variable = op_code.vars.item(i);
				if (variable.kind != BayLang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				if (variable.condition && Runtime.rtl.attr(t.preprocessor_flags, variable.condition.value) != true)
				{
					continue;
				}
				var is_const = variable.flags.isFlag("const");
				var is_static = variable.flags.isFlag("static");
				var is_protected = variable.flags.isFlag("protected");
				var is_private = variable.flags.isFlag("private");
				if (is_const || is_static)
				{
					continue;
				}
				if (is_protected || is_private)
				{
					continue;
				}
				if (variable.annotations == null)
				{
					continue;
				}
				if (variable.annotations.count() == 0)
				{
					continue;
				}
				var v = variable.values.map((value) =>
				{
					return value.var_name;
				});
				v = v.map((var_name) =>
				{
					return "field_name == " + Runtime.rtl.toStr(t.expression.constructor.toString(var_name));
				});
				var var_type = Runtime.rs.join(".", t.expression.constructor.findModuleNames(t, variable.pattern.entity_name.names));
				var var_sub_types = (variable.pattern.template != null) ? (variable.pattern.template.map((op_code) =>
				{
					return Runtime.rs.join(".", t.expression.constructor.findModuleNames(t, op_code.entity_name.names));
				})) : (Runtime.Vector.from([]));
				var_sub_types = var_sub_types.map(t.expression.constructor.toString);
				t = t.constructor.clearSaveOpCode(t);
				var s1 = "";
				s1 += Runtime.rtl.toStr(t.s("if (" + Runtime.rtl.toStr(Runtime.rs.join(" or ", v)) + Runtime.rtl.toStr(") return Map.from({")));
				t = t.levelInc();
				s1 += Runtime.rtl.toStr(t.s("\"t\": " + Runtime.rtl.toStr(t.expression.constructor.toString(var_type)) + Runtime.rtl.toStr(",")));
				if (var_sub_types.count() > 0)
				{
					s1 += Runtime.rtl.toStr(t.s("\"s\": [" + Runtime.rtl.toStr(Runtime.rs.join(", ", var_sub_types)) + Runtime.rtl.toStr("],")));
				}
				s1 += Runtime.rtl.toStr(t.s("\"annotations\": Vector.from(["));
				t = t.levelInc();
				for (var j = 0; j < variable.annotations.count(); j++)
				{
					var annotation = variable.annotations.item(j);
					var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
					t = Runtime.rtl.attr(res, 0);
					var name = Runtime.rtl.attr(res, 1);
					var res = t.expression.constructor.OpDict(t, annotation.params, true);
					t = Runtime.rtl.attr(res, 0);
					var params = Runtime.rtl.attr(res, 1);
					s1 += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
				}
				t = t.levelDec();
				s1 += Runtime.rtl.toStr(t.s("]),"));
				t = t.levelDec();
				s1 += Runtime.rtl.toStr(t.s("});"));
				var save = t.constructor.outputSaveOpCode(t);
				if (save != "")
				{
					content += Runtime.rtl.toStr(save);
				}
				content += Runtime.rtl.toStr(s1);
			}
		}
		content += Runtime.rtl.toStr(t.s("return null;"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		/* Get methods list of the function */
		t = t.constructor.clearSaveOpCode(t);
		content += Runtime.rtl.toStr(t.s("getMethodsList: function()"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("var a=["));
		t = t.levelInc();
		if (op_code.functions != null)
		{
			for (var i = 0; i < op_code.functions.count(); i++)
			{
				var f = op_code.functions.item(i);
				if (f.flags.isFlag("declare"))
				{
					continue;
				}
				if (f.flags.isFlag("protected"))
				{
					continue;
				}
				if (f.flags.isFlag("private"))
				{
					continue;
				}
				if (f.annotations.count() == 0)
				{
					continue;
				}
				content += Runtime.rtl.toStr(t.s(t.expression.constructor.toString(f.name) + Runtime.rtl.toStr(",")));
			}
		}
		if (op_code.items != null)
		{
			for (var i = 0; i < op_code.items.count(); i++)
			{
				var item = op_code.items.item(i);
				var res = this.OpClassBodyItemMethodsList(t, item);
				t = Runtime.rtl.attr(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("];"));
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Vector")) + Runtime.rtl.toStr(".from(a);")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		/* Get method info by name */
		t = t.constructor.clearSaveOpCode(t);
		content += Runtime.rtl.toStr(t.s("getMethodInfoByName: function(field_name)"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		if (op_code.functions != null)
		{
			for (var i = 0; i < op_code.functions.count(); i++)
			{
				var f = op_code.functions.item(i);
				var res = this.OpFunctionAnnotations(t, f);
				t = Runtime.rtl.attr(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
		}
		if (op_code.items != null)
		{
			for (var i = 0; i < op_code.items.count(); i++)
			{
				var item = op_code.items.item(i);
				var res = this.OpClassBodyItemAnnotations(t, item);
				t = Runtime.rtl.attr(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
		}
		content += Runtime.rtl.toStr(t.s("return null;"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		/* Add implements */
		if (op_code.class_implements != null && op_code.class_implements.count() > 0)
		{
			content += Runtime.rtl.toStr(t.s("__implements__:"));
			content += Runtime.rtl.toStr(t.s("["));
			t = t.levelInc();
			for (var i = 0; i < op_code.class_implements.count(); i++)
			{
				var item = op_code.class_implements.item(i);
				var module_name = item.entity_name.names.first();
				var s = t.expression.constructor.useModuleName(t, module_name);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(t.s(s + Runtime.rtl.toStr(",")));
			}
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("],"));
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Class variables
	 */
	OpDeclareClassInitVariables: function(t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		var vars = op_code.vars.filter((variable) =>
		{
			return !variable.flags.isFlag("static");
		});
		if (t.current_class_full_name != "Runtime.BaseObject" && vars.count() > 0)
		{
			content += Runtime.rtl.toStr(t.s("_init: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			/* Clear save op codes */
			var save_op_codes = t.save_op_codes;
			var save_op_code_inc = t.save_op_code_inc;
			if (t.current_class_extends_name != "")
			{
				content += Runtime.rtl.toStr(t.s(t.expression.constructor.useModuleName(t, t.current_class_extends_name) + Runtime.rtl.toStr(".prototype._init.call(this);")));
			}
			var s1 = "";
			for (var i = 0; i < op_code.vars.count(); i++)
			{
				var variable = op_code.vars.item(i);
				var is_static = variable.flags.isFlag("static");
				if (is_static)
				{
					continue;
				}
				if (variable.kind != BayLang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				if (variable.condition && Runtime.rtl.attr(t.preprocessor_flags, variable.condition.value) != true)
				{
					continue;
				}
				var prefix = "";
				if (class_kind == BayLang.OpCodes.OpDeclareClass.KIND_STRUCT)
				{
					/* prefix = "__"; */
					prefix = "";
				}
				else if (class_kind == BayLang.OpCodes.OpDeclareClass.KIND_CLASS)
				{
					prefix = "";
				}
				for (var j = 0; j < variable.values.count(); j++)
				{
					var value = variable.values.item(j);
					var res = t.expression.constructor.Expression(t, value.expression);
					t = Runtime.rtl.attr(res, 0);
					var s = (value.expression != null) ? (Runtime.rtl.attr(res, 1)) : ("null");
					s1 += Runtime.rtl.toStr(t.s("this." + Runtime.rtl.toStr(prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";")));
				}
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			/* Restore save op codes */
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			/* Add content */
			content += Runtime.rtl.toStr(s1);
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Component props
	 */
	OpDeclareComponentProps: function(t, op_code)
	{
		var vars = op_code.vars.filter((variable) =>
		{
			return variable.flags.isFlag("props");
		});
		if (vars.count() == 0)
		{
			return Runtime.Vector.from([t,""]);
		}
		var content = "";
		content += Runtime.rtl.toStr(t.s("props: {"));
		t = t.levelInc();
		for (var i = 0; i < vars.count(); i++)
		{
			var variable = vars.item(i);
			if (variable.kind != BayLang.OpCodes.OpAssign.KIND_DECLARE)
			{
				continue;
			}
			if (variable.condition && Runtime.rtl.attr(t.preprocessor_flags, variable.condition.value) != true)
			{
				continue;
			}
			for (var j = 0; j < variable.values.count(); j++)
			{
				var value = variable.values.item(j);
				var res = t.expression.constructor.Expression(t, value.expression);
				t = Runtime.rtl.attr(res, 0);
				var s = (value.expression != null) ? (Runtime.rtl.attr(res, 1)) : ("null");
				content += Runtime.rtl.toStr(t.s(t.expression.constructor.toString(value.var_name) + Runtime.rtl.toStr(": {")));
				t = t.levelInc();
				content += Runtime.rtl.toStr(t.s("default: " + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(",")));
				t = t.levelDec();
				content += Runtime.rtl.toStr(t.s("},"));
			}
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Component variables
	 */
	OpDeclareComponentVariables: function(t, op_code)
	{
		var vars = op_code.vars.filter((variable) =>
		{
			return !variable.flags.isFlag("static") && !variable.flags.isFlag("props");
		});
		if (vars.count() == 0)
		{
			return Runtime.Vector.from([t,""]);
		}
		var content = "";
		content += Runtime.rtl.toStr(t.s("data: function ()"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("return {"));
		t = t.levelInc();
		for (var i = 0; i < vars.count(); i++)
		{
			var variable = vars.item(i);
			if (variable.kind != BayLang.OpCodes.OpAssign.KIND_DECLARE)
			{
				continue;
			}
			if (variable.condition && Runtime.rtl.attr(t.preprocessor_flags, variable.condition.value) != true)
			{
				continue;
			}
			for (var j = 0; j < variable.values.count(); j++)
			{
				var value = variable.values.item(j);
				var res = t.expression.constructor.Expression(t, value.expression);
				t = Runtime.rtl.attr(res, 0);
				var s = (value.expression != null) ? (Runtime.rtl.attr(res, 1)) : ("null");
				content += Runtime.rtl.toStr(t.s(value.var_name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(",")));
			}
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("};"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Declare component functions
	 */
	OpDeclareComponentFunctions: function(t, op_code)
	{
		var content = "";
		/* CSS */
		content += Runtime.rtl.toStr(t.s("css: function(vars)"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("var res = \"\";"));
		for (var i = 0; i < op_code.items.count(); i++)
		{
			var item = op_code.items.get(i);
			if (!(item instanceof BayLang.OpCodes.OpHtmlStyle))
			{
				continue;
			}
			var res = t.expression.constructor.Expression(t, item.value);
			t = Runtime.rtl.attr(res, 0);
			var s = Runtime.rtl.attr(res, 1);
			content += Runtime.rtl.toStr(t.s("res += Runtime.rtl.toStr(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(");")));
		}
		content += Runtime.rtl.toStr(t.s("return res;"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		/* Widget data */
		/*
		OpWidget op_code_widget = op_code.items.findItem(lib::isInstance(classof OpWidget));
		OpHtmlMeta op_code_meta = op_code.items.findItem(lib::isInstance(classof OpHtmlMeta));
		if (op_code_widget)
		{
			content ~= t.s("getWidgetData: function()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return {");
			t = t.levelInc();
			content ~= t.s("\"data\": null,");
			content ~= t.s("\"info\": null,");
			t = t.levelDec();
			content ~= t.s("};");
			t = t.levelDec();
			content ~= t.s("}");
		}
		*/
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Class functions
	 */
	OpDeclareClassFunctions: function(t, op_code)
	{
		var content = "";
		/* Functions */
		if (op_code.functions != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), false);
			for (var i = 0; i < op_code.functions.count(); i++)
			{
				var f = op_code.functions.item(i);
				if (f.flags.isFlag("declare"))
				{
					continue;
				}
				if (f.isStatic())
				{
					continue;
				}
				/* Set function name */
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), f);
				var is_async = "";
				if (f.isFlag("async") && t.isAsyncAwait())
				{
					is_async = "async ";
				}
				var s = "";
				var res = t.operator.constructor.OpDeclareFunctionArgs(t, f);
				var args = Runtime.rtl.attr(res, 1);
				s += Runtime.rtl.toStr(f.name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(is_async) + Runtime.rtl.toStr("function(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
				var res = t.operator.constructor.OpDeclareFunctionBody(t, f);
				s += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
				s += Runtime.rtl.toStr(",");
				/* Function comments */
				var res = t.operator.constructor.AddComments(t, f.comments, t.s(s));
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
		}
		/* Items */
		if (op_code.items != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), false);
			for (var i = 0; i < op_code.items.count(); i++)
			{
				var item = op_code.items.item(i);
				var res = this.OpDeclareClassBodyItem(t, item);
				t = Runtime.rtl.attr(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			}
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Class assignObject function
	 */
	OpDeclareClassAssignObject: function(t, op_code)
	{
		var content = "";
		var var_prefix = "";
		/* Assign Object */
		content += Runtime.rtl.toStr(t.s("assignObject: function(o)"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("if (o instanceof " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, t.current_class_full_name)) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		for (var i = 0; i < op_code.vars.count(); i++)
		{
			var variable = op_code.vars.item(i);
			if (variable.kind != BayLang.OpCodes.OpAssign.KIND_DECLARE)
			{
				continue;
			}
			if (variable.condition && Runtime.rtl.attr(t.preprocessor_flags, variable.condition.value) != true)
			{
				continue;
			}
			var is_const = variable.flags.isFlag("const");
			var is_static = variable.flags.isFlag("static");
			var is_protected = variable.flags.isFlag("protected");
			var is_private = variable.flags.isFlag("private");
			if (is_const || is_static)
			{
				continue;
			}
			if (is_protected || is_private)
			{
				continue;
			}
			for (var j = 0; j < variable.values.count(); j++)
			{
				var value = variable.values.item(j);
				content += Runtime.rtl.toStr(t.s("this." + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = o.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
			}
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		if (t.current_class_extends_name != "")
		{
			content += Runtime.rtl.toStr(t.s(t.expression.constructor.useModuleName(t, t.current_class_extends_name) + Runtime.rtl.toStr(".prototype.assignObject.call(this,o);")));
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Class assignValue function
	 */
	OpDeclareClassAssignValue: function(t, op_code)
	{
		var content = "";
		var var_prefix = "";
		/* Assign Value */
		content += Runtime.rtl.toStr(t.s("assignValue: function(k,v)"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var flag = false;
		for (var i = 0; i < op_code.vars.count(); i++)
		{
			var variable = op_code.vars.item(i);
			if (variable.kind != BayLang.OpCodes.OpAssign.KIND_DECLARE)
			{
				continue;
			}
			if (variable.condition && Runtime.rtl.attr(t.preprocessor_flags, variable.condition.value) != true)
			{
				continue;
			}
			var is_const = variable.flags.isFlag("const");
			var is_static = variable.flags.isFlag("static");
			var is_protected = variable.flags.isFlag("protected");
			var is_private = variable.flags.isFlag("private");
			if (is_const || is_static)
			{
				continue;
			}
			if (is_protected || is_private)
			{
				continue;
			}
			for (var j = 0; j < variable.values.count(); j++)
			{
				var value = variable.values.item(j);
				if (t.flag_struct_check_types)
				{
					content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("if (k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("this.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = Runtime.rtl.to(v, null, ") + Runtime.rtl.toStr(this.toPattern(t, variable.pattern)) + Runtime.rtl.toStr(");")));
				}
				else
				{
					content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("if (k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("this.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = v;")));
				}
				flag = true;
			}
		}
		if (t.current_class_extends_name != "")
		{
			content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + Runtime.rtl.toStr(".prototype.assignValue.call(this,k,v);")));
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Class takeValue function
	 */
	OpDeclareClassTakeValue: function(t, op_code)
	{
		var content = "";
		var var_prefix = "";
		/* Take Value */
		content += Runtime.rtl.toStr(t.s("takeValue: function(k,d)"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("if (d == undefined) d = null;"));
		var flag = false;
		for (var i = 0; i < op_code.vars.count(); i++)
		{
			var variable = op_code.vars.item(i);
			if (variable.kind != BayLang.OpCodes.OpAssign.KIND_DECLARE)
			{
				continue;
			}
			if (variable.condition && Runtime.rtl.attr(t.preprocessor_flags, variable.condition.value) != true)
			{
				continue;
			}
			var is_const = variable.flags.isFlag("const");
			var is_static = variable.flags.isFlag("static");
			var is_protected = variable.flags.isFlag("protected");
			var is_private = variable.flags.isFlag("private");
			if (is_const || is_static)
			{
				continue;
			}
			if (is_protected || is_private)
			{
				continue;
			}
			for (var j = 0; j < variable.values.count(); j++)
			{
				var value = variable.values.item(j);
				content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("if (k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(")return this.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
				flag = true;
			}
		}
		if (t.current_class_extends_name != "")
		{
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + Runtime.rtl.toStr(".prototype.takeValue.call(this,k,d);")));
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBody: function(t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		content += Runtime.rtl.toStr(t.s("Object.assign(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".prototype,")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* Functions */
		var res = this.OpDeclareClassFunctions(t, op_code);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		/* Init variables */
		if (class_kind != BayLang.OpCodes.OpDeclareClass.KIND_INTERFACE && op_code.vars != null)
		{
			var res = this.OpDeclareClassInitVariables(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		/* Init struct */
		if (class_kind == BayLang.OpCodes.OpDeclareClass.KIND_STRUCT && op_code.vars != null)
		{
			/* Assign object */
			/*
			list res = static::OpDeclareClassAssignObject(t, op_code);
			t = res[0];
			content ~= res[1];
			*/
			/* Assign value */
			/*
			list res = static::OpDeclareClassAssignValue(t, op_code);
			t = res[0];
			content ~= res[1];
			*/
			/* Take Value */
			var res = this.OpDeclareClassTakeValue(t, op_code);
			t = Runtime.rtl.attr(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("});"));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(t, op_code)
	{
		var content = "";
		var rtl_module_name = t.expression.constructor.useModuleName(t, "Runtime.rtl");
		if (!t.use_module_name)
		{
			content += Runtime.rtl.toStr(t.s(rtl_module_name + Runtime.rtl.toStr(".defClass(") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(");")));
			content += Runtime.rtl.toStr(t.s("window[\"" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr("\"] = ") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(";")));
		}
		content += Runtime.rtl.toStr(t.s("if (typeof module != \"undefined\" && typeof module.exports != \"undefined\") " + Runtime.rtl.toStr("module.exports = ") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(";")));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareComponent
	 */
	OpDeclareComponent: function(t, op_code)
	{
		var content = "";
		content += Runtime.rtl.toStr(t.s(t.current_class_full_name + Runtime.rtl.toStr(" = {")));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("name: " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_class_full_name)) + Runtime.rtl.toStr(",")));
		if (t.current_class_extends_name && t.current_class_extends_name != "Runtime.BaseObject")
		{
			content += Runtime.rtl.toStr(t.s("extends: " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + Runtime.rtl.toStr(",")));
		}
		/* Props */
		var res = this.OpDeclareComponentProps(t, op_code);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		/* Variables */
		var res = this.OpDeclareComponentVariables(t, op_code);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		/* Methods */
		content += Runtime.rtl.toStr(t.s("methods:"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.OpDeclareClassFunctions(t, op_code);
		t = Runtime.rtl.attr(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("},"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("};"));
		/* Class static functions */
		var res = this.OpDeclareClassBodyStatic(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		/* Class footer */
		var res = this.OpDeclareClassFooter(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClass: function(t, op_code)
	{
		if (op_code.is_abstract)
		{
			return Runtime.Vector.from([t,""]);
		}
		if (op_code.is_declare)
		{
			throw new BayLang.Exceptions.DeclaredClass()
			return Runtime.Vector.from([t,""]);
		}
		var content = "";
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class"]), op_code);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_name"]), op_code.name);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_full_name"]), t.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(t.current_class_name));
		if (op_code.class_extends != null)
		{
			var extends_name = Runtime.rs.join(".", op_code.class_extends.entity_name.names);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_extends_name"]), extends_name);
		}
		else if (op_code.kind == BayLang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_extends_name"]), "Runtime.BaseStruct");
		}
		if (op_code.is_component)
		{
			return this.OpDeclareComponent(t, op_code);
		}
		/* Constructor */
		var res = this.OpDeclareClassConstructor(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		/* Extends */
		if (op_code.class_extends != null)
		{
			content += Runtime.rtl.toStr(t.s(t.current_class_full_name + Runtime.rtl.toStr(".prototype = Object.create(") + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + Runtime.rtl.toStr(".prototype);")));
			content += Runtime.rtl.toStr(t.s(t.current_class_full_name + Runtime.rtl.toStr(".prototype.constructor = ") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(";")));
		}
		/* Class body */
		var res = this.OpDeclareClassBody(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		/* Class static functions */
		var res = this.OpDeclareClassBodyStatic(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		/* Class comments */
		var res = t.operator.constructor.AddComments(t, op_code.comments, content);
		content = Runtime.rtl.attr(res, 1);
		/* Class footer */
		var res = this.OpDeclareClassFooter(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Translate item
	 */
	translateItem: function(t, op_code)
	{
		if (op_code instanceof BayLang.OpCodes.OpNamespace)
		{
			return this.OpNamespace(t, op_code);
		}
		else if (op_code instanceof BayLang.OpCodes.OpDeclareClass)
		{
			return this.OpDeclareClass(t, op_code);
		}
		else if (op_code instanceof BayLang.OpCodes.OpComment)
		{
			return t.operator.constructor.OpComment(t, op_code);
		}
		else if (op_code instanceof BayLang.OpCodes.OpPreprocessorIfCode)
		{
			return t.operator.constructor.OpPreprocessorIfCode(t, op_code);
		}
		else if (op_code instanceof BayLang.OpCodes.OpPreprocessorSwitch)
		{
			var content = "";
			for (var i = 0; i < op_code.items.count(); i++)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(t, op_code.items.item(i));
				var s = Runtime.rtl.attr(res, 1);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
			return Runtime.Vector.from([t,content]);
		}
		return Runtime.Vector.from([t,""]);
	},
	/**
	 * Translate program
	 */
	translateProgramHeader: function(t, op_code)
	{
		var content = "";
		if (t.use_strict)
		{
			content = t.s("\"use strict;\"");
		}
		return Runtime.Vector.from([t,content]);
	},
	/**
	 * Remove ctx
	 */
	removeContext: function(content)
	{
		content = Runtime.rs.replace("(" + Runtime.rtl.toStr("ctx)"), "()", content);
		content = Runtime.rs.replace("(" + Runtime.rtl.toStr("ctx, "), "(", content);
		content = Runtime.rs.replace("(" + Runtime.rtl.toStr("ctx,"), "(", content);
		content = Runtime.rs.replace("," + Runtime.rtl.toStr("ctx,"), ",", content);
		content = Runtime.rs.replace("this," + Runtime.rtl.toStr("ctx"), "this", content);
		content = Runtime.rs.replace("this," + Runtime.rtl.toStr(" ctx"), "this", content);
		return content;
	},
	/**
	 * Translate program
	 */
	translateProgram: function(t, op_code)
	{
		var content = "";
		if (op_code == null)
		{
			return Runtime.Vector.from([t,content]);
		}
		if (op_code.uses != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["modules"]), op_code.uses);
		}
		if (op_code.items != null)
		{
			var res = this.translateProgramHeader(t, op_code);
			content += Runtime.rtl.toStr(Runtime.rtl.attr(res, 1));
			for (var i = 0; i < op_code.items.count(); i++)
			{
				var item = op_code.items.item(i);
				var res = this.translateItem(t, item);
				t = Runtime.rtl.attr(res, 0);
				var s = Runtime.rtl.attr(res, 1);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
		}
		content = Runtime.rs.trim(content);
		/* Disable context */
		if (t.enable_context == false)
		{
			content = this.removeContext(content);
		}
		return Runtime.Vector.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangES6";
	},
	getClassName: function()
	{
		return "BayLang.LangES6.TranslatorES6Program";
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
Runtime.rtl.defClass(BayLang.LangES6.TranslatorES6Program);
window["BayLang.LangES6.TranslatorES6Program"] = BayLang.LangES6.TranslatorES6Program;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangES6.TranslatorES6Program;