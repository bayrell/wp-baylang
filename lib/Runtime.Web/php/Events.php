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
class Events extends \Runtime\BaseObject
{
	public $items;
	/**
	 * Setup widget params
	 */
	function setup($params)
	{
		if ($params == null)
		{
			return ;
		}
		$params->each(function ($f, $event_name)
		{
			$this->add($event_name, $f);
		});
	}
	/**
	 * Add event
	 */
	function add($event_name, $f)
	{
		if (!$this->items->has($event_name))
		{
			$this->items->set($event_name, \Runtime\Vector::from([]));
		}
		if (\Runtime\rtl::isCallable($f))
		{
			$this->items->get($event_name)->append($f);
		}
	}
	/**
	 * Clear events
	 */
	function clear($event_name)
	{
		if ($this->items->has($event_name))
		{
			$this->items->set($event_name, \Runtime\Vector::from([]));
		}
	}
	/**
	 * Clear all
	 */
	function clearAll()
	{
		$this->items->each(function ($event_name)
		{
			$this->clear($event_name);
		});
	}
	/**
	 * Emit event
	 */
	function emit($event_name, $attrs=null)
	{
		if (!$this->items->has($event_name))
		{
			return ;
		}
		$events = $this->items->get($event_name);
		for ($i = 0; $i < $events->count(); $i++)
		{
			$f = $events->get($i);
			\Runtime\rtl::apply($f, $attrs);
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->items = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.Events";
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