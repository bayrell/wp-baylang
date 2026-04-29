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
Runtime.Auth.Api.LoginApi = class extends Runtime.Web.BaseApi
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
	 * Returns data rules
	 */
	getDataRules(rules)
	{
		rules.addType("login", new Runtime.Serializer.Required());
		rules.addType("login", new Runtime.Serializer.StringType());
		rules.addType("password", new Runtime.Serializer.Required());
		rules.addType("password", new Runtime.Serializer.StringType());
	}
	
	
	/**
	 * Action login
	 */
	async actionLogin()
	{
		this.filterData();
		/* Get credentials */
		let login = this.data.get("login");
		let password = this.data.get("password");
		/* Login user */
		let jwt = await this.login(login, password);
		/* Add cookie */
		let cookie = new Runtime.Web.Cookie(Runtime.Map.create({
			"name": this.settings.getTokenName(),
			"expires": jwt.data.get("expires"),
			"value": jwt.token,
		}));
		this.result.addCookie(cookie);
		/* Set result */
		this.success();
	}
	
	
	/**
	 * Login error
	 */
	loginError()
	{
		throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Unknown login or password"));
	}
	
	
	/**
	 * Login user
	 */
	async login(login, password)
	{
		/* Find user */
		let class_name = this.settings.getRecordName();
		let findUser = new Runtime.Method(class_name, "findUser");
		let user = await findUser.apply(Runtime.Vector.create([login]));
		if (!user)
		{
			this.loginError();
		}
		/* Check password */
		if (!user.checkPassword(password))
		{
			this.loginError();
		}
		/* Get JWT settings */
		let token_name = this.settings.getTokenName();
		let jwt_algo = Runtime.rtl.getContext().env(token_name + String("_jwt_algo"));
		let jwt_secret_key = Runtime.rtl.getContext().env(token_name + String("_jwt_secret_key"));
		/* Create JWT */
		let data = this.getUserData(user);
		let jwt = Runtime.Crypt.JWT.encode(data, jwt_secret_key, jwt_algo ? jwt_algo : "HS256");
		/* Check token */
		if (!jwt.isCorrect())
		{
			this.loginError();
		}
		/* Returns token */
		return jwt;
	}
	
	
	/**
	 * Returns user data
	 */
	getUserData(user)
	{
		let data = user.getTokenData();
		data.set("expires", Runtime.DateTime.now().timestamp() + this.settings.getTokenExpires());
		return data;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.settings = null;
	}
	static getClassName(){ return "Runtime.Auth.Api.LoginApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionLogin");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionLogin") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "login"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.Auth.Api.LoginApi"] = Runtime.Auth.Api.LoginApi;