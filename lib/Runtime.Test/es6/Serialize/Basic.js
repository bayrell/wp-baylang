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
if (typeof Runtime.Test.Serialize == 'undefined') Runtime.Test.Serialize = {};
Runtime.Test.Serialize.Basic = class
{
	checkString1()
	{
		let api_value = "User";
		let correct_value = "User";
		let errors = Runtime.Vector.create([]);
		let rule = new Runtime.Serializer.StringType();
		let new_value = rule.filter(api_value, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	checkString2()
	{
		let api_value = 1;
		let correct_value = "1";
		let errors = Runtime.Vector.create([]);
		let rule = new Runtime.Serializer.StringType();
		let new_value = rule.filter(api_value, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	checkString3()
	{
		let api_value = 1;
		let correct_value = "";
		let errors = Runtime.Vector.create([]);
		let rule = new Runtime.Serializer.StringType(Runtime.Map.create({"convert": false}));
		let new_value = rule.filter(api_value, errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 1, "Should be errors");
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	checkInteger1()
	{
		let api_value = 1;
		let correct_value = 1;
		let errors = Runtime.Vector.create([]);
		let rule = new Runtime.Serializer.IntegerType();
		let new_value = rule.filter(api_value, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	checkInteger2()
	{
		let api_value = "1";
		let correct_value = 1;
		let errors = Runtime.Vector.create([]);
		let rule = new Runtime.Serializer.IntegerType();
		let new_value = rule.filter(api_value, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	checkInteger3()
	{
		let api_value = Runtime.Vector.create([]);
		let correct_value = 1;
		let errors = Runtime.Vector.create([]);
		let rule = new Runtime.Serializer.IntegerType();
		let new_value = rule.filter(api_value, errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 1, "Should be errors");
	}
	
	
	checkMap1()
	{
		let api_value = Runtime.Map.create({
			"name": "User",
		});
		let correct_value = Runtime.Map.create({
			"name": "User",
		});
		let rule = new Runtime.Serializer.MapType(new Runtime.Serializer.StringType());
		let errors = Runtime.Vector.create([]);
		let new_value = rule.filter(api_value, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	checkMap2()
	{
		let api_value = Runtime.Map.create({
			"name": 1,
		});
		let correct_value = Runtime.Map.create({
			"name": "1",
		});
		let errors = Runtime.Vector.create([]);
		let rule = new Runtime.Serializer.MapType(new Runtime.Serializer.StringType());
		let new_value = rule.filter(api_value, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	checkMap3()
	{
		let api_value = Runtime.Map.create({
			"name": "User",
			"fruits": Runtime.Vector.create(["apple", "banana", "cherry", "grape", "orange", "watermelon"]),
		});
		let correct_value = Runtime.Map.create({
			"name": "User",
			"fruits": Runtime.Vector.create(["apple", "banana", "cherry", "grape", "orange", "watermelon"]),
		});
		let rule = new Runtime.Serializer.MapType(Runtime.Map.create({
			"name": new Runtime.Serializer.StringType(),
			"fruits": new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType()),
		}));
		let errors = Runtime.Vector.create([]);
		let new_value = rule.filter(api_value, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	checkVector1()
	{
		let api_value = Runtime.Vector.create(["a", "b", "c"]);
		let correct_value = Runtime.Vector.create(["a", "b", "c"]);
		let errors = Runtime.Vector.create([]);
		let rule = new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType());
		let new_value = rule.filter(api_value, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	checkVector2()
	{
		let api_value = Runtime.Vector.create([1]);
		let correct_value = Runtime.Vector.create(["1"]);
		let errors = Runtime.Vector.create([]);
		let rule = new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType());
		let new_value = rule.filter(api_value, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(correct_value, new_value);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.Test.Serialize.Basic"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("checkString1", "checkString2", "checkString3", "checkInteger1", "checkInteger2", "checkInteger3", "checkMap1", "checkMap2", "checkMap3", "checkVector1", "checkVector2");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "checkString1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkString2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkString3") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkInteger1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkInteger2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkInteger3") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkMap1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkMap2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkMap3") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkVector1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "checkVector2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.Test.Serialize.Basic"] = Runtime.Test.Serialize.Basic;