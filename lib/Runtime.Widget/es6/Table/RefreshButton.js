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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.RefreshButton = {
	name: "Runtime.Widget.Table.RefreshButton",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["refresh_button"])});
			let props = this.model.getProps(this.data);
			
			/* Component 'Button' */
			let __v1 = this._c(__v0, "Runtime.Widget.Button", this._merge_attrs({"render_list":this.render_list,"onClick":this.onClick,"class":this._class_name([this.class])}, props), () => {
				let __v = [];
				
				/* Text */
				this._t(__v, "Refresh");
				
				return this._flatten(__v);
			});
			
			/* Component 'WidgetResult' */
			let __v2 = this._c(__v0, "Runtime.Widget.WidgetResult", {"model":this._model(this.model.result)});
			
			return this._flatten(__v);
		},
		/**
 * Refresh item
 */
		onClick: async function(e)
		{
			this.model.onClick(this.data);
			e.stopPropagation();
		},
	},
};
Object.assign(Runtime.Widget.Table.RefreshButton,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.WidgetResult"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".refresh_button.h-6727{display: flex;align-items: center;gap: 5px}.refresh_button.h-6727 .widget_result.h-e870{margin-top: 0}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.RefreshButton";
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
Runtime.rtl.defClass(Runtime.Widget.Table.RefreshButton);
window["Runtime.Widget.Table.RefreshButton"] = Runtime.Widget.Table.RefreshButton;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.RefreshButton;