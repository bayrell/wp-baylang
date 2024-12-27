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
namespace Runtime\Exceptions;
class ApiError extends \Runtime\Exceptions\AbstractException
{
	function __construct($prev=null)
	{
		parent::__construct($prev->getErrorMessage(), \Runtime\rtl::ERROR_API_ERROR, $prev);
	}
	/**
	 * Returns error message
	 */
	function getErrorMessage()
	{
		return $this->prev->getErrorMessage();
	}
	/**
	 * Returns error code
	 */
	function getErrorCode()
	{
		return $this->prev->getErrorCode();
	}
	/**
	 * Returns error file name
	 */
	function getFileName()
	{
		return $this->prev->getFileName();
	}
	/**
	 * Returns error line
	 */
	function getErrorLine()
	{
		return $this->prev->getErrorLine();
	}
	/**
	 * Returns error position
	 */
	function getErrorPos()
	{
		return $this->prev->getErrorPos();
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Exceptions";
	}
	static function getClassName()
	{
		return "Runtime.Exceptions.ApiError";
	}
	static function getParentClassName()
	{
		return "Runtime.Exceptions.AbstractException";
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