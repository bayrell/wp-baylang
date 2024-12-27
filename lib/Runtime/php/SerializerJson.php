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
namespace Runtime;
class SerializerJson extends \Runtime\SerializerNative
{
	/**
	 * Export object to data
	 */
	function encode($object)
	{
		$this->setFlag(static::ENCODE);
		$value = $this->encodeItem($object);
		$json_flags = JSON_UNESCAPED_UNICODE;
		if ($this->hasFlag(static::JSON_PRETTY))
		{
			$json_flags = $json_flags | JSON_PRETTY_PRINT;
		}
		return json_encode($value, $json_flags);
	}
	/**
	 * Import from string
	 */
	function decode($s)
	{
		$this->setFlag(static::DECODE);
		$res = @json_decode($s, false);
		if ($res === null || $res === false)
			return null;
		return $this->decodeItem($res);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.SerializerJson";
	}
	static function getParentClassName()
	{
		return "Runtime.SerializerNative";
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