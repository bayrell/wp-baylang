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
Runtime.XML.Test.PatcherAppend = class
{
	static testAdd1()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<template>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<test>\n\t\t\t\t\t\t\t<image>test</image>\n\t\t\t\t\t\t</test>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>database</image>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t\t<other>\n\t\t\t\t\t\t\t<image>other</image>\n\t\t\t\t\t\t\t<dns>192.168.1.1</dns>\n\t\t\t\t\t\t</other>\n\t\t\t\t\t</services>\n\t\t\t\t</yaml>\n\t\t\t</template>");
		let operation = Runtime.XML.XML.loadXml("<operation type=\"add\">\n\t\t\t\t<path>/template/yaml/services/*[not(dns)]</path>\n\t\t\t\t<value>\n\t\t\t\t\t<dns>172.30.0.1</dns>\n\t\t\t\t</value>\n\t\t\t</operation>");
		xml.patch(operation);
		Runtime.XML.Test.XmlTest.assertEqualXml("Patch xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<template>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<test>\n\t\t\t\t\t\t\t<image>test</image>\n\t\t\t\t\t\t\t<dns>172.30.0.1</dns>\n\t\t\t\t\t\t</test>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>database</image>\n\t\t\t\t\t\t\t<dns>172.30.0.1</dns>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t\t<other>\n\t\t\t\t\t\t\t<image>other</image>\n\t\t\t\t\t\t\t<dns>192.168.1.1</dns>\n\t\t\t\t\t\t</other>\n\t\t\t\t\t</services>\n\t\t\t\t</yaml>\n\t\t\t</template>");
	}
	
	
	static testAdd2()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<template>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<test>\n\t\t\t\t\t\t\t<image>test</image>\n\t\t\t\t\t\t</test>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>database</image>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t\t<other>\n\t\t\t\t\t\t\t<image>other</image>\n\t\t\t\t\t\t\t<dns>192.168.1.1</dns>\n\t\t\t\t\t\t</other>\n\t\t\t\t\t</services>\n\t\t\t\t</yaml>\n\t\t\t</template>");
		let operation = Runtime.XML.XML.loadXml("<operation type=\"add\" position=\"first\">\n\t\t\t\t<path>/template/yaml[not(version)]</path>\n\t\t\t\t<value>\n\t\t\t\t\t<version>3.7</version>\n\t\t\t\t</value>\n\t\t\t</operation>");
		xml.patch(operation);
		Runtime.XML.Test.XmlTest.assertEqualXml("Patch xml error", xml, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t<template>\n\t\t\t\t<yaml>\n\t\t\t\t\t<version>3.7</version>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<test>\n\t\t\t\t\t\t\t<image>test</image>\n\t\t\t\t\t\t</test>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>database</image>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t\t<other>\n\t\t\t\t\t\t\t<image>other</image>\n\t\t\t\t\t\t\t<dns>192.168.1.1</dns>\n\t\t\t\t\t\t</other>\n\t\t\t\t\t</services>\n\t\t\t\t</yaml>\n\t\t\t</template>");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.XML.Test.PatcherAppend"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("testAdd1", "testAdd2");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "testAdd1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testAdd2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.XML.Test.PatcherAppend"] = Runtime.XML.Test.PatcherAppend;