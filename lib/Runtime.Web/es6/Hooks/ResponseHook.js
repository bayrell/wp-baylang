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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.ResponseHook = class extends Runtime.Web.Hooks.AppHook
{
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(this.constructor.RESPONSE, 9999);
	}
	
	
	/**
	 * Response
	 */
	async response(params)
	{
		let container = params.get("container");
		let response = container.response;
		if (!(response instanceof Runtime.Web.RenderResponse)) return;
		if (response.content != null) return;
		let class_name = container.layout.getCoreUI();
		if (class_name == null)
		{
			throw new Runtime.Exceptions.RuntimeException("Class name is null");
		}
		/* Create component */
		let component = Runtime.rtl.newInstance(class_name);
		component.container = container;
		component.layout = container.layout;
		component.model = container.layout;
		/* Render component */
		let content = "<!doctype html>\n";
		content += Runtime.RawString.normalize(component.render());
		/* Set result */
		response.content = content;
		return params;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.Web.Hooks.ResponseHook"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Hooks.ResponseHook"] = Runtime.Web.Hooks.ResponseHook;