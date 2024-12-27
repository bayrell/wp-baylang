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
class YamlTest
{
	/**
	 * Check if yaml is correct
	 */
	static function assertYaml($xml, $d1, $variables=null, $log_yaml=true)
	{
		$converter = new \Runtime\XML\YamlConverter($xml, $variables);
		$d2 = $converter->toDict();
		try
		{
			
			\Runtime\Unit\AssertHelper::equalDict($d1, $d2, "Yaml");
		}
		catch (\Exception $_ex)
		{
			if (true)
			{
				$e = $_ex;
				if ($log_yaml)
				{
					\Runtime\io::print($converter->convert());
				}
				throw $e;
			}
			else
			{
				throw $_ex;
			}
		}
	}
	static function test1()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item1>1</item1>\n\t\t\t\t<item2>2</item2>\n\t\t\t\t<item3>3</item3>\n\t\t\t</root>");
		$result = \Runtime\Map::from(["item1"=>"1","item2"=>"2","item3"=>"3"]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	static function test2()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<item>4</item>\n\t\t\t</root>");
		$result = \Runtime\Map::from(["item"=>\Runtime\Vector::from(["1","2","3","4"])]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	static function testEmptyItem()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		$result = \Runtime\Map::from(["item"=>""]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	static function testInteger()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item type=\"int\">1</item>\n\t\t\t</root>");
		$result = \Runtime\Map::from(["item"=>1]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	static function testBoolean()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item type=\"boolean\">1</item>\n\t\t\t</root>");
		$result = \Runtime\Map::from(["item"=>true]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	static function testArray()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<volumes array=\"true\">/home/ubuntu:/home/ubuntu</volumes>\n\t\t\t</root>");
		$result = \Runtime\Map::from(["volumes"=>\Runtime\Vector::from(["/home/ubuntu:/home/ubuntu"])]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	static function testMap()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<volumes type=\"map\"></volumes>\n\t\t\t</root>");
		$result = \Runtime\Map::from(["volumes"=>\Runtime\Map::from([])]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	static function testData1()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<image>test_image</image>\n\t\t\t\t<volumes array=\"true\">database_data:/data</volumes>\n\t\t\t</root>");
		$result = \Runtime\Map::from(["image"=>"test_image","volumes"=>\Runtime\Vector::from(["database_data:/data"])]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	static function testData2()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>test_image</image>\n\t\t\t\t\t\t\t<volumes array=\"true\">database_data:/data</volumes>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t</services>\n\t\t\t\t\t<volumes>\n\t\t\t\t\t\t<database_data type=\"map\" />\n\t\t\t\t\t</volumes>\n\t\t\t\t</yaml>\n\t\t\t</root>");
		$result = \Runtime\Map::from(["yaml"=>\Runtime\Map::from(["services"=>\Runtime\Map::from(["database"=>\Runtime\Map::from(["image"=>"test_image","volumes"=>\Runtime\Vector::from(["database_data:/data"])])]),"volumes"=>\Runtime\Map::from(["database_data"=>\Runtime\Map::from([])])])]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	static function testVariables()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<_var_app_name_>\n\t\t\t\t\t\t\t<image>_var_image_</image>\n\t\t\t\t\t\t\t<volumes array=\"true\">_var_app_name__data:/data</volumes>\n\t\t\t\t\t\t</_var_app_name_>\n\t\t\t\t\t</services>\n\t\t\t\t\t<volumes type=\"map\">\n\t\t\t\t\t\t<_var_app_name__data type=\"map\" />\n\t\t\t\t\t</volumes>\n\t\t\t\t</yaml>\n\t\t\t</root>");
		$variables = \Runtime\Map::from(["_var_app_name_"=>"database","_var_image_"=>"test_image"]);
		$result = \Runtime\Map::from(["yaml"=>\Runtime\Map::from(["services"=>\Runtime\Map::from(["database"=>\Runtime\Map::from(["image"=>"test_image","volumes"=>\Runtime\Vector::from(["database_data:/data"])])]),"volumes"=>\Runtime\Map::from(["database_data"=>\Runtime\Map::from([])])])]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result, $variables);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.XML.Test";
	}
	static function getClassName()
	{
		return "Runtime.XML.Test.YamlTest";
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
			"test1",
			"test2",
			"testEmptyItem",
			"testInteger",
			"testBoolean",
			"testArray",
			"testMap",
			"testData1",
			"testData2",
			"testVariables",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "test1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test2")
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
		if ($field_name == "testInteger")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testBoolean")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testArray")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testMap")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testData1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testData2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testVariables")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		return null;
	}
}