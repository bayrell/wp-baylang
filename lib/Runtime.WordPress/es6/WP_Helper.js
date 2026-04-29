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
Runtime.WordPress.WP_Helper = class
{
	/**
	 * Returns option by name
	 */
	static get_option(name, value)
	{
		if (value == undefined) value = "";
	}
	
	
	/**
	 * Update option by name
	 */
	static update_option(name, value)
	{
	}
	
	
	/**
	 * Returns app version
	 */
	static getAppVersion(version)
	{
		let js_version = this.get_option("app_js_vesion");
		if (js_version) return version + String("_") + String(js_version);
		return version;
	}
	
	
	/**
	 * Setup app version
	 */
	static setAppVersion(timestamp)
	{
		this.update_option("app_js_vesion", timestamp);
	}
	
	
	/**
	 * Check wp nonce
	 */
	static check_wp_nonce(nonce_action)
	{
	}
	
	
	/**
	 * Returns true if user is admin
	 */
	static isAdmin()
	{
		return false;
	}
	
	
	/**
	 * Load images
	 */
	static async loadImages(images, connection)
	{
		if (connection == undefined) connection = null;
		let result = new Runtime.Map();
		/* Get connection */
		if (!connection) connection = Runtime.ORM.Connection.get();
		/* Get images metadata */
		let q = new Runtime.ORM.Query().select().from("postmeta").addRawField("*").where("meta_key", "=", Runtime.Vector.create(["_wp_attachment_metadata", "_wp_attached_file"])).where("post_id", "=", images);
		let images_metadata = await connection.fetchAll(q);
		/* Get post */
		let q = new Runtime.ORM.Query().select().from("posts").addRawField("*").where("ID", "=", images);
		let posts = await connection.fetchAll(q);
		/* Upload dir */
		let upload_url = "/wp-content/uploads";
		/* Map items */
		for (let i = 0; i < images.count(); i++)
		{
			let image_id = images.get(i);
			let image = null;
			/* Get post */
			let post_time = "";
			let post = posts.find((row) => { return row.get("ID") == image_id; });
			if (post)
			{
				let d = Runtime.DateTime.fromString(post.get("post_modified_gmt"));
				post_time = d.timestamp();
			}
			/* Load metadata */
			let obj_file = images_metadata.find((item) =>
			{
				return item.get("meta_key") == "_wp_attached_file" && item.get("post_id") == image_id;
			});
			let obj_metadata = images_metadata.find((item) =>
			{
				return item.get("meta_key") == "_wp_attachment_metadata" && item.get("post_id") == image_id;
			});
			if (!(obj_file && obj_metadata)) continue;
			obj_metadata = obj_metadata.get("meta_value");
			obj_file = obj_file.get("meta_value");
			let image_url_after = "?_=" + String(post_time);
			if (!image) continue;
			result.set(image_id, image);
		}
		return result;
	}
	
	
	/**
	 * Apply backend function
	 */
	static apply(name)
	{
	}
	
	
	/**
	 * Apply backend function
	 */
	static wp_apply(name)
	{
	}
	
	
	/**
	 * Render app
	 */
	static async renderApp()
	{
		/* Create container and layout */
		let app = Runtime.rtl.getContext().provider("app");
		let container = app.createRenderContainer();
		/* Create request */
		container.request = app.createRequest();
		/* Resolve container */
		await container.resolve();
		/* Returns container */
		return container;
	}
	
	
	/**
	 * Render page
	 */
	static async renderPage(route_name, params)
	{
		if (params == undefined) params = null;
		/* Create container and layout */
		let app = Runtime.rtl.getContext().provider("app");
		let container = app.createRenderContainer();
		/* Create request */
		container.request = app.createRequest();
		/* Find route */
		let routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteProvider");
		container.route = routes.getRoute(route_name);
		/* Set matches */
		if (container.route && params) container.route.matches = params;
		/* Resolve route */
		container.resolveRoute();
		/* Returns container */
		return container;
	}
	
	
	/**
	 * Render page model
	 */
	static async renderPageModel(class_name, layout_name)
	{
		if (layout_name == undefined) layout_name = "default";
		/* Create container and layout */
		let app = Runtime.rtl.getContext().provider("app");
		let container = app.createRenderContainer();
		/* Create request */
		container.request = app.createRequest();
		/* Create layout */
		let layout = container.createLayout(layout_name);
		/* Render page */
		await container.renderPageModel(class_name);
		/* Returns container */
		return container;
	}
	
	
	/**
	 * Render container
	 */
	static async render(container)
	{
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.WordPress.WP_Helper"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.WP_Helper"] = Runtime.WordPress.WP_Helper;