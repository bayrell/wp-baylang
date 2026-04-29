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
Runtime.RenderContainer = class extends Runtime.BaseObject
{
	/**
	 * Create layout
	 */
	createLayout(layout_name)
	{
		let class_name = "Runtime.BaseLayout";
		/* Get layout params */
		let params = Runtime.rtl.getContext().hook(Runtime.Hooks.RuntimeHook.LAYOUT_NAME, Runtime.Map.create({
			"class_name": class_name,
			"layout_name": layout_name,
		}));
		this.layout = Runtime.rtl.newInstance(params.get("class_name"), Runtime.Vector.create([params]));
		this.layout.name = layout_name;
		/* Call create layout */
		Runtime.rtl.getContext().hook(Runtime.Hooks.RuntimeHook.CREATE_LAYOUT, Runtime.Map.create({
			"container": this,
		}));
		return this.layout;
	}
	
	
	/**
	 * Change layout
	 */
	changeLayout(layout_name)
	{
		if (this.layout && this.layout.name == layout_name) return;
		/* Save old layout */
		let old_layout = this.layout;
		/* Create new layout */
		this.createLayout(layout_name);
		/* Restore layout */
		this.layout.restore(old_layout);
		/* Call create layout */
		Runtime.rtl.getContext().hook(Runtime.Hooks.RuntimeHook.CHANGE_LAYOUT, Runtime.Map.create({
			"container": this,
		}));
	}
	
	
	/**
	 * Resolve container
	 */
	async resolve()
	{
	}
	
	
	/**
	 * Render page model
	 */
	async renderPageModel(model_name, params)
	{
		if (params == undefined) params = null;
		/* Set page model */
		this.layout.setPageModel(model_name, params);
		/* Action index */
		let page_model = this.layout.getPageModel();
		if (page_model)
		{
			await page_model.loadData(this);
			if (page_model == this.layout.getPageModel()) page_model.buildTitle(this);
		}
	}
	
	
	/**
	 * Load data
	 */
	async loadData()
	{
		await this.layout.loadData();
	}
	
	
	/**
	 * Returns data
	 */
	getData()
	{
		let layout_data = Runtime.rtl.serialize(this.layout);
		let data = Runtime.Map.create({
			"modules": Runtime.rtl.getContext().modules,
			"class": this.layout.constructor.getClassName(),
			"layout": layout_data,
			"environments": Runtime.Map.create({
				"CLOUD_ENV": Runtime.rtl.getContext().env("CLOUD_ENV"),
				"DEBUG": Runtime.rtl.getContext().env("DEBUG"),
				"LOCALE": Runtime.rtl.getContext().env("LOCALE"),
				"TZ": Runtime.rtl.getContext().env("TZ"),
				"TZ_OFFSET": Runtime.rtl.getContext().env("TZ_OFFSET"),
				"ROUTE_PREFIX": Runtime.rtl.getContext().env("ROUTE_PREFIX"),
			}),
		});
		let res = Runtime.rtl.getContext().hook(Runtime.Hooks.RuntimeHook.CREATE_CONTAINER_DATA, Runtime.Map.create({
			"container": this,
			"data": data,
		}));
		return res.get("data");
	}
	
	
	/**
	 * Render app
	 */
	renderApp()
	{
		let component = Runtime.rtl.newInstance(this.layout.component);
		component.container = this;
		component.layout = this.layout;
		let vdom = component.renderApp();
		return vdom.render();
	}
	
	
	/**
	 * Render layout
	 */
	render()
	{
		let vdom = new Runtime.VirtualDom();
		vdom.setName(this.layout.component);
		vdom.setAttrs(Runtime.Map.create({"layout": this.layout}));
		return vdom.render();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.layout = null;
	}
	static getClassName(){ return "Runtime.RenderContainer"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.RenderContainer"] = Runtime.RenderContainer;