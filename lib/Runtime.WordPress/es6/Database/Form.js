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
Runtime.WordPress.Database.Form = function()
{
	Runtime.ORM.Relation.apply(this, arguments);
};
Runtime.WordPress.Database.Form.prototype = Object.create(Runtime.ORM.Relation.prototype);
Runtime.WordPress.Database.Form.prototype.constructor = Runtime.WordPress.Database.Form;
Object.assign(Runtime.WordPress.Database.Form.prototype,
{
});
Object.assign(Runtime.WordPress.Database.Form, Runtime.ORM.Relation);
Object.assign(Runtime.WordPress.Database.Form,
{
	/**
     * Returns table name
     */
	getTableName: function()
	{
		return "forms";
	},
	/**
     * Returns table schema
     */
	schema: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.WordPress.Database.Form.schema", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.Vector.from([new Runtime.ORM.Annotations.BigIntType(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"name"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"api_name"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"settings"})),new Runtime.ORM.Annotations.StringType(Runtime.Map.from({"name":"email_to"})),new Runtime.ORM.Annotations.BooleanType(Runtime.Map.from({"name":"is_deleted"})),new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.from({"name":"id"})),new Runtime.ORM.Annotations.Primary(Runtime.Map.from({"keys":Runtime.Vector.from(["id"])}))]);
		Runtime.rtl._memorizeSave("Runtime.WordPress.Database.Form.schema", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Database";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Database.Form";
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
Runtime.rtl.defClass(Runtime.WordPress.Database.Form);
window["Runtime.WordPress.Database.Form"] = Runtime.WordPress.Database.Form;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Database.Form;