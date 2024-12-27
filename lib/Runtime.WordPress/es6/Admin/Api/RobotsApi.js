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
Runtime.WordPress.Admin.Api.RobotsApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
Runtime.WordPress.Admin.Api.RobotsApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
Runtime.WordPress.Admin.Api.RobotsApi.prototype.constructor = Runtime.WordPress.Admin.Api.RobotsApi;
Object.assign(Runtime.WordPress.Admin.Api.RobotsApi.prototype,
{
	/**
	 * Action item
	 */
	actionItem: async function()
	{
		var content = Runtime.WordPress.WP_Helper.get_option("robots.txt");
		this.result.success(Runtime.Map.from({"data":Runtime.Map.from({"pk":true,"item":Runtime.Map.from({"content":content})})}));
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		var __v0 = new Runtime.Monad(this.post_data);
		__v0 = __v0.attr("item");
		__v0 = __v0.attr("content");
		__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
		var content = __v0.value();
		Runtime.WordPress.WP_Helper.update_option("robots.txt", content);
		this.result.success(Runtime.Map.from({"data":Runtime.Map.from({"pk":true,"item":Runtime.Map.from({"content":content})})}));
	},
});
Object.assign(Runtime.WordPress.Admin.Api.RobotsApi, Runtime.Web.BaseApi);
Object.assign(Runtime.WordPress.Admin.Api.RobotsApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "admin.wordpress.robots::save";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Api";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Api.RobotsApi";
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
			"actionItem",
			"actionSave",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionItem")
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
		return null;
	},
});
Runtime.rtl.defClass(Runtime.WordPress.Admin.Api.RobotsApi);
window["Runtime.WordPress.Admin.Api.RobotsApi"] = Runtime.WordPress.Admin.Api.RobotsApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Api.RobotsApi;