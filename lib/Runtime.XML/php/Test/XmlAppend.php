<?php
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
namespace Runtime\XML\Test;

use Runtime\io;
use Runtime\Unit\Test;
use Runtime\XML\XML;
use Runtime\XML\Test\XmlTest;


class XmlAppend
{
	static function testAppend1()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		$xml_item = \Runtime\XML\XML::loadXml("<item>4</item>");
		$xml->append($xml_item);
		\Runtime\XML\Test\XmlTest::assertEqualXml("Append xml error", $xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t\t<item>4</item>\n\t\t\t</root>");
	}
	
	
	
	static function testAppend2()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		$xml_item = \Runtime\XML\XML::loadXml("<item>\n\t\t\t\t<subitem>1</subitem>\n\t\t\t\t<subitem>2</subitem>\n\t\t\t</item>");
		$xml->append($xml_item);
		\Runtime\XML\Test\XmlTest::assertEqualXml("Append xml error", $xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t\t<item>\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t\t<subitem>2</subitem>\n\t\t\t\t</item>\n\t\t\t</root>");
	}
	
	
	
	static function testAppend3()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		$xml_item = \Runtime\XML\XML::loadXml("<item name=\"test\" color=\"white\">\n\t\t\t\t<subitem>1</subitem>\n\t\t\t\t<subitem>2</subitem>\n\t\t\t</item>");
		$xml->append($xml_item);
		\Runtime\XML\Test\XmlTest::assertEqualXml("Append xml error", $xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t\t<item name=\"test\" color=\"white\">\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t\t<subitem>2</subitem>\n\t\t\t\t</item>\n\t\t\t</root>");
	}
	
	
	
	static function testAppend4()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		$xml_item = \Runtime\XML\XML::loadXml("<first name=\"test\" color=\"white\">4</first>");
		$xml->prepend($xml_item);
		\Runtime\XML\Test\XmlTest::assertEqualXml("Prepend xml error", $xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<first name=\"test\" color=\"white\">4</first>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
	}
	
	
	
	static function testAppend5()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		$xml_item = \Runtime\XML\XML::loadXml("<first name=\"test\" color=\"white\">\n\t\t\t\t<subitem>1</subitem>\n\t\t\t\t<subitem>2</subitem>\n\t\t\t</first>");
		$xml->prepend($xml_item);
		\Runtime\XML\Test\XmlTest::assertEqualXml("Prepend xml error", $xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<first name=\"test\" color=\"white\">\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t\t<subitem>2</subitem>\n\t\t\t\t</first>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
	}
	static function getClassName(){ return "Runtime.XML.Test.XmlAppend"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("testAppend1", "testAppend2", "testAppend3", "testAppend4", "testAppend5");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "testAppend1") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testAppend2") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testAppend3") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testAppend4") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testAppend5") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		return null;
	}
}