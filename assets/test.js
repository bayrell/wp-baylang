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
if (typeof Runtime.Unit == 'undefined') Runtime.Unit = {};
Runtime.Unit.AssertHelper = function()
{
};
Object.assign(Runtime.Unit.AssertHelper.prototype,
{
});
Object.assign(Runtime.Unit.AssertHelper,
{
	/**
	 * Check equals of types
	 */
	equalValueType: function(value1, value2, message)
	{
		var type1 = Runtime.rtl.getType(value1);
		var type2 = Runtime.rtl.getType(value2);
		Runtime.rtl.assert(type1 == type2, message);
	},
	/**
	 * Check equals of values
	 */
	equalValue: function(value1, value2, message)
	{
		this.equalValueType(value1, value2, message);
		var value_type1 = Runtime.rtl.getType(value1);
		var value_type2 = Runtime.rtl.getType(value2);
		Runtime.rtl.assert(value_type1 == value_type2, message);
		if (Runtime.rtl.isScalarValue(value1))
		{
			Runtime.rtl.assert(value1 === value2, message);
			return ;
		}
		if (value_type1 == "collection")
		{
			this.equalCollection(value1, value2, message);
			return ;
		}
		if (value_type1 == "dict")
		{
			this.equalDict(value1, value2, message);
			return ;
		}
		Runtime.rtl.assert(false, message);
	},
	/**
	 * Check equals of two collections
	 */
	equalCollection: function(c1, c2, message)
	{
		if (c1.count() != c2.count())
		{
			Runtime.rtl.assert(false, message);
		}
		for (var i = 0; i < c1.count(); i++)
		{
			var value1 = c1.get(i);
			var value2 = c2.get(i);
			this.equalValue(value1, value2, message);
		}
	},
	/**
	 * Check equals of two dicts
	 */
	equalDict: function(d1, d2, message)
	{
		var d1_keys = d1.keys();
		var d2_keys = d2.keys();
		for (var i = 0; i < d1_keys.count(); i++)
		{
			var key1 = d1_keys.get(i);
			if (!d2.has(key1))
			{
				Runtime.rtl.assert(false, message);
			}
			var value1 = d1.get(key1);
			var value2 = d2.get(key1);
			this.equalValue(value1, value2, message);
		}
		for (var i = 0; i < d2_keys.count(); i++)
		{
			var key2 = d2_keys.get(i);
			if (!d1.has(key2))
			{
				Runtime.rtl.assert(false, message);
			}
		}
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Unit";
	},
	getClassName: function()
	{
		return "Runtime.Unit.AssertHelper";
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
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Unit.AssertHelper);
window["Runtime.Unit.AssertHelper"] = Runtime.Unit.AssertHelper;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Unit.AssertHelper;
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
if (typeof Runtime.Unit == 'undefined') Runtime.Unit = {};
Runtime.Unit.Test = function()
{
	Runtime.Entity.Entity.apply(this, arguments);
};
Runtime.Unit.Test.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.Unit.Test.prototype.constructor = Runtime.Unit.Test;
Object.assign(Runtime.Unit.Test.prototype,
{
});
Object.assign(Runtime.Unit.Test, Runtime.Entity.Entity);
Object.assign(Runtime.Unit.Test,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Unit";
	},
	getClassName: function()
	{
		return "Runtime.Unit.Test";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Entity";
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
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Unit.Test);
window["Runtime.Unit.Test"] = Runtime.Unit.Test;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Unit.Test;
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
if (typeof Runtime.Unit == 'undefined') Runtime.Unit = {};
Runtime.Unit.TestProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.Unit.TestProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Unit.TestProvider.prototype.constructor = Runtime.Unit.TestProvider;
Object.assign(Runtime.Unit.TestProvider.prototype,
{
	/**
	 * Start provider
	 */
	start: async function()
	{
		this.tests_list = Runtime.rtl.getContext().entities.filter(Runtime.lib.isInstance("Runtime.Unit.UnitTest"));
	},
	/**
	 * Returns commands list
	 */
	getTests: function()
	{
		return this.tests_list;
	},
	/**
	 * Returns unit test by pos
	 */
	get: function(pos)
	{
		return this.tests_list.get(pos);
	},
	/**
	 * Returns count of unit tests
	 */
	count: function()
	{
		return this.tests_list.count();
	},
	/**
	 * Run test
	 */
	runTestByName: async function(test_name)
	{
		var error_code = 0;
		var arr = Runtime.rs.split("::", test_name);
		if (arr.count() == 1)
		{
			/* Run all test in class */
			error_code = await this.runTestClass(arr.get(0));
		}
		else
		{
			/* Run specific test */
			error_code = await this.runTestMethod(arr.get(0), arr.get(1));
		}
		return Promise.resolve(error_code);
	},
	/**
	 * Returns all test methods
	 */
	getTestMethods: function(class_name)
	{
		var getMethodsList = new Runtime.Callback(class_name, "getMethodsList");
		var getMethodInfoByName = new Runtime.Callback(class_name, "getMethodInfoByName");
		var methods = Runtime.rtl.apply(getMethodsList);
		methods = methods.filter((method_name) =>
		{
			var method_info = Runtime.rtl.apply(getMethodInfoByName, Runtime.Vector.from([method_name]));
			return this.constructor.isTestMethod(method_info);
		});
		return methods;
	},
	/**
	 * Run all test in class
	 */
	runTestClass: async function(class_name)
	{
		var error_code = 1;
		var methods = this.getTestMethods(class_name);
		for (var i = 0; i < methods.count(); i++)
		{
			var method_name = methods.get(i);
			var result = await this.runTestMethod(class_name, method_name);
			if (result != 1)
			{
				error_code = -1;
				break;
			}
		}
		if (error_code == 1)
		{
			Runtime.io.print(Runtime.io.color("green", "Success"));
		}
		return Promise.resolve(error_code);
	},
	/**
	 * Run test method
	 */
	runTestMethod: async function(class_name, method_name)
	{
		var error_code = 0;
		try
		{
			var callback = new Runtime.Callback(class_name, method_name);
			if (!callback.exists())
			{
				var obj = Runtime.rtl.newInstance(class_name);
				callback = new Runtime.Callback(obj, method_name);
			}
			if (callback.exists())
			{
				await Runtime.rtl.apply(callback);
				error_code = 1;
				Runtime.io.print(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(Runtime.io.color("green", "Ok")));
			}
			else
			{
				throw new Runtime.Exceptions.ItemNotFound(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name), "Method")
			}
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.AssertException)
			{
				var e = _ex;
				
				Runtime.io.print(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(Runtime.io.color("red", "Error: " + Runtime.rtl.toStr(e.getErrorMessage()))));
				error_code = e.getErrorCode();
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(error_code);
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.tests_list = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Unit.TestProvider, Runtime.BaseProvider);
Object.assign(Runtime.Unit.TestProvider,
{
	/**
	 * Run
	 */
	run: async function(test_name)
	{
		if (test_name == undefined) test_name = "";
		var provider = new Runtime.Unit.TestProvider();
		await provider.start();
		if (test_name == "")
		{
			Runtime.io.print("List of all tests:");
			for (var i = 0; i < provider.count(); i++)
			{
				var test = provider.get(i);
				Runtime.io.print(i + 1 + Runtime.rtl.toStr(") ") + Runtime.rtl.toStr(test.name));
			}
			return Promise.resolve();
		}
		await provider.runTestByName(test_name);
	},
	/**
	 * Run
	 */
	runAll: async function()
	{
		var provider = new Runtime.Unit.TestProvider();
		await provider.start();
		for (var i = 0; i < provider.count(); i++)
		{
			var test = provider.get(i);
			Runtime.io.print("Run " + Runtime.rtl.toStr(test.name));
			var error_code = await provider.runTestByName(test.name);
			if (error_code != 1)
			{
				return Promise.resolve();
			}
		}
	},
	/**
	 * Returns true if TestMethod
	 */
	isTestMethod: function(method_info)
	{
		var annotations = Runtime.rtl.attr(method_info, "annotations");
		if (annotations)
		{
			for (var j = 0; j < annotations.count(); j++)
			{
				var annotation = annotations.get(j);
				if (annotation instanceof Runtime.Unit.Test)
				{
					return true;
				}
			}
		}
		return false;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Unit";
	},
	getClassName: function()
	{
		return "Runtime.Unit.TestProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
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
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Unit.TestProvider);
window["Runtime.Unit.TestProvider"] = Runtime.Unit.TestProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Unit.TestProvider;
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
if (typeof Runtime.Unit == 'undefined') Runtime.Unit = {};
Runtime.Unit.UnitTest = function(api_name)
{
	Runtime.Entity.Entity.call(this, Runtime.Map.from({"name":api_name}));
};
Runtime.Unit.UnitTest.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.Unit.UnitTest.prototype.constructor = Runtime.Unit.UnitTest;
Object.assign(Runtime.Unit.UnitTest.prototype,
{
});
Object.assign(Runtime.Unit.UnitTest, Runtime.Entity.Entity);
Object.assign(Runtime.Unit.UnitTest,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Unit";
	},
	getClassName: function()
	{
		return "Runtime.Unit.UnitTest";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Entity";
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
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Unit.UnitTest);
window["Runtime.Unit.UnitTest"] = Runtime.Unit.UnitTest;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Unit.UnitTest;
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Test == 'undefined') BayLang.Test = {};
if (typeof BayLang.Test.LangBay == 'undefined') BayLang.Test.LangBay = {};
BayLang.Test.LangBay.Base = function()
{
};
Object.assign(BayLang.Test.LangBay.Base.prototype,
{
	/**
	 * Reset
	 */
	reset: function()
	{
		this.parser = new BayLang.LangBay.ParserBay();
		this.parser = this.parser.constructor.reset(this.parser);
		this.translator = new BayLang.LangBay.TranslatorBay();
		this.translator.reset();
	},
	/**
	 * Set content
	 */
	setContent: function(content)
	{
		this.parser = this.parser.constructor.setContent(this.parser, content);
	},
	/**
	 * Add variable
	 */
	addVar: function(var_name)
	{
		var parser = this.parser;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
		this.parser = parser;
	},
	/**
	 * Translate
	 */
	translate: function(content, debug)
	{
		if (debug == undefined) debug = false;
		var result = Runtime.Vector.from([]);
		this.setContent(content);
		/* Parse */
		var res = this.parser.parser_expression.constructor.readExpression(this.parser);
		var op_code = res.get(1);
		/* Translate */
		this.translator.expression.translate(op_code, result);
		/* Debug output */
		if (debug)
		{
			console.log(op_code);
			console.log(result);
			console.log(Runtime.rs.join("", result));
		}
		return Runtime.Vector.from([op_code,Runtime.rs.join("", result)]);
	},
	testNumber: function()
	{
		this.reset();
		var content = "1";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testReal: function()
	{
		this.reset();
		var content = "0.1";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testString: function()
	{
		this.reset();
		var content = "\"test\"";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testIdentifier: function()
	{
		this.reset();
		this.addVar("a");
		var content = "a";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAttr1: function()
	{
		this.reset();
		var content = "this.a";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAttr2: function()
	{
		this.reset();
		var content = "this.a.b";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAttr3: function()
	{
		this.reset();
		var content = "static::a";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAttr4: function()
	{
		this.reset();
		var content = "parent::a";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAttr5: function()
	{
		this.reset();
		this.addVar("a");
		var content = "a[1]";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAttr6: function()
	{
		this.reset();
		this.addVar("a");
		var content = "a[1, 2]";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAttr7: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("name");
		var content = "a[name]";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testCollection1: function()
	{
		this.reset();
		var content = "[]";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testCollection2: function()
	{
		this.reset();
		var content = "[1, 2, 3]";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testCollection3: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		this.addVar("c");
		var content = "[a, b, c]";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testCollection4: function()
	{
		this.reset();
		var content = "[\"a\", \"b\", \"c\"]";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testCollection5: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["[","\t\"a\",","\t\"b\",","\t\"c\",","]"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDict1: function()
	{
		this.reset();
		var content = "{}";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDict2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t\"name\": \"test\",","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDict3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t\"name\": \"test\",","\t\"value\": 10,","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDict4: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t\"obj\": {},","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDict5: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t\"obj\": {","\t},","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDict6: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t\"obj\": [","\t],","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDict7: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t\"obj\": {","\t\t\"name\": \"test\",","\t\t\"value\": 10,","\t},","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDict8: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t\"obj\": {\"name\": \"test\", \"value\": 10},","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testPreprocessor1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["[","\t\"1\",","\t#ifdef BACKEND then","\t\"2\",","\t\"3\",","\t#endif","\t\"4\",","]"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testPreprocessor2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t\"name\": \"test\",","\t#ifdef BACKEND then","\t\"value1\": 1,","\t\"value2\": 2,","\t#endif","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn1: function()
	{
		this.reset();
		this.addVar("a");
		var content = "a()";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn2: function()
	{
		this.reset();
		this.addVar("a");
		var content = "a(1, 2)";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn3: function()
	{
		this.reset();
		var content = "this.a(1, 2)";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn4: function()
	{
		this.reset();
		var content = "parent(1, 2)";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn5: function()
	{
		this.reset();
		var content = "static::getName(1, 2)";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn6: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		this.addVar("c");
		var content = "a(b, c)";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn7: function()
	{
		this.reset();
		this.addVar("a");
		var content = "a().b()";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn8: function()
	{
		this.reset();
		this.addVar("a");
		var content = "a{}";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn9: function()
	{
		this.reset();
		this.addVar("a");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["a{","\t\"name\": \"test\",","\t\"value\": 10,","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testNew1: function()
	{
		this.reset();
		this.addVar("Test");
		var content = "new Test()";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testNew2: function()
	{
		this.reset();
		this.addVar("Test");
		var content = "new Test(this.name, this.value)";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testNew3: function()
	{
		this.reset();
		this.addVar("Test");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["new Test{","\t\"name\": \"test\",","\t\"value\": 10,","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testNew4: function()
	{
		this.reset();
		this.addVar("Query");
		var content = "new Query().select(\"table\")";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testNew5: function()
	{
		this.reset();
		var content = "new Collection<string>()";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	_init: function()
	{
		this.parser = null;
		this.translator = null;
	},
});
Object.assign(BayLang.Test.LangBay.Base,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Test.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.Test.LangBay.Base";
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
			"testNumber",
			"testReal",
			"testString",
			"testIdentifier",
			"testAttr1",
			"testAttr2",
			"testAttr3",
			"testAttr4",
			"testAttr5",
			"testAttr6",
			"testAttr7",
			"testCollection1",
			"testCollection2",
			"testCollection3",
			"testCollection4",
			"testCollection5",
			"testDict1",
			"testDict2",
			"testDict3",
			"testDict4",
			"testDict5",
			"testDict6",
			"testDict7",
			"testDict8",
			"testPreprocessor1",
			"testPreprocessor2",
			"testFn1",
			"testFn2",
			"testFn3",
			"testFn4",
			"testFn5",
			"testFn6",
			"testFn7",
			"testFn8",
			"testFn9",
			"testNew1",
			"testNew2",
			"testNew3",
			"testNew4",
			"testNew5",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "testNumber")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testReal")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testString")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testIdentifier")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAttr1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAttr2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAttr3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAttr4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAttr5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAttr6")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAttr7")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testCollection1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testCollection2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testCollection3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testCollection4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testCollection5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDict1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDict2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDict3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDict4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDict5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDict6")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDict7")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDict8")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testPreprocessor1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testPreprocessor2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn6")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn7")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn8")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn9")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testNew1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testNew2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testNew3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testNew4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testNew5")
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
Runtime.rtl.defClass(BayLang.Test.LangBay.Base);
window["BayLang.Test.LangBay.Base"] = BayLang.Test.LangBay.Base;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Test.LangBay.Base;
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Test == 'undefined') BayLang.Test = {};
if (typeof BayLang.Test.LangBay == 'undefined') BayLang.Test.LangBay = {};
BayLang.Test.LangBay.Expression = function()
{
};
Object.assign(BayLang.Test.LangBay.Expression.prototype,
{
	/**
	 * Reset
	 */
	reset: function()
	{
		this.parser = new BayLang.LangBay.ParserBay();
		this.parser = this.parser.constructor.reset(this.parser);
		this.translator = new BayLang.LangBay.TranslatorBay();
		this.translator.reset();
	},
	/**
	 * Set content
	 */
	setContent: function(content)
	{
		this.parser = this.parser.constructor.setContent(this.parser, content);
	},
	/**
	 * Add variable
	 */
	addVar: function(var_name)
	{
		var parser = this.parser;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
		this.parser = parser;
	},
	/**
	 * Translate
	 */
	translate: function(content, debug)
	{
		if (debug == undefined) debug = false;
		var result = Runtime.Vector.from([]);
		this.setContent(content);
		/* Parse */
		var res = this.parser.parser_expression.constructor.readExpression(this.parser);
		var op_code = res.get(1);
		/* Translate */
		this.translator.expression.translate(op_code, result);
		/* Debug output */
		if (debug)
		{
			console.log(op_code);
			console.log(result);
			console.log(Runtime.rs.join("", result));
		}
		return Runtime.Vector.from([op_code,Runtime.rs.join("", result)]);
	},
	testMath1: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		var content = "a + b";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testMath2: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		var content = "a * b";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testMath3: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		this.addVar("c");
		var content = "a + b * c";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testMath4: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		this.addVar("c");
		var content = "(a + b) * c";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testMath5: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		this.addVar("c");
		var content = "a * (b + c)";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testMath6: function()
	{
		this.reset();
		this.addVar("a");
		var content = "not a";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testMath7: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		var content = "not (a or b)";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testMath8: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		var content = "not a or b";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn1: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		var content = "a(this.a + this.b)";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn2: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		var content = "a() + b()";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn3: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		this.addVar("c");
		var content = "(a() + b()) * c()";
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	test1: function()
	{
		this.reset();
		this.addVar("io");
		this.addVar("class_name");
		this.addVar("method_name");
		var content = "io::print(class_name ~ \"::\" ~ method_name ~ " + Runtime.rtl.toStr("\" \" ~ io::color(\"green\", \"Ok\"))");
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	_init: function()
	{
		this.parser = null;
		this.translator = null;
	},
});
Object.assign(BayLang.Test.LangBay.Expression,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Test.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.Test.LangBay.Expression";
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
			"testMath1",
			"testMath2",
			"testMath3",
			"testMath4",
			"testMath5",
			"testMath6",
			"testMath7",
			"testMath8",
			"testFn1",
			"testFn2",
			"testFn3",
			"test1",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "testMath1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testMath2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testMath3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testMath4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testMath5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testMath6")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testMath7")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testMath8")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
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
		return null;
	},
});
Runtime.rtl.defClass(BayLang.Test.LangBay.Expression);
window["BayLang.Test.LangBay.Expression"] = BayLang.Test.LangBay.Expression;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Test.LangBay.Expression;
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Test == 'undefined') BayLang.Test = {};
if (typeof BayLang.Test.LangBay == 'undefined') BayLang.Test.LangBay = {};
BayLang.Test.LangBay.Html = function()
{
};
Object.assign(BayLang.Test.LangBay.Html.prototype,
{
	/**
	 * Reset
	 */
	reset: function()
	{
		this.parser = new BayLang.LangBay.ParserBay();
		this.parser = this.parser.constructor.reset(this.parser);
		this.translator = new BayLang.LangBay.TranslatorBay();
		this.translator.reset();
	},
	/**
	 * Set content
	 */
	setContent: function(content)
	{
		this.parser = this.parser.constructor.setContent(this.parser, content);
	},
	/**
	 * Add variable
	 */
	addVar: function(var_name)
	{
		var parser = this.parser;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
		this.parser = parser;
	},
	/**
	 * Translate
	 */
	translate: function(content, debug)
	{
		if (debug == undefined) debug = false;
		var result = Runtime.Vector.from([]);
		this.setContent(content);
		/* Parse */
		var res = this.parser.parser_program.constructor.readProgram(this.parser);
		var op_code = res.get(1);
		/* Translate */
		this.translator.html.translate(op_code, result);
		/* Debug output */
		if (debug)
		{
			console.log(op_code);
			console.log(result);
			console.log(Runtime.rs.join("", result));
		}
		return Runtime.Vector.from([op_code,Runtime.rs.join("", result)]);
	},
	test1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	test2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"App.Test\" />","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	test3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"App.Test\" as=\"TestAlias\" />","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	test4: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"Runtime.Web.Button\" component=\"true\" />","<use name=\"Runtime.Web.Text\" component=\"true\" />","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testTemplate1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<template>","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testTemplate2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<template name=\"renderItem\">","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testTemplate3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<template name=\"renderItem\" args=\"int a, int b\">","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testComponent1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"Runtime.Web.Button\" />","","<template>","\t<Button />","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testComponent2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"Runtime.Web.Button\" />","","<template>","\t<Button>","\t\tContent","\t</Button>","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testComponent3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"Runtime.Web.Button\" />","","<template>","\t<Button>","\t\t{{ this.model.content }}","\t</Button>","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testComponent4: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"Runtime.Web.Button\" />","","<template>","\t<Button @model={{ this.model }} />","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testComponent5: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"Runtime.Web.Button\" />","","<template>","\t<Button name=\"test\" />","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testContent1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<template>","\t<div class=\"widget_test\">Text</div>","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testContent2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<template>","\t<div class=\"widget_test\">{{ \"Text\" }}</div>","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testContent3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<template>","\t<div class=\"widget_test\">@raw{{ \"Text\" }}</div>","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testScript1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"Runtime.Web.Button\" />","","<template>","</template>","","<script>","","void test(){}","","</script>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testSlot1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"Runtime.Widget.Button\" component=\"true\" />","<use name=\"Runtime.Widget.Image\" component=\"true\" />","<use name=\"Runtime.Widget.TextImage\" component=\"true\" />","","<template>","\t<TextImage>","\t\t<slot name=\"image\">","\t\t\t<Image src=\"/assets/images/test.jpeg\" />","\t\t</slot>","\t\t<slot name=\"text\">","\t\t\t<div class=\"image_text\">Text</div>","\t\t</slot>","\t</TextImage>","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testSlot2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<use name=\"Runtime.Widget.Button\" component=\"true\" />","<use name=\"Runtime.Widget.Image\" component=\"true\" />","<use name=\"Runtime.Widget.TextImage\" component=\"true\" />","","<template>","\t<TextImage>","\t\t<slot name=\"image\" args=\"Dict params\">","\t\t\t<Image src={{ params.get(\"image\") }} />","\t\t</slot>","\t\t<slot name=\"text\" args=\"Dict params\">","\t\t\t<div class=\"image_text\">{{ params.get(\"label\") }}</div>","\t\t</slot>","\t</TextImage>","</template>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testStyle1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<style>",".page_title{","\tfont-size: 18px;","\ttext-align: center;","}","</style>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testStyle2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<style global=\"true\">",".page_title{","\tfont-size: 18px;","\ttext-align: center;","}","</style>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testStyle3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<style global=\"true\">",".main_page{","background-image: ${ \"test\" };","}","</style>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testStyle4: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<style global=\"true\">","@font-face{","}","</style>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testStyle5: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["<class name=\"App.Component\">","","<style global=\"true\">",".main_page{",".test{","font-size: 16px;","}","}","</style>","","</class>"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	_init: function()
	{
		this.parser = null;
		this.translator = null;
	},
});
Object.assign(BayLang.Test.LangBay.Html,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Test.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.Test.LangBay.Html";
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
			"test3",
			"test4",
			"testTemplate1",
			"testTemplate2",
			"testTemplate3",
			"testComponent1",
			"testComponent2",
			"testComponent3",
			"testComponent4",
			"testComponent5",
			"testContent1",
			"testContent2",
			"testContent3",
			"testScript1",
			"testSlot1",
			"testSlot2",
			"testStyle1",
			"testStyle2",
			"testStyle3",
			"testStyle4",
			"testStyle5",
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
		if (field_name == "test3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testTemplate1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testTemplate2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testTemplate3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testComponent1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testComponent2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testComponent3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testComponent4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testComponent5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testContent1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testContent2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testContent3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testScript1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testSlot1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testSlot2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testStyle1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testStyle2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testStyle3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testStyle4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testStyle5")
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
Runtime.rtl.defClass(BayLang.Test.LangBay.Html);
window["BayLang.Test.LangBay.Html"] = BayLang.Test.LangBay.Html;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Test.LangBay.Html;
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Test == 'undefined') BayLang.Test = {};
if (typeof BayLang.Test.LangBay == 'undefined') BayLang.Test.LangBay = {};
BayLang.Test.LangBay.Operator = function()
{
};
Object.assign(BayLang.Test.LangBay.Operator.prototype,
{
	/**
	 * Reset
	 */
	reset: function()
	{
		this.parser = new BayLang.LangBay.ParserBay();
		this.parser = this.parser.constructor.reset(this.parser);
		this.translator = new BayLang.LangBay.TranslatorBay();
		this.translator.reset();
	},
	/**
	 * Set content
	 */
	setContent: function(content)
	{
		this.parser = this.parser.constructor.setContent(this.parser, content);
	},
	/**
	 * Add variable
	 */
	addVar: function(var_name)
	{
		var parser = this.parser;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
		this.parser = parser;
	},
	/**
	 * Translate
	 */
	translate: function(content, debug)
	{
		if (debug == undefined) debug = false;
		var result = Runtime.Vector.from([]);
		this.setContent(content);
		/* Parse */
		var res = this.parser.parser_operator.constructor.readOperators(this.parser);
		var op_code = res.get(1);
		/* Translate */
		this.translator.operator.translateItems(op_code, result);
		/* Debug output */
		if (debug)
		{
			console.log(op_code);
			console.log(result);
			console.log(Runtime.rs.join("", result));
		}
		return Runtime.Vector.from([op_code,Runtime.rs.join("", result)]);
	},
	testAssign1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tint a;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAssign2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tint a = 1;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAssign3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tint a = 1;","\ta = 2;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAssign4: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tint a = 1, b = 2;","\ta = a + b;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAssign5: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tthis.a = 1;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAssign6: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tCollection<string> content = [];","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAssign7: function()
	{
		this.reset();
		this.addVar("content");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tstring content = rs::join(\"\\n\", content);","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testBreak: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tbreak;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testContinue: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tcontinue;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testReturn1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\treturn;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testReturn2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\treturn 1;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testReturn3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\treturn true;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testReturn4: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\treturn this.result;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testInc1: function()
	{
		this.reset();
		this.addVar("a");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\ta++;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testInc2: function()
	{
		this.reset();
		this.addVar("a");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t++a;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDec1: function()
	{
		this.reset();
		this.addVar("a");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\ta--;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testDec2: function()
	{
		this.reset();
		this.addVar("a");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t--a;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFor1: function()
	{
		this.reset();
		this.addVar("io");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tfor (int i = 0; i < 10; i++)","\t{","\t\tio::print(i);","\t}","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testIf1: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		this.addVar("io");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tif (a > b)","\t{","\t\tio::print(\"Yes\");","\t}","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testIf2: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("b");
		this.addVar("io");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tif (a > b)","\t{","\t\tio::print(\"Yes\");","\t}","\telse","\t{","\t\tio::print(\"No\");","\t}","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testIf3: function()
	{
		this.reset();
		this.addVar("a");
		this.addVar("io");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tif (a == 1)","\t{","\t\tio::print(1);","\t}","\telse if (a == 2)","\t{","\t\tio::print(2);","\t}","\telse if (a == 3)","\t{","\t\tio::print(3);","\t}","\telse","\t{","\t\tio::print(\"No\");","\t}","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testThrow1: function()
	{
		this.reset();
		this.addVar("RuntimeException");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\tthrow new RuntimeException(\"Error\");","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testTry1: function()
	{
		this.reset();
		this.addVar("io");
		this.addVar("RuntimeException");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\ttry","\t{","\t\tthis.translate();","\t}","\tcatch (RuntimeException e)","\t{","\t\tio::print_error(e.toString());","\t}","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testWhile1: function()
	{
		this.reset();
		this.addVar("i");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\twhile (i < 10)","\t{","\t\ti++;","\t}","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testComment1: function()
	{
		this.reset();
		this.addVar("i");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["{","\t/* Increment value */","\ti++;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	_init: function()
	{
		this.parser = null;
		this.translator = null;
	},
});
Object.assign(BayLang.Test.LangBay.Operator,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Test.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.Test.LangBay.Operator";
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
			"testAssign1",
			"testAssign2",
			"testAssign3",
			"testAssign4",
			"testAssign5",
			"testAssign6",
			"testAssign7",
			"testBreak",
			"testContinue",
			"testReturn1",
			"testReturn2",
			"testReturn3",
			"testReturn4",
			"testInc1",
			"testInc2",
			"testDec1",
			"testDec2",
			"testFor1",
			"testIf1",
			"testIf2",
			"testIf3",
			"testThrow1",
			"testTry1",
			"testWhile1",
			"testComment1",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "testAssign1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAssign2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAssign3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAssign4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAssign5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAssign6")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAssign7")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testBreak")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testContinue")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testReturn1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testReturn2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testReturn3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testReturn4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testInc1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testInc2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDec1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testDec2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFor1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testIf1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testIf2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testIf3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testThrow1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testTry1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testWhile1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testComment1")
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
Runtime.rtl.defClass(BayLang.Test.LangBay.Operator);
window["BayLang.Test.LangBay.Operator"] = BayLang.Test.LangBay.Operator;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Test.LangBay.Operator;
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Test == 'undefined') BayLang.Test = {};
if (typeof BayLang.Test.LangBay == 'undefined') BayLang.Test.LangBay = {};
BayLang.Test.LangBay.Program = function()
{
};
Object.assign(BayLang.Test.LangBay.Program.prototype,
{
	/**
	 * Reset
	 */
	reset: function()
	{
		this.parser = new BayLang.LangBay.ParserBay();
		this.parser = this.parser.constructor.reset(this.parser);
		this.translator = new BayLang.LangBay.TranslatorBay();
		this.translator.reset();
	},
	/**
	 * Set content
	 */
	setContent: function(content)
	{
		this.parser = this.parser.constructor.setContent(this.parser, content);
	},
	/**
	 * Add variable
	 */
	addVar: function(var_name)
	{
		var parser = this.parser;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
		this.parser = parser;
	},
	/**
	 * Translate
	 */
	translate: function(content, debug)
	{
		if (debug == undefined) debug = false;
		var result = Runtime.Vector.from([]);
		this.setContent(content);
		/* Parse */
		var res = this.parser.parser_program.constructor.readProgram(this.parser);
		var op_code = res.get(1);
		/* Translate */
		this.translator.program.translateItems(op_code.items, result);
		/* Debug output */
		if (debug)
		{
			console.log(op_code);
			console.log(result);
			console.log(Runtime.rs.join("", result));
		}
		return Runtime.Vector.from([op_code,Runtime.rs.join("", result)]);
	},
	testNamespace: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["namespace App;",""]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testUse1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["use Runtime.Unit.Test;"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testUse2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["use Runtime.Unit.Test as TestAlias;"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testClass1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test","{","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testClass2: function()
	{
		this.reset();
		this.addVar("BaseObject");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test extends BaseObject","{","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testClass3: function()
	{
		this.reset();
		this.addVar("TestInterface");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test implements TestInterface","{","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testClass4: function()
	{
		this.reset();
		this.addVar("TestInterface1");
		this.addVar("TestInterface2");
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test implements TestInterface1, TestInterface2","{","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testClass5: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test<T> extends Collection<T>","{","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testInterface1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["interface Test","{","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testStruct1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["struct Test","{","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test","{","\tvoid main(){}","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test","{","\tvoid main(int a, int b = 1){}","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test","{","\tbool main()","\t{","\t\treturn true;","\t}","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn4: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test","{","\tbool main() => true;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testFn5: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["class Test","{","\tstatic bool main() => true;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAssign1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["namespace App;","","use App.IndexPage;","","class Test","{","\tstring component = classof IndexPage;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	testAssign2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from(["namespace App;","","use App.IndexPage;","use Runtime.Web.Annotations.Param;","","","class Test","{","\t@Param{}","\tstring component = classof IndexPage;","}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(content, res.get(1), content);
	},
	_init: function()
	{
		this.parser = null;
		this.translator = null;
	},
});
Object.assign(BayLang.Test.LangBay.Program,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Test.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.Test.LangBay.Program";
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
			"testNamespace",
			"testUse1",
			"testUse2",
			"testClass1",
			"testClass2",
			"testClass3",
			"testClass4",
			"testClass5",
			"testInterface1",
			"testStruct1",
			"testFn1",
			"testFn2",
			"testFn3",
			"testFn4",
			"testFn5",
			"testAssign1",
			"testAssign2",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "testNamespace")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testUse1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testUse2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testClass1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testClass2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testClass3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testClass4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testClass5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testInterface1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testStruct1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn2")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testFn5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAssign1")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "testAssign2")
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
Runtime.rtl.defClass(BayLang.Test.LangBay.Program);
window["BayLang.Test.LangBay.Program"] = BayLang.Test.LangBay.Program;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Test.LangBay.Program;
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Test == 'undefined') BayLang.Test = {};
if (typeof BayLang.Test.LangBay == 'undefined') BayLang.Test.LangBay = {};
BayLang.Test.LangBay.Style = function()
{
};
Object.assign(BayLang.Test.LangBay.Style.prototype,
{
	/**
	 * Reset
	 */
	reset: function()
	{
		/* Create parser */
		var parser = new BayLang.LangBay.ParserBay();
		parser = parser.constructor.reset(parser);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_namespace_name"]), "App");
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_name"]), "Test");
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm("Button", "Runtime.Widget.Button"));
		this.parser = parser;
	},
	/**
	 * Set content
	 */
	setContent: function(content)
	{
		this.parser = this.parser.constructor.setContent(this.parser, content);
	},
	/**
	 * Translate
	 */
	translate: function(content, debug)
	{
		if (debug == undefined) debug = false;
		this.setContent(content + Runtime.rtl.toStr("}"));
		/* Parse */
		var items = Runtime.Vector.from([]);
		var res = this.parser.parser_html.constructor.readCssBodyItems(this.parser, items, Runtime.Vector.from([]));
		var op_code = res.get(1);
		/* Get items */
		items = items.map((op_code) =>
		{
			return op_code.value;
		});
		var result = Runtime.rs.join("\n", items);
		/* Debug output */
		if (debug)
		{
			console.log(items);
			console.log(result);
		}
		return Runtime.Vector.from([op_code,result]);
	},
	test1: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\tpadding: 20px;","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page.h-71c3{padding: 20px}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test2: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\t.test1{","\t\tpadding: 20px;","\t}","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page.h-71c3 .test1.h-71c3{padding: 20px}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test3: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\t&__test1{","\t\tpadding: 20px;","\t}","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page__test1.h-71c3{padding: 20px}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test4: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\t&__test1{","\t\t&_test2{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page__test1_test2.h-71c3{padding: 20px}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test5: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\t&__test1{","\t\t.test2{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page__test1.h-71c3 .test2.h-71c3{padding: 20px}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test6: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\t.test1{","\t\t&__test2{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page.h-71c3 .test1__test2.h-71c3{padding: 20px}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test7: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\t%(Button)widget_button{","\t\tpadding: 20px;","\t}","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page.h-71c3 .widget_button.h-8dd7{padding: 20px}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test8: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\t%(Button)widget_button{","\t\t&__test1{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page.h-71c3 .widget_button__test1.h-8dd7{padding: 20px}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test9: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\t%(Button)widget_button{","\t\t.test1{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page.h-71c3 .widget_button.h-8dd7 .test1.h-71c3{padding: 20px}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test10: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\tp{","\t\tfont-weight: bold;","\t}","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page.h-71c3 p{font-weight: bold}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	test11: function()
	{
		this.reset();
		var content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page{","\tpadding: 20px;","\tcolor: green;","}"]));
		var css_content = Runtime.rs.join("\n", Runtime.Vector.from([".main_page.h-71c3{padding: 20px;color: green}"]));
		var res = this.translate(content);
		Runtime.Unit.AssertHelper.equalValue(css_content, res.get(1), css_content);
	},
	_init: function()
	{
		this.parser = null;
	},
});
Object.assign(BayLang.Test.LangBay.Style,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Test.LangBay";
	},
	getClassName: function()
	{
		return "BayLang.Test.LangBay.Style";
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
			"test3",
			"test4",
			"test5",
			"test6",
			"test7",
			"test8",
			"test9",
			"test10",
			"test11",
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
		if (field_name == "test3")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test4")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test5")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test6")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test7")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test8")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test9")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test10")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"annotations": Vector.from([
					new Runtime.Unit.Test(Runtime.Map.from({})),
				]),
			});
		}
		if (field_name == "test11")
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
Runtime.rtl.defClass(BayLang.Test.LangBay.Style);
window["BayLang.Test.LangBay.Style"] = BayLang.Test.LangBay.Style;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Test.LangBay.Style;
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Test == 'undefined') BayLang.Test = {};
BayLang.Test.ModuleDescription = function()
{
};
Object.assign(BayLang.Test.ModuleDescription.prototype,
{
});
Object.assign(BayLang.Test.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "BayLang.Test";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return BayLang.ModuleDescription.getModuleVersion();
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({"BayLang":">=0.12"});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Base"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Expression"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Html"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Operator"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Program"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Style")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Test";
	},
	getClassName: function()
	{
		return "BayLang.Test.ModuleDescription";
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
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(BayLang.Test.ModuleDescription);
window["BayLang.Test.ModuleDescription"] = BayLang.Test.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Test.ModuleDescription;
