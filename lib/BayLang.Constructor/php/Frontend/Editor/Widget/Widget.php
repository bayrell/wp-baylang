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
namespace BayLang\Constructor\Frontend\Editor\Widget;
class Widget extends \Runtime\BaseObject
{
	public $code;
	public $parent_code;
	public $page_model;
	public $tree_item;
	public $params;
	public $settings;
	function __construct($page_model, $code)
	{
		parent::__construct();
		$this->code = $code;
		$this->page_model = $page_model;
	}
	/**
	 * Returns true if component
	 */
	function isComponent()
	{
		return false;
	}
	/**
	 * Returns true if tag has model
	 */
	function isModel()
	{
		return false;
	}
	/**
	 * Can insert widget
	 */
	function canInsert($widget_settings)
	{
		return false;
	}
	/**
	 * Update tree item
	 */
	function updateTreeItem()
	{
		if (!$this->tree_item)
		{
			$this->tree_item = new \BayLang\Constructor\Frontend\Editor\WidgetTreeItem($this->code);
		}
		/* Update label */
		$this->tree_item->updateLabel();
	}
	/**
	 * Update tree items
	 */
	function updateTreeItems()
	{
		/* Create tree item if does not exists */
		if (!$this->tree_item)
		{
			$this->updateTreeItem();
		}
		/* Update items */
		$this->tree_item->items = \Runtime\Vector::from([]);
		if ($this->code->items instanceof \BayLang\OpCodes\OpHtmlItems)
		{
			for ($i = 0; $i < $this->code->items->count(); $i++)
			{
				$op_code_item = $this->code->items->get($i);
				$widget_item = $this->page_model->widget_manager->get($op_code_item);
				$this->tree_item->items->push($widget_item->tree_item);
			}
		}
	}
	/**
	 * Reset widget
	 */
	function reset()
	{
		$this->is_initialized = false;
		$this->settings = null;
	}
	/**
	 * Setup
	 */
	function setup()
	{
		if ($this->is_initialized)
		{
			return ;
		}
		/* Setup settings */
		$this->setupSettings();
		/* Setup params */
		$this->setupParams();
		/* Setup attrs */
		$this->setupAttrs();
		/* Init params */
		$this->initParams();
		/* Set flag initialized */
		$this->is_initialized = true;
	}
	/**
	 * Setup settings
	 */
	function setupSettings()
	{
	}
	/**
	 * Setup attrs
	 */
	function setupAttrs()
	{
	}
	/**
	 * Setup params
	 */
	function setupParams()
	{
	}
	/**
	 * Init params
	 */
	function initParams()
	{
		$this->params->each(function ($param)
		{
			$param->init();
		});
		/* Setup widget settings */
		if ($this->settings && \Runtime\rtl::exists($this->settings->setup))
		{
			$this->settings->setup($this);
		}
	}
	/**
	 * Create new instance
	 */
	static function newInstance($page_model, $op_code)
	{
		if (!($op_code instanceof \BayLang\OpCodes\OpHtmlTag))
		{
			return null;
		}
		$selected_tag_name = $op_code->tag_name;
		if (\BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::isComponent($selected_tag_name))
		{
			return new \BayLang\Constructor\Frontend\Editor\Widget\WidgetComponent($page_model, $op_code);
		}
		/* Lower tag name */
		$selected_tag_name = \Runtime\rs::lower($selected_tag_name);
		return new \BayLang\Constructor\Frontend\Editor\Widget\WidgetTag($page_model, $op_code);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->code = null;
		$this->parent_code = null;
		$this->page_model = null;
		$this->tree_item = null;
		$this->params = \Runtime\Vector::from([]);
		$this->settings = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.Widget";
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