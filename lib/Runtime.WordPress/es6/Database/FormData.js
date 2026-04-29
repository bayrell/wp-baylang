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
Runtime.WordPress.Database.FormData = class extends Runtime.ORM.Record
{
	/**
	 * Returns table name
	 */
	static getTableName(){ return "forms_data"; }
	
	
	/**
	 * Returns table schema
	 */
	static schema()
	{
		return Runtime.Vector.create([
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "form_id"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "form_title"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "metrika_id"})),
			new Runtime.ORM.Annotations.JsonType(Runtime.Map.create({"name": "data"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "utm"})),
			new Runtime.ORM.Annotations.BooleanType(Runtime.Map.create({"name": "spam"})),
			new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.create({"name": "gmtime_add", "autocreate": true})),
			new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.Primary(Runtime.Map.create({"keys": Runtime.Vector.create(["id"])})),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Database.FormData"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Database.FormData"] = Runtime.WordPress.Database.FormData;