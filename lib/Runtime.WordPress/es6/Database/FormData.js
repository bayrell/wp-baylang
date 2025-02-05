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
Runtime.WordPress.Database.FormData = function()
{
	Runtime.ORM.Relation.apply(this, arguments);
};
Runtime.WordPress.Database.FormData.prototype = Object.create(Runtime.ORM.Relation.prototype);
Runtime.WordPress.Database.FormData.prototype.constructor = Runtime.WordPress.Database.FormData;
Object.assign(Runtime.WordPress.Database.FormData.prototype,
{
	/**
	 * Save
	 */
	save: async function(connection, params)
	{
		if (params == undefined) params = null;
		if (this.get("gmtime_add") == null)
		{
			this.set("gmtime_add", Runtime.DateTime.now());
		}
		await Runtime.ORM.Relation.prototype.save.call(this, connection, params);
	},
});
Object.assign(Runtime.WordPress.Database.FormData, Runtime.ORM.Relation);
Object.assign(Runtime.WordPress.Database.FormData,
{
	/**
     * Returns table name
     */
	getTableName: function()
	{
		return "forms_data";
	},
	/**
     * Returns table schema
     */
	schema: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.WordPress.Database.FormData.schema", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.Vector.from([new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"form_id"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"form_title"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"metrika_id"})),new Runtime.ORM.Annotations.JsonType(Runtime.Map.from({"name":"data"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"utm"})),new Runtime.ORM.Annotations.BooleanType(Runtime.Map.from({"name":"spam"})),new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.from({"name":"gmtime_add"})),new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.Primary(Runtime.Map.from({"keys":Runtime.Vector.from(["id"])}))]);
		Runtime.rtl._memorizeSave("Runtime.WordPress.Database.FormData.schema", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Database";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Database.FormData";
	},
	getParentClassName: function()
	{
		return "Runtime.ORM.Relation";
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
Runtime.rtl.defClass(Runtime.WordPress.Database.FormData);
window["Runtime.WordPress.Database.FormData"] = Runtime.WordPress.Database.FormData;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Database.FormData;