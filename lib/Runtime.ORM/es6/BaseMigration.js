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
Runtime.ORM.BaseMigration = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.ORM.BaseMigration.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.BaseMigration.prototype.constructor = Runtime.ORM.BaseMigration;
Object.assign(Runtime.ORM.BaseMigration.prototype,
{
	/**
	 * Set connection
	 */
	setConnection: function(connection)
	{
		this.connection = connection;
	},
	/**
	 * Returns name
	 */
	getName: function()
	{
		return this.name;
	},
	/**
	 * Returns required migrations
	 */
	getRequired: function()
	{
		return this.required.copy();
	},
	/**
	 * Returns migrations
	 */
	getMigrations: function()
	{
		return this.migrations.copy();
	},
	/**
	 * Returns migrations
	 */
	buildMigrations: function()
	{
		var current_name = this.name;
		var result = Runtime.Vector.from([]);
		var prev_required = this.getRequired();
		/* Add child migrations */
		var items = this.getMigrations();
		for (var i = 0; i < items.count(); i++)
		{
			var migration_name = items.get(i);
			var f = new Runtime.Callback(this, items.get(i));
			if (!f.exists())
			{
				continue;
			}
			/* Get migration */
			var migration = f.apply();
			migration.name = this.name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(migration_name);
			migration.required = migration.required.concat(prev_required);
			prev_required = Runtime.Vector.from([migration.name]);
			/* Build migrations */
			result.appendItems(migration.buildMigrations());
			/* Add new migration */
			result.push(migration);
		}
		/* Change require */
		this.required = prev_required;
		return result;
	},
	/**
	 * Comment
	 */
	comment: async function(text)
	{
		await this.executeSQL("-- " + Runtime.rtl.toStr(text));
	},
	/**
	 * Execute raw SQL
	 */
	executeSQL: async function(sql, data)
	{
		if (data == undefined) data = null;
		if (sql instanceof Runtime.Collection)
		{
			sql = Runtime.rs.join("\n", sql);
		}
		var q = new Runtime.ORM.Query();
		q.raw(sql, data);
		await this.connection.execute(q);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.name = "";
		this.connection = null;
		this.required = Runtime.Vector.from([]);
		this.migrations = Runtime.Vector.from([]);
		this.up = null;
		this.down = null;
	},
});
Object.assign(Runtime.ORM.BaseMigration, Runtime.BaseObject);
Object.assign(Runtime.ORM.BaseMigration,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.BaseMigration";
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
Runtime.rtl.defClass(Runtime.ORM.BaseMigration);
window["Runtime.ORM.BaseMigration"] = Runtime.ORM.BaseMigration;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.BaseMigration;