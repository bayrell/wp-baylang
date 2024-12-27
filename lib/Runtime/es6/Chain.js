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