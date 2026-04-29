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
if (typeof Runtime.Cabinet.Models == 'undefined') Runtime.Cabinet.Models = {};
Runtime.Cabinet.Models.CabinetSettings = class extends Runtime.Auth.Models.UserSettings
{
	/**
	 * Returns api name
	 */
	getApiName(){ return "cabinet:auth"; }
	
	
	/**
	 * Returns token name
	 */
	getTokenName(){ return "cabinet_auth"; }
	
	
	/**
	 * Returns url name
	 */
	getUrlName(){ return "cabinet"; }
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.Cabinet.Models.CabinetSettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Cabinet.Models.CabinetSettings"] = Runtime.Cabinet.Models.CabinetSettings;