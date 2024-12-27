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
Runtime.XML.Patchers.RemoveAttribute = function()
{
	Runtime.XML.BasePatcher.apply(this, arguments);
};
Runtime.XML.Patchers.RemoveAttribute.prototype = Object.create(Runtime.XML.BasePatcher.prototype);
Runtime.XML.Patchers.RemoveAttribute.prototype.constructor = Runtime.XML.Patchers.RemoveAttribute;
Object.assign(Runtime.XML.Patchers.RemoveAttribute.prototype,
{
	/**
	 * Returns operation types
	 */
	types: function()
	{
		return Runtime.Vector.from(["attr_delete","attr_remove","attribute_delete","attribute_remove","delete_attr","delete_attribute","remove_attr","remove_attribute","deleteAttribute","removeAttribute"]);
	},
	/**
	 * Patch XML with operation
	 */
	patch: function(xml, operation)
	{
		var path = operation.get("path").get(0);
		var name = operation.get("name").get(0);
		if (!path)
		{
			return ;
		}
		if (!name)
		{
			return ;
		}
		var path_value = path.value();
		var name_value = name.value();
		var items = xml.xpath(path_value);
		for (var i = 0; i < items.count(); i++)
		{
			var item = Runtime.rtl.attr(items, i);
			item.removeAttribute(name_value);
		}
	},
});
Object.assign(Runtime.XML.Patchers.RemoveAttribute, Runtime.XML.BasePatcher);
Object.assign(Runtime.XML.Patchers.RemoveAttribute,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.XML.Patchers";
	},
	getClassName: function()
	{
		return "Runtime.XML.Patchers.RemoveAttribute";
	},
	getParentClassName: function()
	{
		return "Runtime.XML.BasePatcher";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.XML.Patchers.RemoveAttribute);
window["Runtime.XML.Patchers.RemoveAttribute"] = Runtime.XML.Patchers.RemoveAttribute;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.XML.Patchers.RemoveAttribute;