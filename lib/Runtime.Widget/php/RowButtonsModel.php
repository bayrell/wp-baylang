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
class RowButtonsModel extends \Runtime\Widget\RenderListModel
{
	public $buttons;
	public $styles;
	public $component;
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
		if ($params->has("styles"))
		{
			$this->styles = $params->get("styles");
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Setup buttons */
		if ($params->has("buttons"))
		{
			$this->buttons = \Runtime\Vector::from([]);
			$this->addButtons($params->get("buttons"));
		}
	}
	/**
	 * Add button
	 */
	function addButton($button)
	{
		/* Create button model */
		$model = $this->createModel($button, "Runtime.Widget.ButtonModel");
		/* Settings */
		$dest = "";
		$kind = "after";
		if ($button instanceof \Runtime\Dict)
		{
			$dest = $button->get("dest", "");
			$kind = $button->get("kind", "after");
		}
		/* Add button */
		$this->addItem($model, $dest, $kind);
		/* Add listener */
		$model->addListener("click", new \Runtime\Callback($this, "onButtonClick"));
		/* Return model */
		return $model;
	}
	/**
	 * Add buttons
	 */
	function addButtons($buttons)
	{
		for ($i = 0; $i < $buttons->count(); $i++)
		{
			$this->addButton($buttons->get($i));
		}
	}
	/**
	 * Buttons click
	 */
	function onButtonClick($message)
	{
		$this->emit($message);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->buttons = \Runtime\Vector::from([]);
		$this->styles = \Runtime\Vector::from([]);
		$this->component = "Runtime.Widget.RowButtons";
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.RowButtonsModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.RenderListModel";
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