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
Runtime.Widget.Input = {
	name: "Runtime.Widget.Input",
	extends: Runtime.Web.Component,
	props: {
		"direct_update": {
			default: false,
		},
		"readonly": {
			default: false,
		},
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
		"default": {
			default: "",
		},
		"placeholder": {
			default: "",
		},
		"type": {
			default: "text",
		},
	},
	data: function ()
	{
		return {
			change_timer: null,
		};
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'input' */
			let __v0 = this._e(__v, "input", this._merge_attrs({"type":this.type,"name":this.name,"value":this.getValue(),"placeholder":this.placeholder,"ref":"input","onChange":this.onChange,"onKeydown":this.onKeyDown,"class":this._class_name(["widget_input"])}, props));
			
			return this._flatten(__v);
		},
		/**
 * Returns value
 */
		getValue: function()
		{
			if (this.value)
			{
				return this.value;
			}
			return this.default;
		},
		/**
 * Returns input props
 */
		getProps: function()
		{
			if (this.readonly)
			{
				return Runtime.Map.from({"readonly":true});
			}
			return Runtime.Map.from({});
		},
		/**
 * KeyDown event
 */
		onKeyDown: function(e)
		{
			if (!this.direct_update)
			{
				return ;
			}
			if (this.change_timer != null)
			{
				window.clearTimeout(this.change_timer);
				this.change_timer = null;
			}
			this.change_timer = window.setTimeout(() =>
			{
				this.onChange();
			}, 300);
		},
		/**
 * Change event
 */
		onChange: function(e)
		{
			var input = this.getRef("input");
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":input.value,"old_value":this.value,"data":this.data})));
		},
	},
};
Object.assign(Runtime.Widget.Input,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_input.h-f2df{width: 100%;font-family: var(--widget-font-family);font-size: var(--widget-font-size);padding: var(--widget-input-padding-y) var(--widget-input-padding-x);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal;min-height: 32px}.widget_input.h-f2df:focus{outline: transparent}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Input";
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
Runtime.rtl.defClass(Runtime.Widget.Input);
window["Runtime.Widget.Input"] = Runtime.Widget.Input;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Input;