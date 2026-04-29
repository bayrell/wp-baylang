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
Runtime.Widget.Label = {
	name: "Runtime.Widget.Label",
	extends: Runtime.Component,
	props: {
		value: {default: ""},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element label */
			let __v0 = __v.element("label", new Runtime.Map({"class": rs.className(["label", componentHash])}));
			
			if (Runtime.rtl.isString(this.value))
			{
				__v0.push(!Runtime.rtl.isEmpty(this.value) ? this.value : "");
			}
			else if (Runtime.rtl.is_instanceof(this.value, "Runtime.Vector"))
			{
				for (let i = 0; i < this.value.count(); i++)
				{
					let item = this.value.get(i);
					
					/* Element span */
					let __v1 = __v0.element("span");
					__v1.push(!Runtime.rtl.isEmpty(item) ? item : "");
				}
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Label"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Label"] = Runtime.Widget.Label;