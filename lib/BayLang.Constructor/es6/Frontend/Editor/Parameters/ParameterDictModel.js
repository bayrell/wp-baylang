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
BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel = function()
{
	BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel.prototype);
BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel.prototype.constructor = BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel;
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel.prototype,
{
	/**
	 * Is op_code
	 */
	isOpCode: function(op_attr)
	{
		if (!this.path)
		{
			return false;
		}
		if (this.path.count() == 0)
		{
			return false;
		}
		return op_attr instanceof BayLang.OpCodes.OpDictPair && this.path.first() == op_attr.key;
	},
	/**
	 * Get OpDictPair from OpDict by name
	 */
	findCodeByName: function(code, name)
	{
		if (!(code instanceof BayLang.OpCodes.OpDict))
		{
			return false;
		}
		for (var i = 0; i < code.values.count(); i++)
		{
			var pair = code.values.get(i);
			if (pair.key == name)
			{
				return pair;
			}
		}
		return null;
	},
	/**
	 * Find OpDictPair by path
	 */
	getCode: function()
	{
		var code = this.op_code;
		var path = this.path.slice(1);
		while (path.count() > 0 && code != null)
		{
			var name = path.first();
			code = this.findCodeByName(code.value, name);
			path = path.slice(1);
		}
		return code;
	},
	/**
	 * Set op_code
	 */
	setOpCode: function(op_dict_pair)
	{
		this.op_code = op_dict_pair;
		var code = this.getCode();
		if (code)
		{
			this.value = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.getValueFromOpCode(code.value);
		}
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		this.value = value;
		var code = this.getCode();
		if (code)
		{
			code.value = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.getOpCodeByValue(value);
		}
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel.prototype._init.call(this);
		this.path = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel, BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel);
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel);
window["BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel"] = BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel;