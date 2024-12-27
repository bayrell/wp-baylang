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
Runtime.Widget.RenderListModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.RenderListModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.RenderListModel.prototype.constructor = Runtime.Widget.RenderListModel;
Object.assign(Runtime.Widget.RenderListModel.prototype,
{
	/**
	 * Find widget position
	 */
	find: function(widget)
	{
		return (widget) ? (this.items.find(Runtime.lib.equal(widget))) : (-1);
	},
	/**
	 * Find widget position by name
	 */
	findByName: function(widget_name)
	{
		return this.items.find(Runtime.lib.equalAttr("widget_name", widget_name));
	},
	/**
	 * Find widget position by name
	 */
	findItemByName: function(widget_name)
	{
		return this.items.findItem(Runtime.lib.equalAttr("widget_name", widget_name));
	},
	/**
	 * Add item
	 */
	addItem: function(widget, dest, kind)
	{
		if (dest == undefined) dest = "";
		if (kind == undefined) kind = "after";
		var pos = -1;
		if (dest != "")
		{
			pos = this.findByName(dest);
		}
		if (pos >= 0)
		{
			if (kind == "before")
			{
				this.items.insert(pos, widget);
			}
			else
			{
				this.items.insert(pos + 1, widget);
			}
		}
		else
		{
			if (kind == "before")
			{
				this.items.prepend(widget);
			}
			else
			{
				this.items.push(widget);
			}
		}
		return widget;
	},
	/**
	 * Remove item
	 */
	removeItem: function(widget)
	{
		var pos = this.find(widget);
		this.items.remove(pos);
	},
	/**
	 * Remove item
	 */
	removeItemByName: function(widget_name)
	{
		var pos = this.findByName(widget_name);
		this.items.remove(pos);
	},
	/**
	 * Returns button by index
	 */
	get: function(index)
	{
		return this.items.get(index);
	},
	/**
	 * Returns items count
	 */
	count: function()
	{
		return this.items.count();
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.widget_name = "render_list";
		this.component = "Runtime.Widget.RenderList";
		this.items = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Widget.RenderListModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.RenderListModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.RenderListModel";
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
Runtime.rtl.defClass(Runtime.Widget.RenderListModel);
window["Runtime.Widget.RenderListModel"] = Runtime.Widget.RenderListModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.RenderListModel;