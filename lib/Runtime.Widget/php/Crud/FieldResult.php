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
namespace Runtime\Widget\Crud;
class FieldResult extends \Runtime\Map
{
	/**
	 * Returns true if is success
	 */
	function isSuccess()
	{
		return $this->keys()->count() == 0;
	}
	/**
	 * Add field error
	 */
	function addFieldError($field_name, $error_message)
	{
		if (!$this->has($field_name))
		{
			$this->set($field_name, new \Runtime\Vector());
		}
		$messages = $this->get($field_name);
		$messages->push($error_message);
	}
	/**
	 * Check error
	 */
	function checkError()
	{
		if (!$this->isSuccess())
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Widget\Crud\FieldException());
		}
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Crud";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Crud.FieldResult";
	}
	static function getParentClassName()
	{
		return "Runtime.Map";
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