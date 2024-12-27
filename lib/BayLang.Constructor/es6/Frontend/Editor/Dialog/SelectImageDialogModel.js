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
if (typeof BayLang.Constructor.Frontend.Editor == 'undefined') BayLang.Constructor.Frontend.Editor = {};
if (typeof BayLang.Constructor.Frontend.Editor.Dialog == 'undefined') BayLang.Constructor.Frontend.Editor.Dialog = {};
BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel = function()
{
	Runtime.Widget.Dialog.ConfirmDialogModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel.prototype = Object.create(Runtime.Widget.Dialog.ConfirmDialogModel.prototype);
BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel.prototype.constructor = BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel;
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.initWidget.call(this, params);
		/* Clear button */
		this.buttons.addButton(Runtime.Map.from({"content":"Clear","widget_name":"clear_button","dest":"cancel_button","kind":"before","styles":Runtime.Vector.from(["danger"]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onConfirmButtonClick")})}));
		/* Create ContextMenu */
		this.context_menu = this.addWidget("Runtime.Widget.ContextMenu.ContextMenuModel");
		this.context_menu.addItem(Runtime.Map.from({"label":"Delete","key":"delete"}));
		this.context_menu.addListener("clickItem", new Runtime.Callback(this, "onContextClickItem"));
		/* Select button */
		var confirm_button = this.buttons.getWidget("confirm_button");
		confirm_button.content = "Select";
	},
	/**
	 * Upload file
	 */
	uploadFile: async function(file)
	{
		var result = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.assets","method_name":"uploadFile","data":Runtime.Map.from({"project_id":this.parent_widget.project_id,"path":"images","file":file})}));
		if (result.isSuccess())
		{
			await this.loadItems();
		}
	},
	/**
	 * Load items
	 */
	loadItems: async function()
	{
		var result = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.assets","method_name":"getFiles","data":Runtime.Map.from({"project_id":this.parent_widget.project_id,"path":"images"})}));
		if (result.isSuccess())
		{
			this.items = result.data.get("items");
			this.path = result.data.get("path");
		}
	},
	/**
	 * Load data
	 */
	loadData: async function(container)
	{
		await this.loadItems();
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.loadData.call(this, container);
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "items", data);
		serializer.process(this, "path", data);
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Context menu click
	 */
	onContextClickItem: function(message)
	{
		var item = message.item;
		var item_key = item.get("key");
		this.context_menu.hide();
		/* Delete item */
		if (item_key == "delete")
		{
			this.removeSelectedItem();
		}
	},
	/**
	 * Clear button click
	 */
	onConfirmButtonClick: function(message)
	{
		if (message.widget.widget_name == "confirm_button")
		{
			if (this.selected == -1)
			{
				return ;
			}
		}
		else if (message.widget.widget_name == "clear_button")
		{
			this.value = "";
			this.selected = -1;
		}
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.onConfirmButtonClick.call(this, message);
	},
	/**
	 * Select item
	 */
	selectItem: function(i)
	{
		this.selected = i;
	},
	/**
	 * Context menu
	 */
	contextMenu: function(x, y)
	{
		this.context_menu.show(x, y);
	},
	/**
	 * Returns selected item
	 */
	getSelectedItem: function()
	{
		return this.items.get(this.selected);
	},
	/**
	 * Remove selected item
	 */
	removeSelectedItem: async function()
	{
		var item = this.getSelectedItem();
		var result = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.assets","method_name":"removeFile","data":Runtime.Map.from({"project_id":this.parent_widget.project_id,"path":"images","file_name":item.get("file_name")})}));
		if (result.isSuccess())
		{
			this.items.remove(this.selected);
			this.selectItem(-1);
		}
	},
	/**
	 * Show dialog
	 */
	show: function()
	{
		this.selected = -1;
		this.loadItems();
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.show.call(this);
	},
	_init: function()
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog";
		this.title = "Select image";
		this.width = "90%";
		this.path = "";
		this.selected = -1;
		this.items = Runtime.Vector.from([]);
		this.context_menu = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel, Runtime.Widget.Dialog.ConfirmDialogModel);
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.ConfirmDialogModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel);
window["BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel"] = BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel;