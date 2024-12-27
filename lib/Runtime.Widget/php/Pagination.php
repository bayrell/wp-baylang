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
class Pagination extends \Runtime\Web\Component
{
	public $page;
	public $pages;
	public $delta;
	public $name;
	function render()
	{
		$__v = new \Runtime\Vector();
		$page_start = \Runtime\Math::max(2, $this->page - $this->delta + 1);
		$page_end = \Runtime\Math::min($this->page + $this->delta, $this->pages - 1);
		$props = \Runtime\Map::from([]);
		
		/* Element 'nav' */
		$__v0 = new \Runtime\Vector();
		
		if ($this->pages > 1)
		{
			/* Element 'ul' */
			$__v1 = new \Runtime\Vector();
			
			if ($this->name)
			{
				$_ = $props->set("href", $this->getPageUrl(1));
			}
			
			/* Element 'li' */
			$__v2 = new \Runtime\Vector();
			
			/* Element 'a' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, "1");
			
			/* Element 'a' */
			$this->_e($__v2, "a", $this->_merge_attrs([], $props), $__v3);
			
			/* Element 'li' */
			$this->_e($__v1, "li", ["class" => $this->_class_name([(($this->page == 1) ? ("active") : (""))])], $__v2);
			
			if ($page_start > 2)
			{
				/* Element 'li' */
				$__v2 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v2, "...");
				
				/* Element 'li' */
				$this->_e($__v1, "li", [], $__v2);
			}
			
			if ($page_start <= $page_end)
			{
				for ($p = $page_start; $p <= $page_end; $p++)
				{
					if ($this->name)
					{
						$_ = $props->set("href", $this->getPageUrl($p));
					}
					
					/* Element 'li' */
					$__v2 = new \Runtime\Vector();
					
					/* Element 'a' */
					$__v3 = new \Runtime\Vector();
					
					/* Text */
					$this->_t($__v3, $this->_escape($p));
					
					/* Element 'a' */
					$this->_e($__v2, "a", $this->_merge_attrs([], $props), $__v3);
					
					/* Element 'li' */
					$this->_e($__v1, "li", ["class" => $this->_class_name([(($this->page == $p) ? ("active") : (""))])], $__v2);
				}
			}
			
			if ($page_end < $this->pages - 1)
			{
				/* Element 'li' */
				$__v2 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v2, "...");
				
				/* Element 'li' */
				$this->_e($__v1, "li", [], $__v2);
			}
			
			if ($this->pages > 1)
			{
				if ($this->name)
				{
					$_ = $props->set("href", $this->getPageUrl($this->pages));
				}
				
				/* Element 'li' */
				$__v2 = new \Runtime\Vector();
				
				/* Element 'a' */
				$__v3 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v3, $this->_escape($this->pages));
				
				/* Element 'a' */
				$this->_e($__v2, "a", $this->_merge_attrs([], $props), $__v3);
				
				/* Element 'li' */
				$this->_e($__v1, "li", ["class" => $this->_class_name([(($this->page == $this->pages) ? ("active") : (""))])], $__v2);
			}
			
			/* Element 'ul' */
			$this->_e($__v0, "ul", [], $__v1);
		}
		
		/* Element 'nav' */
		$this->_e($__v, "nav", ["class" => $this->_class_name(["pagination"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns page url
 */
	function getPageUrl($page)
	{
		$uri = $this->layout->request_full_uri;
		return \Runtime\rs::url_get_add($uri, $this->name, $page);
	}
	/**
 * Click event
 */
	function onClick($page)
	{
		if ($this->name)
		{
			return ;
		}
		$this->emit("page", $page);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".pagination.h-e7d6{text-align: center;padding: 10px 0;width: 100%}.pagination.h-e7d6 ul,.pagination.h-e7d6 li{padding: 0;margin: 0}.pagination.h-e7d6 li{display: inline-block;vertical-align: top;list-style: none;margin-left: 5px;margin-right: 5px}.pagination.h-e7d6 a,.pagination.h-e7d6 a:hover,.pagination.h-e7d6 span{display: flex;align-items: center;justify-content: center;background-color: var(--widget-color-table-background);border-color: var(--widget-color-border);border-width: var(--widget-border-width);border-style: solid;border-radius: 4px;color: var(--widget-color-text);text-align: center;width: 30px;height: 30px;line-height: 0;font-size: 14px;text-decoration: none}.pagination.h-e7d6 li:first-child{margin-left: 0px}.pagination.h-e7d6 li.active a,.pagination.h-e7d6 li.active a:hover{background-color: var(--widget-color-selected);border-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.pagination.h-e7d6 li a:focus{outline: 0;box-shadow: none}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->page = 1;
		$this->pages = 1;
		$this->delta = 5;
		$this->name = "";
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Pagination";
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