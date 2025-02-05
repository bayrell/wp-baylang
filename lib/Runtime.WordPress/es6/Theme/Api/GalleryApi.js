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
Runtime.WordPress.Theme.Api.GalleryApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
Runtime.WordPress.Theme.Api.GalleryApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
Runtime.WordPress.Theme.Api.GalleryApi.prototype.constructor = Runtime.WordPress.Theme.Api.GalleryApi;
Object.assign(Runtime.WordPress.Theme.Api.GalleryApi.prototype,
{
	/**
	 * Action search
	 */
	actionSearch: async function()
	{
		var connection = Runtime.ORM.Connection.get();
		/* Load items */
		var api_name = this.post_data.get("api_name");
		var q = (new Runtime.ORM.Query()).select(Runtime.Vector.from(["gallery_item.*"])).from("gallery_item").innerJoin("gallery", Runtime.Vector.from(["gallery.id = gallery_item.gallery_id"])).where("gallery.api_name", "=", api_name).orderBy("pos", "desc").orderBy("id", "asc");
		var result = await connection.fetchAll(q);
		/* Load images */
		var images_id = result.map((item) =>
		{
			return item.get("image_id");
		});
		var images = Runtime.WordPress.WP_Helper.loadImages(connection, images_id);
		/* Build items */
		var items = result.map((item) =>
		{
			var image_id = item.get("image_id");
			return Runtime.Map.from({"id":item.get("id"),"image_id":image_id,"image":images.get(image_id),"name":item.get("name")});
		});
		/* Return result */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"items":items})}));
	},
});
Object.assign(Runtime.WordPress.Theme.Api.GalleryApi, Runtime.Web.BaseApi);
Object.assign(Runtime.WordPress.Theme.Api.GalleryApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "runtime.wordpress.gallery";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Api";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Api.GalleryApi";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Api.GalleryApi);
window["Runtime.WordPress.Theme.Api.GalleryApi"] = Runtime.WordPress.Theme.Api.GalleryApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Api.GalleryApi;