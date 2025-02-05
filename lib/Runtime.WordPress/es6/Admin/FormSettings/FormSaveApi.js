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
if (typeof Runtime.WordPress.Admin.FormSettings == 'undefined') Runtime.WordPress.Admin.FormSettings = {};
Runtime.WordPress.Admin.FormSettings.FormSaveApi = function()
{
	Runtime.Widget.Crud.SaveApi.apply(this, arguments);
};
Runtime.WordPress.Admin.FormSettings.FormSaveApi.prototype = Object.create(Runtime.Widget.Crud.SaveApi.prototype);
Runtime.WordPress.Admin.FormSettings.FormSaveApi.prototype.constructor = Runtime.WordPress.Admin.FormSettings.FormSaveApi;
Object.assign(Runtime.WordPress.Admin.FormSettings.FormSaveApi.prototype,
{
	/**
	 * Returns service
	 */
	createService: function()
	{
		return new Runtime.WordPress.Admin.FormSettings.FormCrudService();
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["id","name","api_name","settings","email_to"]);
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		await Runtime.Widget.Crud.SaveApi.prototype.actionSave.call(this);
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		await Runtime.Widget.Crud.SaveApi.prototype.actionDelete.call(this);
	},
});
Object.assign(Runtime.WordPress.Admin.FormSettings.FormSaveApi, Runtime.Widget.Crud.SaveApi);
Object.assign(Runtime.WordPress.Admin.FormSettings.FormSaveApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "admin.wordpress.forms.settings.save";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.FormSettings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.FormSettings.FormSaveApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SaveApi";
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
			"actionSave",
			"actionDelete",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionSave")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		if (field_name == "actionDelete")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Runtime.WordPress.Admin.FormSettings.FormSaveApi);
window["Runtime.WordPress.Admin.FormSettings.FormSaveApi"] = Runtime.WordPress.Admin.FormSettings.FormSaveApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.FormSettings.FormSaveApi;