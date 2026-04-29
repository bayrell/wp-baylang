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
if (typeof Runtime.WordPress.Admin.MailLog == 'undefined') Runtime.WordPress.Admin.MailLog = {};
Runtime.WordPress.Admin.MailLog.MailLogPage = {
	name: "Runtime.WordPress.Admin.MailLog.MailLogPage",
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
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["mail_log_page", componentHash])}));
			
			/* Element Runtime.Widget.Table.Table */
			let __v1 = __v0.element("Runtime.Widget.Table.Table", new Runtime.Map({"model": this.model.table, "page_name": "p"}));
			
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
				__v0.push("Worker");
				
				/* Element th */
				let __v1 = __v.element("th");
				__v1.push("Plan");
				
				/* Element th */
				let __v2 = __v.element("th");
				__v2.push("Status");
				
				/* Element th */
				let __v3 = __v.element("th");
				__v3.push("Dest");
				
				/* Element th */
				let __v4 = __v.element("th");
				__v4.push("Title");
				
				/* Element th */
				let __v5 = __v.element("th");
				__v5.push("Error");
				
				/* Element th */
				let __v6 = __v.element("th");
				__v6.push("Send time");
				
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
				__v1.push(item.get("worker"));
				
				/* Element td */
				let __v2 = __v.element("td");
				__v2.push(item.get("plan"));
				
				/* Element td */
				let __v3 = __v.element("td");
				__v3.push(this.getStatus(item.get("status")));
				
				/* Element td */
				let __v4 = __v.element("td");
				__v4.push(item.get("dest"));
				
				/* Element td */
				let __v5 = __v.element("td");
				__v5.push(item.get("title"));
				
				/* Element td */
				let __v6 = __v.element("td");
				__v6.push(item.get("send_email_error"));
				
				/* Element td */
				let __v7 = __v.element("td");
				
				let send_time = item.get("gmtime_send");
				__v7.push(send_time ? send_time.normalize().format() : "");
				
				/* Element td */
				let __v8 = __v.element("td");
				
				/* Element Runtime.Widget.Button */
				let __v9 = __v8.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.showItem(item.copy());
				})}));
				
				/* Content */
				__v9.slot("default", () =>
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
					let __v0 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Worker"}));
					
					/* Content */
					__v0.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.current_item.get("worker"));
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v1 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Plan"}));
					
					/* Content */
					__v1.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.current_item.get("plan"));
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v2 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Status"}));
					
					/* Content */
					__v2.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.getStatus(this.current_item.get("status")));
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v3 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Dest"}));
					
					/* Content */
					__v3.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.current_item.get("dest"));
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v4 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Title"}));
					
					/* Content */
					__v4.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.current_item.get("title"));
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v5 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Error"}));
					
					/* Content */
					__v5.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.current_item.get("send_email_error"));
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v6 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Date"}));
					
					/* Content */
					__v6.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						let send_time = this.current_item.get("gmtime_send");
						__v.push(send_time ? send_time.normalize().format() : "");
						
						return __v;
					});
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v7 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Message"}));
					
					/* Content */
					__v7.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						__v.push(this.current_item.get("message"));
						
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
		/**
		 * Sho item
		 */
		showItem: function(item)
		{
			this.current_item = item;
			this.dialog.show();
		},
		/**
		 * Returns status
		 */
		getStatus: function(status)
		{
			if (status == 1) return "Send";
			if (status == -1) return "Error";
			return "No";
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.MailLog.MailLogPage"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.Form.FormRow", "Runtime.Widget.Dialog.Dialog", "Runtime.Widget.Table.Table"); },
};
window["Runtime.WordPress.Admin.MailLog.MailLogPage"] = Runtime.WordPress.Admin.MailLog.MailLogPage;