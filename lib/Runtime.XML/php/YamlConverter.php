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
class YamlConverter
{
	public $xml;
	public $variables;
	function __construct($xml, $variables=null)
	{
		$this->xml = $xml;
		$this->variables = $variables;
	}
	/**
	 * Patch variables
	 */
	function patchVariables($data)
	{
		if ($this->variables == null)
		{
			return $data;
		}
		$variables_keys = $this->variables->keys();
		for ($i = 0; $i < $variables_keys->count(); $i++)
		{
			$var_name = $variables_keys->get($i);
			$var_value = $this->variables->get($var_name);
			$data = \Runtime\rs::replace($var_name, $var_value, $data);
		}
		return $data;
	}
	/**
	 * Convert xml to dict
	 */
	function xmlToDict($xml)
	{
		$res = new \Runtime\Map();
		$items = $xml->childs();
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$attrs = $item->attributes();
			$key = $item->getName();
			$value = $item->value();
			$key = $this->patchVariables($key);
			$type = $attrs->get("type");
			$trim = $attrs->get("trim");
			$is_array = $attrs->get("array") == "true";
			if ($type == "int" || $type == "integer")
			{
				$value = \Runtime\rtl::toInt($value);
			}
			else if ($type == "bool" || $type == "boolean")
			{
				$value = \Runtime\rtl::toBool($value);
			}
			else if ($type == "map")
			{
				$value = new \Runtime\Map();
			}
			else
			{
				$value = $this->patchVariables($value);
			}
			if ($item->childs()->count() > 0)
			{
				$value = $this->xmlToDict($item);
			}
			if ($res->has($key) || $is_array)
			{
				$exists_value = $res->get($key);
				if (!($exists_value instanceof \Runtime\Vector))
				{
					$exists_value = new \Runtime\Vector();
					if ($res->has($key))
					{
						$exists_value = $exists_value->concat($res->get($key));
					}
				}
				$exists_value->push($value);
				$value = $exists_value;
			}
			if ($value instanceof \Runtime\Dict)
			{
				$value = $value->toDict();
			}
			else if ($value instanceof \Runtime\Vector)
			{
				$value = $value->toCollection();
			}
			$res->set($key, $value);
		}
		return $res;
	}
	/**
	 * Convert xml to dict
	 */
	function toDict()
	{
		return $this->xmlToDict($this->xml);
	}
	/**
	 * Convert XML to Yaml
	 */
	function convert($params=null)
	{
		$yaml = "";
		$data = $this->toDict($this->xml);
		if ($params == null)
		{
			$params = \Runtime\Map::from([]);
		}
		$indent_spaces = $params->get("indent-spaces", 2);
		$serializer = new \Runtime\SerializerNative();
		$serializer->removeFlag(\Runtime\Serializer::ALLOW_OBJECTS);
		$data = $serializer->encode($data);
		$yaml = \Symfony\Component\Yaml\Yaml::dump(
			$data, 10, $indent_spaces,
			\Symfony\Component\Yaml\Yaml::DUMP_OBJECT_AS_MAP
		);
		return $yaml;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		$this->xml = null;
		$this->variables = null;
	}
	static function getNamespace()
	{
		return "Runtime.XML";
	}
	static function getClassName()
	{
		return "Runtime.XML.YamlConverter";
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