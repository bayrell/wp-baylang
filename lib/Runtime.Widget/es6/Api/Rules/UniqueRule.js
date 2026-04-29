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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Api == 'undefined') Runtime.Widget.Api = {};
if (typeof Runtime.Widget.Api.Rules == 'undefined') Runtime.Widget.Api.Rules = {};
Runtime.Widget.Api.Rules.UniqueRule = class extends Runtime.Widget.Api.Rules.BaseRule
{
	/**
	 * On save before
	 */
	async onSaveBefore(api)
	{
		let field_name = this.field_name;
		let key = this.key;
		if (!key)
		{
			key = Runtime.Vector.create([field_name]);
		}
		let keys = api.relation.getPrimaryKeys();
		let q = api.relation.select(keys);
		for (let name of key)
		{
			q.where(name, "=", api.item.get(name));
		}
		if (api.item.isUpdate())
		{
			let pk = api.relation.getPrimaryKey(api.item.old());
			for (let key of pk.keys())
			{
				q.where(key, "!=", api.item.get(key));
			}
		}
		let row = await api.relation.fetch(q);
		if (row)
		{
			let error = new Runtime.Map();
			error.set(this.field_name, Runtime.Vector.create(["Must be unique"]));
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.FieldException(Runtime.Map.create({
				"fields": error,
			})));
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.field_name = "";
		this.key = null;
	}
	static getClassName(){ return "Runtime.Widget.Api.Rules.UniqueRule"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Api.Rules.UniqueRule"] = Runtime.Widget.Api.Rules.UniqueRule;