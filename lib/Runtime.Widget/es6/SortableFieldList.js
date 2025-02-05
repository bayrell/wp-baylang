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
Runtime.Widget.SortableFieldList = {
	name: "Runtime.Widget.SortableFieldList",
	extends: Runtime.Widget.SortableList,
	data: function ()
	{
		return {
			fields: Runtime.Vector.from([]),
		};
	},
	methods:
	{
		renderValueItem: function(field, pos, item)
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_sortable_list__item_value_row"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_sortable_list__item_value_label"])});
			
			/* Render */
			this._t(__v1, field.get("label"));
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_sortable_list__item_value_item"])});
			
			if (item)
			{
				let field_name = field.get("name");
				let field_component = field.get("component");
				let field_props = field.get("props");
				
				/* Component '{field_component}' */
				let __v3 = this._c(__v2, field_component, this._merge_attrs({"name":field_name,"value":item.get(field_name),"onValueChange":(message) =>
				{
					item.set(field_name, message.value);
					this.onValueChange();
				}}, field_props));
			}
			
			return this._flatten(__v);
		},
		renderValue: function(pos, item)
		{
			let __v = [];
			
			for (let i = 0; i < this.fields.count(); i++)
			{
				let field = this.fields.get(i);
				
				/* Render */
				this._t(__v, this.renderValueItem(field, pos, item));
			}
			
			return this._flatten(__v);
		},
		renderItem: function(pos)
		{
			let __v = [];
			let item = this.getItems().get(pos);
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"data-pos":pos,"class":this._class_name(["widget_sortable_list__item"]),"key":item});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_sortable_list__item_element widget_sortable_list__item_element--drag"])});
			
			/* Element 'div' */
			let __v2 = this._e(__v1, "div", {"onMousedown":(e) =>
			{
				this.onMouseDown(e, item);
			},"class":this._class_name(["widget_sortable_list__item_drag"])});
			
			/* Raw */
			this._t(__v2, new Runtime.RawString("&#9776;"));
			
			/* Element 'div' */
			let __v3 = this._e(__v0, "div", {"class":this._class_name(["widget_sortable_list__item_value"])});
			
			/* Render */
			this._t(__v3, this.renderValue(pos, item));
			
			/* Element 'div' */
			let __v4 = this._e(__v0, "div", {"class":this._class_name(["widget_sortable_list__item_element widget_sortable_list__item_element--remove"])});
			
			/* Element 'div' */
			let __v5 = this._e(__v4, "div", {"onClick":(e) =>
			{
				this.removeItem(pos);
			},"class":this._class_name(["widget_sortable_list__item_remove"])});
			
			/* Raw */
			this._t(__v5, new Runtime.RawString("&#10005;"));
			
			return this._flatten(__v);
		},
		/**
 * Create new item
 */
		createItem: function()
		{
			return Runtime.Map.from({});
		},
		/**
 * Returns drag & drop element
 */
		getDragElement: function(elem)
		{
			if (elem.classList.contains("widget_sortable_list__item"))
			{
				return elem;
			}
			if (elem.parentElement.classList.contains("widget_sortable_list__item"))
			{
				return elem.parentElement;
			}
			if (elem.parentElement.parentElement.classList.contains("widget_sortable_list__item"))
			{
				return elem.parentElement.parentElement;
			}
			return null;
		},
	},
};
Object.assign(Runtime.Widget.SortableFieldList,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.SortableList","Runtime.Widget.Input","Runtime.Widget.Select"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_sortable_list__item.h-a549{align-items: stretch;margin: 10px 0px}.widget_sortable_list__item_element.h-a549{display: flex}.widget_sortable_list__item_element--drag.h-a549{align-items: center}.widget_sortable_list__item_element--remove.h-a549{align-items: start}.widget_sortable_list__item_value.h-a549{padding: 5px}.widget_sortable_list__item_value.h-a549 .widget_input.h-f2df,.widget_sortable_list__item_value.h-a549 .widget_select.h-d72d{border-bottom: 1px var(--widget-color-border) solid;box-shadow: none;outline: none}.widget_sortable_list__item_value_row.h-a549{display: flex;align-items: center;margin-bottom: 1px}.widget_sortable_list__item_value_label.h-a549{width: 80px}.widget_sortable_list__item_value_item.h-a549{flex: 1}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.SortableFieldList";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.SortableList";
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
Runtime.rtl.defClass(Runtime.Widget.SortableFieldList);
window["Runtime.Widget.SortableFieldList"] = Runtime.Widget.SortableFieldList;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.SortableFieldList;