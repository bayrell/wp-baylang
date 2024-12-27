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
Runtime.Widget.RowButtons = {
	name: "Runtime.Widget.RowButtons",
	extends: Runtime.Widget.RenderList,
	props: {
		"styles": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			if (this.model)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_row_buttons", this.class, this.$options.getStyles("widget_row_buttons", this.model.styles)])});
				
				/* Render */
				this._t(__v0, this.renderItems());
			}
			else
			{
				/* Element 'div' */
				let __v1 = this._e(__v, "div", {"class":this._class_name(["widget_row_buttons", this.class, this.$options.getStyles("widget_row_buttons", this.styles)])});
				
				/* Render */
				this._t(__v1, this.renderSlot("default"));
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.RowButtons,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.RenderList"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_row_buttons.h-a598{display: flex;gap: var(--widget-space)}.widget_row_buttons--align-end.h-a598{justify-content: end}.widget_row_buttons--no-gap.h-a598{gap: 0}.widget_row_buttons--no-gap.h-a598 .widget_button.h-8dd7{border-right-width: 0;border-radius: 0}.widget_row_buttons--no-gap.h-a598 .widget_button.item--first.h-8dd7{border-top-left-radius: 4px;border-bottom-left-radius: 4px}.widget_row_buttons--no-gap.h-a598 .widget_button.item--last.h-8dd7{border-top-right-radius: 4px;border-bottom-right-radius: 4px;border-right-width: var(--widget-border-width) !important}.widget_row_buttons--top_buttons.h-a598{margin-bottom: 10px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.RowButtons";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.RenderList";
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
Runtime.rtl.defClass(Runtime.Widget.RowButtons);
window["Runtime.Widget.RowButtons"] = Runtime.Widget.RowButtons;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.RowButtons;