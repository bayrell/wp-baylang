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
if (typeof Runtime.WordPress.Api == 'undefined') Runtime.WordPress.Api = {};
Runtime.WordPress.Api.TermApi = function()
{
	Runtime.Widget.Crud.CrudApi.apply(this, arguments);
};
Runtime.WordPress.Api.TermApi.prototype = Object.create(Runtime.Widget.Crud.CrudApi.prototype);
Runtime.WordPress.Api.TermApi.prototype.constructor = Runtime.WordPress.Api.TermApi;
Object.assign(Runtime.WordPress.Api.TermApi.prototype,
{
	/**
	 * Returns max limit
	 */
	getMaxLimit: function()
	{
		return -1;
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["term_id","name","slug","taxonomy","parent_id","count"]);
	},
	/**
	 * Returns query field
	 */
	getQueryField: function(field_name)
	{
		if (field_name == "parent_id")
		{
			return new Runtime.ORM.QueryField("term_taxonomy", "parent", field_name);
		}
		if (field_name == "taxonomy" || field_name == "count")
		{
			return new Runtime.ORM.QueryField("term_taxonomy", field_name);
		}
		return new Runtime.ORM.QueryField("terms", field_name);
	},
	/**
	 * Build search query
	 */
	buildSearchQuery: async function(q)
	{
		var taxonomy_name = this.post_data.get("taxonomy", "category");
		q.where("term_taxonomy.taxonomy", "=", taxonomy_name);
		q.innerJoin("term_taxonomy", Runtime.Vector.from(["term_taxonomy.term_id = terms.term_id"]));
		q.orderBy("terms.name", "asc");
		/* Set term id */
		if (this.post_data.has("term_id"))
		{
			var term_id = Runtime.rtl.to(this.post_data.get("term_id"), {"e":"int"});
			q.where("terms.ID", "=", term_id);
			q.calcFoundRows(false);
		}
		/* Set slug */
		if (this.post_data.has("slug"))
		{
			var slug = this.post_data.get("slug");
			q.where("terms.slug", "=", slug);
		}
	},
	/**
	 * Convert item
	 */
	convertItem: function(fields, item)
	{
		item.set("count", Runtime.rtl.to(item.get("count"), {"e":"int"}));
		item.set("parent_id", Runtime.rtl.to(item.get("parent_id"), {"e":"int"}));
		item.set("term_id", Runtime.rtl.to(item.get("term_id"), {"e":"int"}));
		return Runtime.Widget.Crud.CrudApi.prototype.convertItem.call(this, fields, item);
	},
	/**
	 * Action search
	 */
	actionSearch: async function()
	{
		await Runtime.Widget.Crud.CrudApi.prototype.actionSearch.call(this);
	},
	/**
	 * Action search one
	 */
	actionSearchOne: async function()
	{
		await Runtime.Widget.Crud.CrudApi.prototype.actionSearchOne.call(this);
	},
});
Object.assign(Runtime.WordPress.Api.TermApi, Runtime.Widget.Crud.CrudApi);
Object.assign(Runtime.WordPress.Api.TermApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "runtime.wordpress.term";
	},
	/**
	 * Returns table name
	 */
	getTableName: function()
	{
		return "terms";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Api";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Api.TermApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.CrudApi";
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
			"actionSearchOne",
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
		if (field_name == "actionSearchOne")
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
Runtime.rtl.defClass(Runtime.WordPress.Api.TermApi);
window["Runtime.WordPress.Api.TermApi"] = Runtime.WordPress.Api.TermApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Api.TermApi;