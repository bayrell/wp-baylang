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