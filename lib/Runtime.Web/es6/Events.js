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