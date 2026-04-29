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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Database == 'undefined') Runtime.WordPress.Database = {};
Runtime.WordPress.Database.MailSettings = class extends Runtime.ORM.Record
{
	/**
	 * Returns table name
	 */
	static getTableName(){ return "mail_settings"; }
	
	
	/**
	 * Returns table schema
	 */
	static schema()
	{
		return Runtime.Vector.create([
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.TinyIntType(Runtime.Map.create({"name": "enable"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "plan"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "host"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "port"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "login"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "password"})),
			new Runtime.ORM.Annotations.TinyIntType(Runtime.Map.create({"name": "ssl_enable"})),
			new Runtime.ORM.Annotations.BooleanType(Runtime.Map.create({"name": "is_deleted"})),
			new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.Primary(Runtime.Map.create({"keys": Runtime.Vector.create(["id"])})),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Database.MailSettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Database.MailSettings"] = Runtime.WordPress.Database.MailSettings;