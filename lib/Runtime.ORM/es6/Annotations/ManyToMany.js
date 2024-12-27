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
Runtime.ORM.Annotations.ManyToMany = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.ORM.Annotations.ManyToMany.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.ORM.Annotations.ManyToMany.prototype.constructor = Runtime.ORM.Annotations.ManyToMany;
Object.assign(Runtime.ORM.Annotations.ManyToMany.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.ORM.Annotations.ManyToMany, Runtime.BaseStruct);
Object.assign(Runtime.ORM.Annotations.ManyToMany,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Annotations.ManyToMany";
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
Runtime.rtl.defClass(Runtime.ORM.Annotations.ManyToMany);
window["Runtime.ORM.Annotations.ManyToMany"] = Runtime.ORM.Annotations.ManyToMany;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Annotations.ManyToMany;