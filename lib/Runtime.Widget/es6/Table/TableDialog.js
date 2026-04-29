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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableDialog = {
	name: "Runtime.Widget.Table.TableDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	props: {
		manager: {default: null},
	},
	methods:
	{
		renderTitle: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let action = this.manager.getDialogAction();
			__v.push(this.manager.getDialogTitle(action));
			
			return __v;
		},
		renderContent: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["dialog__content", componentHash])}));
			
			if (this.manager.dialog_action == "save")
			{
				__v0.push(this.renderSlot("save"));
			}
			else if (this.manager.dialog_action == "delete")
			{
				/* Element div */
				let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["dialog__delete_message", componentHash])}));
				__v1.push(this.manager.getDialogTitle("delete_message"));
				__v0.push(this.renderWidget(this.manager.form.result, Runtime.Map.create({
					"class": "result--center result--form",
				})));
			}
			
			return __v;
		},
		renderFooter: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["dialog__footer", componentHash])}));
			
			let action = this.manager.getDialogAction();
			if (action == "add")
			{
				/* Element Runtime.Widget.Button */
				let __v1 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.manager.onSave();
				}), "class": rs.className(["button--primary", componentHash])}));
				
				/* Content */
				__v1.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Create");
					return __v;
				});
				
				/* Element Runtime.Widget.Button */
				let __v2 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
				{
					this.manager.dialog.hide();
				})}));
				
				/* Content */
				__v2.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Cancel");
					return __v;
				});
			}
			else if (action == "edit")
			{
				/* Element Runtime.Widget.Button */
				let __v3 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(2) ? this.hash(2) : this.hash(2, (event) =>
				{
					this.manager.onSave();
				}), "class": rs.className(["button--primary", componentHash])}));
				
				/* Content */
				__v3.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Save");
					return __v;
				});
				
				/* Element Runtime.Widget.Button */
				let __v4 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(3) ? this.hash(3) : this.hash(3, (event) =>
				{
					this.manager.dialog.hide();
				})}));
				
				/* Content */
				__v4.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Cancel");
					return __v;
				});
			}
			else if (action == "delete")
			{
				/* Element Runtime.Widget.Button */
				let __v5 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(4) ? this.hash(4) : this.hash(4, (event) =>
				{
					this.manager.onDelete();
				}), "class": rs.className(["button--danger", componentHash])}));
				
				/* Content */
				__v5.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Delete");
					return __v;
				});
				
				/* Element Runtime.Widget.Button */
				let __v6 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(5) ? this.hash(5) : this.hash(5, (event) =>
				{
					this.manager.dialog.hide();
				})}));
				
				/* Content */
				__v6.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Cancel");
					return __v;
				});
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Table.TableDialog"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button"); },
};
window["Runtime.Widget.Table.TableDialog"] = Runtime.Widget.Table.TableDialog;