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


class PatcherModifyAttribute
{
	static function testAdd1()
	{
		$xml = \Runtime\XML\XML::loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item name=\"test\">2</item>\n\t\t\t\t<item>3</item>\n\t\t\t</root>");
		$operation = \Runtime\XML\XML::loadXml("<operation type=\"edit_attribute\">\n\t\t\t\t<path>/root/item</path>\n                <name>name</name>\n                <value>test2</value>\n\t\t\t</operation>");
		$xml->patch($operation);
		\Runtime\XML\Test\XmlTest::assertEqualXml("Patch xml error", $xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item name=\"test2\">2</item>\n\t\t\t\t<item>3</item>\n\t\t\t</root>");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
	}
	static function getClassName(){ return "Runtime.XML.Test.PatcherModifyAttribute"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("testAdd1");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "testAdd1") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		return null;
	}
}