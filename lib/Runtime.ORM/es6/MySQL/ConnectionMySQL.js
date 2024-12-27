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
Runtime.ORM.MySQL.ConnectionMySQL = function()
{
	Runtime.ORM.Connection.apply(this, arguments);
};
Runtime.ORM.MySQL.ConnectionMySQL.prototype = Object.create(Runtime.ORM.Connection.prototype);
Runtime.ORM.MySQL.ConnectionMySQL.prototype.constructor = Runtime.ORM.MySQL.ConnectionMySQL;
Object.assign(Runtime.ORM.MySQL.ConnectionMySQL.prototype,
{
	/**
	 * Connect
	 */
	connect: async function()
	{
		this.connect_error = "";
		return Promise.resolve(this);
	},
	/**
	 * Connect
	 */
	isConnected: function()
	{
		return this.pdo != null;
	},
	/**
	 * Create new cursor
	 */
	createCursor: function()
	{
		return new Runtime.ORM.MySQL.CursorMySQL(this);
	},
	/**
	 * Create SQLBuilder
	 */
	createBuilder: function(q)
	{
		return new Runtime.ORM.MySQL.SQLBuilder(this, q);
	},
	/**
	 * Execute Query
	 */
	execute: async function(q, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = Runtime.Map.from({});
		}
		/* Check is debug */
		var is_debug = params.get("debug", false);
		if (q._debug)
		{
			is_debug = true;
		}
		/* Build query */
		var builder = this.createBuilder(q).build();
		/* Check builder correct */
		if (!builder.isValid())
		{
			throw new Runtime.ORM.Exceptions.OrmException("SQL builder is not correct")
		}
		/* Debug sql */
		if (is_debug)
		{
			var sql_debug = builder.formatSQL();
			Runtime.io.print(sql_debug);
		}
		/* Create cursor */
		var cursor = this.createCursor();
		/* Execute sql */
		var cursor = await cursor.executeSQL(builder);
		cursor.q = q.copy();
		return Promise.resolve(cursor);
	},
	/**
	 * Execute Query
	 */
	executeSQL: async function(sql, data)
	{
		if (data == undefined) data = null;
		/* Build query */
		var builder = this.createBuilder(null);
		builder.sql = sql;
		builder.data = data;
		/* Execute */
		var cursor = this.createCursor();
		var cursor = await cursor.executeSQL(builder);
		return Promise.resolve(cursor);
	},
	_init: function()
	{
		Runtime.ORM.Connection.prototype._init.call(this);
		this.host = "";
		this.port = "";
		this.login = "";
		this.password = "";
		this.database = "";
		this.prefix = "";
		this.connect_error = "";
		this.pdo = null;
		this.is_transaction = false;
	},
});
Object.assign(Runtime.ORM.MySQL.ConnectionMySQL, Runtime.ORM.Connection);
Object.assign(Runtime.ORM.MySQL.ConnectionMySQL,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.MySQL";
	},
	getClassName: function()
	{
		return "Runtime.ORM.MySQL.ConnectionMySQL";
	},
	getParentClassName: function()
	{
		return "Runtime.ORM.Connection";
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
Runtime.rtl.defClass(Runtime.ORM.MySQL.ConnectionMySQL);
window["Runtime.ORM.MySQL.ConnectionMySQL"] = Runtime.ORM.MySQL.ConnectionMySQL;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.MySQL.ConnectionMySQL;