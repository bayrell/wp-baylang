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
if (typeof BayLang.Constructor.Frontend.Module == 'undefined') BayLang.Constructor.Frontend.Module = {};
BayLang.Constructor.Frontend.Module.ModuleListModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Module.ModuleListModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
BayLang.Constructor.Frontend.Module.ModuleListModel.prototype.constructor = BayLang.Constructor.Frontend.Module.ModuleListModel;
Object.assign(BayLang.Constructor.Frontend.Module.ModuleListModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Project id */
		this.project_id = this.layout.route.matches.get("project_id");
		/* Add table */
		this.table = this.addWidget("Runtime.Widget.Table.TableModel", Runtime.Map.from({"widget_name":"table","get_title":(params) =>
		{
			var action = params.get("action");
			var item = params.get("item");
			if (action == "add")
			{
				return "Add module";
			}
			if (action == "edit")
			{
				return "Edit module " + Runtime.rtl.toStr(item.get("id"));
			}
			if (action == "delete")
			{
				return "Delete module " + Runtime.rtl.toStr(item.get("id"));
			}
			return "";
		},"styles":Runtime.Vector.from(["border"]),"storage":new Runtime.Entity.Factory("Runtime.Widget.Table.TableStorage", Runtime.Map.from({"api_name":"baylang.constructor.module::search"})),"foreign_key":Runtime.Map.from({"project_id":this.project_id}),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"row_number"}),Runtime.Map.from({"name":"id","label":"ID","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"row_buttons","model":new Runtime.Web.ModelFactory("Runtime.Widget.RowButtonsModel", Runtime.Map.from({"buttons":Runtime.Vector.from([Runtime.Map.from({"widget_name":"open","content":"Open","href":(data) =>
		{
			var item = data.get("item");
			return this.layout.url("baylang:project:widgets", Runtime.Map.from({"project_id":this.project_id,"module_id":item.get("id")}));
		},"styles":Runtime.Vector.from(["default","small"])})])}))})])}));
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Modules");
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Module.ModuleList";
		this.project_id = "";
	},
});
Object.assign(BayLang.Constructor.Frontend.Module.ModuleListModel, Runtime.Web.BasePageModel);
Object.assign(BayLang.Constructor.Frontend.Module.ModuleListModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Module";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Module.ModuleListModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Module.ModuleListModel);
window["BayLang.Constructor.Frontend.Module.ModuleListModel"] = BayLang.Constructor.Frontend.Module.ModuleListModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Module.ModuleListModel;