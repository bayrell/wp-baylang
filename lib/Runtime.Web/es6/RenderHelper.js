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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.RenderHelper = function()
{
};
Object.assign(Runtime.Web.RenderHelper.prototype,
{
});
Object.assign(Runtime.Web.RenderHelper,
{
	/**
	 * From rgb
	 */
	rgbToInt: function(color)
	{
		var ch = this.substr(color, 0, 1);
		if (ch == "#")
		{
			color = this.substr(color, 1);
		}
		var r = "";
		var g = "";
		var b = "";
		var sz = this.strlen(color);
		if (sz == 3)
		{
			r = Runtime.rs.substr(color, 0, 1);
			r += Runtime.rtl.toStr(r);
			g = Runtime.rs.substr(color, 1, 1);
			g += Runtime.rtl.toStr(g);
			b = Runtime.rs.substr(color, 2, 1);
			b += Runtime.rtl.toStr(b);
		}
		else if (sz == 6)
		{
			r = Runtime.rs.substr(color, 0, 2);
			g = Runtime.rs.substr(color, 2, 2);
			b = Runtime.rs.substr(color, 4, 2);
		}
		r = this.hexdec(r);
		g = this.hexdec(g);
		b = this.hexdec(b);
		return Runtime.Vector.from([r,g,b]);
	},
	/**
	 * From rgb
	 */
	intToRgb: function(r, g, b)
	{
		r = r.toString(16).padStart(2, '0');
		g = g.toString(16).padStart(2, '0');
		b = b.toString(16).padStart(2, '0');
		
		return r + g + b;
	},
	/**
	 * Brightness
	 */
	brightness: function(color, percent)
	{
		var color = this.rgbToInt(color);
		var r = Runtime.rtl.attr(color, 0);
		var g = Runtime.rtl.attr(color, 1);
		var b = Runtime.rtl.attr(color, 2);
		r = Runtime.Math.round(r + r * percent / 100);
		g = Runtime.Math.round(g + g * percent / 100);
		b = Runtime.Math.round(b + b * percent / 100);
		if (r > 255)
		{
			r = 255;
		}
		if (g > 255)
		{
			g = 255;
		}
		if (b > 255)
		{
			b = 255;
		}
		if (r < 0)
		{
			r = 0;
		}
		if (g < 0)
		{
			g = 0;
		}
		if (b < 0)
		{
			b = 0;
		}
		return "#" + Runtime.rtl.toStr(this.intToRgb(r, g, b));
	},
	/**
	 * Strip tags
	 */
	strip_tags: function(content, allowed_tags)
	{
		if (allowed_tags == undefined) allowed_tags = null;
		if (allowed_tags == null)
		{
			content = Runtime.re.replace("<[^>]+>", "", content);
			content = Runtime.rs.trim(Runtime.rs.spaceless(content));
			return content;
		}
		var matches = Runtime.re.matchAll("<[^>]+>", content, "i");
		if (matches)
		{
			for (var i = 0; i < matches.count(); i++)
			{
				var match = Runtime.rtl.attr(matches, i);
				var tag_str = Runtime.rtl.attr(match, 0);
				var tag_match = Runtime.re.matchAll("<(\\/|)([a-zA-Z]+)(|[^>]*)>", tag_str, "i");
				if (tag_match)
				{
					var tag_name = this.strtolower(Runtime.rtl.attr(Runtime.rtl.attr(tag_match, 0), 2));
					if (allowed_tags.indexOf(tag_name) == -1)
					{
						content = this.replace(tag_str, "", content);
					}
				}
			}
		}
		content = Runtime.rs.trim(Runtime.rs.spaceless(content));
		return content;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RenderHelper";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(Runtime.Web.RenderHelper);
window["Runtime.Web.RenderHelper"] = Runtime.Web.RenderHelper;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderHelper;