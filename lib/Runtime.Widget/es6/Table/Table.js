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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.Table = {
	name: "Runtime.Widget.Table.Table",
	extends: Runtime.Web.Component,
	methods:
	{
		renderHeader: function()
		{
			let __v = [];
			let model = this.model;
			let fields = model.fields;
			
			if (fields)
			{
				/* Element 'tr' */
				let __v0 = this._e(__v, "tr", {"class":this._class_name(["widget_table__row_header"])});
				
				for (let i = 0; i < fields.count(); i++)
				{
					let field = Runtime.rtl.attr(fields, i);
					let field_name = field.get("name");
					
					/* Element 'th' */
					let __v1 = this._e(__v0, "th", {"class":this._class_name(["widget_table__th widget_table__th--" + Runtime.rtl.toStr(field_name)]),"key":field_name});
					
					/* Render */
					this._t(__v1, field.get("label", ""));
				}
			}
			
			return this._flatten(__v);
		},
		renderField: function(item, row_number, field)
		{
			let __v = [];
			let model = this.model;
			let storage = model.storage;
			let field_name = field.get("name");
			let field_calculate = field.get("calculate", null);
			let field_component = field.get("component", null);
			let field_model = field.get("model", null);
			let value = "";
			let data = Runtime.Map.from({"item":item,"field_name":field_name,"row_number":row_number,"table":this.model});
			
			if (field_calculate)
			{
				value = Runtime.rtl.apply(field_calculate, Runtime.Vector.from([data]));
			}
			else
			{
				value = this.model.getItemValue(item, field_name);
			}
			let _ = data.set("value", value);
			
			/* Element 'td' */
			let __v0 = this._e(__v, "td", {"class":this._class_name(["widget_table__td widget_table__td--" + Runtime.rtl.toStr(field_name)]),"key":field_name});
			
			if (field_name == "row_number")
			{
				/* Render */
				this._t(__v0, this.model.limit * this.model.page + row_number + 1);
			}
			else if (field_component != null)
			{
				let props = field.get("props", Runtime.Map.from({}));
				
				/* Component '{field_component}' */
				let __v1 = this._c(__v0, field_component, this._merge_attrs({"model":this._model(field_model),"value":value,"data":data}, props));
			}
			else if (field_model != null)
			{
				/* Render */
				this._t(__v0, this.renderWidget(field_model, Runtime.Map.from({"value":value,"data":data})));
			}
			else
			{
				/* Render */
				this._t(__v0, value);
			}
			
			return this._flatten(__v);
		},
		renderRow: function(item, row_number)
		{
			let __v = [];
			let model = this.model;
			let fields = model.fields;
			
			/* Element 'tr' */
			let __v0 = this._e(__v, "tr", {"data-row":row_number,"onClick":() =>
			{
				return this.onRowClick(row_number);
			},"class":this._class_name(["widget_table__tr", ((this.isRowSelected(row_number)) ? ("selected") : (""))]),"key":row_number});
			
			if (fields)
			{
				for (let i = 0; i < fields.count(); i++)
				{
					let field = Runtime.rtl.attr(fields, i);
					
					/* Render */
					this._t(__v0, this.renderField(item, row_number, field));
				}
			}
			
			return this._flatten(__v);
		},
		renderPagination: function()
		{
			let __v = [];
			let fields = this.model.fields;
			
			if (fields && this.model.pages > 1)
			{
				let props = this.model.pagination_props;
				let pagination_class_name = this.model.pagination_class_name;
				
				/* Element 'tr' */
				let __v0 = this._e(__v, "tr", {});
				
				/* Element 'td' */
				let __v1 = this._e(__v0, "td", {"colspan":fields.count()});
				
				/* Component '{pagination_class_name}' */
				let __v2 = this._c(__v1, pagination_class_name, this._merge_attrs({"page":this.model.page + 1,"pages":this.model.pages,"onPage":this.onChangePage}, props));
			}
			
			return this._flatten(__v);
		},
		renderBody: function()
		{
			let __v = [];
			
			if (this.model)
			{
				let items = this.model.getItems();
				
				if (items)
				{
					for (let i = 0; i < items.count(); i++)
					{
						let item = items.get(i);
						
						/* Render */
						this._t(__v, this.renderRow(item, i));
					}
				}
				
				/* Render */
				this._t(__v, this.renderPagination());
			}
			
			return this._flatten(__v);
		},
		renderTable: function()
		{
			let __v = [];
			
			/* Element 'table' */
			let __v0 = this._e(__v, "table", {"class":this._class_name(["widget_table__table"])});
			
			/* Element 'tbody' */
			let __v1 = this._e(__v0, "tbody", {});
			
			/* Render */
			this._t(__v1, this.renderHeader());
			
			/* Render */
			this._t(__v1, this.renderBody());
			
			return this._flatten(__v);
		},
		renderWidgets: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.render_list));
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_table", this.class, this.$options.getStyles("widget_table", this.model.styles)])});
			
			/* Render */
			this._t(__v0, this.renderTable());
			
			/* Render */
			this._t(__v0, this.renderWidgets());
			
			return this._flatten(__v);
		},
		/**
 * Returns true if row selected
 */
		isRowSelected: function(row_number)
		{
			return this.model.row_selected == row_number;
		},
		/**
 * OnRowClick
 */
		onRowClick: function(row_number)
		{
			this.model.onRowClick(row_number);
		},
		/**
 * On change page
 */
		onChangePage: function(page)
		{
			/*this.model.onChangePage(page);*/
		},
	},
};
Object.assign(Runtime.Widget.Table.Table,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Pagination"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_table__table.h-6434{width: auto;border-collapse: collapse;vertical-align: top;background-color: var(--widget-color-table-background)}.widget_table__th.h-6434{text-align: center}.widget_table__th.h-6434,.widget_table__td.h-6434{vertical-align: middle;padding: var(--widget-space)}.widget_table__tr.selected.h-6434 td{background-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.widget_table--border.h-6434 .widget_table__table{border-color: var(--widget-color-border);border-width: var(--widget-border-width);border-style: solid}.widget_table--border.h-6434 .widget_table__th,.widget_table--border.h-6434 .widget_table__td{border-bottom-color: var(--widget-color-border);border-bottom-width: var(--widget-border-width);border-bottom-style: solid}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.Table";
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
Runtime.rtl.defClass(Runtime.Widget.Table.Table);
window["Runtime.Widget.Table.Table"] = Runtime.Widget.Table.Table;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.Table;