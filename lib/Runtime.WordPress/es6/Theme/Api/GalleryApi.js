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
Runtime.WordPress.Theme.Api.GalleryApi = class extends Runtime.Web.BaseApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "runtime.wordpress.gallery"; }
	
	
	/**
	 * Action search
	 */
	async actionSearch()
	{
		let connection = Runtime.ORM.Connection.get();
		/* Load items */
		let api_name = this.post_data.get("api_name");
		let q = new Runtime.ORM.Query().select(Runtime.Vector.create(["gallery_item.*"])).from("gallery_item").innerJoin("gallery", Runtime.Vector.create(["gallery.id = gallery_item.gallery_id"])).where("gallery.api_name", "=", api_name).orderBy("pos", "desc").orderBy("id", "asc");
		let result = await connection.fetchAll(q);
		/* Load images */
		let images_id = result.map((item) => { return item.get("image_id"); });
		let images = Runtime.WordPress.WP_Helper.loadImages(connection, images_id);
		/* Build items */
		let items = result.map((item) =>
		{
			let image_id = item.get("image_id");
			return Runtime.Map.create({
				"id": item.get("id"),
				"image_id": image_id,
				"image": images.get(image_id),
				"name": item.get("name"),
			});
		});
		/* Return result */
		this.success(Runtime.Map.create({
			"data": Runtime.Map.create({
				"items": items,
			}),
		}));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Api.GalleryApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionSearch");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionSearch") return new Vector(
			new Runtime.Web.Annotations.ApiMethod()
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.Api.GalleryApi"] = Runtime.WordPress.Theme.Api.GalleryApi;