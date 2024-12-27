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
Runtime.File = function(params)
{
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.File.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.File.prototype.constructor = Runtime.File;
Object.assign(Runtime.File.prototype,
{
	/**
	 * Returns file name
	 */
	getName: function()
	{
		return this.name;
	},
	/**
	 * Returns file path
	 */
	getPath: function()
	{
		return this.path;
	},
	/**
	 * Returns file size
	 */
	getSize: function()
	{
		return this.size;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.name = "";
		this.path = "";
		this.size = 0;
	},
});
Object.assign(Runtime.File, Runtime.BaseObject);
Object.assign(Runtime.File,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.File";
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
Runtime.rtl.defClass(Runtime.File);
window["Runtime.File"] = Runtime.File;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.File;