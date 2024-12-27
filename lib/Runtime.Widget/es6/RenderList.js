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
Runtime.Widget.RenderList = {
	name: "Runtime.Widget.RenderList",
	extends: Runtime.Web.Component,
	methods:
	{
		renderItems: function()
		{
			let __v = [];
			let items_count = this.model.items.count();
			
			for (let i = 0; i < items_count; i++)
			{
				let widget = this.model.items.get(i);
				
				/* Render */
				this._t(__v, this.renderWidget(widget, Runtime.Map.from({"data":this.data,"render_list":Runtime.Map.from({"position":i,"count":items_count,"first":i == 0,"last":i == items_count - 1})})));
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"ref":"widget","class":this._class_name(["widget_render_list"])});
			
			/* Render */
			this._t(__v0, this.renderItems());
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.RenderList,
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
		return "Runtime.Widget.RenderList";
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
Runtime.rtl.defClass(Runtime.Widget.RenderList);
window["Runtime.Widget.RenderList"] = Runtime.Widget.RenderList;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.RenderList;