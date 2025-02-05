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
if (typeof Runtime.WordPress.Theme.Components.Button == 'undefined') Runtime.WordPress.Theme.Components.Button = {};
Runtime.WordPress.Theme.Components.Button.ButtonFormModel = function()
{
	Runtime.Widget.ButtonModel.apply(this, arguments);
};
Runtime.WordPress.Theme.Components.Button.ButtonFormModel.prototype = Object.create(Runtime.Widget.ButtonModel.prototype);
Runtime.WordPress.Theme.Components.Button.ButtonFormModel.prototype.constructor = Runtime.WordPress.Theme.Components.Button.ButtonFormModel;
Object.assign(Runtime.WordPress.Theme.Components.Button.ButtonFormModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.ButtonModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("dialog_settings"))
		{
			this.dialog_settings = params.get("dialog_settings");
		}
		if (params.has("form_settings"))
		{
			this.form_settings = params.get("form_settings");
		}
	},
	/**
	 * Init widget params
	 */
	initWidget: function(params)
	{
		Runtime.Widget.ButtonModel.prototype.initWidget.call(this, params);
		/* Add form */
		this.form = this.addWidget("Runtime.WordPress.Theme.Components.Form.FormModel", this.form_settings.concat(Runtime.Map.from({"widget_name":"form"})));
		/* Add dialog */
		this.dialog = this.addWidget("Runtime.WordPress.Theme.Components.Form.FormDialogModel", this.dialog_settings.concat(Runtime.Map.from({"widget_name":"dialog","form":this.form})));
		/* Set form title */
		this.form.form_title = this.dialog.title;
	},
	/**
	 * Set title
	 */
	setTitle: function(title)
	{
		this.dialog.title = title;
		this.form.form_title = title;
	},
	/**
	 * On click
	 */
	onClick: function(data)
	{
		if (data == undefined) data = null;
		this.dialog.show();
		Runtime.Widget.ButtonModel.prototype.onClick.call(this, data);
	},
	_init: function()
	{
		Runtime.Widget.ButtonModel.prototype._init.call(this);
		this.dialog = null;
		this.form = null;
		this.dialog_settings = Runtime.Map.from({});
		this.form_settings = Runtime.Map.from({});
	},
});
Object.assign(Runtime.WordPress.Theme.Components.Button.ButtonFormModel, Runtime.Widget.ButtonModel);
Object.assign(Runtime.WordPress.Theme.Components.Button.ButtonFormModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Components.Button";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Components.Button.ButtonFormModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.ButtonModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Components.Button.ButtonFormModel);
window["Runtime.WordPress.Theme.Components.Button.ButtonFormModel"] = Runtime.WordPress.Theme.Components.Button.ButtonFormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Components.Button.ButtonFormModel;