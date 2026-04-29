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
Runtime.ORM.Relation = class extends Runtime.BaseObject
{
	/**
	 * Constructor
	 */
	constructor(record_name, params)
	{
		if (params == undefined) params = null;
		super();
		this.record_name = record_name;
		if (params && params.has("pool")) this.pool = params.get("pool");
		else this.pool = Runtime.ORM.ConnectionPool.get(params ? params.get("connection_name", "default") : "default");
	}
	
	
	/**
	 * Returns connection
	 */
	getPool(){ return this.pool; }
	
	
	getConnectionPool(){ return this.pool; }
	
	
	/**
	 * Set connection
	 */
	setConnectionPool(pool)
	{
		this.pool = pool;
	}
	
	
	/**
	 * Returns connection
	 */
	getConnection(connection){ return this.connection; }
	
	
	/**
	 * Set connection
	 */
	setConnection(connection)
	{
		this.connection = connection;
	}
	
	
	/**
	 * Create Instance of class
	 */
	createRecord(data){ if (data == undefined) data = null;return Runtime.rtl.newInstance(this.record_name, Runtime.Vector.create([data, this])); }
	
	
	/**
	 * Returns table name
	 */
	getTableName()
	{
		if (this.record_name == "")
		{
			throw new Runtime.Exceptions.ItemNotFound("Record name");
		}
		let f = new Runtime.Method(this.record_name, "getTableName");
		return f.apply();
	}
	
	
	/**
	 * Returns table annotations
	 */
	getAnotations()
	{
		let provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		return provider.getAnotations(this.getTableName());
	}
	
	
	/**
	 * To database
	 */
	async toDatabase(conn, data)
	{
		if (data == null) return null;
		let annotations = this.getAnotations();
		for (let i = 0; i < annotations.count(); i++)
		{
			let annotation = annotations.get(i);
			if (annotation instanceof Runtime.ORM.Annotations.BaseType && data.has(annotation.name))
			{
				data = await annotation.toDatabase(conn, data);
			}
		}
		return data;
	}
	
	
	/**
	 * From database
	 */
	async fromDatabase(data)
	{
		if (data == null) return null;
		let annotations = this.getAnotations();
		for (let i = 0; i < annotations.count(); i++)
		{
			let annotation = annotations.get(i);
			if (annotation instanceof Runtime.ORM.Annotations.BaseType && data.has(annotation.name))
			{
				data = await annotation.fromDatabase(this.pool, data);
			}
		}
		return data;
	}
	
	
	/**
	 * Returns true if primary key is auto increment
	 */
	getAutoIncrement()
	{
		let annotations = this.getAnotations();
		let annotation = annotations.find((item) => { return item instanceof Runtime.ORM.Annotations.AutoIncrement; });
		return annotation;
	}
	
	
	/**
	 * Returns primary rules
	 */
	getPrimaryRules()
	{
		let rules = new Runtime.Serializer.MapType();
		let annotations = this.getAnotations();
		let primary = annotations.find((item) => { return item instanceof Runtime.ORM.Annotations.Primary; });
		if (primary == null) return rules;
		annotations = annotations.filter((item) =>
		{
			if (!(item instanceof Runtime.ORM.Annotations.BaseType)) return false;
			if (primary.keys.indexOf(item.name) == -1) return false;
			return true;
		});
		for (let i = 0; i < annotations.count(); i++)
		{
			let annotation = annotations.get(i);
			let rule = annotation.getRule();
			if (!rule)
			{
				throw new Runtime.Exceptions.RuntimeException("Rule is not defined");
			}
			rules.addType(annotation.name, rule);
		}
		return rules;
	}
	
	
	/**
	 * Returns primary keys of table
	 */
	getPrimaryKeys()
	{
		/* Get primary annotation */
		let annotations = this.getAnotations();
		let primary = annotations.find((item) => { return item instanceof Runtime.ORM.Annotations.Primary; });
		if (primary == null) return null;
		return primary.keys;
	}
	
	
	/**
	 * Returns primary data
	 */
	getPrimaryKey(data)
	{
		/* Get primary annotation */
		let primary_keys = this.getPrimaryKeys();
		/* Check if primary keys if exists */
		if (primary_keys == null)
		{
			let table_name = this.getTableName();
			throw new Runtime.Exceptions.RuntimeException("Primary key does not exists in " + String(table_name));
		}
		/* Intersect values */
		let pk = new Runtime.Map();
		for (let i = 0; i < primary_keys.count(); i++)
		{
			let field_name = primary_keys.get(i);
			pk.set(field_name, data ? data.get(field_name) : null);
		}
		return pk;
	}
	
	
	/**
	 * Returns primary filter by data
	 */
	getPrimaryFilter(data, use_full_key)
	{
		if (use_full_key == undefined) use_full_key = true;
		let table_name = this.getTableName();
		let pk = this.getPrimaryKey(data);
		let filter = pk.transition((value, key) =>
		{
			let item = new Runtime.ORM.QueryFilter();
			item.key = key;
			item.op = "=";
			item.value = value;
			if (use_full_key)
			{
				item.key = table_name + String(".") + String(key);
			}
			return item;
		});
		if (filter.count() == 0)
		{
			throw new Runtime.Exceptions.RuntimeException("Primary key does not exists in " + String(table_name));
		}
		return filter;
	}
	
	
	/**
	 * Save model
	 */
	async save(item, params)
	{
		if (params == undefined) params = null;
		let table_name = this.getTableName();
		/* Call before save */
		await Runtime.rtl.getContext().hook(Runtime.ORM.DatabaseSchema.SAVE_BEFORE, Runtime.Map.create({
			"table_name": table_name,
			"relation": this,
			"item": item,
		}));
		let is_update = item.isUpdate();
		let updated_data = item.getUpdatedData();
		/* Prepare */
		let annotations = this.getAnotations();
		for (let i = 0; i < annotations.count(); i++)
		{
			let annotation = annotations.get(i);
			if (annotation instanceof Runtime.ORM.Annotations.BaseType)
			{
				updated_data = annotation.prepare(updated_data, is_update);
			}
		}
		if (is_update)
		{
			let updated_data_keys = Runtime.rtl.list(updated_data.keys());
			if (updated_data_keys.count() > 0)
			{
				let filter = this.getPrimaryFilter(item.old(), false);
				if (filter.count() > 0)
				{
					let connection = this.connection;
					if (!connection) connection = await this.pool.getConnection();
					try
					{
						let db_updated_data = await this.toDatabase(connection, updated_data);
						await connection.update(table_name, filter, db_updated_data, params);
					}
					catch (_ex)
					{
						throw _ex;
					}
					finally
					{
						if (!this.connection) await connection.release();;
					}
				}
				else
				{
					throw new Runtime.Exceptions.RuntimeException("Primary key does not exists in " + String(table_name));
				}
				for (let i = 0; i < updated_data_keys.count(); i++)
				{
					let field_name = updated_data_keys[i];
					item.set(field_name, updated_data.get(field_name));
				}
			}
		}
		else
		{
			/* Get connection and release it after use */
			let connection = this.connection;
			if (!connection) connection = await this.pool.getConnection();
			try
			{
				let db_updated_data = await this.toDatabase(connection, updated_data);
				let last_id = await connection.insert(table_name, db_updated_data, true, params);
				let auto_increment = this.getAutoIncrement();
				if (auto_increment && auto_increment.name)
				{
					item.set(auto_increment.name, last_id);
				}
			}
			catch (_ex)
			{
				throw _ex;
			}
			finally
			{
				if (!this.connection) await connection.release();;
			}
		}
		item._initData(item.all());
		/* Call before after */
		await Runtime.rtl.getContext().hook(Runtime.ORM.DatabaseSchema.SAVE_AFTER, Runtime.Map.create({
			"table_name": table_name,
			"relation": this,
			"item": item,
		}));
	}
	
	
	/**
	 * Delete model
	 */
	async delete(item, params)
	{
		if (params == undefined) params = null;
		/* Get primary filter */
		let table_name = this.getTableName();
		let filter = this.getPrimaryFilter(item.old(), false);
		/* Delete record */
		if (filter.count() > 0)
		{
			/* Get connection and release it after use */
			let connection = this.connection;
			if (!connection) connection = await this.pool.getConnection();
			try
			{
				await connection.delete(table_name, filter, params);
			}
			catch (_ex)
			{
				throw _ex;
			}
			finally
			{
				if (!this.connection) await connection.release();;
			}
		}
		else
		{
			throw new Runtime.Exceptions.RuntimeException("Primary key does not exists in " + String(table_name));
		}
	}
	
	
	/**
	 * Refresh model from database
	 */
	async refresh(item, params)
	{
		if (params == undefined) params = null;
		let new_item = await this.findByPk(item, params);
		if (new_item)
		{
			item._initData(new_item.all());
		}
	}
	
	
	/**
	 * Returns query
	 */
	query(){ return new Runtime.ORM.Query().from(this.getTableName()); }
	
	
	/**
	 * Returns select query
	 */
	select(fields)
	{
		if (fields == undefined) fields = null;
		let table_name = this.getTableName();
		if (fields == null) fields = Runtime.Vector.create([table_name + String(".*")]);
		let q = new Runtime.ORM.Query().select(fields).from(table_name);
		return q;
	}
	
	
	/**
	 * Execute query
	 */
	async execute(q)
	{
		let connection = this.connection;
		if (!connection) connection = await this.pool.getConnection();
		try
		{
			await connection.execute(q);
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (!this.connection) await connection.release();;
		}
	}
	
	
	/**
	 * Fetch all
	 */
	async fetchAll(q, params)
	{
		if (params == undefined) params = null;
		let items = null;
		/* Get connection and release it after use */
		let connection = this.connection;
		if (!connection) connection = await this.pool.getConnection();
		try
		{
			items = await connection.fetchAll(q, params);
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (!this.connection) await connection.release();;
		}
		return items;
	}
	
	
	/**
	 * Fetch all records
	 */
	async fetchAllRecords(q, params)
	{
		if (params == undefined) params = null;
		let result = await this.fetchAll(q);
		return result.map((row) => { return this.createRecord(row); });
	}
	
	
	/**
	 * Fetch
	 */
	async fetch(q, params)
	{
		if (params == undefined) params = null;
		q.limit(1);
		/* Get connection and release it after use */
		let connection = this.connection;
		if (!connection) connection = await this.pool.getConnection();
		try
		{
			let item = await connection.fetch(q, params);
			return item;
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (!this.connection) await connection.release();;
		}
	}
	
	
	async fetchOne(q, params)
	{
		if (params == undefined) params = null;
		return await this.fetch(q, params);
	}
	
	
	/**
	 * Fetch record
	 */
	async fetchRecord(q, params)
	{
		if (params == undefined) params = null;
		let row = await this.fetch(q, params);
		return row ? this.createRecord(row) : null;
	}
	
	
	/**
	 * Find rows by filter
	 */
	async find(filter, params)
	{
		if (params == undefined) params = null;
		let q = this.select().setFilter(filter);
		/* Get connection and release it after use */
		let connection = this.connection;
		if (!connection) connection = await this.pool.getConnection();
		try
		{
			return await connection.fetchAll(q, params);
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			if (!this.connection) await connection.release();;
		}
	}
	
	
	/**
	 * Find relation by filter
	 */
	async findRecord(filter, params)
	{
		if (params == undefined) params = null;
		let q = this.select().setFilter(filter).limit(1);
		return await this.fetchRecord(q, params);
	}
	
	
	/**
	 * Find relation by primary key
	 */
	async findByPk(pk, params)
	{
		if (params == undefined) params = null;
		/* Returns primary filter */
		let filter = this.getPrimaryFilter(pk, false);
		/* Find record */
		return await this.findRecord(filter, params);
	}
	
	
	/**
	 * Find relation by object
	 */
	async findById(id, params)
	{
		if (params == undefined) params = null;
		/* Get primary keys */
		let pk = this.getPrimaryKeys();
		let pk_name = pk.get(0);
		/* Build filter */
		let filter = Runtime.Vector.create([
			new Runtime.ORM.QueryFilter(pk_name, "=", id),
		]);
		/* Find record */
		return await this.findRecord(filter, params);
	}
	
	
	/**
	 * Find or create
	 */
	async findOrCreate(filter, params)
	{
		if (params == undefined) params = null;
		let class_name = this.constructor.getClassName();
		/* Build filter */
		let search = filter.transition((value, key) =>
		{
			return new Runtime.ORM.QueryFilter(key, "=", value);
		});
		/* Find item */
		let record = await this.findRecord(search, params);
		if (record) return record;
		/* Create if not found */
		record = this.createRecord();
		/* Set new data */
		record.setData(filter);
		return record;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.connection = null;
		this.pool = null;
		this.record_name = "";
	}
	static getClassName(){ return "Runtime.ORM.Relation"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.Relation"] = Runtime.ORM.Relation;