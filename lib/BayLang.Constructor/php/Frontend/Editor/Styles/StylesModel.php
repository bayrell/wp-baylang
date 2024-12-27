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
namespace BayLang\Constructor\Frontend\Editor\Styles;
class StylesModel extends \Runtime\Web\BaseModel
{
	public $component;
	public $widget_name;
	public $selectors;
	public $main_style_code;
	/**
	 * Returns CSS content
	 */
	function getCSS()
	{
		$items = \Runtime\Vector::from([]);
		$selectors = $this->selectors->keys()->sort();
		for ($i = 0; $i < $selectors->count(); $i++)
		{
			$selector_name = $selectors->get($i);
			$item = $this->selectors->get($selector_name);
			$items->push($item->content);
		}
		return $items;
	}
	/**
	 * Returns source
	 */
	static function getCSSCode($selector_name, $source)
	{
		return $selector_name . \Runtime\rtl::toStr("{") . \Runtime\rtl::toStr($source) . \Runtime\rtl::toStr("}");
	}
	/**
	 * Returns selector by selector name
	 */
	function getSelector($selector_name)
	{
		if (!$this->selectors->has($selector_name))
		{
			return null;
		}
		return $this->selectors->get($selector_name);
	}
	/**
	 * Returns selector content
	 */
	function getSelectorContent($selector_name)
	{
		if (!$this->selectors->has($selector_name))
		{
			return "";
		}
		return $this->selectors->get($selector_name)->source;
	}
	/**
	 * Create style item
	 */
	function createSelector($selector_name, $op_code=null)
	{
		if ($op_code == null)
		{
			$op_code = $this->main_style_code;
		}
		$selector = new \BayLang\Constructor\Frontend\Editor\Styles\Selector();
		$selector->op_code = $op_code;
		$selector->selector_name = $selector_name;
		$selector->parent_widget = $this;
		$this->selectors->set($selector_name, $selector);
		return $selector;
	}
	/**
	 * Set css content
	 */
	function setSelectorContent($selector_name, $source, $op_code=null)
	{
		/* Default item */
		if ($op_code == null)
		{
			$op_code = $this->main_style_code;
		}
		/* Create style item if does not exists */
		if (!$this->selectors->has($selector_name))
		{
			$this->createSelector($selector_name, $op_code);
		}
		/* Set content */
		$selector = $this->selectors->get($selector_name);
		$selector->setContent($source);
	}
	/**
	 * Change css content
	 */
	function changeSelectorContent($selector_name, $value)
	{
		/* Set CSS Value */
		$this->setSelectorContent($selector_name, $value);
		/* Update CSS */
		$this->parent_widget->updateFrameCSS();
	}
	/**
	 * Clear styles
	 */
	function clear()
	{
		$this->selectors = \Runtime\Map::from([]);
	}
	/**
	 * Setup styles
	 */
	function setupStyles($op_code)
	{
		$op_code_class = $op_code->findClass();
		if (!$op_code_class)
		{
			return ;
		}
		/* Add styles */
		for ($i = 0; $i < $op_code_class->items->count(); $i++)
		{
			$item = $op_code_class->items->get($i);
			if ($item instanceof \BayLang\OpCodes\OpHtmlStyle)
			{
				$this->addHtmlStyle($item);
			}
		}
		/* Add style if not exists */
		if ($this->main_style_code == null)
		{
			$this->createMainHtmlStyle($op_code);
		}
	}
	/**
	 * Create main HTML Style
	 */
	function createMainHtmlStyle($op_code)
	{
		if ($this->main_style_code != null)
		{
			return ;
		}
		$op_code_class = $op_code->findClass();
		if (!$op_code_class)
		{
			return ;
		}
		/* Create main style code */
		$this->main_style_code = new \BayLang\OpCodes\OpHtmlStyle(\Runtime\Map::from(["value"=>new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>""]))]));
		/* Find use */
		$pos = -1;
		for ($i = 0; $i < $op_code->items->count(); $i++)
		{
			if ($op_code->items->get($i) instanceof \BayLang\OpCodes\OpUse)
			{
				$pos = $i;
			}
		}
		/* Register main style */
		$op_code_class->items->add($this->main_style_code, $pos);
	}
	/**
	 * Add HTML style
	 */
	function addHtmlStyle($op_code)
	{
		if ($this->main_style_code == null)
		{
			$this->main_style_code = $op_code;
		}
		$styles = $op_code->readStyles();
		$arr = $styles->keys();
		for ($i = 0; $i < $arr->count(); $i++)
		{
			$selector_name = $arr->get($i);
			if ($this->selectors->has($selector_name))
			{
				continue;
			}
			/* Set CSS Value */
			$source = $styles->get($selector_name);
			$this->setSelectorContent($selector_name, $source, $op_code);
		}
	}
	/**
	 * Update HTML Style
	 */
	function updateHtmlStyle($op_code)
	{
		/* Build style source */
		$source = \Runtime\Vector::from([]);
		$selectors = $this->selectors->keys()->sort();
		for ($i = 0; $i < $selectors->count(); $i++)
		{
			$selector_name = $selectors->get($i);
			$selector = $this->selectors->get($selector_name);
			if ($selector->op_code != $op_code)
			{
				continue;
			}
			/* Add content to source */
			$source->push($selector_name . \Runtime\rtl::toStr("{"));
			$lines = \Runtime\rs::split("\n", $selector->source);
			$lines = $lines->map(function ($s)
			{
				return "\t" . \Runtime\rtl::toStr($s);
			});
			$source->appendItems($lines);
			$source->push("}");
		}
		/* Set content to html style op_code */
		$content = \Runtime\rs::join("\n", $source);
		$op_code->content = $content;
		if ($op_code->value instanceof \BayLang\OpCodes\OpString)
		{
			$op_code->value->value = $content;
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Editor.Styles.Styles";
		$this->widget_name = "styles";
		$this->selectors = \Runtime\Map::from([]);
		$this->main_style_code = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.StylesModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseModel";
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