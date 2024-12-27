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
namespace Runtime\Hooks;
class RuntimeHook extends \Runtime\BaseHook
{
	const INIT="runtime::init";
	const START="runtime::start";
	const LAUNCHED="runtime::launched";
	const RUN="runtime::run";
	const ENV="runtime::env";
	/**
	 * Returns method name by hook name
	 */
	function getMethodName($hook_name)
	{
		if ($hook_name == static::INIT)
		{
			return "init";
		}
		if ($hook_name == static::START)
		{
			return "start";
		}
		if ($hook_name == static::LAUNCHED)
		{
			return "launched";
		}
		if ($hook_name == static::RUN)
		{
			return "run";
		}
		if ($hook_name == static::ENV)
		{
			return "env";
		}
		return "";
	}
	/**
	 * Init context
	 */
	function init($d)
	{
		return $d;
	}
	/**
	 * Start context
	 */
	function start($d)
	{
		return $d;
	}
	/**
	 * Launched context
	 */
	function launched($d)
	{
		return $d;
	}
	/**
	 * Run entry point
	 */
	function run($d)
	{
		return $d;
	}
	/**
	 * Init context
	 */
	function env($d)
	{
		return $d;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Hooks";
	}
	static function getClassName()
	{
		return "Runtime.Hooks.RuntimeHook";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseHook";
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