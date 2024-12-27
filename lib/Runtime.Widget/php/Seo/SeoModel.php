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
namespace Runtime\Widget\Seo;
class SeoModel extends \Runtime\Web\BaseModel
{
	public $component;
	public $widget_name;
	public $canonical_url;
	public $description;
	public $favicon;
	public $article_published_time;
	public $article_modified_time;
	public $robots;
	public $tags;
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
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "article_modified_time", $data);
		$serializer->process($this, "article_published_time", $data);
		$serializer->process($this, "canonical_url", $data);
		$serializer->process($this, "description", $data);
		$serializer->process($this, "favicon", $data);
		$serializer->process($this, "robots", $data);
		$serializer->process($this, "tags", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Set canonical url
	 */
	function setCanonicalUrl($canonical_url)
	{
		/* Add domain */
		if ($this->layout->request_host)
		{
			$canonical_url = "//" . \Runtime\rtl::toStr($this->layout->request_host) . \Runtime\rtl::toStr($canonical_url);
			if ($this->layout->request_https)
			{
				$canonical_url = "https:" . \Runtime\rtl::toStr($canonical_url);
			}
			else
			{
				$canonical_url = "http:" . \Runtime\rtl::toStr($canonical_url);
			}
		}
		$this->canonical_url = $canonical_url;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.Seo.SeoWidget";
		$this->widget_name = "seo";
		$this->canonical_url = "";
		$this->description = "";
		$this->favicon = "";
		$this->article_published_time = "";
		$this->article_modified_time = "";
		$this->robots = \Runtime\Vector::from(["follow","index"]);
		$this->tags = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Seo";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Seo.SeoModel";
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