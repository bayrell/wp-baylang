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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Helper == 'undefined') BayLang.Helper = {};
BayLang.Helper.CacheInterface = function()
{
};
Object.assign(BayLang.Helper.CacheInterface.prototype,
{
	/**
	 * Load object
	 */
	load: async function()
	{
	},
	/**
	 * Read object from cache
	 */
	readCache: async function()
	{
	},
	/**
	 * Save object to cache
	 */
	saveCache: async function()
	{
	},
});
Object.assign(BayLang.Helper.CacheInterface,
{
	getNamespace: function()
	{
		return "BayLang.Helper";
	},
	getClassName: function()
	{
		return "BayLang.Helper.CacheInterface";
	},
});
Runtime.rtl.defClass(BayLang.Helper.CacheInterface);
window["BayLang.Helper.CacheInterface"] = BayLang.Helper.CacheInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Helper.CacheInterface;