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
Runtime.Widget.TextArea = {
	name: "Runtime.Widget.TextArea",
	extends: Runtime.Web.Component,
	props: {
		"direct_update": {
			default: false,
		},
		"readonly": {
			default: false,
		},
		"height": {
			default: "",
		},
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
		"placeholder": {
			default: "",
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
			
			/* Element 'textarea' */
			let __v0 = this._e(__v, "textarea", this._merge_attrs({"name":this.name,"placeholder":this.placeholder,"style":this.getStyle(),"ref":"textarea","onChange":this.onChange,"onKeydown":this.onKeyDown,"class":this._class_name(["widget_textarea"])}, props));
			
			/* Render */
			this._t(__v0, this.value);
			
			return this._flatten(__v);
		},
		/**
 * Returns textarea props
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
 * Returns style
 */
		getStyle: function()
		{
			var content = Runtime.Vector.from([]);
			if (this.height)
			{
				content.push("min-height: " + Runtime.rtl.toStr(this.height));
			}
			return Runtime.rs.join(";", content);
		},
		/**
 * Updated event
 */
		onUpdated: function()
		{
			var textarea = this.getRef("textarea");
			textarea.value = this.value;
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
		onChange: function()
		{
			var textarea = this.getRef("textarea");
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":textarea.value,"old_value":this.value,"data":this.data})));
		},
	},
};
Object.assign(Runtime.Widget.TextArea,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_textarea.h-ee82{width: 100%;max-width: 100%;min-height: 400px;font-family: var(--widget-font-family);font-size: var(--widget-font-size);padding: var(--widget-input-padding-y) var(--widget-input-padding-x);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal}.widget_textarea.h-ee82:focus{outline: transparent}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.TextArea";
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
Runtime.rtl.defClass(Runtime.Widget.TextArea);
window["Runtime.Widget.TextArea"] = Runtime.Widget.TextArea;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.TextArea;