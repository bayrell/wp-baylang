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