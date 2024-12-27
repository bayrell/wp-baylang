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
Runtime.Widget.TextEditable = {
	name: "Runtime.Widget.TextEditable",
	extends: Runtime.Web.Component,
	props: {
		"reference": {
			default: null,
		},
		"readonly": {
			default: false,
		},
		"timeout": {
			default: 500,
		},
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
	},
	data: function ()
	{
		return {
			change_timer: null,
			old_value: null,
		};
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", this._merge_attrs({"name":this.name,"contenteditable":"plaintext-only","onKeydown":this.onKeyDown,"onInput":this.onInput,"ref":"text","class":this._class_name(["widget_text_editable", this.class])}, props));
			
			return this._flatten(__v);
		},
		/**
 * Returns value
 */
		getValue: function()
		{
			return this.getRef("text").innerText;
		},
		/**
 * Set value
 */
		setValue: function(content)
		{
			var text = this.getRef("text");
			text.innerText = content;
			this.old_value = content;
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
 * Mounted event
 */
		onMounted: function()
		{
			if (this.reference)
			{
				this.reference.setValue(this);
			}
			this.setValue(this.value);
		},
		/**
 * Updated event
 */
		onUpdated: function()
		{
			if (this.old_value == this.value)
			{
				return ;
			}
			if (this.change_timer)
			{
				return ;
			}
			this.setValue(this.value);
		},
		/**
 * Key down event
 */
		onKeyDown: function(e)
		{
			if (e.key == "Tab")
			{
				e.preventDefault();
				e.stopPropagation();
				var selection = this.getRef("text").ownerDocument.defaultView.getSelection();
				var range = selection.getRangeAt(0);
				var node = document.createTextNode("\t");
				range.insertNode(node);
				range.setStartAfter(node);
				range.setEndAfter(node);
			}
		},
		/**
 * Input event
 */
		onInput: function(e)
		{
			if (this.change_timer != null)
			{
				window.clearTimeout(this.change_timer);
				this.change_timer = null;
			}
			this.change_timer = window.setTimeout(() =>
			{
				this.onChange();
			}, this.timeout);
		},
		/**
 * Change event
 */
		onChange: function(e)
		{
			var value = this.getValue();
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":value,"old_value":this.old_value,"data":this.data})));
			/* Set old value */
			this.old_value = value;
			this.change_timer = null;
		},
	},
};
Object.assign(Runtime.Widget.TextEditable,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_text_editable.h-86cd{width: 100%;max-width: 100%;font-family: monospace;font-size: var(--widget-font-size);padding: var(--widget-button-padding-y) var(--widget-button-padding-x);margin: 0;background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;overflow: auto;outline: transparent;line-height: 1.5;tab-size: 4;text-wrap: balance;white-space: pre}.widget_text_editable.wrap.h-86cd{overflow-wrap: break-word;text-wrap: wrap}.widget_text_editable.overflow.h-86cd{overflow: auto;text-wrap: nowrap}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.TextEditable";
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
Runtime.rtl.defClass(Runtime.Widget.TextEditable);
window["Runtime.Widget.TextEditable"] = Runtime.Widget.TextEditable;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.TextEditable;