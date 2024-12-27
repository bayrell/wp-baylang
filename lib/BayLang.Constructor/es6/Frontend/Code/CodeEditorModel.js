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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Code == 'undefined') BayLang.Constructor.Frontend.Code = {};
BayLang.Constructor.Frontend.Code.CodeEditorModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Code.CodeEditorModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
BayLang.Constructor.Frontend.Code.CodeEditorModel.prototype.constructor = BayLang.Constructor.Frontend.Code.CodeEditorModel;
Object.assign(BayLang.Constructor.Frontend.Code.CodeEditorModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Setup settings */
		this.project_id = this.layout.route.matches.get("project_id");
		/* Save result */
		this.save_result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"widget_name":"save_result"}));
		/* Confirm dialog */
		this.confirm_dialog = this.addWidget("Runtime.Widget.Dialog.ConfirmDialogModel", Runtime.Map.from({"widget_name":"confirm_dialog","events":Runtime.Map.from({"confirm":new Runtime.Callback(this, "onDialogConfirm")})}));
		/* Prompt dialog */
		this.prompt_dialog = this.addWidget("Runtime.Widget.Dialog.PromptDialogModel", Runtime.Map.from({"widget_name":"prompt_dialog","events":Runtime.Map.from({"confirm":new Runtime.Callback(this, "onDialogConfirm")})}));
		/* Create Tree */
		this.tree = this.addWidget("Runtime.Widget.Tree.TreeModel", Runtime.Map.from({"component":"BayLang.Constructor.Frontend.Code.TreeWidget","dnd":false,"icons":true,"events":Runtime.Map.from({"selectItem":new Runtime.Callback(this, "onTreeSelectItem"),"contextMenu":new Runtime.Callback(this, "onTreeContextMenu")}),"context_menu":Runtime.Map.from({"items":Runtime.Vector.from([Runtime.Map.from({"label":"Create file","key":"create_file"}),Runtime.Map.from({"label":"Create folder","key":"create_folder"}),Runtime.Map.from({"label":"Rename","key":"rename"}),Runtime.Map.from({"label":"Cut","key":"cut"}),Runtime.Map.from({"label":"Copy","key":"copy"}),Runtime.Map.from({"label":"Paste","key":"paste"}),Runtime.Map.from({"label":"Delete","key":"delete"})]),"events":Runtime.Map.from({"clickItem":new Runtime.Callback(this, "onContextMenuItemClick")})})}));
		this.tree.root = new BayLang.Constructor.Frontend.Code.TreeItem(Runtime.Map.from({"project_id":this.project_id,"open":true}));
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Code editor");
	},
	/**
	 * Load data
	 */
	loadData: async function(container)
	{
		await Runtime.Web.BasePageModel.prototype.loadData.call(this, container);
		/* Load root */
		await this.loadItems(this.tree.root);
	},
	/**
	 * Remove tab
	 */
	selectTab: function(item)
	{
		this.selected_tab = item;
	},
	/**
	 * Add tab
	 */
	addTab: function(item)
	{
		this.tabs.push(this.selected_item);
	},
	/**
	 * Remove tab
	 */
	removeTab: function(item)
	{
		this.tabs.removeItem(item);
		this.save_result.clear();
		if (this.selected_tab == item)
		{
			this.selected_tab = null;
		}
	},
	/**
	 * Tree context menu
	 */
	onTreeContextMenu: function(message)
	{
		var item = message.item;
		this.tree.context_menu.items.each((params) =>
		{
			var key = params.get("key");
			/* Copy */
			if (key == "copy" || key == "cut" || key == "rename" || key == "delete")
			{
				if (item == null)
				{
					params.set("hidden", true);
				}
				else
				{
					params.set("hidden", false);
				}
			}
			/* Paste */
			if (key == "paste")
			{
				if (this.copy_past_path == "" || item != null && Runtime.rs.dirname(this.copy_past_path) == item.file_path || item == null && Runtime.rs.dirname(this.copy_past_path) == "")
				{
					params.set("hidden", true);
				}
				else
				{
					params.set("hidden", false);
				}
			}
		});
	},
	/**
	 * Context menu item click
	 */
	onContextMenuItemClick: async function(message)
	{
		var item_key = message.item.get("key");
		/* Hide context menu */
		message.widget.hide();
		/* Create file */
		if (item_key == "create_file")
		{
			var confirm_button = this.prompt_dialog.buttons.getWidget("confirm_button");
			confirm_button.content = "Create";
			this.prompt_dialog.action = "create_file";
			this.prompt_dialog.title = "Create file";
			this.prompt_dialog.value = "";
			this.prompt_dialog.show();
		}
		else if (item_key == "create_folder")
		{
			var confirm_button = this.prompt_dialog.buttons.getWidget("confirm_button");
			confirm_button.content = "Create";
			this.prompt_dialog.action = "create_folder";
			this.prompt_dialog.title = "Create folder";
			this.prompt_dialog.value = "";
			this.prompt_dialog.show();
		}
		else if (item_key == "rename")
		{
			var confirm_button = this.prompt_dialog.buttons.getWidget("confirm_button");
			confirm_button.content = "Rename";
			this.prompt_dialog.action = "rename";
			this.prompt_dialog.title = "Rename item " + Runtime.rtl.toStr(this.selected_item.label);
			this.prompt_dialog.value = this.selected_item.label;
			this.prompt_dialog.show();
		}
		else if (item_key == "remove" || item_key == "delete")
		{
			var confirm_button = this.confirm_dialog.buttons.getWidget("confirm_button");
			confirm_button.content = "Remove";
			confirm_button.styles = Runtime.Vector.from(["danger"]);
			this.confirm_dialog.action = "remove";
			this.confirm_dialog.title = "Remove item " + Runtime.rtl.toStr(this.selected_item.label);
			this.confirm_dialog.show();
		}
		else if (item_key == "copy" || item_key == "cut")
		{
			this.copy_past_path = this.selected_item.file_path;
			this.copy_past_kind = item_key;
		}
		else if (item_key == "paste")
		{
			if (this.copy_past_path == "")
			{
				return Promise.resolve();
			}
			var parent_path = (this.selected_path) ? (this.selected_path.slice()) : (Runtime.Vector.from([]));
			var parent_item = this.tree.root.get(parent_path);
			/* Paste item */
			var res = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.code","method_name":"move","data":Runtime.Map.from({"project_id":this.project_id,"file_path":this.copy_past_path,"dest_path":parent_item.file_path,"kind":(this.copy_past_kind == "copy") ? ("copy") : ("")})}));
			/* Success */
			if (res.isSuccess())
			{
				/* Clear path */
				this.copy_past_path = "";
				/* Reload items */
				parent_item.is_loaded = false;
				await this.loadItems(parent_item);
			}
		}
	},
	/**
	 * Confirm dialog
	 */
	onDialogConfirm: async function(message)
	{
		/* Create file */
		if (message.widget.action == "create_file" || message.widget.action == "create_folder")
		{
			var parent_path = (this.selected_path) ? (this.selected_path.slice()) : (Runtime.Vector.from([]));
			var parent_item = this.tree.root.get(parent_path);
			/* Create item */
			var res = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.code","method_name":"create","data":Runtime.Map.from({"project_id":this.project_id,"file_path":(this.selected_item) ? (this.selected_item.file_path) : (""),"file_name":message.value,"kind":(message.widget.action == "create_file") ? ("file") : ("folder")})}));
			/* Reload items */
			if (res.isSuccess())
			{
				parent_item.is_loaded = false;
				await this.loadItems(parent_item);
			}
		}
		else if (message.widget.action == "rename")
		{
			var parent_path = this.selected_path.slice(0, -1);
			var parent_item = this.tree.root.get(parent_path);
			this.selected_item.label = message.value;
			/* Rename item */
			var res = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.code","method_name":"rename","data":Runtime.Map.from({"project_id":this.project_id,"file_path":this.selected_item.file_path,"file_new_name":message.value})}));
			/* Reload items */
			if (res.isSuccess())
			{
				parent_item.is_loaded = false;
				await this.loadItems(parent_item);
			}
		}
		else if (message.widget.action == "remove")
		{
			var parent_path = this.selected_path.slice(0, -1);
			var parent_item = this.tree.root.get(parent_path);
			/* Rename item */
			var res = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.code","method_name":"remove","data":Runtime.Map.from({"project_id":this.project_id,"file_path":this.selected_item.file_path})}));
			/* Reload items */
			if (res.isSuccess())
			{
				parent_item.is_loaded = false;
				await this.loadItems(parent_item);
			}
		}
	},
	/**
	 * Select item
	 */
	onTreeSelectItem: async function(message)
	{
		this.selected_item = message.item;
		this.selected_path = (message.path) ? (message.path.slice()) : (null);
		if (!this.selected_item)
		{
			return Promise.resolve();
		}
		if (message.kind != "click")
		{
			return Promise.resolve();
		}
		if (this.selected_item.kind == "dir")
		{
			await this.loadItems(this.selected_item);
		}
		else if (this.selected_item.kind == "file")
		{
			if (this.tabs.indexOf(this.selected_item) == -1)
			{
				this.addTab(this.selected_item);
				this.selectTab(this.selected_item);
				await this.loadFileContent(this.selected_item);
			}
			else
			{
				this.selectTab(this.selected_item);
			}
		}
	},
	/**
	 * Save file
	 */
	save: async function()
	{
		if (!this.selected_tab)
		{
			return Promise.resolve();
		}
		this.save_result.setWaitMessage();
		var content = this.selected_tab.code_editor.value().getValue();
		var res = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.code","method_name":"saveContent","data":Runtime.Map.from({"project_id":this.project_id,"file_path":this.selected_tab.file_path,"content":content})}));
		this.save_result.setApiResult(res);
	},
	/**
	 * Load file content
	 */
	loadFileContent: async function(item)
	{
		/* Clear content */
		item.content = "";
		item.is_loaded = true;
		/* Send request */
		var res = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.code","method_name":"getContent","data":Runtime.Map.from({"project_id":item.project_id,"module_id":item.module_id,"file_path":item.file_path})}));
		/* Check is response is success */
		if (!res.isSuccess())
		{
			return Promise.resolve();
		}
		/* Set file content */
		item.content = res.data.get("content");
	},
	/**
	 * Load items
	 */
	loadItems: async function(item)
	{
		if (item.isLoaded())
		{
			return Promise.resolve();
		}
		var res = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.code","method_name":"getFiles","data":Runtime.Map.from({"project_id":item.project_id,"module_id":item.module_id,"file_path":item.file_path})}));
		item.is_loaded = true;
		if (!res.isSuccess())
		{
			return Promise.resolve();
		}
		var items = res.data.get("items");
		/* Add items */
		for (var i = 0; i < items.count(); i++)
		{
			var file = items.get(i);
			var label = file.get("file_name");
			var pos = item.items.find(Runtime.lib.equalAttr("label", label));
			/* Change item */
			if (pos >= 0)
			{
				var find_item = item.items.get(pos);
				find_item.label = file.get("file_name");
				find_item.file_path = file.get("file_path");
			}
			else
			{
				item.items.push(new BayLang.Constructor.Frontend.Code.TreeItem(Runtime.Map.from({"kind":file.get("kind"),"label":file.get("file_name"),"file_path":file.get("file_path"),"module_id":item.module_id,"project_id":item.project_id})));
			}
		}
		/* Remove items */
		for (var i = item.items.count() - 1; i >= 0; i--)
		{
			var find_item = item.items.get(i);
			var pos = items.find(Runtime.lib.equalAttr("file_name", find_item.label));
			if (pos == -1)
			{
				item.items.remove(i);
			}
		}
		/* Sort items */
		item.items = item.items.sort((a, b) =>
		{
			if (a.kind == "dir" && b.kind == "file")
			{
				return -1;
			}
			if (a.kind == "file" && b.kind == "dir")
			{
				return 1;
			}
			return Runtime.rs.compare(a.label, b.label);
		});
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Code.CodeEditor";
		this.project_id = "";
		this.copy_past_kind = "";
		this.copy_past_path = "";
		this.confirm_dialog = null;
		this.prompt_dialog = null;
		this.tree = null;
		this.selected_item = null;
		this.selected_tab = null;
		this.selected_path = null;
		this.tabs = Runtime.Vector.from([]);
		this.save_result = null;
		this.context_menu = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Code.CodeEditorModel, Runtime.Web.BasePageModel);
Object.assign(BayLang.Constructor.Frontend.Code.CodeEditorModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Code";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Code.CodeEditorModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BasePageModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Code.CodeEditorModel);
window["BayLang.Constructor.Frontend.Code.CodeEditorModel"] = BayLang.Constructor.Frontend.Code.CodeEditorModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Code.CodeEditorModel;