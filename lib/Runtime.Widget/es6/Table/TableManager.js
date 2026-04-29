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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableManager = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("foreign_key", rules.params ? rules.params.get("foreign_key") : null);
		rules.addType("form", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"autocreate": true,
			"extends": "Runtime.Widget.Form.FormModel",
			"primary_rules": rules.params ? rules.params.get("primary_rules") : null,
			"item_rules": rules.params ? rules.params.get("item_rules") : null,
		})));
		rules.addType("table", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"autocreate": true,
			"extends": "Runtime.Widget.Table.TableModel",
			"item_rules": rules.params ? rules.params.get("item_rules") : null,
		})));
		rules.addType("dialog", new Runtime.Serializer.ObjectType(Runtime.Map.create({"extends": "Runtime.Widget.Dialog.DialogModel"})));
		rules.addType("loader", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"extends": "Runtime.Widget.Table.TableLoader",
			"foreign_key": rules.params ? rules.params.get("foreign_key") : null,
		})));
		rules.setup.add((model, rules) =>
		{
			rules.addType("foreign_key", model.foreign_rules);
			let form = rules.items.get("form").get(0);
			form.params.set("primary_rules", model.primary_rules);
			form.params.set("item_rules", model.item_rules);
			let table = rules.items.get("table").get(0);
			table.params.set("item_rules", model.item_rules);
			let loader = rules.items.get("loader").get(0);
			loader.params.set("foreign_key", model.foreign_rules);
		});
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params.has("api_name")) this.api_name = params.get("api_name");
		if (params.has("foreign_key")) this.foreign_key = params.get("foreign_key");
		if (params.has("foreign_rules")) this.foreign_rules = params.get("foreign_rules");
		if (params.has("item_rules"))
		{
			this.item_rules = params.get("item_rules");
			if (this.item_rules instanceof Runtime.Map) this.item_rules = new Runtime.Serializer.MapType(this.item_rules);
		}
		if (params.has("primary_rules"))
		{
			this.primary_rules = params.get("primary_rules");
			if (this.primary_rules instanceof Runtime.Map) this.primary_rules = new Runtime.Serializer.MapType(this.primary_rules);
		}
		if (params.has("page_name")) this.page_name = params.get("page_name");
		if (params.has("title")) this.title = params.get("title");
		if (this.foreign_rules instanceof Runtime.Map) this.foreign_rules = new Runtime.Serializer.MapType(this.foreign_rules);
	}
	
	
	/**
	 * Init widget
	 */
	initWidget(params)
	{
		super.initWidget(params);
		if (params.has("dialog")) this.dialog = params.get("dialog");
		else this.dialog = this.createWidget("Runtime.Widget.Dialog.DialogModel");
		this.dialog.addEventListener("hide", new Runtime.Method(this, "onDialogHide"));
		if (params.has("form")) this.form = params.get("form");
		else this.form = this.createWidget("Runtime.Widget.Form.FormModel");
		if (params.has("table")) this.table = params.get("table");
		else this.table = this.createWidget("Runtime.Widget.Table.TableModel");
		if (params.has("loader")) this.loader = params.get("loader");
		else this.loader = this.createWidget("Runtime.Widget.Table.TableLoader", Runtime.Map.create({
			"api_name": this.api_name,
			"foreign_key": this.foreign_key,
			"page_name": this.page_name,
			"table": this.table,
		}));
		this.loader.table = this.table;
		this.loader.page_name = this.page_name;
		if (params.has("data_object")) this.form.data_object = params.get("data_object");
		if (params.has("form_fields")) this.form_fields = params.get("form_fields");
		if (params.has("table_fields")) this.table_fields = params.get("table_fields");
		/* Setup item rules */
		this.form.item_rules = params.get("item_rules");
		this.table.item_rules = params.get("item_rules");
		/* Add fields */
		let fields = this.form_fields ? this.form_fields : Runtime.Vector.create([]);
		if (this.table_fields) fields = fields.concat(this.table_fields);
		fields.each((field) =>
		{
			if (!field.has("component")) return;
			this.layout.components.push(field.get("component"));
		});
		/* Add listener */
		this.form.addEventListener("setValue", new Runtime.Method(this, "onFormSetValue"));
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		await this.loader.loadData(container);
	}
	
	
	/**
	 * Set api params
	 */
	setApiParams(params)
	{
		this.loader.setApiParams(params);
	}
	
	
	/**
	 * Set filter
	 */
	setFilter(params)
	{
		this.loader.setApiParams(params);
	}
	
	
	/**
	 * Set foreign key
	 */
	setForeignKey(key)
	{
		this.foreign_key = key;
		this.loader.foreign_key = key;
	}
	
	
	/**
	 * Returns dialog action
	 */
	getDialogAction()
	{
		if (this.dialog_action == "save")
		{
			if (this.form.pk) return "edit";
			else return "add";
		}
		return this.dialog_action;
	}
	
	
	/**
	 * Returns dialog title
	 */
	getDialogTitle(action)
	{
		if (this.title) return Runtime.rtl.apply(this.title, Runtime.Vector.create([action, this.form.item]));
		return "";
	}
	
	
	/**
	 * Show add dialog
	 */
	showAddDialog()
	{
		this.dialog_action = "save";
		this.form.clear();
		this.dialog.show();
	}
	
	
	/**
	 * Show edit dialog
	 */
	showEditDialog(item)
	{
		this.dialog_action = "save";
		this.form.clear();
		this.form.setPrimaryKey(item);
		this.form.setItem(item);
		this.dialog.show();
	}
	
	
	/**
	 * Show delete dialog
	 */
	showDeleteDialog(item)
	{
		this.dialog_action = "delete";
		this.form.clear();
		this.form.setPrimaryKey(item);
		this.form.setItem(item);
		this.dialog.show();
	}
	
	
	/**
	 * On hide dialog
	 */
	onDialogHide()
	{
		this.dialog_action = "";
	}
	
	
	/**
	 * Form set value
	 */
	async onFormSetValue(message)
	{
		if (message.save_draft)
		{
			let result = await this.layout.sendApi(Runtime.Map.create({
				"api_name": this.api_name,
				"method_name": "save_draft",
				"data": Runtime.Map.create({
					"pk": this.form.pk,
					"item": this.form.item,
					"foreign_key": this.foreign_key,
				}),
			}));
		}
	}
	
	
	/**
	 * Reload
	 */
	async reload()
	{
		return await this.loader.reload();
	}
	
	
	/**
	 * On save
	 */
	async onSave()
	{
		this.form.setWaitMessage();
		let result = await this.loader.save(this.form.pk, this.form.item);
		this.form.setApiResult(result);
		if (result.isSuccess())
		{
			this.loader.reload();
			this.dialog.hide();
		}
	}
	
	
	/**
	 * On delete
	 */
	async onDelete()
	{
		this.form.setWaitMessage();
		let result = await this.loader.delete(this.form.pk);
		this.form.setApiResult(result);
		if (result.isSuccess())
		{
			this.loader.reload();
			this.dialog.hide();
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.form = null;
		this.table = null;
		this.api_name = "";
		this.page_name = "page";
		this.form_fields = Runtime.Vector.create([]);
		this.table_fields = Runtime.Vector.create([]);
		this.foreign_key = null;
		this.foreign_rules = null;
		this.item_rules = null;
		this.primary_rules = null;
		this.dialog_action = "";
		this.dialog = null;
		this.loader = null;
		this.title = null;
	}
	static getClassName(){ return "Runtime.Widget.Table.TableManager"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Table.TableManager"] = Runtime.Widget.Table.TableManager;