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
class lib
{
	/**
	 * Check object is istance
	 */
	static function isInstance($class_name)
	{
		return function ($item) use (&$class_name)
		{
			return \Runtime\rtl::is_instanceof($item, $class_name);
		};
	}
	/**
	 * Check object is implements interface
	 */
	static function isImplements($class_name)
	{
		return function ($item) use (&$class_name)
		{
			return \Runtime\rtl::is_implements($item, $class_name);
		};
	}
	/**
	 * Check class is implements interface
	 */
	static function classImplements($class_name)
	{
		return function ($item) use (&$class_name)
		{
			return \Runtime\rtl::class_implements($item, $class_name);
		};
	}
	/**
	 * Create struct
	 */
	static function createStruct($class_name)
	{
		return function ($data) use (&$class_name)
		{
			return \Runtime\rtl::newInstance($class_name, \Runtime\Vector::from([$data]));
		};
	}
	/**
	 * Equal two struct by key
	 */
	static function equal($value)
	{
		return function ($item) use (&$value)
		{
			return $item == $value;
		};
	}
	/**
	 * Equal two struct by key
	 */
	static function equalNot($value)
	{
		return function ($item) use (&$value)
		{
			return $item != $value;
		};
	}
	/**
	 * Equal two struct by key
	 */
	static function equalAttr($key, $value)
	{
		return function ($item1) use (&$key,&$value)
		{
			return ($item1 != null) ? (\Runtime\rtl::attr($item1, $key) == $value) : (false);
		};
	}
	/**
	 * Equal two struct by key
	 */
	static function equalNotAttr($key, $value)
	{
		return function ($item1) use (&$key,&$value)
		{
			return ($item1 != null) ? (\Runtime\rtl::attr($item1, $key) != $value) : (false);
		};
	}
	static function equalAttrNot($key, $value)
	{
		return static::equalNotAttr($key, $value);
	}
	/**
	 * Equal attrs
	 */
	static function equalAttrs($search)
	{
		return function ($item) use (&$search)
		{
			$fields = $search->keys();
			for ($i = 0; $i < $fields->count(); $i++)
			{
				$field_name = \Runtime\rtl::attr($fields, $i);
				if (\Runtime\rtl::attr($search, $field_name) != \Runtime\rtl::attr($item, $field_name))
				{
					return false;
				}
			}
			return true;
		};
	}
	/**
	 * Equal two struct by key
	 */
	static function equalMethod($method_name, $value)
	{
		return function ($item1) use (&$method_name,&$value)
		{
			if ($item1 == null)
			{
				return false;
			}
			$f = \Runtime\rtl::method($item1, $method_name);
			return $f() == $value;
		};
	}
	/**
	 * Returns key value of obj
	 */
	static function get($key, $def_value)
	{
		return function ($obj) use (&$key,&$def_value)
		{
			return \Runtime\rtl::attr($obj, \Runtime\Vector::from([$key]), $def_value);
		};
	}
	/**
	 * Set value
	 */
	static function set($key, $value)
	{
		return function ($obj) use (&$key,&$value)
		{
			return \Runtime\rtl::setAttr($obj, \Runtime\Vector::from([$key]), $value);
		};
	}
	/**
	 * Returns attr of item
	 */
	static function attr($path, $def_value=null)
	{
		return function ($obj) use (&$path,&$def_value)
		{
			return \Runtime\rtl::attr($obj, $path, $def_value);
		};
	}
	/**
	 * Set dict attr
	 */
	static function setAttr($path, $value)
	{
		return function ($obj) use (&$path,&$value)
		{
			return \Runtime\rtl::setAttr($obj, $path, $value);
		};
	}
	/**
	 * Returns max id from items
	 */
	static function getMaxIdFromItems($items, $start=0)
	{
		return $items->reduce(function ($value, $item)
		{
			return ($item->id > $value) ? ($item->id) : ($value);
		}, $start);
	}
	/**
	 * Copy object
	 */
	static function copy($d)
	{
		return function ($item) use (&$d)
		{
			return $item->copy($d);
		};
	}
	/**
	 * Take dict
	 */
	static function takeDict($fields)
	{
		return function ($item) use (&$fields)
		{
			return $item->takeDict($fields);
		};
	}
	/**
	 * Map
	 */
	static function map($f)
	{
		return function ($m) use (&$f)
		{
			return $m->map($f);
		};
	}
	/**
	 * Filter
	 */
	static function filter($f)
	{
		return function ($m) use (&$f)
		{
			return $m->filter($f);
		};
	}
	/**
	 * Intersect
	 */
	static function intersect($arr)
	{
		return function ($m) use (&$arr)
		{
			return $m->intersect($arr);
		};
	}
	/**
	 * Sort
	 */
	static function sort($f)
	{
		return function ($m) use (&$f)
		{
			return $m->sortIm($f);
		};
	}
	/**
	 * Transition
	 */
	static function transition($f)
	{
		return function ($m) use (&$f)
		{
			return $m->transition($f);
		};
	}
	/**
	 * Concat
	 */
	static function concat($arr)
	{
		return function ($m) use (&$arr)
		{
			return $m->concat($arr);
		};
	}
	/**
	 * Sort asc
	 */
	static function sortAsc($a, $b)
	{
		return ($a > $b) ? (1) : (($a < $b) ? (-1) : (0));
	}
	/**
	 * Sort desc
	 */
	static function sortDesc($a, $b)
	{
		return ($a > $b) ? (-1) : (($a < $b) ? (1) : (0));
	}
	/**
	 * Sort attr
	 */
	static function sortAttr($field_name, $f)
	{
		return function ($a, $b) use (&$field_name,&$f)
		{
			$a = \Runtime\rtl::attr($a, $field_name);
			$b = \Runtime\rtl::attr($b, $field_name);
			if ($f == "asc")
			{
				return ($a > $b) ? (1) : (($a < $b) ? (-1) : (0));
			}
			if ($f == "desc")
			{
				return ($a > $b) ? (-1) : (($a < $b) ? (1) : (0));
			}
			return $f($a, $b);
		};
	}
	/**
	 * Convert monad by type
	 */
	static function to($type_value, $def_value=null)
	{
		return function ($m) use (&$type_value,&$def_value)
		{
			return new \Runtime\Monad(($m->err == null) ? (\Runtime\rtl::convert($m->value(), $type_value, $def_value)) : ($def_value));
		};
	}
	/**
	 * Convert monad by type
	 */
	static function default($def_value=null)
	{
		return function ($m) use (&$def_value)
		{
			return ($m->err != null || $m->val === null) ? (new \Runtime\Monad($def_value)) : ($m);
		};
	}
	/**
	 * Set monad new value
	 */
	static function newValue($value=null, $clear_error=false)
	{
		return function ($m) use (&$value,&$clear_error)
		{
			return ($clear_error == true) ? (new \Runtime\Monad($value)) : (($m->err == null) ? (new \Runtime\Monad($value)) : ($m));
		};
	}
	/**
	 * Clear error
	 */
	static function clearError()
	{
		return function ($m)
		{
			return new \Runtime\Monad($m->val);
		};
	}
	/**
	 * Returns monad
	 */
	static function monad($m)
	{
		return $m;
	}
	/**
	 * Get method from class
	 * @return fn
	 */
	static function method($method_name)
	{
		return function ($class_name) use (&$method_name)
		{
			return \Runtime\rtl::method($class_name, $method_name);
		};
	}
	/**
	 * Apply function
	 * @return fn
	 */
	static function applyMethod($method_name, $args=null)
	{
		return function ($class_name) use (&$method_name,&$args)
		{
			$f = \Runtime\rtl::method($class_name, $method_name);
			return \Runtime\rtl::apply($f, $args);
		};
	}
	/**
	 * Apply async function
	 * @return fn
	 */
	static function applyMethodAsync($method_name, $args=null)
	{
		return function ($class_name) use (&$method_name,&$args)
		{
			$f = \Runtime\rtl::method($class_name, $method_name);
			return \Runtime\rtl::applyAsync($f, $args);
		};
	}
	/**
	 * Apply function
	 * @return fn
	 */
	static function apply($f)
	{
		return function ($value) use (&$f)
		{
			return $f($value);
		};
	}
	/**
	 * Apply function
	 * @return fn
	 */
	static function applyAsync($f)
	{
		return function ($value) use (&$f)
		{
			return $f($value);
		};
	}
	/**
	 * Create pipe
	 */
	static function pipe()
	{
		return new \Runtime\Chain();
	}
	/**
	 * Value for pipe
	 */
	static function value()
	{
		return function ($value)
		{
			return $value;
		};
	}
	/**
	 * Normalize date time
	 */
	static function normalizeDateTime()
	{
		return function ($date_time)
		{
			if (!$date_time)
			{
				return "";
			}
			return $date_time->normalize()->getDateTimeString();
		};
	}
	/**
	 * Log message
	 * @return fn
	 */
	static function log($message="")
	{
		return function ($value) use (&$message)
		{
			if ($message == "")
			{
				var_dump($value);
			}
			else
			{
				var_dump($message);
			}
			return $value;
		};
	}
	/**
	 * Function or
	 */
	static function or($arr)
	{
		return function ($item) use (&$arr)
		{
			for ($i = 0; $i < $arr->count(); $i++)
			{
				$f = \Runtime\rtl::attr($arr, $i);
				$res = $f($item);
				if ($res)
				{
					return true;
				}
			}
			return false;
		};
	}
	/**
	 * Function and
	 */
	static function and($arr)
	{
		return function ($item) use (&$arr)
		{
			for ($i = 0; $i < $arr->count(); $i++)
			{
				$f = \Runtime\rtl::attr($arr, $i);
				$res = $f($item);
				if (!$res)
				{
					return false;
				}
			}
			return true;
		};
	}
	/**
	 * Join
	 */
	static function join($ch)
	{
		return function ($items) use (&$ch)
		{
			return \Runtime\rs::join($ch, $items);
		};
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.lib";
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