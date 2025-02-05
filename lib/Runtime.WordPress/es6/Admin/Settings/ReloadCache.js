"use strict;"
/*
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
if (typeof Runtime.WordPress.Admin.Settings == 'undefined') Runtime.WordPress.Admin.Settings = {};
Runtime.WordPress.Admin.Settings.ReloadCache = {
	name: "Runtime.WordPress.Admin.Settings.ReloadCache",
	extends: Runtime.Web.Component,
	data: function ()
	{
		return {
			result: new Runtime.Widget.WidgetResultModel(),
		};
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["reload_cache"])});
			
			/* Component 'Button' */
			let __v1 = this._c(__v0, "Runtime.Widget.Button", {"onClick":this.onRefresh}, () => {
				let __v = [];
				
				/* Text */
				this._t(__v, "Reload");
				
				return this._flatten(__v);
			});
			
			/* Component 'WidgetResult' */
			let __v2 = this._c(__v0, "Runtime.Widget.WidgetResult", {"model":this._model(this.result)});
			
			return this._flatten(__v);
		},
		/**
 * Refresh item
 */
		onRefresh: async function()
		{
			this.result.clear();
			this.result.setWaitMessage();
			/* Get primary key */
			var form = this.data.get("form");
			var pk = form.getPrimaryKey(form.item);
			/* Reload cache */
			var res = await this.layout.callApi(Runtime.Map.from({"api_name":"admin.wordpress.project","method_name":"reloadCache","data":Runtime.Map.from({"pk":pk})}));
			this.result.setApiResult(res);
		},
	},
};
Object.assign(Runtime.WordPress.Admin.Settings.ReloadCache,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".reload_cache.h-dc8d{display: flex;align-items: center;gap: 5px}.reload_cache.h-dc8d .widget_result.h-e870{margin-top: 0}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Settings.ReloadCache";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Settings.ReloadCache);
window["Runtime.WordPress.Admin.Settings.ReloadCache"] = Runtime.WordPress.Admin.Settings.ReloadCache;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Settings.ReloadCache;