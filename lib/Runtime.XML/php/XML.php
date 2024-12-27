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
namespace Runtime\XML;
class XML
{
	public $xml;
	public $errors;
	/**
	 * Load xml
	 */
	static function loadXml($xml_str)
	{
		$res = static::newInstance();
		$old_value = libxml_use_internal_errors(true);
		libxml_clear_errors();
		$xml = simplexml_load_string(
			$xml_str, \SimpleXMLElement::class, LIBXML_NOCDATA | LIBXML_NONET
		);
		$errors = new \Runtime\Vector();
		foreach (libxml_get_errors() as $error)
		{
			$errors->push( trim($error->message) );
		}
		libxml_use_internal_errors($old_value);
		
		$res->xml = $xml;
		$res->errors = $errors->toCollection();
		return $res;
	}
	/**
	 * Returns new instance
	 */
	static function newInstance()
	{
		return \Runtime\rtl::newInstance(static::getClassName());
	}
	/**
	 * Returns true if XML is exists
	 */
	function exists()
	{
		if ($this->xml == null)
		{
			return false;
		}
		return true;
	}
	/**
	 * Return current name
	 */
	function getName()
	{
		$res = "";
		if ($this->xml != null)
		{
			$res = $this->xml->getName();
		}
		return $res;
	}
	/**
	 * Return items by name
	 */
	function get($name)
	{
		$res = [];
		
		if ($this->xml != null)
		{
			$xml = $this->xml->$name;
			for ($i=0; $i<$xml->count(); $i++)
			{
				$item = static::newInstance();
				$item->xml = $xml[$i];
				$res[] = $item;
			}
		}
		
		return \Runtime\Vector::from($res);
		return new \Runtime\Vector();
	}
	/**
	 * Get value
	 */
	function value($trim=true)
	{
		$value = "";
		if ($this->xml != null)
		{
			$value = (string)$this->xml;
		}
		if ($trim)
		{
			$value = \Runtime\rs::trim($value);
		}
		return $value;
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		if ($value != "")
		{
			$item = dom_import_simplexml($this->xml);
			$item->nodeValue = $value;
		}
	}
	/**
	 * Returns childs count
	 */
	function count()
	{
		if ($this->xml != null)
		{
			return $this->xml->children()->count();
		}
		return 0;
	}
	/**
	 * Return items
	 */
	function childs()
	{
		$arr = [];
		$pos = 0;
		
		if ($this->xml != null)
		{
			foreach ($this->xml as $child)
			{
				$item = static::newInstance();
				$item->xml = $child;
				$arr[] = $item;
				$pos++;
			}
		}
		
		return \Runtime\Vector::from($arr);
		return new \Runtime\Vector();
	}
	/**
	 * Remove childs
	 */
	function removeChilds()
	{
		$items = $this->childs();
		for ($i = 0; $i < $items->count(); $i++)
		{
			$items->get($i)->remove();
		}
	}
	/**
	 * Get attribute
	 */
	function attr($key, $trim=true)
	{
		if ($this->xml != null)
		{
			$attrs = $this->xml->attributes();
			if (isset($attrs[$key]))
			{
				$value = (string)$attrs[$key];
				if ($trim) $value = \Runtime\rs::trim($value);
				return $value;
			}
		}
		return null;
	}
	/**
	 * Get attribute
	 */
	function attributes($trim=true)
	{
		$items = new \Runtime\Map();
		if ($this->xml != null)
		{
			$attrs = $this->xml->attributes();
			foreach ($attrs as $key => $value)
			{
				if ($trim)
				{
					$items->set($key, \Runtime\rs::trim((string)$value));
				}
				else
				{
					$items->set($key, (string)$value);
				}
			}
		}
		return $items;
	}
	/**
	 * Add attribute
	 */
	function addAttribute($key, $value)
	{
		if ($this->xml != null)
		{
			$this->xml->addAttribute($key, $value);
		}
	}
	function addAttr($key, $value)
	{
		return $this->addAttribute($key, $value);
	}
	/**
	 * Remove attribute
	 */
	function removeAttribute($key)
	{
		if ($this->xml != null)
		{
			$dom = dom_import_simplexml($this->xml);
			$dom->removeAttribute($key);
		}
	}
	function removeAttr($key)
	{
		return $this->removeAttribute($key);
	}
	/**
	 * Add attributes
	 */
	function addAttributes($attrs)
	{
		$attrs_keys = $attrs->keys();
		for ($i = 0; $i < $attrs_keys->count(); $i++)
		{
			$key = \Runtime\rtl::attr($attrs_keys, $i);
			$value = $attrs->get($key);
			$this->addAttribute($key, $value);
		}
	}
	/**
	 * Remove attributes
	 */
	function removeAttributes()
	{
		$attrs = $this->attributes();
		$attrs_keys = $attrs->keys();
		if ($this->xml != null)
		{
			$dom = dom_import_simplexml($this->xml);
			for ($i=0; $i<$attrs_keys->count(); $i++)
			{
				$key = $attrs_keys->get($i);
				$dom->removeAttribute($key);
			}
		}
	}
	/**
	 * Remove current element
	 */
	function remove()
	{
		if ($this->xml != null)
		{
			$item = dom_import_simplexml($this->xml);
			$item->parentNode->removeChild($item);
		}
	}
	/**
	 * Append XML
	 */
	function append($item)
	{
		$name = $item->getName();
		$content = $item->value();
		$child = static::newInstance();
		$xml = $this->xml->addChild($name, $content);
		$child->xml = $xml;
		/* Append childs */
		$child->appendItems($item->childs());
		/* Add attrs */
		$child->addAttributes($item->attributes());
		return $child;
	}
	/**
	 * Prepend XML
	 */
	function prepend($item)
	{
		$name = $item->getName();
		$content = $item->value();
		$child = static::newInstance();
		$dom = dom_import_simplexml($this->xml);
		$xml_elem = $dom->ownerDocument->createElement($name, $content);
		$xml = $dom->insertBefore($xml_elem, $dom->firstChild);
		$child->xml = simplexml_import_dom($xml);
		/* Append childs */
		$child->appendItems($item->childs());
		/* Add attrs */
		$child->addAttributes($item->attributes());
		return $child;
	}
	/**
	 * Append childs from XML
	 */
	function appendItems($items)
	{
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$this->append($item);
		}
	}
	/**
	 * Prepend childs from XML
	 */
	function prependItems($items)
	{
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$this->prepend($item);
		}
	}
	/**
	 * Patch XML with operation
	 */
	function patch($operation)
	{
		$type = $operation->attr("type");
		$provider = \Runtime\rtl::getContext()->provider("Runtime.XML.PatcherProvider");
		$patcher = $provider->getPatcher($type);
		if ($patcher)
		{
			$patcher->patch($this, $operation);
		}
	}
	/**
	 * Patch XML with operation
	 */
	function xpath($path)
	{
		$res = new \Runtime\Vector();
		$items = $this->xml->xpath($path);
		foreach ($items as $xml)
		{
			$item = static::newInstance();
			$item->xml = $xml;
			$res->push($item);
		}
		return $res;
	}
	/**
	 * To string
	 */
	function toString($params=null)
	{
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($params, "indent"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("bool", true));
		$indent = $__v0->value();
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($params, "wrap"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("bool", false));
		$wrap = $__v0->value();
		$xml_str = "";
		if ($params != null) $params = $params->_map;
		if ($params == null) $params = [];
		if (!isset($params['indent'])) $params['indent'] = true;
		if (!isset($params['wrap'])) $params['wrap'] = false;
		if (!isset($params['input-xml'])) $params['input-xml'] = true;
		$xml_str = $this->xml->asXml();
		$xml_str = tidy_repair_string($xml_str, $params);
		return $xml_str;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		$this->xml = null;
		$this->errors = null;
	}
	static function getNamespace()
	{
		return "Runtime.XML";
	}
	static function getClassName()
	{
		return "Runtime.XML.XML";
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