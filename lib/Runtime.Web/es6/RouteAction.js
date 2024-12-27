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