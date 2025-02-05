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
Runtime.ORM.MigrationBuilder = function(connection_name)
{
	if (connection_name == undefined) connection_name = "default";
	Runtime.BaseObject.call(this);
	this.connection_name = connection_name;
};
Runtime.ORM.MigrationBuilder.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.MigrationBuilder.prototype.constructor = Runtime.ORM.MigrationBuilder;
Object.assign(Runtime.ORM.MigrationBuilder.prototype,
{
	/**
	 * Returns query log
	 */
	getQueryLog: function()
	{
		return this.connection_query.getQueryLog();
	},
	/**
	 * Returns SQL query
	 */
	getSQL: function()
	{
		var items = this.getQueryLog().map(Runtime.lib.attr("sql"));
		var result = Runtime.Vector.from([]);
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			var is_comment = Runtime.rs.substr(item, 0, 2) == "--";
			if (is_comment)
			{
				if (i != 0)
				{
					result.push("");
				}
			}
			else
			{
				item += Runtime.rtl.toStr(";");
			}
			result.push(item);
		}
		return result;
	},
	/**
	 * Init migrations
	 */
	init: async function()
	{
		/* Get database provider */
		var database = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		/* Fork connection */
		this.connection = database.getConnection(this.connection_name);
		this.connection_query = this.connection.fork();
		/* Set query log */
		this.connection_query.setQueryLog(new Runtime.ORM.QueryLog());
		/* Execute migration */
		if (!this.execute)
		{
			this.connection_query.setCursorFactory(new Runtime.ORM.Factory.CursorFactory("Runtime.ORM.Cursor"));
		}
		/* Get migrations */
		this.migrations = this.getMigrations();
		/* Create table */
		await this.createTable();
		/* Load history */
		await this.loadHistory();
	},
	/**
	 * Create migrations table
	 */
	createTable: async function()
	{
		var q = (new Runtime.ORM.Query()).select().from("`information_schema`.`tables`", "t").addRawField("count(*) as c").where("table_schema", "=", this.connection.database).where("table_name", "=", this.connection.getTableName("database_migrations"));
		var cursor = this.connection.execute(q);
		var count = await cursor.fetchVar("c");
		await cursor.close();
		if (count == 1)
		{
			return Promise.resolve();
		}
		/* Create table */
		var sql = Runtime.Vector.from(["CREATE TABLE `" + Runtime.rtl.toStr(this.connection.getTableName("database_migrations")) + Runtime.rtl.toStr("` ("),"  `id` bigint(20) NOT NULL AUTO_INCREMENT,","  `name` varchar(255) NOT NULL,","  `gmtime_add` datetime NOT NULL,","  PRIMARY KEY (`id`),","  UNIQUE KEY name (`name`)",") ENGINE=InnoDB"]);
		await this.connection.executeSQL(Runtime.rs.join("\n", sql));
	},
	/**
	 * Load history
	 */
	loadHistory: async function()
	{
		var q = (new Runtime.ORM.Query()).select(Runtime.Vector.from(["id","name","gmtime_add"])).from("database_migrations").orderBy("id", "asc");
		this.history = this.connection.fetchAll(q).toDict();
		for (var i = 0; i < this.history.count(); i++)
		{
			var item = this.history.get(i);
			this.history_cache.set(item.get("name"), item);
		}
	},
	/**
	 * Returns migrations
	 */
	getMigrations: function()
	{
		var items = Runtime.rtl.getContext().getEntities("Runtime.ORM.Annotations.Migration");
		items = items.map((annotation) =>
		{
			return Runtime.rtl.newInstance(annotation.name);
		});
		/* Extends items */
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			items.appendItems(item.buildMigrations());
		}
		/* Make index */
		var index = Runtime.Map.from({});
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			index.set(item.getName(), item);
			/* Set connection */
			item.setConnection(this.connection_query);
		}
		/* Add items */
		var migrations = Runtime.Vector.from([]);
		var cache = Runtime.Map.from({});
		var addItem = null;
		addItem = (item) =>
		{
			if (item == null)
			{
				return ;
			}
			if (cache.has(item.getName()))
			{
				return ;
			}
			/* Add item to cache */
			cache.set(item.getName(), true);
			/* Get required migrations */
			var required = item.getRequired();
			required = required.map((name) =>
			{
				return index.get(name);
			});
			required = required.filter(Runtime.lib.equalNot(null));
			/* Add required migrations */
			for (var i = 0; i < required.count(); i++)
			{
				addItem(required.get(i));
			}
			/* Add item */
			migrations.push(item);
		};
		for (var i = 0; i < items.count(); i++)
		{
			addItem(items.get(i));
		}
		return migrations;
	},
	/**
	 * Check allow migration
	 */
	allowMigration: function(migration, kind)
	{
		var name = migration.getName();
		if (kind == "up")
		{
			if (this.history_cache.has(name))
			{
				return false;
			}
			return true;
		}
		else if (kind == "down")
		{
			if (this.history_cache.has(name))
			{
				return true;
			}
		}
		return false;
	},
	/**
	 * Add migration to dabase
	 */
	addMigration: async function(migration)
	{
		var name = migration.getName();
		/* Insert record */
		await this.connection.insert("database_migrations", Runtime.Map.from({"name":name,"gmtime_add":Runtime.DateTime.now().setOffset(0).getDateTimeString()}));
	},
	/**
	 * Remove migration
	 */
	removeMigration: async function(migration)
	{
		var name = migration.getName();
		/* Remove record */
		var q = (new Runtime.ORM.Query()).delete("database_migrations").where("name", "=", name);
		var c = await this.connection.execute(q);
		await c.close();
	},
	/**
	 * Up migrations
	 */
	up: async function()
	{
		for (var i = 0; i < this.migrations.count(); i++)
		{
			var migration = this.migrations.get(i);
			/* Check allow migration */
			var allow = this.allowMigration(migration, "up");
			if (allow == 0)
			{
				continue;
			}
			/* Up migration */
			if (migration.up)
			{
				await Runtime.rtl.apply(migration.up);
			}
			/* Add migration */
			if (this.execute)
			{
				await this.addMigration(migration);
			}
		}
	},
	/**
	 * Down migrations
	 */
	down: async function()
	{
		for (var i = this.migrations.count() - 1; i >= 0; i--)
		{
			var migration = this.migrations.get(i);
			/* Check allow migration */
			var allow = this.allowMigration(migration, "down");
			if (allow == 0)
			{
				continue;
			}
			/* Down */
			if (migration.down)
			{
				await Runtime.rtl.apply(migration.down);
			}
			/* Remove migration */
			if (this.execute)
			{
				await this.removeMigration(migration);
			}
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.connection = null;
		this.connection_query = null;
		this.migrations = null;
		this.connection_name = "";
		this.execute = false;
		this.history = Runtime.Vector.from([]);
		this.history_cache = Runtime.Map.from({});
	},
});
Object.assign(Runtime.ORM.MigrationBuilder, Runtime.BaseObject);
Object.assign(Runtime.ORM.MigrationBuilder,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.MigrationBuilder";
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
Runtime.rtl.defClass(Runtime.ORM.MigrationBuilder);
window["Runtime.ORM.MigrationBuilder"] = Runtime.ORM.MigrationBuilder;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.MigrationBuilder;