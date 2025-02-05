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
if (typeof BayLang.Constructor.Backend == 'undefined') BayLang.Constructor.Backend = {};
if (typeof BayLang.Constructor.Backend.Api == 'undefined') BayLang.Constructor.Backend.Api = {};
BayLang.Constructor.Backend.Api.WidgetSaveApi = function()
{
	Runtime.Widget.Crud.SaveApi.apply(this, arguments);
};
BayLang.Constructor.Backend.Api.WidgetSaveApi.prototype = Object.create(Runtime.Widget.Crud.SaveApi.prototype);
BayLang.Constructor.Backend.Api.WidgetSaveApi.prototype.constructor = BayLang.Constructor.Backend.Api.WidgetSaveApi;
Object.assign(BayLang.Constructor.Backend.Api.WidgetSaveApi.prototype,
{
	/**
	 * Returns service
	 */
	createService: function()
	{
		return new BayLang.Constructor.Backend.Service.WidgetService();
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["id","module_id"]);
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		/* Create service */
		var service = this.createService();
		service.setCreate(true);
		/* Get foreign_key */
		var foreign_key = this.post_data.get("foreign_key");
		if (foreign_key == null)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Foreign key not found"))
		}
		/* Load project */
		await service.loadProject(foreign_key.get("project_id"));
		/* Load modules */
		await service.loadModule(foreign_key.get("module_id"));
		/* Save item */
		await service.save(this.post_data.get("item"));
		/* Build result */
		this.buildResult(service);
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Get foreign_key */
		var foreign_key = this.post_data.get("foreign_key");
		if (foreign_key == null)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Foreign key not found"))
		}
		/* Load project */
		await service.loadProject(foreign_key.get("project_id"));
		/* Load modules */
		await service.loadModule(foreign_key.get("module_id"));
		/* Load item */
		await service.loadItem(this.post_data.get("pk"));
		/* Delete item */
		await service.delete();
		/* Build result */
		this.buildResult(service);
	},
});
Object.assign(BayLang.Constructor.Backend.Api.WidgetSaveApi, Runtime.Widget.Crud.SaveApi);
Object.assign(BayLang.Constructor.Backend.Api.WidgetSaveApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "baylang.constructor.widget.save";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Api";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Api.WidgetSaveApi";
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
Runtime.rtl.defClass(BayLang.Constructor.Backend.Api.WidgetSaveApi);
window["BayLang.Constructor.Backend.Api.WidgetSaveApi"] = BayLang.Constructor.Backend.Api.WidgetSaveApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Api.WidgetSaveApi;