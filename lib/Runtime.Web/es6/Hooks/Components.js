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
Runtime.Web.Hooks.Components = class extends Runtime.Hooks.RuntimeHook
{
	/**
	 * Hook factory
	 */
	static hook(items, priority)
	{
		if (priority == undefined) priority = 100;
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.create({"components": items, "priority": priority}));
	}
	
	
	/**
	 * Prepend item
	 */
	static prependItems(items, priority)
	{
		if (priority == undefined) priority = 100;
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.create({
			"components": items,
			"priority": priority,
			"strategy": "prependItems",
		}));
	}
	
	
	/**
	 * Hook factory
	 */
	static header(items, priority)
	{
		if (priority == undefined) priority = 100;
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.create({"header": items, "priority": priority}));
	}
	
	
	/**
	 * Hook factory
	 */
	static footer(items, priority)
	{
		if (priority == undefined) priority = 100;
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.create({"footer": items, "priority": priority}));
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("priority")) this.priority = params.get("priority");
		if (params.has("strategy")) this.strategy = params.get("strategy");
		if (params.has("components")) this.items.set("components", params.get("components"));
		if (params.has("footer")) this.items.set("footer", params.get("footer"));
		if (params.has("header")) this.items.set("header", params.get("header"));
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(Runtime.Hooks.RuntimeHook.COMPONENTS, "components", this.priority);
		this.register(Runtime.Hooks.RuntimeHook.LAYOUT_HEADER, "render_head", this.priority);
		this.register(Runtime.Hooks.RuntimeHook.LAYOUT_FOOTER, "render_footer", this.priority);
	}
	
	
	/**
	 * Add action
	 */
	action(arr, items)
	{
		if (this.strategy == "appendItems") arr.appendItems(items);
		else arr.prependItems(items);
	}
	
	
	/**
	 * Components
	 */
	components(params)
	{
		this.action(params.get("components"), this.items.get("components"));
	}
	
	
	/**
	 * Render head
	 */
	render_head(params)
	{
		this.action(params.get("components"), this.items.get("header"));
	}
	
	
	/**
	 * Render footer
	 */
	render_footer(params)
	{
		this.action(params.get("components"), this.items.get("footer"));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.items = Runtime.Map.create({
			"components": Runtime.Vector.create([]),
			"footer": Runtime.Vector.create([]),
			"header": Runtime.Vector.create([]),
		});
		this.priority = 100;
		this.strategy = "appendItems";
	}
	static getClassName(){ return "Runtime.Web.Hooks.Components"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Hooks.Components"] = Runtime.Web.Hooks.Components;