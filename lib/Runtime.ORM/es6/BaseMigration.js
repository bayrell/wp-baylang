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
Runtime.ORM.BaseMigration = class extends Runtime.BaseObject
{
	/**
	 * Create migration
	 */
	constructor(params)
	{
		if (params == undefined) params = null;
		super();
		this._assign_values(params);
	}
	
	
	/**
	 * Set connection
	 */
	setConnection(connection)
	{
		this.connection = connection;
	}
	
	
	/**
	 * Returns name
	 */
	getName(){ return this.name; }
	
	
	/**
	 * Returns required migrations
	 */
	getRequired(){ return this.required.slice(); }
	
	
	/**
	 * Returns migrations
	 */
	getMigrations(){ return this.migrations.slice(); }
	
	
	/**
	 * Returns migrations
	 */
	buildMigrations()
	{
		let current_name = this.name;
		let result = Runtime.Vector.create([]);
		let prev_required = this.getRequired();
		/* Add child migrations */
		let items = this.getMigrations();
		for (let i = 0; i < items.count(); i++)
		{
			let migration_name = items.get(i);
			let f = new Runtime.Method(this, items.get(i));
			if (!f.exists()) continue;
			/* Get migration */
			let migration = f.apply();
			migration.name = this.name + String(".") + String(migration_name);
			migration.required = migration.required.concat(prev_required);
			prev_required = Runtime.Vector.create([migration.name]);
			/* Build migrations */
			result.appendItems(migration.buildMigrations());
			/* Add new migration */
			result.push(migration);
		}
		/* Change require */
		this.required = prev_required;
		return result;
	}
	
	
	/**
	 * Comment
	 */
	async comment(text)
	{
		await this.executeSQL("-- " + String(text));
	}
	
	
	/**
	 * Execute raw SQL
	 */
	async executeSQL(sql, data)
	{
		if (data == undefined) data = null;
		if (sql instanceof Runtime.Vector)
		{
			sql = Runtime.rs.join("\n", sql);
		}
		let q = new Runtime.ORM.Query();
		q.raw(sql, data);
		await this.connection.execute(q);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.name = "";
		this.connection = null;
		this.required = Runtime.Vector.create([]);
		this.migrations = Runtime.Vector.create([]);
		this.up = null;
		this.down = null;
	}
	static getClassName(){ return "Runtime.ORM.BaseMigration"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.BaseMigration"] = Runtime.ORM.BaseMigration;