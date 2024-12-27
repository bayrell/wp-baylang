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
if (typeof BayLang.Constructor.Frontend.Settings == 'undefined') BayLang.Constructor.Frontend.Settings = {};
BayLang.Constructor.Frontend.Settings.SettingsModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Settings.SettingsModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
BayLang.Constructor.Frontend.Settings.SettingsModel.prototype.constructor = BayLang.Constructor.Frontend.Settings.SettingsModel;
Object.assign(BayLang.Constructor.Frontend.Settings.SettingsModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Project id */
		this.project_id = this.layout.route.matches.get("project_id");
		/* Edit form */
		this.edit_form = this.addWidget("Runtime.Widget.Form.FormSubmitModel", Runtime.Map.from({"widget_name":"edit_form","primary_key":Runtime.Vector.from(["id"]),"pk":Runtime.Map.from({"id":this.project_id}),"submit_button":Runtime.Map.from({"text":"Save","styles":Runtime.Vector.from(["success","large"])}),"storage":new Runtime.Entity.Factory("Runtime.Widget.Form.FormSaveStorage", Runtime.Map.from({"api_name":"baylang.constructor.project::save"})),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"name","label":"Name","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"description","label":"Description","component":"Runtime.Widget.TextArea","props":Runtime.Map.from({"height":"150px"})}),Runtime.Map.from({"name":"reload_cache","label":"Reload cache","component":"BayLang.Constructor.Frontend.Settings.ReloadCache"})])}));
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Settings");
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Settings.Settings";
		this.project_id = "";
		this.edit_form = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Settings.SettingsModel, Runtime.Web.BasePageModel);
Object.assign(BayLang.Constructor.Frontend.Settings.SettingsModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Settings";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Settings.SettingsModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Settings.SettingsModel);
window["BayLang.Constructor.Frontend.Settings.SettingsModel"] = BayLang.Constructor.Frontend.Settings.SettingsModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Settings.SettingsModel;