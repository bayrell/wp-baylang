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
Runtime.BaseObject = function()
{
	/* Init object */
	this._init();
};
Object.assign(Runtime.BaseObject.prototype,
{
	/**
	 * Init function
	 */
	_init: function()
	{
	},
	/**
	 * Init struct data
	 */
	_changes: function(changes)
	{
	},
	/**
	 * Assign new values
	 */
	_assign_values: function(changes)
	{
		if (changes == undefined) changes = null;
		if (typeof changes == 'object' && !(changes instanceof Runtime.Dict))
		{
			changes = new Runtime.Map(changes);
		}
		if (changes == null)
		{
			return ;
		}
		if (changes.keys().count() == 0)
		{
			return ;
		}
		if (!(changes instanceof Runtime.Map))
		{
			changes = changes.toMap();
		}
		this._changes(changes);
		var _Dict = use("Runtime.Dict");
		var rtl = use("Runtime.rtl");
		if (changes instanceof _Dict) changes = changes.toObject();
		for (var key in changes)
		{
			var value = changes[key];
			this[key] = value;
		}
	},
});
Object.assign(Runtime.BaseObject,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(Runtime.BaseObject);
window["Runtime.BaseObject"] = Runtime.BaseObject;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseObject;