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
Runtime.Widget.RowButtons = {
	name: "Runtime.Widget.RowButtons",
	extends: Runtime.Component,
	props: {
		style: {default: ""},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["row_buttons", this.getClass, componentHash])}));
			__v0.push(this.renderSlot("default"));
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.RowButtons"; },
	},
	computed:
	{
		getClass: function()
		{
			let arr = Runtime.Vector.create([]);
			if (this.class) arr.push(this.class);
			arr.push(Runtime.rs.mergeStyles("row_buttons", Runtime.rs.split(" ", this.style)));
			return Runtime.rs.join(" ", arr);
		},
	},
	getComponentStyle: function(){ return ".row_buttons.h-a597{display: flex;gap: calc(var(--space) * 0.5)}.row_buttons.margin_top.h-a597, .row_buttons--margin_top.h-a597{margin-top: calc(var(--space) * 2)}.row_buttons.margin_bottom.h-a597, .row_buttons--margin_bottom.h-a597{margin-bottom: calc(var(--space) * 2)}.row_buttons--solid.h-a597{gap: 0}.row_buttons--solid.h-a597 .button, .row_buttons--solid.h-a597 .button:focus{border-right-width: 0;border-top-left-radius: 0;border-bottom-left-radius: 0;border-top-right-radius: 0;border-bottom-right-radius: 0}.row_buttons--solid.h-a597 .button:active{outline: none}.row_buttons--solid.h-a597 .button:first-child{border-top-left-radius: var(--border-radius);border-bottom-left-radius: var(--border-radius)}.row_buttons--solid.h-a597 .button:last-child{border-right-width: var(--border-width);border-top-right-radius: var(--border-radius);border-bottom-right-radius: var(--border-radius)}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.RowButtons"] = Runtime.Widget.RowButtons;