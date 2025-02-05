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
Runtime.WordPress.Admin.Settings.TabsModel = function()
{
	Runtime.Widget.Tab.TabsModel.apply(this, arguments);
};
Runtime.WordPress.Admin.Settings.TabsModel.prototype = Object.create(Runtime.Widget.Tab.TabsModel.prototype);
Runtime.WordPress.Admin.Settings.TabsModel.prototype.constructor = Runtime.WordPress.Admin.Settings.TabsModel;
Object.assign(Runtime.WordPress.Admin.Settings.TabsModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Tab.TabsModel.prototype.initWidget.call(this, params);
		/* Setup items */
		this.items = Runtime.Vector.from([Runtime.Map.from({"key":"settings","label":"Save project","href":this.layout.url("admin:project:save")}),Runtime.Map.from({"key":"create-project","label":"Create project","href":this.layout.url("admin:project:create")}),Runtime.Map.from({"key":"database-migrations","label":"Database migrations","href":this.layout.url("admin:database:migrations")})]);
	},
	_init: function()
	{
		Runtime.Widget.Tab.TabsModel.prototype._init.call(this);
		this.widget_name = "tabs";
		this.items = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.WordPress.Admin.Settings.TabsModel, Runtime.Widget.Tab.TabsModel);
Object.assign(Runtime.WordPress.Admin.Settings.TabsModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Settings.TabsModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Tab.TabsModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Settings.TabsModel);
window["Runtime.WordPress.Admin.Settings.TabsModel"] = Runtime.WordPress.Admin.Settings.TabsModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Settings.TabsModel;