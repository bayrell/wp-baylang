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
Runtime.Web.Annotations.Components = function(components)
{
	Runtime.Entity.Hook.call(this, "Runtime.Web.Hooks.Components", Runtime.Map.from({"items":components}));
};
Runtime.Web.Annotations.Components.prototype = Object.create(Runtime.Entity.Hook.prototype);
Runtime.Web.Annotations.Components.prototype.constructor = Runtime.Web.Annotations.Components;
Object.assign(Runtime.Web.Annotations.Components.prototype,
{
});
Object.assign(Runtime.Web.Annotations.Components, Runtime.Entity.Hook);
Object.assign(Runtime.Web.Annotations.Components,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.Web.Annotations.Components";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Hook";
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
Runtime.rtl.defClass(Runtime.Web.Annotations.Components);
window["Runtime.Web.Annotations.Components"] = Runtime.Web.Annotations.Components;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Annotations.Components;