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
if (typeof BayLang.OpCodes == 'undefined') BayLang.OpCodes = {};
BayLang.OpCodes.OpHtmlStyle = function()
{
	BayLang.OpCodes.BaseOpCode.apply(this, arguments);
};
BayLang.OpCodes.OpHtmlStyle.prototype = Object.create(BayLang.OpCodes.BaseOpCode.prototype);
BayLang.OpCodes.OpHtmlStyle.prototype.constructor = BayLang.OpCodes.OpHtmlStyle;
Object.assign(BayLang.OpCodes.OpHtmlStyle.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		BayLang.OpCodes.BaseOpCode.prototype.serialize.call(this, serializer, data);
		serializer.process(this, "content", data);
		serializer.process(this, "is_global", data);
		serializer.process(this, "value", data);
	},
	/**
	 * Read styles from content
	 */
	readStyles: function()
	{
		var reader = new BayLang.TokenReader();
		reader.init(new BayLang.Caret(Runtime.Map.from({"content":new Runtime.Reference(this.content)})));
		var styles = Runtime.Map.from({});
		while (!reader.eof() && reader.nextToken() == ".")
		{
			var selector = this.readSelector(reader);
			var code = this.readCssBlock(reader);
			styles.set(selector, code);
		}
		return styles;
	},
	/**
	 * Read selector
	 */
	readSelector: function(reader)
	{
		var items = Runtime.Vector.from([]);
		while (!reader.eof() && reader.nextToken() != "{")
		{
			items.push(reader.readToken());
		}
		return Runtime.rs.join("", items);
	},
	/**
	 * Read css block
	 */
	readCssBlock: function(reader)
	{
		reader.matchToken("{");
		var caret = reader.main_caret;
		caret.skipSpace();
		var level = 0;
		var items = Runtime.Vector.from([]);
		while (!caret.eof() && (caret.nextChar() != "}" && level == 0 || level > 0))
		{
			var ch = caret.readChar();
			if (ch != "\t")
			{
				items.push(ch);
			}
			if (ch == "{")
			{
				level = level + 1;
			}
			if (ch == "}")
			{
				level = level - 1;
			}
		}
		reader.init(caret);
		reader.matchToken("}");
		return Runtime.rs.trim(Runtime.rs.join("", items));
	},
	_init: function()
	{
		BayLang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_html_style";
		this.content = "";
		this.is_global = false;
		this.value = null;
	},
});
Object.assign(BayLang.OpCodes.OpHtmlStyle, BayLang.OpCodes.BaseOpCode);
Object.assign(BayLang.OpCodes.OpHtmlStyle,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.OpCodes";
	},
	getClassName: function()
	{
		return "BayLang.OpCodes.OpHtmlStyle";
	},
	getParentClassName: function()
	{
		return "BayLang.OpCodes.BaseOpCode";
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
Runtime.rtl.defClass(BayLang.OpCodes.OpHtmlStyle);
window["BayLang.OpCodes.OpHtmlStyle"] = BayLang.OpCodes.OpHtmlStyle;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.OpCodes.OpHtmlStyle;