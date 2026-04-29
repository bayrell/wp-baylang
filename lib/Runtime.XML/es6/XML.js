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
Runtime.XML.XML = class
{
	/**
	 * Load xml
	 */
	static loadXml(xml_str)
	{
		let res = this.newInstance();
		return res;
	}
	
	
	/**
	 * Returns new instance
	 */
	static newInstance(){ return Runtime.rtl.newInstance(this.getClassName()); }
	
	
	/**
	 * Returns true if XML is exists
	 */
	exists()
	{
		if (this.xml == null) return false;
		return true;
	}
	
	
	/**
	 * Return current name
	 */
	getName()
	{
		let res = "";
		return res;
	}
	
	
	/**
	 * Return items by name
	 */
	get(name)
	{
		return new Runtime.Vector();
	}
	
	
	/**
	 * Returns content
	 */
	getContent(name, pos)
	{
		if (pos == undefined) pos = 0;
		let item = this.get(name).get(pos);
		return item ? item.value() : "";
	}
	
	
	/**
	 * Set content
	 */
	setContent(name, value, pos)
	{
		if (pos == undefined) pos = 0;
		let item = this.get(name).get(pos);
		if (item)
		{
			item.setValue(value);
		}
	}
	
	
	/**
	 * Get value
	 */
	value(trim)
	{
		if (trim == undefined) trim = true;
		let value = "";
		return value;
	}
	
	
	/**
	 * Set value
	 */
	setValue(value)
	{
	}
	
	
	/**
	 * Returns childs count
	 */
	count()
	{
		return 0;
	}
	
	
	/**
	 * Return items
	 */
	childs()
	{
		return new Runtime.Vector();
	}
	
	
	/**
	 * Remove childs
	 */
	removeChilds()
	{
		let items = this.childs();
		for (let i = 0; i < items.count(); i++)
		{
			items.get(i).remove();
		}
	}
	
	
	/**
	 * Get attribute
	 */
	attr(key, trim)
	{
		if (trim == undefined) trim = true;
		return null;
	}
	
	
	/**
	 * Get attribute
	 */
	attributes(trim)
	{
		if (trim == undefined) trim = true;
		let items = new Runtime.Map();
		return items;
	}
	
	
	/**
	 * Add attribute
	 */
	addAttribute(key, value)
	{
	}
	
	
	addAttr(key, value){ return this.addAttribute(key, value); }
	
	
	/**
	 * Remove attribute
	 */
	removeAttribute(key)
	{
	}
	
	
	removeAttr(key){ return this.removeAttribute(key); }
	
	
	/**
	 * Add attributes
	 */
	addAttributes(attrs)
	{
		let attrs_keys = attrs.keys();
		for (let i = 0; i < attrs_keys.count(); i++)
		{
			let key = attrs_keys[i];
			let value = attrs.get(key);
			this.addAttribute(key, value);
		}
	}
	
	
	/**
	 * Remove attributes
	 */
	removeAttributes()
	{
		let attrs = this.attributes();
		let attrs_keys = attrs.keys();
	}
	
	
	/**
	 * Remove current element
	 */
	remove()
	{
	}
	
	
	/**
	 * Append XML
	 */
	append(item)
	{
		let name = item.getName();
		let content = item.value();
		let child = this.constructor.newInstance();
		/* Append childs */
		child.appendItems(item.childs());
		/* Add attrs */
		child.addAttributes(item.attributes());
		return child;
	}
	
	
	/**
	 * Prepend XML
	 */
	prepend(item)
	{
		let name = item.getName();
		let content = item.value();
		let child = this.constructor.newInstance();
		/* Append childs */
		child.appendItems(item.childs());
		/* Add attrs */
		child.addAttributes(item.attributes());
		return child;
	}
	
	
	/**
	 * Append childs from XML
	 */
	appendItems(items)
	{
		for (let i = 0; i < items.count(); i++)
		{
			let item = items.get(i);
			this.append(item);
		}
	}
	
	
	/**
	 * Prepend childs from XML
	 */
	prependItems(items)
	{
		for (let i = 0; i < items.count(); i++)
		{
			let item = items.get(i);
			this.prepend(item);
		}
	}
	
	
	/**
	 * Patch XML with operation
	 */
	patch(operation)
	{
		let type = operation.attr("type");
		let provider = Runtime.rtl.getContext().provider("Runtime.XML.PatcherProvider");
		let patcher = provider.getPatcher(type);
		if (patcher)
		{
			patcher.patch(this, operation);
		}
	}
	
	
	/**
	 * Patch XML with operation
	 */
	xpath(path)
	{
		let res = new Runtime.Vector();
		return res;
	}
	
	
	/**
	 * To string
	 */
	toString(params)
	{
		if (params == undefined) params = null;
		let indent = params.get("indent");
		let wrap = params.get("wrap");
		let xml_str = "";
		return xml_str;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		this.xml = null;
		this.errors = null;
	}
	static getClassName(){ return "Runtime.XML.XML"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.XML.XML"] = Runtime.XML.XML;