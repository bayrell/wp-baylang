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
Runtime.Widget.ButtonWrap = {
	name: "Runtime.Widget.ButtonWrap",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			let props = this.model.getProps(this.data);
			
			/* Component 'Button' */
			let __v0 = this._c(__v, "Runtime.Widget.Button", this._merge_attrs({"render_list":this.render_list,"onClick":this.onClick,"class":this._class_name([this.class])}, props), () => {
				let __v = [];
				
				/* Render */
				this._t(__v, this.model.content);
				
				return this._flatten(__v);
			});
			
			return this._flatten(__v);
		},
		/**
 * Click button event
 */
		onClick: function(e)
		{
			this.model.onClick(this.data);
			e.stopPropagation();
		},
	},
};
Object.assign(Runtime.Widget.ButtonWrap,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button"]);
	},
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
		return "Runtime.Widget.ButtonWrap";
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
Runtime.rtl.defClass(Runtime.Widget.ButtonWrap);
window["Runtime.Widget.ButtonWrap"] = Runtime.Widget.ButtonWrap;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ButtonWrap;