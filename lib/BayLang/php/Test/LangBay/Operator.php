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
class Operator
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
		$res = $this->parser->parser_operator::readOperators($this->parser);
		$op_code = $res->get(1);
		/* Translate */
		$this->translator->operator->translateItems($op_code, $result);
		/* Debug output */
		if ($debug)
		{
			var_dump($op_code);
			var_dump($result);
			var_dump(\Runtime\rs::join("", $result));
		}
		return \Runtime\Vector::from([$op_code,\Runtime\rs::join("", $result)]);
	}
	function testAssign1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tint a;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAssign2()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tint a = 1;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAssign3()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tint a = 1;","\ta = 2;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAssign4()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tint a = 1, b = 2;","\ta = a + b;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAssign5()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tthis.a = 1;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAssign6()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tCollection<string> content = [];","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAssign7()
	{
		$this->reset();
		$this->addVar("content");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tstring content = rs::join(\"\\n\", content);","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testBreak()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tbreak;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testContinue()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tcontinue;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testReturn1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\treturn;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testReturn2()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\treturn 1;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testReturn3()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\treturn true;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testReturn4()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\treturn this.result;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testInc1()
	{
		$this->reset();
		$this->addVar("a");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\ta++;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testInc2()
	{
		$this->reset();
		$this->addVar("a");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t++a;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDec1()
	{
		$this->reset();
		$this->addVar("a");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\ta--;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDec2()
	{
		$this->reset();
		$this->addVar("a");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t--a;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFor1()
	{
		$this->reset();
		$this->addVar("io");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tfor (int i = 0; i < 10; i++)","\t{","\t\tio::print(i);","\t}","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testIf1()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$this->addVar("io");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tif (a > b)","\t{","\t\tio::print(\"Yes\");","\t}","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testIf2()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$this->addVar("io");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tif (a > b)","\t{","\t\tio::print(\"Yes\");","\t}","\telse","\t{","\t\tio::print(\"No\");","\t}","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testIf3()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("io");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tif (a == 1)","\t{","\t\tio::print(1);","\t}","\telse if (a == 2)","\t{","\t\tio::print(2);","\t}","\telse if (a == 3)","\t{","\t\tio::print(3);","\t}","\telse","\t{","\t\tio::print(\"No\");","\t}","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testThrow1()
	{
		$this->reset();
		$this->addVar("RuntimeException");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\tthrow new RuntimeException(\"Error\");","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testTry1()
	{
		$this->reset();
		$this->addVar("io");
		$this->addVar("RuntimeException");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\ttry","\t{","\t\tthis.translate();","\t}","\tcatch (RuntimeException e)","\t{","\t\tio::print_error(e.toString());","\t}","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testWhile1()
	{
		$this->reset();
		$this->addVar("i");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\twhile (i < 10)","\t{","\t\ti++;","\t}","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testComment1()
	{
		$this->reset();
		$this->addVar("i");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t/* Increment value */","\ti++;","}"]));
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
		return "BayLang.Test.LangBay.Operator";
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
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "testAssign1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAssign2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAssign3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAssign4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAssign5")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAssign6")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAssign7")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testBreak")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testContinue")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testReturn1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testReturn2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testReturn3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testReturn4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testInc1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testInc2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDec1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDec2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testFor1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testIf1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testIf2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testIf3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testThrow1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testTry1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testWhile1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testComment1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		return null;
	}
}