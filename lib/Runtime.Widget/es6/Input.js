"use strict;"
/*
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
	extends: Runtime.Widget.Field,
	props: {
		direct_update: {default: false},
		readonly: {default: false},
		name: {default: ""},
		value: {default: ""},
		default: {default: ""},
		placeholder: {default: ""},
		type: {default: "text"},
	},
	data: function()
	{
		return {
			change_timer: null,
		};
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let props = this.getProps();
			
			/* Element input */
			__v.element("input", new Runtime.Map({"class": rs.className(["input", this.class, componentHash]), "type": this.type, "name": this.name, "value": this.getValue(), "placeholder": this.placeholder, "@ref": "input", "onChange": this.onChange, "onKeydown": this.onKeyDown}).concat(props));
			
			return __v;
		},
		/**
		 * Returns value
		 */
		getValue: function()
		{
			if (this.value) return this.value;
			return this.default;
		},
		/**
		 * KeyDown event
		 */
		onKeyDown: function(e)
		{
			if (!this.direct_update) return;
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
			let input = this.getRef("input");
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": input.value,
				"old_value": this.value,
				"data": this.data,
			})));
		},
		getClassName: function(){ return "Runtime.Widget.Input"; },
	},
	getComponentStyle: function(){ return ".input.h-f2de{width: 100%;font-family: var(--font-family);font-size: var(--font-input-size);padding: calc(var(--space) * 0.75) calc(var(--space) * 1.5);background-color: var(--color-background);border-width: var(--border-width);border-color: var(--color-border);border-style: solid;border-radius: var(--border-radius);box-shadow: none;color: var(--color-text);outline: transparent;line-height: normal;min-height: 32px;transition: background-color var(--transition) var(--transition-type),\n\t\tborder-color var(--transition) var(--transition-type),\n\t\tcolor var(--transition) var(--transition-type)}.input.h-f2de:focus{outline: transparent}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Input"] = Runtime.Widget.Input;