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
namespace Runtime\Unit\Commands;
class TestRun extends \Runtime\Console\BaseCommand
{
	/**
	 * Returns name
	 */
	static function getName()
	{
		return "test::run";
	}
	/**
	 * Returns description
	 */
	static function getDescription()
	{
		return "Run test";
	}
	/**
	 * Run task
	 */
	static function run()
	{
		$test_name = \Runtime\rtl::attr(\Runtime\rtl::getContext()->cli_args, 2);
		$error_code = static::SUCCESS;
		if ($test_name == null)
		{
			/* List all tests */
			\Runtime\io::print("List of all tests:");
			$tests = \Runtime\rtl::getContext()->provider("Runtime.Unit.TestProvider");
			for ($i = 0; $i < $tests->count(); $i++)
			{
				$test = $tests->get($i);
				\Runtime\io::print($i + 1 . \Runtime\rtl::toStr(") ") . \Runtime\rtl::toStr(\Runtime\io::color("yellow", $test->name)));
			}
		}
		else
		{
			/* Run current test */
			$tests = \Runtime\rtl::getContext()->provider("Runtime.Unit.TestProvider");
			$error_code = $tests->runTestByName($test_name);
			if ($error_code == 1)
			{
				\Runtime\io::print(\Runtime\io::color("green", "OK"));
			}
			else
			{
				\Runtime\io::print(\Runtime\io::color("red", "Fail"));
			}
		}
		return $error_code;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Unit.Commands";
	}
	static function getClassName()
	{
		return "Runtime.Unit.Commands.TestRun";
	}
	static function getParentClassName()
	{
		return "Runtime.Console.BaseCommand";
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