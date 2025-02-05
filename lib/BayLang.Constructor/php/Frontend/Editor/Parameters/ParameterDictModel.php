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
class ParameterDictModel extends \BayLang\Constructor\Frontend\Editor\Parameters\ParameterModel
{
	public $path;
	/**
	 * Returns attribute name
	 */
	function getAttributeName()
	{
		return $this->path->first();
	}
	/**
	 * Is op_code
	 */
	function isOpCode($op_attr)
	{
		if (!$this->path)
		{
			return false;
		}
		if ($this->path->count() == 0)
		{
			return false;
		}
		return $op_attr instanceof \BayLang\OpCodes\OpDictPair && $this->getAttributeName() == $op_attr->key;
	}
	/**
	 * Set op_code
	 */
	function setOpCode($op_dict_pair)
	{
		$this->op_code = $op_dict_pair;
		$code = $this->getCode();
		if ($code)
		{
			$this->value = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getValueFromOpCode($code->value);
		}
	}
	/**
	 * Get OpDictPair from OpDict by name
	 */
	function findCodeByName($code, $name)
	{
		if (!($code instanceof \BayLang\OpCodes\OpDict))
		{
			return null;
		}
		for ($i = 0; $i < $code->values->count(); $i++)
		{
			$pair = $code->values->get($i);
			if ($pair->key == $name)
			{
				return $pair;
			}
		}
		return null;
	}
	/**
	 * Create code
	 */
	function createCode()
	{
		$code = $this->op_code;
		$path = $this->path->slice(1);
		while ($path->count() > 0 && $code != null)
		{
			$name = $path->first();
			$find_code = $this->findCodeByName($code->value, $name);
			if (!$find_code)
			{
				$find_code = new \BayLang\OpCodes\OpDictPair(\Runtime\Map::from(["key"=>$name]));
				if ($code->value == null)
				{
					$code->value = new \BayLang\OpCodes\OpDict(\Runtime\Map::from(["values"=>\Runtime\Vector::from([])]));
				}
				$code->value->values->append($find_code);
			}
			$code = $find_code;
			$path = $path->slice(1);
		}
		return $code;
	}
	/**
	 * Find OpDictPair by path
	 */
	function getCode()
	{
		$code = $this->op_code;
		$path = $this->path->slice(1);
		while ($path->count() > 0 && $code != null)
		{
			$name = $path->first();
			$code = $this->findCodeByName($code->value, $name);
			$path = $path->slice(1);
		}
		return $code;
	}
	/**
	 * Remove attribute
	 */
	function removeModelAttribute()
	{
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		if ($value === "")
		{
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
		/* Find or create code */
		$code = $this->getCode();
		if (!$code)
		{
			$code = $this->createCode();
		}
		/* Set value */
		$this->value = $value;
		$code->value = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getOpCodeByValue($value);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->path = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel";
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