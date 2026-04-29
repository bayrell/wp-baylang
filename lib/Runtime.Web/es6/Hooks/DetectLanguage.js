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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.DetectLanguage = class extends Runtime.Hooks.RuntimeHook
{
	/**
	 * Create hook
	 */
	static hook(params){ return new Runtime.Entity.Hook("Runtime.Web.Hooks.DetectLanguage", params); }
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (!params) return;
		if (params.has("allowed_languages"))
		{
			this.allowed_languages = params.get("allowed_languages");
		}
		if (params.has("default_language"))
		{
			this.default_language = params.get("default_language");
		}
		if (params.has("route_match_name"))
		{
			this.route_match_name = params.get("route_match_name");
		}
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.default_language = "en";
		this.route_match_name = "lang";
		this.allowed_languages = Runtime.Vector.create([]);
	}
	static getClassName(){ return "Runtime.Web.Hooks.DetectLanguage"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Hooks.DetectLanguage"] = Runtime.Web.Hooks.DetectLanguage;