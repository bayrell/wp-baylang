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
Runtime.ORM.Connection = class extends Runtime.BaseObject
{
	/**
	 * Set cursor factory
	 */
	setCursorFactory(factory)
	{
		this.cursor = factory;
	}
	
	
	/**
	 * Set query log
	 */
	setQueryLog(value)
	{
		this.log = value;
	}
	
	
	/**
	 * Returns query log
	 */
	getQueryLog(){ return this.log; }
	
	
	/**
	 * Constructor
	 */
	constructor(pool)
	{
		super();
		this.pool = pool;
		this.adapter = pool.adapter ? pool.adapter.copy() : null;
	}
	
	
	/**
	 * Convert item from database
	 */
	fromDatabase(annotation, item, field_name){ return item; }
	
	
	/**
	 * Convert item to database
	 */
	toDatabase(annotation, item, field_name){ return item; }
	
	
	/**
	 * Check is connected
	 */
	isConnected(){ return false; }
	
	
	/**
	 * Returns connection name
	 */
	getName(){ return this.name; }
	
	
	/**
	 * Create new cursor
	 */
	createCursor()
	{
		if (!this.cursor) return;
		let cursor = this.cursor.createCursor();
		cursor.setConnection(this);
		return cursor;
	}
	
	
	/**
	 * Fork connection
	 */
	fork()
	{
		return Runtime.rtl.newInstance(this.constructor.getClassName());
	}
	
	
	/**
	 * Prepare field
	 */
	prepareField(item){ return item; }
	
	
	/**
	 * Prepare value
	 */
	prepareValue(item, op){ return item; }
	
	
	/**
	 * Quote
	 */
	quote(value){ return value; }
	
	
	/**
	 * Returns table name
	 */
	getTableName(table_name){ return this.pool.params.get("prefix") + String(table_name); }
	
	
	/**
	 * Start transaction
	 */
	async beginTransaction()
	{
		if (!this.in_transaction)
		{
			await this.adapter.beginTransaction();
			this.in_transaction = true;
		}
	}
	
	
	/**
	 * Commit transaction
	 */
	async commit()
	{
		if (this.in_transaction)
		{
			await this.adapter.commit();
			this.in_transaction = false;
		}
	}
	
	
	/**
	 * Rollback transaction
	 */
	async rollback()
	{
		if (this.in_transaction)
		{
			await this.adapter.rollback();
			this.in_transaction = false;
		}
	}
	
	
	/**
	 * Execute Query
	 */
	async execute(q, params){ if (params == undefined) params = null;return null; }
	
	
	/**
	 * Release connection
	 */
	async release()
	{
		if (this.adapter)
		{
			await this.adapter.release();
		}
	}
	
	
	/**
	 * Insert query
	 */
	async insert(table_name, insert_data, get_last_id, params)
	{
		if (get_last_id == undefined) get_last_id = true;
		if (params == undefined) params = null;
		let last_id = null;
		if (table_name == "")
		{
			throw new Runtime.Exceptions.RuntimeException("Table name is empty");
		}
		let q = new Runtime.ORM.Query().insert(table_name).values(insert_data);
		let cursor = null;
		try
		{
			cursor = await this.execute(q, params);
			if (get_last_id)
			{
				last_id = await cursor.lastInsertId();
			}
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (cursor)
			{
				await cursor.close();
			}
		}
		return last_id;
	}
	
	
	/**
	 * Update query
	 */
	async update(table_name, filter, update_data, params)
	{
		if (params == undefined) params = null;
		if (table_name == "")
		{
			throw new Runtime.Exceptions.RuntimeException("Table name is empty");
		}
		let q = new Runtime.ORM.Query().update(table_name).values(update_data).setFilter(filter);
		let cursor = null;
		try
		{
			cursor = await this.execute(q, params);
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (cursor)
			{
				await cursor.close();
			}
		}
	}
	
	
	/**
	 * Delete item
	 */
	async delete(table_name, filter, params)
	{
		if (params == undefined) params = null;
		if (table_name == "")
		{
			throw new Runtime.Exceptions.RuntimeException("Table name is empty");
		}
		let q = new Runtime.ORM.Query().delete(table_name).setFilter(filter);
		let cursor = null;
		try
		{
			cursor = await this.execute(q, params);
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (cursor)
			{
				await cursor.close();
			}
		}
	}
	
	
	/**
	 * Fetch all
	 */
	async fetchAll(q, params)
	{
		if (params == undefined) params = null;
		let cursor = null;
		try
		{
			cursor = await this.execute(q, params);
			return await cursor.fetchAll();
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (cursor)
			{
				await cursor.close();
			}
		}
	}
	
	
	/**
	 * Fetch
	 */
	async fetch(q, params)
	{
		if (params == undefined) params = null;
		let cursor = null;
		try
		{
			cursor = await this.execute(q, params);
			return await cursor.fetch();
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (cursor)
			{
				await cursor.close();
			}
		}
	}
	
	
	async fetchOne(q, params)
	{
		if (params == undefined) params = null;
		return await this.fetch(q, params);
	}
	
	
	/**
	 * Fetch variable
	 */
	async fetchVar(q, var_name, params)
	{
		if (params == undefined) params = null;
		let cursor = null;
		try
		{
			cursor = await this.execute(q, params);
			return await cursor.fetchVar(var_name);
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (cursor)
			{
				await cursor.close();
			}
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.pool = null;
		this.cursor = null;
		this.log = null;
		this.adapter = null;
		this.in_transaction = false;
	}
	static getClassName(){ return "Runtime.ORM.Connection"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.Connection"] = Runtime.ORM.Connection;