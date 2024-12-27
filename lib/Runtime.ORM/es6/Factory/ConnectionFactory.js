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
if (typeof Runtime.ORM == 'undefined') Runtime.ORM = {};
if (typeof Runtime.ORM.Factory == 'undefined') Runtime.ORM.Factory = {};
Runtime.ORM.Factory.ConnectionFactory = function()
{
	Runtime.Entity.Entity.apply(this, arguments);
};
Runtime.ORM.Factory.ConnectionFactory.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.ORM.Factory.ConnectionFactory.prototype.constructor = Runtime.ORM.Factory.ConnectionFactory;
Object.assign(Runtime.ORM.Factory.ConnectionFactory.prototype,
{
	/**
	 * Create connection
	 */
	createConnection: function()
	{
		return null;
	},
	/**
	 * Register connections
	 */
	registerConnections: function(provider)
	{
		/* Create connection */
		var conn = this.createConnection();
		/* Add connection */
		provider.addConnection(conn);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Entity.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.ORM.Factory.ConnectionFactory, Runtime.Entity.Entity);
Object.assign(Runtime.ORM.Factory.ConnectionFactory,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Factory";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Factory.ConnectionFactory";
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
Runtime.rtl.defClass(Runtime.ORM.Factory.ConnectionFactory);
window["Runtime.ORM.Factory.ConnectionFactory"] = Runtime.ORM.Factory.ConnectionFactory;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Factory.ConnectionFactory;