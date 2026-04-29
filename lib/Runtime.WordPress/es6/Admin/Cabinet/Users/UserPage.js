"use strict;"
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.Cabinet == 'undefined') Runtime.WordPress.Admin.Cabinet = {};
if (typeof Runtime.WordPress.Admin.Cabinet.Users == 'undefined') Runtime.WordPress.Admin.Cabinet.Users = {};
Runtime.WordPress.Admin.Cabinet.Users.UserPage = {
	name: "Runtime.WordPress.Admin.Cabinet.Users.UserPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["page users_page", componentHash])}));
			
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
					let __v0 = __v.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--success", componentHash]), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
					{
						this.model.manager.showAddDialog();
					})}));
					
					/* Content */
					__v0.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						__v.push("Add User");
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
		getClassName: function(){ return "Runtime.WordPress.Admin.Cabinet.Users.UserPage"; },
	},
	getComponentStyle: function(){ return ".users_page.h-2514 .users_page__title{margin-bottom: var(--space-large)}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.RowButtons", "Runtime.Widget.Table.TableWrap"); },
};
window["Runtime.WordPress.Admin.Cabinet.Users.UserPage"] = Runtime.WordPress.Admin.Cabinet.Users.UserPage;