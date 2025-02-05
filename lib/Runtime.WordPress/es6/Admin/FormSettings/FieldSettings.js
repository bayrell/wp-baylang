"use strict;"
/*
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.FormSettings == 'undefined') Runtime.WordPress.Admin.FormSettings = {};
Runtime.WordPress.Admin.FormSettings.FieldSettings = {
	name: "Runtime.WordPress.Admin.FormSettings.FieldSettings",
	extends: Runtime.Widget.SortableFieldList,
	data: function ()
	{
		return {
			fields: Runtime.Vector.from([Runtime.Map.from({"name":"name","label":"Name","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"type","label":"Type","component":"Runtime.Widget.Select","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":"input","value":"input"}),Runtime.Map.from({"key":"textarea","value":"textarea"})])})}),Runtime.Map.from({"name":"title","label":"Title","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"placeholder","label":"Placeholder","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"required","label":"Required","component":"Runtime.Widget.Select","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":0,"value":"No"}),Runtime.Map.from({"key":1,"value":"Yes"})])})})]),
		};
	},
	methods:
	{
		/**
 * Create value
 */
		createValue: function()
		{
			return Runtime.Map.from({"fields":Runtime.Vector.from([])});
		},
		/**
 * Returns items
 */
		getItems: function()
		{
			if (!this.value)
			{
				return null;
			}
			if (!(this.value instanceof Runtime.Dict))
			{
				return null;
			}
			if (!this.value.has("fields"))
			{
				return null;
			}
			return this.value.get("fields");
		},
		/**
 * Create new item
 */
		createItem: function()
		{
			return Runtime.Map.from({"name":"","title":"","type":"input","placeholder":"","required":true});
		},
	},
};
Object.assign(Runtime.WordPress.Admin.FormSettings.FieldSettings,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.SortableFieldList","Runtime.Widget.Input","Runtime.Widget.Select"]);
	},
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.FormSettings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.FormSettings.FieldSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.SortableFieldList";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.FormSettings.FieldSettings);
window["Runtime.WordPress.Admin.FormSettings.FieldSettings"] = Runtime.WordPress.Admin.FormSettings.FieldSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.FormSettings.FieldSettings;