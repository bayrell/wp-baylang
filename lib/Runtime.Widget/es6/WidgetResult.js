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
Runtime.Widget.WidgetResult = {
	name: "Runtime.Widget.WidgetResult",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_result", this.getErrorClass(), this.$options.getStyles("widget_result", this.model.styles)])});
			
			/* Render */
			this._t(__v0, this.model.message);
			
			return this._flatten(__v);
		},
		/**
 * Returns error class
 */
		getErrorClass: function()
		{
			if (this.model.message == "")
			{
				return "widget_result--hide";
			}
			if (this.model.isSuccess())
			{
				return "widget_result--success";
			}
			if (this.model.isError())
			{
				return "widget_result--error";
			}
			return "";
		},
	},
};
Object.assign(Runtime.Widget.WidgetResult,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_result.h-e870{text-align: center}.widget_result--margin_top.h-e870{margin-top: var(--widget-space)}.widget_result--success.h-e870{color: var(--widget-color-success)}.widget_result--error.h-e870{color: var(--widget-color-danger)}.widget_result--hide.h-e870{display: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetResult";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetResult);
window["Runtime.Widget.WidgetResult"] = Runtime.Widget.WidgetResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetResult;