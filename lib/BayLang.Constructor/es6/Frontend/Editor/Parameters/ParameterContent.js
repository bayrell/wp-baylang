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
BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent = function()
{
	BayLang.Constructor.Frontend.Editor.Parameters.Parameter.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype);
BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent.prototype.constructor = BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent;
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent.prototype,
{
	/**
	 * Init parameter
	 */
	init: function()
	{
		var text_item = this.widget.code.items.items.get(0);
		if (text_item instanceof BayLang.OpCodes.OpHtmlContent)
		{
			this.value = text_item.value;
		}
		else if (text_item instanceof BayLang.OpCodes.OpHtmlValue)
		{
			if (text_item.value instanceof BayLang.OpCodes.OpString)
			{
				this.value = text_item.value.value;
			}
		}
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		/* Get code */
		var text_item = this.widget.code.items.items.get(0);
		/* Set value */
		this.value = value;
		/* Set content */
		if (text_item instanceof BayLang.OpCodes.OpHtmlContent)
		{
			text_item.value = this.value;
		}
		else if (text_item instanceof BayLang.OpCodes.OpHtmlValue)
		{
			if (text_item.value instanceof BayLang.OpCodes.OpString)
			{
				text_item.value.value = this.value;
			}
		}
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype._init.call(this);
		this.name = "html_content";
		this.label = "Content";
		this.component = "Runtime.Widget.TextEditable";
		this.value = "";
		this.props = Runtime.Map.from({"direct_update":true});
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent, BayLang.Constructor.Frontend.Editor.Parameters.Parameter);
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent);
window["BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent"] = BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent;