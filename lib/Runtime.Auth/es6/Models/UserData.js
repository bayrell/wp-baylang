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
Runtime.Auth.Models.UserData = class extends Runtime.BaseObject
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("user", new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()));
	}
	
	
	/**
	 * Create object
	 */
	constructor(user)
	{
		super();
		this.user = user;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.user = null;
	}
	static getClassName(){ return "Runtime.Auth.Models.UserData"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.SerializeInterface"]; }
};
window["Runtime.Auth.Models.UserData"] = Runtime.Auth.Models.UserData;