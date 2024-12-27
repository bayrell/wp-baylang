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
Runtime.ORM.Relation = function(table_name)
{
	Runtime.BaseObject.call(this);
	if (table_name == "")
	{
		throw new Runtime.Exceptions.RuntimeException("Table name is empty")
	}
	this.table_name = table_name;
};
Runtime.ORM.Relation.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.Relation.prototype.constructor = Runtime.ORM.Relation;
Object.assign(Runtime.ORM.Relation.prototype,
{
	/**
	 * Returns table name
	 */
	getTableName: function()
	{
		return this.table_name;
	},
	/**
	 * Convert to model
	 */
	toModel: function(class_name)
	{
		return Runtime.rtl.newInstance(class_name, Runtime.Vector.from([this.toMap()]));
	},
	/**
	 * Convert to Dict
	 */
	all: function()
	{
		return this.new_data.clone();
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
		return this.constructor.getPrimaryFromData(this.table_name, this.new_data);
	},
	/**
	 * Returns primary key
	 */
	pk: function()
	{
		return this.constructor.getPrimaryFromData(this.table_name, this.new_data);
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
	 * Set new data
	 */
	_setNewData: function(data)
	{
		if (data == undefined) data = null;
		this.old_data = (data != null) ? (new Runtime.Map(data)) : (null);
		this.new_data = (data != null) ? (new Runtime.Map(data)) : (new Runtime.Map());
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
	 * Update data
	 */
	updateData: async function(item)
	{
		item.each((value, key) =>
		{
			this.set(key, value);
		});
	},
	/**
	 * Save model
	 */
	save: async function(conn, params)
	{
		if (params == undefined) params = null;
		/* Call before save */
		await Runtime.rtl.getContext().callHookAsync(Runtime.ORM.DatabaseSchema.SAVE_BEFORE, Runtime.Map.from({"item":this}));
		var is_update = this.isUpdate();
		var updated_data = this.getUpdatedData();
		if (is_update)
		{
			var updated_data_keys = updated_data.keys();
			if (updated_data_keys.count() > 0)
			{
				var filter = this.constructor.getPrimaryFilter(this.table_name, this.old_data, false);
				if (filter.count() > 0)
				{
					var db_updated_data = this.constructor.toDatabase(this.table_name, conn, updated_data, is_update);
					await conn.update(this.table_name, filter, db_updated_data, params);
				}
				else
				{
					throw new Runtime.Exceptions.RuntimeException("Primary key does not exists in " + Runtime.rtl.toStr(this.table_name))
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
			var db_updated_data = this.constructor.toDatabase(this.table_name, conn, updated_data, is_update);
			var last_id = await conn.insert(this.table_name, db_updated_data, true, params);
			this._setNewData(this.new_data);
			var auto_increment = this.constructor.getAutoIncrement(this.table_name);
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
		var filter = this.constructor.getPrimaryFilter(this.table_name, this.old_data, false);
		if (filter.count() > 0)
		{
			await conn.delete(this.table_name, filter, params);
		}
		else
		{
			throw new Runtime.Exceptions.RuntimeException("Primary key does not exists in " + Runtime.rtl.toStr(this.table_name))
		}
		return Promise.resolve(this);
	},
	/**
	 * Refresh model from database
	 */
	refresh: async function(conn, params)
	{
		if (params == undefined) params = null;
		var item = null;
		var filter = this.constructor.getPrimaryFilter(this.table_name, this.old_data, false);
		if (filter.count() > 0)
		{
			var q = (new Runtime.ORM.Query()).select(Runtime.Vector.from([this.table_name + Runtime.rtl.toStr(".*")])).from(this.table_name).setFilter(filter).limit(1);
			item = await conn.fetchOne(q, params);
		}
		if (item)
		{
			this._setNewData(item.toDict());
		}
		return Promise.resolve(this);
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
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.table_name = "";
		this.old_data = null;
		this.new_data = new Runtime.Map();
	},
});
Object.assign(Runtime.ORM.Relation, Runtime.BaseObject);
Object.assign(Runtime.ORM.Relation,
{
	/**
	 * Create Instance of class
	 */
	newInstance: function(table_name, data)
	{
		if (data == undefined) data = null;
		var instance = Runtime.rtl.newInstance(this.getClassName(), Runtime.Vector.from([table_name]));
		instance._setNewData(data);
		return instance;
	},
	/**
	 * Returns table annotations
	 */
	getAnotations: function(table_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.ORM.Relation.getAnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		var __memorize_value = provider.getAnotations(table_name);
		Runtime.rtl._memorizeSave("Runtime.ORM.Relation.getAnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * To database
	 */
	toDatabase: function(table_name, conn, data, is_update)
	{
		if (data == null)
		{
			return null;
		}
		var annotations = this.getAnotations(table_name);
		for (var i = 0; i < annotations.count(); i++)
		{
			var annotation = Runtime.rtl.attr(annotations, i);
			if (annotation instanceof Runtime.ORM.Annotations.BaseType)
			{
				data = annotation.toDatabase(conn, data, is_update);
			}
		}
		return data;
	},
	/**
	 * From database
	 */
	fromDatabase: function(table_name, conn, data)
	{
		if (data == null)
		{
			return null;
		}
		var annotations = this.getAnotations(table_name);
		for (var i = 0; i < annotations.count(); i++)
		{
			var annotation = Runtime.rtl.attr(annotations, i);
			if (annotation instanceof Runtime.ORM.Annotations.BaseType)
			{
				data = annotation.fromDatabase(conn, data);
			}
		}
		return data;
	},
	/**
	 * Returns true if primary key is auto increment
	 */
	getAutoIncrement: function(table_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.ORM.Relation.getAutoIncrement", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var annotations = this.getAnotations(table_name);
		var annotation = annotations.findItem(Runtime.lib.isInstance("Runtime.ORM.Annotations.AutoIncrement"));
		var __memorize_value = annotation;
		Runtime.rtl._memorizeSave("Runtime.ORM.Relation.getAutoIncrement", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns primary keys of table
	 */
	getPrimaryKeys: function(table_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.ORM.Relation.getPrimaryKeys", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		/* Get primary annotation */
		var annotations = this.getAnotations(table_name);
		var primary = annotations.findItem(Runtime.lib.isInstance("Runtime.ORM.Annotations.Primary"));
		if (primary == null)
		{
			var __memorize_value = null;
			Runtime.rtl._memorizeSave("Runtime.ORM.Relation.getPrimaryKeys", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = primary.keys;
		Runtime.rtl._memorizeSave("Runtime.ORM.Relation.getPrimaryKeys", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns primary data
	 */
	getPrimaryFromData: function(table_name, data)
	{
		/* Get primary annotation */
		var primary_keys = this.getPrimaryKeys(table_name);
		/* Check if primary keys if exists */
		if (primary_keys == null)
		{
			throw new Runtime.Exceptions.ItemNotFound(table_name, "Primary keys")
		}
		/* Intersect values */
		return (data) ? (data.intersect(primary_keys, false)) : (Runtime.Map.from({}));
	},
	/**
	 * Returns primary filter by data
	 */
	getPrimaryFilter: function(table_name, data, use_alias)
	{
		if (use_alias == undefined) use_alias = true;
		var pk = this.getPrimaryFromData(table_name, data);
		var filter = pk.transition((value, key) =>
		{
			var item = new Runtime.ORM.QueryFilter();
			item.key = key;
			item.op = "=";
			item.value = value;
			if (use_alias)
			{
				item.key = table_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(key);
			}
			return item;
		});
		return filter;
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