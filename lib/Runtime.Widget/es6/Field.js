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
Runtime.Widget.Field = {
	name: "Runtime.Widget.Field",
	extends: Runtime.Component,
	props: {
		readonly: {default: false},
		id: {default: ""},
		name: {default: ""},
		value: {default: ""},
		default: {default: ""},
		placeholder: {default: ""},
		type: {default: "text"},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			__v.element("div", new Runtime.Map({"class": rs.className(["field", componentHash])}));
			
			return __v;
		},
		/**
		 * Returns textarea props
		 */
		getProps: function()
		{
			let res = new Runtime.Map();
			if (this.readonly) res.set("readonly", true);
			if (this.id) res.set("id", this.id);
			return new Runtime.Map();
		},
		getClassName: function(){ return "Runtime.Widget.Field"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Field"] = Runtime.Widget.Field;