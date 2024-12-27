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
namespace Runtime\Unit;
class TestProvider extends \Runtime\BaseProvider
{
	public $tests_list;
	/**
	 * Start provider
	 */
	function start()
	{
		$this->tests_list = \Runtime\rtl::getContext()->entities->filter(\Runtime\lib::isInstance("Runtime.Unit.UnitTest"));
	}
	/**
	 * Returns commands list
	 */
	function getTests()
	{
		return $this->tests_list;
	}
	/**
	 * Returns unit test by pos
	 */
	function get($pos)
	{
		return $this->tests_list->get($pos);
	}
	/**
	 * Returns count of unit tests
	 */
	function count()
	{
		return $this->tests_list->count();
	}
	/**
	 * Run
	 */
	static function run($test_name="")
	{
		$provider = new \Runtime\Unit\TestProvider();
		$provider->start();
		if ($test_name == "")
		{
			\Runtime\io::print("List of all tests:");
			for ($i = 0; $i < $provider->count(); $i++)
			{
				$test = $provider->get($i);
				\Runtime\io::print($i + 1 . \Runtime\rtl::toStr(") ") . \Runtime\rtl::toStr($test->name));
			}
			return ;
		}
		$provider->runTestByName($test_name);
	}
	/**
	 * Run
	 */
	static function runAll()
	{
		$provider = new \Runtime\Unit\TestProvider();
		$provider->start();
		for ($i = 0; $i < $provider->count(); $i++)
		{
			$test = $provider->get($i);
			\Runtime\io::print("Run " . \Runtime\rtl::toStr($test->name));
			$error_code = $provider->runTestByName($test->name);
			if ($error_code != 1)
			{
				return ;
			}
		}
	}
	/**
	 * Run test
	 */
	function runTestByName($test_name)
	{
		$error_code = 0;
		$arr = \Runtime\rs::split("::", $test_name);
		if ($arr->count() == 1)
		{
			/* Run all test in class */
			$error_code = $this->runTestClass($arr->get(0));
		}
		else
		{
			/* Run specific test */
			$error_code = $this->runTestMethod($arr->get(0), $arr->get(1));
		}
		return $error_code;
	}
	/**
	 * Returns true if TestMethod
	 */
	static function isTestMethod($method_info)
	{
		$annotations = \Runtime\rtl::attr($method_info, "annotations");
		if ($annotations)
		{
			for ($j = 0; $j < $annotations->count(); $j++)
			{
				$annotation = $annotations->get($j);
				if ($annotation instanceof \Runtime\Unit\Test)
				{
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * Returns all test methods
	 */
	function getTestMethods($class_name)
	{
		$getMethodsList = new \Runtime\Callback($class_name, "getMethodsList");
		$getMethodInfoByName = new \Runtime\Callback($class_name, "getMethodInfoByName");
		$methods = \Runtime\rtl::apply($getMethodsList);
		$methods = $methods->filter(function ($method_name) use (&$getMethodInfoByName)
		{
			$method_info = \Runtime\rtl::apply($getMethodInfoByName, \Runtime\Vector::from([$method_name]));
			return static::isTestMethod($method_info);
		});
		return $methods;
	}
	/**
	 * Run all test in class
	 */
	function runTestClass($class_name)
	{
		$error_code = 1;
		$methods = $this->getTestMethods($class_name);
		for ($i = 0; $i < $methods->count(); $i++)
		{
			$method_name = $methods->get($i);
			$result = $this->runTestMethod($class_name, $method_name);
			if ($result != 1)
			{
				$error_code = -1;
				break;
			}
		}
		if ($error_code == 1)
		{
			\Runtime\io::print(\Runtime\io::color("green", "Success"));
		}
		return $error_code;
	}
	/**
	 * Run test method
	 */
	function runTestMethod($class_name, $method_name)
	{
		$error_code = 0;
		try
		{
			
			$callback = new \Runtime\Callback($class_name, $method_name);
			if (!$callback->exists())
			{
				$obj = \Runtime\rtl::newInstance($class_name);
				$callback = new \Runtime\Callback($obj, $method_name);
			}
			if ($callback->exists())
			{
				\Runtime\rtl::apply($callback);
				$error_code = 1;
				\Runtime\io::print($class_name . \Runtime\rtl::toStr("::") . \Runtime\rtl::toStr($method_name) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr(\Runtime\io::color("green", "Ok")));
			}
			else
			{
				throw new \Runtime\Exceptions\ItemNotFound($class_name . \Runtime\rtl::toStr("::") . \Runtime\rtl::toStr($method_name), "Method");
			}
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \Runtime\Exceptions\AssertException)
			{
				$e = $_ex;
				\Runtime\io::print($class_name . \Runtime\rtl::toStr("::") . \Runtime\rtl::toStr($method_name) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr(\Runtime\io::color("red", "Error: " . \Runtime\rtl::toStr($e->getErrorMessage()))));
				$error_code = $e->getErrorCode();
			}
			else
			{
				throw $_ex;
			}
		}
		return $error_code;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->tests_list = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Unit";
	}
	static function getClassName()
	{
		return "Runtime.Unit.TestProvider";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseProvider";
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
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}