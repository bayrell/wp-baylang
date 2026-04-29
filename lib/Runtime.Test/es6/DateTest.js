"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Test == 'undefined') Runtime.Test = {};
Runtime.Test.DateTest = class
{
	/**
	 * Padding
	 */
	pad2(value)
	{
		if (value < 10) return "0" + String(value);
		return value;
	}
	
	
	checkCopyDate()
	{
		let date = new Runtime.DateTime(Runtime.Map.create({
			"y": 2026,
			"m": 3,
			"d": 16,
			"h": 0,
			"i": 0,
			"s": 0,
			"o": 5,
		}));
		for (let i = 0; i < 24; i++)
		{
			let copy_date = date.copy(Runtime.Map.create({"h": i}));
			let correct_date = "2026-03-16 " + String(this.pad2(copy_date.h)) + String(":00:00");
			Runtime.Unit.AssertHelper.equalValue(copy_date.format(), correct_date);
			Runtime.Unit.AssertHelper.equalValue(copy_date.o, date.o);
		}
	}
	
	
	checkDayOfWeek()
	{
		let date = new Runtime.DateTime(Runtime.Map.create({
			"y": 2026,
			"m": 3,
			"d": 16,
			"h": 0,
			"i": 0,
			"s": 0,
			"o": 5,
		}));
		for (let i = 0; i < 24; i++)
		{
			let copy_date = date.copy(Runtime.Map.create({"h": i}));
			let day = copy_date.getDayOfWeek();
			Runtime.Unit.AssertHelper.equalValue(day, 1, "Hour: " + String(i));
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.Test.DateTest"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("checkCopyDate", "checkDayOfWeek");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "checkCopyDate") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkDayOfWeek") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.Test.DateTest"] = Runtime.Test.DateTest;