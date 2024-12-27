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
if (typeof Runtime.XML == 'undefined') Runtime.XML = {};
if (typeof Runtime.XML.Patchers == 'undefined') Runtime.XML.Patchers = {};
Runtime.XML.Patchers.Modify = function()
{
	Runtime.XML.BasePatcher.apply(this, arguments);
};
Runtime.XML.Patchers.Modify.prototype = Object.create(Runtime.XML.BasePatcher.prototype);
Runtime.XML.Patchers.Modify.prototype.constructor = Runtime.XML.Patchers.Modify;
Object.assign(Runtime.XML.Patchers.Modify.prototype,
{
	/**
	 * Returns operation types
	 */
	types: function()
	{
		return Runtime.Vector.from(["edit","modify","replace"]);
	},
	/**
	 * Patch XML with operation
	 */
	patch: function(xml, operation)
	{
		var path = operation.get("path").get(0);
		var value = operation.get("value").get(0);
		if (!path)
		{
			return ;
		}
		var path_value = path.value();
		var items = xml.xpath(path_value);
		for (var i = 0; i < items.count(); i++)
		{
			var item = Runtime.rtl.attr(items, i);
			var item_name = item.getName();
			var item_new = value.get(item_name).get(0);
			if (item_new)
			{
				item.removeChilds();
				item.removeAttributes();
				item.setValue(item_new.value());
				item.appendItems(item_new.childs());
				item.addAttributes(item_new.attributes());
			}
		}
	},
});
Object.assign(Runtime.XML.Patchers.Modify, Runtime.XML.BasePatcher);
Object.assign(Runtime.XML.Patchers.Modify,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.XML.Patchers";
	},
	getClassName: function()
	{
		return "Runtime.XML.Patchers.Modify";
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
Runtime.rtl.defClass(Runtime.XML.Patchers.Modify);
window["Runtime.XML.Patchers.Modify"] = Runtime.XML.Patchers.Modify;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.XML.Patchers.Modify;