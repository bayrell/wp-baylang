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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.FormSettings == 'undefined') Runtime.WordPress.Admin.FormSettings = {};
Runtime.WordPress.Admin.FormSettings.FormItem = class extends Runtime.SerializeObject
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("id", new Runtime.Serializer.IntegerType());
		rules.addType("name", new Runtime.Serializer.StringType());
		rules.addType("api_name", new Runtime.Serializer.StringType());
		rules.addType("email_to", new Runtime.Serializer.StringType());
		rules.addType("settings", new Runtime.Serializer.MapType(Runtime.Map.create({
			"fields": new Runtime.Serializer.VectorType(new Runtime.Serializer.MapType(Runtime.Map.create({
				"name": new Runtime.Serializer.StringType(),
				"type": new Runtime.Serializer.StringType(),
				"title": new Runtime.Serializer.StringType(),
				"placeholder": new Runtime.Serializer.StringType(),
				"required": new Runtime.Serializer.StringType(),
			}))),
		})));
	}
	
	
	/**
	 * Returns primary rules
	 */
	static getPrimaryRules()
	{
		return new Runtime.Serializer.MapType(Runtime.Map.create({
			"id": new Runtime.Serializer.IntegerType(),
		}));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.id = 0;
		this.name = "";
		this.api_name = "";
		this.email_to = "";
		this.settings = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.WordPress.Admin.FormSettings.FormItem"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.FormSettings.FormItem"] = Runtime.WordPress.Admin.FormSettings.FormItem;