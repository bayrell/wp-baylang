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
if (typeof Runtime.Auth == 'undefined') Runtime.Auth = {};
if (typeof Runtime.Auth.Api == 'undefined') Runtime.Auth.Api = {};
Runtime.Auth.Api.LogoutApi = class extends Runtime.Web.BaseApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return ""; }
	
	
	/**
	 * Setup params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("settings")) this.settings = params.get("settings");
	}
	
	
	/**
	 * Action logout
	 */
	async actionLogout()
	{
		/* Clear cookie */
		let cookie = new Runtime.Web.Cookie(Runtime.Map.create({
			"name": this.settings.getTokenName(),
			"expires": 0,
			"value": "",
		}));
		this.result.addCookie(cookie);
		/* Set result */
		this.success();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.settings = null;
	}
	static getClassName(){ return "Runtime.Auth.Api.LogoutApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionLogout");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionLogout") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "logout"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.Auth.Api.LogoutApi"] = Runtime.Auth.Api.LogoutApi;