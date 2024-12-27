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
Runtime.rtl = function()
{
};
Object.assign(Runtime.rtl.prototype,
{
});
Object.assign(Runtime.rtl,
{
	LOG_FATAL: 0,
	LOG_CRITICAL: 2,
	LOG_ERROR: 4,
	LOG_WARNING: 6,
	LOG_INFO: 8,
	LOG_DEBUG: 10,
	LOG_DEBUG2: 12,
	STATUS_PLAN: 0,
	STATUS_DONE: 1,
	STATUS_PROCESS: 100,
	STATUS_FAIL: -1,
	ERROR_NULL: 0,
	ERROR_OK: 1,
	ERROR_PROCCESS: 100,
	ERROR_FALSE: -100,
	ERROR_UNKNOWN: -1,
	ERROR_INDEX_OUT_OF_RANGE: -2,
	ERROR_KEY_NOT_FOUND: -3,
	ERROR_STOP_ITERATION: -4,
	ERROR_FILE_NOT_FOUND: -5,
	ERROR_ITEM_NOT_FOUND: -5,
	ERROR_OBJECT_DOES_NOT_EXISTS: -5,
	ERROR_OBJECT_ALLREADY_EXISTS: -6,
	ERROR_ASSERT: -7,
	ERROR_REQUEST: -8,
	ERROR_RESPONSE: -9,
	ERROR_CSRF_TOKEN: -10,
	ERROR_RUNTIME: -11,
	ERROR_VALIDATION: -12,
	ERROR_PARSE_SERIALIZATION_ERROR: -14,
	ERROR_ASSIGN_DATA_STRUCT_VALUE: -15,
	ERROR_AUTH: -16,
	ERROR_DUPLICATE: -17,
	ERROR_API_NOT_FOUND: -18,
	ERROR_API_WRONG_FORMAT: -19,
	ERROR_API_WRONG_APP_NAME: -20,
	ERROR_API_ERROR: -21,
	ERROR_CURL_ERROR: -22,
	ERROR_FATAL: -99,
	ERROR_HTTP_CONTINUE: -100,
	ERROR_HTTP_SWITCH: -101,
	ERROR_HTTP_PROCESSING: -102,
	ERROR_HTTP_OK: -200,
	ERROR_HTTP_BAD_GATEWAY: -502,
	ERROR_USER: -10000,
	ALLOW_OBJECTS: 1,
	JSON_PRETTY: 8,
	_memorize_cache: null,
	_memorize_not_found: null,
	_memorize_hkey: null,
	_global_context: null,
	/**
	 * Define class
	 */
	defClass: function(obj)
	{
		if (Runtime.rtl._classes == undefined) Runtime.rtl._classes = {};
		Runtime.rtl._classes[obj.getClassName()] = obj;
	},
	/**
	 * Register module
	 */
	defModule: function(f)
	{
		var res = f(this.require);
		var exports = res["exports"];
		var module_name = res["module_name"];
		if (module_name != null)
		{
			Runtime.rtl._modules[module_name] = exports;
		}
	},
	/**
	 * Require js module by name
	 * @return module
	 */
	require: function(module_name)
	{
		if (Runtime.rtl._modules[module_name] == undefined)
		{
			throw new Runtime.Exceptions.ItemNotFound(module_name, "Module");
		}
		return Runtime.rtl._modules[module_name];
	},
	/**
	 * Find class instance by name. If class does not exists return null.
	 * @return var - class instance
	 */
	find_class: function(class_name)
	{
		if (class_name instanceof Function)
			return class_name;
		
		if (window[class_name] != undefined)
			return window[class_name];
			
		return Runtime.rtl._classes[class_name];
	},
	/**
	 * Returns true if class instanceof class_name
	 * @return bool
	 */
	is_instanceof: function(obj, class_name)
	{
		if (obj == null)
		{
			return false;
		}
		var obj_class_name = this.get_class_name(obj);
		if (obj_class_name != "")
		{
			obj = obj_class_name;
		}
		if (this.isString(obj))
		{
			if (obj == class_name)
			{
				return true;
			}
			var parents = this.getParents(obj);
			if (parents.indexOf(class_name) >= 0)
			{
				return true;
			}
			return false;
		}
		return false;
	},
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	is_implements: function(obj, interface_name)
	{
		if (obj == null)
		{
			return false;
		}
		return this.class_implements(this.get_class_name(obj), interface_name);
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_implements: function(class_name, interface_name)
	{
		var obj = this.find_class(class_name);
		var obj2 = this.find_class(interface_name);
		
		while (obj != null){
			if (obj.__implements__){
				if (obj.__implements__.indexOf( obj2 ) > -1 ){
					return true;
				}
			}
			obj = obj.__proto__;
		}
		
		return false;
	},
	/**
	 * Returns interface of class
	 * @param string class_name
	 * @return Collection<string>
	 */
	getInterfaces: function(class_name)
	{
		return Runtime.Vector.from(this.find_class(class_name).__implements__);
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_exists: function(class_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		return true;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	get_class_name: function(obj)
	{
		if (this.isString(obj))
		{
			return obj;
		}
		var t = this.getType(obj);
		if (t != "object" && t != "collection" && t != "dict")
		{
			return "";
		}
		if (obj.constructor.getClassName == undefined) return "";
		return obj.constructor.getClassName();
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	method_exists: function(class_name, method_name)
	{
		if (typeof(class_name) == "object")
		{
			if (class_name[method_name] != undefined) return true;
			return false;
		}
		
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		if (this.exists(obj[method_name])) return true;
		return false;
	},
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	newInstance: function(class_name, args)
	{
		if (args == undefined) args = null;
		var obj = this.find_class(class_name);
		if (!this.exists(obj) || !(obj instanceof Function))
		{
			throw new Runtime.Exceptions.ItemNotFound(class_name, "class name");
		}
		if (args == undefined || args == null){ args = []; } else { args = args.toArray(); }
		args = args.slice(); 
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	method: function(obj, method_name)
	{
		return new Runtime.Callback(obj, method_name);
	},
	/**
	 * Call function
	 * @return fn
	 */
	apply: function(f, args)
	{
		if (args == undefined) args = null;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (typeof ctx != "undefined") args.unshift();
		
		if (f instanceof Runtime.Callback)
		{
			return f.apply(args);
		}
		
		return f.apply(null, args);
	},
	/**
	 * Await promise
	 */
	resolvePromise: async function(value)
	{
		return await value;
	},
	/**
	 * Run async function
	 * @return fn
	 */
	runAsync: function(f, args)
	{
		if (args == undefined) args = null;
		(async () => {
			try
			{
				await Runtime.rtl.apply(f, args);
			}
			catch (e)
			{
				Runtime.io.print_error(e);
			}
		})()
	},
	/**
	 * Returns callback
	 * @return var
	 */
	attr: function(item, path, def_val)
	{
		if (def_val == undefined) def_val = null;
		if (path === null)
		{
			return def_val;
		}
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseObject = use("Runtime.BaseObject");
		var BaseStruct = use("Runtime.BaseStruct");
		var MapInterface = use("Runtime.MapInterface");
		
		if (def_val == undefined) def_val = null;
		if (item === null) return def_val;
		if (item === undefined) return def_val;
		if (Array.isArray(path) && path.count == undefined) path = Collection.from(path);
		if (this.isScalarValue(path)) path = Collection.from([path]);
		if (!(path instanceof Collection)) return def_val;
		if (path.count() == 0)
		{
			return item;
		}
		if (typeof item == "string") return item.charAt(path[0]);
		var key = path.first();
		var path = path.slice(1);
		var val = def_val;
		if (
			item instanceof Dict ||
			item instanceof Collection ||
			item instanceof BaseStruct ||
			this.is_implements(item, MapInterface)
		)
		{
			var new_item = item.get(key, def_val);
			val = this.attr(new_item, path, def_val);
			return val;
		}
		else
		{
			var new_item = item[key] || def_val;
			val = this.attr(new_item, path, def_val);
			return val;
		}
		return def_val;
	},
	/**
	 * Update current item
	 * @return var
	 */
	setAttr: function(item, attrs, new_value)
	{
		if (attrs == null)
		{
			return item;
		}
		var Vector = use("Runtime.Vector");
		if (typeof attrs == "string") attrs = Vector.from([attrs]);
		else if (Array.isArray(attrs) && attrs.count == undefined) attrs = Vector.from(attrs);
		var f = (attrs, data, new_value, f) =>
		{
			if (attrs.count() == 0)
			{
				return new_value;
			}
			if (data == null)
			{
				data = Runtime.Map.from({});
			}
			var new_data = null;
			var attr_name = attrs.first();
			attrs = attrs.slice(1);
			if (data instanceof Runtime.BaseStruct)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs, attr_data, new_value, f);
				var d = (new Runtime.Map()).set(attr_name, res);
				new_data = data.copy(d);
			}
			else if (data instanceof Runtime.BaseObject)
			{
				var attr_data = this.attr(data, attr_name, null);
				var res = f(attrs, attr_data, new_value, f);
				new_data = data;
				data[attr_name] = res;
			}
			else if (data instanceof Runtime.Map)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs, attr_data, new_value, f);
				data.set(attr_name, res);
				new_data = data;
			}
			else if (data instanceof Runtime.Dict)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs, attr_data, new_value, f);
				new_data = data.setIm(attr_name, res);
			}
			else if (data instanceof Runtime.Vector)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs, attr_data, new_value, f);
				data.set(attr_name, res);
				new_data = data;
			}
			else if (data instanceof Runtime.Collection)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs, attr_data, new_value, f);
				new_data = data.setIm(attr_name, res);
			}
			return new_data;
		};
		var new_item = f(attrs, item, new_value, f);
		return new_item;
	},
	/**
	 * Convert monad by type
	 */
	m_to: function(type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) =>
		{
			return new Runtime.Monad((m.err == null) ? (this.convert(m.val, type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad to default value
	 */
	m_def: function(def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) =>
		{
			return (m.err != null || m.val === null) ? (new Runtime.Monad(def_value)) : (m);
		};
	},
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	convert: function(v, t, d)
	{
		if (d == undefined) d = null;
		if (v === null)
		{
			return d;
		}
		if (t == "mixed" || t == "primitive" || t == "var" || t == "fn" || t == "callback")
		{
			return v;
		}
		if (t == "bool" || t == "boolean")
		{
			return this.toBool(v);
		}
		else if (t == "string")
		{
			return this.toString(v);
		}
		else if (t == "int")
		{
			return this.toInt(v);
		}
		else if (t == "float" || t == "double")
		{
			return this.toFloat(v);
		}
		else if (this.is_instanceof(v, t))
		{
			return v;
		}
		return null;
	},
	/**
	 * Returns value
	 * @param var value
	 * @param var def_val
	 * @param var obj
	 * @return var
	 */
	to: function(v, o)
	{
		var ctx = null;
		var e = "";
		e = o.e;
		return this.convert(v, e);
	},
	/**
	 * Return true if value is empty
	 * @param var value
	 * @return bool
	 */
	isEmpty: function(value)
	{
		return !this.exists(value) || value === null || value === "" || value === false || value === 0;
	},
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return bool
	 */
	exists: function(value)
	{
		return (value != null) && (value != undefined);
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool
	 */
	getType: function(value)
	{
		if (value == null)
		{
			return "null";
		}
		if (Runtime.rtl.isString(value))
		{
			return "string";
		}
		if (Runtime.rtl.isInt(value))
		{
			return "int";
		}
		if (Runtime.rtl.isDouble(value))
		{
			return "double";
		}
		if (Runtime.rtl.isBoolean(value))
		{
			return "boolean";
		}
		if (Runtime.rtl.isCallable(value))
		{
			return "fn";
		}
		if (value instanceof Runtime.Collection)
		{
			return "collection";
		}
		if (value instanceof Runtime.Dict)
		{
			return "dict";
		}
		if (value instanceof Runtime.BaseObject)
		{
			return "object";
		}
		if (typeof value == "object") return "object";
		return "unknown";
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	isScalarValue: function(value)
	{
		if (value == null)
		{
			return true;
		}
		if (Runtime.rtl.isString(value))
		{
			return true;
		}
		if (Runtime.rtl.isInt(value))
		{
			return true;
		}
		if (Runtime.rtl.isDouble(value))
		{
			return true;
		}
		if (Runtime.rtl.isBoolean(value))
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	isBoolean: function(value)
	{
		if (value === false || value === true)
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	isBool: function(value)
	{
		return this.isBoolean(value);
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isInt: function(value)
	{
		if (typeof value != "number") return false;
		if (value % 1 !== 0) return false;
		return true;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isDouble: function(value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	isString: function(value)
	{
		if (typeof value == 'string') return true;
		else if (value instanceof String) return true;
		return false;
	},
	/**
	 * Return true if value is function
	 * @param var value
	 * @return bool
	 */
	isCallable: function(value)
	{
		if (value instanceof Runtime.Callback)
		{
			if (value.exists(value))
			{
				return true;
			}
			return false;
		}
		if (typeof(value) == 'function') return true;
		return false;
	},
	/**
	 * Return true if value is Promise
	 * @param var value
	 * @return bool
	 */
	isPromise: function(value)
	{
		if (value instanceof Promise) return true;
		return false;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toString: function(value)
	{
		return this.toStr(value);
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toStr: function(value)
	{
		var _StringInterface = use("Runtime.StringInterface");
		
		if (value === null) return "";
		if (typeof value == 'string') return value;
		if (typeof value == 'number') return ""+value;
		if (value instanceof String) return ""+value;
		if (typeof value == 'object' && this.is_implements(value, _StringInterface))
			return value.toString();
		return ""+value;
	},
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	toInt: function(val)
	{
		var res = parseInt(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Convert value to boolean
	 * @param var value
	 * @return bool
	 */
	toBool: function(val)
	{
		var res = false;
		if (val == false || val == 'false') return false;
		if (val == true || val == 'true') return true;
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return false;
	},
	/**
	 * Convert value to float
	 * @param var value
	 * @return float
	 */
	toFloat: function(val)
	{
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/* ============================= Instrospection ============================= */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	getParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = new Runtime.Vector();
		while (class_name != "")
		{
			var getParentClassName = new Runtime.Callback(class_name, "getParentClassName");
			if (!getParentClassName.exists())
			{
				break;
			}
			class_name = this.apply(getParentClassName);
			if (class_name == "")
			{
				break;
			}
			res.push(class_name);
		}
		var __memorize_value = res.toCollection();
		Runtime.rtl._memorizeSave("Runtime.rtl.getParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields of class
	 */
	getFields: function(class_name, flag)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFields", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (flag == undefined) flag = 255;
		var names = new Runtime.Vector();
		var appendFields = (parent_class_name) =>
		{
			var getFieldsList = new Runtime.Callback(parent_class_name, "getFieldsList");
			if (!getFieldsList.exists())
			{
				return ;
			}
			var item_fields = this.apply(getFieldsList, Runtime.Vector.from([flag]));
			if (!item_fields)
			{
				return ;
			}
			names.appendItems(item_fields);
		};
		appendFields(class_name);
		var parents = this.getParents(class_name);
		for (var i = 0; i < parents.count(); i++)
		{
			var parent_class_name = Runtime.rtl.attr(parents, i);
			appendFields(parent_class_name);
		}
		var __memorize_value = names.removeDuplicates().toCollection();
		Runtime.rtl._memorizeSave("Runtime.rtl.getFields", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ====================== Assert ====================== */
	assert: function(expr, message)
	{
		if (!expr)
		{
			throw new Runtime.Exceptions.AssertException(message)
		}
	},
	_memorizeValidHKey: function(hkey, key)
	{
	},
	/**
	 * Clear memorize cache
	 */
	_memorizeClear: function()
	{
		this._memorize_cache = null;
	},
	/**
	 * Returns cached value
	 */
	_memorizeValue: function(name, args)
	{
		if (this._memorize_cache == null) return this._memorize_not_found;
		if (this._memorize_cache[name] == undefined) return this._memorize_not_found;
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else return this._memorize_not_found;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
			else hkey = key;
			if (i == sz - 1)
			{
				if (arr[hkey] == undefined) return this._memorize_not_found;
				return arr[hkey];
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
		
		return this._memorize_not_found;
	},
	/**
	 * Returns cached value
	 */
	_memorizeSave: function(name, args, value)
	{
		if (this._memorize_cache == null) this._memorize_cache = {};
		if (this._memorize_cache[name] == undefined) this._memorize_cache[name] = {};
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else hkey = null;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
			else hkey = key;
			if (i == sz - 1)
			{
				arr[hkey] = value;
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
	},
	/* ================ Dirty functions ================ */
	/**
	 * Trace
	 */
	getTrace: function()
	{
		var res = Runtime.Vector.from([]);
		return res;
	},
	/**
	 * Print trace
	 */
	printTrace: function(ch)
	{
		if (ch == undefined) ch = "\n";
		var s = Runtime.rs.join(ch, Runtime.rtl.getTrace());
		console.log(s);
	},
	/**
	 * Sleep in ms
	 */
	sleep: async function(time)
	{
		await new Promise((f, e) => setTimeout(f, time));
	},
	/**
	 * Returns unique value
	 * @param bool flag If true returns as text. Default true
	 * @return string
	 */
	unique: function(flag)
	{
		if (flag == undefined) flag = true;
		if (flag == undefined) flag = true;
		if (flag)
			return "" + (new Date).getTime() + Math.floor((Math.random() * 899999 + 100000));
		return Symbol();
	},
	/**
	 * Returns current unix time in seconds
	 * @return int
	 */
	time: function()
	{
		return Math.round((new Date()).getTime() / 1000);
	},
	/**
	 * Returns unix timestamp in microseconds
	 */
	utime: function()
	{
		return (new Date()).getTime() * 1000;
	},
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	json_encode: function(value, flags)
	{
		if (flags == undefined) flags = 0;
		var serializer = new Runtime.SerializerJson();
		serializer.flags = flags;
		return serializer.encode(value);
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var 
	 */
	json_decode: function(obj, flags)
	{
		if (flags == undefined) flags = 0;
		var serializer = new Runtime.SerializerJson();
		serializer.flags = flags;
		return serializer.decode(obj);
	},
	/**
	 * Returns global context
	 * @return Context
	 */
	getContext: function()
	{
		if (!Runtime.rtl._global_context) return null;
		return Runtime.rtl._global_context;
	},
	/**
	 * Set global context
	 * @param Context context
	 */
	setContext: function(context)
	{
		use("Runtime.rtl")._global_context = context;
		window['global_context'] = context;
	},
	/**
	 * Create context
	 */
	createContext: async function(params)
	{
		/* Create contenxt */
		var context = Runtime.Context.create(params);
		/* Setup global context */
		this.setContext(context);
		/* Init context */
		await context.init();
		return Promise.resolve(context);
	},
	/**
	 * Run application
	 * @param Dict d
	 */
	runApp: async function(class_name, modules, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = Runtime.Map.from({});
		}
		params.set("entry_point", class_name);
		params.set("modules", modules);
		try
		{
			let context = await Runtime.rtl.createContext(params);
			await context.start(context);
			await context.run(context);
		}
		catch (e)
		{
			console.log("\x1B[0;31m" + e.stack + "\x1B[0m\n");
		}
		return Promise.resolve(0);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.rtl";
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
Runtime.rtl.defClass(Runtime.rtl);
window["Runtime.rtl"] = Runtime.rtl;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.rtl;
var use = function(s){return Runtime.rtl.find_class(s);}
if (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')
{
	Runtime.rtl._classes = {};
	Runtime.rtl._modules = {};
	Runtime.rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};
}
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
Runtime.io = function()
{
};
Object.assign(Runtime.io.prototype,
{
});
Object.assign(Runtime.io,
{
	/**
	 * Print message to output
	 */
	print: function(message, new_line, type)
	{
		if (new_line == undefined) new_line = true;
		if (type == undefined) type = "";
		var output = Runtime.rtl.getContext().provider("output");
		output.print(message, new_line, type);
	},
	/**
	 * Print error message to output
	 */
	print_error: function(message)
	{
		var output = Runtime.rtl.getContext().provider("output");
		output.print_error(message);
	},
	/**
	 * Color message to output
	 */
	color: function(color, message)
	{
		var output = Runtime.rtl.getContext().provider("output");
		return output.color(color, message);
	},
	/**
	 * Log message
	 */
	log: function(type, message)
	{
		var p = Runtime.rtl.getContext().provider("log");
		p.log(type, message);
	},
	/**
	 * Read line from input
	 */
	input: function()
	{
		var input = Runtime.rtl.getContext().provider("input");
		return input.input();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.io";
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
Runtime.rtl.defClass(Runtime.io);
window["Runtime.io"] = Runtime.io;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.io;
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
Runtime.re = function()
{
};
Object.assign(Runtime.re.prototype,
{
});
Object.assign(Runtime.re,
{
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение
	 * @return Vector<string>
	 */
	split: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Vector = use("Runtime.Vector");
		
		var arr = null;
		var delimiter = new RegExp(delimiter, "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Vector.from(arr);
	},
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return bool
	 */
	match: function(r, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		return s.match( new RegExp(r, pattern) ) != null;
	},
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return Vector result
	 */
	matchAll: function(r, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		
		var arr = [];
		var r = new RegExp(r, pattern);
		
		if (s.matchAll == undefined)
		{
			while ((m = r.exec(s)) !== null)
			{
				arr.push(m);
			}
		}
		else arr = [...s.matchAll(r)];
		
		if (arr.length == 0) return null;
		return Runtime.Vector.from( arr.map( (v) => Runtime.Vector.from(v) ) );
		return null;
	},
	/**
	 * Replace with regular expression
	 * @param string r - regular expression
	 * @param string replace - new value
	 * @param string s - replaceable string
	 * @return string
	 */
	replace: function(r, replace, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		return s.replace(new RegExp(r, pattern), replace);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.re";
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
Runtime.rtl.defClass(Runtime.re);
window["Runtime.re"] = Runtime.re;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.re;
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
Runtime.rs = function()
{
};
Object.assign(Runtime.rs.prototype,
{
});
Object.assign(Runtime.rs,
{
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	strlen: function(s)
	{
		return use("Runtime.rtl").toStr(s).length;
	},
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	substr: function(s, start, length)
	{
		if (length == undefined) length = null;
		var _rtl = use("Runtime.rtl");
		var _rs = use("Runtime.rs");
		if (start < 0) start = s.length + start;
		if (length === null){
			return _rtl.toStr(s).substring(start);
		}
		var end = start + length;
		if (length < 0){
			var sz = _rs.strlen(s);
			end = sz + length;
		}
		return _rtl.toStr(s).substring(start, end);
	},
	/**
	 * Returns char from string at the position
	 * @param string s The string
	 * @param int pos The position
	 * @return string
	 */
	charAt: function(s, pos)
	{
		return this.substr(s, pos, 1);
	},
	/**
	 * Returns ASCII symbol by code
	 * @param int code
	 */
	chr: function(code)
	{
		return String.fromCharCode(code);
	},
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	ord: function(ch)
	{
		return use("Runtime.rtl").toStr(ch).charCodeAt(0);
	},
	/**
	 * Convert string to lower case
	 * @param string s
	 * @return string
	 */
	lower: function(s)
	{
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	upper: function(s)
	{
		return use("Runtime.rtl").toStr(s).toUpperCase();
	},
	/**
	 * Compare strings
	 */
	compare: function(a, b)
	{
		if (a == b) return 0;
		if (a < b) return -1;
		if (a > b) return 1;
	},
	/**
	 * Заменяет одну строку на другую
	 */
	replace: function(search, item, s)
	{
		return s.replaceAll(search, item);
	},
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	str_repeat: function(s, n)
	{
		if (n <= 0) return "";
		var res = '';
		for (var i=0; i < n; i++){
			res += s;
		}
		return res;
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение
	 * @return Collection<string>
	 */
	split: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Vector = use("Runtime.Vector");
		
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return _Vector.from(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Collection<string>
	 */
	splitArr: function(delimiters, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp("[" + delimiters.join("") + "]", "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.from(arr);
	},
	/**
	 * Соединяет строки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	join: function(ch, arr)
	{
		if (arr == null) return "";
		return Array.prototype.join.call(arr, ch);
	},
	/**
	 * Join
	 */
	join_path: function(arr)
	{
		var path = this.join("/", arr);
		path = Runtime.re.replace("\\/+", "/", path);
		path = Runtime.re.replace("\\/\\.\\/", "/", path);
		path = Runtime.re.replace("\\/+$", "", path);
		return path;
	},
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	trim: function(s, ch)
	{
		if (ch == undefined) ch = "";
		if (ch == undefined) ch = "";
		
		s = use("Runtime.rtl").toStr(s);
		
		if (ch == ""){
			return s.trim();
		}
		return s.replace(new RegExp("^[" + ch + "]+", "g"),"")
			.replace(new RegExp("[" + ch + "]+$", "g"),"")
		;
	},
	/**
	 * Remove first slash
	 */
	removeFirstSlash: function(path)
	{
		var i = 0;
		var sz = this.strlen(path);
		while (i < sz && this.substr(path, i, 1) == "/")
		{
			i++;
		}
		return this.substr(path, i);
	},
	/**
	 * Remove last slash
	 */
	removeLastSlash: function(path)
	{
		var i = this.strlen(path) - 1;
		while (i >= 0 && this.substr(path, i, 1) == "/")
		{
			i--;
		}
		return this.substr(path, 0, i + 1);
	},
	/**
	 * Add first slash
	 */
	addFirstSlash: function(path)
	{
		if (Runtime.rs.substr(path, 0, 1) == "/")
		{
			return path;
		}
		return "/" + Runtime.rtl.toStr(path);
	},
	/**
	 * Add last slash
	 */
	addLastSlash: function(path)
	{
		if (Runtime.rs.substr(path, Runtime.rs.strlen(path) - 1, 1) == "/")
		{
			return path;
		}
		return path + Runtime.rtl.toStr("/");
	},
	/**
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
	pathinfo: function(filepath)
	{
		var arr1 = this.split(".", filepath).toVector();
		var arr2 = this.split("/", filepath).toVector();
		var filepath = filepath;
		var extension = arr1.pop();
		var basename = arr2.pop();
		var dirname = this.join("/", arr2);
		var ext_length = this.strlen(extension);
		if (ext_length > 0)
		{
			ext_length++;
		}
		var filename = this.substr(basename, 0, -1 * ext_length);
		return Runtime.Map.from({"filepath":filepath,"extension":extension,"basename":basename,"dirname":dirname,"filename":filename});
	},
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	filename: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.attr(ret, "basename");
		var ext = Runtime.rtl.attr(ret, "extension");
		if (ext != "")
		{
			var sz = 0 - Runtime.rs.strlen(ext) - 1;
			res = Runtime.rs.substr(res, 0, sz);
		}
		return res;
	},
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	basename: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.attr(ret, "basename");
		return res;
	},
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	extname: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.attr(ret, "extension");
		return res;
	},
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	dirname: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.attr(ret, "dirname");
		return res;
	},
	/**
	 * New line to br
	 */
	nl2br: function(s)
	{
		return this.replace("\n", "<br/>", s);
	},
	/**
	 * Remove spaces
	 */
	spaceless: function(s)
	{
		s = Runtime.re.replace(" +", " ", s);
		s = Runtime.re.replace("\t", "", s);
		s = Runtime.re.replace("\n", "", s);
		return s;
	},
	/**
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	indexOf: function(s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	/**
	 * URL encode
	 * @param string s
	 * @return string
	 */
	url_encode: function(s)
	{
		return encodeURIComponent(s);
	},
	/**
	 * Escape HTML special chars
	 * @param string s
	 * @return string
	 */
	htmlEscape: function(s)
	{
		if (s == null)
		{
			return "";
		}
		var obj = {
			"<":"&lt;",
			">": "&gt;", 
			"&": "&amp;",
			'"': '&quot;',
			"'": '&#39;',
			'`': '&#x60;',
			'=': '&#x3D;'
		};
		return (new String(s)).replace(/[<>&"'`=]/g, function(v){ return obj[v]; });
	},
	escapeHtml: function(s)
	{
		return this.htmlEscape(s);
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode: function(s)
	{
		return window.btoa(window.unescape(window.encodeURIComponent(s)));
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode: function(s)
	{
		return window.decodeURIComponent(window.escape(window.atob(s)));
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode_url: function(s)
	{
		s = this.base64_encode(s)
			.replace(new RegExp('\\+', 'g'), '-')
			.replace(new RegExp('\\/', 'g'), '_')
			.replace(new RegExp('=', 'g'), '')
		;
		return s;
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode_url: function(s)
	{
		var c = 4 - s.length % 4;
		if (c < 4 && c > 0) s = s + '='.repeat(c);
		s = s.replace(new RegExp('-', 'g'), '+')
			.replace(new RegExp('_', 'g'), '/')
		;
		return this.base64_decode(s);
	},
	/**
	 * Parser url
	 * @param string s The string
	 * @return int
	 */
	parse_url: function(s)
	{
		var pos;
		var uri;
		var query;
		var hash;
		pos = this.indexOf(s, "#");
		s = (pos >= 0) ? (this.substr(s, 0, pos)) : (s);
		hash = (pos >= 0) ? (this.substr(s, pos + 1)) : ("");
		pos = this.indexOf(s, "?");
		uri = (pos >= 0) ? (this.substr(s, 0, pos)) : (s);
		query = (pos >= 0) ? (this.substr(s, pos + 1)) : ("");
		var arr = this.split("&", query);
		var arr2 = arr.filter((s) =>
		{
			return s != "";
		}).transition((item) =>
		{
			var arr = this.split("=", item);
			return Runtime.Vector.from([Runtime.rtl.attr(arr, 1),Runtime.rtl.attr(arr, 0)]);
		});
		return Runtime.Map.from({"uri":uri,"query":query,"query_arr":arr2,"hash":hash});
	},
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	url_get_add: function(s, key, value)
	{
		var r = this.parse_url(s);
		var s1 = Runtime.rtl.attr(r, "uri");
		var s2 = Runtime.rtl.attr(r, "query");
		var find = false;
		var arr = this.split("&", s2);
		arr = arr.map((s) =>
		{
			var arr = this.split("=", s);
			if (Runtime.rtl.attr(arr, 0) == key)
			{
				find = true;
				if (value != "")
				{
					return key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(value));
				}
				return "";
			}
			return s;
		}).filter((s) =>
		{
			return s != "";
		});
		if (!find && value != "")
		{
			arr.push(key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(value)));
		}
		s = s1;
		s2 = this.join("&", arr);
		if (s2 != "")
		{
			s = s + Runtime.rtl.toStr("?") + Runtime.rtl.toStr(s2);
		}
		return s;
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
					var tag_name = this.lower(Runtime.rtl.attr(Runtime.rtl.attr(tag_match, 0), 2));
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
	/**
	 * Generate uuid
	 */
	uid: function()
	{
	},
	/**
	 * Generate timestamp based uuid
	 */
	time_uid: function()
	{
	},
	/**
	 * Hash function
	 * @param string
	 * @return int hash
	 */
	hash: function(s, last, x, p)
	{
		if (last == undefined) last = true;
		if (x == undefined) x = 257;
		if (p == undefined) p = 1000000007;
		var h = 0;
		var sz = Runtime.rs.strlen(s);
		for (var i = 0; i < sz; i++)
		{
			var ch = Runtime.rs.ord(Runtime.rs.substr(s, i, 1));
			h = (h * x + ch) % p;
		}
		if (last)
		{
			h = h * x % p;
		}
		return h;
	},
	/**
	 * Convert int to hex
	 * @param int
	 * @return string
	 */
	toHex: function(h)
	{
		var r = "";
		var a = "0123456789abcdef";
		while (h >= 0)
		{
			var c = h & 15;
			h = h >> 4;
			r = Runtime.rs.substr(a, c, 1) + Runtime.rtl.toStr(r);
			if (h == 0)
			{
				break;
			}
		}
		return r;
	},
	/**
	 * Hex decode
	 */
	hexdec: function(s)
	{
		return parseInt(s, 16);
	},
	/**
	 * Generate random string
	 * @var len - string length
	 * @var spec
	 *   - a - alpha
	 *   - n - numberic
	 * @return string
	 */
	random_string: function(len, spec)
	{
		if (len == undefined) len = 8;
		if (spec == undefined) spec = "aun";
		var s = "";
		var res = "";
		var sz = Runtime.rs.strlen(spec);
		for (var i = 0; i < sz; i++)
		{
			var ch = Runtime.rtl.attr(spec, i);
			if (ch == "a")
			{
				s += Runtime.rtl.toStr("qwertyuiopasdfghjklzxcvbnm");
			}
			if (ch == "u")
			{
				s += Runtime.rtl.toStr("QWERTYUIOPASDFGHJKLZXCVBNM");
			}
			else if (ch == "n")
			{
				s += Runtime.rtl.toStr("0123456789");
			}
			else if (ch == "s")
			{
				s += Runtime.rtl.toStr("!@#$%^&*()-_+='\":;'.,<>?/|~");
			}
		}
		var sz_s = Runtime.rs.strlen(s);
		for (var i = 0; i < len; i++)
		{
			var code = Runtime.Math.random(0, sz_s - 1);
			res += Runtime.rtl.toStr(Runtime.rtl.attr(s, code));
		}
		return res;
	},
	/**
	 * Format string
	 */
	format: function(s, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return s;
		}
		params.each((value, key) =>
		{
			s = Runtime.rs.replace("%" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("%"), value, s);
		});
		return s;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.rs";
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
Runtime.rtl.defClass(Runtime.rs);
window["Runtime.rs"] = Runtime.rs;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.rs;
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime._Collection = function()
{
	Array.call(this);
	if (arguments.length > 0)
	{
		for (var i=0; i<arguments.length; i++)
		{
			Array.prototype.push.call(this, arguments[i]);
		}
	}
	this.__uq__ = Symbol();
}
Runtime._Collection.prototype = Object.create(Array.prototype);
Runtime._Collection.prototype.constructor = Runtime._Collection;
Object.assign(Runtime._Collection.prototype,
{
	toArray: function()
	{
		return Array.prototype.slice.call(this);
	},
	toStr: function(value)
	{
		return use("Runtime.rtl").toStr(value);
	}
});
Object.assign(Runtime._Collection,
{
	from: function(arr)
	{
		var res = this.Instance();
		if (arr == undefined && arr == null) return this.Instance();
		
		if (Array.isArray(arr))
		{
			var new_arr = arr.slice();
			Object.setPrototypeOf(new_arr, this.prototype);
			return new_arr;
		}
		
		var res = this.Instance();
		if (
			arr instanceof Int8Array ||
			arr instanceof Uint8Array ||
			arr instanceof Int16Array ||
			arr instanceof Uint16Array ||
			arr instanceof Int32Array ||
			arr instanceof Uint32Array ||
			arr instanceof Float32Array ||
			arr instanceof Float64Array
		)
		{
			for (var i=0; i<arr.length; i++)
			{
				Array.prototype.push.call(res, arr[i]);
			}
		}
		
		return res;	
	},
	getNamespace: function(){ return "Runtime"; },
	getClassName: function(){ return "Runtime._Collection"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Collection = function()
{
	Runtime._Collection.apply(this, arguments);
};
Runtime.Collection.prototype = Object.create(Runtime._Collection.prototype);
Runtime.Collection.prototype.constructor = Runtime.Collection;
Object.assign(Runtime.Collection.prototype,
{
	/**
	 * Returns copy of Collection
	 * @param int pos - position
	 */
	cp: function()
	{
		var arr = Array.prototype.slice.call(this);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	copy: function()
	{
		return this.cp();
	},
	/**
	 * Convert to collection
	 */
	toCollection: function()
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, Runtime.Collection.prototype);
		return obj;
	},
	/**
	 * Convert to vector
	 */
	toVector: function()
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, use("Runtime.Vector").prototype);
		return obj;
	},
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get: function(pos, default_value)
	{
		if (default_value == undefined) default_value = null;
		if (pos < 0 || pos >= this.length) return default_value;
		var val = this[pos];
		return val;
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item: function(pos)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(pos);
		}
		return this[pos];
	},
	/**
	 * Returns count items in vector
	 */
	count: function()
	{
		return this.length;
	},
	/**
	 * Find value in array. Returns -1 if value not found.
	 * @param T value
	 * @return  int
	 */
	indexOf: function(value)
	{
		for (var i=0; i<this.count(); i++)
		{
			if (this[i] == value)
				return i;
		}
		return -1;
	},
	/**
	 * Find value in array, and returns position. Returns -1 if value not found.
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return  int
	 */
	indexOfRange: function(value, pos_begin, pos_end)
	{
		var pos = Array.prototype.indexOf.call(this, value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	},
	/**
	 * Get first item
	 */
	first: function(default_value)
	{
		if (default_value == undefined) default_value = null;
		if (this.length == 0) return default_value;
		return this[0];
	},
	/**
	 * Get last item
	 */
	last: function(default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		if (pos == undefined) pos = -1;
		if (this.length == 0) return default_value;
		if (this.length + pos + 1 == 0) return default_value;
		return this[this.length + pos];
	},
	/**
	 * Append value to the end of the Collection and return new Collection
	 * @param T value
	 */
	pushIm: function(value)
	{
		var arr = this.cp();
		Array.prototype.push.call(arr, value);
		return arr;
	},
	push: function(value)
	{
		throw new Runtime.Exceptions.RuntimeException("Deprecated Collection push")
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insertIm: function(pos, value)
	{
		var arr = this.cp();
		arr.splice(pos, 0, value);
		return arr;
	},
	insert: function(pos, value)
	{
		throw new Runtime.Exceptions.RuntimeException("Deprecated Collection insert")
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setIm: function(pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(pos);
		}
		var arr = this.cp();
		arr[pos] = value;
		return arr;
	},
	set: function(pos, value)
	{
		throw new Runtime.Exceptions.RuntimeException("Deprecated Collection set")
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	concat: function(arr)
	{
		if (arr == null)
		{
			return this;
		}
		if (!Runtime.rtl.is_instanceof(arr, "Runtime.Collection"))
		{
			arr = Runtime.Vector.from([arr]);
		}
		if (arr.length == 0) return this;
		var res = this.cp();
		for (var i=0; i<arr.length; i++)
		{
			Array.prototype.push.call(res, arr[i]);
		}
		return res;
	},
	/**
	 * Map
	 * @param fn f
	 * @return Collection
	 */
	map: function(f)
	{
		var arr = this.cp();
		var Callback = use("Runtime.Callback");
		for (var i=0; i<arr.length; i++)
		{
			arr[i] = Runtime.rtl.apply(f, [arr[i], i]);
		}
		return arr;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(f)
	{
		var res = this.constructor.Instance();
		var Callback = use("Runtime.Callback");
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			var flag = Runtime.rtl.apply(f, [item, i]);
			if (flag)
			{
				Array.prototype.push.call(res, item);
			}
		}
		return res;
	},
	/**
	 * Transition Collection to Dict
	 * @param fn f
	 * @return Dict
	 */
	transition: function(f)
	{
		var Dict = use("Runtime.Dict");
		var d = new Dict();
		for (var i=0; i<this.length; i++)
		{
			var value = this[i];
			var p = Runtime.rtl.apply(f, [value, i]);
			d[p[1]] = p[0];
		}
		return d;
	},
	/**
	 * Flatten Collection
	 */
	flatten: function()
	{
		var res = Runtime.Vector.from([]);
		for (var i = 0; i < this.count(); i++)
		{
			res.appendItems(this.get(i));
		}
		return res;
	},
	/**
	 * Reduce
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(f, init_value)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			init_value = Runtime.rtl.apply(f, [init_value, item, i]);
		}
		return init_value;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(f)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			Runtime.rtl.apply(f, [item, i]);
		}
	},
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	slice: function(offset, length)
	{
		if (offset == undefined) offset = 0;
		if (length == undefined) length = null;
		if (offset <= 0) offset = 0;
		if (length == undefined)
		{
			if (offset <= 0) return this.cp();
			var arr = Array.prototype.slice.call(this, offset);
			Object.setPrototypeOf(arr, this.constructor.prototype);
			return arr;
		}
		if (offset <= 0 && length == this.length) return this.cp();
		if (length >= 0)
		{
			length = offset + length;
		}
		var arr = Array.prototype.slice.call(this, offset, length);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Reverse array
	 */
	reverse: function()
	{
		var arr = this.cp();
		Array.prototype.reverse.call(arr);
		return arr;
	},
	/**
	 * Sort vector
	 * @param fn f - Sort user function
	 */
	sort: function(f)
	{
		if (f == undefined) f = null;
		var arr = this.cp();
		if (f == undefined) Array.prototype.sort.call(arr);
		else
		{
			var f1 = (a, b) => { return Runtime.rtl.apply(f, [a, b]); };
			Array.prototype.sort.call(arr, f1);
		}
		return arr;
	},
	/**
	 * Remove dublicate values
	 */
	removeDuplicates: function()
	{
		var res = this.constructor.Instance();
		for (var i=0; i<this.length; i++)
		{
			var p = res.indexOf(this[i]);
			if (p == -1)
			{
				Array.prototype.push.call(res, this[i]);
			}
		}
		return res;
	},
	/**
	 * Find item pos
	 * @param fn f - Find function
	 * @return int - position
	 */
	find: function(f)
	{
		for (var i=0; i<this.length; i++)
		{
			var flag = f(this[i]);
			if (flag) return i;
		}
		return -1;
	},
	/**
	 * Find item
	 * @param var item - Find function
	 * @param fn f - Find function
	 * @param T def_value - Find function
	 * @return item
	 */
	findItem: function(f, def_value)
	{
		if (def_value == undefined) def_value = null;
		var pos = this.find(f);
		return this.get(pos, def_value);
	},
	/**
	 * Join collection to string
	 */
	join: function(ch)
	{
		return Runtime.rs.join(ch, this);
	},
});
Object.assign(Runtime.Collection, Runtime._Collection);
Object.assign(Runtime.Collection,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function()
	{
		return new Runtime.Collection();
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(arr)
	{
		return this.from(arr);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Collection";
	},
	getParentClassName: function()
	{
		return "Runtime._Collection";
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
Runtime.rtl.defClass(Runtime.Collection);
window["Runtime.Collection"] = Runtime.Collection;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Collection;
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
if (typeof Runtime == 'undefined') Runtime = {};

Runtime._Map = function(map)
{
	this._map = {};
	if (map != undefined && typeof map == 'object')
	{
		if (map instanceof Runtime.Dict)
		{
			for (var i in map._map)
			{
				this._map[i] = map._map[i];
			}
		}
		else if (typeof map == "object" && !(map instanceof Runtime._Collection))
		{
			for (var i in map)
			{
				this._map["|" + i] = map[i];
			}
		}
	}
	this.__uq__ = Symbol();
	return this;
}
/*Runtime._Map.prototype = Object.create(Map.prototype);
Runtime._Map.prototype.constructor = Runtime._Map;*/
Object.assign(Runtime._Map.prototype,
{
	toStr: function(value)
	{ 
		return use("Runtime.rtl").toStr(value);
	},
	toObject: function()
	{
		var obj = {};
		for (var key in this._map)
		{
			obj[key.substring(1)] = this._map[key];
		}
		return obj;
	},
});
Object.assign(Runtime._Map,
{
	from: function(map)
	{
		var res = this.Instance(map);
		return res;
	},
	getNamespace: function(){ return "Runtime"; },
	getClassName: function(){ return "Runtime._Map"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Dict = function()
{
	Runtime._Map.apply(this, arguments);
};
Runtime.Dict.prototype = Object.create(Runtime._Map.prototype);
Runtime.Dict.prototype.constructor = Runtime.Dict;
Object.assign(Runtime.Dict.prototype,
{
	/**
	 * Copy instance
	 */
	cp: function()
	{
		var new_obj = this.constructor.Instance();
		new_obj._map = Object.assign({}, this._map);
		return new_obj;
	},
	copy: function(obj)
	{
		if (obj == undefined) obj = null;
		return (obj == null) ? (this.cp()) : (this.clone(obj));
	},
	/**
	 * Clone Dict
	 * @param int pos - position
	 */
	clone: function(obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			if (this instanceof Runtime.Map)
			{
				return this.cp();
			}
			return this;
		}
		var new_obj = this.constructor.Instance();
		new_obj._map = Object.assign({}, this._map);
		if (obj != null)
		{
			var _Dict = use("Runtime.Dict");
			if (obj instanceof _Dict) 
			{
				obj = obj._map;
				for (var key in obj)
				{
					new_obj._map[key] = obj[key];
				}
			}
			else
			{
				for (var key in obj)
				{
					new_obj._map["|" + key] = obj[key];
				}
			}
		}
		return new_obj;
	},
	/**
	 * Convert to dict
	 */
	toDict: function()
	{
		var Dict = use ("Runtime.Dict");
		return new Dict(this);
	},
	/**
	 * Convert to dict
	 */
	toMap: function()
	{
		var Map = use ("Runtime.Map");
		return new Map(this);
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	contains: function(key)
	{
		key = this.toStr(key);
		return typeof this._map["|" + key] != "undefined";
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	has: function(key)
	{
		return this.contains(key);
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	get: function(key, default_value)
	{
		if (default_value == undefined) default_value = null;
		key = this.toStr(key);
		var val = this._map["|" + key];
		if (typeof val == "undefined") return default_value;
		return val;
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param string key - position
	 * @return T
	 */
	item: function(key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] == "undefined")
		{
			var _KeyNotFound = use("Runtime.Exceptions.KeyNotFound");
			throw new _KeyNotFound(key);
		}
		var val = this._map["|" + key];
		if (val === null || typeof val == "undefined") return null;
		return val;
	},
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	setIm: function(key, value)
	{
		var res = this.cp();
		key = this.toStr(key);
		res._map["|" + key] = value;
		return res;
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeIm: function(key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			var res = this.cp();
			delete res._map["|" + key];
			return res;
		}
		return this;
	},
	/**
	 * Returns vector of the keys
	 * @return Collection<string>
	 */
	keys: function()
	{
		var res = new Runtime.Vector();
		for (var key in this._map) res.push(key.substring(1));
		return res;
	},
	/**
	 * Returns vector of the values
	 * @return Collection<T>
	 */
	values: function()
	{
		var res = new Runtime.Vector();
		for (var key in this._map) res.push(this._map[key]);
		return res;
	},
	/**
	 * Call function map
	 * @param fn f
	 * @return Dict
	 */
	map: function(f)
	{
		var obj = this.constructor.Instance();
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var new_val = Runtime.rtl.apply(f, [this._map[key], new_key]);
			obj._map[key] = new_val;
		}
		return obj;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(f)
	{
		var obj = this.constructor.Instance();
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			var flag = Runtime.rtl.apply(f, [value, new_key]);
			if (flag) obj._map[key] = value;
		}
		return obj;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(f)
	{
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			f(value, new_key);
		}
	},
	/**
	 * Transition Dict to Vector
	 * @param fn f
	 * @return Vector
	 */
	transition: function(f)
	{
		var Vector = use("Runtime.Vector");
		var arr = new Vector();
		for (var key in this._map)
		{
			var new_value = f(this._map[key], key.substring(1));
			Array.prototype.push.call(arr, new_value);
		}
		return arr;
	},
	/**
	 * 	
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(f, init_value)
	{
		for (var key in this._map)
		{
			init_value = Runtime.rtl.apply(f, [init_value, this._map[key], key.substring(1)]);
		}
		return init_value;
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(fields, skip_empty)
	{
		if (fields == undefined) fields = null;
		if (skip_empty == undefined) skip_empty = true;
		if (fields == null)
		{
			return Runtime.Map.from({});
		}
		var obj = new Runtime.Map();
		fields.each((field_name) =>
		{
			if (!this.has(field_name) && skip_empty)
			{
				return ;
			}
			obj.set(field_name, this.get(field_name, null));
		});
		if (this instanceof Runtime.Map)
		{
			return obj;
		}
		return obj.toDict();
	},
	/**
	 * Add values from other map
	 * @param Dict<T> map
	 * @return self
	 */
	concat: function(map)
	{
		if (map == undefined) map = null;
		if (map == null)
		{
			return this;
		}
		var _map = {};
		var f = false;
		var Dict = use("Runtime.Dict");
		if (map == null) return this.cp();
		if (map instanceof Dict) _map = map._map;
		else if (typeof map == "object") { _map = map; f = true; }
		var res = this.cp();
		for (var key in _map)
		{
			res._map[(f ? "|" : "") + key] = _map[key];
		}
		return res;
	},
	/**
	 * Check equal
	 */
	equal: function(item)
	{
		if (item == null)
		{
			return false;
		}
		var keys = (new Runtime.Collection()).concat(this.keys()).concat(item.keys()).removeDuplicatesIm();
		for (var i = 0; i < keys.count(); i++)
		{
			var key = Runtime.rtl.attr(keys, i);
			if (!this.has(key))
			{
				return false;
			}
			if (!item.has(key))
			{
				return false;
			}
			if (this.get(key) != item.get(key))
			{
				return false;
			}
		}
		return true;
	},
});
Object.assign(Runtime.Dict, Runtime._Map);
Object.assign(Runtime.Dict,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(val)
	{
		if (val == undefined) val = null;
		return new Runtime.Dict(val);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Dict";
	},
	getParentClassName: function()
	{
		return "Runtime._Map";
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
Runtime.rtl.defClass(Runtime.Dict);
window["Runtime.Dict"] = Runtime.Dict;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Dict;
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
Runtime.HashMap = function()
{
	this._map = new Map();
};
Object.assign(Runtime.HashMap.prototype,
{
	/**
	 * Set value size_to position
	 * @param Key key - position
	 * @param Value value 
	 * @return self
	 */
	set: function(key, value)
	{
		this._map.set(key, value);
		return this;
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @return Value
	 */
	get: function(key)
	{
		return this._map.get(key);
		return this;
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	has: function(key)
	{
		return this._map.has(key);
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	remove: function(key)
	{
		this._map.delete(key);
		return this;
	},
	_init: function()
	{
		this._map = null;
	},
});
Object.assign(Runtime.HashMap,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.HashMap";
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
Runtime.rtl.defClass(Runtime.HashMap);
window["Runtime.HashMap"] = Runtime.HashMap;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.HashMap;
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
Runtime.Map = function()
{
	Runtime.Dict.apply(this, arguments);
};
Runtime.Map.prototype = Object.create(Runtime.Dict.prototype);
Runtime.Map.prototype.constructor = Runtime.Map;
Object.assign(Runtime.Map.prototype,
{
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	set: function(key, value)
	{
		key = this.toStr(key);
		this._map["|" + key] = value;
		return this;
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	remove: function(key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			delete this._map["|" + key];
		}
		return this;
	},
	/**
	 * Clear all values from vector
	 * @return self
	 */
	clear: function()
	{
		this._map = {};
		return this;
	},
});
Object.assign(Runtime.Map, Runtime.Dict);
Object.assign(Runtime.Map,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(val)
	{
		if (val == undefined) val = null;
		return new Runtime.Map(val);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Map";
	},
	getParentClassName: function()
	{
		return "Runtime.Dict";
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
Runtime.rtl.defClass(Runtime.Map);
window["Runtime.Map"] = Runtime.Map;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Map;
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
Runtime.MapInterface = function()
{
};
Object.assign(Runtime.MapInterface.prototype,
{
	/**
	 * Returns string
	 */
	get: function(name, def_value)
	{
		if (def_value == undefined) def_value = null;
	},
	/**
	 * Set new value
	 */
	set: function(name, value)
	{
	},
});
Object.assign(Runtime.MapInterface,
{
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.MapInterface";
	},
});
Runtime.rtl.defClass(Runtime.MapInterface);
window["Runtime.MapInterface"] = Runtime.MapInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.MapInterface;
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
Runtime.Monad = function(value, err)
{
	if (err == undefined) err = null;
	this.val = value;
	this.err = err;
};
Object.assign(Runtime.Monad.prototype,
{
	/**
	 * Return attr of object
	 */
	attr: function(attr_name)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		return new Runtime.Monad(Runtime.rtl.attr(this.val, attr_name, null));
	},
	/**
	 * Call function on value
	 */
	call: function(f, is_return_value)
	{
		if (is_return_value == undefined) is_return_value = true;
		if (this.val === null || this.err != null)
		{
			return this;
		}
		try
		{
			var value = Runtime.rtl.apply(f, Runtime.Vector.from([this.val]));
			if (is_return_value)
			{
				this.val = value;
			}
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
				
				this.res = null;
				this.err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return this;
	},
	/**
	 * Call async function on value
	 */
	callAsync: async function(f, is_return_value)
	{
		if (is_return_value == undefined) is_return_value = true;
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		try
		{
			var value = Runtime.rtl.apply(f, Runtime.Vector.from([this.val]));
			if (Runtime.rtl.isPromise(value))
			{
				await Runtime.rtl.resolvePromise(value);
			}
			if (is_return_value)
			{
				this.val = value;
			}
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
				
				this.val = null;
				this.err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(this);
	},
	/**
	 * Call function on value
	 */
	map: function(f, is_return)
	{
		if (is_return == undefined) is_return = true;
		return this.call(f, is_return);
	},
	/**
	 * Call function on value
	 */
	mapAsync: async function(f, is_return)
	{
		if (is_return == undefined) is_return = true;
		return Promise.resolve(await this.callAsync(f, is_return));
	},
	/**
	 * Call method on value
	 */
	callMethod: function(method_name, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return this;
		}
		try
		{
			var f = new Runtime.Callback(this.val, method_name);
			this.val = Runtime.rtl.apply(f, args);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
				
				this.val = null;
				this.err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return this;
	},
	/**
	 * Call async method on value
	 */
	callMethodAsync: async function(method_name, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		try
		{
			var f = new Runtime.Callback(this.val, method_name);
			this.val = await Runtime.rtl.apply(f, args);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
				
				this.val = null;
				this.err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(this);
	},
	/**
	 * Call function on monad
	 */
	monad: function(f)
	{
		return Runtime.rtl.apply(f, Runtime.Vector.from([this]));
	},
	/**
	 * Returns value
	 */
	value: function()
	{
		if (this.err != null)
		{
			throw this.err
		}
		if (this.val === null || this.err != null)
		{
			return null;
		}
		return this.val;
	},
	_init: function()
	{
		this.val = null;
		this.err = null;
	},
});
Object.assign(Runtime.Monad,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Monad";
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
Runtime.rtl.defClass(Runtime.Monad);
window["Runtime.Monad"] = Runtime.Monad;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Monad;
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
Runtime.Vector = function()
{
	Runtime.Collection.apply(this, arguments);
};
Runtime.Vector.prototype = Object.create(Runtime.Collection.prototype);
Runtime.Vector.prototype.constructor = Runtime.Vector;
Object.assign(Runtime.Vector.prototype,
{
	/**
	 * Returns new Vector
	 * @param int offset
	 * @param int lenght
	 * @return Vector<T>
	 */
	removeRange: function(offset, length)
	{
		if (length == undefined) length = null;
		if (offset == undefined) offset = 0;
		if (length == undefined)
		{
			var arr = Array.prototype.slice.call(this, offset);
			Object.setPrototypeOf(arr, this.constructor.prototype);
			return arr;
		}
		if (length >= 0)
		{
			length = offset + length;
		}
		Array.prototype.splice.call(this, offset, length);
		return this;
	},
	/**
	 * Remove item
	 */
	remove: function(pos)
	{
		if (pos == -1)
		{
			return this;
		}
		Array.prototype.splice.call(this, pos, 1);
		return this;
	},
	removeItem: function(item)
	{
		return this.remove(this.indexOf(item));
	},
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	append: function(value)
	{
		Array.prototype.push.call(this, value);
		return this;
	},
	push: function(value)
	{
		return this.append(value);
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	prepend: function(value)
	{
		Array.prototype.unshift.call(this, value);
		return this;
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	pop: function()
	{
		return Array.prototype.pop.call(this);
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	shift: function()
	{
		return Array.prototype.shift.call(this);
	},
	/**
	 * Insert value to position
	 * @param int pos - position
	 * @param T value
	 */
	insert: function(pos, value)
	{
		Array.prototype.splice.call(this, pos, 0, value);
		return this;
	},
	/**
	 * Add value to position
	 * @param int pos - position
	 * @param T value
	 * @param string kind - after or before
	 */
	add: function(value, pos, kind)
	{
		if (pos == undefined) pos = -1;
		if (kind == undefined) kind = "after";
		if (pos == -1)
		{
			if (kind == "before")
			{
				this.prepend(value);
				return 0;
			}
			else
			{
				this.append(value);
				return this.count() - 1;
			}
		}
		if (kind == "after")
		{
			pos = pos + 1;
		}
		this.insert(pos, value, kind);
		return pos;
	},
	/**
	 * Add value to position
	 * @param int pos - position
	 * @param T value
	 * @param string kind - after or before
	 */
	addItem: function(value, dest_item, kind)
	{
		if (kind == undefined) kind = "after";
		var pos = this.indexOf(dest_item);
		return this.add(value, pos, kind);
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	set: function(pos, value)
	{
		pos = pos % this.count();
		this[pos] = value;
		return this;
	},
	/**
	 * Remove value
	 */
	removeValue: function(value)
	{
		var index = this.indexOf(value);
		if (index != -1)
		{
			this.remove(index, 1);
		}
		return this;
	},
	/**
	 * Find value and remove
	 */
	findAndRemove: function(f)
	{
		var index = this.find(f);
		if (index != -1)
		{
			this.remove(index);
		}
		return this;
	},
	/**
	 * Clear all values from vector
	 */
	clear: function()
	{
		Array.prototype.splice.call(this, 0, this.length);
		return this;
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	appendItems: function(items)
	{
		items.each((item) =>
		{
			this.push(item);
		});
	},
	/**
	 * Prepend vector to the end of the vector
	 * @param Collection<T> arr
	 */
	prependItems: function(items)
	{
		items.each((item) =>
		{
			this.prepend(item);
		});
	},
});
Object.assign(Runtime.Vector, Runtime.Collection);
Object.assign(Runtime.Vector,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function()
	{
		return new Runtime.Vector();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Vector";
	},
	getParentClassName: function()
	{
		return "Runtime.Collection";
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
Runtime.rtl.defClass(Runtime.Vector);
window["Runtime.Vector"] = Runtime.Vector;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Vector;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ClassException = function(message, code, prev)
{
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
	this.message = message;
	this.code = code;
	this.prev = prev;
}
Runtime.Exceptions.ClassException.prototype = Object.create(Error.prototype);
Runtime.Exceptions.ClassException.prototype.constructor = Runtime.Exceptions.ClassException;
Object.assign(Runtime.Exceptions.ClassException.prototype,
{
	_init: function(){},
});
Object.assign(Runtime.Exceptions.ClassException,
{
	getNamespace: function(){ return "Runtime.Exceptions"; },
	getClassName: function(){ return "Runtime.Exceptions.ClassException"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Exceptions.AbstractException = function(message, code, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.ClassException.call(this, message, code, prev);
	this._init();
	this.error_message = message;
	this.error_code = code;
	this.prev = prev;
};
Runtime.Exceptions.AbstractException.prototype = Object.create(Runtime.Exceptions.ClassException.prototype);
Runtime.Exceptions.AbstractException.prototype.constructor = Runtime.Exceptions.AbstractException;
Object.assign(Runtime.Exceptions.AbstractException.prototype,
{
	/**
	 * Returns previous exception
	 */
	getPreviousException: function()
	{
		return this.prev;
	},
	/**
	 * Build error message
	 */
	buildErrorMessage: function()
	{
		return this.error_message;
	},
	/**
	 * Returns error message
	 */
	getErrorMessage: function()
	{
		return this.error_message;
	},
	/**
	 * Returns error code
	 */
	getErrorCode: function()
	{
		return this.error_code;
	},
	/**
	 * Returns error file name
	 */
	getFileName: function()
	{
		return this.error_file;
	},
	/**
	 * Returns error line
	 */
	getErrorLine: function()
	{
		return this.error_line;
	},
	/**
	 * Returns error position
	 */
	getErrorPos: function()
	{
		return this.error_pos;
	},
	/**
	 * Convert exception to string
	 */
	toString: function()
	{
		return this.buildErrorMessage();
	},
	/**
	 * Returns trace
	 */
	getTraceStr: function()
	{
	},
	/**
	 * Returns trace
	 */
	getTraceCollection: function()
	{
	},
	_init: function()
	{
		Runtime.Exceptions.ClassException.prototype._init.call(this);
		this.prev = null;
		this.error_message = "";
		this.error_code = 0;
		this.error_file = "";
		this.error_line = "";
		this.error_pos = "";
	},
});
Object.assign(Runtime.Exceptions.AbstractException, Runtime.Exceptions.ClassException);
Object.assign(Runtime.Exceptions.AbstractException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.ClassException";
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
Runtime.rtl.defClass(Runtime.Exceptions.AbstractException);
window["Runtime.Exceptions.AbstractException"] = Runtime.Exceptions.AbstractException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.AbstractException;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ApiError = function(prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, prev.getErrorMessage(), Runtime.rtl.ERROR_API_ERROR, prev);
};
Runtime.Exceptions.ApiError.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Exceptions.ApiError.prototype.constructor = Runtime.Exceptions.ApiError;
Object.assign(Runtime.Exceptions.ApiError.prototype,
{
	/**
	 * Returns error message
	 */
	getErrorMessage: function()
	{
		return this.prev.getErrorMessage();
	},
	/**
	 * Returns error code
	 */
	getErrorCode: function()
	{
		return this.prev.getErrorCode();
	},
	/**
	 * Returns error file name
	 */
	getFileName: function()
	{
		return this.prev.getFileName();
	},
	/**
	 * Returns error line
	 */
	getErrorLine: function()
	{
		return this.prev.getErrorLine();
	},
	/**
	 * Returns error position
	 */
	getErrorPos: function()
	{
		return this.prev.getErrorPos();
	},
});
Object.assign(Runtime.Exceptions.ApiError, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Exceptions.ApiError,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.ApiError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Exceptions.ApiError);
window["Runtime.Exceptions.ApiError"] = Runtime.Exceptions.ApiError;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.ApiError;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.AssertException = function(message, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, message, Runtime.rtl.ERROR_ASSERT, prev);
};
Runtime.Exceptions.AssertException.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Exceptions.AssertException.prototype.constructor = Runtime.Exceptions.AssertException;
Object.assign(Runtime.Exceptions.AssertException.prototype,
{
});
Object.assign(Runtime.Exceptions.AssertException, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Exceptions.AssertException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.AssertException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Exceptions.AssertException);
window["Runtime.Exceptions.AssertException"] = Runtime.Exceptions.AssertException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.AssertException;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.CurlException = function(http_code, http_content, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, "HTTP error code: " + Runtime.rtl.toStr(http_code), Runtime.rtl.ERROR_CURL_ERROR, prev);
	this.http_code = http_code;
	this.http_content = http_content;
};
Runtime.Exceptions.CurlException.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Exceptions.CurlException.prototype.constructor = Runtime.Exceptions.CurlException;
Object.assign(Runtime.Exceptions.CurlException.prototype,
{
	_init: function()
	{
		Runtime.Exceptions.AbstractException.prototype._init.call(this);
		this.http_code = -1;
		this.http_content = "";
	},
});
Object.assign(Runtime.Exceptions.CurlException, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Exceptions.CurlException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.CurlException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Exceptions.CurlException);
window["Runtime.Exceptions.CurlException"] = Runtime.Exceptions.CurlException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.CurlException;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.IndexOutOfRange = function(pos, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, Runtime.rtl.getContext().translate("Runtime", "Index out of range. Pos: %pos%", Runtime.Map.from({"pos":pos})), Runtime.rtl.ERROR_INDEX_OUT_OF_RANGE, prev);
};
Runtime.Exceptions.IndexOutOfRange.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Exceptions.IndexOutOfRange.prototype.constructor = Runtime.Exceptions.IndexOutOfRange;
Object.assign(Runtime.Exceptions.IndexOutOfRange.prototype,
{
});
Object.assign(Runtime.Exceptions.IndexOutOfRange, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Exceptions.IndexOutOfRange,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.IndexOutOfRange";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Exceptions.IndexOutOfRange);
window["Runtime.Exceptions.IndexOutOfRange"] = Runtime.Exceptions.IndexOutOfRange;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.IndexOutOfRange;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ItemNotFound = function(name, object, prev)
{
	if (name == undefined) name = "";
	if (object == undefined) object = "Item";
	if (prev == undefined) prev = null;
	var message = "";
	if (name != "")
	{
		message = Runtime.rs.format("%object% '%name%' not found", Runtime.Map.from({"name":name,"object":object}));
	}
	else
	{
		message = Runtime.rs.format("%object% not found", Runtime.Map.from({"object":object}));
	}
	Runtime.Exceptions.AbstractException.call(this, message, Runtime.rtl.ERROR_ITEM_NOT_FOUND, prev);
};
Runtime.Exceptions.ItemNotFound.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Exceptions.ItemNotFound.prototype.constructor = Runtime.Exceptions.ItemNotFound;
Object.assign(Runtime.Exceptions.ItemNotFound.prototype,
{
});
Object.assign(Runtime.Exceptions.ItemNotFound, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Exceptions.ItemNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.ItemNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Exceptions.ItemNotFound);
window["Runtime.Exceptions.ItemNotFound"] = Runtime.Exceptions.ItemNotFound;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.ItemNotFound;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.KeyNotFound = function(key, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, Runtime.rtl.getContext().translate("Runtime", "Key '%key%' not found", Runtime.Map.from({"key":key})), Runtime.rtl.ERROR_KEY_NOT_FOUND, prev);
};
Runtime.Exceptions.KeyNotFound.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Exceptions.KeyNotFound.prototype.constructor = Runtime.Exceptions.KeyNotFound;
Object.assign(Runtime.Exceptions.KeyNotFound.prototype,
{
});
Object.assign(Runtime.Exceptions.KeyNotFound, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Exceptions.KeyNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Exceptions.KeyNotFound);
window["Runtime.Exceptions.KeyNotFound"] = Runtime.Exceptions.KeyNotFound;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.KeyNotFound;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.RuntimeException = function(message, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, message, Runtime.rtl.ERROR_RUNTIME, prev);
};
Runtime.Exceptions.RuntimeException.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Exceptions.RuntimeException.prototype.constructor = Runtime.Exceptions.RuntimeException;
Object.assign(Runtime.Exceptions.RuntimeException.prototype,
{
});
Object.assign(Runtime.Exceptions.RuntimeException, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Exceptions.RuntimeException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Exceptions.RuntimeException);
window["Runtime.Exceptions.RuntimeException"] = Runtime.Exceptions.RuntimeException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.RuntimeException;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.UnknownError = function(prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, Runtime.rtl.getContext().translate("Runtime", "Unknown error"), Runtime.rtl.ERROR_UNKNOWN, prev);
};
Runtime.Exceptions.UnknownError.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Exceptions.UnknownError.prototype.constructor = Runtime.Exceptions.UnknownError;
Object.assign(Runtime.Exceptions.UnknownError.prototype,
{
});
Object.assign(Runtime.Exceptions.UnknownError, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Exceptions.UnknownError,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.UnknownError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Exceptions.UnknownError);
window["Runtime.Exceptions.UnknownError"] = Runtime.Exceptions.UnknownError;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.UnknownError;
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
Runtime.StringInterface = function()
{
};
Object.assign(Runtime.StringInterface.prototype,
{
	/**
	 * Returns string
	 */
	toString: function()
	{
	},
});
Object.assign(Runtime.StringInterface,
{
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.StringInterface";
	},
});
Runtime.rtl.defClass(Runtime.StringInterface);
window["Runtime.StringInterface"] = Runtime.StringInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.StringInterface;
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
Runtime.BaseObject = function()
{
	/* Init object */
	this._init();
};
Object.assign(Runtime.BaseObject.prototype,
{
	/**
	 * Init function
	 */
	_init: function()
	{
	},
	/**
	 * Init struct data
	 */
	_changes: function(changes)
	{
	},
	/**
	 * Assign new values
	 */
	_assign_values: function(changes)
	{
		if (changes == undefined) changes = null;
		if (typeof changes == 'object' && !(changes instanceof Runtime.Dict))
		{
			changes = new Runtime.Map(changes);
		}
		if (changes == null)
		{
			return ;
		}
		if (changes.keys().count() == 0)
		{
			return ;
		}
		if (!(changes instanceof Runtime.Map))
		{
			changes = changes.toMap();
		}
		this._changes(changes);
		var _Dict = use("Runtime.Dict");
		var rtl = use("Runtime.rtl");
		if (changes instanceof _Dict) changes = changes.toObject();
		for (var key in changes)
		{
			var value = changes[key];
			this[key] = value;
		}
	},
});
Object.assign(Runtime.BaseObject,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseObject";
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
Runtime.rtl.defClass(Runtime.BaseObject);
window["Runtime.BaseObject"] = Runtime.BaseObject;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseObject;
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
Runtime.BaseHook = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	/* Setup hook params */
	this.setup(params);
};
Runtime.BaseHook.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseHook.prototype.constructor = Runtime.BaseHook;
Object.assign(Runtime.BaseHook.prototype,
{
	/**
	 * Setup hook params
	 */
	setup: function(params)
	{
		if (params == null)
		{
			return ;
		}
	},
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		return "";
	},
	/**
	 * Register hook
	 */
	register: function(hook_name, method_name, priority)
	{
		if (method_name == undefined) method_name = "";
		if (priority == undefined) priority = 100;
		if (Runtime.rtl.isInt(method_name))
		{
			priority = method_name;
			method_name = "";
		}
		if (method_name == "")
		{
			method_name = this.getMethodName(hook_name);
		}
		if (method_name == "")
		{
			return ;
		}
		this.provider.register(hook_name, this, method_name, priority);
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.hook = null;
		this.provider = null;
	},
});
Object.assign(Runtime.BaseHook, Runtime.BaseObject);
Object.assign(Runtime.BaseHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseHook";
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
Runtime.rtl.defClass(Runtime.BaseHook);
window["Runtime.BaseHook"] = Runtime.BaseHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseHook;
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
Runtime.BaseProvider = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this.params = (params != null) ? (params.toDict()) : (null);
};
Runtime.BaseProvider.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseProvider.prototype.constructor = Runtime.BaseProvider;
Object.assign(Runtime.BaseProvider.prototype,
{
	/**
	 * Returns true if started
	 */
	isStarted: function()
	{
		return this.started;
	},
	/**
	 * Return param
	 */
	getParam: function(param_name, def_value)
	{
		if (this.param == null)
		{
			return def_value;
		}
		if (this.param.has(param_name))
		{
			return def_value;
		}
		return this.param.get(param_name);
	},
	/**
	 * Init provider
	 */
	init: async function()
	{
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
		this.started = true;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.started = false;
		this.params = null;
	},
});
Object.assign(Runtime.BaseProvider, Runtime.BaseObject);
Object.assign(Runtime.BaseProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseProvider";
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
Runtime.rtl.defClass(Runtime.BaseProvider);
window["Runtime.BaseProvider"] = Runtime.BaseProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseProvider;
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
Runtime.BaseStruct = function(obj)
{
	if (obj == undefined) obj = null;
	Runtime.BaseObject.call(this);
	this._assign_values(obj);
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
		Object.freeze(this);
};
Runtime.BaseStruct.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseStruct.prototype.constructor = Runtime.BaseStruct;
Object.assign(Runtime.BaseStruct.prototype,
{
	/**
	 * Clone this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	clone: function(obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto);
		item = Object.assign(item, this);
		
		item._assign_values(obj);
		
		Object.freeze(item);
		
		return item;
		return this;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	copy: function(obj)
	{
		if (obj == undefined) obj = null;
		return this.clone(obj);
	},
	/**
	 * Returns struct as Map
	 * @return Map
	 */
	toMap: function()
	{
		var values = new Runtime.Map();
		var names = Runtime.rtl.getFields(this.constructor.getClassName());
		for (var i = 0; i < names.count(); i++)
		{
			var variable_name = names.item(i);
			var value = this.get(variable_name, null);
			values.set(variable_name, value);
		}
		return values;
	},
});
Object.assign(Runtime.BaseStruct, Runtime.BaseObject);
Object.assign(Runtime.BaseStruct,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(items)
	{
		return new (
			Function.prototype.bind.apply(
				this,
				(typeof ctx != "undefined") ? [null, ctx, items] : [null, items]
			)
		);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseStruct";
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
Runtime.rtl.defClass(Runtime.BaseStruct);
window["Runtime.BaseStruct"] = Runtime.BaseStruct;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseStruct;
Runtime.BaseStruct.prototype.get = function(k, v)
{
	if (v == undefined) v = null;
	return this[k] != undefined ? this[k] : v;
};
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
Runtime.Callback = function(obj, name, tag)
{
	if (tag == undefined) tag = null;
	/* Init object */
	this._init();
	/* Set variables */
	this.obj = obj;
	this.name = name;
	this.tag = tag;
};
Object.assign(Runtime.Callback.prototype,
{
	/**
	 * Check if method exists
	 */
	exists: function()
	{
		if (!Runtime.rtl.method_exists(this.obj, this.name))
		{
			return false;
		}
		return true;
	},
	/**
	 * Check callback
	 */
	check: function()
	{
		if (!this.exists())
		{
			throw new Runtime.Exceptions.RuntimeException("Method '" + Runtime.rtl.toStr(this.name) + Runtime.rtl.toStr("' not found in ") + Runtime.rtl.toStr(Runtime.rtl.get_class_name(this.obj)))
		}
	},
	/**
	 * Apply
	 */
	apply: function(args)
	{
		if (args == undefined) args = null;
		this.check();
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		var obj = this.obj;
		if (typeof obj == "string") obj = Runtime.rtl.find_class(obj);
		return obj[this.name].bind(obj).apply(null, args);
	},
	_init: function()
	{
		this.obj = null;
		this.name = null;
		this.tag = null;
	},
});
Object.assign(Runtime.Callback,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Callback";
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
Runtime.rtl.defClass(Runtime.Callback);
window["Runtime.Callback"] = Runtime.Callback;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Callback;
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
Runtime.Chain = function()
{
	Runtime.Callback.call(this, null, null);
};
Runtime.Chain.prototype = Object.create(Runtime.Callback.prototype);
Runtime.Chain.prototype.constructor = Runtime.Chain;
Object.assign(Runtime.Chain.prototype,
{
	/**
	 * Check if method exists
	 */
	exists: function()
	{
		return true;
	},
	/**
	 * Check callback
	 */
	check: function()
	{
	},
	/**
	 * Returns true if async
	 */
	isAsync: function()
	{
		return this.is_async;
	},
	/**
	 * Returns true if chain functions must returns value
	 */
	isReturnValue: function()
	{
		return this.is_return_value;
	},
	/**
	 * Setting the behavior, the chain functions should return a value or not
	 */
	setReturnValue: function(value)
	{
		this.is_return_value = value;
	},
	/**
	 * Returns true if async
	 */
	getChain: function()
	{
		return this.chain.slice();
	},
	/**
	 * Add function to chain
	 */
	add: function(f, priority)
	{
		if (priority == undefined) priority = 100;
		this.chain.push(Runtime.Map.from({"async":false,"callback":f,"priority":priority}));
		return this;
	},
	/**
	 * Add async function to chain
	 */
	addAsync: function(f, priority)
	{
		if (priority == undefined) priority = 100;
		this.is_async = true;
		this.chain.push(Runtime.Map.from({"async":true,"callback":f,"priority":priority}));
		return this;
	},
	/**
	 * Sort chain
	 */
	sort: function()
	{
		this.chain = this.chain.sort(Runtime.lib.sortAttr("priority", "asc"));
	},
	/**
	 * Apply chain
	 */
	apply: function(value)
	{
		if (value == undefined) value = null;
		var monada = new Runtime.Monad(value);
		if (!this.is_async)
		{
			this.applyChain(monada);
			return monada.value();
		}
		else
		{
			var f = async (monada) =>
			{
				await this.applyChainAsync(monada);
				return Promise.resolve(monada.value());
			};
			return f(monada);
		}
	},
	/**
	 * Apply async chain
	 */
	applyAsync: async function(value)
	{
		var monada = new Runtime.Monad(value);
		await this.applyChainAsync(monada);
		return Promise.resolve(monada.value());
	},
	/**
	 * Apply chain
	 */
	applyChain: function(monada)
	{
		for (var i = 0; i < this.chain.count(); i++)
		{
			var item = this.chain.get(i);
			var f = item.get("callback");
			monada.map(f, this.is_return_value);
		}
		return monada;
	},
	/**
	 * Apply async chain
	 */
	applyChainAsync: async function(monada)
	{
		for (var i = 0; i < this.chain.count(); i++)
		{
			var item = this.chain.get(i);
			var f = item.get("callback");
			await monada.mapAsync(f, this.is_return_value);
		}
		return Promise.resolve(monada);
	},
	_init: function()
	{
		Runtime.Callback.prototype._init.call(this);
		this.chain = Runtime.Vector.from([]);
		this.is_async = false;
		this.is_return_value = true;
	},
});
Object.assign(Runtime.Chain, Runtime.Callback);
Object.assign(Runtime.Chain,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Chain";
	},
	getParentClassName: function()
	{
		return "Runtime.Callback";
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
Runtime.rtl.defClass(Runtime.Chain);
window["Runtime.Chain"] = Runtime.Chain;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Chain;
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
Runtime.Context = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Context.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Returns app
	 */
	getApp: function()
	{
		return this.app;
	},
	/**
	 * Returns true if is initialized
	 */
	isInitialized: function()
	{
		return this.initialized;
	},
	/**
	 * Returns true if is started
	 */
	isStarted: function()
	{
		return this.started;
	},
	/**
	 * Returns start time
	 */
	getStartTime: function()
	{
		return this.start_time;
	},
	/**
	 * Returns base path
	 */
	getBasePath: function()
	{
		return this.base_path;
	},
	/**
	 * Returns console args
	 */
	getConsoleArgs: function()
	{
		return this.cli_args.slice();
	},
	/**
	 * Returns modules
	 */
	getModules: function()
	{
		return this.modules.slice();
	},
	/**
	 * Returns entities
	 */
	getEntities: function(class_name)
	{
		if (class_name == undefined) class_name = "";
		if (class_name == "")
		{
			return this.entities.slice();
		}
		return this.entities.filter(Runtime.lib.isInstance(class_name));
	},
	/**
	 * Returns environments
	 */
	getEnvironments: function()
	{
		return this.environments.clone();
	},
	/**
	 * Returns provider by name
	 */
	provider: function(provider_name)
	{
		if (!this.providers.has(provider_name))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider '" + Runtime.rtl.toStr(provider_name) + Runtime.rtl.toStr("' not found"))
		}
		return this.providers.get(provider_name);
	},
	/**
	 * Return environment
	 */
	env: function(name)
	{
		var value = Runtime.rtl.attr(this.environments, name);
		var hook_res = this.callHook(Runtime.Hooks.RuntimeHook.ENV, Runtime.Map.from({"name":name,"value":value}));
		return Runtime.rtl.attr(hook_res, "value");
	},
	/**
	 * Init
	 */
	init: async function()
	{
		if (this.initialized)
		{
			return Promise.resolve();
		}
		/* Create app */
		if (this.entry_point)
		{
			this.app = Runtime.rtl.newInstance(this.entry_point);
		}
		var modules = this.modules;
		if (modules.indexOf("Runtime"))
		{
			modules.prepend("Runtime");
		}
		/* Extend modules */
		this.modules = this.constructor.getRequiredModules(modules);
		/* Get modules entities */
		this.entities = this.constructor.getEntitiesFromModules(this.modules);
		/* Create providers */
		this.createProviders();
		/* Init providers */
		await this.initProviders();
		/* Hook init app */
		await this.callHookAsync(Runtime.Hooks.RuntimeHook.INIT);
		/* Init app */
		if (this.app != null && Runtime.rtl.method_exists(this.app, "init"))
		{
			await this.app.init();
		}
		/* Set initialized */
		this.initialized = true;
	},
	/**
	 * Start context
	 */
	start: async function()
	{
		if (this.started)
		{
			return Promise.resolve();
		}
		/* Start providers */
		await this.startProviders();
		/* Hook start app */
		await this.callHookAsync(Runtime.Hooks.RuntimeHook.START);
		/* Start app */
		if (this.app && Runtime.rtl.method_exists(this.app, "start"))
		{
			await this.app.start();
		}
		/* Hook launched app */
		await this.callHookAsync(Runtime.Hooks.RuntimeHook.LAUNCHED);
		/* Set started */
		this.started = true;
	},
	/**
	 * Run context
	 */
	run: async function()
	{
		var code = 0;
		/* Run app */
		if (this.app == null)
		{
			return Promise.resolve();
		}
		/* Run entry_point */
		if (Runtime.rtl.method_exists(this.app, "main"))
		{
			/* Hook launched app */
			await this.callHookAsync(Runtime.Hooks.RuntimeHook.RUN);
			code = await this.app.main();
		}
		return Promise.resolve(code);
	},
	/**
	 * Call hook
	 */
	callHook: function(hook_name, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = Runtime.Map.from({});
		}
		if (!this.providers.has("hook"))
		{
			return params;
		}
		var hook = this.provider("hook");
		var methods_list = hook.getMethods(hook_name);
		for (var i = 0; i < methods_list.count(); i++)
		{
			var f = Runtime.rtl.attr(methods_list, i);
			var res = Runtime.rtl.apply(f, Runtime.Vector.from([params]));
			if (Runtime.rtl.isPromise(res))
			{
				throw new Runtime.Exceptions.RuntimeException("Promise is not allowed")
			}
		}
		return params;
	},
	/**
	 * Call hook
	 */
	callHookAsync: async function(hook_name, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = Runtime.Map.from({});
		}
		var hook = this.provider("hook");
		var methods_list = hook.getMethods(hook_name);
		for (var i = 0; i < methods_list.count(); i++)
		{
			var f = Runtime.rtl.attr(methods_list, i);
			await Runtime.rtl.apply(f, Runtime.Vector.from([params]));
		}
		return Promise.resolve(params);
	},
	/**
	 * Translate message
	 */
	translate: function(module, s, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return s;
		}
		return Runtime.rs.format(s, params);
	},
	/**
	 * Create providers
	 */
	createProviders: function()
	{
		var providers = this.getEntities("Runtime.Entity.Provider");
		for (var i = 0; i < providers.count(); i++)
		{
			var factory = providers.get(i);
			/* Create provider */
			var provider = factory.createProvider();
			if (!provider)
			{
				throw new Runtime.Exceptions.RuntimeException("Wrong declare provider '" + Runtime.rtl.toStr(factory.name) + Runtime.rtl.toStr("'"))
			}
			/* Add provider */
			this.registerProvider(factory.name, provider);
		}
	},
	/**
	 * Init providers
	 */
	initProviders: async function()
	{
		var providers_names = this.providers.keys();
		for (var i = 0; i < providers_names.count(); i++)
		{
			var provider_name = providers_names.get(i);
			var provider = this.providers.get(provider_name);
			await provider.init();
		}
	},
	/**
	 * Start providers
	 */
	startProviders: async function()
	{
		var providers_names = this.providers.keys();
		for (var i = 0; i < providers_names.count(); i++)
		{
			var provider_name = providers_names.get(i);
			var provider = this.providers.get(provider_name);
			await provider.start();
		}
	},
	/**
	 * Register provider
	 */
	registerProvider: function(provider_name, provider)
	{
		if (this.initialized)
		{
			return ;
		}
		if (!(provider instanceof Runtime.BaseProvider))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider '" + provider_name + "' must be intstanceof BaseProvider")
		}
		this.providers.set(provider_name, provider);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.app = null;
		this.base_path = "";
		this.entry_point = "";
		this.cli_args = Runtime.Vector.from([]);
		this.environments = Runtime.Map.from({});
		this.modules = Runtime.Vector.from([]);
		this.providers = Runtime.Map.from({});
		this.entities = Runtime.Vector.from([]);
		this.start_modules = Runtime.Vector.from([]);
		this.start_time = 0;
		this.tz = "UTC";
		this.initialized = false;
		this.started = false;
	},
});
Object.assign(Runtime.Context, Runtime.BaseObject);
Object.assign(Runtime.Context,
{
	/**
	 * Create context
	 */
	create: function(params)
	{
		if (!(params instanceof Runtime.Dict))
		{
			params = Runtime.Dict.from(params);
		}
		params = params.toMap();
		if (!params.has("start_time"))
		{
			params.set("start_time", Date.now());
		}
		if (params.has("modules"))
		{
			var modules = params.get("modules");
			if (!(modules instanceof Runtime.Collection))
			{
				modules = Runtime.Collection.from(modules);
			}
			params.set("modules", modules.toVector());
		}
		/* Setup default environments */
		if (!params.has("environments"))
		{
			params.set("environments", new Runtime.Map());
		}
		var env = Runtime.rtl.attr(params, "environments");
		if (!env)
		{
			env = Runtime.Map.from({});
		}
		if (!env.has("CLOUD_ENV"))
		{
			env.set("CLOUD_ENV", false);
		}
		if (!env.has("DEBUG"))
		{
			env.set("DEBUG", false);
		}
		if (!env.has("LOCALE"))
		{
			env.set("LOCALE", "en_US");
		}
		if (!env.has("TZ"))
		{
			env.set("TZ", "UTC");
		}
		if (!env.has("TZ_OFFSET"))
		{
			env.set("TZ_OFFSET", 0);
		}
		var instance = Runtime.rtl.newInstance(this.getClassName());
		if (params.has("base_path"))
		{
			instance.base_path = params.get("base_path");
		}
		if (params.has("entry_point"))
		{
			instance.entry_point = params.get("entry_point");
		}
		if (params.has("cli_args"))
		{
			instance.cli_args = params.get("cli_args");
		}
		if (params.has("environments"))
		{
			instance.environments = params.get("environments");
		}
		if (params.has("modules"))
		{
			instance.modules = params.get("modules");
		}
		if (params.has("start_time"))
		{
			instance.start_time = params.get("start_time");
		}
		if (params.has("tz"))
		{
			instance.tz = params.get("tz");
		}
		instance.start_modules = instance.modules.copy();
		return instance;
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(modules)
	{
		var res = new Runtime.Vector();
		var cache = new Runtime.Map();
		this._getRequiredModules(res, cache, modules);
		return res.removeDuplicates();
	},
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(res, cache, modules)
	{
		if (modules == null)
		{
			return ;
		}
		for (var i = 0; i < modules.count(); i++)
		{
			var module_name = modules.item(i);
			if (!cache.has(module_name))
			{
				cache.set(module_name, true);
				var f = new Runtime.Callback(module_name + Runtime.rtl.toStr(".ModuleDescription"), "requiredModules");
				if (f.exists())
				{
					var sub_modules = Runtime.rtl.apply(f);
					if (sub_modules != null)
					{
						var sub_modules = sub_modules.keys();
						this._getRequiredModules(res, cache, sub_modules);
					}
					res.push(module_name);
				}
			}
		}
	},
	/**
	 * Returns modules entities
	 */
	getEntitiesFromModules: function(modules)
	{
		var entities = new Runtime.Vector();
		for (var i = 0; i < modules.count(); i++)
		{
			var module_name = modules.item(i);
			var f = new Runtime.Callback(module_name + Runtime.rtl.toStr(".ModuleDescription"), "entities");
			if (f.exists())
			{
				var arr = Runtime.rtl.apply(f);
				if (arr)
				{
					entities.appendItems(arr);
				}
			}
		}
		return entities;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Context";
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
Runtime.rtl.defClass(Runtime.Context);
window["Runtime.Context"] = Runtime.Context;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Context;
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
Runtime.Curl = function(url, params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this.url = url;
	/* Setup params */
	if (params == null)
	{
		return ;
	}
	if (params.has("post"))
	{
		this.post = params.get("post");
	}
};
Runtime.Curl.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Curl.prototype.constructor = Runtime.Curl;
Object.assign(Runtime.Curl.prototype,
{
	/**
	 * Send
	 */
	send: async function()
	{
		this.code = 0;
		this.response = "";
		await this.sendPost();
		return Promise.resolve(this.response);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.url = "";
		this.post = null;
		this.code = 0;
		this.response = "";
	},
});
Object.assign(Runtime.Curl, Runtime.BaseObject);
Object.assign(Runtime.Curl,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Curl";
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
Runtime.rtl.defClass(Runtime.Curl);
window["Runtime.Curl"] = Runtime.Curl;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Curl;
Object.assign(Runtime.Curl.prototype,
{
	/**
	 * Returns FormData get
	 */
	getKey: function(key, index)
	{
		if (key == "") return index;
		return key + "[" + index + "]";
	},
	
	
	/**
	 * Returns FormData
	 * @params data - json object
	 * @return FormData
	 */
	buildPostData: function(result, key, value)
	{
		if (value instanceof Array)
		{
			for (var i=0; i<value.length; i++)
			{
				this.buildPostData(result, this.getKey(key, i), value[i]);
			}
		}
		else if (value instanceof Runtime.Dict)
		{
			var keys = value.keys();
			for (var i=0; i<keys.length; i++)
			{
				var name = keys.get(i);
				this.buildPostData(result, this.getKey(key, name), value.get(name));
			}
		}
		else
		{
			result.append(key, value);
		}
	},
	
	
	/**
	 * Send api request
	 * @param string class_name
	 * @param string method_name
	 * @param Map<string, mixed> data
	 * @param callback f
	 */ 
	sendPost: async function()
	{
		return await new Promise((resolve, reject) =>{
			try
			{
				var data = new FormData();
				this.buildPostData(data, "", this.post);
				let xhr = new XMLHttpRequest();
				xhr.open('POST', this.url, true);
				xhr.send(data);
				xhr.onreadystatechange = (function(curl, xhr, resolve, reject) {
					return function()
					{
						if (xhr.readyState != 4) return;
						curl.code = xhr.status;
						curl.response = xhr.responseText;
						if (xhr.status == 200)
						{
							resolve();
						}
						else
						{
							reject( new Runtime.Exceptions.CurlException(
								xhr.status, xhr.responseText
							) );
						}
					}
				})(this, xhr, resolve, reject);
			}
			catch (e)
			{
				reject(e);
			}
		});
	},
	
});
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
Runtime.Date = function(data)
{
	if (data == undefined) data = null;
	Runtime.BaseObject.call(this);
	if (data != null)
	{
		if (data.has("y"))
		{
			this.y = data.get("y");
		}
		if (data.has("m"))
		{
			this.m = data.get("m");
		}
		if (data.has("d"))
		{
			this.d = data.get("d");
		}
	}
};
Runtime.Date.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Date.prototype.constructor = Runtime.Date;
Object.assign(Runtime.Date.prototype,
{
	/**
	 * toMap
	 */
	toMap: function()
	{
		return Runtime.Map.from({"y":this.y,"m":this.m,"d":this.d});
	},
	/**
	 * Return date
	 * @return string
	 */
	getDate: function()
	{
		return this.y + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.m) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.d);
	},
	/**
	 * Normalize date time
	 */
	normalize: function()
	{
		return this;
	},
	/**
	 * Return db datetime
	 * @return string
	 */
	toString: function()
	{
		return this.y + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.m) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.d);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.y = 0;
		this.m = 0;
		this.d = 0;
	},
});
Object.assign(Runtime.Date, Runtime.BaseObject);
Object.assign(Runtime.Date,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Date";
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
	__implements__:
	[
		Runtime.StringInterface,
	],
});
Runtime.rtl.defClass(Runtime.Date);
window["Runtime.Date"] = Runtime.Date;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Date;
Runtime.Date.prototype.toObject = function()
{
	var dt = new Date(this.y, this.m - 1, this.d);
	return dt;
}
Runtime.Date.fromObject = function(dt)
{
	var Dict = use("Runtime.Dict");
	var y = Number(dt.getFullYear());
	var m = Number(dt.getMonth()) + 1;
	var d = Number(dt.getDate());
	var dt = new Runtime.Date( ctx, Dict.from({"y":y,"m":m,"d":d}) );
	return dt;
}
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
Runtime.DateTime = function(data)
{
	if (data == undefined) data = null;
	Runtime.BaseObject.call(this);
	if (data != null)
	{
		if (data.has("y"))
		{
			this.y = data.get("y");
		}
		if (data.has("m"))
		{
			this.m = data.get("m");
		}
		if (data.has("d"))
		{
			this.d = data.get("d");
		}
		if (data.has("h"))
		{
			this.h = data.get("h");
		}
		if (data.has("i"))
		{
			this.i = data.get("i");
		}
		if (data.has("s"))
		{
			this.s = data.get("s");
		}
		if (data.has("ms"))
		{
			this.ms = data.get("ms");
		}
		if (data.has("o"))
		{
			this.o = data.get("o");
		}
	}
};
Runtime.DateTime.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.DateTime.prototype.constructor = Runtime.DateTime;
Object.assign(Runtime.DateTime.prototype,
{
	/**
	 * toMap
	 */
	toMap: function()
	{
		return Runtime.Map.from({"y":this.y,"m":this.m,"d":this.d,"h":this.h,"i":this.i,"s":this.s,"ms":this.ms,"o":this.o});
	},
	/**
	 * Returns timestamp
	 * @return int
	 */
	getTimestamp: function()
	{
		var dt = this.toObject();
		return Math.round(dt.getTime() / 1000);
		return null;
	},
	timestamp: function()
	{
		return this.getTimestamp();
	},
	/**
	 * Returns day of week
	 * @return int
	 */
	getDayOfWeek: function()
	{
		var dt = this.toObject();
		return dt.getDay();
		return null;
	},
	/**
	 * Return db datetime
	 * @return string
	 */
	toString: function()
	{
		var m = (this.m < 10) ? ("0" + Runtime.rtl.toStr(this.m)) : ("" + Runtime.rtl.toStr(this.m));
		var d = (this.d < 10) ? ("0" + Runtime.rtl.toStr(this.d)) : ("" + Runtime.rtl.toStr(this.d));
		var h = (this.h < 10) ? ("0" + Runtime.rtl.toStr(this.h)) : ("" + Runtime.rtl.toStr(this.h));
		var i = (this.i < 10) ? ("0" + Runtime.rtl.toStr(this.i)) : ("" + Runtime.rtl.toStr(this.i));
		var s = (this.s < 10) ? ("0" + Runtime.rtl.toStr(this.s)) : ("" + Runtime.rtl.toStr(this.s));
		/* Get offset */
		var offset = this.o * 60;
		var offset_h = Runtime.Math.abs(Runtime.Math.floor(offset / 60));
		var offset_m = offset % 60;
		offset_h = (offset_h < 10) ? ("0" + Runtime.rtl.toStr(offset_h)) : ("" + Runtime.rtl.toStr(offset_h));
		offset_m = (offset_m < 10) ? ("0" + Runtime.rtl.toStr(offset_m)) : ("" + Runtime.rtl.toStr(offset_m));
		var offset_str = offset_h + Runtime.rtl.toStr(offset_m);
		offset_str = (offset < 0) ? ("-" + Runtime.rtl.toStr(offset_str)) : ("+" + Runtime.rtl.toStr(offset_str));
		/* Return string */
		return this.y + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(m) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(d) + Runtime.rtl.toStr("T") + Runtime.rtl.toStr(h) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(i) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(offset_str);
	},
	/**
	 * Returns date time string
	 */
	getDateTimeString: function()
	{
		var m = (this.m < 10) ? ("0" + Runtime.rtl.toStr(this.m)) : ("" + Runtime.rtl.toStr(this.m));
		var d = (this.d < 10) ? ("0" + Runtime.rtl.toStr(this.d)) : ("" + Runtime.rtl.toStr(this.d));
		var h = (this.h < 10) ? ("0" + Runtime.rtl.toStr(this.h)) : ("" + Runtime.rtl.toStr(this.h));
		var i = (this.i < 10) ? ("0" + Runtime.rtl.toStr(this.i)) : ("" + Runtime.rtl.toStr(this.i));
		var s = (this.s < 10) ? ("0" + Runtime.rtl.toStr(this.s)) : ("" + Runtime.rtl.toStr(this.s));
		return this.y + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(m) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(d) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(h) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(i) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(s);
	},
	/**
	 * Normalize
	 */
	normalize: function()
	{
		var dt = this;
		var offset = Runtime.rtl.getContext().env("TZ_OFFSET");
		if (offset)
		{
			dt = dt.setOffset(offset);
		}
		return dt;
	},
	/**
	 * Shift tz
	 */
	shift: function(seconds)
	{
		var timestamp = this.getTimestamp();
		var dt = this.constructor.create(timestamp + seconds);
		dt.setOffset(this.o);
		return dt;
	},
	/**
	 * Set offset
	 */
	setOffset: function(offset)
	{
		var dt = this.toObject();
		var dt_offset;
		dt_offset = -dt.getTimezoneOffset() * 60;
		/* Modify offset */
		var delta = offset - dt_offset;
		dt = this.constructor.modify(dt, delta);
		var obj = this.constructor.fromObject(dt);
		obj.o = offset;
		return obj;
	},
	/**
	 * Convert to native object
	 */
	toObject: function()
	{
		var dt = new Date(this.y, this.m - 1, this.d, this.h, this.i, this.s);
		offset = dt.getTimezoneOffset() + this.o * 60;
		dt = this.constructor.modify(dt, -offset * 60);
		return dt;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.y = 1970;
		this.m = 1;
		this.d = 1;
		this.h = 0;
		this.i = 0;
		this.s = 0;
		this.ms = 0;
		this.o = 0;
	},
});
Object.assign(Runtime.DateTime, Runtime.BaseObject);
Object.assign(Runtime.DateTime,
{
	/**
	 * Create date time from timestamp
	 */
	create: function(time)
	{
		if (time == undefined) time = -1;
		var dt = null;
		if (time == -1) dt = new Date();
		else dt = new Date(time*1000);
		return this.fromObject(dt);
		return null;
	},
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	now: function()
	{
		return this.create(-1);
	},
	/**
	 * Create DateTime from string
	 */
	fromString: function(s)
	{
		var dt = new Runtime.DateTime();
		dt.y = Runtime.rtl.to(Runtime.rs.substr(s, 0, 4), {"e":"int"});
		dt.m = Runtime.rtl.to(Runtime.rs.substr(s, 5, 2), {"e":"int"});
		dt.d = Runtime.rtl.to(Runtime.rs.substr(s, 8, 2), {"e":"int"});
		dt.h = Runtime.rtl.to(Runtime.rs.substr(s, 11, 2), {"e":"int"});
		dt.i = Runtime.rtl.to(Runtime.rs.substr(s, 14, 2), {"e":"int"});
		dt.s = Runtime.rtl.to(Runtime.rs.substr(s, 17, 2), {"e":"int"});
		dt.o = 0;
		if (Runtime.rs.strlen(s) > 19)
		{
			var sign = Runtime.rs.substr(s, 19, 1);
			var tz_h = Runtime.rtl.to(Runtime.rs.substr(s, 20, 2), {"e":"int"});
			var tz_m = Runtime.rtl.to(Runtime.rs.substr(s, 23, 2), {"e":"int"});
			dt.o = (tz_h * 60 + tz_m) / 60;
			if (sign == "-")
			{
				dt.o = 0 - dt.o;
			}
		}
		return dt;
	},
	/**
	 * Get tz offset
	 */
	getOffset: function(tz)
	{
	},
	/**
	 * Add seconds
	 */
	modify: function(dt, seconds)
	{
		if (seconds == 0)
		{
			return dt;
		}
		var offset = Math.floor(seconds / 60);
		var h = Math.floor(offset / 60);
		var m = offset % 60;
		dt.setMinutes(dt.getMinutes() + m);
		dt.setHours(dt.getHours() + h);
		return dt;
	},
	/**
	 * Create from native object
	 */
	fromObject: function(dt)
	{
		var Dict = use("Runtime.Dict");
		offset = -dt.getTimezoneOffset() / 60;
		var y = Number(dt.getFullYear());
		var m = Number(dt.getMonth()) + 1;
		var d = Number(dt.getDate());
		var h = Number(dt.getHours());
		var i = Number(dt.getMinutes());
		var s = Number(dt.getSeconds());
		var obj = new Runtime.DateTime(Dict.from({
			"y":y,"m":m,"d":d,"h":h,"i":i,"s":s,"o":offset
		}));
		return obj;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.DateTime";
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
	__implements__:
	[
		Runtime.StringInterface,
	],
});
Runtime.rtl.defClass(Runtime.DateTime);
window["Runtime.DateTime"] = Runtime.DateTime;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.DateTime;
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
Runtime.Math = function()
{
};
Object.assign(Runtime.Math.prototype,
{
});
Object.assign(Runtime.Math,
{
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	ceil: function(value)
	{
		return Math.ceil(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	floor: function(value)
	{
		return Math.floor(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	round: function(value)
	{
		return Math.round(value);
	},
	/**
	 * Returns abs
	 */
	abs: function(a)
	{
		if (a < 0)
		{
			return 0 - a;
		}
		else
		{
			return a;
		}
	},
	/**
	 * Returns max
	 */
	max: function(a, b)
	{
		if (a > b)
		{
			return a;
		}
		else
		{
			return b;
		}
	},
	/**
	 * Returns min
	 */
	min: function(a, b)
	{
		if (a < b)
		{
			return a;
		}
		else
		{
			return b;
		}
	},
	/**
	 * Returns random value x, where 0 <= x < 1
	 * @return double
	 */
	urandom: function()
	{
		if (
			window != undefined && window.crypto != undefined &&
			window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return s[0] / 4294967296;
		}
		
		return Math.random();
	},
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	random: function(a, b)
	{
		return this.round(this.urandom() * (b - a) + a);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Math";
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
Runtime.rtl.defClass(Runtime.Math);
window["Runtime.Math"] = Runtime.Math;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Math;
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
Runtime.Money = function(value, currency)
{
	Runtime.BaseObject.call(this);
	this.value = value;
	this.currency = currency;
};
Runtime.Money.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Money.prototype.constructor = Runtime.Money;
Object.assign(Runtime.Money.prototype,
{
	/**
	 * Returns value
	 */
	getValue: function()
	{
		return this.value;
	},
	/**
	 * Returns currency
	 */
	getCurrency: function()
	{
		return this.currency;
	},
	/**
	 * Add money
	 */
	add: function(money)
	{
		if (this.currency != money.currency)
		{
			throw new Runtime.Exceptions.RuntimeException("Money currency mismatch")
		}
		this.value = Runtime.rtl.attr(this.value, ["value"]) + money.currency;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.value = 0;
		this.currency = "";
	},
});
Object.assign(Runtime.Money, Runtime.BaseObject);
Object.assign(Runtime.Money,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Money";
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
Runtime.rtl.defClass(Runtime.Money);
window["Runtime.Money"] = Runtime.Money;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Money;
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
Runtime.RawString = function(s)
{
	this.s = "";
	if (Runtime.rtl.isString(s))
	{
		this.s = s;
	}
};
Object.assign(Runtime.RawString.prototype,
{
	/**
	 * To string
	 */
	toString: function()
	{
		return this.s;
	},
	_init: function()
	{
		this.s = null;
	},
});
Object.assign(Runtime.RawString,
{
	/**
	 * Normalize array
	 */
	normalize: function(item)
	{
		if (Runtime.rtl.isString(item))
		{
			return item;
		}
		else if (item instanceof Runtime.RawString)
		{
			return item.s;
		}
		else if (item instanceof Runtime.Collection)
		{
			item = item.map((item) =>
			{
				return this.normalize(item);
			});
			return Runtime.rs.join("", item);
		}
		return "";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.RawString";
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
	__implements__:
	[
		Runtime.StringInterface,
	],
});
Runtime.rtl.defClass(Runtime.RawString);
window["Runtime.RawString"] = Runtime.RawString;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.RawString;
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
Runtime.Reference = function(ref)
{
	if (ref == undefined) ref = null;
	Runtime.BaseObject.call(this);
	this.ref = ref;
};
Runtime.Reference.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Reference.prototype.constructor = Runtime.Reference;
Object.assign(Runtime.Reference.prototype,
{
	/**
	 * Returns value
	 */
	setValue: function(new_value)
	{
		this.ref = new_value;
	},
	/**
	 * Returns value
	 */
	value: function()
	{
		return this.ref;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.uq = Runtime.rtl.unique();
		this.ref = null;
	},
});
Object.assign(Runtime.Reference, Runtime.BaseObject);
Object.assign(Runtime.Reference,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Reference";
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
Runtime.rtl.defClass(Runtime.Reference);
window["Runtime.Reference"] = Runtime.Reference;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Reference;
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
Runtime.SerializeInterface = function()
{
};
Object.assign(Runtime.SerializeInterface.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
	},
});
Object.assign(Runtime.SerializeInterface,
{
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.SerializeInterface";
	},
});
Runtime.rtl.defClass(Runtime.SerializeInterface);
window["Runtime.SerializeInterface"] = Runtime.SerializeInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.SerializeInterface;
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
Runtime.Serializer = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Serializer.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Serializer.prototype.constructor = Runtime.Serializer;
Object.assign(Runtime.Serializer.prototype,
{
	allowObjects: function()
	{
		return (this.flags & this.constructor.ALLOW_OBJECTS) == this.constructor.ALLOW_OBJECTS;
	},
	isDecode: function()
	{
		return (this.flags & this.constructor.DECODE) == this.constructor.DECODE;
	},
	isEncode: function()
	{
		return (this.flags & this.constructor.ENCODE) == this.constructor.ENCODE;
	},
	/**
	 * Set flag
	 */
	setFlag: function(flag)
	{
		this.flags = this.flags | flag;
	},
	/**
	 * Remove flag
	 */
	removeFlag: function(flag)
	{
		this.flags = this.flags & ~flag;
	},
	/**
	 * Check flag
	 */
	hasFlag: function(flag)
	{
		return (this.flags & flag) == flag;
	},
	/**
	 * Set callback
	 */
	setCallback: function(value)
	{
		this.callback_name = value;
	},
	/**
	 * Serialize item
	 */
	process: function(object, field_name, data, create)
	{
		if (create == undefined) create = null;
		if (this.isDecode())
		{
			var value = data.get(field_name);
			var object_value = this.constructor.getAttr(object, field_name);
			var new_value = this.decodeItem(value, object_value, create);
			this.constructor.setAttr(object, field_name, new_value);
		}
		else if (this.isEncode())
		{
			var value = this.constructor.getAttr(object, field_name);
			var new_value = this.encodeItem(value);
			data.set(field_name, new_value);
		}
	},
	/**
	 * Process items
	 */
	processItems: function(object, field_name, data, create)
	{
		if (create == undefined) create = null;
		if (this.isDecode())
		{
			var value = data.get(field_name);
			var object_value = this.constructor.getAttr(object, field_name);
			var new_value = this.decodeItems(value, object_value, create);
			this.constructor.setAttr(object, field_name, new_value);
		}
		if (this.isEncode())
		{
			var value = this.constructor.getAttr(object, field_name);
			var new_value = this.encodeItem(value);
			data.set(field_name, new_value);
		}
	},
	/**
	 * Decode collection
	 */
	decodeCollection: function(value, object_value, create)
	{
		if (object_value == undefined) object_value = null;
		if (create == undefined) create = null;
		var new_value = Runtime.Vector.from([]);
		for (var i = 0; i < value.count(); i++)
		{
			var item = value.get(i);
			var old_item = (object_value instanceof Runtime.Collection) ? (object_value.get(i)) : (null);
			var new_item = this.decodeItem(item, old_item, create);
			new_value.push(new_item);
		}
		return new_value;
	},
	/**
	 * Decode dict
	 */
	decodeDict: function(value, object_value, create)
	{
		if (object_value == undefined) object_value = null;
		if (create == undefined) create = null;
		var new_value = Runtime.Map.from({});
		var keys = value.keys();
		for (var i = 0; i < keys.count(); i++)
		{
			var key = keys.get(i);
			var item = value.get(key);
			var old_item = this.constructor.getAttr(object_value, key);
			var new_item = this.decodeItem(item, old_item, create);
			new_value.set(key, new_item);
		}
		return new_value;
	},
	/**
	 * Create object
	 */
	createObject: function(value, object_value, create)
	{
		if (object_value == undefined) object_value = null;
		if (create == undefined) create = null;
		var class_name = value.get("__class_name__");
		/* Create instance */
		var instance = object_value;
		if (object_value != null)
		{
			instance = object_value;
		}
		else if (create != null)
		{
			instance = create(this, value);
		}
		else
		{
			instance = Runtime.rtl.newInstance(class_name);
		}
		/* If instance is null */
		if (instance == null)
		{
			return null;
		}
		/* Get callback */
		var callback = null;
		if (this.callback_name != null)
		{
			var callback = new Runtime.Callback(instance, this.callback_name);
			if (callback.exists())
			{
				callback = null;
			}
		}
		/* Apply object serialize */
		if (callback)
		{
			Runtime.rtl.apply(callback, Runtime.Vector.from([this,value]));
		}
		else if (Runtime.rtl.is_implements(instance, Runtime.SerializeInterface))
		{
			instance.serialize(this, value);
		}
		/* Return instance */
		return instance;
	},
	/**
	 * Decode object
	 */
	decodeObject: function(value, object_value, create)
	{
		if (object_value == undefined) object_value = null;
		if (create == undefined) create = null;
		/* Convert to Dict if objects is not allowed */
		if (!this.allowObjects())
		{
			return this.decodeDict(value);
		}
		/* Create object by create */
		if (create != null)
		{
			return this.createObject(value, object_value, create);
		}
		/* Convert Dict if does not has class name */
		if (!value.has("__class_name__"))
		{
			return this.decodeDict(value);
		}
		var class_name = value.get("__class_name__");
		/* Is date */
		if (class_name == "Runtime.Date")
		{
			return new Runtime.Date(value);
		}
		else if (class_name == "Runtime.DateTime")
		{
			return new Runtime.DateTime(value);
		}
		/* Struct */
		if (Runtime.rtl.is_instanceof(class_name, "Runtime.BaseStruct"))
		{
			value.remove("__class_name__");
			value = this.decodeDict(value);
			var object = Runtime.rtl.newInstance(class_name, Runtime.Vector.from([value]));
			return object;
		}
		/* Create object by class name */
		if (Runtime.rtl.exists(Runtime.rtl.find_class(class_name)) && Runtime.rtl.is_instanceof(class_name, "Runtime.BaseObject"))
		{
			return this.createObject(value, object_value, create);
		}
		return this.decodeDict(value);
	},
	/**
	 * Decode item from primitive data
	 */
	decodeItem: function(value, object_value, create)
	{
		if (object_value == undefined) object_value = null;
		if (create == undefined) create = null;
		if (value === null)
		{
			return null;
		}
		if (Runtime.rtl.isScalarValue(value))
		{
			return value;
		}
		if (value instanceof Runtime.BaseObject)
		{
			return value;
		}
		/* Decode object */
		if (this.allowObjects() && value instanceof Runtime.Dict && (value.has("__class_name__") || create))
		{
			return this.decodeObject(value, object_value, create);
		}
		return this.decodeItems(value, object_value);
	},
	/**
	 * Decode items
	 */
	decodeItems: function(value, object_value, create)
	{
		if (object_value == undefined) object_value = null;
		if (create == undefined) create = null;
		/* Decode Collection */
		if (value instanceof Runtime.Collection)
		{
			return this.decodeCollection(value, object_value, create);
		}
		else if (value instanceof Runtime.Dict)
		{
			return this.decodeDict(value, object_value, create);
		}
		return null;
	},
	/**
	 * Encode object
	 */
	encodeObject: function(value)
	{
		var new_value = null;
		/* Get new value */
		if (value instanceof Runtime.BaseStruct)
		{
			new_value = value.toMap();
		}
		else
		{
			new_value = Runtime.Map.from({});
		}
		/* Add class_name */
		if (this.allowObjects())
		{
			new_value.set("__class_name__", value.constructor.getClassName());
		}
		/* Get callback */
		var callback = null;
		if (this.callback_name != null)
		{
			var callback = new Runtime.Callback(value, this.callback_name);
			if (callback.exists())
			{
				callback = null;
			}
		}
		/* Apply object serialize */
		if (callback)
		{
			Runtime.rtl.apply(callback, Runtime.Vector.from([this,new_value]));
		}
		else if (Runtime.rtl.is_implements(value, Runtime.SerializeInterface))
		{
			value.serialize(this, new_value);
		}
		return new_value;
	},
	/**
	 * Encode date
	 */
	encodeDate: function(value)
	{
		value = value.toMap();
		if (this.allowObjects())
		{
			value.set("__class_name__", "Runtime.Date");
		}
		return value;
	},
	/**
	 * Encode date time
	 */
	encodeDateTime: function(value)
	{
		value = value.toMap();
		if (this.allowObjects())
		{
			value.set("__class_name__", "Runtime.DateTime");
		}
		return value;
	},
	/**
	 * Encode collection
	 */
	encodeCollection: function(value)
	{
		var new_value = Runtime.Vector.from([]);
		for (var i = 0; i < value.count(); i++)
		{
			var item = value.get(i);
			var new_item = this.encodeItem(item);
			new_value.push(new_item);
		}
		return new_value;
	},
	/**
	 * Encode dict
	 */
	encodeDict: function(value)
	{
		var new_value = Runtime.Map.from({});
		value.each((item, key) =>
		{
			var new_item = this.encodeItem(item);
			new_value.set(key, new_item);
		});
		return new_value;
	},
	/**
	 * Encode item to primitive data
	 */
	encodeItem: function(value)
	{
		if (value === null)
		{
			return null;
		}
		if (Runtime.rtl.isScalarValue(value))
		{
			return value;
		}
		/* Encode Collection or Dict */
		if (value instanceof Runtime.Collection)
		{
			return this.encodeCollection(value);
		}
		if (value instanceof Runtime.Dict)
		{
			return this.encodeDict(value);
		}
		/* Encode Object */
		if (value instanceof Runtime.Date)
		{
			return this.encodeDate(value);
		}
		else if (value instanceof Runtime.DateTime)
		{
			return this.encodeDateTime(value);
		}
		else if (value instanceof Runtime.BaseObject)
		{
			return this.encodeObject(value);
		}
		return null;
	},
	/**
	 * Export object to data
	 */
	encode: function(object)
	{
		this.setFlag(this.constructor.ENCODE);
		var res = this.encodeItem(object);
		this.removeFlag(this.constructor.ENCODE);
		return res;
	},
	/**
	 * Import from object
	 */
	decode: function(object)
	{
		this.setFlag(this.constructor.DECODE);
		var res = this.decodeItem(object);
		this.removeFlag(this.constructor.DECODE);
		return res;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.flags = 0;
		this.callback_name = null;
	},
});
Object.assign(Runtime.Serializer, Runtime.BaseObject);
Object.assign(Runtime.Serializer,
{
	ALLOW_OBJECTS: 1,
	ENCODE: 2,
	DECODE: 4,
	JSON_PRETTY: 8,
	/**
	 * Get attr
	 */
	getAttr: function(object, field_name)
	{
		if (object == null)
		{
			return null;
		}
		return field_name in object ? object[field_name] : null;
		return null;
	},
	/**
	 * Set attr
	 */
	setAttr: function(object, field_name, value)
	{
		object[field_name] = value;
	},
	/**
	 * Copy object
	 */
	copy: function(obj)
	{
		var serializer = Runtime.rtl.newInstance(this.getClassName());
		serializer.setFlag(this.ALLOW_OBJECTS);
		var encoded = serializer.encode(obj);
		return serializer.decode(encoded);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Serializer";
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
Runtime.rtl.defClass(Runtime.Serializer);
window["Runtime.Serializer"] = Runtime.Serializer;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Serializer;
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
Runtime.SerializerNative = function()
{
	Runtime.Serializer.apply(this, arguments);
};
Runtime.SerializerNative.prototype = Object.create(Runtime.Serializer.prototype);
Runtime.SerializerNative.prototype.constructor = Runtime.SerializerNative;
Object.assign(Runtime.SerializerNative.prototype,
{
	/**
	 * Decode item
	 */
	decodeItem: function(value, object_value, create)
	{
		if (object_value == undefined) object_value = null;
		if (create == undefined) create = null;
		if (value === null)
		{
			return null;
		}
		if (value instanceof Runtime.BaseObject)
		{
			return value;
		}
		/* Is native array */
		if (Array.isArray(value))
		{
			var _Vector = use("Runtime.Vector");
			value = _Vector.from(value);
		}
		
		else if (typeof value == 'object')
		{
			var _Map = use("Runtime.Map");
			value = _Map.from(value);
		}
		value = Runtime.Serializer.prototype.decodeItem.call(this, value, object_value, create);
		return value;
	},
	/**
	 * Encode item
	 */
	encodeItem: function(encode_value)
	{
		if (encode_value === null)
		{
			return null;
		}
		var value = Runtime.Serializer.prototype.encodeItem.call(this, encode_value);
		if (value instanceof Runtime.Collection)
		{
			return value.toArray();
		}
		if (value instanceof Runtime.Dict)
		{
			return value.toObject();
		}
		return value;
	},
});
Object.assign(Runtime.SerializerNative, Runtime.Serializer);
Object.assign(Runtime.SerializerNative,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.SerializerNative";
	},
	getParentClassName: function()
	{
		return "Runtime.Serializer";
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
Runtime.rtl.defClass(Runtime.SerializerNative);
window["Runtime.SerializerNative"] = Runtime.SerializerNative;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.SerializerNative;
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
Runtime.SerializerJson = function()
{
	Runtime.SerializerNative.apply(this, arguments);
};
Runtime.SerializerJson.prototype = Object.create(Runtime.SerializerNative.prototype);
Runtime.SerializerJson.prototype.constructor = Runtime.SerializerJson;
Object.assign(Runtime.SerializerJson.prototype,
{
	/**
	 * Export object to data
	 */
	encode: function(object)
	{
		this.setFlag(this.constructor.ENCODE);
		value = this.encodeItem(object);
		return JSON.stringify(value, (key, value) => {
			return value;
		});
	},
	/**
	 * Import from string
	 */
	decode: function(s)
	{
		this.setFlag(this.constructor.DECODE);
		try{
			var res = null;
			try
			{
				res = JSON.parse(s, (key, value) => {
					if (value == null) return value;
					var object = this.decodeItem(value);
					return object;
				});
			}
			catch (e)
			{
				if (e instanceof SyntaxError)
				{
					res = null;
				}
				else
				{
					throw e;
				}
			}
			return res;
		}
		catch(e)
		{
			throw e;
		}
		return null;
	},
});
Object.assign(Runtime.SerializerJson, Runtime.SerializerNative);
Object.assign(Runtime.SerializerJson,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.SerializerJson";
	},
	getParentClassName: function()
	{
		return "Runtime.SerializerNative";
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
Runtime.rtl.defClass(Runtime.SerializerJson);
window["Runtime.SerializerJson"] = Runtime.SerializerJson;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.SerializerJson;
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
Runtime.SerializerBase64 = function()
{
	Runtime.SerializerJson.apply(this, arguments);
};
Runtime.SerializerBase64.prototype = Object.create(Runtime.SerializerJson.prototype);
Runtime.SerializerBase64.prototype.constructor = Runtime.SerializerBase64;
Object.assign(Runtime.SerializerBase64.prototype,
{
	/**
	 * Export object to data
	 */
	encode: function(object)
	{
		var s = Runtime.SerializerJson.prototype.encode.bind(this)(object);
		return Runtime.rs.base64_encode(s);
	},
	/**
	 * Import from string
	 */
	decode: function(s)
	{
		s = Runtime.rs.base64_decode(s);
		return Runtime.SerializerJson.prototype.decode.bind(this)(s);
	},
});
Object.assign(Runtime.SerializerBase64, Runtime.SerializerJson);
Object.assign(Runtime.SerializerBase64,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.SerializerBase64";
	},
	getParentClassName: function()
	{
		return "Runtime.SerializerJson";
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
Runtime.rtl.defClass(Runtime.SerializerBase64);
window["Runtime.SerializerBase64"] = Runtime.SerializerBase64;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.SerializerBase64;
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
Runtime.ModuleDescription = function()
{
};
Object.assign(Runtime.ModuleDescription.prototype,
{
});
Object.assign(Runtime.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.12.1";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return null;
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Entity.Provider("output", "Runtime.Providers.OutputProvider"),new Runtime.Entity.Provider("hook", "Runtime.Providers.HookProvider")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.ModuleDescription";
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
Runtime.rtl.defClass(Runtime.ModuleDescription);
window["Runtime.ModuleDescription"] = Runtime.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ModuleDescription;
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
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Entity = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Entity.Entity.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Entity.Entity.prototype.constructor = Runtime.Entity.Entity;
Object.assign(Runtime.Entity.Entity.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.name = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Entity, Runtime.BaseStruct);
Object.assign(Runtime.Entity.Entity,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Entity";
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
		a.push("name");
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
Runtime.rtl.defClass(Runtime.Entity.Entity);
window["Runtime.Entity.Entity"] = Runtime.Entity.Entity;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Entity;
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
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Factory = function(name, params)
{
	if (params == undefined) params = null;
	Runtime.Entity.Entity.call(this, Runtime.Map.from({"name":name,"params":params}));
};
Runtime.Entity.Factory.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.Entity.Factory.prototype.constructor = Runtime.Entity.Factory;
Object.assign(Runtime.Entity.Factory.prototype,
{
	/**
	 * Factory
	 */
	factory: function()
	{
		return Runtime.rtl.newInstance(this.name, Runtime.Vector.from([this.params]));
	},
	_init: function()
	{
		Runtime.Entity.Entity.prototype._init.call(this);
		this.params = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "params")return this.params;
		return Runtime.Entity.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Factory, Runtime.Entity.Entity);
Object.assign(Runtime.Entity.Factory,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Factory";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Entity";
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
		a.push("params");
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
Runtime.rtl.defClass(Runtime.Entity.Factory);
window["Runtime.Entity.Factory"] = Runtime.Entity.Factory;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Factory;
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
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Hook = function(name, params)
{
	if (params == undefined) params = null;
	Runtime.Entity.Entity.call(this, Runtime.Map.from({"name":name,"params":params}));
};
Runtime.Entity.Hook.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.Entity.Hook.prototype.constructor = Runtime.Entity.Hook;
Object.assign(Runtime.Entity.Hook.prototype,
{
	/**
	 * Create hook instance
	 */
	createHook: function()
	{
		return Runtime.rtl.newInstance(this.name, Runtime.Vector.from([this.params]));
	},
	_init: function()
	{
		Runtime.Entity.Entity.prototype._init.call(this);
		this.params = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "params")return this.params;
		return Runtime.Entity.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Hook, Runtime.Entity.Entity);
Object.assign(Runtime.Entity.Hook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Hook";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Entity";
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
		a.push("params");
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
Runtime.rtl.defClass(Runtime.Entity.Hook);
window["Runtime.Entity.Hook"] = Runtime.Entity.Hook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Hook;
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
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Provider = function(name, value, params)
{
	if (value == undefined) value = null;
	if (params == undefined) params = null;
	if (value instanceof Runtime.Dict)
	{
		params = value;
		value = null;
	}
	if (value == null)
	{
		value = name;
	}
	Runtime.Entity.Entity.call(this, Runtime.Map.from({"name":name,"value":value,"params":params}));
};
Runtime.Entity.Provider.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.Entity.Provider.prototype.constructor = Runtime.Entity.Provider;
Object.assign(Runtime.Entity.Provider.prototype,
{
	/**
	 * Create provider
	 */
	createProvider: function()
	{
		var provider = null;
		var class_name = this.value;
		if (class_name == null)
		{
			class_name = this.name;
		}
		if (class_name instanceof Runtime.BaseProvider)
		{
			provider = class_name;
		}
		else if (Runtime.rtl.isString(class_name))
		{
			provider = Runtime.rtl.newInstance(class_name, Runtime.Vector.from([this.params]));
		}
		return provider;
	},
	_init: function()
	{
		Runtime.Entity.Entity.prototype._init.call(this);
		this.value = null;
		this.params = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "value")return this.value;
		else if (k == "params")return this.params;
		return Runtime.Entity.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Provider, Runtime.Entity.Entity);
Object.assign(Runtime.Entity.Provider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Provider";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Entity";
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
		a.push("value");
		a.push("params");
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
Runtime.rtl.defClass(Runtime.Entity.Provider);
window["Runtime.Entity.Provider"] = Runtime.Entity.Provider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Provider;
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
if (typeof Runtime.Hooks == 'undefined') Runtime.Hooks = {};
Runtime.Hooks.RuntimeHook = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
Runtime.Hooks.RuntimeHook.prototype = Object.create(Runtime.BaseHook.prototype);
Runtime.Hooks.RuntimeHook.prototype.constructor = Runtime.Hooks.RuntimeHook;
Object.assign(Runtime.Hooks.RuntimeHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.INIT)
		{
			return "init";
		}
		if (hook_name == this.constructor.START)
		{
			return "start";
		}
		if (hook_name == this.constructor.LAUNCHED)
		{
			return "launched";
		}
		if (hook_name == this.constructor.RUN)
		{
			return "run";
		}
		if (hook_name == this.constructor.ENV)
		{
			return "env";
		}
		return "";
	},
	/**
	 * Init context
	 */
	init: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Start context
	 */
	start: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Launched context
	 */
	launched: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Run entry point
	 */
	run: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Init context
	 */
	env: function(d)
	{
		return d;
	},
});
Object.assign(Runtime.Hooks.RuntimeHook, Runtime.BaseHook);
Object.assign(Runtime.Hooks.RuntimeHook,
{
	INIT: "runtime::init",
	START: "runtime::start",
	LAUNCHED: "runtime::launched",
	RUN: "runtime::run",
	ENV: "runtime::env",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Hooks.RuntimeHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseHook";
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
Runtime.rtl.defClass(Runtime.Hooks.RuntimeHook);
window["Runtime.Hooks.RuntimeHook"] = Runtime.Hooks.RuntimeHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Hooks.RuntimeHook;
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
Runtime.Providers.HookProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.Providers.HookProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Providers.HookProvider.prototype.constructor = Runtime.Providers.HookProvider;
Object.assign(Runtime.Providers.HookProvider.prototype,
{
	/**
	 * Init provider
	 */
	init: async function()
	{
		var hooks = Runtime.rtl.getContext().getEntities("Runtime.Entity.Hook");
		this.base_hooks = new Runtime.Vector();
		for (var i = 0; i < hooks.count(); i++)
		{
			var hook = Runtime.rtl.attr(hooks, i);
			var base_hook = hook.createHook();
			base_hook.hook = hook;
			base_hook.provider = this;
			base_hook.register_hooks();
			this.base_hooks.push(base_hook);
		}
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
		await Runtime.BaseProvider.prototype.start.bind(this)();
	},
	/**
	 * Register hook
	 */
	register: function(hook_name, obj, method_name, priority)
	{
		if (priority == undefined) priority = 100;
		if (!this.hooks.has(hook_name))
		{
			this.hooks.set(hook_name, new Runtime.Map());
		}
		var priorities = Runtime.rtl.attr(this.hooks, hook_name);
		if (!priorities.has(priority))
		{
			priorities.set(priority, new Runtime.Vector());
		}
		var methods_list = priorities.get(priority);
		methods_list.push(new Runtime.Callback(obj, method_name));
	},
	/**
	 * Remove hook
	 */
	remove: function(hook_name, obj, method_name, priority)
	{
		if (priority == undefined) priority = 100;
		if (!this.hooks.has(hook_name))
		{
			this.hooks.setValue(hook_name, new Runtime.Map());
		}
		var priorities = Runtime.rtl.attr(this.hooks, hook_name);
		if (!priorities.has(priority))
		{
			priorities.setValue(priority, new Runtime.Vector());
		}
		var methods_list = priorities.get(priority);
		var index = methods_list.find((info) =>
		{
			return info.obj == obj && info.name == method_name;
		});
		if (index > -1)
		{
			methods_list.removePosition(index);
		}
	},
	/**
	 * Returns method list
	 */
	getMethods: function(hook_name)
	{
		if (!this.hooks.has(hook_name))
		{
			return Runtime.Vector.from([]);
		}
		var res = new Runtime.Vector();
		var priorities = Runtime.rtl.attr(this.hooks, hook_name);
		var priorities_keys = priorities.keys().sort();
		for (var i = 0; i < priorities_keys.count(); i++)
		{
			var priority = Runtime.rtl.attr(priorities_keys, i);
			var methods_list = priorities.get(priority);
			res.appendItems(methods_list);
		}
		return res.toCollection();
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.base_hooks = Runtime.Vector.from([]);
		this.hooks = new Runtime.Map();
	},
});
Object.assign(Runtime.Providers.HookProvider, Runtime.BaseProvider);
Object.assign(Runtime.Providers.HookProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Providers";
	},
	getClassName: function()
	{
		return "Runtime.Providers.HookProvider";
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
Runtime.rtl.defClass(Runtime.Providers.HookProvider);
window["Runtime.Providers.HookProvider"] = Runtime.Providers.HookProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Providers.HookProvider;
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
Runtime.Web.ApiResult = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.ApiResult.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.ApiResult.prototype.constructor = Runtime.Web.ApiResult;
Object.assign(Runtime.Web.ApiResult.prototype,
{
	/**
	 * Returns true if error
	 */
	isError: function()
	{
		return this.code < 0;
	},
	/**
	 * Returns true if is exception
	 */
	isException: function()
	{
		return this.is_exception;
	},
	/**
	 * Returns true if success
	 */
	isSuccess: function()
	{
		return this.code > 0;
	},
	/**
	 * Get error message
	 */
	getErrorMessage: function()
	{
		return this.message;
	},
	/**
	 * Get error code
	 */
	getErrorCode: function()
	{
		return this.code;
	},
	/**
	 * Returns content
	 */
	getContent: function()
	{
		var res = Runtime.Map.from({"api_name":this.api_name,"method_name":this.method_name,"code":this.code,"message":this.message,"data":this.data});
		if (this.error_name != "")
		{
			res.set("error_name", this.error_name);
		}
		if (this.error_file != "")
		{
			res.set("error_file", this.error_file);
		}
		if (this.error_line != "")
		{
			res.set("error_line", this.error_line);
		}
		if (this.error_pos != "")
		{
			res.set("error_pos", this.error_pos);
		}
		if (this.error_trace != "")
		{
			res.set("error_trace", this.error_trace);
		}
		return res;
	},
	/**
	 * Import content
	 */
	importContent: function(content)
	{
		this.api_name = content.get("api_name", "");
		this.method_name = content.get("method_name", "");
		this.data = content.get("data", null);
		this.code = content.get("code", -1);
		this.message = content.get("message", "Unknown error");
		this.ob_content = content.get("ob_content", "");
		this.error_name = content.get("error_name", "");
		this.error_file = content.get("error_file", "");
		this.error_line = content.get("error_line", "");
		this.error_pos = content.get("error_pos", "");
	},
	/**
	 * Set data
	 */
	setData: function(data)
	{
		if (data == null)
		{
			return ;
		}
		if (data instanceof Runtime.Dict)
		{
			var keys = data.keys();
			for (var i = 0; i < keys.count(); i++)
			{
				var key = keys.get(i);
				this.data.set(key, data.get(key));
			}
		}
		else
		{
			this.data = data;
		}
	},
	/**
	 * Setup success
	 */
	success: function(data)
	{
		if (data == undefined) data = null;
		this.code = Runtime.rtl.ERROR_OK;
		this.message = "Ok";
		if (!data)
		{
			return ;
		}
		/* Set code */
		if (data.has("code"))
		{
			this.code = Runtime.rtl.attr(data, "code");
		}
		else
		{
			this.code = Runtime.rtl.ERROR_OK;
		}
		/* Set message */
		if (data.has("message"))
		{
			this.message = Runtime.rtl.attr(data, "message");
		}
		else
		{
			this.message = "Ok";
		}
		/* Set data */
		if (data.has("data"))
		{
			this.setData(Runtime.rtl.attr(data, "data"));
		}
	},
	/**
	 * Setup exception
	 */
	exception: function(e)
	{
		this.code = e.getErrorCode();
		this.message = e.getErrorMessage();
		this.error_name = e.constructor.getClassName();
		this.error_file = e.getFileName();
		this.error_line = e.getErrorLine();
		this.error_pos = e.getErrorPos();
		if (Runtime.rtl.getContext().env("DEBUG"))
		{
			this.error_trace = e.getTraceCollection();
		}
		this.is_exception = true;
	},
	/**
	 * Setup fail
	 */
	fail: function(data)
	{
		if (data == undefined) data = null;
		this.code = Runtime.rtl.ERROR_UNKNOWN;
		this.message = "Unknown error";
		if (data instanceof Runtime.Exceptions.AbstractException)
		{
			this.code = data.getErrorCode();
			this.message = data.getErrorMessage();
			this.error_name = data.constructor.getClassName();
		}
		else if (data instanceof Runtime.Dict)
		{
			/* Set code */
			if (data.has("code"))
			{
				this.code = Runtime.rtl.attr(data, "code");
			}
			else
			{
				this.code = Runtime.rtl.ERROR_UNKNOWN;
			}
			/* Set message */
			if (data.has("message"))
			{
				this.message = Runtime.rtl.attr(data, "message");
			}
			else
			{
				this.message = "Error";
			}
			/* Set data */
			if (data.has("data"))
			{
				this.setData(Runtime.rtl.attr(data, "data"));
			}
		}
		else
		{
			this.code = Runtime.rtl.ERROR_UNKNOWN;
			this.message = "Error";
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.code = 0;
		this.message = "";
		this.data = Runtime.Map.from({});
		this.api_name = "";
		this.method_name = "";
		this.ob_content = "";
		this.error_name = null;
		this.error_file = "";
		this.error_line = "";
		this.error_pos = 0;
		this.error_trace = null;
		this.is_exception = false;
	},
});
Object.assign(Runtime.Web.ApiResult, Runtime.BaseObject);
Object.assign(Runtime.Web.ApiResult,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.ApiResult";
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
Runtime.rtl.defClass(Runtime.Web.ApiResult);
window["Runtime.Web.ApiResult"] = Runtime.Web.ApiResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.ApiResult;
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
Runtime.Web.BaseApp = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.BaseApp.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.BaseApp.prototype.constructor = Runtime.Web.BaseApp;
Object.assign(Runtime.Web.BaseApp.prototype,
{
	/**
	 * Init app
	 */
	init: async function()
	{
	},
	/**
	 * Start app
	 */
	start: async function()
	{
	},
	/**
	 * Run Web Application
	 */
	main: async function()
	{
		return Promise.resolve(0);
	},
	/**
	 * Create render container
	 */
	createRenderContainer: function()
	{
		var container = new Runtime.Web.RenderContainer();
		/* Create layout */
		Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.CREATE_CONTAINER, Runtime.Map.from({"container":container}));
		return container;
	},
	/**
	 * Create request
	 */
	createRequest: function()
	{
		return null;
	},
});
Object.assign(Runtime.Web.BaseApp, Runtime.BaseObject);
Object.assign(Runtime.Web.BaseApp,
{
	/**
	 * Create request
	 */
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BaseApp";
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
Runtime.rtl.defClass(Runtime.Web.BaseApp);
window["Runtime.Web.BaseApp"] = Runtime.Web.BaseApp;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BaseApp;
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
Runtime.Web.BaseModel = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	/* Setup widget params */
	this.initParams(params);
	/* Init widget settings */
	this.initWidget(params);
	if (this.layout != null && this.component != "")
	{
		this.layout.addComponent(this.component);
	}
};
Runtime.Web.BaseModel.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.BaseModel.prototype.constructor = Runtime.Web.BaseModel;
Object.assign(Runtime.Web.BaseModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		if (params == null)
		{
			return ;
		}
		if (params.has("layout"))
		{
			this.layout = params.get("layout");
		}
		if (params.has("component"))
		{
			this.component = params.get("component");
		}
		if (params.has("widget_name"))
		{
			this.widget_name = params.get("widget_name");
		}
		if (params.has("events"))
		{
			var events = params.get("events");
			events.each((f, message_name) =>
			{
				this.addListener(message_name, f);
			});
		}
		if (params.has("parent_widget"))
		{
			var parent_widget = params.get("parent_widget");
			this.layout = parent_widget.layout;
			this.parent_widget = parent_widget;
			parent_widget.widgets.set(this.widget_name, this);
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
	},
	/**
	 * Create model
	 */
	createModel: function(params, default_model)
	{
		if (default_model == undefined) default_model = "";
		var model = null;
		if (Runtime.rtl.isString(params))
		{
			model = this.addWidget(params);
		}
		else if (params instanceof Runtime.Web.BaseModel)
		{
			model = params;
		}
		else if (params instanceof Runtime.Web.ModelFactory)
		{
			model = params.factory(this);
		}
		else if (params instanceof Runtime.Entity.Factory)
		{
			model = params.factory();
		}
		else if (params instanceof Runtime.Dict)
		{
			if (params.has("factory"))
			{
				model = this.createModel(params.get("factory"));
			}
			else
			{
				var class_name = params.get("model", default_model);
				model = this.addWidget(class_name, params);
			}
		}
		return model;
	},
	/**
	 * Add widget
	 */
	addWidget: function(class_name, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = Runtime.Map.from({});
		}
		params.set("parent_widget", this);
		var widget = Runtime.rtl.newInstance(class_name, Runtime.Vector.from([params]));
		return widget;
	},
	/**
	 * Returns widget by name
	 */
	getWidget: function(widget_name)
	{
		return this.widgets.get(widget_name);
	},
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return this.widget_name;
	},
	/**
	 * Clear listeners
	 */
	clearListener: function(message_name)
	{
		var chain = new Runtime.Chain();
		chain.setReturnValue(false);
		this.listeners.set(message_name, chain);
	},
	/**
	 * Add listener
	 */
	addListener: function(message_name, f, priority)
	{
		if (priority == undefined) priority = 100;
		if (!this.listeners.has(message_name))
		{
			this.clearListener(message_name);
		}
		if (Runtime.rtl.isCallable(f))
		{
			var chain = this.listeners.get(message_name);
			chain.add(f, priority);
			chain.sort();
		}
	},
	/**
	 * Emit message
	 */
	emit: function(message)
	{
		if (message.widget == null)
		{
			message.widget = this;
		}
		this.emitMessage(message.constructor.getClassName(), message);
		this.emitMessage(message.name, message);
	},
	/**
	 * Emit message
	 */
	emitMessage: function(message_name, message)
	{
		if (!this.listeners.has(message_name))
		{
			return ;
		}
		var chain = this.listeners.get(message_name);
		chain.apply(message);
	},
	/**
	 * Async emit message
	 */
	emitAsync: async function(message)
	{
		if (message.widget == null)
		{
			message.widget = this;
		}
		await this.emitMessageAsync(message.constructor.getClassName(), message);
		await this.emitMessageAsync(message.name, message);
	},
	/**
	 * Async emit message
	 */
	emitMessageAsync: async function(message_name, message)
	{
		if (!this.listeners.has(message_name))
		{
			return Promise.resolve();
		}
		var chain = this.listeners.get(message_name);
		await chain.applyAsync(message);
	},
	/**
	 * Load data
	 */
	loadData: async function(container)
	{
		if (this.is_data_loaded)
		{
			return Promise.resolve();
		}
		var widgets_keys = this.widgets.keys();
		for (var i = 0; i < widgets_keys.count(); i++)
		{
			var widget_key = widgets_keys.get(i);
			var widget = this.widgets.get(widget_key);
			if (widget instanceof Runtime.Web.BaseModel)
			{
				await widget.loadData(container);
			}
		}
		this.is_data_loaded = true;
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "component", data);
		serializer.process(this, "widget_name", data);
		serializer.processItems(this, "widgets", data, this.serializeCreateWidget.bind(this));
		serializer.process(this, "is_data_loaded", data);
	},
	/**
	 * Process frontend data
	 */
	serializeCreateWidget: function(serializer, data)
	{
		var class_name = data.get("__class_name__");
		var widget_name = data.get("widget_name");
		/* If BaseModel */
		if (Runtime.rtl.is_instanceof(class_name, "Runtime.Web.BaseModel"))
		{
			var widget = this.widgets.get(widget_name);
			if (widget != null)
			{
				return widget;
			}
			return this.addWidget(class_name, Runtime.Map.from({"widget_name":widget_name}));
		}
		/* Create object */
		return Runtime.rtl.newInstance(class_name);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.parent_widget = null;
		this.layout = null;
		this.component = "";
		this.widget_name = "";
		this.listeners = Runtime.Map.from({});
		this.widgets = Runtime.Map.from({});
		this.is_data_loaded = false;
	},
});
Object.assign(Runtime.Web.BaseModel, Runtime.BaseObject);
Object.assign(Runtime.Web.BaseModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.Web.BaseModel);
window["Runtime.Web.BaseModel"] = Runtime.Web.BaseModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BaseModel;
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
Runtime.Web.BaseLayoutModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Web.BaseLayoutModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Web.BaseLayoutModel.prototype.constructor = Runtime.Web.BaseLayoutModel;
Object.assign(Runtime.Web.BaseLayoutModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		this.layout = this;
		if (params == null)
		{
			return ;
		}
		if (params.has("backend_storage"))
		{
			this.backend_storage = params.get("backend_storage");
		}
		if (params.has("route"))
		{
			this.route = params.get("route");
		}
	},
	/**
	 * Route before
	 */
	onActionBefore: async function(container)
	{
	},
	/**
	 * Route after
	 */
	onActionAfter: async function(container)
	{
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "components", data);
		serializer.process(this, "current_page_class", data);
		serializer.process(this, "current_page_model", data);
		serializer.process(this, "content_type", data);
		serializer.process(this, "f_inc", data);
		serializer.process(this, "locale", data);
		serializer.process(this, "layout_name", data);
		serializer.process(this, "request_full_uri", data);
		serializer.process(this, "request_host", data);
		serializer.process(this, "request_https", data);
		serializer.process(this, "request_query", data);
		serializer.process(this, "request_uri", data);
		serializer.process(this, "route", data);
		serializer.process(this, "routes", data);
		serializer.process(this, "title", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Returns page model
	 */
	getPageModel: function()
	{
		return this.widgets.get(this.current_page_model);
	},
	/**
	 * Returns page class name
	 */
	getPageClassName: function()
	{
		return this.current_page_class;
	},
	/**
	 * Set current page model
	 */
	setPageModel: function(class_name)
	{
		var page_model = this.getWidget(class_name);
		/* Create page model */
		if (page_model == null)
		{
			page_model = this.addWidget(class_name, Runtime.Map.from({"widget_name":class_name}));
		}
		/* Change current page model */
		this.current_page_model = class_name;
		return page_model;
	},
	/**
	 * Set layout name
	 */
	setLayoutName: function(layout_name)
	{
		this.layout_name = layout_name;
	},
	/**
	 * Set page title
	 */
	setPageTitle: function(title)
	{
		this.title = title;
	},
	/**
	 * Returns full page title
	 */
	getFullTitle: function()
	{
		return this.title;
	},
	/**
	 * Returns locale
	 */
	getLocale: function()
	{
		return this.locale;
	},
	/**
	 * Returns site name
	 */
	getSiteName: function()
	{
		return "";
	},
	/**
	 * Returns layout component name
	 */
	getLayoutComponentName: function()
	{
		var class_name = this.component;
		var params = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.LAYOUT_COMPONENT_NAME, Runtime.Map.from({"layout":this,"layout_name":this.layout_name,"class_name":class_name}));
		return Runtime.rtl.attr(params, "class_name");
	},
	/**
	 * Returns Core UI
	 */
	getCoreUI: function()
	{
		return "Runtime.Web.CoreUI";
	},
	/**
	 * Call Api
	 */
	callApi: async function(params)
	{
		/* Returns bus */
		var bus = Runtime.Web.Bus.getApi(params.get("service", "app"));
		var api = await bus.send(params);
		return Promise.resolve(api);
	},
	/**
	 * Returns header components
	 */
	getHeaderComponents: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns body components
	 */
	getBodyComponents: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns footer components
	 */
	getFooterComponents: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Add component
	 */
	addComponent: function(class_name)
	{
		if (this.components.indexOf(class_name) == -1)
		{
			this.components.push(class_name);
		}
	},
	/**
	 * Returns all components
	 * @return Collection<string>
	 */
	getComponents: function(components)
	{
		if (components == undefined) components = null;
		if (components == null)
		{
			components = Runtime.Vector.from([]);
		}
		var res = new Runtime.Vector();
		var cache = new Runtime.Map();
		components = components.concat(this.components);
		components.push(this.getLayoutComponentName());
		/* Call hook */
		var d = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.COMPONENTS, Runtime.Map.from({"layout":this,"components":components}));
		/* Get new components */
		components = d.get("components");
		/* Extends components */
		this.constructor._getRequiredComponents(res, cache, components);
		return res.removeDuplicates();
	},
	/**
	 * Returns assets
	 */
	assets: function(path)
	{
		return Runtime.Web.Component.assets(path);
	},
	/**
	 * Returns url
	 */
	url: function(route_name, route_params, url_params)
	{
		if (route_params == undefined) route_params = null;
		if (url_params == undefined) url_params = null;
		if (!this.routes.has(route_name))
		{
			return null;
		}
		var route = this.routes.get(route_name);
		var domain = route.get("domain");
		var url = route.get("uri");
		if (route_params != null && url != null)
		{
			route_params.each((value, key) =>
			{
				var pos = Runtime.rs.indexOf(url, "{" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("}"));
				if (pos >= 0)
				{
					url = Runtime.rs.replace("{" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("}"), value, url);
				}
				else
				{
					url = Runtime.rs.url_get_add(url, key, value);
				}
			});
		}
		/* Set url */
		if (url == null)
		{
			url = "";
		}
		/* Add domain */
		var url_with_domain = url;
		if (domain)
		{
			url_with_domain = "//" + Runtime.rtl.toStr(domain) + Runtime.rtl.toStr(url);
		}
		/* Make url */
		var res = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.MAKE_URL, Runtime.Map.from({"domain":domain,"layout":this,"route":route,"route_name":route_name,"route_params":route_params,"url":url,"url_with_domain":url_with_domain,"url_params":(url_params) ? (url_params) : (Runtime.Map.from({}))}));
		var is_domain = (url_params) ? (url_params.get("domain", true)) : (true);
		return (is_domain) ? (res.get("url_with_domain")) : (res.get("url"));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Web.DefaultLayout";
		this.title = "";
		this.locale = Runtime.rtl.getContext().env("LOCALE");
		this.layout_name = "default";
		this.current_page_class = "";
		this.current_page_model = "";
		this.content_type = "UTF-8";
		this.route = null;
		this.request_full_uri = "";
		this.request_host = "";
		this.request_https = "";
		this.request_uri = "";
		this.request_query = null;
		this.components = Runtime.Vector.from([]);
		this.routes = Runtime.Map.from({});
		this.f_inc = "1";
	},
});
Object.assign(Runtime.Web.BaseLayoutModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Web.BaseLayoutModel,
{
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredComponents: function(res, cache, components)
	{
		if (components == null)
		{
			return ;
		}
		for (var i = 0; i < components.count(); i++)
		{
			var class_name = components.item(i);
			if (class_name == "")
			{
				continue;
			}
			if (!cache.has(class_name))
			{
				cache.set(class_name, true);
				var f = new Runtime.Callback(class_name, "components");
				if (f.exists())
				{
					var sub_components = Runtime.rtl.apply(f);
					this._getRequiredComponents(res, cache, sub_components);
				}
				res.push(class_name);
			}
		}
	},
	/**
	 * Returns css
	 */
	getCss: function(components, css_vars)
	{
		if (css_vars == undefined) css_vars = null;
		if (css_vars == null)
		{
			css_vars = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.CSS_VARS, css_vars);
		}
		var css = components.map((component_name) =>
		{
			if (component_name == "")
			{
				return "";
			}
			var f = new Runtime.Callback(component_name, "css");
			if (!f.exists())
			{
				return "";
			}
			var css = Runtime.rtl.apply(f, Runtime.Vector.from([css_vars]));
			return css;
		});
		css = css.map((s) =>
		{
			return Runtime.rs.trim(s);
		}).filter((s) =>
		{
			return s != "";
		});
		return Runtime.rs.trim(Runtime.rs.join("\n", css));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BaseLayoutModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Web.BaseLayoutModel);
window["Runtime.Web.BaseLayoutModel"] = Runtime.Web.BaseLayoutModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BaseLayoutModel;
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
Runtime.Web.Bus = function()
{
};
Object.assign(Runtime.Web.Bus.prototype,
{
});
Object.assign(Runtime.Web.Bus,
{
	/**
	 * Returns BusInterface
	 */
	getApi: function(service)
	{
		return new Runtime.Web.BusHttp();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Bus";
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
Runtime.rtl.defClass(Runtime.Web.Bus);
window["Runtime.Web.Bus"] = Runtime.Web.Bus;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Bus;
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
Runtime.Web.BusHttp = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.BusHttp.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.BusHttp.prototype.constructor = Runtime.Web.BusHttp;
Object.assign(Runtime.Web.BusHttp.prototype,
{
	/**
	 * Send api to frontend
	 */
	send: async function(params)
	{
		var service = params.get("service", "app");
		var api_name = params.get("api_name", "");
		var method_name = params.get("method_name", "");
		var data = params.get("data", null);
		var route_prefix = Runtime.rtl.getContext().env("ROUTE_PREFIX");
		route_prefix = Runtime.rs.removeFirstSlash(route_prefix);
		var api_url_arr = Runtime.Vector.from([route_prefix,this.kind,service,api_name,method_name]);
		api_url_arr = api_url_arr.filter((s) =>
		{
			return s != "";
		});
		var api_url = "/" + Runtime.rtl.toStr(api_url_arr.join("/")) + Runtime.rtl.toStr("/");
		var res = new Runtime.Web.ApiResult();
		try
		{
			var post_data = Runtime.Map.from({"service":service,"api_name":api_name,"method_name":method_name,"data":data});
			/* Call api before hook */
			var d = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.CALL_API_BEFORE, Runtime.Map.from({"api_url":api_url,"post_data":post_data,"params":params}));
			api_url = d.get("api_url");
			post_data = d.get("post_data");
			/* Send curl */
			var curl = new Runtime.Curl(api_url, Runtime.Map.from({"post":post_data}));
			var response = await curl.send();
			/* Get answer */
			var answer = Runtime.rtl.json_decode(response, Runtime.rtl.ALLOW_OBJECTS);
			if (answer && answer instanceof Runtime.Dict)
			{
				res.importContent(answer);
			}
			else
			{
				res.exception(new Runtime.Exceptions.AbstractException("Api response error"));
			}
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.CurlException)
			{
				var e = _ex;
				
				res.exception(e);
				res.ob_content = e.http_content;
				if (Runtime.rtl.getContext().env("DEBUG"))
				{
					Runtime.io.print_error(e.http_content);
				}
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.kind = "api";
	},
});
Object.assign(Runtime.Web.BusHttp, Runtime.BaseObject);
Object.assign(Runtime.Web.BusHttp,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BusHttp";
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
	__implements__:
	[
		Runtime.Web.BusInterface,
	],
});
Runtime.rtl.defClass(Runtime.Web.BusHttp);
window["Runtime.Web.BusHttp"] = Runtime.Web.BusHttp;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BusHttp;
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
Runtime.Web.BusInterface = function()
{
};
Object.assign(Runtime.Web.BusInterface.prototype,
{
	/**
	 * Send request
	 */
	send: async function(params)
	{
	},
});
Object.assign(Runtime.Web.BusInterface,
{
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BusInterface";
	},
});
Runtime.rtl.defClass(Runtime.Web.BusInterface);
window["Runtime.Web.BusInterface"] = Runtime.Web.BusInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BusInterface;
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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Component = {
	name: "Runtime.Web.Component",
	props: {
		"class": {
			default: "",
		},
		"data": {
			default: null,
		},
		"data_widget_path": {
			default: null,
		},
		"model": {
			default: null,
		},
		"render_list": {
			default: null,
		},
	},
	data: function ()
	{
		return {
			render_cache: new Runtime.Map(),
		};
	},
	methods:
	{
		renderWidget: function(widget, props)
		{
			if (props == undefined) props = null;
			let __v = [];
			
			if (widget)
			{
				let component = widget.component;
				
				if (component)
				{
					/* Component '{component}' */
					let __v0 = this._c(__v, component, this._merge_attrs({"model":this._model(widget)}, props));
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderSlot("default"));
			
			return this._flatten(__v);
		},
		/**
 * Returns true if first in render list
 */
		isFirstInRenderList: function()
		{
			return (this.render_list != null && this.render_list.has("first")) ? (this.render_list.get("first")) : (false);
		},
		/**
 * Returns false if first in render list
 */
		isLastInRenderList: function()
		{
			return (this.render_list != null && this.render_list.has("last")) ? (this.render_list.get("last")) : (false);
		},
		/**
 * Returns position in render list
 */
		positionInRenderList: function()
		{
			return (this.render_list != null && this.render_list.has("position")) ? (this.render_list.get("position")) : (-1);
		},
		/**
 * Returns class name for render list item
 */
		renderListClass: function()
		{
			if (this.render_list == null)
			{
				return ;
			}
			var class_name = Runtime.Vector.from([]);
			if (this.render_list.has("position"))
			{
				class_name.push("item--" + Runtime.rtl.toStr(this.render_list.get("position")));
			}
			if (this.render_list.has("first") && this.render_list.get("first"))
			{
				class_name.push("item--first");
			}
			if (this.render_list.has("last") && this.render_list.get("last"))
			{
				class_name.push("item--last");
			}
			return Runtime.rs.join(" ", class_name);
		},
		/**
 * Returns true slot if is exists
 */
		checkSlot: function(slot_name)
		{
			let f = this.$slots[slot_name];
	if (f == null || f == undefined) return false;
	return true;
		},
		/**
 * Render slot
 */
		renderSlot: function(slot_name)
		{
			let f = this.$slots[slot_name];
	if (f == null || f == undefined) return null;
	return f();
		},
		/**
 * Returns component key path
 */
		getKeyPath: function()
		{
			var result = Runtime.Vector.from([]);
			var component = this;
			while (component != null)
			{
				result.push(this.key);
				component = component.getParent();
			}
			return result;
		},
		/**
 * Parent component
 */
		getParent: function()
		{
			return this.$parent;
		},
		/**
 * Returns ref
 */
		getRef: function(name)
		{
			return this.$refs[name];
		},
		/**
 * Returns props
 */
		getProps: function()
		{
			return this.$props;
		},
		/**
 * Emit message
 */
		emit: function(event, obj)
		{
			if (obj == undefined) obj = null;
			this.$emit.apply(this, arguments);
		},
		/**
 * Reload component
 */
		reload: function(event, obj)
		{
			if (obj == undefined) obj = null;
			this.$forceUpdate();
		},
		/**
 * Init widget settings
 */
		initWidget: function()
		{
		},
		/**
 * Created
 */
		onCreated: function()
		{
		},
		/**
 * Before mount
 */
		onBeforeMount: function()
		{
		},
		/**
 * Mounted
 */
		onMounted: function()
		{
		},
		/**
 * Before update
 */
		onBeforeUpdate: function()
		{
		},
		/**
 * Updated
 */
		onUpdated: function()
		{
		},
		/**
 * Before Unmount
 */
		onBeforeUnmount: function()
		{
		},
		/**
 * Unmounted
 */
		onUnmount: function()
		{
		},
		/**
 * Next tick
 */
		nextTick: async function(f)
		{
			var Vue = Runtime.rtl.attr(window, "Vue");
			await Vue.nextTick(f);
		},
		/**
 * Returns model for component
 */
		_model: function(obj, is_global)
		{
			if (obj == undefined) obj = null;
			if (is_global == undefined) is_global = false;
			if (obj instanceof Runtime.Collection)
			{
				if (obj.count() == 0)
				{
					return this.model;
				}
				if (is_global)
				{
					return this.layout.model(obj);
				}
				return Runtime.rtl.attr(this.model, obj);
			}
			return obj;
		},
		/**
 * Returns component class name
 */
		_class_name: function(names)
		{
			names.push(this.$options.getCssHash(this.$options.getClassName()));
	names = names.filter((s) => s != "");
	return names.join(" ");
		},
		/**
 * Merge attrs
 */
		_merge_attrs: function(attr1, attr2)
		{
			if (attr2 == null)
			{
				return attr1;
			}
			return Object.assign({}, attr1, attr2.toObject());
		},
		/**
 * Filter attrs
 */
		_filter_attrs: function(attrs)
		{
			var new_attrs = {};
	Object.entries(attrs).forEach((arr)=>{
		var key = arr[0];
		var value = arr[1];
		if (key == "@key_debug" && new_attrs["key"] == undefined)
		{
			new_attrs["key"] = value;
			return;
		}
		if (key.charAt(0) == "@") return;
		new_attrs[key] = value;
	});
	return new_attrs;
		},
		/**
 * Escape html
 */
		_escape: function(s)
		{
			if (Runtime.rtl.isScalarValue(s))
			{
				return Runtime.rs.htmlEscape(s);
			}
			return "";
		},
		/**
 * Render text
 */
		_t: function(parent_elem, content)
		{
			if (content == undefined) content = null;
			if (content == null)
			{
				return ;
			}
			if (content instanceof Array && content.length == 0) return;
	if (Runtime.rtl.isScalarValue(content)) content = "" + content;
	this._parent_elem_push(parent_elem, content);
		},
		/**
 * Render element
 */
		_e: function(parent_elem, elem_name, attrs, content)
		{
			if (elem_name == undefined) elem_name = null;
			if (attrs == undefined) attrs = null;
			if (content == undefined) content = null;
			var elem = null;
			attrs = this._filter_attrs(attrs);
	elem = Vue.h(elem_name, attrs);
	this._parent_elem_push(parent_elem, elem);
			return elem;
		},
		/**
 * Render component
 */
		_c: function(parent_elem, component_name, attrs, content)
		{
			if (component_name == undefined) component_name = null;
			if (attrs == undefined) attrs = null;
			if (content == undefined) content = null;
			var elem = null;
			let component = null;
	if (component_name == "Transition") component = Vue.Transition;
	else if (component_name == "TransitionGroup") component = Vue.TransitionGroup;
	else component = use(component_name);
	if (!component)
	{
		throw new Runtime.Exceptions.ItemNotFound(component_name);
	}
	
	attrs = this._filter_attrs(attrs);
	elem = Vue.h(component, attrs, content);
	this._parent_elem_push(parent_elem, elem);
			return elem;
		},
		/**
 * Push to parent elem
 */
		_parent_elem_push: function(parent_elem, elem)
		{
			if (parent_elem instanceof Array)
	{
		if (elem instanceof Array)
		{
			for (let i=0; i<elem.length; i++) parent_elem.push(elem[i]);
		}
		else
		{
			parent_elem.push(elem);
		}
	}
	else if (typeof parent_elem == "object")
	{
		if (elem instanceof Array)
		{
			if (parent_elem.children == null)
			{
				parent_elem.children = [];
				parent_elem.shapeFlag = 17;
			}
			for (let i=0; i<elem.length; i++) parent_elem.children.push(elem[i]);
		}
		else if (elem instanceof Runtime.RawString)
		{
			if (parent_elem.props == undefined || parent_elem.props == null)
			{
				parent_elem.props = {};
			}
			parent_elem.props["innerHTML"] = elem.toString();
		}
		else if (typeof elem == "string")
		{
			if (parent_elem.children == null)
			{
				parent_elem.children = "";
				parent_elem.shapeFlag = 9;
			}
			if (parent_elem.children instanceof Array)
			{
				parent_elem.children.push(elem);
			}
			else
			{
				parent_elem.children += elem;
			}
		}
		else if (typeof elem == "object")
		{
			if (parent_elem.children == null)
			{
				parent_elem.children = [];
				parent_elem.shapeFlag = 17;
			}
			if (typeof parent_elem.children == "string")
			{
				parent_elem.children = [parent_elem.children];
				parent_elem.shapeFlag = 17;
			}
			parent_elem.children.push(elem);
		}
	}
		},
		/**
 * Flatten elements
 */
		_flatten: function(arr, detect_multiblock)
		{
			if (detect_multiblock == undefined) detect_multiblock = true;
			if (arr.length == 0) return null;
	if (arr.length == 1) return arr[0];
	return arr;
		},
		/**
 * Teleport
 */
		_teleport: function(parent_elem, attrs, content)
		{
			if (attrs == undefined) attrs = null;
			if (content == undefined) content = null;
			if (attrs.to == undefined) attrs["to"] = ".teleports";
	let elem = Vue.h(Vue.Teleport, attrs, []);
	this._parent_elem_push(parent_elem, elem);
	
	return elem;
		},
	},
};
Object.assign(Runtime.Web.Component,
{
	/**
 * Before create
 */
	onBeforeCreate: function()
	{
	},
	/**
 * Returns styles
 */
	getStyles: function(class_name, styles)
	{
		return styles.map((item) =>
		{
			return (Runtime.rs.charAt(item, 0) != "@") ? (class_name + Runtime.rtl.toStr("--") + Runtime.rtl.toStr(item)) : (Runtime.rs.substr(item, 1));
		}).join(" ");
	},
	/**
 * Returns components
 */
	components: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
 * Returns assets
 */
	assets: function(path)
	{
		var params = Runtime.Map.from({});
		Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.ASSETS, params);
		var path = Runtime.rs.join_path(Runtime.Vector.from([params.get("assets_path", ""),path]));
		return Runtime.rs.addFirstSlash(path);
	},
	/**
 * Returns css hash
 */
	getCssHash: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.Component.getCssHash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __v0 = new Runtime.Monad(Runtime.rtl.getParents(class_name));
		__v0 = __v0.callMethod("toVector", []);
		__v0 = __v0.callMethod("prepend", [class_name]);
		__v0 = __v0.callMethod("filter", [(class_name) =>
		{
			return class_name != "Runtime.BaseObject" && class_name != "Runtime.Web.Component" && class_name != "";
		}]);
		__v0 = __v0.callMethod("map", [(class_name) =>
		{
			return "h-" + Runtime.rtl.toStr(this.hash(class_name));
		}]);
		__v0 = __v0.call(Runtime.lib.join(" "));
		var __memorize_value = __v0.value();
		Runtime.rtl._memorizeSave("Runtime.Web.Component.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
 * Retuns css hash
 * @param string component class name
 * @return string hash
 */
	hash: function(s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.Component.hash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var h = Runtime.rs.hash(s, true, 337, 65537) + 65537;
		var res = Runtime.rs.toHex(h);
		var __memorize_value = Runtime.rs.substr(res, -4);
		Runtime.rtl._memorizeSave("Runtime.Web.Component.hash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
 * Is component
 */
	isComponent: function(tag_name)
	{
		var ch1 = Runtime.rs.substr(tag_name, 0, 1);
		var ch2 = Runtime.rs.upper(ch1);
		return tag_name != "" && (ch1 == "{" || ch1 == ch2);
	},
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Component";
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
Runtime.rtl.defClass(Runtime.Web.Component);
window["Runtime.Web.Component"] = Runtime.Web.Component;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Component;
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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.DefaultLayout = {
	name: "Runtime.Web.DefaultLayout",
	extends: Runtime.Web.Component,
	methods:
	{
		renderCurrentPage: function()
		{
			let __v = [];
			let current_page = this.layout.getPageClassName();
			let current_page_model = this.layout.current_page_model;
			
			if (current_page)
			{
				if (current_page_model)
				{
					/* Component '{current_page}' */
					let __v0 = this._c(__v, current_page, {"model":this._model(Runtime.Vector.from(["widgets",current_page_model]))});
				}
				else
				{
					/* Component '{current_page}' */
					let __v1 = this._c(__v, current_page, {});
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderCurrentPage());
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Web.DefaultLayout,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.DefaultLayout";
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
Runtime.rtl.defClass(Runtime.Web.DefaultLayout);
window["Runtime.Web.DefaultLayout"] = Runtime.Web.DefaultLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.DefaultLayout;
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
Runtime.Web.Events = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.Events.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.Events.prototype.constructor = Runtime.Web.Events;
Object.assign(Runtime.Web.Events.prototype,
{
	/**
	 * Setup widget params
	 */
	setup: function(params)
	{
		if (params == null)
		{
			return ;
		}
		params.each((f, event_name) =>
		{
			this.add(event_name, f);
		});
	},
	/**
	 * Add event
	 */
	add: function(event_name, f)
	{
		if (!this.items.has(event_name))
		{
			this.items.set(event_name, Runtime.Vector.from([]));
		}
		if (Runtime.rtl.isCallable(f))
		{
			this.items.get(event_name).append(f);
		}
	},
	/**
	 * Clear events
	 */
	clear: function(event_name)
	{
		if (this.items.has(event_name))
		{
			this.items.set(event_name, Runtime.Vector.from([]));
		}
	},
	/**
	 * Clear all
	 */
	clearAll: function()
	{
		this.items.each((event_name) =>
		{
			this.clear(event_name);
		});
	},
	/**
	 * Emit event
	 */
	emit: function(event_name, attrs)
	{
		if (attrs == undefined) attrs = null;
		if (!this.items.has(event_name))
		{
			return ;
		}
		var events = this.items.get(event_name);
		for (var i = 0; i < events.count(); i++)
		{
			var f = events.get(i);
			Runtime.rtl.apply(f, attrs);
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.items = Runtime.Map.from({});
	},
});
Object.assign(Runtime.Web.Events, Runtime.BaseObject);
Object.assign(Runtime.Web.Events,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events";
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
Runtime.rtl.defClass(Runtime.Web.Events);
window["Runtime.Web.Events"] = Runtime.Web.Events;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events;
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
Runtime.Web.ModelFactory = function(name, params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this.name = name;
	this.params = params;
};
Runtime.Web.ModelFactory.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.ModelFactory.prototype.constructor = Runtime.Web.ModelFactory;
Object.assign(Runtime.Web.ModelFactory.prototype,
{
	/**
	 * Factory
	 */
	factory: function(model)
	{
		return model.addWidget(this.name, this.params);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.name = "";
		this.params = null;
	},
});
Object.assign(Runtime.Web.ModelFactory, Runtime.BaseObject);
Object.assign(Runtime.Web.ModelFactory,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.ModelFactory";
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
Runtime.rtl.defClass(Runtime.Web.ModelFactory);
window["Runtime.Web.ModelFactory"] = Runtime.Web.ModelFactory;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.ModelFactory;
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
Runtime.Web.RenderContainer = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.RenderContainer.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.RenderContainer.prototype.constructor = Runtime.Web.RenderContainer;
Object.assign(Runtime.Web.RenderContainer.prototype,
{
	/**
	 * Create layout
	 */
	createLayout: function(layout_name)
	{
		/* Get layout class name */
		var params = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.LAYOUT_MODEL_NAME, Runtime.Map.from({"class_name":"Runtime.Web.BaseLayoutModel","layout_name":layout_name}));
		/* Create layout */
		this.layout = Runtime.rtl.newInstance(params.get("class_name"));
		this.layout.setLayoutName(layout_name);
		/* Call create layout */
		Runtime.rtl.getContext().callHookAsync(Runtime.Web.Hooks.AppHook.CREATE_LAYOUT, Runtime.Map.from({"container":this}));
	},
	/**
	 * Returns layout name
	 */
	getLayoutName: function()
	{
		var layout_name = "default";
		if (this.route == null)
		{
			return layout_name;
		}
		/* Set layout name from route */
		if (this.route.layout)
		{
			layout_name = this.route.layout;
		}
		else if (this.route.route_class)
		{
			var getLayoutName = new Runtime.Callback(this.route.route_class, "getLayoutName");
			if (getLayoutName.exists())
			{
				layout_name = getLayoutName.apply();
			}
		}
		/* Set layout name */
		return layout_name;
	},
	/**
	 * Resolve container
	 */
	resolve: async function()
	{
		/* Resolve request */
		await this.resolveRequest();
		/* Resolve route */
		await this.resolveRoute();
	},
	/**
	 * Resolve request and find route
	 */
	resolveRequest: async function()
	{
		/* Call hook find route */
		await Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.FIND_ROUTE_BEFORE, Runtime.Map.from({"container":this}));
		/* Exit if route find */
		if (this.route != null)
		{
			return Promise.resolve();
		}
		if (this.response != null)
		{
			return Promise.resolve();
		}
		/* Find route */
		var routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteList");
		this.route = routes.findRoute(this);
		/* Call hook found route */
		await Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.FIND_ROUTE_AFTER, Runtime.Map.from({"container":this}));
		/* Call middleware */
		await this.callRouteMiddleware(this);
	},
	/**
	 * Resolve route
	 */
	resolveRoute: async function()
	{
		if (this.response)
		{
			return Promise.resolve();
		}
		/* Create layout */
		var layout_name = this.getLayoutName();
		this.createLayout(layout_name);
		/* Set layout params */
		this.layout.backend_storage = this.backend_storage;
		this.layout.route = this.route;
		/* Call route before */
		await Runtime.rtl.getContext().callHookAsync(Runtime.Web.Hooks.AppHook.ROUTE_BEFORE, Runtime.Map.from({"container":this}));
		/* Call layout route before */
		await this.layout.onActionBefore(this);
		/* Load layout data */
		await this.layout.loadData(this);
		/* Render route */
		if (this.route != null)
		{
			await this.route.render(this);
		}
		/* Call layout route after */
		await this.layout.onActionAfter(this);
		/* Call route after */
		await Runtime.rtl.getContext().callHookAsync(Runtime.Web.Hooks.AppHook.ROUTE_AFTER, Runtime.Map.from({"container":this}));
	},
	/**
	 * Call route middleware
	 */
	callRouteMiddleware: async function()
	{
		if (this.route && this.route.middleware)
		{
			for (var i = 0; i < this.route.middleware.count(); i++)
			{
				var middleware = this.route.middleware.get(i);
				await Runtime.rtl.apply(middleware, Runtime.Vector.from([this]));
			}
		}
		/* Call hook middleware */
		await Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.ROUTE_MIDDLEWARE, Runtime.Map.from({"container":this}));
	},
	/**
	 * Set response
	 */
	setResponse: function(response)
	{
		this.response = response;
	},
	/**
	 * Render page model
	 */
	renderPageModel: async function(model_name)
	{
		this.layout.setPageModel(model_name);
		var page_model = this.layout.getPageModel();
		if (page_model)
		{
			await page_model.actionIndex(this);
		}
	},
	/**
	 * Render page and setup response
	 */
	renderPage: function(page_class_name)
	{
		if (page_class_name == undefined) page_class_name = "";
		this.response = new Runtime.Web.RenderResponse();
		this.layout.current_page_class = page_class_name;
		if (page_class_name != "")
		{
			this.layout.addComponent(page_class_name);
		}
	},
	/**
	 * Cancel route
	 */
	cancelRoute: function()
	{
		if (this.base_route)
		{
			this.base_route.cancelRoute();
		}
	},
	/**
	 * Add cookie
	 */
	addCookie: function(cookie)
	{
		this.cookies.set(cookie.name, cookie);
	},
	/**
	 * Returns frontend environments
	 */
	getFrontendEnvironments: function()
	{
		var environments = Runtime.Map.from({});
		/* Setup environments */
		var arr = Runtime.Vector.from(["CLOUD_ENV","DEBUG","LOCALE","TZ","TZ_OFFSET","ROUTE_PREFIX"]);
		/* Call hook */
		var params = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.ENVIRONMENTS, Runtime.Map.from({"arr":arr,"environments":environments}));
		/* Get result */
		arr = params.get("arr");
		environments = params.get("environments");
		/* Copy environments */
		for (var i = 0; i < arr.count(); i++)
		{
			var name = arr.get(i);
			environments.set(name, Runtime.rtl.getContext().env(name));
		}
		return environments;
	},
	/**
	 * Export data
	 */
	exportData: function()
	{
		var data = Runtime.Map.from({"entry_point":Runtime.rtl.getContext().entry_point,"modules":Runtime.rtl.getContext().start_modules,"environments":this.getFrontendEnvironments()});
		/* Create serializer */
		var serializer = new Runtime.Serializer();
		serializer.setFlag(Runtime.Serializer.ALLOW_OBJECTS);
		serializer.setFlag(Runtime.Serializer.ENCODE);
		/* Export data */
		serializer.process(this, "layout", data);
		/* Call hook */
		Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.EXPORT_CONTAINER_DATA, Runtime.Map.from({"container":this,"data":data}));
		return data;
	},
	/**
	 * Import data
	 */
	importData: function(data)
	{
		/* Call hook */
		Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.IMPORT_CONTAINER_DATA_BEFORE, Runtime.Map.from({"container":this,"data":data}));
		/* Create serializer */
		var serializer = new Runtime.SerializerNative();
		serializer.setFlag(Runtime.Serializer.ALLOW_OBJECTS);
		/* Create layout */
		var layout_name = data.get("layout").get("layout_name");
		this.createLayout(layout_name);
		/* Load data */
		serializer.setFlag(Runtime.Serializer.DECODE);
		this.layout.serialize(serializer, data.get("layout"));
		/* Call hook */
		Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.IMPORT_CONTAINER_DATA_AFTER, Runtime.Map.from({"container":this,"data":data}));
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.base_route = null;
		this.request = null;
		this.response = null;
		this.route = null;
		this.layout = null;
		this.cookies = Runtime.Map.from({});
		this.backend_storage = Runtime.Map.from({});
	},
});
Object.assign(Runtime.Web.RenderContainer, Runtime.BaseObject);
Object.assign(Runtime.Web.RenderContainer,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RenderContainer";
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
Runtime.rtl.defClass(Runtime.Web.RenderContainer);
window["Runtime.Web.RenderContainer"] = Runtime.Web.RenderContainer;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderContainer;
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
Runtime.Web.RenderProvider = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseProvider.call(this, params);
	if (params)
	{
		if (params.has("element"))
		{
			this.element = params.get("element");
		}
		if (params.has("layout"))
		{
			this.layout = params.get("layout");
		}
		if (params.has("layout_data"))
		{
			this.layout_data = params.get("layout_data");
		}
		if (params.has("layout_name"))
		{
			this.layout_name = params.get("layout_name");
		}
		if (params.has("selector"))
		{
			this.selector = params.get("selector");
		}
		if (params.has("enable_ssr"))
		{
			this.enable_ssr = params.get("enable_ssr");
		}
		if (params.has("break_start"))
		{
			this.break_start = params.get("break_start");
		}
	}
};
Runtime.Web.RenderProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Web.RenderProvider.prototype.constructor = Runtime.Web.RenderProvider;
Object.assign(Runtime.Web.RenderProvider.prototype,
{
	/**
	 * Returns root element
	 */
	getRootElement: function()
	{
		return (this.element) ? (this.element) : (document.querySelector("." + Runtime.rtl.toStr(this.selector)));
	},
	/**
	 * Init provider
	 */
	init: async function()
	{
		await Runtime.BaseProvider.prototype.init.bind(this)();
		/* Create render container */
		var app = Runtime.rtl.getContext().getApp();
		this.container = app.createRenderContainer();
	},
	/**
	 * Returns app data
	 */
	getAppData: function()
	{
		var app_data = Runtime.rtl.attr(window, this.layout_data);
		if (!Runtime.rtl.exists(app_data))
		{
			throw new Runtime.Exceptions.ItemNotFound(this.layout_data, "App data")
		}
		/* Convert native to primitive */
		var serializer = new Runtime.SerializerNative();
		app_data = serializer.decode(app_data);
		return app_data;
	},
	/**
	 * Load layout
	 */
	loadLayout: function()
	{
		if (this.layout != null)
		{
			return ;
		}
		var Vue = Runtime.rtl.attr(window, "Vue");
		/* Get data */
		var app_data = this.getAppData();
		/* Import data */
		this.container.importData(app_data);
		/* Create layout */
		this.layout = Vue.reactive(this.container.layout);
		if (window) window[this.layout_name] = this.layout;
	},
	/**
	 * Start App
	 */
	startApp: function(options)
	{
		var vue_app = null;
		var Vue = Runtime.rtl.attr(window, "Vue");
		var registerLayout = null;
		registerLayout = (layout) =>
		{
			return {
				install: () => {
					vue_app.config.globalProperties.$layout = layout;
				},
			};
		};
		/* Get props */
		var component = Runtime.rtl.find_class(options.get("component"));
		var props = options.get("props");
		/* Create vue app */
		var enable_ssr = options.get("enable_ssr", false);
		if (enable_ssr)
		{
			vue_app = Vue.createSSRApp(component, props.toObject());
		}
		else
		{
			vue_app = Vue.createApp(component, props.toObject());
		}
		/* Register layout  */
		vue_app.use(registerLayout(this.layout));
		/* Register other modules */
		Runtime.rtl.getContext().callHookAsync(Runtime.Web.Hooks.AppHook.VUE_MODULES, Runtime.Map.from({"render_provider":this,"vue":vue_app}));
		/* Mount app */
		vue_app.mount(options.get("element"), true);
		return vue_app;
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
		await Runtime.BaseProvider.prototype.start.bind(this)();
		/* Load layout */
		this.loadLayout();
		if (this.break_start)
		{
			return Promise.resolve();
		}
		/* Start App */
		this.vue = this.startApp(Runtime.Map.from({"element":this.getRootElement(),"component":"Runtime.Web.AppComponent","enable_ssr":this.enable_ssr,"props":Runtime.Map.from({"key":"root","model":this.layout})}));
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.vue = null;
		this.layout = null;
		this.element = null;
		this.layout_data = "app_data";
		this.layout_name = "app_layout";
		this.selector = "core_ui_root";
		this.break_start = false;
		this.enable_ssr = true;
		this.events = new Runtime.Web.Events();
	},
});
Object.assign(Runtime.Web.RenderProvider, Runtime.BaseProvider);
Object.assign(Runtime.Web.RenderProvider,
{
	/**
	 * Returns instance
	 */
	instance: function()
	{
		return Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
	},
	/**
	 * Next tick
	 */
	nextTick: async function(f)
	{
		var Vue = Runtime.rtl.attr(window, "Vue");
		await Vue.nextTick(f);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RenderProvider";
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
Runtime.rtl.defClass(Runtime.Web.RenderProvider);
window["Runtime.Web.RenderProvider"] = Runtime.Web.RenderProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderProvider;
Runtime.Web.Component.render = function ()
{
	return this.render();
}
Runtime.Web.Component.computed = {
	layout: function (){
		return this.$layout;
	}
}
Runtime.Web.Component.beforeCreate = function ()
{
	return this.$options.onBeforeCreate();
}
Runtime.Web.Component.created = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onCreatedBefore", [this]);
	this.initWidget();
	this.onCreated();
	provider.events.emit("onCreated", [this]);
}
Runtime.Web.Component.beforeMount = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onBeforeMountBefore", [this]);
	this.onBeforeMount();
	provider.events.emit("onBeforeMount", [this]);
}
Runtime.Web.Component.mounted = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onMountedBefore", [this]);
	this.onMounted();
	provider.events.emit("onMounted", [this]);
}
Runtime.Web.Component.beforeUpdate = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onBeforeUpdateBefore", [this]);
	this.onBeforeUpdate();
	provider.events.emit("onBeforeUpdate", [this]);
}
Runtime.Web.Component.updated = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onUpdatedBefore", [this]);
	this.onUpdated();
	provider.events.emit("onUpdated", [this]);
}
Runtime.Web.Component.beforeUnmount = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onBeforeUnmountBefore", [this]);
	this.onBeforeUnmount();
	provider.events.emit("onBeforeUnmount", [this]);
}
Runtime.Web.Component.unmounted = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onUnmountBefore", [this]);
	this.onUnmount();
	provider.events.emit("onUnmount", [this]);
}
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
Runtime.Web.RouteInfo = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Web.RouteInfo.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.RouteInfo.prototype.constructor = Runtime.Web.RouteInfo;
Object.assign(Runtime.Web.RouteInfo.prototype,
{
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "data", data);
		serializer.process(this, "domain", data);
		serializer.process(this, "label", data);
		serializer.process(this, "layout", data);
		serializer.process(this, "matches", data);
		serializer.process(this, "middleware", data);
		serializer.process(this, "name", data);
		serializer.process(this, "params", data);
		serializer.process(this, "pos", data);
		serializer.process(this, "route_class", data);
		serializer.process(this, "uri", data);
		serializer.process(this, "uri_match", data);
	},
	/**
	 * Copy route
	 */
	copy: function()
	{
		return Runtime.Serializer.copy(this);
	},
	/**
	 * Compile route
	 */
	compile: function()
	{
		if (this.uri_match == "")
		{
			this.uri_match = "^" + Runtime.rtl.toStr(Runtime.re.replace("\\/", "\\/", this.uri)) + Runtime.rtl.toStr("$");
		}
		var matches = Runtime.re.matchAll("{(.*?)}", this.uri);
		if (matches)
		{
			var params = new Runtime.Vector();
			for (var i = 0; i < matches.count(); i++)
			{
				var arr = Runtime.rtl.attr(matches, i);
				var name = Runtime.rtl.attr(arr, 1);
				this.uri_match = Runtime.re.replace("{" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("}"), "([^\\/]*?)", this.uri_match);
				this.params.push(name);
			}
		}
		else
		{
			this.params = Runtime.Vector.from([]);
		}
	},
	/**
	 * Add matches
	 */
	addMatches: function(matches)
	{
		for (var i = 0; i < this.params.count(); i++)
		{
			var param_name = this.params.get(i);
			var match_value = matches.get(i);
			this.matches.set(param_name, match_value);
		}
	},
	/**
	 * Render route
	 */
	render: async function(container)
	{
		throw new Runtime.Exceptions.RuntimeException("RouteInfo is abstract class")
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.name = null;
		this.uri = null;
		this.uri_match = null;
		this.domain = null;
		this.label = null;
		this.layout = null;
		this.route_class = null;
		this.data = null;
		this.middleware = null;
		this.params = Runtime.Vector.from([]);
		this.matches = Runtime.Map.from({});
		this.is_backend = false;
		this.pos = 100;
	},
});
Object.assign(Runtime.Web.RouteInfo, Runtime.BaseObject);
Object.assign(Runtime.Web.RouteInfo,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RouteInfo";
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
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.Web.RouteInfo);
window["Runtime.Web.RouteInfo"] = Runtime.Web.RouteInfo;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteInfo;
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
Runtime.Web.RouteAction = function()
{
	Runtime.Web.RouteInfo.apply(this, arguments);
};
Runtime.Web.RouteAction.prototype = Object.create(Runtime.Web.RouteInfo.prototype);
Runtime.Web.RouteAction.prototype.constructor = Runtime.Web.RouteAction;
Object.assign(Runtime.Web.RouteAction.prototype,
{
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "action", data);
		Runtime.Web.RouteInfo.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Copy route
	 */
	copy: function()
	{
		var route = Runtime.Web.RouteInfo.prototype.copy.call(this);
		route.action = this.action;
		return route;
	},
	/**
	 * Render route
	 */
	render: async function(container)
	{
		if (Runtime.rtl.isCallable(this.action))
		{
			var f = this.action;
			await Runtime.rtl.apply(f, Runtime.Vector.from([container]));
		}
		else if (this.action instanceof Runtime.Entity.Factory)
		{
			container.base_route = this.action.factory();
			var action = new Runtime.Callback(container.base_route, container.base_route.action);
			if (action.exists())
			{
				await Runtime.rtl.apply(action, Runtime.Vector.from([container]));
			}
		}
	},
	_init: function()
	{
		Runtime.Web.RouteInfo.prototype._init.call(this);
		this.action = null;
	},
});
Object.assign(Runtime.Web.RouteAction, Runtime.Web.RouteInfo);
Object.assign(Runtime.Web.RouteAction,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RouteAction";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.RouteInfo";
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
Runtime.rtl.defClass(Runtime.Web.RouteAction);
window["Runtime.Web.RouteAction"] = Runtime.Web.RouteAction;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteAction;
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
Runtime.Web.RoutePage = function()
{
	Runtime.Web.RouteInfo.apply(this, arguments);
};
Runtime.Web.RoutePage.prototype = Object.create(Runtime.Web.RouteInfo.prototype);
Runtime.Web.RoutePage.prototype.constructor = Runtime.Web.RoutePage;
Object.assign(Runtime.Web.RoutePage.prototype,
{
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "page", data);
		Runtime.Web.RouteInfo.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Render route
	 */
	render: async function(container)
	{
		container.renderPage(this.page);
		if (this.data)
		{
			var title = this.data.get("title");
			container.layout.setPageTitle(title);
		}
	},
	_init: function()
	{
		Runtime.Web.RouteInfo.prototype._init.call(this);
		this.page = "";
	},
});
Object.assign(Runtime.Web.RoutePage, Runtime.Web.RouteInfo);
Object.assign(Runtime.Web.RoutePage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RoutePage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.RouteInfo";
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
Runtime.rtl.defClass(Runtime.Web.RoutePage);
window["Runtime.Web.RoutePage"] = Runtime.Web.RoutePage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RoutePage;
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
Runtime.Web.RouteModel = function()
{
	Runtime.Web.RouteInfo.apply(this, arguments);
};
Runtime.Web.RouteModel.prototype = Object.create(Runtime.Web.RouteInfo.prototype);
Runtime.Web.RouteModel.prototype.constructor = Runtime.Web.RouteModel;
Object.assign(Runtime.Web.RouteModel.prototype,
{
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "model", data);
		Runtime.Web.RouteInfo.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Render route
	 */
	render: async function(container)
	{
		var page_model_name = this.model;
		if (page_model_name == "")
		{
			return Promise.resolve();
		}
		if (!Runtime.rtl.class_exists(page_model_name))
		{
			return Promise.resolve();
		}
		/* Render page model */
		await container.renderPageModel(page_model_name);
	},
	_init: function()
	{
		Runtime.Web.RouteInfo.prototype._init.call(this);
		this.model = null;
	},
});
Object.assign(Runtime.Web.RouteModel, Runtime.Web.RouteInfo);
Object.assign(Runtime.Web.RouteModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RouteModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.RouteInfo";
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
Runtime.rtl.defClass(Runtime.Web.RouteModel);
window["Runtime.Web.RouteModel"] = Runtime.Web.RouteModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteModel;
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
if (typeof Runtime.Web.Annotations == 'undefined') Runtime.Web.Annotations = {};
Runtime.Web.Annotations.Components = function(components)
{
	Runtime.Entity.Hook.call(this, "Runtime.Web.Hooks.Components", Runtime.Map.from({"items":components}));
};
Runtime.Web.Annotations.Components.prototype = Object.create(Runtime.Entity.Hook.prototype);
Runtime.Web.Annotations.Components.prototype.constructor = Runtime.Web.Annotations.Components;
Object.assign(Runtime.Web.Annotations.Components.prototype,
{
});
Object.assign(Runtime.Web.Annotations.Components, Runtime.Entity.Hook);
Object.assign(Runtime.Web.Annotations.Components,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.Web.Annotations.Components";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Hook";
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
Runtime.rtl.defClass(Runtime.Web.Annotations.Components);
window["Runtime.Web.Annotations.Components"] = Runtime.Web.Annotations.Components;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Annotations.Components;
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
if (typeof Runtime.Web.Annotations == 'undefined') Runtime.Web.Annotations = {};
Runtime.Web.Annotations.SetupLayout = function(params)
{
	Runtime.Entity.Hook.call(this, "Runtime.Web.Hooks.SetupLayout", Runtime.Map.from({"names":params}));
};
Runtime.Web.Annotations.SetupLayout.prototype = Object.create(Runtime.Entity.Hook.prototype);
Runtime.Web.Annotations.SetupLayout.prototype.constructor = Runtime.Web.Annotations.SetupLayout;
Object.assign(Runtime.Web.Annotations.SetupLayout.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Entity.Hook.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Annotations.SetupLayout, Runtime.Entity.Hook);
Object.assign(Runtime.Web.Annotations.SetupLayout,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.Web.Annotations.SetupLayout";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Hook";
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
Runtime.rtl.defClass(Runtime.Web.Annotations.SetupLayout);
window["Runtime.Web.Annotations.SetupLayout"] = Runtime.Web.Annotations.SetupLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Annotations.SetupLayout;
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
if (typeof Runtime.Web.Annotations == 'undefined') Runtime.Web.Annotations = {};
Runtime.Web.Annotations.Widget = function(widget_name)
{
	Runtime.Entity.Entity.call(this, Runtime.Map.from({"name":widget_name}));
};
Runtime.Web.Annotations.Widget.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.Web.Annotations.Widget.prototype.constructor = Runtime.Web.Annotations.Widget;
Object.assign(Runtime.Web.Annotations.Widget.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Entity.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Annotations.Widget, Runtime.Entity.Entity);
Object.assign(Runtime.Web.Annotations.Widget,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.Web.Annotations.Widget";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Entity";
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
Runtime.rtl.defClass(Runtime.Web.Annotations.Widget);
window["Runtime.Web.Annotations.Widget"] = Runtime.Web.Annotations.Widget;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Annotations.Widget;
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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.AppHook = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
Runtime.Web.Hooks.AppHook.prototype = Object.create(Runtime.BaseHook.prototype);
Runtime.Web.Hooks.AppHook.prototype.constructor = Runtime.Web.Hooks.AppHook;
Object.assign(Runtime.Web.Hooks.AppHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.ASSETS)
		{
			return "assets";
		}
		if (hook_name == this.constructor.CALL_API_BEFORE)
		{
			return "call_api_before";
		}
		if (hook_name == this.constructor.COMPONENTS)
		{
			return "components";
		}
		if (hook_name == this.constructor.CORE_UI)
		{
			return "core_ui";
		}
		if (hook_name == this.constructor.CREATE_CONTAINER)
		{
			return "create_container";
		}
		if (hook_name == this.constructor.CREATE_LAYOUT)
		{
			return "create_layout";
		}
		if (hook_name == this.constructor.CSS_VARS)
		{
			return "css_vars";
		}
		if (hook_name == this.constructor.ENVIRONMENTS)
		{
			return "environments";
		}
		if (hook_name == this.constructor.EXPORT_CONTAINER_DATA)
		{
			return "export_container_data";
		}
		if (hook_name == this.constructor.FIND_ROUTE_BEFORE)
		{
			return "find_route_before";
		}
		if (hook_name == this.constructor.FIND_ROUTE_AFTER)
		{
			return "find_route_after";
		}
		if (hook_name == this.constructor.IMPORT_CONTAINER_DATA_BEFORE)
		{
			return "import_container_data_before";
		}
		if (hook_name == this.constructor.IMPORT_CONTAINER_DATA_AFTER)
		{
			return "import_container_data_after";
		}
		if (hook_name == this.constructor.LAYOUT_MODEL_NAME)
		{
			return "layout_model_name";
		}
		if (hook_name == this.constructor.LAYOUT_COMPONENT_NAME)
		{
			return "layout_component_name";
		}
		if (hook_name == this.constructor.MAKE_URL)
		{
			return "make_url";
		}
		if (hook_name == this.constructor.MATCH_ROUTE)
		{
			return "match_route";
		}
		if (hook_name == this.constructor.RENDER_BODY)
		{
			return "render_body";
		}
		if (hook_name == this.constructor.RENDER_FOOTER)
		{
			return "render_footer";
		}
		if (hook_name == this.constructor.RENDER_HEAD)
		{
			return "render_head";
		}
		if (hook_name == this.constructor.RENDER_PROVIDER_SETTINGS)
		{
			return "render_provider_settings";
		}
		if (hook_name == this.constructor.RESPONSE)
		{
			return "response";
		}
		if (hook_name == this.constructor.ROUTES_INIT)
		{
			return "routes_init";
		}
		if (hook_name == this.constructor.ROUTE_AFTER)
		{
			return "route_after";
		}
		if (hook_name == this.constructor.ROUTE_MIDDLEWARE)
		{
			return "route_middleware";
		}
		if (hook_name == this.constructor.ROUTE_BEFORE)
		{
			return "route_before";
		}
		if (hook_name == this.constructor.VUE_MODULES)
		{
			return "vue_modules";
		}
		return "";
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
	},
	/**
	 * Call api before
	 */
	call_api_before: function(d)
	{
	},
	/**
	 * Assets
	 */
	assets: function(params)
	{
	},
	/**
	 * Components
	 */
	components: function(params)
	{
	},
	/**
	 * Core ui
	 */
	core_ui: function(params)
	{
	},
	/**
	 * Create container
	 */
	create_container: function(params)
	{
	},
	/**
	 * Create layout
	 */
	create_layout: function(params)
	{
	},
	/**
	 * CSS Vars
	 */
	css_vars: function(params)
	{
	},
	/**
	 * Environments
	 */
	environments: function(params)
	{
	},
	/**
	 * Export data
	 */
	export_container_data: function(params)
	{
	},
	/**
	 * Import data
	 */
	import_container_data_before: function(params)
	{
	},
	/**
	 * Import data after
	 */
	import_container_data_after: function(params)
	{
	},
	/**
	 * Find route before
	 */
	find_route_before: function(params)
	{
	},
	/**
	 * Find route after
	 */
	find_route_after: function(params)
	{
	},
	/**
	 * Layout model name
	 */
	layout_model_name: function(params)
	{
	},
	/**
	 * Layout component name
	 */
	layout_component_name: function(params)
	{
	},
	/**
	 * Make url
	 */
	make_url: function(params)
	{
	},
	/**
	 * Match route
	 */
	match_route: function(params)
	{
	},
	/**
	 * Render body
	 */
	render_body: function(params)
	{
	},
	/**
	 * Render footer
	 */
	render_footer: function(params)
	{
	},
	/**
	 * Render head
	 */
	render_head: function(params)
	{
	},
	/**
	 * Render settings
	 */
	render_provider_settings: function(params)
	{
	},
	/**
	 * Routes init
	 */
	routes_init: async function(params)
	{
	},
	/**
	 * Route after
	 */
	route_after: async function(params)
	{
	},
	/**
	 * Route before
	 */
	route_before: async function(params)
	{
	},
	/**
	 * Route middleware
	 */
	route_middleware: async function(params)
	{
	},
	/**
	 * Response
	 */
	response: async function(params)
	{
	},
	/**
	 * Vue modules
	 */
	vue_modules: async function(params)
	{
	},
});
Object.assign(Runtime.Web.Hooks.AppHook, Runtime.BaseHook);
Object.assign(Runtime.Web.Hooks.AppHook,
{
	ASSETS: "runtime.web.app::assets",
	CALL_API_BEFORE: "runtime.web.app::call_api_before",
	COMPONENTS: "runtime.web.app::components",
	CORE_UI: "runtime.web.app::core_ui",
	CREATE_CONTAINER: "runtime.web.app::create_container",
	CREATE_LAYOUT: "runtime.web.app::create_layout",
	CSS_VARS: "runtime.web.app::css_vars",
	ENVIRONMENTS: "runtime.web.app::environments",
	EXPORT_CONTAINER_DATA: "runtime.web.app::export_container_data",
	FIND_ROUTE_BEFORE: "runtime.web.app::find_route_before",
	FIND_ROUTE_AFTER: "runtime.web.app::find_route_after",
	IMPORT_CONTAINER_DATA_AFTER: "runtime.web.app::import_container_data_after",
	IMPORT_CONTAINER_DATA_BEFORE: "runtime.web.app::import_container_data_before",
	LAYOUT_MODEL_NAME: "runtime.web.app::layout_model_name",
	LAYOUT_COMPONENT_NAME: "runtime.web.app::layout_component_name",
	MAKE_URL: "runtime.web.app::make_url",
	MATCH_ROUTE: "runtime.web.app::match_route",
	RENDER_BODY: "runtime.web.app::render_body",
	RENDER_FOOTER: "runtime.web.app::render_footer",
	RENDER_HEAD: "runtime.web.app::render_head",
	RENDER_PROVIDER_SETTINGS: "runtime.web.app::render_provider_settings",
	RESPONSE: "runtime.web.app::response",
	ROUTES_INIT: "runtime.web.app::routes_init",
	ROUTE_AFTER: "runtime.web.app::route_after",
	ROUTE_MIDDLEWARE: "runtime.web.app::route_middleware",
	ROUTE_BEFORE: "runtime.web.app::route_before",
	VUE_MODULES: "runtime.web.app::vue_modules",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.AppHook);
window["Runtime.Web.Hooks.AppHook"] = Runtime.Web.Hooks.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.AppHook;
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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.AssetsHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.AssetsHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.AssetsHook.prototype.constructor = Runtime.Web.Hooks.AssetsHook;
Object.assign(Runtime.Web.Hooks.AssetsHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.ASSETS);
	},
	/**
	 * Assets path
	 */
	assets: function(params)
	{
		var path = Runtime.rs.join_path(Runtime.Vector.from([Runtime.rtl.getContext().env("ROUTE_PREFIX"),"assets"]));
		params.set("assets_path", path);
	},
});
Object.assign(Runtime.Web.Hooks.AssetsHook, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.AssetsHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.AssetsHook";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.AssetsHook);
window["Runtime.Web.Hooks.AssetsHook"] = Runtime.Web.Hooks.AssetsHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.AssetsHook;
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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.CanonicalUrl = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.CanonicalUrl.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.CanonicalUrl.prototype.constructor = Runtime.Web.Hooks.CanonicalUrl;
Object.assign(Runtime.Web.Hooks.CanonicalUrl.prototype,
{
	/**
	 * Setup
	 */
	setup: function(params)
	{
		Runtime.Web.Hooks.AppHook.prototype.setup.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("query"))
		{
			this.query = params.get("query");
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.ROUTE_BEFORE);
	},
	/**
	 * Route before
	 */
	route_before: function(params)
	{
		var container = params.get("container");
		var layout = container.layout;
		var seo = layout.getWidget("seo");
		if (!seo)
		{
			return ;
		}
		if (!layout.route)
		{
			return ;
		}
		if (layout.route.uri == null)
		{
			return ;
		}
		/* Build canonical url */
		var canonical_url = layout.url(layout.route.name, layout.route.matches, Runtime.Map.from({"domain":false}));
		/* Add get parameters */
		var keys = layout.request_query.keys().sort();
		for (var i = 0; i < keys.count(); i++)
		{
			var key = keys.get(i);
			if (!this.query.has(key))
			{
				continue;
			}
			if (this.query.get(key).indexOf(layout.route.name) == -1)
			{
				continue;
			}
			var value = layout.request_query.get(key);
			canonical_url = Runtime.rs.url_get_add(canonical_url, key, value);
		}
		/* Set canonical url */
		seo.setCanonicalUrl(canonical_url);
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.query = null;
	},
});
Object.assign(Runtime.Web.Hooks.CanonicalUrl, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.CanonicalUrl,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.CanonicalUrl";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.CanonicalUrl);
window["Runtime.Web.Hooks.CanonicalUrl"] = Runtime.Web.Hooks.CanonicalUrl;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.CanonicalUrl;
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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.Components = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.Components.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.Components.prototype.constructor = Runtime.Web.Hooks.Components;
Object.assign(Runtime.Web.Hooks.Components.prototype,
{
	/**
	 * Setup
	 */
	setup: function(params)
	{
		Runtime.Web.Hooks.AppHook.prototype.setup.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("components"))
		{
			this.items.set("components", params.get("components"));
		}
		if (params.has("footer"))
		{
			this.items.set("footer", params.get("footer"));
		}
		if (params.has("header"))
		{
			this.items.set("header", params.get("header"));
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.COMPONENTS);
	},
	/**
	 * Components
	 */
	components: function(params)
	{
		params.get("components").appendItems(this.items.get("components"));
	},
	/**
	 * Render head
	 */
	render_head: function(params)
	{
		params.get("components").appendItems(this.items.get("header"));
	},
	/**
	 * Render footer
	 */
	render_footer: function(params)
	{
		params.get("components").appendItems(this.items.get("footer"));
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.items = Runtime.Map.from({"components":Runtime.Vector.from([]),"footer":Runtime.Vector.from([]),"header":Runtime.Vector.from([])});
	},
});
Object.assign(Runtime.Web.Hooks.Components, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.Components,
{
	/**
	 * Hook factory
	 */
	hook: function(items)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"components":items}));
	},
	/**
	 * Hook factory
	 */
	header: function(items)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"header":items}));
	},
	/**
	 * Hook factory
	 */
	footer: function(items)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"footer":items}));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.Components";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.Components);
window["Runtime.Web.Hooks.Components"] = Runtime.Web.Hooks.Components;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.Components;
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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.DetectLanguage = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.DetectLanguage.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.DetectLanguage.prototype.constructor = Runtime.Web.Hooks.DetectLanguage;
Object.assign(Runtime.Web.Hooks.DetectLanguage.prototype,
{
	/**
	 * Setup
	 */
	setup: function(params)
	{
		Runtime.Web.Hooks.AppHook.prototype.setup.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("allowed_languages"))
		{
			this.allowed_languages = params.get("allowed_languages");
		}
		if (params.has("default_language"))
		{
			this.default_language = params.get("default_language");
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.CALL_API_BEFORE);
		this.register(this.constructor.MAKE_URL);
	},
	/**
	 * Call api before
	 */
	call_api_before: function(params)
	{
		var api_params = params.get("params");
		var layout = api_params.get("layout");
		/* Get api params */
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(api_params, "service"));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", "app"));
		var service = __v0.value();
		var __v1 = new Runtime.Monad(Runtime.rtl.attr(api_params, "api_name"));
		__v1 = __v1.monad(Runtime.rtl.m_to("string", ""));
		var api_name = __v1.value();
		var __v2 = new Runtime.Monad(Runtime.rtl.attr(api_params, "method_name"));
		__v2 = __v2.monad(Runtime.rtl.m_to("string", ""));
		var method_name = __v2.value();
		/* Build api url */
		var api_url_arr = Runtime.Vector.from([layout.lang,"api",service,api_name,method_name]);
		api_url_arr = api_url_arr.filter((s) =>
		{
			return s != "";
		});
		var api_url = "/" + Runtime.rtl.toStr(api_url_arr.join("/")) + Runtime.rtl.toStr("/");
		/* Set api url */
		params.set("api_url", api_url);
	},
	/**
	 * Make url
	 */
	make_url: function(params)
	{
		var route = params.get("route");
		var layout = params.get("layout");
		var domain = params.get("domain");
		var url = params.get("url");
		var url_params = params.get("url_params");
		var url_lang = (url_params.has("lang")) ? (url_params.get("lang")) : (layout.lang);
		/* Add language */
		if (route.enable_locale)
		{
			url = "/" + Runtime.rtl.toStr(url_lang) + Runtime.rtl.toStr(url);
			params.set("url", url);
			params.set("url_with_domain", url);
		}
		/* Add domain */
		if (domain)
		{
			params.set("url_with_domain", "//" + Runtime.rtl.toStr(domain) + Runtime.rtl.toStr(url));
		}
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.default_language = "";
		this.allowed_languages = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Web.Hooks.DetectLanguage, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.DetectLanguage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.DetectLanguage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.DetectLanguage);
window["Runtime.Web.Hooks.DetectLanguage"] = Runtime.Web.Hooks.DetectLanguage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.DetectLanguage;
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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.SetupLayout = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.SetupLayout.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.SetupLayout.prototype.constructor = Runtime.Web.Hooks.SetupLayout;
Object.assign(Runtime.Web.Hooks.SetupLayout.prototype,
{
	/**
	 * Setup
	 */
	setup: function(params)
	{
		Runtime.Web.Hooks.AppHook.prototype.setup.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("names"))
		{
			this.names = params.get("names");
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.LAYOUT_MODEL_NAME);
	},
	/**
	 * Layout model name
	 */
	layout_model_name: function(params)
	{
		/* Setup custom model */
		var layout_name = params.get("layout_name");
		if (this.names && this.names.has(layout_name))
		{
			params.set("class_name", this.names.get(layout_name));
		}
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.names = null;
	},
});
Object.assign(Runtime.Web.Hooks.SetupLayout, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.SetupLayout,
{
	/**
	 * Hook factory
	 */
	hook: function(params)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"names":params}));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.SetupLayout";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.SetupLayout);
window["Runtime.Web.Hooks.SetupLayout"] = Runtime.Web.Hooks.SetupLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.SetupLayout;
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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.WidgetModelFactory = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.WidgetModelFactory.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.WidgetModelFactory.prototype.constructor = Runtime.Web.Hooks.WidgetModelFactory;
Object.assign(Runtime.Web.Hooks.WidgetModelFactory.prototype,
{
	/**
	 * Setup
	 */
	setup: function(params)
	{
		Runtime.Web.Hooks.AppHook.prototype.setup.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("model_name"))
		{
			this.model_name = params.get("model_name");
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
	},
	/**
	 * Route before
	 */
	route_before: function(params)
	{
		var container = params.get("container");
		if (container.response != null)
		{
			return ;
		}
		/* Add widget */
		container.layout.addWidget(this.model_name);
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.model_name = "";
	},
});
Object.assign(Runtime.Web.Hooks.WidgetModelFactory, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.WidgetModelFactory,
{
	/**
	 * Create hook
	 */
	hook: function(model_name)
	{
		return new Runtime.Entity.Hook(this.getClassName(), Runtime.Map.from({"model_name":model_name}));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.WidgetModelFactory";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.WidgetModelFactory);
window["Runtime.Web.Hooks.WidgetModelFactory"] = Runtime.Web.Hooks.WidgetModelFactory;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.WidgetModelFactory;
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
if (typeof Runtime.Web.Messages == 'undefined') Runtime.Web.Messages = {};
Runtime.Web.Messages.Message = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	/* Setup params */
	this._assign_values(params);
};
Runtime.Web.Messages.Message.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.Messages.Message.prototype.constructor = Runtime.Web.Messages.Message;
Object.assign(Runtime.Web.Messages.Message.prototype,
{
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.data = null;
		this.name = "";
		this.widget = null;
	},
});
Object.assign(Runtime.Web.Messages.Message, Runtime.BaseObject);
Object.assign(Runtime.Web.Messages.Message,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Messages";
	},
	getClassName: function()
	{
		return "Runtime.Web.Messages.Message";
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
Runtime.rtl.defClass(Runtime.Web.Messages.Message);
window["Runtime.Web.Messages.Message"] = Runtime.Web.Messages.Message;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Messages.Message;
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
if (typeof Runtime.Web.Messages == 'undefined') Runtime.Web.Messages = {};
Runtime.Web.Messages.ValueChangeMessage = function(params)
{
	if (params == undefined) params = null;
	Runtime.Web.Messages.Message.call(this, params);
	/* Set message name */
	this.name = "valueChange";
};
Runtime.Web.Messages.ValueChangeMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Web.Messages.ValueChangeMessage.prototype.constructor = Runtime.Web.Messages.ValueChangeMessage;
Object.assign(Runtime.Web.Messages.ValueChangeMessage.prototype,
{
	_init: function()
	{
		Runtime.Web.Messages.Message.prototype._init.call(this);
		this.value = null;
		this.old_value = null;
	},
});
Object.assign(Runtime.Web.Messages.ValueChangeMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Web.Messages.ValueChangeMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Messages";
	},
	getClassName: function()
	{
		return "Runtime.Web.Messages.ValueChangeMessage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Messages.Message";
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
Runtime.rtl.defClass(Runtime.Web.Messages.ValueChangeMessage);
window["Runtime.Web.Messages.ValueChangeMessage"] = Runtime.Web.Messages.ValueChangeMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Messages.ValueChangeMessage;
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
if (typeof Runtime.Web.Messages == 'undefined') Runtime.Web.Messages = {};
Runtime.Web.Messages.ClickMessage = function(params)
{
	if (params == undefined) params = null;
	Runtime.Web.Messages.Message.call(this, params);
	/* Set message name */
	this.name = "click";
};
Runtime.Web.Messages.ClickMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Web.Messages.ClickMessage.prototype.constructor = Runtime.Web.Messages.ClickMessage;
Object.assign(Runtime.Web.Messages.ClickMessage.prototype,
{
});
Object.assign(Runtime.Web.Messages.ClickMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Web.Messages.ClickMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Messages";
	},
	getClassName: function()
	{
		return "Runtime.Web.Messages.ClickMessage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Messages.Message";
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
Runtime.rtl.defClass(Runtime.Web.Messages.ClickMessage);
window["Runtime.Web.Messages.ClickMessage"] = Runtime.Web.Messages.ClickMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Messages.ClickMessage;
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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.AppComponent = {
	name: "Runtime.Web.AppComponent",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			let class_name = this.layout.getLayoutComponentName();
			
			if (class_name)
			{
				/* Component '{class_name}' */
				let __v0 = this._c(__v, class_name, {"model":this._model(Runtime.Vector.from([])),"key":"app"});
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Web.AppComponent,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.AppComponent";
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
Runtime.rtl.defClass(Runtime.Web.AppComponent);
window["Runtime.Web.AppComponent"] = Runtime.Web.AppComponent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.AppComponent;
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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.BasePage = {
	name: "Runtime.Web.BasePage",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_page"])});
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Web.BasePage,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BasePage";
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
Runtime.rtl.defClass(Runtime.Web.BasePage);
window["Runtime.Web.BasePage"] = Runtime.Web.BasePage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BasePage;
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
Runtime.Web.BasePageModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Web.BasePageModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Web.BasePageModel.prototype.constructor = Runtime.Web.BasePageModel;
Object.assign(Runtime.Web.BasePageModel.prototype,
{
	/**
	 * Action index
	 */
	actionIndex: async function(container)
	{
		/* Load page data */
		await this.loadData(container);
		/* Create response */
		container.renderPage(this.component);
		/* Build title */
		this.buildTitle(container);
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Web.BasePage";
	},
});
Object.assign(Runtime.Web.BasePageModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Web.BasePageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BasePageModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Web.BasePageModel);
window["Runtime.Web.BasePageModel"] = Runtime.Web.BasePageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BasePageModel;
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
Runtime.Web.ModuleDescription = function()
{
};
Object.assign(Runtime.Web.ModuleDescription.prototype,
{
});
Object.assign(Runtime.Web.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime.Web";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.12.0";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({"Runtime":">=0.12"});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Entity.Hook("Runtime.Web.Hooks.AssetsHook"),new Runtime.Entity.Provider("Runtime.Web.RenderProvider")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.ModuleDescription";
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
Runtime.rtl.defClass(Runtime.Web.ModuleDescription);
window["Runtime.Web.ModuleDescription"] = Runtime.Web.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.ModuleDescription;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.AppHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Widget.AppHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Widget.AppHook.prototype.constructor = Runtime.Widget.AppHook;
Object.assign(Runtime.Widget.AppHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.COMPONENTS, 10);
	},
	/**
	 * Components
	 */
	components: function(params)
	{
		var components = Runtime.Vector.from(["Runtime.Widget.CSS"]);
		components.appendItems(Runtime.rtl.attr(params, "components"));
		params.set("components", components);
	},
});
Object.assign(Runtime.Widget.AppHook, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Widget.AppHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.AppHook";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Widget.AppHook);
window["Runtime.Widget.AppHook"] = Runtime.Widget.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.AppHook;
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
Runtime.Widget.Button = {
	name: "Runtime.Widget.Button",
	extends: Runtime.Web.Component,
	props: {
		"class": {
			default: "",
		},
		"type": {
			default: "button",
		},
		"target": {
			default: "_self",
		},
		"content": {
			default: "",
		},
		"href": {
			default: null,
		},
		"styles": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			if (this.href == null)
			{
				/* Element 'button' */
				let __v0 = this._e(__v, "button", {"type":this.type,"ref":"widget","class":this._class_name(["widget_button", this.$options.getStyles("widget_button", this.styles), this.renderListClass(), this.class])});
				
				if (this.content)
				{
					/* Render */
					this._t(__v0, this.content);
				}
				else
				{
					/* Render */
					this._t(__v0, this.renderSlot("default"));
				}
			}
			else
			{
				/* Element 'a' */
				let __v1 = this._e(__v, "a", {"href":this.href,"target":this.target,"ref":"widget","class":this._class_name(["nolink", this.class])});
				
				/* Element 'button' */
				let __v2 = this._e(__v1, "button", {"type":this.type,"class":this._class_name(["widget_button", this.$options.getStyles("widget_button", this.styles), this.renderListClass()])});
				
				if (!this.checkSlot("default"))
				{
					/* Render */
					this._t(__v2, this.content);
				}
				else
				{
					/* Render */
					this._t(__v2, this.renderSlot("default"));
				}
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Button,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_button.h-8dd7{color: var(--widget-color-text);font-family: var(--widget-font-family);font-size: var(--widget-font-size);line-height: var(--widget-line-height);background-color: var(--widget-color-default);border: var(--widget-border-width) var(--widget-color-border) solid;padding: var(--widget-button-padding-y) var(--widget-button-padding-x);outline: 0;cursor: pointer;border-radius: 4px}.widget_button.h-8dd7:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25)}.widget_button--small.h-8dd7{padding: var(--widget-button-padding-small-y) var(--widget-button-padding-small-x);line-height: 1.2em}.widget_button--large.h-8dd7{padding: var(--widget-button-padding-large-y) var(--widget-button-padding-large-x)}.widget_button--primary.h-8dd7{color: var(--widget-color-primary-text);background-color: var(--widget-color-primary);border-color: var(--widget-color-primary)}.widget_button--danger.h-8dd7{color: var(--widget-color-danger-text);background-color: var(--widget-color-danger);border-color: var(--widget-color-danger)}.widget_button--success.h-8dd7{color: var(--widget-color-success-text);background-color: var(--widget-color-success);border-color: var(--widget-color-success)}.widget_button--stretch.h-8dd7{width: 100%}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Button";
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
Runtime.rtl.defClass(Runtime.Widget.Button);
window["Runtime.Widget.Button"] = Runtime.Widget.Button;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Button;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.ButtonModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.ButtonModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.ButtonModel.prototype.constructor = Runtime.Widget.ButtonModel;
Object.assign(Runtime.Widget.ButtonModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("content"))
		{
			this.content = params.get("content");
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
		if (params.has("href"))
		{
			this.href = params.get("href");
		}
	},
	/**
	 * Returns content
	 */
	getContent: function()
	{
		return this.content;
	},
	/**
	 * On click
	 */
	onClick: function(data)
	{
		if (data == undefined) data = null;
		this.emit(new Runtime.Web.Messages.ClickMessage(Runtime.Map.from({"data":data})));
	},
	/**
	 * Returns props
	 */
	getProps: function(data)
	{
		var result = Runtime.Map.from({"content":this.content,"styles":this.styles,"target":this.target});
		/* Add href */
		if (this.href)
		{
			if (Runtime.rtl.isCallable(this.href))
			{
				result.set("href", Runtime.rtl.apply(this.href, Runtime.Vector.from([data])));
			}
			else
			{
				result.set("href", this.href);
			}
		}
		return result;
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.styles = Runtime.Vector.from([]);
		this.component = "Runtime.Widget.ButtonWrap";
		this.content = null;
		this.target = "_self";
		this.href = null;
	},
});
Object.assign(Runtime.Widget.ButtonModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.ButtonModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.ButtonModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.ButtonModel);
window["Runtime.Widget.ButtonModel"] = Runtime.Widget.ButtonModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ButtonModel;
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
Runtime.Widget.ButtonWrap = {
	name: "Runtime.Widget.ButtonWrap",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			let props = this.model.getProps(this.data);
			
			/* Component 'Button' */
			let __v0 = this._c(__v, "Runtime.Widget.Button", this._merge_attrs({"render_list":this.render_list,"onClick":this.onClick,"class":this._class_name([this.class])}, props), () => {
				let __v = [];
				
				/* Render */
				this._t(__v, this.model.content);
				
				return this._flatten(__v);
			});
			
			return this._flatten(__v);
		},
		/**
 * Click button event
 */
		onClick: function(e)
		{
			this.model.onClick(this.data);
			e.stopPropagation();
		},
	},
};
Object.assign(Runtime.Widget.ButtonWrap,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.ButtonWrap";
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
Runtime.rtl.defClass(Runtime.Widget.ButtonWrap);
window["Runtime.Widget.ButtonWrap"] = Runtime.Widget.ButtonWrap;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ButtonWrap;
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
Runtime.Widget.CSS = {
	name: "Runtime.Widget.CSS",
	extends: Runtime.Web.Component,
	methods:
	{
	},
};
Object.assign(Runtime.Widget.CSS,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(":root{--widget-font-family: 'Ubuntu', sans-serif;--widget-font-size: 14px;--widget-font-size-h1: 1.8em;--widget-font-size-h2: 1.5em;--widget-font-size-h3: 1.2em;--widget-font-size-h4: 1em;--widget-font-size-h5: 1em;--widget-font-size-h6: 1em;--widget-line-height: normal;--widget-space: 0.5em;--widget-color-border: #e0e1e6;--widget-color-success: #198754;--widget-color-success-text: #fff;--widget-color-danger-text: #fff;--widget-color-danger: #dc3545;--widget-color-default: #fff;--widget-color-hover: rgba(0, 0, 0, 0.075);--widget-color-link: #337ab7;--widget-color-primary-text: #fff;--widget-color-primary: #337ab7;--widget-color-selected-text: #fff;--widget-color-selected: #337ab7;--widget-color-text: #000;--widget-color-table-background: #fff;--widget-border-width: 1px;--widget-button-padding-x: 12.6px;--widget-button-padding-y: 7px;--widget-button-padding-small-x: 10px;--widget-button-padding-small-y: 5.6px;--widget-button-padding-large-x: 17.5px;--widget-button-padding-large-y: 9.8px;--widget-input-padding-x: 10px;--widget-input-padding-y: 7px;--widget-margin-h1: 1.8em 0px;--widget-margin-h2: 1.5em 0px;--widget-margin-h3: 1.2em 0px;--widget-margin-h4: 1em 0px;--widget-margin-h5: 1em 0px;--widget-margin-h6: 1em 0px}.core_ui_root{font-family: var(--widget-font-family);font-size: var(--widget-font-size);line-height: var(--widget-line-height);box-sizing: border-box;width: 100%;padding: 0;margin: 0}.core_ui_root *{box-sizing: border-box}.link{text-decoration: none;color: var(--widget-color-link);cursor: pointer}.link:hover,.link:visited:hover{text-decoration: underline;color: red}.link:visited{text-decoration: none;color: var(--widget-color-link)}.nolink{text-decoration: inherit;color: inherit}.nolink:hover,.nolink:visited,.nolink:visited:hover{text-decoration: inherit;color: inherit}.cursor{cursor:pointer}.nowrap{white-space: nowrap}.bold{font-weight:bold}.nobold{font-weight:normal}.underline{text-decoration: underline}.center{text-align: center}.left{text-align: left}.right{text-align: right}.clear{clear: both}.hidden{display: none}.inline-block{display: inline-block}.scroll-lock{overflow: hidden;padding-right: 12px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.CSS";
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
Runtime.rtl.defClass(Runtime.Widget.CSS);
window["Runtime.Widget.CSS"] = Runtime.Widget.CSS;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.CSS;
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
Runtime.Widget.Image = {
	name: "Runtime.Widget.Image",
	extends: Runtime.Web.Component,
	props: {
		"src": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			if (this.src)
			{
				/* Element 'img' */
				let __v0 = this._e(__v, "img", {"src":this.layout.assets(this.src),"class":this._class_name(["widget_image", this.class]),"key":"image"});
			}
			else
			{
				/* Element 'div' */
				let __v1 = this._e(__v, "div", {"class":this._class_name(["widget_image", this.class]),"key":"no_image"});
				
				/* Element 'div' */
				let __v2 = this._e(__v1, "div", {"class":this._class_name(["widget_image__no_image"])});
				
				/* Text */
				this._t(__v2, "No image");
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Image,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_image.h-3405{display: inline-block}.widget_image__no_image.h-3405{display: flex;align-items: center;justify-content: center;font-size: 20px;text-transform: uppercase;width: 270px;height: 70px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Image";
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
Runtime.rtl.defClass(Runtime.Widget.Image);
window["Runtime.Widget.Image"] = Runtime.Widget.Image;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Image;
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
Runtime.Widget.Input = {
	name: "Runtime.Widget.Input",
	extends: Runtime.Web.Component,
	props: {
		"direct_update": {
			default: false,
		},
		"readonly": {
			default: false,
		},
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
		"default": {
			default: "",
		},
		"placeholder": {
			default: "",
		},
		"type": {
			default: "text",
		},
	},
	data: function ()
	{
		return {
			change_timer: null,
		};
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'input' */
			let __v0 = this._e(__v, "input", this._merge_attrs({"type":this.type,"name":this.name,"value":this.getValue(),"placeholder":this.placeholder,"ref":"input","onChange":this.onChange,"onKeydown":this.onKeyDown,"class":this._class_name(["widget_input"])}, props));
			
			return this._flatten(__v);
		},
		/**
 * Returns value
 */
		getValue: function()
		{
			if (this.value)
			{
				return this.value;
			}
			return this.default;
		},
		/**
 * Returns input props
 */
		getProps: function()
		{
			if (this.readonly)
			{
				return Runtime.Map.from({"readonly":true});
			}
			return Runtime.Map.from({});
		},
		/**
 * KeyDown event
 */
		onKeyDown: function(e)
		{
			if (!this.direct_update)
			{
				return ;
			}
			if (this.change_timer != null)
			{
				window.clearTimeout(this.change_timer);
				this.change_timer = null;
			}
			this.change_timer = window.setTimeout(() =>
			{
				this.onChange();
			}, 300);
		},
		/**
 * Change event
 */
		onChange: function(e)
		{
			var input = this.getRef("input");
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":input.value,"old_value":this.value,"data":this.data})));
		},
	},
};
Object.assign(Runtime.Widget.Input,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_input.h-f2df{width: 100%;font-family: var(--widget-font-family);font-size: var(--widget-font-size);padding: var(--widget-input-padding-y) var(--widget-input-padding-x);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal;min-height: 32px}.widget_input.h-f2df:focus{outline: transparent}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Input";
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
Runtime.rtl.defClass(Runtime.Widget.Input);
window["Runtime.Widget.Input"] = Runtime.Widget.Input;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Input;
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
Runtime.Widget.Label = {
	name: "Runtime.Widget.Label",
	extends: Runtime.Web.Component,
	props: {
		"value": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'span' */
			let __v0 = this._e(__v, "span", {"class":this._class_name(["widget_label"])});
			
			if (Runtime.rtl.isScalarValue(this.value))
			{
				/* Render */
				this._t(__v0, (!Runtime.rtl.isEmpty(this.value)) ? (this.value) : (""));
			}
			else if (Runtime.rtl.is_instanceof(this.value, "Runtime.Collection"))
			{
				for (let i = 0; i < this.value.count(); i++)
				{
					let item = this.value.get(i);
					
					/* Element 'div' */
					let __v1 = this._e(__v0, "div", {});
					
					/* Render */
					this._t(__v1, (!Runtime.rtl.isEmpty(item)) ? (item) : (""));
				}
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Label,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr("");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Label";
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
Runtime.rtl.defClass(Runtime.Widget.Label);
window["Runtime.Widget.Label"] = Runtime.Widget.Label;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Label;
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
Runtime.Widget.Link = {
	name: "Runtime.Widget.Link",
	extends: Runtime.Web.Component,
	props: {
		"href": {
			default: "",
		},
		"text": {
			default: "",
		},
		"target": {
			default: "_self",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let attrs = Runtime.Map.from({});
			
			if (this.target != "")
			{
				attrs = attrs.set("target", this.target);
			}
			
			/* Element 'a' */
			let __v0 = this._e(__v, "a", this._merge_attrs({"href":this.href,"class":this._class_name([this.class])}, attrs));
			
			/* Render */
			this._t(__v0, this.text);
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Link,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Link";
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
Runtime.rtl.defClass(Runtime.Widget.Link);
window["Runtime.Widget.Link"] = Runtime.Widget.Link;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Link;
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
Runtime.Widget.Menu = {
	name: "Runtime.Widget.Menu",
	extends: Runtime.Web.Component,
	props: {
		"items": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["menu", this.class])});
			
			for (let i = 0; i < this.items.count(); i++)
			{
				let item = this.items.get(i);
				
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["menu__item", ((this.menuActive(item.get("name"))) ? ("active") : (""))])});
				
				/* Element 'a' */
				let __v2 = this._e(__v1, "a", {"href":item.get("href"),"class":this._class_name(["nolink"])});
				
				/* Render */
				this._t(__v2, item.get("label"));
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns true if menu is active
 */
		menuActive: function(route_name)
		{
			if (this.layout.route == null)
			{
				return false;
			}
			if (this.layout.route.name != route_name)
			{
				return false;
			}
			return true;
		},
	},
};
Object.assign(Runtime.Widget.Menu,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".menu__item.h-035f a{display: block;padding: 10px;border-bottom: 1px solid var(--widget-color-border)}.menu__item.h-035f a:hover{background-color: var(--widget-color-hover)}.menu__item.active.h-035f a,.menu__item.active.h-035f a.nolink,.menu__item.active.h-035f a.nolink:visited{background-color: var(--widget-color-selected);border-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.menu__item.h-035f:last-child a{border-bottom-width: 0px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Menu";
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
Runtime.rtl.defClass(Runtime.Widget.Menu);
window["Runtime.Widget.Menu"] = Runtime.Widget.Menu;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Menu;
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
Runtime.Widget.Pagination = {
	name: "Runtime.Widget.Pagination",
	extends: Runtime.Web.Component,
	props: {
		"page": {
			default: 1,
		},
		"pages": {
			default: 1,
		},
		"delta": {
			default: 5,
		},
		"name": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let page_start = Runtime.Math.max(2, this.page - this.delta + 1);
			let page_end = Runtime.Math.min(this.page + this.delta, this.pages - 1);
			let props = Runtime.Map.from({});
			
			/* Element 'nav' */
			let __v0 = this._e(__v, "nav", {"class":this._class_name(["pagination"])});
			
			if (this.pages > 1)
			{
				/* Element 'ul' */
				let __v1 = this._e(__v0, "ul", {});
				
				if (this.name)
				{
					let _ = props.set("href", this.getPageUrl(1));
				}
				
				/* Element 'li' */
				let __v2 = this._e(__v1, "li", {"class":this._class_name([((this.page == 1) ? ("active") : (""))]),"key":1});
				
				/* Element 'a' */
				let __v3 = this._e(__v2, "a", this._merge_attrs({"onClick":() =>
				{
					return this.onClick(1);
				}}, props));
				
				/* Text */
				this._t(__v3, "1");
				
				if (page_start > 2)
				{
					/* Element 'li' */
					let __v4 = this._e(__v1, "li", {"key":"before"});
					
					/* Text */
					this._t(__v4, "...");
				}
				
				if (page_start <= page_end)
				{
					for (let p = page_start; p <= page_end; p++)
					{
						if (this.name)
						{
							let _ = props.set("href", this.getPageUrl(p));
						}
						
						/* Element 'li' */
						let __v5 = this._e(__v1, "li", {"class":this._class_name([((this.page == p) ? ("active") : (""))]),"key":p});
						
						/* Element 'a' */
						let __v6 = this._e(__v5, "a", this._merge_attrs({"onClick":() =>
						{
							return this.onClick(p);
						}}, props));
						
						/* Render */
						this._t(__v6, p);
					}
				}
				
				if (page_end < this.pages - 1)
				{
					/* Element 'li' */
					let __v7 = this._e(__v1, "li", {"key":"after"});
					
					/* Text */
					this._t(__v7, "...");
				}
				
				if (this.pages > 1)
				{
					if (this.name)
					{
						let _ = props.set("href", this.getPageUrl(this.pages));
					}
					
					/* Element 'li' */
					let __v8 = this._e(__v1, "li", {"class":this._class_name([((this.page == this.pages) ? ("active") : (""))]),"key":this.pages});
					
					/* Element 'a' */
					let __v9 = this._e(__v8, "a", this._merge_attrs({"onClick":() =>
					{
						return this.onClick(this.pages);
					}}, props));
					
					/* Render */
					this._t(__v9, this.pages);
				}
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns page url
 */
		getPageUrl: function(page)
		{
			var uri = this.layout.request_full_uri;
			return Runtime.rs.url_get_add(uri, this.name, page);
		},
		/**
 * Click event
 */
		onClick: function(page)
		{
			if (this.name)
			{
				return ;
			}
			this.emit("page", page);
		},
	},
};
Object.assign(Runtime.Widget.Pagination,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".pagination.h-e7d6{text-align: center;padding: 10px 0;width: 100%}.pagination.h-e7d6 ul,.pagination.h-e7d6 li{padding: 0;margin: 0}.pagination.h-e7d6 li{display: inline-block;vertical-align: top;list-style: none;margin-left: 5px;margin-right: 5px}.pagination.h-e7d6 a,.pagination.h-e7d6 a:hover,.pagination.h-e7d6 span{display: flex;align-items: center;justify-content: center;background-color: var(--widget-color-table-background);border-color: var(--widget-color-border);border-width: var(--widget-border-width);border-style: solid;border-radius: 4px;color: var(--widget-color-text);text-align: center;width: 30px;height: 30px;line-height: 0;font-size: 14px;text-decoration: none}.pagination.h-e7d6 li:first-child{margin-left: 0px}.pagination.h-e7d6 li.active a,.pagination.h-e7d6 li.active a:hover{background-color: var(--widget-color-selected);border-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.pagination.h-e7d6 li a:focus{outline: 0;box-shadow: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Pagination";
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
Runtime.rtl.defClass(Runtime.Widget.Pagination);
window["Runtime.Widget.Pagination"] = Runtime.Widget.Pagination;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Pagination;
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
Runtime.Widget.Container = {
	name: "Runtime.Widget.Container",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_container", this.class])});
			
			/* Render */
			this._t(__v0, this.renderSlot("default"));
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Container,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Container";
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
Runtime.rtl.defClass(Runtime.Widget.Container);
window["Runtime.Widget.Container"] = Runtime.Widget.Container;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Container;
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
Runtime.Widget.RenderList = {
	name: "Runtime.Widget.RenderList",
	extends: Runtime.Web.Component,
	methods:
	{
		renderItems: function()
		{
			let __v = [];
			let items_count = this.model.items.count();
			
			for (let i = 0; i < items_count; i++)
			{
				let widget = this.model.items.get(i);
				
				/* Render */
				this._t(__v, this.renderWidget(widget, Runtime.Map.from({"data":this.data,"render_list":Runtime.Map.from({"position":i,"count":items_count,"first":i == 0,"last":i == items_count - 1})})));
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"ref":"widget","class":this._class_name(["widget_render_list"])});
			
			/* Render */
			this._t(__v0, this.renderItems());
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.RenderList,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.RenderList";
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
Runtime.rtl.defClass(Runtime.Widget.RenderList);
window["Runtime.Widget.RenderList"] = Runtime.Widget.RenderList;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.RenderList;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.RenderListModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.RenderListModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.RenderListModel.prototype.constructor = Runtime.Widget.RenderListModel;
Object.assign(Runtime.Widget.RenderListModel.prototype,
{
	/**
	 * Find widget position
	 */
	find: function(widget)
	{
		return (widget) ? (this.items.find(Runtime.lib.equal(widget))) : (-1);
	},
	/**
	 * Find widget position by name
	 */
	findByName: function(widget_name)
	{
		return this.items.find(Runtime.lib.equalAttr("widget_name", widget_name));
	},
	/**
	 * Find widget position by name
	 */
	findItemByName: function(widget_name)
	{
		return this.items.findItem(Runtime.lib.equalAttr("widget_name", widget_name));
	},
	/**
	 * Add item
	 */
	addItem: function(widget, dest, kind)
	{
		if (dest == undefined) dest = "";
		if (kind == undefined) kind = "after";
		var pos = -1;
		if (dest != "")
		{
			pos = this.findByName(dest);
		}
		if (pos >= 0)
		{
			if (kind == "before")
			{
				this.items.insert(pos, widget);
			}
			else
			{
				this.items.insert(pos + 1, widget);
			}
		}
		else
		{
			if (kind == "before")
			{
				this.items.prepend(widget);
			}
			else
			{
				this.items.push(widget);
			}
		}
		return widget;
	},
	/**
	 * Remove item
	 */
	removeItem: function(widget)
	{
		var pos = this.find(widget);
		this.items.remove(pos);
	},
	/**
	 * Remove item
	 */
	removeItemByName: function(widget_name)
	{
		var pos = this.findByName(widget_name);
		this.items.remove(pos);
	},
	/**
	 * Returns button by index
	 */
	get: function(index)
	{
		return this.items.get(index);
	},
	/**
	 * Returns items count
	 */
	count: function()
	{
		return this.items.count();
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.widget_name = "render_list";
		this.component = "Runtime.Widget.RenderList";
		this.items = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Widget.RenderListModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.RenderListModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.RenderListModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.RenderListModel);
window["Runtime.Widget.RenderListModel"] = Runtime.Widget.RenderListModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.RenderListModel;
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
Runtime.Widget.RowButtons = {
	name: "Runtime.Widget.RowButtons",
	extends: Runtime.Widget.RenderList,
	props: {
		"styles": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			if (this.model)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_row_buttons", this.class, this.$options.getStyles("widget_row_buttons", this.model.styles)])});
				
				/* Render */
				this._t(__v0, this.renderItems());
			}
			else
			{
				/* Element 'div' */
				let __v1 = this._e(__v, "div", {"class":this._class_name(["widget_row_buttons", this.class, this.$options.getStyles("widget_row_buttons", this.styles)])});
				
				/* Render */
				this._t(__v1, this.renderSlot("default"));
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.RowButtons,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.RenderList"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_row_buttons.h-a598{display: flex;gap: var(--widget-space)}.widget_row_buttons--align-end.h-a598{justify-content: end}.widget_row_buttons--no-gap.h-a598{gap: 0}.widget_row_buttons--no-gap.h-a598 .widget_button.h-8dd7{border-right-width: 0;border-radius: 0}.widget_row_buttons--no-gap.h-a598 .widget_button.item--first.h-8dd7{border-top-left-radius: 4px;border-bottom-left-radius: 4px}.widget_row_buttons--no-gap.h-a598 .widget_button.item--last.h-8dd7{border-top-right-radius: 4px;border-bottom-right-radius: 4px;border-right-width: var(--widget-border-width) !important}.widget_row_buttons--top_buttons.h-a598{margin-bottom: 10px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.RowButtons";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.RenderList";
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
Runtime.rtl.defClass(Runtime.Widget.RowButtons);
window["Runtime.Widget.RowButtons"] = Runtime.Widget.RowButtons;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.RowButtons;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.RowButtonsModel = function()
{
	Runtime.Widget.RenderListModel.apply(this, arguments);
};
Runtime.Widget.RowButtonsModel.prototype = Object.create(Runtime.Widget.RenderListModel.prototype);
Runtime.Widget.RowButtonsModel.prototype.constructor = Runtime.Widget.RowButtonsModel;
Object.assign(Runtime.Widget.RowButtonsModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.RenderListModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.RenderListModel.prototype.initWidget.call(this, params);
		/* Setup buttons */
		if (params.has("buttons"))
		{
			this.buttons = Runtime.Vector.from([]);
			this.addButtons(params.get("buttons"));
		}
	},
	/**
	 * Add button
	 */
	addButton: function(button)
	{
		/* Create button model */
		var model = this.createModel(button, "Runtime.Widget.ButtonModel");
		/* Settings */
		var dest = "";
		var kind = "after";
		if (button instanceof Runtime.Dict)
		{
			dest = button.get("dest", "");
			kind = button.get("kind", "after");
		}
		/* Add button */
		this.addItem(model, dest, kind);
		/* Add listener */
		model.addListener("click", new Runtime.Callback(this, "onButtonClick"));
		/* Return model */
		return model;
	},
	/**
	 * Add buttons
	 */
	addButtons: function(buttons)
	{
		for (var i = 0; i < buttons.count(); i++)
		{
			this.addButton(buttons.get(i));
		}
	},
	/**
	 * Buttons click
	 */
	onButtonClick: function(message)
	{
		this.emit(message);
	},
	_init: function()
	{
		Runtime.Widget.RenderListModel.prototype._init.call(this);
		this.buttons = Runtime.Vector.from([]);
		this.styles = Runtime.Vector.from([]);
		this.component = "Runtime.Widget.RowButtons";
	},
});
Object.assign(Runtime.Widget.RowButtonsModel, Runtime.Widget.RenderListModel);
Object.assign(Runtime.Widget.RowButtonsModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.RowButtonsModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.RenderListModel";
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
Runtime.rtl.defClass(Runtime.Widget.RowButtonsModel);
window["Runtime.Widget.RowButtonsModel"] = Runtime.Widget.RowButtonsModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.RowButtonsModel;
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
Runtime.Widget.Section = {
	name: "Runtime.Widget.Section",
	extends: Runtime.Web.Component,
	props: {
		"wrap": {
			default: "true",
		},
		"flex": {
			default: "false",
		},
		"align_items": {
			default: "",
		},
		"justify_content": {
			default: "",
		},
		"flex_wrap": {
			default: "",
		},
		"height": {
			default: "",
		},
		"min_height": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"style":this.getStyle(),"class":this._class_name(["widget_section", this.class])});
			
			if (this.wrap == "true")
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"style":this.getWrapStyle(),"class":this._class_name(["widget_section__wrap"])});
				
				/* Render */
				this._t(__v1, this.renderSlot("default"));
			}
			else
			{
				/* Render */
				this._t(__v0, this.renderSlot("default"));
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns styles
 */
		getStyle: function()
		{
			var res = Runtime.Vector.from([]);
			if (!this.wrap)
			{
				res.push(this.getWrapStyle());
			}
			return Runtime.rs.join(";", res);
		},
		/**
 * Returns wrap style
 */
		getWrapStyle: function()
		{
			var res = Runtime.Vector.from([]);
			if (this.flex == "true")
			{
				res.push("display: flex;");
				if (this.align_items)
				{
					res.push("align-items: " + Runtime.rtl.toStr(this.align_items));
				}
				if (this.justify_content)
				{
					res.push("justify-content: " + Runtime.rtl.toStr(this.justify_content));
				}
				if (this.flex_wrap)
				{
					res.push("flex-wrap: " + Runtime.rtl.toStr(this.flex_wrap));
				}
			}
			if (this.height)
			{
				res.push("height: " + Runtime.rtl.toStr(this.height));
			}
			if (this.min_height)
			{
				res.push("min-height: " + Runtime.rtl.toStr(this.min_height));
			}
			return Runtime.rs.join(";", res);
		},
	},
};
Object.assign(Runtime.Widget.Section,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_section__wrap.h-c82b{max-width: 1200px;margin-left: auto;margin-right: auto;padding: 0px 0px;padding-left: 10px;padding-right: 10px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Section";
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
Runtime.rtl.defClass(Runtime.Widget.Section);
window["Runtime.Widget.Section"] = Runtime.Widget.Section;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Section;
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
Runtime.Widget.Select = {
	name: "Runtime.Widget.Select",
	extends: Runtime.Web.Component,
	props: {
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
		"default": {
			default: "",
		},
		"options": {
			default: null,
		},
		"show_select_value": {
			default: true,
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'select' */
			let __v0 = this._e(__v, "select", {"name":this.name,"onChange":this.onChange,"class":this._class_name(["widget_select"])});
			let value = this.getValue();
			let options = this.getOptions();
			let selected = Runtime.Map.from({});
			
			if (this.show_select_value === true || this.show_select_value == "true")
			{
				if (value === "" || value === null)
				{
					selected = Runtime.Map.from({"selected":"selected"});
				}
				
				/* Element 'option' */
				let __v1 = this._e(__v0, "option", this._merge_attrs({"value":"","key":":select_value"}, selected));
				
				/* Text */
				this._t(__v1, "Select value");
			}
			
			if (options != null)
			{
				for (let i = 0; i < options.count(); i++)
				{
					let item = options.get(i);
					selected = Runtime.Map.from({});
					
					if (item.get("key") == value && value !== "" && value !== null)
					{
						selected = Runtime.Map.from({"selected":"selected"});
					}
					
					/* Element 'option' */
					let __v2 = this._e(__v0, "option", this._merge_attrs({"value":"" + Runtime.rtl.toStr(item.get("key")),"key":item.get("key")}, selected));
					
					/* Render */
					this._t(__v2, item.get("value"));
				}
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns value
 */
		getValue: function()
		{
			if (this.value !== "" && this.value !== null)
			{
				return this.value;
			}
			return this.default;
		},
		/**
 * Returns options
 */
		getOptions: function()
		{
			if (this.model == null)
			{
				return this.options;
			}
			return this.model.getOptions();
		},
		/**
 * Change event
 */
		onChange: function(e)
		{
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":e.target.value,"old_value":this.value,"data":this.data})));
		},
	},
};
Object.assign(Runtime.Widget.Select,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_select.h-d72d,.widget_select.h-d72d:focus{width: 100%;font-family: var(--widget-font-family);font-size: var(--widget-font-size);padding: var(--widget-input-padding-y) var(--widget-input-padding-x);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal;color: inherit;max-width: 100%;min-height: 32px}.widget_select.h-d72d:hover{color: inherit}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Select";
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
Runtime.rtl.defClass(Runtime.Widget.Select);
window["Runtime.Widget.Select"] = Runtime.Widget.Select;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Select;
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
Runtime.Widget.SelectLabel = {
	name: "Runtime.Widget.SelectLabel",
	extends: Runtime.Web.Component,
	props: {
		"value": {
			default: "",
		},
		"options": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'span' */
			let __v0 = this._e(__v, "span", {"class":this._class_name(["widget_select_label"])});
			let item = (this.options) ? (this.options.findItem((item) =>
			{
				return item.get("key") == this.value;
			})) : (null);
			
			/* Render */
			this._t(__v0, (item != null) ? (item.get("value")) : (this.value));
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.SelectLabel,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr("");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.SelectLabel";
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
Runtime.rtl.defClass(Runtime.Widget.SelectLabel);
window["Runtime.Widget.SelectLabel"] = Runtime.Widget.SelectLabel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.SelectLabel;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.SelectModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.SelectModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.SelectModel.prototype.constructor = Runtime.Widget.SelectModel;
Object.assign(Runtime.Widget.SelectModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("filter"))
		{
			this.filter = params.get("filter");
		}
		if (params.has("foreign_key"))
		{
			this.foreign_key = params.get("foreign_key");
		}
		if (params.has("transform"))
		{
			this.transform = params.get("transform");
		}
		/* Setup storage */
		if (params.has("storage"))
		{
			this.storage = this.createModel(params.get("storage"));
		}
		if (this.storage != null)
		{
			this.storage.setTable(this);
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
		/* Result */
		this.result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"widget_name":"result"}));
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "items", data);
		serializer.process(this, "result", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Set api result
	 */
	setApiResult: function(res, action)
	{
		if (res == null)
		{
			return ;
		}
		/* Set items */
		if (res.data.has("items"))
		{
			this.items = res.data.get("items");
			if (this.transform)
			{
				this.items = this.items.map(this.transform);
			}
		}
		/* Set result */
		this.result.setApiResult(res);
	},
	/**
	 * Merge post data
	 */
	mergePostData: function(post_data, action)
	{
		if (this.foreign_key)
		{
			post_data.set("foreign_key", this.foreign_key);
		}
		return post_data;
	},
	/**
	 * Load table data
	 */
	loadData: async function(container)
	{
		await Runtime.Web.BaseModel.prototype.loadData.call(this, container);
		var res = await this.storage.load();
		this.setApiResult(res, "load");
	},
	/**
	 * Returns options
	 */
	getOptions: function()
	{
		return (this.filter) ? (this.items.filter(this.filter)) : (this.items);
	},
	/**
	 * Returns props
	 */
	getProps: function(data)
	{
		var result = Runtime.Map.from({"options":this.getOptions()});
		return result;
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.SelectWrap";
		this.items = Runtime.Vector.from([]);
		this.foreign_key = null;
		this.storage = null;
		this.result = null;
		this.filter = null;
		this.transform = null;
		this.page = 0;
		this.limit = -1;
	},
});
Object.assign(Runtime.Widget.SelectModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.SelectModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.SelectModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.SelectModel);
window["Runtime.Widget.SelectModel"] = Runtime.Widget.SelectModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.SelectModel;
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
Runtime.Widget.SelectWrap = {
	name: "Runtime.Widget.SelectWrap",
	extends: Runtime.Web.Component,
	props: {
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
		"component": {
			default: "Runtime.Widget.Select",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let props = this.model.getProps(this.data);
			
			/* Component '{this.component}' */
			let __v0 = this._c(__v, this.component, this._merge_attrs({"name":this.name,"value":this.value,"render_list":this.render_list,"class":this._class_name([this.class])}, props));
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.SelectWrap,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Select"]);
	},
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.SelectWrap";
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
Runtime.rtl.defClass(Runtime.Widget.SelectWrap);
window["Runtime.Widget.SelectWrap"] = Runtime.Widget.SelectWrap;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.SelectWrap;
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
Runtime.Widget.SortableList = {
	name: "Runtime.Widget.SortableList",
	extends: Runtime.Web.Component,
	props: {
		"show_buttons": {
			default: "true",
		},
		"name": {
			default: "",
		},
		"value": {
			default: Runtime.Vector.from([]),
		},
	},
	data: function ()
	{
		return {
			old_value: Runtime.Vector.from([]),
			is_drag: false,
			is_transition: false,
			drag_elem: null,
			drag_item: null,
			drag_item_pos: -1,
			shadow_elem: null,
			drag_elem_css: null,
			drag_start_point: null,
			duration: 300,
		};
	},
	methods:
	{
		renderValue: function(pos, item)
		{
			let __v = [];
			
			/* Component 'Input' */
			let __v0 = this._c(__v, "Runtime.Widget.Input", {"value":item,"onValueChange":(message) =>
			{
				this.value.set(pos, message.value);
				this.onValueChange();
			},"key":item});
			
			return this._flatten(__v);
		},
		renderItem: function(pos)
		{
			let __v = [];
			let item = this.value.get(pos);
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"data-pos":pos,"class":this._class_name(["widget_sortable_list__item"]),"key":item});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"onMousedown":(e) =>
			{
				this.onMouseDown(e, item);
			},"class":this._class_name(["widget_sortable_list__item_drag"])});
			
			/* Raw */
			this._t(__v1, new Runtime.RawString("&#9776;"));
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_sortable_list__item_value"])});
			
			/* Render */
			this._t(__v2, this.renderValue(pos, item));
			
			/* Element 'div' */
			let __v3 = this._e(__v0, "div", {"onClick":(e) =>
			{
				this.removeItem(pos);
			},"class":this._class_name(["widget_sortable_list__item_remove"])});
			
			/* Raw */
			this._t(__v3, new Runtime.RawString("&#10005;"));
			
			return this._flatten(__v);
		},
		renderItems: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_sortable_list__items"])});
			
			if (this.value)
			{
				for (let i = 0; i < this.value.count(); i++)
				{
					/* Render */
					this._t(__v0, this.renderItem(i));
				}
			}
			
			return this._flatten(__v);
		},
		renderButtons: function()
		{
			let __v = [];
			
			if (this.show_buttons == "true")
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_sortable_list__buttons"])});
				
				/* Component 'Button' */
				let __v1 = this._c(__v0, "Runtime.Widget.Button", {"styles":Runtime.Vector.from(["small"]),"onClick":this.onAddItemClick}, () => {
					let __v = [];
					
					/* Text */
					this._t(__v, "Add");
					
					return this._flatten(__v);
				});
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_sortable_list"])});
			
			/* Render */
			this._t(__v0, this.renderItems());
			
			/* Render */
			this._t(__v0, this.renderButtons());
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"ref":"shadow","class":this._class_name(["widget_sortable_list__shadow"])});
			
			return this._flatten(__v);
		},
		/**
 * Swap items
 */
		swapItems: function(a, b)
		{
			if (a > b)
			{
				var c = a;
				a = b;
				b = c;
			}
			var obj_a = this.value.get(a);
			var obj_b = this.value.get(b);
			this.value.remove(b);
			this.value.insert(b, obj_a);
			this.value.remove(a);
			this.value.insert(a, obj_b);
		},
		/**
 * Remove item
 */
		removeItem: function(pos)
		{
			this.old_value = this.value.slice();
			this.value.remove(pos);
			this.onValueChange();
		},
		/**
 * Returns drag & drop element from point
 */
		getDragElementFromPoint: function(x, y)
		{
			var items = document.elementsFromPoint(x, y);
			for (var i = 0; i < items.length; i++)
			{
				var elem = Runtime.rtl.attr(items, i);
				if (elem.parentElement == this.shadow_elem)
				{
					continue;
				}
				if (elem.classList.contains("widget_sortable_list__item"))
				{
					return elem;
				}
			}
			return null;
		},
		/**
 * Returns drag & drop element
 */
		getDragElement: function(elem)
		{
			if (elem.classList.contains("widget_sortable_list__item"))
			{
				return elem;
			}
			if (elem.parentElement.classList.contains("widget_sortable_list__item"))
			{
				return elem.parentElement;
			}
			return null;
		},
		/**
 * Create shadow elem
 */
		createShadow: function()
		{
			if (!this.drag_elem)
			{
				return ;
			}
			this.shadow_elem = document.createElement("div");
			this.shadow_elem.innerHTML = this.drag_elem.outerHTML;
			this.shadow_elem.classList.add("widget_sortable_list__shadow_elem");
			var arr = Runtime.rs.split(" ", this.$options.getCssHash(this.$options.getClassName()));
			arr = arr.filter(Runtime.lib.equalNot(""));
			for (var i = 0; i < arr.count(); i++)
			{
				this.shadow_elem.classList.add(arr.get(i));
			}
			this.shadow_elem.style.height = this.drag_elem.offsetHeight + Runtime.rtl.toStr("px");
			this.shadow_elem.style.width = this.drag_elem.offsetWidth + Runtime.rtl.toStr("px");
			this.getRef("shadow").appendChild(this.shadow_elem);
		},
		/**
 * Move shadow element
 */
		moveShadow: function(x, y)
		{
			if (!this.shadow_elem)
			{
				return ;
			}
			var left = x - this.drag_start_point.get("shift_x");
			var top = y - this.drag_start_point.get("shift_y");
			this.shadow_elem.style.left = left + Runtime.rtl.toStr("px");
			this.shadow_elem.style.top = top + Runtime.rtl.toStr("px");
		},
		/**
 * Start Drag & Drop
 */
		startDrag: function(e)
		{
			if (this.is_drag != false)
			{
				return false;
			}
			if (this.drag_start_point == null)
			{
				return false;
			}
			/* Check move */
			var move_x = Runtime.Math.abs(e.pageX - this.drag_start_point.get("x"));
			var move_y = Runtime.Math.abs(e.pageY - this.drag_start_point.get("y"));
			if (move_x < 10 && move_y < 10)
			{
				return false;
			}
			/* Start drag */
			this.is_drag = true;
			this.createShadow();
			return true;
		},
		/**
 * Stop drag & drop
 */
		stopDrag: function()
		{
			if (!this.is_drag)
			{
				return ;
			}
			this.is_drag = false;
			this.is_transition = false;
			this.drag_elem = null;
			this.drag_start_point = null;
			this.shadow_elem.remove();
			this.shadow_elem = null;
		},
		/**
 * Move drag & drop
 */
		moveDrag: function(e)
		{
			if (!this.is_drag)
			{
				return ;
			}
			this.moveShadow(e.pageX, e.pageY);
			if (this.is_transition)
			{
				return ;
			}
			var elem = this.getDragElementFromPoint(e.pageX, e.pageY);
			if (!elem)
			{
				return ;
			}
			var pos = elem.getAttribute("data-pos");
			if (pos == this.drag_item_pos)
			{
				return ;
			}
			/* Swap items with animation */
			this.is_transition = true;
			this.old_value = this.value.slice();
			this.swapItems(this.drag_item_pos, pos);
			this.drag_item_pos = pos;
			/* Stop animation */
			window.setTimeout(() =>
			{
				this.is_transition = false;
			}, this.duration);
			/* Send value change */
			this.onValueChange();
		},
		/**
 * On value change
 */
		onValueChange: function()
		{
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":this.old_value,"data":this.data})));
		},
		/**
 * Add item click
 */
		onAddItemClick: function()
		{
			this.old_value = this.value.slice();
			this.value.push("");
			this.onValueChange();
		},
		/**
 * Mouse down
 */
		onMouseDown: function(e, item)
		{
			if (e.button != 0)
			{
				return ;
			}
			if (this.is_drag)
			{
				return ;
			}
			/* Set start drag item */
			this.drag_elem = this.getDragElement(e.target);
			this.drag_item = item;
			this.drag_item_pos = this.drag_elem.getAttribute("data-pos");
			this.drag_start_point = Runtime.Map.from({"x":e.pageX,"y":e.pageY,"shift_x":e.pageX - e.target.offsetLeft,"shift_y":e.pageY - e.target.offsetTop});
			/* Add event listener */
			document.addEventListener("mouseup", this.onMouseUp);
			document.addEventListener("mousemove", this.onMouseMove);
			e.preventDefault();
			return false;
		},
		/**
 * Mouse tree up
 */
		onMouseUp: function(e)
		{
			/* Remove event listener */
			document.removeEventListener("mouseup", this.onMouseUp);
			document.removeEventListener("mousemove", this.onMouseMove);
			/* Stop drag & drop */
			this.stopDrag();
		},
		/**
 * Mouse move
 */
		onMouseMove: function(e)
		{
			if (this.drag_elem == null)
			{
				return ;
			}
			/* Try to start drag & drop */
			if (!this.is_drag)
			{
				this.startDrag(e);
			}
			if (!this.is_drag)
			{
				return ;
			}
			/* Move Drag & Drop */
			this.moveDrag(e);
		},
	},
};
Object.assign(Runtime.Widget.SortableList,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.Select"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_sortable_list.h-2647{position: relative}.widget_sortable_list__item.h-2647{display: flex;align-items: center;justify-content: flex-start;border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;margin: 5px}.widget_sortable_list__item_drag.h-2647,.widget_sortable_list__item_remove.h-2647{cursor: pointer;padding: 0px 5px}.widget_sortable_list__item_value.h-2647{flex: 1}.widget_sortable_list__item_value.h-2647 .widget_input.h-f2df{padding: 0px 10px;border-color: transparent;border-radius: 0;border-width: 0}.widget_sortable_list__buttons.h-2647{text-align: center;margin-top: var(--widget-space)}.widget_sortable_list__shadow_elem.h-2647{position: absolute;opacity: 0.5;user-select: none;z-index: 9999999}.widget_sortable_list__shadow_elem.h-2647 .widget_sortable_list__item.h-2647{margin: 0}.widget_sortable_list__animation-move.h-2647,.widget_sortable_list__animation-enter-active.h-2647,.widget_sortable_list__animation-leave-active.h-2647{transition: all 0.3s ease}.widget_sortable_list__animation-enter-from.h-2647,.widget_sortable_list__animation-leave-to.h-2647{opacity: 0}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.SortableList";
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
Runtime.rtl.defClass(Runtime.Widget.SortableList);
window["Runtime.Widget.SortableList"] = Runtime.Widget.SortableList;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.SortableList;
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
Runtime.Widget.Tag = {
	name: "Runtime.Widget.Tag",
	extends: Runtime.Web.Component,
	props: {
		"name": {
			default: "",
		},
		"value": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_tag"])});
			
			if (this.value)
			{
				for (let i = 0; i < this.value.count(); i++)
				{
					/* Element 'div' */
					let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_tag__item"])});
					
					/* Element 'div' */
					let __v2 = this._e(__v1, "div", {"contenteditable":"true","onBlur":(e) =>
					{
						this.onTextChange(i, e.target.innerText);
					},"onKeydown":(e) =>
					{
						this.onTextKeyDown(i, e.target.innerText, e);
					},"class":this._class_name(["widget_tag__text"])});
					
					/* Render */
					this._t(__v2, this.value.get(i));
					
					/* Element 'div' */
					let __v3 = this._e(__v1, "div", {"onClick":() =>
					{
						this.onCloseClick(i);
					},"class":this._class_name(["widget_tag__close"])});
					
					/* Text */
					this._t(__v3, "x");
				}
			}
			
			/* Element 'span' */
			let __v4 = this._e(__v0, "span", {"contenteditable":"true","onBlur":this.onSpanBlur,"onKeydown":this.onSpanKeyDown,"ref":"span","class":this._class_name(["widget_tag__span"])});
			
			return this._flatten(__v);
		},
		/**
 * Text change
 */
		onTextChange: function(i, value)
		{
			var old_value = this.value.slice();
			this.value.set(i, value);
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
		},
		/**
 * Text keydown
 */
		onTextKeyDown: function(i, value, e)
		{
			if (e.keyCode != 13)
			{
				return ;
			}
			/* Set value */
			var old_value = this.value.slice();
			this.value.set(i, value);
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
			e.preventDefault();
			return false;
		},
		/**
 * Close click
 */
		onCloseClick: function(i)
		{
			var old_value = this.value.slice();
			this.value.remove(i);
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
		},
		/**
 * Span blur
 */
		onSpanBlur: function(e)
		{
			var span = this.getRef("span");
			if (span.innerText == "")
			{
				return ;
			}
			/* Add value */
			var old_value = this.value.slice();
			this.value.push(span.innerText);
			span.innerText = "";
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
		},
		/**
 * Span keydown
 */
		onSpanKeyDown: function(e)
		{
			if (e.keyCode != 13)
			{
				return ;
			}
			var span = this.getRef("span");
			if (span.innerText == "")
			{
				return ;
			}
			/* Add value */
			var old_value = this.value.slice();
			this.value.push(span.innerText);
			span.innerText = "";
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":old_value,"data":this.data})));
			e.preventDefault();
			return false;
		},
	},
};
Object.assign(Runtime.Widget.Tag,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_tag.h-27ee{display: flex;flex-wrap: wrap;font-family: var(--widget-font-family);font-size: var(--widget-font-size);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal;padding: 2px;min-height: 40px;width: 100%}.widget_tag__item.h-27ee{display: flex;align-items: stretch;justify-content: space-between;border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;padding: 3px 5px;margin: 5px}.widget_tag__text.h-27ee{overflow-wrap: anywhere;outline: 0}.widget_tag__close.h-27ee{display: inline-flex;align-items: center;justify-content: center;margin-left: 5px;cursor: pointer}.widget_tag__span.h-27ee{overflow-wrap: anywhere;min-width: 100px;padding: 3px;margin: 5px;outline: 0}.widget_tag__span.h-27ee:first-child{padding-left: 0}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tag";
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
Runtime.rtl.defClass(Runtime.Widget.Tag);
window["Runtime.Widget.Tag"] = Runtime.Widget.Tag;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tag;
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
Runtime.Widget.TextArea = {
	name: "Runtime.Widget.TextArea",
	extends: Runtime.Web.Component,
	props: {
		"direct_update": {
			default: false,
		},
		"readonly": {
			default: false,
		},
		"height": {
			default: "",
		},
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
		"placeholder": {
			default: "",
		},
	},
	data: function ()
	{
		return {
			change_timer: null,
		};
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'textarea' */
			let __v0 = this._e(__v, "textarea", this._merge_attrs({"name":this.name,"placeholder":this.placeholder,"style":this.getStyle(),"ref":"textarea","onChange":this.onChange,"onKeydown":this.onKeyDown,"class":this._class_name(["widget_textarea"])}, props));
			
			/* Render */
			this._t(__v0, this.value);
			
			return this._flatten(__v);
		},
		/**
 * Returns textarea props
 */
		getProps: function()
		{
			if (this.readonly)
			{
				return Runtime.Map.from({"readonly":true});
			}
			return Runtime.Map.from({});
		},
		/**
 * Returns style
 */
		getStyle: function()
		{
			var content = Runtime.Vector.from([]);
			if (this.height)
			{
				content.push("min-height: " + Runtime.rtl.toStr(this.height));
			}
			return Runtime.rs.join(";", content);
		},
		/**
 * Updated event
 */
		onUpdated: function()
		{
			var textarea = this.getRef("textarea");
			textarea.value = this.value;
		},
		/**
 * KeyDown event
 */
		onKeyDown: function(e)
		{
			if (!this.direct_update)
			{
				return ;
			}
			if (this.change_timer != null)
			{
				window.clearTimeout(this.change_timer);
				this.change_timer = null;
			}
			this.change_timer = window.setTimeout(() =>
			{
				this.onChange();
			}, 300);
		},
		/**
 * Change event
 */
		onChange: function()
		{
			var textarea = this.getRef("textarea");
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":textarea.value,"old_value":this.value,"data":this.data})));
		},
	},
};
Object.assign(Runtime.Widget.TextArea,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_textarea.h-ee82{width: 100%;max-width: 100%;min-height: 400px;font-family: var(--widget-font-family);font-size: var(--widget-font-size);padding: var(--widget-input-padding-y) var(--widget-input-padding-x);background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;outline: transparent;line-height: normal}.widget_textarea.h-ee82:focus{outline: transparent}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.TextArea";
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
Runtime.rtl.defClass(Runtime.Widget.TextArea);
window["Runtime.Widget.TextArea"] = Runtime.Widget.TextArea;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.TextArea;
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
Runtime.Widget.TextEditable = {
	name: "Runtime.Widget.TextEditable",
	extends: Runtime.Web.Component,
	props: {
		"reference": {
			default: null,
		},
		"readonly": {
			default: false,
		},
		"timeout": {
			default: 500,
		},
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
	},
	data: function ()
	{
		return {
			change_timer: null,
			old_value: null,
		};
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", this._merge_attrs({"name":this.name,"contenteditable":"plaintext-only","onKeydown":this.onKeyDown,"onInput":this.onInput,"ref":"text","class":this._class_name(["widget_text_editable", this.class])}, props));
			
			return this._flatten(__v);
		},
		/**
 * Returns value
 */
		getValue: function()
		{
			return this.getRef("text").innerText;
		},
		/**
 * Set value
 */
		setValue: function(content)
		{
			var text = this.getRef("text");
			text.innerText = content;
			this.old_value = content;
		},
		/**
 * Returns textarea props
 */
		getProps: function()
		{
			if (this.readonly)
			{
				return Runtime.Map.from({"readonly":true});
			}
			return Runtime.Map.from({});
		},
		/**
 * Mounted event
 */
		onMounted: function()
		{
			if (this.reference)
			{
				this.reference.setValue(this);
			}
			this.setValue(this.value);
		},
		/**
 * Updated event
 */
		onUpdated: function()
		{
			if (this.old_value == this.value)
			{
				return ;
			}
			if (this.change_timer)
			{
				return ;
			}
			this.setValue(this.value);
		},
		/**
 * Key down event
 */
		onKeyDown: function(e)
		{
			if (e.key == "Tab")
			{
				e.preventDefault();
				e.stopPropagation();
				var selection = this.getRef("text").ownerDocument.defaultView.getSelection();
				var range = selection.getRangeAt(0);
				var node = document.createTextNode("\t");
				range.insertNode(node);
				range.setStartAfter(node);
				range.setEndAfter(node);
			}
		},
		/**
 * Input event
 */
		onInput: function(e)
		{
			if (this.change_timer != null)
			{
				window.clearTimeout(this.change_timer);
				this.change_timer = null;
			}
			this.change_timer = window.setTimeout(() =>
			{
				this.onChange();
			}, this.timeout);
		},
		/**
 * Change event
 */
		onChange: function(e)
		{
			var value = this.getValue();
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":value,"old_value":this.old_value,"data":this.data})));
			/* Set old value */
			this.old_value = value;
			this.change_timer = null;
		},
	},
};
Object.assign(Runtime.Widget.TextEditable,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_text_editable.h-86cd{width: 100%;max-width: 100%;font-family: monospace;font-size: var(--widget-font-size);padding: var(--widget-button-padding-y) var(--widget-button-padding-x);margin: 0;background-color: var(--widget-color-default);border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;box-shadow: none;overflow: auto;outline: transparent;line-height: 1.5;tab-size: 4;text-wrap: balance;white-space: pre}.widget_text_editable.wrap.h-86cd{overflow-wrap: break-word;text-wrap: wrap}.widget_text_editable.overflow.h-86cd{overflow: auto;text-wrap: nowrap}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.TextEditable";
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
Runtime.rtl.defClass(Runtime.Widget.TextEditable);
window["Runtime.Widget.TextEditable"] = Runtime.Widget.TextEditable;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.TextEditable;
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
Runtime.Widget.TextImage = {
	name: "Runtime.Widget.TextImage",
	extends: Runtime.Web.Component,
	props: {
		"kind": {
			default: "text_right",
		},
		"image": {
			default: "",
		},
		"content": {
			default: "",
		},
	},
	methods:
	{
		renderContent: function()
		{
			let __v = [];
			let content = Runtime.rs.split("\n", this.content);
			
			if (content.count() == 1)
			{
				/* Render */
				this._t(__v, content.get(0));
			}
			else
			{
				for (let i = 0; i < content.count(); i++)
				{
					let item = content.get(i);
					
					/* Element 'div' */
					let __v0 = this._e(__v, "div", {});
					
					/* Render */
					this._t(__v0, (!Runtime.rtl.isEmpty(item)) ? (item) : (""));
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_text_image", this.getClass(), this.class])});
			
			if (this.kind == "text_bottom" || this.kind == "text_right")
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_text_image__image"])});
				
				/* Component 'Image' */
				let __v2 = this._c(__v1, "Runtime.Widget.Image", {"src":this.image});
				
				/* Element 'div' */
				let __v3 = this._e(__v0, "div", {"class":this._class_name(["widget_text_image__text"])});
				
				/* Render */
				this._t(__v3, this.renderContent(this.content));
			}
			else if (this.kind == "text_top" || this.kind == "text_left")
			{
				/* Element 'div' */
				let __v4 = this._e(__v0, "div", {"class":this._class_name(["widget_text_image__text"])});
				
				/* Render */
				this._t(__v4, this.renderContent(this.content));
				
				/* Element 'div' */
				let __v5 = this._e(__v0, "div", {"class":this._class_name(["widget_text_image__image"])});
				
				/* Component 'Image' */
				let __v6 = this._c(__v5, "Runtime.Widget.Image", {"src":this.image});
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns class
 */
		getClass: function()
		{
			var styles = Runtime.Vector.from([]);
			styles.push("widget_text_image--" + Runtime.rtl.toStr(this.kind));
			return Runtime.rs.join(" ", styles);
		},
	},
};
Object.assign(Runtime.Widget.TextImage,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Image"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_text_image--text_left.h-e2c7,.widget_text_image--text_right.h-e2c7{display: flex;align-items: center;justify-content: space-between}.widget_text_image--text_top.h-e2c7,.widget_text_image--text_bottom.h-e2c7{text-align: center}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.TextImage";
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
Runtime.rtl.defClass(Runtime.Widget.TextImage);
window["Runtime.Widget.TextImage"] = Runtime.Widget.TextImage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.TextImage;
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
Runtime.Widget.WidgetResult = {
	name: "Runtime.Widget.WidgetResult",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_result", this.getErrorClass(), this.$options.getStyles("widget_result", this.model.styles)])});
			
			/* Render */
			this._t(__v0, this.model.message);
			
			return this._flatten(__v);
		},
		/**
 * Returns error class
 */
		getErrorClass: function()
		{
			if (this.model.message == "")
			{
				return "widget_result--hide";
			}
			if (this.model.isSuccess())
			{
				return "widget_result--success";
			}
			if (this.model.isError())
			{
				return "widget_result--error";
			}
			return "";
		},
	},
};
Object.assign(Runtime.Widget.WidgetResult,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_result.h-e870{text-align: center}.widget_result--margin_top.h-e870{margin-top: var(--widget-space)}.widget_result--success.h-e870{color: var(--widget-color-success)}.widget_result--error.h-e870{color: var(--widget-color-danger)}.widget_result--hide.h-e870{display: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetResult";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetResult);
window["Runtime.Widget.WidgetResult"] = Runtime.Widget.WidgetResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetResult;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.WidgetResultModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.WidgetResultModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.WidgetResultModel.prototype.constructor = Runtime.Widget.WidgetResultModel;
Object.assign(Runtime.Widget.WidgetResultModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
	},
	/**
	 * Message
	 */
	setMessage: function(message)
	{
		this.message = message;
	},
	/**
	 * Success
	 */
	setSuccess: function(message, code)
	{
		if (code == undefined) code = 1;
		this.code = code;
		this.message = message;
	},
	/**
	 * Error
	 */
	setError: function(message, code)
	{
		if (code == undefined) code = -1;
		this.code = code;
		this.message = message;
	},
	/**
	 * Set exception
	 */
	setException: function(e)
	{
		this.code = e.getErrorCode();
		this.message = e.getErrorMessage();
	},
	/**
	 * Set api result
	 */
	setApiResult: function(res)
	{
		this.code = res.code;
		this.message = res.message;
	},
	/**
	 * Set wait message
	 */
	setWaitMessage: function(message)
	{
		if (message == undefined) message = "";
		this.code = 0;
		this.message = (message != "") ? (message) : ("Wait please ...");
	},
	/**
	 * Clear error
	 */
	clear: function()
	{
		this.code = 0;
		this.message = "";
	},
	/**
	 * Returns true if error
	 */
	isError: function()
	{
		return this.code < 0;
	},
	/**
	 * Returns true if success
	 */
	isSuccess: function()
	{
		return this.code > 0;
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "code", data);
		serializer.process(this, "message", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.code = 0;
		this.message = "";
		this.widget_name = "result";
		this.component = "Runtime.Widget.WidgetResult";
		this.styles = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Widget.WidgetResultModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.WidgetResultModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetResultModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetResultModel);
window["Runtime.Widget.WidgetResultModel"] = Runtime.Widget.WidgetResultModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetResultModel;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.ModuleDescription = function()
{
};
Object.assign(Runtime.Widget.ModuleDescription.prototype,
{
});
Object.assign(Runtime.Widget.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime.Widget";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.12.1";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Entity.Hook("Runtime.Widget.AppHook")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.ModuleDescription";
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
Runtime.rtl.defClass(Runtime.Widget.ModuleDescription);
window["Runtime.Widget.ModuleDescription"] = Runtime.Widget.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ModuleDescription;
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
if (typeof Runtime.Widget.ContextMenu == 'undefined') Runtime.Widget.ContextMenu = {};
Runtime.Widget.ContextMenu.ContextMenu = {
	name: "Runtime.Widget.ContextMenu.ContextMenu",
	extends: Runtime.Web.Component,
	methods:
	{
		renderItem: function(item)
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"onClick":() =>
			{
				this.model.onClickItem(item);
				this.emit("clickItem", Runtime.Vector.from([item]));
			},"class":this._class_name(["widget_context_menu__item", ((item.get("hidden") == true) ? ("hidden") : (""))]),"key":item.get("key")});
			
			/* Render */
			this._t(__v0, item.get("label"));
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", this._merge_attrs({"ref":"widget","class":this._class_name(["widget_context_menu", ((this.model.is_open) ? ("widget_context_menu--open") : ("widget_context_menu--hide"))])}, props));
			
			for (let i = 0; i < this.model.items.count(); i++)
			{
				let item = this.model.items.get(i);
				
				/* Render */
				this._t(__v0, this.renderItem(item));
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns props
 */
		getProps: function()
		{
			var styles = Runtime.Vector.from([]);
			if (this.model.width != "")
			{
				styles.push("max-width: " + Runtime.rtl.toStr(this.model.width));
			}
			styles.push("left: " + Runtime.rtl.toStr(this.model.x) + Runtime.rtl.toStr("px;"));
			styles.push("top: " + Runtime.rtl.toStr(this.model.y) + Runtime.rtl.toStr("px;"));
			return Runtime.Map.from({"style":styles.join(";")});
		},
	},
};
Object.assign(Runtime.Widget.ContextMenu.ContextMenu,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_context_menu.h-eb03{display: none;position: absolute;z-index: 99;background-color: var(--widget-color-default);border: var(--widget-border-width) var(--widget-color-border) solid;border-bottom-width: 0}.widget_context_menu--open.h-eb03{display: block}.widget_context_menu__item.h-eb03{padding: var(--widget-button-padding-y) var(--widget-button-padding-y);border-bottom: var(--widget-border-width) var(--widget-color-border) solid;cursor: pointer;user-select: none}.widget_context_menu__item.hidden.h-eb03{display: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.ContextMenu";
	},
	getClassName: function()
	{
		return "Runtime.Widget.ContextMenu.ContextMenu";
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
Runtime.rtl.defClass(Runtime.Widget.ContextMenu.ContextMenu);
window["Runtime.Widget.ContextMenu.ContextMenu"] = Runtime.Widget.ContextMenu.ContextMenu;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ContextMenu.ContextMenu;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.ContextMenu == 'undefined') Runtime.Widget.ContextMenu = {};
Runtime.Widget.ContextMenu.ContextMenuMessage = function()
{
	Runtime.Web.Messages.Message.apply(this, arguments);
};
Runtime.Widget.ContextMenu.ContextMenuMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Widget.ContextMenu.ContextMenuMessage.prototype.constructor = Runtime.Widget.ContextMenu.ContextMenuMessage;
Object.assign(Runtime.Widget.ContextMenu.ContextMenuMessage.prototype,
{
	_init: function()
	{
		Runtime.Web.Messages.Message.prototype._init.call(this);
		this.item = null;
	},
});
Object.assign(Runtime.Widget.ContextMenu.ContextMenuMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Widget.ContextMenu.ContextMenuMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.ContextMenu";
	},
	getClassName: function()
	{
		return "Runtime.Widget.ContextMenu.ContextMenuMessage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Messages.Message";
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
Runtime.rtl.defClass(Runtime.Widget.ContextMenu.ContextMenuMessage);
window["Runtime.Widget.ContextMenu.ContextMenuMessage"] = Runtime.Widget.ContextMenu.ContextMenuMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ContextMenu.ContextMenuMessage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.ContextMenu == 'undefined') Runtime.Widget.ContextMenu = {};
Runtime.Widget.ContextMenu.ContextMenuModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.ContextMenu.ContextMenuModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.ContextMenu.ContextMenuModel.prototype.constructor = Runtime.Widget.ContextMenu.ContextMenuModel;
Object.assign(Runtime.Widget.ContextMenu.ContextMenuModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("items"))
		{
			this.items = params.get("items");
		}
	},
	/**
	 * Set width
	 */
	setWidth: function(value)
	{
		this.width = value;
	},
	/**
	 * Show dialog
	 */
	show: function(x, y)
	{
		this.is_open = true;
		this.x = x;
		this.y = y;
	},
	/**
	 * Hide dialog
	 */
	hide: function()
	{
		this.is_open = false;
	},
	/**
	 * Add item
	 */
	addItem: function(item)
	{
		this.items.push(item);
	},
	/**
	 * Find index
	 */
	find: function(key)
	{
		return this.items.find((item) =>
		{
			return item.get("key") == key;
		});
	},
	/**
	 * Find item
	 */
	findItem: function(key)
	{
		return this.items.get(this.find(key));
	},
	/**
	 * On click
	 */
	onClickItem: function(item)
	{
		this.emit(new Runtime.Widget.ContextMenu.ContextMenuMessage(Runtime.Map.from({"name":"clickItem","item":item})));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.ContextMenu.ContextMenu";
		this.widget_name = "context_menu";
		this.is_open = false;
		this.width = "";
		this.x = 0;
		this.y = 0;
		this.items = Runtime.Vector.from([]);
		this.data = null;
	},
});
Object.assign(Runtime.Widget.ContextMenu.ContextMenuModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.ContextMenu.ContextMenuModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.ContextMenu";
	},
	getClassName: function()
	{
		return "Runtime.Widget.ContextMenu.ContextMenuModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.ContextMenu.ContextMenuModel);
window["Runtime.Widget.ContextMenu.ContextMenuModel"] = Runtime.Widget.ContextMenu.ContextMenuModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ContextMenu.ContextMenuModel;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.BaseDialogModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Dialog.BaseDialogModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Dialog.BaseDialogModel.prototype.constructor = Runtime.Widget.Dialog.BaseDialogModel;
Object.assign(Runtime.Widget.Dialog.BaseDialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
	},
	/**
	 * Show dialog
	 */
	show: function()
	{
		this.is_open = true;
		this.emit(new Runtime.Widget.Dialog.DialogMessage(Runtime.Map.from({"name":"show"})));
	},
	/**
	 * Hide dialog
	 */
	hide: function()
	{
		this.is_open = false;
		this.emit(new Runtime.Widget.Dialog.DialogMessage(Runtime.Map.from({"name":"hide"})));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.is_open = false;
		this.modal = true;
		this.component = "";
	},
});
Object.assign(Runtime.Widget.Dialog.BaseDialogModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Dialog.BaseDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.BaseDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.BaseDialogModel);
window["Runtime.Widget.Dialog.BaseDialogModel"] = Runtime.Widget.Dialog.BaseDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.BaseDialogModel;
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
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.Dialog = {
	name: "Runtime.Widget.Dialog.Dialog",
	extends: Runtime.Web.Component,
	methods:
	{
		renderTitle: function()
		{
			let __v = [];
			
			if (this.model.title != "")
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__title"])});
				
				/* Render */
				this._t(__v0, this.model.title);
			}
			
			return this._flatten(__v);
		},
		renderContent: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__content"])});
			
			/* Render */
			this._t(__v0, this.model.content);
			
			return this._flatten(__v);
		},
		renderButtons: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.buttons));
			
			return this._flatten(__v);
		},
		renderResult: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.result));
			
			return this._flatten(__v);
		},
		renderDialog: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderTitle());
			
			/* Render */
			this._t(__v, this.renderContent());
			
			/* Render */
			this._t(__v, this.renderButtons());
			
			/* Render */
			this._t(__v, this.renderResult());
			
			return this._flatten(__v);
		},
		renderDialogContainer: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", this._merge_attrs({"class":this._class_name(["widget_dialog__container"])}, props));
			
			/* Render */
			this._t(__v0, this.renderDialog());
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"onClick":this.onDialogClick,"class":this._class_name(["widget_dialog", ((this.model.is_open) ? ("widget_dialog--open") : ("widget_dialog--hide")), this.$options.getStyles("widget_dialog", this.model.styles)])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_dialog__shadow"])});
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"ref":"dialog_box","class":this._class_name(["widget_dialog__box"])});
			
			/* Element 'table' */
			let __v3 = this._e(__v2, "table", {"class":this._class_name(["widget_dialog__wrap"])});
			
			/* Element 'tbody' */
			let __v4 = this._e(__v3, "tbody", {});
			
			/* Element 'tr' */
			let __v5 = this._e(__v4, "tr", {});
			
			/* Element 'td' */
			let __v6 = this._e(__v5, "td", {"class":this._class_name(["widget_dialog__td"])});
			
			/* Render */
			this._t(__v6, this.renderDialogContainer());
			
			return this._flatten(__v);
		},
		getProps: function()
		{
			var styles = Runtime.Vector.from([]);
			if (this.model.width != "")
			{
				styles.push("max-width: " + Runtime.rtl.toStr(this.model.width));
			}
			return Runtime.Map.from({"style":styles.join(";")});
		},
		/**
 * On shadow click
 */
		onShadowClick: function()
		{
			if (!this.model.modal)
			{
				this.model.hide();
			}
		},
		/**
 * On dialog click
 */
		onDialogClick: function(e)
		{
			if (e.target.classList.contains("widget_dialog__td"))
			{
				this.onShadowClick();
			}
		},
		/**
 * Updated
 */
		onUpdated: function()
		{
			var elem = document.documentElement;
			var is_scroll_lock = elem.classList.contains("scroll-lock");
			if (this.model.is_open)
			{
				if (!is_scroll_lock)
				{
					elem.classList.add("scroll-lock");
					this.nextTick(() =>
					{
						var dialog_box = this.getRef("dialog_box");
						dialog_box.scrollTop = 0;
					});
				}
			}
			else
			{
				if (is_scroll_lock)
				{
					elem.classList.remove("scroll-lock");
				}
			}
		},
	},
};
Object.assign(Runtime.Widget.Dialog.Dialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.RowButtons","Runtime.Widget.WidgetResult"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_dialog__box.h-a5bc,.widget_dialog__shadow.h-a5bc{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 1001}.widget_dialog__box.h-a5bc{overflow: auto;overflow-y: scroll;display: none}.widget_dialog--open.h-a5bc .widget_dialog__box{display: block}.widget_dialog__shadow.h-a5bc{background-color: #000;opacity: 0.2;overflow: hidden;display: none}.widget_dialog--open.h-a5bc .widget_dialog__shadow{display: block}.widget_dialog__wrap.h-a5bc{width: 100%;min-height: 100%}.widget_dialog__wrap.h-a5bc > tr > td{padding: 20px}.widget_dialog__container.h-a5bc{position: relative;padding: calc(var(--widget-space) * 3);background-color: white;border-radius: 4px;max-width: 600px;margin: calc(var(--widget-space) * 5) auto;width: auto;z-index: 1002;box-shadow: 2px 4px 10px 0px rgba(0,0,0,0.5);font-size: var(--widget-font-size)}.widget_dialog__title.h-a5bc{font-weight: bold;font-size: var(--widget-font-size-h2);text-align: left;margin: var(--widget-margin-h2);margin-top: 0}.widget_dialog__buttons.h-a598{margin: var(--widget-margin-h2);margin-bottom: 0}.widget_dialog__buttons.h-a598 .widget_button.h-8dd7{min-width: 70px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.Dialog);
window["Runtime.Widget.Dialog.Dialog"] = Runtime.Widget.Dialog.Dialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.Dialog;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.DialogMessage = function()
{
	Runtime.Web.Messages.Message.apply(this, arguments);
};
Runtime.Widget.Dialog.DialogMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Widget.Dialog.DialogMessage.prototype.constructor = Runtime.Widget.Dialog.DialogMessage;
Object.assign(Runtime.Widget.Dialog.DialogMessage.prototype,
{
	_init: function()
	{
		Runtime.Web.Messages.Message.prototype._init.call(this);
		this.value = "";
		this.hide = true;
	},
});
Object.assign(Runtime.Widget.Dialog.DialogMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Widget.Dialog.DialogMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogMessage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Messages.Message";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.DialogMessage);
window["Runtime.Widget.Dialog.DialogMessage"] = Runtime.Widget.Dialog.DialogMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.DialogMessage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.DialogModel = function()
{
	Runtime.Widget.Dialog.BaseDialogModel.apply(this, arguments);
};
Runtime.Widget.Dialog.DialogModel.prototype = Object.create(Runtime.Widget.Dialog.BaseDialogModel.prototype);
Runtime.Widget.Dialog.DialogModel.prototype.constructor = Runtime.Widget.Dialog.DialogModel;
Object.assign(Runtime.Widget.Dialog.DialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Dialog.BaseDialogModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("content"))
		{
			this.content = params.get("content");
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
		if (params.has("title"))
		{
			this.title = params.get("title");
		}
		if (params.has("width"))
		{
			this.width = params.get("width");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.BaseDialogModel.prototype.initWidget.call(this, params);
		/* Add button */
		this.buttons = this.addWidget("Runtime.Widget.RowButtonsModel", Runtime.Map.from({"widget_name":"buttons","styles":Runtime.Vector.from(["@widget_dialog__buttons","align-end"])}));
		/* Add result */
		this.result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"styles":Runtime.Vector.from(["margin_top"])}));
	},
	/**
	 * Show dialog
	 */
	show: function()
	{
		this.result.clear();
		Runtime.Widget.Dialog.BaseDialogModel.prototype.show.call(this);
	},
	/**
	 * Set title
	 */
	setTitle: function(title)
	{
		this.title = title;
	},
	/**
	 * Set width
	 */
	setWidth: function(value)
	{
		this.width = value;
	},
	_init: function()
	{
		Runtime.Widget.Dialog.BaseDialogModel.prototype._init.call(this);
		this.action = "";
		this.title = "";
		this.content = "";
		this.width = "";
		this.component = "Runtime.Widget.Dialog.Dialog";
		this.data = Runtime.Map.from({});
		this.styles = Runtime.Vector.from([]);
		this.buttons = null;
		this.result = null;
	},
});
Object.assign(Runtime.Widget.Dialog.DialogModel, Runtime.Widget.Dialog.BaseDialogModel);
Object.assign(Runtime.Widget.Dialog.DialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.BaseDialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.DialogModel);
window["Runtime.Widget.Dialog.DialogModel"] = Runtime.Widget.Dialog.DialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.DialogModel;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.DialogModelException = function(message, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, message, Runtime.rtl.ERROR_RUNTIME, prev);
};
Runtime.Widget.Dialog.DialogModelException.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Widget.Dialog.DialogModelException.prototype.constructor = Runtime.Widget.Dialog.DialogModelException;
Object.assign(Runtime.Widget.Dialog.DialogModelException.prototype,
{
});
Object.assign(Runtime.Widget.Dialog.DialogModelException, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Widget.Dialog.DialogModelException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogModelException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.DialogModelException);
window["Runtime.Widget.Dialog.DialogModelException"] = Runtime.Widget.Dialog.DialogModelException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.DialogModelException;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.ConfirmDialogModel = function()
{
	Runtime.Widget.Dialog.DialogModel.apply(this, arguments);
};
Runtime.Widget.Dialog.ConfirmDialogModel.prototype = Object.create(Runtime.Widget.Dialog.DialogModel.prototype);
Runtime.Widget.Dialog.ConfirmDialogModel.prototype.constructor = Runtime.Widget.Dialog.ConfirmDialogModel;
Object.assign(Runtime.Widget.Dialog.ConfirmDialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Dialog.DialogModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("content"))
		{
			this.content = params.get("content");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.DialogModel.prototype.initWidget.call(this, params);
		/* Setup close buttons */
		this.buttons.addButton(Runtime.Map.from({"content":"Cancel","widget_name":"cancel_button","styles":Runtime.Vector.from(["gray"]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onCloseButtonClick")})}));
		/* Setup confirm button */
		this.buttons.addButton(Runtime.Map.from({"content":"Ok","widget_name":"confirm_button","styles":Runtime.Vector.from(["primary"]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onConfirmButtonClick")})}));
	},
	/**
	 * Add close button click
	 */
	onCloseButtonClick: function(message)
	{
		this.hide();
	},
	/**
	 * Confirm
	 */
	confirm: async function()
	{
		return Promise.resolve(true);
	},
	/**
	 * Confirm button click
	 */
	onConfirmButtonClick: async function(message)
	{
		try
		{
			/* Confirm */
			var confirm = await this.confirm();
			if (!confirm)
			{
				return Promise.resolve();
			}
			/* Send message */
			var message = new Runtime.Widget.Dialog.DialogMessage(Runtime.Map.from({"name":"confirm"}));
			await this.emitAsync(message);
			/* Hide dialog */
			if (message.hide)
			{
				this.hide();
			}
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Widget.Dialog.DialogModelException)
			{
				var e = _ex;
				
				this.result.setException(e);
				return Promise.resolve();
			}
			else
			{
				throw _ex;
			}
		}
	},
	_init: function()
	{
		Runtime.Widget.Dialog.DialogModel.prototype._init.call(this);
		this.content = "";
	},
});
Object.assign(Runtime.Widget.Dialog.ConfirmDialogModel, Runtime.Widget.Dialog.DialogModel);
Object.assign(Runtime.Widget.Dialog.ConfirmDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.ConfirmDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.ConfirmDialogModel);
window["Runtime.Widget.Dialog.ConfirmDialogModel"] = Runtime.Widget.Dialog.ConfirmDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.ConfirmDialogModel;
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
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.PromptDialog = {
	name: "Runtime.Widget.Dialog.PromptDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderContent: function()
		{
			let __v = [];
			
			if (this.model.content)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__content"])});
				
				/* Render */
				this._t(__v0, this.model.content);
			}
			
			/* Element 'div' */
			let __v1 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__input"])});
			
			/* Component 'Input' */
			let __v2 = this._c(__v1, "Runtime.Widget.Input", {"value":this.model.value,"onValueChange":(message) =>
			{
				this.model.setValue(message.value);
			}});
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Dialog.PromptDialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Dialog.Dialog","Runtime.Widget.Input"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr("");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.PromptDialog";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.PromptDialog);
window["Runtime.Widget.Dialog.PromptDialog"] = Runtime.Widget.Dialog.PromptDialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.PromptDialog;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.PromptDialogModel = function()
{
	Runtime.Widget.Dialog.DialogModel.apply(this, arguments);
};
Runtime.Widget.Dialog.PromptDialogModel.prototype = Object.create(Runtime.Widget.Dialog.DialogModel.prototype);
Runtime.Widget.Dialog.PromptDialogModel.prototype.constructor = Runtime.Widget.Dialog.PromptDialogModel;
Object.assign(Runtime.Widget.Dialog.PromptDialogModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.DialogModel.prototype.initWidget.call(this, params);
		/* Setup close buttons */
		this.buttons.addButton(Runtime.Map.from({"content":"Cancel","widget_name":"cancel_button","styles":Runtime.Vector.from(["gray"]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onCloseButtonClick")})}));
		/* Setup confirm button */
		this.buttons.addButton(Runtime.Map.from({"content":"Ok","widget_name":"confirm_button","styles":Runtime.Vector.from(["success"]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onConfirmButtonClick")})}));
		/* Buttons style */
		this.buttons.styles.add("align-end");
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		this.value = value;
	},
	/**
	 * Add close button click
	 */
	onCloseButtonClick: function(message)
	{
		this.hide();
	},
	/**
	 * Add confirm button click
	 */
	onConfirmButtonClick: function(message)
	{
		try
		{
			this.emit(new Runtime.Widget.Dialog.DialogMessage(Runtime.Map.from({"name":"confirm","value":this.value})));
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Widget.Dialog.DialogModelException)
			{
				var e = _ex;
				
				this.result.setException(e);
				return ;
			}
			else
			{
				throw _ex;
			}
		}
		this.hide();
	},
	_init: function()
	{
		Runtime.Widget.Dialog.DialogModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Dialog.PromptDialog";
		this.value = "";
		this.old_value = "";
	},
});
Object.assign(Runtime.Widget.Dialog.PromptDialogModel, Runtime.Widget.Dialog.DialogModel);
Object.assign(Runtime.Widget.Dialog.PromptDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.PromptDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.PromptDialogModel);
window["Runtime.Widget.Dialog.PromptDialogModel"] = Runtime.Widget.Dialog.PromptDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.PromptDialogModel;
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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.Form = {
	name: "Runtime.Widget.Form.Form",
	extends: Runtime.Web.Component,
	methods:
	{
		renderTitle: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderSlot("title"));
			
			return this._flatten(__v);
		},
		renderField: function(field)
		{
			let __v = [];
			let field_name = field.get("name");
			let field_model = field.get("model", null);
			let field_calculate = field.get("calculate", null);
			let field_component = field.get("component");
			let field_props = field.get("props", Runtime.Map.from({}));
			let value = "";
			let data = Runtime.Map.from({"item":this.model.item,"field_name":field_name,"form":this.model});
			
			if (field_calculate)
			{
				value = Runtime.rtl.apply(field_calculate, Runtime.Vector.from([data]));
			}
			else
			{
				value = this.model.getItemValue(field_name);
			}
			let _ = data.set("value", value);
			
			if (field_component != null)
			{
				/* Component '{field_component}' */
				let __v0 = this._c(__v, field_component, this._merge_attrs({"value":value,"name":field_name,"ref":"field_" + Runtime.rtl.toStr(field_name),"model":this._model(field_model),"onValueChange":(message) =>
				{
					return this.model.onFieldChange(field_name, message.value);
				},"data":data}, field_props));
			}
			else
			{
				/* Render */
				this._t(__v, this.renderWidget(field_model, field_props.concat(Runtime.Map.from({"name":field_name,"value":value,"data":data,"ref":"field_" + Runtime.rtl.toStr(field_name),"onValueChange":(message) =>
				{
					this.model.onFieldChange(field_name, message.value);
				}}))));
			}
			
			return this._flatten(__v);
		},
		renderFieldResult: function(field)
		{
			let __v = [];
			let field_name = field.get("name");
			let field_error = this.model.getFieldResult(field_name);
			
			if (field_error.count() == 0)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"data-name":field_name,"class":this._class_name(["widget_form__field_error widget_form__field_error--hide"]),"key":"result1"});
			}
			else
			{
				/* Element 'div' */
				let __v1 = this._e(__v, "div", {"data-name":field_name,"class":this._class_name(["widget_form__field_error"]),"key":"result2"});
				
				for (let i = 0; i < field_error.count(); i++)
				{
					/* Element 'div' */
					let __v2 = this._e(__v1, "div", {});
					
					/* Render */
					this._t(__v2, field_error.get(i));
				}
			}
			
			return this._flatten(__v);
		},
		renderFieldLabel: function(field)
		{
			let __v = [];
			
			/* Element 'span' */
			let __v0 = this._e(__v, "span", {});
			
			/* Render */
			this._t(__v0, field.get("label"));
			
			return this._flatten(__v);
		},
		renderFieldButtons: function(field)
		{
			let __v = [];
			
			if (field.has("buttons"))
			{
				let buttons = field.get("buttons");
				
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_form__field_buttons"])});
				
				for (let i = 0; i < buttons.count(); i++)
				{
					let settings = buttons.get(i);
					let props = settings.get("props");
					let content = settings.get("content");
					
					/* Component 'Button' */
					let __v1 = this._c(__v0, "Runtime.Widget.Button", this._merge_attrs({"onClick":(e) =>
					{
						var event_name = settings.get("event");
						var component = this.getRef("field_" + Runtime.rtl.toStr(field.get("name")));
						var callback = new Runtime.Callback(component, event_name);
						callback.apply();
					}}, props));
				}
			}
			
			return this._flatten(__v);
		},
		renderFieldRow: function(field)
		{
			let __v = [];
			let field_name = field.get("name");
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"data-name":field_name,"class":this._class_name(["widget_form__field_row"]),"key":field_name});
			
			if (field.has("label"))
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_form__field_label"])});
				
				/* Render */
				this._t(__v1, this.renderFieldLabel(field));
				
				/* Render */
				this._t(__v1, this.renderFieldButtons(field));
			}
			
			/* Render */
			this._t(__v0, this.renderField(field));
			
			/* Render */
			this._t(__v0, this.renderFieldResult(field));
			
			return this._flatten(__v);
		},
		renderFields: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_form__fields"])});
			
			if (this.model)
			{
				for (let i = 0; i < this.model.fields.count(); i++)
				{
					/* Render */
					this._t(__v0, this.renderFieldRow(this.model.fields.get(i)));
				}
			}
			
			return this._flatten(__v);
		},
		renderBottomButtons: function()
		{
			let __v = [];
			
			if (this.model && this.model.bottom_buttons.count() > 0)
			{
				/* Render */
				this._t(__v, this.renderWidget(this.model.bottom_buttons));
			}
			
			return this._flatten(__v);
		},
		renderResult: function()
		{
			let __v = [];
			
			if (this.model && this.model.show_result)
			{
				/* Render */
				this._t(__v, this.renderWidget(this.model.result));
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_form", this.class])});
			
			/* Render */
			this._t(__v0, this.renderTitle());
			
			/* Render */
			this._t(__v0, this.renderFields());
			
			/* Render */
			this._t(__v0, this.renderBottomButtons());
			
			/* Render */
			this._t(__v0, this.renderResult());
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Form.Form,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.RowButtons","Runtime.Widget.TextArea","Runtime.Widget.WidgetResult"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_form.h-b6a8 .widget_form__field_row.h-b6a8{margin-bottom: 10px}.widget_form.h-b6a8 .widget_form__field_label.h-b6a8{display: flex;align-items: center;padding-bottom: 5px;gap: 5px}.widget_form.h-b6a8 .widget_form__field_error.h-b6a8{color: var(--widget-color-danger);margin-top: var(--widget-space)}.widget_form.h-b6a8 .widget_form__field_error--hide.h-b6a8{display: none}.widget_form.h-b6a8 .widget_form__bottom_buttons.h-a598{justify-content: center}.widget_form.fixed.h-b6a8{max-width: 600px;margin-left: auto;margin-right: auto}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.Form";
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
Runtime.rtl.defClass(Runtime.Widget.Form.Form);
window["Runtime.Widget.Form.Form"] = Runtime.Widget.Form.Form;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.Form;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormMessage = function()
{
	Runtime.Web.Messages.Message.apply(this, arguments);
};
Runtime.Widget.Form.FormMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Widget.Form.FormMessage.prototype.constructor = Runtime.Widget.Form.FormMessage;
Object.assign(Runtime.Widget.Form.FormMessage.prototype,
{
	_init: function()
	{
		Runtime.Web.Messages.Message.prototype._init.call(this);
		this.result = null;
		this.field_name = null;
		this.old_value = null;
		this.value = null;
	},
});
Object.assign(Runtime.Widget.Form.FormMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Widget.Form.FormMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormMessage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Messages.Message";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormMessage);
window["Runtime.Widget.Form.FormMessage"] = Runtime.Widget.Form.FormMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormMessage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Form.FormModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Form.FormModel.prototype.constructor = Runtime.Widget.Form.FormModel;
Object.assign(Runtime.Widget.Form.FormModel.prototype,
{
	/**
	 * Create data storage
	 */
	createDataStorage: function()
	{
		return null;
	},
	/**
	 * Set data storage
	 */
	setDataStorage: function(storage)
	{
		this.storage = storage;
	},
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("foreign_key"))
		{
			this.foreign_key = params.get("foreign_key");
		}
		if (params.has("post_data"))
		{
			this.post_data = params.get("post_data");
		}
		if (params.has("show_result"))
		{
			this.show_result = params.get("show_result");
		}
		/* Setup params */
		if (params.has("fields"))
		{
			this.fields = Runtime.Vector.from([]);
			this.addFields(params.get("fields"));
		}
		/* Setup storage */
		if (params.has("storage"))
		{
			var storage = params.get("storage");
			if (storage instanceof Runtime.Entity.Factory)
			{
				this.storage = storage.factory();
			}
			else if (Runtime.rtl.isString(storage))
			{
				this.storage = Runtime.rtl.newInstance(storage, Runtime.Vector.from([this]));
			}
			else
			{
				this.storage = storage;
			}
		}
		if (this.storage == null)
		{
			this.storage = this.createDataStorage(params);
		}
		/* Setup storage form */
		if (this.storage != null)
		{
			this.storage.setForm(this);
		}
		/* Setup primary key */
		if (params.has("pk"))
		{
			this.pk = params.get("pk");
		}
		if (params.has("primary_key"))
		{
			this.primary_key = params.get("primary_key");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
		/* Load result */
		this.load = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"widget_name":"load"}));
		/* Result */
		this.result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"widget_name":"result","styles":Runtime.Vector.from(["margin_top"])}));
		/* Buttons */
		this.bottom_buttons = this.addWidget("Runtime.Widget.RowButtonsModel", Runtime.Map.from({"widget_name":"bottom_buttons","styles":Runtime.Vector.from(["@widget_form__bottom_buttons"])}));
	},
	/**
	 * Add field
	 */
	addField: function(field)
	{
		/* Create model */
		if (field.has("model"))
		{
			var model = field.get("model");
			if (model instanceof Runtime.Web.ModelFactory)
			{
				var instance = model.factory(this);
				field.set("model", instance);
			}
		}
		/* Add field */
		this.fields.append(field);
		/* Add component */
		if (field.has("component"))
		{
			this.layout.addComponent(field.get("component"));
		}
	},
	/**
	 * Add fields
	 */
	addFields: function(fields)
	{
		for (var i = 0; i < fields.count(); i++)
		{
			this.addField(fields.get(i));
		}
	},
	/**
	 * Get field
	 */
	getField: function(field_name)
	{
		return this.fields.findItem(Runtime.lib.equalAttr("name", field_name));
	},
	/**
	 * Remove field
	 */
	removeField: function(field_name)
	{
		this.fields = this.fields.filter((field) =>
		{
			return field.get("name") != field_name;
		});
	},
	/**
	 * Returns field result
	 */
	getFieldResult: function(field_name)
	{
		if (this.fields_error.has(field_name))
		{
			return this.fields_error.get(field_name);
		}
		return Runtime.Vector.from([]);
	},
	/**
	 * Clear form
	 */
	clear: function()
	{
		this.pk = null;
		this.fields_error = Runtime.Map.from({});
		this.row_number = -1;
		this.clearItem();
		this.result.clear();
	},
	/**
	 * Clear form
	 */
	clearItem: function()
	{
		this.item = Runtime.Map.from({});
		for (var i = 0; i < this.fields.count(); i++)
		{
			var field = this.fields.get(i);
			var field_name = field.get("name");
			var default_value = field.get("default", "");
			this.item.set(field_name, default_value);
		}
	},
	/**
	 * Field changed event
	 */
	onFieldChange: function(field_name, value)
	{
		var old_value = this.item.get(field_name);
		this.item.set(field_name, value);
		this.emitAsync(new Runtime.Widget.Form.FormMessage(Runtime.Map.from({"name":"field_change","field_name":field_name,"old_value":old_value,"value":value})));
	},
	/**
	 * Returns item value
	 */
	getItemValue: function(field_name)
	{
		return this.item.get(field_name);
	},
	/**
	 * Returns primary key
	 */
	getPrimaryKey: function(item)
	{
		return item.intersect(this.primary_key);
	},
	/**
	 * Set item
	 */
	setItem: function(item)
	{
		if (item == null)
		{
			this.pk = null;
			this.item = Runtime.Map.from({});
		}
		else
		{
			this.pk = this.getPrimaryKey(item);
			this.item = item;
		}
	},
	/**
	 * Set row number
	 */
	setRowNumber: function(row_number)
	{
		this.row_number = row_number;
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "pk", data);
		serializer.process(this, "item", data);
		serializer.process(this, "load", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Set api result
	 */
	setApiResult: function(res, action)
	{
		if (res == null)
		{
			return ;
		}
		/* Load */
		if (action == "load")
		{
			if (res.data.has("item"))
			{
				this.item = res.data.get("item");
			}
			this.load.setApiResult(res);
		}
		/* Submit */
		if (action == "submit")
		{
			if (res.data.has("item"))
			{
				this.item = res.data.get("item");
			}
			if (res.data.has("fields"))
			{
				this.fields_error = res.data.get("fields");
			}
			this.result.setApiResult(res);
		}
	},
	/**
	 * Returns post item
	 */
	getPostItem: function()
	{
		return this.item;
	},
	/**
	 * Merge post data
	 */
	mergePostData: function(post_data, action)
	{
		if (this.foreign_key)
		{
			post_data.set("foreign_key", this.foreign_key);
			if (post_data.has("item"))
			{
				var item = post_data.get("item");
				var keys = this.foreign_key.keys();
				for (var i = 0; i < keys.count(); i++)
				{
					var key = keys.get(i);
					item.set(key, this.foreign_key.get(key));
				}
			}
		}
		if (this.post_data)
		{
			post_data = post_data.concat(this.post_data);
		}
		return post_data;
	},
	/**
	 * Load form data
	 */
	loadData: async function(container)
	{
		await Runtime.Web.BaseModel.prototype.loadData.call(this, container);
		await this.loadForm();
	},
	/**
	 * Load form
	 */
	loadForm: async function()
	{
		if (!this.pk)
		{
			return Promise.resolve();
		}
		if (!this.storage)
		{
			return Promise.resolve();
		}
		/* Load data */
		var res = await this.storage.load();
		this.setApiResult(res, "load");
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
		if (!this.storage)
		{
			return Promise.resolve(null);
		}
		this.result.setWaitMessage();
		var res = await this.storage.submit();
		this.setApiResult(res, "submit");
		await this.emitAsync(new Runtime.Widget.Form.FormMessage(Runtime.Map.from({"name":"submit","result":res})));
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Form.Form";
		this.widget_name = "form";
		this.foreign_key = null;
		this.post_data = null;
		this.fields = Runtime.Vector.from([]);
		this.fields_error = Runtime.Map.from({});
		this.row_number = -1;
		this.pk = null;
		this.item = Runtime.Map.from({});
		this.primary_key = Runtime.Vector.from([]);
		this.storage = null;
		this.bottom_buttons = null;
		this.load = null;
		this.result = null;
		this.show_result = true;
	},
});
Object.assign(Runtime.Widget.Form.FormModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Form.FormModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormModel);
window["Runtime.Widget.Form.FormModel"] = Runtime.Widget.Form.FormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormModel;
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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormRow = {
	name: "Runtime.Widget.Form.FormRow",
	extends: Runtime.Web.Component,
	props: {
		"styles": {
			default: Runtime.Vector.from([]),
		},
		"error": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["form_row", this.class, this.$options.getStyles("form_row", this.styles)])});
			
			if (this.checkSlot("label"))
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["form_row__label"]),"key":"label"});
				
				/* Render */
				this._t(__v1, this.renderSlot("label"));
			}
			
			if (this.checkSlot("content"))
			{
				/* Element 'div' */
				let __v2 = this._e(__v0, "div", {"class":this._class_name(["form_row__content"]),"key":"content"});
				
				/* Render */
				this._t(__v2, this.renderSlot("content"));
			}
			
			if (this.checkSlot("result"))
			{
				/* Element 'div' */
				let __v3 = this._e(__v0, "div", {"class":this._class_name(["form_row__result"]),"key":"result"});
				
				/* Render */
				this._t(__v3, this.renderSlot("result"));
			}
			
			if (this.error.count() > 0)
			{
				/* Element 'div' */
				let __v4 = this._e(__v0, "div", {"class":this._class_name(["form_row__error"]),"key":"error"});
				
				for (let i = 0; i < this.error.count(); i++)
				{
					/* Element 'div' */
					let __v5 = this._e(__v4, "div", {});
					
					/* Render */
					this._t(__v5, this.error.get(i));
				}
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Form.FormRow,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".form_row.h-df7b{margin-bottom: 10px}.form_row:last-child.h-df7b{margin-bottom: 0px}.form_row__label.h-df7b{margin-bottom: 5px}.form_row--flex.h-df7b{display: flex;align-items: center}.form_row--flex__label.h-df7b,.form_row--flex__content.h-df7b{width: 50%}.form_row__error.h-df7b{color: var(--widget-color-danger);margin-top: var(--widget-space)}.form_row__error--hide.h-df7b{display: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormRow";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormRow);
window["Runtime.Widget.Form.FormRow"] = Runtime.Widget.Form.FormRow;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormRow;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormStorageInterface = function()
{
};
Object.assign(Runtime.Widget.Form.FormStorageInterface.prototype,
{
	/**
	 * Set form
	 */
	setForm: function(form)
	{
	},
	/**
	 * Load form
	 */
	load: async function()
	{
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
	},
});
Object.assign(Runtime.Widget.Form.FormStorageInterface,
{
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormStorageInterface";
	},
});
Runtime.rtl.defClass(Runtime.Widget.Form.FormStorageInterface);
window["Runtime.Widget.Form.FormStorageInterface"] = Runtime.Widget.Form.FormStorageInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormStorageInterface;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormSaveProxyStorage = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Form.FormSaveProxyStorage.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Form.FormSaveProxyStorage.prototype.constructor = Runtime.Widget.Form.FormSaveProxyStorage;
Object.assign(Runtime.Widget.Form.FormSaveProxyStorage.prototype,
{
	/**
	 * Set form
	 */
	setForm: function(form)
	{
		this.form = form;
	},
	/**
	 * Returns items
	 */
	getItems: function()
	{
		return Runtime.rtl.attr(this.container, this.path);
	},
	/**
	 * Load form
	 */
	load: async function()
	{
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
		/* Get post data */
		var post_data = Runtime.Map.from({"item":this.form.getPostItem()});
		var post_data = this.form.mergePostData(post_data, "load");
		/* Copy item */
		var item = post_data.get("item");
		item = Runtime.Serializer.copy(item);
		/* Save item */
		var items = this.getItems();
		if (this.form.row_number == -1)
		{
			items.push(item);
		}
		else
		{
			items.set(this.form.row_number, item);
		}
		/* Success result */
		var res = new Runtime.Web.ApiResult();
		res.success();
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.container = null;
		this.path = null;
		this.form = null;
	},
});
Object.assign(Runtime.Widget.Form.FormSaveProxyStorage, Runtime.BaseObject);
Object.assign(Runtime.Widget.Form.FormSaveProxyStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormSaveProxyStorage";
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
	__implements__:
	[
		Runtime.Widget.Form.FormStorageInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.Form.FormSaveProxyStorage);
window["Runtime.Widget.Form.FormSaveProxyStorage"] = Runtime.Widget.Form.FormSaveProxyStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormSaveProxyStorage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormSaveStorage = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Form.FormSaveStorage.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Form.FormSaveStorage.prototype.constructor = Runtime.Widget.Form.FormSaveStorage;
Object.assign(Runtime.Widget.Form.FormSaveStorage.prototype,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return this.api_name;
	},
	/**
	 * Returns method name
	 */
	getMethodName: function(name)
	{
		if (name == "load")
		{
			return "actionItem";
		}
		if (name == "submit")
		{
			return "actionSave";
		}
		return "";
	},
	/**
	 * Set form
	 */
	setForm: function(form)
	{
		this.form = form;
	},
	/**
	 * Load form
	 */
	load: async function()
	{
		var post_data = Runtime.Map.from({"pk":this.form.pk});
		post_data = this.form.mergePostData(post_data, "load");
		var res = await this.form.layout.callApi(Runtime.Map.from({"api_name":this.getApiName(),"method_name":this.getMethodName("load"),"data":post_data}));
		return Promise.resolve(res);
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
		var post_data = Runtime.Map.from({"pk":this.form.pk,"item":this.form.getPostItem()});
		post_data = this.form.mergePostData(post_data, "submit");
		var res = await this.form.layout.callApi(Runtime.Map.from({"api_name":this.getApiName(),"method_name":this.getMethodName("submit"),"data":post_data}));
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.api_name = "";
		this.form = null;
	},
});
Object.assign(Runtime.Widget.Form.FormSaveStorage, Runtime.BaseObject);
Object.assign(Runtime.Widget.Form.FormSaveStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormSaveStorage";
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
	__implements__:
	[
		Runtime.Widget.Form.FormStorageInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.Form.FormSaveStorage);
window["Runtime.Widget.Form.FormSaveStorage"] = Runtime.Widget.Form.FormSaveStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormSaveStorage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormSubmitModel = function()
{
	Runtime.Widget.Form.FormModel.apply(this, arguments);
};
Runtime.Widget.Form.FormSubmitModel.prototype = Object.create(Runtime.Widget.Form.FormModel.prototype);
Runtime.Widget.Form.FormSubmitModel.prototype.constructor = Runtime.Widget.Form.FormSubmitModel;
Object.assign(Runtime.Widget.Form.FormSubmitModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Form.FormModel.prototype.initWidget.call(this, params);
		var content = "Submit";
		var styles = Runtime.Vector.from(["danger","large"]);
		/* Submit button params */
		if (params.has("submit_button"))
		{
			var submit_button = params.get("submit_button");
			if (submit_button.has("text"))
			{
				content = submit_button.get("text");
			}
			if (submit_button.has("styles"))
			{
				styles = submit_button.get("styles");
			}
		}
		/* Add submit Button */
		var submit_button = this.bottom_buttons.addButton(Runtime.Map.from({"widget_name":"submit","content":content,"styles":styles,"events":Runtime.Map.from({"click":new Runtime.Callback(this, "submit")})}));
	},
});
Object.assign(Runtime.Widget.Form.FormSubmitModel, Runtime.Widget.Form.FormModel);
Object.assign(Runtime.Widget.Form.FormSubmitModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormSubmitModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.FormModel";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormSubmitModel);
window["Runtime.Widget.Form.FormSubmitModel"] = Runtime.Widget.Form.FormSubmitModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormSubmitModel;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormSubmitStorage = function()
{
	Runtime.Widget.Form.FormSaveStorage.apply(this, arguments);
};
Runtime.Widget.Form.FormSubmitStorage.prototype = Object.create(Runtime.Widget.Form.FormSaveStorage.prototype);
Runtime.Widget.Form.FormSubmitStorage.prototype.constructor = Runtime.Widget.Form.FormSubmitStorage;
Object.assign(Runtime.Widget.Form.FormSubmitStorage.prototype,
{
	/**
	 * Returns method name
	 */
	getMethodName: function(name)
	{
		if (name == "submit")
		{
			return this.action;
		}
		return "";
	},
	/**
	 * Load form
	 */
	load: async function()
	{
		return Promise.resolve(null);
	},
	_init: function()
	{
		Runtime.Widget.Form.FormSaveStorage.prototype._init.call(this);
		this.action = "actionSave";
	},
});
Object.assign(Runtime.Widget.Form.FormSubmitStorage, Runtime.Widget.Form.FormSaveStorage);
Object.assign(Runtime.Widget.Form.FormSubmitStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormSubmitStorage";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.FormSaveStorage";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormSubmitStorage);
window["Runtime.Widget.Form.FormSubmitStorage"] = Runtime.Widget.Form.FormSubmitStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormSubmitStorage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormDeleteProxyStorage = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Form.FormDeleteProxyStorage.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Form.FormDeleteProxyStorage.prototype.constructor = Runtime.Widget.Form.FormDeleteProxyStorage;
Object.assign(Runtime.Widget.Form.FormDeleteProxyStorage.prototype,
{
	/**
	 * Set form
	 */
	setForm: function(form)
	{
		this.form = form;
	},
	/**
	 * Returns items
	 */
	getItems: function()
	{
		return Runtime.rtl.attr(this.container, this.path);
	},
	/**
	 * Load form
	 */
	load: async function()
	{
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
		/* Delete item */
		if (this.form.row_number >= 0)
		{
			var items = this.getItems();
			items.remove(this.form.row_number);
		}
		/* Success result */
		var res = new Runtime.Web.ApiResult();
		res.success();
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.container = null;
		this.path = null;
		this.form = null;
	},
});
Object.assign(Runtime.Widget.Form.FormDeleteProxyStorage, Runtime.BaseObject);
Object.assign(Runtime.Widget.Form.FormDeleteProxyStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormDeleteProxyStorage";
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
	__implements__:
	[
		Runtime.Widget.Form.FormStorageInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.Form.FormDeleteProxyStorage);
window["Runtime.Widget.Form.FormDeleteProxyStorage"] = Runtime.Widget.Form.FormDeleteProxyStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormDeleteProxyStorage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormDeleteStorage = function()
{
	Runtime.Widget.Form.FormSaveStorage.apply(this, arguments);
};
Runtime.Widget.Form.FormDeleteStorage.prototype = Object.create(Runtime.Widget.Form.FormSaveStorage.prototype);
Runtime.Widget.Form.FormDeleteStorage.prototype.constructor = Runtime.Widget.Form.FormDeleteStorage;
Object.assign(Runtime.Widget.Form.FormDeleteStorage.prototype,
{
	/**
	 * Submit form
	 */
	submit: async function()
	{
		var post_data = Runtime.Map.from({"pk":this.form.pk});
		post_data = this.form.mergePostData(post_data, "submit");
		var res = await this.form.layout.callApi(Runtime.Map.from({"api_name":this.getApiName(),"method_name":"actionDelete","data":post_data}));
		return Promise.resolve(res);
	},
});
Object.assign(Runtime.Widget.Form.FormDeleteStorage, Runtime.Widget.Form.FormSaveStorage);
Object.assign(Runtime.Widget.Form.FormDeleteStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormDeleteStorage";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.FormSaveStorage";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormDeleteStorage);
window["Runtime.Widget.Form.FormDeleteStorage"] = Runtime.Widget.Form.FormDeleteStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormDeleteStorage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Seo == 'undefined') Runtime.Widget.Seo = {};
Runtime.Widget.Seo.Seo = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Widget.Seo.Seo.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Widget.Seo.Seo.prototype.constructor = Runtime.Widget.Seo.Seo;
Object.assign(Runtime.Widget.Seo.Seo.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.CREATE_LAYOUT);
		this.register(this.constructor.RENDER_HEAD);
		this.register(this.constructor.ROUTE_BEFORE);
	},
	/**
	 * Create layout
	 */
	create_layout: async function(params)
	{
		var container = params.get("container");
		container.layout.addWidget("Runtime.Widget.Seo.SeoModel");
	},
	/**
	 * Render head
	 */
	render_head: function(params)
	{
		var layout = params.get("layout");
		var seo = layout.getWidget("seo");
		if (seo)
		{
			params.get("components").push(seo);
		}
	},
	/**
	 * Route before
	 */
	route_before: function(params)
	{
		var container = params.get("container");
		/* If page model exists */
		if (container.route == null)
		{
			return ;
		}
		if (container.route.data == null)
		{
			return ;
		}
		/* Setup route data */
		var seo = container.layout.getWidget("seo");
		var route_data = container.route.data;
		if (route_data.has("title"))
		{
			container.layout.setPageTitle(route_data.get("title"));
		}
		if (route_data.has("description"))
		{
			seo.description = route_data.get("description");
		}
		if (route_data.has("robots"))
		{
			seo.robots = route_data.get("robots");
		}
	},
});
Object.assign(Runtime.Widget.Seo.Seo, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Widget.Seo.Seo,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Seo";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Seo.Seo";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Widget.Seo.Seo);
window["Runtime.Widget.Seo.Seo"] = Runtime.Widget.Seo.Seo;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Seo.Seo;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Seo == 'undefined') Runtime.Widget.Seo = {};
Runtime.Widget.Seo.SeoModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Seo.SeoModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Seo.SeoModel.prototype.constructor = Runtime.Widget.Seo.SeoModel;
Object.assign(Runtime.Widget.Seo.SeoModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "article_modified_time", data);
		serializer.process(this, "article_published_time", data);
		serializer.process(this, "canonical_url", data);
		serializer.process(this, "description", data);
		serializer.process(this, "favicon", data);
		serializer.process(this, "robots", data);
		serializer.process(this, "tags", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Set canonical url
	 */
	setCanonicalUrl: function(canonical_url)
	{
		/* Add domain */
		if (this.layout.request_host)
		{
			canonical_url = "//" + Runtime.rtl.toStr(this.layout.request_host) + Runtime.rtl.toStr(canonical_url);
			if (this.layout.request_https)
			{
				canonical_url = "https:" + Runtime.rtl.toStr(canonical_url);
			}
			else
			{
				canonical_url = "http:" + Runtime.rtl.toStr(canonical_url);
			}
		}
		this.canonical_url = canonical_url;
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Seo.SeoWidget";
		this.widget_name = "seo";
		this.canonical_url = "";
		this.description = "";
		this.favicon = "";
		this.article_published_time = "";
		this.article_modified_time = "";
		this.robots = Runtime.Vector.from(["follow","index"]);
		this.tags = null;
	},
});
Object.assign(Runtime.Widget.Seo.SeoModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Seo.SeoModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Seo";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Seo.SeoModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.Seo.SeoModel);
window["Runtime.Widget.Seo.SeoModel"] = Runtime.Widget.Seo.SeoModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Seo.SeoModel;
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
if (typeof Runtime.Widget.Seo == 'undefined') Runtime.Widget.Seo = {};
Runtime.Widget.Seo.SeoWidget = {
	name: "Runtime.Widget.Seo.SeoWidget",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Canonical url */
			if (this.model.canonical_url)
			{
				/* Element 'link' */
				let __v0 = this._e(__v, "link", {"rel":"canonical","href":this.model.canonical_url});
			}
			
			/* Locale */
			/* Element 'meta' */
			let __v1 = this._e(__v, "meta", {"property":"og:locale","content":this.layout.getLocale()});
			
			/* Title and description */
			/* Element 'meta' */
			let __v2 = this._e(__v, "meta", {"property":"og:title","content":this.layout.getFullTitle()});
			
			if (this.model.description != "")
			{
				/* Element 'meta' */
				let __v3 = this._e(__v, "meta", {"property":"og:description","content":this.model.description});
				
				/* Element 'meta' */
				let __v4 = this._e(__v, "meta", {"name":"description","content":this.model.description});
			}
			
			/* Site name */
			let site_name = this.layout.getSiteName();
			if (site_name)
			{
				/* Element 'meta' */
				let __v5 = this._e(__v, "meta", {"property":"og:site_name","content":site_name});
				
				/* Element 'meta' */
				let __v6 = this._e(__v, "meta", {"property":"article:publisher","content":site_name});
			}
			
			/* Robots */
			if (this.model.robots)
			{
				/* Element 'meta' */
				let __v7 = this._e(__v, "meta", {"name":"robots","content":Runtime.rs.join(",", this.model.robots)});
			}
			
			/* Tags */
			if (this.model.tags != null && this.model.tags.count() > 0)
			{
				for (let i = 0; i < this.model.tags.count(); i++)
				{
					/* Element 'meta' */
					let __v8 = this._e(__v, "meta", {"property":"article:tag","content":Runtime.rtl.attr(this.model.tags, i)});
				}
			}
			
			/* Article time */
			if (this.model.article_published_time)
			{
				/* Element 'meta' */
				let __v9 = this._e(__v, "meta", {"property":"article:published_time","content":this.model.article_published_time});
			}
			
			if (this.model.article_modified_time)
			{
				/* Element 'meta' */
				let __v10 = this._e(__v, "meta", {"property":"article:article_modified_time","content":this.model.article_modified_time});
				
				/* Element 'meta' */
				let __v11 = this._e(__v, "meta", {"property":"og:article_modified_time","content":this.model.article_modified_time});
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Seo.SeoWidget,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Seo";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Seo.SeoWidget";
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
Runtime.rtl.defClass(Runtime.Widget.Seo.SeoWidget);
window["Runtime.Widget.Seo.SeoWidget"] = Runtime.Widget.Seo.SeoWidget;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Seo.SeoWidget;
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
if (typeof Runtime.Widget.Tab == 'undefined') Runtime.Widget.Tab = {};
Runtime.Widget.Tab.Tab = {
	name: "Runtime.Widget.Tab.Tab",
	extends: Runtime.Web.Component,
	props: {
		"key": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			if (this.model.canShow(this.key))
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"data-tab":this.key,"class":this._class_name(["tabs__item", ((this.model.isActive(this.key)) ? ("tabs__item--active") : (""))])});
				
				/* Render */
				this._t(__v0, this.renderSlot("default"));
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Tab.Tab,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".tabs__item.h-878a{position: relative;display: none}.tabs__item--active.h-878a{display: block}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Tab";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tab.Tab";
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
Runtime.rtl.defClass(Runtime.Widget.Tab.Tab);
window["Runtime.Widget.Tab.Tab"] = Runtime.Widget.Tab.Tab;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tab.Tab;
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
if (typeof Runtime.Widget.Tab == 'undefined') Runtime.Widget.Tab = {};
Runtime.Widget.Tab.Tabs = {
	name: "Runtime.Widget.Tab.Tabs",
	extends: Runtime.Web.Component,
	methods:
	{
		renderHeader: function()
		{
			let __v = [];
			
			for (let i = 0; i < this.model.items.count(); i++)
			{
				let tab = this.model.items.get(i);
				let tab_key = Runtime.rtl.attr(tab, "key");
				let tab_label = Runtime.rtl.attr(tab, "label");
				let tab_href = Runtime.rtl.attr(tab, "href");
				let is_active = this.model.isActive(tab_key);
				
				if (tab_href == null)
				{
					/* Element 'div' */
					let __v0 = this._e(__v, "div", {"data-tab":tab_key,"onClick":this.onClick,"class":this._class_name(["tabs__header_item", ((is_active) ? ("tabs__header_item--active") : (""))])});
					
					/* Render */
					this._t(__v0, tab_label);
				}
				else
				{
					/* Element 'a' */
					let __v1 = this._e(__v, "a", {"data-tab":tab_key,"href":tab_href,"class":this._class_name(["tabs__header_item", ((is_active) ? ("tabs__header_item--active") : (""))])});
					
					/* Render */
					this._t(__v1, tab_label);
				}
			}
			
			return this._flatten(__v);
		},
		renderContent: function()
		{
			let __v = [];
			
			if (this.model.render)
			{
				for (let i = 0; i < this.model.items.count(); i++)
				{
					let tab = this.model.items.get(i);
					let tab_key = tab.get("key");
					
					if (this.model.canShow(tab_key))
					{
						/* Element 'div' */
						let __v0 = this._e(__v, "div", {"data-tab":tab_key,"class":this._class_name(["tabs__item", ((this.model.isActive(tab_key)) ? ("tabs__item--active") : (""))])});
						
						/* Render */
						this._t(__v0, this.renderSlot(tab_key));
					}
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["tabs", this.class])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["tabs__header"])});
			
			/* Render */
			this._t(__v1, this.renderHeader());
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["tabs__content"])});
			
			/* Render */
			this._t(__v2, this.renderSlot("default"));
			
			/* Render */
			this._t(__v2, this.renderContent());
			
			return this._flatten(__v);
		},
		onClick: function(e)
		{
			var tab_key = e.target.getAttribute("data-tab");
			this.model.setActive(tab_key);
			this.emit("select", tab_key);
		},
	},
};
Object.assign(Runtime.Widget.Tab.Tabs,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Tab.Tab"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".tabs.h-020a{position: relative}.tabs__header.h-020a{display: flex;position: relative;border-bottom-width: var(--widget-border-width);border-bottom-color: var(--widget-color-border);border-bottom-style: solid}.tabs__header_item.h-020a{position: relative;padding: calc(1.5 * var(--widget-space));border-color: transparent;border-width: var(--widget-border-width);border-style: solid;border-bottom-width: 0px;text-decoration: none;color: inherit;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;-ms-user-select: none;top: var(--widget-border-width)}.tabs__header_item.h-020a:hover,.tabs__header_item.h-020a:visited,.tabs__header_item.h-020a:visited:hover,.tabs__header_item.h-020a:focus{text-decoration: none;color: inherit;box-shadow: none;outline: transparent}.tabs__header_item--active.h-020a{background-color: var(--widget-color-table-background);border-color: var(--widget-color-border)}.tabs__content.h-020a{margin-top: calc(2 * var(--widget-space))}.tabs__item.h-020a{position: relative;display: none}.tabs__item--active.h-020a{display: block}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Tab";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tab.Tabs";
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
Runtime.rtl.defClass(Runtime.Widget.Tab.Tabs);
window["Runtime.Widget.Tab.Tabs"] = Runtime.Widget.Tab.Tabs;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tab.Tabs;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Tab == 'undefined') Runtime.Widget.Tab = {};
Runtime.Widget.Tab.TabsModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Tab.TabsModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Tab.TabsModel.prototype.constructor = Runtime.Widget.Tab.TabsModel;
Object.assign(Runtime.Widget.Tab.TabsModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("active"))
		{
			this.active = params.get("active");
		}
		if (params.has("items"))
		{
			this.items = params.get("items");
		}
		if (params.has("render"))
		{
			this.render = params.get("render");
		}
	},
	/**
	 * Returns true if active
	 */
	isActive: function(tab_key)
	{
		return this.active == tab_key;
	},
	/**
	 * Set active
	 */
	setActive: function(active)
	{
		this.active = active;
	},
	/**
	 * Can show
	 */
	canShow: function(tab_key)
	{
		var tab = this.items.findItem(Runtime.lib.equalAttr("key", tab_key));
		if (tab == null)
		{
			return false;
		}
		if (tab.has("href") && tab.get("key") != tab_key)
		{
			return false;
		}
		return true;
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.active = "";
		this.items = Runtime.Vector.from([]);
		this.render = true;
		this.component = "Runtime.Widget.Tab.Tabs";
	},
});
Object.assign(Runtime.Widget.Tab.TabsModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Tab.TabsModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Tab";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tab.TabsModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.Tab.TabsModel);
window["Runtime.Widget.Tab.TabsModel"] = Runtime.Widget.Tab.TabsModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tab.TabsModel;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.AddButtonModel = function()
{
	Runtime.Widget.ButtonModel.apply(this, arguments);
};
Runtime.Widget.Table.AddButtonModel.prototype = Object.create(Runtime.Widget.ButtonModel.prototype);
Runtime.Widget.Table.AddButtonModel.prototype.constructor = Runtime.Widget.Table.AddButtonModel;
Object.assign(Runtime.Widget.Table.AddButtonModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.ButtonModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("table"))
		{
			this.table = params.get("table");
		}
	},
	/**
	 * Refresh
	 */
	onClick: async function(data)
	{
		if (data == undefined) data = null;
		this.table.showAdd();
	},
	_init: function()
	{
		Runtime.Widget.ButtonModel.prototype._init.call(this);
		this.widget_name = "add_button";
		this.content = "Add";
		this.styles = Runtime.Vector.from(["success"]);
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.AddButtonModel, Runtime.Widget.ButtonModel);
Object.assign(Runtime.Widget.Table.AddButtonModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.AddButtonModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.ButtonModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.AddButtonModel);
window["Runtime.Widget.Table.AddButtonModel"] = Runtime.Widget.Table.AddButtonModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.AddButtonModel;
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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.DeleteDialog = {
	name: "Runtime.Widget.Table.DeleteDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderContent: function()
		{
			let __v = [];
			
			return this._flatten(__v);
		},
		renderResult: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.form.result));
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Table.DeleteDialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Dialog.Dialog"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_dialog.h-38e6 .widget_result{margin-top: var(--widget-space)}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.DeleteDialog";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
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
Runtime.rtl.defClass(Runtime.Widget.Table.DeleteDialog);
window["Runtime.Widget.Table.DeleteDialog"] = Runtime.Widget.Table.DeleteDialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.DeleteDialog;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.DeleteDialogModel = function()
{
	Runtime.Widget.Dialog.ConfirmDialogModel.apply(this, arguments);
};
Runtime.Widget.Table.DeleteDialogModel.prototype = Object.create(Runtime.Widget.Dialog.ConfirmDialogModel.prototype);
Runtime.Widget.Table.DeleteDialogModel.prototype.constructor = Runtime.Widget.Table.DeleteDialogModel;
Object.assign(Runtime.Widget.Table.DeleteDialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("form"))
		{
			this.form = params.get("form");
		}
		if (params.has("table"))
		{
			this.table = params.get("table");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.initWidget.call(this, params);
		/* Change confirm button */
		var confirm_button = this.buttons.getWidget("confirm_button");
		confirm_button.content = "Delete";
		confirm_button.styles = Runtime.Vector.from(["danger"]);
	},
	_init: function()
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype._init.call(this);
		this.widget_name = "delete_dialog";
		this.component = "Runtime.Widget.Table.DeleteDialog";
		this.form = null;
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.DeleteDialogModel, Runtime.Widget.Dialog.ConfirmDialogModel);
Object.assign(Runtime.Widget.Table.DeleteDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.DeleteDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.ConfirmDialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.DeleteDialogModel);
window["Runtime.Widget.Table.DeleteDialogModel"] = Runtime.Widget.Table.DeleteDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.DeleteDialogModel;
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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.RefreshButton = {
	name: "Runtime.Widget.Table.RefreshButton",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["refresh_button"])});
			let props = this.model.getProps(this.data);
			
			/* Component 'Button' */
			let __v1 = this._c(__v0, "Runtime.Widget.Button", this._merge_attrs({"render_list":this.render_list,"onClick":this.onClick,"class":this._class_name([this.class])}, props), () => {
				let __v = [];
				
				/* Text */
				this._t(__v, "Refresh");
				
				return this._flatten(__v);
			});
			
			/* Component 'WidgetResult' */
			let __v2 = this._c(__v0, "Runtime.Widget.WidgetResult", {"model":this._model(this.model.result)});
			
			return this._flatten(__v);
		},
		/**
 * Refresh item
 */
		onClick: async function(e)
		{
			this.model.onClick(this.data);
			e.stopPropagation();
		},
	},
};
Object.assign(Runtime.Widget.Table.RefreshButton,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.WidgetResult"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".refresh_button.h-6727{display: flex;align-items: center;gap: 5px}.refresh_button.h-6727 .widget_result.h-e870{margin-top: 0}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.RefreshButton";
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
Runtime.rtl.defClass(Runtime.Widget.Table.RefreshButton);
window["Runtime.Widget.Table.RefreshButton"] = Runtime.Widget.Table.RefreshButton;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.RefreshButton;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.RefreshButtonModel = function()
{
	Runtime.Widget.ButtonModel.apply(this, arguments);
};
Runtime.Widget.Table.RefreshButtonModel.prototype = Object.create(Runtime.Widget.ButtonModel.prototype);
Runtime.Widget.Table.RefreshButtonModel.prototype.constructor = Runtime.Widget.Table.RefreshButtonModel;
Object.assign(Runtime.Widget.Table.RefreshButtonModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.ButtonModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("table"))
		{
			this.table = params.get("table");
		}
	},
	/**
	 * Refresh
	 */
	onClick: async function(data)
	{
		if (data == undefined) data = null;
		this.result.message = "Refresh";
		this.result.code = 0;
		var res = await this.table.reload();
		this.result.setApiResult(res);
	},
	_init: function()
	{
		Runtime.Widget.ButtonModel.prototype._init.call(this);
		this.widget_name = "refresh_button";
		this.component = "Runtime.Widget.Table.RefreshButton";
		this.styles = Runtime.Vector.from(["primary"]);
		this.result = new Runtime.Widget.WidgetResultModel();
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.RefreshButtonModel, Runtime.Widget.ButtonModel);
Object.assign(Runtime.Widget.Table.RefreshButtonModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.RefreshButtonModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.ButtonModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.RefreshButtonModel);
window["Runtime.Widget.Table.RefreshButtonModel"] = Runtime.Widget.Table.RefreshButtonModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.RefreshButtonModel;
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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.SaveDialog = {
	name: "Runtime.Widget.Table.SaveDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderContent: function()
		{
			let __v = [];
			
			if (this.model.action == "add")
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__content"]),"key":"add_form"});
				
				/* Render */
				this._t(__v0, this.renderWidget(this.model.add_form));
			}
			
			if (this.model.action == "edit")
			{
				/* Element 'div' */
				let __v1 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__content"]),"key":"edit_form"});
				
				/* Render */
				this._t(__v1, this.renderWidget(this.model.edit_form));
			}
			
			return this._flatten(__v);
		},
		renderResult: function()
		{
			let __v = [];
			
			if (this.model.action == "add")
			{
				/* Render */
				this._t(__v, this.renderWidget(this.model.add_form.result));
			}
			
			if (this.model.action == "edit")
			{
				/* Render */
				this._t(__v, this.renderWidget(this.model.edit_form.result));
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Table.SaveDialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Dialog.Dialog"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_dialog.h-65a0 .widget_result{margin-top: var(--widget-space)}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.SaveDialog";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
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
Runtime.rtl.defClass(Runtime.Widget.Table.SaveDialog);
window["Runtime.Widget.Table.SaveDialog"] = Runtime.Widget.Table.SaveDialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.SaveDialog;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.SaveDialogModel = function()
{
	Runtime.Widget.Dialog.ConfirmDialogModel.apply(this, arguments);
};
Runtime.Widget.Table.SaveDialogModel.prototype = Object.create(Runtime.Widget.Dialog.ConfirmDialogModel.prototype);
Runtime.Widget.Table.SaveDialogModel.prototype.constructor = Runtime.Widget.Table.SaveDialogModel;
Object.assign(Runtime.Widget.Table.SaveDialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("table"))
		{
			this.table = params.get("table");
		}
		if (params.has("add_form"))
		{
			this.add_form = params.get("add_form");
		}
		if (params.has("edit_form"))
		{
			this.edit_form = params.get("edit_form");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.initWidget.call(this, params);
	},
	_init: function()
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype._init.call(this);
		this.action = "";
		this.widget_name = "save_dialog";
		this.component = "Runtime.Widget.Table.SaveDialog";
		this.add_form = null;
		this.edit_form = null;
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.SaveDialogModel, Runtime.Widget.Dialog.ConfirmDialogModel);
Object.assign(Runtime.Widget.Table.SaveDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.SaveDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.ConfirmDialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.SaveDialogModel);
window["Runtime.Widget.Table.SaveDialogModel"] = Runtime.Widget.Table.SaveDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.SaveDialogModel;
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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.Table = {
	name: "Runtime.Widget.Table.Table",
	extends: Runtime.Web.Component,
	methods:
	{
		renderHeader: function()
		{
			let __v = [];
			let model = this.model;
			let fields = model.fields;
			
			if (fields)
			{
				/* Element 'tr' */
				let __v0 = this._e(__v, "tr", {"class":this._class_name(["widget_table__row_header"])});
				
				for (let i = 0; i < fields.count(); i++)
				{
					let field = Runtime.rtl.attr(fields, i);
					let field_name = field.get("name");
					
					/* Element 'th' */
					let __v1 = this._e(__v0, "th", {"class":this._class_name(["widget_table__th widget_table__th--" + Runtime.rtl.toStr(field_name)]),"key":field_name});
					
					/* Render */
					this._t(__v1, field.get("label", ""));
				}
			}
			
			return this._flatten(__v);
		},
		renderField: function(item, row_number, field)
		{
			let __v = [];
			let model = this.model;
			let storage = model.storage;
			let field_name = field.get("name");
			let field_calculate = field.get("calculate", null);
			let field_component = field.get("component", null);
			let field_model = field.get("model", null);
			let value = "";
			let data = Runtime.Map.from({"item":item,"field_name":field_name,"row_number":row_number,"table":this.model});
			
			if (field_calculate)
			{
				value = Runtime.rtl.apply(field_calculate, Runtime.Vector.from([data]));
			}
			else
			{
				value = this.model.getItemValue(item, field_name);
			}
			let _ = data.set("value", value);
			
			/* Element 'td' */
			let __v0 = this._e(__v, "td", {"class":this._class_name(["widget_table__td widget_table__td--" + Runtime.rtl.toStr(field_name)]),"key":field_name});
			
			if (field_name == "row_number")
			{
				/* Render */
				this._t(__v0, this.model.limit * this.model.page + row_number + 1);
			}
			else if (field_component != null)
			{
				let props = field.get("props", Runtime.Map.from({}));
				
				/* Component '{field_component}' */
				let __v1 = this._c(__v0, field_component, this._merge_attrs({"model":this._model(field_model),"value":value,"data":data}, props));
			}
			else if (field_model != null)
			{
				/* Render */
				this._t(__v0, this.renderWidget(field_model, Runtime.Map.from({"value":value,"data":data})));
			}
			else
			{
				/* Render */
				this._t(__v0, value);
			}
			
			return this._flatten(__v);
		},
		renderRow: function(item, row_number)
		{
			let __v = [];
			let model = this.model;
			let fields = model.fields;
			
			/* Element 'tr' */
			let __v0 = this._e(__v, "tr", {"data-row":row_number,"onClick":() =>
			{
				return this.onRowClick(row_number);
			},"class":this._class_name(["widget_table__tr", ((this.isRowSelected(row_number)) ? ("selected") : (""))]),"key":row_number});
			
			if (fields)
			{
				for (let i = 0; i < fields.count(); i++)
				{
					let field = Runtime.rtl.attr(fields, i);
					
					/* Render */
					this._t(__v0, this.renderField(item, row_number, field));
				}
			}
			
			return this._flatten(__v);
		},
		renderPagination: function()
		{
			let __v = [];
			let fields = this.model.fields;
			
			if (fields && this.model.pages > 1)
			{
				let props = this.model.pagination_props;
				let pagination_class_name = this.model.pagination_class_name;
				
				/* Element 'tr' */
				let __v0 = this._e(__v, "tr", {});
				
				/* Element 'td' */
				let __v1 = this._e(__v0, "td", {"colspan":fields.count()});
				
				/* Component '{pagination_class_name}' */
				let __v2 = this._c(__v1, pagination_class_name, this._merge_attrs({"page":this.model.page + 1,"pages":this.model.pages,"onPage":this.onChangePage}, props));
			}
			
			return this._flatten(__v);
		},
		renderBody: function()
		{
			let __v = [];
			
			if (this.model)
			{
				let items = this.model.getItems();
				
				if (items)
				{
					for (let i = 0; i < items.count(); i++)
					{
						let item = items.get(i);
						
						/* Render */
						this._t(__v, this.renderRow(item, i));
					}
				}
				
				/* Render */
				this._t(__v, this.renderPagination());
			}
			
			return this._flatten(__v);
		},
		renderTable: function()
		{
			let __v = [];
			
			/* Element 'table' */
			let __v0 = this._e(__v, "table", {"class":this._class_name(["widget_table__table"])});
			
			/* Element 'tbody' */
			let __v1 = this._e(__v0, "tbody", {});
			
			/* Render */
			this._t(__v1, this.renderHeader());
			
			/* Render */
			this._t(__v1, this.renderBody());
			
			return this._flatten(__v);
		},
		renderWidgets: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.render_list));
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_table", this.class, this.$options.getStyles("widget_table", this.model.styles)])});
			
			/* Render */
			this._t(__v0, this.renderTable());
			
			/* Render */
			this._t(__v0, this.renderWidgets());
			
			return this._flatten(__v);
		},
		/**
 * Returns true if row selected
 */
		isRowSelected: function(row_number)
		{
			return this.model.row_selected == row_number;
		},
		/**
 * OnRowClick
 */
		onRowClick: function(row_number)
		{
			this.model.onRowClick(row_number);
		},
		/**
 * On change page
 */
		onChangePage: function(page)
		{
			/*this.model.onChangePage(page);*/
		},
	},
};
Object.assign(Runtime.Widget.Table.Table,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Pagination"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_table__table.h-6434{width: auto;border-collapse: collapse;vertical-align: top;background-color: var(--widget-color-table-background)}.widget_table__th.h-6434{text-align: center}.widget_table__th.h-6434,.widget_table__td.h-6434{vertical-align: middle;padding: var(--widget-space)}.widget_table__tr.selected.h-6434 td{background-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.widget_table--border.h-6434 .widget_table__table{border-color: var(--widget-color-border);border-width: var(--widget-border-width);border-style: solid}.widget_table--border.h-6434 .widget_table__th,.widget_table--border.h-6434 .widget_table__td{border-bottom-color: var(--widget-color-border);border-bottom-width: var(--widget-border-width);border-bottom-style: solid}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.Table";
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
Runtime.rtl.defClass(Runtime.Widget.Table.Table);
window["Runtime.Widget.Table.Table"] = Runtime.Widget.Table.Table;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.Table;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Table.TableModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Table.TableModel.prototype.constructor = Runtime.Widget.Table.TableModel;
Object.assign(Runtime.Widget.Table.TableModel.prototype,
{
	/**
	 * Create data storage
	 */
	createDataStorage: function()
	{
		return null;
	},
	/**
	 * Set data storage
	 */
	setDataStorage: function(storage)
	{
		this.storage = storage;
	},
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("foreign_key"))
		{
			this.foreign_key = params.get("foreign_key");
		}
		if (params.has("post_data"))
		{
			this.post_data = params.get("post_data");
		}
		if (params.has("limit"))
		{
			this.limit = params.get("limit");
		}
		if (params.has("page"))
		{
			this.page = params.get("page");
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
		/* Setup pagination */
		if (params.has("pagination_class_name"))
		{
			this.pagination_class_name = params.get("pagination_class_name");
		}
		if (params.has("pagination_props"))
		{
			this.pagination_props = params.get("pagination_props");
		}
		/* Setup fields */
		if (params.has("fields"))
		{
			this.fields = Runtime.Vector.from([]);
			this.addFields(params.get("fields"));
		}
		/* Setup storage */
		if (params.has("storage"))
		{
			this.storage = this.createModel(params.get("storage"));
		}
		if (this.storage == null)
		{
			this.storage = this.createDataStorage(params);
		}
		/* Setup storage table */
		if (this.storage != null)
		{
			this.storage.setTable(this);
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
		/* Render list */
		this.render_list = this.addWidget("Runtime.Widget.RenderListModel", Runtime.Map.from({"widget_name":"render_list"}));
		/* Result */
		this.result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"widget_name":"result"}));
		/* Add layout */
		this.layout.addComponent(this.pagination_class_name);
	},
	/**
	 * Add field
	 */
	addField: function(field)
	{
		/* Create model */
		if (field.has("model"))
		{
			field.set("model", this.createModel(field.get("model")));
		}
		/* Add field */
		this.fields.append(field);
		/* Add component */
		if (field.has("component"))
		{
			this.layout.addComponent(field.get("component"));
		}
	},
	/**
	 * Add fields
	 */
	addFields: function(fields)
	{
		for (var i = 0; i < fields.count(); i++)
		{
			this.addField(fields.get(i));
		}
	},
	/**
	 * Remove field
	 */
	removeField: function(field_name)
	{
		this.fields = this.fields.filter((field) =>
		{
			return field.get("name") != field_name;
		});
	},
	/**
	 * Returns items
	 */
	getItems: function()
	{
		return this.items;
	},
	/**
	 * Returns item by row number
	 */
	getItemByRowNumber: function(row_number)
	{
		return this.items.get(row_number);
	},
	/**
	 * Returns item value
	 */
	getItemValue: function(item, field_name)
	{
		return item.get(field_name);
	},
	/**
	 * Returns selected item
	 */
	getSelectedItem: function()
	{
		return this.getItemByRowNumber(this.row_selected);
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "limit", data);
		serializer.process(this, "page", data);
		serializer.process(this, "pages", data);
		serializer.process(this, "items", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Set api result
	 */
	setApiResult: function(res, action)
	{
		if (res == null)
		{
			return ;
		}
		/* Load */
		if (action == "search" || action == "load" || action == "reload")
		{
			if (res.data.has("items"))
			{
				this.items = res.data.get("items");
			}
			if (res.data.has("page"))
			{
				this.page = res.data.get("page");
			}
			if (res.data.has("pages"))
			{
				this.pages = res.data.get("pages");
			}
			this.result.setApiResult(res);
		}
	},
	/**
	 * Merge post data
	 */
	mergePostData: function(post_data, action)
	{
		if (this.foreign_key)
		{
			post_data.set("foreign_key", this.foreign_key);
		}
		if (this.post_data)
		{
			post_data = post_data.concat(this.post_data);
		}
		return post_data;
	},
	/**
	 * Change page
	 */
	changePage: async function(page)
	{
		this.page = page;
		this.refresh();
	},
	/**
	 * Load table data
	 */
	loadData: async function(container)
	{
		await Runtime.Web.BaseModel.prototype.loadData.call(this, container);
		await this.reload();
	},
	/**
	 * Reload table data
	 */
	reload: async function()
	{
		if (!this.storage)
		{
			return Promise.resolve(null);
		}
		var res = await this.storage.load();
		this.setApiResult(res, "reload");
		return Promise.resolve(res);
	},
	/**
	 * Row click
	 */
	onRowClick: function(row_number)
	{
		this.emit(new Runtime.Widget.Table.TableMessage(Runtime.Map.from({"name":"row_click","data":Runtime.Map.from({"row_number":row_number})})));
	},
	/**
	 * Row button click
	 */
	onRowButtonClick: function(message)
	{
		this.emit(new Runtime.Widget.Table.TableMessage(Runtime.Map.from({"name":"row_button_click","message":message})));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Table.Table";
		this.widget_name = "table";
		this.pagination_class_name = "Runtime.Widget.Pagination";
		this.pagination_props = Runtime.Map.from({"name":"page"});
		this.storage = null;
		this.limit = 10;
		this.page = 0;
		this.pages = 0;
		this.row_selected = -1;
		this.foreign_key = null;
		this.post_data = null;
		this.fields = Runtime.Vector.from([]);
		this.items = Runtime.Vector.from([]);
		this.styles = Runtime.Vector.from([]);
		this.render_list = null;
		this.result = null;
	},
});
Object.assign(Runtime.Widget.Table.TableModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Table.TableModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.TableModel);
window["Runtime.Widget.Table.TableModel"] = Runtime.Widget.Table.TableModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableModel;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableDialogModel = function()
{
	Runtime.Widget.Table.TableModel.apply(this, arguments);
};
Runtime.Widget.Table.TableDialogModel.prototype = Object.create(Runtime.Widget.Table.TableModel.prototype);
Runtime.Widget.Table.TableDialogModel.prototype.constructor = Runtime.Widget.Table.TableDialogModel;
Object.assign(Runtime.Widget.Table.TableDialogModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Table.TableModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("get_title"))
		{
			this.get_title = params.get("get_title");
		}
		/* Form */
		if (params.has("add_form"))
		{
			this.add_form = this.createModel(params.get("add_form"));
		}
		if (params.has("edit_form"))
		{
			this.edit_form = this.createModel(params.get("edit_form"));
		}
		if (params.has("delete_form"))
		{
			this.delete_form = this.createModel(params.get("delete_form"));
		}
		/* Setup dialog */
		if (params.has("save_dialog"))
		{
			this.save_dialog = this.createModel(params.get("save_dialog"));
		}
		if (params.has("delete_dialog"))
		{
			this.delete_dialog = this.createModel(params.get("delete_dialog"));
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Table.TableModel.prototype.initWidget.call(this, params);
		/* Add events */
		if (this.add_form)
		{
			this.add_form.addListener("submit", new Runtime.Callback(this, "onFormSubmit"));
		}
		if (this.edit_form && this.add_form != this.edit_form)
		{
			this.edit_form.addListener("submit", new Runtime.Callback(this, "onFormSubmit"));
		}
		if (this.delete_form)
		{
			this.delete_form.addListener("submit", new Runtime.Callback(this, "onFormSubmit"));
		}
		/* Hide form result */
		if (this.add_form)
		{
			this.add_form.show_result = false;
		}
		if (this.edit_form)
		{
			this.edit_form.show_result = false;
		}
		if (this.delete_form)
		{
			this.delete_form.show_result = false;
		}
		/* Create save wiget */
		if (this.add_form || this.edit_form)
		{
			this.save_dialog = this.addWidget("Runtime.Widget.Table.SaveDialogModel", Runtime.Map.from({"add_form":this.add_form,"edit_form":this.edit_form,"table":this,"widget_name":"save_dialog"}));
			this.save_dialog.addListener("confirm", new Runtime.Callback(this, "onConfirmSaveClick"), -999);
		}
		/* Create delete widget */
		if (this.delete_form)
		{
			this.delete_dialog = this.addWidget("Runtime.Widget.Table.DeleteDialogModel", Runtime.Map.from({"form":this.delete_form,"table":this,"widget_name":"delete_dialog"}));
			this.delete_dialog.addListener("confirm", new Runtime.Callback(this, "onConfirmDeleteClick"), -999);
		}
		/* Add dialogs */
		if (this.save_dialog)
		{
			this.render_list.addItem(this.save_dialog);
		}
		if (this.delete_dialog)
		{
			this.render_list.addItem(this.delete_dialog);
		}
	},
	/**
	 * Returns title
	 */
	getTitle: function(params)
	{
		if (this.get_title)
		{
			return Runtime.rtl.apply(this.get_title, Runtime.Vector.from([params]));
		}
		return "";
	},
	/**
	 * Row button click
	 */
	onRowButtonClick: function(message)
	{
		var data = message.data;
		var button_name = message.widget.widget_name;
		if (button_name == "edit_button")
		{
			this.showEdit(data);
		}
		else if (button_name == "delete_button")
		{
			this.showDelete(data);
		}
		Runtime.Widget.Table.TableModel.prototype.onRowButtonClick.call(this, message);
	},
	/**
	 * Show add
	 */
	showAdd: function()
	{
		if (!this.add_form)
		{
			return ;
		}
		this.add_form.clear();
		/* Change confirm button */
		var confirm_button = this.save_dialog.buttons.getWidget("confirm_button");
		confirm_button.content = "Add";
		confirm_button.styles = Runtime.Vector.from(["success"]);
		/* Show dialog */
		this.save_dialog.action = "add";
		this.save_dialog.title = this.getTitle(Runtime.Map.from({"action":"add"}));
		this.save_dialog.show();
	},
	/**
	 * Show edit
	 */
	showEdit: function(data)
	{
		if (!this.edit_form)
		{
			return ;
		}
		var item = Runtime.Serializer.copy(data.get("item"));
		this.edit_form.clear();
		this.edit_form.setItem(item);
		this.edit_form.setRowNumber(data.get("row_number"));
		/* Change confirm button */
		var confirm_button = this.save_dialog.buttons.getWidget("confirm_button");
		confirm_button.content = "Save";
		confirm_button.styles = Runtime.Vector.from(["success"]);
		/* Show dialog */
		this.save_dialog.action = "edit";
		this.save_dialog.title = this.getTitle(Runtime.Map.from({"action":"edit","item":item}));
		this.save_dialog.show();
	},
	/**
	 * Show delete
	 */
	showDelete: function(data)
	{
		var item = Runtime.Serializer.copy(data.get("item"));
		this.delete_form.clear();
		this.delete_form.setItem(item);
		this.delete_form.setRowNumber(data.get("row_number"));
		/* Show dialog */
		this.delete_dialog.title = this.getTitle(Runtime.Map.from({"action":"delete","item":item}));
		this.delete_dialog.show();
	},
	/**
	 * Confirm event
	 */
	onConfirmSaveClick: async function(message)
	{
		var res;
		/* Get form */
		var form = null;
		if (this.save_dialog.action == "add")
		{
			form = this.add_form;
		}
		else if (this.save_dialog.action == "edit")
		{
			form = this.edit_form;
		}
		if (!form)
		{
			return Promise.resolve();
		}
		/* Submit form */
		res = await form.submit();
		/* Check response is exists */
		if (!res)
		{
			form.result.setError("Response does not exists");
			throw new Runtime.Widget.Dialog.DialogModelException("Response does not exists")
		}
		/* Error message */
		if (!res.isSuccess())
		{
			throw new Runtime.Widget.Dialog.DialogModelException(res.message)
		}
		/* Reload table */
		this.reload();
	},
	/**
	 * Confirm event
	 */
	onConfirmDeleteClick: async function(message)
	{
		var res = await this.delete_form.submit();
		/* Error message */
		if (!res.isSuccess())
		{
			throw new Runtime.Widget.Dialog.DialogModelException(res.message)
		}
		/* Reload table */
		this.reload();
	},
	_init: function()
	{
		Runtime.Widget.Table.TableModel.prototype._init.call(this);
		this.add_form = null;
		this.edit_form = null;
		this.delete_form = null;
		this.save_dialog = null;
		this.delete_dialog = null;
		this.get_title = null;
	},
});
Object.assign(Runtime.Widget.Table.TableDialogModel, Runtime.Widget.Table.TableModel);
Object.assign(Runtime.Widget.Table.TableDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Table.TableModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.TableDialogModel);
window["Runtime.Widget.Table.TableDialogModel"] = Runtime.Widget.Table.TableDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableDialogModel;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableMessage = function()
{
	Runtime.Web.Messages.Message.apply(this, arguments);
};
Runtime.Widget.Table.TableMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Widget.Table.TableMessage.prototype.constructor = Runtime.Widget.Table.TableMessage;
Object.assign(Runtime.Widget.Table.TableMessage.prototype,
{
	_init: function()
	{
		Runtime.Web.Messages.Message.prototype._init.call(this);
		this.message = null;
	},
});
Object.assign(Runtime.Widget.Table.TableMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Widget.Table.TableMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableMessage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Messages.Message";
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
Runtime.rtl.defClass(Runtime.Widget.Table.TableMessage);
window["Runtime.Widget.Table.TableMessage"] = Runtime.Widget.Table.TableMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableMessage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableProxyStorage = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Table.TableProxyStorage.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Table.TableProxyStorage.prototype.constructor = Runtime.Widget.Table.TableProxyStorage;
Object.assign(Runtime.Widget.Table.TableProxyStorage.prototype,
{
	/**
	 * Set table
	 */
	setTable: function(table)
	{
		this.table = table;
	},
	/**
	 * Returns items
	 */
	getItems: function()
	{
		return Runtime.rtl.attr(this.container, this.path);
	},
	/**
	 * Load form
	 */
	load: async function()
	{
		/* Success result */
		var res = new Runtime.Web.ApiResult();
		res.success(Runtime.Map.from({"data":Runtime.Map.from({"items":this.getItems(),"page":0,"pages":1})}));
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.container = null;
		this.path = null;
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.TableProxyStorage, Runtime.BaseObject);
Object.assign(Runtime.Widget.Table.TableProxyStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableProxyStorage";
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
	__implements__:
	[
		Runtime.Widget.Table.TableStorageInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.Table.TableProxyStorage);
window["Runtime.Widget.Table.TableProxyStorage"] = Runtime.Widget.Table.TableProxyStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableProxyStorage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableRowButtonsModel = function()
{
	Runtime.Widget.RowButtonsModel.apply(this, arguments);
};
Runtime.Widget.Table.TableRowButtonsModel.prototype = Object.create(Runtime.Widget.RowButtonsModel.prototype);
Runtime.Widget.Table.TableRowButtonsModel.prototype.constructor = Runtime.Widget.Table.TableRowButtonsModel;
Object.assign(Runtime.Widget.Table.TableRowButtonsModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		var show_edit = true;
		var show_delete = true;
		if (params.has("edit"))
		{
			show_edit = params.get("edit");
		}
		if (params.has("delete"))
		{
			show_delete = params.get("delete");
		}
		/* Edit button */
		if (show_edit)
		{
			this.addButton(Runtime.Map.from({"content":"Edit","widget_name":"edit_button","styles":Runtime.Vector.from(["default","small"])}));
		}
		/* Delete button */
		if (show_delete)
		{
			this.addButton(Runtime.Map.from({"content":"Delete","widget_name":"delete_button","styles":Runtime.Vector.from(["danger","small"])}));
		}
		Runtime.Widget.RowButtonsModel.prototype.initWidget.call(this, params);
	},
	/**
	 * Buttons click
	 */
	onButtonClick: function(message)
	{
		this.emit(message);
		this.parent_widget.onRowButtonClick(message);
	},
	_init: function()
	{
		Runtime.Widget.RowButtonsModel.prototype._init.call(this);
		this.widget_name = "row_buttons";
	},
});
Object.assign(Runtime.Widget.Table.TableRowButtonsModel, Runtime.Widget.RowButtonsModel);
Object.assign(Runtime.Widget.Table.TableRowButtonsModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableRowButtonsModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.RowButtonsModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.TableRowButtonsModel);
window["Runtime.Widget.Table.TableRowButtonsModel"] = Runtime.Widget.Table.TableRowButtonsModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableRowButtonsModel;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableStorage = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Table.TableStorage.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Table.TableStorage.prototype.constructor = Runtime.Widget.Table.TableStorage;
Object.assign(Runtime.Widget.Table.TableStorage.prototype,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return this.api_name;
	},
	/**
	 * Set table
	 */
	setTable: function(table)
	{
		this.table = table;
	},
	/**
	 * Load form
	 */
	load: async function()
	{
		var post_data = Runtime.Map.from({"page":this.table.page,"limit":this.table.limit});
		post_data = this.table.mergePostData(post_data, "load");
		var res = await this.table.layout.callApi(Runtime.Map.from({"api_name":this.getApiName(),"method_name":"actionSearch","data":post_data}));
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.api_name = "";
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.TableStorage, Runtime.BaseObject);
Object.assign(Runtime.Widget.Table.TableStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableStorage";
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
	__implements__:
	[
		Runtime.Widget.Table.TableStorageInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.Table.TableStorage);
window["Runtime.Widget.Table.TableStorage"] = Runtime.Widget.Table.TableStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableStorage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableStorageInterface = function()
{
};
Object.assign(Runtime.Widget.Table.TableStorageInterface.prototype,
{
	/**
	 * Set table
	 */
	setTable: function(table)
	{
	},
	/**
	 * Load form
	 */
	load: async function()
	{
	},
});
Object.assign(Runtime.Widget.Table.TableStorageInterface,
{
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableStorageInterface";
	},
});
Runtime.rtl.defClass(Runtime.Widget.Table.TableStorageInterface);
window["Runtime.Widget.Table.TableStorageInterface"] = Runtime.Widget.Table.TableStorageInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableStorageInterface;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Tree == 'undefined') Runtime.Widget.Tree = {};
Runtime.Widget.Tree.TreeItem = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Tree.TreeItem.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Tree.TreeItem.prototype.constructor = Runtime.Widget.Tree.TreeItem;
Object.assign(Runtime.Widget.Tree.TreeItem.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "key", data);
		serializer.process(this, "label", data);
		serializer.process(this, "items", data);
	},
	/**
	 * Returns true if can insert inside
	 */
	canDragInside: function()
	{
		return true;
	},
	/**
	 * Get item
	 */
	get: function(path)
	{
		if (path == null)
		{
			return null;
		}
		if (path.count() == 0)
		{
			return this;
		}
		var pos = path.first();
		var new_item = this.items.get(pos);
		if (new_item == null)
		{
			return null;
		}
		return new_item.get(path.slice(1));
	},
	/**
	 * Find item position
	 */
	find: function(item)
	{
		return (item) ? (this.items.find(Runtime.lib.equal(item))) : (-1);
	},
	/**
	 * Context menu click
	 */
	onContextMenu: function(model)
	{
	},
	/**
	 * Click
	 */
	onClick: function(model)
	{
	},
	/**
	 * Select item
	 */
	onSelect: function(model)
	{
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.key = "";
		this.label = "";
		this.open = true;
		this.items = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Widget.Tree.TreeItem, Runtime.BaseObject);
Object.assign(Runtime.Widget.Tree.TreeItem,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Tree";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tree.TreeItem";
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
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.Tree.TreeItem);
window["Runtime.Widget.Tree.TreeItem"] = Runtime.Widget.Tree.TreeItem;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tree.TreeItem;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Tree == 'undefined') Runtime.Widget.Tree = {};
Runtime.Widget.Tree.TreeMessage = function()
{
	Runtime.Web.Messages.Message.apply(this, arguments);
};
Runtime.Widget.Tree.TreeMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Widget.Tree.TreeMessage.prototype.constructor = Runtime.Widget.Tree.TreeMessage;
Object.assign(Runtime.Widget.Tree.TreeMessage.prototype,
{
	_init: function()
	{
		Runtime.Web.Messages.Message.prototype._init.call(this);
		this.kind = null;
		this.dest = null;
		this.new_src_path = null;
		this.path = null;
		this.src = null;
		this.result = null;
		this.dest_item = null;
		this.dest_parent_item = null;
		this.item = null;
		this.src_item = null;
		this.src_parent_item = null;
	},
});
Object.assign(Runtime.Widget.Tree.TreeMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Widget.Tree.TreeMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Tree";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tree.TreeMessage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Messages.Message";
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
Runtime.rtl.defClass(Runtime.Widget.Tree.TreeMessage);
window["Runtime.Widget.Tree.TreeMessage"] = Runtime.Widget.Tree.TreeMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tree.TreeMessage;
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Tree == 'undefined') Runtime.Widget.Tree = {};
Runtime.Widget.Tree.TreeModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Tree.TreeModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Tree.TreeModel.prototype.constructor = Runtime.Widget.Tree.TreeModel;
Object.assign(Runtime.Widget.Tree.TreeModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("autoselect"))
		{
			this.autoselect = params.get("autoselect");
		}
		if (params.has("dnd"))
		{
			this.dnd = params.get("dnd");
		}
		if (params.has("icons"))
		{
			this.icons = params.get("icons");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
		/* Setup context menu */
		if (params.has("context_menu"))
		{
			this.setContextMenu(params.get("context_menu"));
		}
	},
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "root", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Set context menu
	 */
	setContextMenu: function(context_menu)
	{
		this.render_context_menu = true;
		if (context_menu instanceof Runtime.Dict)
		{
			this.context_menu = this.addWidget("Runtime.Widget.ContextMenu.ContextMenuModel", context_menu);
		}
		else
		{
			this.context_menu = this.createModel(context_menu);
			if (context_menu instanceof Runtime.Web.BaseModel)
			{
				this.render_context_menu = false;
			}
		}
	},
	/**
	 * Select item
	 */
	selectItem: function(path)
	{
		var item = (path) ? (this.root.get(path)) : (null);
		if (this.selected_item == item)
		{
			return ;
		}
		this.selected_path = path;
		this.selected_item = item;
		if (this.selected_item)
		{
			this.selected_item.onSelect();
		}
	},
	/**
	 * Can drag & drop
	 */
	canDrag: function(src, dest, kind)
	{
		var message = new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"name":"canDrag","src":src,"dest":dest,"src_item":this.root.get(src),"dest_item":this.root.get(dest),"kind":kind,"result":true}));
		this.emit(message);
		return message.result;
	},
	/**
	 * Drag & Drop
	 */
	dragElement: function(src, dest, kind)
	{
		if (dest.count() == 0)
		{
			dest = Runtime.Vector.from([this.root.items.count() - 1]);
		}
		if (!this.canDrag(src, dest, kind))
		{
			return ;
		}
		/* Move item */
		var src_item = this.root.get(src);
		var dest_item = this.root.get(dest);
		if (!src_item)
		{
			return ;
		}
		if (!dest_item)
		{
			return ;
		}
		/* Get parent items */
		var src_parent_path = src.slice(0, -1);
		var dest_parent_path = (kind != "into") ? (dest.slice(0, -1)) : (dest);
		var src_parent_item = this.root.get(src_parent_path);
		var dest_parent_item = this.root.get(dest_parent_path);
		/* Move item */
		src_parent_item.items.removeItem(src_item);
		if (kind == "into")
		{
			dest_parent_item.items.addItem(src_item, null, "before");
		}
		else
		{
			dest_parent_item.items.addItem(src_item, dest_item, kind);
		}
		/* Update dest path */
		var new_dest_parent_path = dest_parent_path.slice();
		if (src.count() <= new_dest_parent_path.count())
		{
			var pos = src.count() - 1;
			if (src.get(pos) < new_dest_parent_path.get(pos))
			{
				new_dest_parent_path.set(pos, new_dest_parent_path.get(pos) - 1);
			}
		}
		/* Create src new path */
		var pos = dest_parent_item.find(src_item);
		var new_src_path = new_dest_parent_path.pushIm(pos);
		/* Send drag & drop event */
		this.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"name":"dragElement","dest_item":dest_item,"dest_parent_item":dest_parent_item,"kind":kind,"src_item":src_item,"src_parent_item":src_parent_item,"new_src_path":new_src_path})));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Tree.TreeWidget";
		this.widget_name = "tree";
		this.autoselect = true;
		this.dnd = false;
		this.icons = true;
		this.is_open = false;
		this.render_context_menu = true;
		this.context_menu = null;
		this.selected_path = null;
		this.selected_item = null;
		this.root = null;
	},
});
Object.assign(Runtime.Widget.Tree.TreeModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Tree.TreeModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Tree";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tree.TreeModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.Tree.TreeModel);
window["Runtime.Widget.Tree.TreeModel"] = Runtime.Widget.Tree.TreeModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tree.TreeModel;
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
if (typeof Runtime.Widget.Tree == 'undefined') Runtime.Widget.Tree = {};
Runtime.Widget.Tree.TreeWidget = {
	name: "Runtime.Widget.Tree.TreeWidget",
	extends: Runtime.Web.Component,
	data: function ()
	{
		return {
			is_drag: false,
			drag_elem: null,
			drag_start_point: null,
			drag_dest_box: null,
			drag_dest_elem: null,
			drag_dest_item: null,
			drag_dest_kind: null,
		};
	},
	methods:
	{
		renderBox: function()
		{
			let __v = [];
			
			if (this.drag_dest_box != null && this.is_drag)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"style":this.drag_dest_box,"class":this._class_name(["tree_widget__box", "tree_widget__box--" + Runtime.rtl.toStr(this.drag_dest_kind)])});
			}
			
			return this._flatten(__v);
		},
		renderItemLabel: function(item, path)
		{
			let __v = [];
			
			/* Element 'span' */
			let __v0 = this._e(__v, "span", {"onMousedown":(e) =>
			{
				this.onMouseDownItem(e, item, path);
			},"class":this._class_name(["tree_widget__item_label"])});
			
			/* Render */
			this._t(__v0, item.label);
			
			return this._flatten(__v);
		},
		renderItemContent: function(item, path)
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderItemLabel(item, path));
			
			return this._flatten(__v);
		},
		renderItem: function(item, path)
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"data-path":Runtime.rs.join(".", path),"onContextmenu":(e) =>
			{
				this.onContextMenuItem(e, item, path);
			},"onMousemove":(e) =>
			{
				this.onMouseMoveItem(e, item);
			},"class":this._class_name(["tree_widget__item", ((item == this.model.selected_item) ? ("selected") : (""))]),"key":"item." + Runtime.rtl.toStr(Runtime.rs.join(".", path)) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(item.key)});
			
			/* Render */
			this._t(__v0, this.renderItemContent(item, path));
			
			/* Render */
			this._t(__v, this.renderItems(item, path));
			
			return this._flatten(__v);
		},
		renderItems: function(item, path)
		{
			let __v = [];
			
			if (item != null && item.items != null && item.items.count() > 0)
			{
				let key = (path.count() > 0) ? ("item." + Runtime.rtl.toStr(Runtime.rs.join(".", path)) + Runtime.rtl.toStr(".items")) : ("item");
				
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["tree_widget__items", ((!item.open) ? ("hide") : (""))]),"key":key});
				
				for (let i = 0; i < item.items.count(); i++)
				{
					/* Render */
					this._t(__v0, this.renderItem(item.items.get(i), path.pushIm(i)));
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"ref":"widget","onContextmenu":(e) =>
			{
				this.onContextMenuItem(e, null, null);
			},"onMousedown":(e) =>
			{
				this.onMouseDown(e, null, null);
			},"onMouseup":(e) =>
			{
				this.onMouseUp(e);
			},"onMousemove":(e) =>
			{
				this.onMouseMove(e);
			},"class":this._class_name(["tree_widget"])});
			
			/* Render */
			this._t(__v0, this.renderBox());
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"ref":"content","class":this._class_name(["tree_widget__content"])});
			
			/* Render */
			this._t(__v1, this.renderItems(this.model.root, Runtime.Vector.from([])));
			
			if (this.model.context_menu && this.model.render_context_menu)
			{
				/* Render */
				this._t(__v, this.renderWidget(this.model.context_menu));
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns src elem
 */
		getSrc: function()
		{
			if (!this.drag_elem)
			{
				return null;
			}
			var src_elem_path = this.drag_elem.getAttribute("data-path");
			var src_elem = (src_elem_path) ? (Runtime.rs.split(".", src_elem_path)) : (Runtime.Vector.from([]));
			return src_elem.map((s) =>
			{
				return Runtime.rtl.to(s, {"e":"int"});
			});
		},
		/**
 * Returns dest elem
 */
		getDest: function()
		{
			if (!this.drag_dest_elem)
			{
				return null;
			}
			var dest_elem_path = this.drag_dest_elem.getAttribute("data-path");
			var dest_elem = (dest_elem_path) ? (Runtime.rs.split(".", dest_elem_path)) : (Runtime.Vector.from([]));
			return dest_elem.map((s) =>
			{
				return Runtime.rtl.to(s, {"e":"int"});
			});
		},
		/**
 * Find drag elem
 */
		findDragElem: function(elem)
		{
			if (elem.classList.contains("tree_widget__item_label"))
			{
				return elem.parentElement;
			}
			return elem;
		},
		/**
 * Find elem by path
 */
		findElemByPath: function(path)
		{
			var path = ".tree_widget__item[data-path='" + Runtime.rtl.toStr(path) + Runtime.rtl.toStr("']");
			return document.querySelector(path);
		},
		/**
 * Returns true if elem inside drag_elem
 */
		checkInside: function(elem)
		{
			if (!this.drag_elem)
			{
				return false;
			}
			if (elem == this.drag_elem)
			{
				return false;
			}
			var drag_elem_path = this.drag_elem.getAttribute("data-path");
			var elem_path = elem.getAttribute("data-path");
			if (drag_elem_path == elem_path)
			{
				return true;
			}
			if (Runtime.rs.substr(elem_path, 0, Runtime.rs.strlen(drag_elem_path) + 1) == drag_elem_path + Runtime.rtl.toStr("."))
			{
				return true;
			}
			return false;
		},
		/**
 * Start Drag & Drop
 */
		startDrag: function(e)
		{
			if (!this.model.dnd)
			{
				return false;
			}
			if (this.is_drag != false)
			{
				return false;
			}
			if (this.drag_start_point == null)
			{
				return false;
			}
			if (Runtime.Math.abs(e.layerY - this.drag_start_point.get("y")) > 5)
			{
				return false;
			}
			this.is_drag = true;
			return true;
		},
		/**
 * Stop drag & drop
 */
		stopDrag: function()
		{
			/* Do drag & drop */
			if (this.drag_dest_box && this.drag_elem && this.drag_dest_elem)
			{
				this.model.dragElement(this.getSrc(), this.getDest(), this.drag_dest_kind);
			}
			this.is_drag = false;
			this.drag_dest_box = null;
			this.drag_dest_elem = null;
			this.drag_dest_item = null;
			this.drag_dest_kind = null;
			this.drag_elem = null;
			this.drag_start_point = null;
		},
		/**
 * Set drag & drop dest element
 */
		setDragDestElement: function(elem, item, kind)
		{
			if (!this.is_drag)
			{
				return ;
			}
			if (this.checkInside(elem))
			{
				return ;
			}
			if (kind == "into" && this.drag_elem == elem)
			{
				kind = "before";
			}
			if (kind == "into" && item != null && !item.canDragInside())
			{
				kind = "after";
			}
			if (this.drag_dest_elem == elem && this.drag_dest_kind == kind)
			{
				return ;
			}
			/* Setup box */
			if (this.drag_elem == elem)
			{
				this.drag_dest_box = null;
				return ;
			}
			/* Setup dest element */
			this.drag_dest_elem = elem;
			this.drag_dest_item = item;
			/* Get elem path */
			var src_path = this.getSrc();
			var dest_path = this.getDest();
			if (dest_path == null)
			{
				this.drag_dest_box = null;
				return ;
			}
			/* Can drag */
			var can_drag = this.model.canDrag(src_path, dest_path, kind);
			if (!can_drag)
			{
				if (kind == "into")
				{
					kind = "after";
					can_drag = this.model.canDrag(src_path, dest_path, kind);
					if (!can_drag)
					{
						this.drag_dest_box = null;
						return ;
					}
				}
			}
			/* Setup dest values */
			this.drag_dest_kind = kind;
			this.drag_dest_box = this.getBoxStyles(elem, kind);
		},
		/**
 * Returns box styles by element
 */
		getBoxStyles: function(elem, kind)
		{
			if (kind == undefined) kind = "";
			var left;
			var top;
			var width;
			var height;
			left = elem.offsetLeft;
			top = elem.offsetTop;
			width = elem.clientWidth - 1;
			height = elem.clientHeight - 1;
			if (kind == "before")
			{
				return Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top) + Runtime.rtl.toStr("px"),"width: " + Runtime.rtl.toStr(width) + Runtime.rtl.toStr("px"),"height: 1px"]));
			}
			if (kind == "after")
			{
				return Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top + height) + Runtime.rtl.toStr("px"),"width: " + Runtime.rtl.toStr(width) + Runtime.rtl.toStr("px"),"height: 1px"]));
			}
			if (kind == "into")
			{
				return Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top) + Runtime.rtl.toStr("px"),"width: " + Runtime.rtl.toStr(width) + Runtime.rtl.toStr("px"),"height: " + Runtime.rtl.toStr(height) + Runtime.rtl.toStr("px")]));
			}
			return null;
		},
		/**
 * Show context menu
 */
		showContextMenu: function(e)
		{
			var x;
			var y;
			if (this.model.render_context_menu)
			{
				x = e.layerX;
				y = e.layerY;
			}
			else
			{
				x = e.clientX;
				y = e.clientY;
			}
			this.model.context_menu.show(x, y);
		},
		/**
 * Mouse context menu item click
 */
		onContextMenuItem: function(e, item, path)
		{
			/* Send message context menu */
			this.model.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"name":"contextMenu","path":path,"item":item,"event":e})));
			if (item)
			{
				item.onContextMenu(this.model);
			}
			/* Select item */
			if (this.model.autoselect)
			{
				this.model.selectItem(path);
				/* Send event */
				this.model.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"kind":"context_menu","name":"selectItem","path":this.model.selected_path,"item":this.model.selected_item})));
			}
			/* Show context menu */
			if (this.model.context_menu)
			{
				this.showContextMenu(e);
			}
			e.preventDefault();
			e.stopPropagation();
			return false;
		},
		/**
 * Mouse down
 */
		onMouseDownItem: function(e, item, path)
		{
			if (e.button != 0)
			{
				return ;
			}
			/* Hide context menu */
			if (this.model.context_menu)
			{
				this.model.context_menu.hide();
			}
			/* Select item */
			if (this.model.autoselect)
			{
				this.model.selectItem(path);
			}
			/* Send event */
			this.model.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"kind":"click","name":"selectItem","path":this.model.selected_path,"item":this.model.selected_item,"event":e})));
			if (item)
			{
				item.onClick(this.model);
			}
			/* Set start drag item */
			if (this.model.dnd)
			{
				this.drag_elem = this.findDragElem(e.currentTarget);
				this.drag_start_point = Runtime.Map.from({"x":e.layerX,"y":e.layerY});
			}
			e.preventDefault();
			e.stopPropagation();
			return false;
		},
		/**
 * Mouse down
 */
		onMouseDown: function(e)
		{
			if (this.model.context_menu)
			{
				this.model.context_menu.hide();
			}
		},
		/**
 * Mouse tree up
 */
		onMouseUp: function(e)
		{
			this.stopDrag();
		},
		/**
 * Mouse move item
 */
		onMouseMoveItem: function(e, item)
		{
			if (this.drag_elem == null)
			{
				return ;
			}
			/* Try to start drag & drop */
			if (!this.is_drag)
			{
				this.startDrag(e);
			}
			if (!this.is_drag)
			{
				return ;
			}
			/* Drag & Drop started */
			var target = e.currentTarget;
			var top = target.offsetTop;
			var bottom = target.offsetTop + target.clientHeight;
			var center = (top + bottom) / 2;
			var kind = "before";
			if (e.layerY >= center)
			{
				kind = "into";
			}
			this.setDragDestElement(target, item, kind);
			e.preventDefault();
		},
		/**
 * Mouse tree move
 */
		onMouseMove: function(e)
		{
			if (this.drag_elem == null)
			{
				return ;
			}
			/* Try to start drag & drop */
			if (!this.is_drag)
			{
				this.startDrag(e);
			}
			if (!this.is_drag)
			{
				return ;
			}
			/* Outside of tree contents */
			var tree_content = this.getRef("content");
			if (e.layerY > tree_content.clientHeight)
			{
				this.setDragDestElement(tree_content, null, "after");
				e.preventDefault();
				return false;
			}
		},
	},
};
Object.assign(Runtime.Widget.Tree.TreeWidget,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".tree_widget.h-fd26{position: relative;height: 100%}.tree_widget__items.h-fd26 > .tree_widget__items{padding-left: 10px}.tree_widget__items.hide.h-fd26{display: none}.tree_widget__item_label.h-fd26{display: inline-block;padding: 5px;cursor: pointer;user-select: none}.tree_widget__item.selected.h-fd26 > .tree_widget__item_label{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.tree_widget__box.h-fd26{position: absolute;border-style: solid;border-width: 0;border-color: transparent}.tree_widget__box--into.h-fd26{background-color: rgba(255, 0, 0, 0.5);pointer-events: none}.tree_widget__box--before.h-fd26,.tree_widget__box--after.h-fd26{border-top-width: 2px;border-top-color: red}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Tree";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tree.TreeWidget";
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
Runtime.rtl.defClass(Runtime.Widget.Tree.TreeWidget);
window["Runtime.Widget.Tree.TreeWidget"] = Runtime.Widget.Tree.TreeWidget;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tree.TreeWidget;
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Components == 'undefined') Runtime.WordPress.Components = {};
Runtime.WordPress.Components.CKEditor = {
	name: "Runtime.WordPress.Components.CKEditor",
	extends: Runtime.Web.Component,
	props: {
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
	},
	data: function ()
	{
		return {
			change_timer: null,
			old_value: null,
			instance: null,
			is_instance_created: false,
		};
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_ckeditor"])});
			
			/* Element 'textarea' */
			let __v1 = this._e(__v0, "textarea", {"style":"display: none;","ref":"textarea","name":this.name});
			
			return this._flatten(__v);
		},
		/**
 * Component mounted
 */
		onMounted: function()
		{
			this.nextTick(() => {
		
		var conf = JSON.parse(JSON.stringify( ckeditorSettings.configuration ));
		conf["customConfig"] = "/wp-content/plugins/ckeditor-for-wordpress/ckeditor.config.small.js";
		
		this.instance = CKEDITOR.replace(this.getRef("textarea"), conf);
		this.instance.on('change', ()=>{ 
			if (this.change_timer == null)
			{
				this.change_timer = setTimeout(this.onContentChange.bind(this), 200);
			}
		});
		
		/* Set data */
		this.instance.setData(this.value);
		this.old_value = this.value;
		
		/* Set created */
		this.is_instance_created = true;
	});
		},
		/**
 * On code changed
 */
		onContentChange: function()
		{
			this.change_timer = null;
			var value = this.instance.getData();
			this.old_value = value;
			this.value = value;
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":value,"old_value":this.value,"data":this.data})));
		},
		/**
 * On updated
 */
		onUpdated: function()
		{
			if (this.is_instance_created && this.old_value != this.value)
			{
				this.instance.setData(this.value);
			}
		},
	},
};
Object.assign(Runtime.WordPress.Components.CKEditor,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_ckeditor.h-2122{min-height: 430px}.widget_ckeditor.h-2122 *{box-sizing: content-box !important}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Components.CKEditor";
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
Runtime.rtl.defClass(Runtime.WordPress.Components.CKEditor);
window["Runtime.WordPress.Components.CKEditor"] = Runtime.WordPress.Components.CKEditor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Components.CKEditor;
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Components == 'undefined') Runtime.WordPress.Components = {};
Runtime.WordPress.Components.Form = {
	name: "Runtime.WordPress.Components.Form",
	extends: Runtime.Widget.Form.Form,
	methods:
	{
	},
};
Object.assign(Runtime.WordPress.Components.Form,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Form.Form"]);
	},
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Components.Form";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.Form";
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
Runtime.rtl.defClass(Runtime.WordPress.Components.Form);
window["Runtime.WordPress.Components.Form"] = Runtime.WordPress.Components.Form;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Components.Form;
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Components == 'undefined') Runtime.WordPress.Components = {};
Runtime.WordPress.Components.FormModel = function()
{
	Runtime.Widget.Form.FormSubmitModel.apply(this, arguments);
};
Runtime.WordPress.Components.FormModel.prototype = Object.create(Runtime.Widget.Form.FormSubmitModel.prototype);
Runtime.WordPress.Components.FormModel.prototype.constructor = Runtime.WordPress.Components.FormModel;
Object.assign(Runtime.WordPress.Components.FormModel.prototype,
{
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "fields", data);
		serializer.process(this, "form_name", data);
		Runtime.Widget.Form.FormSubmitModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Form.FormSubmitModel.prototype.initWidget.call(this, params);
		/* Set form name */
		if (params.has("form_name"))
		{
			this.form_name = params.get("form_name");
		}
		/* Setup storage */
		if (this.storage == null)
		{
			this.storage = new Runtime.Widget.Form.FormSubmitStorage(Runtime.Map.from({"api_name":"runtime.wordpress.form.submit"}));
			this.storage.setForm(this);
		}
	},
	/**
	 * Merge post data
	 */
	mergePostData: function(post_data, action)
	{
		post_data = Runtime.Widget.Form.FormSubmitModel.prototype.mergePostData.call(this, post_data, action);
		post_data.set("form_name", this.form_name);
		return post_data;
	},
	/**
	 * Returns field component
	 */
	getFieldComponent: function(field_type)
	{
		if (field_type == "textarea")
		{
			return "Runtime.Widget.TextArea";
		}
		return "Runtime.Widget.Input";
	},
	/**
	 * Load form
	 */
	loadForm: async function()
	{
		var result = await this.layout.callApi(Runtime.Map.from({"api_name":"runtime.wordpress.form.submit","method_name":"actionItem","data":Runtime.Map.from({"form_name":this.form_name})}));
		if (result.isSuccess())
		{
			/* Clear fields */
			this.fields = Runtime.Vector.from([]);
			/* Add new fields */
			var fields = result.data.get("settings").get("fields");
			if (fields)
			{
				for (var i = 0; i < fields.count(); i++)
				{
					var field = fields.get(i);
					this.addField(Runtime.Map.from({"name":field.get("name"),"label":field.get("title"),"component":this.getFieldComponent(field.get("type"))}));
				}
			}
		}
	},
	_init: function()
	{
		Runtime.Widget.Form.FormSubmitModel.prototype._init.call(this);
		this.form_name = "";
	},
});
Object.assign(Runtime.WordPress.Components.FormModel, Runtime.Widget.Form.FormSubmitModel);
Object.assign(Runtime.WordPress.Components.FormModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Components.FormModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.FormSubmitModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Components.FormModel);
window["Runtime.WordPress.Components.FormModel"] = Runtime.WordPress.Components.FormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Components.FormModel;
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Components == 'undefined') Runtime.WordPress.Components = {};
Runtime.WordPress.Components.Image = {
	name: "Runtime.WordPress.Components.Image",
	extends: Runtime.Web.Component,
	props: {
		"styles": {
			default: Runtime.Vector.from([]),
		},
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
		"size": {
			default: "default",
		},
		"upload": {
			default: false,
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_image", this.getStyles()]),"key":"widget_image_" + Runtime.rtl.toStr(this.name)});
			
			if (this.upload)
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_image__upload_button"])});
				
				/* Component 'Button' */
				let __v2 = this._c(__v1, "Runtime.Widget.Button", {"type":"small","onClick":this.onUploadImage}, () => {
					let __v = [];
					
					/* Text */
					this._t(__v, "Upload image");
					
					return this._flatten(__v);
				});
			}
			let image = this.getImage();
			
			if (image)
			{
				/* Element 'img' */
				let __v3 = this._e(__v0, "img", {"src":image});
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns styles
 */
		getStyles: function()
		{
			if (this.styles == null)
			{
				return "";
			}
			var styles = this.styles.map((name) =>
			{
				return "widget_image--" + Runtime.rtl.toStr(name);
			});
			return Runtime.rs.join(" ", styles);
		},
		/**
 * Return image
 */
		getImage: function()
		{
			if (this.value == null)
			{
				return null;
			}
			var image = this.value.get("file");
			/* Resolve size */
			var sizes = this.value.get("sizes");
			if (sizes && sizes.has(this.size))
			{
				image = sizes.get(this.size).get("file");
			}
			return image;
		},
		/**
 * On upload image
 */
		onUploadImage: function()
		{
			var uploader = wp.media
	({
		title: "Файлы",
		button: {
			text: "Выбрать файл"
		},
		multiple: false
	})
	.on('select', () => {
		let attachments = uploader.state().get('selection').toJSON();
		let attachment = attachments[0];
		
		let sizes = {};
		for (let size_name in attachment.sizes)
		{
			let size = attachment.sizes[size_name];
			sizes[size_name] = {
				"size": size_name,
				"file": size.url,
				"width": size.width,
				"height": size.height,
				"mime_type": "",
			};
		}
		
		let image = Runtime.Dict.from({
			"id": attachment.id,
			"width": attachment.width,
			"height": attachment.height,
			"file": attachment.url,
			"sizes": Runtime.Dict.from(sizes),
		});
		
		/* Send value change */
		if (this.model) this.model.onValueChange(image, this.data);
		this.emit("valueChange", image, this.data);
	})
	.open();
		},
	},
};
Object.assign(Runtime.WordPress.Components.Image,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_image.h-1867 img{max-width: 200px;max-height: 200px}.widget_image--small.h-1867 img{max-width: 100px;max-height: 100px}.widget_image__upload_button.h-1867{padding-bottom: 10px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Components.Image";
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
Runtime.rtl.defClass(Runtime.WordPress.Components.Image);
window["Runtime.WordPress.Components.Image"] = Runtime.WordPress.Components.Image;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Components.Image;
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
Runtime.WordPress.Theme.AssetHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.WordPress.Theme.AssetHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.WordPress.Theme.AssetHook.prototype.constructor = Runtime.WordPress.Theme.AssetHook;
Object.assign(Runtime.WordPress.Theme.AssetHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.ASSETS);
		this.register(this.constructor.CREATE_LAYOUT);
		this.register(this.constructor.IMPORT_CONTAINER_DATA_AFTER);
	},
	/**
	 * Create layout
	 */
	create_layout: function(params)
	{
	},
	/**
	 * Import data after
	 */
	import_container_data_after: function(params)
	{
		this.assets_path = params.get("container").layout.widgets.get("assets_path");
	},
	/**
	 * Assets
	 */
	assets: function(params)
	{
		params.set("assets_path", this.assets_path);
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.assets_path = "";
	},
});
Object.assign(Runtime.WordPress.Theme.AssetHook, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.WordPress.Theme.AssetHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.AssetHook";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.AssetHook);
window["Runtime.WordPress.Theme.AssetHook"] = Runtime.WordPress.Theme.AssetHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.AssetHook;
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
Runtime.WordPress.Theme.ModuleDescription = function()
{
};
Object.assign(Runtime.WordPress.Theme.ModuleDescription.prototype,
{
});
Object.assign(Runtime.WordPress.Theme.ModuleDescription,
{
	/**
	 * Returns module name
	 */
	getModuleName: function()
	{
		return "Runtime.WordPress.Theme";
	},
	/**
	 * Returns module version
	 */
	getModuleVersion: function()
	{
		return "0.1.0";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({"Runtime":">=0.12","Runtime.Web":">=0.12","Runtime.Widget":">=0.12","Runtime.WordPress":">=0.12"});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Entity.Hook("Runtime.WordPress.Theme.AssetHook")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.ModuleDescription";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.ModuleDescription);
window["Runtime.WordPress.Theme.ModuleDescription"] = Runtime.WordPress.Theme.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.ModuleDescription;
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
Runtime.WordPress.WP_App = function()
{
	Runtime.Web.BaseApp.apply(this, arguments);
};
Runtime.WordPress.WP_App.prototype = Object.create(Runtime.Web.BaseApp.prototype);
Runtime.WordPress.WP_App.prototype.constructor = Runtime.WordPress.WP_App;
Object.assign(Runtime.WordPress.WP_App.prototype,
{
});
Object.assign(Runtime.WordPress.WP_App, Runtime.Web.BaseApp);
Object.assign(Runtime.WordPress.WP_App,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.WP_App";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseApp";
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
Runtime.rtl.defClass(Runtime.WordPress.WP_App);
window["Runtime.WordPress.WP_App"] = Runtime.WordPress.WP_App;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.WP_App;
