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
class Project extends \Runtime\BaseObject implements \BayLang\Helper\CacheInterface, \Runtime\SerializeInterface
{
	public $path;
	public $info;
	public $modules;
	function __construct($project_path)
	{
		parent::__construct();
		$this->path = $project_path;
	}
	/**
	 * Read projects
	 */
	static function readProjects($projects_path)
	{
		if (!\Runtime\fs::isFolder($projects_path))
		{
			return \Runtime\Vector::from([]);
		}
		$result = \Runtime\Vector::from([]);
		$items = \Runtime\fs::listDir($projects_path);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$file_name = $items->get($i);
			if ($file_name == ".")
			{
				continue;
			}
			if ($file_name == "..")
			{
				continue;
			}
			$project = static::readProject(\Runtime\fs::join(\Runtime\Vector::from([$projects_path,$file_name])));
			if ($project)
			{
				$result->push($project);
			}
		}
		return $result;
	}
	/**
	 * Read project from folder
	 */
	static function readProject($project_path)
	{
		$project = new \BayLang\Helper\Project($project_path);
		$project->init();
		if (!$project->exists())
		{
			return null;
		}
		return $project;
	}
	/**
	 * Init project
	 */
	function init()
	{
		$this->info = null;
		$project_json_path = \Runtime\fs::join(\Runtime\Vector::from([$this->path,"project.json"]));
		if (!\Runtime\fs::isFolder($this->path))
		{
			return false;
		}
		if (!\Runtime\fs::isFile($project_json_path))
		{
			return false;
		}
		/* Read file */
		$content = \Runtime\fs::readFile($project_json_path);
		$project_info = \Runtime\rtl::json_decode($content);
		if (!$project_info)
		{
			return false;
		}
		if (!$project_info->has("name"))
		{
			return false;
		}
		$this->info = $project_info;
	}
	/**
	 * Returns project cache path
	 */
	function getCachePath()
	{
		return ($this->exists()) ? (\Runtime\fs::join(\Runtime\Vector::from([$this->getPath(),".cache","cache.json"]))) : ("");
	}
	/**
	 * Read project from cache
	 */
	function readCache()
	{
		/* Get json path */
		$cache_path = $this->getCachePath();
		if (!\Runtime\fs::isFile($cache_path))
		{
			return false;
		}
		/* Read file */
		$content = \Runtime\fs::readFile($cache_path);
		$data = \Runtime\rtl::json_decode($content);
		if (!$data)
		{
			return false;
		}
		/* Import data */
		$serializer = new \Runtime\Serializer();
		$serializer->setFlag(\Runtime\Serializer::ALLOW_OBJECTS);
		$serializer->setFlag(\Runtime\Serializer::DECODE);
		$this->serialize($serializer, $data);
		return true;
	}
	/**
	 * Save project to cache
	 */
	function saveCache()
	{
		/* Get json folder */
		$cache_path = $this->getCachePath();
		$folder_path = \Runtime\rs::dirname($cache_path);
		if (!\Runtime\fs::isFolder($folder_path))
		{
			\Runtime\fs::mkdir($folder_path);
		}
		/* Create serializer */
		$serializer = new \Runtime\SerializerJson();
		$serializer->setFlag(\Runtime\Serializer::JSON_PRETTY);
		/* Save cache to file */
		$content = $serializer->encode($this);
		\Runtime\fs::saveFile($cache_path, $content);
	}
	/**
	 * Process project cache
	 */
	function serialize($serializer, $data)
	{
		$serializer->processItems($this, "modules", $data, function ($serializer, $module)
		{
			return new \BayLang\Helper\Module($this, $module->get("path"));
		});
	}
	/**
	 * Load object
	 */
	function load($is_force=false)
	{
		if (!$this->exists())
		{
			return ;
		}
		$is_loaded = false;
		if (!$is_force)
		{
			$is_loaded = $this->readCache();
		}
		if (!$is_loaded)
		{
			/* Read and load modules */
			$this->readModules();
			$this->loadModules();
			/* Save to cache */
			$this->saveCache();
		}
	}
	/**
	 * Returns true if project is exists
	 */
	function exists()
	{
		return $this->info != null;
	}
	/**
	 * Returns project path
	 */
	function getPath()
	{
		return ($this->exists()) ? ($this->path) : ("");
	}
	/**
	 * Returns project file_name
	 */
	function getID()
	{
		return ($this->exists()) ? (\Runtime\rs::basename($this->path)) : ("");
	}
	/**
	 * Returns project name
	 */
	function getName()
	{
		return ($this->exists()) ? ($this->info->get("name")) : ("");
	}
	/**
	 * Set project name
	 */
	function setName($name)
	{
		if (!$this->exists())
		{
			return ;
		}
		$this->info->set("name", $name);
	}
	/**
	 * Returns project description
	 */
	function getDescription()
	{
		return ($this->exists()) ? ($this->info->get("description")) : ("");
	}
	/**
	 * Set project description
	 */
	function setDescription($description)
	{
		if (!$this->exists())
		{
			return ;
		}
		$this->info->set("description", $description);
	}
	/**
	 * Returns project type
	 */
	function getType()
	{
		return ($this->exists()) ? ($this->info->get("type")) : ("");
	}
	/**
	 * Set project type
	 */
	function setType($project_type)
	{
		if (!$this->exists())
		{
			return ;
		}
		$this->info->set("type", $project_type);
	}
	/**
	 * Returns assets
	 */
	function getAssets()
	{
		return ($this->exists()) ? ($this->info->get("assets")) : (\Runtime\Vector::from([]));
	}
	/**
	 * Returns languages
	 */
	function getLanguages()
	{
		return ($this->exists()) ? ($this->info->get("languages")) : (\Runtime\Vector::from([]));
	}
	/**
	 * Returns module
	 */
	function getModule($module_name)
	{
		return $this->modules->get($module_name);
	}
	/**
	 * Returns modules by group name
	 */
	function getModulesByGroupName($group_name)
	{
		/* Get modules */
		$modules = $this->modules->transition(function ($module, $module_name)
		{
			return $module;
		});
		/* Filter modules by group */
		$modules = $modules->filter(function ($module) use (&$group_name)
		{
			return $module->hasGroup($group_name);
		});
		/* Get names */
		$modules = $modules->map(\Runtime\lib::attr("name"));
		/* Return modules */
		return $modules;
	}
	/**
	 * Returns widget
	 */
	function getWidget($widget_name)
	{
		if (!$this->modules)
		{
			return null;
		}
		/* Find widget by name */
		$modules = $this->modules->keys()->sort();
		for ($i = 0; $i < $modules->count(); $i++)
		{
			$module_name = $modules->get($i);
			$module = $this->modules->get($module_name);
			$widget = $module->getWidget($widget_name);
			if ($widget)
			{
				return $widget;
			}
		}
		return null;
	}
	/**
	 * Save project
	 */
	function saveInfo()
	{
		$project_json_path = \Runtime\fs::join(\Runtime\Vector::from([$this->path,"project.json"]));
		$content = \Runtime\rtl::json_encode($this->info, \Runtime\rtl::JSON_PRETTY);
		\Runtime\fs::saveFile($project_json_path, $content);
	}
	/**
	 * Find module by file name
	 */
	function findModuleByFileName($file_name)
	{
		$res = null;
		$module_path_sz = -1;
		$module_names = $this->modules->keys();
		for ($i = 0; $i < $module_names->count(); $i++)
		{
			$module_name = $module_names->get($i);
			$module = $this->modules->get($module_name);
			if ($module->checkFile($file_name))
			{
				$sz = \Runtime\rs::strlen($module->path);
				if ($module_path_sz < $sz)
				{
					$module_path_sz = $sz;
					$res = $module;
				}
			}
		}
		return $res;
	}
	/**
	 * Load modules
	 */
	function loadModules()
	{
		$modules = $this->modules->keys()->sort();
		for ($i = 0; $i < $modules->count(); $i++)
		{
			$module_name = $modules->get($i);
			$module = $this->modules->get($module_name);
			$module->loadRoutes();
		}
	}
	/**
	 * Read modules
	 */
	function readModules()
	{
		if (!$this->exists())
		{
			return ;
		}
		$this->modules = \Runtime\Map::from([]);
		/* Read sub modules */
		$this->readSubModules($this->path, $this->info->get("modules"));
	}
	/**
	 * Read sub modules
	 */
	function readSubModules($path, $items)
	{
		if (!$items)
		{
			return ;
		}
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$module_src = $item->get("src");
			$module_type = $item->get("type");
			$folder_path = \Runtime\fs::join(\Runtime\Vector::from([$path,$module_src]));
			/* Read from folder */
			if ($module_type == "folder")
			{
				$this->readModuleFromFolder($folder_path);
			}
			else
			{
				$module = \BayLang\Helper\Module::readModule($this, $folder_path);
				if ($module)
				{
					/* Set module */
					$this->modules->set($module->getName(), $module);
					/* Read sub modules */
					$this->readSubModules($module->getPath(), $module->submodules);
				}
			}
		}
	}
	/**
	 * Read sub modules
	 */
	function readModuleFromFolder($folder_path)
	{
		if (!\Runtime\fs::isFolder($folder_path))
		{
			return ;
		}
		$items = \Runtime\fs::listDir($folder_path);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$file_name = $items->get($i);
			if ($file_name == ".")
			{
				continue;
			}
			if ($file_name == "..")
			{
				continue;
			}
			/* Read module */
			$module = \BayLang\Helper\Module::readModule($this, \Runtime\fs::join(\Runtime\Vector::from([$folder_path,$file_name])));
			if ($module)
			{
				/* Set module */
				$this->modules->set($module->getName(), $module);
				/* Read sub modules */
				$this->readSubModules($module->getPath(), $module->submodules);
			}
		}
	}
	/**
	 * Sort modules
	 */
	function sortRequiredModules($modules)
	{
		$result = \Runtime\Vector::from([]);
		$add_module = function ($module_name) use (&$modules,&$result,&$add_module)
		{
			if ($modules->indexOf($module_name) == -1)
			{
				return ;
			}
			/* Get module by name */
			$module = $this->modules->get($module_name);
			if (!$module)
			{
				return ;
			}
			/* Add required modules */
			if ($module->required_modules != null)
			{
				for ($i = 0; $i < $module->required_modules->count(); $i++)
				{
					$add_module($module->required_modules->get($i));
				}
			}
			/* Add module if not exists */
			if ($result->indexOf($module_name) == -1)
			{
				$result->push($module_name);
			}
		};
		for ($i = 0; $i < $modules->count(); $i++)
		{
			$add_module($modules->get($i));
		}
		return $result;
	}
	/**
	 * Returns assets modules
	 */
	function getAssetModules($asset)
	{
		$modules = $asset->get("modules");
		/* Extends modules */
		$new_modules = \Runtime\Vector::from([]);
		$modules->each(function ($module_name) use (&$new_modules)
		{
			if (\Runtime\rs::substr($module_name, 0, 1) == "@")
			{
				/* Get group modules by name */
				$group_modules = $this->getModulesByGroupName($module_name);
				/* Append group modules */
				$new_modules->appendItems($group_modules);
			}
			else
			{
				$new_modules->push($module_name);
			}
		});
		$modules = $new_modules->removeDuplicates();
		/* Sort modules by requires */
		$modules = $this->sortRequiredModules($modules);
		return $modules;
	}
	/**
	 * Build asset
	 */
	function buildAsset($asset)
	{
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($asset, "dest"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$asset_path_relative = $__v0->value();
		if ($asset_path_relative == "")
		{
			return ;
		}
		/* Get asset dest path */
		$asset_path = \Runtime\fs::join(\Runtime\Vector::from([$this->path,$asset_path_relative]));
		$asset_content = "";
		/* Get modules names in asset */
		$modules = $this->getAssetModules($asset);
		for ($i = 0; $i < $modules->count(); $i++)
		{
			$module_name = $modules->get($i);
			$module = $this->modules->get($module_name);
			if (!$module)
			{
				continue;
			}
			/* Get files */
			for ($j = 0; $j < $module->assets->count(); $j++)
			{
				$file_name = $module->assets->get($j);
				$file_source_path = $module->resolveSourceFilePath($file_name);
				$file_dest_path = $module->resolveDestFilePath($file_name, "es6");
				if ($file_dest_path)
				{
					if (\Runtime\fs::isFile($file_dest_path))
					{
						$content = \Runtime\fs::readFile($file_dest_path);
						$asset_content .= \Runtime\rtl::toStr($content . \Runtime\rtl::toStr("\n"));
					}
					else if (\Runtime\fs::isFile($file_source_path) && \Runtime\rs::extname($file_source_path) == "js")
					{
						$content = \Runtime\fs::readFile($file_source_path);
						$asset_content .= \Runtime\rtl::toStr($content . \Runtime\rtl::toStr("\n"));
					}
				}
			}
		}
		/* Create directory if does not exists */
		$dir_name = \Runtime\rs::dirname($asset_path);
		if (!\Runtime\fs::isDir($dir_name))
		{
			\Runtime\fs::mkdir($dir_name);
		}
		/* Save file */
		\Runtime\fs::saveFile($asset_path, $asset_content);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->path = "";
		$this->info = null;
		$this->modules = null;
	}
	static function getNamespace()
	{
		return "BayLang.Helper";
	}
	static function getClassName()
	{
		return "BayLang.Helper.Project";
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