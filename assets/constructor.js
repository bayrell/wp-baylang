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
Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings = class extends Runtime.BaseObject
{
	/**
	 * Returns widget name
	 */
	getWidgetName(){ return "Button form"; }
	
	
	/**
	 * Returns alias name
	 */
	getAliasName(){ return "WP_ButtonForm"; }
	
	
	/**
	 * Returns component name
	 */
	getComponentName(){ return "Runtime.WordPress.Theme.Components.Button.ButtonForm"; }
	
	
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
	isModel(){ return false; }
	
	
	/**
	 * Returns true if is widget settings
	 */
	checkWidget(widget)
	{
		if (!widget.isComponent()) return false;
		if (widget.component_class_name != this.getComponentName()) return false;
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
	 * Returns params
	 */
	getParams()
	{
		return Runtime.Vector.create([
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent"),
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
					"content": Runtime.rs.join("\n", Runtime.Vector.create([
						"<use name='Runtime.Widget.Button' component='true' />",
						"<style>",
						"%(Button)widget_button{",
						"}",
						"</style>",
						"<template>Click</template>",
					])),
				});
			},
		});
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["BayLang.Constructor.WidgetPage.WidgetSettingsInterface"]; }
};
window["Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings"] = Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings;
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
Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings = class extends Runtime.BaseObject
{
	/**
	 * Returns widget name
	 */
	getWidgetName(){ return "WordPress Form"; }
	
	
	/**
	 * Returns alias name
	 */
	getAliasName(){ return "WP_Form"; }
	
	
	/**
	 * Returns component name
	 */
	getComponentName(){ return "Runtime.WordPress.Theme.Components.Form.Form"; }
	
	
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
	isModel(){ return false; }
	
	
	/**
	 * Returns true if is widget settings
	 */
	checkWidget(widget)
	{
		if (!widget.isComponent()) return false;
		if (widget.component_class_name != this.getComponentName()) return false;
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
	 * Returns params
	 */
	getParams()
	{
		return Runtime.Vector.create([
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
				});
			},
		});
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["BayLang.Constructor.WidgetPage.WidgetSettingsInterface"]; }
};
window["Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings"] = Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings;
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
Runtime.WordPress.Theme.WidgetSettings.Gallery.GallerySettings = class extends Runtime.BaseObject
{
	/**
	 * Returns widget name
	 */
	getWidgetName(){ return "Gallery"; }
	
	
	/**
	 * Returns alias name
	 */
	getAliasName(){ return "WP_Gallery"; }
	
	
	/**
	 * Returns component name
	 */
	getComponentName(){ return "Runtime.WordPress.Theme.Components.Gallery.Gallery"; }
	
	
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
	isModel(){ return false; }
	
	
	/**
	 * Returns true if is widget settings
	 */
	checkWidget(widget)
	{
		if (!widget.isComponent()) return false;
		if (widget.component_class_name != this.getComponentName()) return false;
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
	 * Returns params
	 */
	getParams()
	{
		return Runtime.Vector.create([
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
					"content": Runtime.rs.join("\n", Runtime.Vector.create([
						"<style>",
						"%(WP_Gallery)widget_gallery{",
						"\t&__item{",
						"\t\tmargin: 35px;",
						"\t}",
						"\t&__item_title{",
						"\t}",
						"\t&__item_image{",
						"\t\timg{",
						"\t\t\tmax-width: 300px;",
						"\t\t\tmax-height: 300px",
						"\t\t}",
						"\t}",
						"}",
						"</style>",
					])),
				});
			},
		});
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.Gallery.GallerySettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["BayLang.Constructor.WidgetPage.WidgetSettingsInterface"]; }
};
window["Runtime.WordPress.Theme.WidgetSettings.Gallery.GallerySettings"] = Runtime.WordPress.Theme.WidgetSettings.Gallery.GallerySettings;
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
Runtime.WordPress.Theme.WidgetSettings.ModuleDescription = class
{
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName()
	{
		return "Runtime.WordPress.Settings";
	}
	
	
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion()
	{
		return "0.12.1";
	}
	
	
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static requiredModules()
	{
		return Runtime.Map.create({
		});
	}
	
	
	/**
	 * Returns enities
	 */
	static entities()
	{
		return Runtime.Vector.create([
			new BayLang.Constructor.WidgetPage.WidgetManagerAnnotation("Runtime.WordPress.Theme.WidgetSettings.WidgetManager"),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.ModuleDescription"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.WidgetSettings.ModuleDescription"] = Runtime.WordPress.Theme.WidgetSettings.ModuleDescription;
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
Runtime.WordPress.Theme.WidgetSettings.WidgetManager = class extends Runtime.BaseObject
{
	/**
	 * Init widgets
	 */
	init(provider)
	{
		provider.remove("Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings");
		provider.remove("Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings");
	}
	
	
	/**
	 * Returns group settings
	 */
	getGroupSettings()
	{
		return Runtime.Map.create({
		});
	}
	
	
	/**
	 * Returns list of widget settings
	 */
	getWidgetSettings()
	{
		return Runtime.Vector.create([
			new Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormModelSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Gallery.GallerySettings(),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.WidgetManager"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["BayLang.Constructor.WidgetPage.WidgetManagerInterface"]; }
};
window["Runtime.WordPress.Theme.WidgetSettings.WidgetManager"] = Runtime.WordPress.Theme.WidgetSettings.WidgetManager;
