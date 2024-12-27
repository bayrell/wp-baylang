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
Runtime.WordPress.Database.Schema = function()
{
	Runtime.ORM.DatabaseSchema.apply(this, arguments);
};
Runtime.WordPress.Database.Schema.prototype = Object.create(Runtime.ORM.DatabaseSchema.prototype);
Runtime.WordPress.Database.Schema.prototype.constructor = Runtime.WordPress.Database.Schema;
Object.assign(Runtime.WordPress.Database.Schema.prototype,
{
});
Object.assign(Runtime.WordPress.Database.Schema, Runtime.ORM.DatabaseSchema);
Object.assign(Runtime.WordPress.Database.Schema,
{
	/**
	 * Forms settings
	 */
	forms: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.WordPress.Database.Schema.forms", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.Vector.from([new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"name"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"api_name"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"settings"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"email_to"})),new Runtime.ORM.Annotations.BooleanType(Runtime.Map.from({"name":"is_deleted"})),new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.Primary(Runtime.Map.from({"keys":Runtime.Vector.from(["id"])}))]);
		Runtime.rtl._memorizeSave("Runtime.WordPress.Database.Schema.forms", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Forms data
	 */
	forms_data: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.WordPress.Database.Schema.forms_data", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.Vector.from([new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"form_id"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"form_title"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"form_position"})),new Runtime.ORM.Annotations.JsonType(Runtime.Map.from({"name":"data"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"utm"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"send_email_uuid"})),new Runtime.ORM.Annotations.TinyIntType(Runtime.Map.from({"name":"send_email_code"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"send_email_error"})),new Runtime.ORM.Annotations.BooleanType(Runtime.Map.from({"name":"spam"})),new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.from({"name":"gmtime_add"})),new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.Primary(Runtime.Map.from({"keys":Runtime.Vector.from(["id"])}))]);
		Runtime.rtl._memorizeSave("Runtime.WordPress.Database.Schema.forms_data", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Forms ip
	 */
	forms_ip: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.WordPress.Database.Schema.forms_ip", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.Vector.from([new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"ip"})),new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"count"})),new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"last"})),new Runtime.ORM.Annotations.Primary(Runtime.Map.from({"keys":Runtime.Vector.from(["ip"])}))]);
		Runtime.rtl._memorizeSave("Runtime.WordPress.Database.Schema.forms_ip", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Mail settings
	 */
	mail_settings: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.WordPress.Database.Schema.mail_settings", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.Vector.from([new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.TinyIntType(Runtime.Map.from({"name":"enable"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"plan"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"host"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"port"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"login"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"password"})),new Runtime.ORM.Annotations.TinyIntType(Runtime.Map.from({"name":"ssl_enable"})),new Runtime.ORM.Annotations.BooleanType(Runtime.Map.from({"name":"is_deleted"})),new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.Primary(Runtime.Map.from({"keys":Runtime.Vector.from(["id"])}))]);
		Runtime.rtl._memorizeSave("Runtime.WordPress.Database.Schema.mail_settings", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Mail log
	 */
	mail_delivery: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.WordPress.Database.Schema.mail_delivery", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.Vector.from([new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"worker"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"plan"})),new Runtime.ORM.Annotations.TinyIntType(Runtime.Map.from({"name":"status"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"dest"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"uuid"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"title"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"message"})),new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.from({"name":"gmtime_plan"})),new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.from({"name":"gmtime_send"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"send_email_error"})),new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"send_email_code"})),new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.from({"name":"gmtime_add"})),new Runtime.ORM.Annotations.BooleanType(Runtime.Map.from({"name":"is_delete"})),new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.Primary(Runtime.Map.from({"keys":Runtime.Vector.from(["id"])})),new Runtime.ORM.Annotations.Unique(Runtime.Map.from({"keys":Runtime.Vector.from(["uuid"])}))]);
		Runtime.rtl._memorizeSave("Runtime.WordPress.Database.Schema.mail_delivery", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Database";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Database.Schema";
	},
	getParentClassName: function()
	{
		return "Runtime.ORM.DatabaseSchema";
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
			"forms",
			"forms_data",
			"forms_ip",
			"mail_settings",
			"mail_delivery",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "forms")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.ORM.Annotations.Table(Runtime.Map.from({"name":"forms"})),
				]),
			});
		}
		if (field_name == "forms_data")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.ORM.Annotations.Table(Runtime.Map.from({"name":"forms_data"})),
				]),
			});
		}
		if (field_name == "forms_ip")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.ORM.Annotations.Table(Runtime.Map.from({"name":"forms_ip"})),
				]),
			});
		}
		if (field_name == "mail_settings")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.ORM.Annotations.Table(Runtime.Map.from({"name":"mail_settings"})),
				]),
			});
		}
		if (field_name == "mail_delivery")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.ORM.Annotations.Table(Runtime.Map.from({"name":"mail_delivery"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Runtime.WordPress.Database.Schema);
window["Runtime.WordPress.Database.Schema"] = Runtime.WordPress.Database.Schema;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Database.Schema;