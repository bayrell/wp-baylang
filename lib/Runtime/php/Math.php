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
class Math
{
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	static function ceil($value)
	{
		return ceil($value);
	}
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	static function floor($value)
	{
		return floor($value);
	}
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	static function round($value)
	{
		return round($value);
	}
	/**
	 * Returns abs
	 */
	static function abs($a)
	{
		if ($a < 0)
		{
			return 0 - $a;
		}
		else
		{
			return $a;
		}
	}
	/**
	 * Returns max
	 */
	static function max($a, $b)
	{
		if ($a > $b)
		{
			return $a;
		}
		else
		{
			return $b;
		}
	}
	/**
	 * Returns min
	 */
	static function min($a, $b)
	{
		if ($a < $b)
		{
			return $a;
		}
		else
		{
			return $b;
		}
	}
	/**
	 * Returns random value x, where 0 <= x < 1
	 * @return double
	 */
	static function urandom()
	{
		return mt_rand() / (mt_getrandmax() + 1);
	}
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	static function random($a, $b)
	{
		return static::round(static::urandom() * ($b - $a) + $a);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Math";
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
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}