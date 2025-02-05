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
namespace Runtime\Web;
class EmailLayout extends \Runtime\Web\DefaultLayout
{
	function renderTitle()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'title' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($this->layout->title));
		
		/* Element 'title' */
		$this->_e($__v, "title", [], $__v0);
		
		/* Element 'meta' */
		$this->_e($__v, "meta", ["charset" => $this->layout->content_type]);
		
		/* Element 'meta' */
		$this->_e($__v, "meta", ["http-equiv" => "Content-Type","content" => "text/html; " . \Runtime\rtl::toStr($this->layout->content_type)]);
		
		/* Element 'meta' */
		$this->_e($__v, "meta", ["http-equiv" => "Content-Language","content" => $this->layout->getLocale()]);
		
		return $__v;
	}
	function renderCSS()
	{
		$__v = new \Runtime\Vector();
		$css = $this->getCSS();
		
		if ($css)
		{
			/* Element 'style' */
			$__v0 = new \Runtime\Vector();
			
			/* Raw */
			$this->_t($__v0, new \Runtime\RawString($css));
			
			/* Element 'style' */
			$this->_e($__v, "style", ["id" => "core-css","class" => $this->_class_name(["components"])], $__v0);
		}
		
		return $__v;
	}
	function renderCoreUI()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'html' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'head' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, static::renderTitle());
		
		/* Text */
		$this->_t($__v1, static::renderCSS());
		
		/* Element 'head' */
		$this->_e($__v0, "head", [], $__v1);
		
		/* Element 'body' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, static::render());
		
		/* Element 'body' */
		$this->_e($__v0, "body", [], $__v1);
		
		/* Element 'html' */
		$this->_e($__v, "html", ["lang" => $this->layout->getLocale()], $__v0);
		
		return $__v;
	}
	/**
 * Returns CSS
 */
	function getCSS()
	{
		return \Runtime\Web\BaseLayoutModel::getCSS($this->getComponents());
	}
	/**
 * Returns components
 */
	function getComponents()
	{
		$res = new \Runtime\Vector();
		$cache = new \Runtime\Map();
		/* Init components */
		$components = $this->layout->components->copy();
		$components->push($this->layout->getPageClassName());
		$components->push(static::getClassName());
		/* Extends components */
		\Runtime\Web\BaseLayoutModel::_getRequiredComponents($res, $cache, $components);
		return $res->removeDuplicates();
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Web.DefaultLayout"]);
	}
	static function css($vars)
	{
		$res = "";
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.EmailLayout";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.DefaultLayout";
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