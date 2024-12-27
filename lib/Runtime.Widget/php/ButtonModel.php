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
namespace Runtime\Widget;
class ButtonModel extends \Runtime\Web\BaseModel
{
	public $styles;
	public $component;
	public $content;
	public $target;
	public $href;
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null)
		{
			return ;
		}
		if ($params->has("content"))
		{
			$this->content = $params->get("content");
		}
		if ($params->has("styles"))
		{
			$this->styles = $params->get("styles");
		}
		if ($params->has("href"))
		{
			$this->href = $params->get("href");
		}
	}
	/**
	 * Returns content
	 */
	function getContent()
	{
		return $this->content;
	}
	/**
	 * On click
	 */
	function onClick($data=null)
	{
		$this->emit(new \Runtime\Web\Messages\ClickMessage(\Runtime\Map::from(["data"=>$data])));
	}
	/**
	 * Returns props
	 */
	function getProps($data)
	{
		$result = \Runtime\Map::from(["content"=>$this->content,"styles"=>$this->styles,"target"=>$this->target]);
		/* Add href */
		if ($this->href)
		{
			if (\Runtime\rtl::isCallable($this->href))
			{
				$result->set("href", \Runtime\rtl::apply($this->href, \Runtime\Vector::from([$data])));
			}
			else
			{
				$result->set("href", $this->href);
			}
		}
		return $result;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->styles = \Runtime\Vector::from([]);
		$this->component = "Runtime.Widget.ButtonWrap";
		$this->content = null;
		$this->target = "_self";
		$this->href = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.ButtonModel";
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