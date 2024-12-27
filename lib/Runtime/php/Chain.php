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
namespace Runtime;
class Chain extends \Runtime\Callback
{
	public $chain;
	public $is_async;
	public $is_return_value;
	function __construct()
	{
		parent::__construct(null, null);
	}
	/**
	 * Check if method exists
	 */
	function exists()
	{
		return true;
	}
	/**
	 * Check callback
	 */
	function check()
	{
	}
	/**
	 * Returns true if async
	 */
	function isAsync()
	{
		return $this->is_async;
	}
	/**
	 * Returns true if chain functions must returns value
	 */
	function isReturnValue()
	{
		return $this->is_return_value;
	}
	/**
	 * Setting the behavior, the chain functions should return a value or not
	 */
	function setReturnValue($value)
	{
		$this->is_return_value = $value;
	}
	/**
	 * Returns true if async
	 */
	function getChain()
	{
		return $this->chain->slice();
	}
	/**
	 * Add function to chain
	 */
	function add($f, $priority=100)
	{
		$this->chain->push(\Runtime\Map::from(["async"=>false,"callback"=>$f,"priority"=>$priority]));
		return $this;
	}
	/**
	 * Add async function to chain
	 */
	function addAsync($f, $priority=100)
	{
		$this->is_async = true;
		$this->chain->push(\Runtime\Map::from(["async"=>true,"callback"=>$f,"priority"=>$priority]));
		return $this;
	}
	/**
	 * Sort chain
	 */
	function sort()
	{
		$this->chain = $this->chain->sort(\Runtime\lib::sortAttr("priority", "asc"));
	}
	/**
	 * Apply chain
	 */
	function apply($value=null)
	{
		$monada = new \Runtime\Monad($value);
		if (!$this->is_async)
		{
			$this->applyChain($monada);
			return $monada->value();
		}
		else
		{
			$f = function ($monada)
			{
				$this->applyChainAsync($monada);
				return $monada->value();
			};
			return $f($monada);
		}
	}
	/**
	 * Apply async chain
	 */
	function applyAsync($value)
	{
		$monada = new \Runtime\Monad($value);
		$this->applyChainAsync($monada);
		return $monada->value();
	}
	/**
	 * Apply chain
	 */
	function applyChain($monada)
	{
		for ($i = 0; $i < $this->chain->count(); $i++)
		{
			$item = $this->chain->get($i);
			$f = $item->get("callback");
			$monada->map($f, $this->is_return_value);
		}
		return $monada;
	}
	/**
	 * Apply async chain
	 */
	function applyChainAsync($monada)
	{
		for ($i = 0; $i < $this->chain->count(); $i++)
		{
			$item = $this->chain->get($i);
			$f = $item->get("callback");
			$monada->mapAsync($f, $this->is_return_value);
		}
		return $monada;
	}
	function __invoke()
	{
		return $this->apply(func_get_args());
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->chain = \Runtime\Vector::from([]);
		$this->is_async = false;
		$this->is_return_value = true;
	}
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Chain";
	}
	static function getParentClassName()
	{
		return "Runtime.Callback";
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