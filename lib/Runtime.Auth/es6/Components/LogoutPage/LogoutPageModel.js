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
if (typeof Runtime.Auth.Components == 'undefined') Runtime.Auth.Components = {};
if (typeof Runtime.Auth.Components.LogoutPage == 'undefined') Runtime.Auth.Components.LogoutPage = {};
Runtime.Auth.Components.LogoutPage.LogoutPageModel = class extends Runtime.BaseModel
{
	/**
	 * Process frontend data
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("user_settings", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"autocreate": true,
			"class_extends": "Runtime.Auth.Models.UserSettings",
		})));
	}
	
	
	/**
	 * Init widget settings
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("user_settings"))
		{
			this.user_settings = params.get("user_settings");
			if (this.user_settings instanceof Runtime.Map)
			{
				this.user_settings = this.filter("user_settings", this.user_settings);
			}
		}
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.result = this.createWidget("Runtime.Widget.ResultModel", Runtime.Map.create({
			"widget_name": "result",
			"styles": Runtime.Vector.create(["margin_top"]),
		}));
	}
	
	
	/**
	 * Logout
	 */
	async logout()
	{
		this.result.setWaitMessage();
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": this.user_settings.getApiName(),
			"method_name": "logout",
		}));
		this.result.setApiResult(result);
		/* If success */
		if (result.isSuccess())
		{
			let redirect_url = this.user_settings.getMainPage(this.layout);
			if (redirect_url == "") redirect_url = "/";
			document.location = redirect_url;
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Auth.Components.LogoutPage.LogoutPage";
		this.user_settings = null;
		this.result = null;
	}
	static getClassName(){ return "Runtime.Auth.Components.LogoutPage.LogoutPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Auth.Components.LogoutPage.LogoutPageModel"] = Runtime.Auth.Components.LogoutPage.LogoutPageModel;