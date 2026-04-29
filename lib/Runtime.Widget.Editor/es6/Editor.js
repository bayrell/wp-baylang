"use strict;"
/*
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Editor == 'undefined') Runtime.Widget.Editor = {};
Runtime.Widget.Editor.Editor = {
	name: "Runtime.Widget.Editor.Editor",
	extends: Runtime.Widget.Field,
	props: {
		reference: {default: null},
		readonly: {default: false},
		timeout: {default: 500},
		name: {default: ""},
		value: {default: ""},
	},
	data: function()
	{
		return {
			lines: Runtime.Vector.create([]),
			change_timer: null,
			old_value: null,
		};
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let props = this.getProps();
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["widget_text", componentHash])}));
			
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["widget_text__lines", componentHash])}));
			
			/* Element div */
			let __v2 = __v1.element("div", new Runtime.Map({"class": rs.className(["widget_text__wrap", componentHash])}));
			
			for (let i = 0; i < this.lines.count(); i++)
			{
				/* Element div */
				let __v3 = __v2.element("div", new Runtime.Map({"class": rs.className(["line", componentHash]), "key": i, "style": "height: " + String(this.lines.get(i)) + String("px")}));
				__v3.push(i + 1);
			}
			
			/* Element div */
			__v0.element("div", new Runtime.Map({"class": rs.className(["widget_text__editable", this.class, componentHash]), "name": this.name, "contenteditable": "plaintext-only", "onKeydown": this.onKeyDown, "onInput": this.onInput, "onPaste": this.onPaste, "@ref": "text"}).concat(props));
			
			return __v;
		},
		/**
		 * Returns value
		 */
		getValue: function()
		{
			let nodes = this.getRef("text").childNodes;
			let content = Runtime.Vector.create([]);
			for (let i = 0; i < nodes.length; i++)
			{
				let item = nodes.item(i).innerText.trimRight();
				content.push(item);
			}
			return Runtime.rs.join("\n", content);
		},
		/**
		 * Set value
		 */
		setValue: function(content)
		{
			let text = this.getRef("text");
			this.old_value = content;
			/* Add lines */
			text.innerHTML = "";
			let lines = Runtime.rs.split("\n", content ? content : "");
			for (let i = 0; i < lines.count(); i++)
			{
				let line_text = lines.get(i).trimRight();
				let line_elem = this.createNewLine(line_text);
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
			if (this.readonly) return Runtime.Map.create({
				"readonly": true,
			});
			return new Runtime.Map();
		},
		/**
		 * Returns new line
		 */
		createNewLine: function(text)
		{
			if (text == undefined) text = "";
			let div = document.createElement("div");
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
		getLineElement: function(pos){ return this.getRef("text").childNodes.item(pos); },
		/**
		 * Returns line element
		 */
		getLinePosition: function(line)
		{
			let nodes = this.getRef("text").childNodes;
			for (let i = 0; i < nodes.length; i++)
			{
				if (nodes.item(i) == line) return i;
			}
			return -1;
		},
		/**
		 * Returns node offset
		 */
		getNodeOffset: function(line, node, offset)
		{
			let pos = 0;
			let is_line = line == node;
			let current = line.firstChild;
			while (current)
			{
				if (is_line && offset == 0) break;
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
		getSelection: function(){ return this.getRef("text").ownerDocument.defaultView.getSelection(); },
		/**
		 * Returns cursor position
		 */
		getCursorPos: function()
		{
			let selection = this.getSelection();
			let range = selection.getRangeAt(0);
			/* Get range start */
			let start_line = this.findLine(range.startContainer);
			let start_y = this.getLinePosition(start_line);
			let start_x = this.getNodeOffset(start_line, range.startContainer, range.startOffset);
			/* Get range end */
			let end_line = this.findLine(range.endContainer);
			let end_y = this.getLinePosition(end_line);
			let end_x = this.getNodeOffset(end_line, range.endContainer, range.endOffset);
			return Runtime.Map.create({
				"start_y": start_y,
				"start_x": start_x,
				"end_y": end_y,
				"end_x": end_x,
			});
		},
		/**
		 * Set cursor position
		 */
		setCursorPos: function(x, y)
		{
			let selection = this.getSelection();
			let range = document.createRange();
			/* Get first node of line */
			let line_elem = this.getLineElement(y);
			let current = line_elem.firstChild;
			/* Find node contains x */
			let pos = 0;
			let offset = 0;
			while (current)
			{
				if (current.nodeType == 3)
				{
					let node_size = current.textContent.length;
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
			this.lines = Runtime.Vector.create([]);
			let nodes = this.getRef("text").childNodes;
			for (let i = 0; i < nodes.length; i++)
			{
				let item = nodes.item(i);
				this.lines.push(item.getBoundingClientRect().height);
			}
		},
		/**
		 * Paste text to current position
		 */
		pasteText: function(text)
		{
			let cursor = this.getCursorPos();
			let line_pos = cursor.get("end_y");
			let line_offset = cursor.get("end_x");
			let line_offset_new = 0;
			let line_elem = this.getLineElement(line_pos);
			let line_text = line_elem.innerText;
			let lines = Runtime.rs.split("\n", text);
			if (lines.count() > 1)
			{
				/* Change first line */
				let first_line = lines.shift();
				line_elem.innerText = line_text.slice(0, line_offset) + String(first_line);
				/* Change last line */
				let lines_last_pos = lines.count() - 1;
				line_offset_new = Runtime.rs.strlen(lines.get(lines_last_pos));
				lines.set(lines_last_pos, lines.get(lines_last_pos) + String(line_text.slice(line_offset)));
			}
			else
			{
				let first_line = line_text.slice(0, line_offset) + String(lines.pop());
				line_elem.innerText = first_line + String(line_text.slice(line_offset));
				line_offset_new = Runtime.rs.strlen(first_line);
			}
			/* Insert lines after line_elem */
			let lines_count = lines.count();
			for (let i = 0; i < lines_count; i++)
			{
				let line_content = lines.get(i);
				let line_new = this.createNewLine(line_content);
				line_elem = line_elem.insertAdjacentElement("afterend", line_new);
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
				let cursor = this.getCursorPos();
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
				let cursor = this.getCursorPos();
				let line = this.getLineElement(cursor.get("start_y"));
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
					let cursor = this.getCursorPos();
					let line = this.getLineElement(cursor.get("start_y"));
					let offset = cursor.get("start_x");
					if (offset == 0) return;
					let text = line.innerText;
					let last_char = Runtime.rs.charAt(text, offset - 1);
					if (last_char != "\t") return;
					line.innerText = text.slice(0, offset - 1) + String(text.slice(offset));
					this.setCursorPos(offset - 1, cursor.get("start_y"));
				}
				else
				{
					let node = document.createTextNode("\t");
					let selection = this.getSelection();
					let range = selection.getRangeAt(0);
					range.insertNode(node);
					range.setStartAfter(node);
					range.setEndAfter(node);
				}
			}
			this.sendChangeMessage();
		},
		/**
		 * Paste event
		 */
		onPaste: function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			let text = e.clipboardData.getData("text");
			this.pasteText(text);
			this.sendChangeMessage();
		},
		/**
		 * Input event
		 */
		onInput: function(e)
		{
			this.sendChangeMessage();
		},
		/**
		 * Send change message
		 */
		sendChangeMessage: function()
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
			/* Clear timer */
			if (this.change_timer != null)
			{
				window.clearTimeout(this.change_timer);
				this.change_timer = null;
			}
			/* Get value */
			let value = this.getValue();
			/* Send value change */
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": value,
				"old_value": this.old_value,
				"data": this.data,
			})));
			/* Set old value */
			this.old_value = value;
			this.change_timer = null;
		},
		getClassName: function(){ return "Runtime.Widget.Editor.Editor"; },
	},
	/**
	 * Mounted event
	 */
	mounted: function()
	{
		if (this.reference) this.reference.setValue(this);
		this.setValue(this.value);
	},
	/**
	 * Updated event
	 */
	updated: function()
	{
		if (this.old_value == this.value) return;
		if (this.change_timer) return;
		this.setValue(this.value);
	},
	getComponentStyle: function(){ return ".widget_text.h-7a01{display: flex;align-items: flex-start;width: 100%;max-width: 100%;border-width: var(--border-width);border-color: var(--color-border);border-style: solid;border-radius: 4px;overflow: auto}.widget_text__lines.h-7a01{display: flex;align-items: center;flex-direction: column;width: 20px;min-height: 100%;padding-top: var(--space);border-right-width: var(--border-width);border-right-color: var(--color-border);border-right-style: solid}.widget_text__lines.h-7a01 .line{text-align: right;min-height: 21px}.widget_text__editable.h-7a01{width: calc(100% - 20px);min-height: 100%;font-family: monospace;font-size: var(--font-size);padding: calc(var(--space) * 0.75) var(--space);margin: 0;background-color: var(--color-default);box-shadow: none;outline: transparent;line-height: 1.5;tab-size: 4;text-wrap: balance;white-space: pre}.widget_text__editable.h-7a01 .line{min-height: 21px}.widget_text__editable.wrap.h-7a01{overflow-wrap: break-word;text-wrap: wrap}.widget_text__editable.overflow.h-7a01{overflow: auto;text-wrap: nowrap}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Editor.Editor"] = Runtime.Widget.Editor.Editor;