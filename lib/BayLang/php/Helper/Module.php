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
class Module extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	public $project;
	public $is_exists;
	public $path;
	public $src_path;
	public $dest_path;
	public $name;
	public $submodules;
	public $allow;
	public $assets;
	public $required_modules;
	public $routes;
	public $groups;
	public $widgets;
	public $exclude;
	function __construct($project, $module_path)
	{
		parent::__construct();
		$this->path = $module_path;
		$this->project = $project;
	}
	/**
	 * Read project from folder
	 */
	static function readModule($project, $path)
	{
		$module = new \BayLang\Helper\Module($project, $path);
		$module->init();
		if (!$module->exists())
		{
			return null;
		}
		return $module;
	}
	/**
	 * Init module
	 */
	function init()
	{
		$this->is_exists = false;
		if (!\Runtime\fs::isFolder($this->path))
		{
			return false;
		}
		/* Module json file */
		$module_json_path = $this->path . \Runtime\rtl::toStr("/") . \Runtime\rtl::toStr("module.json");
		if (!\Runtime\fs::isFile($module_json_path))
		{
			return false;
		}
		/* Read file */
		$content = \Runtime\fs::readFile($module_json_path);
		$module_info = \Runtime\rtl::json_decode($content);
		if (!$module_info)
		{
			return false;
		}
		if (!$module_info->has("name"))
		{
			return false;
		}
		$this->is_exists = true;
		$this->name = $module_info->get("name");
		$this->dest_path = $module_info->get("dest");
		$this->src_path = $module_info->get("src");
		$this->allow = $module_info->get("allow");
		$this->assets = $module_info->get("assets");
		$this->groups = $module_info->get("groups");
		$this->required_modules = $module_info->get("require");
		$this->submodules = $module_info->get("modules");
		$this->exclude = $module_info->get("exclude");
		/* Load widgets */
		$this->widgets = \Runtime\Vector::from([]);
		if ($module_info->has("widgets"))
		{
			$widgets = $module_info->get("widgets");
			$this->widgets = $module_info->get("widgets")->map(function ($item)
			{
				$widget = new \BayLang\Helper\Widget($this);
				$widget->kind = $item->get("kind");
				$widget->name = $item->get("name");
				return $widget;
			});
		}
		return true;
	}
	/**
	 * Process project cache
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "is_exists", $data);
		$serializer->process($this, "assets", $data);
		$serializer->process($this, "groups", $data);
		$serializer->process($this, "name", $data);
		$serializer->process($this, "path", $data);
		$serializer->process($this, "routes", $data);
		$serializer->process($this, "dest_path", $data);
		$serializer->process($this, "src_path", $data);
		$serializer->process($this, "required_modules", $data);
		$serializer->process($this, "submodules", $data);
		$serializer->processItems($this, "widgets", $data, function ($widget)
		{
			return new \BayLang\Helper\Widget($this);
		});
	}
	/**
	 * Returns true if module is exists
	 */
	function exists()
	{
		return $this->is_exists;
	}
	/**
	 * Returns module path
	 */
	function getPath()
	{
		return $this->path;
	}
	/**
	 * Returns module name
	 */
	function getName()
	{
		return $this->name;
	}
	/**
	 * Returns routes
	 */
	function getRoutes()
	{
		return ($this->routes) ? ($this->routes) : (\Runtime\Vector::from([]));
	}
	/**
	 * Returns route by name
	 */
	function getRoute($route_name)
	{
		return $this->getRoutes()->findItem(\Runtime\lib::equalAttr("name", $route_name));
	}
	/**
	 * Returns widgets
	 */
	function getWidgets()
	{
		return ($this->widgets) ? ($this->widgets) : (\Runtime\Vector::from([]));
	}
	/**
	 * Returns widget by name
	 */
	function getWidget($widget_name)
	{
		return $this->getWidgets()->findItem(\Runtime\lib::equalAttr("name", $widget_name));
	}
	/**
	 * Returns source folder path
	 */
	function getSourceFolderPath()
	{
		return ($this->src_path) ? (\Runtime\fs::join(\Runtime\Vector::from([$this->getPath(),$this->src_path]))) : (null);
	}
	/**
	 * Returns dest folder path
	 */
	function getDestFolderPath($lang)
	{
		if (!$this->dest_path->has($lang))
		{
			return "";
		}
		return \Runtime\fs::join(\Runtime\Vector::from([$this->getPath(),$this->dest_path->get($lang)]));
	}
	/**
	 * Returns relative source path
	 */
	function getRelativeSourcePath($file_path)
	{
		$source_path = $this->getSourceFolderPath();
		if (!$source_path)
		{
			return null;
		}
		$source_path_sz = \Runtime\rs::strlen($source_path);
		if (\Runtime\rs::substr($file_path, 0, $source_path_sz) != $source_path)
		{
			return null;
		}
		return \Runtime\rs::addFirstSlash(\Runtime\rs::substr($file_path, $source_path_sz));
	}
	/**
	 * Returns true if module contains file
	 */
	function checkFile($file_full_path)
	{
		return \Runtime\rs::indexOf($file_full_path, $this->path) == 0;
	}
	/**
	 * Check allow list
	 */
	function checkAllow($file_name)
	{
		if (!$this->allow)
		{
			return false;
		}
		$success = false;
		for ($i = 0; $i < $this->allow->count(); $i++)
		{
			$file_match = $this->allow->get($i);
			if ($file_match == "")
			{
				continue;
			}
			$res = \Runtime\re::match($file_match, $file_name);
			/* Ignore */
			if (\Runtime\rs::charAt($file_match, 0) == "!")
			{
				if ($res)
				{
					$success = false;
				}
			}
			else
			{
				if ($res)
				{
					$success = true;
				}
			}
		}
		return $success;
	}
	/**
	 * Check exclude
	 */
	function checkExclude($relative_src_file_path)
	{
		if (!$this->exclude)
		{
			return false;
		}
		for ($i = 0; $i < $this->exclude->count(); $i++)
		{
			$file_match = $this->exclude->get($i);
			if ($file_match == "")
			{
				continue;
			}
			$file_match = \Runtime\re::replace("\\/", "\\/", $file_match);
			$res = \Runtime\re::match($file_match, $relative_src_file_path);
			if ($res)
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * Returns class name file path
	 */
	function resolveClassName($class_name)
	{
		/* Check if class name start with module name */
		$module_name_sz = \Runtime\rs::strlen($this->getName());
		if (\Runtime\rs::substr($class_name, 0, $module_name_sz) != $this->getName())
		{
			return "";
		}
		/* Remove module name from class name */
		$class_name = \Runtime\rs::substr($class_name, $module_name_sz);
		/* Return path to class name */
		$path = $this->getSourceFolderPath();
		$arr = \Runtime\rs::split(".", $class_name);
		$arr->prepend($path);
		return \Runtime\fs::join($arr) . \Runtime\rtl::toStr(".bay");
	}
	/**
	 * Resolve source path
	 */
	function resolveSourceFilePath($relative_src_file_path)
	{
		return \Runtime\fs::join(\Runtime\Vector::from([$this->getSourceFolderPath(),$relative_src_file_path]));
	}
	/**
	 * Resolve dest path
	 */
	function resolveDestFilePath($relative_src_file_path, $lang)
	{
		$dest_folder_path = $this->getDestFolderPath($lang);
		if ($dest_folder_path == "")
		{
			return "";
		}
		/* Get dest file path */
		$dest_file_path = \Runtime\fs::join(\Runtime\Vector::from([$dest_folder_path,$relative_src_file_path]));
		/* Resolve extension */
		if ($lang == "php")
		{
			$dest_file_path = \Runtime\re::replace("\\.bay\$", ".php", $dest_file_path);
			$dest_file_path = \Runtime\re::replace("\\.ui\$", ".php", $dest_file_path);
		}
		else if ($lang == "es6")
		{
			$dest_file_path = \Runtime\re::replace("\\.bay\$", ".js", $dest_file_path);
			$dest_file_path = \Runtime\re::replace("\\.ui\$", ".js", $dest_file_path);
		}
		else if ($lang == "nodejs")
		{
			$dest_file_path = \Runtime\re::replace("\\.bay\$", ".js", $dest_file_path);
			$dest_file_path = \Runtime\re::replace("\\.ui\$", ".js", $dest_file_path);
		}
		return $dest_file_path;
	}
	/**
	 * Returns true if module has group
	 */
	function hasGroup($group_name)
	{
		if (\Runtime\rs::substr($group_name, 0, 1) != "@")
		{
			return false;
		}
		$group_name = \Runtime\rs::substr($group_name, 1);
		if ($this->groups == null)
		{
			return false;
		}
		if ($this->groups->indexOf($group_name) == -1)
		{
			return false;
		}
		return true;
	}
	/**
	 * Returns true if this module contains in module list include groups
	 */
	function inModuleList($module_names)
	{
		for ($i = 0; $i < $module_names->count(); $i++)
		{
			$module_name = $module_names->get($i);
			if ($this->name == $module_name)
			{
				return true;
			}
			if ($this->hasGroup($module_name))
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * Rename module
	 */
	function rename($new_module_name)
	{
		return ;
		if (!$this->exists())
		{
			return ;
		}
		$new_file_name = \Runtime\rs::lower($new_module_name);
		$old_file_name = $this->file_name;
		/* Set new module name */
		$this->info->set("name", $new_module_name);
		/* Save file */
		$module_path = "/data/projects/" . \Runtime\rtl::toStr($old_file_name);
		$module_json_path = $module_path . \Runtime\rtl::toStr("/") . \Runtime\rtl::toStr("module.json");
		$content = \Runtime\rtl::json_encode($this->info, \Runtime\rtl::JSON_PRETTY);
		\Runtime\fs::saveFile($module_json_path, $content);
		/* Rename folder */
		rename($this.path, "/data/projects/" . $new_file_name);
	}
	/**
	 * Compile file
	 */
	function compile($relative_src_file_path)
	{
		/* Get src file path */
		$src_file_path = $this->resolveSourceFilePath($relative_src_file_path);
		if ($src_file_path == "")
		{
			return false;
		}
		if (!$this->checkFile($src_file_path))
		{
			return false;
		}
		/* Read file */
		if (!\Runtime\fs::isFile($src_file_path))
		{
			return false;
		}
		$file_content = \Runtime\fs::readFile($src_file_path);
		/* Parse file */
		$parser = new \BayLang\LangBay\ParserBay();
		$res = $parser::parse($parser, $file_content);
		$file_op_code = $res->get(1);
		if (!$file_op_code)
		{
			return false;
		}
		/* Translate project languages */
		$this->translateLanguages($relative_src_file_path, $file_op_code);
		return true;
	}
	/**
	 * Translate file
	 */
	function translateLanguages($relative_src_file_path, $op_code)
	{
		/* Translate project languages */
		$languages = $this->project->getLanguages();
		for ($i = 0; $i < $languages->count(); $i++)
		{
			$lang = $languages->get($i);
			if ($lang == "bay")
			{
				continue;
			}
			$this->translate($relative_src_file_path, $op_code, $lang);
		}
	}
	/**
	 * Translate file
	 */
	function translate($relative_src_file_path, $op_code, $lang)
	{
		/* Get dest file path */
		$dest_file_path = $this->resolveDestFilePath($relative_src_file_path, $lang);
		if ($dest_file_path == "")
		{
			return false;
		}
		/* Create translator */
		$translator = \BayLang\LangUtils::createTranslator($lang);
		if (!$translator)
		{
			return false;
		}
		/* Translate */
		$res = $translator::translate($translator, $op_code);
		$dest_file_content = $res->get(1);
		/* Create dest folder if not exists */
		$dest_dir_name = \Runtime\rs::dirname($dest_file_path);
		if (!\Runtime\fs::isFolder($dest_dir_name))
		{
			\Runtime\fs::mkdir($dest_dir_name);
		}
		/* Save file */
		\Runtime\fs::saveFile($dest_file_path, $dest_file_content);
		return true;
	}
	/**
	 * Returns projects assets
	 */
	function getProjectAssets()
	{
		$project_assets = $this->project->getAssets();
		$project_assets = $project_assets->filter(function ($asset)
		{
			if (!$asset->has("modules"))
			{
				return false;
			}
			/* Check module in modules names */
			$modules = $asset->get("modules");
			if (!$modules)
			{
				return false;
			}
			if (!($modules instanceof \Runtime\Collection))
			{
				return false;
			}
			if (!$this->inModuleList($modules))
			{
				return false;
			}
			return true;
		});
		return $project_assets;
	}
	/**
	 * Update assets
	 */
	function updateAssets()
	{
		$languages = $this->project->getLanguages();
		if ($languages->indexOf("es6") == -1)
		{
			return ;
		}
		/* Builds assets with current module */
		$project_assets = $this->getProjectAssets();
		for ($i = 0; $i < $project_assets->count(); $i++)
		{
			$this->project->buildAsset($project_assets->get($i));
		}
	}
	/**
	 * Load routes
	 */
	function loadRoutes()
	{
		$route_processor = new \BayLang\Helper\RouteProcessor($this);
		$route_processor->load();
		$this->routes = $route_processor->getRoutes();
	}
	/**
	 * Add widget
	 */
	function addWidget($widget)
	{
		/* Add widget */
		$this->widgets->push($widget);
		/* Get path */
		$model_path = \Runtime\rs::removeFirstSlash($this->getRelativeSourcePath($widget->getModelPath()));
		$component_path = \Runtime\rs::removeFirstSlash($this->getRelativeSourcePath($widget->getComponentPath()));
		/* Add assets to module.json */
		$module_json_path = $this->path . \Runtime\rtl::toStr("/") . \Runtime\rtl::toStr("module.json");
		$content = \Runtime\fs::readFile($module_json_path);
		$module_info = \Runtime\rtl::json_decode($content);
		if ($module_info->get("assets")->indexOf($model_path) == -1)
		{
			$module_info->get("assets")->push($model_path);
		}
		if ($module_info->get("assets")->indexOf($component_path) == -1)
		{
			$module_info->get("assets")->push($component_path);
		}
		/* Add widget to module.json */
		if (!$module_info->has("widgets"))
		{
			$module_info->set("widgets", \Runtime\Vector::from([]));
		}
		$module_info->get("widgets")->push(\Runtime\Map::from(["kind"=>$widget->kind,"name"=>$widget->name]));
		/* Save module.json */
		$content = \Runtime\rtl::json_encode($module_info, \Runtime\Serializer::JSON_PRETTY);
		\Runtime\fs::saveFile($module_json_path, $content);
		/* Add assets to cache */
		if ($this->assets->indexOf($model_path) == -1)
		{
			$this->assets->push($model_path);
		}
		if ($this->assets->indexOf($component_path) == -1)
		{
			$this->assets->push($component_path);
		}
	}
	/**
	 * Remove widget
	 */
	function removeWidget($widget)
	{
		/* Remove item */
		$this->widgets->removeItem($widget);
		/* Get path */
		$model_path = \Runtime\rs::removeFirstSlash($this->getRelativeSourcePath($widget->getModelPath()));
		$component_path = \Runtime\rs::removeFirstSlash($this->getRelativeSourcePath($widget->getComponentPath()));
		/* Remove assets from module.json */
		$module_json_path = $this->path . \Runtime\rtl::toStr("/") . \Runtime\rtl::toStr("module.json");
		$content = \Runtime\fs::readFile($module_json_path);
		$module_info = \Runtime\rtl::json_decode($content);
		$assets = $module_info->get("assets");
		for ($i = $assets->count() - 1; $i >= 0; $i--)
		{
			$file_name = $assets->get($i);
			if ($file_name == $model_path || $file_name == $component_path)
			{
				$assets->remove($i);
			}
		}
		/* Remove widget from module.json */
		if ($module_info->has("widgets"))
		{
			$widgets = $module_info->get("widgets");
			$pos = $widgets->find(\Runtime\lib::equalAttr("name", $widget->name));
			if ($pos >= 0)
			{
				$widgets->remove($pos);
			}
		}
		/* Save module.json */
		$content = \Runtime\rtl::json_encode($module_info, \Runtime\Serializer::JSON_PRETTY);
		\Runtime\fs::saveFile($module_json_path, $content);
		/* Remove assets from cache */
		for ($i = $this->assets->count() - 1; $i >= 0; $i--)
		{
			$file_name = $this->assets->get($i);
			if ($file_name == $model_path || $file_name == $component_path)
			{
				$this->assets->remove($i);
			}
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->project = null;
		$this->is_exists = false;
		$this->path = "";
		$this->src_path = "";
		$this->dest_path = \Runtime\Map::from([]);
		$this->name = "";
		$this->submodules = null;
		$this->allow = null;
		$this->assets = null;
		$this->required_modules = null;
		$this->routes = null;
		$this->groups = null;
		$this->widgets = null;
		$this->exclude = null;
	}
	static function getNamespace()
	{
		return "BayLang.Helper";
	}
	static function getClassName()
	{
		return "BayLang.Helper.Module";
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