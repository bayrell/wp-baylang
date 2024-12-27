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
Runtime.WordPress.Admin.Api.MailLogSearch = function()
{
	Runtime.Widget.Crud.SearchRelationApi.apply(this, arguments);
};
Runtime.WordPress.Admin.Api.MailLogSearch.prototype = Object.create(Runtime.Widget.Crud.SearchRelationApi.prototype);
Runtime.WordPress.Admin.Api.MailLogSearch.prototype.constructor = Runtime.WordPress.Admin.Api.MailLogSearch;
Object.assign(Runtime.WordPress.Admin.Api.MailLogSearch.prototype,
{
	/**
	 * Returns table name
	 */
	getTableName: function()
	{
		return "mail_delivery";
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["id","worker","plan","status","dest","uuid","title","message","gmtime_plan","gmtime_send","send_email_error","send_email_code","gmtime_add","is_deleted"]);
	},
	/**
	 * Returns rules
	 */
	getRules: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Build search query
	 */
	buildSearchQuery: async function(q)
	{
		q.orderBy("gmtime_add", "desc");
		return Promise.resolve(q);
	},
	/**
	 * Action search
	 */
	actionSearch: async function()
	{
		await Runtime.Widget.Crud.SearchRelationApi.prototype.actionSearch.bind(this)();
	},
});
Object.assign(Runtime.WordPress.Admin.Api.MailLogSearch, Runtime.Widget.Crud.SearchRelationApi);
Object.assign(Runtime.WordPress.Admin.Api.MailLogSearch,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "admin.wordpress.mail.log::search";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Api";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Api.MailLogSearch";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SearchRelationApi";
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
			"actionSearch",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionSearch")
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Api.MailLogSearch);
window["Runtime.WordPress.Admin.Api.MailLogSearch"] = Runtime.WordPress.Admin.Api.MailLogSearch;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Api.MailLogSearch;