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
class XmlTest
{
	/**
	 * Assert xml
	 */
	static function assertEqualXml($message, $xml1, $xml2, $log_xml=true)
	{
		$s1 = $xml1->toString(\Runtime\Map::from(["indent"=>false,"output-xml"=>true]));
		$s1 = \Runtime\rs::replace("\n", "", $s1);
		$s1 = \Runtime\rs::replace("\t", "", $s1);
		$s1 = \Runtime\rs::lower($s1);
		$s2 = \Runtime\rs::replace("\n", "", $xml2);
		$s2 = \Runtime\rs::replace("\t", "", $s2);
		$s2 = \Runtime\rs::lower($s2);
		if ($s1 != $s2 && $log_xml)
		{
			\Runtime\io::print($xml1->toString());
		}
		\Runtime\rtl::assert($s1 == $s2, $message);
	}
	static function testLoadXml()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item1>1</item1>\n\t\t\t\t<item2>2</item2>\n\t\t\t\t<item3><aa>3</aa></item3>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		/* Check load xml */
		\Runtime\rtl::assert($xml != null, "XML is null");
		\Runtime\rtl::assert($xml instanceof \Runtime\XML\XML, "XML load error");
		\Runtime\rtl::assert($xml->exists(), "XML does not exists");
		/* Check item1 */
		\Runtime\rtl::assert($xml->get("item1")->count() == 1, "Item1 count is not correct");
		\Runtime\rtl::assert($xml->get("item1")->get(0)->value() == "1", "Item1 value is not correct");
		/* Check item2 */
		\Runtime\rtl::assert($xml->get("item2")->count() == 1, "Item2 count is not correct");
		\Runtime\rtl::assert($xml->get("item2")->get(0)->value() == "2", "Item2 value is not correct");
		/* Check name */
		\Runtime\rtl::assert($xml->getName() == "root", "Root is not correct");
	}
	static function testChilds()
	{
		$xml = \Runtime\XML\XML::loadXml("<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item><aa>3</aa></item>\n\t\t\t\t<test>123</test>\n\t\t\t</root>");
		\Runtime\rtl::assert($xml->get("item")->count() == 3, "Wrong count items");
		\Runtime\rtl::assert($xml->get("item")->get(2)->get("aa")->get(0)->value() == "3", "Wrong item content");
		\Runtime\rtl::assert($xml->get("test")->get(0)->value() == "123", "Wrong test value");
	}
	static function testIncorrect()
	{
		$xml = \Runtime\XML\XML::loadXml("<root></root2>");
		\Runtime\rtl::assert(!$xml->exists(), "Incorrect XML test failed");
	}
	static function testVersion_1_1()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.1\" encoding=\"UTF-8\" ?><root></root>");
		\Runtime\rtl::assert($xml->exists(), "Incorrect XML test failed");
	}
	static function testCountZero()
	{
		$xml = \Runtime\XML\XML::loadXml("<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		\Runtime\rtl::assert($xml->get("item")->get(0)->count() == 0, "Count must be zero");
	}
	static function testCountOne()
	{
		$xml = \Runtime\XML\XML::loadXml("<root>\n\t\t\t\t<item>\n\t\t\t\t\t<subitem>1</subitem>\n\t\t\t\t</item>\n\t\t\t</root>");
		\Runtime\rtl::assert($xml->get("item")->get(0)->count() == 1, "Count must be one");
	}
	static function testCountTwo()
	{
		$xml = \Runtime\XML\XML::loadXml("<root>\n\t\t\t\t<item>\n\t\t\t\t\t<subitem1>1</subitem1>\n\t\t\t\t\t<subitem2>2</subitem2>\n\t\t\t\t</item>\n\t\t\t</root>");
		\Runtime\rtl::assert($xml->get("item")->get(0)->count() == 2, "Count must be two");
	}
	static function testAttributes1()
	{
		$xml = \Runtime\XML\XML::loadXml("<root>\n\t\t\t\t<item name=\"name1\" test=\"123\">content</item>\n\t\t\t</root>");
		$attrs = $xml->get("item")->get(0)->attributes();
		\Runtime\rtl::assert($attrs->get("name") == "name1", "Attribute 'name' is not correct");
		\Runtime\rtl::assert($attrs->get("test") == "123", "Attribute 'test' is not correct");
		\Runtime\rtl::assert($attrs->keys()->count() == 2, "Count attributes must be two");
	}
	static function testAttributes2()
	{
		$xml = \Runtime\XML\XML::loadXml("<root>\n\t\t\t\t<item name=\"name1\" test=\"123\">content</item>\n\t\t\t</root>");
		$item = $xml->get("item")->get(0);
		$item->removeAttr("test");
		\Runtime\rtl::assert($item->attr("name") == "name1", "Attribute 'name' is not correct");
		\Runtime\rtl::assert($item->attr("test") == null, "Attribute 'test' is not correct");
		\Runtime\rtl::assert($item->attributes()->keys()->count() == 1, "Count attributes must be one");
		$item->addAttr("color", "white");
		\Runtime\rtl::assert($item->attr("color") == "white", "Attribute 'color' is not correct");
		\Runtime\rtl::assert($item->attributes()->keys()->count() == 2, "Count attributes must be two");
	}
	static function testRemoveItem()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t</root>");
		$xml->get("item")->get(2)->remove();
		\Runtime\XML\Test\XmlTest::assertEqualXml("Remove xml item error", $xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t</root>");
	}
	static function testEmptyItem()
	{
		$xml = \Runtime\XML\XML::loadXml("<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		\Runtime\rtl::assert($xml->get("item")->get(0)->getName() == "item", "Wrong item");
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.XML.Test";
	}
	static function getClassName()
	{
		return "Runtime.XML.Test.XmlTest";
	}
	static function getParentClassName()
	{
		return "";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
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
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "testLoadXml")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testChilds")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testIncorrect")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testVersion_1_1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testCountZero")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testCountOne")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testCountTwo")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAttributes1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAttributes2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testRemoveItem")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testEmptyItem")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		return null;
	}
}