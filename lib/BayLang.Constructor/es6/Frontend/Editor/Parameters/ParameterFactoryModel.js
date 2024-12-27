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
BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel = function()
{
	BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel.prototype);
BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel.prototype.constructor = BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel;
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel.prototype,
{
	/**
	 * Find OpDictPair by path
	 */
	getCode: function()
	{
		var op_code = this.op_code.value;
		if (!(op_code instanceof BayLang.OpCodes.OpNew))
		{
			return ;
		}
		if (op_code.args.count() != 2)
		{
			return ;
		}
		var op_code_params = op_code.args.get(1);
		if (!(op_code_params instanceof BayLang.OpCodes.OpDict))
		{
			return ;
		}
		var op_code_api_name = op_code_params.values.findItem(Runtime.lib.equalAttr("api_name"));
		if (!op_code_api_name)
		{
			return ;
		}
		return op_code_api_name;
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
	/**
	 * Update model value
	 */
	updateModelValue: function(model)
	{
		var name = this.name;
		var path = this.path;
		var value = this.value;
		model[name][path] = value;
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel.prototype._init.call(this);
		this.path = "";
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel, BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel);
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel);
window["BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel"] = BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel;