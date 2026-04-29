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
Runtime.XML.Test.YamlTest = class
{
	/**
	 * Check if yaml is correct
	 */
	static assertYaml(xml, d1, variables, log_yaml)
	{
		if (variables == undefined) variables = null;
		if (log_yaml == undefined) log_yaml = true;
		let converter = new Runtime.XML.YamlConverter(xml, variables);
		let d2 = converter.toDict();
		try
		{
			Runtime.Unit.AssertHelper.equalDict(d1, d2, "Yaml");
		}
		catch (e)
		{
			if (log_yaml)
			{
				Runtime.io.print(converter.convert());
			}
			throw e;
		}
	}
	
	
	static test1()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item1>1</item1>\n\t\t\t\t<item2>2</item2>\n\t\t\t\t<item3>3</item3>\n\t\t\t</root>");
		let result = Runtime.Map.create({
			"item1": "1",
			"item2": "2",
			"item3": "3",
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	}
	
	
	static test2()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<item>4</item>\n\t\t\t</root>");
		let result = Runtime.Map.create({
			"item": Runtime.Vector.create([
				"1",
				"2",
				"3",
				"4",
			]),
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	}
	
	
	static testEmptyItem()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		let result = Runtime.Map.create({
			"item": "",
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	}
	
	
	static testInteger()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item type=\"int\">1</item>\n\t\t\t</root>");
		let result = Runtime.Map.create({
			"item": 1,
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	}
	
	
	static testBoolean()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item type=\"boolean\">1</item>\n\t\t\t</root>");
		let result = Runtime.Map.create({
			"item": true,
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	}
	
	
	static testArray()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<volumes array=\"true\">/home/ubuntu:/home/ubuntu</volumes>\n\t\t\t</root>");
		let result = Runtime.Map.create({
			"volumes": Runtime.Vector.create([
				"/home/ubuntu:/home/ubuntu",
			]),
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	}
	
	
	static testMap()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<volumes type=\"map\"></volumes>\n\t\t\t</root>");
		let result = Runtime.Map.create({
			"volumes": Runtime.Map.create({
			}),
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	}
	
	
	static testData1()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<image>test_image</image>\n\t\t\t\t<volumes array=\"true\">database_data:/data</volumes>\n\t\t\t</root>");
		let result = Runtime.Map.create({
			"image": "test_image",
			"volumes": Runtime.Vector.create([
				"database_data:/data",
			]),
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	}
	
	
	static testData2()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>test_image</image>\n\t\t\t\t\t\t\t<volumes array=\"true\">database_data:/data</volumes>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t</services>\n\t\t\t\t\t<volumes>\n\t\t\t\t\t\t<database_data type=\"map\" />\n\t\t\t\t\t</volumes>\n\t\t\t\t</yaml>\n\t\t\t</root>");
		let result = Runtime.Map.create({
			"yaml": Runtime.Map.create({
				"services": Runtime.Map.create({
					"database": Runtime.Map.create({
						"image": "test_image",
						"volumes": Runtime.Vector.create([
							"database_data:/data",
						]),
					}),
				}),
				"volumes": Runtime.Map.create({
					"database_data": new Runtime.Map(),
				}),
			}),
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	}
	
	
	static testVariables()
	{
		let xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<_var_app_name_>\n\t\t\t\t\t\t\t<image>_var_image_</image>\n\t\t\t\t\t\t\t<volumes array=\"true\">_var_app_name__data:/data</volumes>\n\t\t\t\t\t\t</_var_app_name_>\n\t\t\t\t\t</services>\n\t\t\t\t\t<volumes type=\"map\">\n\t\t\t\t\t\t<_var_app_name__data type=\"map\" />\n\t\t\t\t\t</volumes>\n\t\t\t\t</yaml>\n\t\t\t</root>");
		let variables = Runtime.Map.create({
			"_var_app_name_": "database",
			"_var_image_": "test_image",
		});
		let result = Runtime.Map.create({
			"yaml": Runtime.Map.create({
				"services": Runtime.Map.create({
					"database": Runtime.Map.create({
						"image": "test_image",
						"volumes": Runtime.Vector.create([
							"database_data:/data",
						]),
					}),
				}),
				"volumes": Runtime.Map.create({
					"database_data": new Runtime.Map(),
				}),
			}),
		});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result, variables);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.XML.Test.YamlTest"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("test1", "test2", "testEmptyItem", "testInteger", "testBoolean", "testArray", "testMap", "testData1", "testData2", "testVariables");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "test1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "test2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testEmptyItem") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testInteger") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testBoolean") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testArray") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testMap") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testData1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testData2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "testVariables") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.XML.Test.YamlTest"] = Runtime.XML.Test.YamlTest;