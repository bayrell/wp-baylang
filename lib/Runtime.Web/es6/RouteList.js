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
Runtime.Web.RouteList = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.Web.RouteList.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Web.RouteList.prototype.constructor = Runtime.Web.RouteList;
Object.assign(Runtime.Web.RouteList.prototype,
{
	/**
	 * Init provider
	 */
	init: async function()
	{
		await Runtime.BaseProvider.prototype.init.bind(this)();
		this.initRoutes();
	},
	/**
	 * Init routes
	 */
	initRoutes: function()
	{
		this.routes = Runtime.Map.from({});
		var routes = Runtime.rtl.getContext().getEntities("Runtime.Web.Annotations.Route");
		for (var i = 0; i < routes.count(); i++)
		{
			var info = Runtime.rtl.attr(routes, i);
			if (!info.name)
			{
				continue;
			}
			/* Get method getRoutes */
			var getRoutes = new Runtime.Callback(info.name, "getRoutes");
			if (!getRoutes.exists())
			{
				throw new Runtime.Exceptions.ItemNotFound(info.name, "Route")
			}
			/* Get routes */
			var routes_list = Runtime.rtl.apply(getRoutes);
			if (!routes_list)
			{
				continue;
			}
			/* Register routes */
			for (var j = 0; j < routes_list.count(); j++)
			{
				var route = routes_list.get(j);
				if (route instanceof Runtime.Web.RouteAction)
				{
					if (Runtime.rtl.method_exists(info.name, route.action))
					{
						route.action = new Runtime.Callback(info.name, route.action);
					}
					else
					{
						route.action = new Runtime.Entity.Factory(info.name, Runtime.Map.from({"action":route.action}));
					}
				}
				route.route_class = info.name;
				route.compile();
				this.addRoute(route);
			}
		}
		Runtime.rtl.getContext().callHookAsync(Runtime.Web.Hooks.AppHook.ROUTES_INIT, Runtime.Map.from({"routes":this}));
		/* Sort routes */
		this.sortRoutes();
	},
	/**
	 * Add route
	 */
	addRoute: function(route)
	{
		this.routes.set(route.name, route);
		this.routes_list.push(route);
	},
	/**
	 * Sort routes
	 */
	sortRoutes: function()
	{
		var routes_list = this.routes_list.map((value, index) =>
		{
			return Runtime.Vector.from([value,index]);
		});
		routes_list = routes_list.sort((a, b) =>
		{
			var pos_a = a.get(0).pos;
			var pos_b = b.get(0).pos;
			if (pos_a == pos_b)
			{
				return a.get(1) - b.get(1);
			}
			return pos_a - pos_b;
		});
		this.routes_list = routes_list.map((item) =>
		{
			return item.get(0);
		});
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
		await Runtime.BaseProvider.prototype.start.bind(this)();
	},
	/**
	 * Find route
	 */
	findRoute: function(container)
	{
		var request = container.request;
		if (request.uri === null)
		{
			return null;
		}
		for (var i = 0; i < this.routes_list.count(); i++)
		{
			var route = this.routes_list.get(i);
			var matches = this.matchRoute(container, route);
			if (matches == null)
			{
				continue;
			}
			route = route.copy();
			route.addMatches(matches);
			return route;
		}
		return null;
	},
	/**
	 * Match route
	 */
	matchRoute: function(container, route)
	{
		if (route == null)
		{
			return null;
		}
		var request = container.request;
		if (route.domain && route.domain != request.host)
		{
			return null;
		}
		/* Get matches */
		var matches = Runtime.re.matchAll(route.uri_match, request.uri);
		if (matches)
		{
			matches = matches.get(0, null);
			matches.remove(0);
		}
		/* Call hook */
		var d = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.MATCH_ROUTE, Runtime.Map.from({"route":route,"container":container,"matches":matches}));
		matches = d.get("matches");
		if (matches == null)
		{
			return null;
		}
		return matches;
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.routes = Runtime.Map.from({});
		this.routes_list = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Web.RouteList, Runtime.BaseProvider);
Object.assign(Runtime.Web.RouteList,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RouteList";
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
Runtime.rtl.defClass(Runtime.Web.RouteList);
window["Runtime.Web.RouteList"] = Runtime.Web.RouteList;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteList;