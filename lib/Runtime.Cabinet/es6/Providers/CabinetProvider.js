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
if (typeof Runtime.Cabinet == 'undefined') Runtime.Cabinet = {};
if (typeof Runtime.Cabinet.Providers == 'undefined') Runtime.Cabinet.Providers = {};
Runtime.Cabinet.Providers.CabinetProvider = class extends Runtime.Auth.Providers.AuthProvider
{
	static CREATE_MENU = "runtime.cabinet::create_menu";
	
	
	/**
	 * Returns settings name
	 */
	static getSettingsName(){ return "Runtime.Cabinet.Models.CabinetSettings"; }
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		super.register_hooks();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.Cabinet.Providers.CabinetProvider"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Cabinet.Providers.CabinetProvider"] = Runtime.Cabinet.Providers.CabinetProvider;