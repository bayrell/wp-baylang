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
Runtime.Widget.Table.SaveDialogModel = function()
{
	Runtime.Widget.Dialog.ConfirmDialogModel.apply(this, arguments);
};
Runtime.Widget.Table.SaveDialogModel.prototype = Object.create(Runtime.Widget.Dialog.ConfirmDialogModel.prototype);
Runtime.Widget.Table.SaveDialogModel.prototype.constructor = Runtime.Widget.Table.SaveDialogModel;
Object.assign(Runtime.Widget.Table.SaveDialogModel.prototype,
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
		if (params.has("table"))
		{
			this.table = params.get("table");
		}
		if (params.has("add_form"))
		{
			this.add_form = params.get("add_form");
		}
		if (params.has("edit_form"))
		{
			this.edit_form = params.get("edit_form");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.initWidget.call(this, params);
	},
	_init: function()
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype._init.call(this);
		this.action = "";
		this.widget_name = "save_dialog";
		this.component = "Runtime.Widget.Table.SaveDialog";
		this.add_form = null;
		this.edit_form = null;
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.SaveDialogModel, Runtime.Widget.Dialog.ConfirmDialogModel);
Object.assign(Runtime.Widget.Table.SaveDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.SaveDialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.SaveDialogModel);
window["Runtime.Widget.Table.SaveDialogModel"] = Runtime.Widget.Table.SaveDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.SaveDialogModel;