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
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.Settings == 'undefined') Runtime.WordPress.Admin.Settings = {};
Runtime.WordPress.Admin.Settings.MigrationApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
Runtime.WordPress.Admin.Settings.MigrationApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
Runtime.WordPress.Admin.Settings.MigrationApi.prototype.constructor = Runtime.WordPress.Admin.Settings.MigrationApi;
Object.assign(Runtime.WordPress.Admin.Settings.MigrationApi.prototype,
{
	/**
	 * Execute
	 */
	up: async function(execute)
	{
		if (execute == undefined) execute = false;
		/* Get migrations */
		var builder = new Runtime.ORM.MigrationBuilder();
		builder.execute = execute;
		/* Init builder */
		await builder.init();
		/* Up migrations */
		await builder.up();
		/* Returns builder */
		return Promise.resolve(builder);
	},
	/**
	 * Action item
	 */
	actionItem: async function()
	{
		var builder = await this.up();
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"items":builder.getSQL()})}));
	},
	/**
	 * Update database
	 */
	actionUpdate: async function()
	{
		var builder = await this.up(true);
		this.success();
	},
});
Object.assign(Runtime.WordPress.Admin.Settings.MigrationApi, Runtime.Web.BaseApi);
Object.assign(Runtime.WordPress.Admin.Settings.MigrationApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "admin.wordpress.migration";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Settings.MigrationApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseApi";
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
			"actionItem",
			"actionUpdate",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionItem")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		if (field_name == "actionUpdate")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Runtime.WordPress.Admin.Settings.MigrationApi);
window["Runtime.WordPress.Admin.Settings.MigrationApi"] = Runtime.WordPress.Admin.Settings.MigrationApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Settings.MigrationApi;