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
BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor = function()
{
	BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.prototype);
BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor.prototype.constructor = BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor;
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor.prototype,
{
	/**
	 * Setup op code
	 */
	setupOpCode: function(code)
	{
		BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.prototype.setupOpCode.call(this, code);
	},
	/**
	 * Setup widget
	 */
	setupWidget: function(widget)
	{
		/* Setup settings */
		this.setupSettings(widget);
		/* Setup params */
		this.setupParams(widget);
		/* Setup model settings */
		if (widget.model_settings && Runtime.rtl.exists(widget.model_settings.setup))
		{
			widget.model_settings.setup(new Runtime.rtl(), widget);
		}
	},
	/**
	 * Setup settings
	 */
	setupSettings: function(widget)
	{
		widget.model_codes = Runtime.Vector.from([]);
		widget.model_class_name = null;
		widget.primary_model_code = null;
		widget.is_model = this.checkIsModel(widget);
		if (!widget.is_model)
		{
			return ;
		}
		/* Get model codes */
		this.setupModelCodes(widget);
		/* Get model settings */
		var editor = this.page_model.getFrameEditor();
		widget.model_settings = editor.getModelSettings(widget);
	},
	/**
	 * Check is model
	 */
	checkIsModel: function(widget)
	{
		var attrs = widget.code.attrs;
		if (attrs)
		{
			for (var i = 0; i < attrs.count(); i++)
			{
				var attr = attrs.get(i);
				if (attr.key == "@model")
				{
					return true;
				}
			}
		}
		return false;
	},
	/**
	 * Create init widget function
	 */
	createInitWidget: function()
	{
		var init_op_code = this.findFunction("initWidget");
		if (init_op_code)
		{
			return init_op_code;
		}
		var op_code_class = this.code.findClass();
		if (!op_code_class)
		{
			return null;
		}
		/* Create initWidget */
		var init_op_code = new BayLang.OpCodes.OpDeclareFunction(Runtime.Map.from({"name":"initWidget","args":Runtime.Vector.from([new BayLang.OpCodes.OpDeclareFunctionArg(Runtime.Map.from({"name":"params","pattern":new BayLang.OpCodes.OpTypeIdentifier(Runtime.Map.from({"entity_name":new BayLang.OpCodes.OpEntityName(Runtime.Map.from({"names":Runtime.Vector.from(["Dict"])}))}))}))]),"flags":new BayLang.OpCodes.OpFlags(),"result_type":new BayLang.OpCodes.OpTypeIdentifier(Runtime.Map.from({"entity_name":new BayLang.OpCodes.OpEntityName(Runtime.Map.from({"names":Runtime.Vector.from(["void"])}))})),"items":new BayLang.OpCodes.OpItems(Runtime.Map.from({"items":Runtime.Vector.from([new BayLang.OpCodes.OpCall(Runtime.Map.from({"args":Runtime.Vector.from([new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"kind":"var","value":"params"}))]),"obj":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"kind":"classref","value":"parent"}))}))])}))}));
		/* Add initWidget */
		op_code_class.functions.push(init_op_code);
		op_code_class.items.push(init_op_code);
		return init_op_code;
	},
	/**
	 * Setup to widget model codes
	 */
	setupModelCodes: function(widget)
	{
		var init_op_code = this.findFunction("initWidget");
		if (!init_op_code)
		{
			return Runtime.Vector.from([]);
		}
		/* Get widget name */
		var widget_name = widget.getName();
		for (var i = 0; i < init_op_code.items.items.count(); i++)
		{
			var op_code = init_op_code.items.items.get(i);
			/* Detect primary code */
			if (op_code instanceof BayLang.OpCodes.OpAssign)
			{
				var op_code_item = op_code.values.get(0);
				if (this.constructor.isPrimaryCode(op_code_item, widget_name))
				{
					widget.primary_model_code = op_code_item;
				}
			}
		}
		/* Set model class name */
		if (widget.primary_model_code)
		{
			var op_code_model_name = widget.primary_model_code.expression.args.get(0);
			if (op_code_model_name instanceof BayLang.OpCodes.OpClassOf)
			{
				widget.model_class_name = this.code.uses.get(op_code_model_name.entity_name.names.get(0));
			}
			else if (op_code_model_name instanceof BayLang.OpCodes.OpString)
			{
				widget.model_class_name = op_code_model_name.value;
			}
		}
	},
	/**
	 * Setup model params
	 */
	setupParams: function(widget)
	{
		if (!widget.model_class_name)
		{
			return ;
		}
		if (!widget.primary_model_code)
		{
			return ;
		}
		if (!widget.model_settings)
		{
			return ;
		}
		/* Add params */
		widget.params.appendItems(widget.model_settings.getParams().map((factory) =>
		{
			var param = factory.factory(new Runtime.rtl());
			param.widget = widget;
			return param;
		}));
		/* Get values */
		var op_dict = widget.primary_model_code.expression.args.get(1);
		if (!op_dict)
		{
			return ;
		}
		if (!(op_dict instanceof BayLang.OpCodes.OpDict))
		{
			return ;
		}
		/* Add params values */
		var values = op_dict.values;
		for (var i = 0; i < values.count(); i++)
		{
			var op_dict_pair = values.get(i);
			for (var j = 0; j < widget.params.count(); j++)
			{
				var param = widget.params.get(j);
				if (param instanceof BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel && param.isOpCode(op_dict_pair))
				{
					param.setOpCode(op_dict_pair);
				}
			}
		}
	},
	/**
	 * Set widget name
	 */
	setWidgetName: function(widget, new_widget_name)
	{
		if (!widget.primary_model_code)
		{
			return ;
		}
		/* Set name */
		var old_widget_name = widget.primary_model_code.op_code.value.value;
		widget.primary_model_code.op_code.value.value = new_widget_name;
		/* Get dict */
		var op_dict = widget.primary_model_code.expression.args.get(1);
		if (!op_dict)
		{
			return ;
		}
		if (!(op_dict instanceof BayLang.OpCodes.OpDict))
		{
			return ;
		}
		/* Set assign name */
		var model_class_op_code = this.code.findClass();
		if (model_class_op_code)
		{
			for (var i = 0; i < model_class_op_code.items.count(); i++)
			{
				var op_code = model_class_op_code.items.get(i);
				if (op_code instanceof BayLang.OpCodes.OpAssign)
				{
					var op_assign_value = op_code.values.get(0);
					if (op_assign_value && op_assign_value.var_name == old_widget_name)
					{
						op_assign_value.var_name = new_widget_name;
					}
				}
			}
		}
		/* Set widget name */
		var values = op_dict.values;
		for (var i = 0; i < values.count(); i++)
		{
			var op_dict_pair = values.get(i);
			if (op_dict_pair.key != "widget_name")
			{
				continue;
			}
			op_dict_pair.value = this.constructor.getOpCodeByValue(new_widget_name);
		}
		/* Change attr model name */
		if (widget.code.attrs)
		{
			for (var i = 0; i < widget.code.attrs.count(); i++)
			{
				var op_code_attr = widget.code.attrs.get(i);
				if (op_code_attr.key == "@model")
				{
					op_code_attr.value.value.value = new_widget_name;
				}
			}
		}
	},
	/**
	 * Build primary content
	 */
	buildPrimaryContent: function(widget)
	{
		if (!widget.primary_model_code)
		{
			return "";
		}
		var content = "";
		try
		{
			/* Create translator */
			var t = this.createTranslator();
			var save_op_codes = t.save_op_codes;
			/* Translate expression */
			var res = t.expression.constructor.Expression(t, widget.primary_model_code.expression);
			t = res.get(0);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(res.get(1));
			content = t.program.constructor.removeContext(content);
			content = Runtime.rs.trim(content);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
		return content;
	},
	/**
	 * Create primary code
	 */
	createPrimaryCode: function(widget)
	{
		/* Get default template */
		var template_info = widget.model_settings.getDefaultTemplate();
		var template_factory = template_info.get("default");
		if (!template_factory)
		{
			return ;
		}
		/* Get primary model content */
		var template_info = template_factory();
		var primary_model_content = template_info.get("model");
		if (primary_model_content == null)
		{
			return ;
		}
		/* Add modules */
		if (template_info.has("modules"))
		{
			var modules = template_info.get("modules");
			for (var i = 0; i < modules.count(); i++)
			{
				var module_name = modules.get(i);
				this.addModule(module_name);
			}
		}
		/* Parse default template */
		var primary_model_code = null;
		var parser = this.createParser();
		try
		{
			parser = parser.constructor.setContent(parser, primary_model_content);
			var res = parser.parser_operator.constructor.readAssign(parser);
			parser = res.get(0);
			primary_model_code = res.get(1);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		return primary_model_code;
	},
	/**
	 * Add primary code
	 */
	addPrimaryCode: function(widget)
	{
		if (widget.primary_model_code)
		{
			return ;
		}
		var init_op_code = this.findFunction("initWidget");
		if (!init_op_code)
		{
			init_op_code = this.createInitWidget();
		}
		var primary_model_code = this.createPrimaryCode(widget);
		if (!primary_model_code)
		{
			return ;
		}
		/* Add primary model code */
		widget.primary_model_code = primary_model_code.values.get(0);
		init_op_code.items.items.push(primary_model_code);
	},
	/**
	 * Add assign model code
	 */
	addAssignCode: function(widget)
	{
		var model_class_op_code = this.code.findClass();
		if (!model_class_op_code)
		{
			return null;
		}
		/* Add module */
		var alias_name = this.code.findModule(widget.model_class_name);
		var widget_name = widget.getName();
		/* Assign code */
		var op_code_assign = new BayLang.OpCodes.OpAssign(Runtime.Map.from({"pattern":new BayLang.OpCodes.OpTypeIdentifier(Runtime.Map.from({"entity_name":new BayLang.OpCodes.OpEntityName(Runtime.Map.from({"names":Runtime.Vector.from([alias_name])}))})),"values":Runtime.Vector.from([new BayLang.OpCodes.OpAssignValue(Runtime.Map.from({"var_name":widget_name,"expression":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"kind":"const","value":"null"}))}))])}));
		/* Add variable */
		var insert_pos = -1;
		for (var i = 0; i < model_class_op_code.items.count(); i++)
		{
			var op_code = model_class_op_code.items.get(i);
			if (op_code instanceof BayLang.OpCodes.OpAssign)
			{
				insert_pos = i;
			}
		}
		model_class_op_code.items.add(op_code_assign, insert_pos);
	},
	/**
	 * Add model attribute
	 */
	addModelAttribute: function(widget)
	{
		var op_code_attr = new BayLang.OpCodes.OpHtmlAttribute(Runtime.Map.from({"key":"@model","value":new BayLang.OpCodes.OpAttr(Runtime.Map.from({"kind":"attr","obj":new BayLang.OpCodes.OpAttr(Runtime.Map.from({"kind":"attr","obj":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"kind":"classref","value":"this"})),"value":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"kind":"var","value":"model"}))})),"value":new BayLang.OpCodes.OpIdentifier(Runtime.Map.from({"value":widget.getName()}))}))}));
		widget.code.attrs.push(op_code_attr);
	},
	/**
	 * Create model
	 */
	createModel: function(widget)
	{
		/* Get editor */
		var editor = this.page_model.getFrameEditor();
		/* Set model settings */
		widget.model_class_name = widget.settings.getModelName();
		widget.model_settings = editor.getModelSettings(widget);
		if (!widget.model_settings)
		{
			return ;
		}
		if (!widget.getName())
		{
			return ;
		}
		/* Add module */
		this.addModule(widget.model_class_name, widget.model_settings.getAliasName());
		/* Add assign model code */
		this.addAssignCode(widget);
		/* Add primary model code */
		this.addPrimaryCode(widget);
		/* Add model attribute */
		this.addModelAttribute(widget);
		/* Set widget name */
		this.setWidgetName(widget, widget.getName());
	},
	/**
	 * Remove primary code
	 */
	removePrimaryCode: function(widget)
	{
		if (!widget.primary_model_code)
		{
			return ;
		}
		var init_op_code = this.findFunction("initWidget");
		if (!init_op_code)
		{
			return ;
		}
		/* Remove item */
		var widget_name = widget.getName();
		for (var i = init_op_code.items.items.count() - 1; i >= 0; i--)
		{
			var op_code = init_op_code.items.items.get(i);
			if (op_code instanceof BayLang.OpCodes.OpAssign && op_code.values.count() > 0)
			{
				var op_code_assign = op_code.values.get(0);
				if (this.constructor.isPrimaryCode(op_code_assign, widget_name))
				{
					init_op_code.items.items.remove(i);
				}
			}
		}
	},
	/**
	 * Add class model
	 */
	removeClassModel: function(widget)
	{
		var model_class_op_code = this.code.findClass();
		if (!model_class_op_code)
		{
			return null;
		}
		/* Remove item */
		var widget_name = widget.getName();
		for (var i = model_class_op_code.items.count() - 1; i >= 0; i--)
		{
			var op_code = model_class_op_code.items.get(i);
			if (op_code instanceof BayLang.OpCodes.OpAssign && op_code.values.count() > 0)
			{
				var op_code_assign = op_code.values.get(0);
				if (op_code_assign.var_name == widget_name)
				{
					model_class_op_code.items.remove(i);
				}
			}
		}
	},
	/**
	 * Remove model
	 */
	removeModel: function(widget)
	{
		if (!widget.model_settings)
		{
			return ;
		}
		this.removeClassModel(widget);
		this.removePrimaryCode(widget);
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor, BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor);
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor,
{
	/**
	 * Returns true if primary code
	 */
	isPrimaryCode: function(op_code, widget_name)
	{
		if (!(op_code instanceof BayLang.OpCodes.OpAssignValue))
		{
			return false;
		}
		if (!(op_code.expression instanceof BayLang.OpCodes.OpCall))
		{
			return false;
		}
		if (!(op_code.op_code instanceof BayLang.OpCodes.OpAttr))
		{
			return false;
		}
		if (!(op_code.op_code.obj instanceof BayLang.OpCodes.OpIdentifier))
		{
			return false;
		}
		if (!(op_code.op_code.value instanceof BayLang.OpCodes.OpIdentifier))
		{
			return false;
		}
		if (!(op_code.expression.obj instanceof BayLang.OpCodes.OpAttr))
		{
			return false;
		}
		if (!(op_code.expression.obj.obj instanceof BayLang.OpCodes.OpIdentifier))
		{
			return false;
		}
		if (!(op_code.expression.obj.value instanceof BayLang.OpCodes.OpIdentifier))
		{
			return false;
		}
		if (op_code.op_code.obj.value != "this")
		{
			return false;
		}
		if (op_code.op_code.value.value != widget_name)
		{
			return false;
		}
		if (op_code.expression.obj.obj.value != "this")
		{
			return false;
		}
		if (op_code.expression.obj.value.value != "addWidget")
		{
			return false;
		}
		if (op_code.expression.args.count() != 2)
		{
			return false;
		}
		if (!(op_code.expression.args.get(0) instanceof BayLang.OpCodes.OpClassOf) && !(op_code.expression.args.get(0) instanceof BayLang.OpCodes.OpString))
		{
			return false;
		}
		if (!(op_code.expression.args.get(1) instanceof BayLang.OpCodes.OpDict))
		{
			return false;
		}
		return true;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor);
window["BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor"] = BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor;