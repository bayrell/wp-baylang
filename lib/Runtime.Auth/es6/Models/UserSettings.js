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
if (typeof Runtime.Auth.Models == 'undefined') Runtime.Auth.Models = {};
Runtime.Auth.Models.UserSettings = class extends Runtime.BaseObject
{
	/**
	 * Returns api name
	 */
	getApiName(){ return "app:auth"; }
	
	
	/**
	 * Returns token name
	 */
	getTokenName(){ return "auth"; }
	
	
	/**
	 * Returns url name
	 */
	getUrlName(){ return "auth"; }
	
	
	/**
	 * Returns token expires
	 */
	getTokenExpires(){ return 30 * 24 * 60 * 60; }
	
	
	/**
	 * Get layout
	 */
	getLayout(){ return "default"; }
	
	
	/**
	 * Returns main page
	 */
	getMainPage(layout){ return ""; }
	
	
	/**
	 * Returns login page
	 */
	getLoginPage(){ return "Runtime.Auth.Components.LoginPage.LoginPageModel"; }
	
	
	/**
	 * Returns logout page
	 */
	getLogoutPage(){ return "Runtime.Auth.Components.LogoutPage.LogoutPageModel"; }
	
	
	/**
	 * Returns login api
	 */
	getLoginApi(){ return "Runtime.Auth.Api.LoginApi"; }
	
	
	/**
	 * Returns logout api
	 */
	getLogoutApi(){ return "Runtime.Auth.Api.LogoutApi"; }
	
	
	/**
	 * Returns model params
	 */
	getModelParams()
	{
		return Runtime.Map.create({
			"user_settings": this,
		});
	}
	
	
	/**
	 * Returns login route
	 */
	getLoginRoute()
	{
		return new Runtime.Web.RouteModel(Runtime.Map.create({
			"uri": "/{lang}/login",
			"name": this.getUrlName() + String(":login"),
			"model": this.getLoginPage(),
			"model_params": this.getModelParams(),
		}));
	}
	
	
	/**
	 * Returns logout route
	 */
	getLogoutRoute()
	{
		return new Runtime.Web.RouteModel(Runtime.Map.create({
			"uri": "/{lang}/logout",
			"name": this.getUrlName() + String(":logout"),
			"model": this.getLogoutPage(),
			"model_params": this.getModelParams(),
		}));
	}
	
	
	/**
	 * Returns user data
	 */
	getUserData(layout){ return layout.get(this.getTokenName()); }
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.Auth.Models.UserSettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.SerializeInterface"]; }
};
window["Runtime.Auth.Models.UserSettings"] = Runtime.Auth.Models.UserSettings;