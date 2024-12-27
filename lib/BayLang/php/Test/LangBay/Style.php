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
namespace BayLang\Test\LangBay;
class Style
{
	public $parser;
	/**
	 * Reset
	 */
	function reset()
	{
		/* Create parser */
		$parser = new \BayLang\LangBay\ParserBay();
		$parser = $parser::reset($parser);
		$parser = \Runtime\rtl::setAttr($parser, ["current_namespace_name"], "App");
		$parser = \Runtime\rtl::setAttr($parser, ["current_class_name"], "Test");
		$parser = \Runtime\rtl::setAttr($parser, ["uses"], $parser->uses->setIm("Button", "Runtime.Widget.Button"));
		$this->parser = $parser;
	}
	/**
	 * Set content
	 */
	function setContent($content)
	{
		$this->parser = $this->parser::setContent($this->parser, $content);
	}
	/**
	 * Translate
	 */
	function translate($content, $debug=false)
	{
		$this->setContent($content . \Runtime\rtl::toStr("}"));
		/* Parse */
		$items = \Runtime\Vector::from([]);
		$res = $this->parser->parser_html::readCssBodyItems($this->parser, $items, \Runtime\Vector::from([]));
		$op_code = $res->get(1);
		/* Get items */
		$items = $items->map(function ($op_code)
		{
			return $op_code->value;
		});
		$result = \Runtime\rs::join("\n", $items);
		/* Debug output */
		if ($debug)
		{
			var_dump($items);
			var_dump($result);
		}
		return \Runtime\Vector::from([$op_code,$result]);
	}
	function test1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\tpadding: 20px;","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page.h-71c3{padding: 20px}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test2()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\t.test1{","\t\tpadding: 20px;","\t}","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page.h-71c3 .test1.h-71c3{padding: 20px}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test3()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\t&__test1{","\t\tpadding: 20px;","\t}","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page__test1.h-71c3{padding: 20px}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test4()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\t&__test1{","\t\t&_test2{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page__test1_test2.h-71c3{padding: 20px}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test5()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\t&__test1{","\t\t.test2{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page__test1.h-71c3 .test2.h-71c3{padding: 20px}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test6()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\t.test1{","\t\t&__test2{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page.h-71c3 .test1__test2.h-71c3{padding: 20px}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test7()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\t%(Button)widget_button{","\t\tpadding: 20px;","\t}","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page.h-71c3 .widget_button.h-8dd7{padding: 20px}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test8()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\t%(Button)widget_button{","\t\t&__test1{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page.h-71c3 .widget_button__test1.h-8dd7{padding: 20px}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test9()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\t%(Button)widget_button{","\t\t.test1{","\t\t\tpadding: 20px;","\t\t}","\t}","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page.h-71c3 .widget_button.h-8dd7 .test1.h-71c3{padding: 20px}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test10()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\tp{","\t\tfont-weight: bold;","\t}","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page.h-71c3 p{font-weight: bold}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	function test11()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page{","\tpadding: 20px;","\tcolor: green;","}"]));
		$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from([".main_page.h-71c3{padding: 20px;color: green}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($css_content, $res->get(1), $css_content);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		$this->parser = null;
	}
	static function getNamespace()
	{
		return "BayLang.Test.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.Test.LangBay.Style";
	}
	static function getParentClassName()
	{
		return "";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
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
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "test1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test5")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test6")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test7")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test8")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test9")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test10")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test11")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		return null;
	}
}