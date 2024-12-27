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