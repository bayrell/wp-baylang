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
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.PromptDialog = {
	name: "Runtime.Widget.Dialog.PromptDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderTitle: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.slot("title"))
			{
				__v.push(this.renderSlot("title"));
			}
			else
			{
				__v.push(this.model.title);
			}
			
			return __v;
		},
		renderContent: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["dialog__content", componentHash])}));
			
			if (this.slot("content"))
			{
				__v0.push(this.renderSlot("content"));
			}
			else
			{
				__v0.push(this.model.content);
			}
			
			/* Element Runtime.Widget.Input */
			__v0.element("Runtime.Widget.Input", new Runtime.Map({"name": "value", "value": this.model.value, "onChange": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
			{
				this.model.setValue(event.target.value);
			})}));
			__v0.push(this.renderWidget(this.model.result, Runtime.Map.create({
				"class": "result--center",
			})));
			
			return __v;
		},
		renderFooter: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["dialog__footer", componentHash])}));
			
			/* Element Runtime.Widget.Button */
			let __v1 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
			{
				this.model.hide();
			})}));
			
			/* Content */
			__v1.slot("default", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				__v.push("Close");
				return __v;
			});
			
			/* Element Runtime.Widget.Button */
			let __v2 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--primary", componentHash]), "style": this.model.title_button_styles, "onClick": this.hash(2) ? this.hash(2) : this.hash(2, (event) =>
			{
				this.model.confirm();
			})}));
			
			/* Content */
			__v2.slot("default", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				__v.push(this.model.title_button ? this.model.title_button : "Confirm");
				
				return __v;
			});
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Dialog.PromptDialog"; },
	},
	getComponentStyle: function(){ return ".dialog__content.h-688b .result{margin-top: calc(var(--space) * 0.5)}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.Input"); },
};
window["Runtime.Widget.Dialog.PromptDialog"] = Runtime.Widget.Dialog.PromptDialog;