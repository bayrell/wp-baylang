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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Components == 'undefined') BayLang.Constructor.Frontend.Components = {};
BayLang.Constructor.Frontend.Components.SortableParams = {
	name: "BayLang.Constructor.Frontend.Components.SortableParams",
	extends: Runtime.Widget.SortableList,
	props: {
		"fields": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		renderValue: function(pos, item)
		{
			let __v = [];
			
			for (let i = 0; i < this.fields.count(); i++)
			{
				let field = this.fields.get(i);
				let field_name = field.get("name");
				let field_component = field.get("component");
				let field_props = field.get("props");
				
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_sortable_list__item_value_row"])});
				
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_sortable_list__item_value_label"])});
				
				/* Render */
				this._t(__v1, field.get("label"));
				
				/* Element 'div' */
				let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_sortable_list__item_value_item"])});
				
				/* Component '{field_component}' */
				let __v3 = this._c(__v2, field_component, this._merge_attrs({"name":field_name,"value":item.get(field_name),"onValueChange":(message) =>
				{
					var item = this.value.get(pos);
					item.set(field_name, message.value);
					this.onValueChange();
				}}, field_props));
			}
			
			return this._flatten(__v);
		},
		/**
 * Add item click
 */
		onAddItemClick: function()
		{
			var value = Runtime.Map.from({});
			for (var i = 0; i < this.fields.count(); i++)
			{
				var field = this.fields.get(i);
				var field_name = field.get("name");
				var field_default = field.get("default", "");
				value.set(field_name, field_default);
			}
			this.value.push(value);
			this.onValueChange();
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Components.SortableParams,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.SortableList","Runtime.Widget.Input","Runtime.Widget.Select","BayLang.Constructor.Frontend.Components.SelectImageButton"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_sortable_list__item_value.h-d333{padding: 5px}.widget_sortable_list__item_value_row.h-d333{display: flex;align-items: center}.widget_sortable_list__item_value_label.h-d333{width: 40px}.widget_sortable_list__item_value_item.h-d333{flex: 1}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Components";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Components.SortableParams";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Components.SortableParams);
window["BayLang.Constructor.Frontend.Components.SortableParams"] = BayLang.Constructor.Frontend.Components.SortableParams;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Components.SortableParams;