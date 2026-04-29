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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.BusLocal = class extends Runtime.BaseProvider
{
	/**
	 * Init providers
	 */
	async init()
	{
		await super.init();
		this.api_list = new Runtime.Map();
		let api_list = Runtime.rtl.getContext().getEntities("Runtime.Web.Annotations.Api");
		for (let i = 0; i < api_list.count(); i++)
		{
			let api = api_list.get(i);
			let class_name = api.name;
			let getApiName = new Runtime.Method(class_name, "getApiName");
			/* Save api */
			if (!getApiName.exists()) continue;
			let api_name = getApiName.apply();
			if (!this.api_list.has(api_name)) this.api_list.set(api_name, Runtime.Vector.create([]));
			let items = this.api_list.get(api_name);
			items.push(api);
		}
	}
	
	
	/**
	 * Find api
	 */
	findApi(api_name, method_name)
	{
		let result = new Runtime.Map();
		/* Check params */
		if (api_name == "" || method_name == "")
		{
			return null;
		}
		/* Find api */
		let items = this.api_list.get(api_name);
		if (!items)
		{
			return null;
		}
		/* Find method */
		let api_method = null;
		items.each((api) =>
		{
			if (api_method) return;
			let getMethodsList = new Runtime.Method(api.name, "getMethodsList");
			let getMethodInfoByName = new Runtime.Method(api.name, "getMethodInfoByName");
			let methods = getMethodsList.apply();
			for (let i = 0; i < methods.count(); i++)
			{
				let name = methods.get(i);
				let annotations = getMethodInfoByName.apply(Runtime.Vector.create([name]));
				let api_method_item = annotations.find((obj) => { return obj instanceof Runtime.Web.Annotations.ApiMethod; });
				if (api_method_item && api_method_item.name == method_name)
				{
					let api_item = Runtime.rtl.newInstance(api.name);
					api_method = api_method_item;
					api_method.item = new Runtime.Method(api_item, name);
					return;
				}
			}
		});
		return api_method;
	}
	
	
	/**
	 * Run middleware
	 */
	async runMiddleware(api_method)
	{
		let api = api_method.item.obj;
		let items = api.getMiddleware();
		for (let i = 0; i < items.count(); i++)
		{
			let item = items.get(i);
			await item.api(api);
		}
		/* Run hook */
		await Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.API_MIDDLEWARE, Runtime.Map.create({
			"api": api,
		}));
	}
	
	
	/**
	 * Send api to frontend
	 */
	async send(params)
	{
		let api_name = params.get("api_name");
		let method_name = params.get("method_name");
		let result = null;
		try
		{
			/* Find api */
			let api_method = this.findApi(api_name, method_name);
			/* Hook */
			let res = Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.FIND_API, Runtime.Map.create({
				"api_name": api_name,
				"method_name": method_name,
				"api": api_method,
			}));
			api_method = res.get("api");
			/* Check api */
			if (api_method == null || api_method.item == null)
			{
				throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(api_name + String("::") + String(method_name), "Api"));
			}
			/* Call method */
			let request = new Runtime.Web.ApiRequest(Runtime.Map.create({
				"data": params.get("data"),
				"storage": params.get("storage"),
			}));
			api_method.item.obj.setRequest(request);
			/* Run middleware */
			await this.runMiddleware(api_method);
			/* Apply */
			await api_method.apply(request);
			result = api_method.item.obj.result;
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				result = new Runtime.Web.ApiResult();
				if (e instanceof Runtime.Exceptions.ApiError)
				{
					if (e.result instanceof Runtime.Web.ApiResult) result = e.result;
					else result.fail(e.prev);
				}
				else result.exception(e);
			}
			else
			{
				throw _ex;
			}
		}
		/* If result does no exists */
		if (!result)
		{
			result = new Runtime.Web.ApiResult();
			result.exception(new Runtime.Exceptions.ItemNotFound("ApiResult"));
		}
		/* Set api name */
		result.api_name = api_name;
		result.method_name = method_name;
		/* Return result */
		return result;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.api_list = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Web.BusLocal"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.BusInterface"]; }
};
window["Runtime.Web.BusLocal"] = Runtime.Web.BusLocal;