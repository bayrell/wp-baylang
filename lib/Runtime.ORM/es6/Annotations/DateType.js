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
Runtime.ORM.Annotations.DateType = function()
{
	Runtime.ORM.Annotations.BaseType.apply(this, arguments);
};
Runtime.ORM.Annotations.DateType.prototype = Object.create(Runtime.ORM.Annotations.BaseType.prototype);
Runtime.ORM.Annotations.DateType.prototype.constructor = Runtime.ORM.Annotations.DateType;
Object.assign(Runtime.ORM.Annotations.DateType.prototype,
{
	_init: function()
	{
		Runtime.ORM.Annotations.BaseType.prototype._init.call(this);
		this.tz = "UTC";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "tz")return this.tz;
		return Runtime.ORM.Annotations.BaseType.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.ORM.Annotations.DateType, Runtime.ORM.Annotations.BaseType);
Object.assign(Runtime.ORM.Annotations.DateType,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Annotations.DateType";
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
		a.push("tz");
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
Runtime.rtl.defClass(Runtime.ORM.Annotations.DateType);
window["Runtime.ORM.Annotations.DateType"] = Runtime.ORM.Annotations.DateType;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Annotations.DateType;