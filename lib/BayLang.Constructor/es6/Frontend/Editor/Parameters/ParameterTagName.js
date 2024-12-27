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
BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName = function()
{
	BayLang.Constructor.Frontend.Editor.Parameters.Parameter.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype);
BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName.prototype.constructor = BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName;
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName.prototype,
{
	/**
	 * Init parameter
	 */
	init: function()
	{
		this.value = Runtime.rs.lower(this.widget.code.tag_name);
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		if (value == "")
		{
			value = "div";
		}
		/* Update tag name */
		this.widget.code.tag_name = value;
		/* Setup widget */
		this.widget.reset();
		this.widget.setup();
		/* Update tree label */
		this.widget.tree_item.updateLabel();
		/* Set new value */
		this.value = value;
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype._init.call(this);
		this.name = "tag";
		this.label = "Tag";
		this.component = "Runtime.Widget.Select";
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName, BayLang.Constructor.Frontend.Editor.Parameters.Parameter);
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName);
window["BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName"] = BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName;