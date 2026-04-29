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
Runtime.Web.ApiRoute = class extends Runtime.Web.BaseRoute
{
	/**
	 * Returns routes
	 */
	static getRoutes()
	{
		return Runtime.Vector.create([
			new Runtime.Web.RouteAction(Runtime.Map.create({
				"uri": "/api/{api_name}/{method_name}",
				"name": "runtime:web:api",
				"action": "actionIndex",
				"method": "post",
				"pos": 1000,
			})),
			new Runtime.Web.RouteAction(Runtime.Map.create({
				"uri": "/api/{api_name}/{method_name}/",
				"name": "runtime:web:api:index",
				"action": "actionIndex",
				"method": "post",
				"pos": 1000,
			})),
		]);
	}
	
	
	/**
	 * Action index
	 */
	static async actionIndex(container)
	{
		/* Call api */
		let api_name = container.route.matches.get("api_name");
		let method_name = container.route.matches.get("method_name");
		let api_result = null;
		let bus = Runtime.rtl.getContext().provider("api");
		let payload = container.request.payload;
		api_result = await bus.send(Runtime.Map.create({
			"api_name": api_name,
			"method_name": method_name,
			"data": payload,
			"storage": container.layout.storage.backend,
		}));
		/* Create response */
		container.setResponse(new Runtime.Web.JsonResponse(api_result.getContent()));
		/* Set cookie */
		if (api_result instanceof Runtime.Web.ApiResult)
		{
			api_result.cookies.each((cookie) =>
			{
				container.addCookie(cookie);
			});
		}
		/* HTTP error if exception */
		if (api_result.isException())
		{
			container.response.http_code = 500;
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.Web.ApiRoute"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.ApiRoute"] = Runtime.Web.ApiRoute;