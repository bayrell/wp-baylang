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
Runtime.XML.Test.PatcherRemoveAttribute = class
{
	static testAdd1()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item name=\"test\">2</item>\n\t\t\t\t<item>3</item>\n\t\t\t</root>");
		let operation = Runtime.XML.XML.loadXml("<operation type=\"remove_attribute\">\n\t\t\t\t<path>/root/item</path>\n                <name>name</name>\n\t\t\t</operation>");
		xml.patch(operation);
		Runtime.XML.Test.XmlTest.assertEqualXml("Patch xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t</root>");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.XML.Test.PatcherRemoveAttribute"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("testAdd1");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "testAdd1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.XML.Test.PatcherRemoveAttribute"] = Runtime.XML.Test.PatcherRemoveAttribute;