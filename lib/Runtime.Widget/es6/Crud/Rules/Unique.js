"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Crud == 'undefined') Runtime.Widget.Crud = {};
if (typeof Runtime.Widget.Crud.Rules == 'undefined') Runtime.Widget.Crud.Rules = {};
Runtime.Widget.Crud.Rules.Unique = function()
{
	Runtime.Widget.Crud.Rules.CrudRule.apply(this, arguments);
};
Runtime.Widget.Crud.Rules.Unique.prototype = Object.create(Runtime.Widget.Crud.Rules.CrudRule.prototype);
Runtime.Widget.Crud.Rules.Unique.prototype.constructor = Runtime.Widget.Crud.Rules.Unique;
Object.assign(Runtime.Widget.Crud.Rules.Unique.prototype,
{
	/**
	 * Before save item
	 */
	onSaveBefore: async function(api)
	{
		var q = (new Runtime.ORM.Query()).select().from(api.getTableName()).addRawField("count(1) as c");
		/* Add filter */
		if (this.keys)
		{
			for (var i = 0; i < this.keys.count(); i++)
			{
				var field_name = this.keys.get(i);
				var value = api.item.get(field_name);
				q.where(field_name, "=", value);
			}
		}
		/* Add primary key */
		if (api.item != null && !api.item.isNew())
		{
			var filter = Runtime.ORM.Relation.getPrimaryFilter(api.getTableName(), api.item.toMap(), true);
			for (var i = 0; i < filter.count(); i++)
			{
				var item = Runtime.rtl.attr(filter, i);
				item.op = "!=";
				q.addFilter(item);
			}
		}
		/* Execute query */
		var connection = api.getConnection();
		var res = await connection.fetchVar(q, "c");
		if (res > 0)
		{
			for (var i = 0; i < this.keys.count(); i++)
			{
				var name = this.keys.get(i);
				api.fields.addFieldError(name, "Field must be unique");
			}
		}
	},
	_init: function()
	{
		Runtime.Widget.Crud.Rules.CrudRule.prototype._init.call(this);
		this.keys = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "keys")return this.keys;
		return Runtime.Widget.Crud.Rules.CrudRule.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Widget.Crud.Rules.Unique, Runtime.Widget.Crud.Rules.CrudRule);
Object.assign(Runtime.Widget.Crud.Rules.Unique,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.Rules.Unique";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.Rules.CrudRule";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("keys");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Widget.Crud.Rules.Unique);
window["Runtime.Widget.Crud.Rules.Unique"] = Runtime.Widget.Crud.Rules.Unique;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.Rules.Unique;