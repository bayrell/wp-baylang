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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.EmailLayout = {
	name: "Runtime.Web.EmailLayout",
	extends: Runtime.Web.DefaultLayout,
	methods:
	{
		renderTitle: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element title */
			let __v0 = __v.element("title");
			__v0.push(this.layout.title);
			
			/* Element meta */
			__v.element("meta", new Runtime.Map({"charset": this.layout.content_type}));
			
			/* Element meta */
			__v.element("meta", new Runtime.Map({"http-equiv": "Content-Type", "content": "text/html; " + String(this.layout.content_type)}));
			
			/* Element meta */
			__v.element("meta", new Runtime.Map({"http-equiv": "Content-Language", "content": this.layout.getLocale()}));
			
			return __v;
		},
		renderCSS: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let css = this.getCSS();
			if (css)
			{
				/* Element style */
				let __v0 = __v.element("style", new Runtime.Map({"id": "core-css", "class": rs.className(["components", componentHash])}));
				__v0.push("@raw");
				__v0.push(css);
			}
			
			return __v;
		},
		renderCoreUI: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element html */
			let __v0 = __v.element("html", new Runtime.Map({"lang": this.layout.getLocale()}));
			
			/* Element head */
			let __v1 = __v0.element("head");
			__v1.push(this.constructor.renderTitle());
			__v1.push(this.constructor.renderCSS());
			
			/* Element body */
			let __v2 = __v0.element("body");
			__v2.push(this.constructor.render());
			
			return __v;
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
			let res = new Runtime.Vector();
			let cache = new Runtime.Map();
			/* Init components */
			let components = this.layout.components.copy();
			components.push(this.layout.getPageClassName());
			components.push(this.constructor.getClassName());
			/* Extends components */
			Runtime.Web.BaseLayoutModel._getRequiredComponents(res, cache, components);
			return res.removeDuplicates();
		},
		getClassName: function(){ return "Runtime.Web.EmailLayout"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Web.EmailLayout"] = Runtime.Web.EmailLayout;