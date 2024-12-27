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
class Expression
{
	public $parser;
	public $translator;
	/**
	 * Reset
	 */
	function reset()
	{
		$this->parser = new \BayLang\LangBay\ParserBay();
		$this->parser = $this->parser::reset($this->parser);
		$this->translator = new \BayLang\LangBay\TranslatorBay();
		$this->translator->reset();
	}
	/**
	 * Set content
	 */
	function setContent($content)
	{
		$this->parser = $this->parser::setContent($this->parser, $content);
	}
	/**
	 * Add variable
	 */
	function addVar($var_name)
	{
		$parser = $this->parser;
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->setIm($var_name, true));
		$this->parser = $parser;
	}
	/**
	 * Translate
	 */
	function translate($content, $debug=false)
	{
		$result = \Runtime\Vector::from([]);
		$this->setContent($content);
		/* Parse */
		$res = $this->parser->parser_expression::readExpression($this->parser);
		$op_code = $res->get(1);
		/* Translate */
		$this->translator->expression->translate($op_code, $result);
		/* Debug output */
		if ($debug)
		{
			var_dump($op_code);
			var_dump($result);
			var_dump(\Runtime\rs::join("", $result));
		}
		return \Runtime\Vector::from([$op_code,\Runtime\rs::join("", $result)]);
	}
	function testMath1()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$content = "a + b";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testMath2()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$content = "a * b";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testMath3()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$this->addVar("c");
		$content = "a + b * c";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testMath4()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$this->addVar("c");
		$content = "(a + b) * c";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testMath5()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$this->addVar("c");
		$content = "a * (b + c)";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testMath6()
	{
		$this->reset();
		$this->addVar("a");
		$content = "not a";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testMath7()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$content = "not (a or b)";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testMath8()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$content = "not a or b";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn1()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$content = "a(this.a + this.b)";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn2()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$content = "a() + b()";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn3()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$this->addVar("c");
		$content = "(a() + b()) * c()";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function test1()
	{
		$this->reset();
		$this->addVar("io");
		$this->addVar("class_name");
		$this->addVar("method_name");
		$content = "io::print(class_name ~ \"::\" ~ method_name ~ " . \Runtime\rtl::toStr("\" \" ~ io::color(\"green\", \"Ok\"))");
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		$this->parser = null;
		$this->translator = null;
	}
	static function getNamespace()
	{
		return "BayLang.Test.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.Test.LangBay.Expression";
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
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "testMath1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testMath2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testMath3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testMath4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testMath5")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testMath6")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testMath7")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testMath8")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testFn1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testFn2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testFn3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "test1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		return null;
	}
}