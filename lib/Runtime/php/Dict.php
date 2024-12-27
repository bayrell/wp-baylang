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
class _Map
{
	public $_map = [];
	
	
	/**
	 * From
	 */
	static function from($map)
	{
		$class_name = static::class;
		$res = new $class_name(null);
		if ($map != null && is_array($map))
		{
			foreach ($map as $key => $value)
			{
				$key = $res->toStr($key);
				$res->_map[$key] = $value;
			}
		}
		else if (is_object($map))
		{
			$values = get_object_vars($map);
			foreach ($values as $key => $value)
			{
				$key = $res->toStr($key);
				$res->_map[$key] = $value;
			}
		}
		return $res;	
	}
	
	
	/**
	 * JsonSerializable
	 */
	public function toStr($value)
	{
		return rtl::toStr($value);
	}
	
	
	/**
	 * JsonSerializable
	 */
	public function jsonSerialize()
	{
		return (object) $this->_map;
	}
	
	
	/**
	 * Constructor
	 */
	public function __construct($map=null)
	{
		$this->_map = [];
		if ($map == null) {}
		else if ($map instanceof Dict)
		{
			foreach ($map->_map as $key => $value)
			{
				$key = $this->toStr($key);
				$this->_map[$key] = $value;
			}		
		}
		else if (is_array($map))
		{
			foreach ($map as $key => $value)
			{
				$key = $this->toStr($key);
				$this->_map[$key] = $value;
			}
		}
		else if (is_object($map))
		{
			$values = get_object_vars($map);
			foreach ($values as $key => $value)
			{
				$key = $this->toStr($key);
				$this->_map[$key] = $value;
			}
		}
	}
	
	
	/**
	 * Destructor
	 */
	public function __destruct()
	{
		unset($this->_map);
	}
	
	
	/**
	 * Get array
	 */
	public function _getArr()
	{
		return $this->_map;
	}
	
	
	/**
	 * Get and set methods
	 */
	 /*
	function __isset($k){return $this->has(null, $k);}
	function __get($k){return $this->get(null, $k, null);}
	function __set($k,$v){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	function __unset($k){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	public function offsetExists($k){return $this->has(null, $k);}
	public function offsetGet($k){return $this->get(null, $k, "");}
	public function offsetSet($k,$v){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	public function offsetUnset($k){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	*/
	
	/* Class name */
	public static function getClassName(){return "Runtime._Map";}
	public static function getParentClassName(){return "";}
}
class Dict extends \Runtime\_Map
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static function Instance($val=null)
	{
		return new \Runtime\Dict($val);
	}
	/**
	 * Copy instance
	 */
	function cp()
	{
		$new_obj = static::Instance();
		$new_obj->_map = $this->_map;
		return $new_obj;
	}
	function copy($obj=null)
	{
		return ($obj == null) ? ($this->cp()) : ($this->clone($obj));
	}
	/**
	 * Clone Dict
	 * @param int pos - position
	 */
	function clone($obj=null)
	{
		if ($obj == null)
		{
			if ($this instanceof \Runtime\Map)
			{
				return $this->cp();
			}
			return $this;
		}
		$new_obj = static::Instance();
		$new_obj->_map = $this->_map;
		if ($obj != null)
		{
			if ($obj instanceof \Runtime\Dict) $obj = $obj->_map;
			$new_obj->_map = array_merge($new_obj->_map, $obj);
		}
		return $new_obj;
	}
	/**
	 * Convert to dict
	 */
	function toDict()
	{
		return new \Runtime\Dict($this);
	}
	/**
	 * Convert to dict
	 */
	function toMap()
	{
		return new \Runtime\Map($this);
	}
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	function contains($key)
	{
		$key = $this->toStr($key);
		return array_key_exists($key, $this->_map);
	}
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	function has($key)
	{
		return $this->contains($key);
	}
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	function get($key, $default_value=null)
	{
		$key = $this->toStr($key);
		$val = isset($this->_map[$key]) ? $this->_map[$key] : $default_value;
		return $val;
	}
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param string key - position
	 * @return T
	 */
	function item($key)
	{
		$key = $this->toStr($key);
		if (!array_key_exists($key, $this->_map))
		{
			throw new \Runtime\Exceptions\KeyNotFound($key);
		}
		return $this->_map[$key];
	}
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	function setIm($key, $value)
	{
		$res = $this->cp();
		$key = $this->toStr($key);
		$res->_map[$key] = $value;
		return $res;
	}
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	function removeIm($key)
	{
		$key = $this->toStr($key);
		if (array_key_exists($key, $this->_map))
		{
			$res = $this->cp();
			unset($res->_map[$key]);
			return $res;
		}
		return $this;
	}
	/**
	 * Returns vector of the keys
	 * @return Collection<string>
	 */
	function keys()
	{
		$keys = array_keys($this->_map);
		$res = \Runtime\Collection::from($keys);
		return $res;
	}
	/**
	 * Returns vector of the values
	 * @return Collection<T>
	 */
	function values()
	{
		$values = array_values($this->_map);
		$res = \Runtime\Collection::from($values);
		return $res;
	}
	/**
	 * Call function map
	 * @param fn f
	 * @return Dict
	 */
	function map($f)
	{
		$map2 = static::Instance();
		foreach ($this->_map as $key => $value)
		{
			$new_val = $f($value, $key);
			$map2->_map[$key] = $new_val;
		}
		return $map2;
	}
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	function filter($f)
	{
		$map2 = static::Instance();
		foreach ($this->_map as $key => $value)
		{
			$flag = $f($value, $key);
			if ($flag) $map2->_map[$key] = $value;
		}
		return $map2;
	}
	/**
	 * Call function for each item
	 * @param fn f
	 */
	function each($f)
	{
		foreach ($this->_map as $key => $value)
		{
			$f($value, $key);
		}
	}
	/**
	 * Transition Dict to Vector
	 * @param fn f
	 * @return Vector
	 */
	function transition($f)
	{
		$arr = new \Runtime\Vector();
		foreach ($this->_map as $key => $value)
		{
			$arr->_arr[] = $f($value, $key);
		}
		return $arr;
	}
	/**
	 * 	
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	function reduce($f, $init_value)
	{
		foreach ($this->_map as $key => $value)
		{
			$init_value = $f($init_value, $value, $key);
		}
		return $init_value;
	}
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	function intersect($fields=null, $skip_empty=true)
	{
		if ($fields == null)
		{
			return \Runtime\Map::from([]);
		}
		$obj = new \Runtime\Map();
		$fields->each(function ($field_name) use (&$skip_empty,&$obj)
		{
			if (!$this->has($field_name) && $skip_empty)
			{
				return ;
			}
			$obj->set($field_name, $this->get($field_name, null));
		});
		if ($this instanceof \Runtime\Map)
		{
			return $obj;
		}
		return $obj->toDict();
	}
	/**
	 * Add values from other map
	 * @param Dict<T> map
	 * @return self
	 */
	function concat($map=null)
	{
		if ($map == null)
		{
			return $this;
		}
		$_map = [];
		if ($map == null) return $this->cp();
		if ($map instanceof \Runtime\Dict) $_map = $map->_map;
		else if (gettype($map) == "array") $_map = $map;
		$res = $this->cp();
		foreach ($_map as $key => $value)
		{
			$res->_map[$key] = $value;
		}
		return $res;
	}
	/**
	 * Check equal
	 */
	function equal($item)
	{
		if ($item == null)
		{
			return false;
		}
		$keys = (new \Runtime\Collection())->concat($this->keys())->concat($item->keys())->removeDuplicatesIm();
		for ($i = 0; $i < $keys->count(); $i++)
		{
			$key = \Runtime\rtl::attr($keys, $i);
			if (!$this->has($key))
			{
				return false;
			}
			if (!$item->has($key))
			{
				return false;
			}
			if ($this->get($key) != $item->get($key))
			{
				return false;
			}
		}
		return true;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Dict";
	}
	static function getParentClassName()
	{
		return "Runtime._Map";
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