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
class Selector extends \Runtime\BaseObject
{
	public $parent_widget;
	public $op_code;
	public $selector_name;
	public $source;
	public $content;
	public $css_ignore;
	public $styles;
	/**
	 * Translate CSS
	 */
	static function translateCSS($parser, $translator, $source)
	{
		/* Parse source */
		$op_code = null;
		try
		{
			
			$parser = $parser::setContent($parser, $source . \Runtime\rtl::toStr("}"));
			$res = $parser->parser_html::readCssBody($parser);
			$op_code = $res->get(1);
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserUnknownError)
			{
				$e = $_ex;
			}
			else
			{
				throw $_ex;
			}
		}
		/* Translate source */
		if (!$op_code)
		{
			return "";
		}
		$translator = \Runtime\rtl::setAttr($translator, ["is_static_function"], true);
		$res = $translator->expression::Expression($translator, $op_code);
		return $res->get(1);
	}
	/**
	 * Parse CSS
	 */
	static function parseCSS($parser, $content)
	{
		$caret = new \BayLang\Caret(\Runtime\Map::from(["content"=>new \Runtime\Reference($content)]));
		$start = 0;
		$styles = \Runtime\Vector::from([]);
		$css_ignore = \Runtime\Vector::from([]);
		while (!$caret->eof())
		{
			$ch = $caret->nextChar();
			$ch2 = $caret->nextString(2);
			if ($ch == "{")
			{
				$level = 1;
				if ($start != $caret->pos)
				{
					$s = \Runtime\rs::substr($content, $start, $caret->pos - $start);
					$css_ignore->push($s);
				}
				$start = $caret->pos;
				while (!$caret->eof() && ($ch != "}" && $level == 0 || $level > 0))
				{
					$caret->readChar();
					$ch = $caret->nextChar();
					if ($ch == "{")
					{
						$level = $level + 1;
					}
					if ($ch == "}")
					{
						$level = $level - 1;
					}
				}
				if ($start != $caret->pos)
				{
					$css_ignore->push(\Runtime\rs::substr($content, $start, $caret->pos - $start + 1));
				}
				if ($caret->pos < $caret->content_sz)
				{
					$start = $caret->pos + 1;
				}
			}
			else if ($ch2 == "\${")
			{
				/* Save caret */
				$caret->matchString("\${");
				$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
				/* Read expression */
				try
				{
					
					$res = $parser->parser_expression::readExpression($parser);
					$parser = \Runtime\rtl::attr($res, 0);
				}
				catch (\Exception $_ex)
				{
					if ($_ex instanceof \BayLang\Exceptions\ParserUnknownError)
					{
						$e = $_ex;
					}
					else
					{
						throw $_ex;
					}
				}
				/* Restore caret */
				$caret = $parser->getCaret();
				$caret->skipSpace();
				if ($caret->isNextChar("}"))
				{
					$caret->matchChar("}");
				}
			}
			else if ($ch == ";")
			{
				$caret->readChar();
				$s = \Runtime\rs::substr($content, $start, $caret->pos - $start);
				$styles->push($s);
				$start = $caret->pos;
			}
			else
			{
				$caret->readChar();
			}
		}
		if ($start != $caret->pos)
		{
			$styles->push(\Runtime\rs::substr($content, $start, $caret->pos - $start));
		}
		return \Runtime\Vector::from([\Runtime\rs::join("", $styles),\Runtime\rs::join("", $css_ignore)]);
	}
	/**
	 * Build content
	 */
	function buildContent()
	{
		$items = \Runtime\Vector::from([]);
		$keys = $this->styles->keys()->sort();
		for ($i = 0; $i < $keys->count(); $i++)
		{
			$key = $keys->get($i);
			$value = $this->styles->get($key);
			$items->push($key . \Runtime\rtl::toStr(": ") . \Runtime\rtl::toStr($value->buildValue()));
		}
		$items->push($this->css_ignore);
		$source = \Runtime\rs::join(";\n", $items);
		return \Runtime\rs::trim($source);
	}
	/**
	 * Create style
	 */
	function createStyle($key)
	{
		if ($key == "background-image")
		{
			$value = new \BayLang\Constructor\Frontend\Editor\Styles\BackgroundImage();
		}
		else
		{
			$value = new \BayLang\Constructor\Frontend\Editor\Styles\StyleItem();
		}
		$value->key = $key;
		return $value;
	}
	/**
	 * Returns style
	 */
	function getStyle($key)
	{
		if (!$this->styles->has($key))
		{
			return null;
		}
		return $this->styles->get($key);
	}
	/**
	 * Set style value
	 */
	function setStyleValue($key, $value)
	{
		$value = \Runtime\rs::trim($value);
		if ($value != "")
		{
			/* Get CSS Value */
			$css_value = $this->getStyle($key);
			if (!$css_value)
			{
				$css_value = $this->createStyle($key);
				$this->styles->set($css_value->key, $css_value);
			}
			/* Set CSS Value */
			$css_value->setValue($value);
		}
		else
		{
			/* Remove style item */
			if ($this->styles->has($key))
			{
				$this->styles->remove($key);
			}
		}
		/* Update source */
		$source = $this->buildContent();
		$this->setContent($source, false);
	}
	/**
	 * Change style value
	 */
	function changeStyleValue($key, $value)
	{
		/* Set CSS Value */
		$this->setStyleValue($key, $value);
		/* Update CSS */
		$this->parent_widget->parent_widget->updateFrameCSS();
	}
	/**
	 * Parse styles
	 */
	function parseStyles()
	{
		$content = $this->source;
		/* Create parser */
		$component_processor = $this->parent_widget->parent_widget->component_processor;
		$parser = $component_processor->createParser();
		$parser = $parser::setContent($parser, $content);
		/* Parse CSS */
		$res = static::parseCSS($parser, $content);
		/* CSS Values */
		$this->styles = \Runtime\Map::from([]);
		$items = \Runtime\rs::split(";", $res->get(0));
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$pos = \Runtime\rs::indexOf($item, ":");
			if ($pos == -1)
			{
				continue;
			}
			$item_key = \Runtime\rs::trim(\Runtime\rs::substr($item, 0, $pos));
			$item_value = \Runtime\rs::trim(\Runtime\rs::substr($item, $pos + 1));
			$value = $this->createStyle($item_key);
			$value->initValue($item_value);
			$this->styles->set($value->key, $value);
		}
		/* CSS Ignore */
		$this->css_ignore = \Runtime\rs::trim($res->get(1));
	}
	/**
	 * Set content
	 */
	function setContent($source, $parse_styles=true)
	{
		$component_processor = $this->parent_widget->parent_widget->component_processor;
		$parser = $component_processor->createParser();
		$translator = $component_processor->createTranslator();
		/* Parse CSS */
		$css_code = $this->selector_name . \Runtime\rtl::toStr("{") . \Runtime\rtl::toStr($source) . \Runtime\rtl::toStr("}");
		$content = static::translateCSS($parser, $translator, $css_code);
		/* Set content */
		$this->source = $source;
		$this->content = $content;
		if ($parse_styles)
		{
			$this->parseStyles();
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->parent_widget = null;
		$this->op_code = null;
		$this->selector_name = "";
		$this->source = "";
		$this->content = "";
		$this->css_ignore = "";
		$this->styles = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.Selector";
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