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
Runtime.Widget.Link = {
	name: "Runtime.Widget.Link",
	extends: Runtime.Component,
	props: {
		href: {default: ""},
		target: {default: "_self"},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element a */
			let __v0 = __v.element("a", new Runtime.Map({"class": rs.className([this.class, componentHash]), "href": this.href}).concat(this.attrs));
			__v0.push(this.renderSlot("default"));
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Link"; },
	},
	computed:
	{
		/**
		 * Get attrs
		 */
		attrs: function()
		{
			let attrs = new Runtime.Map();
			if (this.target != "") attrs.set("target", this.target);
			return attrs;
		},
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Link"] = Runtime.Widget.Link;