<?php
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
namespace BayLang\Constructor\Frontend\Editor\Parameters;
class ParameterModel extends \BayLang\Constructor\Frontend\Editor\Parameters\Parameter
{
	public $op_code;
	public $onChange;
	/**
	 * Is op_code
	 */
	function isOpCode($op_attr)
	{
		return $op_attr instanceof \BayLang\OpCodes\OpDictPair && $this->name == $op_attr->key;
	}
	/**
	 * Set op_code
	 */
	function setOpCode($op_dict_pair)
	{
		$this->op_code = $op_dict_pair;
		$this->value = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getValueFromOpCode($op_dict_pair->value);
	}
	/**
	 * Find code
	 */
	function findOpCode()
	{
		if ($this->op_code != null)
		{
			return ;
		}
		/* Find code */
		$op_dict = $this->getModelCodes();
		$this->op_code = $op_dict->values->findItem(new \Runtime\Callback($this, "isOpCode"));
	}
	/**
	 * Returns model codes
	 */
	function getModelCodes()
	{
		/* Get values */
		$op_dict = $this->widget->primary_model_code->expression->args->get(1);
		if (!$op_dict)
		{
			return ;
		}
		if (!($op_dict instanceof \BayLang\OpCodes\OpDict))
		{
			return ;
		}
		return $op_dict;
	}
	/**
	 * Create attribute
	 */
	function createModelAttribute()
	{
		if ($this->op_code != null)
		{
			return ;
		}
		$this->op_code = new \BayLang\OpCodes\OpDictPair(\Runtime\Map::from(["key"=>$this->getAttributeName()]));
		$op_dict = $this->getModelCodes();
		$op_dict->values->append($this->op_code);
	}
	/**
	 * Remove attribute
	 */
	function removeModelAttribute()
	{
		if ($this->op_code == null)
		{
			return ;
		}
		/* Clear code */
		$this->op_code = null;
		/* Remove attribute */
		$op_dict = $this->getModelCodes();
		$pos = $op_dict->values->find(\Runtime\lib::equalAttr("key", $this->getAttributeName()));
		if ($pos >= 0)
		{
			$op_dict->values->remove($pos);
		}
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		if ($value === "")
		{
			$this->removeModelAttribute();
			$this->value = "";
			return ;
		}
		/* Find item */
		$this->findOpCode();
		/* Create html attribute */
		if ($this->op_code == null)
		{
			$this->createModelAttribute();
		}
		/* Set value */
		$this->value = $value;
		$this->op_code->value = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getOpCodeByValue($value);
	}
	/**
	 * Change model value
	 */
	function changeValue($value)
	{
		parent::changeValue($value);
		/* Update model value */
		$this->changeModelValue();
	}
	/**
	 * Change model value
	 */
	function changeModelValue()
	{
		/* Get widget model */
		$model = $this->widget->getModel();
		if (!$model)
		{
			return ;
		}
		/* Model settings onChange event */
		if (\Runtime\rtl::exists($this->widget->model_settings->onChange))
		{
			$is_updated = $this->widget->model_settings->onChange(new \Runtime\rtl(), $model, $this);
			if ($is_updated)
			{
				return ;
			}
		}
		/* Update model value */
		$this->updateModelValue($model);
	}
	/**
	 * Update model value
	 */
	function updateModelValue($model)
	{
		/* Get key value */
		$key = $this->name;
		$value = $this->value;
		/* Set params */
		$params = \Runtime\Map::from([]);
		$params->set($key, $value);
		$model->initParams($params);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->op_code = null;
		$this->onChange = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.Parameter";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}