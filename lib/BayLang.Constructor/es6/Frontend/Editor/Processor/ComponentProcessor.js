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
BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor = function()
{
	BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.prototype);
BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor.prototype.constructor = BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor;
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor.prototype,
{
	/**
	 * Setup op code
	 */
	setupOpCode: function(code)
	{
		BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.prototype.setupOpCode.call(this, code);
		/* Process op_code attrs */
		var op_code_render = this.findFunction("render");
		if (!op_code_render)
		{
			return ;
		}
		/* Process attributes */
		var op_code_expression = op_code_render.getExpression();
		this.page_model.attribute_processor.processHtmlItems(op_code_expression);
		this.page_model.attribute_processor.initWidgetInc();
		/* Set main widget */
		if (op_code_expression && op_code_expression instanceof BayLang.OpCodes.OpHtmlItems)
		{
			var op_code = op_code_expression.items.get(0);
			this.page_model.main_widget = this.page_model.widget_manager.addMain(op_code);
		}
	},
	/**
	 * Get styles op_code
	 */
	getStyleOpCode: function()
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
		return op_code_class.items.filter(Runtime.lib.isInstance("BayLang.OpCodes.OpHtmlStyle"));
	},
	/**
	 * Returns app content
	 */
	buildAppContent: function()
	{
		var translator = BayLang.LangUtils.createTranslator("bay");
		var content = BayLang.LangUtils.translate(translator, this.code);
		return content;
	},
	/**
	 * Build render function
	 */
	buildRenderContent: function(render_name)
	{
		if (render_name == undefined) render_name = "render";
		var op_code_render = this.findFunction(render_name);
		if (!op_code_render)
		{
			return "";
		}
		/* Create translator */
		var t = this.createTranslator();
		var save_op_codes = t.save_op_codes;
		/* Translate expression */
		var res = t.expression.constructor.OpDeclareFunction(t, op_code_render, false);
		t = res.get(0);
		/* Output save op code */
		var content = "";
		var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
		if (save != "")
		{
			content += Runtime.rtl.toStr(save);
		}
		content += Runtime.rtl.toStr(res.get(1));
		content = t.program.constructor.removeContext(content);
		content = Runtime.rs.trim(content);
		return content;
	},
	/**
	 * Add default template
	 */
	addDefaultTemplate: function(op_code, widget_name, template_content)
	{
		/* Parse default template */
		var default_template = null;
		var parser = this.createParser();
		try
		{
			var res = parser.constructor.parse(parser, template_content);
			parser = res.get(0);
			default_template = res.get(1);
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
		/* If default template is correct */
		if (!default_template)
		{
			return ;
		}
		/* Add default CSS */
		var op_code_class = default_template.findClass();
		if (op_code_class)
		{
			var op_code_style = op_code_class.items.findItem(Runtime.lib.isInstance("BayLang.OpCodes.OpHtmlStyle"));
			if (op_code_style)
			{
				this.page_model.styles.setSelectorContent("." + Runtime.rtl.toStr(widget_name), op_code_style.content);
			}
		}
		/* Add uses */
		var modules = default_template.uses.keys();
		for (var i = 0; i < default_template.items.count(); i++)
		{
			var item = default_template.items.get(i);
			if (item instanceof BayLang.OpCodes.OpUse)
			{
				this.addModule(item.name, item.alias, item.is_component);
			}
		}
		/* Find class from default_template */
		var op_code_class = default_template.findClass();
		if (!op_code_class)
		{
			return ;
		}
		/* Find render */
		var op_code_render = op_code_class.findFunction("render");
		if (!op_code_render)
		{
			return ;
		}
		if (!op_code_render.expression)
		{
			return ;
		}
		if (!(op_code_render.expression instanceof BayLang.OpCodes.OpHtmlItems))
		{
			return ;
		}
		/* Add items */
		op_code.items = op_code_render.expression;
	},
	/**
	 * Create widget
	 */
	createWidget: function(widget_settings, widget_name)
	{
		if (widget_name == undefined) widget_name = "widget";
		/* Default widget name */
		if (widget_name == "")
		{
			widget_name = "widget";
		}
		/* Get component class name */
		var class_name = widget_settings.getComponentName();
		var alias_name = class_name;
		/* Add module */
		if (this.constructor.isComponent(class_name))
		{
			alias_name = this.addModule(class_name, widget_settings.getAliasName(), true);
		}
		/* Create op_code */
		var key_debug = this.page_model.attribute_processor.createKeyName("widget");
		var op_code = new BayLang.OpCodes.OpHtmlTag(Runtime.Map.from({"attrs":Runtime.Vector.from([new BayLang.OpCodes.OpHtmlAttribute(Runtime.Map.from({"key":"class","value":new BayLang.OpCodes.OpString(Runtime.Map.from({"value":widget_name}))})),new BayLang.OpCodes.OpHtmlAttribute(Runtime.Map.from({"key":"@key_debug","value":new BayLang.OpCodes.OpString(Runtime.Map.from({"value":key_debug}))}))]),"items":new BayLang.OpCodes.OpHtmlItems(),"tag_name":alias_name}));
		/* Get default template */
		var template_info = widget_settings.getDefaultTemplate();
		var template_factory = template_info.get("default");
		if (!template_factory)
		{
			return op_code;
		}
		/* Get template content */
		var template_info = template_factory();
		var template_content = "<class>" + Runtime.rtl.toStr(template_info.get("content")) + Runtime.rtl.toStr("</class>");
		/* Add default template */
		this.addDefaultTemplate(op_code, widget_name, template_content);
		/* Add op_code attrs */
		this.page_model.attribute_processor.processHtmlTag(op_code, widget_name);
		return op_code;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor, BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor);
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor);
window["BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor"] = BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor;