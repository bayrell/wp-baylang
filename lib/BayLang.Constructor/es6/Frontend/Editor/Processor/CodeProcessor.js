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
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Editor == 'undefined') BayLang.Constructor.Frontend.Editor = {};
if (typeof BayLang.Constructor.Frontend.Editor.Processor == 'undefined') BayLang.Constructor.Frontend.Editor.Processor = {};
BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor = function(page_model)
{
	Runtime.BaseObject.call(this);
	this.page_model = page_model;
};
BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.prototype.constructor = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor;
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.prototype,
{
	/**
	 * Setup op code
	 */
	setupOpCode: function(code)
	{
		this.code = code;
		this.class_name = "";
		this.class_namespace = "";
		if (!this.code)
		{
			return ;
		}
		/* Setup component class name */
		for (var i = 0; i < this.code.items.count(); i++)
		{
			var item = this.code.items.get(i);
			if (item instanceof BayLang.OpCodes.OpNamespace)
			{
				this.class_namespace = item.name;
			}
			if (item instanceof BayLang.OpCodes.OpDeclareClass)
			{
				this.class_name = item.name;
			}
		}
	},
	/**
	 * Returns full class name
	 */
	getComponentFullClassName: function()
	{
		return (this.class_namespace != "") ? (this.class_namespace + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(this.class_name)) : (this.class_name);
	},
	/**
	 * Returns module class name
	 */
	getModuleClassName: function(widget_name)
	{
		if (!this.constructor.isComponent(widget_name))
		{
			return null;
		}
		if (!this.code)
		{
			return null;
		}
		if (!this.code.uses.has(widget_name))
		{
			return widget_name;
		}
		return this.code.uses.get(widget_name);
	},
	/**
	 * Returns components
	 */
	getComponents: function()
	{
		return this.code.uses.values();
	},
	/**
	 * Add module
	 */
	addModule: function(widget_name, alias_name, is_component)
	{
		if (alias_name == undefined) alias_name = "";
		if (is_component == undefined) is_component = false;
		if (alias_name == "")
		{
			var widget_name_arr = Runtime.rs.split(".", widget_name);
			alias_name = widget_name_arr.last();
		}
		if (!this.code.hasModule(alias_name) || alias_name == "")
		{
			this.code.addModule(widget_name, alias_name, is_component);
		}
		return alias_name;
	},
	/**
	 * Returns function
	 */
	findFunction: function(function_name)
	{
		if (!this.code)
		{
			return null;
		}
		var op_code_class = this.code.findClass();
		if (!op_code_class)
		{
			return null;
		}
		var op_code = op_code_class.findFunction(function_name);
		return op_code;
	},
	/**
	 * Create parser
	 */
	createParser: function()
	{
		/* Setup parser params */
		var params = Runtime.Map.from({"current_namespace_name":this.class_namespace,"current_class_name":this.class_name,"uses":this.code.uses});
		/* Create new instance */
		var parser = new BayLang.LangBay.ParserBay();
		parser = parser.constructor.reset(parser);
		if (params.has("current_namespace_name"))
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_namespace_name"]), params.get("current_namespace_name"));
		}
		if (params.has("current_class_name"))
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_name"]), params.get("current_class_name"));
		}
		if (params.has("uses"))
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), params.get("uses"));
		}
		return parser;
	},
	/**
	 * Create translator
	 */
	createTranslator: function()
	{
		/* New instance */
		var t = new BayLang.LangES6.TranslatorES6();
		/* Reset translator */
		var t = BayLang.LangES6.TranslatorES6.reset(t);
		if (this.code.uses != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["modules"]), this.code.uses);
		}
		/* Enable debug */
		t = t.setFlag("DEBUG_COMPONENT", true);
		/* Return */
		return t;
	},
	/**
	 * Build code
	 */
	buildContent: function()
	{
		var t = new BayLang.LangBay.TranslatorBay();
		var res = t.constructor.translate(t, this.code, false);
		return res.get(1);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.page_model = null;
		this.code = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor, Runtime.BaseObject);
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor,
{
	/**
	 * Is component
	 */
	isComponent: function(tag_name)
	{
		var ch1 = Runtime.rs.substr(tag_name, 0, 1);
		var ch2 = Runtime.rs.upper(ch1);
		return ch1 == ch2;
	},
	/**
	 * Returns op code value
	 */
	getOpCodeByValue: function(value)
	{
		if (Runtime.rtl.isString(value))
		{
			return new BayLang.OpCodes.OpString(Runtime.Map.from({"value":value}));
		}
		else if (value instanceof Runtime.Dict)
		{
			var values = Runtime.Vector.from([]);
			var keys = value.keys();
			for (var i = 0; i < keys.count(); i++)
			{
				var key = keys.get(i);
				values.push(new BayLang.OpCodes.OpDictPair(Runtime.Map.from({"key":key,"value":this.getOpCodeByValue(value.get(key))})));
			}
			return new BayLang.OpCodes.OpDict(Runtime.Map.from({"values":values}));
		}
		else if (Runtime.rtl.is_instanceof(value, "Runtime.Collection"))
		{
			return new BayLang.OpCodes.OpCollection(Runtime.Map.from({"values":value.map((value) =>
			{
				return this.getOpCodeByValue(value);
			})}));
		}
		return null;
	},
	/**
	 * Returns op code value
	 */
	getValueFromOpCode: function(op_attr)
	{
		if (op_attr instanceof BayLang.OpCodes.OpString)
		{
			return op_attr.value;
		}
		else if (op_attr instanceof BayLang.OpCodes.OpDict)
		{
			var result = Runtime.Map.from({});
			for (var i = 0; i < op_attr.values.count(); i++)
			{
				var op_dict_item = op_attr.values.get(i);
				var key = op_dict_item.key;
				var item = op_dict_item.value;
				result.set(key, this.getValueFromOpCode(item));
			}
			return result;
		}
		else if (op_attr instanceof BayLang.OpCodes.OpCollection)
		{
			return op_attr.values.map((value) =>
			{
				return this.getValueFromOpCode(value);
			});
		}
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor);
window["BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor"] = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor;