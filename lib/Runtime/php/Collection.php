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
class _Collection
{
	var $_arr = [];
	
	
	/**
	 * From
	 */
	static function from($arr)
	{
		$class_name = static::class;
		$res = new $class_name();
		if ($arr != null)
		{
			if ($arr instanceof \Runtime\Collection)
			{
				$res->_arr = $arr->_arr;
			}
			else if (gettype($arr) == 'array') $res->_arr = $arr;
		}
		return $res;	
	}
	
	
	/**
	 * JsonSerializable
	 */
	function jsonSerialize()
	{
		return $this->_arr;
	}
	
	
	/**
	 * Constructor
	 */
	function __construct()
	{
		$count = func_get_args();
		if ($count > 0)
		{
			$this->_arr = array_slice($count, 0);
		}
	}
	
	
	/**
	 * Destructor
	 */
	function __destruct()
	{
		unset($this->_arr);
	}
	
	
	/**
	 * Get array
	 */
	function _getArr()
	{
		return $this->_arr;
	}
	
	
	/**
	 * Get and set methods
	 */
	/*
	function __isset($k){return isset($this->_arr[$k]);}
	function __get($k){return $this->item(\Runtime\rtl::getContext(), $k);}
	function __set($k,$v){
		throw new \Runtime\Exceptions\AssignStructValueError(\Runtime\rtl::getContext(), $k);
	}
	function __unset($k){
		throw new \Runtime\Exceptions\AssignStructValueError(\Runtime\rtl::getContext(), $k);
	}
	function offsetExists($k){return isset($this->_arr[$k]);}
	function offsetGet($k){return $this->item(\Runtime\rtl::getContext(), $k);}
	function offsetSet($k,$v){
		throw new \Runtime\Exceptions\AssignStructValueError(\Runtime\rtl::getContext(), $k);
	}
	function offsetUnset($k){
		throw new \Runtime\Exceptions\AssignStructValueError(\Runtime\rtl::getContext(), $k);
	}
	*/
	
