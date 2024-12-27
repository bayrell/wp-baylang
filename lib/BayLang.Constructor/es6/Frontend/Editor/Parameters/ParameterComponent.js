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
BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent = function()
{
	BayLang.Constructor.Frontend.Editor.Parameters.Parameter.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype);
BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent.prototype.constructor = BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent;
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent.prototype,
{
	/**
	 * Is op_code
	 */
	isOpCode: function(op_code)
	{
		return op_code instanceof BayLang.OpCodes.OpHtmlAttribute && this.name == op_code.key;
	},
	/**
	 * Set op_code
	 */
	setOpCode: function(op_code)
	{
		this.op_code = op_code;
		this.value = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.getValueFromOpCode(op_code.value);
	},
	/**
	 * Find code
	 */
	findOpCode: function()
	{
		if (this.op_code != null)
		{
			return ;
		}
		/* Find code */
		this.op_code = this.widget.code.attrs.findItem(Runtime.lib.equalAttr("key", this.name));
	},
	/**
	 * Create attribute
	 */
	createHtmlAttribute: function()
	{
		if (this.op_code != null)
		{
			return ;
		}
		this.op_code = new BayLang.OpCodes.OpHtmlAttribute(Runtime.Map.from({"key":this.name}));
		this.widget.code.attrs.prepend(this.op_code);
	},
	/**
	 * Remove attribute
	 */
	removeHtmlAttribute: function()
	{
		if (this.op_code == null)
		{
			return ;
		}
		/* Clear code */
		this.op_code = null;
		/* Remove attribute */
		var pos = this.widget.code.attrs.find(Runtime.lib.equalAttr("key", this.name));
		if (pos >= 0)
		{
			this.widget.code.attrs.remove(pos);
		}
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		if (value === "")
		{
			this.removeHtmlAttribute();
			this.value = "";
			return ;
		}
		/* Find item */
		this.findOpCode();
		/* Create html attribute */
		if (this.op_code == null)
		{
			this.createHtmlAttribute();
		}
		/* Set value */
		this.value = value;
		this.op_code.value = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.getOpCodeByValue(value);
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype._init.call(this);
		this.op_code = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent, BayLang.Constructor.Frontend.Editor.Parameters.Parameter);
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.Parameter";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent);
window["BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent"] = BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent;