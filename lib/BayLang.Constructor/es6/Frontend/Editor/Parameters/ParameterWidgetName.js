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
if (typeof BayLang.Constructor.Frontend.Editor.Parameters == 'undefined') BayLang.Constructor.Frontend.Editor.Parameters = {};
BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName = function()
{
	BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent.prototype);
BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName.prototype.constructor = BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName;
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName.prototype,
{
	/**
	 * Is op_code
	 */
	isOpCode: function(op_attr)
	{
		return op_attr.key == "class";
	},
	/**
	 * Set op_code
	 */
	setOpCode: function(op_attr)
	{
		var class_name = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.getValueFromOpCode(op_attr.value);
		var value = Runtime.rs.split(" ", class_name);
		value = value.filter((s) =>
		{
			return s != "";
		});
		this.value = value.get(0);
		this.op_attr = op_attr;
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		/* Create html attribute */
		if (this.op_attr == null)
		{
			this.createHtmlAttribute();
		}
		/* Set value */
		var arr = this.param_class_name.value.insertIm(0, value);
		this.value = arr.get(0);
		this.op_attr.value = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.getOpCodeByValue(Runtime.rs.join(" ", arr));
	},
	/**
	 * Change param
	 */
	changeValue: function(value)
	{
		BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent.prototype.changeValue.call(this, value);
		/* Update label */
		this.widget.tree_item.updateLabel();
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent.prototype._init.call(this);
		this.display = false;
		this.name = "widget_name";
		this.value = "";
		this.param_class_name = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName, BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent);
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName);
window["BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName"] = BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Parameters.ParameterWidgetName;