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