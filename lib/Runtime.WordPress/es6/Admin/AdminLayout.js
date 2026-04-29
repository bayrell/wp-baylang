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
Runtime.WordPress.Admin.AdminLayout = {
	name: "Runtime.WordPress.Admin.AdminLayout",
	extends: Runtime.DefaultLayout,
	methods:
	{
		renderTitle: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element h1 */
			let __v0 = __v.element("h1", new Runtime.Map({"class": rs.className(["wp-heading-inline", componentHash])}));
			__v0.push(this.layout.title);
			
			return __v;
		},
		renderApp: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			__v.push(this.renderStyle());
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["root_container", componentHash])}));
			__v0.push(this.render());
			__v.push(this.renderMountApp());
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["default_layout wrap wp_admin_layout", componentHash])}));
			__v0.push(this.renderTitle());
			__v0.push(this.renderCurrentPage());
			
			return __v;
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.AdminLayout"; },
	},
	getComponentStyle: function(){ return ".wp-heading-inline.h-3f86{padding: 0;margin-bottom: 14px}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.WordPress.Admin.AdminLayout"] = Runtime.WordPress.Admin.AdminLayout;