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
Runtime.ORM.Provider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.ORM.Provider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.ORM.Provider.prototype.constructor = Runtime.ORM.Provider;
Object.assign(Runtime.ORM.Provider.prototype,
{
	/**
	 * Returns connection
	 */
	getConnection: function(name)
	{
		if (!this.connection_list.has(name))
		{
			throw new Runtime.Exceptions.RuntimeException("Connection " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(" not found"))
		}
		return Runtime.rtl.attr(this.connection_list, name);
	},
	/**
	 * Add new connection
	 */
	addConnection: function(conn)
	{
		this.connection_list.set(conn.getName(), conn);
	},
	/**
	 * Returns relation name by table name
	 */
	getRelationName: function(table_name)
	{
		if (!this.tables.has(table_name))
		{
			return "";
		}
		return this.tables.get(table_name).get("class_name");
	},
	/**
	 * Returns table annotations
	 */
	getAnotations: function(table_name)
	{
		if (!this.tables.has(table_name))
		{
			return Runtime.Vector.from([]);
		}
		return this.tables.get(table_name).get("annotations");
	},
	/**
	 * To database
	 */
	toDatabase: async function(table_name, conn, data, is_update)
	{
		if (data == null)
		{
			return Promise.resolve(null);
		}
		var annotations = this.getAnotations(table_name);
		for (var i = 0; i < annotations.count(); i++)
		{
			var annotation = Runtime.rtl.attr(annotations, i);
			if (annotation instanceof Runtime.ORM.Annotations.BaseType)
			{
				data = await annotation.toDatabase(conn, data, is_update);
			}
		}
		return Promise.resolve(data);
	},
	/**
	 * From database
	 */
	fromDatabase: async function(table_name, conn, data)
	{
		if (data == null)
		{
			return Promise.resolve(null);
		}
		var annotations = this.getAnotations(table_name);
		for (var i = 0; i < annotations.count(); i++)
		{
			var annotation = Runtime.rtl.attr(annotations, i);
			if (annotation instanceof Runtime.ORM.Annotations.BaseType)
			{
				data = await annotation.fromDatabase(conn, data);
			}
		}
		return Promise.resolve(data);
	},
	/**
	 * Returns true if primary key is auto increment
	 */
	getAutoIncrement: function(table_name)
	{
		var annotations = this.getAnotations(table_name);
		var annotation = annotations.findItem(Runtime.lib.isInstance("Runtime.ORM.Annotations.AutoIncrement"));
		return annotation;
	},
	/**
	 * Returns primary key names of table
	 */
	getPrimaryKeyNames: function(table_name)
	{
		/* Get primary annotation */
		var annotations = this.getAnotations(table_name);
		var primary = annotations.findItem(Runtime.lib.isInstance("Runtime.ORM.Annotations.Primary"));
		if (primary == null)
		{
			return null;
		}
		return primary.keys;
	},
	/**
	 * Returns primary data
	 */
	getPrimaryFromData: function(table_name, data)
	{
		/* Get primary annotation */
		var primary_keys = this.getPrimaryKeyNames(table_name);
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
	getPrimaryFilter: function(table_name, data, use_full_key)
	{
		if (use_full_key == undefined) use_full_key = true;
		var pk = this.getPrimaryFromData(table_name, data);
		var filter = pk.transition((value, key) =>
		{
			var item = new Runtime.ORM.QueryFilter();
			item.key = key;
			item.op = "=";
			item.value = value;
			if (use_full_key)
			{
				item.key = table_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(key);
			}
			return item;
		});
		return filter;
	},
	/**
	 * Returns foreign_key by name
	 */
	getForeignKey: function(name)
	{
		if (!this.foreign_keys.has(name))
		{
			return null;
		}
		return this.foreign_keys.get(name);
	},
	/**
	 * Returns fields from table
	 */
	getFieldType: function(table_name, field_name)
	{
		var annotations = this.constructor.getAnotations(table_name);
		for (var i = 0; i < annotations.count(); i++)
		{
			var annotation = Runtime.rtl.attr(annotations, i);
			if (annotation instanceof Runtime.ORM.Annotations.BaseType)
			{
				if (annotation.name == field_name)
				{
					return annotation;
				}
			}
		}
		return null;
	},
	/**
	 * Add table
	 */
	addTable: function(table_name, class_name, rules)
	{
		for (var i = 0; i < rules.count(); i++)
		{
			var rule = rules.get(i);
			rule = Runtime.rtl.setAttr(rule, Runtime.Collection.from(["class_name"]), class_name);
			rule = Runtime.rtl.setAttr(rule, Runtime.Collection.from(["table_name"]), table_name);
			rules.set(i, rule);
		}
		this.tables.set(table_name, Runtime.Map.from({"annotations":rules.toCollection(),"class_name":class_name,"table_name":table_name}));
		for (var i = 0; i < rules.count(); i++)
		{
			var rule = rules.get(i);
			if (rule instanceof Runtime.ORM.Annotations.ForeignKey)
			{
				if (rule.name != "")
				{
					if (this.foreign_keys.has(rule.name))
					{
						throw new Runtime.Exceptions.RuntimeException("Duplicate foreign_key name")
					}
					this.foreign_keys.set(rule.name, rule);
				}
			}
		}
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
		await Runtime.BaseProvider.prototype.start.bind(this)();
		this.registerTables();
		this.registerConnections();
	},
	/**
	 * Register tables
	 */
	registerTables: function()
	{
		var items = Runtime.rtl.getContext().getEntities("Runtime.ORM.Annotations.Table");
		for (var i = 0; i < items.count(); i++)
		{
			var table = Runtime.rtl.attr(items, i);
			var class_name = table.name;
			var table_name = (new Runtime.Callback(class_name, "getTableName")).apply();
			/* Add schema */
			var rules = (new Runtime.Callback(class_name, "schema")).apply();
			this.addTable(table_name, class_name, rules);
		}
		/* Call register event */
		Runtime.rtl.getContext().callHookAsync(Runtime.ORM.DatabaseSchema.REGISTER, Runtime.Map.from({"item":this}));
	},
	/**
	 * Register connections
	 */
	registerConnections: function()
	{
		var items = Runtime.rtl.getContext().getEntities("Runtime.ORM.Factory.ConnectionFactory");
		for (var i = 0; i < items.count(); i++)
		{
			var factory = items.get(i);
			factory.registerConnections(this);
		}
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.foreign_keys = new Runtime.Map();
		this.connection_list = new Runtime.Map();
		this.tables = new Runtime.Map();
	},
});
Object.assign(Runtime.ORM.Provider, Runtime.BaseProvider);
Object.assign(Runtime.ORM.Provider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Provider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
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
Runtime.rtl.defClass(Runtime.ORM.Provider);
window["Runtime.ORM.Provider"] = Runtime.ORM.Provider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Provider;