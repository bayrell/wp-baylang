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
namespace Runtime\Widget\Seo;
class SeoWidget extends \Runtime\Web\Component
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Canonical url */
		if ($this->model->canonical_url)
		{
			/* Element 'link' */
			$this->_e($__v, "link", ["rel" => "canonical","href" => $this->model->canonical_url]);
		}
		
		/* Locale */
		/* Element 'meta' */
		$this->_e($__v, "meta", ["property" => "og:locale","content" => $this->layout->getLocale()]);
		
		/* Title and description */
		/* Element 'meta' */
		$this->_e($__v, "meta", ["property" => "og:title","content" => $this->layout->getFullTitle()]);
		
		if ($this->model->description != "")
		{
			/* Element 'meta' */
			$this->_e($__v, "meta", ["property" => "og:description","content" => $this->model->description]);
			
			/* Element 'meta' */
			$this->_e($__v, "meta", ["name" => "description","content" => $this->model->description]);
		}
		
		/* Site name */
		$site_name = $this->layout->getSiteName();
		if ($site_name)
		{
			/* Element 'meta' */
			$this->_e($__v, "meta", ["property" => "og:site_name","content" => $site_name]);
			
			/* Element 'meta' */
			$this->_e($__v, "meta", ["property" => "article:publisher","content" => $site_name]);
		}
		
		/* Robots */
		if ($this->model->robots)
		{
			/* Element 'meta' */
			$this->_e($__v, "meta", ["name" => "robots","content" => \Runtime\rs::join(",", $this->model->robots)]);
		}
		
		/* Tags */
		if ($this->model->tags != null && $this->model->tags->count() > 0)
		{
			for ($i = 0; $i < $this->model->tags->count(); $i++)
			{
				/* Element 'meta' */
				$this->_e($__v, "meta", ["property" => "article:tag","content" => \Runtime\rtl::attr($this->model->tags, $i)]);
			}
		}
		
		/* Article time */
		if ($this->model->article_published_time)
		{
			/* Element 'meta' */
			$this->_e($__v, "meta", ["property" => "article:published_time","content" => $this->model->article_published_time]);
		}
		
		if ($this->model->article_modified_time)
		{
			/* Element 'meta' */
			$this->_e($__v, "meta", ["property" => "article:article_modified_time","content" => $this->model->article_modified_time]);
			
			/* Element 'meta' */
			$this->_e($__v, "meta", ["property" => "og:article_modified_time","content" => $this->model->article_modified_time]);
		}
		
		return $this->_flatten($__v);
	}
	static function css($vars)
	{
		$res = "";
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Seo";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Seo.SeoWidget";
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