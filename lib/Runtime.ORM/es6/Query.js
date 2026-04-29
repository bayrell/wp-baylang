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
Runtime.ORM.Query = class extends Runtime.BaseObject
{
	static QUERY_RAW = "raw";
	static QUERY_SELECT = "select";
	static QUERY_INSERT = "insert";
	static QUERY_UPDATE = "update";
	static QUERY_DELETE = "delete";
	static QUERY_INSERT_OR_UPDATE = "insert_or_update";
	
	
	/**
	 * Constructor
	 */
	constructor()
	{
		super();
		this._provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
	}
	
	
	/**
	 * Copy query
	 */
	copy()
	{
		let q = new Runtime.ORM.Query();
		q._kind = this._kind;
		q._table_name = this._table_name;
		q._table_alias = this._table_alias;
		q._fields = this._fields.slice();
		q._join = this._join.slice();
		q._order = this._order.slice();
		q._filter = this._filter.slice();
		q._group_by = this._group_by.slice();
		q._having = this._having.slice();
		q._sql = this._sql;
		q._data = this._data ? this._data.copy() : null;
		q._start = this._start;
		q._limit = this._limit;
		q._debug = this._debug;
		q._distinct = this._distinct;
		q._calc_found_rows = this._calc_found_rows;
		q._db_params = this._db_params;
		q._provider = this._provider;
		return q;
	}
	
	
	/**
	 * Setup db params
	 */
	setDatabaseParams(db_params)
	{
		if (db_params == undefined) db_params = null;
		this._db_params = db_params;
		return this;
	}
	
	
	/**
	 * Calc found rows
	 */
	raw(sql, data)
	{
		this._kind = this.constructor.QUERY_RAW;
		this._sql = sql;
		this._data = data ? data.toMap() : null;
		return this;
	}
	
	
	/**
	 * Calc found rows
	 */
	calcFoundRows(value)
	{
		if (value == undefined) value = true;
		this._calc_found_rows = value;
		return this;
	}
	
	
	/**
	 * Set distinct
	 */
	distinct(value)
	{
		if (value == undefined) value = true;
		this._distinct = value;
		return this;
	}
	
	
	/**
	 * Set debug log
	 */
	debug(value)
	{
		if (value == undefined) value = true;
		this._debug = value;
		return this;
	}
	
	
	/**
	 * Select query
	 */
	select(fields)
	{
		if (fields == undefined) fields = null;
		this._kind = this.constructor.QUERY_SELECT;
		if (fields) this.fields(fields);
		else this.fields(Runtime.Vector.create([this._table_name + String(".*")]));
		return this;
	}
	
	
	/**
	 * Set table
	 */
	table(table_name, alias_name)
	{
		if (table_name == undefined) table_name = "";
		if (alias_name == undefined) alias_name = "";
		this._table_name = table_name != "" ? table_name : this._table_name;
		this._table_alias = alias_name == "" ? this._table_name : alias_name;
		return this;
	}
	
	
	/**
	 * Set table
	 */
	from(table_name, alias_name)
	{
		if (table_name == undefined) table_name = "";
		if (alias_name == undefined) alias_name = "";
		this._table_name = table_name != "" ? table_name : this._table_name;
		this._table_alias = alias_name == "" ? this._table_name : alias_name;
		return this;
	}
	
	
	/**
	 * Insert query
	 */
	insert(table_name)
	{
		if (table_name == undefined) table_name = "";
		this._kind = this.constructor.QUERY_INSERT;
		this._table_name = table_name != "" ? table_name : this._table_name;
		return this;
	}
	
	
	/**
	 * Select query
	 */
	update(table_name)
	{
		if (table_name == undefined) table_name = "";
		this._kind = this.constructor.QUERY_UPDATE;
		this._table_name = table_name != "" ? table_name : this._table_name;
		return this;
	}
	
	
	/**
	 * Delete query
	 */
	delete(table_name)
	{
		if (table_name == undefined) table_name = "";
		this._kind = this.constructor.QUERY_DELETE;
		this._table_name = table_name != "" ? table_name : this._table_name;
		return this;
	}
	
	
	/**
	 * Set kind
	 */
	kind(kind)
	{
		this._kind = kind;
		return this;
	}
	
	
	/**
	 * Clear fields
	 */
	clearFields()
	{
		this._fields = new Runtime.Vector();
		return this;
	}
	
	
	/**
	 * Set fields
	 */
	fields(fields)
	{
		if (Runtime.rtl.isString(fields)) fields = Runtime.Vector.create([fields]);
		this._fields = new Runtime.Vector();
		for (let i = 0; i < fields.count(); i++)
		{
			let field_name = fields[i];
			this.addField(field_name);
		}
		return this;
	}
	
	
	/**
	 * Add table fields
	 */
	addTableFields(table_name)
	{
		let annotations = this._provider.getAnotations(table_name);
		if (!annotations) return this;
		for (let i = 0; i < annotations.count(); i++)
		{
			let annotation = annotations[i];
			if (annotation instanceof Runtime.ORM.Annotations.BaseType)
			{
				let field = new Runtime.ORM.QueryField();
				field.annotation = annotation;
				field.field_name = annotation.name;
				field.table_name = table_name;
				this._fields.append(field);
			}
		}
		return this;
	}
	
	
	/**
	 * Add field
	 */
	addField(field)
	{
		if (Runtime.rtl.isString(field))
		{
			/* Parse field */
			field = Runtime.rs.trim(field);
			field = Runtime.ORM.QueryField.fromString(field);
		}
		/* If field name is asterisk */
		if (field instanceof Runtime.ORM.QueryField && field.field_name == "*")
		{
			let table_name = field.table_name;
			if (table_name == "") return this;
			let annotations = this._provider.getAnotations(table_name);
			if (!annotations) return this;
			/* Add fields from annotation */
			for (let i = 0; i < annotations.count(); i++)
			{
				let annotation = annotations[i];
				if (annotation instanceof Runtime.ORM.Annotations.BaseType)
				{
					let field = new Runtime.ORM.QueryField();
					field.annotation = annotation;
					field.field_name = annotation.name;
					field.table_name = table_name;
					this._fields.push(field);
				}
			}
		}
		else
		{
			field.annotation = this._provider.getFieldType(field.table_name, field.field_name);
			this._fields.push(field);
		}
		return this;
	}
	
	
	/**
	 * Add raw field
	 */
	addRawField(field_name)
	{
		this._fields.push(field_name);
		return this;
	}
	
	
	/**
	 * Add fields
	 */
	addFields(fields)
	{
		for (let i = 0; i < fields.count(); i++)
		{
			let field_name = fields[i];
			this.addField(field_name);
		}
		return this;
	}
	
	
	/**
	 * Set value
	 */
	value(key, value)
	{
		this._data.set(key, value);
		return this;
	}
	
	
	/**
	 * Set data
	 */
	values(data)
	{
		this._data = data;
		return this;
	}
	
	
	/**
	 * Set data
	 */
	data(data)
	{
		this._data = data;
		return this;
	}
	
	
	/**
	 * Add page
	 */
	page(page, limit)
	{
		if (limit == undefined) limit = null;
		limit = limit > 0 ? limit : this._limit;
		let start = page * limit;
		if (start < 0) start = 0;
		this._start = start;
		this._limit = limit > 0 ? limit : this._limit;
		return this;
	}
	
	
	/**
	 * Set offset
	 */
	offset(start)
	{
		this._start = start;
		return this;
	}
	
	
	/**
	 * Set start
	 */
	start(start)
	{
		this._start = start;
		return this;
	}
	
	
	/**
	 * Set limit
	 */
	limit(limit)
	{
		this._limit = limit;
		return this;
	}
	
	
	/**
	 * Returns page
	 */
	getPage()
	{
		let limit = this._limit;
		let offset = this._start;
		if (limit <= 0) return 0;
		if (offset <= 0) return 0;
		return Runtime.rtl.floor(offset / limit);
	}
	
	
	/**
	 * Returns pages
	 */
	getPages(rows)
	{
		let limit = this._limit;
		if (limit <= 0) return 0;
		return rows > 0 ? Runtime.rtl.floor((rows - 1) / limit) + 1 : 0;
	}
	
	
	/**
	 * Clear order
	 */
	clearOrder()
	{
		this._order = new Runtime.Vector();
		return this;
	}
	
	
	/**
	 * Set order
	 */
	orderBy(name, sort)
	{
		this._order.push(Runtime.Vector.create([name, sort]));
		return this;
	}
	
	
	/**
	 * Add where
	 */
	where(key, op, value)
	{
		let filter = new Runtime.ORM.QueryFilter();
		filter.key = key;
		filter.op = op;
		filter.value = value;
		this._filter.push(filter);
		return this;
	}
	
	
	/**
	 * Add filter
	 */
	setFilter(filter)
	{
		this._filter = filter;
		return this;
	}
	
	
	/**
	 * Add filter
	 */
	addFilter(filter)
	{
		if (filter instanceof Runtime.Vector) this._filter.appendItems(filter);
		else this._filter.push(filter);
		return this;
	}
	
	
	/**
	 * Add or filter
	 */
	addOrFilter(filter)
	{
		this._filter.push(new Runtime.ORM.QueryFilter("$or", null, filter));
		return this;
	}
	
	
	/**
	 * Clear filter
	 */
	clearFilter()
	{
		this._filter = Runtime.Vector.create([]);
		return this;
	}
	
	
	/**
	 * Clear group by
	 */
	clearGroupBy()
	{
		this._group_by = new Runtime.Vector();
		return this;
	}
	
	
	/**
	 * Add group by
	 */
	groupBy(field)
	{
		this._group_by.push(field);
		return this;
	}
	
	
	/**
	 * Add group by fields
	 */
	addGroupBy(fields)
	{
		for (let i = 0; i < fields.count(); i++)
		{
			let field_name = fields[i];
			this._group_by.push(field_name);
		}
		return this;
	}
	
	
	/**
	 * Clear having
	 */
	clearHaving()
	{
		this._having = new Runtime.Vector();
		return this;
	}
	
	
	/**
	 * Add having
	 */
	having(key, op, value)
	{
		let filter = new Runtime.ORM.QueryFilter();
		filter.key = key;
		filter.op = op;
		filter.value = value;
		this._having.push(filter);
		return this;
	}
	
	
	/**
	 * Inner join
	 */
	innerJoin(table_name, filter, alias_name)
	{
		if (alias_name == undefined) alias_name = "";
		if (alias_name == "") alias_name = table_name;
		this._join.push(Runtime.Map.create({
			"kind": "join",
			"alias_name": alias_name,
			"table_name": table_name,
			"filter": filter,
		}));
		return this;
	}
	
	
	/**
	 * Left join
	 */
	leftJoin(table_name, filter, alias_name)
	{
		if (alias_name == undefined) alias_name = "";
		if (alias_name == "") alias_name = table_name;
		this._join.push(Runtime.Map.create({
			"kind": "left",
			"alias_name": alias_name,
			"table_name": table_name,
			"filter": filter,
		}));
		return this;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this._kind = "";
		this._table_name = "";
		this._table_alias = "";
		this._fields = new Runtime.Vector();
		this._join = new Runtime.Vector();
		this._order = new Runtime.Vector();
		this._filter = new Runtime.Vector();
		this._group_by = new Runtime.Vector();
		this._having = new Runtime.Vector();
		this._sql = "";
		this._data = new Runtime.Map();
		this._start = 0;
		this._limit = -1;
		this._debug = false;
		this._distinct = false;
		this._calc_found_rows = false;
		this._db_params = null;
		this._provider = null;
	}
	static getClassName(){ return "Runtime.ORM.Query"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.Query"] = Runtime.ORM.Query;