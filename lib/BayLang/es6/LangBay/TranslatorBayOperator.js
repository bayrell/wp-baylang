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
BayLang.LangBay.TranslatorBayOperator = function(translator)
{
	Runtime.BaseObject.call(this);
	this.translator = translator;
};
BayLang.LangBay.TranslatorBayOperator.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.LangBay.TranslatorBayOperator.prototype.constructor = BayLang.LangBay.TranslatorBayOperator;
Object.assign(BayLang.LangBay.TranslatorBayOperator.prototype,
{
	/**
	 * OpAssign
	 */
	OpAssign: function(op_code, result)
	{
		if (op_code.pattern)
		{
			this.translator.expression.OpTypeIdentifier(op_code.pattern, result);
		}
		var values_count = op_code.values.count();
		for (var i = 0; i < values_count; i++)
		{
			var op_code_value = op_code.values.get(i);
			if (op_code.pattern || i > 0)
			{
				result.push(" ");
			}
			if (op_code_value.op_code)
			{
				this.translator.expression.translate(op_code_value.op_code, result);
			}
			else
			{
				result.push(op_code_value.var_name);
			}
			if (op_code_value.expression)
			{
				result.push(" = ");
				this.translator.expression.translate(op_code_value.expression, result);
			}
			if (i < values_count - 1)
			{
				result.push(",");
			}
		}
	},
	/**
	 * OpBreak
	 */
	OpBreak: function(op_code, result)
	{
		result.push("break");
	},
	/**
	 * OpContinue
	 */
	OpContinue: function(op_code, result)
	{
		result.push("continue");
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(op_code, result)
	{
		result.push("return");
		if (op_code.expression)
		{
			result.push(" ");
			this.translator.expression.translate(op_code.expression, result);
		}
	},
	/**
	 * OpInc
	 */
	OpInc: function(op_code, result)
	{
		if (op_code.kind == BayLang.OpCodes.OpInc.KIND_PRE_INC)
		{
			result.push("++");
			this.translator.expression.translate(op_code.value, result);
		}
		if (op_code.kind == BayLang.OpCodes.OpInc.KIND_PRE_DEC)
		{
			result.push("--");
			this.translator.expression.translate(op_code.value, result);
		}
		if (op_code.kind == BayLang.OpCodes.OpInc.KIND_POST_INC)
		{
			this.translator.expression.translate(op_code.value, result);
			result.push("++");
		}
		if (op_code.kind == BayLang.OpCodes.OpInc.KIND_POST_DEC)
		{
			this.translator.expression.translate(op_code.value, result);
			result.push("--");
		}
	},
	/**
	 * OpFor
	 */
	OpFor: function(op_code, result)
	{
		result.push("for (");
		this.translateItem(op_code.expr1, result);
		result.push("; ");
		this.translator.expression.translate(op_code.expr2, result);
		result.push("; ");
		this.translateItem(op_code.expr3, result);
		result.push(")");
		result.push(this.translator.newLine());
		this.translateItems(op_code.value, result);
	},
	/**
	 * OpIf
	 */
	OpIf: function(op_code, result)
	{
		result.push("if (");
		this.translator.expression.translate(op_code.condition, result);
		result.push(")");
		result.push(this.translator.newLine());
		this.translateItems(op_code.if_true, result);
		if (op_code.if_else && op_code.if_else.count() > 0)
		{
			for (var i = 0; i < op_code.if_else.count(); i++)
			{
				var op_code_item = op_code.if_else.get(i);
				result.push(this.translator.newLine());
				result.push("else if (");
				this.translator.expression.translate(op_code_item.condition, result);
				result.push(")");
				result.push(this.translator.newLine());
				this.translateItems(op_code_item.if_true, result);
			}
		}
		if (op_code.if_false)
		{
			result.push(this.translator.newLine());
			result.push("else");
			result.push(this.translator.newLine());
			this.translateItems(op_code.if_false, result);
		}
	},
	/**
	 * OpThrow
	 */
	OpThrow: function(op_code, result)
	{
		result.push("throw ");
		this.translator.expression.translate(op_code.expression, result);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(op_code, result)
	{
		result.push("try");
		result.push(this.translator.newLine());
		this.translateItems(op_code.op_try, result);
		if (op_code.items && op_code.items.count() > 0)
		{
			var items_count = op_code.items.count();
			for (var i = 0; i < items_count; i++)
			{
				var op_code_item = op_code.items.get(i);
				result.push(this.translator.newLine());
				result.push("catch (");
				this.translator.expression.OpTypeIdentifier(op_code_item.pattern, result);
				result.push(" ");
				result.push(op_code_item.name);
				result.push(")");
				result.push(this.translator.newLine());
				this.translateItems(op_code_item.value, result);
			}
		}
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(op_code, result)
	{
		result.push("while (");
		this.translator.expression.translate(op_code.condition, result);
		result.push(")");
		result.push(this.translator.newLine());
		this.translateItems(op_code.value, result);
	},
	/**
	 * OpComment
	 */
	OpComment: function(op_code, result)
	{
		result.push("/*");
		result.push(op_code.value);
		result.push("*/");
	},
	/**
	 * Translate item
	 */
	translateItem: function(op_code, result)
	{
		if (op_code instanceof BayLang.OpCodes.OpAssign)
		{
			this.OpAssign(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpBreak)
		{
			this.OpBreak(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpCall)
		{
			this.translator.expression.OpCall(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpContinue)
		{
			this.OpContinue(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpReturn)
		{
			this.OpReturn(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpInc)
		{
			this.OpInc(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpFor)
		{
			this.OpFor(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpIf)
		{
			this.OpIf(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpThrow)
		{
			this.OpThrow(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpTryCatch)
		{
			this.OpTryCatch(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpWhile)
		{
			this.OpWhile(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpComment)
		{
			this.OpComment(op_code, result);
		}
		else
		{
			return false;
		}
		return true;
	},
	/**
	 * Translate OpItems
	 */
	translateItems: function(op_code, result)
	{
		if (op_code.items.count() == 0)
		{
			result.push("{");
			result.push("}");
			return ;
		}
		/* Begin bracket */
		result.push("{");
		this.translator.levelInc();
		/* Items */
		var items_count = op_code.items.count();
		for (var i = 0; i < items_count; i++)
		{
			var op_code_item = op_code.items.get(i);
			var result_items = Runtime.Vector.from([]);
			var flag = this.translateItem(op_code_item, result_items);
			if (flag)
			{
				result.push(this.translator.newLine());
				result.appendItems(result_items);
				if (op_code_item instanceof BayLang.OpCodes.OpAssign || op_code_item instanceof BayLang.OpCodes.OpBreak || op_code_item instanceof BayLang.OpCodes.OpCall || op_code_item instanceof BayLang.OpCodes.OpContinue || op_code_item instanceof BayLang.OpCodes.OpInc || op_code_item instanceof BayLang.OpCodes.OpReturn || op_code_item instanceof BayLang.OpCodes.OpThrow)
				{
					result.push(";");
				}
			}
		}
		/* End bracket */
		this.translator.levelDec();
		result.push(this.translator.newLine());
		result.push("}");
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.translator = null;
	},
});
Object.assign(BayLang.LangBay.TranslatorBayOperator, Runtime.BaseObject);
Object.assign(BayLang.LangBay.TranslatorBayOperator,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.TranslatorBayOperator";
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
Runtime.rtl.defClass(BayLang.LangBay.TranslatorBayOperator);
window["BayLang.LangBay.TranslatorBayOperator"] = BayLang.LangBay.TranslatorBayOperator;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.TranslatorBayOperator;