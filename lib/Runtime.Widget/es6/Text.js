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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.Text = {
	name: "Runtime.Widget.Text",
	extends: Runtime.Web.Component,
	props: {
		"tag": {
			default: "text",
		},
		"raw": {
			default: "false",
		},
		"content": {
			default: "Text",
		},
	},
	methods:
	{
		renderText: function(content)
		{
			let __v = [];
			
			if (this.raw == "true")
			{
				/* Raw */
				this._t(__v, new Runtime.RawString(content));
			}
			else
			{
				/* Render */
				this._t(__v, content);
			}
			
			return this._flatten(__v);
		},
		renderContent: function()
		{
			let __v = [];
			let content = Runtime.rs.split("\n", this.content);
			
			if (content.count() == 1)
			{
				/* Render */
				this._t(__v, this.renderText(content.get(0)));
			}
			else
			{
				for (let i = 0; i < content.count(); i++)
				{
					let item = content.get(i);
					
					/* Element 'div' */
					let __v0 = this._e(__v, "div", {"key":i});
					
					/* Render */
					this._t(__v0, this.renderText(item));
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			if (this.tag == "p")
			{
				/* Element 'p' */
				let __v0 = this._e(__v, "p", {"class":this._class_name(["widget_text", this.class]),"key":this.getKey()});
				
				/* Render */
				this._t(__v0, this.renderContent());
			}
			else if (this.tag == "h1")
			{
				/* Element 'h1' */
				let __v1 = this._e(__v, "h1", {"class":this._class_name(["widget_text", this.class]),"key":this.getKey()});
				
				/* Render */
				this._t(__v1, this.renderContent());
			}
			else if (this.tag == "h2")
			{
				/* Element 'h2' */
				let __v2 = this._e(__v, "h2", {"class":this._class_name(["widget_text", this.class]),"key":this.getKey()});
				
				/* Render */
				this._t(__v2, this.renderContent());
			}
			else if (this.tag == "h3")
			{
				/* Element 'h3' */
				let __v3 = this._e(__v, "h3", {"class":this._class_name(["widget_text", this.class]),"key":this.getKey()});
				
				/* Render */
				this._t(__v3, this.renderContent());
			}
			else if (this.tag == "h4")
			{
				/* Element 'h4' */
				let __v4 = this._e(__v, "h4", {"class":this._class_name(["widget_text", this.class]),"key":this.getKey()});
				
				/* Render */
				this._t(__v4, this.renderContent());
			}
			else if (this.tag == "html")
			{
				/* Element 'div' */
				let __v5 = this._e(__v, "div", {"class":this._class_name(["widget_text", this.class]),"key":this.getKey()});
				
				/* Render */
				this._t(__v5, this.renderContent());
			}
			else
			{
				/* Element 'div' */
				let __v6 = this._e(__v, "div", {"class":this._class_name(["widget_text", this.class]),"key":this.getKey()});
				
				/* Render */
				this._t(__v6, this.renderContent());
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns key
 */
		getKey: function()
		{
			var key = this.tag;
			if (this.raw == "true")
			{
				key = key + Runtime.rtl.toStr("-raw");
			}
			return key;
		},
	},
};
Object.assign(Runtime.Widget.Text,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_text.h-8fb5{padding: 0;margin: 0}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Text";
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
Runtime.rtl.defClass(Runtime.Widget.Text);
window["Runtime.Widget.Text"] = Runtime.Widget.Text;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Text;