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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Components == 'undefined') Runtime.WordPress.Theme.Components = {};
if (typeof Runtime.WordPress.Theme.Components.Email == 'undefined') Runtime.WordPress.Theme.Components.Email = {};
Runtime.WordPress.Theme.Components.Email.FormMessage = {
	name: "Runtime.WordPress.Theme.Components.Email.FormMessage",
	extends: Runtime.Component,
	props: {
		site_name: {default: ""},
		form_name: {default: ""},
		form_title: {default: ""},
		invoice_id: {default: ""},
		metrika_id: {default: ""},
		data: {default: new Runtime.Map()},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"style": "font-family:verdana;font-size:16px"}));
			
			/* Element table */
			let __v1 = __v0.element("table");
			
			if (this.invoice_id)
			{
				/* Element tr */
				let __v2 = __v1.element("tr");
				
				/* Element td */
				let __v3 = __v2.element("td", new Runtime.Map({"style": "padding: 2px; text-align: right"}));
				__v3.push("Number:");
				
				/* Element td */
				let __v4 = __v2.element("td", new Runtime.Map({"style": "padding: 2px; text-align: left"}));
				__v4.push(this.invoice_id);
			}
			
			if (this.site_name)
			{
				/* Element tr */
				let __v5 = __v1.element("tr");
				
				/* Element td */
				let __v6 = __v5.element("td", new Runtime.Map({"style": "padding: 2px; text-align: right"}));
				__v6.push("Web site:");
				
				/* Element td */
				let __v7 = __v5.element("td", new Runtime.Map({"style": "padding: 2px; text-align: left"}));
				__v7.push(this.site_name);
			}
			
			if (this.form_title)
			{
				/* Element tr */
				let __v8 = __v1.element("tr");
				
				/* Element td */
				let __v9 = __v8.element("td", new Runtime.Map({"style": "padding: 2px; text-align: right"}));
				__v9.push("Form title:");
				
				/* Element td */
				let __v10 = __v8.element("td", new Runtime.Map({"style": "padding: 2px; text-align: left"}));
				__v10.push(this.form_title);
			}
			
			if (this.form_name && this.form_title != this.form_name)
			{
				/* Element tr */
				let __v11 = __v1.element("tr");
				
				/* Element td */
				let __v12 = __v11.element("td", new Runtime.Map({"style": "padding: 2px; text-align: right"}));
				__v12.push("Form name:");
				
				/* Element td */
				let __v13 = __v11.element("td", new Runtime.Map({"style": "padding: 2px; text-align: left"}));
				__v13.push(this.form_name);
			}
			
			if (this.metrika_id)
			{
				/* Element tr */
				let __v14 = __v1.element("tr");
				
				/* Element td */
				let __v15 = __v14.element("td", new Runtime.Map({"style": "padding: 2px; text-align: right"}));
				__v15.push("Form id:");
				
				/* Element td */
				let __v16 = __v14.element("td", new Runtime.Map({"style": "padding: 2px; text-align: left"}));
				__v16.push(this.ucfirst(this.metrika_id));
			}
			
			if (this.data)
			{
				let keys = Runtime.rtl.list(this.data.keys());
				for (let i = 0; i < keys.count(); i++)
				{
					let name = keys.get(i);
					let value = this.data.get(name);
					
					/* Element tr */
					let __v17 = __v1.element("tr");
					
					/* Element td */
					let __v18 = __v17.element("td", new Runtime.Map({"style": "padding: 2px; text-align: right"}));
					__v18.push(name);
					__v18.push(":");
					
					/* Element td */
					let __v19 = __v17.element("td", new Runtime.Map({"style": "padding: 2px; text-align: left"}));
					__v19.push(value);
				}
			}
			
			return __v;
		},
		/**
		 * Uppercase first
		 */
		ucfirst: function(name)
		{
			name = Runtime.rs.trim(name);
			return Runtime.rs.upper(Runtime.rs.charAt(name, 0)) + String(Runtime.rs.substr(name, 1));
		},
		getClassName: function(){ return "Runtime.WordPress.Theme.Components.Email.FormMessage"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.WordPress.Theme.Components.Email.FormMessage"] = Runtime.WordPress.Theme.Components.Email.FormMessage;