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
BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel = function()
{
	BayLang.Constructor.Frontend.Editor.Parameters.Parameter.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype);
BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel.prototype.constructor = BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel;
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel.prototype,
{
	/**
	 * Is op_code
	 */
	isOpCode: function(op_attr)
	{
		return op_attr instanceof BayLang.OpCodes.OpDictPair && this.name == op_attr.key;
	},
	/**
	 * Set op_code
	 */
	setOpCode: function(op_dict_pair)
	{
		this.op_code = op_dict_pair;
		this.value = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.getValueFromOpCode(op_dict_pair.value);
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
		var op_dict = this.getModelCodes();
		this.op_code = op_dict.values.findItem(this.isOpCode.bind(this));
	},
	/**
	 * Returns model codes
	 */
	getModelCodes: function()
	{
		/* Get values */
		var op_dict = this.widget.primary_model_code.expression.args.get(1);
		if (!op_dict)
		{
			return ;
		}
		if (!(op_dict instanceof BayLang.OpCodes.OpDict))
		{
			return ;
		}
		return op_dict;
	},
	/**
	 * Create attribute
	 */
	createModelAttribute: function()
	{
		if (this.op_code != null)
		{
			return ;
		}
		this.op_code = new BayLang.OpCodes.OpDictPair(Runtime.Map.from({"key":this.getAttributeName()}));
		var op_dict = this.getModelCodes();
		op_dict.values.append(this.op_code);
	},
	/**
	 * Remove attribute
	 */
	removeModelAttribute: function()
	{
		if (this.op_code == null)
		{
			return ;
		}
		/* Clear code */
		this.op_code = null;
		/* Remove attribute */
		var op_dict = this.getModelCodes();
		var pos = op_dict.values.find(Runtime.lib.equalAttr("key", this.getAttributeName()));
		if (pos >= 0)
		{
			op_dict.values.remove(pos);
		}
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		if (value === "")
		{
			this.removeModelAttribute();
			this.value = "";
			return ;
		}
		/* Find item */
		this.findOpCode();
		/* Create html attribute */
		if (this.op_code == null)
		{
			this.createModelAttribute();
		}
		/* Set value */
		this.value = value;
		this.op_code.value = BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor.getOpCodeByValue(value);
	},
	/**
	 * Change model value
	 */
	changeValue: function(value)
	{
		BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype.changeValue.call(this, value);
		/* Update model value */
		this.changeModelValue();
	},
	/**
	 * Change model value
	 */
	changeModelValue: function()
	{
		/* Get widget model */
		var model = this.widget.getModel();
		if (!model)
		{
			return ;
		}
		/* Model settings onChange event */
		if (Runtime.rtl.exists(this.widget.model_settings.onChange))
		{
			var is_updated = this.widget.model_settings.onChange(new Runtime.rtl(), model, this);
			if (is_updated)
			{
				return ;
			}
		}
		/* Update model value */
		this.updateModelValue(model);
	},
	/**
	 * Update model value
	 */
	updateModelValue: function(model)
	{
		/* Get key value */
		var key = this.name;
		var value = this.value;
		/* Set params */
		var params = Runtime.Map.from({});
		params.set(key, value);
		model.initParams(params);
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Parameters.Parameter.prototype._init.call(this);
		this.op_code = null;
		this.onChange = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel, BayLang.Constructor.Frontend.Editor.Parameters.Parameter);
Object.assign(BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel);
window["BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel"] = BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel;