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
Runtime.XML.Test.XmlTest = class
{
	/**
	 * Assert xml
	 */
	static assertEqualXml(message, xml1, xml2, log_xml)
	{
		if (log_xml == undefined) log_xml = true;
		let s1 = xml1.toString(Runtime.Map.create({"indent": false, "output-xml": true}));
		s1 = Runtime.rs.replace("\n", "", s1);
		s1 = Runtime.rs.replace("\t", "", s1);
		s1 = Runtime.rs.lower(s1);
		let s2 = Runtime.rs.replace("\n", "", xml2);
		s2 = Runtime.rs.replace("\t", "", s2);
		s2 = Runtime.rs.lower(s2);
		if (s1 != s2 && log_xml)
		{
			Runtime.io.print(xml1.toString());
		}
		Runtime.rtl.assert(s1 == s2, message);
	}
	
	
	static testLoadXml()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item1>1</item1>\n\t\t\t\t<item2>2</item2>\n\t\t\t\t<item3><aa>3</aa></item3>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
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
	}
	
	
	static testChilds()
	{
		let xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item><aa>3</aa></item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").count() == 3, "Wrong count items");
		Runtime.rtl.assert(xml.get("item").get(2).get("aa").get(0).value() == "3", "Wrong item content");
		Runtime.rtl.assert(xml.get("test").get(0).value() == "123", "Wrong test value");
	}
	
	
	static testIncorrect()
	{
		let xml = Runtime.XML.XML.loadXml("<root></root2>");
		Runtime.rtl.assert(!xml.exists(), "Incorrect XML test failed");
	}
	
	
	static testVersion_1_1()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.1\" encoding=\"UTF-8\" ?><root></root>");
		Runtime.rtl.assert(xml.exists(), "Incorrect XML test failed");
	}
	
	
	static testCountZero()
	{
		let xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").get(0).count() == 0, "Count must be zero");
	}
	
	
	static testCountOne()
	{
		let xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item>\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t</item>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").get(0).count() == 1, "Count must be one");
	}
	
	
	static testCountTwo()
	{
		let xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item>\n\t\t\t\t\t<subitem1>1</subitem1>\n\t\t\t\t\t<subitem2>2</subitem2>\n\t\t\t\t</item>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").get(0).count() == 2, "Count must be two");
	}
	
	
	static testAttributes1()
	{
		let xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item name=\"name1\" test=\"123\">content</item>\n\t\t\t</root>");
		let attrs = xml.get("item").get(0).attributes();
		Runtime.rtl.assert(attrs.get("name") == "name1", "Attribute 'name' is not correct");
		Runtime.rtl.assert(attrs.get("test") == "123", "Attribute 'test' is not correct");
		Runtime.rtl.assert(attrs.keys().count() == 2, "Count attributes must be two");
	}
	
	
	static testAttributes2()
	{
		let xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item name=\"name1\" test=\"123\">content</item>\n\t\t\t</root>");
		let item = xml.get("item").get(0);
		item.removeAttr("test");
		Runtime.rtl.assert(item.attr("name") == "name1", "Attribute 'name' is not correct");
		Runtime.rtl.assert(item.attr("test") == null, "Attribute 'test' is not correct");
		Runtime.rtl.assert(item.attributes().keys().count() == 1, "Count attributes must be one");
		item.addAttr("color", "white");
		Runtime.rtl.assert(item.attr("color") == "white", "Attribute 'color' is not correct");
		Runtime.rtl.assert(item.attributes().keys().count() == 2, "Count attributes must be two");
	}
	
	
	static testRemoveItem()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t</root>");
		xml.get("item").get(2).remove();
		Runtime.XML.Test.XmlTest.assertEqualXml("Remove xml item error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t</root>");
	}
	
	
	static testEmptyItem()
	{
		let xml = Runtime.XML.XML.loadXml("<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		Runtime.rtl.assert(xml.get("item").get(0).getName() == "item", "Wrong item");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.XML.Test.XmlTest"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("testLoadXml", "testChilds", "testIncorrect", "testVersion_1_1", "testCountZero", "testCountOne", "testCountTwo", "testAttributes1", "testAttributes2", "testRemoveItem", "testEmptyItem");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "testLoadXml") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testChilds") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testIncorrect") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testVersion_1_1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testCountZero") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testCountOne") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testCountTwo") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testAttributes1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testAttributes2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testRemoveItem") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testEmptyItem") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.XML.Test.XmlTest"] = Runtime.XML.Test.XmlTest;