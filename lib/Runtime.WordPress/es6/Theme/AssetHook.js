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
Runtime.WordPress.Theme.AssetHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.WordPress.Theme.AssetHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.WordPress.Theme.AssetHook.prototype.constructor = Runtime.WordPress.Theme.AssetHook;
Object.assign(Runtime.WordPress.Theme.AssetHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.ASSETS);
		this.register(this.constructor.CREATE_LAYOUT);
		this.register(this.constructor.IMPORT_CONTAINER_DATA_AFTER);
	},
	/**
	 * Create layout
	 */
	create_layout: function(params)
	{
	},
	/**
	 * Import data after
	 */
	import_container_data_after: function(params)
	{
		this.assets_path = params.get("container").layout.widgets.get("assets_path");
	},
	/**
	 * Assets
	 */
	assets: function(params)
	{
		params.set("assets_path", this.assets_path);
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.assets_path = "";
	},
});
Object.assign(Runtime.WordPress.Theme.AssetHook, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.WordPress.Theme.AssetHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.AssetHook";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.AssetHook);
window["Runtime.WordPress.Theme.AssetHook"] = Runtime.WordPress.Theme.AssetHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.AssetHook;