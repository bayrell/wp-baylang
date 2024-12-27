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
BayLang.Constructor.Frontend.Route.RouteFormModel = function()
{
	Runtime.Widget.Form.FormModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Route.RouteFormModel.prototype = Object.create(Runtime.Widget.Form.FormModel.prototype);
BayLang.Constructor.Frontend.Route.RouteFormModel.prototype.constructor = BayLang.Constructor.Frontend.Route.RouteFormModel;
Object.assign(BayLang.Constructor.Frontend.Route.RouteFormModel.prototype,
{
	/**
	 * Create data storage
	 */
	createDataStorage: function()
	{
		return new Runtime.Widget.Crud.CrudApiStorage(Runtime.Map.from({"layout":this.layout,"class_name":"admin.constructor.route","primary_keys":Runtime.Vector.from(["id"]),"save_fields":Runtime.Vector.from(["id","name","description"])}));
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Form.FormModel.prototype.initWidget.call(this, params);
		/* Field name */
		this.addField(Runtime.Map.from({"name":"name","label":"Name","component":"Runtime.Widget.Input"}));
		/* Field url */
		this.addField(Runtime.Map.from({"name":"uri","label":"URL","component":"Runtime.Widget.Input"}));
		/* Field url */
		this.addField(Runtime.Map.from({"name":"model","label":"Model","component":"Runtime.Widget.Input"}));
	},
	/**
	 * Get page title
	 */
	getPageTitle: function(action)
	{
		if (action == undefined) action = "";
		if (action == "add")
		{
			return "Add route";
		}
		if (action == "edit")
		{
			return "Edit route " + Runtime.rtl.toStr(this.storage.item.get("name"));
		}
		if (action == "delete")
		{
			return "Delete route " + Runtime.rtl.toStr(this.storage.item.get("name"));
		}
		return "";
	},
});
Object.assign(BayLang.Constructor.Frontend.Route.RouteFormModel, Runtime.Widget.Form.FormModel);
Object.assign(BayLang.Constructor.Frontend.Route.RouteFormModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Route";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Route.RouteFormModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.FormModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Route.RouteFormModel);
window["BayLang.Constructor.Frontend.Route.RouteFormModel"] = BayLang.Constructor.Frontend.Route.RouteFormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Route.RouteFormModel;