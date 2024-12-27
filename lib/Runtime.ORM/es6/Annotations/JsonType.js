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
if (typeof Runtime.ORM == 'undefined') Runtime.ORM = {};
if (typeof Runtime.ORM.Annotations == 'undefined') Runtime.ORM.Annotations = {};
Runtime.ORM.Annotations.JsonType = function()
{
	Runtime.ORM.Annotations.BaseType.apply(this, arguments);
};
Runtime.ORM.Annotations.JsonType.prototype = Object.create(Runtime.ORM.Annotations.BaseType.prototype);
Runtime.ORM.Annotations.JsonType.prototype.constructor = Runtime.ORM.Annotations.JsonType;
Object.assign(Runtime.ORM.Annotations.JsonType.prototype,
{
	/**
	 * Process item from database
	 */
	fromDatabase: async function(conn, item)
	{
		if (item.has(this.name))
		{
			var value = Runtime.rtl.attr(item, this.name);
			var obj = Runtime.rtl.json_decode(value);
			item = Runtime.rtl.setAttr(item, Runtime.Collection.from([this.name]), obj);
			item = await conn.fromDatabase(this, item, this.name);
		}
		return Promise.resolve(item);
	},
	/**
	 * Process item to database
	 */
	toDatabase: async function(conn, item, is_update)
	{
		var value = Runtime.rtl.attr(item, this.name);
		if (value)
		{
			item = Runtime.rtl.setAttr(item, Runtime.Collection.from([this.name]), Runtime.rtl.json_encode(value, false));
		}
		item = await conn.toDatabase(this, item, this.name);
		return Promise.resolve(item);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.ORM.Annotations.BaseType.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.ORM.Annotations.JsonType, Runtime.ORM.Annotations.BaseType);
Object.assign(Runtime.ORM.Annotations.JsonType,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Annotations.JsonType";
	},
	getParentClassName: function()
	{
		return "Runtime.ORM.Annotations.BaseType";
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
Runtime.rtl.defClass(Runtime.ORM.Annotations.JsonType);
window["Runtime.ORM.Annotations.JsonType"] = Runtime.ORM.Annotations.JsonType;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Annotations.JsonType;