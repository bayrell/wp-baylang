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
class rtl
{
	const LOG_FATAL=0;
	const LOG_CRITICAL=2;
	const LOG_ERROR=4;
	const LOG_WARNING=6;
	const LOG_INFO=8;
	const LOG_DEBUG=10;
	const LOG_DEBUG2=12;
	const STATUS_PLAN=0;
	const STATUS_DONE=1;
	const STATUS_PROCESS=100;
	const STATUS_FAIL=-1;
	const ERROR_NULL=0;
	const ERROR_OK=1;
	const ERROR_PROCCESS=100;
	const ERROR_FALSE=-100;
	const ERROR_UNKNOWN=-1;
	const ERROR_INDEX_OUT_OF_RANGE=-2;
	const ERROR_KEY_NOT_FOUND=-3;
	const ERROR_STOP_ITERATION=-4;
	const ERROR_FILE_NOT_FOUND=-5;
	const ERROR_ITEM_NOT_FOUND=-5;
	const ERROR_OBJECT_DOES_NOT_EXISTS=-5;
	const ERROR_OBJECT_ALLREADY_EXISTS=-6;
	const ERROR_ASSERT=-7;
	const ERROR_REQUEST=-8;
	const ERROR_RESPONSE=-9;
	const ERROR_CSRF_TOKEN=-10;
	const ERROR_RUNTIME=-11;
	const ERROR_VALIDATION=-12;
	const ERROR_PARSE_SERIALIZATION_ERROR=-14;
	const ERROR_ASSIGN_DATA_STRUCT_VALUE=-15;
	const ERROR_AUTH=-16;
	const ERROR_DUPLICATE=-17;
	const ERROR_API_NOT_FOUND=-18;
	const ERROR_API_WRONG_FORMAT=-19;
	const ERROR_API_WRONG_APP_NAME=-20;
	const ERROR_API_ERROR=-21;
	const ERROR_CURL_ERROR=-22;
	const ERROR_FATAL=-99;
	const ERROR_HTTP_CONTINUE=-100;
	const ERROR_HTTP_SWITCH=-101;
	const ERROR_HTTP_PROCESSING=-102;
	const ERROR_HTTP_OK=-200;
	const ERROR_HTTP_BAD_GATEWAY=-502;
	const ERROR_USER=-10000;
	const ALLOW_OBJECTS=1;
	const JSON_PRETTY=8;
	static $_memorize_cache=null;
	static $_memorize_not_found=null;
	static $_memorize_hkey=null;
	static $_global_context=null;
	/**
	 * Define class
	 */
	static function defClass($obj)
	{
	}
	/**
	 * Register module
	 */
	static function defModule($f)
	{
	}
	/**
	 * Require js module by name
	 * @return module
	 */
	static function require($module_name)
	{
		return null;
	}
	/**
	 * Find class instance by name. If class does not exists return null.
	 * @return var - class instance
	 */
	static function find_class($class_name)
	{
		return "\\" . preg_replace("/\\./", "\\", $class_name);
	}
	/**
	 * Returns true if class instanceof class_name
	 * @return bool
	 */
	static function is_instanceof($obj, $class_name)
	{
		if ($obj == null)
		{
			return false;
		}
		$obj_class_name = static::get_class_name($obj);
		if ($obj_class_name != "")
		{
			$obj = $obj_class_name;
		}
		if (static::isString($obj))
		{
			if ($obj == $class_name)
			{
				return true;
			}
			$parents = static::getParents($obj);
			if ($parents->indexOf($class_name) >= 0)
			{
				return true;
			}
			return false;
		}
		return false;
	}
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	static function is_implements($obj, $interface_name)
	{
		if ($obj == null)
		{
			return false;
		}
		return static::class_implements(static::get_class_name($obj), $interface_name);
	}
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	static function class_implements($class_name, $interface_name)
	{
		$class_name = static::find_class($class_name);
		$interface_name = static::find_class($interface_name);
		$arr = @class_implements($class_name, true);
		if ($arr == false){
			return false;
		}
		foreach ($arr as $name)
		{
			if ($name == $interface_name or "\\" . $name == $interface_name)
				return true;
		}
		return false;
	}
	/**
	 * Returns interface of class
	 * @param string class_name
	 * @return Collection<string>
	 */
	static function getInterfaces($class_name)
	{
		$arr = array_values(class_implements(rtl::find_class($class_name)));
		$arr = array_map
		(
			function($s){ return str_replace("\\", ".", $s); },
			$arr
		);
		return \Runtime\Vector::from($arr);
	}
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	static function class_exists($class_name)
	{
		$class_name = static::find_class($class_name);
		return class_exists($class_name);
	}
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	static function get_class_name($obj)
	{
		if (static::isString($obj))
		{
			return $obj;
		}
		$t = static::getType($obj);
		if ($t != "object" && $t != "collection" && $t != "dict")
		{
			return "";
		}
		return $obj::getClassName();
	}
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	static function method_exists($class_name, $method_name)
	{
		if (gettype($class_name) == "object")
		{
			try
			{
				$r = new \ReflectionMethod(get_class($class_name),$method_name);
				if (!$r) return false;
				if ($r->isStatic()) return false;
				return true;
			}
			catch (\Exception $e) {}
			
			return false;
		}
		
		$class_name = static::find_class($class_name);
		if (!class_exists($class_name)) return false;
		
		try
		{
			$r = new \ReflectionMethod($class_name,$method_name);
			if (!$r) return false;
			if (!$r->isStatic()) return false;
			return true;
		}
		catch (\Exception $e) {}
		
		return false;
	}
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	static function newInstance($class_name, $args=null)
	{
		$class_name = static::find_class($class_name);
		if ($args == null)
			return new $class_name();
		$r = new \ReflectionClass($class_name);
		$arr = $args->_arr;
		return $r->newInstanceArgs($arr);
	}
	/**
	 * Returns callback
	 * @return fn
	 */
	static function method($obj, $method_name)
	{
		return new \Runtime\Callback($obj, $method_name);
	}
	/**
	 * Call function
	 * @return fn
	 */
	static function apply($f, $args=null)
	{
		if ($args == null) $args = [];
		else if ($args instanceof \Runtime\Collection) $args = $args->_arr;
		
		if ($f instanceof \Runtime\Callback)
		{
			return $f->apply($args);
		}
		
		return call_user_func_array($f, $args);
	}
	/**
	 * Await promise
	 */
	static function resolvePromise($value)
	{
	}
	/**
	 * Run async function
	 * @return fn
	 */
	static function runAsync($f, $args=null)
	{
	}
	/**
	 * Returns callback
	 * @return var
	 */
	static function attr($item, $path, $def_val=null)
	{
		if ($path === null)
		{
			return $def_val;
		}
		if ($item === null) return $def_val;
		if (gettype($path) == "array") $path = \Runtime\Collection::from($path);
		else if (static::isScalarValue($path)) $path = \Runtime\Collection::from([$path]);
		if (!($path instanceof \Runtime\Collection)) return $def_val;
		if (count($path->_arr) == 0) 
		{
			return $item;
		}
		if (is_string($item)) return mb_substr($item, $path->_arr[0], 1);
		$key = $path->first();
		$path = $path->slice(1);
		$val = $def_val;
		if (
			$item instanceof \Runtime\Dict or
			$item instanceof \Runtime\Collection or
			$item instanceof \Runtime\BaseStruct or
			$item instanceof \Runtime\MapInterface
		)
		{
			$item = $item->get($key, $def_val);
			$val = static::attr($item, $path, $def_val);
			return $val;
		}
		else if ($item instanceof \Runtime\BaseObject)
		{
			if (property_exists($item, $key)) $item = $item->$key;
			else $item = $def_val;
			$val = static::attr($item, $path, $def_val);
			return $val;
		}
		return $def_val;
	}
	/**
	 * Update current item
	 * @return var
	 */
	static function setAttr($item, $attrs, $new_value)
	{
		if ($attrs == null)
		{
			return $item;
		}
		if (gettype($attrs) == "string") $attrs = \Runtime\Vector::from([$attrs]);
		else if (gettype($attrs) == "array") $attrs = \Runtime\Vector::from($attrs);
		$f = function ($attrs, $data, $new_value, $f)
		{
			if ($attrs->count() == 0)
			{
				return $new_value;
			}
			if ($data == null)
			{
				$data = \Runtime\Map::from([]);
			}
			$new_data = null;
			$attr_name = $attrs->first();
			$attrs = $attrs->slice(1);
			if ($data instanceof \Runtime\BaseStruct)
			{
				$attr_data = $data->get($attr_name, null);
				$res = $f($attrs, $attr_data, $new_value, $f);
				$d = (new \Runtime\Map())->set($attr_name, $res);
				$new_data = $data->copy($d);
			}
			else if ($data instanceof \Runtime\BaseObject)
			{
				$attr_data = static::attr($data, $attr_name, null);
				$res = $f($attrs, $attr_data, $new_value, $f);
				$new_data = $data;
				$data->$attr_name = $res;
			}
			else if ($data instanceof \Runtime\Map)
			{
				$attr_data = $data->get($attr_name, null);
				$res = $f($attrs, $attr_data, $new_value, $f);
				$data->set($attr_name, $res);
				$new_data = $data;
			}
			else if ($data instanceof \Runtime\Dict)
			{
				$attr_data = $data->get($attr_name, null);
				$res = $f($attrs, $attr_data, $new_value, $f);
				$new_data = $data->setIm($attr_name, $res);
			}
			else if ($data instanceof \Runtime\Vector)
			{
				$attr_data = $data->get($attr_name, null);
				$res = $f($attrs, $attr_data, $new_value, $f);
				$data->set($attr_name, $res);
				$new_data = $data;
			}
			else if ($data instanceof \Runtime\Collection)
			{
				$attr_data = $data->get($attr_name, null);
				$res = $f($attrs, $attr_data, $new_value, $f);
				$new_data = $data->setIm($attr_name, $res);
			}
			return $new_data;
		};
		$new_item = $f($attrs, $item, $new_value, $f);
		return $new_item;
	}
	/**
	 * Convert monad by type
	 */
	static function m_to($type_value, $def_value=null)
	{
		return function ($m) use (&$type_value,&$def_value)
		{
			return new \Runtime\Monad(($m->err == null) ? (static::convert($m->val, $type_value, $def_value)) : ($def_value));
		};
	}
	/**
	 * Convert monad to default value
	 */
	static function m_def($def_value=null)
	{
		return function ($m) use (&$def_value)
		{
			return ($m->err != null || $m->val === null) ? (new \Runtime\Monad($def_value)) : ($m);
		};
	}
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	static function convert($v, $t, $d=null)
	{
		if ($v === null)
		{
			return $d;
		}
		if ($t == "mixed" || $t == "primitive" || $t == "var" || $t == "fn" || $t == "callback")
		{
			return $v;
		}
		if ($t == "bool" || $t == "boolean")
		{
			return static::toBool($v);
		}
		else if ($t == "string")
		{
			return static::toString($v);
		}
		else if ($t == "int")
		{
			return static::toInt($v);
		}
		else if ($t == "float" || $t == "double")
		{
			return static::toFloat($v);
		}
		else if (static::is_instanceof($v, $t))
		{
			return $v;
		}
		return null;
	}
	/**
	 * Returns value
	 * @param var value
	 * @param var def_val
	 * @param var obj
	 * @return var
	 */
	static function to($v, $o)
	{
		$ctx = null;
		$e = "";
		$e = $o["e"];
		return static::convert($v, $e);
	}
	/**
	 * Return true if value is empty
	 * @param var value
	 * @return bool
	 */
	static function isEmpty($value)
	{
		return !static::exists($value) || $value === null || $value === "" || $value === false || $value === 0;
	}
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return bool
	 */
	static function exists($value)
	{
		return isset($value);
	}
	/**
	 * Returns true if value is scalar value
	 * @return bool
	 */
	static function getType($value)
	{
		if ($value == null)
		{
			return "null";
		}
		if (\Runtime\rtl::isString($value))
		{
			return "string";
		}
		if (\Runtime\rtl::isInt($value))
		{
			return "int";
		}
		if (\Runtime\rtl::isDouble($value))
		{
			return "double";
		}
		if (\Runtime\rtl::isBoolean($value))
		{
			return "boolean";
		}
		if (\Runtime\rtl::isCallable($value))
		{
			return "fn";
		}
		if ($value instanceof \Runtime\Collection)
		{
			return "collection";
		}
		if ($value instanceof \Runtime\Dict)
		{
			return "dict";
		}
		if ($value instanceof \Runtime\BaseObject)
		{
			return "object";
		}
		return "unknown";
	}
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	static function isScalarValue($value)
	{
		if ($value == null)
		{
			return true;
		}
		if (\Runtime\rtl::isString($value))
		{
			return true;
		}
		if (\Runtime\rtl::isInt($value))
		{
			return true;
		}
		if (\Runtime\rtl::isDouble($value))
		{
			return true;
		}
		if (\Runtime\rtl::isBoolean($value))
		{
			return true;
		}
		return false;
	}
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	static function isBoolean($value)
	{
		if ($value === false || $value === true)
		{
			return true;
		}
		return false;
	}
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	static function isBool($value)
	{
		return static::isBoolean($value);
	}
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	static function isInt($value)
	{
		return is_int($value);
	}
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	static function isDouble($value)
	{
		return is_int($value) or is_float($value);
	}
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	static function isString($value)
	{
		return is_string($value);
	}
	/**
	 * Return true if value is function
	 * @param var value
	 * @return bool
	 */
	static function isCallable($value)
	{
		if ($value instanceof \Runtime\Callback)
		{
			if ($value->exists($value))
			{
				return true;
			}
			return false;
		}
		return is_callable($value);
		return false;
	}
	/**
	 * Return true if value is Promise
	 * @param var value
	 * @return bool
	 */
	static function isPromise($value)
	{
		return false;
	}
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	static function toString($value)
	{
		return static::toStr($value);
	}
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	static function toStr($value)
	{
		$t = gettype($value);
		if ($value === null) return "";
		if (is_string($value)) return $value;
		if ($value instanceof \Runtime\StringInterface) return $value->toString();
		if (is_int($value) or is_float($value) or is_int($value))
			return (string)$value;
		if ($value === true) return "1";
		if ($value === false) return "";
		return (string)$value;
	}
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	static function toInt($val)
	{
		$res = (int)$val;
		$s_res = (string)$res;
		$s_val = (string)$val;
		if ($s_res == $s_val)
			return $res;
		return 0;
	}
	/**
	 * Convert value to boolean
	 * @param var value
	 * @return bool
	 */
	static function toBool($val)
	{
		if ($val === false || $val === "false") return false;
		if ($val === true || $val === "true") return true;
		$res = (bool)$val;
		$s_res = (string)$res;
		$s_val = (string)$val;
		if ($s_res == $s_val)
			return $res;
		return false;
	}
	/**
	 * Convert value to float
	 * @param var value
	 * @return float
	 */
	static function toFloat($val)
	{
		$res = floatval($val);
		$s_res = (string)$res;
		$s_val = (string)$val;
		if ($s_res == $s_val)
			return $res;
		return 0;
	}
	/* ============================= Instrospection ============================= */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	static function getParents($class_name)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.rtl.getParents", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$res = new \Runtime\Vector();
		while ($class_name != "")
		{
			$getParentClassName = new \Runtime\Callback($class_name, "getParentClassName");
			if (!$getParentClassName->exists())
			{
				break;
			}
			$class_name = static::apply($getParentClassName);
			if ($class_name == "")
			{
				break;
			}
			$res->push($class_name);
		}
		$__memorize_value = $res->toCollection();
		\Runtime\rtl::_memorizeSave("Runtime.rtl.getParents", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Returns fields of class
	 */
	static function getFields($class_name, $flag=255)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.rtl.getFields", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$names = new \Runtime\Vector();
		$appendFields = function ($parent_class_name) use (&$names,&$flag)
		{
			$getFieldsList = new \Runtime\Callback($parent_class_name, "getFieldsList");
			if (!$getFieldsList->exists())
			{
				return ;
			}
			$item_fields = static::apply($getFieldsList, \Runtime\Vector::from([$flag]));
			if (!$item_fields)
			{
				return ;
			}
			$names->appendItems($item_fields);
		};
		$appendFields($class_name);
		$parents = static::getParents($class_name);
		for ($i = 0; $i < $parents->count(); $i++)
		{
			$parent_class_name = \Runtime\rtl::attr($parents, $i);
			$appendFields($parent_class_name);
		}
		$__memorize_value = $names->removeDuplicates()->toCollection();
		\Runtime\rtl::_memorizeSave("Runtime.rtl.getFields", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/* ====================== Assert ====================== */
	static function assert($expr, $message)
	{
		if (!$expr)
		{
			throw new \Runtime\Exceptions\AssertException($message);
		}
	}
	static function _memorizeValidHKey($hkey, $key)
	{
		if ( static::$_memorize_hkey == null ) static::$_memorize_hkey = [];
		if ( !isset(static::$_memorize_hkey[$hkey]) ) return false;
		if ( static::$_memorize_hkey[$hkey] == $key ) return true;
		return false;
	}
	/**
	 * Clear memorize cache
	 */
	static function _memorizeClear()
	{
		static::$_memorize_cache = [];
		static::$_memorize_hkey = [];
	}
	/**
	 * Returns cached value
	 */
	static function _memorizeValue($name, $args)
	{
		if (static::$_memorize_cache == null) return static::$_memorize_not_found;
		if (!isset(static::$_memorize_cache[$name])) return static::$_memorize_not_found;
		
		$arr = &static::$_memorize_cache[$name];
		$sz = count($args);
		for ($i=0; $i<$sz; $i++)
		{
			$key = &$args[$i];
			$hkey = null; 
			if (gettype($key) == 'object') $hkey = spl_object_hash($key); else $hkey = $key;
			if ($i == $sz - 1)
			{
				if (in_array($hkey, array_keys($arr)))
				{
					return $arr[$hkey];
				}
				return static::$_memorize_not_found;
			}
			else
			{
				if (!isset($arr[$hkey])) return static::$_memorize_not_found;
				$arr = &$arr[$hkey];
			}
		}
		
		return static::$_memorize_not_found;
	}
	/**
	 * Returns cached value
	 */
	static function _memorizeSave($name, $args, $value)
	{
		if (static::$_memorize_cache == null) static::$_memorize_cache = [];
		if (!isset(static::$_memorize_cache[$name])) static::$_memorize_cache[$name] = [];
		
		$arr = &static::$_memorize_cache[$name];
		$sz = count($args);
		for ($i=0; $i<$sz; $i++)
		{
			$key = &$args[$i];
			$hkey = null; 
			if (gettype($key) == 'object') $hkey = spl_object_hash($key); else $hkey = $key;
			if ($i == $sz - 1)
			{
				$arr[$hkey] = $value;
			}
			else
			{
				if (!isset($arr[$hkey])) $arr[$hkey] = [];
				else if (!static::_memorizeValidHKey($hkey, $key)) $arr[$hkey] = [];
				$arr = &$arr[$hkey];
			}
		}
	}
	/* ================ Dirty functions ================ */
	/**
	 * Trace
	 */
	static function getTrace()
	{
		$res = \Runtime\Vector::from([]);
		$pos = 1;
		$arr = debug_backtrace();
		foreach ($arr as $item)
		{
			$s = "internal";
			if (isset($item["file"])) $s = $item["file"] . "(" . $item["line"] . ")";
			if (isset($item["class"])) $s .= ": " . $item["class"] . "::" . $item["function"];
			else $s .= ": " . $item["function"];
			$res->push($pos . ") " . $s);
			$pos++;
		}
		return $res;
	}
	/**
	 * Print trace
	 */
	static function printTrace($ch="\n")
	{
		$s = \Runtime\rs::join($ch, \Runtime\rtl::getTrace());
		echo $s;
	}
	/**
	 * Sleep in ms
	 */
	static function sleep($time)
	{
		usleep( $time * 1000 );
	}
	/**
	 * Returns unique value
	 * @param bool flag If true returns as text. Default true
	 * @return string
	 */
	static function unique($flag=true)
	{
		return uniqid();
	}
	/**
	 * Returns current unix time in seconds
	 * @return int
	 */
	static function time()
	{
		return time();
	}
	/**
	 * Returns unix timestamp in microseconds
	 */
	static function utime()
	{
		return microtime(true);
	}
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	static function json_encode($value, $flags=0)
	{
		$serializer = new \Runtime\SerializerJson();
		$serializer->flags = $flags;
		return $serializer->encode($value);
	}
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var 
	 */
	static function json_decode($obj, $flags=0)
	{
		$serializer = new \Runtime\SerializerJson();
		$serializer->flags = $flags;
		return $serializer->decode($obj);
	}
	/**
	 * Returns global context
	 * @return Context
	 */
	static function getContext()
	{
		if (!static::$_global_context) return null;
		return static::$_global_context;
	}
	/**
	 * Set global context
	 * @param Context context
	 */
	static function setContext($context)
	{
		static::$_global_context = $context;
	}
	/**
	 * Create context
	 */
	static function createContext($params)
	{
		/* Create contenxt */
		$context = \Runtime\Context::create($params);
		/* Setup global context */
		static::setContext($context);
		/* Init context */
		$context->init();
		return $context;
	}
	/**
	 * Run application
	 * @param Dict d
	 */
	static function runApp($class_name, $modules, $params=null)
	{
		if ($params == null)
		{
			$params = \Runtime\Map::from([]);
		}
		$params->set("entry_point", $class_name);
		$params->set("modules", $modules);
		$context = static::createContext($params);
		$context->start($context);
		$code = $context->run($context);
		
		return $code;
		return 0;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.rtl";
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
rtl::$_memorize_not_found = (object) ['s' => 'memorize_key_not_found'];