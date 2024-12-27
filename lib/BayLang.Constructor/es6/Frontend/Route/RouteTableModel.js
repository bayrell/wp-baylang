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
if (typeof BayLang.Constructor.Frontend.Route == 'undefined') BayLang.Constructor.Frontend.Route = {};
BayLang.Constructor.Frontend.Route.RouteTableModel = function()
{
	Runtime.Widget.Table.TableDialogModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Route.RouteTableModel.prototype = Object.create(Runtime.Widget.Table.TableDialogModel.prototype);
BayLang.Constructor.Frontend.Route.RouteTableModel.prototype.constructor = BayLang.Constructor.Frontend.Route.RouteTableModel;
Object.assign(BayLang.Constructor.Frontend.Route.RouteTableModel.prototype,
{
	/**
	 * Create data storage
	 */
	createDataStorage: function()
	{
		return new Runtime.Widget.Crud.CrudApiStorage(Runtime.Map.from({"layout":this.layout,"class_name":"admin.constructor.route","primary_keys":Runtime.Vector.from(["id"])}));
	},
	/**
	 * Create form
	 */
	createForm: function()
	{
		return this.addWidget("BayLang.Constructor.Frontend.Route.RouteFormModel");
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Table.TableDialogModel.prototype.initWidget.call(this, params);
		/* Row number */
		this.addField(Runtime.Map.from({"name":"row_number"}));
		/* Field name */
		this.addField(Runtime.Map.from({"name":"name","label":"Name","component":"Runtime.Widget.Label"}));
		/* Field url */
		this.addField(Runtime.Map.from({"name":"url","label":"URL","component":"Runtime.Widget.Label"}));
		/* Field url */
		this.addField(Runtime.Map.from({"name":"model","label":"Model","component":"Runtime.Widget.Label"}));
		/* Field row buttons */
		this.addField(Runtime.Map.from({"name":"row_buttons","model":this.row_buttons}));
		/* Open button */
		var open_button = this.row_buttons.addWidget("Runtime.Widget.ButtonModel", Runtime.Map.from({"widget_name":"open_button","content":"Open","href":(data) =>
		{
			var row_number = data.get("row_number");
			var item = this.getItemByRowNumber(row_number);
			var url = this.layout.url("baylang:project:open", Runtime.Map.from({"project_id":this.storage.foreign_value}));
			return url + Runtime.rtl.toStr(item.get("url"));
		}}), "edit_button", "before");
		this.row_buttons.removeItemByName("edit_button");
		this.row_buttons.removeItemByName("delete_button");
		/* Add style */
		this.styles.add("border");
		this.row_buttons.styles.add("no-gap");
	},
});
Object.assign(BayLang.Constructor.Frontend.Route.RouteTableModel, Runtime.Widget.Table.TableDialogModel);
Object.assign(BayLang.Constructor.Frontend.Route.RouteTableModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Route";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Route.RouteTableModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Table.TableDialogModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Route.RouteTableModel);
window["BayLang.Constructor.Frontend.Route.RouteTableModel"] = BayLang.Constructor.Frontend.Route.RouteTableModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Route.RouteTableModel;