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
class BaseModel extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	public $parent_widget;
	public $layout;
	public $component;
	public $widget_name;
	public $listeners;
	public $widgets;
	public $is_data_loaded;
	function __construct($params=null)
	{
		parent::__construct();
		/* Setup widget params */
		$this->initParams($params);
		/* Init widget settings */
		$this->initWidget($params);
		if ($this->layout != null && $this->component != "")
		{
			$this->layout->addComponent($this->component);
		}
	}
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		if ($params == null)
		{
			return ;
		}
		if ($params->has("layout"))
		{
			$this->layout = $params->get("layout");
		}
		if ($params->has("component"))
		{
			$this->component = $params->get("component");
		}
		if ($params->has("widget_name"))
		{
			$this->widget_name = $params->get("widget_name");
		}
		if ($params->has("events"))
		{
			$events = $params->get("events");
			$events->each(function ($f, $message_name)
			{
				$this->addListener($message_name, $f);
			});
		}
		if ($params->has("parent_widget"))
		{
			$parent_widget = $params->get("parent_widget");
			$this->layout = $parent_widget->layout;
			$this->parent_widget = $parent_widget;
			$parent_widget->widgets->set($this->widget_name, $this);
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
	}
	/**
	 * Create model
	 */
	function createModel($params, $default_model="")
	{
		$model = null;
		if (\Runtime\rtl::isString($params))
		{
			$model = $this->addWidget($params);
		}
		else if ($params instanceof \Runtime\Web\BaseModel)
		{
			$model = $params;
		}
		else if ($params instanceof \Runtime\Web\ModelFactory)
		{
			$model = $params->factory($this);
		}
		else if ($params instanceof \Runtime\Entity\Factory)
		{
			$model = $params->factory();
		}
		else if ($params instanceof \Runtime\Dict)
		{
			if ($params->has("factory"))
			{
				$model = $this->createModel($params->get("factory"));
			}
			else
			{
				$class_name = $params->get("model", $default_model);
				$model = $this->addWidget($class_name, $params);
			}
		}
		return $model;
	}
	/**
	 * Add widget
	 */
	function addWidget($class_name, $params=null)
	{
		if ($params == null)
		{
			$params = \Runtime\Map::from([]);
		}
		$params->set("parent_widget", $this);
		$widget = \Runtime\rtl::newInstance($class_name, \Runtime\Vector::from([$params]));
		return $widget;
	}
	/**
	 * Returns widget by name
	 */
	function getWidget($widget_name)
	{
		return $this->widgets->get($widget_name);
	}
	/**
	 * Returns widget name
	 */
	function getWidgetName()
	{
		return $this->widget_name;
	}
	/**
	 * Clear listeners
	 */
	function clearListener($message_name)
	{
		$chain = new \Runtime\Chain();
		$chain->setReturnValue(false);
		$this->listeners->set($message_name, $chain);
	}
	/**
	 * Add listener
	 */
	function addListener($message_name, $f, $priority=100)
	{
		if (!$this->listeners->has($message_name))
		{
			$this->clearListener($message_name);
		}
		if (\Runtime\rtl::isCallable($f))
		{
			$chain = $this->listeners->get($message_name);
			$chain->add($f, $priority);
			$chain->sort();
		}
	}
	/**
	 * Emit message
	 */
	function emit($message)
	{
		if ($message->widget == null)
		{
			$message->widget = $this;
		}
		$this->emitMessage($message::getClassName(), $message);
		$this->emitMessage($message->name, $message);
	}
	/**
	 * Emit message
	 */
	function emitMessage($message_name, $message)
	{
		if (!$this->listeners->has($message_name))
		{
			return ;
		}
		$chain = $this->listeners->get($message_name);
		$chain->apply($message);
	}
	/**
	 * Async emit message
	 */
	function emitAsync($message)
	{
		if ($message->widget == null)
		{
			$message->widget = $this;
		}
		$this->emitMessageAsync($message::getClassName(), $message);
		$this->emitMessageAsync($message->name, $message);
	}
	/**
	 * Async emit message
	 */
	function emitMessageAsync($message_name, $message)
	{
		if (!$this->listeners->has($message_name))
		{
			return ;
		}
		$chain = $this->listeners->get($message_name);
		$chain->applyAsync($message);
	}
	/**
	 * Load data
	 */
	function loadData($container)
	{
		if ($this->is_data_loaded)
		{
			return ;
		}
		$widgets_keys = $this->widgets->keys();
		for ($i = 0; $i < $widgets_keys->count(); $i++)
		{
			$widget_key = $widgets_keys->get($i);
			$widget = $this->widgets->get($widget_key);
			if ($widget instanceof \Runtime\Web\BaseModel)
			{
				$widget->loadData($container);
			}
		}
		$this->is_data_loaded = true;
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "component", $data);
		$serializer->process($this, "widget_name", $data);
		$serializer->processItems($this, "widgets", $data, new \Runtime\Callback($this, "serializeCreateWidget"));
		$serializer->process($this, "is_data_loaded", $data);
	}
	/**
	 * Process frontend data
	 */
	function serializeCreateWidget($serializer, $data)
	{
		$class_name = $data->get("__class_name__");
		$widget_name = $data->get("widget_name");
		/* If BaseModel */
		if (\Runtime\rtl::is_instanceof($class_name, "Runtime.Web.BaseModel"))
		{
			$widget = $this->widgets->get($widget_name);
			if ($widget != null)
			{
				return $widget;
			}
			return $this->addWidget($class_name, \Runtime\Map::from(["widget_name"=>$widget_name]));
		}
		/* Create object */
		return \Runtime\rtl::newInstance($class_name);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->parent_widget = null;
		$this->layout = null;
		$this->component = "";
		$this->widget_name = "";
		$this->listeners = \Runtime\Map::from([]);
		$this->widgets = \Runtime\Map::from([]);
		$this->is_data_loaded = false;
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.BaseModel";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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