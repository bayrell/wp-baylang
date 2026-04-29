"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2024 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Hooks == 'undefined') Runtime.WordPress.Theme.Hooks = {};
Runtime.WordPress.Theme.Hooks.LayoutHook = class extends Runtime.Hooks.RuntimeHook
{
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(Runtime.Web.Hooks.AppHook.ROUTE_BEFORE, "initAdminBar");
		this.register(this.constructor.LAYOUT_HEADER, "header");
		this.register(this.constructor.LAYOUT_FOOTER, "footer");
	}
	
	
	/**
	 * Init admin bar
	 */
	initAdminBar(params)
	{
		let container = params.get("container");
		let layout = container.layout;
		if (!layout) return;
		layout.body_class.push("admin-bar");
	}
	
	
	/**
	 * Header
	 */
	header(params)
	{
		let components = params.get("components");
		let header = Runtime.WordPress.WP_Helper.wp_apply("wp_head");
		let vdom = new Runtime.VirtualDom();
		vdom.is_raw = true;
		vdom.push(header);
		components.push(vdom);
	}
	
	
	/**
	 * Footer
	 */
	footer(params)
	{
		let components = params.get("components");
		let footer = Runtime.WordPress.WP_Helper.wp_apply("wp_footer");
		let vdom = new Runtime.VirtualDom();
		vdom.is_raw = true;
		vdom.push(footer);
		components.push(vdom);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Hooks.LayoutHook"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.Hooks.LayoutHook"] = Runtime.WordPress.Theme.Hooks.LayoutHook;