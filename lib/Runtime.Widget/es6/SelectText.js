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
Runtime.Widget.SelectText = {
	name: "Runtime.Widget.SelectText",
	extends: Runtime.Component,
	props: {
		value: {default: ""},
		options: {default: Runtime.Vector.create([])},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element span */
			let __v0 = __v.element("span", new Runtime.Map({"class": rs.className(["select_text", componentHash])}));
			
			let item = this.options ? this.options.findItem((item) => { return item.get("key") == this.value; }) : null;
			__v0.push(item != null ? item.get("value") : this.value);
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.SelectText"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.SelectText"] = Runtime.Widget.SelectText;