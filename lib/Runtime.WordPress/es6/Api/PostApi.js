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
Runtime.WordPress.Api.PostApi = function()
{
	Runtime.Widget.Crud.CrudApi.apply(this, arguments);
};
Runtime.WordPress.Api.PostApi.prototype = Object.create(Runtime.Widget.Crud.CrudApi.prototype);
Runtime.WordPress.Api.PostApi.prototype.constructor = Runtime.WordPress.Api.PostApi;
Object.assign(Runtime.WordPress.Api.PostApi.prototype,
{
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["ID","post_title","post_name","post_content","primary_category","taxonomy","categories","tags"]);
	},
	/**
	 * Returns query field
	 */
	getQueryField: function(field_name)
	{
		if (field_name == "tags" || field_name == "taxonomy" || field_name == "categories" || field_name == "primary_category")
		{
			return null;
		}
		return new Runtime.ORM.QueryField("posts", field_name);
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
		var post_type = this.post_data.get("post_type", "post");
		/* Add filter */
		q.where("posts.post_type", "=", post_type);
		q.where("posts.post_status", "=", "publish");
		q.orderBy("posts.post_modified_gmt", "desc");
		/* Set search */
		if (this.post_data.has("search"))
		{
			var search = this.post_data.get("search");
			q.addRawField((builder) =>
			{
				return "MATCH(`posts`.`post_title`) AGAINST (" + Runtime.rtl.toStr(builder.formatKey("text_search")) + Runtime.rtl.toStr(") * 10 + ") + Runtime.rtl.toStr("MATCH(`posts`.`post_content`) AGAINST (") + Runtime.rtl.toStr(builder.formatKey("text_search")) + Runtime.rtl.toStr(") as `full_text_search`");
			});
			q.value("text_search", search);
			q.addOrFilter(Runtime.Vector.from([new Runtime.ORM.QueryFilter("posts.post_title", "match", search, "full_text_search"),new Runtime.ORM.QueryFilter("posts.post_content", "match", search, "full_text_search")]));
			q.clearOrder();
			q.orderBy("full_text_search", "desc");
		}
		/* Set post id */
		if (this.post_data.has("post_id"))
		{
			var post_id = Runtime.rtl.to(this.post_data.get("post_id"), {"e":"int"});
			q.where("posts.ID", "=", post_id);
			q.calcFoundRows(false);
		}
		/* Set post name */
		if (this.post_data.has("post_name"))
		{
			var post_name = this.post_data.get("post_name");
			q.where("posts.post_name", "=", post_name);
			q.calcFoundRows(false);
		}
		/* Set term id */
		if (this.post_data.has("term_id"))
		{
			var term_id = Runtime.rtl.to(this.post_data.get("term_id"), {"e":"int"});
			q.innerJoin("term_relationships", Runtime.Vector.from(["posts.ID = term_relationships.object_id"]));
			q.innerJoin("term_taxonomy", Runtime.Vector.from(["term_relationships.term_taxonomy_id = term_taxonomy.term_taxonomy_id"]));
			q.where("term_taxonomy.term_id", "=", term_id);
		}
		/* Set archive */
		if (this.post_data.has("date"))
		{
			var date = this.post_data.get("date");
			var year = Runtime.rtl.to(Runtime.rs.substr(date, 0, 4), {"e":"int"});
			var month = Runtime.rtl.to(Runtime.rs.substr(date, 5, 7), {"e":"int"});
			if (year > 0 && month > 0 && month <= 12)
			{
				var date_begin = new Runtime.DateTime(Runtime.Map.from({"y":year,"m":month,"d":1}));
				var date_end = new Runtime.DateTime(Runtime.Map.from({"y":(month < 12) ? (year) : (year + 1),"m":(month < 12) ? (month + 1) : (1),"d":1}));
				date_end = date_end.shift(-1);
				q.where("post_date_gmt", ">=", date_begin.getDateTimeString());
				q.where("post_date_gmt", "<=", date_end.getDateTimeString());
			}
		}
	},
	/**
	 * After search
	 */
	onSearchAfter: async function()
	{
		await Runtime.Widget.Crud.CrudApi.prototype.onSearchAfter.call(this);
		var conn = this.getConnection();
		var fields = Runtime.Vector.from(["ID","post_title","post_name","post_content"]);
		/* Transform posts */
		var posts = this.items.toCollection();
		posts = posts.map((item) =>
		{
			return item.intersect(fields);
		});
		/* Build posts index */
		var posts_index = this.items.transition((item, index) =>
		{
			return Runtime.Vector.from([index,item.get("ID")]);
		});
		/* Get post ids */
		var pk_ids = this.items.map((item) =>
		{
			return item.get("ID");
		});
		/* Get categories */
		var categories_allowed = this.hasAllowedField("categories") || this.hasAllowedField("primary_category");
		var tags_allowed = this.hasAllowedField("tags");
		if (categories_allowed || tags_allowed)
		{
			var q = (new Runtime.ORM.Query()).select("terms").addFields(Runtime.Vector.from(["term_relationships.object_id","term_taxonomy.taxonomy","terms.term_id","terms.name"])).innerJoin("term_taxonomy", Runtime.Vector.from(["term_taxonomy.term_id = terms.term_id"])).innerJoin("term_relationships", Runtime.Vector.from(["term_taxonomy.term_taxonomy_id = term_relationships.term_taxonomy_id"])).where("term_relationships.object_id", "=", pk_ids);
			/* Get result */
			var taxonomy = conn.fetchAll(q);
			taxonomy.each((data) =>
			{
				var post_id = Runtime.rtl.to(data.get("object_id"), {"e":"int"});
				var term_id = Runtime.rtl.to(data.get("term_id"), {"e":"int"});
				var taxonomy = data.get("taxonomy");
				var taxonomy_name = data.get("name");
				/* Get post */
				if (!posts_index.has(post_id))
				{
					return ;
				}
				var pos = posts_index.get(post_id);
				var post = this.items.get(pos);
				/* Add taxonomy */
				if (!post.has("taxonomy"))
				{
					post.set("taxonomy", Runtime.Map.from({}));
				}
				var post_taxonomy = post.get("taxonomy");
				/* Add categories */
				if (categories_allowed && taxonomy == "category")
				{
					if (!post.has("categories"))
					{
						post.set("categories", Runtime.Vector.from([]));
					}
					var categories = post.get("categories");
					categories.push(term_id);
					post_taxonomy.set(term_id, Runtime.Map.from({"term_id":term_id,"taxonomy":taxonomy,"name":taxonomy_name}));
				}
				/* Add tags */
				if (tags_allowed && taxonomy == "post_tag")
				{
					if (!post.has("tags"))
					{
						post.set("tags", Runtime.Vector.from([]));
					}
					var categories = post.get("tags");
					categories.push(term_id);
					post_taxonomy.set(term_id, Runtime.Map.from({"term_id":term_id,"taxonomy":taxonomy,"name":taxonomy_name}));
				}
			});
			/* Sort taxonomy */
			this.items.each((post) =>
			{
				if (post.has("categories"))
				{
					post.set("categories", post.get("categories").sort());
				}
				if (post.has("tags"))
				{
					post.set("tags", post.get("tags").sort());
				}
			});
		}
		/* Build postmeta query */
		if (this.hasAllowedField("primary_category"))
		{
			var q = (new Runtime.ORM.Query()).select("postmeta").addRawField("`postmeta`.*").where("post_id", "=", pk_ids).where("meta_key", "=", "rank_math_primary_category");
			var primary_categories = await conn.fetchAll(q);
			/* Get primary category */
			primary_categories.each((postmeta) =>
			{
				var post_id = Runtime.rtl.to(postmeta.get("post_id"), {"e":"int"});
				var meta_value = Runtime.rtl.to(postmeta.get("meta_value"), {"e":"int"});
				var meta_key = postmeta.get("meta_key");
				if (!posts_index.has(post_id))
				{
					return ;
				}
				if (meta_key != "rank_math_primary_category")
				{
					return ;
				}
				var pos = posts_index.get(post_id);
				var post = this.items.get(pos);
				post.set("primary_category", meta_value);
			});
			/* Set primary category from taxonomy */
			this.items.each((post) =>
			{
				var primary_category = Runtime.rtl.to(post.get("primary_category"), {"e":"int"});
				if (primary_category > 0)
				{
					return ;
				}
				if (!post.has("taxonomy"))
				{
					return ;
				}
				if (!post.has("categories"))
				{
					return ;
				}
				var taxonomy = post.get("taxonomy");
				var categories = post.get("categories");
				if (categories.count() == 0)
				{
					return ;
				}
				/* Set primary category */
				var first_category = categories.get(0);
				post.set("primary_category", first_category);
			});
		}
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
	/**
	 * Returns archive
	 */
	getArchive: async function()
	{
		var conn = Runtime.ORM.Connection.get("prefix");
		var items = Runtime.Vector.from([]);
		/* Build query */
		var q = (new Runtime.ORM.Query()).select("posts").distinct(true).addRawField("DATE_FORMAT(`posts`.`post_date_gmt`, '%Y-%m') as `post_date`").where("post_type", "=", "post").where("post_status", "=", "publish").orderBy("post_date", "desc");
		items = await conn.fetchAll(q);
		/* Transform items */
		items = items.map((item) =>
		{
			return item.get("post_date");
		});
		/* Set result */
		this.result.success(Runtime.Map.from({"data":Runtime.Map.from({"items":items})}));
	},
});
Object.assign(Runtime.WordPress.Api.PostApi, Runtime.Widget.Crud.CrudApi);
Object.assign(Runtime.WordPress.Api.PostApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "runtime.wordpress.post";
	},
	/**
	 * Returns table name
	 */
	getTableName: function()
	{
		return "posts";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Api";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Api.PostApi";
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
			"getArchive",
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
		if (field_name == "getArchive")
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
Runtime.rtl.defClass(Runtime.WordPress.Api.PostApi);
window["Runtime.WordPress.Api.PostApi"] = Runtime.WordPress.Api.PostApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Api.PostApi;