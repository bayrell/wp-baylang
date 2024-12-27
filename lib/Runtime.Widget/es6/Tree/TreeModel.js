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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Tree == 'undefined') Runtime.Widget.Tree = {};
Runtime.Widget.Tree.TreeModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Tree.TreeModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Tree.TreeModel.prototype.constructor = Runtime.Widget.Tree.TreeModel;
Object.assign(Runtime.Widget.Tree.TreeModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("autoselect"))
		{
			this.autoselect = params.get("autoselect");
		}
		if (params.has("dnd"))
		{
			this.dnd = params.get("dnd");
		}
		if (params.has("icons"))
		{
			this.icons = params.get("icons");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
		/* Setup context menu */
		if (params.has("context_menu"))
		{
			this.setContextMenu(params.get("context_menu"));
		}
	},
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "root", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Set context menu
	 */
	setContextMenu: function(context_menu)
	{
		this.render_context_menu = true;
		if (context_menu instanceof Runtime.Dict)
		{
			this.context_menu = this.addWidget("Runtime.Widget.ContextMenu.ContextMenuModel", context_menu);
		}
		else
		{
			this.context_menu = this.createModel(context_menu);
			if (context_menu instanceof Runtime.Web.BaseModel)
			{
				this.render_context_menu = false;
			}
		}
	},
	/**
	 * Select item
	 */
	selectItem: function(path)
	{
		var item = (path) ? (this.root.get(path)) : (null);
		if (this.selected_item == item)
		{
			return ;
		}
		this.selected_path = path;
		this.selected_item = item;
		if (this.selected_item)
		{
			this.selected_item.onSelect();
		}
	},
	/**
	 * Can drag & drop
	 */
	canDrag: function(src, dest, kind)
	{
		var message = new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"name":"canDrag","src":src,"dest":dest,"src_item":this.root.get(src),"dest_item":this.root.get(dest),"kind":kind,"result":true}));
		this.emit(message);
		return message.result;
	},
	/**
	 * Drag & Drop
	 */
	dragElement: function(src, dest, kind)
	{
		if (dest.count() == 0)
		{
			dest = Runtime.Vector.from([this.root.items.count() - 1]);
		}
		if (!this.canDrag(src, dest, kind))
		{
			return ;
		}
		/* Move item */
		var src_item = this.root.get(src);
		var dest_item = this.root.get(dest);
		if (!src_item)
		{
			return ;
		}
		if (!dest_item)
		{
			return ;
		}
		/* Get parent items */
		var src_parent_path = src.slice(0, -1);
		var dest_parent_path = (kind != "into") ? (dest.slice(0, -1)) : (dest);
		var src_parent_item = this.root.get(src_parent_path);
		var dest_parent_item = this.root.get(dest_parent_path);
		/* Move item */
		src_parent_item.items.removeItem(src_item);
		if (kind == "into")
		{
			dest_parent_item.items.addItem(src_item, null, "before");
		}
		else
		{
			dest_parent_item.items.addItem(src_item, dest_item, kind);
		}
		/* Update dest path */
		var new_dest_parent_path = dest_parent_path.slice();
		if (src.count() <= new_dest_parent_path.count())
		{
			var pos = src.count() - 1;
			if (src.get(pos) < new_dest_parent_path.get(pos))
			{
				new_dest_parent_path.set(pos, new_dest_parent_path.get(pos) - 1);
			}
		}
		/* Create src new path */
		var pos = dest_parent_item.find(src_item);
		var new_src_path = new_dest_parent_path.pushIm(pos);
		/* Send drag & drop event */
		this.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"name":"dragElement","dest_item":dest_item,"dest_parent_item":dest_parent_item,"kind":kind,"src_item":src_item,"src_parent_item":src_parent_item,"new_src_path":new_src_path})));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Tree.TreeWidget";
		this.widget_name = "tree";
		this.autoselect = true;
		this.dnd = false;
		this.icons = true;
		this.is_open = false;
		this.render_context_menu = true;
		this.context_menu = null;
		this.selected_path = null;
		this.selected_item = null;
		this.root = null;
	},
});
Object.assign(Runtime.Widget.Tree.TreeModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Tree.TreeModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Tree";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tree.TreeModel";
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
Runtime.rtl.defClass(Runtime.Widget.Tree.TreeModel);
window["Runtime.Widget.Tree.TreeModel"] = Runtime.Widget.Tree.TreeModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tree.TreeModel;