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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.CurlException = function(http_code, http_content, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, "HTTP error code: " + Runtime.rtl.toStr(http_code), Runtime.rtl.ERROR_CURL_ERROR, prev);
	this.http_code = http_code;
	this.http_content = http_content;
};
Runtime.Exceptions.CurlException.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
Runtime.Exceptions.CurlException.prototype.constructor = Runtime.Exceptions.CurlException;
Object.assign(Runtime.Exceptions.CurlException.prototype,
{
	_init: function()
	{
		Runtime.Exceptions.AbstractException.prototype._init.call(this);
		this.http_code = -1;
		this.http_content = "";
	},
});
Object.assign(Runtime.Exceptions.CurlException, Runtime.Exceptions.AbstractException);
Object.assign(Runtime.Exceptions.CurlException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.CurlException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(Runtime.Exceptions.CurlException);
window["Runtime.Exceptions.CurlException"] = Runtime.Exceptions.CurlException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.CurlException;