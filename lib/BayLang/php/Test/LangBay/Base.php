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
class Base
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
	function testNumber()
	{
		$this->reset();
		$content = "1";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testReal()
	{
		$this->reset();
		$content = "0.1";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testString()
	{
		$this->reset();
		$content = "\"test\"";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testIdentifier()
	{
		$this->reset();
		$this->addVar("a");
		$content = "a";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAttr1()
	{
		$this->reset();
		$content = "this.a";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAttr2()
	{
		$this->reset();
		$content = "this.a.b";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAttr3()
	{
		$this->reset();
		$content = "static::a";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAttr4()
	{
		$this->reset();
		$content = "parent::a";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAttr5()
	{
		$this->reset();
		$this->addVar("a");
		$content = "a[1]";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAttr6()
	{
		$this->reset();
		$this->addVar("a");
		$content = "a[1, 2]";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAttr7()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("name");
		$content = "a[name]";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testCollection1()
	{
		$this->reset();
		$content = "[]";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testCollection2()
	{
		$this->reset();
		$content = "[1, 2, 3]";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testCollection3()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$this->addVar("c");
		$content = "[a, b, c]";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testCollection4()
	{
		$this->reset();
		$content = "[\"a\", \"b\", \"c\"]";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testCollection5()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["[","\t\"a\",","\t\"b\",","\t\"c\",","]"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDict1()
	{
		$this->reset();
		$content = "{}";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDict2()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t\"name\": \"test\",","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDict3()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t\"name\": \"test\",","\t\"value\": 10,","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDict4()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t\"obj\": {},","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDict5()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t\"obj\": {","\t},","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDict6()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t\"obj\": [","\t],","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDict7()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t\"obj\": {","\t\t\"name\": \"test\",","\t\t\"value\": 10,","\t},","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testDict8()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t\"obj\": {\"name\": \"test\", \"value\": 10},","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testPreprocessor1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["[","\t\"1\",","\t#ifdef BACKEND then","\t\"2\",","\t\"3\",","\t#endif","\t\"4\",","]"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testPreprocessor2()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["{","\t\"name\": \"test\",","\t#ifdef BACKEND then","\t\"value1\": 1,","\t\"value2\": 2,","\t#endif","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn1()
	{
		$this->reset();
		$this->addVar("a");
		$content = "a()";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn2()
	{
		$this->reset();
		$this->addVar("a");
		$content = "a(1, 2)";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn3()
	{
		$this->reset();
		$content = "this.a(1, 2)";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn4()
	{
		$this->reset();
		$content = "parent(1, 2)";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn5()
	{
		$this->reset();
		$content = "static::getName(1, 2)";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn6()
	{
		$this->reset();
		$this->addVar("a");
		$this->addVar("b");
		$this->addVar("c");
		$content = "a(b, c)";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn7()
	{
		$this->reset();
		$this->addVar("a");
		$content = "a().b()";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn8()
	{
		$this->reset();
		$this->addVar("a");
		$content = "a{}";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn9()
	{
		$this->reset();
		$this->addVar("a");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["a{","\t\"name\": \"test\",","\t\"value\": 10,","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testNew1()
	{
		$this->reset();
		$this->addVar("Test");
		$content = "new Test()";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testNew2()
	{
		$this->reset();
		$this->addVar("Test");
		$content = "new Test(this.name, this.value)";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testNew3()
	{
		$this->reset();
		$this->addVar("Test");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["new Test{","\t\"name\": \"test\",","\t\"value\": 10,","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testNew4()
	{
		$this->reset();
		$this->addVar("Query");
		$content = "new Query().select(\"table\")";
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testNew5()
	{
		$this->reset();
		$content = "new Collection<string>()";
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
		return "BayLang.Test.LangBay.Base";
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
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "testNumber")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testReal")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testString")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testIdentifier")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAttr1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAttr2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAttr3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAttr4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAttr5")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAttr6")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testAttr7")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testCollection1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testCollection2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testCollection3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testCollection4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testCollection5")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDict1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDict2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDict3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDict4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDict5")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDict6")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDict7")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testDict8")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testPreprocessor1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testPreprocessor2")
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
		if ($field_name == "testFn4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testFn5")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testFn6")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testFn7")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testFn8")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testFn9")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testNew1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testNew2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testNew3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testNew4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testNew5")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		return null;
	}
}