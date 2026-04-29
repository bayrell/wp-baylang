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
Runtime.WordPress.Database.Form = class extends Runtime.ORM.Record
{
	/**
	 * Returns table name
	 */
	static getTableName(){ return "forms"; }
	
	
	/**
	 * Returns table schema
	 */
	static schema()
	{
		return Runtime.Vector.create([
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "name"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "api_name"})),
			new Runtime.ORM.Annotations.JsonType(Runtime.Map.create({"name": "settings"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "email_to"})),
			new Runtime.ORM.Annotations.BooleanType(Runtime.Map.create({"name": "is_deleted"})),
			new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.Primary(Runtime.Map.create({"keys": Runtime.Vector.create(["id"])})),
		]);
	}
	
	
	/**
	 * Returns rules
	 */
	getRules()
	{
		let settings = this.get("settings");
		let fields = settings.get("fields");
		let rules = new Runtime.Serializer.MapType();
		for (let i = 0; i < fields.count(); i++)
		{
			let field = fields.get(i);
			let field_name = field.get("name");
			let field_type = field.get("type");
			if (field_type == "input" || field_type == "textarea")
			{
				rules.addType(field_name, new Runtime.ORM.Annotations.StringType());
			}
			let field_required = Runtime.rtl.toInt(field.get("required")) || field.get("required") == "true";
			if (field_required)
			{
				rules.addType(field_name, new Runtime.Serializer.Required());
			}
		}
		return rules;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Database.Form"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Database.Form"] = Runtime.WordPress.Database.Form;