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
if (typeof BayLang.Constructor.Frontend.Editor.Widget == 'undefined') BayLang.Constructor.Frontend.Editor.Widget = {};
BayLang.Constructor.Frontend.Editor.Widget.Widget = function(page_model, code)
{
	Runtime.BaseObject.call(this);
	this.code = code;
	this.page_model = page_model;
};
BayLang.Constructor.Frontend.Editor.Widget.Widget.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Constructor.Frontend.Editor.Widget.Widget.prototype.constructor = BayLang.Constructor.Frontend.Editor.Widget.Widget;
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.Widget.prototype,
{
	/**
	 * Returns true if component
	 */
	isComponent: function()
	{
		return false;
	},
	/**
	 * Returns true if tag has model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget_settings)
	{
		return false;
	},
	/**
	 * Update tree item
	 */
	updateTreeItem: function()
	{
		if (!this.tree_item)
		{
			this.tree_item = new BayLang.Constructor.Frontend.Editor.WidgetTreeItem(this.code);
		}
		/* Update label */
		this.tree_item.updateLabel();
	},
	/**
	 * Update tree items
	 */
	updateTreeItems: function()
	{
		/* Create tree item if does not exists */
		if (!this.tree_item)
		{
			this.updateTreeItem();
		}
		/* Update items */
		this.tree_item.items = Runtime.Vector.from([]);
		if (this.code.items instanceof BayLang.OpCodes.OpHtmlItems)
		{
			for (var i = 0; i < this.code.items.count(); i++)
			{
				var op_code_item = this.code.items.get(i);
				var widget_item = this.page_model.widget_manager.get(op_code_item);
				this.tree_item.items.push(widget_item.tree_item);
			}
		}
	},
	/**
	 * Reset widget
	 */
	reset: function()
	{
		this.is_initialized = false;
		this.settings = null;
	},
	/**
	 * Setup
	 */
	setup: function()
	{
		if (this.is_initialized)
		{
			return ;
		}
		/* Setup settings */
		this.setupSettings();
		/* Setup params */
		this.setupParams();
		/* Setup attrs */
		this.setupAttrs();
		/* Init params */
		this.initParams();
		/* Set flag initialized */
		this.is_initialized = true;
	},
	/**
	 * Setup settings
	 */
	setupSettings: function()
	{
	},
	/**
	 * Setup attrs
	 */
	setupAttrs: function()
	{
	},
	/**
	 * Setup params
	 */
	setupParams: function()
	{
	},
	/**
	 * Init params
	 */
	initParams: function()
	{
		this.params.each((param) =>
		{
			param.init();
		});
		/* Setup widget settings */
		if (this.settings && Runtime.rtl.exists(this.settings.setup))
		{
			this.settings.setup(this);
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.code = null;
		this.parent_code = null;
		this.page_model = null;
		this.tree_item = null;
		this.params = Runtime.Vector.from([]);
		this.settings = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.Widget, Runtime.BaseObject);
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.Widget,
{
	/**
	 * Create new instance
	 */
	newInstance: function(page_model, op_code)
	{
		if (!(op_code instanceof BayLang.OpCodes.OpHtmlTag))
		{
			return null;
		}
		var selected_tag_name = op_code.tag_name;
		if (BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.isComponent(selected_tag_name))
		{
			return new BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent(page_model, op_code);
		}
		/* Lower tag name */
		selected_tag_name = Runtime.rs.lower(selected_tag_name);
		return new BayLang.Constructor.Frontend.Editor.Widget.WidgetTag(page_model, op_code);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.Widget";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Widget.Widget);
window["BayLang.Constructor.Frontend.Editor.Widget.Widget"] = BayLang.Constructor.Frontend.Editor.Widget.Widget;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Widget.Widget;