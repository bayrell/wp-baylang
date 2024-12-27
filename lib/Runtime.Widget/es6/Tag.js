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
Runtime.Widget.Tag = {
	name: "Runtime.Widget.Tag",
	extends: Runtime.Web.Component,
	props: {
		"name": {
			default: "",
		},
		"value": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_tag"])});
			
			if (this.value)
			{
				for (let i = 0; i < this.value.count(); i++)
				{
					/* Element 'div' */
					let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_tag__item"])});
					
					/* Element 'div' */
					let __v2 = this._e(__v1, "div", {"contenteditable":"true","onBlur":(e) =>
					{
						this.onTextChange(i, e.target.innerText);
					},"onKeydown":(e) =>
					{
						this.onTextKeyDown(i, e.target.innerText, e);
					},"class":this._class_name(["widget_tag__text"])});
					
					/* Render */
					this._t(__v2, this.value.get(i));
					
					/* Element 'div' */
					let __v3 = this._e(__v1, "div", {"onClick":() =>
					{
						this.onCloseClick(i);
					},"class":this._class_name(["widget_tag__close"])});
					
					/* Text */
					this._t(__v3, "x");
				}
			}
			
			/* Element 'span' */
			let __v4 = this._e(__v0, "span", {"contenteditable":"true","onBlur":this.onSpanBlur,"onKeydown":this.onSpanKeyDown,"ref":"span","class":this._class_name(["widget_tag__span"])});
			
			return this._flatten(__v);
		},
		/**
 * Text change
 */
		onTextChange: function(i, value)
		{
			var old_value = this.value.slice();
			this.value.set(i, value);
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
		},
		/**
 * Text keydown
 */
		onTextKeyDown: function(i, value, e)
		{
			if (e.keyCode != 13)
			{
				return ;
			}
			/* Set value */
			var old_value = this.value.slice();
			this.value.set(i, value);
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
			e.preventDefault();
			return false;
		},
		/**
 * Close click
 */
		onCloseClick: function(i)
		{
			var old_value = this.value.slice();
			this.value.remove(i);
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
		},
		/**
 * Span blur
 */
		onSpanBlur: function(e)
		{
			var span = this.getRef("span");
			if (span.innerText == "")
			{
				return ;
			}
			/* Add value */
			var old_value = this.value.slice();
			this.value.push(span.innerText);
			span.innerText = "";
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
		},
		/**
 * Span keydown
 */
		onSpanKeyDown: function(e)
		{
			if (e.keyCode != 13)
			{
				return ;
			}
			var span = this.getRef("span");
			if (span.innerText == "")
			{
				return ;
			}
			/* Add value */
			var old_value = this.value.slice();
			this.value.push(span.innerText);
			span.innerText = "";
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
			e.preventDefault();
			return false;
		},
	},
};
Object.assign(Runtime.Widget.Tag,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_tag.h-27ee{display: flex;flex-wrap: wrap;font-family: var(--widget-font-family);font-size: var(--widget-font-size);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal;padding: 2px;min-height: 40px;width: 100%}.widget_tag__item.h-27ee{display: flex;align-items: stretch;justify-content: space-between;border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;padding: 3px 5px;margin: 5px}.widget_tag__text.h-27ee{overflow-wrap: anywhere;outline: 0}.widget_tag__close.h-27ee{display: inline-flex;align-items: center;justify-content: center;margin-left: 5px;cursor: pointer}.widget_tag__span.h-27ee{overflow-wrap: anywhere;min-width: 100px;padding: 3px;margin: 5px;outline: 0}.widget_tag__span.h-27ee:first-child{padding-left: 0}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tag";
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
Runtime.rtl.defClass(Runtime.Widget.Tag);
window["Runtime.Widget.Tag"] = Runtime.Widget.Tag;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tag;