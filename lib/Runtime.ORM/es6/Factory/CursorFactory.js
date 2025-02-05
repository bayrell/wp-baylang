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
if (typeof Runtime.ORM.Factory == 'undefined') Runtime.ORM.Factory = {};
Runtime.ORM.Factory.CursorFactory = function(cursor_name)
{
	Runtime.BaseObject.call(this);
	this.cursor_name = cursor_name;
};
Runtime.ORM.Factory.CursorFactory.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.Factory.CursorFactory.prototype.constructor = Runtime.ORM.Factory.CursorFactory;
Object.assign(Runtime.ORM.Factory.CursorFactory.prototype,
{
	/**
	 * Returns cursor
	 */
	createCursor: function()
	{
		return Runtime.rtl.newInstance(this.cursor_name);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.cursor_name = "";
	},
});
Object.assign(Runtime.ORM.Factory.CursorFactory, Runtime.BaseObject);
Object.assign(Runtime.ORM.Factory.CursorFactory,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Factory";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Factory.CursorFactory";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
Runtime.rtl.defClass(Runtime.ORM.Factory.CursorFactory);
window["Runtime.ORM.Factory.CursorFactory"] = Runtime.ORM.Factory.CursorFactory;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Factory.CursorFactory;