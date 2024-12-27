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
BayLang.CoreParser = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
BayLang.CoreParser.prototype = Object.create(Runtime.BaseStruct.prototype);
BayLang.CoreParser.prototype.constructor = BayLang.CoreParser;
Object.assign(BayLang.CoreParser.prototype,
{
	/**
	 * Returns true if eof
	 */
	isEof: function()
	{
		return this.caret.pos >= this.content_sz;
	},
	/**
	 * Returns caret
	 */
	getCaret: function()
	{
		return this.caret.clone(Runtime.Map.from({"file_name":this.file_name,"content":this.content,"content_sz":this.content_sz}));
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.tab_size = 4;
		this.file_name = "";
		this.content = null;
		this.content_sz = 0;
		this.caret = null;
		this.find_ident = true;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "tab_size")return this.tab_size;
		else if (k == "file_name")return this.file_name;
		else if (k == "content")return this.content;
		else if (k == "content_sz")return this.content_sz;
		else if (k == "caret")return this.caret;
		else if (k == "find_ident")return this.find_ident;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(BayLang.CoreParser, Runtime.BaseStruct);
Object.assign(BayLang.CoreParser,
{
	/**
	 * Reset parser
	 */
	reset: function(parser)
	{
		return parser.copy(Runtime.Map.from({"caret":new BayLang.Caret(Runtime.Map.from({})),"token":null}));
	},
	/**
	 * Set content
	 */
	setContent: function(parser, content)
	{
		return parser.copy(Runtime.Map.from({"content":new Runtime.Reference(content),"content_sz":Runtime.rs.strlen(content)}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(parser, content)
	{
		parser = this.reset(parser);
		parser = this.setContent(parser, content);
		while (parser.caret.pos < parser.content_sz)
		{
			parser = parser.constructor.nextToken(parser);
		}
		return parser;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang";
	},
	getClassName: function()
	{
		return "BayLang.CoreParser";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
		a.push("tab_size");
		a.push("file_name");
		a.push("content");
		a.push("content_sz");
		a.push("caret");
		a.push("find_ident");
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
Runtime.rtl.defClass(BayLang.CoreParser);
window["BayLang.CoreParser"] = BayLang.CoreParser;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.CoreParser;