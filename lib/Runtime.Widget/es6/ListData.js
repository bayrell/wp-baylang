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
Runtime.Widget.ListData = {
	name: "Runtime.Widget.ListData",
	extends: Runtime.Component,
	props: {
		items: {default: null},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["list_data", this.class, componentHash])}));
			
			if (this.items)
			{
				for (let i = 0; i < this.items.count(); i++)
				{
					let item = this.items.get(i);
					
					/* Element div */
					let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["list_item", componentHash])}));
					
					/* Element div */
					let __v2 = __v1.element("div", new Runtime.Map({"class": rs.className(["list_label", componentHash])}));
					__v2.push(item.get("label"));
					
					/* Element div */
					let __v3 = __v1.element("div", new Runtime.Map({"class": rs.className(["list_value", componentHash])}));
					__v3.push(item.get("value"));
				}
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.ListData"; },
	},
	getComponentStyle: function(){ return ".list_data.h-85fb // Base styles\n\t.list_item{display: flex;padding: 8px 0;border-bottom: 1px solid #eee}.list_data.h-85fb // Base styles\n\t.list_item:last-child{border-bottom: none}.list_data.h-85fb // Base styles\n\t.list_item .list_label{font-weight: 600;min-width: 150px;color: #666;flex-shrink: 0}.list_data.h-85fb // Base styles\n\t.list_item .list_value{color: #333;flex-grow: 1;word-break: break-word}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.ListData"] = Runtime.Widget.ListData;