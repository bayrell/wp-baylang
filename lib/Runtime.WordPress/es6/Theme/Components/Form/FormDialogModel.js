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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Components == 'undefined') Runtime.WordPress.Theme.Components = {};
if (typeof Runtime.WordPress.Theme.Components.Form == 'undefined') Runtime.WordPress.Theme.Components.Form = {};
Runtime.WordPress.Theme.Components.Form.FormDialogModel = function()
{
	Runtime.Widget.Dialog.DialogModel.apply(this, arguments);
};
Runtime.WordPress.Theme.Components.Form.FormDialogModel.prototype = Object.create(Runtime.Widget.Dialog.DialogModel.prototype);
Runtime.WordPress.Theme.Components.Form.FormDialogModel.prototype.constructor = Runtime.WordPress.Theme.Components.Form.FormDialogModel;
Object.assign(Runtime.WordPress.Theme.Components.Form.FormDialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Dialog.DialogModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("form"))
		{
			this.form = params.get("form");
		}
		if (params.has("form_settings"))
		{
			this.form_settings = params.get("form_settings");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.DialogModel.prototype.initWidget.call(this, params);
		/* Add form */
		if (!this.form)
		{
			this.form = this.addWidget("Runtime.WordPress.Theme.Components.Form.FormModel", this.form_settings.concat(Runtime.Map.from({"widget_name":"form"})));
		}
	},
	_init: function()
	{
		Runtime.Widget.Dialog.DialogModel.prototype._init.call(this);
		this.component = "Runtime.WordPress.Theme.Components.Form.FormDialog";
		this.widget_name = "form_dialog";
		this.form = null;
		this.form_settings = Runtime.Map.from({});
	},
});
Object.assign(Runtime.WordPress.Theme.Components.Form.FormDialogModel, Runtime.Widget.Dialog.DialogModel);
Object.assign(Runtime.WordPress.Theme.Components.Form.FormDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Components.Form";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Components.Form.FormDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Components.Form.FormDialogModel);
window["Runtime.WordPress.Theme.Components.Form.FormDialogModel"] = Runtime.WordPress.Theme.Components.Form.FormDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Components.Form.FormDialogModel;