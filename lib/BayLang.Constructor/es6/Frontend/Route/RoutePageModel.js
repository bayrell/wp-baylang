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
BayLang.Constructor.Frontend.Route.RoutePageModel = function()
{
	Runtime.Widget.Crud.CrudPageModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Route.RoutePageModel.prototype = Object.create(Runtime.Widget.Crud.CrudPageModel.prototype);
BayLang.Constructor.Frontend.Route.RoutePageModel.prototype.constructor = BayLang.Constructor.Frontend.Route.RoutePageModel;
Object.assign(BayLang.Constructor.Frontend.Route.RoutePageModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Crud.CrudPageModel.prototype.initWidget.call(this, params);
		var route_name = this.layout.route.name;
		if (route_name == "baylang:project:routes")
		{
			this.setAction("index");
			/* Create table widget */
			var table = this.addWidget("BayLang.Constructor.Frontend.Route.RouteTableModel", Runtime.Map.from({"foreign_key":Runtime.Map.from({"project_id":this.layout.route.matches.get("project_id")})}));
			this.render_list.addItem(table);
		}
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		/* Set title */
		if (this.action == "index")
		{
			this.layout.setPageTitle("Routes");
		}
	},
});
Object.assign(BayLang.Constructor.Frontend.Route.RoutePageModel, Runtime.Widget.Crud.CrudPageModel);
Object.assign(BayLang.Constructor.Frontend.Route.RoutePageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Route";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Route.RoutePageModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.CrudPageModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Route.RoutePageModel);
window["BayLang.Constructor.Frontend.Route.RoutePageModel"] = BayLang.Constructor.Frontend.Route.RoutePageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Route.RoutePageModel;