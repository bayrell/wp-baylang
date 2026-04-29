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
Runtime.Web.RouteModel = class extends Runtime.Web.RouteInfo
{
	/**
	 * Process frontend data
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("model", new Runtime.Serializer.StringType());
		rules.addType("model_params", new Runtime.Serializer.MapType());
	}
	
	
	/**
	 * Copy object
	 */
	copy()
	{
		let route = Runtime.rtl.copy(this);
		if (this.model_params) route.model_params = this.model_params.copy();
		return route;
	}
	
	
	/**
	 * Render route
	 */
	async render(container)
	{
		/* Check page model */
		if (this.model == "") return;
		if (!Runtime.rtl.classExists(this.model)) return;
		/* Render page model */
		await container.renderPageModel(this.model, this.model_params);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.model = "";
		this.model_params = null;
	}
	static getClassName(){ return "Runtime.Web.RouteModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.RouteModel"] = Runtime.Web.RouteModel;