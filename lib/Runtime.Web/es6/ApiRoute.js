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
Runtime.Web.ApiRoute = function()
{
	Runtime.Web.BaseRoute.apply(this, arguments);
};
Runtime.Web.ApiRoute.prototype = Object.create(Runtime.Web.BaseRoute.prototype);
Runtime.Web.ApiRoute.prototype.constructor = Runtime.Web.ApiRoute;
Object.assign(Runtime.Web.ApiRoute.prototype,
{
});
Object.assign(Runtime.Web.ApiRoute, Runtime.Web.BaseRoute);
Object.assign(Runtime.Web.ApiRoute,
{
	/**
	 * Returns routes
	 */
	getRoutes: function()
	{
		return Runtime.Vector.from([new Runtime.Web.RouteAction(Runtime.Map.from({"uri":"/api/{service}/{api_name}/{method_name}/","name":"runtime:web:api","action":"actionIndex","pos":1000}))]);
	},
	/**
	 * Action index
	 */
	actionIndex: async function(container)
	{
		/* Call api */
		var service = Runtime.rtl.attr(container.route.matches, "service");
		var api_name = Runtime.rtl.attr(container.route.matches, "api_name");
		var method_name = Runtime.rtl.attr(container.route.matches, "method_name");
		var api_result = null;
		var bus = Runtime.rtl.getContext().provider("Runtime.Web.BusLocal");
		try
		{
			api_result = await bus.send(Runtime.Map.from({"service":service,"api_name":api_name,"method_name":method_name,"data":container.request.payload.get("data"),"backend_storage":container.layout.backend_storage,"container":container}));
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.AbstractException)
			{
				var e = _ex;
				
				api_result = new Runtime.Web.ApiResult();
				api_result.exception(e);
			}
			else
			{
				throw _ex;
			}
		}
		/* Create response */
		container.setResponse(new Runtime.Web.JsonResponse(api_result.getContent()));
		/* Set cookie */
		api_result.cookies.each((cookie) =>
		{
			container.addCookie(cookie);
		});
		/* HTTP error if exception */
		/*if (api.isException())
		{
			container.response.http_code = 500;
		}*/
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.ApiRoute";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseRoute";
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
Runtime.rtl.defClass(Runtime.Web.ApiRoute);
window["Runtime.Web.ApiRoute"] = Runtime.Web.ApiRoute;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.ApiRoute;