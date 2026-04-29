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
if (typeof Runtime.Auth.Components.LoginPage == 'undefined') Runtime.Auth.Components.LoginPage = {};
Runtime.Auth.Components.LoginPage.LoginPage = {
	name: "Runtime.Auth.Components.LoginPage.LoginPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["login_page", componentHash])}));
			
			/* Element h1 */
			let __v1 = __v0.element("h1", new Runtime.Map({"class": rs.className(["page_title", componentHash])}));
			__v1.push("Login Page");
			__v0.push(this.renderWidget(this.model.login_form));
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Auth.Components.LoginPage.LoginPage"; },
	},
	getComponentStyle: function(){ return ".login_page.h-f9a{max-width: 600px;margin-left: auto;margin-right: auto;margin-top: 100px;margin-bottom: 100px}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Auth.Components.LoginPage.LoginPage"] = Runtime.Auth.Components.LoginPage.LoginPage;