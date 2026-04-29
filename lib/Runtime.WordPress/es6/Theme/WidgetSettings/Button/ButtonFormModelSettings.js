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
if (typeof Runtime.WordPress.Theme.WidgetSettings.Button == 'undefined') Runtime.WordPress.Theme.WidgetSettings.Button = {};
Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormModelSettings = class extends Runtime.BaseObject
{
	/**
	 * Returns widget name
	 */
	getWidgetName(){ return ""; }
	
	
	/**
	 * Returns alias name
	 */
	getAliasName(){ return "WP_ButtonFormModel"; }
	
	
	/**
	 * Returns component name
	 */
	getComponentName(){ return ""; }
	
	
	/**
	 * Returns model name
	 */
	getModelName(){ return "Runtime.WordPress.Theme.Components.Button.ButtonFormModel"; }
	
	
	/**
	 * Returns selector name
	 */
	getSelectorName(){ return "button"; }
	
	
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
	 * On change
	 */
	onChange(runtime, model, param)
	{
		/* Change form name */
		if (param.name == "form_name")
		{
			model.form.form_name = param.value;
			model.form.loadForm();
			return true;
		}
		/* Change form content */
		if (param.name == "form_content")
		{
			model.form.form_content = param.value;
			return true;
		}
		/* Change form ID */
		if (param.name == "form_id")
		{
			model.form.form_id = param.value;
			return true;
		}
		/* Change form styles */
		if (param.name == "form_styles")
		{
			model.form.styles = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, param.value);
			return true;
		}
		/* Change button styles */
		if (param.name == "styles")
		{
			model.styles = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, param.value);
			return true;
		}
		/* Form button text */
		if (param.name == "form_button_text")
		{
			let button = model.form.bottom_buttons.getWidget("submit");
			button.content = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, param.value);
			return true;
		}
		/* Form button styles */
		if (param.name == "form_button_styles")
		{
			let button = model.form.bottom_buttons.getWidget("submit");
			button.styles = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, param.value);
			return true;
		}
		/* Form show label */
		if (param.name == "form_show_label")
		{
			model.form.field_settings.set("show_label", param.value);
			return true;
		}
		/* Change dialog styles */
		if (param.name == "dialog_styles")
		{
			model.dialog.styles = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, param.value);
			return true;
		}
		/* Change dialog title */
		if (param.name == "dialog_title")
		{
			model.dialog.title = param.value;
			return true;
		}
		/* Change redirect url */
		if (param.name == "redirect_url")
		{
			model.form.redirect_url = param.value;
			model.form.loadForm();
			return true;
		}
		return false;
	}
	
	
	/**
	 * Returns params
	 */
	getParams()
	{
		return Runtime.Vector.create([
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.create({
				"name": "styles",
				"label": "Button styles",
				"component": "Runtime.Widget.Tag",
				"default": Runtime.Vector.create(["danger"]),
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "redirect_url",
				"path": Runtime.Vector.create(["form_settings", "redirect_url"]),
				"label": "Redirect URL",
				"component": "Runtime.Widget.Input",
				"default": "",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "metrika_event",
				"path": Runtime.Vector.create(["form_settings", "metrika_event"]),
				"label": "Metrika event",
				"component": "Runtime.Widget.Input",
				"default": "",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "metrika_form_id",
				"path": Runtime.Vector.create(["form_settings", "metrika_form_id"]),
				"label": "Form id",
				"component": "Runtime.Widget.Input",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "form_name",
				"path": Runtime.Vector.create(["form_settings", "form_name"]),
				"label": "Form name",
				"component": "Runtime.Widget.Select",
				"default": "",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
					]),
				}),
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "form_content",
				"path": Runtime.Vector.create(["form_settings", "form_content"]),
				"label": "Form content",
				"component": "Runtime.Widget.TextEditable",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "form_styles",
				"path": Runtime.Vector.create(["form_settings", "styles"]),
				"label": "Form styles",
				"component": "Runtime.Widget.Tag",
				"default": Runtime.Vector.create([]),
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "form_show_label",
				"path": Runtime.Vector.create(["form_settings", "field_settings", "show_label"]),
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
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "dialog_styles",
				"path": Runtime.Vector.create(["dialog_settings", "styles"]),
				"label": "Dialog styles",
				"component": "Runtime.Widget.Tag",
				"default": Runtime.Vector.create([]),
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "dialog_title",
				"path": Runtime.Vector.create(["dialog_settings", "title"]),
				"label": "Dialog title",
				"component": "Runtime.Widget.Input",
				"default": "",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "form_button_text",
				"path": Runtime.Vector.create(["form_settings", "submit_button", "text"]),
				"label": "Dialog button text",
				"component": "Runtime.Widget.Input",
				"default": "Send",
			})),
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.create({
				"name": "form_button_styles",
				"path": Runtime.Vector.create(["form_settings", "submit_button", "styles"]),
				"label": "Dialog button styles",
				"component": "Runtime.Widget.Tag",
				"default": Runtime.Vector.create(["danger", "large", "stretch"]),
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
						"this.form = this.addWidget(classof WP_ButtonFormModel, {",
						"\t'widget_name': 'button',",
						"\t'form_name': 'default',",
						"\t'form_settings':",
						"\t{",
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
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormModelSettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["BayLang.Constructor.WidgetPage.WidgetSettingsInterface"]; }
};
window["Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormModelSettings"] = Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormModelSettings;