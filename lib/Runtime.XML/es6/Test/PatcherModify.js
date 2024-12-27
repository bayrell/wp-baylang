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
if (typeof Runtime.XML.Test == 'undefined') Runtime.XML.Test = {};
Runtime.XML.Test.PatcherModify = function()
{
};
Object.assign(Runtime.XML.Test.PatcherModify.prototype,
{
});
Object.assign(Runtime.XML.Test.PatcherModify,
{
	testModify1: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<template>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<test>\n\t\t\t\t\t\t\t<image>test</image>\n\t\t\t\t\t\t</test>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>database</image>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t\t<other>\n\t\t\t\t\t\t\t<image>other</image>\n\t\t\t\t\t\t\t<dns>192.168.1.1</dns>\n\t\t\t\t\t\t</other>\n\t\t\t\t\t</services>\n\t\t\t\t</yaml>\n\t\t\t</template>");
		var operation = Runtime.XML.XML.loadXml("<operation type=\"edit\">\n\t\t\t\t<path>/template/yaml/services/database</path>\n\t\t\t\t<value>\n\t\t\t\t\t<database name=\"name1\">\n\t\t\t\t\t\t<image>database2</image>\n\t\t\t\t\t</database>\n\t\t\t\t</value>\n\t\t\t</operation>");
		xml.patch(operation);
		Runtime.XML.Test.XmlTest.assertEqualXml("Patch xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<template>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<test>\n\t\t\t\t\t\t\t<image>test</image>\n\t\t\t\t\t\t</test>\n\t\t\t\t\t\t<database name=\"name1\">\n\t\t\t\t\t\t\t<image>database2</image>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t\t<other>\n\t\t\t\t\t\t\t<image>other</image>\n\t\t\t\t\t\t\t<dns>192.168.1.1</dns>\n\t\t\t\t\t\t</other>\n\t\t\t\t\t</services>\n\t\t\t\t</yaml>\n\t\t\t</template>");
	},
	testModify2: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<template>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<test>\n\t\t\t\t\t\t\t<image>test</image>\n\t\t\t\t\t\t</test>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>database</image>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t</services>\n\t\t\t\t</yaml>\n\t\t\t</template>");
		var operation1 = Runtime.XML.XML.loadXml("<operation type=\"add\" priority=\"-1000\">\n\t\t\t  <path>/template/yaml/services/*[not(dns)]</path>\n\t\t\t  <value>\n\t\t\t\t<dns array=\"true\">172.18.0.1</dns>\n\t\t\t  </value>\n\t\t\t</operation>");
		xml.patch(operation1);
		var operation2 = Runtime.XML.XML.loadXml("<operation type=\"edit\">\n\t\t\t\t<path>/template/yaml/services/*/dns</path>\n\t\t\t\t<value>\n\t\t\t\t\t<dns>172.30.0.1</dns>\n\t\t\t\t</value>\n\t\t\t</operation>");
		xml.patch(operation2);
		Runtime.XML.Test.XmlTest.assertEqualXml("Patch xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<template>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<test>\n\t\t\t\t\t\t\t<image>test</image>\n\t\t\t\t\t\t\t<dns>172.30.0.1</dns>\n\t\t\t\t\t\t</test>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>database</image>\n\t\t\t\t\t\t\t<dns>172.30.0.1</dns>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t</services>\n\t\t\t\t</yaml>\n\t\t\t</template>");
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.XML.Test";
	},
	getClassName: function()
	{
		return "Runtime.XML.Test.PatcherModify";
	},
	getParentClassName: function()
	{
		return "";
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
			"testModify1",
			"testModify2",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "testModify1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testModify2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Runtime.XML.Test.PatcherModify);
window["Runtime.XML.Test.PatcherModify"] = Runtime.XML.Test.PatcherModify;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.XML.Test.PatcherModify;