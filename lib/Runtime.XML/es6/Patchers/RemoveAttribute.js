"use strict;"
/*!
 *  Bayrell Runtime Library
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
if (typeof Runtime.XML == 'undefined') Runtime.XML = {};
if (typeof Runtime.XML.Patchers == 'undefined') Runtime.XML.Patchers = {};
Runtime.XML.Patchers.RemoveAttribute = class extends Runtime.XML.BasePatcher
{
	/**
	 * Returns operation types
	 */
	types()
	{
		return Runtime.Vector.create([
			"attr_delete",
			"attr_remove",
			"attribute_delete",
			"attribute_remove",
			"delete_attr",
			"delete_attribute",
			"remove_attr",
			"remove_attribute",
			"deleteAttribute",
			"removeAttribute",
		]);
	}
	
	
	/**
	 * Patch XML with operation
	 */
	patch(xml, operation)
	{
		let path = operation.get("path").get(0);
		let name = operation.get("name").get(0);
		if (!path) return;
		if (!name) return;
		let path_value = path.value();
		let name_value = name.value();
		let items = xml.xpath(path_value);
		for (let i = 0; i < items.count(); i++)
		{
			let item = items[i];
			item.removeAttribute(name_value);
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.XML.Patchers.RemoveAttribute"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.XML.Patchers.RemoveAttribute"] = Runtime.XML.Patchers.RemoveAttribute;