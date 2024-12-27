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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Form Model";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "FormSubmitModel";
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
		return "Runtime.Widget.Form.FormSubmitModel";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "";
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
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel", Runtime.Map.from({"name":"storage","path":"api_name","label":"API name","component":"Runtime.Widget.Input"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.from({"name":"submit_button_text","path":Runtime.Vector.from(["submit_button","text"]),"label":"Button text","component":"Runtime.Widget.Input"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"fields","label":"Fields","component":"BayLang.Constructor.Frontend.Components.SortableParams","default":Runtime.Vector.from([Runtime.Map.from({"name":"name","label":"Username","component":"Runtime.Widget.Input"})]),"props":Runtime.Map.from({"fields":Runtime.Vector.from([Runtime.Map.from({"name":"name","label":"Field name","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"label","label":"Label","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"component","label":"Component","component":"Runtime.Widget.Input","default":"Runtime.Widget.Input"})])})}))]);
	},
	/**
	 * On change
	 */
	onChange: function(iframeWindow, widget, param)
	{
		if (param.name == "submit_button_text")
		{
			var value = param.value;
			var submit_button = widget.bottom_buttons.getWidget("submit");
			submit_button.content = value;
			return true;
		}
		return false;
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"modules":Runtime.Vector.from(["Runtime.Entity.Factory"]),"model":Runtime.rs.join("\n", Runtime.Vector.from(["this.form = this.addWidget('Runtime.Widget.Form.FormSubmitModel', {","\t'widget_name': 'form',","\t'storage': new Factory(","\t\t'Runtime.Widget.Form.FormSubmitStorage',","\t\t{","\t\t\t'api_name': 'test'","\t\t}","\t),","\t'submit_button':","\t{","\t\t'text': 'Отправить заявку',","\t},","\t'fields': [","\t\t{","\t\t\t'name': 'name',","\t\t\t'label': 'Name',","\t\t\t'component': 'Runtime.Widget.Input',","\t\t},","\t\t{","\t\t\t'name': 'email',","\t\t\t'label': 'E-mail',","\t\t\t'component': 'Runtime.Widget.Input',","\t\t},","\t],","});"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings);
window["Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings"] = Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings;