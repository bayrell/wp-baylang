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
namespace BayLang\Constructor\Backend\Service;
class FontService extends \Runtime\Widget\Crud\CrudService
{
	public $project;
	public $assets_path;
	public $fonts_path;
	/**
	 * Init rules
	 */
	function initRules()
	{
		$this->rules->addRules(\Runtime\Vector::from([new \Runtime\Widget\Crud\Rules\MatchRule(\Runtime\Map::from(["name"=>"api_name","regular"=>\Runtime\Widget\Crud\Rules\MatchRule::ALPHA_NUMERIC_DASH])),new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"name"]))]));
	}
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return \Runtime\Vector::from(["name","css"]);
	}
	/**
	 * Returns primary key
	 */
	function getPrimaryKey($item)
	{
		return \Runtime\Map::from(["name"=>$item->get("name")]);
	}
	/**
	 * Load project
	 */
	function loadProject($project_id)
	{
		$this->project = \BayLang\Constructor\Backend\ApiHook::getProject($project_id);
		if (!$this->project)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($project_id, "Project"));
		}
		/* Load project */
		$this->project->load();
		/* Get fonts path */
		$this->assets_path = \BayLang\Constructor\Backend\ApiHook::getAssetsPath($this->project);
		$this->fonts_path = \Runtime\fs::join(\Runtime\Vector::from([$this->assets_path,"fonts"]));
	}
	/**
	 * New item
	 */
	function newItem()
	{
		return \Runtime\Map::from(["exists"=>false,"files"=>\Runtime\Vector::from([])]);
	}
	/**
	 * Find item
	 */
	function findItem($pk)
	{
		if ($pk == null)
		{
			return null;
		}
		$font_name = $pk->get("name");
		$font_path = \Runtime\fs::join(\Runtime\Vector::from([$this->fonts_path,$font_name]));
		if (!\Runtime\fs::isDir($font_path))
		{
			return null;
		}
		return \Runtime\Map::from(["exists"=>true,"name"=>$font_name,"path"=>$font_path,"files"=>\Runtime\Vector::from([])]);
	}
	/**
	 * Load item
	 */
	function loadItem($pk, $create_instance=true)
	{
		parent::loadItem($pk, $create_instance);
		/* Load css */
		$folder_path = $this->item->get("path");
		$file_css_path = \Runtime\fs::join(\Runtime\Vector::from([$folder_path,"style.scss"]));
		if (\Runtime\fs::exists($file_css_path))
		{
			$css_content = \Runtime\fs::readFile($file_css_path);
			$this->item->set("css", $css_content);
		}
		/* Load files */
		if (\Runtime\fs::exists($folder_path))
		{
			$files = \Runtime\fs::listDir($folder_path);
			$files = $files->map(function ($name)
			{
				return \Runtime\Map::from(["name"=>$name]);
			});
			$this->item->set("files", $files);
		}
	}
	/**
	 * Load items
	 */
	function loadItems()
	{
		/* Get items */
		$this->items = \Runtime\Vector::from([]);
		$this->page = 0;
		$this->pages = 1;
		if (\Runtime\fs::isDir($this->fonts_path))
		{
			$this->items = \Runtime\fs::listDir($this->fonts_path);
			$this->items = $this->items->map(function ($name)
			{
				return \Runtime\Map::from(["name"=>$name]);
			});
		}
	}
	/**
	 * Rebuild assets
	 */
	function rebuild()
	{
		if (!\Runtime\fs::isDir($this->fonts_path))
		{
			return ;
		}
		/* Get items */
		$items = \Runtime\Vector::from([]);
		$items = \Runtime\fs::listDir($this->fonts_path);
		/* Read styles */
		$content = \Runtime\Vector::from(["<!--"," *  Fonts","-->","","<class name=\"App.Components.Blocks.Fonts\">","<style>"]);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$font_name = $items->get($i);
			$file_css_path = \Runtime\fs::join(\Runtime\Vector::from([$this->fonts_path,$font_name,"style.scss"]));
			if (\Runtime\fs::exists($file_css_path))
			{
				$css_content = \Runtime\fs::readFile($file_css_path);
				$content->push($css_content);
			}
		}
		$content->push("</style>");
		$content->push("</class>");
		/* Find module */
		$file_path = \Runtime\fs::join(\Runtime\Vector::from([$this->project->path,"src","App","bay","Components","Blocks","Fonts.bay"]));
		$module = $this->project->findModuleByFileName($file_path);
		if (!$module)
		{
			return ;
		}
		/* Save styles */
		\Runtime\fs::saveFile($file_path, \Runtime\rs::join("\n", $content));
		/* Compile file */
		try
		{
			
			$relative_file_path = $module->getRelativeSourcePath($file_path);
			$module->compile($relative_file_path);
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
		/* Update assets */
		$module->updateAssets();
		\BayLang\Constructor\Backend\ApiHook::updateAssets();
	}
	/**
	 * Save
	 */
	function saveItem()
	{
		$font_key = ($this->pk) ? ($this->pk->get("name")) : ("");
		$font_name = $this->item->get("name");
		$font_path = \Runtime\fs::join(\Runtime\Vector::from([$this->fonts_path,$font_name]));
		/* Check folder is exists */
		$exists = $this->item->get("exists");
		if ($exists)
		{
			/* Rename folder */
			if ($font_key != $font_name)
			{
				$font_path_old = \Runtime\fs::join(\Runtime\Vector::from([$this->fonts_path,$font_key]));
				\Runtime\fs::rename($font_path_old, $font_path);
			}
		}
		else
		{
			/* Create folder */
			\Runtime\fs::mkDir($font_path);
		}
		/* Save css */
		$css_content = $this->item->get("css");
		if ($css_content == "")
		{
			$css_content = \Runtime\rs::join("\n", \Runtime\Vector::from(["@font-face {","  font-family: '" . \Runtime\rtl::toStr($font_name) . \Runtime\rtl::toStr("';"),"  font-weight: normal;","  font-style: normal;","  src: url(\${ Component::assets('" . \Runtime\rtl::toStr($font_name) . \Runtime\rtl::toStr("/") . \Runtime\rtl::toStr($font_name) . \Runtime\rtl::toStr(".ttf') });"),"}"]));
		}
		$file_css_path = \Runtime\fs::join(\Runtime\Vector::from([$font_path,"style.scss"]));
		\Runtime\fs::saveFile($file_css_path, $css_content);
		/* Rebuild assets */
		$this->rebuild();
	}
	/**
	 * Delete item
	 */
	function deleteItem()
	{
		$font_name = $this->item->get("name");
		$font_path = \Runtime\fs::join(\Runtime\Vector::from([$this->fonts_path,$font_name]));
		shell_exec("rm -rf $font_path");
	}
	/**
	 * Upload file
	 */
	function uploadFile($file)
	{
		/* Create file */
		$folder_path = $this->item->get("path");
		$file_upload_path = \Runtime\fs::join(\Runtime\Vector::from([$folder_path,$file->getName()]));
		$content = \Runtime\fs::readFile($file->getPath());
		\Runtime\fs::saveFile($file_upload_path, $content);
	}
	/**
	 * Delete file
	 */
	function deleteFile($file_name)
	{
		/* Upload file */
		$folder_path = $this->item->get("path");
		$file_path = \Runtime\fs::join(\Runtime\Vector::from([$folder_path,$file_name]));
		/* Remove file */
		if (\Runtime\fs::exists($file_path))
		{
			\Runtime\fs::unlink($file_path);
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->project = null;
		$this->assets_path = "";
		$this->fonts_path = "";
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend.Service";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.Service.FontService";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.CrudService";
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