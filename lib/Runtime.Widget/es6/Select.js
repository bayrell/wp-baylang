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
Runtime.Widget.Select = {
	name: "Runtime.Widget.Select",
	extends: Runtime.Web.Component,
	props: {
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
		"default": {
			default: "",
		},
		"options": {
			default: null,
		},
		"show_select_value": {
			default: true,
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'select' */
			let __v0 = this._e(__v, "select", {"name":this.name,"onChange":this.onChange,"class":this._class_name(["widget_select"])});
			let value = this.getValue();
			let options = this.getOptions();
			let selected = Runtime.Map.from({});
			
			if (this.show_select_value === true || this.show_select_value == "true")
			{
				if (value === "" || value === null)
				{
					selected = Runtime.Map.from({"selected":"selected"});
				}
				
				/* Element 'option' */
				let __v1 = this._e(__v0, "option", this._merge_attrs({"value":"","key":":select_value"}, selected));
				
				/* Text */
				this._t(__v1, "Select value");
			}
			
			if (options != null)
			{
				for (let i = 0; i < options.count(); i++)
				{
					let item = options.get(i);
					selected = Runtime.Map.from({});
					
					if (item.get("key") == value && value !== "" && value !== null)
					{
						selected = Runtime.Map.from({"selected":"selected"});
					}
					
					/* Element 'option' */
					let __v2 = this._e(__v0, "option", this._merge_attrs({"value":"" + Runtime.rtl.toStr(item.get("key")),"key":item.get("key")}, selected));
					
					/* Render */
					this._t(__v2, item.get("value"));
				}
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns value
 */
		getValue: function()
		{
			if (this.value !== "" && this.value !== null)
			{
				return this.value;
			}
			return this.default;
		},
		/**
 * Returns options
 */
		getOptions: function()
		{
			if (this.model == null)
			{
				return this.options;
			}
			return this.model.getOptions();
		},
		/**
 * Change event
 */
		onChange: function(e)
		{
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":e.target.value,"old_value":this.value,"data":this.data})));
		},
	},
};
Object.assign(Runtime.Widget.Select,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_select.h-d72d,.widget_select.h-d72d:focus{width: 100%;font-family: var(--widget-font-family);font-size: var(--widget-font-size);padding: var(--widget-input-padding-y) var(--widget-input-padding-x);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal;color: inherit;max-width: 100%;min-height: 32px}.widget_select.h-d72d:hover{color: inherit}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Select";
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
Runtime.rtl.defClass(Runtime.Widget.Select);
window["Runtime.Widget.Select"] = Runtime.Widget.Select;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Select;