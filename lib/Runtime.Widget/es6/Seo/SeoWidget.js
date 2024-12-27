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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Seo == 'undefined') Runtime.Widget.Seo = {};
Runtime.Widget.Seo.SeoWidget = {
	name: "Runtime.Widget.Seo.SeoWidget",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Canonical url */
			if (this.model.canonical_url)
			{
				/* Element 'link' */
				let __v0 = this._e(__v, "link", {"rel":"canonical","href":this.model.canonical_url});
			}
			
			/* Locale */
			/* Element 'meta' */
			let __v1 = this._e(__v, "meta", {"property":"og:locale","content":this.layout.getLocale()});
			
			/* Title and description */
			/* Element 'meta' */
			let __v2 = this._e(__v, "meta", {"property":"og:title","content":this.layout.getFullTitle()});
			
			if (this.model.description != "")
			{
				/* Element 'meta' */
				let __v3 = this._e(__v, "meta", {"property":"og:description","content":this.model.description});
				
				/* Element 'meta' */
				let __v4 = this._e(__v, "meta", {"name":"description","content":this.model.description});
			}
			
			/* Site name */
			let site_name = this.layout.getSiteName();
			if (site_name)
			{
				/* Element 'meta' */
				let __v5 = this._e(__v, "meta", {"property":"og:site_name","content":site_name});
				
				/* Element 'meta' */
				let __v6 = this._e(__v, "meta", {"property":"article:publisher","content":site_name});
			}
			
			/* Robots */
			if (this.model.robots)
			{
				/* Element 'meta' */
				let __v7 = this._e(__v, "meta", {"name":"robots","content":Runtime.rs.join(",", this.model.robots)});
			}
			
			/* Tags */
			if (this.model.tags != null && this.model.tags.count() > 0)
			{
				for (let i = 0; i < this.model.tags.count(); i++)
				{
					/* Element 'meta' */
					let __v8 = this._e(__v, "meta", {"property":"article:tag","content":Runtime.rtl.attr(this.model.tags, i)});
				}
			}
			
			/* Article time */
			if (this.model.article_published_time)
			{
				/* Element 'meta' */
				let __v9 = this._e(__v, "meta", {"property":"article:published_time","content":this.model.article_published_time});
			}
			
			if (this.model.article_modified_time)
			{
				/* Element 'meta' */
				let __v10 = this._e(__v, "meta", {"property":"article:article_modified_time","content":this.model.article_modified_time});
				
				/* Element 'meta' */
				let __v11 = this._e(__v, "meta", {"property":"og:article_modified_time","content":this.model.article_modified_time});
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Seo.SeoWidget,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Seo";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Seo.SeoWidget";
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
Runtime.rtl.defClass(Runtime.Widget.Seo.SeoWidget);
window["Runtime.Widget.Seo.SeoWidget"] = Runtime.Widget.Seo.SeoWidget;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Seo.SeoWidget;