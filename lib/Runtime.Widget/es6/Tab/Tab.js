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
if (typeof Runtime.Widget.Tab == 'undefined') Runtime.Widget.Tab = {};
Runtime.Widget.Tab.Tab = {
	name: "Runtime.Widget.Tab.Tab",
	extends: Runtime.Web.Component,
	props: {
		"key": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			if (this.model.canShow(this.key))
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"data-tab":this.key,"class":this._class_name(["tabs__item", ((this.model.isActive(this.key)) ? ("tabs__item--active") : (""))])});
				
				/* Render */
				this._t(__v0, this.renderSlot("default"));
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Tab.Tab,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".tabs__item.h-878a{position: relative;display: none}.tabs__item--active.h-878a{display: block}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Tab";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tab.Tab";
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
Runtime.rtl.defClass(Runtime.Widget.Tab.Tab);
window["Runtime.Widget.Tab.Tab"] = Runtime.Widget.Tab.Tab;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tab.Tab;