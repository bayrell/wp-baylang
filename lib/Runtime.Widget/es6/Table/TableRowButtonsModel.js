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
Runtime.Widget.Table.TableRowButtonsModel = function()
{
	Runtime.Widget.RowButtonsModel.apply(this, arguments);
};
Runtime.Widget.Table.TableRowButtonsModel.prototype = Object.create(Runtime.Widget.RowButtonsModel.prototype);
Runtime.Widget.Table.TableRowButtonsModel.prototype.constructor = Runtime.Widget.Table.TableRowButtonsModel;
Object.assign(Runtime.Widget.Table.TableRowButtonsModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		var show_edit = true;
		var show_delete = true;
		if (params.has("edit"))
		{
			show_edit = params.get("edit");
		}
		if (params.has("delete"))
		{
			show_delete = params.get("delete");
		}
		/* Edit button */
		if (show_edit)
		{
			this.addButton(Runtime.Map.from({"content":"Edit","widget_name":"edit_button","styles":Runtime.Vector.from(["default","small"])}));
		}
		/* Delete button */
		if (show_delete)
		{
			this.addButton(Runtime.Map.from({"content":"Delete","widget_name":"delete_button","styles":Runtime.Vector.from(["danger","small"])}));
		}
		Runtime.Widget.RowButtonsModel.prototype.initWidget.call(this, params);
	},
	/**
	 * Buttons click
	 */
	onButtonClick: function(message)
	{
		this.emit(message);
		this.parent_widget.onRowButtonClick(message);
	},
	_init: function()
	{
		Runtime.Widget.RowButtonsModel.prototype._init.call(this);
		this.widget_name = "row_buttons";
	},
});
Object.assign(Runtime.Widget.Table.TableRowButtonsModel, Runtime.Widget.RowButtonsModel);
Object.assign(Runtime.Widget.Table.TableRowButtonsModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableRowButtonsModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.RowButtonsModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.TableRowButtonsModel);
window["Runtime.Widget.Table.TableRowButtonsModel"] = Runtime.Widget.Table.TableRowButtonsModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableRowButtonsModel;