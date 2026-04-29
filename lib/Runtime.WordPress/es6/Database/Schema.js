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
Runtime.WordPress.Database.Schema = class extends Runtime.ORM.DatabaseSchema
{
	/**
	 * Forms settings
	 */
	static forms()
	{
		return Runtime.Vector.create([
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "name"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "api_name"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "settings"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "email_to"})),
			new Runtime.ORM.Annotations.BooleanType(Runtime.Map.create({"name": "is_deleted"})),
			new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.Primary(Runtime.Map.create({"keys": Runtime.Vector.create(["id"])})),
		]);
	}
	
	
	/**
	 * Forms data
	 */
	static forms_data()
	{
		return Runtime.Vector.create([
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "form_id"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "form_title"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "form_position"})),
			new Runtime.ORM.Annotations.JsonType(Runtime.Map.create({"name": "data"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "utm"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "send_email_uuid"})),
			new Runtime.ORM.Annotations.TinyIntType(Runtime.Map.create({"name": "send_email_code"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "send_email_error"})),
			new Runtime.ORM.Annotations.BooleanType(Runtime.Map.create({"name": "spam"})),
			new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.create({"name": "gmtime_add"})),
			new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.Primary(Runtime.Map.create({"keys": Runtime.Vector.create(["id"])})),
		]);
	}
	
	
	/**
	 * Forms ip
	 */
	static forms_ip()
	{
		return Runtime.Vector.create([
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "ip"})),
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "count"})),
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "last"})),
			new Runtime.ORM.Annotations.Primary(Runtime.Map.create({"keys": Runtime.Vector.create(["ip"])})),
		]);
	}
	
	
	/**
	 * Mail settings
	 */
	static mail_settings()
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
	
	
	/**
	 * Mail log
	 */
	static mail_delivery()
	{
		return Runtime.Vector.create([
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "worker"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "plan"})),
			new Runtime.ORM.Annotations.TinyIntType(Runtime.Map.create({"name": "status"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "dest"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "uuid"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "title"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "message"})),
			new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.create({"name": "gmtime_plan"})),
			new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.create({"name": "gmtime_send"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "send_email_error"})),
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "send_email_code"})),
			new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.create({"name": "gmtime_add"})),
			new Runtime.ORM.Annotations.BooleanType(Runtime.Map.create({"name": "is_delete"})),
			new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.Primary(Runtime.Map.create({"keys": Runtime.Vector.create(["id"])})),
			new Runtime.ORM.Annotations.Unique(Runtime.Map.create({"keys": Runtime.Vector.create(["uuid"])})),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Database.Schema"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("forms", "forms_data", "forms_ip", "mail_settings", "mail_delivery");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "forms") return new Vector(
			new Runtime.ORM.Annotations.Table(Runtime.Map.create({"name": "forms"}))
		);
		if (field_name == "forms_data") return new Vector(
			new Runtime.ORM.Annotations.Table(Runtime.Map.create({"name": "forms_data"}))
		);
		if (field_name == "forms_ip") return new Vector(
			new Runtime.ORM.Annotations.Table(Runtime.Map.create({"name": "forms_ip"}))
		);
		if (field_name == "mail_settings") return new Vector(
			new Runtime.ORM.Annotations.Table(Runtime.Map.create({"name": "mail_settings"}))
		);
		if (field_name == "mail_delivery") return new Vector(
			new Runtime.ORM.Annotations.Table(Runtime.Map.create({"name": "mail_delivery"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Database.Schema"] = Runtime.WordPress.Database.Schema;