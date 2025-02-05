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
if (typeof BayLang.Constructor.Frontend.Fonts == 'undefined') BayLang.Constructor.Frontend.Fonts = {};
BayLang.Constructor.Frontend.Fonts.FontPageModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Fonts.FontPageModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
BayLang.Constructor.Frontend.Fonts.FontPageModel.prototype.constructor = BayLang.Constructor.Frontend.Fonts.FontPageModel;
Object.assign(BayLang.Constructor.Frontend.Fonts.FontPageModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Set route matches */
		this.project_id = this.layout.route.matches.get("project_id");
		/* Add table */
		this.table = this.addWidget("Runtime.Widget.Table.TableDialogModel", Runtime.Map.from({"widget_name":"table","get_title":(params) =>
		{
			var action = params.get("action");
			var item = params.get("item");
			if (action == "add")
			{
				return "Add font";
			}
			if (action == "edit")
			{
				return "Edit font " + Runtime.rtl.toStr(item.get("name"));
			}
			if (action == "delete")
			{
				return "Delete font " + Runtime.rtl.toStr(item.get("name"));
			}
			return "";
		},"styles":Runtime.Vector.from(["border"]),"storage":new Runtime.Entity.Factory("Runtime.Widget.Table.TableStorage", Runtime.Map.from({"api_name":"baylang.constructor.fonts.search"})),"add_form":new Runtime.Web.ModelFactory("Runtime.Widget.Form.FormModel", Runtime.Map.from({"widget_name":"add_form","primary_key":Runtime.Vector.from(["name"]),"foreign_key":Runtime.Map.from({"project_id":this.project_id}),"storage":new Runtime.Entity.Factory("Runtime.Widget.Form.FormSubmitStorage", Runtime.Map.from({"api_name":"baylang.constructor.fonts.save"})),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"name","label":"Name","component":"Runtime.Widget.Input"})])})),"delete_form":new Runtime.Web.ModelFactory("Runtime.Widget.Form.FormModel", Runtime.Map.from({"widget_name":"delete_form","primary_key":Runtime.Vector.from(["name"]),"foreign_key":Runtime.Map.from({"project_id":this.project_id}),"storage":new Runtime.Entity.Factory("Runtime.Widget.Form.FormDeleteStorage", Runtime.Map.from({"api_name":"baylang.constructor.fonts.save"}))})),"foreign_key":Runtime.Map.from({"project_id":this.project_id}),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"row_number"}),Runtime.Map.from({"name":"name","label":"Font name","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"row_buttons","model":new Runtime.Web.ModelFactory("Runtime.Widget.Table.TableRowButtonsModel", Runtime.Map.from({"edit":false,"buttons":Runtime.Vector.from([Runtime.Map.from({"widget_name":"edit_button","dest":"delete_button","kind":"before","href":(data) =>
		{
			var item = data.get("item");
			return this.layout.url("baylang:project:fonts:edit", Runtime.Map.from({"project_id":this.project_id,"name":item.get("name")}));
		},"content":"Edit","styles":Runtime.Vector.from(["default","small"])})])}))})])}));
		/* Add top buttons */
		this.top_buttons = this.addWidget("Runtime.Widget.RowButtonsModel", Runtime.Map.from({"widget_name":"top_buttons","buttons":Runtime.Vector.from([new Runtime.Web.ModelFactory("Runtime.Widget.Table.AddButtonModel", Runtime.Map.from({"table":this.table}))])}));
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Fonts");
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Fonts.FontPage";
		this.project_id = "";
		this.table = null;
		this.top_buttons = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Fonts.FontPageModel, Runtime.Web.BasePageModel);
Object.assign(BayLang.Constructor.Frontend.Fonts.FontPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Fonts";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Fonts.FontPageModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BasePageModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Fonts.FontPageModel);
window["BayLang.Constructor.Frontend.Fonts.FontPageModel"] = BayLang.Constructor.Frontend.Fonts.FontPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Fonts.FontPageModel;