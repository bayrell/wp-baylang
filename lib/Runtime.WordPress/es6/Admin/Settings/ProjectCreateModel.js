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
Runtime.WordPress.Admin.Settings.ProjectCreateModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
Runtime.WordPress.Admin.Settings.ProjectCreateModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
Runtime.WordPress.Admin.Settings.ProjectCreateModel.prototype.constructor = Runtime.WordPress.Admin.Settings.ProjectCreateModel;
Object.assign(Runtime.WordPress.Admin.Settings.ProjectCreateModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Add tabs */
		this.tabs = this.addWidget("Runtime.WordPress.Admin.Settings.TabsModel", Runtime.Map.from({"active":"create-project"}));
		/* Save form */
		this.form = this.addWidget("Runtime.Widget.Form.FormSubmitModel", Runtime.Map.from({"widget_name":"form","primary_key":Runtime.Vector.from(["id"]),"submit_button":Runtime.Map.from({"text":"Save","styles":Runtime.Vector.from(["success","large"])}),"storage":new Runtime.Entity.Factory("Runtime.Widget.Form.FormSubmitStorage", Runtime.Map.from({"api_name":"admin.wordpress.project","method_name":"actionCreate"})),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"id","label":"Api name","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"name","label":"Name","component":"Runtime.Widget.Input"})])}));
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Create project");
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "Runtime.WordPress.Admin.Settings.ProjectCreate";
		this.tabs = null;
		this.form = null;
	},
});
Object.assign(Runtime.WordPress.Admin.Settings.ProjectCreateModel, Runtime.Web.BasePageModel);
Object.assign(Runtime.WordPress.Admin.Settings.ProjectCreateModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Settings.ProjectCreateModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Settings.ProjectCreateModel);
window["Runtime.WordPress.Admin.Settings.ProjectCreateModel"] = Runtime.WordPress.Admin.Settings.ProjectCreateModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Settings.ProjectCreateModel;