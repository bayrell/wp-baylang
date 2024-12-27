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
Runtime.ORM.Annotations.BaseType = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.ORM.Annotations.BaseType.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.ORM.Annotations.BaseType.prototype.constructor = Runtime.ORM.Annotations.BaseType;
Object.assign(Runtime.ORM.Annotations.BaseType.prototype,
{
	/**
	 * Process item from database
	 */
	fromDatabase: async function(conn, item)
	{
		if (item.has(this.name))
		{
			item = await conn.fromDatabase(this, item, this.name);
		}
		return Promise.resolve(item);
	},
	/**
	 * Process item to database
	 */
	toDatabase: async function(conn, item, is_update)
	{
		if (!is_update && this.name != "" && this.default !== null && !item.has(this.name))
		{
			item = Runtime.rtl.setAttr(item, Runtime.Collection.from([this.name]), this.default);
		}
		item = await conn.toDatabase(this, item, this.name);
		return Promise.resolve(item);
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.default = null;
		this.table_name_source = "";
		this.name = "";
		this.comment = "";
		this.nullable = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "default")return this.default;
		else if (k == "table_name_source")return this.table_name_source;
		else if (k == "name")return this.name;
		else if (k == "comment")return this.comment;
		else if (k == "nullable")return this.nullable;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.ORM.Annotations.BaseType, Runtime.BaseStruct);
Object.assign(Runtime.ORM.Annotations.BaseType,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Annotations.BaseType";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
		a.push("default");
		a.push("table_name_source");
		a.push("name");
		a.push("comment");
		a.push("nullable");
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
Runtime.rtl.defClass(Runtime.ORM.Annotations.BaseType);
window["Runtime.ORM.Annotations.BaseType"] = Runtime.ORM.Annotations.BaseType;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Annotations.BaseType;