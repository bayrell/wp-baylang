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
Runtime.lib = function()
{
};
Object.assign(Runtime.lib.prototype,
{
});
Object.assign(Runtime.lib,
{
	/**
	 * Check object is istance
	 */
	isInstance: function(class_name)
	{
		return (item) =>
		{
			return Runtime.rtl.is_instanceof(item, class_name);
		};
	},
	/**
	 * Check object is implements interface
	 */
	isImplements: function(class_name)
	{
		return (item) =>
		{
			return Runtime.rtl.is_implements(item, class_name);
		};
	},
	/**
	 * Check class is implements interface
	 */
	classImplements: function(class_name)
	{
		return (item) =>
		{
			return Runtime.rtl.class_implements(item, class_name);
		};
	},
	/**
	 * Create struct
	 */
	createStruct: function(class_name)
	{
		return (data) =>
		{
			return Runtime.rtl.newInstance(class_name, Runtime.Vector.from([data]));
		};
	},
	/**
	 * Equal two struct by key
	 */
	equal: function(value)
	{
		return (item) =>
		{
			return item == value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNot: function(value)
	{
		return (item) =>
		{
			return item != value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalAttr: function(key, value)
	{
		return (item1) =>
		{
			return (item1 != null) ? (Runtime.rtl.attr(item1, key) == value) : (false);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNotAttr: function(key, value)
	{
		return (item1) =>
		{
			return (item1 != null) ? (Runtime.rtl.attr(item1, key) != value) : (false);
		};
	},
	equalAttrNot: function(key, value)
	{
		return this.equalNotAttr(key, value);
	},
	/**
	 * Equal attrs
	 */
	equalAttrs: function(search)
	{
		return (item) =>
		{
			var fields = search.keys();
			for (var i = 0; i < fields.count(); i++)
			{
				var field_name = Runtime.rtl.attr(fields, i);
				if (Runtime.rtl.attr(search, field_name) != Runtime.rtl.attr(item, field_name))
				{
					return false;
				}
			}
			return true;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalMethod: function(method_name, value)
	{
		return (item1) =>
		{
			if (item1 == null)
			{
				return false;
			}
			var f = Runtime.rtl.method(item1, method_name);
			return f() == value;
		};
	},
	/**
	 * Returns key value of obj
	 */
	get: function(key, def_value)
	{
		return (obj) =>
		{
			return Runtime.rtl.attr(obj, Runtime.Vector.from([key]), def_value);
		};
	},
	/**
	 * Set value
	 */
	set: function(key, value)
	{
		return (obj) =>
		{
			return Runtime.rtl.setAttr(obj, Runtime.Vector.from([key]), value);
		};
	},
	/**
	 * Returns attr of item
	 */
	attr: function(path, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (obj) =>
		{
			return Runtime.rtl.attr(obj, path, def_value);
		};
	},
	/**
	 * Set dict attr
	 */
	setAttr: function(path, value)
	{
		return (obj) =>
		{
			return Runtime.rtl.setAttr(obj, path, value);
		};
	},
	/**
	 * Returns max id from items
	 */
	getMaxIdFromItems: function(items, start)
	{
		if (start == undefined) start = 0;
		return items.reduce((value, item) =>
		{
			return (item.id > value) ? (item.id) : (value);
		}, start);
	},
	/**
	 * Copy object
	 */
	copy: function(d)
	{
		return (item) =>
		{
			return item.copy(d);
		};
	},
	/**
	 * Take dict
	 */
	takeDict: function(fields)
	{
		return (item) =>
		{
			return item.takeDict(fields);
		};
	},
	/**
	 * Map
	 */
	map: function(f)
	{
		return (m) =>
		{
			return m.map(f);
		};
	},
	/**
	 * Filter
	 */
	filter: function(f)
	{
		return (m) =>
		{
			return m.filter(f);
		};
	},
	/**
	 * Intersect
	 */
	intersect: function(arr)
	{
		return (m) =>
		{
			return m.intersect(arr);
		};
	},
	/**
	 * Sort
	 */
	sort: function(f)
	{
		return (m) =>
		{
			return m.sortIm(f);
		};
	},
	/**
	 * Transition
	 */
	transition: function(f)
	{
		return (m) =>
		{
			return m.transition(f);
		};
	},
	/**
	 * Concat
	 */
	concat: function(arr)
	{
		return (m) =>
		{
			return m.concat(arr);
		};
	},
	/**
	 * Sort asc
	 */
	sortAsc: function(a, b)
	{
		return (a > b) ? (1) : ((a < b) ? (-1) : (0));
	},
	/**
	 * Sort desc
	 */
	sortDesc: function(a, b)
	{
		return (a > b) ? (-1) : ((a < b) ? (1) : (0));
	},
	/**
	 * Sort attr
	 */
	sortAttr: function(field_name, f)
	{
		return (a, b) =>
		{
			var a = Runtime.rtl.attr(a, field_name);
			var b = Runtime.rtl.attr(b, field_name);
			if (f == "asc")
			{
				return (a > b) ? (1) : ((a < b) ? (-1) : (0));
			}
			if (f == "desc")
			{
				return (a > b) ? (-1) : ((a < b) ? (1) : (0));
			}
			return f(a, b);
		};
	},
	/**
	 * Convert monad by type
	 */
	to: function(type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) =>
		{
			return new Runtime.Monad((m.err == null) ? (Runtime.rtl.convert(m.value(), type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad by type
	 */
	default: function(def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) =>
		{
			return (m.err != null || m.val === null) ? (new Runtime.Monad(def_value)) : (m);
		};
	},
	/**
	 * Set monad new value
	 */
	newValue: function(value, clear_error)
	{
		if (value == undefined) value = null;
		if (clear_error == undefined) clear_error = false;
		return (m) =>
		{
			return (clear_error == true) ? (new Runtime.Monad(value)) : ((m.err == null) ? (new Runtime.Monad(value)) : (m));
		};
	},
	/**
	 * Clear error
	 */
	clearError: function()
	{
		return (m) =>
		{
			return new Runtime.Monad(m.val);
		};
	},
	/**
	 * Returns monad
	 */
	monad: function(m)
	{
		return m;
	},
	/**
	 * Get method from class
	 * @return fn
	 */
	method: function(method_name)
	{
		return (class_name) =>
		{
			return Runtime.rtl.method(class_name, method_name);
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	applyMethod: function(method_name, args)
	{
		if (args == undefined) args = null;
		return (class_name) =>
		{
			var f = Runtime.rtl.method(class_name, method_name);
			return Runtime.rtl.apply(f, args);
		};
	},
	/**
	 * Apply async function
	 * @return fn
	 */
	applyMethodAsync: function(method_name, args)
	{
		if (args == undefined) args = null;
		return async (class_name) =>
		{
			var f = Runtime.rtl.method(class_name, method_name);
			return Promise.resolve(await Runtime.rtl.applyAsync(f, args));
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	apply: function(f)
	{
		return (value) =>
		{
			return f(value);
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	applyAsync: function(f)
	{
		return async (value) =>
		{
			return await f(value);
		};
	},
	/**
	 * Create pipe
	 */
	pipe: function()
	{
		return new Runtime.Chain();
	},
	/**
	 * Value for pipe
	 */
	value: function()
	{
		return (value) =>
		{
			return value;
		};
	},
	/**
	 * Normalize date time
	 */
	normalizeDateTime: function()
	{
		return (date_time) =>
		{
			if (!date_time)
			{
				return "";
			}
			return date_time.normalize().getDateTimeString();
		};
	},
	/**
	 * Log message
	 * @return fn
	 */
	log: function(message)
	{
		if (message == undefined) message = "";
		return (value) =>
		{
			if (message == "")
			{
				console.log(value);
			}
			else
			{
				console.log(message);
			}
			return value;
		};
	},
	/**
	 * Function or
	 */
	or: function(arr)
	{
		return (item) =>
		{
			for (var i = 0; i < arr.count(); i++)
			{
				var f = Runtime.rtl.attr(arr, i);
				var res = f(item);
				if (res)
				{
					return true;
				}
			}
			return false;
		};
	},
	/**
	 * Function and
	 */
	and: function(arr)
	{
		return (item) =>
		{
			for (var i = 0; i < arr.count(); i++)
			{
				var f = Runtime.rtl.attr(arr, i);
				var res = f(item);
				if (!res)
				{
					return false;
				}
			}
			return true;
		};
	},
	/**
	 * Join
	 */
	join: function(ch)
	{
		return (items) =>
		{
			return Runtime.rs.join(ch, items);
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.lib";
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
Runtime.rtl.defClass(Runtime.lib);
window["Runtime.lib"] = Runtime.lib;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.lib;