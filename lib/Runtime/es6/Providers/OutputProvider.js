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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Providers == 'undefined') Runtime.Providers = {};
Runtime.Providers.OutputProvider = function()
{
	Runtime.BaseProvider.call(this);
	this.color_table = Runtime.Map.from({"black":"0;30","dark_red":"0;31","green":"0;32","brown":"0;33","dark_blue":"0;34","dark_purple":"0;35","dark_cyan":"0;36","gray":"0;37","dark_gray":"0;90","red":"0;91","light_green":"0;92","yellow":"0;93","blue":"0;94","purple":"0;95","cyan":"0;96","white":"0;97","bold_black":"1;30","bold_dark_red":"1;31","bold_green":"1;32","bold_brown":"1;33","bold_dark_blue":"1;34","bold_dark_purple":"1;35","bold_dark_cyan":"1;36","bold_gray":"1;37","bold_dark_gray":"1;90","bold_red":"1;91","bold_light_green":"1;92","bold_yellow":"1;93","bold_blue":"1;94","bold_purple":"1;95","bold_cyan":"1;96","bold_white":"1;97","italic_black":"3;30","italic_dark_red":"3;31","italic_green":"3;32","italic_brown":"3;33","italic_dark_blue":"3;34","italic_dark_purple":"3;35","italic_dark_cyan":"3;36","italic_gray":"3;37","italic_dark_gray":"3;90","italic_red":"3;91","italic_light_green":"3;92","italic_yellow":"3;93","italic_blue":"3;94","italic_purple":"3;95","italic_cyan":"3;96","italic_white":"3;97","underline_black":"4;30","underline_dark_red":"4;31","underline_green":"4;32","underline_brown":"4;33","underline_dark_blue":"4;34","underline_dark_purple":"4;35","underline_dark_cyan":"4;36","underline_gray":"4;37","underline_dark_gray":"4;90","underline_red":"4;91","underline_light_green":"4;92","underline_yellow":"4;93","underline_blue":"4;94","underline_purple":"4;95","underline_cyan":"4;96","underline_white":"4;97","bg_black":"0;40","bg_dark_red":"0;41","bg_green":"0;42","bg_brown":"0;43","bg_dark_blue":"0;44","bg_dark_purple":"0;45","bg_dark_cyan":"0;46","bg_gray":"0;47","bg_dark_gray":"0;100","bg_red":"0;101","bg_light_green":"0;102","bg_yellow":"0;103","bg_blue":"0;104","bg_purple":"0;105","bg_cyan":"0;106","bg_white":"0;107","bg_italic_black":"3;40","bg_italic_dark_red":"3;41","bg_italic_green":"3;42","bg_italic_brown":"3;43","bg_italic_dark_blue":"3;44","bg_italic_dark_purple":"3;45","bg_italic_dark_cyan":"3;46","bg_italic_gray":"3;47","bg_italic_dark_gray":"3;100","bg_italic_red":"3;101","bg_italic_light_green":"3;102","bg_italic_yellow":"3;103","bg_italic_blue":"3;104","bg_italic_purple":"3;105","bg_italic_cyan":"3;106","bg_italic_white":"3;107","bg_underline_black":"4;40","bg_underline_dark_red":"4;41","bg_underline_green":"4;42","bg_underline_brown":"4;43","bg_underline_dark_blue":"4;44","bg_underline_dark_purple":"4;45","bg_underline_dark_cyan":"4;46","bg_underline_gray":"4;47","bg_underline_dark_gray":"4;100","bg_underline_red":"4;101","bg_underline_light_green":"4;102","bg_underline_yellow":"4;103","bg_underline_blue":"4;104","bg_underline_purple":"4;105","bg_underline_cyan":"4;106","bg_underline_white":"4;107"});
};
Runtime.Providers.OutputProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Providers.OutputProvider.prototype.constructor = Runtime.Providers.OutputProvider;
Object.assign(Runtime.Providers.OutputProvider.prototype,
{
	/**
	 * Print message to output
	 */
	print: function(message, new_line, type)
	{
		if (new_line == undefined) new_line = true;
		if (type == undefined) type = "";
		if (!Runtime.rtl.isString(message))
		{
			throw new Runtime.Exceptions.RuntimeException("print message must be string")
		}
		console.log(message);
	},
	/**
	 * Print error
	 */
	print_error: function(message)
	{
		let text_color = "dark_red";
		let isNode = false;
		if (message instanceof Error)
		{
			let color = this.getColor(text_color);
			let char_27 = String.fromCharCode(27);
			
			if (isNode)
			{
				this.print(char_27 + "[" + color + "m", false, "err");
				this.print(message.stack, false, "err");
				this.print(char_27 + "[0m", true, "err");
			}
			else
			{
				let s = char_27 + "[" + color + "m" + message.stack + char_27 + "[0m";
				this.print(s, true, "err");
			}
		}
		
		else
		{
			this.print(this.color(text_color, message), true, "err");
		}
	},
	/**
	 * Format text by color
	 */
	color: function(color, message)
	{
		color = this.getColor(color);
		message = Runtime.rs.chr(27) + Runtime.rtl.toStr("[") + Runtime.rtl.toStr(color) + Runtime.rtl.toStr("m") + Runtime.rtl.toStr(message);
		message = message + Runtime.rtl.toStr(Runtime.rs.chr(27)) + Runtime.rtl.toStr("[0m");
		return message;
	},
	/**
	 * Returns bash console code
	 */
	getColor: function(color)
	{
		var color = Runtime.rs.lower(color);
		if (this.color_table.has(color))
		{
			return this.color_table.get(color);
		}
		if (Runtime.rs.strlen(color) > 5)
		{
			return "0";
		}
		return color;
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.color_table = Runtime.Map.from({});
	},
});
Object.assign(Runtime.Providers.OutputProvider, Runtime.BaseProvider);
Object.assign(Runtime.Providers.OutputProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Providers";
	},
	getClassName: function()
	{
		return "Runtime.Providers.OutputProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
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
Runtime.rtl.defClass(Runtime.Providers.OutputProvider);
window["Runtime.Providers.OutputProvider"] = Runtime.Providers.OutputProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Providers.OutputProvider;