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
BayLang.Constructor.Frontend.Editor.Widget.WidgetManager = function(page_model)
{
	Runtime.BaseObject.call(this);
	this.page_model = page_model;
};
BayLang.Constructor.Frontend.Editor.Widget.WidgetManager.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Constructor.Frontend.Editor.Widget.WidgetManager.prototype.constructor = BayLang.Constructor.Frontend.Editor.Widget.WidgetManager;
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetManager.prototype,
{
	/**
	 * Returns widget by op_code
	 */
	get: function(op_code)
	{
		return (this.hash.has(op_code)) ? (this.hash.get(op_code)) : (null);
	},
	/**
	 * Get op_code by path
	 */
	getOpCode: function(path)
	{
		var item = this.page_model.tree.root.get(path);
		return (item) ? (item.code) : (null);
	},
	/**
	 * Get widget by path
	 */
	getWidget: function(path)
	{
		var op_code = this.getOpCode(path);
		return (op_code) ? (this.hash.get(op_code)) : (null);
	},
	/**
	 * Add op_code
	 */
	add: function(op_code)
	{
		if (!op_code)
		{
			return null;
		}
		/* Add widget to hash */
		if (!this.hash.has(op_code))
		{
			var widget = BayLang.Constructor.Frontend.Editor.Widget.Widget.newInstance(this.page_model, op_code);
			this.hash.set(op_code, widget);
		}
		/* Setup widget */
		var widget = this.hash.get(op_code);
		if (!widget)
		{
			return widget;
		}
		widget.updateTreeItem();
		return widget;
	},
	/**
	 * Add main op_code
	 */
	addMain: function(op_code)
	{
		if (!op_code)
		{
			return null;
		}
		/* Add widget to hash */
		if (!this.hash.has(op_code))
		{
			var widget = new BayLang.Constructor.Frontend.Editor.Widget.WidgetMain(this.page_model, op_code);
			this.hash.set(op_code, widget);
		}
		/* Setup widget */
		var widget = this.hash.get(op_code);
		widget.updateTreeItem();
		/* Update items */
		this.updateItems(op_code);
		return widget;
	},
	/**
	 * Update op_code items
	 */
	updateItems: function(op_code, recursive)
	{
		if (recursive == undefined) recursive = true;
		if (!op_code)
		{
			return null;
		}
		/* Add widget */
		var widget = this.add(op_code);
		if (!widget)
		{
			return null;
		}
		/* Get op_code items */
		var op_code_items = op_code.items;
		if (op_code_items == null)
		{
			return widget;
		}
		if (op_code_items.items == null)
		{
			return widget;
		}
		/* Clear tree items */
		widget.tree_item.items = Runtime.Vector.from([]);
		/* Add op_code items */
		for (var i = 0; i < op_code_items.items.count(); i++)
		{
			var new_op_code = op_code_items.items.get(i);
			var new_widget = this.add(new_op_code);
			if (new_widget)
			{
				/* Set new parent code */
				new_widget.parent_code = op_code;
				/* Add tree item */
				widget.tree_item.items.push(new_widget.tree_item);
			}
			if (recursive)
			{
				this.updateItems(new_op_code);
			}
		}
		return widget;
	},
	/**
	 * Remove op_code
	 */
	remove: function(op_code)
	{
		if (!this.hash.has(op_code))
		{
			return ;
		}
		/* Remove op_code */
		this.hash.remove(op_code);
	},
	/**
	 * Remove op_code with items
	 */
	removeItems: function(op_code, recursive)
	{
		if (recursive == undefined) recursive = true;
		var widget = this.get(op_code);
		if (!widget)
		{
			return ;
		}
		/* Get op_code items */
		var op_code_items = op_code.items;
		if (op_code_items == null)
		{
			return ;
		}
		if (op_code_items.items == null)
		{
			return ;
		}
		/* Clear tree items */
		widget.tree_item.items = Runtime.Vector.from([]);
		/* Remove widget items */
		for (var i = 0; i < op_code_items.items.count(); i++)
		{
			var op_code_item = op_code_items.items.get(i);
			this.remove(op_code_item);
			if (recursive)
			{
				this.removeItems(op_code_item);
			}
		}
	},
	/**
	 * Add new op_code to dest
	 */
	addOpCode: function(new_op_code, dest_op_code, kind)
	{
		/* Get widgets */
		var dest_widget = this.hash.get(dest_op_code);
		var parent_widget = this.hash.get(dest_widget.parent_code);
		/* Insert first */
		if (kind == "first")
		{
			parent_widget = dest_widget;
			dest_op_code = null;
			kind = "before";
		}
		else if (kind == "last")
		{
			parent_widget = dest_widget;
			dest_op_code = null;
			kind = "after";
		}
		/* Check widget exists */
		if (!parent_widget)
		{
			return -1;
		}
		/* Add item */
		var pos = parent_widget.code.items.items.addItem(new_op_code, dest_op_code, kind);
		/* Update items */
		this.add(new_op_code);
		this.updateItems(new_op_code);
		this.updateItems(parent_widget.code, false);
		return pos;
	},
	/**
	 * Move op_code
	 */
	moveOpCode: function(src_op_code, dest_op_code, kind)
	{
		/* Get widgets */
		var src_widget = this.hash.get(src_op_code);
		var dest_widget = this.hash.get(dest_op_code);
		if (!src_widget)
		{
			return ;
		}
		if (!dest_widget)
		{
			return ;
		}
		/* Get parent widget */
		var parent_src_widget = this.hash.get(src_widget.parent_code);
		var parent_dest_widget = this.hash.get(dest_widget.parent_code);
		if (!parent_src_widget)
		{
			return ;
		}
		if (!dest_widget)
		{
			return ;
		}
		/* Insert into */
		if (kind == "into")
		{
			parent_dest_widget = dest_widget;
			dest_op_code = null;
			dest_widget = null;
		}
		/* Remove code */
		parent_src_widget.code.items.items.removeItem(src_op_code);
		this.updateItems(parent_src_widget.code, false);
		/* Add widget */
		if (!parent_dest_widget.code.items)
		{
			parent_dest_widget.code.items = new BayLang.OpCodes.OpHtmlItems();
		}
		if (!parent_dest_widget.code.items.items)
		{
			parent_dest_widget.code.items.items = Runtime.Vector.from([]);
		}
		parent_dest_widget.code.items.items.addItem(src_op_code, dest_op_code, kind);
		/* Update items */
		this.updateItems(parent_dest_widget.code, false);
	},
	/**
	 * Duplicate op_code
	 */
	duplicateOpCode: function(dest_op_code)
	{
		/* Get widgets */
		var dest_widget = this.hash.get(dest_op_code);
		var parent_widget = this.hash.get(dest_widget.parent_code);
		if (!dest_widget)
		{
			return ;
		}
		if (!parent_widget)
		{
			return ;
		}
		/* Duplicate op_code */
		var new_op_code = Runtime.Serializer.copy(dest_op_code);
		var new_widget = this.add(new_op_code);
		/* Remove key debug */
		var attr_pos = new_op_code.attrs.find(Runtime.lib.equalAttr("key", "@key_debug"));
		if (attr_pos >= 0)
		{
			new_op_code.attrs.remove(attr_pos);
		}
		/* Process op_code */
		this.page_model.attribute_processor.processHtmlTag(new_op_code, "");
		/* Add new item */
		var pos = parent_widget.code.items.items.addItem(new_op_code, dest_op_code, "after");
		/* Update items */
		this.updateItems(new_op_code, true);
		this.updateItems(parent_widget.code, false);
		return pos;
	},
	/**
	 * Remove op_code with items
	 */
	removeOpCode: function(dest_op_code)
	{
		/* Get widgets */
		var dest_widget = this.hash.get(dest_op_code);
		var parent_widget = this.hash.get(dest_widget.parent_code);
		if (!dest_widget)
		{
			return ;
		}
		if (!parent_widget)
		{
			return ;
		}
		/* Remove op_code */
		parent_widget.code.items.items.removeItem(dest_op_code);
		/* Remove tree item */
		parent_widget.tree_item.items.removeItem(dest_widget.tree_item);
		/* Remove item */
		this.remove(dest_op_code);
		this.removeItems(dest_op_code);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.page_model = null;
		this.hash = new Runtime.HashMap();
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetManager, Runtime.BaseObject);
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetManager,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.WidgetManager";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Widget.WidgetManager);
window["BayLang.Constructor.Frontend.Editor.Widget.WidgetManager"] = BayLang.Constructor.Frontend.Editor.Widget.WidgetManager;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Widget.WidgetManager;