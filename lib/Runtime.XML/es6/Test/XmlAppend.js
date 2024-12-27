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
Runtime.XML.Test.XmlAppend = function()
{
};
Object.assign(Runtime.XML.Test.XmlAppend.prototype,
{
});
Object.assign(Runtime.XML.Test.XmlAppend,
{
	testAppend1: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		var xml_item = Runtime.XML.XML.loadXml("<item>4</item>");
		xml.append(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Append xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t\t<item>4</item>\n\t\t\t</root>");
	},
	testAppend2: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		var xml_item = Runtime.XML.XML.loadXml("<item>\n\t\t\t\t<subitem>1</subitem>\n\t\t\t\t<subitem>2</subitem>\n\t\t\t</item>");
		xml.append(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Append xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t\t<item>\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t\t<subitem>2</subitem>\n\t\t\t\t</item>\n\t\t\t</root>");
	},
	testAppend3: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		var xml_item = Runtime.XML.XML.loadXml("<item name=\"test\" color=\"white\">\n\t\t\t\t<subitem>1</subitem>\n\t\t\t\t<subitem>2</subitem>\n\t\t\t</item>");
		xml.append(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Append xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t\t<item name=\"test\" color=\"white\">\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t\t<subitem>2</subitem>\n\t\t\t\t</item>\n\t\t\t</root>");
	},
	testAppend4: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		var xml_item = Runtime.XML.XML.loadXml("<first name=\"test\" color=\"white\">4</first>");
		xml.prepend(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Prepend xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<first name=\"test\" color=\"white\">4</first>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
	},
	testAppend5: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		var xml_item = Runtime.XML.XML.loadXml("<first name=\"test\" color=\"white\">\n\t\t\t\t<subitem>1</subitem>\n\t\t\t\t<subitem>2</subitem>\n\t\t\t</first>");
		xml.prepend(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Prepend xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<first name=\"test\" color=\"white\">\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t\t<subitem>2</subitem>\n\t\t\t\t</first>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.XML.Test";
	},
	getClassName: function()
	{
		return "Runtime.XML.Test.XmlAppend";
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
			"testAppend1",
			"testAppend2",
			"testAppend3",
			"testAppend4",
			"testAppend5",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "testAppend1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAppend2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAppend3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAppend4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAppend5")
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
Runtime.rtl.defClass(Runtime.XML.Test.XmlAppend);
window["Runtime.XML.Test.XmlAppend"] = Runtime.XML.Test.XmlAppend;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.XML.Test.XmlAppend;