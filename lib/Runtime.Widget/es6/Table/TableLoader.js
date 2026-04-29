"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableLoader = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("foreign_key", rules.params ? rules.params.get("foreign_key") : null);
		rules.addType("page", new Runtime.Serializer.IntegerType());
		rules.addType("limit", new Runtime.Serializer.IntegerType());
		rules.addType("api_params", new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()));
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params.has("table")) this.table = params.get("table");
		if (params.has("foreign_key")) this.foreign_key = params.get("foreign_key");
		if (params.has("api_name")) this.api_name = params.get("api_name");
		if (params.has("method_name")) this.method_name = params.get("method_name");
		if (params.has("save_method_name")) this.save_method_name = params.get("save_method_name");
		if (params.has("delete_method_name")) this.delete_method_name = params.get("delete_method_name");
		if (params.has("page_name")) this.page_name = params.get("page_name");
		if (params.has("page")) this.page = params.get("page");
		if (params.has("limit")) this.limit = params.get("limit");
	}
	
	
	/**
	 * Set api params
	 */
	setApiParams(params)
	{
		this.api_params = this.api_params ? this.api_params.concat(params) : params.copy();
	}
	
	
	/**
	 * Merge api params
	 */
	mergeParams(data)
	{
		if (!this.api_params) return data;
		return this.api_params.concat(data);
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		let page = container.request.query.get(this.page_name, 1);
		this.page = page - 1;
		return await this.reload();
	}
	
	
	/**
	 * Reload
	 */
	async reload()
	{
		let api_result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": this.api_name,
			"method_name": this.method_name,
			"data": this.mergeParams(Runtime.Map.create({
				"page": this.page,
				"limit": this.limit,
				"foreign_key": this.foreign_key,
			})),
		}));
		if (api_result.isSuccess() && api_result.data.has("items"))
		{
			this.table.page = api_result.data.get("page");
			this.table.pages = api_result.data.get("pages");
			this.table.setItems(api_result.data.get("items"));
		}
		return api_result;
	}
	
	
	/**
	 * Save
	 */
	async save(pk, item)
	{
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": this.api_name,
			"method_name": this.save_method_name,
			"data": Runtime.Map.create({
				"pk": pk,
				"item": item,
				"foreign_key": this.foreign_key,
			}),
		}));
		return result;
	}
	
	
	/**
	 * Delete
	 */
	async delete(pk)
	{
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": this.api_name,
			"method_name": this.delete_method_name,
			"data": Runtime.Map.create({
				"pk": pk,
				"foreign_key": this.foreign_key,
			}),
		}));
		return result;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.table = null;
		this.foreign_key = null;
		this.api_name = "";
		this.method_name = "search";
		this.save_method_name = "save";
		this.delete_method_name = "delete";
		this.page_name = "page";
		this.page = 0;
		this.limit = 10;
		this.api_params = null;
	}
	static getClassName(){ return "Runtime.Widget.Table.TableLoader"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Table.TableLoader"] = Runtime.Widget.Table.TableLoader;