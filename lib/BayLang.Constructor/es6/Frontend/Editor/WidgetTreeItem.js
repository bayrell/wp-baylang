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
BayLang.Constructor.Frontend.Editor.WidgetTreeItem = function(code)
{
	Runtime.Widget.Tree.TreeItem.call(this);
	this.code = code;
};
BayLang.Constructor.Frontend.Editor.WidgetTreeItem.prototype = Object.create(Runtime.Widget.Tree.TreeItem.prototype);
BayLang.Constructor.Frontend.Editor.WidgetTreeItem.prototype.constructor = BayLang.Constructor.Frontend.Editor.WidgetTreeItem;
Object.assign(BayLang.Constructor.Frontend.Editor.WidgetTreeItem.prototype,
{
	/**
	 * Returns true if can insert inside
	 */
	canDragInside: function()
	{
		if (!this.code)
		{
			return false;
		}
		if (this.code.tag_name == "h1")
		{
			return false;
		}
		if (this.code.tag_name == "h2")
		{
			return false;
		}
		if (this.code.tag_name == "h3")
		{
			return false;
		}
		if (this.code.tag_name == "h4")
		{
			return false;
		}
		if (this.code.tag_name == "h5")
		{
			return false;
		}
		if (this.code.tag_name == "p")
		{
			return false;
		}
		if (this.code.tag_name == "span")
		{
			return false;
		}
		return true;
	},
	/**
	 * Update item
	 */
	updateLabel: function()
	{
		if (this.code instanceof BayLang.OpCodes.OpHtmlTag)
		{
			var names = this.constructor.getAttrValues(this.code.attrs, "class");
			if (names.count() == 0)
			{
				this.key = this.code.tag_name;
				this.label = this.code.tag_name;
			}
			else
			{
				var key = names.get(0);
				var keys = Runtime.rs.split(" ", key);
				this.key = key;
				this.label = this.code.tag_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(keys.get(0));
			}
		}
		else if (this.code instanceof BayLang.OpCodes.OpHtmlSlot)
		{
			this.key = this.code.name;
			this.label = "slot." + Runtime.rtl.toStr(this.code.name);
		}
	},
	_init: function()
	{
		Runtime.Widget.Tree.TreeItem.prototype._init.call(this);
		this.code = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.WidgetTreeItem, Runtime.Widget.Tree.TreeItem);
Object.assign(BayLang.Constructor.Frontend.Editor.WidgetTreeItem,
{
	/**
	 * Returns attr values
	 */
	getAttrValues: function(attrs, name)
	{
		attrs = attrs.filter((code_attr) =>
		{
			if (code_attr.key != name)
			{
				return false;
			}
			if (!Runtime.rtl.is_instanceof(code_attr.value, "BayLang.OpCodes.OpString"))
			{
				return false;
			}
			return true;
		});
		attrs = attrs.map((code_attr) =>
		{
			return code_attr.value.value;
		});
		return attrs;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.WidgetTreeItem";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Tree.TreeItem";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.WidgetTreeItem);
window["BayLang.Constructor.Frontend.Editor.WidgetTreeItem"] = BayLang.Constructor.Frontend.Editor.WidgetTreeItem;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.WidgetTreeItem;