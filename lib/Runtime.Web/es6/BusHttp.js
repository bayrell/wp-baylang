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
Runtime.Web.BusHttp = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.BusHttp.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.BusHttp.prototype.constructor = Runtime.Web.BusHttp;
Object.assign(Runtime.Web.BusHttp.prototype,
{
	/**
	 * Send api to frontend
	 */
	send: async function(params)
	{
		var service = params.get("service", "app");
		var api_name = params.get("api_name", "");
		var method_name = params.get("method_name", "");
		var data = params.get("data", null);
		var route_prefix = Runtime.rtl.getContext().env("ROUTE_PREFIX");
		route_prefix = Runtime.rs.removeFirstSlash(route_prefix);
		var api_url_arr = Runtime.Vector.from([route_prefix,this.kind,service,api_name,method_name]);
		api_url_arr = api_url_arr.filter((s) =>
		{
			return s != "";
		});
		var api_url = "/" + Runtime.rtl.toStr(api_url_arr.join("/")) + Runtime.rtl.toStr("/");
		var res = new Runtime.Web.ApiResult();
		try
		{
			var post_data = Runtime.Map.from({"service":service,"api_name":api_name,"method_name":method_name,"data":data});
			/* Call api before hook */
			var d = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.CALL_API_BEFORE, Runtime.Map.from({"api_url":api_url,"post_data":post_data,"params":params}));
			api_url = d.get("api_url");
			post_data = d.get("post_data");
			/* Send curl */
			var curl = new Runtime.Curl(api_url, Runtime.Map.from({"post":post_data}));
			var response = await curl.send();
			/* Get answer */
			var answer = Runtime.rtl.json_decode(response, Runtime.rtl.ALLOW_OBJECTS);
			if (answer && answer instanceof Runtime.Dict)
			{
				res.importContent(answer);
			}
			else
			{
				res.exception(new Runtime.Exceptions.AbstractException("Api response error"));
			}
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.CurlException)
			{
				var e = _ex;
				
				res.exception(e);
				res.ob_content = e.http_content;
				if (Runtime.rtl.getContext().env("DEBUG"))
				{
					Runtime.io.print_error(e.http_content);
				}
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.kind = "api";
	},
});
Object.assign(Runtime.Web.BusHttp, Runtime.BaseObject);
Object.assign(Runtime.Web.BusHttp,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BusHttp";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
Runtime.rtl.defClass(Runtime.Web.BusHttp);
window["Runtime.Web.BusHttp"] = Runtime.Web.BusHttp;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BusHttp;