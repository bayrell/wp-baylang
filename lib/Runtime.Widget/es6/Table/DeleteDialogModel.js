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
Runtime.Widget.Table.DeleteDialogModel = function()
{
	Runtime.Widget.Dialog.ConfirmDialogModel.apply(this, arguments);
};
Runtime.Widget.Table.DeleteDialogModel.prototype = Object.create(Runtime.Widget.Dialog.ConfirmDialogModel.prototype);
Runtime.Widget.Table.DeleteDialogModel.prototype.constructor = Runtime.Widget.Table.DeleteDialogModel;
Object.assign(Runtime.Widget.Table.DeleteDialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("form"))
		{
			this.form = params.get("form");
		}
		if (params.has("table"))
		{
			this.table = params.get("table");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.initWidget.call(this, params);
		/* Change confirm button */
		var confirm_button = this.buttons.getWidget("confirm_button");
		confirm_button.content = "Delete";
		confirm_button.styles = Runtime.Vector.from(["danger"]);
	},
	_init: function()
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype._init.call(this);
		this.widget_name = "delete_dialog";
		this.component = "Runtime.Widget.Table.DeleteDialog";
		this.form = null;
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.DeleteDialogModel, Runtime.Widget.Dialog.ConfirmDialogModel);
Object.assign(Runtime.Widget.Table.DeleteDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.DeleteDialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.DeleteDialogModel);
window["Runtime.Widget.Table.DeleteDialogModel"] = Runtime.Widget.Table.DeleteDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.DeleteDialogModel;