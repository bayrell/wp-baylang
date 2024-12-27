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
BayLang.LangBay.TranslatorBayHtml = function(translator)
{
	Runtime.BaseObject.call(this);
	this.translator = translator;
};
BayLang.LangBay.TranslatorBayHtml.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.LangBay.TranslatorBayHtml.prototype.constructor = BayLang.LangBay.TranslatorBayHtml;
Object.assign(BayLang.LangBay.TranslatorBayHtml.prototype,
{
	/**
	 * OpAssign
	 */
	OpAssign: function(op_code, result)
	{
		result.push("%set ");
		this.translator.operator.OpAssign(op_code, result);
		result.push(";");
	},
	/**
	 * OpUse
	 */
	OpUse: function(op_code, result)
	{
		var items = Runtime.rs.split(".", op_code.name);
		var last_name = items.last();
		/* Get attrs */
		var attrs = Runtime.Vector.from(["name=\"" + Runtime.rtl.toStr(op_code.name) + Runtime.rtl.toStr("\"")]);
		/* Add alias name */
		if (op_code.alias != "" && op_code.alias != last_name)
		{
			attrs.push("as=\"" + Runtime.rtl.toStr(op_code.alias) + Runtime.rtl.toStr("\""));
		}
		/* Add component */
		if (op_code.is_component)
		{
			attrs.push("component=\"true\"");
		}
		/* Add result */
		result.push("<use " + Runtime.rtl.toStr(Runtime.rs.join(" ", attrs)) + Runtime.rtl.toStr(" />"));
	},
	/**
	 * Translate html content
	 */
	OpHtmlContent: function(op_code, result)
	{
		result.push(op_code.value);
	},
	/**
	 * Translate attrs
	 */
	OpHtmlAttrs: function(op_code_attrs, result)
	{
		/* Filter attrs */
		op_code_attrs = op_code_attrs.filter((op_code_attr) =>
		{
			/* Skip @key_debug attr */
			if (!this.translator.preprocessor_flags.get("DEBUG_COMPONENT") && op_code_attr.key == "@key_debug")
			{
				return false;
			}
			return true;
		});
		var attrs_count = op_code_attrs.count();
		for (var i = 0; i < attrs_count; i++)
		{
			var op_code_attr = op_code_attrs.get(i);
			result.push(op_code_attr.key);
			result.push("=");
			/* Value */
			if (op_code_attr.value instanceof BayLang.OpCodes.OpString)
			{
				this.translator.expression.translate(op_code_attr.value, result);
			}
			else
			{
				result.push("{{ ");
				this.translator.expression.translate(op_code_attr.value, result);
				result.push(" }}");
			}
			if (i < attrs_count - 1)
			{
				result.push(" ");
			}
		}
	},
	/**
	 * Translate html tag
	 */
	OpHtmlTag: function(op_code, result)
	{
		var is_multiline = op_code.isMultiLine();
		/* Component attrs */
		var args_content = Runtime.Vector.from([]);
		this.OpHtmlAttrs(op_code.attrs, args_content);
		var args = Runtime.rs.join("", args_content);
		if (args != "")
		{
			args = " " + Runtime.rtl.toStr(args);
		}
		if (op_code.items == null)
		{
			result.push("<" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(" />"));
		}
		else
		{
			/* Begin tag */
			result.push("<" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(">"));
			if (is_multiline)
			{
				this.translator.levelInc();
			}
			/* Items */
			this.OpHtmlItems(op_code.items, result, is_multiline);
			/* End tag */
			if (is_multiline)
			{
				this.translator.levelDec();
				result.push(this.translator.newLine());
			}
			result.push("</" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(">"));
		}
	},
	/**
	 * OpHtmlSlot
	 */
	OpHtmlSlot: function(op_code, result)
	{
		/* Slot attrs */
		var args_content = Runtime.Vector.from([]);
		this.OpHtmlAttrs(op_code.attrs, args_content);
		/* Add slot args */
		if (op_code.args)
		{
			var args = op_code.args.map((item) =>
			{
				var res = new Runtime.Vector();
				this.translator.expression.OpTypeIdentifier(item.pattern, res);
				res.push(" ");
				res.push(item.name);
				return Runtime.rs.join("", res);
			});
			if (args_content.count() > 0)
			{
				args_content.push(" ");
			}
			args_content.push("args=\"" + Runtime.rtl.toStr(Runtime.rs.join(",", args)) + Runtime.rtl.toStr("\""));
		}
		/* Add slot vars */
		if (op_code.vars)
		{
			var vars = op_code.vars.map((item) =>
			{
				return item.value;
			});
			if (args_content.count() > 0)
			{
				args_content.push(" ");
			}
			args_content.push("use=\"" + Runtime.rtl.toStr(Runtime.rs.join(",", vars)) + Runtime.rtl.toStr("\""));
		}
		/* Slot args */
		var args = Runtime.rs.join("", args_content);
		if (args != "")
		{
			args = " " + Runtime.rtl.toStr(args);
		}
		/* Begin slot */
		result.push("<slot name=\"" + Runtime.rtl.toStr(op_code.name) + Runtime.rtl.toStr("\"") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(">"));
		/* Items */
		this.translator.levelInc();
		this.OpHtmlItems(op_code.items, result);
		this.translator.levelDec();
		/* End slot */
		result.push(this.translator.newLine());
		result.push("</slot>");
	},
	/**
	 * Translate html item
	 */
	OpHtmlItem: function(op_code, result)
	{
		if (op_code instanceof BayLang.OpCodes.OpAssign)
		{
			this.OpAssign(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpHtmlTag)
		{
			this.OpHtmlTag(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpHtmlContent)
		{
			this.OpHtmlContent(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpHtmlSlot)
		{
			this.OpHtmlSlot(op_code, result);
		}
		else if (op_code instanceof BayLang.OpCodes.OpCall && op_code.is_html)
		{
			result.push("%render ");
			this.translator.expression.translate(op_code, result);
			result.push(";");
		}
		else if (op_code instanceof BayLang.OpCodes.OpHtmlValue)
		{
			if (op_code.kind == "raw")
			{
				result.push("@raw{{ ");
				this.translator.expression.translate(op_code.value, result);
				result.push(" }}");
			}
			else
			{
				result.push("{{ ");
				this.translator.expression.translate(op_code.value, result);
				result.push(" }}");
			}
		}
		else
		{
			result.push("{{ ");
			this.translator.expression.translate(op_code, result);
			result.push(" }}");
		}
	},
	/**
	 * Translate html items
	 */
	OpHtmlItems: function(op_code, result, is_multiline)
	{
		if (is_multiline == undefined) is_multiline = true;
		var items_count = op_code.items.count();
		for (var i = 0; i < items_count; i++)
		{
			if (is_multiline)
			{
				result.push(this.translator.newLine());
			}
			this.OpHtmlItem(op_code.items.get(i), result);
		}
	},
	/**
	 * Translate template
	 */
	translateTemplate: function(op_code, result)
	{
		if (!op_code.is_html)
		{
			return ;
		}
		/* Begin template */
		if (op_code.name == "render")
		{
			result.push("<template>");
		}
		else
		{
			var args_content = Runtime.Vector.from([]);
			if (op_code.args && op_code.args.count() > 0)
			{
				this.translator.program.OpDeclareFunctionArgs(op_code, args_content);
			}
			var args = Runtime.rs.join("", args_content);
			if (args != "")
			{
				args = " args=\"" + Runtime.rtl.toStr(args) + Runtime.rtl.toStr("\"");
			}
			result.push("<template name=\"" + Runtime.rtl.toStr(op_code.name) + Runtime.rtl.toStr("\"") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(">"));
		}
		/* Items */
		this.translator.levelInc();
		this.OpHtmlItems(op_code.expression, result);
		this.translator.levelDec();
		/* End template */
		result.push(this.translator.newLine());
		result.push("</template>");
		result.push(this.translator.newLine());
	},
	/**
	 * Translate class item
	 */
	translateClassItem: function(op_code, result)
	{
		if (op_code instanceof BayLang.OpCodes.OpDeclareFunction)
		{
			this.translateTemplate(op_code, result);
		}
	},
	/**
	 * Translate style
	 */
	translateStyle: function(op_code, result)
	{
		if (op_code.is_global)
		{
			result.push("<style global=\"true\">");
		}
		else
		{
			result.push("<style>");
		}
		result.push(this.translator.newLine());
		if (op_code.content)
		{
			result.push(op_code.content);
			result.push(this.translator.newLine());
		}
		result.push("</style>");
		result.push(this.translator.newLine());
	},
	/**
	 * Translate class
	 */
	translateClassBody: function(op_code, result)
	{
		if (op_code.items.count() == 0)
		{
			return ;
		}
		/* Get styles */
		var styles = op_code.items.filter((op_code) =>
		{
			return op_code instanceof BayLang.OpCodes.OpHtmlStyle;
		});
		/* Translate styles */
		for (var i = 0; i < styles.count(); i++)
		{
			result.push(this.translator.newLine());
			var op_code_item = styles.get(i);
			this.translateStyle(op_code_item, result);
		}
		/* Get templates */
		var templates = op_code.items.filter((op_code) =>
		{
			return op_code instanceof BayLang.OpCodes.OpDeclareFunction && op_code.is_html;
		});
		/* Translate template */
		for (var i = 0; i < templates.count(); i++)
		{
			result.push(this.translator.newLine());
			var op_code_item = templates.get(i);
			this.translateClassItem(op_code_item, result);
		}
		/* Get scripts */
		var scripts = op_code.items.filter((op_code) =>
		{
			return op_code instanceof BayLang.OpCodes.OpAnnotation || op_code instanceof BayLang.OpCodes.OpAssign || op_code instanceof BayLang.OpCodes.OpDeclareFunction && !op_code.is_html && !(op_code.name == "components");
		});
		/* Translate scripts */
		if (scripts.count() > 0)
		{
			result.push(this.translator.newLine());
			result.push("<script>");
			result.push(this.translator.newLine());
			result.push(this.translator.newLine());
			for (var i = 0; i < scripts.count(); i++)
			{
				var op_code_item = scripts.get(i);
				this.translator.program.translateClassItem(op_code_item, result);
				result.push(this.translator.newLine());
			}
			result.push(this.translator.newLine());
			result.push("</script>");
			result.push(this.translator.newLine());
		}
	},
	/**
	 * Translate
	 */
	translate: function(op_code, result)
	{
		var space = op_code.items.findItem(Runtime.lib.isInstance("BayLang.OpCodes.OpNamespace"));
		var component = op_code.items.findItem(Runtime.lib.isInstance("BayLang.OpCodes.OpDeclareClass"));
		var uses = op_code.items.filter(Runtime.lib.isInstance("BayLang.OpCodes.OpUse"));
		if (!component)
		{
			return ;
		}
		/* Get component name */
		var component_names = Runtime.Vector.from([]);
		if (space)
		{
			component_names.push(space.name);
		}
		component_names.push(component.name);
		var component_name = Runtime.rs.join(".", component_names);
		result.push("<class name=\"" + Runtime.rtl.toStr(component_name) + Runtime.rtl.toStr("\">"));
		result.push(this.translator.newLine());
		/* Add uses */
		if (uses.count() > 0)
		{
			result.push(this.translator.newLine());
			for (var i = 0; i < uses.count(); i++)
			{
				var use_item = uses.get(i);
				this.OpUse(use_item, result);
				result.push(this.translator.newLine());
			}
		}
		/* Declare class */
		this.translateClassBody(component, result);
		if (component.items.count() > 0 || uses.count() > 0)
		{
			result.push(this.translator.newLine());
		}
		result.push("</class>");
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.translator = null;
	},
});
Object.assign(BayLang.LangBay.TranslatorBayHtml, Runtime.BaseObject);
Object.assign(BayLang.LangBay.TranslatorBayHtml,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.LangBay.TranslatorBayHtml";
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
Runtime.rtl.defClass(BayLang.LangBay.TranslatorBayHtml);
window["BayLang.LangBay.TranslatorBayHtml"] = BayLang.LangBay.TranslatorBayHtml;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.LangBay.TranslatorBayHtml;