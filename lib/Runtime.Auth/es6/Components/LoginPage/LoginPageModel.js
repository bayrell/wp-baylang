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
if (typeof Runtime.Auth.Components.LoginPage == 'undefined') Runtime.Auth.Components.LoginPage = {};
Runtime.Auth.Components.LoginPage.LoginPageModel = class extends Runtime.BaseModel
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
		/* Add login form */
		this.login_form = this.createWidget("Runtime.Widget.Form.FormSubmitModel", Runtime.Map.create({
			"api_name": this.user_settings.getApiName(),
			"method_name": "login",
			"fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "login",
					"label": "Login",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "password",
					"label": "Password",
					"component": "Runtime.Widget.Input",
					"props": Runtime.Map.create({
						"type": "password",
					}),
				}),
			]),
			"submit_button": Runtime.Map.create({
				"text": "Login",
				"styles": Runtime.Vector.create(["primary", "stretch"]),
			}),
			"events": Runtime.Map.create({
				"submit": new Runtime.Method(this, "onSubmit"),
			}),
		}));
	}
	
	
	/**
	 * Submit
	 */
	async onSubmit(message)
	{
		if (message.result.isSuccess())
		{
			let redirect_url = this.user_settings.getMainPage(this.layout);
			document.location = redirect_url;
		}
	}
	
	
	/**
	 * Load data
	 */
	loadData(container)
	{
		let jwt = this.layout.storage.backend.get(this.user_settings.getTokenName());
		if (jwt == null) return;
		/* Redirect to main page if user is login */
		let redirect_code = 302;
		let redirect_url = this.user_settings.getMainPage(this.layout);
		if (redirect_url == "") redirect_url = "/";
		container.setResponse(new Runtime.Web.RedirectResponse(redirect_url, redirect_code));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Auth.Components.LoginPage.LoginPage";
		this.user_settings = null;
		this.login_form = null;
	}
	static getClassName(){ return "Runtime.Auth.Components.LoginPage.LoginPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Auth.Components.LoginPage.LoginPageModel"] = Runtime.Auth.Components.LoginPage.LoginPageModel;