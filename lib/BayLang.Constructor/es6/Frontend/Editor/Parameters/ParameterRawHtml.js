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
BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml = function()
{
	BayLang.Constructor.Frontend.Editor.Parameters.Parameter.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype);
BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml.prototype.constructor = BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml;
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml.prototype,
{
	/**
	 * Init parameter
	 */
	init: function()
	{
		var text_item = this.widget.code.items.items.get(0);
		if (text_item instanceof BayLang.OpCodes.OpHtmlValue)
		{
			if (text_item.kind == "raw")
			{
				this.value = "1";
			}
		}
	},
	/**
	 * Returns HTML content
	 */
	getHtmlContent: function()
	{
		var text_item = this.widget.code.items.items.get(0);
		if (text_item instanceof BayLang.OpCodes.OpHtmlContent)
		{
			return text_item.value;
		}
		else if (text_item instanceof BayLang.OpCodes.OpHtmlValue)
		{
			if (text_item.value instanceof BayLang.OpCodes.OpString)
			{
				return text_item.value.value;
			}
		}
		return "";
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		this.value = value;
		/* Update key debug attr */
		var attr_item = this.widget.code.attrs.findItem(Runtime.lib.equalAttr("key", "@key_debug"));
		if (attr_item)
		{
			if (this.value == "1")
			{
				if (Runtime.rs.indexOf(attr_item.value.value, "_raw") == -1)
				{
					attr_item.value.value = Runtime.rtl.attr(attr_item.value.value, ["value", "value"]) + Runtime.rtl.toStr("_raw");
				}
			}
			else
			{
				if (Runtime.rs.indexOf(attr_item.value.value, "_raw") != -1)
				{
					attr_item.value.value = Runtime.rs.replace("_raw", "", attr_item.value.value);
				}
			}
		}
		/* Set content */
		var code = null;
		if (this.value == "1")
		{
			code = new BayLang.OpCodes.OpHtmlValue(Runtime.Map.from({"kind":"raw","value":new BayLang.OpCodes.OpString(Runtime.Map.from({"value":this.getHtmlContent()}))}));
		}
		else
		{
			code = new BayLang.OpCodes.OpHtmlContent(Runtime.Map.from({"value":this.getHtmlContent()}));
		}
		/* Add content */
		this.widget.code.items.items = Runtime.Vector.from([]);
		this.widget.code.items.items.push(code);
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype._init.call(this);
		this.name = "is_raw_html";
		this.label = "Is Raw HTML";
		this.component = "Runtime.Widget.Select";
		this.value = "0";
		this.props = Runtime.Map.from({"show_select_value":false,"options":Runtime.Vector.from([Runtime.Map.from({"key":"0","value":"No"}),Runtime.Map.from({"key":"1","value":"Yes"})])});
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml, BayLang.Constructor.Frontend.Editor.Parameters.Parameter);
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml);
window["BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml"] = BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml;