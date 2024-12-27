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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.Link = {
	name: "Runtime.Widget.Link",
	extends: Runtime.Web.Component,
	props: {
		"href": {
			default: "",
		},
		"text": {
			default: "",
		},
		"target": {
			default: "_self",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let attrs = Runtime.Map.from({});
			
			if (this.target != "")
			{
				attrs = attrs.set("target", this.target);
			}
			
			/* Element 'a' */
			let __v0 = this._e(__v, "a", this._merge_attrs({"href":this.href,"class":this._class_name([this.class])}, attrs));
			
			/* Render */
			this._t(__v0, this.text);
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Link,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Link";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
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
Runtime.rtl.defClass(Runtime.Widget.Link);
window["Runtime.Widget.Link"] = Runtime.Widget.Link;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Link;