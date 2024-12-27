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
Runtime.WordPress.Admin.DefaultLayout = {
	name: "Runtime.WordPress.Admin.DefaultLayout",
	extends: Runtime.Web.DefaultLayout,
	methods:
	{
		renderTitle: function()
		{
			let __v = [];
			
			/* Text */
			this._t(__v, "    ");
			
			/* Element 'h1' */
			let __v0 = this._e(__v, "h1", {"class":this._class_name(["wp-heading-inline"])});
			
			/* Render */
			this._t(__v0, this.layout.title);
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Text */
			this._t(__v, "    ");
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["default_layout wrap"])});
			
			/* Render */
			this._t(__v0, this.renderTitle());
			
			/* Render */
			this._t(__v0, this.renderCurrentPage());
			
			/* Text */
			this._t(__v0, "    ");
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.WordPress.Admin.DefaultLayout,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Web.DefaultLayout"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".wp-heading-inline.h-f4f4{padding: 0;margin-bottom: 14px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.DefaultLayout";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.DefaultLayout";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.DefaultLayout);
window["Runtime.WordPress.Admin.DefaultLayout"] = Runtime.WordPress.Admin.DefaultLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.DefaultLayout;