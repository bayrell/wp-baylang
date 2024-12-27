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
namespace Runtime\Widget\Dialog;
class PromptDialogModel extends \Runtime\Widget\Dialog\DialogModel
{
	public $component;
	public $value;
	public $old_value;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Setup close buttons */
		$this->buttons->addButton(\Runtime\Map::from(["content"=>"Cancel","widget_name"=>"cancel_button","styles"=>\Runtime\Vector::from(["gray"]),"events"=>\Runtime\Map::from(["click"=>new \Runtime\Callback($this, "onCloseButtonClick")])]));
		/* Setup confirm button */
		$this->buttons->addButton(\Runtime\Map::from(["content"=>"Ok","widget_name"=>"confirm_button","styles"=>\Runtime\Vector::from(["success"]),"events"=>\Runtime\Map::from(["click"=>new \Runtime\Callback($this, "onConfirmButtonClick")])]));
		/* Buttons style */
		$this->buttons->styles->add("align-end");
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		$this->value = $value;
	}
	/**
	 * Add close button click
	 */
	function onCloseButtonClick($message)
	{
		$this->hide();
	}
	/**
	 * Add confirm button click
	 */
	function onConfirmButtonClick($message)
	{
		try
		{
			
			$this->emit(new \Runtime\Widget\Dialog\DialogMessage(\Runtime\Map::from(["name"=>"confirm","value"=>$this->value])));
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \Runtime\Widget\Dialog\DialogModelException)
			{
				$e = $_ex;
				$this->result->setException($e);
				return ;
			}
			else
			{
				throw $_ex;
			}
		}
		$this->hide();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.Dialog.PromptDialog";
		$this->value = "";
		$this->old_value = "";
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Dialog";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Dialog.PromptDialogModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Dialog.DialogModel";
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