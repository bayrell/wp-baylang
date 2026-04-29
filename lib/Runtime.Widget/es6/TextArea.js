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
Runtime.Widget.TextArea = {
	name: "Runtime.Widget.TextArea",
	extends: Runtime.Widget.Field,
	props: {
		direct_update: {default: false},
		readonly: {default: false},
		height: {default: ""},
		name: {default: ""},
		value: {default: ""},
		placeholder: {default: ""},
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
			
			/* Element textarea */
			let __v0 = __v.element("textarea", new Runtime.Map({"class": rs.className(["textarea", this.class, componentHash]), "name": this.name, "placeholder": this.placeholder, "style": this.getStyle(), "@ref": "textarea", "onChange": this.onChange, "onKeydown": this.onKeyDown}).concat(props));
			__v0.push(this.value);
			
			return __v;
		},
		/**
		 * Returns style
		 */
		getStyle: function()
		{
			let content = Runtime.Vector.create([]);
			if (this.height) content.push("min-height: " + String(this.height));
			return Runtime.rs.join(";", content);
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
		onChange: function()
		{
			let textarea = this.getRef("textarea");
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": textarea.value,
				"old_value": this.value,
				"data": this.data,
			})));
		},
		getClassName: function(){ return "Runtime.Widget.TextArea"; },
	},
	/**
	 * Updated event
	 */
	updated: function()
	{
		let textarea = this.getRef("textarea");
		textarea.value = this.value;
	},
	getComponentStyle: function(){ return ".textarea.h-ee81{width: 100%;max-width: 100%;font-family: var(--font-family);font-size: var(--font-input-size);padding: calc(var(--space) * 0.75) calc(var(--space) * 1.5);background-color: var(--color-background);border-width: var(--border-width);border-color: var(--color-border);border-style: solid;border-radius: var(--space);box-shadow: none;outline: transparent;line-height: normal;transition: background-color var(--transition) var(--transition-type),\n\t\tborder-color var(--transition) var(--transition-type),\n\t\tcolor var(--transition) var(--transition-type)}.textarea.h-ee81:focus{outline: transparent}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.TextArea"] = Runtime.Widget.TextArea;