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
class RenderProvider extends \Runtime\BaseProvider
{
	public $vue;
	public $layout;
	public $element;
	public $layout_data;
	public $layout_name;
	public $selector;
	public $break_start;
	public $enable_ssr;
	public $events;
	function __construct($params=null)
	{
		parent::__construct($params);
		if ($params)
		{
			if ($params->has("element"))
			{
				$this->element = $params->get("element");
			}
			if ($params->has("layout"))
			{
				$this->layout = $params->get("layout");
			}
			if ($params->has("layout_data"))
			{
				$this->layout_data = $params->get("layout_data");
			}
			if ($params->has("layout_name"))
			{
				$this->layout_name = $params->get("layout_name");
			}
			if ($params->has("selector"))
			{
				$this->selector = $params->get("selector");
			}
			if ($params->has("enable_ssr"))
			{
				$this->enable_ssr = $params->get("enable_ssr");
			}
			if ($params->has("break_start"))
			{
				$this->break_start = $params->get("break_start");
			}
		}
	}
	/**
	 * Returns instance
	 */
	static function instance()
	{
		return \Runtime\rtl::getContext()->provider("Runtime.Web.RenderProvider");
	}
	/**
	 * Returns root element
	 */
	function getRootElement()
	{
		return ($this->element) ? ($this->element) : ($document->querySelector("." . \Runtime\rtl::toStr($this->selector)));
	}
	/**
	 * Init provider
	 */
	function init()
	{
		parent::init();
	}
	/**
	 * Returns app data
	 */
	function getAppData()
	{
		$app_data = \Runtime\rtl::attr($window, $this->layout_data);
		if (!\Runtime\rtl::exists($app_data))
		{
			throw new \Runtime\Exceptions\ItemNotFound($this->layout_data, "App data");
		}
		/* Convert native to primitive */
		$serializer = new \Runtime\SerializerNative();
		$app_data = $serializer->decode($app_data);
		return $app_data;
	}
	/**
	 * Load layout
	 */
	function loadLayout()
	{
		if ($this->layout != null)
		{
			return ;
		}
		$Vue = \Runtime\rtl::attr($window, "Vue");
		/* Get data */
		$app_data = $this->getAppData();
		/* Import data */
		$this->container->importData($app_data);
		/* Create layout */
		$this->layout = $Vue->reactive($this->container->layout);
	}
	/**
	 * Start App
	 */
	function startApp($options)
	{
		$vue_app = null;
		$Vue = \Runtime\rtl::attr($window, "Vue");
		$registerLayout = null;
		/* Get props */
		$component = \Runtime\rtl::find_class($options->get("component"));
		$props = $options->get("props");
		/* Create vue app */
		$enable_ssr = $options->get("enable_ssr", false);
		if ($enable_ssr)
		{
			$vue_app = $Vue->createSSRApp($component, $props->toObject());
		}
		else
		{
			$vue_app = $Vue->createApp($component, $props->toObject());
		}
		/* Register layout  */
		$vue_app->use($registerLayout($this->layout));
		/* Register other modules */
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\Web\Hooks\AppHook::VUE_MODULES, \Runtime\Map::from(["render_provider"=>$this,"vue"=>$vue_app]));
		/* Mount app */
		$vue_app->mount($options->get("element"), true);
		return $vue_app;
	}
	/**
	 * Start provider
	 */
	function start()
	{
		parent::start();
	}
	/**
	 * Next tick
	 */
	static function nextTick($f)
	{
		$Vue = \Runtime\rtl::attr($window, "Vue");
		$Vue->nextTick($f);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->vue = null;
		$this->layout = null;
		$this->element = null;
		$this->layout_data = "app_data";
		$this->layout_name = "app_layout";
		$this->selector = "core_ui_root";
		$this->break_start = false;
		$this->enable_ssr = true;
		$this->events = new \Runtime\Web\Events();
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.RenderProvider";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseProvider";
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