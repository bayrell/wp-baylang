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
BayLang.Constructor.Frontend.Editor.Widget.WidgetTag = function(page_model, code)
{
	BayLang.Constructor.Frontend.Editor.Widget.Widget.call(this, page_model, code);
	/* Create params */
	this.param_class_name = new BayLang.Constructor.Frontend.Editor.Parameters.ParameterClassName(Runtime.Map.from({"widget":this}));
	this.param_widget_name = new BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName(Runtime.Map.from({"widget":this}));
	this.param_class_name.param_widget_name = this.param_widget_name;
	this.param_widget_name.param_class_name = this.param_class_name;
	this.param_class_name.op_attr = null;
	this.param_class_name.value = Runtime.Vector.from([]);
	this.param_widget_name.op_attr = null;
	this.param_widget_name.value = "";
};
BayLang.Constructor.Frontend.Editor.Widget.WidgetTag.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Widget.Widget.prototype);
BayLang.Constructor.Frontend.Editor.Widget.WidgetTag.prototype.constructor = BayLang.Constructor.Frontend.Editor.Widget.WidgetTag;
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetTag.prototype,
{
	/**
	 * Returns widget name
	 */
	getName: function()
	{
		return this.param_widget_name.value;
	},
	/**
	 * Returns CSS Content
	 */
	getSelectorName: function()
	{
		return "." + Runtime.rtl.toStr(this.param_widget_name.value);
	},
	/**
	 * Returns selector
	 */
	getSelector: function()
	{
		var selector_name = this.getSelectorName();
		return this.page_model.styles.getSelector(selector_name);
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
	 * Setup settings
	 */
	setupSettings: function()
	{
		if (this.settings != null)
		{
			return ;
		}
		var op_code = this.code;
		/* Find component settings */
		this.settings = this.page_model.getFrameEditor().getWidgetSettings(this);
	},
	/**
	 * Setup params
	 */
	setupParams: function()
	{
		/* Clear params */
		this.params = Runtime.Vector.from([]);
		this.params.add(this.param_widget_name);
		this.params.add(this.param_class_name);
		/* Setup params from settings */
		if (this.settings)
		{
			this.params.appendItems(this.settings.getParams().map((factory) =>
			{
				var param = factory.factory(new Runtime.rtl());
				param.widget = this;
				return param;
			}));
		}
	},
	/**
	 * Setup attrs
	 */
	setupAttrs: function()
	{
		var attrs = this.code.attrs;
		if (!attrs)
		{
			return ;
		}
		/* Setup paremeters values */
		for (var i = 0; i < attrs.count(); i++)
		{
			var op_attr = attrs.get(i);
			for (var j = 0; j < this.params.count(); j++)
			{
				var param = this.params.get(j);
				if (param instanceof BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent && param.isOpCode(op_attr))
				{
					param.setOpCode(op_attr);
				}
			}
		}
		/* Create class attribute */
		if (this.param_class_name.op_attr == null)
		{
			var op_attr = new BayLang.OpCodes.OpHtmlAttribute(Runtime.Map.from({"key":"class"}));
			this.param_class_name.op_attr = op_attr;
			this.param_widget_name.op_attr = op_attr;
		}
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Widget.Widget.prototype._init.call(this);
		this.param_class_name = null;
		this.param_widget_name = null;
		this.is_raw = false;
		this.html_content = "";
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetTag, BayLang.Constructor.Frontend.Editor.Widget.Widget);
Object.assign(BayLang.Constructor.Frontend.Editor.Widget.WidgetTag,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.WidgetTag";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.Widget";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Widget.WidgetTag);
window["BayLang.Constructor.Frontend.Editor.Widget.WidgetTag"] = BayLang.Constructor.Frontend.Editor.Widget.WidgetTag;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Widget.WidgetTag;