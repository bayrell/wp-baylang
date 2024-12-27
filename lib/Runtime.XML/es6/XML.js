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
if (typeof Runtime.XML == 'undefined') Runtime.XML = {};
Runtime.XML.XML = function()
{
};
Object.assign(Runtime.XML.XML.prototype,
{
	/**
	 * Returns true if XML is exists
	 */
	exists: function()
	{
		if (this.xml == null)
		{
			return false;
		}
		return true;
	},
	/**
	 * Return current name
	 */
	getName: function()
	{
		var res = "";
		return res;
	},
	/**
	 * Return items by name
	 */
	get: function(name)
	{
		return new Runtime.Vector();
	},
	/**
	 * Get value
	 */
	value: function(trim)
	{
		if (trim == undefined) trim = true;
		var value = "";
		return value;
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
	},
	/**
	 * Returns childs count
	 */
	count: function()
	{
		return 0;
	},
	/**
	 * Return items
	 */
	childs: function()
	{
		return new Runtime.Vector();
	},
	/**
	 * Remove childs
	 */
	removeChilds: function()
	{
		var items = this.childs();
		for (var i = 0; i < items.count(); i++)
		{
			items.get(i).remove();
		}
	},
	/**
	 * Get attribute
	 */
	attr: function(key, trim)
	{
		if (trim == undefined) trim = true;
		return null;
	},
	/**
	 * Get attribute
	 */
	attributes: function(trim)
	{
		if (trim == undefined) trim = true;
		var items = new Runtime.Map();
		return items;
	},
	/**
	 * Add attribute
	 */
	addAttribute: function(key, value)
	{
	},
	addAttr: function(key, value)
	{
		return this.addAttribute(key, value);
	},
	/**
	 * Remove attribute
	 */
	removeAttribute: function(key)
	{
	},
	removeAttr: function(key)
	{
		return this.removeAttribute(key);
	},
	/**
	 * Add attributes
	 */
	addAttributes: function(attrs)
	{
		var attrs_keys = attrs.keys();
		for (var i = 0; i < attrs_keys.count(); i++)
		{
			var key = Runtime.rtl.attr(attrs_keys, i);
			var value = attrs.get(key);
			this.addAttribute(key, value);
		}
	},
	/**
	 * Remove attributes
	 */
	removeAttributes: function()
	{
		var attrs = this.attributes();
		var attrs_keys = attrs.keys();
	},
	/**
	 * Remove current element
	 */
	remove: function()
	{
	},
	/**
	 * Append XML
	 */
	append: function(item)
	{
		var name = item.getName();
		var content = item.value();
		var child = this.constructor.newInstance();
		/* Append childs */
		child.appendItems(item.childs());
		/* Add attrs */
		child.addAttributes(item.attributes());
		return child;
	},
	/**
	 * Prepend XML
	 */
	prepend: function(item)
	{
		var name = item.getName();
		var content = item.value();
		var child = this.constructor.newInstance();
		/* Append childs */
		child.appendItems(item.childs());
		/* Add attrs */
		child.addAttributes(item.attributes());
		return child;
	},
	/**
	 * Append childs from XML
	 */
	appendItems: function(items)
	{
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			this.append(item);
		}
	},
	/**
	 * Prepend childs from XML
	 */
	prependItems: function(items)
	{
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			this.prepend(item);
		}
	},
	/**
	 * Patch XML with operation
	 */
	patch: function(operation)
	{
		var type = operation.attr("type");
		var provider = Runtime.rtl.getContext().provider("Runtime.XML.PatcherProvider");
		var patcher = provider.getPatcher(type);
		if (patcher)
		{
			patcher.patch(this, operation);
		}
	},
	/**
	 * Patch XML with operation
	 */
	xpath: function(path)
	{
		var res = new Runtime.Vector();
		return res;
	},
	/**
	 * To string
	 */
	toString: function(params)
	{
		if (params == undefined) params = null;
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(params, "indent"));
		__v0 = __v0.monad(Runtime.rtl.m_to("bool", true));
		var indent = __v0.value();
		var __v1 = new Runtime.Monad(Runtime.rtl.attr(params, "wrap"));
		__v1 = __v1.monad(Runtime.rtl.m_to("bool", false));
		var wrap = __v1.value();
		var xml_str = "";
		return xml_str;
	},
	_init: function()
	{
		this.xml = null;
		this.errors = null;
	},
});
Object.assign(Runtime.XML.XML,
{
	/**
	 * Load xml
	 */
	loadXml: function(xml_str)
	{
		var res = this.newInstance();
		return res;
	},
	/**
	 * Returns new instance
	 */
	newInstance: function()
	{
		return Runtime.rtl.newInstance(this.getClassName());
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.XML";
	},
	getClassName: function()
	{
		return "Runtime.XML.XML";
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
Runtime.rtl.defClass(Runtime.XML.XML);
window["Runtime.XML.XML"] = Runtime.XML.XML;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.XML.XML;