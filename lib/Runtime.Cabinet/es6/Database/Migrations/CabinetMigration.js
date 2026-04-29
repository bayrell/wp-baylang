"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.Cabinet == 'undefined') Runtime.Cabinet = {};
if (typeof Runtime.Cabinet.Database == 'undefined') Runtime.Cabinet.Database = {};
if (typeof Runtime.Cabinet.Database.Migrations == 'undefined') Runtime.Cabinet.Database.Migrations = {};
Runtime.Cabinet.Database.Migrations.CabinetMigration = class extends Runtime.Auth.Database.Migrations.AuthMigration
{
	/**
	 * Returns table name
	 */
	getTableName(){ return this.connection.getTableName("cabinet_users"); }
	
	
	/**
	 * Create users table migration
	 */
	append_users_table()
	{
		return new Runtime.ORM.BaseMigration(Runtime.Map.create({
			"up": async () =>
			{
				let table_name = this.getTableName();
				this.comment("Add email and name columns to " + String(table_name));
				await this.executeSQL("ALTER TABLE `" + String(table_name) + String("` ") + String("ADD COLUMN `email` VARCHAR(255) NOT NULL DEFAULT '' AFTER `login`, ") + String("ADD COLUMN `name` VARCHAR(255) NOT NULL DEFAULT '' AFTER `email`"));
				await this.executeSQL("ALTER TABLE `" + String(table_name) + String("` ") + String("ADD UNIQUE `email` (`email`)"));
			},
			"down": async () =>
			{
				let table_name = this.getTableName();
				this.comment("Remove email and name columns from " + String(table_name));
				await this.executeSQL("ALTER TABLE `" + String(table_name) + String("` ") + String("DROP COLUMN `email`, `name`"));
			},
		}));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.name = "cabinet_2026";
		this.migrations = Runtime.Vector.create([
			"create_users_table",
			"append_users_table",
		]);
	}
	static getClassName(){ return "Runtime.Cabinet.Database.Migrations.CabinetMigration"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Cabinet.Database.Migrations.CabinetMigration"] = Runtime.Cabinet.Database.Migrations.CabinetMigration;