	/* Class name */
	static function getClassName(){return "Runtime._Collection";}
	static function getParentClassName(){return "";}
	
}
class Collection extends \Runtime\_Collection
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static function Instance()
	{
		return new \Runtime\Collection();
	}
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static function create($arr)
	{
		return static::from($arr);
	}
	/**
	 * Returns copy of Collection
	 * @param int pos - position
	 */
	function cp()
	{
		$class_name = static::class;
		$arr2 = new $class_name();
		if ($this->_arr == null) $arr2->_arr = [];
		else $arr2->_arr = array_slice($this->_arr, 0);
		return $arr2;
	}
	function copy()
	{
		return $this->cp();
	}
	/**
	 * Convert to collection
	 */
	function toCollection()
	{
		return \Runtime\Collection::from($this);
	}
	/**
	 * Convert to vector
	 */
	function toVector()
	{
		return \Runtime\Vector::from($this);
	}
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	function get($pos, $default_value=null)
	{
		if ($pos < 0 || $pos >= count($this->_arr)) return $default_value;
		$val = isset($this->_arr[$pos]) ? $this->_arr[$pos] : $default_value;
		return $val;
	}
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	function item($pos)
	{
		if (!array_key_exists($pos, $this->_arr))
		{
			throw new \Runtime\Exceptions\IndexOutOfRange($pos);
		}
		return $this->_arr[$pos];
	}
	/**
	 * Returns count items in vector
	 */
	function count()
	{
		return count($this->_arr);
	}
	/**
	 * Find value in array. Returns -1 if value not found.
	 * @param T value
	 * @return  int
	 */
	function indexOf($value)
	{
		$pos = array_search($value, $this->_arr, true);
		if ($pos === false) return -1;
		return $pos;
	}
	/**
	 * Find value in array, and returns position. Returns -1 if value not found.
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return  int
	 */
	function indexOfRange($value, $pos_begin, $pos_end)
	{
		$pos = $this->indexOf($value);
		if ($pos == -1 or $pos > $pos_end or $pos < $pos_begin)
			return -1;
		return $pos;
	}
	/**
	 * Get first item
	 */
	function first($default_value=null)
	{
		$c = count($this->_arr);
		if ($c == 0) return $default_value;	
		return $this->_arr[0];
	}
	/**
	 * Get last item
	 */
	function last($default_value=null, $pos=-1)
	{
		$c = count($this->_arr);
		if ($c == 0) return $default_value;
		if ($c + $pos + 1 == 0) return $default_value;
		return isset( $this->_arr[$c+$pos] ) ? $this->_arr[$c+$pos] : $default_value;
	}
	/**
	 * Append value to the end of the Collection and return new Collection
	 * @param T value
	 */
	function pushIm($value)
	{
		$res = $this->cp();
		$res->_arr[] = $value;
		return $res;
	}
	function push($value)
	{
		throw new \Runtime\Exceptions\RuntimeException("Deprecated Collection push");
	}
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	function insertIm($pos, $value)
	{
		$res = $this->cp();
		array_splice($res->_arr, $pos, 0, [$value]);
		return $res;
	}
	function insert($pos, $value)
	{
		throw new \Runtime\Exceptions\RuntimeException("Deprecated Collection insert");
	}
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	function setIm($pos, $value)
	{
		if (!array_key_exists($pos, $this->_arr))
			throw new \Runtime\Exceptions\IndexOutOfRange($pos);
		$res = $this->cp();
		$res->_arr[$pos] = $value;
		return $res;
	}
	function set($pos, $value)
	{
		throw new \Runtime\Exceptions\RuntimeException("Deprecated Collection set");
	}
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	function concat($arr)
	{
		if ($arr == null)
		{
			return $this;
		}
		if (!\Runtime\rtl::is_instanceof($arr, "Runtime.Collection"))
		{
			$arr = \Runtime\Vector::from([$arr]);
		}
		if (!$arr) return $this;
		if (count($arr->_arr) == 0) return $this;
		$res = $this->cp();
		foreach ($arr->_arr as $item)
		{
			$res->_arr[] = $item;
		}
		return $res;
	}
	/**
	 * Map
	 * @param fn f
	 * @return Collection
	 */
	function map($f)
	{
		$arr2 = $this->cp();
		foreach ($this->_arr as $key => $value)
		{
			$arr2->_arr[$key] = $f($value, $key);
		}
		return $arr2;
	}
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	function filter($f)
	{
		$arr2 = static::Instance();
		foreach ($this->_arr as $key => $value)
		{
			if ( $f($value, $key) )
			{
				$arr2->_arr[] = $value;
			}
		}
		return $arr2;
	}
	/**
	 * Transition Collection to Dict
	 * @param fn f
	 * @return Dict
	 */
	function transition($f)
	{
		$d = new \Runtime\Dict();
		foreach ($this->_arr as $key => $value)
		{
			$p = $f($value, $key);
			$d->_map[$p->_arr[1]] = $p->_arr[0];
		}
		return $d;
	}
	/**
	 * Flatten Collection
	 */
	function flatten()
	{
		$res = \Runtime\Vector::from([]);
		for ($i = 0; $i < $this->count(); $i++)
		{
			$res->appendItems($this->get($i));
		}
		return $res;
	}
	/**
	 * Reduce
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	function reduce($f, $init_value)
	{
		foreach ($this->_arr as $key => $value)
		{
			$init_value = $f($init_value, $value, $key);
		}
		return $init_value;
	}
	/**
	 * Call function for each item
	 * @param fn f
	 */
	function each($f)
	{
		foreach ($this->_arr as $key => $value)
		{
			$f($value, $key);
		}
	}
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	function slice($offset=0, $length=null)
	{
		if ($offset <= 0) $offset = 0;
		$arr2 = static::Instance();
		$arr2->_arr = array_slice($this->_arr, $offset, $length);
		return $arr2;
	}
	/**
	 * Reverse array
	 */
	function reverse()
	{
		$arr2 = $this->cp();
		$arr2->_arr = array_reverse($arr2->_arr);
		return $arr2;
	}
	/**
	 * Sort vector
	 * @param fn f - Sort user function
	 */
	function sort($f=null)
	{
		$res = $this->cp();
		if ($f == null)
		{
			asort($res->_arr);
		}
		else
		{
			$f1 = function($a, $b) use ($f){ return $f($a, $b); };
			usort($res->_arr, $f1);
		}
		$res->_arr = array_values($res->_arr);
		return $res;
	}
	/**
	 * Remove dublicate values
	 */
	function removeDuplicates()
	{
		$arr = []; $sz = count($this->_arr);
		for ($i=0; $i<$sz; $i++)
		{			
			$value = $this->_arr[$i];
			$pos = array_search($value, $arr, true);
			if ($pos === false)
			{
				$arr[] = $value;
			}
		}
		$res = static::Instance();
		$res->_arr = $arr;
		return $res;
	}
	/**
	 * Find item pos
	 * @param fn f - Find function
	 * @return int - position
	 */
	function find($f)
	{
		$sz = count($this->_arr);
		for ($i=0; $i<$sz; $i++)
		{
			$elem = $this->_arr[$i];
			if ( $f($elem) )
			{
				return $i;
			}
		}
		return -1;
	}
	/**
	 * Find item
	 * @param var item - Find function
	 * @param fn f - Find function
	 * @param T def_value - Find function
	 * @return item
	 */
	function findItem($f, $def_value=null)
	{
		$pos = $this->find($f);
		return $this->get($pos, $def_value);
	}
	/**
	 * Join collection to string
	 */
	function join($ch)
	{
		return \Runtime\rs::join($ch, $this);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Collection";
	}
	static function getParentClassName()
	{
		return "Runtime._Collection";
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