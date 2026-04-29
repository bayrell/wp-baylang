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
if (typeof Runtime.WordPress.Admin.Robots == 'undefined') Runtime.WordPress.Admin.Robots = {};
Runtime.WordPress.Admin.Robots.RobotsApi = class extends Runtime.Web.BaseApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "admin.wordpress.robots"; }
	
	
	/**
	 * Returns middleware
	 */
	getMiddleware()
	{
		return Runtime.Vector.create([
			new Runtime.WordPress.Admin.AdminMiddleware(),
		]);
	}
	
	
	/**
	 * Action item
	 */
	async actionItem()
	{
		let content = Runtime.WordPress.WP_Helper.get_option("robots.txt");
		this.success(Runtime.Map.create({
			"data": Runtime.Map.create({
				"content": content,
			}),
		}));
	}
	
	
	/**
	 * Action save
	 */
	async actionSave()
	{
		let rules = new Runtime.Serializer.MapType(Runtime.Map.create({
			"content": new Runtime.Serializer.StringType(),
		}));
		this.data = this.filter(this.request.data, rules);
		Runtime.WordPress.WP_Helper.update_option("robots.txt", this.data.get("content"));
		this.success();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Robots.RobotsApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionItem", "actionSave");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionItem") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "item"}))
		);
		if (field_name == "actionSave") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "save"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Robots.RobotsApi"] = Runtime.WordPress.Admin.Robots.RobotsApi;