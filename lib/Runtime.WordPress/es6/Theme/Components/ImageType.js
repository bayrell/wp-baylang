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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Components == 'undefined') Runtime.WordPress.Theme.Components = {};
Runtime.WordPress.Theme.Components.ImageType = class extends Runtime.BaseObject
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("id", new Runtime.Serializer.IntegerType());
		rules.addType("width", new Runtime.Serializer.IntegerType());
		rules.addType("height", new Runtime.Serializer.IntegerType());
		rules.addType("file", new Runtime.Serializer.StringType());
		rules.addType("sizes", new Runtime.Serializer.MapType(new Runtime.Serializer.MapType(Runtime.Map.create({
			"size": new Runtime.Serializer.StringType(),
			"file": new Runtime.Serializer.StringType(),
			"width": new Runtime.Serializer.IntegerType(),
			"height": new Runtime.Serializer.IntegerType(),
			"mime_type": new Runtime.Serializer.StringType(),
		}))));
	}
	
	
	/**
	 * Returns image by size name
	 */
	getImage(size_name)
	{
		if (!this.sizes.has(size_name)) return this.file;
		return this.sizes.get(size_name).get("file");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.id = 0;
		this.width = 0;
		this.height = 0;
		this.file = "";
		this.sizes = null;
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Components.ImageType"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.SerializeInterface"]; }
};
window["Runtime.WordPress.Theme.Components.ImageType"] = Runtime.WordPress.Theme.Components.ImageType;