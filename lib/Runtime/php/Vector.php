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
class Vector extends \Runtime\Collection
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static function Instance()
	{
		return new \Runtime\Vector();
	}
	/**
	 * Returns new Vector
	 * @param int offset
	 * @param int lenght
	 * @return Vector<T>
	 */
	function removeRange($offset, $length=null)
	{
		array_splice($this->_arr, $offset, $length);
		return $this;
	}
	/**
	 * Remove item
	 */
	function remove($pos)
	{
		if ($pos == -1)
		{
			return $this;
		}
		array_splice($this->_arr, $pos, 1);
		return $this;
	}
	function removeItem($item)
	{
		return $this->remove($this->indexOf($item));
	}
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	function append($value)
	{
		$this->_arr[] = $value;
		return $this;
	}
	function push($value)
	{
		return $this->append($value);
	}
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	function prepend($value)
	{
		array_unshift($this->_arr, $value);
		return $this;
	}
	/**
	 * Extract last value from array
	 * @return T value
	 */
	function pop()
	{
		return array_pop($this->_arr);
	}
	/**
	 * Extract first value from array
	 * @return T value
	 */
	function shift()
	{
		array_shift($this->_arr);
		return $this;
	}
	/**
	 * Insert value to position
	 * @param int pos - position
	 * @param T value
	 */
	function insert($pos, $value)
	{
		array_splice($this->_arr, $pos, 0, [$value]);
		return $this;
	}
	/**
	 * Add value to position
	 * @param int pos - position
	 * @param T value
	 * @param string kind - after or before
	 */
	function add($value, $pos=-1, $kind="after")
	{
		if ($pos == -1)
		{
			if ($kind == "before")
			{
				$this->prepend($value);
				return 0;
			}
			else
			{
				$this->append($value);
				return $this->count() - 1;
			}
		}
		if ($kind == "after")
		{
			$pos = $pos + 1;
		}
		$this->insert($pos, $value, $kind);
		return $pos;
	}
	/**
	 * Add value to position
	 * @param int pos - position
	 * @param T value
	 * @param string kind - after or before
	 */
	function addItem($value, $dest_item, $kind="after")
	{
		$pos = $this->indexOf($dest_item);
		return $this->add($value, $pos, $kind);
	}
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	function set($pos, $value)
	{
		$pos = $pos % $this->count();
		$this->_arr[$pos] = $value;
		return $this;
	}
	/**
	 * Remove value
	 */
	function removeValue($value)
	{
		$index = $this->indexOf($value);
		if ($index != -1)
		{
			$this->remove($index, 1);
		}
		return $this;
	}
	/**
	 * Find value and remove
	 */
	function findAndRemove($f)
	{
		$index = $this->find($f);
		if ($index != -1)
		{
			$this->remove($index);
		}
		return $this;
	}
	/**
	 * Clear all values from vector
	 */
	function clear()
	{
		$this->_arr = [];
		return $this;
	}
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	function appendItems($items)
	{
		$items->each(function ($item)
		{
			$this->push($item);
		});
	}
	/**
	 * Prepend vector to the end of the vector
	 * @param Collection<T> arr
	 */
	function prependItems($items)
	{
		$items->each(function ($item)
		{
			$this->prepend($item);
		});
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Vector";
	}
	static function getParentClassName()
	{
		return "Runtime.Collection";
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