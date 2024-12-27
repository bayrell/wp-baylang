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
Runtime.XML.Test.XmlTest = function()
{
};
Object.assign(Runtime.XML.Test.XmlTest.prototype,
{
});
Object.assign(Runtime.XML.Test.XmlTest,
{
	/**
	 * Assert xml
	 */
	assertEqualXml: function(message, xml1, xml2, log_xml)
	{
		if (log_xml == undefined) log_xml = true;
		var s1 = xml1.toString(Runtime.Map.from({"indent":false,"output-xml":true}));
		s1 = Runtime.rs.replace("\n", "", s1);
		s1 = Runtime.rs.replace("\t", "", s1);
		s1 = Runtime.rs.lower(s1);
		var s2 = Runtime.rs.replace("\n", "", xml2);
		s2 = Runtime.rs.replace("\t", "", s2);
		s2 = Runtime.rs.lower(s2);
		if (s1 != s2 && log_xml)
		{
			Runtime.io.print(xml1.toString());
		}
		Runtime.rtl.assert(s1 == s2, message);
	},
	testLoadXml: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item1>1</item1>\n\t\t\t\t<item2>2</item2>\n\t\t\t\t<item3><aa>3</aa></item3>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		/* Check load xml */
		Runtime.rtl.assert(xml != null, "XML is null");
		Runtime.rtl.assert(xml instanceof Runtime.XML.XML, "XML load error");
		Runtime.rtl.assert(xml.exists(), "XML does not exists");
		/* Check item1 */
		Runtime.rtl.assert(xml.get("item1").count() == 1, "Item1 count is not correct");
		Runtime.rtl.assert(xml.get("item1").get(0).value() == "1", "Item1 value is not correct");
		/* Check item2 */
		Runtime.rtl.assert(xml.get("item2").count() == 1, "Item2 count is not correct");
		Runtime.rtl.assert(xml.get("item2").get(0).value() == "2", "Item2 value is not correct");
		/* Check name */
		Runtime.rtl.assert(xml.getName() == "root", "Root is not correct");
	},
	testChilds: function()
	{
		var xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item><aa>3</aa></item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").count() == 3, "Wrong count items");
		Runtime.rtl.assert(xml.get("item").get(2).get("aa").get(0).value() == "3", "Wrong item content");
		Runtime.rtl.assert(xml.get("test").get(0).value() == "123", "Wrong test value");
	},
	testIncorrect: function()
	{
		var xml = Runtime.XML.XML.loadXml("<root></root2>");
		Runtime.rtl.assert(!xml.exists(), "Incorrect XML test failed");
	},
	testVersion_1_1: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.1\" encoding=\"UTF-8\" ?><root></root>");
		Runtime.rtl.assert(xml.exists(), "Incorrect XML test failed");
	},
	testCountZero: function()
	{
		var xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").get(0).count() == 0, "Count must be zero");
	},
	testCountOne: function()
	{
		var xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item>\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t</item>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").get(0).count() == 1, "Count must be one");
	},
	testCountTwo: function()
	{
		var xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item>\n\t\t\t\t\t<subitem1>1</subitem1>\n\t\t\t\t\t<subitem2>2</subitem2>\n\t\t\t\t</item>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").get(0).count() == 2, "Count must be two");
	},
	testAttributes1: function()
	{
		var xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item name=\"name1\" test=\"123\">content</item>\n\t\t\t</root>");
		var attrs = xml.get("item").get(0).attributes();
		Runtime.rtl.assert(attrs.get("name") == "name1", "Attribute 'name' is not correct");
		Runtime.rtl.assert(attrs.get("test") == "123", "Attribute 'test' is not correct");
		Runtime.rtl.assert(attrs.keys().count() == 2, "Count attributes must be two");
	},
	testAttributes2: function()
	{
		var xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item name=\"name1\" test=\"123\">content</item>\n\t\t\t</root>");
		var item = xml.get("item").get(0);
		item.removeAttr("test");
		Runtime.rtl.assert(item.attr("name") == "name1", "Attribute 'name' is not correct");
		Runtime.rtl.assert(item.attr("test") == null, "Attribute 'test' is not correct");
		Runtime.rtl.assert(item.attributes().keys().count() == 1, "Count attributes must be one");
		item.addAttr("color", "white");
		Runtime.rtl.assert(item.attr("color") == "white", "Attribute 'color' is not correct");
		Runtime.rtl.assert(item.attributes().keys().count() == 2, "Count attributes must be two");
	},
	testRemoveItem: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t</root>");
		xml.get("item").get(2).remove();
		Runtime.XML.Test.XmlTest.assertEqualXml("Remove xml item error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t</root>");
	},
	testEmptyItem: function()
	{
		var xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").get(0).getName() == "item", "Wrong item");
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.XML.Test";
	},
	getClassName: function()
	{
		return "Runtime.XML.Test.XmlTest";
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
			"testLoadXml",
			"testChilds",
			"testIncorrect",
			"testVersion_1_1",
			"testCountZero",
			"testCountOne",
			"testCountTwo",
			"testAttributes1",
			"testAttributes2",
			"testRemoveItem",
			"testEmptyItem",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "testLoadXml")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testChilds")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testIncorrect")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testVersion_1_1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testCountZero")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testCountOne")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testCountTwo")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAttributes1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAttributes2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testRemoveItem")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testEmptyItem")
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
Runtime.rtl.defClass(Runtime.XML.Test.XmlTest);
window["Runtime.XML.Test.XmlTest"] = Runtime.XML.Test.XmlTest;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.XML.Test.XmlTest;