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
BayLang.LangBay.TranslatorBayProgram = function(translator)
{
	Runtime.BaseObject.call(this);
	this.translator = translator;
};
BayLang.LangBay.TranslatorBayProgram.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.LangBay.TranslatorBayProgram.prototype.constructor = BayLang.LangBay.TranslatorBayProgram;
Object.assign(BayLang.LangBay.TranslatorBayProgram.prototype,
{
	/**
	 * OpNamespace
	 */
	OpNamespace: function(op_code, result)
	{
		result.push("namespace ");
		result.push(op_code.name);
		result.push(";");
		result.push(this.translator.newLine());
	},
	/**
	 * OpUse
	 */
	OpUse: function(op_code, result)
	{
		var items = Runtime.rs.split(".", op_code.name);
		var last_name = items.last();
		result.push("use ");
		result.push(op_code.name);
		if (op_code.alias != "" && op_code.alias != last_name)
		{
			result.push(" as ");
			result.push(op_code.alias);
		}
		result.push(";");
	},
	/**
	 * OpAnnotation
	 */
	OpAnnotation: function(op_code, result)
	{
		result.push("@");
		this.translator.expression.OpTypeIdentifier(op_code.name, result);
		this.translator.expression.OpDict(op_code.params, result);
	},
	/**
	 * OpAssign
	 */
	OpAssign: function(op_code, result)
	{
		this.translator.operator.OpAssign(op_code, result);
		result.push(";");
	},
	/**
	 * OpDeclareFunctionArg
	 */
	OpDeclareFunctionArg: function(op_code, result)
	{
		this.translator.expression.OpTypeIdentifier(op_code.pattern, result);
		result.push(" ");
		result.push(op_code.name);
		if (op_code.expression)
		{
			result.push(" = ");
			this.translator.expression.translate(op_code.expression, result);
		}
	},
	/**
	 * OpDeclareFunctionArgs
	 */
	OpDeclareFunctionArgs: function(op_code, result)
	{
		if (op_code.args && op_code.args.count() > 0)
		{
			var args_count = op_code.args.count();
			for (var i = 0; i < args_count; i++)
			{
				var op_code_item = op_code.args.get(i);
				this.OpDeclareFunctionArg(op_code_item, result);
				if (i < args_count - 1)
				{
					result.push(", ");
				}
			}
		}
	},
	/**
	 * OpDeclareFunction
	 */
	OpDeclareFunction: function(op_code, result)
	{
		if (!(op_code.result_type instanceof BayLang.OpCodes.OpTypeIdentifier))
		{
			return ;
		}
		/* Function flags */
		var flags = Runtime.Vector.from(["async","static","pure"]);
		flags = flags.filter((flag_name) =>
		{
			return op_code.flags.isFlag(flag_name);
		});
		result.push(Runtime.rs.join(" ", flags));
		if (flags.count() > 0)
		{
			result.push(" ");
		}
		/* Function result type */
		this.translator.expression.OpTypeIdentifier(op_code.result_type, result);
		/* Function name */
		result.push(" ");
		result.push(op_code.name);
		/* Arguments */
		result.push("(");
		this.OpDeclareFunctionArgs(op_code, result);
		result.push(")");
		/* Expression */
		if (op_code.expression)
		{
			var is_multiline = op_code.expression.isMultiLine();
			if (is_multiline)
			{
				result.push(" =>");
				result.push(this.translator.newLine());
			}
			else
			{
				result.push(" => ");
			}
			this.translator.expression.translate(op_code.expression, result);
			result.push(";");
		}
		else if (op_code.items)
		{
			if (op_code.items.items.count() > 0)
			{
				result.push(this.translator.newLine());
			}
			this.translator.operator.translateItems(op_code.items, result);
		}
	},
	/**
	 * Translate class item
	 */
	translateClassItem: function(op_code, result)
	{
		if (op_code instanceof BayLang.OpCodes.OpAnnotation)
		{
			this.OpAnnotation(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpAssign)
		{
			this.OpAssign(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpDeclareFunction)
		{
			this.OpDeclareFunction(op_code, result);
		}
		else
		{
			return false;
		}
		return true;
	},
	/**
	 * Translate class body
	 */
	translateClassBody: function(op_code, result)
	{
		/* Begin bracket */
		result.push("{");
		this.translator.levelInc();
		/* Class body items */
		var next_new_line = true;
		for (var i = 0; i < op_code.items.count(); i++)
		{
			if (next_new_line)
			{
				result.push(this.translator.newLine());
			}
			var op_code_item = op_code.items.get(i);
			next_new_line = this.translateClassItem(op_code_item, result);
		}
		/* End bracket */
		this.translator.levelDec();
		result.push(this.translator.newLine());
		result.push("}");
	},
	/**
	 * Translate class
	 */
	translateClass: function(op_code, result)
	{
		if (op_code.kind == BayLang.OpCodes.OpDeclareClass.KIND_CLASS)
		{
			result.push("class ");
		}
		else if (op_code.kind == BayLang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			result.push("interface ");
		}
		else if (op_code.kind == BayLang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			result.push("struct ");
		}
		/* Class name */
		result.push(op_code.name);
		/* Template */
		if (op_code.template)
		{
			this.translator.expression.OpTypeTemplate(op_code.template, result);
		}
		/* Extends */
		if (op_code.class_extends)
		{
			result.push(" extends ");
			this.translator.expression.OpTypeIdentifier(op_code.class_extends, result);
		}
		/* Implements */
		if (op_code.class_implements)
		{
			result.push(" implements ");
			var items_count = op_code.class_implements.count();
			for (var i = 0; i < items_count; i++)
			{
				var op_code_item = op_code.class_implements.get(i);
				this.translator.expression.OpTypeIdentifier(op_code_item, result);
				if (i < items_count - 1)
				{
					result.push(", ");
				}
			}
		}
		result.push(this.translator.newLine());
		this.translateClassBody(op_code, result);
	},
	/**
	 * Translate item
	 */
	translateItem: function(op_code, result)
	{
		if (op_code instanceof BayLang.OpCodes.OpDeclareClass)
		{
			this.translateClass(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpNamespace)
		{
			this.OpNamespace(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpUse)
		{
			this.OpUse(op_code, result);
		}
	},
	/**
	 * Translate items
	 */
	translateItems: function(items, result)
	{
		var op_code_use_count = 0;
		var prev_op_code_use = false;
		for (var i = 0; i < items.count(); i++)
		{
			var op_code_item = items.get(i);
			if (i > 0)
			{
				result.push(this.translator.newLine());
			}
			if (op_code_item instanceof BayLang.OpCodes.OpDeclareClass && op_code_use_count > 0)
			{
				result.push(this.translator.newLine());
				if (op_code_use_count > 1)
				{
					result.push(this.translator.newLine());
				}
			}
			if (op_code_item instanceof BayLang.OpCodes.OpUse)
			{
				op_code_use_count++;
			}
			else
			{
				op_code_use_count = 0;
			}
			this.translateItem(items.get(i), result);
		}
	},
	/**
	 * Translate
	 */
	translate: function(op_code, result)
	{
		this.translateItems(op_code.items, result);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.translator = null;
	},
});
Object.assign(BayLang.LangBay.TranslatorBayProgram, Runtime.BaseObject);
Object.assign(BayLang.LangBay.TranslatorBayProgram,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.TranslatorBayProgram";
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
Runtime.rtl.defClass(BayLang.LangBay.TranslatorBayProgram);
window["BayLang.LangBay.TranslatorBayProgram"] = BayLang.LangBay.TranslatorBayProgram;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.TranslatorBayProgram;