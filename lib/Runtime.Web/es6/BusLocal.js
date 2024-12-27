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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.BusLocal = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.Web.BusLocal.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Web.BusLocal.prototype.constructor = Runtime.Web.BusLocal;
Object.assign(Runtime.Web.BusLocal.prototype,
{
	/**
	 * Init providers
	 */
	init: async function()
	{
		await Runtime.BaseProvider.prototype.init.bind(this)();
		this.api_list = Runtime.Map.from({});
		var api_list = Runtime.rtl.getContext().getEntities("Runtime.Web.Annotations.Api");
		for (var i = 0; i < api_list.count(); i++)
		{
			var api = api_list.get(i);
			var class_name = api.name;
			var getApiName = new Runtime.Callback(class_name, "getApiName");
			/* Save api */
			var api_name = Runtime.rtl.apply(getApiName);
			this.api_list.set(api_name, api);
		}
	},
	/**
	 * Send api to frontend
	 */
	send: async function(params)
	{
		var result;
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(params, "api_name"));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
		var api_name = __v0.value();
		var __v1 = new Runtime.Monad(Runtime.rtl.attr(params, "method_name"));
		__v1 = __v1.monad(Runtime.rtl.m_to("string", ""));
		var method_name = __v1.value();
		var __v2 = new Runtime.Monad(Runtime.rtl.attr(params, "service"));
		__v2 = __v2.monad(Runtime.rtl.m_to("string", "app"));
		var service = __v2.value();
		if (service != "app")
		{
			result = new Runtime.Web.ApiResult();
			return Promise.resolve(result.fail(Runtime.Map.from({"message":"Service must be app"})));
		}
		/* Call local api */
		try
		{
			var annotation = this.findApi(params);
			result = await this.callAnnotation(annotation, params);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.ApiError)
			{
				var e = _ex;
				
				result = new Runtime.Web.ApiResult();
				result.fail(e.getPreviousException());
			}
			else
			{
				throw _ex;
			}
		}
		/* Set api name */
		result.api_name = api_name;
		result.method_name = method_name;
		return Promise.resolve(result);
	},
	/**
	 * Find local api
	 */
	findApi: async function(params)
	{
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(params, "api_name"));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
		var api_name = __v0.value();
		var __v1 = new Runtime.Monad(Runtime.rtl.attr(params, "method_name"));
		__v1 = __v1.monad(Runtime.rtl.m_to("string", ""));
		var method_name = __v1.value();
		/* Get annotation by api name */
		var annotation = this.api_list.get(api_name);
		/* Annotation not found */
		if (annotation == null)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(api_name, "Api annotation"))
		}
		/* Find method */
		var getMethodInfoByName = new Runtime.Callback(annotation.name, "getMethodInfoByName");
		var method_info = getMethodInfoByName.apply(Runtime.Vector.from([method_name]));
		/* Method not found */
		if (method_info == null)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(method_name + Runtime.rtl.toStr(" in ") + Runtime.rtl.toStr(api_name), "Api method"))
		}
		/* Check if method is api */
		var api_method = method_info.get("annotations").findItem(Runtime.lib.isInstance("Runtime.Web.Annotations.ApiMethod"));
		if (api_method == null)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(method_name + Runtime.rtl.toStr(" in ") + Runtime.rtl.toStr(api_name), "Api method"))
		}
		/* Set props */
		var result = Runtime.Map.from({"api_method":api_method,"api_name":api_name,"class_name":annotation.name,"method_info":method_info,"method_name":method_name});
		return Promise.resolve(result);
	},
	/**
	 * Call annotation
	 */
	callAnnotation: async function(annotation, params)
	{
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(params, "data"));
		__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Dict", null));
		var data = __v0.value();
		var class_name = annotation.get("class_name");
		var method_name = annotation.get("method_name");
		var api_instance = null;
		var callback = null;
		/* Create api instance */
		api_instance = Runtime.rtl.newInstance(class_name);
		api_instance.action = method_name;
		api_instance.backend_storage = Runtime.rtl.attr(params, "backend_storage");
		api_instance.post_data = data;
		api_instance.result = new Runtime.Web.ApiResult();
		api_instance.init();
		/* Get callback */
		if (Runtime.rtl.method_exists(class_name, method_name))
		{
			callback = new Runtime.Callback(class_name, method_name);
		}
		else
		{
			callback = new Runtime.Callback(api_instance, method_name);
		}
		/* Call api */
		try
		{
			await api_instance.onActionBefore();
			await callback.apply(Runtime.Vector.from([api_instance]));
			await api_instance.onActionAfter();
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.ApiError)
			{
				var e = _ex;
				
				api_instance.result.fail(e.getPreviousException());
			}
			else
			{
				throw _ex;
			}
		}
		/* Return api result */
		return Promise.resolve(api_instance.result);
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.api_list = Runtime.Map.from({});
	},
});
Object.assign(Runtime.Web.BusLocal, Runtime.BaseProvider);
Object.assign(Runtime.Web.BusLocal,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BusLocal";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
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
	__implements__:
	[
		Runtime.Web.BusInterface,
	],
});
Runtime.rtl.defClass(Runtime.Web.BusLocal);
window["Runtime.Web.BusLocal"] = Runtime.Web.BusLocal;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BusLocal;