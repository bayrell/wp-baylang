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
if (typeof Runtime.Test == 'undefined') Runtime.Test = {};
if (typeof Runtime.Test.Serialize == 'undefined') Runtime.Test.Serialize = {};
if (typeof Runtime.Test.Serialize.Data == 'undefined') Runtime.Test.Serialize.Data = {};
Runtime.Test.Serialize.Data.ContactPhone = class extends Runtime.BaseObject
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("kind", new Runtime.Serializer.ConstantType("phone"));
		rules.addType("phone", new Runtime.Serializer.StringType());
	}
	
	
	/**
	 * Assign rules
	 */
	assignRules(rules)
	{
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.kind = "phone";
		this.phone = "";
	}
	static getClassName(){ return "Runtime.Test.Serialize.Data.ContactPhone"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.Test.Serialize.Data.Contact","Runtime.SerializeInterface"]; }
};
window["Runtime.Test.Serialize.Data.ContactPhone"] = Runtime.Test.Serialize.Data.ContactPhone;