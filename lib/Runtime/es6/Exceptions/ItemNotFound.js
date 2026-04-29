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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ItemNotFound = class extends Runtime.Exceptions.RuntimeException
{
	constructor(name, object, prev)
	{
		if (name == undefined) name = "";
		if (object == undefined) object = "Item";
		if (prev == undefined) prev = null;
		let message = "";
		if (name != "")
		{
			message = Runtime.rs.format("%object% '%name%' not found", Runtime.Map.create({"name": name, "object": object}));
		}
		else
		{
			message = Runtime.rs.format("%object% not found", Runtime.Map.create({"object": object}));
		}
		super(message, Runtime.rtl.ERROR_ITEM_NOT_FOUND, prev);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.Exceptions.ItemNotFound"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Exceptions.ItemNotFound"] = Runtime.Exceptions.ItemNotFound;