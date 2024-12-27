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
BayLang.Constructor.Frontend.Editor.Parameters.Parameter = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype.constructor = BayLang.Constructor.Frontend.Editor.Parameters.Parameter;
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype,
{
	/**
	 * Init parameter
	 */
	init: function()
	{
		if (this.default == null)
		{
			return ;
		}
		if (this.value != null)
		{
			return ;
		}
		this.setValue(this.default);
	},
	/**
	 * Is op_code
	 */
	isOpCode: function(op_code)
	{
		return false;
	},
	/**
	 * Set op_code
	 */
	setOpCode: function(op_code)
	{
		this.op_code = op_code;
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		this.value = value;
	},
	/**
	 * Change param
	 */
	changeValue: function(value)
	{
		this.setValue(value);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.name = "";
		this.label = "";
		this.component = "";
		this.tab = "params";
		this.display = true;
		this.value = null;
		this.default = null;
		this.props = null;
		this.op_code = null;
		this.widget = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.Parameter, Runtime.BaseObject);
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.Parameter,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.Parameter";
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
});
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Parameters.Parameter);
window["BayLang.Constructor.Frontend.Editor.Parameters.Parameter"] = BayLang.Constructor.Frontend.Editor.Parameters.Parameter;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Parameters.Parameter;