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
Runtime.ORM.Connection = function(name)
{
	this.name = name;
};
Object.assign(Runtime.ORM.Connection.prototype,
{
	/**
	 * Connect
	 */
	connect: async function()
	{
	},
	/**
	 * Check is connected
	 */
	isConnected: function()
	{
		return false;
	},
	/**
	 * Returns connection name
	 */
	getName: function()
	{
		return this.name;
	},
	/**
	 * Create new cursor
	 */
	createCursor: function()
	{
		return new Runtime.ORM.Cursor();
	},
	/**
	 * Prepare field
	 */
	prepare_field: function(item)
	{
		return item;
	},
	/**
	 * Prepare value
	 */
	prepare_value: function(item, op)
	{
		return item;
	},
	/**
	 * Quote
	 */
	quote: function(value)
	{
		return value;
	},
	/**
	 * Execute Query
	 */
	execute: async function(q, params)
	{
		if (params == undefined) params = null;
		return null;
	},
	executeQuery: async function(q, params)
	{
		if (params == undefined) params = null;
		return this.execute(q, params);
	},
	/**
	 * Insert query
	 */
	insert: async function(table_name, insert_data, get_last_id, params)
	{
		if (get_last_id == undefined) get_last_id = true;
		if (params == undefined) params = null;
		var last_id = null;
		if (table_name == "")
		{
			throw new Runtime.Exceptions.RuntimeException("Table name is empty")
		}
		var q = (new Runtime.ORM.Query()).insert(table_name).values(insert_data);
		var c = await this.execute(q, params);
		if (get_last_id)
		{
			last_id = await c.lastInsertId();
		}
		await c.close();
		return Promise.resolve(last_id);
	},
	/**
	 * Update query
	 */
	update: async function(table_name, filter, update_data, params)
	{
		if (params == undefined) params = null;
		if (table_name == "")
		{
			throw new Runtime.Exceptions.RuntimeException("Table name is empty")
		}
		var q = (new Runtime.ORM.Query()).update(table_name).values(update_data).setFilter(filter);
		var c = await this.execute(q, params);
		await c.close();
	},
	/**
	 * Delete item
	 */
	delete: async function(table_name, filter, params)
	{
		if (params == undefined) params = null;
		if (table_name == "")
		{
			throw new Runtime.Exceptions.RuntimeException("Table name is empty")
		}
		var __v0 = new Runtime.Monad(new Runtime.ORM.Query());
		__v0 = __v0.callMethod("delete", [table_name]);
		__v0 = __v0.callMethod("setFilter", [filter]);
		var q = __v0.value();
		var c = await this.execute(q, params);
		await c.close();
	},
	/**
	 * Convert item from database
	 */
	fromDatabase: function(annotation, item, field_name)
	{
		return item;
	},
	/**
	 * Convert item to database
	 */
	toDatabase: function(annotation, item, field_name)
	{
		return item;
	},
	/**
	 * Fetch all
	 */
	fetchAll: async function(q, params)
	{
		if (params == undefined) params = null;
		var c = await this.execute(q, params);
		var items = await c.fetchAll();
		await c.close();
		return Promise.resolve(items);
	},
	/**
	 * Fetch
	 */
	fetch: async function(q, params)
	{
		if (params == undefined) params = null;
		var c = await this.execute(q, params);
		var items = await c.fetch();
		await c.close();
		return Promise.resolve(items);
	},
	fetchOne: async function(q, params)
	{
		if (params == undefined) params = null;
		return await this.fetch(q, params);
	},
	/**
	 * Fetch variable
	 */
	fetchVar: async function(q, var_name, params)
	{
		if (params == undefined) params = null;
		var cursor = await this.execute(q, params);
		var item = await cursor.fetchVar(var_name);
		await cursor.close();
		return Promise.resolve(item);
	},
	/**
	 * Find relation by object
	 */
	findRelationByObject: async function(table_name, item, params)
	{
		if (params == undefined) params = null;
		/* Build filter */
		var filter = item.transition((value, key) =>
		{
			return new Runtime.ORM.QueryFilter(key, "=", value);
		});
		/* Find relation */
		return Promise.resolve(await this.findRelationByFilter(table_name, filter, params));
	},
	/**
	 * Find relation by object
	 */
	findRelationById: async function(table_name, id, params)
	{
		if (params == undefined) params = null;
		/* Get primary keys */
		var pk = Runtime.ORM.Relation.getPrimaryKeys(table_name);
		var pk_name = pk.get(0);
		/* Build filter */
		var filter = Runtime.Vector.from([new Runtime.ORM.QueryFilter(pk_name, "=", id)]);
		/* Find relation */
		return Promise.resolve(await this.findRelationByFilter(table_name, filter, params));
	},
	/**
	 * Find relation by filter
	 */
	findRelationByFilter: async function(table_name, filter, params)
	{
		if (params == undefined) params = null;
		var q = (new Runtime.ORM.Query()).select(Runtime.Vector.from([table_name + Runtime.rtl.toStr(".*")])).from(table_name).setFilter(filter).limit(1);
		return Promise.resolve(await this.findRelation(q, params));
	},
	/**
	 * Find relation by query
	 */
	findRelation: async function(q, params)
	{
		if (params == undefined) params = null;
		var c = await this.execute(q, params);
		var item = await c.fetchRelation(q, params);
		await c.close();
		return Promise.resolve(item);
	},
	/**
	 * Find relations by filter
	 */
	findRelationsByFilter: async function(table_name, filter, params)
	{
		if (params == undefined) params = null;
		var q = (new Runtime.ORM.Query()).select(Runtime.Vector.from([table_name + Runtime.rtl.toStr(".*")])).from(table_name).setFilter(filter);
		return Promise.resolve(await this.findRelations(q, params));
	},
	/**
	 * Find relations by query
	 */
	findRelations: async function(q, params)
	{
		if (params == undefined) params = null;
		var c = await this.execute(q, params);
		var items = await c.fetchAll(q, params);
		await c.close();
		return Promise.resolve(items.toRelation());
	},
	/**
	 * Find or create
	 */
	findOrCreate: async function(table_name, item, params)
	{
		if (params == undefined) params = null;
		/* Build filter */
		var filter = item.transition((value, key) =>
		{
			return new Runtime.ORM.QueryFilter(key, "=", value);
		});
		/* Find item */
		var relation = await this.findRelationByFilter(table_name, filter, params);
		if (relation)
		{
			return Promise.resolve(relation);
		}
		/* Create if not found */
		relation = Runtime.ORM.Relation.newInstance(table_name);
		/* Set new data */
		relation.updateData(item);
		return Promise.resolve(relation);
	},
	_init: function()
	{
		this.name = "";
	},
});
Object.assign(Runtime.ORM.Connection,
{
	/**
	 * Returns connection
	 */
	get: function(name)
	{
		if (name == undefined) name = "default";
		return this.getConnection(name);
	},
	getConnection: function(name)
	{
		if (name == undefined) name = "default";
		if (name == "")
		{
			name = "default";
		}
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		var conn = provider.getConnection(name);
		return conn;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Connection";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(Runtime.ORM.Connection);
window["Runtime.ORM.Connection"] = Runtime.ORM.Connection;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Connection;