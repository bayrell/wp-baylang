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
if (typeof Runtime.ORM.MySQL == 'undefined') Runtime.ORM.MySQL = {};
Runtime.ORM.MySQL.SQLBuilder = class extends Runtime.BaseObject
{
	/**
	 * Constructor
	 */
	constructor(conn, q)
	{
		super();
		this.conn = conn;
		this.q = q;
	}
	
	
	/**
	 * Returns sql
	 */
	getSQL(){ return this.sql; }
	
	
	/**
	 * Returns data
	 */
	getData(){ return this.data; }
	
	
	/**
	 * Returns true if builder is correct
	 */
	isValid(){ return this.sql != null; }
	
	
	/**
	 * Format sql
	 */
	formatSQL()
	{
		let sql = this.sql;
		let data = this.data;
		if (data == null) return sql;
		data.each((value, key) =>
		{
			if (value === null)
			{
				sql = Runtime.rs.replace(this.formatKey(key), "null", sql);
			}
			else
			{
				if (!Runtime.rtl.isInteger(value))
				{
					value = this.quote(value);
				}
				sql = Runtime.rs.replace(this.formatKey(key), value, sql);
			}
		});
		return sql;
	}
	
	
	/**
	 * Format key
	 */
	formatKey(key){ return ":" + String(key); }
	
	
	/**
	 * Prepare field
	 */
	prepareField(item)
	{
		if (Runtime.rs.charAt(item, 0) == "@") return Runtime.rs.substr(item, 1);
		let res1 = Runtime.rs.split(",", item);
		res1 = res1.map((s) => { return Runtime.rs.trim(s); });
		res1 = res1.map((s) =>
		{
			let res2 = Runtime.rs.split(".", s);
			res2 = res2.map((name) => { return "`" + String(name) + String("`"); });
			return Runtime.rs.join(".", res2);
		});
		return Runtime.rs.join(",", res1);
	}
	
	
	/**
	 * Prepare value
	 */
	prepareValue(item, op)
	{
		if (op == "%like%")
		{
			item = "%" + String(item) + String("%");
			op = "like";
		}
		else if (op == "like%")
		{
			item = item + String("%");
			op = "like";
		}
		else if (op == "%like")
		{
			item = "%" + String(item);
			op = "like";
		}
		return Runtime.Vector.create([item, op]);
	}
	
	
	/**
	 * Quote
	 */
	quote(value)
	{
		return value;
	}
	
	
	/**
	 * Returns table name
	 */
	getTableName()
	{
		if (Runtime.rs.substr(this.q._table_name, 0, 1) != "`")
		{
			return "`" + String(this.conn.pool.params.get("prefix")) + String(this.q._table_name) + String("`");
		}
		return this.q._table_name;
	}
	
	
	/**
	 * Returns table annotations
	 */
	getAnotations()
	{
		let provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return provider.getAnotations(this.q._table_name);
	}
	
	
	/**
	 * Find annotation
	 */
	findAnnotation(key)
	{
		return this.annotations.find((annotation) =>
		{
			return annotation instanceof Runtime.ORM.Annotations.BaseType && annotation.name == key;
		});
	}
	
	
	/**
	 * Wrap key
	 */
	wrapKey(key, value)
	{
		let annotation = this.findAnnotation(key);
		if (annotation instanceof Runtime.ORM.Annotations.EmbeddingType)
		{
			return "VEC_FromText(" + String(value) + String(")");
		}
		return value;
	}
	
	
	/**
	 * Returns query sql
	 */
	build()
	{
		if (this.q == null) return this;
		let q = this.q;
		this.annotations = this.getAnotations();
		/* Select query */
		if (q._kind == Runtime.ORM.Query.QUERY_SELECT)
		{
			let data = q._data.copy();
			let sql = "SELECT ";
			let field_index = 0;
			/* Add distinct */
			if (q._distinct != "") sql += " DISTINCT ";
			/* Add fields */
			if (q._fields != null)
			{
				let fields = q._fields.map((item) =>
				{
					let field_name = "";
					if (item instanceof Runtime.ORM.QueryField)
					{
						let table_name = item.table_name;
						if (table_name == "") table_name = q._table_name;
						field_name = "`" + String(table_name) + String("`.`") + String(item.field_name) + String("`");
						if (item.alias_name != "")
						{
							field_name += " as `" + String(item.alias_name) + String("`");
						}
					}
					else if (item instanceof Runtime.ORM.QueryFilter)
					{
						let res = this.convertFilterItem(item, data, field_index);
						field_name = res[0];
						field_index = res[1];
						if (item.alias != "")
						{
							field_name += " as `" + String(item.alias) + String("`");
						}
					}
					else if (Runtime.rtl.isFunction(item))
					{
						return item(this);
					}
					else
					{
						field_name = item;
					}
					return field_name;
				});
				sql += Runtime.rs.join(", ", fields);
			}
			else sql += " * ";
			/* New line */
			sql += "\n";
			/* Add table name */
			sql += " FROM " + String(this.getTableName()) + String(" AS `") + String(q._table_alias) + String("`");
			/* New line */
			sql += "\n";
			/* Add joins */
			if (q._join != null && q._join.count() > 0)
			{
				for (let i = 0; i < q._join.count(); i++)
				{
					let join = q._join[i];
					let kind = join.get("kind");
					let table_name = join.get("table_name");
					let alias_name = join.get("alias_name");
					let where = join.get("filter");
					if (where instanceof Runtime.Vector)
					{
						let res = this.convertFilter(where, data, field_index);
						where = res[0];
						field_index = res[1];
					}
					if (kind == "left") sql += " LEFT JOIN ";
					else sql += " INNER JOIN ";
					sql += "`" + String(this.conn.pool.params.get("prefix")) + String(table_name) + String("`");
					if (alias_name != "") sql += " AS `" + String(alias_name) + String("`");
					sql += " ON (" + String(where) + String(")");
					/* New line */
					sql += "\n";
				}
			}
			/* Add where */
			if (q._filter != null && q._filter.count() > 0)
			{
				let res = this.convertFilter(q._filter, data, field_index);
				let where = res[0];
				field_index = res[1];
				if (where != "") sql += " WHERE " + String(where);
				/* New line */
				sql += "\n";
			}
			/* Add group by */
			if (q._group_by != null && q._group_by.count() > 0)
			{
				let group_by = q._group_by.map((field) => { return this.prepareField(field); });
				sql += " GROUP BY " + String(Runtime.rs.join(",", group_by));
				/* New line */
				sql += "\n";
			}
			/* Add having */
			if (q._having != null && q._having.count() > 0)
			{
				let res = this.convertFilter(q._having, data, field_index);
				let having_str = res[0];
				field_index = res[1];
				if (having_str != "") sql += " HAVING " + String(having_str);
				/* New line */
				sql += "\n";
			}
			/* Add order */
			if (q._order != null && q._order.count() > 0)
			{
				let order = q._order.map((item) => { return this.prepareField(item[0]) + String(" ") + String(item[1]); });
				sql += " ORDER BY " + String(Runtime.rs.join(",", order));
				/* New line */
				sql += "\n";
			}
			/* Add order */
			if (q._limit >= 0) sql += " LIMIT " + String(q._limit);
			if (q._limit >= 0 && q._start >= 0) sql += " OFFSET " + String(q._start);
			this.sql = sql;
			this.data = data;
		}
		else if (q._kind == Runtime.ORM.Query.QUERY_INSERT)
		{
			let keys = new Runtime.Vector();
			let values = new Runtime.Vector();
			if (q._data)
			{
				q._data.each((value, key) =>
				{
					keys.push("`" + String(key) + String("`"));
					values.push(this.wrapKey(key, this.formatKey(key)));
				});
			}
			/* Build sql */
			this.sql = "INSERT INTO " + String(this.getTableName()) + String(" (") + String(Runtime.rs.join(",", keys)) + String(") VALUES (") + String(Runtime.rs.join(",", values)) + String(")");
			this.data = q._data.copy();
		}
		else if (q._kind == Runtime.ORM.Query.QUERY_UPDATE)
		{
			let update_arr = new Runtime.Vector();
			let values = new Runtime.Vector();
			let data = new Runtime.Map();
			/* Build update */
			if (q._data)
			{
				q._data.each((value, key) =>
				{
					let field_key = "update_" + String(key);
					let field_name = this.prepareField(key);
					update_arr.push(field_name + String(" = ") + String(this.wrapKey(key, this.formatKey(field_key))));
					data.set(field_key, value);
				});
			}
			/* Build where */
			let res = this.convertFilter(q._filter, data);
			let where_str = res[0];
			/* Build sql */
			this.sql = "UPDATE " + String(this.getTableName()) + String(" SET ") + String(Runtime.rs.join(", ", update_arr)) + String(" WHERE ") + String(where_str);
			this.data = data;
		}
		else if (q._kind == Runtime.ORM.Query.QUERY_DELETE)
		{
			/* Build where */
			let data = new Runtime.Map();
			let res = this.convertFilter(q._filter, data);
			let where_str = res[0];
			/* Delete item */
			this.sql = "DELETE FROM " + String(this.getTableName()) + String(" WHERE ") + String(where_str);
			this.data = data;
		}
		else if (q._kind == Runtime.ORM.Query.QUERY_RAW)
		{
			this.sql = q._sql;
			this.data = q._data;
		}
		return this;
	}
	
	
	/**
	 * Convert filter
	 */
	convertFilterItem(item, data, field_index)
	{
		if (field_index == undefined) field_index = 0;
		if (Runtime.rtl.isString(item))
		{
			return Runtime.Vector.create([item, field_index]);
		}
		let allow_operations = Runtime.Vector.create([
			"=",
			"!=",
			">=",
			"<=",
			"<",
			">",
			"like",
			"%like%",
			"like%",
			"%like",
			"match",
			"match_boolean",
			"distance",
			"distance_cosine",
			"distance_euclidean",
		]);
		let convert_key = (s) =>
		{
			s = Runtime.re.replace("[,\\.]", "_", s);
			s = Runtime.re.replace("[^0-9A-Za-z_]", "", s);
			return s;
		};
		let field_name = "", op = "";
		let value = "";
		/* If QueryFilter */
		if (item instanceof Runtime.ORM.QueryFilter)
		{
			field_name = item.key;
			op = item.op;
			value = item.value;
		}
		else
		{
			return Runtime.Vector.create(["", field_index]);
		}
		/* OR */
		if (field_name == "$or")
		{
			let where_or = new Runtime.Vector();
			for (let j = 0; j < value.count(); j++)
			{
				let res_or = this.convertFilterItem(value[j], data, field_index);
				where_or.push(res_or[0]);
				field_index = res_or[1];
			}
			let s = "(" + String(Runtime.rs.join(" OR ", where_or)) + String(")");
			return Runtime.Vector.create([s, field_index]);
		}
		if (op == "is")
		{
			if (value != "" && value != null)
			{
				let s = this.prepareField(field_name) + String(" is not null");
				return Runtime.Vector.create([s, field_index]);
			}
			else
			{
				let s = this.prepareField(field_name) + String(" is null");
				return Runtime.Vector.create([s, field_index]);
			}
		}
		/* Check operation */
		if (allow_operations.indexOf(op) == -1)
		{
			op = "=";
		}
		if (value === null)
		{
			if (op == "!=")
			{
				let s = this.prepareField(field_name) + String(" is not null");
				return Runtime.Vector.create([s, field_index]);
			}
			else
			{
				let s = this.prepareField(field_name) + String(" is null");
				return Runtime.Vector.create([s, field_index]);
			}
		}
		else if (value instanceof Runtime.Vector && op == "=")
		{
			if (value.count() == 0)
			{
				return Runtime.Vector.create(["1 = 0", field_index]);
			}
			else
			{
				let res = new Runtime.Vector();
				for (let j = 0; j < value.count(); j++)
				{
					let field_key = convert_key("where_" + String(field_name) + String("_") + String(field_index));
					data.set(field_key, value[j]);
					res.push(this.formatKey(field_key));
					field_index++;
				}
				let s = this.prepareField(field_name) + String(" in (") + String(Runtime.rs.join(",", res)) + String(")");
				return Runtime.Vector.create([s, field_index]);
			}
		}
		else
		{
			let s = "";
			let field_key = convert_key("where_" + String(field_name) + String("_") + String(field_index));
			field_name = this.prepareField(field_name);
			let res = this.prepareValue(value, op);
			value = res[0];
			op = res[1];
			if (op == "match")
			{
				s = "MATCH(" + String(field_name) + String(") AGAINST (") + String(this.formatKey(field_key)) + String(")");
			}
			else if (op == "match_boolean")
			{
				s = "MATCH(" + String(field_name) + String(") AGAINST (:") + String(this.formatKey(field_key)) + String(" IN BOOLEAN MODE)");
			}
			else if (op == "distance" || op == "distance_cosine" || op == "distance_euclidean")
			{
				let distance_type = "VEC_DISTANCE_COSINE";
				if (op == "distance_euclidean") distance_type = "VEC_DISTANCE_EUCLIDEAN";
				s = distance_type + String("(") + String(field_name) + String(", VEC_FromText(") + String(this.formatKey(field_key)) + String("))");
				let annotation = this.findAnnotation(field_key);
				if (annotation)
				{
					value = annotation.toDatabase(value);
				}
			}
			else
			{
				s = field_name + String(" ") + String(op) + String(" ") + String(this.formatKey(field_key));
			}
			data.set(field_key, value);
			field_index++;
			return Runtime.Vector.create([s, field_index]);
		}
		return Runtime.Vector.create(["", field_index]);
	}
	
	
	/**
	 * Convert filter
	 */
	convertFilter(filter, data, field_index)
	{
		if (field_index == undefined) field_index = 0;
		let where = new Runtime.Vector();
		for (let i = 0; i < filter.count(); i++)
		{
			let item = filter.get(i);
			let res = this.convertFilterItem(item, data, field_index);
			let s = res.get(0);
			field_index = res.get(1);
			if (s != "") where.push(s);
		}
		let where_str = Runtime.rs.join(" AND ", where);
		return Runtime.Vector.create([where_str, field_index]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.conn = null;
		this.data = null;
		this.q = null;
		this.sql = null;
		this.annotations = null;
	}
	static getClassName(){ return "Runtime.ORM.MySQL.SQLBuilder"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.MySQL.SQLBuilder"] = Runtime.ORM.MySQL.SQLBuilder;