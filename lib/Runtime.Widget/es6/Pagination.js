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
Runtime.Widget.Pagination = {
	name: "Runtime.Widget.Pagination",
	extends: Runtime.Web.Component,
	props: {
		"page": {
			default: 1,
		},
		"pages": {
			default: 1,
		},
		"delta": {
			default: 5,
		},
		"name": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let page_start = Runtime.Math.max(2, this.page - this.delta + 1);
			let page_end = Runtime.Math.min(this.page + this.delta, this.pages - 1);
			let props = Runtime.Map.from({});
			
			/* Element 'nav' */
			let __v0 = this._e(__v, "nav", {"class":this._class_name(["pagination"])});
			
			if (this.pages > 1)
			{
				/* Element 'ul' */
				let __v1 = this._e(__v0, "ul", {});
				
				if (this.name)
				{
					let _ = props.set("href", this.getPageUrl(1));
				}
				
				/* Element 'li' */
				let __v2 = this._e(__v1, "li", {"class":this._class_name([((this.page == 1) ? ("active") : (""))]),"key":1});
				
				/* Element 'a' */
				let __v3 = this._e(__v2, "a", this._merge_attrs({"onClick":() =>
				{
					return this.onClick(1);
				}}, props));
				
				/* Text */
				this._t(__v3, "1");
				
				if (page_start > 2)
				{
					/* Element 'li' */
					let __v4 = this._e(__v1, "li", {"key":"before"});
					
					/* Text */
					this._t(__v4, "...");
				}
				
				if (page_start <= page_end)
				{
					for (let p = page_start; p <= page_end; p++)
					{
						if (this.name)
						{
							let _ = props.set("href", this.getPageUrl(p));
						}
						
						/* Element 'li' */
						let __v5 = this._e(__v1, "li", {"class":this._class_name([((this.page == p) ? ("active") : (""))]),"key":p});
						
						/* Element 'a' */
						let __v6 = this._e(__v5, "a", this._merge_attrs({"onClick":() =>
						{
							return this.onClick(p);
						}}, props));
						
						/* Render */
						this._t(__v6, p);
					}
				}
				
				if (page_end < this.pages - 1)
				{
					/* Element 'li' */
					let __v7 = this._e(__v1, "li", {"key":"after"});
					
					/* Text */
					this._t(__v7, "...");
				}
				
				if (this.pages > 1)
				{
					if (this.name)
					{
						let _ = props.set("href", this.getPageUrl(this.pages));
					}
					
					/* Element 'li' */
					let __v8 = this._e(__v1, "li", {"class":this._class_name([((this.page == this.pages) ? ("active") : (""))]),"key":this.pages});
					
					/* Element 'a' */
					let __v9 = this._e(__v8, "a", this._merge_attrs({"onClick":() =>
					{
						return this.onClick(this.pages);
					}}, props));
					
					/* Render */
					this._t(__v9, this.pages);
				}
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns page url
 */
		getPageUrl: function(page)
		{
			var uri = this.layout.request_full_uri;
			return Runtime.rs.url_get_add(uri, this.name, page);
		},
		/**
 * Click event
 */
		onClick: function(page)
		{
			if (this.name)
			{
				return ;
			}
			this.emit("page", page);
		},
	},
};
Object.assign(Runtime.Widget.Pagination,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".pagination.h-e7d6{text-align: center;padding: 10px 0;width: 100%}.pagination.h-e7d6 ul,.pagination.h-e7d6 li{padding: 0;margin: 0}.pagination.h-e7d6 li{display: inline-block;vertical-align: top;list-style: none;margin-left: 5px;margin-right: 5px}.pagination.h-e7d6 a,.pagination.h-e7d6 a:hover,.pagination.h-e7d6 span{display: flex;align-items: center;justify-content: center;background-color: var(--widget-color-table-background);border-color: var(--widget-color-border);border-width: var(--widget-border-width);border-style: solid;border-radius: 4px;color: var(--widget-color-text);text-align: center;width: 30px;height: 30px;line-height: 0;font-size: 14px;text-decoration: none}.pagination.h-e7d6 li:first-child{margin-left: 0px}.pagination.h-e7d6 li.active a,.pagination.h-e7d6 li.active a:hover{background-color: var(--widget-color-selected);border-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.pagination.h-e7d6 li a:focus{outline: 0;box-shadow: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Pagination";
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
Runtime.rtl.defClass(Runtime.Widget.Pagination);
window["Runtime.Widget.Pagination"] = Runtime.Widget.Pagination;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Pagination;