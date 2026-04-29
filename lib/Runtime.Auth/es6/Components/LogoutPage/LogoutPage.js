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
if (typeof Runtime.Auth == 'undefined') Runtime.Auth = {};
if (typeof Runtime.Auth.Components == 'undefined') Runtime.Auth.Components = {};
if (typeof Runtime.Auth.Components.LogoutPage == 'undefined') Runtime.Auth.Components.LogoutPage = {};
Runtime.Auth.Components.LogoutPage.LogoutPage = {
	name: "Runtime.Auth.Components.LogoutPage.LogoutPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["logout_page", componentHash])}));
			
			/* Element h1 */
			let __v1 = __v0.element("h1", new Runtime.Map({"class": rs.className(["page_title", componentHash])}));
			__v1.push("Click to logout");
			
			/* Element div */
			let __v2 = __v0.element("div", new Runtime.Map({"class": rs.className(["logout_page_button", componentHash])}));
			
			/* Element Runtime.Widget.Button */
			let __v3 = __v2.element("Runtime.Widget.Button", new Runtime.Map({"styles": Runtime.Vector.create(["danger"]), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, () =>
			{
				this.model.logout();
			})}));
			
			/* Content */
			__v3.slot("default", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				__v.push("Logout");
				return __v;
			});
			__v2.push(this.renderWidget(this.model.result));
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Auth.Components.LogoutPage.LogoutPage"; },
	},
	getComponentStyle: function(){ return ".logout_page.h-8786{max-width: 600px;margin-left: auto;margin-right: auto;margin-top: 100px;margin-bottom: 100px}.logout_page_button.h-8786{text-align: center}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button"); },
};
window["Runtime.Auth.Components.LogoutPage.LogoutPage"] = Runtime.Auth.Components.LogoutPage.LogoutPage;