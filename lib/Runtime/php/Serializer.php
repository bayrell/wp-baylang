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
class Serializer extends \Runtime\BaseObject
{
	const ALLOW_OBJECTS=1;
	const ENCODE=2;
	const DECODE=4;
	const JSON_PRETTY=8;
	public $flags;
	public $callback_name;
	function allowObjects()
	{
		return ($this->flags & static::ALLOW_OBJECTS) == static::ALLOW_OBJECTS;
	}
	function isDecode()
	{
		return ($this->flags & static::DECODE) == static::DECODE;
	}
	function isEncode()
	{
		return ($this->flags & static::ENCODE) == static::ENCODE;
	}
	/**
	 * Set flag
	 */
	function setFlag($flag)
	{
		$this->flags = $this->flags | $flag;
	}
	/**
	 * Remove flag
	 */
	function removeFlag($flag)
	{
		$this->flags = $this->flags & ~$flag;
	}
	/**
	 * Check flag
	 */
	function hasFlag($flag)
	{
		return ($this->flags & $flag) == $flag;
	}
	/**
	 * Set callback
	 */
	function setCallback($value)
	{
		$this->callback_name = $value;
	}
	/**
	 * Serialize item
	 */
	function process($object, $field_name, $data, $create=null)
	{
		if ($this->isDecode())
		{
			$value = $data->get($field_name);
			$object_value = static::getAttr($object, $field_name);
			$new_value = $this->decodeItem($value, $object_value, $create);
			static::setAttr($object, $field_name, $new_value);
		}
		else if ($this->isEncode())
		{
			$value = static::getAttr($object, $field_name);
			$new_value = $this->encodeItem($value);
			$data->set($field_name, $new_value);
		}
	}
	/**
	 * Process items
	 */
	function processItems($object, $field_name, $data, $create=null)
	{
		if ($this->isDecode())
		{
			$value = $data->get($field_name);
			$object_value = static::getAttr($object, $field_name);
			$new_value = $this->decodeItems($value, $object_value, $create);
			static::setAttr($object, $field_name, $new_value);
		}
		if ($this->isEncode())
		{
			$value = static::getAttr($object, $field_name);
			$new_value = $this->encodeItem($value);
			$data->set($field_name, $new_value);
		}
	}
	/**
	 * Get attr
	 */
	static function getAttr($object, $field_name)
	{
		if ($object == null)
		{
			return null;
		}
		if (property_exists($object, $field_name))
		{
			return $object->$field_name;
		}
		return null;
	}
	/**
	 * Set attr
	 */
	static function setAttr($object, $field_name, $value)
	{
		$object->$field_name = $value;
	}
	/**
	 * Decode collection
	 */
	function decodeCollection($value, $object_value=null, $create=null)
	{
		$new_value = \Runtime\Vector::from([]);
		for ($i = 0; $i < $value->count(); $i++)
		{
			$item = $value->get($i);
			$old_item = ($object_value instanceof \Runtime\Collection) ? ($object_value->get($i)) : (null);
			$new_item = $this->decodeItem($item, $old_item, $create);
			$new_value->push($new_item);
		}
		return $new_value;
	}
	/**
	 * Decode dict
	 */
	function decodeDict($value, $object_value=null, $create=null)
	{
		$new_value = \Runtime\Map::from([]);
		$keys = $value->keys();
		for ($i = 0; $i < $keys->count(); $i++)
		{
			$key = $keys->get($i);
			$item = $value->get($key);
			$old_item = static::getAttr($object_value, $key);
			$new_item = $this->decodeItem($item, $old_item, $create);
			$new_value->set($key, $new_item);
		}
		return $new_value;
	}
	/**
	 * Create object
	 */
	function createObject($value, $object_value=null, $create=null)
	{
		$class_name = $value->get("__class_name__");
		/* Create instance */
		$instance = $object_value;
		if ($object_value != null)
		{
			$instance = $object_value;
		}
		else if ($create != null)
		{
			$instance = $create($this, $value);
		}
		else
		{
			$instance = \Runtime\rtl::newInstance($class_name);
		}
		/* If instance is null */
		if ($instance == null)
		{
			return null;
		}
		/* Get callback */
		$callback = null;
		if ($this->callback_name != null)
		{
			$callback = new \Runtime\Callback($instance, $this->callback_name);
			if ($callback->exists())
			{
				$callback = null;
			}
		}
		/* Apply object serialize */
		if ($callback)
		{
			\Runtime\rtl::apply($callback, \Runtime\Vector::from([$this,$value]));
		}
		else if ($instance instanceof \Runtime\SerializeInterface)
		{
			$instance->serialize($this, $value);
		}
		/* Return instance */
		return $instance;
	}
	/**
	 * Decode object
	 */
	function decodeObject($value, $object_value=null, $create=null)
	{
		/* Convert to Dict if objects is not allowed */
		if (!$this->allowObjects())
		{
			return $this->decodeDict($value);
		}
		/* Create object by create */
		if ($create != null)
		{
			return $this->createObject($value, $object_value, $create);
		}
		/* Convert Dict if does not has class name */
		if (!$value->has("__class_name__"))
		{
			return $this->decodeDict($value);
		}
		$class_name = $value->get("__class_name__");
		/* Is date */
		if ($class_name == "Runtime.Date")
		{
			return new \Runtime\Date($value);
		}
		else if ($class_name == "Runtime.DateTime")
		{
			return new \Runtime\DateTime($value);
		}
		/* Struct */
		if (\Runtime\rtl::is_instanceof($class_name, "Runtime.BaseStruct"))
		{
			$value->remove("__class_name__");
			$value = $this->decodeDict($value);
			$object = \Runtime\rtl::newInstance($class_name, \Runtime\Vector::from([$value]));
			return $object;
		}
		/* Create object by class name */
		if (\Runtime\rtl::exists(\Runtime\rtl::find_class($class_name)) && \Runtime\rtl::is_instanceof($class_name, "Runtime.BaseObject"))
		{
			return $this->createObject($value, $object_value, $create);
		}
		return $this->decodeDict($value);
	}
	/**
	 * Decode item from primitive data
	 */
	function decodeItem($value, $object_value=null, $create=null)
	{
		if ($value === null)
		{
			return null;
		}
		if (\Runtime\rtl::isScalarValue($value))
		{
			return $value;
		}
		if ($value instanceof \Runtime\BaseObject)
		{
			return $value;
		}
		/* Decode object */
		if ($this->allowObjects() && $value instanceof \Runtime\Dict && ($value->has("__class_name__") || $create))
		{
			return $this->decodeObject($value, $object_value, $create);
		}
		return $this->decodeItems($value, $object_value);
	}
	/**
	 * Decode items
	 */
	function decodeItems($value, $object_value=null, $create=null)
	{
		/* Decode Collection */
		if ($value instanceof \Runtime\Collection)
		{
			return $this->decodeCollection($value, $object_value, $create);
		}
		else if ($value instanceof \Runtime\Dict)
		{
			return $this->decodeDict($value, $object_value, $create);
		}
		return null;
	}
	/**
	 * Encode object
	 */
	function encodeObject($value)
	{
		$new_value = null;
		/* Get new value */
		if ($value instanceof \Runtime\BaseStruct)
		{
			$new_value = $value->toMap();
		}
		else
		{
			$new_value = \Runtime\Map::from([]);
		}
		/* Add class_name */
		if ($this->allowObjects())
		{
			$new_value->set("__class_name__", $value::getClassName());
		}
		/* Get callback */
		$callback = null;
		if ($this->callback_name != null)
		{
			$callback = new \Runtime\Callback($value, $this->callback_name);
			if ($callback->exists())
			{
				$callback = null;
			}
		}
		/* Apply object serialize */
		if ($callback)
		{
			\Runtime\rtl::apply($callback, \Runtime\Vector::from([$this,$new_value]));
		}
		else if ($value instanceof \Runtime\SerializeInterface)
		{
			$value->serialize($this, $new_value);
		}
		return $new_value;
	}
	/**
	 * Encode date
	 */
	function encodeDate($value)
	{
		$value = $value->toMap();
		if ($this->allowObjects())
		{
			$value->set("__class_name__", "Runtime.Date");
		}
		return $value;
	}
	/**
	 * Encode date time
	 */
	function encodeDateTime($value)
	{
		$value = $value->toMap();
		if ($this->allowObjects())
		{
			$value->set("__class_name__", "Runtime.DateTime");
		}
		return $value;
	}
	/**
	 * Encode collection
	 */
	function encodeCollection($value)
	{
		$new_value = \Runtime\Vector::from([]);
		for ($i = 0; $i < $value->count(); $i++)
		{
			$item = $value->get($i);
			$new_item = $this->encodeItem($item);
			$new_value->push($new_item);
		}
		return $new_value;
	}
	/**
	 * Encode dict
	 */
	function encodeDict($value)
	{
		$new_value = \Runtime\Map::from([]);
		$value->each(function ($item, $key) use (&$new_value)
		{
			$new_item = $this->encodeItem($item);
			$new_value->set($key, $new_item);
		});
		return $new_value;
	}
	/**
	 * Encode item to primitive data
	 */
	function encodeItem($value)
	{
		if ($value === null)
		{
			return null;
		}
		if (\Runtime\rtl::isScalarValue($value))
		{
			return $value;
		}
		/* Encode Collection or Dict */
		if ($value instanceof \Runtime\Collection)
		{
			return $this->encodeCollection($value);
		}
		if ($value instanceof \Runtime\Dict)
		{
			return $this->encodeDict($value);
		}
		/* Encode Object */
		if ($value instanceof \Runtime\Date)
		{
			return $this->encodeDate($value);
		}
		else if ($value instanceof \Runtime\DateTime)
		{
			return $this->encodeDateTime($value);
		}
		else if ($value instanceof \Runtime\BaseObject)
		{
			return $this->encodeObject($value);
		}
		return null;
	}
	/**
	 * Export object to data
	 */
	function encode($object)
	{
		$this->setFlag(static::ENCODE);
		$res = $this->encodeItem($object);
		$this->removeFlag(static::ENCODE);
		return $res;
	}
	/**
	 * Import from object
	 */
	function decode($object)
	{
		$this->setFlag(static::DECODE);
		$res = $this->decodeItem($object);
		$this->removeFlag(static::DECODE);
		return $res;
	}
	/**
	 * Copy object
	 */
	static function copy($obj)
	{
		$serializer = \Runtime\rtl::newInstance(static::getClassName());
		$serializer->setFlag(static::ALLOW_OBJECTS);
		$encoded = $serializer->encode($obj);
		return $serializer->decode($encoded);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->flags = 0;
		$this->callback_name = null;
	}
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Serializer";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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