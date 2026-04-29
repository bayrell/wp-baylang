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
Runtime.Widget.Select = {
	name: "Runtime.Widget.Select",
	extends: Runtime.Widget.Field,
	props: {
		name: {default: ""},
		value: {default: ""},
		default: {default: ""},
		options: {default: null},
		show_select_value: {default: true},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let props = this.getProps();
			
			/* Element select */
			let __v0 = __v.element("select", new Runtime.Map({"name": this.name, "class": rs.className(["select", this.class, componentHash]), "onChange": this.onChange}).concat(props));
			
			let value = this.getValue();
			let options = this.getOptions();
			let selected = new Runtime.Map();
			if (this.show_select_value === true || this.show_select_value == "true")
			{
				if (value === "" || value === null)
				{
					selected = Runtime.Map.create({"selected": "selected"});
				}
				
				/* Element option */
				let __v1 = __v0.element("option", new Runtime.Map({"key": ":select_value", "value": ""}).concat(selected));
				__v1.push("Select value");
			}
			
			if (options != null)
			{
				for (let i = 0; i < options.count(); i++)
				{
					let item = options.get(i);
					selected = new Runtime.Map();
					if (item.get("key") == value && value !== "" && value !== null)
					{
						selected = Runtime.Map.create({"selected": "selected"});
					}
					
					/* Element option */
					let __v2 = __v0.element("option", new Runtime.Map({"key": item.get("key"), "value": "" + String(item.get("key"))}).concat(selected));
					__v2.push(item.get("value"));
				}
			}
			
			return __v;
		},
		/**
		 * Returns value
		 */
		getValue: function()
		{
			if (this.value !== "" && this.value !== null) return this.value;
			return this.default;
		},
		/**
		 * Returns options
		 */
		getOptions: function()
		{
			if (this.model == null) return this.options;
			return this.model.getOptions();
		},
		/**
		 * Change event
		 */
		onChange: function(e)
		{
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": e.target.value,
				"old_value": this.value,
				"data": this.data,
			})));
		},
		getClassName: function(){ return "Runtime.Widget.Select"; },
	},
	getComponentStyle: function(){ return ".select.h-d72c, .select.h-d72c:focus{width: 100%;font-family: var(--font-family);font-size: var(--font-input-size);padding: calc(var(--space) * 0.75) calc(var(--space) * 1.5);background-color: var(--color-background);border-width: var(--border-width);border-color: var(--color-border);border-style: solid;border-radius: var(--border-radius);box-shadow: none;outline: transparent;line-height: normal;color: inherit;max-width: 100%;min-height: 32px;transition: background-color var(--transition) var(--transition-type),\n\t\tborder-color var(--transition) var(--transition-type),\n\t\tcolor var(--transition) var(--transition-type)}.widget_select.h-d72c:hover{color: inherit}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Select"] = Runtime.Widget.Select;