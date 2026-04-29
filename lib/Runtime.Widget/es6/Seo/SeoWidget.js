"use strict;"
/*
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Canonical url */
			if (this.model.canonical_url)
			{
				/* Element link */
				__v.element("link", new Runtime.Map({"rel": "canonical", "href": this.model.canonical_url}));
			}
			/* Locale */
			/* Element meta */
			__v.element("meta", new Runtime.Map({"property": "og:locale", "content": this.layout.lang}));
			/* Title and description */
			/* Element meta */
			__v.element("meta", new Runtime.Map({"property": "og:title", "content": this.layout.title}));
			
			if (this.layout.description != "")
			{
				/* Element meta */
				__v.element("meta", new Runtime.Map({"property": "og:description", "content": this.layout.description}));
				
				/* Element meta */
				__v.element("meta", new Runtime.Map({"name": "description", "content": this.layout.description}));
			}
			/* Site name */
			let site_name = this.layout.getSiteName();
			if (site_name)
			{
				/* Element meta */
				__v.element("meta", new Runtime.Map({"property": "og:site_name", "content": site_name}));
				
				/* Element meta */
				__v.element("meta", new Runtime.Map({"property": "article:publisher", "content": site_name}));
			}
			/* Robots */
			if (this.model.robots)
			{
				/* Element meta */
				__v.element("meta", new Runtime.Map({"name": "robots", "content": Runtime.rs.join(",", this.model.robots)}));
			}
			/* Tags */
			if (this.model.tags != null && this.model.tags.count() > 0)
			{
				for (let i = 0; i < this.model.tags.count(); i++)
				{
					/* Element meta */
					__v.element("meta", new Runtime.Map({"property": "article:tag", "content": this.model.tags[i]}));
				}
			}
			/* Article time */
			if (this.model.article_published_time)
			{
				/* Element meta */
				__v.element("meta", new Runtime.Map({"property": "article:published_time", "content": this.model.article_published_time}));
			}
			
			if (this.model.article_modified_time)
			{
				/* Element meta */
				__v.element("meta", new Runtime.Map({"property": "article:article_modified_time", "content": this.model.article_modified_time}));
				
				/* Element meta */
				__v.element("meta", new Runtime.Map({"property": "og:article_modified_time", "content": this.model.article_modified_time}));
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Seo.SeoWidget"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Seo.SeoWidget"] = Runtime.Widget.Seo.SeoWidget;