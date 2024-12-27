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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.DefaultLayout = {
	name: "Runtime.Web.DefaultLayout",
	extends: Runtime.Web.Component,
	methods:
	{
		renderCurrentPage: function()
		{
			let __v = [];
			let current_page = this.layout.getPageClassName();
			let current_page_model = this.layout.current_page_model;
			
			if (current_page)
			{
				if (current_page_model)
				{
					/* Component '{current_page}' */
					let __v0 = this._c(__v, current_page, {"model":this._model(Runtime.Vector.from(["widgets",current_page_model]))});
				}
				else
				{
					/* Component '{current_page}' */
					let __v1 = this._c(__v, current_page, {});
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderCurrentPage());
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Web.DefaultLayout,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.DefaultLayout";
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
Runtime.rtl.defClass(Runtime.Web.DefaultLayout);
window["Runtime.Web.DefaultLayout"] = Runtime.Web.DefaultLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.DefaultLayout;