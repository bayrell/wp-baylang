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
BayLang.Constructor.Backend.Api.FontSaveApi = function()
{
	Runtime.Widget.Crud.SaveApi.apply(this, arguments);
};
BayLang.Constructor.Backend.Api.FontSaveApi.prototype = Object.create(Runtime.Widget.Crud.SaveApi.prototype);
BayLang.Constructor.Backend.Api.FontSaveApi.prototype.constructor = BayLang.Constructor.Backend.Api.FontSaveApi;
Object.assign(BayLang.Constructor.Backend.Api.FontSaveApi.prototype,
{
	/**
	 * Returns service
	 */
	createService: function()
	{
		return new BayLang.Constructor.Backend.Service.FontService();
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["name","css","files"]);
	},
	/**
	 * Action item
	 */
	actionItem: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Load project */
		await service.loadProject(this.post_data.get("project_id"));
		/* Load item */
		var pk = this.post_data.get("pk");
		await service.searchItem(pk);
		/* Build result */
		this.buildResult(service);
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Load project */
		await service.loadProject(this.post_data.get("project_id"));
		/* Load item */
		await service.loadItem(this.post_data.get("pk"));
		/* Save item */
		await service.save(this.post_data.get("item"));
		/* Build result */
		this.buildResult(service);
	},
	/**
	 * Upload file
	 */
	uploadFile: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Load project */
		await service.loadProject(this.post_data.get("project_id"));
		/* Load item */
		await service.loadItem(this.post_data.get("foreign_key"));
		/* Upload file */
		await service.uploadFile(this.post_data.get("file"));
		/* Build result */
		this.success();
	},
	/**
	 * Delete file
	 */
	deleteFile: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Load project */
		await service.loadProject(this.post_data.get("project_id"));
		/* Load item */
		await service.loadItem(this.post_data.get("foreign_key"));
		/* Check item */
		var pk = this.post_data.get("pk");
		if (pk == null || !(pk instanceof Runtime.Dict))
		{
			return Promise.resolve(this.fail(Runtime.Map.from({"message":"Item not found"})));
		}
		/* Delete file */
		var file_name = this.post_data.get("pk").get("name");
		await service.deleteFile(file_name);
		/* Build result */
		this.success();
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Load project */
		await service.loadProject(this.post_data.get("project_id"));
		/* Load item */
		await service.loadItem(this.post_data.get("pk"));
		/* Delete item */
		await service.delete();
		/* Build result */
		this.buildResult(service);
	},
});
Object.assign(BayLang.Constructor.Backend.Api.FontSaveApi, Runtime.Widget.Crud.SaveApi);
Object.assign(BayLang.Constructor.Backend.Api.FontSaveApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "baylang.constructor.fonts.save";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Api";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Api.FontSaveApi";
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
			"actionItem",
			"actionSave",
			"uploadFile",
			"deleteFile",
			"actionDelete",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionItem")
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
		if (field_name == "uploadFile")
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
		if (field_name == "deleteFile")
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
Runtime.rtl.defClass(BayLang.Constructor.Backend.Api.FontSaveApi);
window["BayLang.Constructor.Backend.Api.FontSaveApi"] = BayLang.Constructor.Backend.Api.FontSaveApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Api.FontSaveApi;