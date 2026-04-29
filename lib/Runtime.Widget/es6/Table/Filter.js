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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.Filter = {
	name: "Runtime.Widget.Table.Filter",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["table_filter", componentHash])}));
			/* Filter Header */
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["table_filter__header", componentHash])}));
			
			/* Element div */
			let __v2 = __v1.element("div", new Runtime.Map({"class": rs.className(["table_filter__title", componentHash])}));
			__v2.push(this.translate("filter"));
			/* Filter Fields */
			for (let i = 0; i < this.model.fields.count(); i++)
			{
				let field = this.model.fields.get(i);
				let name = field.get("name");
				let label = field.get("label", name);
				let component = field.get("component");
				let props = field.get("props");
				if (!props)
				{
					props = new Runtime.Map();
				}
				
				/* Element div */
				let __v3 = __v0.element("div", new Runtime.Map({"class": rs.className(["table_filter__row", componentHash])}));
				
				/* Element div */
				let __v4 = __v3.element("div", new Runtime.Map({"class": rs.className(["table_filter__label", componentHash])}));
				__v4.push(label);
				
				/* Element div */
				let __v5 = __v3.element("div", new Runtime.Map({"class": rs.className(["table_filter__component", componentHash])}));
				
				/* Element component */
				__v5.element(component, new Runtime.Map({"name": name, "value": this.model.getValue(name), "onValueChange": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.model.setValue(name, event.value);
				})}).concat(props).concat(this.getAttrs(field)));
			}
			/* Search Button */
			/* Element div */
			let __v6 = __v0.element("div", new Runtime.Map({"class": rs.className(["table_filter__search", componentHash])}));
			
			/* Element Runtime.Widget.Button */
			let __v7 = __v6.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--primary", componentHash]), "onClick": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
			{
				this.onSearchClick();
			})}));
			
			/* Content */
			__v7.slot("default", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				__v.push(this.translate("search"));
				
				return __v;
			});
			
			return __v;
		},
		/* Translate method */
		translate: function(key)
		{
			/* You can use layout translations here */
			/* For now, returning simple fallback */
			if (key == "filter") return "Filter";
			if (key == "search") return "Search";
			return key;
		},
		/* Search button click handler */
		onSearchClick: function()
		{
			this.model.applyFilter();
		},
		/**
		 * Returns attrs
		 */
		getAttrs: function(field)
		{
			let attrs = new Runtime.Map();
			let component = field.get("component");
			if (component == "Runtime.Widget.Input")
			{
				attrs.set("onKeydown", this.onKeyDown(field));
			}
			return attrs;
		},
		/**
		 * Keydown
		 */
		onKeyDown: function(field)
		{
			return (event) =>
			{
				if (event.keyCode == 13)
				{
					let field_name = field.get("name");
					this.model.setValue(field_name, event.target.value);
					this.model.applyFilter();
				}
			};
		},
		getClassName: function(){ return "Runtime.Widget.Table.Filter"; },
	},
	getComponentStyle: function(){ return ".table_filter.h-3a22{margin-bottom: calc(2 * var(--space))}.table_filter__header.h-3a22{display: flex;align-items: center;justify-content: space-between;margin-bottom: calc(var(--space) * 2);border-bottom: 1px solid var(--color-border);padding-bottom: var(--space)}.table_filter__title.h-3a22{font-size: var(--font-size-h4);font-weight: 600;color: var(--color-heading-text)}.table_filter__row.h-3a22{display: flex;align-items: center;margin-bottom: var(--space)}.table_filter__label.h-3a22{min-width: 120px;margin-right: var(--space);color: var(--color-text-secondary)}.table_filter__component.h-3a22{flex: 1}.table_filter__search.h-3a22{margin-top: calc(var(--space) * 2);text-align: left}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button"); },
};
window["Runtime.Widget.Table.Filter"] = Runtime.Widget.Table.Filter;