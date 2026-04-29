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
Runtime.XML.Test.XmlAppend = class
{
	static testAppend1()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		let xml_item = Runtime.XML.XML.loadXml("<item>4</item>");
		xml.append(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Append xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t\t<item>4</item>\n\t\t\t</root>");
	}
	
	
	static testAppend2()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		let xml_item = Runtime.XML.XML.loadXml("<item>\n\t\t\t\t<subitem>1</subitem>\n\t\t\t\t<subitem>2</subitem>\n\t\t\t</item>");
		xml.append(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Append xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t\t<item>\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t\t<subitem>2</subitem>\n\t\t\t\t</item>\n\t\t\t</root>");
	}
	
	
	static testAppend3()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		let xml_item = Runtime.XML.XML.loadXml("<item name=\"test\" color=\"white\">\n\t\t\t\t<subitem>1</subitem>\n\t\t\t\t<subitem>2</subitem>\n\t\t\t</item>");
		xml.append(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Append xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t\t<item name=\"test\" color=\"white\">\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t\t<subitem>2</subitem>\n\t\t\t\t</item>\n\t\t\t</root>");
	}
	
	
	static testAppend4()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		let xml_item = Runtime.XML.XML.loadXml("<first name=\"test\" color=\"white\">4</first>");
		xml.prepend(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Prepend xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<first name=\"test\" color=\"white\">4</first>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
	}
	
	
	static testAppend5()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		let xml_item = Runtime.XML.XML.loadXml("<first name=\"test\" color=\"white\">\n\t\t\t\t<subitem>1</subitem>\n\t\t\t\t<subitem>2</subitem>\n\t\t\t</first>");
		xml.prepend(xml_item);
		Runtime.XML.Test.XmlTest.assertEqualXml("Prepend xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<first name=\"test\" color=\"white\">\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t\t<subitem>2</subitem>\n\t\t\t\t</first>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.XML.Test.XmlAppend"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("testAppend1", "testAppend2", "testAppend3", "testAppend4", "testAppend5");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "testAppend1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testAppend2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testAppend3") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testAppend4") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testAppend5") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.XML.Test.XmlAppend"] = Runtime.XML.Test.XmlAppend;