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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Api == 'undefined') Runtime.WordPress.Theme.Api = {};
Runtime.WordPress.Theme.Api.PostApi = class extends Runtime.Widget.Api.SearchApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "runtime.wordpress.post"; }
	
	
	/**
	 * Returns relation name
	 */
	static getRecordName(){ return "Runtime.WordPress.Database.Post"; }
	
	
	/**
	 * Returns data rules
	 */
	getDataRules(rules)
	{
		super.getDataRules(rules);
		rules.addType("lang", new Runtime.Serializer.StringType());
		rules.addType("post_type", new Runtime.Serializer.Allowed(Runtime.Vector.create(["post", "page"])));
		rules.addType("post_type", new Runtime.Serializer.StringType(Runtime.Map.create({"default": "post"})));
		rules.addType("post_status", new Runtime.Serializer.Allowed(Runtime.Vector.create(["publish"])));
		rules.addType("post_status", new Runtime.Serializer.StringType(Runtime.Map.create({"default": "publish"})));
		rules.addType("preview", new Runtime.Serializer.StringType());
	}
	
	
	/**
	 * Returns serialize rules for pk
	 */
	getPrimaryRules()
	{
		return new Runtime.Serializer.MapType(Runtime.Map.create({
			"id": new Runtime.Serializer.IntegerType(),
		}));
	}
	
	
	/**
	 * Returns item fields
	 */
	getItemFields(action)
	{
		return Runtime.Vector.create([
			"ID",
			"post_content",
			"post_title",
			"post_name",
			"post_status",
			"post_type",
			"post_date_gmt",
			"post_modified_gmt",
		]);
	}
	
	
	/**
	 * Build lang
	 */
	async buildLangQuery(q)
	{
		let lang = this.data.get("lang");
		if (lang == "") return;
		let q_taxonomy = new Runtime.ORM.Query().select(Runtime.Vector.create([
			"term_taxonomy.term_taxonomy_id",
		])).from("term_taxonomy").innerJoin("terms", "terms.term_id = term_taxonomy.term_id").where("term_taxonomy.taxonomy", "=", "language").where("terms.slug", "=", lang);
		let conn = Runtime.ORM.Connection.get();
		let row = await conn.fetchOne(q_taxonomy);
		if (!row) return;
		let term_taxonomy_id = row.get("term_taxonomy_id");
		q.innerJoin("term_relationships", "term_lang.object_id = posts.ID", "term_lang");
		q.where("term_lang.term_taxonomy_id", "=", term_taxonomy_id);
	}
	
	
	/**
	 * Build Query
	 */
	async buildQuery(q)
	{
		await super.buildQuery(q);
		let post_type = this.data.get("post_type");
		let post_status = this.data.get("post_status");
		q.select(Runtime.Vector.create([
			"posts.ID",
			"posts.post_content",
			"posts.post_title",
			"posts.post_name",
			"posts.post_status",
			"posts.post_type",
			"posts.post_date_gmt",
			"posts.post_modified_gmt",
		])).orderBy("post_modified_gmt", "desc");
		/* Add preview */
		let preview = this.data.get("preview") == "true" && Runtime.WordPress.WP_Helper.isAdmin();
		if (!preview)
		{
			q.where("post_type", "=", post_type);
			q.where("post_status", "=", post_status);
		}
		this.buildLangQuery(q);
	}
	
	
	/**
	 * Search post
	 */
	async actionSearch()
	{
		await super.actionSearch();
	}
	
	
	/**
	 * Item post
	 */
	async actionItem()
	{
		await super.actionItem();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Api.PostApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionSearch", "actionItem");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionSearch") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "search"}))
		);
		if (field_name == "actionItem") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "item"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.Api.PostApi"] = Runtime.WordPress.Theme.Api.PostApi;