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
class WidgetProcessor extends \Runtime\BaseObject
{
	public $module;
	public $op_code;
	public $is_loaded;
	function __construct($module)
	{
		parent::__construct();
		$this->module = $module;
	}
	/**
	 * Returns file path
	 */
	function getModuleDescriptionFilePath()
	{
		return \Runtime\fs::join(\Runtime\Vector::from([$this->module->getSourceFolderPath(),"ModuleDescription.bay"]));
	}
	/**
	 * Load widgets
	 */
	function load($force=false)
	{
		if ($this->is_loaded && !$force)
		{
			return ;
		}
		$file_path = $this->getModuleDescriptionFilePath();
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
			$this->op_code = $res->get(1);
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
		$this->is_loaded = true;
	}
	/**
	 * Save op_code
	 */
	function save()
	{
		$file_path = $this->getModuleDescriptionFilePath();
		/* Translate */
		$translator = new \BayLang\LangBay\TranslatorBay();
		$res = $translator::translate($translator, $this->op_code);
		$content = $res->get(1);
		/* Save content */
		\Runtime\fs::saveFile($file_path, $content);
	}
	/**
	 * Add widget
	 */
	function addWidget($widget_name)
	{
		$expression = $this->getEntityExpression();
		if (!$expression)
		{
			return ;
		}
		/* Create op_code */
		$op_code_widget = new \BayLang\OpCodes\OpNew(\Runtime\Map::from(["args"=>\Runtime\Vector::from([new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>$widget_name]))]),"value"=>new \BayLang\OpCodes\OpTypeIdentifier(\Runtime\Map::from(["entity_name"=>new \BayLang\OpCodes\OpEntityName(\Runtime\Map::from(["names"=>\Runtime\Vector::from(["Widget"])]))]))]));
		/* Add widget */
		$expression->values->push($op_code_widget);
	}
	/**
	 * Remove widget
	 */
	function removeWidget($widget_name)
	{
		$expression = $this->getEntityExpression();
		if (!$expression)
		{
			return ;
		}
		for ($i = $expression->values->count() - 1; $i >= 0; $i--)
		{
			$op_code = $expression->values->get($i);
			if (!static::isWidget($op_code))
			{
				continue;
			}
			if ($op_code->args->get(0)->value != $widget_name)
			{
				continue;
			}
			$expression->values->remove($i);
		}
	}
	/**
	 * Get widgets
	 */
	function getEntityExpression()
	{
		$op_code = $this->op_code;
		if (!($op_code instanceof \BayLang\OpCodes\OpModule))
		{
			return null;
		}
		$class_op_code = $op_code->findClass();
		if (!$class_op_code)
		{
			return null;
		}
		$entities_op_code = $class_op_code->findFunction("entities");
		if (!$entities_op_code)
		{
			return null;
		}
		$expression = $entities_op_code->getExpression();
		if ($expression == null)
		{
			return null;
		}
		if (!($expression instanceof \BayLang\OpCodes\OpCollection))
		{
			return null;
		}
		if ($expression->values == null)
		{
			return null;
		}
		return $expression;
	}
	/**
	 * Find widgets
	 */
	function getWidgets()
	{
		$expression = $this->getEntityExpression();
		if (!$expression)
		{
			return \Runtime\Vector::from([]);
		}
		return $expression->values->filter(function ($op_code)
		{
			return static::isWidget($op_code);
		})->map(function ($op_code)
		{
			return $op_code->args->get(0)->value;
		});
	}
	/**
	 * Returns true if op_code is widget
	 */
	static function isWidget($op_code)
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
		if ($op_code->value->entity_name->names->get(0) != "Widget")
		{
			return false;
		}
		if ($op_code->args->count() != 1)
		{
			return false;
		}
		if (!($op_code->args->get(0) instanceof \BayLang\OpCodes\OpString))
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
		$this->is_loaded = false;
	}
	static function getNamespace()
	{
		return "BayLang.Helper";
	}
	static function getClassName()
	{
		return "BayLang.Helper.WidgetProcessor";
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