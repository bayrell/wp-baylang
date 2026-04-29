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
if (typeof Runtime.Providers == 'undefined') Runtime.Providers = {};
Runtime.Providers.RenderProvider = class extends Runtime.BaseProvider
{
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params.has("ssr")) this.enable_ssr = params.get("ssr");
	}
	
	
	/**
	 * Create layout
	 */
	createLayout(app_data)
	{
		let class_name = app_data.get("class");
		let layout = app_data.get("layout");
		if (!(layout instanceof Runtime.BaseLayout))
		{
			layout = Runtime.rtl.newInstance(class_name);
			Runtime.rtl.assign(layout, app_data.get("layout"));
		}
		return window["Vue"].reactive(layout);
	}
	
	
	/**
	 * Create App
	 */
	createApp(layout)
	{
		let app = null;
		let registerLayout = null;
		registerLayout = (layout) =>
		{
			return {
				install: () => {
					app.config.globalProperties.$layout = layout;
				},
			};
		};
		let component = Runtime.rtl.findClass(layout.component);
		let props = new Runtime.Map();
		let Vue = window["Vue"];
		if (this.enable_ssr)
		{
			app = Vue.createSSRApp(component, props);
		}
		else
		{
			app = Vue.createApp(component, props);
		}
		app.use(registerLayout(layout));
		Runtime.rtl.getContext().hook(Runtime.Hooks.RuntimeHook.CREATE_VUE, Runtime.Map.create({
			"app": app,
			"layout": layout,
		}));
		return app;
	}
	
	
	/**
	 * Mount
	 */
	mount(app_data, element)
	{
		let layout = this.createLayout(app_data);
		let app = this.createApp(layout);
		app.mount(element, true);
		Runtime.rtl.getContext().hook(Runtime.Hooks.RuntimeHook.MOUNT, Runtime.Map.create({
			"app": app,
			"layout": layout,
			"data": app_data,
		}));
		return Runtime.Map.create({
			"app": app,
			"layout": layout,
		});
	}
	
	
	/**
	 * Add replace component
	 */
	addComponent(component, name)
	{
		this.components.set(component, name);
	}
	
	
	/**
	 * Returns find element
	 */
	findElement(vdom)
	{
		if (vdom.is_component)
		{
			let name = vdom.name;
			if (this.components.has(name)) name = this.components.get(name);
			if (name == "TransitionGroup") return Vue.TransitionGroup;
			return Runtime.rtl.findClass(name);
		}
		return vdom.name;
	}
	
	
	/**
	 * Render
	 */
	render(vdom)
	{
		if (!(vdom instanceof Runtime.VirtualDom)) return vdom;
		let content = Runtime.Vector.create([]);
		if (!vdom.attrs.has("@raw"))
		{
			for (let i = 0; i < vdom.items.count(); i++)
			{
				let item = vdom.items.get(i);
				content.push(this.render(item));
			}
		}
		let h = window["Vue"].h;
		if (vdom.name == "")
		{
			if (content.count() == 1) return content.get(0);
			return content;
		}
		let children = content;
		if (vdom.is_component)
		{
			children = vdom.slots.map(function (f){
				return (...args) => {
					return Runtime.rtl.render(f.apply(null, args));
				};
			}).toObject();
		}
		if (children instanceof Runtime.Vector)
		{
			children = children.flatten().filter((item) => { return item != null && item != ""; });
		}
		let attrs = vdom.attrs;
		if (attrs instanceof Runtime.Map)
		{
			attrs = attrs.mapWithKeys((value, key) =>
			{
				if (key == "@ref") key = "ref";
				return Runtime.Vector.create([value, key]);
			}).filter((value, key) => { return Runtime.rs.charAt(key, 0) != "@"; });
			attrs = attrs.toObject();
			if (vdom.attrs.has("@raw"))
			{
				attrs["innerHTML"] = vdom.attrs.get("@raw");
			}
		}
		let name = this.findElement(vdom);
		return h(name, attrs, children);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.enable_ssr = true;
		this.components = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Providers.RenderProvider"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Providers.RenderProvider"] = Runtime.Providers.RenderProvider;