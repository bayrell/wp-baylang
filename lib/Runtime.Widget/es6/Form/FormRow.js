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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormRow = {
	name: "Runtime.Widget.Form.FormRow",
	extends: Runtime.Component,
	props: {
		field: {default: null},
		name: {default: ""},
		label: {default: ""},
		result: {default: null},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["form_row", componentHash])}));
			
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["form_row__label", componentHash])}));
			__v1.push(this.label);
			
			/* Element div */
			let __v2 = __v0.element("div", new Runtime.Map({"class": rs.className(["form_row__content", componentHash])}));
			__v2.push(this.renderSlot("default", Runtime.Vector.create([this.name, this.field])));
			
			if (this.result)
			{
				__v0.push(this.renderWidget(this.result, Runtime.Map.create({
					"class": "result--field",
				})));
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Form.FormRow"; },
	},
	getComponentStyle: function(){ return ".form_row.h-df7a{margin-bottom: calc(var(--space) * 2)}.form_row.h-df7a:last-child{margin-bottom: calc(var(--space) * 2)}.form_row__label.h-df7a{display: block;font-weight: bold;margin-bottom: calc(var(--space) * 0.5)}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Form.FormRow"] = Runtime.Widget.Form.FormRow;