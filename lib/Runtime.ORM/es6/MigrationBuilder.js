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
Runtime.ORM.MigrationBuilder = class extends Runtime.BaseObject
{
	/**
	 * Constructor
	 */
	constructor(connection_name)
	{
		if (connection_name == undefined) connection_name = "default";
		super();
		this.pool = Runtime.ORM.ConnectionPool.get(connection_name);
	}
	
	
	/**
	 * Create connection
	 */
	async createConnection(execute)
	{
		if (execute)
		{
			return await this.pool.getConnection();
		}
		let connection = this.pool.createConnection();
		connection.setQueryLog(this.log);
		connection.setCursorFactory(new Runtime.ORM.Factory.CursorFactory("Runtime.ORM.Cursor"));
		return connection;
	}
	
	
	/**
	 * Returns query log
	 */
	getQueryLog(){ return this.connection.getQueryLog(); }
	
	
	/**
	 * Returns SQL query
	 */
	getSQL()
	{
		let items = this.log.map((item) => { return item.get("sql"); });
		let result = Runtime.Vector.create([]);
		for (let i = 0; i < items.count(); i++)
		{
			let item = items.get(i);
			let is_comment = Runtime.rs.substr(item, 0, 2) == "--";
			if (is_comment)
			{
				if (i != 0) result.push("");
			}
			else
			{
				item += ";";
			}
			result.push(item);
		}
		return result;
	}
	
	
	/**
	 * Init migrations
	 */
	async init()
	{
		/* Get database provider */
		let database = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		/* Create query log */
		this.log = new Runtime.ORM.QueryLog();
		/* Get migrations */
		this.migrations = await this.getMigrations();
		/* Create table */
		await this.createTable();
		/* Load history */
		await this.loadHistory();
	}
	
	
	/**
	 * Create migrations table
	 */
	async createTable()
	{
		let q = new Runtime.ORM.Query().select().from("`information_schema`.`tables`", "t").addRawField("count(*) as c").where("table_schema", "=", this.pool.getDatabaseName()).where("table_name", "=", this.pool.getTableName("database_migrations"));
		let connection = await this.pool.getConnection();
		try
		{
			let count = await connection.fetchVar(q, "c");
			if (count == 1) return;
			/* Create table */
			let sql = Runtime.Vector.create([
				"CREATE TABLE `" + String(connection.getTableName("database_migrations")) + String("` ("),
				"  `id` bigint(20) NOT NULL AUTO_INCREMENT,",
				"  `name` varchar(255) NOT NULL,",
				"  `gmtime_add` datetime NOT NULL,",
				"  PRIMARY KEY (`id`),",
				"  UNIQUE KEY (`name`)",
				") ENGINE=InnoDB",
			]);
			await connection.executeSQL(Runtime.rs.join("\n", sql));
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			await connection.release();
		}
	}
	
	
	/**
	 * Load history
	 */
	async loadHistory()
	{
		let q = new Runtime.ORM.Query().select(Runtime.Vector.create(["id", "name", "gmtime_add"])).from("database_migrations").orderBy("id", "asc");
		let connection = await this.pool.getConnection();
		try
		{
			this.history = await connection.fetchAll(q);
			for (let i = 0; i < this.history.count(); i++)
			{
				let item = this.history.get(i);
				this.history_cache.set(item.get("name"), item);
			}
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			await connection.release();
		}
	}
	
	
	/**
	 * Returns migrations
	 */
	async getMigrations()
	{
		let items = Runtime.rtl.getContext().getEntities("Runtime.ORM.Annotations.Migration");
		items = items.map((annotation) => { return Runtime.rtl.newInstance(annotation.name); });
		/* Extends items */
		for (let i = 0; i < items.count(); i++)
		{
			let item = items.get(i);
			items.appendItems(item.buildMigrations());
		}
		/* Create new conection */
		let connection = this.pool.createConnection();
		/* Make index */
		let index = new Runtime.Map();
		for (let i = 0; i < items.count(); i++)
		{
			let item = items.get(i);
			index.set(item.getName(), item);
			/* Set connection */
			item.setConnection(connection);
		}
		/* Add items */
		let migrations = Runtime.Vector.create([]);
		let cache = new Runtime.Map();
		let addItem = null;
		addItem = (item) =>
		{
			if (item == null) return;
			if (cache.has(item.getName())) return;
			/* Add item to cache */
			cache.set(item.getName(), true);
			/* Get required migrations */
			let required = item.getRequired();
			required = required.map((name) => { return index.get(name); });
			required = required.filter((item) => { return item != null; });
			/* Add required migrations */
			for (let i = 0; i < required.count(); i++)
			{
				addItem(required.get(i));
			}
			/* Add item */
			migrations.push(item);
		};
		for (let i = 0; i < items.count(); i++)
		{
			addItem(items.get(i));
		}
		/* Release connection */
		await connection.release();
		return migrations;
	}
	
	
	/**
	 * Check allow migration
	 */
	allowMigration(migration, kind)
	{
		let name = migration.getName();
		if (kind == "up")
		{
			if (this.history_cache.has(name)) return false;
			return true;
		}
		else if (kind == "down")
		{
			if (this.history_cache.has(name)) return true;
		}
		return false;
	}
	
	
	/**
	 * Add migration to dabase
	 */
	async addMigration(connection, migration)
	{
		let name = migration.getName();
		/* Insert record */
		await connection.insert("database_migrations", Runtime.Map.create({
			"name": name,
			"gmtime_add": Runtime.DateTime.now().setOffset(0).format(),
		}));
	}
	
	
	/**
	 * Remove migration
	 */
	async removeMigration(connection, migration)
	{
		let name = migration.getName();
		/* Remove record */
		let q = new Runtime.ORM.Query().delete("database_migrations").where("name", "=", name);
		await connection.query(q);
	}
	
	
	/**
	 * Set connection
	 */
	setConnection(connection)
	{
		for (let i = 0; i < this.migrations.count(); i++)
		{
			let migration = this.migrations.get(i);
			migration.setConnection(connection);
		}
	}
	
	
	/**
	 * Up migrations
	 */
	async up(execute)
	{
		if (execute == undefined) execute = false;
		let connection = await this.createConnection(execute);
		try
		{
			this.setConnection(connection);
			for (let i = 0; i < this.migrations.count(); i++)
			{
				let migration = this.migrations.get(i);
				/* Check allow migration */
				let allow = this.allowMigration(migration, "up");
				if (!allow) continue;
				/* Up migration */
				if (migration.up)
				{
					let up = migration.up;
					await up();
				}
				/* Add migration */
				if (execute)
				{
					await this.addMigration(connection, migration);
				}
			}
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			await connection.release();
		}
	}
	
	
	/**
	 * Down migrations
	 */
	async down(execute)
	{
		if (execute == undefined) execute = false;
		let connection = await this.createConnection(execute);
		try
		{
			this.setConnection(connection);
			for (let i = this.migrations.count() - 1; i >= 0; i--)
			{
				let migration = this.migrations.get(i);
				/* Check allow migration */
				let allow = this.allowMigration(migration, "down");
				if (!allow) continue;
				/* Down */
				if (migration.down)
				{
					let down = migration.down;
					await down();
				}
				/* Remove migration */
				if (execute)
				{
					await this.removeMigration(connection, migration);
				}
			}
		}
		catch (_ex)
		{
			throw _ex;
		}
		finally
		{
			await connection.release();
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.log = null;
		this.pool = null;
		this.migrations = null;
		this.history = Runtime.Vector.create([]);
		this.history_cache = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.ORM.MigrationBuilder"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.MigrationBuilder"] = Runtime.ORM.MigrationBuilder;