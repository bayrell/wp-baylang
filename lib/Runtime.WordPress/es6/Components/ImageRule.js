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
if (typeof Runtime.WordPress.Components == 'undefined') Runtime.WordPress.Components = {};
Runtime.WordPress.Components.ImageRule = function()
{
	Runtime.Widget.Crud.Rules.CrudRule.apply(this, arguments);
};
Runtime.WordPress.Components.ImageRule.prototype = Object.create(Runtime.Widget.Crud.Rules.CrudRule.prototype);
Runtime.WordPress.Components.ImageRule.prototype.constructor = Runtime.WordPress.Components.ImageRule;
Object.assign(Runtime.WordPress.Components.ImageRule.prototype,
{
	/**
	 * Search after
	 */
	onSearchAfter: function(api)
	{
		var action = api.action;
		var items = api.items;
		/* Get primary keys */
		var pk_ids = items.map(Runtime.lib.attr(this.key)).filter(Runtime.lib.equalNot(null));
		/* Get connection */
		var conn = Runtime.ORM.Connection.get(this.db_prefix);
		/* Get images metadata */
		var q = (new Runtime.ORM.Query()).select(this.table_prefix + Runtime.rtl.toStr("postmeta")).addRawField("*").where("meta_key", "=", Runtime.Vector.from(["_wp_attachment_metadata","_wp_attached_file"])).where("post_id", "=", pk_ids);
		var images_metadata = conn.fetchAll(q);
		/* Get post */
		var q = (new Runtime.ORM.Query()).select(this.table_prefix + Runtime.rtl.toStr("posts")).addRawField("*").where("ID", "=", pk_ids);
		var posts = conn.fetchAll(q);
		/* Upload dir */
		var upload_url = "/wp-content/uploads";
		/* Map items */
		items = items.map((item) =>
		{
			var image_id = item.get(this.key);
			/* Get post */
			var post_time = "";
			var post = posts.findItem(Runtime.lib.equalAttr("ID", image_id));
			if (post)
			{
				var d = Runtime.DateTime.fromString(Runtime.rtl.attr(post, "post_modified_gmt"));
				post_time = d.timestamp();
			}
			var res = null;
			var obj_file = images_metadata.findItem((item) =>
			{
				return Runtime.rtl.attr(item, "meta_key") == "_wp_attached_file" && Runtime.rtl.attr(item, "post_id") == image_id;
			});
			var obj_metadata = images_metadata.findItem((item) =>
			{
				return Runtime.rtl.attr(item, "meta_key") == "_wp_attachment_metadata" && Runtime.rtl.attr(item, "post_id") == image_id;
			});
			if (obj_file && obj_metadata)
			{
				obj_metadata = obj_metadata.get("meta_value");
				obj_file = obj_file.get("meta_value");
				var image_url_after = "?_=" + Runtime.rtl.toStr(post_time);
			}
			item.set(this.name, res);
			return item;
		});
		/* Set api items */
		api.items = items;
	},
	/**
	 * Save after
	 */
	onSaveAfter: function(container)
	{
		this.constructor.onSearchAfter(container);
	},
	_init: function()
	{
		Runtime.Widget.Crud.Rules.CrudRule.prototype._init.call(this);
		this.name = "";
		this.key = "";
		this.db_prefix = "prefix";
		this.table_prefix = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "key")return this.key;
		else if (k == "db_prefix")return this.db_prefix;
		else if (k == "table_prefix")return this.table_prefix;
		return Runtime.Widget.Crud.Rules.CrudRule.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.WordPress.Components.ImageRule, Runtime.Widget.Crud.Rules.CrudRule);
Object.assign(Runtime.WordPress.Components.ImageRule,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Components.ImageRule";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.Rules.CrudRule";
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
		a.push("name");
		a.push("key");
		a.push("db_prefix");
		a.push("table_prefix");
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
Runtime.rtl.defClass(Runtime.WordPress.Components.ImageRule);
window["Runtime.WordPress.Components.ImageRule"] = Runtime.WordPress.Components.ImageRule;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Components.ImageRule;