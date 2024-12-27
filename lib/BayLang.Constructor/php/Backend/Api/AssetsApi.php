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
class AssetsApi extends \Runtime\Web\BaseApi
{
	public $project;
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "baylang.constructor.assets";
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
	 * Upload file
	 */
	function uploadFile()
	{
		$file = $this->post_data->get("file");
		if (!$file)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("File not found"));
		}
		/* Get path */
		$assets_path = \BayLang\Constructor\Backend\ApiHook::getAssetsPath($this->project);
		$folder_name = $this->post_data->get("path");
		$folder_path = \Runtime\fs::join(\Runtime\Vector::from([$assets_path,$folder_name]));
		$file_upload_path = \Runtime\fs::join(\Runtime\Vector::from([$folder_path,$file->getName()]));
		/* Create folder */
		if (!\Runtime\fs::exists($folder_path))
		{
			\Runtime\fs::mkdir($folder_path);
		}
		/* Create file */
		$content = \Runtime\fs::readFile($file->getPath());
		\Runtime\fs::saveFile($file_upload_path, $content);
		/* Result */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["path"=>\Runtime\fs::join(\Runtime\Vector::from([$folder_name,$file->getName()]))])]));
	}
	/**
	 * Remove file
	 */
	function removeFile()
	{
		$assets_path = \BayLang\Constructor\Backend\ApiHook::getAssetsPath($this->project);
		$file_name = $this->post_data->get("file_name");
		$file_path = \Runtime\fs::join(\Runtime\Vector::from([$assets_path,"images",$file_name]));
		/* Check file path */
		if (!\Runtime\fs::exists($file_path))
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($file_name, "File"));
		}
		/* Remove file */
		\Runtime\fs::unlink($file_path);
		/* Result */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["file_name"=>$file_name])]));
	}
	/**
	 * Returns files
	 */
	function getFiles()
	{
		$assets_path = \BayLang\Constructor\Backend\ApiHook::getAssetsPath($this->project);
		$assets_url_path = \BayLang\Constructor\Backend\ApiHook::getAssetsUrlPath($this->project);
		$folder_name = $this->post_data->get("path");
		$folder_path = \Runtime\fs::join(\Runtime\Vector::from([$assets_path,$folder_name]));
		/* Check file path */
		if (\Runtime\rs::indexOf($folder_path, "/..") != -1)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($folder_name, "Folder"));
		}
		/* File not exists */
		if (!\Runtime\fs::isFolder($folder_path))
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($folder_name, "Folder"));
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
			$items->push(\Runtime\Map::from(["kind"=>$item_kind,"file_name"=>$item_name,"file_path"=>\Runtime\fs::join(\Runtime\Vector::from([$folder_name,$item_name])),"url"=>\Runtime\fs::join(\Runtime\Vector::from([$assets_url_path,$folder_name,$item_name]))]));
		}
		/* Result */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["items"=>$items,"path"=>$folder_name])]));
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
		return "BayLang.Constructor.Backend.Api.AssetsApi";
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
			"uploadFile",
			"removeFile",
			"getFiles",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "uploadFile")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "removeFile")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "getFiles")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}