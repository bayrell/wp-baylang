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
BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor = function(page_model)
{
	Runtime.BaseObject.call(this);
	this.page_model = page_model;
};
BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor.prototype.constructor = BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor;
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor.prototype,
{
	/**
	 * Create widget name
	 */
	createWidgetName: function(widget_name)
	{
		var name = widget_name + Runtime.rtl.toStr("_") + Runtime.rtl.toStr(this.widget_inc);
		this.widget_inc = this.widget_inc + 1;
		return name;
	},
	/**
	 * Create key_debug name
	 */
	createKeyName: function(widget_name)
	{
		var name = widget_name + Runtime.rtl.toStr("_") + Runtime.rtl.toStr(this.key_debug_inc);
		this.key_debug_inc = this.key_debug_inc + 1;
		return name;
	},
	/**
	 * Init widget inc
	 */
	initWidgetInc: function()
	{
		this.widget_inc = this.key_debug_inc;
	},
	/**
	 * Generate widget name
	 */
	generateWidgetName: function(widget_name, item)
	{
		if (Runtime.rs.substr(item, 0, 2) != "[&")
		{
			return widget_name;
		}
		if (Runtime.rs.substr(item, -1) != "]")
		{
			return widget_name;
		}
		item = Runtime.rs.substr(item, 2, -1);
		return widget_name + Runtime.rtl.toStr(item);
	},
	/**
	 * Add op_code tag attrs
	 */
	processHtmlTag: function(op_code, widget_name)
	{
		var css_name = null;
		/* Create widget name */
		var createWidgetName = () =>
		{
			if (css_name == null)
			{
				css_name = this.createWidgetName("widget");
			}
			return css_name;
		};
		/* Generate widget name */
		var generateWidgetName = (item) =>
		{
			widget_name = this.generateWidgetName(widget_name, item);
			return widget_name;
		};
		/* Add render key */
		var key_attr = op_code.attrs.findItem(Runtime.lib.equalAttr("key", "@key"));
		var key_debug_attr = op_code.attrs.findItem(Runtime.lib.equalAttr("key", "@key_debug"));
		if (key_attr == null && key_debug_attr == null)
		{
			/* Create key debug */
			var key_debug_value = this.createKeyName("widget");
			if (op_code.items)
			{
				var item = op_code.items.items.get(0);
				if (item instanceof BayLang.OpCodes.OpHtmlValue && item.kind == "raw")
				{
					key_debug_value += Runtime.rtl.toStr("_raw");
				}
			}
			/* Add key debug */
			op_code.attrs.push(new BayLang.OpCodes.OpHtmlAttribute(Runtime.Map.from({"key":"@key_debug","value":new BayLang.OpCodes.OpString(Runtime.Map.from({"value":key_debug_value}))})));
		}
		/* Change widget name */
		var class_name_attr = op_code.attrs.findItem(Runtime.lib.equalAttr("key", "class"));
		if (class_name_attr && class_name_attr.value instanceof BayLang.OpCodes.OpString)
		{
			var class_name = class_name_attr.value.value;
			var attrs = Runtime.rs.split(" ", class_name);
			attrs = attrs.filter(Runtime.lib.equalNot(""));
			attrs = attrs.map((item) =>
			{
				if (item == "[widget_name]")
				{
					return createWidgetName();
				}
				if (Runtime.rs.substr(item, 0, 2) == "[&" && Runtime.rs.substr(item, -1) == "]")
				{
					return generateWidgetName(item);
				}
				return item;
			});
			class_name_attr.value.value = Runtime.rs.join(" ", attrs);
		}
	},
	/**
	 * Add op_code slot attrs
	 */
	processHtmSlot: function(op_code, widget_name)
	{
	},
	/**
	 * Generate html items attrs
	 */
	processHtmlItems: function(items, widget_name)
	{
		if (widget_name == undefined) widget_name = "";
		if (!items)
		{
			return ;
		}
		if (items instanceof BayLang.OpCodes.OpHtmlItems)
		{
			items = items.items;
		}
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			/* Add render key to item */
			if (Runtime.rtl.is_instanceof(item, "BayLang.OpCodes.OpHtmlTag"))
			{
				this.processHtmlTag(item, widget_name);
			}
			else if (Runtime.rtl.is_instanceof(item, "BayLang.OpCodes.OpHtmlSlot"))
			{
				this.processHtmSlot(item, widget_name);
			}
			/* Generate html items attrs */
			this.processHtmlItems(item.items, widget_name);
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.page_model = null;
		this.widget_inc = 1;
		this.key_debug_inc = 1;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor, Runtime.BaseObject);
Object.assign(BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor);
window["BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor"] = BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor;