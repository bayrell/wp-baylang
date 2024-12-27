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
Runtime.XML.Test.YamlTest = function()
{
};
Object.assign(Runtime.XML.Test.YamlTest.prototype,
{
});
Object.assign(Runtime.XML.Test.YamlTest,
{
	/**
	 * Check if yaml is correct
	 */
	assertYaml: function(xml, d1, variables, log_yaml)
	{
		if (variables == undefined) variables = null;
		if (log_yaml == undefined) log_yaml = true;
		var converter = new Runtime.XML.YamlConverter(xml, variables);
		var d2 = converter.toDict();
		try
		{
			Runtime.Unit.AssertHelper.equalDict(d1, d2, "Yaml");
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
				
				if (log_yaml)
				{
					Runtime.io.print(converter.convert());
				}
				throw e
			}
			else
			{
				throw _ex;
			}
		}
	},
	test1: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item1>1</item1>\n\t\t\t\t<item2>2</item2>\n\t\t\t\t<item3>3</item3>\n\t\t\t</root>");
		var result = Runtime.Map.from({"item1":"1","item2":"2","item3":"3"});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	},
	test2: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item>1</item>\n\t\t\t\t<item>2</item>\n\t\t\t\t<item>3</item>\n\t\t\t\t<item>4</item>\n\t\t\t</root>");
		var result = Runtime.Map.from({"item":Runtime.Vector.from(["1","2","3","4"])});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	},
	testEmptyItem: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item></item>\n\t\t\t</root>");
		var result = Runtime.Map.from({"item":""});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	},
	testInteger: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item type=\"int\">1</item>\n\t\t\t</root>");
		var result = Runtime.Map.from({"item":1});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	},
	testBoolean: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<item type=\"boolean\">1</item>\n\t\t\t</root>");
		var result = Runtime.Map.from({"item":true});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	},
	testArray: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<volumes array=\"true\">/home/ubuntu:/home/ubuntu</volumes>\n\t\t\t</root>");
		var result = Runtime.Map.from({"volumes":Runtime.Vector.from(["/home/ubuntu:/home/ubuntu"])});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	},
	testMap: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<volumes type=\"map\"></volumes>\n\t\t\t</root>");
		var result = Runtime.Map.from({"volumes":Runtime.Map.from({})});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	},
	testData1: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<image>test_image</image>\n\t\t\t\t<volumes array=\"true\">database_data:/data</volumes>\n\t\t\t</root>");
		var result = Runtime.Map.from({"image":"test_image","volumes":Runtime.Vector.from(["database_data:/data"])});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	},
	testData2: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<database>\n\t\t\t\t\t\t\t<image>test_image</image>\n\t\t\t\t\t\t\t<volumes array=\"true\">database_data:/data</volumes>\n\t\t\t\t\t\t</database>\n\t\t\t\t\t</services>\n\t\t\t\t\t<volumes>\n\t\t\t\t\t\t<database_data type=\"map\" />\n\t\t\t\t\t</volumes>\n\t\t\t\t</yaml>\n\t\t\t</root>");
		var result = Runtime.Map.from({"yaml":Runtime.Map.from({"services":Runtime.Map.from({"database":Runtime.Map.from({"image":"test_image","volumes":Runtime.Vector.from(["database_data:/data"])})}),"volumes":Runtime.Map.from({"database_data":Runtime.Map.from({})})})});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result);
	},
	testVariables: function()
	{
		var xml = Runtime.XML.XML.loadXml("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t\t<root>\n\t\t\t\t<yaml>\n\t\t\t\t\t<services>\n\t\t\t\t\t\t<_var_app_name_>\n\t\t\t\t\t\t\t<image>_var_image_</image>\n\t\t\t\t\t\t\t<volumes array=\"true\">_var_app_name__data:/data</volumes>\n\t\t\t\t\t\t</_var_app_name_>\n\t\t\t\t\t</services>\n\t\t\t\t\t<volumes type=\"map\">\n\t\t\t\t\t\t<_var_app_name__data type=\"map\" />\n\t\t\t\t\t</volumes>\n\t\t\t\t</yaml>\n\t\t\t</root>");
		var variables = Runtime.Map.from({"_var_app_name_":"database","_var_image_":"test_image"});
		var result = Runtime.Map.from({"yaml":Runtime.Map.from({"services":Runtime.Map.from({"database":Runtime.Map.from({"image":"test_image","volumes":Runtime.Vector.from(["database_data:/data"])})}),"volumes":Runtime.Map.from({"database_data":Runtime.Map.from({})})})});
		Runtime.XML.Test.YamlTest.assertYaml(xml, result, variables);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.XML.Test";
	},
	getClassName: function()
	{
		return "Runtime.XML.Test.YamlTest";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
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
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "test1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testEmptyItem")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testInteger")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testBoolean")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testArray")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testMap")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testData1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testData2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testVariables")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Runtime.XML.Test.YamlTest);
window["Runtime.XML.Test.YamlTest"] = Runtime.XML.Test.YamlTest;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.XML.Test.YamlTest;