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
Runtime.ORM.MySQL.ConnectionMySQL = class extends Runtime.ORM.Connection
{
	/**
	 * Constructor
	 */
	constructor(name)
	{
		if (name == undefined) name = "";
		super(name);
		this.cursor = new Runtime.ORM.Factory.CursorFactory("Runtime.ORM.MySQL.CursorMySQL");
	}
	
	
	/**
	 * Create adapter
	 */
	static createAdapter(){ return new Runtime.ORM.MySQL.Adapter(); }
	
	
	/**
	 * Connect
	 */
	isConnected()
	{
		return this.adapter.isConnected();
	}
	
	
	/**
	 * Convert item from database
	 */
	fromDatabase(annotation, item, field_name)
	{
		return item;
	}
	
	
	/**
	 * Create SQLBuilder
	 */
	createBuilder(q){ return new Runtime.ORM.MySQL.SQLBuilder(this, q); }
	
	
	/**
	 * Fork connection
	 */
	fork()
	{
		let connection = super.fork();
		connection.host = this.host;
		connection.port = this.port;
		connection.login = this.login;
		connection.password = this.password;
		connection.database = this.database;
		connection.prefix = this.prefix;
		connection.connect_error = this.connect_error;
		connection.pdo = this.pdo;
		return connection;
	}
	
	
	/**
	 * Add to query log
	 */
	logQuery(params)
	{
		if (params == undefined) params = null;
		if (params == null) params = new Runtime.Map();
		let q = params.get("query");
		let builder = params.get("builder", false);
		/* Check is debug */
		let is_debug = params.get("debug", false);
		if (q != null && q._debug)
		{
			is_debug = true;
		}
		/* Is debug */
		if (!is_debug && !this.log) return;
		/* Get SQL query */
		let sql_debug = "";
		if (builder != null) sql_debug = builder.formatSQL();
		else if (params.has(sql_debug)) sql_debug = params.get("sql_debug");
		/* Print debug SQL */
		if (is_debug)
		{
			Runtime.rtl.print(sql_debug);
		}
		/* Query log */
		if (this.log)
		{
			this.log.push(Runtime.Map.create({
				"query": params.get("query"),
				"builder": params.get("builder"),
				"sql": sql_debug,
			}));
		}
	}
	
	
	/**
	 * Execute Query
	 */
	async execute(q, params)
	{
		if (params == undefined) params = null;
		if (params == null) params = new Runtime.Map();
		/* Build query */
		let builder = this.createBuilder(q).build();
		/* Check builder correct */
		if (!builder.isValid())
		{
			throw new Runtime.ORM.Exceptions.OrmException("SQL builder is not correct");
		}
		/* Log query */
		this.logQuery(params.concat(Runtime.Map.create({
			"builder": builder,
			"query": q.copy(),
		})));
		/* Create cursor */
		let cursor = this.createCursor();
		cursor.q = q.copy();
		/* Execute sql */
		if (cursor instanceof Runtime.ORM.MySQL.CursorMySQL)
		{
			await cursor.executeSQL(builder);
		}
		return cursor;
	}
	
	
	/**
	 * Execute Query
	 */
	async executeSQL(sql, data, params)
	{
		if (data == undefined) data = null;
		if (params == undefined) params = null;
		if (params == null) params = new Runtime.Map();
		/* Build query */
		let builder = this.createBuilder(null);
		builder.sql = sql;
		builder.data = data;
		/* Log query */
		this.logQuery(params.concat(Runtime.Map.create({
			"builder": builder,
		})));
		/* Create cursor */
		let cursor = this.createCursor();
		/* Execute sql */
		if (cursor instanceof Runtime.ORM.MySQL.CursorMySQL)
		{
			await cursor.executeSQL(builder);
		}
		return cursor;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.host = "";
		this.port = "";
		this.login = "";
		this.password = "";
		this.database = "";
		this.prefix = "";
		this.connect_error = "";
		this.pdo = null;
		this.is_transaction = false;
	}
	static getClassName(){ return "Runtime.ORM.MySQL.ConnectionMySQL"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.MySQL.ConnectionMySQL"] = Runtime.ORM.MySQL.ConnectionMySQL;