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