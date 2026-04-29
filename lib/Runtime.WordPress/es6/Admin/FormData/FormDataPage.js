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
if (typeof Runtime.WordPress.Admin.FormData == 'undefined') Runtime.WordPress.Admin.FormData = {};
Runtime.WordPress.Admin.FormData.FormDataPage = {
	name: "Runtime.WordPress.Admin.FormData.FormDataPage",
	extends: Runtime.Component,
	data: function()
	{
		return {
			dialog: new Runtime.Widget.Dialog.DialogModel(),
			current_item: null,
		};
	},
	methods:
	{
		renderData: function(data)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let keys = Runtime.rtl.list(data.keys());
			for (let i = 0; i < keys.count(); i++)
			{
				let key = keys.get(i);
				
				/* Element div */
				let __v0 = __v.element("div");
				__v0.push(key + String(": ") + String(data.get(key)));
			}
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["form_data_page", componentHash])}));
			
			/* Element Runtime.Widget.Table.Table */
			let __v1 = __v0.element("Runtime.Widget.Table.Table", new Runtime.Map({"model": this.model.table}));
			
			/* Slot header */
			__v1.slot("header", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				/* Element th */
				__v.element("th");
				
				/* Element th */
				let __v0 = __v.element("th");
				__v0.push("Title");
				
				/* Element th */
				let __v1 = __v.element("th");
				__v1.push("Form name");
				
				/* Element th */
				let __v2 = __v.element("th");
				__v2.push("Data");
				
				/* Element th */
				let __v3 = __v.element("th");
				__v3.push("Date");
				
				/* Element th */
				__v.element("th");
				
				return __v;
			});
			
			/* Slot row */
			__v1.slot("row", (item, row_number) =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				/* Element td */
				let __v0 = __v.element("td");
				__v0.push(row_number + 1);
				
				/* Element td */
				let __v1 = __v.element("td");
				__v1.push(item.get("form_title"));
				
				/* Element td */
				let __v2 = __v.element("td");
				__v2.push(item.get("form_name"));
				
				/* Element td */
				let __v3 = __v.element("td");
				__v3.push(this.renderData(item.get("data")));
				
				/* Element td */
				let __v4 = __v.element("td");
				
				let date = item.get("gmtime_add");
				__v4.push(date ? date.normalize().format() : "");
				
				/* Element td */
				let __v5 = __v.element("td");
				
				/* Element Runtime.Widget.Button */
				let __v6 = __v5.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--default button--small", componentHash]), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.showItem(row_number);
				})}));
				
				/* Content */
				__v6.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("View");
					return __v;
				});
				
				return __v;
			});
			
			/* Element Runtime.Widget.Dialog.Dialog */
			let __v2 = __v0.element("Runtime.Widget.Dialog.Dialog", new Runtime.Map({"model": this.dialog}));
			
			/* Slot title */
			__v2.slot("title", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				__v.push("Show item");
				return __v;
			});
			
			/* Slot content */
			__v2.slot("content", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				if (this.current_item)
				{
					/* Element Runtime.Widget.Form.FormRow */
					let __v0 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Title"}));
					
					/* Content */
					__v0.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.current_item.get("form_title"));
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v1 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Name"}));
					
					/* Content */
					__v1.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.current_item.get("form_name"));
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v2 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Date"}));
					
					/* Content */
					__v2.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						let date = this.current_item.get("gmtime_add");
						__v.push(date ? date.normalize().format() : "");
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v3 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Data"}));
					
					/* Content */
					__v3.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.renderData(this.current_item.get("data")));
						
						return __v;
					});
				}
				
				return __v;
			});
			
			/* Slot footer */
			__v2.slot("footer", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				/* Element Runtime.Widget.Button */
				let __v0 = __v.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
				{
					this.dialog.hide();
				})}));
				
				/* Content */
				__v0.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Close");
					return __v;
				});
				
				return __v;
			});
			
			return __v;
		},
		showItem: function(index)
		{
			this.current_item = this.model.table.items.get(index);
			this.dialog.show();
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.FormData.FormDataPage"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.Form.FormRow", "Runtime.Widget.Dialog.Dialog", "Runtime.Widget.Table.Table"); },
};
window["Runtime.WordPress.Admin.FormData.FormDataPage"] = Runtime.WordPress.Admin.FormData.FormDataPage;