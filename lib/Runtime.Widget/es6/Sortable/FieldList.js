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
if (typeof Runtime.Widget.Sortable == 'undefined') Runtime.Widget.Sortable = {};
Runtime.Widget.Sortable.FieldList = {
	name: "Runtime.Widget.Sortable.FieldList",
	extends: Runtime.Widget.Sortable.ItemList,
	data: function()
	{
		return {
			fields: Runtime.Vector.create([]),
		};
	},
	methods:
	{
		renderValueItem: function(field, pos, item)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_value_row", componentHash])}));
			
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_value_label", componentHash])}));
			__v1.push(field.get("label"));
			
			/* Element div */
			let __v2 = __v0.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_value_item", componentHash])}));
			
			if (item)
			{
				let field_name = field.get("name");
				let field_component = field.get("component");
				let field_props = field.get("props");
				if (!field_props)
				{
					field_props = new Runtime.Map();
				}
				
				/* Element field_component */
				__v2.element(field_component, new Runtime.Map({"name": field_name, "value": this.getValue(field, item), "onValueChange": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.setValue(field, item, event);
				})}).concat(field_props));
			}
			
			return __v;
		},
		renderValue: function(pos, item)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			for (let i = 0; i < this.fields.count(); i++)
			{
				let field = this.fields.get(i);
				__v.push(this.renderValueItem(field, pos, item));
			}
			
			return __v;
		},
		renderItem: function(pos)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let item = this.getItems().get(pos);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item", componentHash]), "data-pos": pos, "key": item}));
			
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_element sortable_list__item_element--drag", componentHash])}));
			
			/* Element div */
			let __v2 = __v1.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_drag", componentHash]), "onMousedown": this.hash(1) ? this.hash(1) : this.hash(1, (e) =>
			{
				this.onMouseDown(e, item);
			})}));
			__v2.push("☰");
			
			/* Element div */
			let __v3 = __v0.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_value", componentHash])}));
			__v3.push(this.renderValue(pos, item));
			
			/* Element div */
			let __v4 = __v0.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_element sortable_list__item_element--remove", componentHash])}));
			
			/* Element div */
			let __v5 = __v4.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_remove", componentHash]), "onClick": this.hash(2) ? this.hash(2) : this.hash(2, (e) =>
			{
				this.removeItem(pos);
			})}));
			__v5.push("✕");
			
			return __v;
		},
		/**
		 * Create new item
		 */
		createItem: function(){ return new Runtime.Map(); },
		/**
		 * Returns value
		 */
		getValue: function(field, item)
		{
			if (field.has("value"))
			{
				let value = field.get("value");
				return value(item);
			}
			let field_name = field.get("name");
			return item.get(field_name);
		},
		/**
		 * Set value
		 */
		setValue: function(field, item, message)
		{
			if (field.has("setValue"))
			{
				let setValue = field.get("setValue");
				setValue(item, message.value);
			}
			else
			{
				let field_name = field.get("name");
				item.set(field_name, message.value);
			}
			this.onValueChange();
		},
		/**
		 * Returns drag & drop element
		 */
		getDragElement: function(elem)
		{
			if (elem.classList.contains("sortable_list__item")) return elem;
			if (elem.parentElement.classList.contains("sortable_list__item"))
			{
				return elem.parentElement;
			}
			if (elem.parentElement.parentElement.classList.contains("sortable_list__item"))
			{
				return elem.parentElement.parentElement;
			}
			return null;
		},
		getClassName: function(){ return "Runtime.Widget.Sortable.FieldList"; },
	},
	getComponentStyle: function(){ return ".sortable_list__item.h-a648{align-items: stretch;margin: 10px 0px}.sortable_list__item_element.h-a648{display: flex}.sortable_list__item_element--drag.h-a648{align-items: center}.sortable_list__item_element--remove.h-a648{align-items: start}.sortable_list__item_value.h-a648{padding: 5px}.sortable_list__item_value_row.h-a648{display: flex;align-items: center;margin-bottom: 1px}.sortable_list__item_value_label.h-a648{width: 80px}.sortable_list__item_value_item.h-a648{flex: 1}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Input", "Runtime.Widget.Select"); },
};
window["Runtime.Widget.Sortable.FieldList"] = Runtime.Widget.Sortable.FieldList;