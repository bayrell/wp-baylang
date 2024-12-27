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
if (typeof Runtime.WordPress.Admin.Robots == 'undefined') Runtime.WordPress.Admin.Robots = {};
Runtime.WordPress.Admin.Robots.RobotsPageModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
Runtime.WordPress.Admin.Robots.RobotsPageModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
Runtime.WordPress.Admin.Robots.RobotsPageModel.prototype.constructor = Runtime.WordPress.Admin.Robots.RobotsPageModel;
Object.assign(Runtime.WordPress.Admin.Robots.RobotsPageModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Add form */
		this.form = this.addWidget("Runtime.Widget.Form.FormModel", Runtime.Map.from({"widget_name":"form","storage":new Runtime.Entity.Factory("Runtime.Widget.Form.FormSaveStorage", Runtime.Map.from({"api_name":"admin.wordpress.robots::save"})),"pk":Runtime.Vector.from([]),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"content","component":"Runtime.Widget.TextArea"})])}));
		/* Add save button */
		this.form.bottom_buttons.addButton(Runtime.Map.from({"widget_name":"save_button","content":"Save","styles":Runtime.Vector.from(["large","primary"]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onSave")})}));
	},
	/**
	 * Save form
	 */
	onSave: async function()
	{
		await this.form.submit();
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Robots TXT");
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "Runtime.WordPress.Admin.Robots.RobotsPage";
		this.form = null;
	},
});
Object.assign(Runtime.WordPress.Admin.Robots.RobotsPageModel, Runtime.Web.BasePageModel);
Object.assign(Runtime.WordPress.Admin.Robots.RobotsPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Robots";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Robots.RobotsPageModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Robots.RobotsPageModel);
window["Runtime.WordPress.Admin.Robots.RobotsPageModel"] = Runtime.WordPress.Admin.Robots.RobotsPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Robots.RobotsPageModel;