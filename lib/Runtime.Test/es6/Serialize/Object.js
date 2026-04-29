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
Runtime.Test.Serialize.Object = class
{
	assignObject1()
	{
		let data = Runtime.Map.create({
			"name": "User",
		});
		let errors = Runtime.Vector.create([]);
		let user = new Runtime.Test.Serialize.Data.User();
		Runtime.rtl.assign(user, data, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalType(user.name, "string");
		Runtime.Unit.AssertHelper.equalValue(user.name, "User");
	}
	
	
	assignObject2()
	{
		let data = Runtime.Map.create({
			"name": Runtime.Vector.create([]),
		});
		let errors = Runtime.Vector.create([]);
		let user = new Runtime.Test.Serialize.Data.User();
		Runtime.rtl.assign(user, data, errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 1, "Should be errors");
	}
	
	
	assignObject3()
	{
		let data = Runtime.Map.create({
			"name": "User",
			"roles": Runtime.Vector.create([
				"admin",
				"user",
			]),
		});
		let errors = Runtime.Vector.create([]);
		let user = new Runtime.Test.Serialize.Data.User();
		Runtime.rtl.assign(user, data, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalType(user.name, "string");
		Runtime.Unit.AssertHelper.equalValue(user.name, "User");
		Runtime.Unit.AssertHelper.equalType(user.roles, "vector");
		Runtime.Unit.AssertHelper.equalValue(user.roles, Runtime.Vector.create(["admin", "user"]));
	}
	
	
	assignObject4()
	{
		let data = Runtime.Map.create({
			"name": "User",
			"contact": Runtime.Map.create({
				"kind": "email",
				"email": "info@example.com",
			}),
		});
		let errors = Runtime.Vector.create([]);
		let user = new Runtime.Test.Serialize.Data.User();
		Runtime.rtl.assign(user, data, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalType(user.name, "string");
		Runtime.Unit.AssertHelper.equalValue(user.name, "User");
		let contact = user.contact;
		Runtime.Unit.AssertHelper.equalType(contact, "object");
		Runtime.Unit.AssertHelper.equalValue(contact.constructor.getClassName(), "Runtime.Test.Serialize.Data.ContactEmail");
		Runtime.Unit.AssertHelper.equalValue(contact.email, "info@example.com");
	}
	
	
	assignObject5()
	{
		let data = Runtime.Map.create({
			"name": "User",
			"contact": new Runtime.Map(),
		});
		let errors = Runtime.Vector.create([]);
		let user = new Runtime.Test.Serialize.Data.User();
		Runtime.rtl.assign(user, data, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalType(user.name, "string");
		Runtime.Unit.AssertHelper.equalValue(user.name, "User");
		Runtime.Unit.AssertHelper.equalValue(user.contact, null);
	}
	
	
	assignObject6()
	{
		let data = Runtime.Map.create({
			"items": Runtime.Vector.create([
				Runtime.Map.create({
					"kind": "email",
					"email": "info@example.com",
				}),
				Runtime.Map.create({
					"kind": "phone",
					"phone": "+70000000000",
				}),
			]),
		});
		let errors = Runtime.Vector.create([]);
		let item = new Runtime.Test.Serialize.Data.ContactList();
		Runtime.rtl.assign(item, data, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		Runtime.Unit.AssertHelper.equalValue(item.items.count(), 2);
		Runtime.Unit.AssertHelper.equalClass(item.items.get(0), "Runtime.Test.Serialize.Data.ContactEmail");
		Runtime.Unit.AssertHelper.equalClass(item.items.get(1), "Runtime.Test.Serialize.Data.ContactPhone");
		Runtime.Unit.AssertHelper.equalValue(item.items.get(0).email, "info@example.com");
		Runtime.Unit.AssertHelper.equalValue(item.items.get(1).phone, "+70000000000");
	}
	
	
	assignObject7()
	{
		let data = Runtime.Map.create({
			"frontend": Runtime.Map.create({
				"user": Runtime.Map.create({
					"__class_name__": "Runtime.Test.Serialize.Data.User",
					"name": "User",
					"contact": Runtime.Map.create({
						"kind": "email",
						"email": "info@example.com",
					}),
				}),
			}),
		});
		let errors = Runtime.Vector.create([]);
		let item = new Runtime.BaseStorage();
		Runtime.rtl.assign(item, data, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		let user = item.frontend.get("user");
		Runtime.Unit.AssertHelper.equalClass(user, "Runtime.Test.Serialize.Data.User");
		Runtime.Unit.AssertHelper.equalClass(user.contact, "Runtime.Test.Serialize.Data.ContactEmail");
		Runtime.Unit.AssertHelper.equalValue(user.contact.email, "info@example.com");
	}
	
	
	assignObject8()
	{
		let data = Runtime.Map.create({
			"user": Runtime.Map.create({
				"name": "User",
				"contact": Runtime.Map.create({
					"kind": "email",
					"email": "info@example.com",
				}),
			}),
		});
		let errors = Runtime.Vector.create([]);
		let item = new Runtime.Test.Serialize.Data.PageModel();
		Runtime.rtl.assign(item, data, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		let user = item.user;
		Runtime.Unit.AssertHelper.equalClass(user, "Runtime.Test.Serialize.Data.User");
		Runtime.Unit.AssertHelper.equalClass(user.contact, "Runtime.Test.Serialize.Data.ContactEmail");
		Runtime.Unit.AssertHelper.equalValue(user.contact.email, "info@example.com");
	}
	
	
	assignObject9()
	{
		let data = Runtime.Map.create({
			"table": Runtime.Map.create({
				"items": Runtime.Vector.create([
					Runtime.Map.create({"name": "User"}),
				]),
			}),
		});
		let layout = new Runtime.BaseLayout();
		let errors = Runtime.Vector.create([]);
		let item = new Runtime.Test.Serialize.Data.PageModel(Runtime.Map.create({"layout": layout}));
		Runtime.rtl.assign(item, data, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		let table = item.table;
		Runtime.Unit.AssertHelper.equalClass(table, "Runtime.Widget.Table.TableModel");
		Runtime.Unit.AssertHelper.equalValue(table.component, "App.Table");
		Runtime.Unit.AssertHelper.equalClass(table.items, "Runtime.Vector");
		Runtime.Unit.AssertHelper.equalValue(table.items.count(), 1, "Error table count items");
		Runtime.Unit.AssertHelper.equalValue(table.layout, layout, "Layout not found");
		let user = table.items.get(0);
		Runtime.Unit.AssertHelper.equalClass(user, "Runtime.Map");
		Runtime.Unit.AssertHelper.equalValue(user.get("name"), "User");
	}
	
	
	assignLayout()
	{
		let data = Runtime.Map.create({
			"current_page_model": "page_model",
			"pages": Runtime.Map.create({
				"page_model": Runtime.Map.create({
					"__class_name__": "Runtime.Test.Serialize.Data.PageModel",
					"user": Runtime.Map.create({
						"name": "User",
					}),
				}),
			}),
		});
		let errors = Runtime.Vector.create([]);
		let layout = new Runtime.BaseLayout();
		Runtime.rtl.assign(layout, data, errors);
		errors = Runtime.Serializer.TypeError.getMessages(errors);
		Runtime.Unit.AssertHelper.equalValue(errors.count(), 0, Runtime.rs.join(", ", errors));
		let model = layout.getPageModel();
		Runtime.Unit.AssertHelper.equalClass(model, "Runtime.Test.Serialize.Data.PageModel");
		Runtime.Unit.AssertHelper.equalClass(model.user, "Runtime.Test.Serialize.Data.User");
		Runtime.Unit.AssertHelper.equalValue(model.user.name, "User");
		Runtime.Unit.AssertHelper.equalValue(model.layout, layout, "Layout not found");
	}
	
	
	serializeObject1()
	{
		let user = new Runtime.Test.Serialize.Data.User();
		user.name = "User";
		let api_value = Runtime.rtl.serialize(user);
		let correct_value = Runtime.Map.create({
			"name": "User",
			"roles": Runtime.Vector.create([]),
			"contact": null,
		});
		Runtime.Unit.AssertHelper.equalValue(api_value, correct_value);
	}
	
	
	serializeObject2()
	{
		let user = new Runtime.Test.Serialize.Data.User();
		user.name = Runtime.Vector.create([]);
		let api_value = Runtime.rtl.serialize(user);
		let correct_value = Runtime.Map.create({
			"name": "",
			"roles": Runtime.Vector.create([]),
			"contact": null,
		});
		Runtime.Unit.AssertHelper.equalValue(api_value, correct_value);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.Test.Serialize.Object"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("assignObject1", "assignObject2", "assignObject3", "assignObject4", "assignObject5", "assignObject6", "assignObject7", "assignObject8", "assignObject9", "assignLayout", "serializeObject1", "serializeObject2");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "assignObject1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "assignObject2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "assignObject3") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "assignObject4") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "assignObject5") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "assignObject6") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "assignObject7") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "assignObject8") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "assignObject9") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "assignLayout") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "serializeObject1") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		if (field_name == "serializeObject2") return new Vector(
			new Runtime.Unit.Test(new Runtime.Map())
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.Test.Serialize.Object"] = Runtime.Test.Serialize.Object;