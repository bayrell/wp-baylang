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
Runtime.Widget.Crud.SearchApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
Runtime.Widget.Crud.SearchApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
Runtime.Widget.Crud.SearchApi.prototype.constructor = Runtime.Widget.Crud.SearchApi;
Object.assign(Runtime.Widget.Crud.SearchApi.prototype,
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
	 * Build result
	 */
	buildResult: async function(service)
	{
		if (!service.items)
		{
			return Promise.resolve();
		}
		/* Convert item */
		var fields = this.getItemFields();
		var items = service.items.map((item) =>
		{
			return service.convertItem(item, fields);
		});
		/* Setup result */
		this.result.data.set("items", items);
		this.result.data.set("page", service.page);
		this.result.data.set("pages", service.pages);
		this.result.data.set("limit", service.limit);
		/* Success */
		this.success();
	},
	/**
	 * Build item result
	 */
	buildItemResult: async function(service)
	{
		if (!service.item)
		{
			return Promise.resolve();
		}
		/* Convert item */
		var fields = this.getItemFields();
		var item = service.convertItem(service.item, fields);
		var pk = service.getPrimaryKey(service.item);
		/* Setup result */
		this.result.data.set("pk", pk);
		this.result.data.set("item", item);
		this.result.data.set("fields", service.rules.getFields());
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
		this.buildError(service);
		this.buildItemResult(service);
	},
	/**
	 * Action search
	 */
	actionSearch: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Search items */
		await service.search(this.post_data);
		/* Build result */
		this.buildResult(service);
	},
});
Object.assign(Runtime.Widget.Crud.SearchApi, Runtime.Web.BaseApi);
Object.assign(Runtime.Widget.Crud.SearchApi,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.SearchApi";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.SearchApi);
window["Runtime.Widget.Crud.SearchApi"] = Runtime.Widget.Crud.SearchApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.SearchApi;