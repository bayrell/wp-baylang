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
class Program
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
		$res = $this->parser->parser_program::readProgram($this->parser);
		$op_code = $res->get(1);
		/* Translate */
		$this->translator->program->translateItems($op_code->items, $result);
		/* Debug output */
		if ($debug)
		{
			var_dump($op_code);
			var_dump($result);
			var_dump(\Runtime\rs::join("", $result));
		}
		return \Runtime\Vector::from([$op_code,\Runtime\rs::join("", $result)]);
	}
	function testNamespace()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["namespace App;",""]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testUse1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["use Runtime.Unit.Test;"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testUse2()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["use Runtime.Unit.Test as TestAlias;"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testClass1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test","{","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testClass2()
	{
		$this->reset();
		$this->addVar("BaseObject");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test extends BaseObject","{","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testClass3()
	{
		$this->reset();
		$this->addVar("TestInterface");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test implements TestInterface","{","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testClass4()
	{
		$this->reset();
		$this->addVar("TestInterface1");
		$this->addVar("TestInterface2");
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test implements TestInterface1, TestInterface2","{","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testClass5()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test<T> extends Collection<T>","{","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testInterface1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["interface Test","{","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testStruct1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["struct Test","{","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test","{","\tvoid main(){}","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn2()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test","{","\tvoid main(int a, int b = 1){}","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn3()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test","{","\tbool main()","\t{","\t\treturn true;","\t}","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn4()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test","{","\tbool main() => true;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testFn5()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["class Test","{","\tstatic bool main() => true;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAssign1()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["namespace App;","","use App.IndexPage;","","class Test","{","\tstring component = classof IndexPage;","}"]));
		$res = $this->translate($content);
		\Runtime\Unit\AssertHelper::equalValue($content, $res->get(1), $content);
	}
	function testAssign2()
	{
		$this->reset();
		$content = \Runtime\rs::join("\n", \Runtime\Vector::from(["namespace App;","","use App.IndexPage;","use Runtime.Web.Annotations.Param;","","","class Test","{","\t@Param{}","\tstring component = classof IndexPage;","}"]));
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
		return "BayLang.Test.LangBay.Program";
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
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "testNamespace")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testUse1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testUse2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testClass1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testClass2")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testClass3")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testClass4")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testClass5")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testInterface1")
			return \Runtime\Dict::from([
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Unit\Test([]),
				]),
			]);
		if ($field_name == "testStruct1")
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
		return null;
	}
}