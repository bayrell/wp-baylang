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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Editor == 'undefined') BayLang.Constructor.Frontend.Editor = {};
if (typeof BayLang.Constructor.Frontend.Editor.Widget == 'undefined') BayLang.Constructor.Frontend.Editor.Widget = {};
BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent = function(page_model, code)
{
	BayLang.Constructor.Frontend.Editor.Widget.WidgetTag.call(this, page_model, code);
	/* Setup component class name */
	this.component_class_name = this.page_model.component_processor.getModuleClassName(code.tag_name);
};
BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Widget.WidgetTag.prototype);
BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent.prototype.constructor = BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent;
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent.prototype,
{
	/**
	 * Returns true if component
	 */
	isComponent: function()
	{
		return true;
	},
	/**
	 * Returns true if component has model
	 */
	isModel: function()
	{
		return this.is_model;
	},
	/**
	 * Return widget model
	 */
	getModel: function()
	{
		var iframe_page_model = this.page_model.getFramePageModel();
		var widget_name = this.getName();
		return iframe_page_model.widget_model.getWidget(widget_name);
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget_settings)
	{
		if (!this.settings)
		{
			return false;
		}
		return this.settings.canInsert(widget_settings);
	},
	/**
	 * Init params
	 */
	initParams: function()
	{
		BayLang.Constructor.Frontend.Editor.Widget.WidgetTag.prototype.initParams.call(this);
		/* Setup widget */
		this.page_model.model_processor.setupWidget(this);
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Widget.WidgetTag.prototype._init.call(this);
		this.is_model = false;
		this.model_class_name = null;
		this.component_class_name = null;
		this.primary_model_code = null;
		this.model_codes = null;
		this.model_settings = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent, BayLang.Constructor.Frontend.Editor.Widget.WidgetTag);
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.WidgetTag";
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
});
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent);
window["BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent"] = BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent;