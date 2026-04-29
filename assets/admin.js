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
if (typeof Runtime.WordPress.Admin.Components == 'undefined') Runtime.WordPress.Admin.Components = {};
Runtime.WordPress.Admin.Components.Image = {
	name: "Runtime.WordPress.Admin.Components.Image",
	extends: Runtime.Component,
	props: {
		styles: {default: Runtime.Vector.create([])},
		name: {default: ""},
		value: {default: ""},
		size: {default: "medium"},
		upload: {default: false},
		center: {default: false},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["widget_image", this.getStyles(), componentHash]), "key": "widget_image_" + String(this.name)}));
			
			if (this.upload)
			{
				/* Element div */
				let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["widget_image__upload_button", componentHash])}));
				
				/* Element Runtime.Widget.Button */
				let __v2 = __v1.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.onUploadImage();
				})}));
				
				/* Content */
				__v2.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Upload image");
					return __v;
				});
			}
			
			let image = this.getImage();
			if (image)
			{
				if (this.center)
				{
					/* Element center */
					let __v3 = __v0.element("center");
					
					/* Element img */
					__v3.element("img", new Runtime.Map({"src": image}));
				}
				else
				{
					/* Element img */
					__v0.element("img", new Runtime.Map({"src": image}));
				}
			}
			
			return __v;
		},
		/**
		 * Returns styles
		 */
		getStyles: function()
		{
			if (this.styles == null) return "";
			let styles = this.styles.map((name) => { return "widget_image--" + String(name); });
			return Runtime.rs.join(" ", styles);
		},
		/**
		 * Return image
		 */
		getImage: function()
		{
			if (!(this.value instanceof Runtime.WordPress.Theme.Components.ImageType)) return;
			return this.value.getImage(this.size);
		},
		/**
		 * On upload image
		 */
		onUploadImage: function()
		{
			var uploader = wp.media
	({
		title: "Файлы",
		button: {
			text: "Выбрать файл"
		},
		multiple: false
	})
	.on('select', () => {
		let attachments = uploader.state().get('selection').toJSON();
		let attachment = attachments[0];
		
		let sizes = new Runtime.Map();
		for (let size_name in attachment.sizes)
		{
			let size = attachment.sizes[size_name];
			sizes.set(size_name, Runtime.Map.create({
				"size": size_name,
				"file": size.url,
				"width": size.width,
				"height": size.height,
				"mime_type": "",
			}));
		}
		
		let image = new Runtime.WordPress.Admin.Components.ImageType();
		image.id = attachment.id;
		image.width = attachment.width;
		image.height = attachment.height;
		image.file = attachment.url;
		image.sizes = sizes;
		
		/* Send value change */
		var message_data = Runtime.Map.create({
			"value": image,
			"old_value": this.value,
			"data": this.data,
		});
		this.emit(new Runtime.Widget.Messages.ValueChangeMessage(message_data));
	})
	.open();
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.Components.Image"; },
	},
	getComponentStyle: function(){ return ".widget_image.h-c6d img{max-width: 200px;max-height: 200px}.widget_image--small.h-c6d img{max-width: 100px;max-height: 100px}.widget_image__upload_button.h-c6d{padding-bottom: 10px}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button"); },
};
window["Runtime.WordPress.Admin.Components.Image"] = Runtime.WordPress.Admin.Components.Image;
"use strict;"
/*!
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.Cabinet == 'undefined') Runtime.WordPress.Admin.Cabinet = {};
if (typeof Runtime.WordPress.Admin.Cabinet.Users == 'undefined') Runtime.WordPress.Admin.Cabinet.Users = {};
Runtime.WordPress.Admin.Cabinet.Users.UserModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("manager", new Runtime.Serializer.ObjectType());
	}
	
	
	/**
	 * Init widget
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.manager = this.createWidget("Runtime.Widget.Table.TableManager", Runtime.Map.create({
			"autoload": true,
			"api_name": "admin.cabinet.users",
			"page_name": "p",
			"title": new Runtime.Method(this, "getTableTitle"),
			"primary_rules": Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
			}),
			"item_rules": Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"login": new Runtime.Serializer.StringType(),
				"email": new Runtime.Serializer.StringType(),
				"name": new Runtime.Serializer.StringType(),
				"is_deleted": new Runtime.Serializer.IntegerType(),
			}),
			"form_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "login",
					"label": "Login",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "email",
					"label": "Email",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "is_deleted",
					"label": "Status",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Vector.create([
							Runtime.Map.create({"key": 0, "value": "Active"}),
							Runtime.Map.create({"key": 1, "value": "Inactive"}),
						]),
					}),
				}),
				Runtime.Map.create({
					"name": "password",
					"label": "Password",
					"component": "Runtime.Widget.Input",
					"props": Runtime.Map.create({
						"type": "password",
					}),
				}),
				Runtime.Map.create({
					"name": "repeat_password",
					"label": "Repeat password",
					"component": "Runtime.Widget.Input",
					"props": Runtime.Map.create({
						"type": "password",
					}),
				}),
			]),
			"table_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "row_number",
				}),
				Runtime.Map.create({
					"name": "login",
					"label": "Login",
				}),
				Runtime.Map.create({
					"name": "email",
					"label": "Email",
				}),
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
				}),
				Runtime.Map.create({
					"name": "is_deleted",
					"label": "Status",
					"value": (item) =>
					{
						let is_deleted = item.get("is_deleted");
						if (is_deleted == 0) return "Active";
						return "Inactive";
					},
				}),
				Runtime.Map.create({
					"name": "buttons",
					"slot": "row_buttons",
				}),
			]),
		}));
	}
	
	
	/**
	 * Returns table title
	 */
	getTableTitle(action, item)
	{
		if (action == "add") return "Add User";
		else if (action == "edit") return "Edit User";
		else if (action == "delete") return "Delete User";
		else if (action == "delete_message") return "Delete User";
		return "Users";
	}
	
	
	/**
	 * Build page title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Cabinet Users");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.Cabinet.Users.UserPage";
		this.manager = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Cabinet.Users.UserModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Cabinet.Users.UserModel"] = Runtime.WordPress.Admin.Cabinet.Users.UserModel;
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
"use strict;"
/*!
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
Runtime.WordPress.Admin.FormData.FormDataPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("table", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"class_name": "Runtime.Widget.Table.TableModel",
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"form_title": new Runtime.Serializer.StringType(),
				"form_name": new Runtime.Serializer.StringType(),
				"data": new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()),
				"gmtime_add": new Runtime.Serializer.DateTimeType(),
			})),
		})));
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Create table */
		this.table = this.createWidget("Runtime.Widget.Table.TableModel");
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		let result = this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.forms.data",
			"method_name": "search",
			"data": Runtime.Map.create({
				"page": this.page,
			}),
		}));
		if (result.isSuccess())
		{
			this.table.items = result.data.get("items");
			this.page = result.data.get("page");
			this.pages = result.data.get("pages");
		}
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Forms data");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.FormData.FormDataPage";
		this.table = null;
		this.page = 0;
		this.pages = 0;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.FormData.FormDataPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.FormData.FormDataPageModel"] = Runtime.WordPress.Admin.FormData.FormDataPageModel;
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
if (typeof Runtime.WordPress.Admin.FormSettings == 'undefined') Runtime.WordPress.Admin.FormSettings = {};
Runtime.WordPress.Admin.FormSettings.FieldSettings = {
	name: "Runtime.WordPress.Admin.FormSettings.FieldSettings",
	extends: Runtime.Widget.Sortable.FieldList,
	data: function()
	{
		return {
			fields: Runtime.Vector.create([
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "type",
					"label": "Type",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Vector.create([
							Runtime.Map.create({"key": "input", "value": "input"}),
							Runtime.Map.create({"key": "textarea", "value": "textarea"}),
						]),
					}),
				}),
				Runtime.Map.create({
					"name": "title",
					"label": "Title",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "placeholder",
					"label": "Placeholder",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "required",
					"label": "Required",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Vector.create([
							Runtime.Map.create({"key": 0, "value": "No"}),
							Runtime.Map.create({"key": 1, "value": "Yes"}),
						]),
					}),
				}),
			]),
		};
	},
	methods:
	{
		/**
		 * Create new item
		 */
		createItem: function()
		{
			return Runtime.Map.create({
				"name": "",
				"title": "",
				"type": "input",
				"placeholder": "",
				"required": true,
			});
		},
		/**
		 * Copy item
		 */
		copyItem: function(item){ return item.copy(); },
		getClassName: function(){ return "Runtime.WordPress.Admin.FormSettings.FieldSettings"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Input", "Runtime.Widget.Select"); },
};
window["Runtime.WordPress.Admin.FormSettings.FieldSettings"] = Runtime.WordPress.Admin.FormSettings.FieldSettings;
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
if (typeof Runtime.WordPress.Admin.FormSettings == 'undefined') Runtime.WordPress.Admin.FormSettings = {};
Runtime.WordPress.Admin.FormSettings.FormSettingsPage = {
	name: "Runtime.WordPress.Admin.FormSettings.FormSettingsPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["form_settings_page", componentHash])}));
			
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
		getClassName: function(){ return "Runtime.WordPress.Admin.FormSettings.FormSettingsPage"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.Input", "Runtime.Widget.RowButtons", "Runtime.Widget.Table.TableWrap", "Runtime.WordPress.Admin.FormSettings.FieldSettings"); },
};
window["Runtime.WordPress.Admin.FormSettings.FormSettingsPage"] = Runtime.WordPress.Admin.FormSettings.FormSettingsPage;
"use strict;"
/*!
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
if (typeof Runtime.WordPress.Admin.FormSettings == 'undefined') Runtime.WordPress.Admin.FormSettings = {};
Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("manager", new Runtime.Serializer.ObjectType());
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.manager = this.createWidget("Runtime.Widget.Table.TableManager", Runtime.Map.create({
			"autoload": true,
			"api_name": "admin.wordpress.forms.settings",
			"page_name": "p",
			"title": new Runtime.Method(this, "getItemTitle"),
			"primary_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
			})),
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"name": new Runtime.Serializer.StringType(),
				"api_name": new Runtime.Serializer.StringType(),
				"email_to": new Runtime.Serializer.StringType(),
				"settings": new Runtime.Serializer.MapType(Runtime.Map.create({
					"fields": new Runtime.Serializer.VectorType(new Runtime.Serializer.MapType(Runtime.Map.create({
						"name": new Runtime.Serializer.StringType(),
						"type": new Runtime.Serializer.StringType(),
						"title": new Runtime.Serializer.StringType(),
						"placeholder": new Runtime.Serializer.StringType(),
						"required": new Runtime.Serializer.StringType(),
					}))),
				})),
			})),
			"form_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "api_name",
					"label": "Api name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "email_to",
					"label": "Email to",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "fields",
					"label": "Fields",
					"component": "Runtime.WordPress.Admin.FormSettings.FieldSettings",
					"value": (item) =>
					{
						let settings = item.get("settings");
						if (!settings) return Runtime.Vector.create([]);
						let fields = settings.get("fields");
						return fields ? fields : Runtime.Vector.create([]);
					},
					"setValue": (item, value) =>
					{
						let settings = item.get("settings");
						if (!settings)
						{
							settings = new Runtime.Map();
							item.set("settings", settings);
						}
						settings.set("fields", value);
					},
				}),
			]),
			"table_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "row_number",
				}),
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
				}),
				Runtime.Map.create({
					"name": "api_name",
					"label": "Api name",
				}),
				Runtime.Map.create({
					"name": "email_to",
					"label": "Email to",
				}),
				Runtime.Map.create({
					"name": "buttons",
					"slot": "row_buttons",
				}),
			]),
		}));
	}
	
	
	/**
	 * Returns item title
	 */
	getItemTitle(action, item)
	{
		if (action == "add") return "Add item";
		else if (action == "edit") return "Edit item";
		else if (action == "delete") return "Delete item";
		else if (action == "delete_message") return "Delete item";
		return "";
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		await super.loadData(container);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Forms settings");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.FormSettings.FormSettingsPage";
		this.manager = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel"] = Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel;
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
if (typeof Runtime.WordPress.Admin.Gallery == 'undefined') Runtime.WordPress.Admin.Gallery = {};
Runtime.WordPress.Admin.Gallery.GalleryPage = {
	name: "Runtime.WordPress.Admin.Gallery.GalleryPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["gallery_page", componentHash])}));
			
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
				
				/* Element div */
				let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["row_buttons", componentHash]), "style": "display: flex; gap: calc(var(--space) * 0.5);"}));
				
				/* Element Runtime.Widget.Button */
				let __v1 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--small", componentHash]), "href": Runtime.rs.urlGetAdd(this.layout.url("admin:gallery:item"), Runtime.Map.create({"id": item.get("id")}))}));
				
				/* Content */
				__v1.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Open");
					return __v;
				});
				
				/* Element Runtime.Widget.Button */
				let __v2 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--small", componentHash]), "onClick": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
				{
					this.model.manager.showEditDialog(item.copy());
				})}));
				
				/* Content */
				__v2.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Edit");
					return __v;
				});
				
				/* Element Runtime.Widget.Button */
				let __v3 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--small button--danger", componentHash]), "onClick": this.hash(2) ? this.hash(2) : this.hash(2, (event) =>
				{
					this.model.manager.showDeleteDialog(item.copy());
				})}));
				
				/* Content */
				__v3.slot("default", () =>
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
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.Gallery.GalleryPage"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.Input", "Runtime.Widget.RowButtons", "Runtime.Widget.Table.TableWrap"); },
};
window["Runtime.WordPress.Admin.Gallery.GalleryPage"] = Runtime.WordPress.Admin.Gallery.GalleryPage;
"use strict;"
/*!
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
if (typeof Runtime.WordPress.Admin.Gallery == 'undefined') Runtime.WordPress.Admin.Gallery = {};
Runtime.WordPress.Admin.Gallery.GalleryPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("manager", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"primary_rules": this.getPrimaryRules(),
			"item_rules": this.getItemRules(),
		})));
	}
	
	
	/**
	 * Returns primary rules
	 */
	static getPrimaryRules()
	{
		return new Runtime.Serializer.MapType(Runtime.Map.create({
			"id": new Runtime.Serializer.IntegerType(),
		}));
	}
	
	
	/**
	 * Returns item rules
	 */
	static getItemRules()
	{
		return new Runtime.Serializer.MapType(Runtime.Map.create({
			"id": new Runtime.Serializer.IntegerType(),
			"api_name": new Runtime.Serializer.StringType(),
		}));
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.manager = this.createWidget("Runtime.Widget.Table.TableManager", Runtime.Map.create({
			"autoload": true,
			"api_name": "admin.wordpress.gallery",
			"page_name": "p",
			"title": new Runtime.Method(this, "getItemTitle"),
			"primary_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
			})),
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"api_name": new Runtime.Serializer.StringType(),
			})),
			"form_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "api_name",
					"label": "Api name",
					"component": "Runtime.Widget.Input",
				}),
			]),
			"table_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "row_number",
				}),
				Runtime.Map.create({
					"name": "api_name",
					"label": "Api name",
				}),
				Runtime.Map.create({
					"name": "buttons",
					"slot": "row_buttons",
				}),
			]),
		}));
	}
	
	
	/**
	 * Returns item title
	 */
	getItemTitle(action, item)
	{
		if (action == "add") return "Add item";
		else if (action == "edit") return "Edit item";
		else if (action == "delete") return "Delete item";
		else if (action == "delete_message") return "Delete item";
		return "";
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		await super.loadData(container);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Gallery settings");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.Gallery.GalleryPage";
		this.manager = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Gallery.GalleryPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Gallery.GalleryPageModel"] = Runtime.WordPress.Admin.Gallery.GalleryPageModel;
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
"use strict;"
/*!
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
Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("manager", new Runtime.Serializer.ObjectType());
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.manager = this.createWidget("Runtime.Widget.Table.TableManager", Runtime.Map.create({
			"autoload": true,
			"api_name": "admin.wordpress.gallery.item",
			"page_name": "p",
			"title": new Runtime.Method(this, "getItemTitle"),
			"primary_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
			})),
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"name": new Runtime.Serializer.StringType(),
				"image": new Runtime.Serializer.ObjectType(Runtime.Map.create({
					"class_name": "Runtime.WordPress.Theme.Components.ImageType",
				})),
				"pos": new Runtime.Serializer.IntegerType(),
			})),
			"foreign_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"item_id": new Runtime.Serializer.IntegerType(),
			})),
			"form_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "image",
					"label": "Image",
					"component": "Runtime.WordPress.Admin.Components.Image",
					"props": Runtime.Map.create({
						"upload": true,
					}),
				}),
				Runtime.Map.create({
					"name": "pos",
					"label": "Pos",
					"component": "Runtime.Widget.Input",
				}),
			]),
			"table_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "row_number",
				}),
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
				}),
				Runtime.Map.create({
					"name": "image",
					"label": "Image",
					"component": "Runtime.WordPress.Admin.Components.Image",
				}),
				Runtime.Map.create({
					"name": "pos",
					"label": "pos",
				}),
				Runtime.Map.create({
					"name": "buttons",
					"slot": "row_buttons",
				}),
			]),
		}));
	}
	
	
	/**
	 * Returns item title
	 */
	getItemTitle(action, item)
	{
		if (action == "add") return "Add item";
		else if (action == "edit") return "Edit item";
		else if (action == "delete") return "Delete item";
		else if (action == "delete_message") return "Delete item";
		return "";
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		this.manager.setForeignKey(Runtime.Map.create({
			"item_id": container.request.query.get("id"),
		}));
		await super.loadData(container);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Gallery items");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.GalleryItem.GalleryItemPage";
		this.manager = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel"] = Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel;
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
"use strict;"
/*!
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
Runtime.WordPress.Admin.MailLog.MailLogPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("table", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"class_name": "Runtime.Widget.Table.TableModel",
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"worker": new Runtime.Serializer.StringType(),
				"plan": new Runtime.Serializer.StringType(),
				"status": new Runtime.Serializer.IntegerType(),
				"dest": new Runtime.Serializer.StringType(),
				"title": new Runtime.Serializer.StringType(),
				"message": new Runtime.Serializer.StringType(),
				"send_email_error": new Runtime.Serializer.StringType(),
				"gmtime_send": new Runtime.Serializer.DateTimeType(),
			})),
		})));
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.table = this.createWidget("Runtime.Widget.Table.TableModel");
		this.loader = this.createWidget("Runtime.Widget.Table.TableLoader", Runtime.Map.create({
			"table": this.table,
			"api_name": "admin.wordpress.mail.log.search",
			"method_name": "search",
			"page_name": "p",
		}));
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		await this.loader.loadData(container);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Mail log");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.MailLog.MailLogPage";
		this.table = null;
		this.loader = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.MailLog.MailLogPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.MailLog.MailLogPageModel"] = Runtime.WordPress.Admin.MailLog.MailLogPageModel;
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
if (typeof Runtime.WordPress.Admin.MailSettings == 'undefined') Runtime.WordPress.Admin.MailSettings = {};
Runtime.WordPress.Admin.MailSettings.MailSettingsPage = {
	name: "Runtime.WordPress.Admin.MailSettings.MailSettingsPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["mail_settings_page", componentHash])}));
			
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
						__v.push("Add");
						return __v;
					});
					
					return __v;
				});
				
				return __v;
			});
			
			/* Slot row_buttons */
			__v1.slot("row_buttons", (item, field, row_buttons) =>
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
		getClassName: function(){ return "Runtime.WordPress.Admin.MailSettings.MailSettingsPage"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.RowButtons", "Runtime.Widget.Input", "Runtime.Widget.Select", "Runtime.Widget.Table.TableWrap"); },
};
window["Runtime.WordPress.Admin.MailSettings.MailSettingsPage"] = Runtime.WordPress.Admin.MailSettings.MailSettingsPage;
"use strict;"
/*!
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
if (typeof Runtime.WordPress.Admin.MailSettings == 'undefined') Runtime.WordPress.Admin.MailSettings = {};
Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("manager", new Runtime.Serializer.ObjectType());
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.manager = this.createWidget("Runtime.Widget.Table.TableManager", Runtime.Map.create({
			"autoload": true,
			"api_name": "admin.wordpress.mail.settings",
			"page_name": "p",
			"title": new Runtime.Method(this, "getItemTitle"),
			"primary_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
			})),
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"enable": new Runtime.Serializer.IntegerType(),
				"plan": new Runtime.Serializer.StringType(),
				"host": new Runtime.Serializer.StringType(),
				"port": new Runtime.Serializer.StringType(),
				"login": new Runtime.Serializer.StringType(),
				"password": new Runtime.Serializer.StringType(),
				"ssl_enable": new Runtime.Serializer.IntegerType(),
			})),
			"form_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "enable",
					"label": "Enable",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Widget.BoolEnum.options(),
					}),
				}),
				Runtime.Map.create({
					"name": "plan",
					"label": "Plan",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "host",
					"label": "Host",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "port",
					"label": "Port",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "login",
					"label": "Login",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "password",
					"label": "Password",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "ssl_enable",
					"label": "SSL",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Widget.BoolEnum.options(),
					}),
				}),
			]),
			"table_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "row_number",
				}),
				Runtime.Map.create({
					"name": "enable",
					"label": "Enable",
					"value": (item) => { return Runtime.Widget.BoolEnum.label(item.get("enable")); },
				}),
				Runtime.Map.create({
					"name": "plan",
					"label": "Plan",
				}),
				Runtime.Map.create({
					"name": "host",
					"label": "Host",
				}),
				Runtime.Map.create({
					"name": "port",
					"label": "Port",
				}),
				Runtime.Map.create({
					"name": "login",
					"label": "Login",
				}),
				Runtime.Map.create({
					"name": "ssl_enable",
					"label": "SSL",
					"value": (item) => { return Runtime.Widget.BoolEnum.label(item.get("enable")); },
				}),
				Runtime.Map.create({
					"name": "buttons",
					"slot": "row_buttons",
				}),
			]),
		}));
	}
	
	
	/**
	 * Returns item title
	 */
	getItemTitle(action, item)
	{
		if (action == "add") return "Add item";
		else if (action == "edit") return "Edit item";
		else if (action == "delete") return "Delete item";
		else if (action == "delete_message") return "Delete item";
		return "";
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		await super.loadData(container);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Mail settings");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.MailSettings.MailSettingsPage";
		this.manager = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel"] = Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel;
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
if (typeof Runtime.WordPress.Admin.Migrations == 'undefined') Runtime.WordPress.Admin.Migrations = {};
Runtime.WordPress.Admin.Migrations.MigrationPage = {
	name: "Runtime.WordPress.Admin.Migrations.MigrationPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["database_migration_page", componentHash])}));
			
			if (this.model.items.count() > 0)
			{
				/* Element Runtime.Widget.TextEditable */
				__v0.element("Runtime.Widget.TextEditable", new Runtime.Map({"value": Runtime.rs.join("\n", this.model.items)}));
				
				/* Element div */
				let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["buttons", componentHash])}));
				
				/* Element Runtime.Widget.Button */
				let __v2 = __v1.element("Runtime.Widget.Button", new Runtime.Map({"styles": Runtime.Vector.create(["primary"]), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, () =>
				{
					this.model.updateDatabase();
				})}));
				
				/* Content */
				__v2.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Update");
					return __v;
				});
				__v0.push(this.renderWidget(this.model.result));
			}
			else
			{
				/* Element div */
				let __v3 = __v0.element("div");
				__v3.push("Database is up to date");
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.Migrations.MigrationPage"; },
	},
	getComponentStyle: function(){ return ".database_migration_page.h-fb32 .text_editable{height: 350px}.database_migration_page.h-fb32 .buttons{margin-top: calc(var(--space) * 2);text-align: center}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.RowButtons", "Runtime.Widget.TextEditable"); },
};
window["Runtime.WordPress.Admin.Migrations.MigrationPage"] = Runtime.WordPress.Admin.Migrations.MigrationPage;
"use strict;"
/*!
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
if (typeof Runtime.WordPress.Admin.Migrations == 'undefined') Runtime.WordPress.Admin.Migrations = {};
Runtime.WordPress.Admin.Migrations.MigrationPageModel = class extends Runtime.BaseModel
{
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Add result */
		this.result = this.createWidget("Runtime.Widget.ResultModel", Runtime.Map.create({
			"styles": Runtime.Vector.create(["margin_top"]),
		}));
	}
	
	
	/**
	 * Process frontend data
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("items", new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType()));
	}
	
	
	/**
	 * Update database
	 */
	async updateDatabase()
	{
		this.result.setWaitMessage();
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.migration",
			"method_name": "update",
		}));
		this.result.setApiResult(result);
	}
	
	
	/**
	 * Load table data
	 */
	async loadData(container)
	{
		await super.loadData(container);
		let result = this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.migration",
			"method_name": "item",
		}));
		if (result.isSuccess())
		{
			this.items = result.data.get("items");
		}
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Database migrations");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.Migrations.MigrationPage";
		this.items = Runtime.Vector.create([]);
		this.result = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Migrations.MigrationPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Migrations.MigrationPageModel"] = Runtime.WordPress.Admin.Migrations.MigrationPageModel;
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
if (typeof Runtime.WordPress.Admin.Robots == 'undefined') Runtime.WordPress.Admin.Robots = {};
Runtime.WordPress.Admin.Robots.RobotsPage = {
	name: "Runtime.WordPress.Admin.Robots.RobotsPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["form_settings_page", componentHash])}));
			
			/* Element Runtime.Widget.Form.Form */
			let __v1 = __v0.element("Runtime.Widget.Form.Form", new Runtime.Map({"model": this.model.form}));
			
			/* Content */
			__v1.slot("default", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				/* Element Runtime.Widget.Form.FormRow */
				let __v0 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Robots"}));
				
				/* Content */
				__v0.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					
					/* Element Runtime.Widget.TextArea */
					__v.element("Runtime.Widget.TextArea", new Runtime.Map({"value": this.model.form.item.get("content"), "onValueChange": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
					{
						this.model.form.item.set("content", event.value);
					})}));
					
					return __v;
				});
				__v.push(this.renderWidget(this.model.form.result, Runtime.Map.create({
					"class": "result--form",
				})));
				
				/* Element Runtime.Widget.RowButtons */
				let __v1 = __v.element("Runtime.Widget.RowButtons");
				
				/* Content */
				__v1.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					
					/* Element Runtime.Widget.Button */
					let __v0 = __v.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--primary button--large", componentHash]), "onClick": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
					{
						this.model.onSave();
					})}));
					
					/* Content */
					__v0.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						__v.push("Save");
						return __v;
					});
					
					return __v;
				});
				
				return __v;
			});
			
			return __v;
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.Robots.RobotsPage"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.RowButtons", "Runtime.Widget.TextArea", "Runtime.Widget.Form.Form", "Runtime.Widget.Form.FormRow"); },
};
window["Runtime.WordPress.Admin.Robots.RobotsPage"] = Runtime.WordPress.Admin.Robots.RobotsPage;
"use strict;"
/*!
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
if (typeof Runtime.WordPress.Admin.Robots == 'undefined') Runtime.WordPress.Admin.Robots = {};
Runtime.WordPress.Admin.Robots.RobotsPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("form", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"class_name": "Runtime.Widget.Form.FormModel",
			"item_type": new Runtime.Serializer.MapType(Runtime.Map.create({
				"content": new Runtime.Serializer.StringType(new Runtime.Map()),
			})),
		})));
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Add form */
		this.form = this.createWidget("Runtime.Widget.Form.FormModel");
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.robots",
			"method_name": "item",
		}));
		if (result.isSuccess())
		{
			this.form.item = Runtime.Map.create({
				"content": result.data.get("content"),
			});
		}
	}
	
	
	/**
	 * Save form
	 */
	async onSave()
	{
		this.form.setWaitMessage();
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.robots",
			"method_name": "save",
			"data": Runtime.Map.create({
				"content": this.form.item.get("content"),
			}),
		}));
		this.form.setApiResult(result);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Robots TXT");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.Robots.RobotsPage";
		this.form = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Robots.RobotsPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Robots.RobotsPageModel"] = Runtime.WordPress.Admin.Robots.RobotsPageModel;
"use strict;"
/*!
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
Runtime.WordPress.Admin.AppHook = class extends Runtime.Hooks.BaseHook
{
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(Runtime.Hooks.RuntimeHook.SEND_API_BEFORE, "sendApiBefore");
	}
	
	
	/**
	 * Run api middleware
	 */
	async checkIsAdmin(params)
	{
		let api = params.get("api");
		let api_name = api.constructor.getApiName();
		if (Runtime.rs.indexOf(api_name, "admin.") != -1)
		{
		}
	}
	
	
	/**
	 * Send api before
	 */
	sendApiBefore(params)
	{
		let api_url = Runtime.rs.urlGetAdd("/wp-admin/admin-ajax.php?action=admin_call_api", Runtime.Map.create({
			"service_name": params.get("service_name"),
			"api_name": params.get("api_name"),
			"method_name": params.get("method_name"),
		}));
		params.set("api_url", api_url);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Admin.AppHook"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.AppHook"] = Runtime.WordPress.Admin.AppHook;
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
Runtime.WordPress.Admin.CSS = {
	name: "Runtime.WordPress.Admin.CSS",
	extends: Runtime.Component,
	methods:
	{
		getClassName: function(){ return "Runtime.WordPress.Admin.CSS"; },
	},
	getComponentStyle: function(){ return ".wp_admin_layout{--font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;--font-size: 14px;--font-input-size: 14px;--font-size-h1: 28px;--font-size-h2: 16px;--font-size-h3: 16px;--font-size-h4: 16px;--font-size-h5: 16px;--font-size-h6: 16px;font-family: var(--font-family);font-size: var(--font-size)}.wp_admin_layout .button{display: inline-flex;align-items: center;justify-content: center;color: var(--color-text);font-weight: 500;font-family: var(--font-family);font-size: var(--font-input-size);line-height: var(--line-height);text-decoration: none;background-color: var(--color-background);border: var(--border-width) var(--color-border) solid;padding: calc(var(--space) * 0.5) calc(var(--space) * 1.5);outline: none;cursor: pointer;border-radius: var(--border-radius);transition: background-color var(--transition) var(--transition-type),\n\t\t\tborder-color var(--transition) var(--transition-type),\n\t\t\tcolor var(--transition) var(--transition-type)}.wp_admin_layout .button:focus{background-color: var(--color-background);border: var(--border-width) var(--color-border) solid;box-shadow: none;outline: none}.wp_admin_layout .button:hover{color: var(--color-text);background-color: var(--color-background);border-color: var(--color-border)}.wp_admin_layout .button:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25);outline: none}.wp_admin_layout .button--small{padding: 6px 9px;line-height: 1.2em}.wp_admin_layout .button--large{padding: calc(var(--space) * 1) calc(var(--space) * 2)}.wp_admin_layout .button--primary, .wp_admin_layout .button--primary:focus{color: var(--color-primary-text);background-color: var(--color-primary);border-color: var(--color-primary-border)}.wp_admin_layout .button--primary:hover, .wp_admin_layout .button--primary:focus:hover{color: var(--color-primary-text);background-color: var(--color-primary-hover);border-color: var(--color-primary-border)}.wp_admin_layout .button--secondary, .wp_admin_layout .button--secondary:focus{color: var(--color-secondary-text);background-color: var(--color-secondary);border-color: var(--color-secondary-border)}.wp_admin_layout .button--secondary:hover, .wp_admin_layout .button--secondary:focus:hover{color: var(--color-secondary-text);background-color: var(--color-secondary-hover);border-color: var(--color-secondary-border)}.wp_admin_layout .button--outline, .wp_admin_layout .button--outline:focus{color: var(--color-text);background-color: transparent;border-color: var(--color-border)}.wp_admin_layout .button--outline:hover, .wp_admin_layout .button--outline:focus:hover{color: var(--color-text);background-color: var(--color-surface);border-color: var(--color-border)}.wp_admin_layout .button--danger, .wp_admin_layout .button--danger:focus{color: var(--color-danger-text);background-color: var(--color-danger);border-color: var(--color-danger-border)}.wp_admin_layout .button--danger:hover, .wp_admin_layout .button--danger:focus:hover{color: var(--color-danger-text);background-color: var(--color-danger-hover);border-color: var(--color-danger-border)}.wp_admin_layout .button--success, .wp_admin_layout .button--success:focus{color: var(--color-success-text);background-color: var(--color-success);border-color: var(--color-success-border)}.wp_admin_layout .button--success:hover, .wp_admin_layout .button--success:focus:hover{color: var(--color-success-text);background-color: var(--color-success);border-color: var(--color-success-border)}.wp_admin_layout .button--info, .wp_admin_layout .button--info:focus{color: var(--color-info-text);background-color: var(--color-info);border-color: var(--color-info-border)}.wp_admin_layout .button--info:hover, .wp_admin_layout .button--info:focus:hover{color: var(--color-info-text);background-color: var(--color-info-hover);border-color: var(--color-info-border)}.wp_admin_layout .button--warning, .wp_admin_layout .button--warning:focus{background-color: var(--color-warning);border-color: var(--color-warning-border)}.wp_admin_layout .button--warning:hover, .wp_admin_layout .button--warning:focus:hover{background-color: var(--color-warning-hover);border-color: var(--color-warning-border)}.wp_admin_layout .button--stretch, .wp_admin_layout .button--stretch:focus{width: 100%}.wp_admin_layout .dialog__header .button{border-width: 0}.wp_admin_layout input:focus, .wp_admin_layout select:focus, .wp_admin_layout textarea:focus{border-color: var(--color-border);box-shadow: none}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.CSS", "Runtime.Widget.Button", "Runtime.Widget.Input", "Runtime.Widget.RowButtons", "Runtime.Widget.Select", "Runtime.Widget.TextArea", "Runtime.Widget.Dialog.Dialog", "Runtime.Widget.Table.Table"); },
};
window["Runtime.WordPress.Admin.CSS"] = Runtime.WordPress.Admin.CSS;
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
"use strict;"
/*!
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
Runtime.WordPress.Admin.AdminLayoutModel = class extends Runtime.BaseLayout
{
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.AdminLayout";
	}
	static getClassName(){ return "Runtime.WordPress.Admin.AdminLayoutModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.AdminLayoutModel"] = Runtime.WordPress.Admin.AdminLayoutModel;
"use strict;"
/*!
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
Runtime.WordPress.Admin.ModuleDescription = class
{
	/**
	 * Returns module name
	 */
	static getModuleName(){ return "Runtime.WordPress.Admin"; }
	
	
	/**
	 * Returns module version
	 */
	static getModuleVersion(){ return "0.0.1"; }
	
	
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static requiredModules()
	{
		return Runtime.Map.create({
			"Runtime.Widget": ">1.0",
			"Runtime.WordPress": ">=1.0",
		});
	}
	
	
	/**
	 * Returns enities
	 */
	static entities()
	{
		return Runtime.Vector.create([
			new Runtime.Entity.Hook("Runtime.WordPress.Admin.AppHook"),
			Runtime.Web.Hooks.SetupLayout.hook(Runtime.Map.create({
				"admin": "Runtime.WordPress.Admin.AdminLayoutModel",
			})),
			Runtime.Web.Hooks.Components.prependItems(Runtime.Vector.create(["Runtime.WordPress.Admin.CSS"])),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.WordPress.Admin.ModuleDescription"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.ModuleDescription"] = Runtime.WordPress.Admin.ModuleDescription;
