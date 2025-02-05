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
Runtime.ORM.Relation = function()
{
	Runtime.BaseObject.call(this);
};
Runtime.ORM.Relation.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.Relation.prototype.constructor = Runtime.ORM.Relation;
Object.assign(Runtime.ORM.Relation.prototype,
{
	/**
	 * Convert to model
	 */
	toModel: function()
	{
		return this.constructor.newInstance(this.constructor.getClassName(), this.toMap());
	},
	/**
	 * Convert to Dict
	 */
	all: function()
	{
		return this.new_data.clone();
	},
	old: function()
	{
		return this.old_data.clone();
	},
	toMap: function()
	{
		return this.new_data.clone();
	},
	intersect: function(fields)
	{
		if (fields == undefined) fields = null;
		return this.new_data.intersect(fields);
	},
	/**
	 * Returns primary key
	 */
	getPrimaryKey: function()
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return provider.getPrimaryFromData(this.constructor.getTableName(), this.new_data);
	},
	/**
	 * Returns value
	 */
	get: function(name, def_value)
	{
		if (def_value == undefined) def_value = null;
		return this.new_data.get(name, def_value);
	},
	/**
	 * Set new value
	 */
	set: function(name, value)
	{
		this.new_data.set(name, value);
	},
	/**
	 * Get updated data
	 */
	getUpdatedData: function()
	{
		if (this.new_data == null)
		{
			return Runtime.Map.from({});
		}
		var res = new Runtime.Map();
		var new_data_keys = this.new_data.keys();
		for (var i = 0; i < new_data_keys.count(); i++)
		{
			var field_name = Runtime.rtl.attr(new_data_keys, i);
			var new_value = Runtime.rtl.attr(this.new_data, field_name);
			if (this.old_data == null)
			{
				res.set(field_name, new_value);
			}
			else
			{
				if (!this.old_data.has(field_name))
				{
					res.set(field_name, new_value);
				}
				else
				{
					var old_value = Runtime.rtl.attr(this.old_data, field_name);
					if (new_value != old_value)
					{
						res.set(field_name, new_value);
					}
				}
			}
		}
		return res;
	},
	/**
	 * Init data
	 */
	_initData: function(data)
	{
		if (data == undefined) data = null;
		this.old_data = (data != null) ? (new Runtime.Map(data)) : (null);
		this.new_data = (data != null) ? (new Runtime.Map(data)) : (new Runtime.Map());
	},
	/**
	 * Set data
	 */
	setData: async function(item)
	{
		item.each((value, key) =>
		{
			this.set(key, value);
		});
	},
	/**
	 * Returns true if object is new
	 */
	isNew: function()
	{
		return (this.old_data) ? (false) : (true);
	},
	/**
	 * Returns true if data has loaded from database
	 */
	isUpdate: function()
	{
		return (this.old_data) ? (true) : (false);
	},
	/**
	 * Returns true if model is changed
	 */
	isChanged: function()
	{
		var d1 = this.old_data;
		var d2 = this.new_data;
		if (d1 == null)
		{
			return true;
		}
		if (d2 == null)
		{
			return true;
		}
		var d1_keys = d1.keys();
		var d2_keys = d2.keys();
		for (var i = 0; i < d1_keys.count(); i++)
		{
			var key1 = d1_keys.get(i);
			if (!d2.has(key1))
			{
				return true;
			}
			var value1 = d1.get(key1);
			var value2 = d2.get(key1);
			if (value1 != value2)
			{
				return true;
			}
		}
		for (var i = 0; i < d2_keys.count(); i++)
		{
			var key2 = d2_keys.get(i);
			if (!d1.has(key2))
			{
				return true;
			}
		}
		return false;
	},
	/**
	 * Save model
	 */
	save: async function(conn, params)
	{
		if (params == undefined) params = null;
		var table_name = this.constructor.getTableName();
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		/* Call before save */
		await Runtime.rtl.getContext().callHookAsync(Runtime.ORM.DatabaseSchema.SAVE_BEFORE, Runtime.Map.from({"item":this}));
		var is_update = this.isUpdate();
		var updated_data = this.getUpdatedData();
		if (is_update)
		{
			var updated_data_keys = updated_data.keys();
			if (updated_data_keys.count() > 0)
			{
				var filter = provider.getPrimaryFilter(table_name, this.old_data, false);
				if (filter.count() > 0)
				{
					var db_updated_data = await provider.toDatabase(table_name, conn, updated_data, is_update);
					await conn.update(table_name, filter, db_updated_data, params);
				}
				else
				{
					throw new Runtime.Exceptions.RuntimeException("Primary key does not exists in " + Runtime.rtl.toStr(table_name))
				}
				for (var i = 0; i < updated_data_keys.count(); i++)
				{
					var field_name = Runtime.rtl.attr(updated_data_keys, i);
					this.old_data.set(field_name, Runtime.rtl.attr(updated_data, field_name));
				}
			}
		}
		else
		{
			var db_updated_data = provider.toDatabase(table_name, conn, updated_data, is_update);
			var last_id = await conn.insert(table_name, db_updated_data, true, params);
			this._initData(this.new_data);
			var auto_increment = provider.getAutoIncrement(table_name);
			if (auto_increment && auto_increment.name)
			{
				this.old_data.set(auto_increment.name, last_id);
				this.new_data.set(auto_increment.name, last_id);
			}
		}
		/* Call before after */
		await Runtime.rtl.getContext().callHookAsync(Runtime.ORM.DatabaseSchema.SAVE_AFTER, Runtime.Map.from({"item":this}));
	},
	/**
	 * Delete model
	 */
	delete: async function(conn, params)
	{
		if (params == undefined) params = null;
		if (this.isNew())
		{
			return Promise.resolve();
		}
		/* Get provider */
		var table_name = this.constructor.getTableName();
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		/* Get primary filter */
		var filter = provider.getPrimaryFilter(table_name, this.old_data, false);
		/* Delete record */
		if (filter.count() > 0)
		{
			await conn.delete(table_name, filter, params);
		}
		else
		{
			throw new Runtime.Exceptions.RuntimeException("Primary key does not exists in " + Runtime.rtl.toStr(table_name))
		}
		return Promise.resolve(this);
	},
	/**
	 * Refresh model from database
	 */
	refresh: async function(conn, params)
	{
		if (params == undefined) params = null;
		var table_name = this.constructor.getTableName();
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		var item = null;
		var filter = provider.getPrimaryFilter(table_name, this.old_data, false);
		if (filter.count() > 0)
		{
			var q = (new Runtime.ORM.Query()).select(Runtime.Vector.from([table_name + Runtime.rtl.toStr(".*")])).from(table_name).setFilter(filter).limit(1);
			item = await conn.fetchOne(q, params);
		}
		if (item)
		{
			this._initData(item.toDict());
		}
		return Promise.resolve(this);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.old_data = null;
		this.new_data = new Runtime.Map();
	},
});
Object.assign(Runtime.ORM.Relation, Runtime.BaseObject);
Object.assign(Runtime.ORM.Relation,
{
	/**
	 * Returns table name
	 */
	getTableName: function()
	{
		return "";
	},
	/**
     * Returns table schema
     */
	schema: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.ORM.Relation.schema", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = "";
		Runtime.rtl._memorizeSave("Runtime.ORM.Relation.schema", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Create Instance of class
	 */
	newInstance: function(class_name, data)
	{
		if (data == undefined) data = null;
		if (class_name == "")
		{
			throw new Runtime.Exceptions.RuntimeException("Class name does not exists")
		}
		var instance = Runtime.rtl.newInstance(class_name);
		instance._initData(data);
		return instance;
	},
	/**
	 * Returns table annotations
	 */
	getAnotations: function()
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return provider.getAnotations(this.getTableName());
	},
	/**
	 * To database
	 */
	toDatabase: async function(conn, data, is_update)
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return Promise.resolve(await provider.toDatabase(this.getTableName(), conn, data, is_update));
	},
	/**
	 * From database
	 */
	fromDatabase: function(conn, data)
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return provider.fromDatabase(this.getTableName(), conn, data);
	},
	/**
	 * Returns true if primary key is auto increment
	 */
	getAutoIncrement: function()
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return provider.getAutoIncrement(this.getTableName());
	},
	/**
	 * Returns primary key names of table
	 */
	getPrimaryKeyNames: function()
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return provider.getPrimaryKeyNames(this.getTableName());
	},
	/**
	 * Returns primary data
	 */
	getPrimaryFromData: function(data)
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return provider.getPrimaryFromData(this.getTableName(), data);
	},
	/**
	 * Returns primary filter by data
	 */
	getPrimaryFilter: function(data, use_full_key)
	{
		if (use_full_key == undefined) use_full_key = true;
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return provider.getPrimaryFilter(this.getTableName(), data, use_full_key);
	},
	/**
	 * Returns query
	 */
	query: function()
	{
		return (new Runtime.ORM.Query()).relation(this.getClassName());
	},
	/**
	 * Returns select query
	 */
	select: function()
	{
		return (new Runtime.ORM.Query()).relation(this.getClassName()).select(Runtime.Vector.from([this.getTableName() + Runtime.rtl.toStr(".*")]));
	},
	/**
	 * Find relations by filter
	 */
	findItems: async function(conn, filter, params)
	{
		if (params == undefined) params = null;
		var table_name = this.getTableName();
		var q = this.query().select(Runtime.Vector.from([table_name + Runtime.rtl.toStr(".*")])).setFilter(filter);
		return Promise.resolve(await conn.findRelations(q, params));
	},
	/**
	 * Find relation by filter
	 */
	findByFilter: async function(conn, filter, params)
	{
		if (params == undefined) params = null;
		var table_name = this.getTableName();
		var q = this.query().select(Runtime.Vector.from([table_name + Runtime.rtl.toStr(".*")])).setFilter(filter).limit(1);
		return Promise.resolve(await conn.findRelation(q, params));
	},
	/**
	 * Find relation by primary key
	 */
	findByPk: async function(conn, pk, params)
	{
		if (params == undefined) params = null;
		/* Returns primary filter */
		var filter = this.getPrimaryFilter(pk, false);
		/* Find relation */
		return Promise.resolve(await this.findByFilter(conn, filter, params));
	},
	/**
	 * Find relation by object
	 */
	findById: async function(conn, id, params)
	{
		if (params == undefined) params = null;
		/* Get primary keys */
		var pk = this.getPrimaryKeyNames();
		var pk_name = pk.get(0);
		/* Build filter */
		var filter = Runtime.Vector.from([new Runtime.ORM.QueryFilter(pk_name, "=", id)]);
		/* Find relation */
		return Promise.resolve(await this.findByFilter(conn, filter, params));
	},
	/**
	 * Find or create
	 */
	findOrCreate: async function(conn, filter, update, params)
	{
		if (params == undefined) params = null;
		var class_name = this.getClassName();
		/* Build filter */
		var search = filter.transition((value, key) =>
		{
			return new Runtime.ORM.QueryFilter(key, "=", value);
		});
		/* Find item */
		var relation = await this.findByFilter(conn, search, params);
		if (relation)
		{
			return Promise.resolve(relation);
		}
		/* Create if not found */
		relation = Runtime.ORM.Relation.newInstance(class_name);
		/* Set new data */
		relation.setData(filter);
		relation.setData(update);
		return Promise.resolve(relation);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Relation";
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
		Runtime.MapInterface,
	],
});
Runtime.rtl.defClass(Runtime.ORM.Relation);
window["Runtime.ORM.Relation"] = Runtime.ORM.Relation;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Relation;