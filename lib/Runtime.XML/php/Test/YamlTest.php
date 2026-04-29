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
use Runtime\Unit\AssertHelper;
use Runtime\Unit\Test;
use Runtime\XML\XML;
use Runtime\XML\YamlConverter;


class YamlTest
{
	/**
	 * Check if yaml is correct
	 */
	static function assertYaml($xml, $d1, $variables = null, $log_yaml = true)
	{
		$converter = new \Runtime\XML\YamlConverter($xml, $variables);
		$d2 = $converter->toDict();
		try
		{
			\Runtime\Unit\AssertHelper::equalDict($d1, $d2, "Yaml");
		}
		catch (\Exception $e)
		{
			if ($log_yaml)
			{
				\Runtime\io::print($converter->convert());
			}
			throw $e;
		}
	}
	
	
	
	static function test1()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item1>1</item1>\n\t\t\t\t<item2>2</item2>\n\t\t\t\t<item3>3</item3>\n\t\t\t</root>");
		$result = new \Runtime\Map([
			"item1" => "1",
			"item2" => "2",
			"item3" => "3",
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	
	
	
	static function test2()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<item>4</item>\n\t\t\t</root>");
		$result = new \Runtime\Map([
			"item" => new \Runtime\Vector(
				"1",
				"2",
				"3",
				"4",
			),
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	
	
	
	static function testEmptyItem()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		$result = new \Runtime\Map([
			"item" => "",
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	
	
	
	static function testInteger()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item type=\"int\">1</item>\n\t\t\t</root>");
		$result = new \Runtime\Map([
			"item" => 1,
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	
	
	
	static function testBoolean()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item type=\"boolean\">1</item>\n\t\t\t</root>");
		$result = new \Runtime\Map([
			"item" => true,
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	
	
	
	static function testArray()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<volumes array=\"true\">/home/ubuntu:/home/ubuntu</volumes>\n\t\t\t</root>");
		$result = new \Runtime\Map([
			"volumes" => new \Runtime\Vector(
				"/home/ubuntu:/home/ubuntu",
			),
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	
	
	
	static function testMap()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<volumes type=\"map\"></volumes>\n\t\t\t</root>");
		$result = new \Runtime\Map([
			"volumes" => new \Runtime\Map([
			]),
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	
	
	
	static function testData1()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<image>test_image</image>\n\t\t\t\t<volumes array=\"true\">database_data:/data</volumes>\n\t\t\t</root>");
		$result = new \Runtime\Map([
			"image" => "test_image",
			"volumes" => new \Runtime\Vector(
				"database_data:/data",
			),
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	
	
	
	static function testData2()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>test_image</image>\n\t\t\t\t\t\t\t<volumes array=\"true\">database_data:/data</volumes>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t</services>\n\t\t\t\t\t<volumes>\n\t\t\t\t\t\t<database_data type=\"map\" />\n\t\t\t\t\t</volumes>\n\t\t\t\t</yaml>\n\t\t\t</root>");
		$result = new \Runtime\Map([
			"yaml" => new \Runtime\Map([
				"services" => new \Runtime\Map([
					"database" => new \Runtime\Map([
						"image" => "test_image",
						"volumes" => new \Runtime\Vector(
							"database_data:/data",
						),
					]),
				]),
				"volumes" => new \Runtime\Map([
					"database_data" => new \Runtime\Map(),
				]),
			]),
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result);
	}
	
	
	
	static function testVariables()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<_var_app_name_>\n\t\t\t\t\t\t\t<image>_var_image_</image>\n\t\t\t\t\t\t\t<volumes array=\"true\">_var_app_name__data:/data</volumes>\n\t\t\t\t\t\t</_var_app_name_>\n\t\t\t\t\t</services>\n\t\t\t\t\t<volumes type=\"map\">\n\t\t\t\t\t\t<_var_app_name__data type=\"map\" />\n\t\t\t\t\t</volumes>\n\t\t\t\t</yaml>\n\t\t\t</root>");
		$variables = new \Runtime\Map([
			"_var_app_name_" => "database",
			"_var_image_" => "test_image",
		]);
		$result = new \Runtime\Map([
			"yaml" => new \Runtime\Map([
				"services" => new \Runtime\Map([
					"database" => new \Runtime\Map([
						"image" => "test_image",
						"volumes" => new \Runtime\Vector(
							"database_data:/data",
						),
					]),
				]),
				"volumes" => new \Runtime\Map([
					"database_data" => new \Runtime\Map(),
				]),
			]),
		]);
		\Runtime\XML\Test\YamlTest::assertYaml($xml, $result, $variables);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
	}
	static function getClassName(){ return "Runtime.XML.Test.YamlTest"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("test1", "test2", "testEmptyItem", "testInteger", "testBoolean", "testArray", "testMap", "testData1", "testData2", "testVariables");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "test1") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "test2") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testEmptyItem") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testInteger") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testBoolean") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testArray") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testMap") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testData1") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testData2") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "testVariables") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		return null;
	}
}