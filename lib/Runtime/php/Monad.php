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
class Monad
{
	public $val;
	public $err;
	function __construct($value, $err=null)
	{
		$this->val = $value;
		$this->err = $err;
	}
	/**
	 * Return attr of object
	 */
	function attr($attr_name)
	{
		if ($this->val === null || $this->err != null)
		{
			return $this;
		}
		return new \Runtime\Monad(\Runtime\rtl::attr($this->val, $attr_name, null));
	}
	/**
	 * Call function on value
	 */
	function call($f, $is_return_value=true)
	{
		if ($this->val === null || $this->err != null)
		{
			return $this;
		}
		try
		{
			
			$value = \Runtime\rtl::apply($f, \Runtime\Vector::from([$this->val]));
			if ($is_return_value)
			{
				$this->val = $value;
			}
		}
		catch (\Exception $_ex)
		{
			if (true)
			{
				$e = $_ex;
				$this->res = null;
				$this->err = $e;
			}
			else
			{
				throw $_ex;
			}
		}
		return $this;
	}
	/**
	 * Call async function on value
	 */
	function callAsync($f, $is_return_value=true)
	{
		if ($this->val === null || $this->err != null)
		{
			return $this;
		}
		try
		{
			
			$value = \Runtime\rtl::apply($f, \Runtime\Vector::from([$this->val]));
			if (\Runtime\rtl::isPromise($value))
			{
				\Runtime\rtl::resolvePromise($value);
			}
			if ($is_return_value)
			{
				$this->val = $value;
			}
		}
		catch (\Exception $_ex)
		{
			if (true)
			{
				$e = $_ex;
				$this->val = null;
				$this->err = $e;
			}
			else
			{
				throw $_ex;
			}
		}
		return $this;
	}
	/**
	 * Call function on value
	 */
	function map($f, $is_return=true)
	{
		return $this->call($f, $is_return);
	}
	/**
	 * Call function on value
	 */
	function mapAsync($f, $is_return=true)
	{
		return $this->callAsync($f, $is_return);
	}
	/**
	 * Call method on value
	 */
	function callMethod($method_name, $args=null)
	{
		if ($this->val === null || $this->err != null)
		{
			return $this;
		}
		try
		{
			
			$f = new \Runtime\Callback($this->val, $method_name);
			$this->val = \Runtime\rtl::apply($f, $args);
		}
		catch (\Exception $_ex)
		{
			if (true)
			{
				$e = $_ex;
				$this->val = null;
				$this->err = $e;
			}
			else
			{
				throw $_ex;
			}
		}
		return $this;
	}
	/**
	 * Call async method on value
	 */
	function callMethodAsync($method_name, $args=null)
	{
		if ($this->val === null || $this->err != null)
		{
			return $this;
		}
		try
		{
			
			$f = new \Runtime\Callback($this->val, $method_name);
			$this->val = \Runtime\rtl::apply($f, $args);
		}
		catch (\Exception $_ex)
		{
			if (true)
			{
				$e = $_ex;
				$this->val = null;
				$this->err = $e;
			}
			else
			{
				throw $_ex;
			}
		}
		return $this;
	}
	/**
	 * Call function on monad
	 */
	function monad($f)
	{
		return \Runtime\rtl::apply($f, \Runtime\Vector::from([$this]));
	}
	/**
	 * Returns value
	 */
	function value()
	{
		if ($this->err != null)
		{
			throw $this->err;
		}
		if ($this->val === null || $this->err != null)
		{
			return null;
		}
		return $this->val;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		$this->val = null;
		$this->err = null;
	}
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Monad";
	}
	static function getParentClassName()
	{
		return "";
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