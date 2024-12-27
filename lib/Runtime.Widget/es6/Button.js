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
Runtime.Widget.Button = {
	name: "Runtime.Widget.Button",
	extends: Runtime.Web.Component,
	props: {
		"class": {
			default: "",
		},
		"type": {
			default: "button",
		},
		"target": {
			default: "_self",
		},
		"content": {
			default: "",
		},
		"href": {
			default: null,
		},
		"styles": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			if (this.href == null)
			{
				/* Element 'button' */
				let __v0 = this._e(__v, "button", {"type":this.type,"ref":"widget","class":this._class_name(["widget_button", this.$options.getStyles("widget_button", this.styles), this.renderListClass(), this.class])});
				
				if (this.content)
				{
					/* Render */
					this._t(__v0, this.content);
				}
				else
				{
					/* Render */
					this._t(__v0, this.renderSlot("default"));
				}
			}
			else
			{
				/* Element 'a' */
				let __v1 = this._e(__v, "a", {"href":this.href,"target":this.target,"ref":"widget","class":this._class_name(["nolink", this.class])});
				
				/* Element 'button' */
				let __v2 = this._e(__v1, "button", {"type":this.type,"class":this._class_name(["widget_button", this.$options.getStyles("widget_button", this.styles), this.renderListClass()])});
				
				if (!this.checkSlot("default"))
				{
					/* Render */
					this._t(__v2, this.content);
				}
				else
				{
					/* Render */
					this._t(__v2, this.renderSlot("default"));
				}
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Button,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_button.h-8dd7{color: var(--widget-color-text);font-family: var(--widget-font-family);font-size: var(--widget-font-size);line-height: var(--widget-line-height);background-color: var(--widget-color-default);border: var(--widget-border-width) var(--widget-color-border) solid;padding: var(--widget-button-padding-y) var(--widget-button-padding-x);outline: 0;cursor: pointer;border-radius: 4px}.widget_button.h-8dd7:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25)}.widget_button--small.h-8dd7{padding: var(--widget-button-padding-small-y) var(--widget-button-padding-small-x);line-height: 1.2em}.widget_button--large.h-8dd7{padding: var(--widget-button-padding-large-y) var(--widget-button-padding-large-x)}.widget_button--primary.h-8dd7{color: var(--widget-color-primary-text);background-color: var(--widget-color-primary);border-color: var(--widget-color-primary)}.widget_button--danger.h-8dd7{color: var(--widget-color-danger-text);background-color: var(--widget-color-danger);border-color: var(--widget-color-danger)}.widget_button--success.h-8dd7{color: var(--widget-color-success-text);background-color: var(--widget-color-success);border-color: var(--widget-color-success)}.widget_button--stretch.h-8dd7{width: 100%}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Button";
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
Runtime.rtl.defClass(Runtime.Widget.Button);
window["Runtime.Widget.Button"] = Runtime.Widget.Button;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Button;