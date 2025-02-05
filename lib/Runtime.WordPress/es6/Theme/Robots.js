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
Runtime.WordPress.Theme.Robots = function()
{
	Runtime.Web.BaseRoute.apply(this, arguments);
};
Runtime.WordPress.Theme.Robots.prototype = Object.create(Runtime.Web.BaseRoute.prototype);
Runtime.WordPress.Theme.Robots.prototype.constructor = Runtime.WordPress.Theme.Robots;
Object.assign(Runtime.WordPress.Theme.Robots.prototype,
{
	/**
	 * Action index
	 */
	actionIndex: async function(container)
	{
		var content = Runtime.WordPress.WP_Helper.get_option("robots.txt");
		/* Create response */
		var response = new Runtime.Web.Response();
		response.content = content;
		response.headers.set("Content-Type", "text/plain; charset=UTF-8");
		/* Set response */
		container.setResponse(response);
	},
});
Object.assign(Runtime.WordPress.Theme.Robots, Runtime.Web.BaseRoute);
Object.assign(Runtime.WordPress.Theme.Robots,
{
	/**
	 * Returns routes
	 */
	getRoutes: function()
	{
		return Runtime.Vector.from([new Runtime.Web.RouteAction(Runtime.Map.from({"uri":"/robots.txt","name":"site:robots","action":"actionIndex"}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Robots";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseRoute";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Robots);
window["Runtime.WordPress.Theme.Robots"] = Runtime.WordPress.Theme.Robots;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Robots;