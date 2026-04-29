<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime;

use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\BaseStorage;
use Runtime\BusInterface;
use Runtime\DefaultLayout;
use Runtime\Method;
use Runtime\Hooks\RuntimeHook;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\Serializer;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;


class BaseLayout extends \Runtime\BaseModel
{
	var $storage;
	var $body_class;
	var $components;
	var $pages;
	var $component_props;
	var $component;
	var $current_component;
	var $current_page_model;
	var $name;
	var $lang;
	var $title;
	var $description;
	var $theme;
	
	
	/**
	 * Init params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		$this->layout = $this;
	}
	
	
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Init storage */
		$this->initStorage();
	}
	
	
	/**
	 * Init storage
	 */
	function initStorage()
	{
		$this->storage = $this->createWidget("Runtime.BaseStorage");
	}
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("component_props", new \Runtime\Serializer\MapType());
		$rules->addType("components", new \Runtime\Serializer\VectorType(new \Runtime\Serializer\StringType()));
		$rules->addType("current_component", new \Runtime\Serializer\StringType());
		$rules->addType("current_page_model", new \Runtime\Serializer\StringType());
		$rules->addType("body_class", new \Runtime\Serializer\VectorType(new \Runtime\Serializer\StringType()));
		$rules->addType("lang", new \Runtime\Serializer\StringType());
		$rules->addType("name", new \Runtime\Serializer\StringType());
		$rules->addType("theme", new \Runtime\Serializer\StringType());
		$rules->addType("title", new \Runtime\Serializer\StringType());
		$rules->addType("description", new \Runtime\Serializer\StringType());
		$rules->addType("storage", new \Runtime\Serializer\ObjectType(new \Runtime\Map(["class_name" => "Runtime.BaseStorage"])));
		$rules->addType("pages", new \Runtime\Serializer\MapType(new \Runtime\Serializer\ObjectType(new \Runtime\Map([
			"autocreate" => true,
			"extends" => "Runtime.BaseModel",
			"create" => function ($layout, $rules, $data)
			{
				return $layout->createWidget($rules->class_name, $data);
			},
		]))));
	}
	
	
	/**
	 * Add component
	 */
	function addComponent($class_name)
	{
		$this->components->push($class_name);
	}
	
	
	/**
	 * Returns page model
	 */
	function getPageModel(){ return $this->pages->get($this->current_page_model); }
	
	
	/**
	 * Set page model
	 */
	function setPageModel($class_name, $params = null)
	{
		if (!$params) $params = new \Runtime\Map();
		$this->current_page_model = $class_name;
		$page = $this->pages->get($class_name);
		if (!$page)
		{
			$page = $this->createWidget($class_name, $params);
			$this->pages->set($class_name, $page);
		}
		return $page;
	}
	
	
	/**
	 * Set page description
	 */
	function setDescription($description)
	{
		$this->description = $description;
	}
	
	
	/**
	 * Set current page
	 */
	function setCurrentPage($component_name, $props = null)
	{
		$this->current_component = $component_name;
		$this->component_props = $props;
	}
	
	
	/**
	 * Set page title
	 */
	function setPageTitle($title, $full_title = false)
	{
		$res = \Runtime\rtl::getContext()->hook(\Runtime\Hooks\RuntimeHook::TITLE, new \Runtime\Map([
			"layout" => $this,
			"title" => $title,
			"title_orig" => $title,
			"full_title" => $full_title,
		]));
		$this->title = $res->get("title");
	}
	
	
	/**
	 * Set page description
	 */
	function setPageDescription($description)
	{
		$this->description = $description;
	}
	
	
	/**
	 * Returns object
	 */
	function get($name){ return $this->storage->frontend->get($name); }
	
	
	/**
	 * Returns site name
	 */
	function getSiteName(){ return ""; }
	
	
	/**
	 * Create url
	 */
	function url($name, $params = null)
	{
		$router = $this->get("router");
		return $router ? $router->url($name, $params) : "";
	}
	
	
	/**
	 * Send api
	 */
	function sendApi($params)
	{
		$api = \Runtime\rtl::getContext()->provider("api");
		$params->set("storage", $this->storage->backend);
		return $api->send($params);
	}
	
	
	/**
	 * Restore layout
	 */
	function restore($layout)
	{
		$old_pages = $layout ? $layout->pages : new \Runtime\Map();
		/* Restore pages */
		$keys = \Runtime\rtl::list($old_pages->keys());
		for ($i = 0; $i < $keys->count(); $i++)
		{
			$key = $keys->get($i);
			$widget = $old_pages->get($key);
			$widget->parent_widget = $this;
			$this->pages->set($key, $widget);
		}
		/* Restore storage */
		$this->storage = $layout->storage;
	}
	
	
	/**
	 * Translate
	 */
	function translate($text, $params = null)
	{
		$s = $text->has($this->lang) ? $text->get($this->lang) : $text->get($this->getDefaultLang());
		return \Runtime\rs::format($s, $params);
	}
	
	
	/**
	 * Returns default lang
	 */
	function getDefaultLang(){ return "en"; }
	
	
	/**
	 * Assets
	 */
	function assets($path)
	{
		$library = "app";
		$arr = \Runtime\rs::split(":", $path);
		if ($arr->count() >= 2)
		{
			$library = $arr->get(0);
			$path = $arr->get(1);
		}
		$assets = $this->get("assets");
		return $assets ? $assets->get($library, $path) : $path;
	}
	
	
	/**
	 * Returns components
	 */
	function getComponents()
	{
		$res = \Runtime\rtl::getContext()->hook(\Runtime\Hooks\RuntimeHook::COMPONENTS, new \Runtime\Map([
			"components" => $this->components->slice(),
		]));
		return static::getRequiredComponents($res->get("components"));
	}
	
	
	/**
	 * Returns all components
	 */
	static function getRequiredComponents($components)
	{
		$hash = new \Runtime\Map();
		$isHash = function ($class_name) use (&$hash){ return !$hash->has($class_name); };
		$result_components = new \Runtime\Vector();
		$deep = function ($deep, $components) use (&$hash, &$isHash, &$result_components)
		{
			for ($i = 0; $i < $components->count(); $i++)
			{
				$class_name = $components->get($i);
				if ($hash->has($class_name)) continue;
				$hash->set($class_name, true);
				$arr = new \Runtime\Vector();
				/* Add parent components */
				$items = \Runtime\rtl::getParents($class_name, "Runtime.Component")->filter($isHash);
				$arr->appendItems($items);
				/* Add required components */
				$f = new \Runtime\Method($class_name, "getRequiredComponents");
				if ($f->exists())
				{
					$items = $f->apply()->filter($isHash);
					$arr->appendItems($items);
				}
				$deep($deep, $arr);
				$result_components->push($class_name);
			}
		};
		$deep($deep, $components);
		return $result_components;
	}
	
	
	/**
	 * Returns style
	 */
	static function getStyle($components)
	{
		$content = new \Runtime\Vector();
		for ($i = 0; $i < $components->count(); $i++)
		{
			$class_name = $components->get($i);
			$f = new \Runtime\Method($class_name, "getComponentStyle");
			if (!$f->exists()) continue;
			$content->push($f->apply());
		}
		return \Runtime\rs::join("", $content);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->storage = null;
		$this->body_class = new \Runtime\Vector();
		$this->components = new \Runtime\Vector();
		$this->pages = new \Runtime\Map();
		$this->component_props = new \Runtime\Map();
		$this->component = "Runtime.DefaultLayout";
		$this->current_component = "";
		$this->current_page_model = "";
		$this->name = "";
		$this->lang = "en";
		$this->title = "";
		$this->description = "";
		$this->theme = "light";
	}
	static function getClassName(){ return "Runtime.BaseLayout"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}