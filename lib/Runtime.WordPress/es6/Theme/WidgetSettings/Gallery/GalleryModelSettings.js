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
if (typeof Runtime.WordPress.Theme.WidgetSettings == 'undefined') Runtime.WordPress.Theme.WidgetSettings = {};
if (typeof Runtime.WordPress.Theme.WidgetSettings.Gallery == 'undefined') Runtime.WordPress.Theme.WidgetSettings.Gallery = {};
Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings = class extends Runtime.BaseObject
{
	/**
	 * Returns widget name
	 */
	getWidgetName(){ return ""; }
	
	
	/**
	 * Returns alias name
	 */
	getAliasName(){ return "WP_GalleryModel"; }
	
	
	/**
	 * Returns component name
	 */
	getComponentName(){ return ""; }
	
	
	/**
	 * Returns model name
	 */
	getModelName(){ return "Runtime.WordPress.Theme.Components.Gallery.GalleryModel"; }
	
	
	/**
	 * Returns selector name
	 */
	getSelectorName(){ return "gallery"; }
	
	
	/**
	 * Returns group name
	 */
	getGroupName(){ return "widget"; }
	
	
	/**
	 * Returns true if model
	 */
	isModel(){ return true; }
	
	
	/**
	 * Returns true if is widget settings
	 */
	checkWidget(widget)
	{
		if (!widget.isComponent()) return false;
		if (widget.model_class_name != this.getModelName()) return false;
		return true;
	}
	
	
	/**
	 * Can insert widget
	 */
	canInsert(widget)
	{
		return false;
	}
	
	
	/**
	 * On change
	 */
	onChange(runtime, model, param)
	{
		/* Change api name */
		if (param.name == "api_name")
		{
			model.api_name = param.value;
			model.loadItems();
			return true;
		}
		return false;
	}
	
	
	/**
	 * Load form name options
	 */
	async loadOptions(runtime, widget)
	{
		if (!this.api_names)
		{
			let data = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, Runtime.Map.create({
				"api_name": "admin.wordpress.gallery.search",
				"method_name": "actionSearch",
				"data": Runtime.Map.create({
					"limit": "1000",
				}),
			}));
			let result = await widget.page_model.layout.callApi(data);
			if (result.isSuccess())
			{
				let result_data = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, result.data);
				this.api_names = result_data.get("items").map((item) =>
				{
					return Runtime.Map.create({
						"key": item.get("api_name"),
						"value": item.get("api_name"),
					});
				});
			}
			else
			{
				this.api_names = Runtime.Vector.create([]);
			}
		}
		if (!this.image_sizes)
		{
			let data = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, Runtime.Map.create({
				"api_name": "admin.wordpress.gallery.search",
				"method_name": "actionImageSizes",
			}));
			let result = await widget.page_model.layout.callApi(data);
			if (result.isSuccess())
			{
				let result_data = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, result.data);
				this.image_sizes = result_data.get("items").map((name) =>
				{
					return Runtime.Map.create({
						"key": name,
						"value": name,
					});
				});
			}
			else
			{
				this.image_sizes = Runtime.Vector.create([]);
			}
		}
	}
	
	
	/**
	 * Setup widget
	 */
	async setup(runtime, widget)
	{
		/* Load options */
		await this.loadOptions(runtime, widget);
		/* Add api_names to widget */
		if (this.api_names)
		{
			let parameter = widget.params.findItem((param) => { return param.name == "api_name"; });
			if (parameter)
			{
				let options = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, this.api_names);
				parameter.props.set("options", options);
			}
		}
		/* Setup image sizes */
		if (this.image_sizes)
		{
			let image_sizes = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, this.image_sizes);
			/* Set big_size */
			let parameter = widget.params.findItem((param) => { return param.name == "big_size"; });
			if (parameter)
			{
				parameter.props.set("options", image_sizes);
			}
			/* Set small_size */
			let parameter = widget.params.findItem((param) => { return param.name == "small_size"; });
			if (parameter)
			{
				parameter.props.set("options", image_sizes);
			}
		}
	}
	
	
	/**
	 * Returns params
	 */
	getParams()
	{
		return Runtime.Vector.create([
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "api_name",
				"label": "Api name",
				"component": "Runtime.Widget.Select",
				"default": "",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
					]),
				}),
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "dialog_image_contains",
				"label": "Dialog image contains",
				"component": "Runtime.Widget.Select",
				"default": "",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
						Runtime.Map.create({"key": "false", "value": "No"}),
						Runtime.Map.create({"key": "true", "value": "Yes"}),
					]),
				}),
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "small_size",
				"label": "Small image",
				"component": "Runtime.Widget.Select",
				"default": "",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
					]),
				}),
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "big_size",
				"label": "Big image",
				"component": "Runtime.Widget.Select",
				"default": "",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
					]),
				}),
			})),
		]);
	}
	
	
	/**
	 * Returns default template
	 */
	getDefaultTemplate()
	{
		return Runtime.Map.create({
			"default": () =>
			{
				return Runtime.Map.create({
					"modules": Runtime.Vector.create([
						"Runtime.Entity.Factory",
					]),
					"model": Runtime.rs.join("\n", Runtime.Vector.create([
						"this.form = this.addWidget(classof WP_GalleryModel, {",
						"\t'widget_name': 'gallery',",
						"\t'apiname': 'default',",
						"});",
					])),
				});
			},
		});
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.api_names = null;
		this.image_sizes = null;
	}
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["BayLang.Constructor.WidgetPage.WidgetSettingsInterface"]; }
};
window["Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings"] = Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings;