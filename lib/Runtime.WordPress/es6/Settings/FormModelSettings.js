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
if (typeof Runtime.WordPress.Settings == 'undefined') Runtime.WordPress.Settings = {};
Runtime.WordPress.Settings.FormModelSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.WordPress.Settings.FormModelSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.WordPress.Settings.FormModelSettings.prototype.constructor = Runtime.WordPress.Settings.FormModelSettings;
Object.assign(Runtime.WordPress.Settings.FormModelSettings.prototype,
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
		return "Runtime.WordPress.Components.FormModel";
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
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"form_name","label":"Form name","component":"Runtime.Widget.Select","default":"","props":Runtime.Map.from({"options":Runtime.Vector.from([])})}))]);
	},
	/**
	 * On change
	 */
	onChange: function(model, param)
	{
		/* Change form name */
		if (param.name == "form_name")
		{
			model.form_name = param.value;
			model.loadForm();
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
		var data = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, Runtime.Map.from({"api_name":"admin.wordpress.forms.settings::search","method_name":"actionSearch","data":Runtime.Map.from({"limit":"1000"})}));
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
			var options = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, this.options);
			var form_name_param = widget.params.findItem((param) =>
			{
				return param.name == "form_name";
			});
			if (form_name_param)
			{
				form_name_param.props.set("options", options);
			}
		}
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
Object.assign(Runtime.WordPress.Settings.FormModelSettings, Runtime.BaseObject);
Object.assign(Runtime.WordPress.Settings.FormModelSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Settings.FormModelSettings";
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
Runtime.rtl.defClass(Runtime.WordPress.Settings.FormModelSettings);
window["Runtime.WordPress.Settings.FormModelSettings"] = Runtime.WordPress.Settings.FormModelSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Settings.FormModelSettings;