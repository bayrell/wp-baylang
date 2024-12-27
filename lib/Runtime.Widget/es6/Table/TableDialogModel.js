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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableDialogModel = function()
{
	Runtime.Widget.Table.TableModel.apply(this, arguments);
};
Runtime.Widget.Table.TableDialogModel.prototype = Object.create(Runtime.Widget.Table.TableModel.prototype);
Runtime.Widget.Table.TableDialogModel.prototype.constructor = Runtime.Widget.Table.TableDialogModel;
Object.assign(Runtime.Widget.Table.TableDialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Table.TableModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("get_title"))
		{
			this.get_title = params.get("get_title");
		}
		/* Form */
		if (params.has("add_form"))
		{
			this.add_form = this.createModel(params.get("add_form"));
		}
		if (params.has("edit_form"))
		{
			this.edit_form = this.createModel(params.get("edit_form"));
		}
		if (params.has("delete_form"))
		{
			this.delete_form = this.createModel(params.get("delete_form"));
		}
		/* Setup dialog */
		if (params.has("save_dialog"))
		{
			this.save_dialog = this.createModel(params.get("save_dialog"));
		}
		if (params.has("delete_dialog"))
		{
			this.delete_dialog = this.createModel(params.get("delete_dialog"));
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Table.TableModel.prototype.initWidget.call(this, params);
		/* Add events */
		if (this.add_form)
		{
			this.add_form.addListener("submit", new Runtime.Callback(this, "onFormSubmit"));
		}
		if (this.edit_form && this.add_form != this.edit_form)
		{
			this.edit_form.addListener("submit", new Runtime.Callback(this, "onFormSubmit"));
		}
		if (this.delete_form)
		{
			this.delete_form.addListener("submit", new Runtime.Callback(this, "onFormSubmit"));
		}
		/* Hide form result */
		if (this.add_form)
		{
			this.add_form.show_result = false;
		}
		if (this.edit_form)
		{
			this.edit_form.show_result = false;
		}
		if (this.delete_form)
		{
			this.delete_form.show_result = false;
		}
		/* Create save wiget */
		if (this.add_form || this.edit_form)
		{
			this.save_dialog = this.addWidget("Runtime.Widget.Table.SaveDialogModel", Runtime.Map.from({"add_form":this.add_form,"edit_form":this.edit_form,"table":this,"widget_name":"save_dialog"}));
			this.save_dialog.addListener("confirm", new Runtime.Callback(this, "onConfirmSaveClick"), -999);
		}
		/* Create delete widget */
		if (this.delete_form)
		{
			this.delete_dialog = this.addWidget("Runtime.Widget.Table.DeleteDialogModel", Runtime.Map.from({"form":this.delete_form,"table":this,"widget_name":"delete_dialog"}));
			this.delete_dialog.addListener("confirm", new Runtime.Callback(this, "onConfirmDeleteClick"), -999);
		}
		/* Add dialogs */
		if (this.save_dialog)
		{
			this.render_list.addItem(this.save_dialog);
		}
		if (this.delete_dialog)
		{
			this.render_list.addItem(this.delete_dialog);
		}
	},
	/**
	 * Returns title
	 */
	getTitle: function(params)
	{
		if (this.get_title)
		{
			return Runtime.rtl.apply(this.get_title, Runtime.Vector.from([params]));
		}
		return "";
	},
	/**
	 * Row button click
	 */
	onRowButtonClick: function(message)
	{
		var data = message.data;
		var button_name = message.widget.widget_name;
		if (button_name == "edit_button")
		{
			this.showEdit(data);
		}
		else if (button_name == "delete_button")
		{
			this.showDelete(data);
		}
		Runtime.Widget.Table.TableModel.prototype.onRowButtonClick.call(this, message);
	},
	/**
	 * Show add
	 */
	showAdd: function()
	{
		if (!this.add_form)
		{
			return ;
		}
		this.add_form.clear();
		/* Change confirm button */
		var confirm_button = this.save_dialog.buttons.getWidget("confirm_button");
		confirm_button.content = "Add";
		confirm_button.styles = Runtime.Vector.from(["success"]);
		/* Show dialog */
		this.save_dialog.action = "add";
		this.save_dialog.title = this.getTitle(Runtime.Map.from({"action":"add"}));
		this.save_dialog.show();
	},
	/**
	 * Show edit
	 */
	showEdit: function(data)
	{
		if (!this.edit_form)
		{
			return ;
		}
		var item = Runtime.Serializer.copy(data.get("item"));
		this.edit_form.clear();
		this.edit_form.setItem(item);
		this.edit_form.setRowNumber(data.get("row_number"));
		/* Change confirm button */
		var confirm_button = this.save_dialog.buttons.getWidget("confirm_button");
		confirm_button.content = "Save";
		confirm_button.styles = Runtime.Vector.from(["success"]);
		/* Show dialog */
		this.save_dialog.action = "edit";
		this.save_dialog.title = this.getTitle(Runtime.Map.from({"action":"edit","item":item}));
		this.save_dialog.show();
	},
	/**
	 * Show delete
	 */
	showDelete: function(data)
	{
		var item = Runtime.Serializer.copy(data.get("item"));
		this.delete_form.clear();
		this.delete_form.setItem(item);
		this.delete_form.setRowNumber(data.get("row_number"));
		/* Show dialog */
		this.delete_dialog.title = this.getTitle(Runtime.Map.from({"action":"delete","item":item}));
		this.delete_dialog.show();
	},
	/**
	 * Confirm event
	 */
	onConfirmSaveClick: async function(message)
	{
		var res;
		/* Get form */
		var form = null;
		if (this.save_dialog.action == "add")
		{
			form = this.add_form;
		}
		else if (this.save_dialog.action == "edit")
		{
			form = this.edit_form;
		}
		if (!form)
		{
			return Promise.resolve();
		}
		/* Submit form */
		res = await form.submit();
		/* Check response is exists */
		if (!res)
		{
			form.result.setError("Response does not exists");
			throw new Runtime.Widget.Dialog.DialogModelException("Response does not exists")
		}
		/* Error message */
		if (!res.isSuccess())
		{
			throw new Runtime.Widget.Dialog.DialogModelException(res.message)
		}
		/* Reload table */
		this.reload();
	},
	/**
	 * Confirm event
	 */
	onConfirmDeleteClick: async function(message)
	{
		var res = await this.delete_form.submit();
		/* Error message */
		if (!res.isSuccess())
		{
			throw new Runtime.Widget.Dialog.DialogModelException(res.message)
		}
		/* Reload table */
		this.reload();
	},
	_init: function()
	{
		Runtime.Widget.Table.TableModel.prototype._init.call(this);
		this.add_form = null;
		this.edit_form = null;
		this.delete_form = null;
		this.save_dialog = null;
		this.delete_dialog = null;
		this.get_title = null;
	},
});
Object.assign(Runtime.Widget.Table.TableDialogModel, Runtime.Widget.Table.TableModel);
Object.assign(Runtime.Widget.Table.TableDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Table.TableModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.TableDialogModel);
window["Runtime.Widget.Table.TableDialogModel"] = Runtime.Widget.Table.TableDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableDialogModel;