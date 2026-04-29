"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.Web.RouteProvider = class extends Runtime.BaseProvider
{
	/**
	 * Init provider
	 */
	async init()
	{
		await super.init();
		await this.initRoutes();
	}
	
	
	/**
	 * Init routes
	 */
	async initRoutes()
	{
		this.routes = new Runtime.Map();
		let routes = Runtime.rtl.getContext().getEntities("Runtime.Web.Annotations.Route");
		for (let i = 0; i < routes.count(); i++)
		{
			let info = routes[i];
			if (!info.name) continue;
			/* Get method getRoutes */
			let getRoutes = new Runtime.Method(info.name, "getRoutes");
			if (!getRoutes.exists())
			{
				throw new Runtime.Exceptions.ItemNotFound(info.name, "Route");
			}
			/* Get routes */
			let routes_list = getRoutes.apply();
			if (!routes_list) continue;
			/* Register routes */
			for (let j = 0; j < routes_list.count(); j++)
			{
				let route = routes_list.get(j);
				route.route_class = info.name;
				route.compile();
				this.addRoute(route);
			}
		}
		await Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.ROUTES_INIT, Runtime.Map.create({
			"routes": this,
		}));
		/* Sort routes */
		this.sortRoutes();
	}
	
	
	/**
	 * Add route
	 */
	addRoute(route)
	{
		if (route.uri_match === null) route.compile();
		this.routes.set(route.name, Runtime.Map.create({
			"uri": route.uri,
			"domain": route.domain,
		}));
		this.routes_list.push(route);
	}
	
	
	/**
	 * Returns true if route is exists
	 */
	hasRoute(route_name){ return this.routes.has(route_name); }
	
	
	/**
	 * Sort routes
	 */
	sortRoutes()
	{
		let routes_list = this.routes_list.map((value, index) => { return Runtime.Vector.create([value, index]); });
		routes_list.sort((a, b) =>
		{
			let pos_a = a.get(0).pos;
			let pos_b = b.get(0).pos;
			if (pos_a == pos_b)
			{
				return a.get(1) - b.get(1);
			}
			return pos_a - pos_b;
		});
		this.routes_list = routes_list.map((item) => { return item.get(0); });
	}
	
	
	/**
	 * Start provider
	 */
	async start()
	{
		await super.start();
	}
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		let hook = Runtime.rtl.getContext().provider("hook");
		hook.register(Runtime.Web.Hooks.AppHook.ROUTE_BEFORE, new Runtime.Method(this, "routeBefore"), 50);
	}
	
	
	/**
	 * Route before
	 */
	routeBefore(params)
	{
		let container = params.get("container");
		let layout = container.layout;
		/* Create route */
		let router = layout.storage.createWidget("Runtime.Web.RouteList");
		router.routes = this.routes.copy();
		layout.storage.set("router", router);
	}
	
	
	/**
	 * Returns route by name
	 */
	getRoute(route_name)
	{
		return this.routes_list.find((route) => { return route.name == route_name; });
	}
	
	
	/**
	 * Remove route by name
	 */
	removeRoute(route_name)
	{
		let index = this.routes_list.findIndex((route) => { return route.name == route_name; });
		if (index == -1) return;
		this.routes_list.remove(index);
		this.routes.remove(route_name);
	}
	
	
	/**
	 * Find route
	 */
	findRoute(request)
	{
		if (request.uri === null) return null;
		for (let i = 0; i < this.routes_list.count(); i++)
		{
			let route = this.routes_list.get(i);
			let matches = this.matchRoute(request, route);
			if (matches == null) continue;
			route = route.copy();
			route.addMatches(matches);
			return route;
		}
		return null;
	}
	
	
	/**
	 * Match route
	 */
	matchRoute(request, route)
	{
		if (route == null) return null;
		if (route.domain && route.domain != request.host) return null;
		/* Get matches */
		let matches = Runtime.re.matchAll(route.uri_match, request.uri);
		if (matches)
		{
			matches = matches.get(0, null);
			matches.remove(0);
		}
		/* Call hook */
		let d = Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.MATCH_ROUTE, Runtime.Map.create({
			"route": route,
			"request": request,
			"matches": matches,
		}));
		matches = d.get("matches");
		if (matches == null) return null;
		return matches;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.routes = new Runtime.Map();
		this.routes_list = Runtime.Vector.create([]);
	}
	static getClassName(){ return "Runtime.Web.RouteProvider"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.RouteProvider"] = Runtime.Web.RouteProvider;