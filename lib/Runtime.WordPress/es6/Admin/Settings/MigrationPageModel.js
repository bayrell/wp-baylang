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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.Settings == 'undefined') Runtime.WordPress.Admin.Settings = {};
Runtime.WordPress.Admin.Settings.MigrationPageModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
Runtime.WordPress.Admin.Settings.MigrationPageModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
Runtime.WordPress.Admin.Settings.MigrationPageModel.prototype.constructor = Runtime.WordPress.Admin.Settings.MigrationPageModel;
Object.assign(Runtime.WordPress.Admin.Settings.MigrationPageModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Add tabs */
		this.tabs = this.addWidget("Runtime.WordPress.Admin.Settings.TabsModel", Runtime.Map.from({"active":"database-migrations"}));
		/* Add result */
		this.result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"styles":Runtime.Vector.from(["margin_top"])}));
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "items", data);
		Runtime.Web.BasePageModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Update database
	 */
	updateDatabase: async function()
	{
		this.result.setWaitMessage();
		var result = await this.layout.callApi(Runtime.Map.from({"api_name":"admin.wordpress.migration","method_name":"actionUpdate"}));
		this.result.setApiResult(result);
	},
	/**
	 * Load table data
	 */
	loadData: async function(container)
	{
		await Runtime.Web.BasePageModel.prototype.loadData.call(this, container);
		var result = this.layout.callApi(Runtime.Map.from({"api_name":"admin.wordpress.migration","method_name":"actionItem"}));
		if (result.isSuccess())
		{
			this.items = result.data.get("items");
		}
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Migrations");
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "Runtime.WordPress.Admin.Settings.MigrationPage";
		this.tabs = null;
		this.items = Runtime.Vector.from([]);
		this.result = null;
	},
});
Object.assign(Runtime.WordPress.Admin.Settings.MigrationPageModel, Runtime.Web.BasePageModel);
Object.assign(Runtime.WordPress.Admin.Settings.MigrationPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Settings.MigrationPageModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Settings.MigrationPageModel);
window["Runtime.WordPress.Admin.Settings.MigrationPageModel"] = Runtime.WordPress.Admin.Settings.MigrationPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Settings.MigrationPageModel;