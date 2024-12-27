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
Runtime.ORM.MySQL.SQLBuilder = function(conn, q)
{
	this.conn = conn;
	this.q = q;
};
Runtime.ORM.MySQL.SQLBuilder.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.MySQL.SQLBuilder.prototype.constructor = Runtime.ORM.MySQL.SQLBuilder;
Object.assign(Runtime.ORM.MySQL.SQLBuilder.prototype,
{
	/**
	 * Returns sql
	 */
	getSQL: function()
	{
		return this.sql;
	},
	/**
	 * Returns data
	 */
	getData: function()
	{
		return this.data;
	},
	/**
	 * Returns true if builder is correct
	 */
	isValid: function()
	{
		return this.sql != null;
	},
	/**
	 * Format sql
	 */
	formatSQL: function()
	{
		var sql = this.sql;
		var data = this.data;
		if (data == null)
		{
			return sql;
		}
		data.each((value, key) =>
		{
			if (value === null)
			{
				sql = Runtime.rs.replace(this.formatKey(key), "null", sql);
			}
			else
			{
				value = this.quote(value);
				sql = Runtime.rs.replace(this.formatKey(key), value, sql);
			}
		});
		return sql;
	},
	/**
	 * Format key
	 */
	formatKey: function(key)
	{
		return ":" + Runtime.rtl.toStr(key);
	},
	/**
	 * Prepare field
	 */
	prepare_field: function(item)
	{
		var res1 = Runtime.rs.split(",", item);
		res1 = res1.map((s) =>
		{
			return Runtime.rs.trim(s);
		});
		res1 = res1.map((s) =>
		{
			var res2 = Runtime.rs.split(".", s);
			res2 = res2.map((name) =>
			{
				return "`" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("`");
			});
			return Runtime.rs.join(".", res2);
		});
		return Runtime.rs.join(",", res1);
	},
	/**
	 * Prepare value
	 */
	prepare_value: function(item, op)
	{
		if (op == "%like%")
		{
			item = "%" + Runtime.rtl.toStr(item) + Runtime.rtl.toStr("%");
			op = "like";
		}
		else if (op == "like%")
		{
			item = item + Runtime.rtl.toStr("%");
			op = "like";
		}
		else if (op == "%like")
		{
			item = "%" + Runtime.rtl.toStr(item);
			op = "like";
		}
		return Runtime.Vector.from([item,op]);
	},
	/**
	 * Quote
	 */
	quote: function(value)
	{
		return value;
	},
	/**
	 * Returns query sql
	 */
	build: function()
	{
		if (this.q == null)
		{
			return this;
		}
		var q = this.q;
		/* Select query */
		if (q._kind == Runtime.ORM.Query.QUERY_SELECT)
		{
			var data = q._data.copy();
			var sql = "SELECT ";
			var field_index = 0;
			/* Add distinct */
			if (q._distinct != "")
			{
				sql += Runtime.rtl.toStr(" DISTINCT ");
			}
			/* Add fields */
			if (q._fields != null)
			{
				var fields = q._fields.map((item) =>
				{
					var field_name = "";
					if (item instanceof Runtime.ORM.QueryField)
					{
						var table_name = item.table_name;
						if (table_name == "")
						{
							table_name = q._table_name;
						}
						field_name = "`" + Runtime.rtl.toStr(table_name) + Runtime.rtl.toStr("`.`") + Runtime.rtl.toStr(item.field_name) + Runtime.rtl.toStr("`");
						if (item.alias_name != "")
						{
							field_name += Runtime.rtl.toStr(" as `" + Runtime.rtl.toStr(item.alias_name) + Runtime.rtl.toStr("`"));
						}
					}
					else if (item instanceof Runtime.ORM.QueryFilter)
					{
						var res = this.convertFilterItem(item, data, field_index);
						field_name = Runtime.rtl.attr(res, 0);
						field_index = Runtime.rtl.attr(res, 1);
						if (item.alias != "")
						{
							field_name += Runtime.rtl.toStr(" as `" + Runtime.rtl.toStr(item.alias) + Runtime.rtl.toStr("`"));
						}
					}
					else if (Runtime.rtl.isCallable(item))
					{
						return item(this);
					}
					else
					{
						field_name = item;
					}
					return field_name;
				});
				sql += Runtime.rtl.toStr(Runtime.rs.join(", ", fields));
			}
			else
			{
				sql += Runtime.rtl.toStr(" * ");
			}
			/* New line */
			sql += Runtime.rtl.toStr("\n");
			/* Add table name */
			sql += Runtime.rtl.toStr(" FROM `" + Runtime.rtl.toStr(this.conn.prefix) + Runtime.rtl.toStr(q._table_name) + Runtime.rtl.toStr("` AS `") + Runtime.rtl.toStr(q._table_name) + Runtime.rtl.toStr("`"));
			/* New line */
			sql += Runtime.rtl.toStr("\n");
			/* Add joins */
			if (q._join != null && q._join.count() > 0)
			{
				for (var i = 0; i < q._join.count(); i++)
				{
					var join = Runtime.rtl.attr(q._join, i);
					var kind = Runtime.rtl.attr(join, "kind");
					var table_name = Runtime.rtl.attr(join, "table_name");
					var alias_name = Runtime.rtl.attr(join, "alias_name");
					var filter = Runtime.rtl.attr(join, "filter");
					var res = this.convertFilter(filter, data, field_index);
					var where = Runtime.rtl.attr(res, 0);
					field_index = Runtime.rtl.attr(res, 1);
					if (kind == "left")
					{
						sql += Runtime.rtl.toStr(" LEFT JOIN ");
					}
					else
					{
						sql += Runtime.rtl.toStr(" INNER JOIN ");
					}
					sql += Runtime.rtl.toStr("`" + Runtime.rtl.toStr(this.conn.prefix) + Runtime.rtl.toStr(table_name) + Runtime.rtl.toStr("`"));
					if (alias_name != "")
					{
						sql += Runtime.rtl.toStr(" AS `" + Runtime.rtl.toStr(alias_name) + Runtime.rtl.toStr("`"));
					}
					sql += Runtime.rtl.toStr(" ON (" + Runtime.rtl.toStr(where) + Runtime.rtl.toStr(")"));
					/* New line */
					sql += Runtime.rtl.toStr("\n");
				}
			}
			/* Add where */
			if (q._filter != null && q._filter.count() > 0)
			{
				var res = this.convertFilter(q._filter, data, field_index);
				var where = Runtime.rtl.attr(res, 0);
				field_index = Runtime.rtl.attr(res, 1);
				if (where != "")
				{
					sql += Runtime.rtl.toStr(" WHERE " + Runtime.rtl.toStr(where));
				}
				/* New line */
				sql += Runtime.rtl.toStr("\n");
			}
			/* Add order */
			if (q._order != null && q._order.count() > 0)
			{
				var order = q._order.map((item) =>
				{
					return this.prepare_field(Runtime.rtl.attr(item, 0)) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(Runtime.rtl.attr(item, 1));
				});
				sql += Runtime.rtl.toStr(" ORDER BY " + Runtime.rtl.toStr(Runtime.rs.join(",", order)));
				/* New line */
				sql += Runtime.rtl.toStr("\n");
			}
			/* Add order */
			if (q._limit >= 0)
			{
				sql += Runtime.rtl.toStr(" LIMIT " + Runtime.rtl.toStr(q._limit));
			}
			if (q._limit >= 0 && q._start >= 0)
			{
				sql += Runtime.rtl.toStr(" OFFSET " + Runtime.rtl.toStr(q._start));
			}
			this.sql = sql;
			this.data = data;
		}
		else if (q._kind == Runtime.ORM.Query.QUERY_INSERT)
		{
			var keys = new Runtime.Vector();
			var values = new Runtime.Vector();
			if (q._data)
			{
				q._data.each((value, key) =>
				{
					keys.push("`" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("`"));
					values.push(this.formatKey(key));
				});
			}
			/* Build sql */
			this.sql = "INSERT INTO " + Runtime.rtl.toStr(this.conn.prefix) + Runtime.rtl.toStr(q._table_name) + Runtime.rtl.toStr(" (") + Runtime.rtl.toStr(Runtime.rs.join(",", keys)) + Runtime.rtl.toStr(") VALUES (") + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr(")");
			this.data = q._data.clone();
		}
		else if (q._kind == Runtime.ORM.Query.QUERY_UPDATE)
		{
			var update_arr = new Runtime.Vector();
			var values = new Runtime.Vector();
			var data = new Runtime.Map();
			/* Build update */
			if (q._data)
			{
				q._data.each((value, key) =>
				{
					var field_key = "update_" + Runtime.rtl.toStr(key);
					var field_name = this.prepare_field(key);
					update_arr.push(field_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(this.formatKey(field_key)));
					data = data.set(field_key, value);
				});
			}
			/* Build where */
			var res = this.convertFilter(q._filter, data);
			var where_str = Runtime.rtl.attr(res, 0);
			/* Build sql */
			this.sql = "UPDATE " + Runtime.rtl.toStr(this.conn.prefix) + Runtime.rtl.toStr(q._table_name) + Runtime.rtl.toStr(" SET ") + Runtime.rtl.toStr(Runtime.rs.join(", ", update_arr)) + Runtime.rtl.toStr(" WHERE ") + Runtime.rtl.toStr(where_str);
			this.data = data;
		}
		else if (q._kind == Runtime.ORM.Query.QUERY_DELETE)
		{
			/* Build where */
			var data = Runtime.Map.from({});
			var res = this.convertFilter(q._filter, data);
			var where_str = Runtime.rtl.attr(res, 0);
			/* Delete item */
			this.sql = "DELETE FROM " + Runtime.rtl.toStr(this.conn.prefix) + Runtime.rtl.toStr(q._table_name) + Runtime.rtl.toStr(" WHERE ") + Runtime.rtl.toStr(where_str);
			this.data = data;
		}
		else if (q._kind == Runtime.ORM.Query.QUERY_RAW)
		{
			this.sql = q._sql;
			this.data = q._data;
		}
		return this;
	},
	/**
	 * Convert filter
	 */
	convertFilterItem: function(item, data, field_index)
	{
		if (field_index == undefined) field_index = 0;
		if (Runtime.rtl.isString(item))
		{
			return Runtime.Vector.from([item,field_index]);
		}
		var allow_operations = Runtime.Vector.from(["=","!=",">=","<=","<",">","like","%like%","like%","%like","match","match_boolean"]);
		var convert_key = (s) =>
		{
			s = Runtime.re.replace("[,\\.]", "_", s);
			s = Runtime.re.replace("[^0-9A-Za-z_]", "", s);
			return s;
		};
		var field_name = "";
		var op = "";
		var value = "";
		/* If QueryFilter */
		if (item instanceof Runtime.ORM.QueryFilter)
		{
			field_name = item.key;
			op = item.op;
			value = item.value;
		}
		else
		{
			field_name = Runtime.rtl.attr(item, 0);
			op = Runtime.rtl.attr(item, 1);
			value = Runtime.rtl.attr(item, 2);
		}
		/* OR */
		if (field_name == "$or")
		{
			var where_or = new Runtime.Vector();
			for (var j = 0; j < value.count(); j++)
			{
				var res_or = this.convertFilterItem(Runtime.rtl.attr(value, j), data, field_index);
				where_or.push(Runtime.rtl.attr(res_or, 0));
				field_index = Runtime.rtl.attr(res_or, 1);
			}
			var s = "(" + Runtime.rtl.toStr(Runtime.rs.join(" OR ", where_or)) + Runtime.rtl.toStr(")");
			return Runtime.Vector.from([s,field_index]);
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
				var s = this.prepare_field(field_name) + Runtime.rtl.toStr(" is not null");
				return Runtime.Vector.from([s,field_index]);
			}
			else
			{
				var s = this.prepare_field(field_name) + Runtime.rtl.toStr(" is null");
				return Runtime.Vector.from([s,field_index]);
			}
		}
		else if (value instanceof Runtime.Collection)
		{
			if (op == "=")
			{
				if (value.count() == 0)
				{
					return Runtime.Vector.from(["1 = 0",field_index]);
				}
				else
				{
					var res = new Runtime.Vector();
					for (var j = 0; j < value.count(); j++)
					{
						var field_key = convert_key(field_index + Runtime.rtl.toStr("_where_") + Runtime.rtl.toStr(field_name));
						data.set(field_key, Runtime.rtl.attr(value, j));
						res.push(this.formatKey(field_key));
						field_index++;
					}
					var s = this.prepare_field(field_name) + Runtime.rtl.toStr(" in (") + Runtime.rtl.toStr(Runtime.rs.join(",", res)) + Runtime.rtl.toStr(")");
					return Runtime.Vector.from([s,field_index]);
				}
			}
		}
		else
		{
			var s = "";
			var field_key = convert_key(field_index + Runtime.rtl.toStr("_where_") + Runtime.rtl.toStr(field_name));
			field_name = this.prepare_field(field_name);
			var res = this.prepare_value(value, op);
			value = Runtime.rtl.attr(res, 0);
			op = Runtime.rtl.attr(res, 1);
			if (op == "match")
			{
				s = "MATCH(" + Runtime.rtl.toStr(field_name) + Runtime.rtl.toStr(") AGAINST (") + Runtime.rtl.toStr(this.formatKey(field_key)) + Runtime.rtl.toStr(")");
			}
			else if (op == "match_boolean")
			{
				s = "MATCH(" + Runtime.rtl.toStr(field_name) + Runtime.rtl.toStr(") AGAINST (:") + Runtime.rtl.toStr(this.formatKey(field_key)) + Runtime.rtl.toStr(" IN BOOLEAN MODE)");
			}
			else
			{
				s = field_name + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(this.formatKey(field_key));
			}
			data.set(field_key, value);
			field_index++;
			return Runtime.Vector.from([s,field_index]);
		}
		return Runtime.Vector.from(["",field_index]);
	},
	/**
	 * Convert filter
	 */
	convertFilter: function(filter, data, field_index)
	{
		if (field_index == undefined) field_index = 0;
		var where = new Runtime.Vector();
		for (var i = 0; i < filter.count(); i++)
		{
			var item = filter.get(i);
			var res = this.convertFilterItem(item, data, field_index);
			var s = res.get(0);
			field_index = res.get(1);
			if (s != "")
			{
				where.push(s);
			}
		}
		var where_str = Runtime.rs.join(" AND ", where);
		return Runtime.Vector.from([where_str,field_index]);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.conn = null;
		this.data = null;
		this.q = null;
		this.sql = null;
	},
});
Object.assign(Runtime.ORM.MySQL.SQLBuilder, Runtime.BaseObject);
Object.assign(Runtime.ORM.MySQL.SQLBuilder,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.MySQL";
	},
	getClassName: function()
	{
		return "Runtime.ORM.MySQL.SQLBuilder";
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
Runtime.rtl.defClass(Runtime.ORM.MySQL.SQLBuilder);
window["Runtime.ORM.MySQL.SQLBuilder"] = Runtime.ORM.MySQL.SQLBuilder;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.MySQL.SQLBuilder;