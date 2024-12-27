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
Runtime.Widget.Tree.TreeItem = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Tree.TreeItem.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Tree.TreeItem.prototype.constructor = Runtime.Widget.Tree.TreeItem;
Object.assign(Runtime.Widget.Tree.TreeItem.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "key", data);
		serializer.process(this, "label", data);
		serializer.process(this, "items", data);
	},
	/**
	 * Returns true if can insert inside
	 */
	canDragInside: function()
	{
		return true;
	},
	/**
	 * Get item
	 */
	get: function(path)
	{
		if (path == null)
		{
			return null;
		}
		if (path.count() == 0)
		{
			return this;
		}
		var pos = path.first();
		var new_item = this.items.get(pos);
		if (new_item == null)
		{
			return null;
		}
		return new_item.get(path.slice(1));
	},
	/**
	 * Find item position
	 */
	find: function(item)
	{
		return (item) ? (this.items.find(Runtime.lib.equal(item))) : (-1);
	},
	/**
	 * Context menu click
	 */
	onContextMenu: function(model)
	{
	},
	/**
	 * Click
	 */
	onClick: function(model)
	{
	},
	/**
	 * Select item
	 */
	onSelect: function(model)
	{
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.key = "";
		this.label = "";
		this.open = true;
		this.items = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Widget.Tree.TreeItem, Runtime.BaseObject);
Object.assign(Runtime.Widget.Tree.TreeItem,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Tree";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tree.TreeItem";
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
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.Tree.TreeItem);
window["Runtime.Widget.Tree.TreeItem"] = Runtime.Widget.Tree.TreeItem;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tree.TreeItem;