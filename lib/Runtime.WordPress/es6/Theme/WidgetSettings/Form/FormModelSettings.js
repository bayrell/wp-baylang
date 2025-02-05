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
Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings.prototype.constructor = Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings;
Object.assign(Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "WP_FormModel";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "Runtime.WordPress.Theme.Components.Form.FormModel";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "form";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "widget";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return true;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.model_class_name != this.getModelName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * On change
	 */
	onChange: function(runtime, model, param)
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
			var button = model.bottom_buttons.getWidget("submit");
			button.content = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, param.value);
			return true;
		}
		/* Form button styles */
		if (param.name == "form_button_styles")
		{
			var button = model.bottom_buttons.getWidget("submit");
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
	},
	/**
	 * Load form name options
	 */
	loadOptions: async function(runtime, widget)
	{
		if (this.options)
		{
			return Promise.resolve();
		}
		var data = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, Runtime.Map.from({"api_name":"admin.wordpress.forms.settings.search","method_name":"actionSearch","data":Runtime.Map.from({"limit":"1000"})}));
		var result = await widget.page_model.layout.callApi(data);
		if (result.isSuccess())
		{
			var result_data = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, result.data);
			this.options = result_data.get("items").map((item) =>
			{
				return Runtime.Map.from({"key":item.get("api_name"),"value":item.get("name")});
			});
		}
		else
		{
			this.options = Runtime.Vector.from([]);
		}
	},
	/**
	 * Setup widget
	 */
	setup: async function(runtime, widget)
	{
		/* Load options */
		await this.loadOptions(runtime, widget);
		/* Add options to widget */
		if (this.options)
		{
			var form_name_param = widget.params.findItem((param) =>
			{
				return param.name == "form_name";
			});
			if (form_name_param)
			{
				var options = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, this.options);
				form_name_param.props.set("options", options);
			}
		}
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"form_name","label":"Form name","component":"Runtime.Widget.Select","default":"","props":Runtime.Map.from({"options":Runtime.Vector.from([])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"styles","label":"Form styles","component":"Runtime.Widget.Tag","default":Runtime.Vector.from([])})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"form_title","label":"Email title","component":"Runtime.Widget.Input","default":""})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"form_content","label":"Form content","component":"Runtime.Widget.TextEditable"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"metrika_form_id","label":"Form id","component":"Runtime.Widget.Input"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"metrika_event","label":"Metrika event","component":"Runtime.Widget.Input","default":""})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"redirect_url","label":"Redirect URL","component":"Runtime.Widget.Input"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.from({"name":"form_show_label","path":Runtime.Vector.from(["field_settings","show_label"]),"label":"Form show label","component":"Runtime.Widget.Select","default":"true","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":"false","value":"False"}),Runtime.Map.from({"key":"true","value":"True"})])})}))]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"modules":Runtime.Vector.from(["Runtime.Entity.Factory"]),"model":Runtime.rs.join("\n", Runtime.Vector.from(["this.form = this.addWidget(classof WP_FormModel, {","\t'widget_name': 'form',","\t'form_name': 'default',","\t'submit_button':","\t{","\t\t'text': 'Отправить заявку',","\t},","});"]))});
		}});
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.options = null;
	},
});
Object.assign(Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings, Runtime.BaseObject);
Object.assign(Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.WidgetSettings.Form";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings);
window["Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings"] = Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings;