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
	 * Returns table annotations
	 */
	getAnotations: function(table_name)
	{
		if (!this.tables.has(table_name))
		{
			return Runtime.Vector.from([]);
		}
		return Runtime.rtl.attr(this.tables, [table_name, "annotations"]);
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
	addTable: function(table, rules)
	{
		var table_name = table.name;
		for (var i = 0; i < rules.count(); i++)
		{
			var rule = rules.get(i);
			rule = Runtime.rtl.setAttr(rule, Runtime.Collection.from(["table_name_source"]), table_name);
			rules.set(i, rule);
		}
		this.tables.set(table_name, Runtime.Map.from({"annotations":rules.toCollection(),"table":table}));
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
		var items = Runtime.rtl.getContext().getEntities("Runtime.ORM.Annotations.Database");
		for (var i = 0; i < items.count(); i++)
		{
			var db = Runtime.rtl.attr(items, i);
			var class_name = db.name;
			var getMethodsList = new Runtime.Callback(class_name, "getMethodsList");
			var getMethodInfoByName = new Runtime.Callback(class_name, "getMethodInfoByName");
			var methods = Runtime.rtl.apply(getMethodsList);
			for (var j = 0; j < methods.count(); j++)
			{
				var method_name = Runtime.rtl.attr(methods, j);
				var info = Runtime.rtl.apply(getMethodInfoByName, Runtime.Vector.from([method_name]));
				/* Get methods annotations */
				var annotations = info.get("annotations");
				if (annotations)
				{
					var table = annotations.findItem(Runtime.lib.isInstance("Runtime.ORM.Annotations.Table"));
					if (table)
					{
						var rules = Runtime.rtl.apply(new Runtime.Callback(class_name, method_name));
						this.addTable(table, rules);
					}
				}
			}
		}
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