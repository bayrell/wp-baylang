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
namespace Runtime\Widget;
class TextEditable extends \Runtime\Web\Component
{
	public $reference;
	public $readonly;
	public $timeout;
	public $name;
	public $value;
	public $change_timer;
	public $old_value;
	function render()
	{
		$__v = new \Runtime\Vector();
		$props = $this->getProps();
		
		/* Element 'div' */
		$this->_e($__v, "div", $this->_merge_attrs(["name" => $this->name,"contenteditable" => "plaintext-only","class" => $this->_class_name(["widget_text_editable", $this->class])], $props));
		
		return $this->_flatten($__v);
	}
	/**
 * Returns value
 */
	function getValue()
	{
		return $this->getRef("text")->innerText;
	}
	/**
 * Set value
 */
	function setValue($content)
	{
		$text = $this->getRef("text");
		$text->innerText = $content;
		$this->old_value = $content;
	}
	/**
 * Returns textarea props
 */
	function getProps()
	{
		if ($this->readonly)
		{
			return \Runtime\Map::from(["readonly"=>true]);
		}
		return \Runtime\Map::from([]);
	}
	/**
 * Mounted event
 */
	function onMounted()
	{
		if ($this->reference)
		{
			$this->reference->setValue($this);
		}
		$this->setValue($this->value);
	}
	/**
 * Updated event
 */
	function onUpdated()
	{
		if ($this->old_value == $this->value)
		{
			return ;
		}
		if ($this->change_timer)
		{
			return ;
		}
		$this->setValue($this->value);
	}
	/**
 * Key down event
 */
	function onKeyDown($e)
	{
		if ($e->key == "Tab")
		{
			$e->preventDefault();
			$e->stopPropagation();
			$selection = $this->getRef("text")->ownerDocument->defaultView->getSelection();
			$range = $selection->getRangeAt(0);
			$node = $document->createTextNode("\t");
			$range->insertNode($node);
			$range->setStartAfter($node);
			$range->setEndAfter($node);
		}
	}
	/**
 * Input event
 */
	function onInput($e)
	{
		if ($this->change_timer != null)
		{
			$window->clearTimeout($this->change_timer);
			$this->change_timer = null;
		}
		$this->change_timer = $window->setTimeout(function ()
		{
			$this->onChange();
		}, $this->timeout);
	}
	/**
 * Change event
 */
	function onChange($e)
	{
		$value = $this->getValue();
		/* Send value change */
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(\Runtime\Map::from(["value"=>$value,"old_value"=>$this->old_value,"data"=>$this->data])));
		/* Set old value */
		$this->old_value = $value;
		$this->change_timer = null;
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_text_editable.h-86cd{width: 100%;max-width: 100%;font-family: monospace;font-size: var(--widget-font-size);padding: var(--widget-button-padding-y) var(--widget-button-padding-x);margin: 0;background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;overflow: auto;outline: transparent;line-height: 1.5;tab-size: 4;text-wrap: balance;white-space: pre}.widget_text_editable.wrap.h-86cd{overflow-wrap: break-word;text-wrap: wrap}.widget_text_editable.overflow.h-86cd{overflow: auto;text-wrap: nowrap}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->reference = null;
		$this->readonly = false;
		$this->timeout = 500;
		$this->name = "";
		$this->value = "";
		$this->change_timer = null;
		$this->old_value = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.TextEditable";
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