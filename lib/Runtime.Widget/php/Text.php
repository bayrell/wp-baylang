<?php
/*
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
namespace Runtime\Widget;
class Text extends \Runtime\Web\Component
{
	public $tag;
	public $raw;
	public $content;
	function renderText($content)
	{
		$__v = new \Runtime\Vector();
		
		if ($this->raw == "true")
		{
			/* Raw */
			$this->_t($__v, new \Runtime\RawString($content));
		}
		else
		{
			/* Text */
			$this->_t($__v, $this->_escape($content));
		}
		
		return $__v;
	}
	function renderContent()
	{
		$__v = new \Runtime\Vector();
		$content = \Runtime\rs::split("\n", $this->content);
		
		if ($content->count() == 1)
		{
			/* Text */
			$this->_t($__v, $this->renderText($content->get(0)));
		}
		else
		{
			for ($i = 0; $i < $content->count(); $i++)
			{
				$item = $content->get($i);
				
				/* Element 'div' */
				$__v0 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v0, $this->renderText($item));
				
				/* Element 'div' */
				$this->_e($__v, "div", [], $__v0);
			}
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->tag == "p")
		{
			/* Element 'p' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderContent());
			
			/* Element 'p' */
			$this->_e($__v, "p", ["class" => $this->_class_name(["widget_text", $this->class])], $__v0);
		}
		else if ($this->tag == "h1")
		{
			/* Element 'h1' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderContent());
			
			/* Element 'h1' */
			$this->_e($__v, "h1", ["class" => $this->_class_name(["widget_text", $this->class])], $__v0);
		}
		else if ($this->tag == "h2")
		{
			/* Element 'h2' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderContent());
			
			/* Element 'h2' */
			$this->_e($__v, "h2", ["class" => $this->_class_name(["widget_text", $this->class])], $__v0);
		}
		else if ($this->tag == "h3")
		{
			/* Element 'h3' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderContent());
			
			/* Element 'h3' */
			$this->_e($__v, "h3", ["class" => $this->_class_name(["widget_text", $this->class])], $__v0);
		}
		else if ($this->tag == "h4")
		{
			/* Element 'h4' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderContent());
			
			/* Element 'h4' */
			$this->_e($__v, "h4", ["class" => $this->_class_name(["widget_text", $this->class])], $__v0);
		}
		else if ($this->tag == "html")
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderContent());
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_text", $this->class])], $__v0);
		}
		else
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderContent());
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_text", $this->class])], $__v0);
		}
		
		return $this->_flatten($__v);
	}
	/**
 * Returns key
 */
	function getKey()
	{
		$key = $this->tag;
		if ($this->raw == "true")
		{
			$key = $key . \Runtime\rtl::toStr("-raw");
		}
		return $key;
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_text.h-8fb5{padding: 0;margin: 0}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->tag = "text";
		$this->raw = "false";
		$this->content = "Text";
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Text";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Component";
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