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
namespace BayLang\Constructor\Backend\Api;
class CodeApi extends \Runtime\Web\BaseApi
{
	public $project;
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "baylang.constructor.code";
	}
	/**
	 * Action before
	 */
	function onActionBefore()
	{
		/* Get project */
		$project_id = $this->post_data->get("project_id");
		$this->project = \BayLang\Constructor\Backend\ApiHook::getProject($project_id);
		if (!$this->project)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($project_id, "Project"));
		}
		/* Load project */
		$this->project->load();
	}
	/**
	 * Returns files
	 */
	function getFiles()
	{
		$file_path = $this->post_data->get("file_path");
		$project_path = $this->project->getPath();
		$folder_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$file_path]));
		/* Check file path */
		if (\Runtime\rs::indexOf($folder_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_path, "Folder"));
		}
		/* File not exists */
		if (!\Runtime\fs::isFolder($folder_path))
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_path, "Folder"));
		}
		/* Get items */
		$items = \Runtime\Vector::from([]);
		$files = \Runtime\fs::listDir($folder_path);
		for ($i = 0; $i < $files->count(); $i++)
		{
			$item_name = $files->get($i);
			$item_path = \Runtime\fs::join(\Runtime\Vector::from([$folder_path,$item_name]));
			$item_kind = "";
			if (\Runtime\fs::isFile($item_path))
			{
				$item_kind = "file";
			}
			else if (\Runtime\fs::isDir($item_path))
			{
				$item_kind = "dir";
			}
			$items->push(\Runtime\Map::from(["kind"=>$item_kind,"file_name"=>$item_name,"file_path"=>\Runtime\fs::join(\Runtime\Vector::from([$file_path,$item_name]))]));
		}
		/* Result */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["items"=>$items])]));
	}
	/**
	 * Returns file content
	 */
	function getContent()
	{
		$file_path = $this->post_data->get("file_path");
		$project_path = $this->project->getPath();
		$file_full_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$file_path]));
		/* Check file path */
		if (\Runtime\rs::indexOf($file_full_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_path, "Folder"));
		}
		/* File not exists */
		if (!\Runtime\fs::isFile($file_full_path))
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_path, "File"));
		}
		/* Read file */
		$content = \Runtime\fs::readFile($file_full_path);
		/* Result */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["file_path"=>$file_path,"content"=>$content])]));
	}
	/**
	 * Create
	 */
	function create()
	{
		$project_path = $this->project->getPath();
		$parent_dir = $this->post_data->get("file_path");
		$file_name = $this->post_data->get("file_name");
		$file_full_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$parent_dir,$file_name]));
		$kind = $this->post_data->get("kind");
		/* Check file path */
		if (\Runtime\rs::indexOf($file_full_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound(\Runtime\fs::join(\Runtime\Vector::from([$parent_dir,$file_name])), "Folder"));
		}
		/* Create folder */
		if ($kind == "dir" || $kind == "folder")
		{
			\Runtime\fs::mkDir($file_full_path);
		}
		else
		{
			\Runtime\fs::saveFile($file_full_path, "");
		}
		$this->success();
	}
	/**
	 * Rename
	 */
	function rename()
	{
		$project_path = $this->project->getPath();
		$file_path = $this->post_data->get("file_path");
		$file_new_name = $this->post_data->get("file_new_name");
		$parent_dir = \Runtime\rs::dirname($file_path);
		$file_full_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$file_path]));
		$file_new_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$parent_dir,$file_new_name]));
		/* Check file path */
		if (\Runtime\rs::indexOf($file_full_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_path, "Folder"));
		}
		/* Check file path */
		if (\Runtime\rs::indexOf($file_new_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_new_name, "Folder"));
		}
		\Runtime\fs::rename($file_full_path, $file_new_path);
		$this->success();
	}
	/**
	 * Remove file
	 */
	function remove()
	{
		$project_path = $this->project->getPath();
		$file_path = $this->post_data->get("file_path");
		$file_full_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$file_path]));
		/* Check file path */
		if (\Runtime\rs::indexOf($file_full_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_path, "Folder"));
		}
		/* Remove file */
		if (\Runtime\fs::isFile($file_full_path))
		{
			\Runtime\fs::unlink($file_full_path);
		}
		else if (\Runtime\fs::isFolder($file_full_path))
		{
			shell_exec("rm -rf $file_full_path");
		}
		$this->success();
	}
	/**
	 * Move file
	 */
	function move()
	{
		$project_path = $this->project->getPath();
		$file_path = $this->post_data->get("file_path");
		$dest_path = $this->post_data->get("dest_path");
		$kind = $this->post_data->get("kind");
		/* Get file name */
		$file_name = \Runtime\rs::basename($file_path);
		/* Full path */
		$file_full_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$file_path]));
		$dest_full_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$dest_path]));
		/* Check file path */
		if (\Runtime\rs::indexOf($file_full_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_path, "Folder"));
		}
		/* Check dest path */
		if (\Runtime\rs::indexOf($dest_full_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($dest_path, "Folder"));
		}
		/* Copy */
		if ($kind == "copy")
		{
			if (\Runtime\fs::isFile($file_full_path))
			{
				shell_exec("cp $file_full_path $dest_full_path");
			}
			else
			{
				shell_exec("cp -r $file_full_path $dest_full_path");
			}
		}
		else
		{
			$dest_full_path = \Runtime\fs::join(\Runtime\Vector::from([$dest_full_path,$file_name]));
			\Runtime\fs::rename($file_full_path, $dest_full_path);
		}
		$this->success();
	}
	/**
	 * Save file
	 */
	function saveContent()
	{
		$file_path = $this->post_data->get("file_path");
		$project_path = $this->project->getPath();
		$file_full_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,$file_path]));
		/* Check file path */
		if (\Runtime\rs::indexOf($file_full_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_path, "Folder"));
		}
		/* Read file */
		$content = $this->post_data->get("content");
		\Runtime\fs::saveFile($file_full_path, $content);
		/* Compile file */
		$module = $this->project->findModuleByFileName($file_full_path);
		if ($module)
		{
			/* Init module */
			$module->init();
			/* Compile file */
			$relative_src_file_path = $module->getRelativeSourcePath($file_full_path);
			if ($relative_src_file_path)
			{
				$is_allow = $module->checkAllow($relative_src_file_path);
				$is_exclude = $module->checkExclude($relative_src_file_path);
				if ($is_allow && !$is_exclude)
				{
					try
					{
						
						$module->compile($relative_src_file_path);
						$module->updateAssets();
					}
					catch (\Exception $_ex)
					{
						if ($_ex instanceof \BayLang\Exceptions\ParserUnknownError)
						{
							$e = $_ex;
							$error_str = $e->getErrorMessage();
							$line = $e->getErrorLine();
							$pos = $e->getErrorPos();
							if ($line != -1)
							{
								$error_str .= \Runtime\rtl::toStr(" at Ln:" . \Runtime\rtl::toStr($line) . \Runtime\rtl::toStr((($pos != "") ? (", Pos:" . \Runtime\rtl::toStr($pos)) : (""))));
							}
							throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException($error_str));
						}
						else
						{
							throw $_ex;
						}
					}
				}
			}
		}
		/* Result */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["file_path"=>$file_path])]));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->project = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend.Api";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.Api.CodeApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseApi";
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
			"getFiles",
			"getContent",
			"create",
			"rename",
			"remove",
			"move",
			"saveContent",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "getFiles")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "getContent")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "create")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "rename")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "remove")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "move")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "saveContent")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}