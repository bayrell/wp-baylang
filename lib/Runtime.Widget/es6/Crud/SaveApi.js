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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Crud == 'undefined') Runtime.Widget.Crud = {};
Runtime.Widget.Crud.SaveApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
Runtime.Widget.Crud.SaveApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
Runtime.Widget.Crud.SaveApi.prototype.constructor = Runtime.Widget.Crud.SaveApi;
Object.assign(Runtime.Widget.Crud.SaveApi.prototype,
{
	/**
	 * Returns service
	 */
	createService: function()
	{
		return null;
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Build error
	 */
	buildError: function(service)
	{
		/* Check if item is exists */
		if (!service.item)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound())
		}
		/* Validate error */
		if (!service.rules.correct())
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Widget.Crud.FieldException())
		}
	},
	/**
	 * Build result
	 */
	buildResult: async function(service)
	{
		this.result.data.set("fields", service.rules.getFields());
		/* Check error */
		this.buildError(service);
		/* Convert item */
		var fields = this.getItemFields();
		var item = service.convertItem(service.item, fields);
		var pk = service.getPrimaryKey(service.item);
		/* Setup result */
		this.result.data.set("pk", pk);
		this.result.data.set("item", item);
		/* Success */
		this.success();
	},
	/**
	 * Action item
	 */
	actionItem: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Load item */
		await service.searchItem(this.post_data.get("pk"));
		/* Build result */
		this.buildResult(service);
	},
	/**
	 * Action create
	 */
	actionCreate: async function()
	{
		await this.actionSave();
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Load item */
		await service.loadItem(this.post_data.get("pk"), true);
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
		/* Load item */
		await service.loadItem(this.post_data.get("pk"));
		/* Delete item */
		await service.delete();
		/* Build result */
		this.buildResult(service);
	},
});
Object.assign(Runtime.Widget.Crud.SaveApi, Runtime.Web.BaseApi);
Object.assign(Runtime.Widget.Crud.SaveApi,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.SaveApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseApi";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.SaveApi);
window["Runtime.Widget.Crud.SaveApi"] = Runtime.Widget.Crud.SaveApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.SaveApi;