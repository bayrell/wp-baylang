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
namespace BayLang\Compiler;
class SettingsProvider extends \Runtime\BaseProvider
{
	public $project_path;
	public $project_json_path;
	public $config;
	public $modules;
	/**
	 * Returns modules
	 */
	function getModules()
	{
		return $this->modules;
	}
	/**
	 * Start
	 */
	function start()
	{
		$this->project_json_path = \Runtime\fs::join(\Runtime\Vector::from([\Runtime\rtl::getContext()->base_path,"project.json"]));
		$this->reload();
	}
	/**
	 * Check provider
	 */
	function check()
	{
		$file_name = $this->project_json_path;
		$is_file = \Runtime\fs::isFile($file_name);
		if (!$is_file)
		{
			throw new \Runtime\Exceptions\RuntimeException("File '" + $file_name + "' does not exists");
		}
		if (!$this->config)
		{
			throw new \Runtime\Exceptions\RuntimeException("File '" + $file_name + "' contains error ");
		}
	}
	/**
	 * Read settings from file
	 */
	function reload()
	{
		$file_name = $this->project_json_path;
		$is_file = \Runtime\fs::isFile($file_name);
		if (!$is_file)
		{
			return ;
		}
		$file_content = \Runtime\fs::readFile($file_name);
		$this->config = \Runtime\rtl::json_decode($file_content);
		$this->project_path = \Runtime\rs::dirname($file_name);
		$this->modules = \Runtime\Map::from([]);
		/* Load modules */
		$this->readModules($this->project_path, $this->config);
	}
	/**
	 * Returns modules from config
	 */
	function readModules($config_path, $config)
	{
		if (!$config)
		{
			return ;
		}
		if (!$config->has("modules"))
		{
			return ;
		}
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($config, "modules"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("Runtime.Collection", \Runtime\Vector::from([])));
		$modules_info = $__v0->value();
		for ($i = 0; $i < $modules_info->count(); $i++)
		{
			$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($modules_info, $i));
			$__v0 = $__v0->monad(\Runtime\rtl::m_to("Runtime.Dict", \Runtime\Map::from([])));
			$module_info = $__v0->value();
			$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($module_info, "src"));
			$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
			$module_src = $__v0->value();
			$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($module_info, "type"));
			$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
			$module_type = $__v0->value();
			if ($module_type == "module")
			{
				$module_path = \Runtime\fs::join(\Runtime\Vector::from([$config_path,$module_src]));
				$module = $this->readModule($module_path);
			}
			else if ($module_type == "folder")
			{
				$folder_path = \Runtime\fs::join(\Runtime\Vector::from([$config_path,$module_src]));
				$folder_modules = $this->readModulesFromFolder($folder_path);
			}
		}
	}
	/**
	 * Read modules from folder
	 */
	function readModulesFromFolder($folder_path)
	{
		$file_names = \Runtime\fs::listDir($folder_path);
		for ($i = 0; $i < $file_names->count(); $i++)
		{
			$file_name = \Runtime\rtl::attr($file_names, $i);
			$module_path = \Runtime\fs::join(\Runtime\Vector::from([$folder_path,$file_name]));
			$this->readModule($module_path);
		}
	}
	/**
	 * Read module from folder
	 */
	function readModule($module_path)
	{
		$module_json_path = \Runtime\fs::join(\Runtime\Vector::from([$module_path,"module.json"]));
		$is_file = \Runtime\fs::isFile($module_json_path);
		if (!$is_file)
		{
			return null;
		}
		$module_json_content = \Runtime\fs::readFile($module_json_path);
		$module_json = \Runtime\rtl::json_decode($module_json_content);
		if (!$module_json)
		{
			return null;
		}
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($module_json, "name"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$module_name = $__v0->value();
		if ($module_name == "")
		{
			return null;
		}
		/* Create module */
		$module = new \BayLang\Compiler\Module(\Runtime\Map::from(["name"=>$module_name,"config"=>$module_json,"path"=>$module_path]));
		/* Read submodules */
		$this->readModules($module_path, $module_json);
		/* Add module */
		if ($module && !$this->modules->has($module_name))
		{
			$this->modules->set($module_name, $module);
		}
		return $module;
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
			$module_name = \Runtime\rtl::attr($module_names, $i);
			$module = \Runtime\rtl::attr($this->modules, $module_name);
			if (\Runtime\rs::indexOf($file_name, $module->path) == 0)
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
	 * Resolve source file.
	 * Find module, file_name by file
	 */
	function resolveSourceFile($file_path)
	{
		if (!\Runtime\fs::isFile($file_path))
		{
			return null;
		}
		$module = $this->findModuleByFileName($file_path);
		if (!$module)
		{
			return null;
		}
		$module_path = $module->getModulePath();
		if (\Runtime\rs::indexOf($file_path, $module_path) != 0)
		{
			return null;
		}
		$module_ext_name = \Runtime\rs::extname($file_path);
		$d = \Runtime\Map::from(["file_path"=>$file_path,"file_name"=>\Runtime\rs::substr($file_path, \Runtime\rs::strlen($module_path)),"module"=>$module,"src_file_name"=>null,"ext_name"=>$module_ext_name,"success"=>false]);
		$module_src_path = $module->getSourcePath();
		if (\Runtime\rs::indexOf($file_path, $module_src_path) != 0)
		{
			return $d;
		}
		$src_file_name = \Runtime\rs::substr($file_path, \Runtime\rs::strlen($module_src_path));
		$src_file_name = \Runtime\rs::removeFirstSlash($src_file_name);
		$d->set("src_file_name", $src_file_name);
		if ($module->checkExclude($src_file_name))
		{
			return $d;
		}
		$d->set("success", $module->checkAllow($src_file_name));
		return $d;
	}
	/**
	 * Compile file to lang
	 */
	function compileFile($file_path, $lang, $log_level=0)
	{
		$file_info = $this->resolveSourceFile($file_path);
		if (!\Runtime\rtl::attr($file_info, "success"))
		{
			return $file_info;
		}
		if (($log_level & 2) == 2)
		{
			\Runtime\io::print($file_path);
		}
		else if (($log_level & 1) == 1)
		{
			\Runtime\io::print(\Runtime\rtl::attr($file_info, "src_file_name"));
		}
		$ext_name = \Runtime\rtl::attr($file_info, "ext_name");
		$container = \Runtime\Map::from(["op_code"=>null,"success"=>false,"content"=>"","result"=>"","lang"=>""]);
		/* Set content */
		$content = \Runtime\fs::readFile($file_path);
		$container->set("content", $content);
		if ($ext_name == "bay")
		{
			$parser = new \BayLang\LangBay\ParserBay();
			$op_code = \BayLang\LangUtils::parse($parser, $content);
			$container->set("op_code", $op_code);
		}
		$is_lang = function ($ext_name, $lang)
		{
			/* ES6 */
			if ($ext_name == "es6" && $lang == "es6")
			{
				return true;
			}
			if ($ext_name == "js" && $lang == "es6")
			{
				return true;
			}
			/* NodeJS */
			if ($ext_name == "node" && $lang == "nodejs")
			{
				return true;
			}
			if ($ext_name == "nodejs" && $lang == "nodejs")
			{
				return true;
			}
			if ($ext_name == "js" && $lang == "nodejs")
			{
				return true;
			}
			/* PHP */
			if ($ext_name == "php" && $lang == "php")
			{
				return true;
			}
			return false;
		};
		$save_file = function ($file_info, $container) use (&$log_level)
		{
			$src_file_name = \Runtime\rtl::attr($file_info, "src_file_name");
			$module = \Runtime\rtl::attr($file_info, "module");
			$dest_path = $module->resolveDestFile($this->project_path, $src_file_name, $container->get("lang"));
			if ($dest_path == "")
			{
				return false;
			}
			/* Create directory if does not exists */
			$dir_name = \Runtime\rs::dirname($dest_path);
			if (!\Runtime\fs::isDir($dir_name))
			{
				\Runtime\fs::mkdir($dir_name);
			}
			/* Save file */
			\Runtime\fs::saveFile($dest_path, \Runtime\rtl::attr($container, "result"));
			if (($log_level & 2) == 2)
			{
				\Runtime\io::print("=> " . \Runtime\rtl::toStr($dest_path));
			}
			return true;
		};
		$languages = \Runtime\Vector::from([]);
		if ($lang == "")
		{
			$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($this->config, "languages"));
			$__v0 = $__v0->monad(\Runtime\rtl::m_to("Runtime.Collection", \Runtime\Vector::from([])));
			$languages = $__v0->value();
		}
		else
		{
			$languages = \Runtime\Vector::from([$lang]);
		}
		for ($i = 0; $i < $languages->count(); $i++)
		{
			$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($languages, $i));
			$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
			$lang_name = $__v0->value();
			$op_code = \Runtime\rtl::attr($container, "op_code");
			$container->set("success", false);
			$container->set("lang", $lang_name);
			$container->set("result", "");
			if ($ext_name == "bay")
			{
				if ($op_code)
				{
					$t = \BayLang\LangUtils::createTranslator($lang_name);
					if ($t)
					{
						$container->set("result", \BayLang\LangUtils::translate($t, $op_code));
						$container->set("success", true);
					}
				}
			}
			else if ($is_lang($ext_name, $lang_name))
			{
				$container->set("result", $container->get("content"));
				$container->set("success", true);
			}
			if ($container->get("success"))
			{
				$save_file($file_info, $container, $lang_name);
			}
		}
		if (($log_level & 2) == 2)
		{
			\Runtime\io::print("Ok");
		}
		return $file_info;
	}
	/**
	 * Compile module to lang
	 */
	function compileModule($module_name, $lang="")
	{
		if (!$this->modules->has($module_name))
		{
			\Runtime\io::print_error("Module " + $module_name + " not found");
			return false;
		}
		/* Get module */
		$module = $this->modules->get($module_name);
		$module_src_path = $module->getSourcePath();
		$is_success = true;
		/* Read files */
		$files = \Runtime\fs::listDirRecursive($module_src_path);
		for ($i = 0; $i < $files->count(); $i++)
		{
			$file_name = \Runtime\rtl::attr($files, $i);
			$file_path = \Runtime\fs::join(\Runtime\Vector::from([$module_src_path,$file_name]));
			if ($module->checkExclude($file_name))
			{
				continue;
			}
			if (!\Runtime\fs::isFile($file_path))
			{
				continue;
			}
			try
			{
				
				$this->compileFile($file_path, $lang, 1);
			}
			catch (\Exception $_ex)
			{
				if ($_ex instanceof \BayLang\Exceptions\ParserUnknownError)
				{
					$e = $_ex;
					\Runtime\io::print_error($e->toString());
					$is_success = false;
				}
				else if (true)
				{
					$e = $_ex;
					\Runtime\io::print_error($e);
					$is_success = false;
				}
				else
				{
					throw $_ex;
				}
			}
		}
		if ($is_success)
		{
			$this->updateModule($module_name);
		}
		return $is_success;
	}
	/**
	 * Update module
	 */
	function updateModule($module_name)
	{
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($this->config, "languages"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("Runtime.Collection", \Runtime\Vector::from([])));
		$languages = $__v0->value();
		if ($languages->indexOf("es6") == -1)
		{
			return -1;
		}
		if (!$this->modules->has($module_name))
		{
			\Runtime\io::print_error("Module " + $module_name + " not found");
			return -1;
		}
		/* Make assets by module name */
		$assets = $this->getAssetsByModule($module_name);
		for ($i = 0; $i < $assets->count(); $i++)
		{
			$this->makeAsset($assets->get($i));
		}
		return 0;
	}
	/**
	 * Get assets by module name
	 */
	function getAssetsByModule($module_name)
	{
		$module = \Runtime\rtl::attr($this->modules, $module_name);
		/* Find assets by module */
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($this->config, "assets"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("Runtime.Collection", \Runtime\Vector::from([])));
		$assets = $__v0->value();
		$assets = $assets->filter(function ($asset) use (&$module)
		{
			if (!$asset->has("modules"))
			{
				return false;
			}
			/* Check module in modules names */
			$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($asset, "modules"));
			$__v0 = $__v0->monad(\Runtime\rtl::m_to("Runtime.Collection", \Runtime\Vector::from([])));
			$modules = $__v0->value();
			if (!$module->inModuleList($modules))
			{
				return false;
			}
			return true;
		});
		return $assets;
	}
	/**
	 * Returns modules by group name
	 */
	function getGroupModules($group_name)
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
			/* Add required modules */
			$module = $this->modules->get($module_name);
			if ($module->config->has("require"))
			{
				$required_modules = $module->config->get("require");
				for ($i = 0; $i < $required_modules->count(); $i++)
				{
					$add_module($required_modules->get($i));
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
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($asset, "modules"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("Runtime.Collection", \Runtime\Vector::from([])));
		$modules = $__v0->value();
		/* Extends modules */
		$new_modules = \Runtime\Vector::from([]);
		$modules->each(function ($module_name) use (&$new_modules)
		{
			if (\Runtime\rs::substr($module_name, 0, 1) == "@")
			{
				/* Get group modules by name */
				$group_modules = $this->getGroupModules($module_name);
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
	 * Make assets
	 */
	function makeAsset($asset)
	{
		$modules = $this->getAssetModules($asset);
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($asset, "dest"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$asset_path_relative = $__v0->value();
		if ($asset_path_relative == "")
		{
			return ;
		}
		$asset_path = \Runtime\fs::join(\Runtime\Vector::from([$this->project_path,$asset_path_relative]));
		$asset_content = "";
		for ($i = 0; $i < $modules->count(); $i++)
		{
			$module_name = \Runtime\rtl::attr($modules, $i);
			$module = \Runtime\rtl::attr($this->modules, $module_name);
			if ($module)
			{
				$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($module->config, "assets"));
				$__v0 = $__v0->monad(\Runtime\rtl::m_to("Runtime.Collection", \Runtime\Vector::from([])));
				$files = $__v0->value();
				for ($j = 0; $j < $files->count(); $j++)
				{
					$file_name = \Runtime\rtl::attr($files, $j);
					$file_source_path = $module->resolveSourceFile($file_name);
					$file_dest_path = $module->resolveDestFile($this->project_path, $file_name, "es6");
					if ($file_dest_path == "")
					{
						continue;
					}
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
		\Runtime\io::print("Bundle to => " . \Runtime\rtl::toStr($asset_path_relative));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->project_path = "";
		$this->project_json_path = "";
		$this->config = \Runtime\Map::from([]);
		$this->modules = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "BayLang.Compiler";
	}
	static function getClassName()
	{
		return "BayLang.Compiler.SettingsProvider";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseProvider";
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