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
Runtime.Widget.TextEditable = {
	name: "Runtime.Widget.TextEditable",
	extends: Runtime.Widget.Field,
	props: {
		reference: {default: null},
		readonly: {default: false},
		timeout: {default: 500},
		name: {default: ""},
		value: {default: ""},
	},
	data: function()
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
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let props = this.getProps();
			
			/* Element div */
			__v.element("div", new Runtime.Map({"class": rs.className(["text_editable", this.class, componentHash]), "name": this.name, "contenteditable": "plaintext-only", "onKeydown": this.onKeyDown, "onInput": this.onInput, "onBlur": this.onChange, "@ref": "text"}).concat(props));
			
			return __v;
		},
		/**
		 * Returns value
		 */
		getValue: function(){ return this.getRef("text").innerText; },
		/**
		 * Set value
		 */
		setValue: function(content)
		{
			let text = this.getRef("text");
			text.innerText = content;
			this.old_value = content;
		},
		/**
		 * Returns textarea props
		 */
		getProps: function()
		{
			if (this.readonly) return Runtime.Map.create({
				"readonly": true,
			});
			return new Runtime.Map();
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
				let selection = this.getRef("text").ownerDocument.defaultView.getSelection();
				let range = selection.getRangeAt(0);
				let node = document.createTextNode("\t");
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
			let value = this.getValue();
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": value,
				"old_value": this.old_value,
				"data": this.data,
			})));
			/* Set old value */
			this.old_value = value;
			this.change_timer = null;
		},
		getClassName: function(){ return "Runtime.Widget.TextEditable"; },
	},
	/**
	 * Mounted event
	 */
	mounted: function()
	{
		if (this.reference) this.reference.setValue(this);
		this.setValue(this.value);
	},
	/**
	 * Updated event
	 */
	updated: function()
	{
		if (this.old_value == this.value) return;
		if (this.change_timer) return;
		this.setValue(this.value);
	},
	getComponentStyle: function(){ return ".text_editable.h-86cc{width: 100%;max-width: 100%;font-family: var(--font-family);font-size: var(--font-input-size);padding: calc(var(--space) * 0.75) calc(var(--space) * 1.5);margin: 0;background-color: var(--color-default);border-width: var(--border-width);border-color: var(--color-border);border-style: solid;border-radius: var(--space);transition: background-color var(--transition) var(--transition-type),\n\t\tborder-color var(--transition) var(--transition-type),\n\t\tcolor var(--transition) var(--transition-type);box-shadow: none;overflow: auto;overflow-wrap: break-word;outline: transparent;line-height: normal;tab-size: 4;text-wrap: wrap;white-space: pre}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.TextEditable"] = Runtime.Widget.TextEditable;