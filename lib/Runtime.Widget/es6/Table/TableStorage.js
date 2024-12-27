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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableStorage = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Table.TableStorage.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Table.TableStorage.prototype.constructor = Runtime.Widget.Table.TableStorage;
Object.assign(Runtime.Widget.Table.TableStorage.prototype,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return this.api_name;
	},
	/**
	 * Set table
	 */
	setTable: function(table)
	{
		this.table = table;
	},
	/**
	 * Load form
	 */
	load: async function()
	{
		var post_data = Runtime.Map.from({"page":this.table.page,"limit":this.table.limit});
		post_data = this.table.mergePostData(post_data, "load");
		var res = await this.table.layout.callApi(Runtime.Map.from({"api_name":this.getApiName(),"method_name":"actionSearch","data":post_data}));
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.api_name = "";
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.TableStorage, Runtime.BaseObject);
Object.assign(Runtime.Widget.Table.TableStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableStorage";
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
	__implements__:
	[
		Runtime.Widget.Table.TableStorageInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.Table.TableStorage);
window["Runtime.Widget.Table.TableStorage"] = Runtime.Widget.Table.TableStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableStorage;