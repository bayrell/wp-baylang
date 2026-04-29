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
Runtime.BaseLayout = class extends Runtime.BaseModel
{
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		this.layout = this;
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Init storage */
		this.initStorage();
	}
	
	
	/**
	 * Init storage
	 */
	initStorage()
	{
		this.storage = this.createWidget("Runtime.BaseStorage");
	}
	
	
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("component_props", new Runtime.Serializer.MapType());
		rules.addType("components", new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType()));
		rules.addType("current_component", new Runtime.Serializer.StringType());
		rules.addType("current_page_model", new Runtime.Serializer.StringType());
		rules.addType("body_class", new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType()));
		rules.addType("lang", new Runtime.Serializer.StringType());
		rules.addType("name", new Runtime.Serializer.StringType());
		rules.addType("theme", new Runtime.Serializer.StringType());
		rules.addType("title", new Runtime.Serializer.StringType());
		rules.addType("description", new Runtime.Serializer.StringType());
		rules.addType("storage", new Runtime.Serializer.ObjectType(Runtime.Map.create({"class_name": "Runtime.BaseStorage"})));
		rules.addType("pages", new Runtime.Serializer.MapType(new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"autocreate": true,
			"extends": "Runtime.BaseModel",
			"create": (layout, rules, data) =>
			{
				return layout.createWidget(rules.class_name, data);
			},
		}))));
	}
	
	
	/**
	 * Add component
	 */
	addComponent(class_name)
	{
		this.components.push(class_name);
	}
	
	
	/**
	 * Returns page model
	 */
	getPageModel(){ return this.pages.get(this.current_page_model); }
	
	
	/**
	 * Set page model
	 */
	setPageModel(class_name, params)
	{
		if (params == undefined) params = null;
		if (!params) params = new Runtime.Map();
		this.current_page_model = class_name;
		let page = this.pages.get(class_name);
		if (!page)
		{
			page = this.createWidget(class_name, params);
			this.pages.set(class_name, page);
		}
		return page;
	}
	
	
	/**
	 * Set page description
	 */
	setDescription(description)
	{
		this.description = description;
	}
	
	
	/**
	 * Set current page
	 */
	setCurrentPage(component_name, props)
	{
		if (props == undefined) props = null;
		this.current_component = component_name;
		this.component_props = props;
	}
	
	
	/**
	 * Set page title
	 */
	setPageTitle(title, full_title)
	{
		if (full_title == undefined) full_title = false;
		let res = Runtime.rtl.getContext().hook(Runtime.Hooks.RuntimeHook.TITLE, Runtime.Map.create({
			"layout": this,
			"title": title,
			"title_orig": title,
			"full_title": full_title,
		}));
		this.title = res.get("title");
	}
	
	
	/**
	 * Set page description
	 */
	setPageDescription(description)
	{
		this.description = description;
	}
	
	
	/**
	 * Returns object
	 */
	get(name){ return this.storage.frontend.get(name); }
	
	
	/**
	 * Returns site name
	 */
	getSiteName(){ return ""; }
	
	
	/**
	 * Create url
	 */
	url(name, params)
	{
		if (params == undefined) params = null;
		let router = this.get("router");
		return router ? router.url(name, params) : "";
	}
	
	
	/**
	 * Send api
	 */
	async sendApi(params)
	{
		let api = Runtime.rtl.getContext().provider("api");
		return await api.send(params);
	}
	
	
	/**
	 * Restore layout
	 */
	restore(layout)
	{
		let old_pages = layout ? layout.pages : new Runtime.Map();
		/* Restore pages */
		let keys = Runtime.rtl.list(old_pages.keys());
		for (let i = 0; i < keys.count(); i++)
		{
			let key = keys.get(i);
			let widget = old_pages.get(key);
			widget.parent_widget = this;
			this.pages.set(key, widget);
		}
		/* Restore storage */
		this.storage = layout.storage;
	}
	
	
	/**
	 * Translate
	 */
	translate(text, params)
	{
		if (params == undefined) params = null;
		let s = text.has(this.lang) ? text.get(this.lang) : text.get(this.getDefaultLang());
		return Runtime.rs.format(s, params);
	}
	
	
	/**
	 * Returns default lang
	 */
	getDefaultLang(){ return "en"; }
	
	
	/**
	 * Assets
	 */
	assets(path)
	{
		let library = "app";
		let arr = Runtime.rs.split(":", path);
		if (arr.count() >= 2)
		{
			library = arr.get(0);
			path = arr.get(1);
		}
		let assets = this.get("assets");
		return assets ? assets.get(library, path) : path;
	}
	
	
	/**
	 * Returns components
	 */
	getComponents()
	{
		let res = Runtime.rtl.getContext().hook(Runtime.Hooks.RuntimeHook.COMPONENTS, Runtime.Map.create({
			"components": this.components.slice(),
		}));
		return this.constructor.getRequiredComponents(res.get("components"));
	}
	
	
	/**
	 * Returns all components
	 */
	static getRequiredComponents(components)
	{
		let hash = new Runtime.Map();
		let isHash = (class_name) => { return !hash.has(class_name); };
		let result_components = Runtime.Vector.create([]);
		let deep = (deep, components) =>
		{
			for (let i = 0; i < components.count(); i++)
			{
				let class_name = components.get(i);
				if (hash.has(class_name)) continue;
				hash.set(class_name, true);
				let arr = Runtime.Vector.create([]);
				/* Add parent components */
				let items = Runtime.rtl.getParents(class_name, "Runtime.Component").filter(isHash);
				arr.appendItems(items);
				/* Add required components */
				let f = new Runtime.Method(class_name, "getRequiredComponents");
				if (f.exists())
				{
					items = f.apply().filter(isHash);
					arr.appendItems(items);
				}
				deep(deep, arr);
				result_components.push(class_name);
			}
		};
		deep(deep, components);
		return result_components;
	}
	
	
	/**
	 * Returns style
	 */
	static getStyle(components)
	{
		let content = Runtime.Vector.create([]);
		for (let i = 0; i < components.count(); i++)
		{
			let class_name = components.get(i);
			let f = new Runtime.Method(class_name, "getComponentStyle");
			if (!f.exists()) continue;
			content.push(f.apply());
		}
		return Runtime.rs.join("", content);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.storage = null;
		this.body_class = Runtime.Vector.create([]);
		this.components = Runtime.Vector.create([]);
		this.pages = new Runtime.Map();
		this.component_props = new Runtime.Map();
		this.component = "Runtime.DefaultLayout";
		this.current_component = "";
		this.current_page_model = "";
		this.name = "";
		this.lang = "en";
		this.title = "";
		this.description = "";
		this.theme = "light";
	}
	static getClassName(){ return "Runtime.BaseLayout"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.BaseLayout"] = Runtime.BaseLayout;