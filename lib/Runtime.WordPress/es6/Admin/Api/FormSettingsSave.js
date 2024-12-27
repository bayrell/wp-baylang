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
if (typeof Runtime.WordPress.Admin.Api == 'undefined') Runtime.WordPress.Admin.Api = {};
Runtime.WordPress.Admin.Api.FormSettingsSave = function()
{
	Runtime.Widget.Crud.SaveRelationApi.apply(this, arguments);
};
Runtime.WordPress.Admin.Api.FormSettingsSave.prototype = Object.create(Runtime.Widget.Crud.SaveRelationApi.prototype);
Runtime.WordPress.Admin.Api.FormSettingsSave.prototype.constructor = Runtime.WordPress.Admin.Api.FormSettingsSave;
Object.assign(Runtime.WordPress.Admin.Api.FormSettingsSave.prototype,
{
	/**
	 * Returns table name
	 */
	getTableName: function()
	{
		return "forms";
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["id","name","api_name","settings","email_to"]);
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from(["name","api_name","settings","email_to"]);
	},
	/**
	 * Returns rules
	 */
	getRules: function()
	{
		return Runtime.Vector.from([new Runtime.Widget.Crud.Rules.Purify(Runtime.Map.from({"name":"api_name"})),new Runtime.Widget.Crud.Rules.LowerCase(Runtime.Map.from({"name":"api_name"})),new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"api_name"})),new Runtime.Widget.Crud.Rules.Unique(Runtime.Map.from({"keys":Runtime.Vector.from(["api_name"])}))]);
	},
	/**
	 * Build search query
	 */
	buildSearchQuery: async function(q)
	{
		q.orderBy("name", "asc");
		return Promise.resolve(q);
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		await Runtime.Widget.Crud.SaveRelationApi.prototype.actionSave.bind(this)();
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		await Runtime.Widget.Crud.SaveRelationApi.prototype.actionDelete.bind(this)();
	},
});
Object.assign(Runtime.WordPress.Admin.Api.FormSettingsSave, Runtime.Widget.Crud.SaveRelationApi);
Object.assign(Runtime.WordPress.Admin.Api.FormSettingsSave,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "admin.wordpress.forms.settings::save";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Api";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Api.FormSettingsSave";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SaveRelationApi";
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
			"actionSave",
			"actionDelete",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionSave")
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
		if (field_name == "actionDelete")
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Api.FormSettingsSave);
window["Runtime.WordPress.Admin.Api.FormSettingsSave"] = Runtime.WordPress.Admin.Api.FormSettingsSave;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Api.FormSettingsSave;