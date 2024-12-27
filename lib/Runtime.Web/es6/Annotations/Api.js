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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Annotations == 'undefined') Runtime.Web.Annotations = {};
Runtime.Web.Annotations.Api = function(api_name)
{
	Runtime.Entity.Entity.call(this, Runtime.Map.from({"name":api_name}));
};
Runtime.Web.Annotations.Api.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.Web.Annotations.Api.prototype.constructor = Runtime.Web.Annotations.Api;
Object.assign(Runtime.Web.Annotations.Api.prototype,
{
});
Object.assign(Runtime.Web.Annotations.Api, Runtime.Entity.Entity);
Object.assign(Runtime.Web.Annotations.Api,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.Web.Annotations.Api";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Entity";
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
Runtime.rtl.defClass(Runtime.Web.Annotations.Api);
window["Runtime.Web.Annotations.Api"] = Runtime.Web.Annotations.Api;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Annotations.Api;