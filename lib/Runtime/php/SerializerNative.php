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
class SerializerNative extends \Runtime\Serializer
{
	/**
	 * Decode item
	 */
	function decodeItem($value, $object_value=null, $create=null)
	{
		if ($value === null)
		{
			return null;
		}
		if ($value instanceof \Runtime\BaseObject)
		{
			return $value;
		}
		if (is_object($value) || is_array($value))
		{
			$class_name = null;
			if (is_object($value))
				if (property_exists($value, "__class_name__"))
					$class_name = $value->__class_name__;
			if (is_array($value))
				if (isset($value["__class_name__"]))
					$class_name = $value["__class_name__"];
			
			if (is_array($value) && $class_name == null)
			{
				$value = array_values($value);
				$value = \Runtime\Vector::from($value);
			}
			else
			{
				$value = \Runtime\Map::from($value);
			}
		}
		$value = parent::decodeItem($value, $object_value, $create);
		return $value;
	}
	/**
	 * Encode item
	 */
	function encodeItem($encode_value)
	{
		if ($encode_value === null)
		{
			return null;
		}
		$value = parent::encodeItem($encode_value);
		if ($value instanceof \Runtime\Collection)
		{
			return $value->jsonSerialize();
		}
		if ($value instanceof \Runtime\Dict)
		{
			$map = $value->jsonSerialize();
			return (object)$map;
		}
		return $value;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.SerializerNative";
	}
	static function getParentClassName()
	{
		return "Runtime.Serializer";
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