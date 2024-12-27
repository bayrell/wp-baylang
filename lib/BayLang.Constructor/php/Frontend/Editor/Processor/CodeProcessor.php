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
namespace BayLang\Constructor\Frontend\Editor\Processor;
class CodeProcessor extends \Runtime\BaseObject
{
	public $page_model;
	public $code;
	function __construct($page_model)
	{
		parent::__construct();
		$this->page_model = $page_model;
	}
	/**
	 * Is component
	 */
	static function isComponent($tag_name)
	{
		$ch1 = \Runtime\rs::substr($tag_name, 0, 1);
		$ch2 = \Runtime\rs::upper($ch1);
		return $ch1 == $ch2;
	}
	/**
	 * Setup op code
	 */
	function setupOpCode($code)
	{
		$this->code = $code;
		$this->class_name = "";
		$this->class_namespace = "";
		if (!$this->code)
		{
			return ;
		}
		/* Setup component class name */
		for ($i = 0; $i < $this->code->items->count(); $i++)
		{
			$item = $this->code->items->get($i);
			if ($item instanceof \BayLang\OpCodes\OpNamespace)
			{
				$this->class_namespace = $item->name;
			}
			if ($item instanceof \BayLang\OpCodes\OpDeclareClass)
			{
				$this->class_name = $item->name;
			}
		}
	}
	/**
	 * Returns full class name
	 */
	function getComponentFullClassName()
	{
		return ($this->class_namespace != "") ? ($this->class_namespace . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($this->class_name)) : ($this->class_name);
	}
	/**
	 * Returns module class name
	 */
	function getModuleClassName($widget_name)
	{
		if (!static::isComponent($widget_name))
		{
			return null;
		}
		if (!$this->code)
		{
			return null;
		}
		if (!$this->code->uses->has($widget_name))
		{
			return $widget_name;
		}
		return $this->code->uses->get($widget_name);
	}
	/**
	 * Returns components
	 */
	function getComponents()
	{
		return $this->code->uses->values();
	}
	/**
	 * Add module
	 */
	function addModule($widget_name, $alias_name="", $is_component=false)
	{
		if ($alias_name == "")
		{
			$widget_name_arr = \Runtime\rs::split(".", $widget_name);
			$alias_name = $widget_name_arr->last();
		}
		if (!$this->code->hasModule($alias_name) || $alias_name == "")
		{
			$this->code->addModule($widget_name, $alias_name, $is_component);
		}
		return $alias_name;
	}
	/**
	 * Returns function
	 */
	function findFunction($function_name)
	{
		if (!$this->code)
		{
			return null;
		}
		$op_code_class = $this->code->findClass();
		if (!$op_code_class)
		{
			return null;
		}
		$op_code = $op_code_class->findFunction($function_name);
		return $op_code;
	}
	/**
	 * Create parser
	 */
	function createParser()
	{
		/* Setup parser params */
		$params = \Runtime\Map::from(["current_namespace_name"=>$this->class_namespace,"current_class_name"=>$this->class_name,"uses"=>$this->code->uses]);
		/* Create new instance */
		$parser = new \BayLang\LangBay\ParserBay();
		$parser = $parser::reset($parser);
		if ($params->has("current_namespace_name"))
		{
			$parser = \Runtime\rtl::setAttr($parser, ["current_namespace_name"], $params->get("current_namespace_name"));
		}
		if ($params->has("current_class_name"))
		{
			$parser = \Runtime\rtl::setAttr($parser, ["current_class_name"], $params->get("current_class_name"));
		}
		if ($params->has("uses"))
		{
			$parser = \Runtime\rtl::setAttr($parser, ["uses"], $params->get("uses"));
		}
		return $parser;
	}
	/**
	 * Create translator
	 */
	function createTranslator()
	{
		/* New instance */
		$t = new \BayLang\LangES6\TranslatorES6();
		/* Reset translator */
		$t = \BayLang\LangES6\TranslatorES6::reset($t);
		if ($this->code->uses != null)
		{
			$t = \Runtime\rtl::setAttr($t, ["modules"], $this->code->uses);
		}
		/* Enable debug */
		$t = $t->setFlag("DEBUG_COMPONENT", true);
		/* Return */
		return $t;
	}
	/**
	 * Build code
	 */
	function buildContent()
	{
		$t = new \BayLang\LangBay\TranslatorBay();
		$res = $t::translate($t, $this->code, false);
		return $res->get(1);
	}
	/**
	 * Returns op code value
	 */
	static function getOpCodeByValue($value)
	{
		if (\Runtime\rtl::isString($value))
		{
			return new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>$value]));
		}
		else if ($value instanceof \Runtime\Dict)
		{
			$values = \Runtime\Vector::from([]);
			$keys = $value->keys();
			for ($i = 0; $i < $keys->count(); $i++)
			{
				$key = $keys->get($i);
				$values->push(new \BayLang\OpCodes\OpDictPair(\Runtime\Map::from(["key"=>$key,"value"=>static::getOpCodeByValue($value->get($key))])));
			}
			return new \BayLang\OpCodes\OpDict(\Runtime\Map::from(["values"=>$values]));
		}
		else if (\Runtime\rtl::is_instanceof($value, "Runtime.Collection"))
		{
			return new \BayLang\OpCodes\OpCollection(\Runtime\Map::from(["values"=>$value->map(function ($value)
			{
				return static::getOpCodeByValue($value);
			})]));
		}
		return null;
	}
	/**
	 * Returns op code value
	 */
	static function getValueFromOpCode($op_attr)
	{
		if ($op_attr instanceof \BayLang\OpCodes\OpString)
		{
			return $op_attr->value;
		}
		else if ($op_attr instanceof \BayLang\OpCodes\OpDict)
		{
			$result = \Runtime\Map::from([]);
			for ($i = 0; $i < $op_attr->values->count(); $i++)
			{
				$op_dict_item = $op_attr->values->get($i);
				$key = $op_dict_item->key;
				$item = $op_dict_item->value;
				$result->set($key, static::getValueFromOpCode($item));
			}
			return $result;
		}
		else if ($op_attr instanceof \BayLang\OpCodes\OpCollection)
		{
			return $op_attr->values->map(function ($value)
			{
				return static::getValueFromOpCode($value);
			});
		}
		return null;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->page_model = null;
		$this->code = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor";
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