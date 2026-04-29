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
Runtime.Web.Assets = class extends Runtime.BaseObject
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("path", new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()));
	}
	
	
	/**
	 * Returns path
	 */
	get(library, path)
	{
		let library_path = this.path.get(library, "");
		return Runtime.rs.join("/", Runtime.Vector.create([library_path, path]));
	}
	
	
	/**
	 * Register library
	 */
	register(library, path)
	{
		this.path.set(library, path);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.path = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Web.Assets"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.SerializeInterface"]; }
};
window["Runtime.Web.Assets"] = Runtime.Web.Assets;