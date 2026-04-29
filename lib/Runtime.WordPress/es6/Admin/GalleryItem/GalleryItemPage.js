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
if (typeof Runtime.WordPress.Admin.GalleryItem == 'undefined') Runtime.WordPress.Admin.GalleryItem = {};
Runtime.WordPress.Admin.GalleryItem.GalleryItemPage = {
	name: "Runtime.WordPress.Admin.GalleryItem.GalleryItemPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["gallery_item_page", componentHash])}));
			
			/* Element Runtime.Widget.Table.TableWrap */
			let __v1 = __v0.element("Runtime.Widget.Table.TableWrap", new Runtime.Map({"model": this.model.manager}));
			
			/* Slot top_buttons */
			__v1.slot("top_buttons", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				/* Element Runtime.Widget.RowButtons */
				let __v0 = __v.element("Runtime.Widget.RowButtons");
				
				/* Content */
				__v0.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					
					/* Element Runtime.Widget.Button */
					let __v0 = __v.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--default", componentHash]), "href": this.layout.url("admin:gallery:index")}));
					
					/* Content */
					__v0.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						__v.push("Back");
						return __v;
					});
					
					/* Element Runtime.Widget.Button */
					let __v1 = __v.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--success", componentHash]), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
					{
						this.model.manager.showAddDialog();
					})}));
					
					/* Content */
					__v1.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						__v.push("Add");
						return __v;
					});
					
					return __v;
				});
				
				return __v;
			});
			
			/* Slot row_buttons */
			__v1.slot("row_buttons", (item, field, row_number) =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				/* Element Runtime.Widget.RowButtons */
				let __v0 = __v.element("Runtime.Widget.RowButtons");
				
				/* Content */
				__v0.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					
					/* Element Runtime.Widget.Button */
					let __v0 = __v.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--small", componentHash]), "onClick": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
					{
						this.model.manager.showEditDialog(item.copy());
					})}));
					
					/* Content */
					__v0.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						__v.push("Edit");
						return __v;
					});
					
					/* Element Runtime.Widget.Button */
					let __v1 = __v.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--small button--danger", componentHash]), "onClick": this.hash(2) ? this.hash(2) : this.hash(2, (event) =>
					{
						this.model.manager.showDeleteDialog(item.copy());
					})}));
					
					/* Content */
					__v1.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						__v.push("Delete");
						return __v;
					});
					
					return __v;
				});
				
				return __v;
			});
			
			return __v;
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.GalleryItem.GalleryItemPage"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.Input", "Runtime.Widget.RowButtons", "Runtime.Widget.Table.TableWrap", "Runtime.WordPress.Admin.Components.Image"); },
};
window["Runtime.WordPress.Admin.GalleryItem.GalleryItemPage"] = Runtime.WordPress.Admin.GalleryItem.GalleryItemPage;