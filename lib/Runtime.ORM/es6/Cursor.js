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
Runtime.ORM.Cursor = class extends Runtime.BaseObject
{
	/**
	 * Constructor
	 */
	constructor(conn)
	{
		if (conn == undefined) conn = null;
		super();
		this.conn = conn;
	}
	
	
	/**
	 * Get connection
	 */
	getConnection(){ return this.conn; }
	
	
	/**
	 * Set connection
	 */
	setConnection(connection)
	{
		this.conn = connection;
		this.adapter = connection.adapter;
	}
	
	
	/**
	 * Returns found rows
	 */
	async foundRows()
	{
		if (this.found_rows >= 0) return this.found_rows;
		if (!this.q)
		{
			return 0;
		}
		if (!this.q._calc_found_rows)
		{
			return 0;
		}
		let q = this.q.copy().clearFields().addRawField("count(1) as c").limit(-1).start(-1).clearOrder();
		let res = await this.conn.fetchVar(q, "c");
		this.found_rows = res;
		return res;
	}
	
	
	/**
	 * Returns affected rows
	 */
	async affectedRows()
	{
		return await this.adapter.affectedRows();
	}
	
	
	/**
	 * Returns last insert id
	 */
	async lastInsertId()
	{
		return await this.adapter.lastInsertId();
	}
	
	
	/**
	 * Returns pages
	 */
	async getPages()
	{
		let rows = await this.foundRows();
		return this.q ? this.q.getPages(rows) : 0;
	}
	
	
	/**
	 * Returns page
	 */
	async getPage(){ return this.q ? this.q.getPage() : 0; }
	
	
	/**
	 * Close query
	 */
	async close()
	{
		await this.adapter.close();
	}
	
	
	/**
	 * Fetch next row
	 */
	async fetchMap(){ return await this.adapter.fetchMap(); }
	
	
	/**
	 * Convert item
	 */
	async convertItem(item)
	{
		let fields = this.q._fields;
		for (let i = 0; i < fields.count(); i++)
		{
			let field = fields[i];
			if (field instanceof Runtime.ORM.QueryField && field.annotation)
			{
				item = await field.annotation.fromDatabase(this.conn, item);
			}
		}
		return item;
	}
	
	
	/**
	 * Fetch next row
	 */
	async fetch()
	{
		let row = await this.fetchMap();
		if (!row) return null;
		row = await this.convertItem(row);
		return row;
	}
	
	
	/**
	 * Fetch all rows
	 */
	async fetchAll()
	{
		let table_name = this.q._table_name;
		let items = new Runtime.ORM.QueryResult();
		/* Copy settings */
		items.q = this.q ? this.q.copy() : null;
		/* Get items */
		while (true)
		{
			let row = await this.fetch();
			if (row == null)
			{
				break;
			}
			items.push(row);
		}
		/* Get rows */
		items.rows = await this.foundRows();
		return items;
	}
	
	
	/**
	 * Fetch variable
	 */
	async fetchVar(var_name)
	{
		let row = await this.fetchMap();
		if (row)
		{
			return row.get(var_name);
		}
		return null;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.conn = null;
		this.q = null;
		this.adapter = null;
	}
	static getClassName(){ return "Runtime.ORM.Cursor"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.Cursor"] = Runtime.ORM.Cursor;