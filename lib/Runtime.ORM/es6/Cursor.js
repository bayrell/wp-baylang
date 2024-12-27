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
if (typeof Runtime.ORM == 'undefined') Runtime.ORM = {};
Runtime.ORM.Cursor = function(conn)
{
	Runtime.BaseObject.call(this);
	this.conn = conn;
};
Runtime.ORM.Cursor.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.Cursor.prototype.constructor = Runtime.ORM.Cursor;
Object.assign(Runtime.ORM.Cursor.prototype,
{
	/**
	 * Returns found rows
	 */
	foundRows: async function()
	{
		return 0;
	},
	/**
	 * Returns affected rows
	 */
	affectedRows: async function()
	{
		return 0;
	},
	/**
	 * Returns last insert id
	 */
	lastInsertId: async function()
	{
		return 0;
	},
	/**
	 * Returns pages
	 */
	getPages: async function()
	{
		var rows = await this.foundRows();
		return Promise.resolve((this.q) ? (this.q.getPages(rows)) : (0));
	},
	/**
	 * Returns page
	 */
	getPage: async function()
	{
		return (this.q) ? (this.q.getPage()) : (0);
	},
	/**
	 * Close query
	 */
	close: async function()
	{
	},
	/**
	 * Fetch next row
	 */
	fetchMap: async function()
	{
		return null;
	},
	/**
	 * Convert item
	 */
	convertItem: function(item)
	{
		var fields = this.q._fields;
		for (var i = 0; i < fields.count(); i++)
		{
			var field = Runtime.rtl.attr(fields, i);
			if (field instanceof Runtime.ORM.QueryField && field.annotation)
			{
				item = field.annotation.fromDatabase(this.conn, item);
			}
		}
		return item;
	},
	/**
	 * Fetch next row
	 */
	fetch: async function()
	{
		var row = await this.fetchMap();
		if (!row)
		{
			return Promise.resolve(null);
		}
		row = this.convertItem(row);
		return Promise.resolve(row);
	},
	/**
	 * Fetch next row
	 */
	fetchRelation: async function()
	{
		var row = await this.fetch();
		if (!row)
		{
			return Promise.resolve(null);
		}
		var table_name = this.q._table_name;
		return Promise.resolve(Runtime.ORM.Relation.newInstance(table_name, row));
	},
	/**
	 * Fetch all rows
	 */
	fetchAll: async function()
	{
		var table_name = this.q._table_name;
		var items = new Runtime.ORM.QueryResult();
		/* Copy settings */
		items.conn = this.conn;
		items.q = (this.q) ? (this.q.copy()) : (null);
		/* Get rows */
		items.rows = await this.foundRows();
		/* Get items */
		while (true)
		{
			var row = await this.fetch();
			if (row == null)
			{
				break;
			}
			items.append(row);
		}
		return Promise.resolve(items);
	},
	/**
	 * Fetch variable
	 */
	fetchVar: async function(var_name)
	{
		var row = await this.fetchMap();
		if (row)
		{
			return Promise.resolve(Runtime.rtl.attr(row, var_name));
		}
		return Promise.resolve(null);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.conn = null;
		this.q = null;
	},
});
Object.assign(Runtime.ORM.Cursor, Runtime.BaseObject);
Object.assign(Runtime.ORM.Cursor,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Cursor";
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
Runtime.rtl.defClass(Runtime.ORM.Cursor);
window["Runtime.ORM.Cursor"] = Runtime.ORM.Cursor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Cursor;