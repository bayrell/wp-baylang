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
if (typeof BayLang.Helper == 'undefined') BayLang.Helper = {};
BayLang.Helper.WidgetProcessor = function(module)
{
	Runtime.BaseObject.call(this);
	this.module = module;
};
BayLang.Helper.WidgetProcessor.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Helper.WidgetProcessor.prototype.constructor = BayLang.Helper.WidgetProcessor;
Object.assign(BayLang.Helper.WidgetProcessor.prototype,
{
	/**
	 * Returns file path
	 */
	getModuleDescriptionFilePath: function()
	{
		return Runtime.fs.join(Runtime.Vector.from([this.module.getSourceFolderPath(),"ModuleDescription.bay"]));
	},
	/**
	 * Load widgets
	 */
	load: async function(force)
	{
		if (force == undefined) force = false;
		if (this.is_loaded && !force)
		{
			return Promise.resolve();
		}
		var file_path = this.getModuleDescriptionFilePath();
		/* Read file */
		if (!await Runtime.fs.isFile(file_path))
		{
			return Promise.resolve();
		}
		var content = await Runtime.fs.readFile(file_path);
		try
		{
			/* Parse file */
			var parser = new BayLang.LangBay.ParserBay();
			var res = parser.constructor.parse(parser, content);
			this.op_code = res.get(1);
		}
		catch (_ex)
		{
			if (_ex instanceof BayLang.Exceptions.ParserUnknownError)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
		this.is_loaded = true;
	},
	/**
	 * Save op_code
	 */
	save: async function()
	{
		var file_path = this.getModuleDescriptionFilePath();
		/* Translate */
		var translator = new BayLang.LangBay.TranslatorBay();
		var res = translator.constructor.translate(translator, this.op_code);
		var content = res.get(1);
		/* Save content */
		await Runtime.fs.saveFile(file_path, content);
	},
	/**
	 * Add widget
	 */
	addWidget: async function(widget_name)
	{
		var expression = this.getEntityExpression();
		if (!expression)
		{
			return Promise.resolve();
		}
		/* Create op_code */
		var op_code_widget = new BayLang.OpCodes.OpNew(Runtime.Map.from({"args":Runtime.Vector.from([new BayLang.OpCodes.OpString(Runtime.Map.from({"value":widget_name}))]),"value":new BayLang.OpCodes.OpTypeIdentifier(Runtime.Map.from({"entity_name":new BayLang.OpCodes.OpEntityName(Runtime.Map.from({"names":Runtime.Vector.from(["Widget"])}))}))}));
		/* Add widget */
		expression.values.push(op_code_widget);
	},
	/**
	 * Remove widget
	 */
	removeWidget: async function(widget_name)
	{
		var expression = this.getEntityExpression();
		if (!expression)
		{
			return Promise.resolve();
		}
		for (var i = expression.values.count() - 1; i >= 0; i--)
		{
			var op_code = expression.values.get(i);
			if (!this.constructor.isWidget(op_code))
			{
				continue;
			}
			if (op_code.args.get(0).value != widget_name)
			{
				continue;
			}
			expression.values.remove(i);
		}
	},
	/**
	 * Get widgets
	 */
	getEntityExpression: function()
	{
		var op_code = this.op_code;
		if (!(op_code instanceof BayLang.OpCodes.OpModule))
		{
			return null;
		}
		var class_op_code = op_code.findClass();
		if (!class_op_code)
		{
			return null;
		}
		var entities_op_code = class_op_code.findFunction("entities");
		if (!entities_op_code)
		{
			return null;
		}
		var expression = entities_op_code.getExpression();
		if (expression == null)
		{
			return null;
		}
		if (!(expression instanceof BayLang.OpCodes.OpCollection))
		{
			return null;
		}
		if (expression.values == null)
		{
			return null;
		}
		return expression;
	},
	/**
	 * Find widgets
	 */
	getWidgets: function()
	{
		var expression = this.getEntityExpression();
		if (!expression)
		{
			return Runtime.Vector.from([]);
		}
		return expression.values.filter((op_code) =>
		{
			return this.constructor.isWidget(op_code);
		}).map((op_code) =>
		{
			return op_code.args.get(0).value;
		});
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.module = null;
		this.op_code = null;
		this.is_loaded = false;
	},
});
Object.assign(BayLang.Helper.WidgetProcessor, Runtime.BaseObject);
Object.assign(BayLang.Helper.WidgetProcessor,
{
	/**
	 * Returns true if op_code is widget
	 */
	isWidget: function(op_code)
	{
		if (!(op_code instanceof BayLang.OpCodes.OpNew))
		{
			return false;
		}
		if (!(op_code.value instanceof BayLang.OpCodes.OpTypeIdentifier))
		{
			return false;
		}
		if (op_code.value.entity_name.names.count() != 1)
		{
			return false;
		}
		if (op_code.value.entity_name.names.get(0) != "Widget")
		{
			return false;
		}
		if (op_code.args.count() != 1)
		{
			return false;
		}
		if (!(op_code.args.get(0) instanceof BayLang.OpCodes.OpString))
		{
			return false;
		}
		return true;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Helper";
	},
	getClassName: function()
	{
		return "BayLang.Helper.WidgetProcessor";
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
Runtime.rtl.defClass(BayLang.Helper.WidgetProcessor);
window["BayLang.Helper.WidgetProcessor"] = BayLang.Helper.WidgetProcessor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Helper.WidgetProcessor;