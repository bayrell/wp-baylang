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
if (typeof Runtime.Auth == 'undefined') Runtime.Auth = {};
if (typeof Runtime.Auth.Database == 'undefined') Runtime.Auth.Database = {};
Runtime.Auth.Database.User = class extends Runtime.ORM.Record
{
	/**
	 * Returns table name
	 */
	static getTableName(){ return "users"; }
	
	
	/**
	 * Returns table schema
	 */
	static schema()
	{
		return Runtime.Vector.create([
			new Runtime.ORM.Annotations.BigIntType(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "login"})),
			new Runtime.ORM.Annotations.StringType(Runtime.Map.create({"name": "password"})),
			new Runtime.ORM.Annotations.BooleanType(Runtime.Map.create({"name": "is_deleted"})),
			new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.create({"name": "gmtime_add", "autocreate": true})),
			new Runtime.ORM.Annotations.DateTimeType(Runtime.Map.create({"name": "gmtime_edit", "autocreate": true})),
			new Runtime.ORM.Annotations.AutoIncrement(Runtime.Map.create({"name": "id"})),
			new Runtime.ORM.Annotations.Primary(Runtime.Map.create({"keys": Runtime.Vector.create(["id"])})),
		]);
	}
	
	
	/**
	 * Returns token data
	 */
	getTokenData()
	{
		return Runtime.Map.create({
			"id": this.id,
			"login": this.login,
		});
	}
	
	
	/**
	 * Save
	 */
	async save(params)
	{
		if (params == undefined) params = null;
		await super.save(params);
	}
	
	
	/**
	 * Check password
	 */
	checkPassword(password)
	{
		return Runtime.Crypt.Password.verify(password, this.get("password"));
	}
	
	
	/**
	 * Set new password
	 */
	setPassword(password)
	{
		this.password = Runtime.Crypt.Password.createHash(password);
	}
	
	
	/**
	 * Find user
	 */
	static async findUser(login, relation)
	{
		if (relation == undefined) relation = null;
		if (!relation) relation = new Runtime.ORM.Relation(this.getClassName());
		let user = await relation.fetchRecord(relation.select().where("login", "=", login).where("is_deleted", "=", 0));
		return user;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.Auth.Database.User"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Auth.Database.User"] = Runtime.Auth.Database.User;