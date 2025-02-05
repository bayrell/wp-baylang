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
Runtime.Web.EmailLayout = {
	name: "Runtime.Web.EmailLayout",
	extends: Runtime.Web.DefaultLayout,
	methods:
	{
		renderTitle: function()
		{
			let __v = [];
			
			/* Element 'title' */
			let __v0 = this._e(__v, "title", {});
			
			/* Render */
			this._t(__v0, this.layout.title);
			
			/* Element 'meta' */
			let __v1 = this._e(__v, "meta", {"charset":this.layout.content_type});
			
			/* Element 'meta' */
			let __v2 = this._e(__v, "meta", {"http-equiv":"Content-Type","content":"text/html; " + Runtime.rtl.toStr(this.layout.content_type)});
			
			/* Element 'meta' */
			let __v3 = this._e(__v, "meta", {"http-equiv":"Content-Language","content":this.layout.getLocale()});
			
			return this._flatten(__v);
		},
		renderCSS: function()
		{
			let __v = [];
			let css = this.getCSS();
			
			if (css)
			{
				/* Element 'style' */
				let __v0 = this._e(__v, "style", {"id":"core-css","class":this._class_name(["components"])});
				
				/* Raw */
				this._t(__v0, new Runtime.RawString(css));
			}
			
			return this._flatten(__v);
		},
		renderCoreUI: function()
		{
			let __v = [];
			
			/* Element 'html' */
			let __v0 = this._e(__v, "html", {"lang":this.layout.getLocale()});
			
			/* Element 'head' */
			let __v1 = this._e(__v0, "head", {});
			
			/* Render */
			this._t(__v1, this.$options.renderTitle());
			
			/* Render */
			this._t(__v1, this.$options.renderCSS());
			
			/* Element 'body' */
			let __v2 = this._e(__v0, "body", {});
			
			/* Render */
			this._t(__v2, this.$options.render());
			
			return this._flatten(__v);
		},
		/**
 * Returns CSS
 */
		getCSS: function()
		{
			return Runtime.Web.BaseLayoutModel.getCSS(this.getComponents());
		},
		/**
 * Returns components
 */
		getComponents: function()
		{
			var res = new Runtime.Vector();
			var cache = new Runtime.Map();
			/* Init components */
			var components = this.layout.components.copy();
			components.push(this.layout.getPageClassName());
			components.push(this.$options.getClassName());
			/* Extends components */
			Runtime.Web.BaseLayoutModel._getRequiredComponents(res, cache, components);
			return res.removeDuplicates();
		},
	},
};
Object.assign(Runtime.Web.EmailLayout,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Web.DefaultLayout"]);
	},
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
		return "Runtime.Web.EmailLayout";
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
Runtime.rtl.defClass(Runtime.Web.EmailLayout);
window["Runtime.Web.EmailLayout"] = Runtime.Web.EmailLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.EmailLayout;