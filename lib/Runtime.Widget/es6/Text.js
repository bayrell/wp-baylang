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
Runtime.Widget.Text = {
	name: "Runtime.Widget.Text",
	extends: Runtime.Component,
	props: {
		tag: {default: "text"},
		raw: {default: "false"},
		content: {default: "Text"},
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
				__v.push(this.renderText(content.get(0)));
			}
			else
			{
				for (let i = 0; i < content.count(); i++)
				{
					let item = content.get(i);
					
					/* Element div */
					let __v0 = __v.element("div", new Runtime.Map({"key": i}));
					__v0.push(this.renderText(item));
				}
			}
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.tag == "p")
			{
				/* Element p */
				let __v0 = __v.element("p", new Runtime.Map({"class": rs.className(["text", this.class, componentHash]), "key": this.getKey()}));
				__v0.push(this.renderContent());
			}
			else if (this.tag == "h1")
			{
				/* Element h1 */
				let __v1 = __v.element("h1", new Runtime.Map({"class": rs.className(["text", this.class, componentHash]), "key": this.getKey()}));
				__v1.push(this.renderContent());
			}
			else if (this.tag == "h2")
			{
				/* Element h2 */
				let __v2 = __v.element("h2", new Runtime.Map({"class": rs.className(["text", this.class, componentHash]), "key": this.getKey()}));
				__v2.push(this.renderContent());
			}
			else if (this.tag == "h3")
			{
				/* Element h3 */
				let __v3 = __v.element("h3", new Runtime.Map({"class": rs.className(["text", this.class, componentHash]), "key": this.getKey()}));
				__v3.push(this.renderContent());
			}
			else if (this.tag == "h4")
			{
				/* Element h4 */
				let __v4 = __v.element("h4", new Runtime.Map({"class": rs.className(["text", this.class, componentHash]), "key": this.getKey()}));
				__v4.push(this.renderContent());
			}
			else if (this.tag == "html")
			{
				/* Element div */
				let __v5 = __v.element("div", new Runtime.Map({"class": rs.className(["text", this.class, componentHash]), "key": this.getKey()}));
				__v5.push(this.renderContent());
			}
			else
			{
				/* Element div */
				let __v6 = __v.element("div", new Runtime.Map({"class": rs.className(["text", this.class, componentHash]), "key": this.getKey()}));
				__v6.push(this.renderContent());
			}
			
			return __v;
		},
		/**
		 * Returns key
		 */
		getKey: function()
		{
			let key = this.tag;
			if (this.raw == "true") key = key + String("-raw");
			return key;
		},
		/**
		 * Render content
		 */
		renderText: function(content)
		{
			let vdom = new Runtime.VirtualDom();
			vdom.push(content);
			vdom.is_raw = this.raw == "true";
			return vdom;
		},
		getClassName: function(){ return "Runtime.Widget.Text"; },
	},
	getComponentStyle: function(){ return ".text.h-8fb4{padding: 0;margin: 0}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Text"] = Runtime.Widget.Text;