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
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Editor == 'undefined') BayLang.Constructor.Frontend.Editor = {};
if (typeof BayLang.Constructor.Frontend.Editor.Styles == 'undefined') BayLang.Constructor.Frontend.Editor.Styles = {};
BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage = function()
{
	BayLang.Constructor.Frontend.Editor.Styles.StyleItem.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage.prototype = Object.create(BayLang.Constructor.Frontend.Editor.Styles.StyleItem.prototype);
BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage.prototype.constructor = BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage;
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage.prototype,
{
	/**
	 * Build value
	 */
	buildValue: function()
	{
		return "url(${ static::assets(\"" + Runtime.rtl.toStr(this.value) + Runtime.rtl.toStr("\")})");
	},
	/**
	 * Init value
	 */
	initValue: function(original_value)
	{
		var value = "";
		try
		{
			var reader = new BayLang.TokenReader();
			reader.init(new BayLang.Caret(Runtime.Map.from({"content":new Runtime.Reference(original_value)})));
			/* Match url expression */
			reader.matchToken("url");
			reader.matchToken("(");
			reader.matchToken("$");
			reader.matchToken("{");
			reader.matchToken("static");
			reader.matchToken(":");
			reader.matchToken(":");
			reader.matchToken("assets");
			reader.matchToken("(");
			/* Read begin of string */
			var open_string = reader.readToken();
			if (open_string != "'" && open_string != "\"")
			{
				throw new BayLang.Exceptions.ParserUnknownError("String expected", reader.main_caret)
			}
			/* Init caret */
			var caret = reader.main_caret;
			/* Read string value */
			while (!caret.eof() && !caret.isNextString(open_string))
			{
				var ch = caret.readChar();
				if (ch == "\\")
				{
					var ch2 = caret.readChar();
					if (ch2 == "n")
					{
						value += Runtime.rtl.toStr("\n");
					}
					else if (ch2 == "r")
					{
						value += Runtime.rtl.toStr("\r");
					}
					else if (ch2 == "t")
					{
						value += Runtime.rtl.toStr("\t");
					}
					else if (ch2 == "s")
					{
						value += Runtime.rtl.toStr(" ");
					}
					else if (ch2 == "\\")
					{
						value += Runtime.rtl.toStr("\\");
					}
					else if (ch2 == "'")
					{
						value += Runtime.rtl.toStr("'");
					}
					else if (ch2 == "\"")
					{
						value += Runtime.rtl.toStr("\"");
					}
					else
					{
						value += Runtime.rtl.toStr(ch + Runtime.rtl.toStr(ch2));
					}
				}
				else
				{
					value += Runtime.rtl.toStr(ch);
				}
			}
			/* Restore caret */
			reader.init(caret);
			/* Match end of expression */
			reader.matchToken(open_string);
			reader.matchToken(")");
			reader.matchToken("}");
			reader.matchToken(")");
		}
		catch (_ex)
		{
			if (_ex instanceof BayLang.Exceptions.ParserUnknownError)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
		this.original_value = original_value;
		this.value = value;
	},
	_init: function()
	{
		BayLang.Constructor.Frontend.Editor.Styles.StyleItem.prototype._init.call(this);
		this.original_value = "";
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage, BayLang.Constructor.Frontend.Editor.Styles.StyleItem);
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.StyleItem";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage);
window["BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage"] = BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage;