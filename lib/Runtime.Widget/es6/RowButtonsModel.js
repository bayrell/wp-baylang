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
Runtime.Widget.RowButtonsModel = function()
{
	Runtime.Widget.RenderListModel.apply(this, arguments);
};
Runtime.Widget.RowButtonsModel.prototype = Object.create(Runtime.Widget.RenderListModel.prototype);
Runtime.Widget.RowButtonsModel.prototype.constructor = Runtime.Widget.RowButtonsModel;
Object.assign(Runtime.Widget.RowButtonsModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.RenderListModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.RenderListModel.prototype.initWidget.call(this, params);
		/* Setup buttons */
		if (params.has("buttons"))
		{
			this.buttons = Runtime.Vector.from([]);
			this.addButtons(params.get("buttons"));
		}
	},
	/**
	 * Add button
	 */
	addButton: function(button)
	{
		/* Create button model */
		var model = this.createModel(button, "Runtime.Widget.ButtonModel");
		/* Settings */
		var dest = "";
		var kind = "after";
		if (button instanceof Runtime.Dict)
		{
			dest = button.get("dest", "");
			kind = button.get("kind", "after");
		}
		/* Add button */
		this.addItem(model, dest, kind);
		/* Add listener */
		model.addListener("click", new Runtime.Callback(this, "onButtonClick"));
		/* Return model */
		return model;
	},
	/**
	 * Add buttons
	 */
	addButtons: function(buttons)
	{
		for (var i = 0; i < buttons.count(); i++)
		{
			this.addButton(buttons.get(i));
		}
	},
	/**
	 * Buttons click
	 */
	onButtonClick: function(message)
	{
		this.emit(message);
	},
	_init: function()
	{
		Runtime.Widget.RenderListModel.prototype._init.call(this);
		this.buttons = Runtime.Vector.from([]);
		this.styles = Runtime.Vector.from([]);
		this.component = "Runtime.Widget.RowButtons";
	},
});
Object.assign(Runtime.Widget.RowButtonsModel, Runtime.Widget.RenderListModel);
Object.assign(Runtime.Widget.RowButtonsModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.RowButtonsModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.RenderListModel";
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
Runtime.rtl.defClass(Runtime.Widget.RowButtonsModel);
window["Runtime.Widget.RowButtonsModel"] = Runtime.Widget.RowButtonsModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.RowButtonsModel;