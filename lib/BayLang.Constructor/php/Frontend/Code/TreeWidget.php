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
namespace BayLang\Constructor\Frontend\Code;
class TreeWidget extends \Runtime\Widget\Tree\TreeWidget
{
	function renderItemContent($item, $path)
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'span' */
		$__v0 = new \Runtime\Vector();
		
		if ($item->kind == "dir")
		{
			if (!$item->is_loaded)
			{
				/* Element 'span' */
				$__v1 = new \Runtime\Vector();
				
				/* Raw */
				$this->_t($__v1, new \Runtime\RawString("&#128448;"));
				
				/* Element 'span' */
				$this->_e($__v0, "span", [], $__v1);
			}
			else if ($item->open)
			{
				/* Element 'span' */
				$__v1 = new \Runtime\Vector();
				
				/* Raw */
				$this->_t($__v1, new \Runtime\RawString("&#128449;"));
				
				/* Element 'span' */
				$this->_e($__v0, "span", [], $__v1);
			}
			else
			{
				/* Element 'span' */
				$__v1 = new \Runtime\Vector();
				
				/* Raw */
				$this->_t($__v1, new \Runtime\RawString("&#128448;"));
				
				/* Element 'span' */
				$this->_e($__v0, "span", [], $__v1);
			}
		}
		else
		{
			/* Element 'span' */
			$__v1 = new \Runtime\Vector();
			
			/* Raw */
			$this->_t($__v1, new \Runtime\RawString("&#128462;"));
			
			/* Element 'span' */
			$this->_e($__v0, "span", [], $__v1);
		}
		
		/* Element 'span' */
		$this->_e($__v, "span", ["class" => $this->_class_name(["tree_widget__item_icon"])], $__v0);
		
		/* Text */
		$this->_t($__v, $this->renderItemLabel($item, $path));
		
		return $__v;
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Tree.TreeWidget"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".tree_widget__item_icon.h-67f7{display: inline-block;font-family: monospace;text-align: center;cursor: pointer;width: 24px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Code";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Code.TreeWidget";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Tree.TreeWidget";
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