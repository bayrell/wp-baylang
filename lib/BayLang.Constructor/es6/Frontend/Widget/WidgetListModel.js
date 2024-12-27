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
if (typeof BayLang.Constructor.Frontend.Widget == 'undefined') BayLang.Constructor.Frontend.Widget = {};
BayLang.Constructor.Frontend.Widget.WidgetListModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Widget.WidgetListModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
BayLang.Constructor.Frontend.Widget.WidgetListModel.prototype.constructor = BayLang.Constructor.Frontend.Widget.WidgetListModel;
Object.assign(BayLang.Constructor.Frontend.Widget.WidgetListModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Set route matches */
		this.project_id = this.layout.route.matches.get("project_id");
		/* Modules */
		this.modules = this.addWidget("Runtime.Widget.SelectModel", Runtime.Map.from({"storage":new Runtime.Entity.Factory("Runtime.Widget.Table.TableStorage", Runtime.Map.from({"api_name":"baylang.constructor.module::search"})),"widget_name":"modules","transform":(item) =>
		{
			return Runtime.Map.from({"key":item.get("id"),"value":item.get("id")});
		},"foreign_key":Runtime.Map.from({"project_id":this.project_id})}));
		/* Add table */
		this.table = this.addWidget("Runtime.Widget.Table.TableDialogModel", Runtime.Map.from({"widget_name":"table","get_title":(params) =>
		{
			var action = params.get("action");
			var item = params.get("item");
			if (action == "add")
			{
				return "Add widget";
			}
			if (action == "edit")
			{
				return "Edit widget " + Runtime.rtl.toStr(item.get("id"));
			}
			if (action == "delete")
			{
				return "Delete widget " + Runtime.rtl.toStr(item.get("id"));
			}
			return "";
		},"styles":Runtime.Vector.from(["border"]),"storage":new Runtime.Entity.Factory("Runtime.Widget.Table.TableStorage", Runtime.Map.from({"api_name":"baylang.constructor.widget::search"})),"add_form":new Runtime.Web.ModelFactory("Runtime.Widget.Form.FormModel", Runtime.Map.from({"widget_name":"add_form","primary_key":Runtime.Vector.from(["id"]),"foreign_key":Runtime.Map.from({"project_id":this.project_id}),"storage":new Runtime.Entity.Factory("Runtime.Widget.Form.FormSubmitStorage", Runtime.Map.from({"api_name":"baylang.constructor.widget::save"})),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"module_id","label":"Modules","model":this.modules}),Runtime.Map.from({"name":"id","label":"Name","component":"Runtime.Widget.Input","default":"WidgetModel"})]),"events":Runtime.Map.from({"field_change":new Runtime.Callback(this, "onFormFieldChange")})})),"delete_form":new Runtime.Web.ModelFactory("Runtime.Widget.Form.FormModel", Runtime.Map.from({"widget_name":"delete_form","primary_key":Runtime.Vector.from(["id"]),"foreign_key":Runtime.Map.from({"project_id":this.project_id}),"storage":new Runtime.Entity.Factory("Runtime.Widget.Form.FormDeleteStorage", Runtime.Map.from({"api_name":"baylang.constructor.widget::save"}))})),"foreign_key":Runtime.Map.from({"project_id":this.project_id,"module_id":this.module_id}),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"row_number"}),Runtime.Map.from({"name":"id","label":"Widget name","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"row_buttons","model":new Runtime.Web.ModelFactory("Runtime.Widget.Table.TableRowButtonsModel", Runtime.Map.from({"edit":false,"buttons":Runtime.Vector.from([Runtime.Map.from({"widget_name":"edit_button","dest":"delete_button","kind":"before","href":(data) =>
		{
			var item = data.get("item");
			return this.layout.url("baylang:project:widget:edit", Runtime.Map.from({"project_id":this.project_id,"module_id":this.module_id,"widget_name":item.get("id")}));
		},"content":"Edit","styles":Runtime.Vector.from(["default","small"])})]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onRowButtonClick")})}))})])}));
		/* Add top buttons */
		this.top_buttons = this.addWidget("Runtime.Widget.RowButtonsModel", Runtime.Map.from({"widget_name":"top_buttons","buttons":Runtime.Vector.from([new Runtime.Web.ModelFactory("Runtime.Widget.Table.AddButtonModel", Runtime.Map.from({"table":this.table}))])}));
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Widgets");
	},
	/**
	 * Table row button click
	 */
	onRowButtonClick: function(message)
	{
		var button = message.widget;
		if (button.widget_name != "delete_button")
		{
			return ;
		}
		/* Set delete form foreign key */
		var module_id = message.data.get("item").get("module_id");
		this.table.delete_form.foreign_key.set("module_id", module_id);
	},
	/**
	 * Form field change
	 */
	onFormFieldChange: function(message)
	{
		var field_name = message.field_name;
		var old_value = message.old_value;
		var value = message.value;
		if (field_name != "module_id")
		{
			return ;
		}
		/* Get form */
		var form = message.widget;
		var widget_id = form.item.get("id");
		/* Set foreign key */
		form.foreign_key.set("module_id", value);
		/* Set widget name */
		if (Runtime.rs.indexOf(widget_id, old_value) == 0)
		{
			widget_id = Runtime.rs.substr(widget_id, Runtime.rs.strlen(old_value));
		}
		if (value != "" && Runtime.rs.indexOf(widget_id, value) == 0)
		{
			return ;
		}
		if (Runtime.rs.substr(widget_id, 0, 1) == ".")
		{
			widget_id = Runtime.rs.substr(widget_id, 1);
		}
		if (Runtime.rs.substr(widget_id, 0, 11) == "Components.")
		{
			widget_id = Runtime.rs.substr(widget_id, 11);
		}
		if (value != "")
		{
			widget_id = value + Runtime.rtl.toStr(".Components.") + Runtime.rtl.toStr(widget_id);
		}
		form.item.set("id", widget_id);
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Widget.WidgetList";
		this.project_id = "";
		this.module_id = "";
		this.modules = null;
		this.table = null;
		this.top_buttons = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Widget.WidgetListModel, Runtime.Web.BasePageModel);
Object.assign(BayLang.Constructor.Frontend.Widget.WidgetListModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Widget";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Widget.WidgetListModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Widget.WidgetListModel);
window["BayLang.Constructor.Frontend.Widget.WidgetListModel"] = BayLang.Constructor.Frontend.Widget.WidgetListModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Widget.WidgetListModel;