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
BayLang.Constructor.Frontend.Editor.Styles.Selector = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Styles.Selector.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Constructor.Frontend.Editor.Styles.Selector.prototype.constructor = BayLang.Constructor.Frontend.Editor.Styles.Selector;
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.Selector.prototype,
{
	/**
	 * Build content
	 */
	buildContent: function()
	{
		var items = Runtime.Vector.from([]);
		var keys = this.styles.keys().sort();
		for (var i = 0; i < keys.count(); i++)
		{
			var key = keys.get(i);
			var value = this.styles.get(key);
			items.push(key + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(value.buildValue()));
		}
		items.push(this.css_ignore);
		var source = Runtime.rs.join(";\n", items);
		return Runtime.rs.trim(source);
	},
	/**
	 * Create style
	 */
	createStyle: function(key)
	{
		var value;
		if (key == "background-image")
		{
			value = new BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage();
		}
		else
		{
			value = new BayLang.Constructor.Frontend.Editor.Styles.StyleItem();
		}
		value.key = key;
		return value;
	},
	/**
	 * Returns style
	 */
	getStyle: function(key)
	{
		if (!this.styles.has(key))
		{
			return null;
		}
		return this.styles.get(key);
	},
	/**
	 * Set style value
	 */
	setStyleValue: function(key, value)
	{
		value = Runtime.rs.trim(value);
		if (value != "")
		{
			/* Get CSS Value */
			var css_value = this.getStyle(key);
			if (!css_value)
			{
				css_value = this.createStyle(key);
				this.styles.set(css_value.key, css_value);
			}
			/* Set CSS Value */
			css_value.setValue(value);
		}
		else
		{
			/* Remove style item */
			if (this.styles.has(key))
			{
				this.styles.remove(key);
			}
		}
		/* Update source */
		var source = this.buildContent();
		this.setContent(source, false);
	},
	/**
	 * Change style value
	 */
	changeStyleValue: function(key, value)
	{
		/* Set CSS Value */
		this.setStyleValue(key, value);
		/* Update CSS */
		this.parent_widget.parent_widget.updateFrameCSS();
	},
	/**
	 * Parse styles
	 */
	parseStyles: function()
	{
		var content = this.source;
		/* Create parser */
		var component_processor = this.parent_widget.parent_widget.component_processor;
		var parser = component_processor.createParser();
		parser = parser.constructor.setContent(parser, content);
		/* Parse CSS */
		var res = this.constructor.parseCSS(parser, content);
		/* CSS Values */
		this.styles = Runtime.Map.from({});
		var items = Runtime.rs.split(";", res.get(0));
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			var pos = Runtime.rs.indexOf(item, ":");
			if (pos == -1)
			{
				continue;
			}
			var item_key = Runtime.rs.trim(Runtime.rs.substr(item, 0, pos));
			var item_value = Runtime.rs.trim(Runtime.rs.substr(item, pos + 1));
			var value = this.createStyle(item_key);
			value.initValue(item_value);
			this.styles.set(value.key, value);
		}
		/* CSS Ignore */
		this.css_ignore = Runtime.rs.trim(res.get(1));
	},
	/**
	 * Set content
	 */
	setContent: function(source, parse_styles)
	{
		if (parse_styles == undefined) parse_styles = true;
		var component_processor = this.parent_widget.parent_widget.component_processor;
		var parser = component_processor.createParser();
		var translator = component_processor.createTranslator();
		/* Parse CSS */
		var css_code = this.selector_name + Runtime.rtl.toStr("{") + Runtime.rtl.toStr(source) + Runtime.rtl.toStr("}");
		var content = this.constructor.translateCSS(parser, translator, css_code);
		/* Set content */
		this.source = source;
		this.content = content;
		if (parse_styles)
		{
			this.parseStyles();
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.parent_widget = null;
		this.op_code = null;
		this.selector_name = "";
		this.source = "";
		this.content = "";
		this.css_ignore = "";
		this.styles = Runtime.Map.from({});
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.Selector, Runtime.BaseObject);
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.Selector,
{
	/**
	 * Translate CSS
	 */
	translateCSS: function(parser, translator, source)
	{
		/* Parse source */
		var op_code = null;
		try
		{
			parser = parser.constructor.setContent(parser, source + Runtime.rtl.toStr("}"));
			var res = parser.parser_html.constructor.readCssBody(parser);
			op_code = res.get(1);
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
		/* Translate source */
		if (!op_code)
		{
			return "";
		}
		translator = Runtime.rtl.setAttr(translator, Runtime.Collection.from(["is_static_function"]), true);
		var res = translator.expression.constructor.Expression(translator, op_code);
		return res.get(1);
	},
	/**
	 * Parse CSS
	 */
	parseCSS: function(parser, content)
	{
		var caret = new BayLang.Caret(Runtime.Map.from({"content":new Runtime.Reference(content)}));
		var start = 0;
		var styles = Runtime.Vector.from([]);
		var css_ignore = Runtime.Vector.from([]);
		while (!caret.eof())
		{
			var ch = caret.nextChar();
			var ch2 = caret.nextString(2);
			if (ch == "{")
			{
				var level = 1;
				if (start != caret.pos)
				{
					var s = Runtime.rs.substr(content, start, caret.pos - start);
					css_ignore.push(s);
				}
				start = caret.pos;
				while (!caret.eof() && (ch != "}" && level == 0 || level > 0))
				{
					caret.readChar();
					ch = caret.nextChar();
					if (ch == "{")
					{
						level = level + 1;
					}
					if (ch == "}")
					{
						level = level - 1;
					}
				}
				if (start != caret.pos)
				{
					css_ignore.push(Runtime.rs.substr(content, start, caret.pos - start + 1));
				}
				if (caret.pos < caret.content_sz)
				{
					start = caret.pos + 1;
				}
			}
			else if (ch2 == "${")
			{
				/* Save caret */
				caret.matchString("${");
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				/* Read expression */
				try
				{
					var res = parser.parser_expression.constructor.readExpression(parser);
					parser = Runtime.rtl.attr(res, 0);
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
				/* Restore caret */
				caret = parser.getCaret();
				caret.skipSpace();
				if (caret.isNextChar("}"))
				{
					caret.matchChar("}");
				}
			}
			else if (ch == ";")
			{
				caret.readChar();
				var s = Runtime.rs.substr(content, start, caret.pos - start);
				styles.push(s);
				start = caret.pos;
			}
			else
			{
				caret.readChar();
			}
		}
		if (start != caret.pos)
		{
			styles.push(Runtime.rs.substr(content, start, caret.pos - start));
		}
		return Runtime.Vector.from([Runtime.rs.join("", styles),Runtime.rs.join("", css_ignore)]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.Selector";
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
});
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Styles.Selector);
window["BayLang.Constructor.Frontend.Editor.Styles.Selector"] = BayLang.Constructor.Frontend.Editor.Styles.Selector;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Styles.Selector;