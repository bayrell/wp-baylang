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