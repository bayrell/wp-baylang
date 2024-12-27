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
namespace BayLang\Constructor\WidgetPage;
class EditorProvider extends \Runtime\BaseProvider
{
	public $groups;
	public $managers;
	public $widgets;
	public $settings;
	/**
	 * Add group
	 */
	function addGroup($group)
	{
		$group_name = $group->get("name");
		$item = $this->groups->findItem(\Runtime\lib::equalAttr("name", $group_name));
		if ($item != null)
		{
			return ;
		}
		$this->groups->push($group);
	}
	/**
	 * Init provider
	 */
	function init()
	{
		/* Get widgets managers */
		$managers = \Runtime\rtl::getContext()->getEntities("BayLang.Constructor.WidgetPage.WidgetManagerAnnotation");
		for ($i = 0; $i < $managers->count(); $i++)
		{
			$annotation = $managers->get($i);
			$this->managers->push($annotation->factory());
		}
		/* Get widgets */
		for ($i = 0; $i < $this->managers->count(); $i++)
		{
			$manager = $this->managers->get($i);
			/* Get groups settings */
			$groups = $manager->getGroupSettings();
			$group_names = $groups->keys();
			for ($j = 0; $j < $group_names->count(); $j++)
			{
				$group_name = $group_names->get($j);
				$group = $groups->get($group_name);
				$group->set("name", $group_name);
				$this->addGroup($group);
			}
			/* Get widgets settings */
			$widgets = $manager->getWidgetSettings();
			for ($j = 0; $j < $widgets->count(); $j++)
			{
				$widget_settings = $widgets->get($j);
				/* Add widget */
				$this->widgets->push($widget_settings);
				/* Add settings */
				$this->settings->set($widget_settings::getClassName(), $widget_settings);
				/* Add widget by model name */
				if ($widget_settings->isModel())
				{
					$this->settings->set($widget_settings->getModelName(), $widget_settings);
				}
				else
				{
					$this->settings->set($widget_settings->getComponentName(), $widget_settings);
				}
			}
		}
		/* Widgets init */
		for ($i = 0; $i < $this->managers->count(); $i++)
		{
			$manager = $this->managers->get($i);
			$manager->init($this);
		}
		/* Sort groups */
		$this->groups = $this->groups->sort(\Runtime\lib::sortAttr("priority", "asc"));
	}
	/**
	 * Returns groups list
	 */
	function getGroups()
	{
		return $this->groups->slice();
	}
	/**
	 * Returns widgets list
	 */
	function getWidgets()
	{
		return $this->widgets->slice();
	}
	/**
	 * Returns widget settings
	 */
	function get($class_name)
	{
		return $this->settings->get($class_name);
	}
	/**
	 * Get model settings
	 */
	function getModelSettings($widget)
	{
		/* Find settings */
		for ($i = 0; $i < $this->widgets->count(); $i++)
		{
			$settings = $this->widgets->get($i);
			if (!$settings->isModel())
			{
				continue;
			}
			if ($settings->checkWidget($widget))
			{
				return $settings;
			}
		}
		return null;
	}
	/**
	 * Get widget settings
	 */
	function getWidgetSettings($widget)
	{
		/* Find settings */
		for ($i = 0; $i < $this->widgets->count(); $i++)
		{
			$settings = $this->widgets->get($i);
			if ($settings->isModel())
			{
				continue;
			}
			if ($settings->checkWidget($widget))
			{
				return $settings;
			}
		}
		return null;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->groups = \Runtime\Vector::from([]);
		$this->managers = \Runtime\Vector::from([]);
		$this->widgets = \Runtime\Vector::from([]);
		$this->settings = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.WidgetPage";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.WidgetPage.EditorProvider";
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