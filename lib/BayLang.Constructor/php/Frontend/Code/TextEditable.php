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
namespace BayLang\Constructor\Frontend\Code;
class TextEditable extends \Runtime\Web\Component
{
	public $reference;
	public $readonly;
	public $timeout;
	public $name;
	public $value;
	public $lines;
	public $change_timer;
	public $old_value;
	function render()
	{
		$__v = new \Runtime\Vector();
		$props = $this->getProps();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->lines->count(); $i++)
		{
			/* Element 'div' */
			$__v2 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v2, $this->_escape($i + 1));
			
			/* Element 'div' */
			$this->_e($__v1, "div", ["style" => "width: " . \Runtime\rtl::toStr($this->lines->get($i)) . \Runtime\rtl::toStr("px"),"class" => $this->_class_name(["line"])], $__v2);
		}
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_text__lines"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v0, "div", $this->_merge_attrs(["name" => $this->name,"contenteditable" => "plaintext-only","class" => $this->_class_name(["widget_text__editable", $this->class])], $props));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_text"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns value
 */
	function getValue()
	{
		$nodes = $this->getRef("text")->childNodes;
		$content = \Runtime\Vector::from([]);
		for ($i = 0; $i < $nodes->length; $i++)
		{
			$item = $nodes->item($i)->innerText->trimRight();
			$content->push($item);
		}
		return \Runtime\rs::join("\n", $content);
	}
	/**
 * Set value
 */
	function setValue($content)
	{
		$text = $this->getRef("text");
		$this->old_value = $content;
		/* Add lines */
		$text->innerHTML = "";
		$lines = \Runtime\rs::split("\n", $content);
		for ($i = 0; $i < $lines->count(); $i++)
		{
			$line_text = $lines->get($i)->trimRight();
			$line_elem = $this->createNewLine($line_text);
			$text->append($line_elem);
		}
		/* Update lines */
		$this->updateLinesCount();
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
 * Returns new line
 */
	function createNewLine($text="")
	{
		$div = $document->createElement("div");
		$div->classList->add("line");
		$div->innerText = $text;
		return $div;
	}
	/**
 * Returns line
 */
	function findLine($node)
	{
		while ($node && ($node->nodeType == 3 || !$node->classList->contains("line")))
		{
			$node = $node->parentElement;
		}
		return $node;
	}
	/**
 * Returns line element
 */
	function getLineElement($pos)
	{
		return $this->getRef("text")->childNodes->item($pos);
	}
	/**
 * Returns line element
 */
	function getLinePosition($line)
	{
		$nodes = $this->getRef("text")->childNodes;
		for ($i = 0; $i < $nodes->length; $i++)
		{
			if ($nodes->item($i) == $line)
			{
				return $i;
			}
		}
		return -1;
	}
	/**
 * Returns node offset
 */
	function getNodeOffset($line, $node, $offset)
	{
		$pos = 0;
		$is_line = $line == $node;
		$current = $line->firstChild;
		while ($current)
		{
			if ($is_line && $offset == 0)
			{
				break;
			}
			if ($current->nodeType == 3)
			{
				if ($is_line)
				{
					$offset = $offset - 1;
				}
				else
				{
					if ($current == $node)
					{
						return $pos + $offset;
					}
				}
				$pos = $pos + $current->textContent->length;
			}
			$current = $current->nextSibling;
		}
		return $pos;
	}
	/**
 * Returns selection
 */
	function getSelection()
	{
		return $this->getRef("text")->ownerDocument->defaultView->getSelection();
	}
	/**
 * Returns cursor position
 */
	function getCursorPos()
	{
		$selection = $this->getSelection();
		$range = $selection->getRangeAt(0);
		/* Get range start */
		$start_line = $this->findLine($range->startContainer);
		$start_y = $this->getLinePosition($start_line);
		$start_x = $this->getNodeOffset($start_line, $range->startContainer, $range->startOffset);
		/* Get range end */
		$end_line = $this->findLine($range->endContainer);
		$end_y = $this->getLinePosition($end_line);
		$end_x = $this->getNodeOffset($end_line, $range->endContainer, $range->endOffset);
		return \Runtime\Map::from(["start_y"=>$start_y,"start_x"=>$start_x,"end_y"=>$end_y,"end_x"=>$end_x]);
	}
	/**
 * Set cursor position
 */
	function setCursorPos($x, $y)
	{
		$selection = $this->getSelection();
		$range = $document->createRange();
		/* Get first node of line */
		$line_elem = $this->getLineElement($y);
		$current = $line_elem->firstChild;
		/* Find node contains x */
		$pos = 0;
		$offset = 0;
		while ($current)
		{
			if ($current->nodeType == 3)
			{
				$node_size = $current->textContent->length;
				if ($pos + $node_size >= $x)
				{
					$offset = $x - $pos;
					break;
				}
				$pos = $pos + $node_size;
			}
			$current = $current->nextSibling;
		}
		/* If node not found */
		if ($current == null)
		{
			$current = $line_elem;
			$offset = $line_elem->childNodes->length;
		}
		/* Set cursor */
		$range->setStart($current, $offset);
		$range->setEnd($current, $offset);
		$selection->removeAllRanges();
		$selection->addRange($range);
		return $range;
	}
	/**
 * Update lines count
 */
	function updateLinesCount()
	{
		$this->lines = \Runtime\Vector::from([]);
		$nodes = $this->getRef("text")->childNodes;
		for ($i = 0; $i < $nodes->length; $i++)
		{
			$item = $nodes->item($i);
			$this->lines->push($item->getBoundingClientRect()->height);
		}
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
 * Paste text to current position
 */
	function pasteText($text)
	{
		$cursor = $this->getCursorPos();
		$line_pos = $cursor->get("end_y");
		$line_offset = $cursor->get("end_x");
		$line_offset_new = 0;
		$line_elem = $this->getLineElement($line_pos);
		$line_text = $line_elem->innerText;
		$lines = \Runtime\rs::split("\n", $text);
		if ($lines->count() > 1)
		{
			/* Change first line */
			$first_line = $lines->shift();
			$line_elem->innerText = $line_text->slice(0, $line_offset) . \Runtime\rtl::toStr($first_line);
			/* Change last line */
			$lines_last_pos = $lines->count() - 1;
			$lines->set($lines_last_pos, $lines->get($lines_last_pos) . \Runtime\rtl::toStr($line_text->slice($line_offset)));
		}
		else
		{
			$first_line = $line_text->slice(0, $line_offset) . \Runtime\rtl::toStr($lines->pop());
			$line_elem->innerText = $first_line . \Runtime\rtl::toStr($line_text->slice($line_offset));
			$line_offset_new = \Runtime\rs::strlen($first_line);
		}
		/* Insert lines after line_elem */
		$lines_count = $lines->count();
		for ($i = 0; $i < $lines_count; $i++)
		{
			$line_content = $lines->get($i);
			$line_new = $this->createNewLine($line_content);
			$line_elem = $line_elem->insertAdjacentElement("afterend", $line_new);
			if ($i == $lines_count - 1)
			{
				$line_offset_new = \Runtime\rs::strlen($line_content);
			}
		}
		$this->setCursorPos($line_offset_new, $line_pos + $lines->count());
		$this->updateLinesCount();
	}
	/**
 * Key down event
 */
	function onKeyDown($e)
	{
		if ($e->key == "Enter")
		{
			$e->preventDefault();
			$e->stopPropagation();
			$this->pasteText("\n");
		}
		else if ($e->key == "Backspace")
		{
			$cursor = $this->getCursorPos();
			if ($cursor->get("start_x") == 0)
			{
				$window->setTimeout(function ()
				{
					$this->updateLinesCount();
				}, 10);
			}
		}
		else if ($e->key == "Delete")
		{
			$cursor = $this->getCursorPos();
			$line = $this->getLineElement($cursor->get("start_y"));
			if ($cursor->get("start_x") == $line->innerText->length)
			{
				$window->setTimeout(function ()
				{
					$this->updateLinesCount();
				}, 10);
			}
		}
		else if ($e->key == "Tab")
		{
			$e->preventDefault();
			$e->stopPropagation();
			/* Shift + Tab */
			if ($e->shiftKey)
			{
				$cursor = $this->getCursorPos();
				$line = $this->getLineElement($cursor->get("start_y"));
				$offset = $cursor->get("start_x");
				if ($offset == 0)
				{
					return ;
				}
				$text = $line->innerText;
				$last_char = \Runtime\rs::charAt($text, $offset - 1);
				if ($last_char != "\t")
				{
					return ;
				}
				$line->innerText = $text->slice(0, $offset - 1) . \Runtime\rtl::toStr($text->slice($offset));
				$this->setCursorPos($offset - 1, $cursor->get("start_y"));
			}
			else
			{
				$node = $document->createTextNode("\t");
				$selection = $this->getSelection();
				$range = $selection->getRangeAt(0);
				$range->insertNode($node);
				$range->setStartAfter($node);
				$range->setEndAfter($node);
			}
		}
	}
	/**
 * Paste event
 */
	function onPaste($e)
	{
		$e->preventDefault();
		$e->stopPropagation();
		$text = $e->clipboardData->getData("text");
		$this->pasteText($text);
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
		$res .= \Runtime\rtl::toStr(".widget_text.h-6975{display: flex;align-items: stretch;width: 100%;max-width: 100%;border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;overflow: auto}.widget_text__lines.h-6975{width: 20px;padding-top: 7px;border-right-width: var(--widget-border-width);border-right-color: var(--widget-color-border);border-right-style: solid}.widget_text__lines.h-6975 .line{display: flex;align-items: center;justify-content: center;min-height: 21px}.widget_text__editable.h-6975{width: calc(100% - 20px);font-family: monospace;font-size: var(--widget-font-size);padding: var(--widget-button-padding-y) var(--widget-button-padding-x);margin: 0;background-color: var(--widget-color-default);box-shadow: none;outline: transparent;line-height: 1.5;tab-size: 4;text-wrap: balance;white-space: pre}.widget_text__editable.h-6975 .line{min-height: 21px}.widget_text__editable.wrap.h-6975{overflow-wrap: break-word;text-wrap: wrap}.widget_text__editable.overflow.h-6975{overflow: auto;text-wrap: nowrap}");
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
		$this->lines = \Runtime\Vector::from([]);
		$this->change_timer = null;
		$this->old_value = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Code";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Code.TextEditable";
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