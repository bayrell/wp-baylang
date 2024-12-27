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
namespace BayLang\Helper;
class RouteProcessor extends \Runtime\BaseObject
{
	public $module;
	public $op_code;
	function __construct($module)
	{
		parent::__construct();
		$this->module = $module;
	}
	/**
	 * Returns file path
	 */
	function getRoutesFilePath()
	{
		return \Runtime\fs::join(\Runtime\Vector::from([$this->module->getSourceFolderPath(),"Routes.bay"]));
	}
	/**
	 * Load routes
	 */
	function load()
	{
		$file_path = $this->getRoutesFilePath();
		/* Read file */
		if (!\Runtime\fs::isFile($file_path))
		{
			return ;
		}
		$content = \Runtime\fs::readFile($file_path);
		try
		{
			
			/* Parse file */
			$parser = new \BayLang\LangBay\ParserBay();
			$res = $parser::parse($parser, $content);
			$op_code = $res->get(1);
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserUnknownError)
			{
				$e = $_ex;
			}
			else
			{
				throw $_ex;
			}
		}
	}
	/**
	 * Returns routes
	 */
	function getRoutes()
	{
		$class_op_code = static::findClass($this->op_code);
		if (!$class_op_code)
		{
			return \Runtime\Vector::from([]);
		}
		$routes_op_code = static::findFunction($class_op_code);
		if (!$routes_op_code)
		{
			return \Runtime\Vector::from([]);
		}
		return static::findRoutes($routes_op_code);
	}
	/**
	 * Find class
	 */
	static function findClass($op_code)
	{
		return ($op_code instanceof \BayLang\OpCodes\OpModule) ? ($op_code->items->findItem(\Runtime\lib::isInstance("BayLang.OpCodes.OpDeclareClass"))) : (null);
	}
	/**
	 * Find function
	 */
	static function findFunction($op_code)
	{
		return ($op_code instanceof \BayLang\OpCodes\OpDeclareClass) ? ($op_code->items->findItem(function ($op_code)
		{
			return $op_code instanceof \BayLang\OpCodes\OpDeclareFunction && $op_code->name == "getRoutes";
		})) : (null);
	}
	/**
	 * Find expression
	 */
	static function findExpression($op_code)
	{
		if ($op_code->expression != null)
		{
			return $op_code->expression;
		}
		if (!($op_code->items instanceof \BayLang\OpCodes\OpItems))
		{
			return null;
		}
		$op_code_item = $op_code->items->items->get(0);
		if (!($op_code_item instanceof \BayLang\OpCodes\OpReturn))
		{
			return null;
		}
		return $op_code_item->expression;
	}
	/**
	 * Find routes
	 */
	static function findRoutes($op_code)
	{
		$expression = static::findExpression($op_code);
		if ($expression == null)
		{
			return \Runtime\Vector::from([]);
		}
		if (!($expression instanceof \BayLang\OpCodes\OpCollection))
		{
			return \Runtime\Vector::from([]);
		}
		if ($expression->values == null)
		{
			return \Runtime\Vector::from([]);
		}
		return $expression->values->filter(function ($op_code)
		{
			return static::isRoute($op_code);
		})->map(function ($op_code)
		{
			$res = \Runtime\Map::from([]);
			$values = $op_code->args->get(0)->values;
			for ($i = 0; $i < $values->count(); $i++)
			{
				$value = $values->get($i);
				if ($value->value instanceof \BayLang\OpCodes\OpString)
				{
					$res->set($value->key, $value->value->value);
				}
			}
			return $res;
		});
	}
	/**
	 * Returns true if op_code is route
	 */
	static function isRoute($op_code)
	{
		if (!($op_code instanceof \BayLang\OpCodes\OpNew))
		{
			return false;
		}
		if (!($op_code->value instanceof \BayLang\OpCodes\OpTypeIdentifier))
		{
			return false;
		}
		if ($op_code->value->entity_name->names->count() != 1)
		{
			return false;
		}
		if ($op_code->value->entity_name->names->get(0) != "RouteInfo")
		{
			return false;
		}
		if ($op_code->args->count() != 1)
		{
			return false;
		}
		if (!($op_code->args->get(0) instanceof \BayLang\OpCodes\OpDict))
		{
			return false;
		}
		return true;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->module = null;
		$this->op_code = null;
	}
	static function getNamespace()
	{
		return "BayLang.Helper";
	}
	static function getClassName()
	{
		return "BayLang.Helper.RouteProcessor";
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