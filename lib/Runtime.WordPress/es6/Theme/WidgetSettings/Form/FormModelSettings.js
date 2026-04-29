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
if (typeof Runtime.WordPress.Theme.WidgetSettings.Form == 'undefined') Runtime.WordPress.Theme.WidgetSettings.Form = {};
Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings = class extends Runtime.BaseObject
{
	/**
	 * Returns widget name
	 */
	getWidgetName(){ return ""; }
	
	
	/**
	 * Returns alias name
	 */
	getAliasName(){ return "WP_FormModel"; }
	
	
	/**
	 * Returns component name
	 */
	getComponentName(){ return ""; }
	
	
	/**
	 * Returns model name
	 */
	getModelName(){ return "Runtime.WordPress.Theme.Components.Form.FormModel"; }
	
	
	/**
	 * Returns selector name
	 */
	getSelectorName(){ return "form"; }
	
	
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
		/* Change form name */
		if (param.name == "form_name")
		{
			model.form_name = param.value;
			model.loadForm();
			return true;
		}
		/* Change form title */
		if (param.name == "form_title")
		{
			model.form_title = param.value;
			return true;
		}
		/* Change form content */
		if (param.name == "form_content")
		{
			model.form_content = param.value;
			return true;
		}
		/* Change form ID */
		if (param.name == "form_id")
		{
			model.form_id = param.value;
			return true;
		}
		/* Change form styles */
		if (param.name == "form_styles")
		{
			model.styles = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, param.value);
			return true;
		}
		/* Form button text */
		if (param.name == "form_button_text")
		{
			let button = model.bottom_buttons.getWidget("submit");
			button.content = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, param.value);
			return true;
		}
		/* Form button styles */
		if (param.name == "form_button_styles")
		{
			let button = model.bottom_buttons.getWidget("submit");
			button.styles = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, param.value);
			return true;
		}
		/* Form show label */
		if (param.name == "form_show_label")
		{
			model.field_settings.set("show_label", param.value);
			return true;
		}
		return false;
	}
	
	
	/**
	 * Load form name options
	 */
	async loadOptions(runtime, widget)
	{
		if (this.options) return;
		let data = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, Runtime.Map.create({
			"api_name": "admin.wordpress.forms.settings.search",
			"method_name": "actionSearch",
			"data": Runtime.Map.create({
				"limit": "1000",
			}),
		}));
		let result = await widget.page_model.layout.callApi(data);
		if (result.isSuccess())
		{
			let result_data = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, result.data);
			this.options = result_data.get("items").map((item) =>
			{
				return Runtime.Map.create({
					"key": item.get("api_name"),
					"value": item.get("name"),
				});
			});
		}
		else
		{
			this.options = Runtime.Vector.create([]);
		}
	}
	
	
	/**
	 * Setup widget
	 */
	async setup(runtime, widget)
	{
		/* Load options */
		await this.loadOptions(runtime, widget);
		/* Add options to widget */
		if (this.options)
		{
			let form_name_param = widget.params.findItem((param) => { return param.name == "form_name"; });
			if (form_name_param)
			{
				let options = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, this.options);
				form_name_param.props.set("options", options);
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
				"name": "form_name",
				"label": "Form name",
				"component": "Runtime.Widget.Select",
				"default": "",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
					]),
				}),
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "styles",
				"label": "Form styles",
				"component": "Runtime.Widget.Tag",
				"default": Runtime.Vector.create([]),
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "form_title",
				"label": "Email title",
				"component": "Runtime.Widget.Input",
				"default": "",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "form_content",
				"label": "Form content",
				"component": "Runtime.Widget.TextEditable",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "metrika_form_id",
				"label": "Form id",
				"component": "Runtime.Widget.Input",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "metrika_event",
				"label": "Metrika event",
				"component": "Runtime.Widget.Input",
				"default": "",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "redirect_url",
				"label": "Redirect URL",
				"component": "Runtime.Widget.Input",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "form_show_label",
				"path": Runtime.Vector.create(["field_settings", "show_label"]),
				"label": "Form show label",
				"component": "Runtime.Widget.Select",
				"default": "true",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
						Runtime.Map.create({"key": "false", "value": "False"}),
						Runtime.Map.create({"key": "true", "value": "True"}),
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
						"this.form = this.addWidget(classof WP_FormModel, {",
						"\t'widget_name': 'form',",
						"\t'form_name': 'default',",
						"\t'submit_button':",
						"\t{",
						"\t\t'text': 'Отправить заявку',",
						"\t},",
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
		this.options = null;
	}
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["BayLang.Constructor.WidgetPage.WidgetSettingsInterface"]; }
};
window["Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings"] = Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings;