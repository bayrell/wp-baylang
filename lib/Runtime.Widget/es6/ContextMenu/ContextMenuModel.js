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
if (typeof Runtime.Widget.ContextMenu == 'undefined') Runtime.Widget.ContextMenu = {};
Runtime.Widget.ContextMenu.ContextMenuModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.ContextMenu.ContextMenuModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.ContextMenu.ContextMenuModel.prototype.constructor = Runtime.Widget.ContextMenu.ContextMenuModel;
Object.assign(Runtime.Widget.ContextMenu.ContextMenuModel.prototype,
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
		if (params.has("items"))
		{
			this.items = params.get("items");
		}
	},
	/**
	 * Set width
	 */
	setWidth: function(value)
	{
		this.width = value;
	},
	/**
	 * Show dialog
	 */
	show: function(x, y)
	{
		this.is_open = true;
		this.x = x;
		this.y = y;
	},
	/**
	 * Hide dialog
	 */
	hide: function()
	{
		this.is_open = false;
	},
	/**
	 * Add item
	 */
	addItem: function(item)
	{
		this.items.push(item);
	},
	/**
	 * Find index
	 */
	find: function(key)
	{
		return this.items.find((item) =>
		{
			return item.get("key") == key;
		});
	},
	/**
	 * Find item
	 */
	findItem: function(key)
	{
		return this.items.get(this.find(key));
	},
	/**
	 * On click
	 */
	onClickItem: function(item)
	{
		this.emit(new Runtime.Widget.ContextMenu.ContextMenuMessage(Runtime.Map.from({"name":"clickItem","item":item})));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.ContextMenu.ContextMenu";
		this.widget_name = "context_menu";
		this.is_open = false;
		this.width = "";
		this.x = 0;
		this.y = 0;
		this.items = Runtime.Vector.from([]);
		this.data = null;
	},
});
Object.assign(Runtime.Widget.ContextMenu.ContextMenuModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.ContextMenu.ContextMenuModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.ContextMenu";
	},
	getClassName: function()
	{
		return "Runtime.Widget.ContextMenu.ContextMenuModel";
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
Runtime.rtl.defClass(Runtime.Widget.ContextMenu.ContextMenuModel);
window["Runtime.Widget.ContextMenu.ContextMenuModel"] = Runtime.Widget.ContextMenu.ContextMenuModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ContextMenu.ContextMenuModel;