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
Runtime.Widget.Dialog.DialogModel = function()
{
	Runtime.Widget.Dialog.BaseDialogModel.apply(this, arguments);
};
Runtime.Widget.Dialog.DialogModel.prototype = Object.create(Runtime.Widget.Dialog.BaseDialogModel.prototype);
Runtime.Widget.Dialog.DialogModel.prototype.constructor = Runtime.Widget.Dialog.DialogModel;
Object.assign(Runtime.Widget.Dialog.DialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Dialog.BaseDialogModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("content"))
		{
			this.content = params.get("content");
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
		if (params.has("title"))
		{
			this.title = params.get("title");
		}
		if (params.has("width"))
		{
			this.width = params.get("width");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.BaseDialogModel.prototype.initWidget.call(this, params);
		/* Add button */
		this.buttons = this.addWidget("Runtime.Widget.RowButtonsModel", Runtime.Map.from({"widget_name":"buttons","styles":Runtime.Vector.from(["@widget_dialog__buttons","align-end"])}));
		/* Add result */
		this.result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"styles":Runtime.Vector.from(["margin_top"])}));
	},
	/**
	 * Show dialog
	 */
	show: function()
	{
		this.result.clear();
		Runtime.Widget.Dialog.BaseDialogModel.prototype.show.call(this);
	},
	/**
	 * Set title
	 */
	setTitle: function(title)
	{
		this.title = title;
	},
	/**
	 * Set width
	 */
	setWidth: function(value)
	{
		this.width = value;
	},
	_init: function()
	{
		Runtime.Widget.Dialog.BaseDialogModel.prototype._init.call(this);
		this.action = "";
		this.title = "";
		this.content = "";
		this.width = "";
		this.component = "Runtime.Widget.Dialog.Dialog";
		this.data = Runtime.Map.from({});
		this.styles = Runtime.Vector.from([]);
		this.buttons = null;
		this.result = null;
	},
});
Object.assign(Runtime.Widget.Dialog.DialogModel, Runtime.Widget.Dialog.BaseDialogModel);
Object.assign(Runtime.Widget.Dialog.DialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.BaseDialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.DialogModel);
window["Runtime.Widget.Dialog.DialogModel"] = Runtime.Widget.Dialog.DialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.DialogModel;