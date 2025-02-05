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
	extends: Runtime.Web.Component,
	props: {
		"site_name": {
			default: "",
		},
		"form_name": {
			default: "",
		},
		"form_title": {
			default: "",
		},
		"invoice_id": {
			default: "",
		},
		"metrika_form_id": {
			default: "",
		},
		"data": {
			default: Runtime.Map.from({}),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"style":"font-family:verdana;font-size:16px"});
			
			/* Element 'table' */
			let __v1 = this._e(__v0, "table", {});
			
			if (this.invoice_id)
			{
				/* Element 'tr' */
				let __v2 = this._e(__v1, "tr", {});
				
				/* Element 'td' */
				let __v3 = this._e(__v2, "td", {"style":"padding: 2px; text-align: right"});
				
				/* Text */
				this._t(__v3, "Number:");
				
				/* Element 'td' */
				let __v4 = this._e(__v2, "td", {"style":"padding: 2px; text-align: left"});
				
				/* Render */
				this._t(__v4, this.invoice_id);
			}
			
			if (this.site_name)
			{
				/* Element 'tr' */
				let __v5 = this._e(__v1, "tr", {});
				
				/* Element 'td' */
				let __v6 = this._e(__v5, "td", {"style":"padding: 2px; text-align: right"});
				
				/* Text */
				this._t(__v6, "Web site:");
				
				/* Element 'td' */
				let __v7 = this._e(__v5, "td", {"style":"padding: 2px; text-align: left"});
				
				/* Render */
				this._t(__v7, this.site_name);
			}
			
			if (this.form_title)
			{
				/* Element 'tr' */
				let __v8 = this._e(__v1, "tr", {});
				
				/* Element 'td' */
				let __v9 = this._e(__v8, "td", {"style":"padding: 2px; text-align: right"});
				
				/* Text */
				this._t(__v9, "Form title:");
				
				/* Element 'td' */
				let __v10 = this._e(__v8, "td", {"style":"padding: 2px; text-align: left"});
				
				/* Render */
				this._t(__v10, this.form_title);
			}
			
			if (this.form_name && this.form_title != this.form_name)
			{
				/* Element 'tr' */
				let __v11 = this._e(__v1, "tr", {});
				
				/* Element 'td' */
				let __v12 = this._e(__v11, "td", {"style":"padding: 2px; text-align: right"});
				
				/* Text */
				this._t(__v12, "Form name:");
				
				/* Element 'td' */
				let __v13 = this._e(__v11, "td", {"style":"padding: 2px; text-align: left"});
				
				/* Render */
				this._t(__v13, this.form_name);
			}
			
			if (this.metrika_form_id)
			{
				/* Element 'tr' */
				let __v14 = this._e(__v1, "tr", {});
				
				/* Element 'td' */
				let __v15 = this._e(__v14, "td", {"style":"padding: 2px; text-align: right"});
				
				/* Text */
				this._t(__v15, "Form id:");
				
				/* Element 'td' */
				let __v16 = this._e(__v14, "td", {"style":"padding: 2px; text-align: left"});
				
				/* Render */
				this._t(__v16, this.metrika_form_id);
			}
			
			if (this.data)
			{
				let keys = this.data.keys();
				
				for (let i = 0; i < keys.count(); i++)
				{
					let name = keys.get(i);
					let value = this.data.get(name);
					
					/* Element 'tr' */
					let __v17 = this._e(__v1, "tr", {});
					
					/* Element 'td' */
					let __v18 = this._e(__v17, "td", {"style":"padding: 2px; text-align: right"});
					
					/* Render */
					this._t(__v18, name);
					
					/* Text */
					this._t(__v18, ":");
					
					/* Element 'td' */
					let __v19 = this._e(__v17, "td", {"style":"padding: 2px; text-align: left"});
					
					/* Render */
					this._t(__v19, value);
				}
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.WordPress.Theme.Components.Email.FormMessage,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Components.Email";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Components.Email.FormMessage";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Components.Email.FormMessage);
window["Runtime.WordPress.Theme.Components.Email.FormMessage"] = Runtime.WordPress.Theme.Components.Email.FormMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Components.Email.FormMessage;