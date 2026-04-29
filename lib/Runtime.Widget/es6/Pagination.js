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
Runtime.Widget.Pagination = {
	name: "Runtime.Widget.Pagination",
	extends: Runtime.Component,
	props: {
		page: {default: 1},
		pages: {default: 1},
		delta: {default: 5},
		name: {default: ""},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let page_start = Runtime.rtl.max(2, this.page - this.delta + 1);
			let page_end = Runtime.rtl.min(this.page + this.delta, this.pages - 1);
			let props = new Runtime.Map();
			
			/* Element nav */
			let __v0 = __v.element("nav", new Runtime.Map({"class": rs.className(["pagination", componentHash])}));
			
			if (this.pages > 1)
			{
				/* Element ul */
				let __v1 = __v0.element("ul");
				
				if (this.name)
				{
					let _ = props.set("href", this.getPageUrl(1));
				}
				
				/* Element li */
				let __v2 = __v1.element("li", new Runtime.Map({"class": rs.className([this.page == 1 ? "active" : "", componentHash]), "key": 1}));
				
				/* Element a */
				let __v3 = __v2.element("a", new Runtime.Map({"onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.onClick(1);
				})}).concat(props));
				__v3.push("1");
				
				if (page_start > 2)
				{
					/* Element li */
					let __v4 = __v1.element("li", new Runtime.Map({"key": "before"}));
					__v4.push("...");
				}
				
				if (page_start <= page_end)
				{
					for (let p = page_start; p <= page_end; p++)
					{
						if (this.name)
						{
							let _ = props.set("href", this.getPageUrl(p));
						}
						
						/* Element li */
						let __v5 = __v1.element("li", new Runtime.Map({"class": rs.className([this.page == p ? "active" : "", componentHash]), "key": p}));
						
						/* Element a */
						let __v6 = __v5.element("a", new Runtime.Map({"onClick": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
						{
							this.onClick(p);
						})}).concat(props));
						__v6.push(p);
					}
				}
				
				if (page_end < this.pages - 1)
				{
					/* Element li */
					let __v7 = __v1.element("li", new Runtime.Map({"key": "after"}));
					__v7.push("...");
				}
				
				if (this.pages > 1)
				{
					if (this.name)
					{
						let _ = props.set("href", this.getPageUrl(this.pages));
					}
					
					/* Element li */
					let __v8 = __v1.element("li", new Runtime.Map({"class": rs.className([this.page == this.pages ? "active" : "", componentHash]), "key": this.pages}));
					
					/* Element a */
					let __v9 = __v8.element("a", new Runtime.Map({"onClick": this.hash(2) ? this.hash(2) : this.hash(2, (event) =>
					{
						this.onClick(this.pages);
					})}).concat(props));
					__v9.push(this.pages);
				}
			}
			
			return __v;
		},
		/**
		 * Returns page url
		 */
		getPageUrl: function(page)
		{
			let request = this.layout.get("request");
			return Runtime.rs.url_get_add(request.full_uri, this.name, page > 1 ? page : "");
		},
		/**
		 * Click event
		 */
		onClick: function(page)
		{
			if (this.name) return;
			this.emit("page", page);
		},
		getClassName: function(){ return "Runtime.Widget.Pagination"; },
	},
	getComponentStyle: function(){ return ".pagination.h-e7d5{text-align: center;padding: var(--space) 0;width: 100%}.pagination.h-e7d5 ul, .pagination.h-e7d5 li{padding: 0;margin: 0}.pagination.h-e7d5 li{display: inline-block;vertical-align: top;list-style: none;margin-left: calc(var(--space) * 0.5);margin-right: calc(var(--space) * 0.5)}.pagination.h-e7d5 a, .pagination.h-e7d5 a:hover, .pagination.h-e7d5 span{display: flex;align-items: center;justify-content: center;background-color: var(--color-surface);border-color: var(--color-border);border-width: var(--border-width);border-style: solid;border-radius: var(--border-radius);color: var(--color-surface-text);text-align: center;width: 30px;height: 30px;line-height: 0;font-size: var(--font-size);text-decoration: none}.pagination.h-e7d5 li:first-child{margin-left: 0px}.pagination.h-e7d5 li.active a, .pagination.h-e7d5 li.active a:hover{background-color: var(--color-selected);border-color: var(--color-selected);color: var(--color-selected-text)}.pagination.h-e7d5 li a:focus{outline: 0;box-shadow: none}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Pagination"] = Runtime.Widget.Pagination;