"use strict;"
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Code == 'undefined') BayLang.Constructor.Frontend.Code = {};
BayLang.Constructor.Frontend.Code.TextEditable = {
	name: "BayLang.Constructor.Frontend.Code.TextEditable",
	extends: Runtime.Web.Component,
	props: {
		"reference": {
			default: null,
		},
		"readonly": {
			default: false,
		},
		"timeout": {
			default: 500,
		},
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
	},
	data: function ()
	{
		return {
			lines: Runtime.Vector.from([]),
			change_timer: null,
			old_value: null,
		};
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_text"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_text__lines"])});
			
			for (let i = 0; i < this.lines.count(); i++)
			{
				/* Element 'div' */
				let __v2 = this._e(__v1, "div", {"style":"width: " + Runtime.rtl.toStr(this.lines.get(i)) + Runtime.rtl.toStr("px"),"class":this._class_name(["line"]),"key":i});
				
				/* Render */
				this._t(__v2, i + 1);
			}
			
			/* Element 'div' */
			let __v3 = this._e(__v0, "div", this._merge_attrs({"name":this.name,"contenteditable":"plaintext-only","onKeydown":this.onKeyDown,"onInput":this.onInput,"onPaste":this.onPaste,"ref":"text","class":this._class_name(["widget_text__editable", this.class])}, props));
			
			return this._flatten(__v);
		},
		/**
 * Returns value
 */
		getValue: function()
		{
			var nodes = this.getRef("text").childNodes;
			var content = Runtime.Vector.from([]);
			for (var i = 0; i < nodes.length; i++)
			{
				var item = nodes.item(i).innerText.trimRight();
				content.push(item);
			}
			return Runtime.rs.join("\n", content);
		},
		/**
 * Set value
 */
		setValue: function(content)
		{
			var text = this.getRef("text");
			this.old_value = content;
			/* Add lines */
			text.innerHTML = "";
			var lines = Runtime.rs.split("\n", content);
			for (var i = 0; i < lines.count(); i++)
			{
				var line_text = lines.get(i).trimRight();
				var line_elem = this.createNewLine(line_text);
				text.append(line_elem);
			}
			/* Update lines */
			this.updateLinesCount();
		},
		/**
 * Returns textarea props
 */
		getProps: function()
		{
			if (this.readonly)
			{
				return Runtime.Map.from({"readonly":true});
			}
			return Runtime.Map.from({});
		},
		/**
 * Returns new line
 */
		createNewLine: function(text)
		{
			if (text == undefined) text = "";
			var div = document.createElement("div");
			div.classList.add("line");
			div.innerText = text;
			return div;
		},
		/**
 * Returns line
 */
		findLine: function(node)
		{
			while (node && (node.nodeType == 3 || !node.classList.contains("line")))
			{
				node = node.parentElement;
			}
			return node;
		},
		/**
 * Returns line element
 */
		getLineElement: function(pos)
		{
			return this.getRef("text").childNodes.item(pos);
		},
		/**
 * Returns line element
 */
		getLinePosition: function(line)
		{
			var nodes = this.getRef("text").childNodes;
			for (var i = 0; i < nodes.length; i++)
			{
				if (nodes.item(i) == line)
				{
					return i;
				}
			}
			return -1;
		},
		/**
 * Returns node offset
 */
		getNodeOffset: function(line, node, offset)
		{
			var pos = 0;
			var is_line = line == node;
			var current = line.firstChild;
			while (current)
			{
				if (is_line && offset == 0)
				{
					break;
				}
				if (current.nodeType == 3)
				{
					if (is_line)
					{
						offset = offset - 1;
					}
					else
					{
						if (current == node)
						{
							return pos + offset;
						}
					}
					pos = pos + current.textContent.length;
				}
				current = current.nextSibling;
			}
			return pos;
		},
		/**
 * Returns selection
 */
		getSelection: function()
		{
			return this.getRef("text").ownerDocument.defaultView.getSelection();
		},
		/**
 * Returns cursor position
 */
		getCursorPos: function()
		{
			var selection = this.getSelection();
			var range = selection.getRangeAt(0);
			/* Get range start */
			var start_line = this.findLine(range.startContainer);
			var start_y = this.getLinePosition(start_line);
			var start_x = this.getNodeOffset(start_line, range.startContainer, range.startOffset);
			/* Get range end */
			var end_line = this.findLine(range.endContainer);
			var end_y = this.getLinePosition(end_line);
			var end_x = this.getNodeOffset(end_line, range.endContainer, range.endOffset);
			return Runtime.Map.from({"start_y":start_y,"start_x":start_x,"end_y":end_y,"end_x":end_x});
		},
		/**
 * Set cursor position
 */
		setCursorPos: function(x, y)
		{
			var selection = this.getSelection();
			var range = document.createRange();
			/* Get first node of line */
			var line_elem = this.getLineElement(y);
			var current = line_elem.firstChild;
			/* Find node contains x */
			var pos = 0;
			var offset = 0;
			while (current)
			{
				if (current.nodeType == 3)
				{
					var node_size = current.textContent.length;
					if (pos + node_size >= x)
					{
						offset = x - pos;
						break;
					}
					pos = pos + node_size;
				}
				current = current.nextSibling;
			}
			/* If node not found */
			if (current == null)
			{
				current = line_elem;
				offset = line_elem.childNodes.length;
			}
			/* Set cursor */
			range.setStart(current, offset);
			range.setEnd(current, offset);
			selection.removeAllRanges();
			selection.addRange(range);
			return range;
		},
		/**
 * Update lines count
 */
		updateLinesCount: function()
		{
			this.lines = Runtime.Vector.from([]);
			var nodes = this.getRef("text").childNodes;
			for (var i = 0; i < nodes.length; i++)
			{
				var item = nodes.item(i);
				this.lines.push(item.getBoundingClientRect().height);
			}
		},
		/**
 * Mounted event
 */
		onMounted: function()
		{
			if (this.reference)
			{
				this.reference.setValue(this);
			}
			this.setValue(this.value);
		},
		/**
 * Updated event
 */
		onUpdated: function()
		{
			if (this.old_value == this.value)
			{
				return ;
			}
			if (this.change_timer)
			{
				return ;
			}
			this.setValue(this.value);
		},
		/**
 * Paste text to current position
 */
		pasteText: function(text)
		{
			var cursor = this.getCursorPos();
			var line_pos = cursor.get("end_y");
			var line_offset = cursor.get("end_x");
			var line_offset_new = 0;
			var line_elem = this.getLineElement(line_pos);
			var line_text = line_elem.innerText;
			var lines = Runtime.rs.split("\n", text);
			if (lines.count() > 1)
			{
				/* Change first line */
				var first_line = lines.shift();
				line_elem.innerText = line_text.slice(0, line_offset) + Runtime.rtl.toStr(first_line);
				/* Change last line */
				var lines_last_pos = lines.count() - 1;
				lines.set(lines_last_pos, lines.get(lines_last_pos) + Runtime.rtl.toStr(line_text.slice(line_offset)));
			}
			else
			{
				var first_line = line_text.slice(0, line_offset) + Runtime.rtl.toStr(lines.pop());
				line_elem.innerText = first_line + Runtime.rtl.toStr(line_text.slice(line_offset));
				line_offset_new = Runtime.rs.strlen(first_line);
			}
			/* Insert lines after line_elem */
			var lines_count = lines.count();
			for (var i = 0; i < lines_count; i++)
			{
				var line_content = lines.get(i);
				var line_new = this.createNewLine(line_content);
				line_elem = line_elem.insertAdjacentElement("afterend", line_new);
				if (i == lines_count - 1)
				{
					line_offset_new = Runtime.rs.strlen(line_content);
				}
			}
			this.setCursorPos(line_offset_new, line_pos + lines.count());
			this.updateLinesCount();
		},
		/**
 * Key down event
 */
		onKeyDown: function(e)
		{
			if (e.key == "Enter")
			{
				e.preventDefault();
				e.stopPropagation();
				this.pasteText("\n");
			}
			else if (e.key == "Backspace")
			{
				var cursor = this.getCursorPos();
				if (cursor.get("start_x") == 0)
				{
					window.setTimeout(() =>
					{
						this.updateLinesCount();
					}, 10);
				}
			}
			else if (e.key == "Delete")
			{
				var cursor = this.getCursorPos();
				var line = this.getLineElement(cursor.get("start_y"));
				if (cursor.get("start_x") == line.innerText.length)
				{
					window.setTimeout(() =>
					{
						this.updateLinesCount();
					}, 10);
				}
			}
			else if (e.key == "Tab")
			{
				e.preventDefault();
				e.stopPropagation();
				/* Shift + Tab */
				if (e.shiftKey)
				{
					var cursor = this.getCursorPos();
					var line = this.getLineElement(cursor.get("start_y"));
					var offset = cursor.get("start_x");
					if (offset == 0)
					{
						return ;
					}
					var text = line.innerText;
					var last_char = Runtime.rs.charAt(text, offset - 1);
					if (last_char != "\t")
					{
						return ;
					}
					line.innerText = text.slice(0, offset - 1) + Runtime.rtl.toStr(text.slice(offset));
					this.setCursorPos(offset - 1, cursor.get("start_y"));
				}
				else
				{
					var node = document.createTextNode("\t");
					var selection = this.getSelection();
					var range = selection.getRangeAt(0);
					range.insertNode(node);
					range.setStartAfter(node);
					range.setEndAfter(node);
				}
			}
		},
		/**
 * Paste event
 */
		onPaste: function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			var text = e.clipboardData.getData("text");
			this.pasteText(text);
		},
		/**
 * Input event
 */
		onInput: function(e)
		{
			if (this.change_timer != null)
			{
				window.clearTimeout(this.change_timer);
				this.change_timer = null;
			}
			this.change_timer = window.setTimeout(() =>
			{
				this.onChange();
			}, this.timeout);
		},
		/**
 * Change event
 */
		onChange: function(e)
		{
			var value = this.getValue();
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":value,"old_value":this.old_value,"data":this.data})));
			/* Set old value */
			this.old_value = value;
			this.change_timer = null;
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Code.TextEditable,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_text.h-6975{display: flex;align-items: stretch;width: 100%;max-width: 100%;border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;overflow: auto}.widget_text__lines.h-6975{width: 20px;padding-top: 7px;border-right-width: var(--widget-border-width);border-right-color: var(--widget-color-border);border-right-style: solid}.widget_text__lines.h-6975 .line{display: flex;align-items: center;justify-content: center;min-height: 21px}.widget_text__editable.h-6975{width: calc(100% - 20px);font-family: monospace;font-size: var(--widget-font-size);padding: var(--widget-button-padding-y) var(--widget-button-padding-x);margin: 0;background-color: var(--widget-color-default);box-shadow: none;outline: transparent;line-height: 1.5;tab-size: 4;text-wrap: balance;white-space: pre}.widget_text__editable.h-6975 .line{min-height: 21px}.widget_text__editable.wrap.h-6975{overflow-wrap: break-word;text-wrap: wrap}.widget_text__editable.overflow.h-6975{overflow: auto;text-wrap: nowrap}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Code";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Code.TextEditable";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Code.TextEditable);
window["BayLang.Constructor.Frontend.Code.TextEditable"] = BayLang.Constructor.Frontend.Code.TextEditable;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Code.TextEditable;