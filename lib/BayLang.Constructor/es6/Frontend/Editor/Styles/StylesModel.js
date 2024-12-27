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
if (typeof BayLang.Constructor.Frontend.Editor.Styles == 'undefined') BayLang.Constructor.Frontend.Editor.Styles = {};
BayLang.Constructor.Frontend.Editor.Styles.StylesModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Styles.StylesModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
BayLang.Constructor.Frontend.Editor.Styles.StylesModel.prototype.constructor = BayLang.Constructor.Frontend.Editor.Styles.StylesModel;
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.StylesModel.prototype,
{
	/**
	 * Returns CSS content
	 */
	getCSS: function()
	{
		var items = Runtime.Vector.from([]);
		var selectors = this.selectors.keys().sort();
		for (var i = 0; i < selectors.count(); i++)
		{
			var selector_name = selectors.get(i);
			var item = this.selectors.get(selector_name);
			items.push(item.content);
		}
		return items;
	},
	/**
	 * Returns selector by selector name
	 */
	getSelector: function(selector_name)
	{
		if (!this.selectors.has(selector_name))
		{
			return null;
		}
		return this.selectors.get(selector_name);
	},
	/**
	 * Returns selector content
	 */
	getSelectorContent: function(selector_name)
	{
		if (!this.selectors.has(selector_name))
		{
			return "";
		}
		return this.selectors.get(selector_name).source;
	},
	/**
	 * Create style item
	 */
	createSelector: function(selector_name, op_code)
	{
		if (op_code == undefined) op_code = null;
		if (op_code == null)
		{
			op_code = this.main_style_code;
		}
		var selector = new BayLang.Constructor.Frontend.Editor.Styles.Selector();
		selector.op_code = op_code;
		selector.selector_name = selector_name;
		selector.parent_widget = this;
		this.selectors.set(selector_name, selector);
		return selector;
	},
	/**
	 * Set css content
	 */
	setSelectorContent: function(selector_name, source, op_code)
	{
		if (op_code == undefined) op_code = null;
		/* Default item */
		if (op_code == null)
		{
			op_code = this.main_style_code;
		}
		/* Create style item if does not exists */
		if (!this.selectors.has(selector_name))
		{
			this.createSelector(selector_name, op_code);
		}
		/* Set content */
		var selector = this.selectors.get(selector_name);
		selector.setContent(source);
	},
	/**
	 * Change css content
	 */
	changeSelectorContent: function(selector_name, value)
	{
		/* Set CSS Value */
		this.setSelectorContent(selector_name, value);
		/* Update CSS */
		this.parent_widget.updateFrameCSS();
	},
	/**
	 * Clear styles
	 */
	clear: function()
	{
		this.selectors = Runtime.Map.from({});
	},
	/**
	 * Setup styles
	 */
	setupStyles: function(op_code)
	{
		var op_code_class = op_code.findClass();
		if (!op_code_class)
		{
			return ;
		}
		/* Add styles */
		for (var i = 0; i < op_code_class.items.count(); i++)
		{
			var item = op_code_class.items.get(i);
			if (item instanceof BayLang.OpCodes.OpHtmlStyle)
			{
				this.addHtmlStyle(item);
			}
		}
		/* Add style if not exists */
		if (this.main_style_code == null)
		{
			this.createMainHtmlStyle(op_code);
		}
	},
	/**
	 * Create main HTML Style
	 */
	createMainHtmlStyle: function(op_code)
	{
		if (this.main_style_code != null)
		{
			return ;
		}
		var op_code_class = op_code.findClass();
		if (!op_code_class)
		{
			return ;
		}
		/* Create main style code */
		this.main_style_code = new BayLang.OpCodes.OpHtmlStyle(Runtime.Map.from({"value":new BayLang.OpCodes.OpString(Runtime.Map.from({"value":""}))}));
		/* Find use */
		var pos = -1;
		for (var i = 0; i < op_code.items.count(); i++)
		{
			if (op_code.items.get(i) instanceof BayLang.OpCodes.OpUse)
			{
				pos = i;
			}
		}
		/* Register main style */
		op_code_class.items.add(this.main_style_code, pos);
	},
	/**
	 * Add HTML style
	 */
	addHtmlStyle: function(op_code)
	{
		if (this.main_style_code == null)
		{
			this.main_style_code = op_code;
		}
		var styles = op_code.readStyles();
		var arr = styles.keys();
		for (var i = 0; i < arr.count(); i++)
		{
			var selector_name = arr.get(i);
			if (this.selectors.has(selector_name))
			{
				continue;
			}
			/* Set CSS Value */
			var source = styles.get(selector_name);
			this.setSelectorContent(selector_name, source, op_code);
		}
	},
	/**
	 * Update HTML Style
	 */
	updateHtmlStyle: function(op_code)
	{
		/* Build style source */
		var source = Runtime.Vector.from([]);
		var selectors = this.selectors.keys().sort();
		for (var i = 0; i < selectors.count(); i++)
		{
			var selector_name = selectors.get(i);
			var selector = this.selectors.get(selector_name);
			if (selector.op_code != op_code)
			{
				continue;
			}
			/* Add content to source */
			source.push(selector_name + Runtime.rtl.toStr("{"));
			var lines = Runtime.rs.split("\n", selector.source);
			lines = lines.map((s) =>
			{
				return "\t" + Runtime.rtl.toStr(s);
			});
			source.appendItems(lines);
			source.push("}");
		}
		/* Set content to html style op_code */
		var content = Runtime.rs.join("\n", source);
		op_code.content = content;
		if (op_code.value instanceof BayLang.OpCodes.OpString)
		{
			op_code.value.value = content;
		}
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Editor.Styles.Styles";
		this.widget_name = "styles";
		this.selectors = Runtime.Map.from({});
		this.main_style_code = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.StylesModel, Runtime.Web.BaseModel);
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.StylesModel,
{
	/**
	 * Returns source
	 */
	getCSSCode: function(selector_name, source)
	{
		return selector_name + Runtime.rtl.toStr("{") + Runtime.rtl.toStr(source) + Runtime.rtl.toStr("}");
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.StylesModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Styles.StylesModel);
window["BayLang.Constructor.Frontend.Editor.Styles.StylesModel"] = BayLang.Constructor.Frontend.Editor.Styles.StylesModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Styles.StylesModel;