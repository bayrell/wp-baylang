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
if (typeof Runtime.Auth == 'undefined') Runtime.Auth = {};
if (typeof Runtime.Auth.Database == 'undefined') Runtime.Auth.Database = {};
if (typeof Runtime.Auth.Database.Migrations == 'undefined') Runtime.Auth.Database.Migrations = {};
Runtime.Auth.Database.Migrations.AuthMigration = class extends Runtime.ORM.BaseMigration
{
	/**
	 * Returns table name
	 */
	getTableName(){ return this.connection.getTableName("users"); }
	
	
	/**
	 * Create users table migration
	 */
	create_users_table()
	{
		return new Runtime.ORM.BaseMigration(Runtime.Map.create({
			"up": async () =>
			{
				let table_name = this.getTableName();
				this.comment("Create table " + String(table_name));
				await this.executeSQL("CREATE TABLE `" + String(table_name) + String("` (\n\t\t\t\t\t`id` BIGINT NOT NULL AUTO_INCREMENT,\n\t\t\t\t\t`login` VARCHAR(255) NOT NULL DEFAULT '',\n\t\t\t\t\t`password` VARCHAR(255) NOT NULL DEFAULT '',\n\t\t\t\t\t`is_deleted` TINYINT(1) NOT NULL DEFAULT 0,\n\t\t\t\t\t`gmtime_add` DATETIME NOT NULL,\n\t\t\t\t\t`gmtime_edit` DATETIME NOT NULL,\n\t\t\t\t\tPRIMARY KEY (`id`),\n\t\t\t\t\tUNIQUE KEY `login` (`login`)\n\t\t\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"));
			},
			"down": async () =>
			{
				let table_name = this.getTableName();
				this.comment("Drop table " + String(table_name));
				await this.executeSQL("DROP TABLE IF EXISTS `" + String(table_name) + String("`"));
			},
		}));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.name = "auth_2026";
		this.required = Runtime.Vector.create([]);
		this.migrations = Runtime.Vector.create([
			"create_users_table",
		]);
	}
	static getClassName(){ return "Runtime.Auth.Database.Migrations.AuthMigration"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Auth.Database.Migrations.AuthMigration"] = Runtime.Auth.Database.Migrations.AuthMigration;