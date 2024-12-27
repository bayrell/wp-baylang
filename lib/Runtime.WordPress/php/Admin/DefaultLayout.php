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
namespace Runtime\WordPress\Admin;
class DefaultLayout extends \Runtime\Web\DefaultLayout
{
	function renderTitle()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, "    ");
		
		/* Element 'h1' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($this->layout->title));
		
		/* Element 'h1' */
		$this->_e($__v, "h1", ["class" => $this->_class_name(["wp-heading-inline"])], $__v0);
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, "    ");
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderTitle());
		
		/* Text */
		$this->_t($__v0, $this->renderCurrentPage());
		
		/* Text */
		$this->_t($__v0, "    ");
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["default_layout wrap"])], $__v0);
		
		return $this->_flatten($__v);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Web.DefaultLayout"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".wp-heading-inline.h-f4f4{padding: 0;margin-bottom: 14px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.DefaultLayout";
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