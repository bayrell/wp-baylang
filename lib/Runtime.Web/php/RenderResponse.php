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
namespace Runtime\Web;
class RenderResponse extends \Runtime\Web\Response
{
	public $container;
	function __construct($container)
	{
		parent::__construct();
		$this->container = $container;
	}
	/**
	 * Returns content
	 */
	function getContent($render_core_ui=true)
	{
		if ($this->content)
		{
			return $this->content;
		}
		/* Create component */
		$component = \Runtime\rtl::newInstance($this->container->layout->component);
		$component->container = $this->container;
		$component->layout = $this->container->layout;
		$component->model = $this->container->layout;
		/* Render component */
		$content = \Runtime\Vector::from(["<!DOCTYPE html>\n",($render_core_ui) ? ($component->renderCoreUI()) : ($component->renderApp())]);
		$this->content = \Runtime\RawString::normalize($content);
		return $this->content;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->container = null;
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.RenderResponse";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Response";
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