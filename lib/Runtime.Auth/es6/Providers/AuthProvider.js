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
if (typeof Runtime.Auth == 'undefined') Runtime.Auth = {};
if (typeof Runtime.Auth.Providers == 'undefined') Runtime.Auth.Providers = {};
Runtime.Auth.Providers.AuthProvider = class extends Runtime.BaseProvider
{
	/**
	 * Returns settings name
	 */
	static getSettingsName(){ return "Runtime.Auth.Models.UserSettings"; }
	
	
	/**
	 * Setup hook params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("settings"))
		{
			this.settings = params.get("settings");
		}
	}
	
	
	/**
	 * Returns provider name
	 */
	static getProviderName(){ return this.getClassName(); }
	
	
	/**
	 * Create hook
	 */
	static hook(settings_name)
	{
		if (settings_name == undefined) settings_name = "";
		return new Runtime.Entity.Provider(this.getProviderName(), this.getClassName(), Runtime.Map.create({
			"settings": Runtime.rtl.newInstance(settings_name ? settings_name : this.getSettingsName()),
		}));
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		super.register_hooks();
	}
	
	
	/**
	 * Disable login
	 */
	disableLogin()
	{
		this.enable_login = false;
		let url_name = this.settings.getUrlName();
		let routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteProvider");
		routes.removeRoute(url_name + String(":login"));
		routes.removeRoute(url_name + String(":logout"));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.settings = null;
		this.enable_login = true;
	}
	static getClassName(){ return "Runtime.Auth.Providers.AuthProvider"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Auth.Providers.AuthProvider"] = Runtime.Auth.Providers.AuthProvider;