<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime\Test;

use Runtime\DateTime;
use Runtime\Unit\AssertHelper;
use Runtime\Unit\Test;


class DateTest
{
	/**
	 * Padding
	 */
	function pad2($value)
	{
		if ($value < 10) return "0" . $value;
		return $value;
	}
	
	
	
	function checkCopyDate()
	{
		$date = new \Runtime\DateTime(new \Runtime\Map([
			"y" => 2026,
			"m" => 3,
			"d" => 16,
			"h" => 0,
			"i" => 0,
			"s" => 0,
			"o" => 5,
		]));
		for ($i = 0; $i < 24; $i++)
		{
			$copy_date = $date->copy(new \Runtime\Map(["h" => $i]));
			$correct_date = "2026-03-16 " . $this->pad2($copy_date->h) . ":00:00";
			\Runtime\Unit\AssertHelper::equalValue($copy_date->format(), $correct_date);
			\Runtime\Unit\AssertHelper::equalValue($copy_date->o, $date->o);
		}
	}
	
	
	
	function checkDayOfWeek()
	{
		$date = new \Runtime\DateTime(new \Runtime\Map([
			"y" => 2026,
			"m" => 3,
			"d" => 16,
			"h" => 0,
			"i" => 0,
			"s" => 0,
			"o" => 5,
		]));
		for ($i = 0; $i < 24; $i++)
		{
			$copy_date = $date->copy(new \Runtime\Map(["h" => $i]));
			$day = $copy_date->getDayOfWeek();
			\Runtime\Unit\AssertHelper::equalValue($day, 1, "Hour: " . $i);
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
	}
	static function getClassName(){ return "Runtime.Test.DateTest"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("checkCopyDate", "checkDayOfWeek");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "checkCopyDate") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		if ($field_name == "checkDayOfWeek") return new \Runtime\Vector(
			new \Runtime\Unit\Test(new \Runtime\Map())
		);
		return null;
	}
}