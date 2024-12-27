"use strict;"
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
if (typeof BayLang == 'undefined') BayLang = {};
BayLang.Caret = function(items)
{
	if (items == undefined) items = null;
	Runtime.BaseObject.call(this);
	if (items)
	{
		if (items.has("file_name"))
		{
			this.file_name = items.get("file_name");
		}
		if (items.has("content"))
		{
			this.content = items.get("content");
		}
		if (items.has("content_sz"))
		{
			this.content_sz = items.get("content_sz");
		}
		if (items.has("content") && !items.has("content_sz"))
		{
			this.content_sz = Runtime.rs.strlen(this.content.ref);
		}
		if (items.has("tab_size"))
		{
			this.tab_size = items.get("tab_size");
		}
		if (items.has("pos"))
		{
			this.pos = items.get("pos");
		}
		if (items.has("x"))
		{
			this.x = items.get("x");
		}
		if (items.has("y"))
		{
			this.y = items.get("y");
		}
	}
};
BayLang.Caret.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Caret.prototype.constructor = BayLang.Caret;
Object.assign(BayLang.Caret.prototype,
{
	/**
	 * Clone
	 */
	clone: function(items)
	{
		if (items == undefined) items = null;
		return new BayLang.Caret(Runtime.Map.from({"file_name":(items) ? (items.get("file_name", this.file_name)) : (this.file_name),"content":(items) ? (items.get("content", this.content)) : (this.content),"content_sz":(items) ? (items.get("content_sz", this.content_sz)) : (this.content_sz),"tab_size":(items) ? (items.get("tab_size", this.tab_size)) : (this.tab_size),"pos":(items) ? (items.get("pos", this.pos)) : (this.pos),"x":(items) ? (items.get("x", this.x)) : (this.x),"y":(items) ? (items.get("y", this.y)) : (this.y)}));
	},
	/**
	 * Copy caret
	 */
	copy: function(items)
	{
		if (items == undefined) items = null;
		return this.clone(items);
	},
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "pos", data);
		serializer.process(this, "x", data);
		serializer.process(this, "y", data);
	},
	/**
	 * Seek caret
	 */
	seek: function(caret)
	{
		this.pos = caret.pos;
		this.x = caret.x;
		this.y = caret.y;
	},
	/**
	 * Returns true if eof
	 */
	eof: function()
	{
		return this.pos >= this.content_sz;
	},
	/**
	 * Returns next X
	 */
	nextX: function(ch, direction)
	{
		if (direction == undefined) direction = 1;
		if (ch == "\t")
		{
			return this.x + this.tab_size * direction;
		}
		if (ch == "\n")
		{
			return 0;
		}
		return this.x + direction;
	},
	/**
	 * Returns next Y
	 */
	nextY: function(ch, direction)
	{
		if (direction == undefined) direction = 1;
		if (ch == "\n")
		{
			return this.y + direction;
		}
		return this.y;
	},
	/**
	 * Returns next char
	 */
	nextChar: function()
	{
		return Runtime.rs.charAt(this.content.ref, this.pos, 1);
	},
	/**
	 * Returns string
	 */
	getString: function(start_pos, count)
	{
		return Runtime.rs.substr(this.content.ref, start_pos, count);
	},
	/**
	 * Returns next string
	 */
	nextString: function(count)
	{
		return Runtime.rs.substr(this.content.ref, this.pos, count);
	},
	/**
	 * Returns true if next char
	 */
	isNextChar: function(ch)
	{
		return this.nextChar() == ch;
	},
	/**
	 * Returns true if next string
	 */
	isNextString: function(s)
	{
		return this.nextString(Runtime.rs.strlen(s)) == s;
	},
	/**
	 * Shift by char
	 */
	shift: function(ch)
	{
		this.x = this.nextX(ch);
		this.y = this.nextY(ch);
		this.pos = this.pos + 1;
	},
	/**
	 * Read char
	 */
	readChar: function()
	{
		var ch = Runtime.rs.charAt(this.content.ref, this.pos);
		this.shift(ch);
		return ch;
	},
	/**
	 * Read char
	 */
	readString: function(count)
	{
		var s = this.nextString(count);
		var count = Runtime.rs.strlen(s);
		for (var i = 0; i < count; i++)
		{
			var ch = Runtime.rs.charAt(s, i);
			this.shift(ch);
		}
		return s;
	},
	/**
	 * Match char
	 */
	matchChar: function(ch)
	{
		var next = this.nextChar();
		if (next != ch)
		{
			throw new BayLang.Exceptions.ParserExpected(ch, this, this.file_name)
		}
		this.readChar();
	},
	/**
	 * Match string
	 */
	matchString: function(s)
	{
		var count = Runtime.rs.strlen(s);
		var next_string = this.nextString(count);
		if (next_string != s)
		{
			throw new BayLang.Exceptions.ParserExpected(s, this, this.file_name)
		}
		this.readString(count);
	},
	/**
	 * Skip chars
	 */
	skipChar: function(ch)
	{
		if (this.nextChar() == ch)
		{
			this.readChar();
			return true;
		}
		return false;
	},
	/**
	 * Skip space
	 */
	skipSpace: function()
	{
		while (!this.eof() && this.constructor.isSkipChar(this.nextChar()))
		{
			this.readChar();
		}
	},
	/**
	 * Returns true if token char
	 */
	isTokenChar: function(ch)
	{
		return Runtime.rs.indexOf("qazwsxedcrfvtgbyhnujmikolp0123456789_", Runtime.rs.lower(ch)) !== -1;
	},
	/**
	 * Read next token
	 */
	readToken: function()
	{
		var items = Runtime.Vector.from([]);
		this.skipSpace();
		if (this.eof())
		{
			return "";
		}
		if (!this.isTokenChar(this.nextChar()))
		{
			return this.readChar();
		}
		while (!this.eof() && this.isTokenChar(this.nextChar()))
		{
			items.push(this.readChar());
		}
		return Runtime.rs.join("", items);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.file_name = null;
		this.content = null;
		this.content_sz = 0;
		this.pos = 0;
		this.x = 0;
		this.y = 0;
		this.tab_size = 4;
	},
});
Object.assign(BayLang.Caret, Runtime.BaseObject);
Object.assign(BayLang.Caret,
{
	/**
	 * Return true if is char
	 * @param char ch
	 * @return boolean
	 */
	isChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.Caret.isChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.indexOf("qazwsxedcrfvtgbyhnujmikolp", Runtime.rs.lower(ch)) !== -1;
		Runtime.rtl._memorizeSave("BayLang.Caret.isChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	isNumber: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.Caret.isNumber", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.indexOf("0123456789", ch) !== -1;
		Runtime.rtl._memorizeSave("BayLang.Caret.isNumber", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isHexChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.Caret.isHexChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.indexOf("0123456789abcdef", Runtime.rs.lower(ch)) !== -1;
		Runtime.rtl._memorizeSave("BayLang.Caret.isHexChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	isStringOfNumbers: function(s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.Caret.isStringOfNumbers", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var sz = Runtime.rs.strlen(s);
		for (var i = 0; i < sz; i++)
		{
			if (!this.isNumber(Runtime.rs.charAt(s, i)))
			{
				var __memorize_value = false;
				Runtime.rtl._memorizeSave("BayLang.Caret.isStringOfNumbers", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = true;
		Runtime.rtl._memorizeSave("BayLang.Caret.isStringOfNumbers", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("BayLang.Caret.isSkipChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (Runtime.rs.ord(ch) <= 32)
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("BayLang.Caret.isSkipChar", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("BayLang.Caret.isSkipChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang";
	},
	getClassName: function()
	{
		return "BayLang.Caret";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(BayLang.Caret);
window["BayLang.Caret"] = BayLang.Caret;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Caret;