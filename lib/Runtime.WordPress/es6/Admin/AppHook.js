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
Runtime.WordPress.Admin.AppHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.WordPress.Admin.AppHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.WordPress.Admin.AppHook.prototype.constructor = Runtime.WordPress.Admin.AppHook;
Object.assign(Runtime.WordPress.Admin.AppHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.CALL_API_BEFORE);
		this.register(this.constructor.GET_FRAME_PAGE_URL, "get_frame_page_url");
	},
	/**
	 * Call api before
	 */
	call_api_before: function(params)
	{
		var api_url = "/wp-admin/admin-ajax.php?action=admin_call_api&api_name=" + Runtime.rtl.toStr(Runtime.rs.url_encode(params.get("post_data").get("api_name")));
		params.set("api_url", api_url);
	},
	/**
	 * Returns projects list
	 */
	get_frame_page_url: function(params)
	{
		var page_url = "/open/widget?widget_name=" + Runtime.rtl.toStr(params.get("current_widget"));
		params.set("page_url", page_url);
	},
});
Object.assign(Runtime.WordPress.Admin.AppHook, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.WordPress.Admin.AppHook,
{
	GET_FRAME_PAGE_URL: "baylang.constructor::get_frame_page_url",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.AppHook";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.WordPress.Admin.AppHook);
window["Runtime.WordPress.Admin.AppHook"] = Runtime.WordPress.Admin.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.AppHook;