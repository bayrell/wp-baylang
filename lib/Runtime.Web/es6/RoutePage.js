"use strict;"
/*!
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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.RoutePage = class extends Runtime.Web.RouteInfo
{
	/**
	 * Process frontend data
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("page", new Runtime.Serializer.StringType());
	}
	
	
	/**
	 * Render route
	 */
	async render(container)
	{
		container.layout.current_page_model = "page_model";
		container.layout.pages.set("page_model", container.layout.createWidget("Runtime.BaseModel", Runtime.Map.create({
			"component": this.page,
		})));
		if (this.data)
		{
			let title = this.data.get("title");
			let is_full_title = this.data.get("full_title", false);
			container.layout.setPageTitle(title, is_full_title);
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.page = "";
	}
	static getClassName(){ return "Runtime.Web.RoutePage"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.RoutePage"] = Runtime.Web.RoutePage;