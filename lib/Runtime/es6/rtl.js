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