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
class Widget extends \Runtime\BaseObject implements \BayLang\Helper\CacheInterface, \Runtime\SerializeInterface
{
	public $module;
	public $kind;
	public $name;
	public $model;
	public $component;
	public $component_name;
	public $model_content;
	public $component_content;
	public $model_error;
	public $component_error;
	function __construct($module)
	{
		parent::__construct();
		$this->module = $module;
	}
	/**
	 * Is model based widget
	 */
	function isModelBased()
	{
		return \Runtime\rs::substr($this->name, -5) == "Model";
	}
	/**
	 * Process project cache
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "kind", $data);
		$serializer->process($this, "name", $data);
	}
	/**
	 * Returns project
	 */
	function getProject()
	{
		return ($this->module) ? ($this->module->getProject()) : (null);
	}
	/**
	 * Load widget
	 */
	function load($is_force=false)
	{
		$is_loaded = false;
		if (!$is_force)
		{
			$is_loaded = $this->readCache();
		}
		if (!$is_loaded)
		{
			/* Load widget */
			$this->loadWidget();
			/* Save to cache */
			$this->saveCache();
		}
	}
	/**
	 * Read widget from cache
	 */
	function readCache()
	{
		if ($this->isModelBased())
		{
			$this->loadModelFromCache();
			$this->loadComponentFromCache();
			return $this->model !== null && $this->component !== null;
		}
		$this->loadComponentFromCache();
		return $this->component !== null;
	}
	/**
	 * Save widget to cache
	 */
	function saveCache()
	{
	}
	/**
	 * Load widget from file system
	 */
	function loadWidget()
	{
		if ($this->isModelBased())
		{
			$this->loadModelFromFile();
		}
		$this->loadComponentFromFile();
	}
	/** Model **/
	/**
	 * Returns model name
	 */
	function getModelName()
	{
		return ($this->isModelBased()) ? ($this->name) : ("");
	}
	/**
	 * Returns model path
	 */
	function getModelPath()
	{
		if (!$this->isModelBased())
		{
			return "";
		}
		return $this->module->resolveClassName($this->getModelName());
	}
	/**
	 * Returns model content
	 */
	function getModelContent()
	{
		return $this->model_content;
	}
	/**
	 * Read model op_code
	 */
	function loadModelFromCache()
	{
	}
	/**
	 * Read model op_code
	 */
	function loadModelFromFile()
	{
		if ($this->model_content !== null)
		{
			return ;
		}
		$this->model_content = "";
		$file_path = $this->getModelPath();
		if (!\Runtime\fs::isFile($file_path))
		{
			return ;
		}
		$this->model_content = \Runtime\fs::readFile($file_path);
		/* Parse model */
		try
		{
			
			/* Parse file */
			$parser = new \BayLang\LangBay\ParserBay();
			$res = $parser::parse($parser, $this->model_content);
			$this->model = $res->get(1);
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserUnknownError)
			{
				$e = $_ex;
				$this->model = false;
				$this->model_error = $e;
			}
			else
			{
				throw $_ex;
			}
		}
		/* Get component name */
		$this->component_name = $this->getComponentNameFromModel();
	}
	/**
	 * Returns model op code
	 */
	function getModelOpCode()
	{
		return $this->model;
	}
	/** Component **/
	/**
	 * Returns component name from model
	 */
	function getComponentNameFromModel()
	{
		if ($this->model == null)
		{
			return "";
		}
		$op_code_class = static::findClass($this->model);
		$op_code_assign = static::findComponentName($op_code_class);
		return static::extractComponentName($this->model, $op_code_assign);
	}
	/**
	 * Returns component name
	 */
	function getComponentName()
	{
		if (!$this->isModelBased())
		{
			return $this->name;
		}
		return $this->component_name;
	}
	/**
	 * Returns component path
	 */
	function getComponentPath()
	{
		return $this->module->resolveClassName($this->getComponentName());
	}
	/**
	 * Returns component content
	 */
	function getComponentContent()
	{
		return $this->component_content;
	}
	/**
	 * Read component op_code
	 */
	function loadComponentFromCache()
	{
	}
	/**
	 * Read component op_code
	 */
	function loadComponentFromFile()
	{
		if ($this->component_content !== null)
		{
			return ;
		}
		$this->component_content = "";
		$file_path = $this->getComponentPath();
		if (!\Runtime\fs::isFile($file_path))
		{
			return ;
		}
		$this->component_content = \Runtime\fs::readFile($file_path);
		/* Parse component */
		try
		{
			
			/* Parse file */
			$parser = new \BayLang\LangBay\ParserBay();
			$res = $parser::parse($parser, $this->component_content);
			$this->component = $res->get(1);
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserUnknownError)
			{
				$e = $_ex;
				$this->component = false;
				$this->component_error = $e;
			}
			else
			{
				throw $_ex;
			}
		}
	}
	/**
	 * Returns component op code
	 */
	function getComponentOpCode()
	{
		return $this->component;
	}
	/**
	 * Find class
	 */
	static function findClass($op_code)
	{
		return ($op_code instanceof \BayLang\OpCodes\OpModule) ? ($op_code->items->findItem(\Runtime\lib::isInstance("BayLang.OpCodes.OpDeclareClass"))) : (null);
	}
	/**
	 * Find component name
	 */
	static function findComponentName($op_code)
	{
		if ($op_code == null)
		{
			return null;
		}
		if (!($op_code instanceof \BayLang\OpCodes\OpDeclareClass))
		{
			return null;
		}
		$items = $op_code->items->filter(function ($op_code)
		{
			return $op_code instanceof \BayLang\OpCodes\OpAssign;
		})->map(function ($op_code)
		{
			return $op_code->values;
		})->flatten();
		$op_code_component = $items->findItem(function ($op_code)
		{
			return $op_code->var_name == "component";
		});
		return $op_code_component;
	}
	/**
	 * Extract component name
	 */
	static function extractComponentName($component, $op_code)
	{
		if ($op_code == null)
		{
			return null;
		}
		if ($op_code->expression instanceof \BayLang\OpCodes\OpClassOf)
		{
			$class_name = $op_code->expression->entity_name->names->get(0);
			return $component->uses->get($class_name);
		}
		else if ($op_code->expression instanceof \BayLang\OpCodes\OpString)
		{
			return $op_code->expression->value;
		}
		return "";
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->module = null;
		$this->kind = "";
		$this->name = "";
		$this->model = null;
		$this->component = null;
		$this->component_name = "";
		$this->model_content = null;
		$this->component_content = null;
		$this->model_error = null;
		$this->component_error = null;
	}
	static function getNamespace()
	{
		return "BayLang.Helper";
	}
	static function getClassName()
	{
		return "BayLang.Helper.Widget";
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