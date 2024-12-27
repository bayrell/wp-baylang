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
class Module extends \Runtime\BaseStruct
{
	public $name;
	public $path;
	public $config;
	/**
	 * Returns module path
	 */
	function getModulePath()
	{
		return $this->path;
	}
	/**
	 * Returns source path
	 */
	function getSourcePath()
	{
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($this->config, "src"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$module_src = $__v0->value();
		$module_src_path = \Runtime\fs::join(\Runtime\Vector::from([$this->path,$module_src]));
		return \Runtime\rs::removeLastSlash($module_src_path);
	}
	/**
	 * Has group
	 */
	function hasGroup($group_name)
	{
		if (\Runtime\rs::substr($group_name, 0, 1) != "@")
		{
			return false;
		}
		$group_name = \Runtime\rs::substr($group_name, 1);
		$groups = $this->config->get("groups");
		if ($groups == null)
		{
			return false;
		}
		if ($groups->indexOf($group_name) == -1)
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
	 * Returns full source file.
	 * Returns file_path
	 */
	function resolveSourceFile($file_name)
	{
		$first_char = \Runtime\rtl::attr($file_name, 0);
		if ($first_char == "@")
		{
			return \Runtime\fs::join(\Runtime\Vector::from([$this->path,\Runtime\rs::substr($file_name, 1)]));
		}
		$path = $this->getSourcePath();
		return \Runtime\fs::join(\Runtime\Vector::from([$path,$file_name]));
	}
	/**
	 * Resolve destination file
	 */
	function resolveDestFile($project_path, $relative_file_name, $lang)
	{
		if (!$this->config->has("dest"))
		{
			return "";
		}
		if (!$this->config->get("dest")->has($lang))
		{
			return "";
		}
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($this->config, ["dest", $lang]));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$dest = $__v0->value();
		$dest_path = "";
		$is_local = \Runtime\rs::substr($dest, 0, 2) == "./";
		if ($is_local)
		{
			$dest_path = \Runtime\fs::join(\Runtime\Vector::from([$this->path,$dest,$relative_file_name]));
		}
		else
		{
			$dest_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$dest,$relative_file_name]));
		}
		if ($lang == "php")
		{
			$dest_path = \Runtime\re::replace("\\.bay\$", ".php", $dest_path);
			$dest_path = \Runtime\re::replace("\\.ui\$", ".php", $dest_path);
		}
		else if ($lang == "es6")
		{
			$dest_path = \Runtime\re::replace("\\.bay\$", ".js", $dest_path);
			$dest_path = \Runtime\re::replace("\\.ui\$", ".js", $dest_path);
		}
		else if ($lang == "nodejs")
		{
			$dest_path = \Runtime\re::replace("\\.bay\$", ".js", $dest_path);
			$dest_path = \Runtime\re::replace("\\.ui\$", ".js", $dest_path);
		}
		return $dest_path;
	}
	/**
	 * Check exclude
	 */
	function checkExclude($file_name)
	{
		$module_excludelist = \Runtime\rtl::attr($this->config, "exclude");
		if ($module_excludelist && $module_excludelist instanceof \Runtime\Collection)
		{
			for ($i = 0; $i < $module_excludelist->count(); $i++)
			{
				$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($module_excludelist, $i));
				$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
				$file_match = $__v0->value();
				if ($file_match == "")
				{
					continue;
				}
				$res = \Runtime\re::match($file_match, $file_name);
				if ($res)
				{
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * Check allow list
	 */
	function checkAllow($file_name)
	{
		$success = false;
		$module_allowlist = \Runtime\rtl::attr($this->config, "allow");
		if ($module_allowlist && $module_allowlist instanceof \Runtime\Collection)
		{
			for ($i = 0; $i < $module_allowlist->count(); $i++)
			{
				$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($module_allowlist, $i));
				$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
				$file_match = $__v0->value();
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
		}
		return $success;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->name = "";
		$this->path = "";
		$this->config = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "BayLang.Compiler";
	}
	static function getClassName()
	{
		return "BayLang.Compiler.Module";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseStruct";
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