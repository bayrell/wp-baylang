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
Runtime.ORM.Provider = class extends Runtime.BaseProvider
{
	/**
	 * Returns connection
	 */
	get(name)
	{
		if (!this.connection_list.has(name))
		{
			throw new Runtime.Exceptions.ItemNotFound(name, "Connection");
		}
		return this.connection_list.get(name);
	}
	
	
	/**
	 * Add new connection
	 */
	add(conn)
	{
		this.connection_list.set(conn.getName(), conn);
	}
	
	
	/**
	 * Returns table annotations
	 */
	getAnotations(table_name)
	{
		if (!this.annotations.has(table_name)) return Runtime.Vector.create([]);
		return this.annotations.get(table_name);
	}
	
	
	/**
	 * Returns fields from table
	 */
	getFieldType(table_name, field_name)
	{
		let annotations = this.getAnotations(table_name);
		for (let i = 0; i < annotations.count(); i++)
		{
			let annotation = annotations[i];
			if (annotation instanceof Runtime.ORM.Annotations.BaseType)
			{
				if (annotation.name == field_name)
				{
					return annotation;
				}
			}
		}
		return null;
	}
	
	
	/**
	 * Add table
	 */
	addTable(table_name, annotations)
	{
		this.annotations.set(table_name, annotations);
		for (let i = 0; i < annotations.count(); i++)
		{
			let rule = annotations.get(i);
			rule.table_name = table_name;
		}
	}
	
	
	/**
	 * Start provider
	 */
	async start()
	{
		await super.start();
		await this.registerTables();
		await this.registerConnections();
	}
	
	
	/**
	 * Register tables
	 */
	async registerTables()
	{
		let items = Runtime.rtl.getContext().getEntities("Runtime.ORM.Annotations.Table");
		for (let i = 0; i < items.count(); i++)
		{
			let table = items[i];
			let record_name = table.name;
			/* Get table name */
			let getTableName = new Runtime.Method(record_name, "getTableName");
			if (!getTableName.exists()) continue;
			let table_name = getTableName.apply();
			/* Add schema */
			let schema = new Runtime.Method(record_name, "schema");
			if (!schema.exists()) continue;
			let rules = schema.apply();
			this.addTable(table_name, rules);
		}
		/* Call register event */
		await Runtime.rtl.getContext().hook(Runtime.ORM.DatabaseSchema.REGISTER, Runtime.Map.create({
			"item": this,
		}));
	}
	
	
	/**
	 * Register connections
	 */
	async registerConnections()
	{
		let items = Runtime.rtl.getContext().getEntities("Runtime.ORM.Factory.ConnectionFactory");
		for (let i = 0; i < items.count(); i++)
		{
			let factory = items.get(i);
			await factory.registerConnections(this);
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.foreign_keys = new Runtime.Map();
		this.connection_list = new Runtime.Map();
		this.annotations = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.ORM.Provider"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.Provider"] = Runtime.ORM.Provider;