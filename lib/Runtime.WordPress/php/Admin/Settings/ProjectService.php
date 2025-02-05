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
namespace Runtime\WordPress\Admin\Settings;
class ProjectService extends \BayLang\Constructor\Backend\Service\ProjectService
{
	/**
	 * Validate data
	 */
	function validate()
	{
		parent::validate();
		/* Check if project is exist */
		if ($this->isCreate())
		{
			$theme_root_path = "";
			$api_name = $this->data->get("id");
			$theme_root_path = get_theme_root();
			/* Check theme is exists */
			$theme_path = \Runtime\fs::join(\Runtime\Vector::from([$theme_root_path,$api_name]));
			if (\Runtime\fs::exists($theme_path))
			{
				$this->rules->addFieldError("api_name", "Api name is exists");
			}
		}
	}
	/**
	 * Before save
	 */
	function onSaveBefore()
	{
		parent::onSaveBefore();
		if (!$this->rules->correct())
		{
			return ;
		}
		/* Create project */
		if ($this->isCreate())
		{
			$this->createProject();
		}
	}
	/**
	 * Create project
	 */
	function createProject()
	{
		$api_name = $this->data->get("id");
		$file_archive = "";
		$theme_root_path = "";
		$theme_root_path = get_theme_root();
		$file_archive = \BayLang_Plugin::getPath() . "/files/clear-wp-theme.zip";
		/* Create theme path */
		$theme_path = \Runtime\fs::join(\Runtime\Vector::from([$theme_root_path,$api_name]));
		if (!\Runtime\fs::exists($theme_path))
		{
			\Runtime\fs::mkdir($theme_path);
		}
		/* Copy project */
		shell_exec("unzip $file_archive -d $theme_path");
		/* Reload project */
		$this->item = \BayLang\Helper\Project::readProject($theme_path);
		$this->item->load();
	}
	/**
	 * Save item
	 */
	function saveItem()
	{
		parent::saveItem();
		/* If project exists */
		if (!$this->item->path)
		{
			return ;
		}
		/* Theme settings */
		$theme_name = $this->item->getName();
		$theme_description = $this->item->getDescription();
		/* Trim name and description */
		$theme_name = \Runtime\rs::trim($theme_name);
		$theme_description = \Runtime\rs::trim($theme_description);
		$theme_description = \Runtime\re::replace("[\n\r]", " ", $theme_description);
		$theme_description = \Runtime\re::replace(" +", " ", $theme_description);
		/* Save wordpress */
		$style_css_path = \Runtime\fs::join(\Runtime\Vector::from([$this->item->path,"style.css"]));
		$style_css_content = \Runtime\rs::join("\n", \Runtime\Vector::from(["/*"," * Theme Name: " . \Runtime\rtl::toStr($theme_name)," * Description: " . \Runtime\rtl::toStr($theme_description)," */"]));
		\Runtime\fs::saveFile($style_css_path, $style_css_content);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Settings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Settings.ProjectService";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Backend.Service.ProjectService";
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