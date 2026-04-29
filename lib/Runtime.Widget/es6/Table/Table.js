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
Runtime.Widget.Table.Table = {
	name: "Runtime.Widget.Table.Table",
	extends: Runtime.Component,
	methods:
	{
		renderHeader: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			__v.push(this.renderSlot("header"));
			
			return __v;
		},
		renderRow: function(item, row_number)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			__v.push(this.renderSlot("row", Runtime.Vector.create([item, row_number])));
			
			return __v;
		},
		renderTable: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element table */
			let __v0 = __v.element("table");
			
			/* Element tbody */
			let __v1 = __v0.element("tbody");
			
			/* Element tr */
			let __v2 = __v1.element("tr", new Runtime.Map({"class": rs.className(["table__header", componentHash])}));
			__v2.push(this.renderHeader());
			
			if (this.model.items)
			{
				for (let i = 0; i < this.model.items.count(); i++)
				{
					let item = this.model.items.get(i);
					
					/* Element tr */
					let __v3 = __v1.element("tr", new Runtime.Map({"class": rs.className(["table__row", componentHash])}));
					__v3.push(this.renderRow(item, i));
				}
			}
			
			if (this.model.pages > 1)
			{
				__v1.push(this.renderSlot("pagination"));
			}
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["table", componentHash])}));
			__v0.push(this.renderTable());
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Table.Table"; },
	},
	getComponentStyle: function(){ return ".table.h-6433 table{border-collapse: collapse;background-color: var(--color-background);border: 1px var(--color-border) solid}.table.h-6433 th, .table.h-6433 td{padding: var(--space);border-bottom: 1px var(--color-border) solid;font-size: var(--font-size)}.table.h-6433 th{font-weight: bold}.table__row.h-6433:nth-child(even){background-color: var(--color-surface)}.table__row.h-6433:last-child{border-bottom-width: 0px}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Table.Table"] = Runtime.Widget.Table.Table;