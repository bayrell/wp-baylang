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
Runtime.Widget.TextImage = {
	name: "Runtime.Widget.TextImage",
	extends: Runtime.Component,
	props: {
		kind: {default: "text_right"},
		image: {default: ""},
		content: {default: ""},
	},
	methods:
	{
		renderContent: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let content = Runtime.rs.split("\n", this.content);
			if (content.count() == 1)
			{
				__v.push(content.get(0));
			}
			else
			{
				for (let i = 0; i < content.count(); i++)
				{
					let item = content.get(i);
					
					/* Element div */
					let __v0 = __v.element("div");
					__v0.push(!Runtime.rtl.isEmpty(item) ? item : "");
				}
			}
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["text_image", this.getClass(), this.class, componentHash])}));
			
			if (this.kind == "text_bottom" || this.kind == "text_right")
			{
				/* Element div */
				let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["text_image__image", componentHash])}));
				
				/* Element Runtime.Widget.Image */
				__v1.element("Runtime.Widget.Image", new Runtime.Map({"src": this.image}));
				
				/* Element div */
				let __v2 = __v0.element("div", new Runtime.Map({"class": rs.className(["text_image__text", componentHash])}));
				__v2.push(this.renderContent(this.content));
			}
			else if (this.kind == "text_top" || this.kind == "text_left")
			{
				/* Element div */
				let __v3 = __v0.element("div", new Runtime.Map({"class": rs.className(["text_image__text", componentHash])}));
				__v3.push(this.renderContent(this.content));
				
				/* Element div */
				let __v4 = __v0.element("div", new Runtime.Map({"class": rs.className(["text_image__image", componentHash])}));
				
				/* Element Runtime.Widget.Image */
				__v4.element("Runtime.Widget.Image", new Runtime.Map({"src": this.image}));
			}
			
			return __v;
		},
		/**
		 * Returns class
		 */
		getClass: function()
		{
			let styles = Runtime.Vector.create([]);
			styles.push("widget_text_image--" + String(this.kind));
			return Runtime.rs.join(" ", styles);
		},
		getClassName: function(){ return "Runtime.Widget.TextImage"; },
	},
	getComponentStyle: function(){ return ".text_image--text_left.h-e2c6, .text_image--text_right.h-e2c6{display: flex;align-items: center;justify-content: space-between}.text_image--text_top.h-e2c6, .text_image--text_bottom.h-e2c6{text-align: center}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Image"); },
};
window["Runtime.Widget.TextImage"] = Runtime.Widget.TextImage;