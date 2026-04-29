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
Runtime.Widget.Tag = {
	name: "Runtime.Widget.Tag",
	extends: Runtime.Component,
	props: {
		name: {default: ""},
		value: {default: Runtime.Vector.create([])},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["tag", componentHash])}));
			
			if (this.value)
			{
				for (let i = 0; i < this.value.count(); i++)
				{
					/* Element div */
					let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["tag__item", componentHash])}));
					
					/* Element div */
					let __v2 = __v1.element("div", new Runtime.Map({"class": rs.className(["tag__text", componentHash]), "contenteditable": "true", "onBlur": this.hash(0) ? this.hash(0) : this.hash(0, (e) =>
					{
						this.onTextChange(i, e.target.innerText);
					}), "onKeydown": this.hash(1) ? this.hash(1) : this.hash(1, (e) =>
					{
						this.onTextKeyDown(i, e.target.innerText, e);
					})}));
					__v2.push(this.value.get(i));
					
					/* Element div */
					let __v3 = __v1.element("div", new Runtime.Map({"class": rs.className(["tag__close", componentHash]), "onClick": this.hash(2) ? this.hash(2) : this.hash(2, () =>
					{
						this.onCloseClick(i);
					})}));
					__v3.push("x");
				}
			}
			
			/* Element span */
			__v0.element("span", new Runtime.Map({"class": rs.className(["tag__span", componentHash]), "contenteditable": "true", "onBlur": this.onSpanBlur, "onKeydown": this.onSpanKeyDown, "@ref": "span"}));
			
			return __v;
		},
		/**
		 * Copy value
		 */
		copyValue: function(){ return this.value ? this.value.slice() : Runtime.Vector.create([]); },
		/**
		 * Text change
		 */
		onTextChange: function(i, value)
		{
			let old_value = this.copyValue();
			this.value.set(i, value);
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": this.value,
				"old_value": old_value,
				"data": this.data,
			})));
		},
		/**
		 * Text keydown
		 */
		onTextKeyDown: function(i, value, e)
		{
			if (e.keyCode != 13) return;
			/* Set value */
			let old_value = this.copyValue();
			this.value.set(i, value);
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": this.value,
				"old_value": old_value,
				"data": this.data,
			})));
			e.preventDefault();
			return false;
		},
		/**
		 * Close click
		 */
		onCloseClick: function(i)
		{
			let old_value = this.copyValue();
			this.value.remove(i);
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": this.value,
				"old_value": old_value,
				"data": this.data,
			})));
		},
		/**
		 * Span blur
		 */
		onSpanBlur: function(e)
		{
			let span = this.getRef("span");
			if (span.innerText == "") return;
			/* Add value */
			let old_value = this.copyValue();
			let value = this.value;
			if (value !== null) value.push(span.innerText);
			else value = Runtime.Vector.create([span.innerText]);
			span.innerText = "";
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": value,
				"old_value": old_value,
				"data": this.data,
			})));
		},
		/**
		 * Span keydown
		 */
		onSpanKeyDown: function(e)
		{
			if (e.keyCode != 13) return;
			let span = this.getRef("span");
			if (span.innerText == "") return;
			/* Add value */
			let old_value = this.copyValue();
			let value = this.value ? this.value : Runtime.Vector.create([]);
			value.push(span.innerText);
			span.innerText = "";
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": value,
				"old_value": old_value,
				"data": this.data,
			})));
			e.preventDefault();
			return false;
		},
		getClassName: function(){ return "Runtime.Widget.Tag"; },
	},
	getComponentStyle: function(){ return ".tag.h-27ed{display: flex;align-items: center;flex-wrap: wrap;font-family: var(--font-family);font-size: var(--font-input-size);background-color: var(--color-background);border-width: var(--border-width);border-color: var(--color-border);border-style: solid;border-radius: var(--border-radius);box-shadow: none;outline: transparent;line-height: normal;padding: calc(var(--space) * 0.75) calc(var(--space) * 1.5);gap: calc(var(--space) * 0.5);width: 100%}.tag__item.h-27ed{display: flex;align-items: stretch;justify-content: space-between;border-width: var(--border-width);border-color: var(--color-border);border-style: solid;border-radius: 4px;padding: 3px 5px}.tag__text.h-27ed{overflow-wrap: anywhere;outline: 0}.tag__close.h-27ed{display: inline-flex;align-items: center;justify-content: center;margin-left: 5px;cursor: pointer}.tag__span.h-27ed{overflow-wrap: anywhere;min-width: 100px;outline: 0}.tag__span.h-27ed:first-child{padding-left: 0}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Tag"] = Runtime.Widget.Tag;