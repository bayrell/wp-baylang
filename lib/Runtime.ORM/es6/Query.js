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
Runtime.ORM.Query = function()
{
	Runtime.BaseObject.call(this);
	this._provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
};
Runtime.ORM.Query.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.Query.prototype.constructor = Runtime.ORM.Query;
Object.assign(Runtime.ORM.Query.prototype,
{
	/**
	 * Copy query
	 */
	copy: function()
	{
		var q = new Runtime.ORM.Query();
		q._class_name_relation = this._class_name_relation;
		q._kind = this._kind;
		q._table_name = this._table_name;
		q._fields = this._fields.toVector();
		q._join = this._join.toVector();
		q._order = this._order.toVector();
		q._filter = this._filter.toVector();
		q._sql = this._sql;
		q._data = this._data.toMap();
		q._start = this._start;
		q._limit = this._limit;
		q._debug = this._debug;
		q._distinct = this._distinct;
		q._calc_found_rows = this._calc_found_rows;
		q._db_params = this._db_params;
		q._provider = this._provider;
		return q;
	},
	/**
	 * Setup db params
	 */
	setDatabaseParams: function(db_params)
	{
		if (db_params == undefined) db_params = null;
		this._db_params = db_params;
		return this;
	},
	/**
	 * Calc found rows
	 */
	raw: function(sql, data)
	{
		this._kind = this.constructor.QUERY_RAW;
		this._sql = sql;
		this._data = data.toMap();
		return this;
	},
	/**
	 * Calc found rows
	 */
	calcFoundRows: function(value)
	{
		if (value == undefined) value = true;
		this._calc_found_rows = value;
		return this;
	},
	/**
	 * Set distinct
	 */
	distinct: function(value)
	{
		if (value == undefined) value = true;
		this._distinct = value;
		return this;
	},
	/**
	 * Set debug log
	 */
	debug: function(value)
	{
		if (value == undefined) value = true;
		this._debug = value;
		return this;
	},
	/**
	 * Select query
	 */
	select: function(fields)
	{
		if (fields == undefined) fields = null;
		this._kind = this.constructor.QUERY_SELECT;
		if (fields)
		{
			this.fields(fields);
		}
		return this;
	},
	/**
	 * Set table
	 */
	table: function(table_name)
	{
		if (table_name == undefined) table_name = "";
		this._table_name = (table_name != "") ? (table_name) : (this._table_name);
		return this;
	},
	/**
	 * Set table
	 */
	from: function(table_name)
	{
		if (table_name == undefined) table_name = "";
		this._table_name = (table_name != "") ? (table_name) : (this._table_name);
		return this;
	},
	/**
	 * Insert query
	 */
	insert: function(table_name)
	{
		if (table_name == undefined) table_name = "";
		this._kind = this.constructor.QUERY_INSERT;
		this._table_name = (table_name != "") ? (table_name) : (this._table_name);
		return this;
	},
	/**
	 * Select query
	 */
	update: function(table_name)
	{
		if (table_name == undefined) table_name = "";
		this._kind = this.constructor.QUERY_UPDATE;
		this._table_name = (table_name != "") ? (table_name) : (this._table_name);
		return this;
	},
	/**
	 * Delete query
	 */
	delete: function(table_name)
	{
		if (table_name == undefined) table_name = "";
		this._kind = this.constructor.QUERY_DELETE;
		this._table_name = (table_name != "") ? (table_name) : (this._table_name);
		return this;
	},
	/**
	 * Set kind
	 */
	kind: function(kind)
	{
		this._kind = kind;
		return this;
	},
	/**
	 * Clear fields
	 */
	clearFields: function()
	{
		this._fields = new Runtime.Vector();
		return this;
	},
	/**
	 * Set fields
	 */
	fields: function(fields)
	{
		this._fields = new Runtime.Vector();
		for (var i = 0; i < fields.count(); i++)
		{
			var field_name = Runtime.rtl.attr(fields, i);
			this.addField(field_name);
		}
		return this;
	},
	/**
	 * Add table fields
	 */
	addTableFields: function(table_name)
	{
		var annotations = this._provider.getAnotations(table_name);
		for (var i = 0; i < annotations.count(); i++)
		{
			var annotation = Runtime.rtl.attr(annotations, i);
			if (annotation instanceof Runtime.ORM.Annotations.BaseType)
			{
				var field = new Runtime.ORM.QueryField();
				field.annotation = annotation;
				field.field_name = annotation.name;
				field.table_name = table_name;
				this._fields.append(field);
			}
		}
	},
	/**
	 * Add field
	 */
	addField: function(field_name)
	{
		if (field_name instanceof Runtime.ORM.QueryField || field_name instanceof Runtime.ORM.QueryFilter)
		{
			this._fields.append(field_name);
			return this;
		}
		field_name = Runtime.rs.trim(field_name);
		var res1 = Runtime.rs.split(" as ", field_name);
		var res2 = Runtime.rs.split(".", Runtime.rtl.attr(res1, 0));
		if (res2.count() > 1 && res2.get(1) == "*")
		{
			var table_name = res2.get(0);
			var annotations = this._provider.getAnotations(table_name);
			for (var i = 0; i < annotations.count(); i++)
			{
				var annotation = Runtime.rtl.attr(annotations, i);
				if (annotation instanceof Runtime.ORM.Annotations.BaseType)
				{
					var field = new Runtime.ORM.QueryField();
					field.annotation = annotation;
					field.field_name = annotation.name;
					field.table_name = table_name;
					this._fields.append(field);
				}
			}
		}
		else
		{
			var field = Runtime.ORM.QueryField.fromString(field_name);
			this._fields.append(field);
		}
		return this;
	},
	/**
	 * Add raw field
	 */
	addRawField: function(field_name)
	{
		this._fields.append(field_name);
		return this;
	},
	/**
	 * Add fields
	 */
	addFields: function(fields)
	{
		for (var i = 0; i < fields.count(); i++)
		{
			var field_name = Runtime.rtl.attr(fields, i);
			this.addField(field_name);
		}
		return this;
	},
	/**
	 * Set value
	 */
	value: function(key, value)
	{
		this._data.set(key, value);
		return this;
	},
	/**
	 * Set data
	 */
	values: function(data)
	{
		this._data = data.toMap();
		return this;
	},
	/**
	 * Set data
	 */
	data: function(data)
	{
		this._data = data.toMap();
		return this;
	},
	/**
	 * Add page
	 */
	page: function(page, limit)
	{
		if (limit == undefined) limit = null;
		var limit = (limit > 0) ? (limit) : (this._limit);
		var start = page * limit;
		if (start < 0)
		{
			start = 0;
		}
		this._start = start;
		this._limit = (limit > 0) ? (limit) : (this._limit);
		return this;
	},
	/**
	 * Set offset
	 */
	offset: function(start)
	{
		this._start = start;
		return this;
	},
	/**
	 * Set start
	 */
	start: function(start)
	{
		this._start = start;
		return this;
	},
	/**
	 * Set limit
	 */
	limit: function(limit)
	{
		this._limit = limit;
		return this;
	},
	/**
	 * Returns page
	 */
	getPage: function()
	{
		var limit = this._limit;
		var offset = this._start;
		if (limit <= 0)
		{
			return 0;
		}
		if (offset <= 0)
		{
			return 0;
		}
		return Runtime.Math.floor(offset / limit);
	},
	/**
	 * Returns pages
	 */
	getPages: function(rows)
	{
		var limit = this._limit;
		if (limit <= 0)
		{
			return 0;
		}
		return (rows > 0) ? (Runtime.Math.floor((rows - 1) / limit) + 1) : (0);
	},
	/**
	 * Clear order
	 */
	clearOrder: function()
	{
		this._order = new Runtime.Vector();
		return this;
	},
	/**
	 * Set order
	 */
	orderBy: function(name, sort)
	{
		this._order.append(Runtime.Vector.from([name,sort]));
		return this;
	},
	/**
	 * Add where
	 */
	where: function(key, op, value)
	{
		var filter = new Runtime.ORM.QueryFilter();
		filter.key = key;
		filter.op = op;
		filter.value = value;
		this._filter.append(filter);
		return this;
	},
	/**
	 * Add filter
	 */
	setFilter: function(filter)
	{
		this._filter = filter.toVector();
		return this;
	},
	/**
	 * Add filter
	 */
	addFilter: function(filter)
	{
		if (filter instanceof Runtime.ORM.QueryFilter)
		{
			this._filter.append(filter);
		}
		else if (filter instanceof Runtime.Collection)
		{
			this._filter.appendItems(filter);
		}
		return this;
	},
	/**
	 * Add or filter
	 */
	addOrFilter: function(filter)
	{
		this._filter.append(Runtime.Vector.from(["$or",null,filter]));
		return this;
	},
	/**
	 * Clear filter
	 */
	clearFilter: function()
	{
		this._filter = Runtime.Vector.from([]);
		return this;
	},
	/**
	 * Inner join
	 */
	innerJoin: function(table_name, filter, alias_name)
	{
		if (alias_name == undefined) alias_name = "";
		if (alias_name == "")
		{
			alias_name = table_name;
		}
		this._join.append(Runtime.Map.from({"kind":"join","alias_name":alias_name,"table_name":table_name,"filter":filter}));
		return this;
	},
	/**
	 * Left join
	 */
	leftJoin: function(table_name, filter, alias_name)
	{
		if (alias_name == undefined) alias_name = "";
		if (alias_name == "")
		{
			alias_name = table_name;
		}
		this._join.append(Runtime.Map.from({"kind":"left","alias_name":alias_name,"table_name":table_name,"filter":filter}));
		return this;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this._class_name_relation = "";
		this._kind = "";
		this._table_name = "";
		this._fields = new Runtime.Vector();
		this._join = new Runtime.Vector();
		this._order = new Runtime.Vector();
		this._filter = new Runtime.Vector();
		this._sql = "";
		this._data = new Runtime.Map();
		this._start = 0;
		this._limit = -1;
		this._debug = false;
		this._distinct = false;
		this._calc_found_rows = false;
		this._db_params = null;
		this._provider = null;
	},
});
Object.assign(Runtime.ORM.Query, Runtime.BaseObject);
Object.assign(Runtime.ORM.Query,
{
	QUERY_RAW: "raw",
	QUERY_SELECT: "select",
	QUERY_INSERT: "insert",
	QUERY_UPDATE: "update",
	QUERY_DELETE: "delete",
	QUERY_INSERT_OR_UPDATE: "insert_or_update",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Query";
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
Runtime.rtl.defClass(Runtime.ORM.Query);
window["Runtime.ORM.Query"] = Runtime.ORM.Query;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Query;