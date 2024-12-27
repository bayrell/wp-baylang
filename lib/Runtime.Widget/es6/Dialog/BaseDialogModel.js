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
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.BaseDialogModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Dialog.BaseDialogModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Dialog.BaseDialogModel.prototype.constructor = Runtime.Widget.Dialog.BaseDialogModel;
Object.assign(Runtime.Widget.Dialog.BaseDialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
	},
	/**
	 * Show dialog
	 */
	show: function()
	{
		this.is_open = true;
		this.emit(new Runtime.Widget.Dialog.DialogMessage(Runtime.Map.from({"name":"show"})));
	},
	/**
	 * Hide dialog
	 */
	hide: function()
	{
		this.is_open = false;
		this.emit(new Runtime.Widget.Dialog.DialogMessage(Runtime.Map.from({"name":"hide"})));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.is_open = false;
		this.modal = true;
		this.component = "";
	},
});
Object.assign(Runtime.Widget.Dialog.BaseDialogModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Dialog.BaseDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.BaseDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.BaseDialogModel);
window["Runtime.Widget.Dialog.BaseDialogModel"] = Runtime.Widget.Dialog.BaseDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.BaseDialogModel;