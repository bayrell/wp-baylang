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
namespace Runtime\ORM;
class DatabaseSchema extends \Runtime\BaseHook
{
	const SAVE_AFTER="runtime.orm.database::save_after";
	const SAVE_BEFORE="runtime.orm.database::save_before";
	/**
	 * Returns method name by hook name
	 */
	function getMethodName($hook_name)
	{
		if ($hook_name == static::SAVE_AFTER)
		{
			return "onAfterSave";
		}
		if ($hook_name == static::SAVE_BEFORE)
		{
			return "onBeforeSave";
		}
		return "";
	}
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
	}
	/**
	 * Save before item
	 */
	function onBeforeSave($d)
	{
		return $d;
	}
	/**
	 * Save after item
	 */
	function onAfterSave($d)
	{
		return $d;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.DatabaseSchema";
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